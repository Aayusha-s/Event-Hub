import { NextResponse } from "next/server";
import mongoose, { Types } from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import dbConnect from "@/lib/mongodb";
import { requireRole } from "@/middleware/auth/requireRole";
import { HttpError } from "@/utils/api/httpError";
import { deleteEvent, duplicateEvent, findEventForManagement, getEventById, updateEvent, updateEventStatus } from "@/services/events/event.service";
import { validateEventUpdateInput } from "@/utils/events/validation";

type RouteContext = { params: Promise<{ id: string }> };

const errorResponse = (error: unknown) => {
	if (error instanceof HttpError) {
		return NextResponse.json({ success: false, error: { message: error.message, code: error.code, details: error.details } }, { status: error.statusCode });
	}
	if (error instanceof SyntaxError || error instanceof mongoose.Error.ValidationError) {
		return NextResponse.json({ success: false, error: { message: error.message, code: "VALIDATION_ERROR" } }, { status: 400 });
	}
	console.error("Event request failed:", error);
	return NextResponse.json({ success: false, error: { message: "Unable to process event request." } }, { status: 500 });
};

const getObjectId = (id: string) => {
	if (!Types.ObjectId.isValid(id)) throw new HttpError(400, "Event id is invalid.", "INVALID_ID");
	return new Types.ObjectId(id);
};

const assertCanManage = (organizerId: Types.ObjectId, userId: string, role: string) => {
	if (role !== "admin" && organizerId.toString() !== userId) {
		throw new HttpError(403, "You can only manage your own events.", "FORBIDDEN");
	}
};

export async function GET(_request: Request, context: RouteContext) {
	try {
		const { id } = await context.params;
		await dbConnect();
		const eventId = getObjectId(id);
		const session = await getServerSession(authOptions);
		const canViewUnapproved = session?.user?.id && ["organizer", "admin"].includes(session.user.role)
			? await findEventForManagement(eventId).then((candidate) => candidate && (session.user.role === "admin" || candidate.organizer.toString() === session.user.id))
			: false;
		const event = await getEventById(eventId, Boolean(canViewUnapproved));
		if (!event) throw new HttpError(404, "Event not found.", "NOT_FOUND");
		return NextResponse.json({ success: true, data: event });
	} catch (error) {
		return errorResponse(error);
	}
}

export async function PUT(request: Request, context: RouteContext) {
	try {
		const session = await requireRole(["organizer", "admin"]);
		const { id } = await context.params;
		const body = await request.json();
		await dbConnect();
		const event = await findEventForManagement(getObjectId(id));
		if (!event) throw new HttpError(404, "Event not found.", "NOT_FOUND");
		assertCanManage(event.organizer, session.user.id, session.user.role);
		if (typeof body.action === "string") {
			if (session.user.role !== "admin" && ["published", "unpublish"].includes(body.action)) {
				throw new HttpError(403, "Only an administrator can publish or unpublish an event through approval.", "FORBIDDEN");
			}
			if (["draft", "published", "cancelled", "completed"].includes(body.action)) {
				const updated = await updateEventStatus(event, body.action);
				return NextResponse.json({ success: true, data: updated });
			}
			if (body.action === "archive") {
				const updated = await updateEventStatus(event, "completed");
				return NextResponse.json({ success: true, data: updated });
			}
			if (body.action === "unpublish") {
				const updated = await updateEventStatus(event, "draft");
				return NextResponse.json({ success: true, data: updated });
			}
		}
		const input = validateEventUpdateInput(body);
		const updatedEvent = await updateEvent(event, input);
		return NextResponse.json({ success: true, data: updatedEvent });
	} catch (error) {
		return errorResponse(error);
	}
}

export async function POST(request: Request, context: RouteContext) {
	try {
		const session = await requireRole(["organizer", "admin"]);
		const { id } = await context.params;
		const body = await request.json();
		await dbConnect();
		const event = await findEventForManagement(getObjectId(id));
		if (!event) throw new HttpError(404, "Event not found.", "NOT_FOUND");
		assertCanManage(event.organizer, session.user.id, session.user.role);
		if (body.action !== "duplicate") throw new HttpError(400, "Invalid event action.", "VALIDATION_ERROR");
		const duplicated = await duplicateEvent(event, new Types.ObjectId(session.user.id));
		return NextResponse.json({ success: true, data: duplicated }, { status: 201 });
	} catch (error) {
		return errorResponse(error);
	}
}

export async function DELETE(_request: Request, context: RouteContext) {
	try {
		const session = await requireRole(["organizer", "admin"]);
		const { id } = await context.params;
		await dbConnect();
		const event = await findEventForManagement(getObjectId(id));
		if (!event) throw new HttpError(404, "Event not found.", "NOT_FOUND");
		assertCanManage(event.organizer, session.user.id, session.user.role);
		await deleteEvent(event);
		return NextResponse.json({ success: true, data: { message: "Event deleted successfully." } });
	} catch (error) {
		return errorResponse(error);
	}
}
