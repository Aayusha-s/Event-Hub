import { NextResponse } from "next/server";
import { requireRole } from "@/middleware/auth/requireRole";
import { processCheckIn } from "@/services/checkin/checkin.service";
import { HttpError } from "@/utils/api/httpError";

export async function POST(request: Request) {
	try {
		const session = await requireRole(["ticket_checker", "organizer", "admin"]);
		const body = await request.json();
		const { ticketNumber, qrCode, identifier } = body;

		const tokenToVerify = identifier || ticketNumber || qrCode;
		if (!tokenToVerify || typeof tokenToVerify !== "string") {
			throw new HttpError(400, "ticketNumber or qrCode identifier is required.", "VALIDATION_ERROR");
		}

		const result = await processCheckIn(tokenToVerify.trim(), session.user.id);
		return NextResponse.json({ success: true, data: result });
	} catch (error) {
		if (error instanceof HttpError) {
			return NextResponse.json({ success: false, error: { message: error.message, code: error.code } }, { status: error.statusCode });
		}
		console.error("Check-in failed:", error);
		return NextResponse.json({ success: false, error: { message: "Unable to process check-in." } }, { status: 500 });
	}
}
