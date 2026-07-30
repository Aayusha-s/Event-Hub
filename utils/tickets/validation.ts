import { Types } from "mongoose";
import { HttpError } from "@/utils/api/httpError";

export type BookTicketInput = {
	eventId: Types.ObjectId;
	ticketType: string;
};

export const validateBookTicketInput = (value: unknown): BookTicketInput => {
	if (!value || typeof value !== "object" || Array.isArray(value)) {
		throw new HttpError(400, "Request body must be a JSON object.", "INVALID_BODY");
	}

	const payload = value as Record<string, unknown>;
	if (typeof payload.eventId !== "string" || !Types.ObjectId.isValid(payload.eventId)) {
		throw new HttpError(400, "eventId must be a valid event id.", "VALIDATION_ERROR");
	}
	if (typeof payload.ticketType !== "string" || !payload.ticketType.trim() || payload.ticketType.trim().length > 100) {
		throw new HttpError(400, "ticketType is invalid.", "VALIDATION_ERROR");
	}

	return { eventId: new Types.ObjectId(payload.eventId), ticketType: payload.ticketType.trim() };
};
