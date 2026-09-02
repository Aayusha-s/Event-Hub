import { NextResponse } from "next/server";
import { Types } from "mongoose";
import { requireRole } from "@/middleware/auth/requireRole";
import { deleteReview } from "@/services/attendee/attendee.service";
import { HttpError } from "@/utils/api/httpError";
export async function DELETE(
  _: Request,
  c: { params: Promise<{ id: string }> },
) {
  try {
    const s = await requireRole([
      "attendee",
      "organizer",
      "vendor",
      "ticket_checker",
      "admin",
    ]);
    const { id } = await c.params;
    if (!Types.ObjectId.isValid(id))
      throw new HttpError(400, "Review id is invalid.", "VALIDATION_ERROR");
    await deleteReview(new Types.ObjectId(s.user.id), new Types.ObjectId(id));
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json(
      {
        success: false,
        error: {
          message:
            e instanceof HttpError ? e.message : "Unable to delete review.",
        },
      },
      { status: e instanceof HttpError ? e.statusCode : 500 },
    );
  }
}
