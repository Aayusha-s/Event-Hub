import { NextResponse } from "next/server";
import { Types } from "mongoose";
import { requireRole } from "@/middleware/auth/requireRole";
import UserSettings from "@/models/UserSettings";
const roles = [
  "attendee",
  "organizer",
  "vendor",
  "ticket_checker",
  "admin",
] as const;
export async function GET() {
  try {
    const session = await requireRole([...roles]);
    const settings = await UserSettings.findOneAndUpdate(
      { user: new Types.ObjectId(session.user.id) },
      { $setOnInsert: { user: session.user.id } },
      { new: true, upsert: true, setDefaultsOnInsert: true },
    );
    return NextResponse.json({ success: true, data: settings });
  } catch {
    return NextResponse.json(
      { success: false, error: { message: "Unable to load settings." } },
      { status: 500 },
    );
  }
}
export async function PUT(request: Request) {
  try {
    const session = await requireRole([...roles]);
    const body = await request.json();
    const allowed = [
      "notifications",
      "privacy",
      "appearance",
      "twoFactorEnabled",
    ];
    const update = Object.fromEntries(
      Object.entries(body).filter(([key]) => allowed.includes(key)),
    );
    const settings = await UserSettings.findOneAndUpdate(
      { user: session.user.id },
      { $set: update, $setOnInsert: { user: session.user.id } },
      {
        new: true,
        upsert: true,
        runValidators: true,
        setDefaultsOnInsert: true,
      },
    );
    return NextResponse.json({ success: true, data: settings });
  } catch {
    return NextResponse.json(
      { success: false, error: { message: "Unable to save settings." } },
      { status: 500 },
    );
  }
}
