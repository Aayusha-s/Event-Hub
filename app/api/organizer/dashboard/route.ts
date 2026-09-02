import { NextResponse } from "next/server";
import { requireRole } from "@/middleware/auth/requireRole";
import { getOrganizerDashboard } from "@/services/dashboard/dashboard.service";
import { HttpError } from "@/utils/api/httpError";

export async function GET() {
  try {
    const session = await requireRole(["organizer", "admin"]);
    const data = await getOrganizerDashboard(session.user.id);
    return NextResponse.json({ success: true, data });
  } catch (error) {
    if (error instanceof HttpError) {
      return NextResponse.json(
        { success: false, error: { message: error.message, code: error.code } },
        { status: error.statusCode },
      );
    }
    console.error("Fetch organizer dashboard failed:", error);
    return NextResponse.json(
      {
        success: false,
        error: { message: "Unable to fetch organizer dashboard statistics." },
      },
      { status: 500 },
    );
  }
}
