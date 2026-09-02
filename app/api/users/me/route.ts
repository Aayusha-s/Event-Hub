import { NextResponse } from "next/server";
import { Types } from "mongoose";
import { requireRole } from "@/middleware/auth/requireRole";
import { getUserProfile } from "@/services/users/user.service";
import { updateProfile } from "@/services/profiles/profile.service";
import { HttpError } from "@/utils/api/httpError";

export async function GET() {
  try {
    const session = await requireRole([
      "attendee",
      "organizer",
      "vendor",
      "ticket_checker",
      "admin",
    ]);
    const user = await getUserProfile(session.user.id);
    if (!user) throw new HttpError(404, "User not found.", "NOT_FOUND");
    return NextResponse.json({ success: true, data: user });
  } catch (error) {
    if (error instanceof HttpError) {
      return NextResponse.json(
        { success: false, error: { message: error.message, code: error.code } },
        { status: error.statusCode },
      );
    }
    console.error("Fetch profile failed:", error);
    return NextResponse.json(
      { success: false, error: { message: "Unable to fetch profile." } },
      { status: 500 },
    );
  }
}

export async function PUT(request: Request) {
  try {
    const session = await requireRole([
      "attendee",
      "organizer",
      "vendor",
      "ticket_checker",
      "admin",
    ]);
    const body = await request.json();
    const {
      name,
      phone,
      profileImage,
      coverImage,
      username,
      bio,
      location,
      website,
      interests,
      privacy,
    } = body;
    if (
      interests !== undefined &&
      (!Array.isArray(interests) ||
        interests.some((interest) => typeof interest !== "string"))
    )
      throw new HttpError(
        400,
        "interests must be an array of strings.",
        "VALIDATION_ERROR",
      );
    if (
      privacy !== undefined &&
      !["public", "followers", "private"].includes(privacy)
    )
      throw new HttpError(400, "privacy is invalid.", "VALIDATION_ERROR");

    const updatedUser = await updateProfile(
      new Types.ObjectId(session.user.id),
      {
        name,
        phone,
        profileImage,
        coverImage,
        username,
        bio,
        location,
        website,
        interests,
        privacy,
      },
    );
    if (!updatedUser) throw new HttpError(404, "User not found.", "NOT_FOUND");

    return NextResponse.json({ success: true, data: updatedUser });
  } catch (error) {
    if (error instanceof HttpError) {
      return NextResponse.json(
        { success: false, error: { message: error.message, code: error.code } },
        { status: error.statusCode },
      );
    }
    console.error("Update profile failed:", error);
    return NextResponse.json(
      { success: false, error: { message: "Unable to update profile." } },
      { status: 500 },
    );
  }
}
