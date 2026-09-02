import { NextResponse } from "next/server";
import { Types } from "mongoose";
import { requireRole } from "@/middleware/auth/requireRole";
import {
  deleteComment,
  reactToComment,
  updateComment,
} from "@/services/attendee/attendee.service";
import { HttpError } from "@/utils/api/httpError";
const ctx = async (c: { params: Promise<{ id: string }> }) => {
  const { id } = await c.params;
  if (!Types.ObjectId.isValid(id))
    throw new HttpError(400, "Comment id is invalid.", "VALIDATION_ERROR");
  return new Types.ObjectId(id);
};
const fail = (e: unknown) =>
  NextResponse.json(
    {
      success: false,
      error: {
        message:
          e instanceof HttpError ? e.message : "Unable to process comment.",
      },
    },
    { status: e instanceof HttpError ? e.statusCode : 500 },
  );
export async function PATCH(
  r: Request,
  c: { params: Promise<{ id: string }> },
) {
  try {
    const s = await requireRole([
        "attendee",
        "organizer",
        "vendor",
        "ticket_checker",
        "admin",
      ]),
      b = await r.json(),
      id = await ctx(c);
    if (b.reaction) {
      if (b.reaction !== "like" && b.reaction !== "dislike")
        throw new HttpError(400, "Invalid reaction.", "VALIDATION_ERROR");
      return NextResponse.json({
        success: true,
        data: await reactToComment(
          new Types.ObjectId(s.user.id),
          id,
          b.reaction,
        ),
      });
    }
    if (typeof b.text !== "string" || !b.text.trim())
      throw new HttpError(
        400,
        "Valid comment text is required.",
        "VALIDATION_ERROR",
      );
    return NextResponse.json({
      success: true,
      data: await updateComment(
        new Types.ObjectId(s.user.id),
        id,
        b.text.trim(),
      ),
    });
  } catch (e) {
    return fail(e);
  }
}
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
    await deleteComment(new Types.ObjectId(s.user.id), await ctx(c));
    return NextResponse.json({ success: true });
  } catch (e) {
    return fail(e);
  }
}
