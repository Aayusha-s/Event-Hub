import { ITicketType } from "@/models/Event";
import { HttpError } from "@/utils/api/httpError";

export type EventStatus = "draft" | "published" | "cancelled" | "completed";

export type EventInput = {
	title: string;
	description: string;
	venue: string;
	latitude: number;
	longitude: number;
	category: string;
	images: string[];
	startDate: Date;
	endDate: Date;
	ticketTypes: ITicketType[];
	capacity: number;
	status?: EventStatus;
	featured?: boolean;
	tags?: string[];
};

const eventStatuses: EventStatus[] = ["draft", "published", "cancelled", "completed"];

const asPayload = (value: unknown): Record<string, unknown> => {
	if (!value || typeof value !== "object" || Array.isArray(value)) {
		throw new HttpError(400, "Request body must be a JSON object.", "INVALID_BODY");
	}
	return value as Record<string, unknown>;
};

const requiredString = (payload: Record<string, unknown>, key: string, min: number, max: number) => {
	const value = payload[key];
	if (typeof value !== "string" || !value.trim() || value.trim().length < min || value.trim().length > max) {
		throw new HttpError(400, `${key} must be between ${min} and ${max} characters.`, "VALIDATION_ERROR");
	}
	return value.trim();
};

const numberValue = (value: unknown, field: string, min: number, max: number, integer = false) => {
	if (typeof value !== "number" || !Number.isFinite(value) || value < min || value > max || (integer && !Number.isInteger(value))) {
		throw new HttpError(400, `${field} is invalid.`, "VALIDATION_ERROR");
	}
	return value;
};

const dateValue = (value: unknown, field: string) => {
	if (typeof value !== "string" && !(value instanceof Date)) {
		throw new HttpError(400, `${field} must be a valid ISO date.`, "VALIDATION_ERROR");
	}
	const date = new Date(value);
	if (Number.isNaN(date.getTime())) {
		throw new HttpError(400, `${field} must be a valid ISO date.`, "VALIDATION_ERROR");
	}
	return date;
};

const isImageUrl = (value: string) => {
	try {
		const url = new URL(value);
		return url.protocol === "http:" || url.protocol === "https:";
	} catch {
		return false;
	}
};

const imageUrls = (value: unknown) => {
	if (!Array.isArray(value) || value.length === 0 || value.length > 10 || value.some((url) => typeof url !== "string" || url.length > 500 || !isImageUrl(url))) {
		throw new HttpError(400, "images must contain between 1 and 10 valid HTTP(S) image URLs.", "VALIDATION_ERROR");
	}
	return value.map((url) => url.trim());
};

const ticketTypes = (value: unknown): ITicketType[] => {
	if (!Array.isArray(value) || value.length === 0 || value.length > 20) {
		throw new HttpError(400, "ticketTypes must contain between 1 and 20 ticket types.", "VALIDATION_ERROR");
	}

	return value.map((ticket, index) => {
		if (!ticket || typeof ticket !== "object" || Array.isArray(ticket)) {
			throw new HttpError(400, `ticketTypes[${index}] is invalid.`, "VALIDATION_ERROR");
		}
		const input = ticket as Record<string, unknown>;
		const description = input.description;
		if (description !== undefined && (typeof description !== "string" || description.trim().length > 500)) {
			throw new HttpError(400, `ticketTypes[${index}].description is invalid.`, "VALIDATION_ERROR");
		}
		return {
			name: requiredString(input, "name", 1, 100),
			price: numberValue(input.price, `ticketTypes[${index}].price`, 0, Number.MAX_SAFE_INTEGER),
			quantity: numberValue(input.quantity, `ticketTypes[${index}].quantity`, 1, Number.MAX_SAFE_INTEGER, true),
			description: typeof description === "string" ? description.trim() : undefined,
		};
	});
};

const tags = (value: unknown) => {
	if (!Array.isArray(value) || value.length > 20 || value.some((tag) => typeof tag !== "string" || !tag.trim() || tag.trim().length > 50)) {
		throw new HttpError(400, "tags must be an array of up to 20 non-empty tags.", "VALIDATION_ERROR");
	}
	return [...new Set(value.map((tag) => tag.trim()))];
};

export const validateEventCreateInput = (value: unknown): EventInput => {
	const payload = asPayload(value);
	const startDate = dateValue(payload.startDate, "startDate");
	const endDate = dateValue(payload.endDate, "endDate");
	if (endDate <= startDate) {
		throw new HttpError(400, "endDate must be after startDate.", "VALIDATION_ERROR");
	}
	if (payload.status !== undefined && (typeof payload.status !== "string" || !eventStatuses.includes(payload.status as EventStatus))) {
		throw new HttpError(400, "status is invalid.", "VALIDATION_ERROR");
	}
	if (payload.featured !== undefined && typeof payload.featured !== "boolean") {
		throw new HttpError(400, "featured must be a boolean.", "VALIDATION_ERROR");
	}

	return {
		title: requiredString(payload, "title", 3, 200),
		description: requiredString(payload, "description", 10, 5000),
		venue: requiredString(payload, "venue", 1, 300),
		latitude: numberValue(payload.latitude, "latitude", -90, 90),
		longitude: numberValue(payload.longitude, "longitude", -180, 180),
		category: requiredString(payload, "category", 1, 100),
		images: imageUrls(payload.images),
		startDate,
		endDate,
		ticketTypes: ticketTypes(payload.ticketTypes),
		capacity: numberValue(payload.capacity, "capacity", 1, Number.MAX_SAFE_INTEGER, true),
		status: payload.status as EventStatus | undefined,
		featured: payload.featured as boolean | undefined,
		tags: payload.tags === undefined ? [] : tags(payload.tags),
	};
};

export const validateEventUpdateInput = (value: unknown): Partial<EventInput> => {
	const payload = asPayload(value);
	const allowedFields = ["title", "description", "venue", "latitude", "longitude", "category", "images", "startDate", "endDate", "ticketTypes", "capacity", "status", "featured", "tags"];
	const updates: Record<string, unknown> = {};

	for (const field of Object.keys(payload)) {
		if (!allowedFields.includes(field)) {
			throw new HttpError(400, `${field} cannot be updated.`, "VALIDATION_ERROR");
		}
	}

	if (payload.title !== undefined) updates.title = requiredString(payload, "title", 3, 200);
	if (payload.description !== undefined) updates.description = requiredString(payload, "description", 10, 5000);
	if (payload.venue !== undefined) updates.venue = requiredString(payload, "venue", 1, 300);
	if (payload.latitude !== undefined) updates.latitude = numberValue(payload.latitude, "latitude", -90, 90);
	if (payload.longitude !== undefined) updates.longitude = numberValue(payload.longitude, "longitude", -180, 180);
	if (payload.category !== undefined) updates.category = requiredString(payload, "category", 1, 100);
	if (payload.images !== undefined) updates.images = imageUrls(payload.images);
	if (payload.startDate !== undefined) updates.startDate = dateValue(payload.startDate, "startDate");
	if (payload.endDate !== undefined) updates.endDate = dateValue(payload.endDate, "endDate");
	if (payload.ticketTypes !== undefined) updates.ticketTypes = ticketTypes(payload.ticketTypes);
	if (payload.capacity !== undefined) updates.capacity = numberValue(payload.capacity, "capacity", 1, Number.MAX_SAFE_INTEGER, true);
	if (payload.tags !== undefined) updates.tags = tags(payload.tags);
	if (payload.status !== undefined) {
		if (typeof payload.status !== "string" || !eventStatuses.includes(payload.status as EventStatus)) {
			throw new HttpError(400, "status is invalid.", "VALIDATION_ERROR");
		}
		updates.status = payload.status;
	}
	if (payload.featured !== undefined) {
		if (typeof payload.featured !== "boolean") throw new HttpError(400, "featured must be a boolean.", "VALIDATION_ERROR");
		updates.featured = payload.featured;
	}

	if (Object.keys(updates).length === 0) {
		throw new HttpError(400, "Provide at least one event field to update.", "VALIDATION_ERROR");
	}

	return updates as Partial<EventInput>;
};
