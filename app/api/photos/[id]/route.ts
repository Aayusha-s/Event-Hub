import { NextResponse } from "next/server";
import { Types } from "mongoose";
import { requireRole } from "@/middleware/auth/requireRole";
import Photo from "@/models/Photo";
import { recordActivity } from "@/services/profiles/profile.service";
import { HttpError } from "@/utils/api/httpError";
const roles = [
  "attendee",
  "organizer",
  "vendor",
  "ticket_checker",
  "admin",
] as const;
export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const session = await requireRole([...roles]),
      { id } = await context.params,
      user = new Types.ObjectId(session.user.id),
      body = await request.json();
    if (!Types.ObjectId.isValid(id))
      throw new HttpError(400, "Photo id is invalid.", "VALIDATION_ERROR");
    const update =
      body.action === "like"
        ? { $addToSet: { likes: user } }
        : body.action === "unlike"
          ? { $pull: { likes: user } }
          : typeof body.comment === "string" && body.comment.trim()
            ? { $push: { comments: { user, text: body.comment.trim() } } }
            : null;
    if (!update)
      throw new HttpError(
        400,
        "A valid photo action is required.",
        "VALIDATION_ERROR",
      );
    const photo = await Photo.findByIdAndUpdate(id, update, { new: true });
    if (!photo) throw new HttpError(404, "Photo not found.", "NOT_FOUND");
    if (body.action === "like")
      await recordActivity(user, "like", "Liked a photo", {
        subject: photo._id,
        subjectModel: "Photo",
      });
    return NextResponse.json({ success: true, data: photo });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: {
          message:
            error instanceof HttpError
              ? error.message
              : "Unable to update photo.",
        },
      },
      { status: error instanceof HttpError ? error.statusCode : 500 },
    );
  }
}
