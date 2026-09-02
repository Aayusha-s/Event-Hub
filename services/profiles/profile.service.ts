import { Types } from "mongoose";
import dbConnect from "@/lib/mongodb";
import User, { IUser } from "@/models/User";
import Follow from "@/models/Follow";
import Activity, { ActivityType } from "@/models/Activity";
import Photo from "@/models/Photo";
import Event from "@/models/Event";
import Ticket from "@/models/Ticket";
import SavedEvent from "@/models/SavedEvent";
import Review from "@/models/Review";
import { HttpError } from "@/utils/api/httpError";
import { createNotification } from "@/services/notifications/notification.service";

const publicUser = { password: 0, email: 0, phone: 0 };
export const recordActivity = async (
  user: Types.ObjectId | string,
  type: ActivityType,
  title: string,
  options: Partial<{
    description: string;
    link: string;
    subject: Types.ObjectId;
    subjectModel: "Event" | "User" | "Photo" | "Review" | "Comment";
  }> = {},
) => {
  await dbConnect();
  return Activity.create({ user, type, title, ...options });
};
export const getProfile = async (
  target: Types.ObjectId,
  viewer?: Types.ObjectId,
) => {
  await dbConnect();
  const owner = !!viewer?.equals(target);
  const user = await User.findById(target)
    .select(owner ? "-password" : publicUser)
    .lean()
    .exec();
  if (!user) throw new HttpError(404, "Profile not found.", "NOT_FOUND");
  if (user.role === "admin")
    throw new HttpError(404, "Profile not found.", "NOT_FOUND");
  const hostedEvents = await Event.find({
    organizer: target,
    ...(owner
      ? {}
      : {
          approvalStatus: "approved",
          status: { $nin: ["cancelled", "completed"] },
        }),
  })
    .sort({ startDate: -1 })
    .lean();
  const [
    followers,
    following,
    isFollowing,
    followsViewer,
    tickets,
    saved,
    reviews,
    photos,
    activity,
  ] = await Promise.all([
    Follow.countDocuments({ following: target }),
    Follow.countDocuments({ follower: target }),
    viewer ? Follow.exists({ follower: viewer, following: target }) : false,
    viewer ? Follow.exists({ follower: target, following: viewer }) : false,
    Ticket.find({ user: target, ticketStatus: "active", paymentStatus: "paid" })
      .populate("event")
      .sort({ purchaseDate: -1 })
      .lean(),
    SavedEvent.find({ user: target })
      .populate("event")
      .sort({ createdAt: -1 })
      .lean(),
    Review.find({
      $or: [
        { user: target },
        { event: { $in: hostedEvents.map((event) => event._id) } },
      ],
    })
      .populate("user", "name profileImage username")
      .populate("event", "title images")
      .sort({ createdAt: -1 })
      .lean(),
    Photo.find({ user: target }).sort({ createdAt: -1 }).lean(),
    Activity.find({ user: target }).sort({ createdAt: -1 }).limit(100).lean(),
  ]);
  const now = new Date(),
    attendedEvents = tickets
      .map((ticket) => ticket.event)
      .filter(Boolean) as unknown as Array<{ startDate: Date; endDate: Date }>;
  const mutualFriends = viewer
    ? await Follow.countDocuments({
        following: target,
        follower: {
          $in: await Follow.distinct("following", { follower: viewer }),
        },
      })
    : 0;
  return {
    user,
    owner,
    relationship: {
      isFollowing: !!isFollowing,
      followsViewer: !!followsViewer,
      friend: !!isFollowing && !!followsViewer,
      mutualFriends,
    },
    counts: { followers, following, friends: mutualFriends },
    events: {
      hosted: hostedEvents.filter((event) => event.status !== "completed"),
      archived: owner
        ? hostedEvents.filter((event) => event.status === "completed")
        : [],
      attended: attendedEvents,
      upcoming: attendedEvents.filter(
        (event) => new Date(event.startDate) >= now,
      ),
      past: attendedEvents.filter((event) => new Date(event.endDate) < now),
      saved: saved.map((item) => item.event).filter(Boolean),
    },
    reviews,
    photos,
    activity,
  };
};
export const updateProfile = async (
  userId: Types.ObjectId,
  input: Partial<
    Pick<
      IUser,
      | "name"
      | "phone"
      | "profileImage"
      | "coverImage"
      | "username"
      | "bio"
      | "location"
      | "website"
      | "interests"
      | "privacy"
    >
  >,
) => {
  await dbConnect();
  const updated = await User.findByIdAndUpdate(
    userId,
    { $set: input },
    { new: true, runValidators: true },
  )
    .select("-password")
    .exec();
  if (!updated) throw new HttpError(404, "User not found.", "NOT_FOUND");
  await recordActivity(userId, "profile_update", "Updated their profile", {
    link: "/userprofile",
  });
  return updated;
};
export const follow = async (
  follower: Types.ObjectId,
  following: Types.ObjectId,
) => {
  if (follower.equals(following))
    throw new HttpError(400, "You cannot follow yourself.", "VALIDATION_ERROR");
  await dbConnect();
  if (!(await User.exists({ _id: following })))
    throw new HttpError(404, "Profile not found.", "NOT_FOUND");
  const relation = await Follow.findOneAndUpdate(
    { follower, following },
    { $setOnInsert: { follower, following } },
    { new: true, upsert: true },
  ).exec();
  const actor = await User.findById(follower).select("name").lean();
  await Promise.all([
    recordActivity(
      follower,
      "follow",
      `Started following ${actor?.name ?? "a member"}`,
      { subject: following, subjectModel: "User" },
    ),
    createNotification(
      following,
      "follow",
      "New follower",
      `${actor?.name ?? "Someone"} started following you.`,
      "/userprofile",
    ),
  ]);
  return relation;
};
export const unfollow = async (
  follower: Types.ObjectId,
  following: Types.ObjectId,
) => {
  await dbConnect();
  await Follow.deleteOne({ follower, following });
  return { following: false };
};
export const removeFollower = async (
  owner: Types.ObjectId,
  follower: Types.ObjectId,
) => {
  await dbConnect();
  await Follow.deleteOne({ follower, following: owner });
  return { removed: true };
};
export const getFollowList = async (
  user: Types.ObjectId,
  direction: "followers" | "following",
) => {
  await dbConnect();
  const relations = await Follow.find(
    direction === "followers" ? { following: user } : { follower: user },
  )
    .sort({ createdAt: -1 })
    .populate(
      direction === "followers" ? "follower" : "following",
      "_id name username profileImage role",
    )
    .lean()
    .exec();
  return relations
    .map(
      (relation) =>
        relation[direction === "followers" ? "follower" : "following"],
    )
    .filter(Boolean);
};
export const getProfileByIdentifier = async (
  identifier: string,
  viewer?: Types.ObjectId,
) => {
  await dbConnect();
  const user = Types.ObjectId.isValid(identifier)
    ? await User.findById(identifier).select("_id").lean()
    : await User.findOne({ username: identifier.toLowerCase() })
        .select("_id")
        .lean();
  if (!user) throw new HttpError(404, "Profile not found.", "NOT_FOUND");
  return getProfile(user._id, viewer);
};
