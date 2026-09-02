import { NextResponse } from "next/server";
import { requireRole } from "@/middleware/auth/requireRole";
import { getVendorDashboard } from "@/services/vendors/vendor.service";
import { HttpError } from "@/utils/api/httpError";

export async function GET() {
  try {
    const session = await requireRole(["vendor"]);
    const data = await getVendorDashboard(session.user.id);
    return NextResponse.json({ success: true, data });
  } catch (error) {
    if (error instanceof HttpError) {
      return NextResponse.json(
        { success: false, error: { message: error.message, code: error.code } },
        { status: error.statusCode },
      );
    }
    console.error("Vendor dashboard failed:", error);
    return NextResponse.json(
      {
        success: false,
        error: { message: "Unable to fetch vendor dashboard." },
      },
      { status: 500 },
    );
  }
}
