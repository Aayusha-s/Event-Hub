import { NextResponse } from "next/server";
import { Types } from "mongoose";
import { requireRole } from "@/middleware/auth/requireRole";
import {
  createComment,
  listComments,
} from "@/services/attendee/attendee.service";
import { HttpError } from "@/utils/api/httpError";
type C = { params: Promise<{ id: string }> };
const event = async (c: C) => {
  const { id } = await c.params;
  if (!Types.ObjectId.isValid(id))
    throw new HttpError(400, "Event id is invalid.", "VALIDATION_ERROR");
  return new Types.ObjectId(id);
};
const fail = (e: unknown) =>
  NextResponse.json(
    {
      success: false,
      error: {
        message:
          e instanceof HttpError ? e.message : "Unable to process comments.",
      },
    },
    { status: e instanceof HttpError ? e.statusCode : 500 },
  );
export async function GET(_: Request, c: C) {
  try {
    return NextResponse.json({
      success: true,
      data: { items: await listComments(await event(c)) },
    });
  } catch (e) {
    return fail(e);
  }
}
export async function POST(r: Request, c: C) {
  try {
    const s = await requireRole([
      "attendee",
      "organizer",
      "vendor",
      "ticket_checker",
      "admin",
    ]);
    const b = await r.json();
    if (
      typeof b.text !== "string" ||
      !b.text.trim() ||
      (b.parentId && !Types.ObjectId.isValid(b.parentId))
    )
      throw new HttpError(
        400,
        "Valid comment text is required.",
        "VALIDATION_ERROR",
      );
    return NextResponse.json(
      {
        success: true,
        data: await createComment(
          new Types.ObjectId(s.user.id),
          await event(c),
          b.text.trim(),
          b.parentId ? new Types.ObjectId(b.parentId) : undefined,
        ),
      },
      { status: 201 },
    );
  } catch (e) {
    return fail(e);
  }
}
