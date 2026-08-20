import { NextResponse } from "next/server";
import { Types } from "mongoose";
import { requireRole } from "@/middleware/auth/requireRole";
import { findEventForManagement, updateEvent, updateEventApprovalStatus } from "@/services/events/event.service";
import { HttpError } from "@/utils/api/httpError";
import { validateEventUpdateInput } from "@/utils/events/validation";

type RouteContext = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, context: RouteContext) {
	try {
		await requireRole(["admin"]);
		const { id } = await context.params;
		if (!Types.ObjectId.isValid(id)) throw new HttpError(400, "Invalid event id.", "INVALID_ID");

		const body = await request.json();

		const event = await findEventForManagement(new Types.ObjectId(id));
		if (!event) throw new HttpError(404, "Event not found.", "NOT_FOUND");
		if (body.approvalStatus !== undefined) {
			if (body.approvalStatus !== "approved" && body.approvalStatus !== "rejected") throw new HttpError(400, "approvalStatus must be approved or rejected.", "VALIDATION_ERROR");
			return NextResponse.json({ success: true, data: await updateEventApprovalStatus(event, body.approvalStatus) });
		}
		const input = validateEventUpdateInput(body);

		const updated = await updateEvent(event, input);
		return NextResponse.json({ success: true, data: updated });
	} catch (error) {
		if (error instanceof HttpError) {
			return NextResponse.json({ success: false, error: { message: error.message, code: error.code } }, { status: error.statusCode });
		}
		console.error("Admin update event failed:", error);
		return NextResponse.json({ success: false, error: { message: "Unable to update event status." } }, { status: 500 });
	}
}
