import { NextResponse } from "next/server";
import { requireRole } from "@/middleware/auth/requireRole";
import { getUserNotifications, markAllNotificationsAsRead } from "@/services/notifications/notification.service";
import { HttpError } from "@/utils/api/httpError";

const errorResponse = (error: unknown) => {
	if (error instanceof HttpError) {
		return NextResponse.json({ success: false, error: { message: error.message, code: error.code } }, { status: error.statusCode });
	}
	console.error("Notifications request failed:", error);
	return NextResponse.json({ success: false, error: { message: "Unable to process notifications request." } }, { status: 500 });
};

export async function GET(request: Request) {
	try {
		const session = await requireRole(["attendee", "organizer", "vendor", "ticket_checker", "admin"]);
		const { searchParams } = new URL(request.url);
		const page = Math.max(1, parseInt(searchParams.get("page") ?? "1", 10));
		const pageSize = Math.min(100, Math.max(1, parseInt(searchParams.get("pageSize") ?? "20", 10)));

		const result = await getUserNotifications(session.user.id, page, pageSize);
		return NextResponse.json({ success: true, data: result });
	} catch (error) {
		return errorResponse(error);
	}
}

export async function PATCH() {
	try {
		const session = await requireRole(["attendee", "organizer", "vendor", "ticket_checker", "admin"]);
		const result = await markAllNotificationsAsRead(session.user.id);
		return NextResponse.json({ success: true, data: result });
	} catch (error) {
		return errorResponse(error);
	}
}
