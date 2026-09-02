import { NextResponse } from "next/server";
import { requireRole } from "@/middleware/auth/requireRole";
import { getAdminDashboard } from "@/services/dashboard/dashboard.service";
import { HttpError } from "@/utils/api/httpError";

export async function GET() {
  try {
    await requireRole(["admin"]);
    const data = await getAdminDashboard();
    return NextResponse.json({ success: true, data });
  } catch (error) {
    if (error instanceof HttpError) {
      return NextResponse.json(
        { success: false, error: { message: error.message, code: error.code } },
        { status: error.statusCode },
      );
    }
    console.error("Fetch admin dashboard failed:", error);
    return NextResponse.json(
      {
        success: false,
        error: { message: "Unable to fetch admin dashboard." },
      },
      { status: 500 },
    );
  }
}
