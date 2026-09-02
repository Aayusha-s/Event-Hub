import { NextResponse } from "next/server";
import { Types } from "mongoose";
import { requireRole } from "@/middleware/auth/requireRole";
import CommunityPost from "@/models/CommunityPost";
import PostComment from "@/models/PostComment";
import { HttpError } from "@/utils/api/httpError";
const roles = [
  "attendee",
  "organizer",
  "vendor",
  "ticket_checker",
  "admin",
] as const;
const id = async (context: { params: Promise<{ id: string }> }) => {
  const value = (await context.params).id;
  if (!Types.ObjectId.isValid(value))
    throw new HttpError(400, "Invalid post id.", "VALIDATION_ERROR");
  return new Types.ObjectId(value);
};
export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const session = await requireRole([...roles]),
      user = new Types.ObjectId(session.user.id),
      body = await request.json(),
      postId = await id(context);
    if (
      body.action === "like" ||
      body.action === "unlike" ||
      body.action === "save" ||
      body.action === "unsave" ||
      body.action === "share"
    ) {
      const field =
        body.action === "like" || body.action === "unlike" ? "likes" : "saves";
      const update =
        body.action === "share"
          ? { $inc: { shares: 1 } }
          : body.action === "like" || body.action === "save"
            ? { $addToSet: { [field]: user } }
            : { $pull: { [field]: user } };
      const post = await CommunityPost.findByIdAndUpdate(postId, update, {
        new: true,
      });
      if (!post) throw new HttpError(404, "Post not found.", "NOT_FOUND");
      return NextResponse.json({ success: true, data: post });
    }
    if (typeof body.content !== "string" || !body.content.trim())
      throw new HttpError(400, "Post content is required.", "VALIDATION_ERROR");
    const post = await CommunityPost.findOneAndUpdate(
      { _id: postId, author: user },
      { $set: { content: body.content.trim() } },
      { new: true, runValidators: true },
    );
    if (!post)
      throw new HttpError(
        404,
        "Post not found or not owned by you.",
        "NOT_FOUND",
      );
    return NextResponse.json({ success: true, data: post });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: {
          message:
            error instanceof HttpError
              ? error.message
              : "Unable to update post.",
        },
      },
      { status: error instanceof HttpError ? error.statusCode : 500 },
    );
  }
}
export async function DELETE(
  _request: Request,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const session = await requireRole([...roles]);
    const post = await CommunityPost.findOneAndDelete({
      _id: await id(context),
      author: session.user.id,
    });
    if (!post)
      throw new HttpError(
        404,
        "Post not found or not owned by you.",
        "NOT_FOUND",
      );
    await PostComment.deleteMany({ post: post._id });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: {
          message:
            error instanceof HttpError
              ? error.message
              : "Unable to delete post.",
        },
      },
      { status: error instanceof HttpError ? error.statusCode : 500 },
    );
  }
}
