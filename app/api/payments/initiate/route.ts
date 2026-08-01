import { NextResponse } from "next/server";
import { requireRole } from "@/middleware/auth/requireRole";
import { initiatePayment } from "@/services/payments/payment.service";
import { HttpError } from "@/utils/api/httpError";

export async function POST(request: Request) {
	try {
		const session = await requireRole(["attendee", "organizer", "vendor", "ticket_checker", "admin"]);
		const body = await request.json();
		const { bookingId, paymentMethod } = body;

		if (!bookingId || paymentMethod !== "esewa") {
			throw new HttpError(400, "bookingId and eSewa paymentMethod are required.", "VALIDATION_ERROR");
		}

		const result = await initiatePayment(session.user.id, { bookingId, paymentMethod });
		return NextResponse.json({ success: true, data: result }, { status: 201 });
	} catch (error) {
		if (error instanceof HttpError) {
			return NextResponse.json({ success: false, error: { message: error.message, code: error.code } }, { status: error.statusCode });
		}
		console.error("Initiate payment failed:", error);
		return NextResponse.json({ success: false, error: { message: "Unable to initiate payment." } }, { status: 500 });
	}
}
