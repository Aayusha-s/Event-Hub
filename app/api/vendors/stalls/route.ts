import { NextResponse } from "next/server";
import { requireRole } from "@/middleware/auth/requireRole";
import { bookStall } from "@/services/vendors/vendor.service";
import { HttpError } from "@/utils/api/httpError";

export async function POST(request: Request) {
	try {
		const session = await requireRole(["vendor", "admin"]);
		const body = await request.json();
		const { eventId, stallName } = body;

		if (!eventId) {
			throw new HttpError(400, "eventId is required for stall booking.", "VALIDATION_ERROR");
		}

		const vendor = await bookStall(session.user.id, eventId, stallName);
		return NextResponse.json({ success: true, data: vendor }, { status: 201 });
	} catch (error) {
		if (error instanceof HttpError) {
			return NextResponse.json({ success: false, error: { message: error.message, code: error.code } }, { status: error.statusCode });
		}
		console.error("Book stall failed:", error);
		return NextResponse.json({ success: false, error: { message: "Unable to book stall." } }, { status: 500 });
	}
}
