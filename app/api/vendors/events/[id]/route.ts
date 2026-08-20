import { NextResponse } from "next/server";
import { requireRole } from "@/middleware/auth/requireRole";
import { getVendorAssignedEvent } from "@/services/vendors/vendor.service";
import { HttpError } from "@/utils/api/httpError";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_request: Request, context: RouteContext) {
	try {
		const session = await requireRole(["vendor"]);
		const { id } = await context.params;
		return NextResponse.json({ success: true, data: await getVendorAssignedEvent(session.user.id, id) });
	} catch (error) {
		if (error instanceof HttpError) return NextResponse.json({ success: false, error: { message: error.message, code: error.code } }, { status: error.statusCode });
		console.error("Vendor event request failed:", error);
		return NextResponse.json({ success: false, error: { message: "Unable to fetch assigned event." } }, { status: 500 });
	}
}
