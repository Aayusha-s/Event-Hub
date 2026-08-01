import { NextResponse } from "next/server";
import mongoose, { Types } from "mongoose";
import dbConnect from "@/lib/mongodb";
import { requireRole } from "@/middleware/auth/requireRole";
import { HttpError } from "@/utils/api/httpError";
import { createEvent, listEvents } from "@/services/events/event.service";
import { EventStatus, validateEventCreateInput } from "@/utils/events/validation";

const eventStatuses: EventStatus[] = ["draft", "published", "cancelled", "completed"];

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

const parsePositiveInteger = (value: string | null, defaultValue: number, field: string, max: number) => {
	if (value === null) return defaultValue;
	if (!/^\d+$/.test(value)) throw new HttpError(400, `${field} must be a positive integer.`, "VALIDATION_ERROR");
	const parsed = Number(value);
	if (parsed < 1 || parsed > max) throw new HttpError(400, `${field} must be between 1 and ${max}.`, "VALIDATION_ERROR");
	return parsed;
};

const parseDate = (value: string | null, field: string, endOfDay = false) => {
	if (!value) return undefined;
	const date = new Date(value);
	if (Number.isNaN(date.getTime())) throw new HttpError(400, `${field} must be a valid date.`, "VALIDATION_ERROR");
	if (endOfDay && /^\d{4}-\d{2}-\d{2}$/.test(value)) date.setUTCHours(23, 59, 59, 999);
	return date;
};

export async function GET(request: Request) {
	try {
		const { searchParams } = new URL(request.url);
		const organizer = searchParams.get("organizer");
		const featured = searchParams.get("featured");
		const status = searchParams.get("status");
		const dateFrom = parseDate(searchParams.get("dateFrom") ?? searchParams.get("date"), "dateFrom");
		const dateTo = parseDate(searchParams.get("dateTo") ?? searchParams.get("date"), "dateTo", true);

		if (organizer && !Types.ObjectId.isValid(organizer)) throw new HttpError(400, "organizer must be a valid id.", "VALIDATION_ERROR");
		if (featured !== null && featured !== "true" && featured !== "false") throw new HttpError(400, "featured must be true or false.", "VALIDATION_ERROR");
		if (status && !eventStatuses.includes(status as EventStatus)) throw new HttpError(400, "status is invalid.", "VALIDATION_ERROR");
		if (dateFrom && dateTo && dateTo < dateFrom) throw new HttpError(400, "dateTo must be after dateFrom.", "VALIDATION_ERROR");

		await dbConnect();
		const page = parsePositiveInteger(searchParams.get("page"), 1, "page", Number.MAX_SAFE_INTEGER);
		const pageSize = parsePositiveInteger(searchParams.get("pageSize") ?? searchParams.get("limit"), 12, "pageSize", 100);
		const search = searchParams.get("search")?.trim();
		if (search && search.length > 100) throw new HttpError(400, "search must not exceed 100 characters.", "VALIDATION_ERROR");
		const category = searchParams.get("category")?.trim();
		const tags = searchParams.get("tags")?.split(",").map((tag) => tag.trim()).filter(Boolean);
		const location = searchParams.get("location")?.trim() || searchParams.get("filterLocation")?.trim();
		const parsePrice = (value: string | null, field: string) => { if (!value) return undefined; const parsed = Number(value); if (!Number.isFinite(parsed) || parsed < 0) throw new HttpError(400, `${field} must be a non-negative number.`, "VALIDATION_ERROR"); return parsed; };
		const priceMin = parsePrice(searchParams.get("priceMin"), "priceMin"); const priceMax = parsePrice(searchParams.get("priceMax"), "priceMax");
		const sort = searchParams.get("sort") as "newest" | "oldest" | "trending" | "popular" | "rating" | "priceAsc" | "priceDesc" | null;
		const rating = parsePrice(searchParams.get("rating"), "rating"); const availability = searchParams.get("availability") as "available" | "soldOut" | null;
		const booleanParam = (name: string) => { const value = searchParams.get(name); if (value === null) return undefined; if (value !== "true" && value !== "false") throw new HttpError(400, `${name} must be true or false.`, "VALIDATION_ERROR"); return value === "true"; };
		const free = booleanParam("free"); const online = booleanParam("online");
		const parseCoordinate = (name: "lat" | "lng") => { const value = searchParams.get(name); if (!value) return undefined; const number = Number(value); if (!Number.isFinite(number)) throw new HttpError(400, `${name} must be numeric.`, "VALIDATION_ERROR"); return number; };
		const latitude = parseCoordinate("lat"), longitude = parseCoordinate("lng"), distanceKm = parsePrice(searchParams.get("distanceKm"), "distanceKm");
		const timeFrom = searchParams.get("timeFrom") ?? undefined, timeTo = searchParams.get("timeTo") ?? undefined;
		if (category && category.length > 100) throw new HttpError(400, "category must not exceed 100 characters.", "VALIDATION_ERROR");
		if (priceMin !== undefined && priceMax !== undefined && priceMax < priceMin) throw new HttpError(400, "priceMax must be greater than priceMin.", "VALIDATION_ERROR");
		if (sort && !["newest","oldest","trending","popular","rating","priceAsc","priceDesc"].includes(sort)) throw new HttpError(400, "sort is invalid.", "VALIDATION_ERROR");
		if (availability && availability !== "available" && availability !== "soldOut") throw new HttpError(400, "availability is invalid.", "VALIDATION_ERROR");
		if ((latitude === undefined) !== (longitude === undefined)) throw new HttpError(400, "lat and lng must be supplied together.", "VALIDATION_ERROR");
		if ((timeFrom && !/^\d{2}:\d{2}$/.test(timeFrom)) || (timeTo && !/^\d{2}:\d{2}$/.test(timeTo))) throw new HttpError(400, "time filters must use HH:MM.", "VALIDATION_ERROR");

		const result = await listEvents({
			page,
			pageSize,
			search: search || undefined,
			category: category || undefined,
			organizer: organizer ? new Types.ObjectId(organizer) : undefined,
			featured: featured === null ? undefined : featured === "true",
			status: status as EventStatus | undefined,
			dateFrom,
			dateTo,
			tags,
			location: location || undefined,
			priceMin,
			priceMax,
			sort: sort ?? undefined,
			rating,
			availability: availability ?? undefined,
			free,
			online,
			latitude,
			longitude,
			distanceKm,
			timeFrom,
			timeTo,
		});

		return NextResponse.json({ success: true, data: { items: result.items, pagination: { page, pageSize, total: result.total, totalPages: Math.ceil(result.total / pageSize) } } });
	} catch (error) {
		return errorResponse(error);
	}
}

export async function POST(request: Request) {
	try {
		const session = await requireRole(["organizer", "admin"]);
		const input = validateEventCreateInput(await request.json());
		await dbConnect();
		const event = await createEvent(input, new Types.ObjectId(session.user.id));
		return NextResponse.json({ success: true, data: event }, { status: 201 });
	} catch (error) {
		return errorResponse(error);
	}
}
