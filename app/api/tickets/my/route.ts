import { NextResponse } from "next/server";
import { Types } from "mongoose";
import { requireRole } from "@/middleware/auth/requireRole";
import { getMyTickets } from "@/services/tickets/ticket.service";
import { HttpError } from "@/utils/api/httpError";

export async function GET() {
	try {
		const session = await requireRole(["attendee", "organizer", "vendor", "ticket_checker", "admin"]);
		const tickets = await getMyTickets(new Types.ObjectId(session.user.id));
		return NextResponse.json({ success: true, data: { items: tickets, total: tickets.length } });
	} catch (error) {
		if (error instanceof HttpError) {
			return NextResponse.json({ success: false, error: { message: error.message, code: error.code } }, { status: error.statusCode });
		}
		console.error("Fetching tickets failed:", error);
		return NextResponse.json({ success: false, error: { message: "Unable to fetch tickets." } }, { status: 500 });
	}
}
