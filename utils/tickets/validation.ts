import { Types } from "mongoose";
import { HttpError } from "@/utils/api/httpError";

export type BookTicketInput = {
	eventId: Types.ObjectId;
	items: { ticketType: string; quantity: number }[];
};

export const validateBookTicketInput = (value: unknown): BookTicketInput => {
	if (!value || typeof value !== "object" || Array.isArray(value)) {
		throw new HttpError(400, "Request body must be a JSON object.", "INVALID_BODY");
	}

	const payload = value as Record<string, unknown>;
	if (typeof payload.eventId !== "string" || !Types.ObjectId.isValid(payload.eventId)) {
		throw new HttpError(400, "eventId must be a valid event id.", "VALIDATION_ERROR");
	}
	if (!Array.isArray(payload.items) || payload.items.length === 0 || payload.items.length > 20) throw new HttpError(400, "items must include one or more ticket selections.", "VALIDATION_ERROR");
	const seen = new Set<string>();
	const items = payload.items.map((item, index) => {
		if (!item || typeof item !== "object" || Array.isArray(item)) throw new HttpError(400, `items[${index}] is invalid.`, "VALIDATION_ERROR");
		const entry = item as Record<string, unknown>;
		if (typeof entry.ticketType !== "string" || !entry.ticketType.trim() || entry.ticketType.trim().length > 100) throw new HttpError(400, `items[${index}].ticketType is invalid.`, "VALIDATION_ERROR");
		if (typeof entry.quantity !== "number" || !Number.isInteger(entry.quantity) || entry.quantity < 1 || entry.quantity > 20) throw new HttpError(400, `items[${index}].quantity must be between 1 and 20.`, "VALIDATION_ERROR");
		const ticketType = entry.ticketType.trim();
		if (seen.has(ticketType)) throw new HttpError(400, "Each ticket type may be selected once.", "VALIDATION_ERROR");
		seen.add(ticketType);
		return { ticketType, quantity: entry.quantity };
	});
	return { eventId: new Types.ObjectId(payload.eventId), items };
};
