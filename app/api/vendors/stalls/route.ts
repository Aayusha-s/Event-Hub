import { NextResponse } from "next/server";
import mongoose, { Types } from "mongoose";
import { requireRole } from "@/middleware/auth/requireRole";
import { bookStall } from "@/services/vendors/vendor.service";
import { HttpError } from "@/utils/api/httpError";

export async function POST(request: Request) {
	try {
		const session = await requireRole(["vendor"]);
		const body = await request.json();
		const { eventId, stallName, description, stallType, size, bookingFee } = body;

		if (typeof eventId !== "string" || !Types.ObjectId.isValid(eventId)) throw new HttpError(400, "The selected event id is invalid.", "INVALID_EVENT_ID");
		if (typeof eventId !== "string" || !eventId || typeof stallName !== "string" || stallName.trim().length < 2 || typeof description !== "string" || description.trim().length < 10 || typeof stallType !== "string" || stallType.trim().length < 2 || typeof size !== "string" || !size.trim() || typeof bookingFee !== "number" || !Number.isFinite(bookingFee) || bookingFee < 0) throw new HttpError(400, "Please provide valid stall details.", "VALIDATION_ERROR");

		const vendor = await bookStall(session.user.id, { eventId, stallName: stallName.trim(), description: description.trim(), stallType: stallType.trim(), size: size.trim(), bookingFee });
		return NextResponse.json({ success: true, data: vendor }, { status: 201 });
	} catch (error) {
		if (error instanceof HttpError) {
			return NextResponse.json({ success: false, error: { message: error.message, code: error.code } }, { status: error.statusCode });
		}
		if (error instanceof mongoose.Error.ValidationError || error instanceof mongoose.Error.CastError) {
			return NextResponse.json({ success: false, error: { message: error.message, code: "VALIDATION_ERROR" } }, { status: 400 });
		}
		console.error("Book stall failed:", error);
		return NextResponse.json({ success: false, error: { message: "Unable to book stall." } }, { status: 500 });
	}
}
