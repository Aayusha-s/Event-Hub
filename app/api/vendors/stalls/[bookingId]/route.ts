import { NextResponse } from "next/server";
import { requireRole } from "@/middleware/auth/requireRole";
import { cancelStallBooking } from "@/services/vendors/vendor.service";
import { HttpError } from "@/utils/api/httpError";

type RouteContext = { params: Promise<{ bookingId: string }> };

export async function DELETE(_request: Request, context: RouteContext) {
	try {
		const session = await requireRole(["vendor", "admin"]);
		const { bookingId } = await context.params;

		const vendor = await cancelStallBooking(session.user.id, bookingId);
		return NextResponse.json({ success: true, data: vendor });
	} catch (error) {
		if (error instanceof HttpError) {
			return NextResponse.json({ success: false, error: { message: error.message, code: error.code } }, { status: error.statusCode });
		}
		console.error("Cancel stall booking failed:", error);
		return NextResponse.json({ success: false, error: { message: "Unable to cancel stall booking." } }, { status: 500 });
	}
}
