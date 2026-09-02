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
export async function POST(request: Request) {
  try {
    const session = await requireRole([...roles]);
    const body = await request.json();
    if (typeof body.imageUrl !== "string" || !body.imageUrl.trim())
      throw new HttpError(400, "imageUrl is required.", "VALIDATION_ERROR");
    const user = new Types.ObjectId(session.user.id);
    const photo = await Photo.create({
      user,
      imageUrl: body.imageUrl.trim(),
      caption:
        typeof body.caption === "string" ? body.caption.trim() : undefined,
      event: Types.ObjectId.isValid(body.eventId) ? body.eventId : undefined,
    });
    await recordActivity(user, "photo", "Uploaded a photo", {
      subject: photo._id,
      subjectModel: "Photo",
    });
    return NextResponse.json({ success: true, data: photo }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: {
          message:
            error instanceof HttpError
              ? error.message
              : "Unable to upload photo.",
        },
      },
      { status: error instanceof HttpError ? error.statusCode : 500 },
    );
  }
}
