import { NextResponse } from "next/server";
import { requireRole } from "@/middleware/auth/requireRole";
import { getVendorAssignedEvents } from "@/services/vendors/vendor.service";
import { HttpError } from "@/utils/api/httpError";

export async function GET() {
	try {
		const session = await requireRole(["vendor"]);
		return NextResponse.json({ success: true, data: await getVendorAssignedEvents(session.user.id) });
	} catch (error) {
		if (error instanceof HttpError) return NextResponse.json({ success: false, error: { message: error.message, code: error.code } }, { status: error.statusCode });
		console.error("Vendor events request failed:", error);
		return NextResponse.json({ success: false, error: { message: "Unable to fetch assigned events." } }, { status: 500 });
	}
}
