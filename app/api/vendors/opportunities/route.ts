import { NextResponse } from "next/server";
import { requireRole } from "@/middleware/auth/requireRole";
import { listVendorStallOpportunities } from "@/services/vendors/vendor.service";
import { HttpError } from "@/utils/api/httpError";

export async function GET() {
	try {
		const session = await requireRole(["vendor"]);
		return NextResponse.json({ success: true, data: await listVendorStallOpportunities(session.user.id) });
	} catch (error) {
		if (error instanceof HttpError) return NextResponse.json({ success: false, error: { message: error.message, code: error.code } }, { status: error.statusCode });
		console.error("Vendor opportunities request failed:", error);
		return NextResponse.json({ success: false, error: { message: "Unable to load stall opportunities." } }, { status: 500 });
	}
}
