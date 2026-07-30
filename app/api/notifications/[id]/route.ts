import { NextResponse } from "next/server";
import { Types } from "mongoose";
import { requireRole } from "@/middleware/auth/requireRole";
import { markNotificationAsRead } from "@/services/notifications/notification.service";
import { HttpError } from "@/utils/api/httpError";

type RouteContext = { params: Promise<{ id: string }> };

export async function PATCH(_request: Request, context: RouteContext) {
	try {
		const session = await requireRole(["attendee", "organizer", "vendor", "ticket_checker", "admin"]);
		const { id } = await context.params;
		if (!Types.ObjectId.isValid(id)) throw new HttpError(400, "Invalid notification id.", "INVALID_ID");

		const updated = await markNotificationAsRead(id, session.user.id);
		if (!updated) throw new HttpError(404, "Notification not found.", "NOT_FOUND");

		return NextResponse.json({ success: true, data: updated });
	} catch (error) {
		if (error instanceof HttpError) {
			return NextResponse.json({ success: false, error: { message: error.message, code: error.code } }, { status: error.statusCode });
		}
		console.error("Mark notification read failed:", error);
		return NextResponse.json({ success: false, error: { message: "Unable to update notification." } }, { status: 500 });
	}
}
