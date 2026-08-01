import { PipelineStage, Types } from "mongoose";
import Event, { EventDocument } from "@/models/Event";
import { EventInput, EventStatus } from "@/utils/events/validation";
import { recordActivity } from "@/services/profiles/profile.service";

export type EventListFilters = {
	page: number;
	pageSize: number;
	search?: string;
	category?: string;
	organizer?: Types.ObjectId;
	featured?: boolean;
	status?: EventStatus;
	dateFrom?: Date;
	dateTo?: Date;
	tags?: string[];
	location?: string;
	priceMin?: number;
	priceMax?: number;
	sort?: "newest" | "oldest" | "trending" | "popular" | "rating" | "priceAsc" | "priceDesc";
	rating?: number;
	availability?: "available" | "soldOut";
	free?: boolean;
	online?: boolean;
	latitude?: number;
	longitude?: number;
	distanceKm?: number;
	timeFrom?: string;
	timeTo?: string;
};

const escapeRegex = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const ticketAvailabilityLookup: PipelineStage[] = [
	{
		$lookup: {
			from: "tickets",
			let: { eventId: "$_id" },
			pipeline: [
				{ $match: { $expr: { $and: [{ $eq: ["$event", "$$eventId"] }, { $eq: ["$ticketStatus", "active"] }] } } },
				{ $group: { _id: "$ticketType", sold: { $sum: 1 } } },
			],
			as: "ticketSales",
		},
	},
	{ $addFields: { ticketsSold: { $sum: "$ticketSales.sold" } } },
	{
		$addFields: {
			ticketTypes: {
				$map: {
					input: "$ticketTypes", as: "type",
					in: {
						$let: {
							vars: { sales: { $filter: { input: "$ticketSales", as: "sale", cond: { $eq: ["$$sale._id", "$$type.name"] } } } },
							in: { $mergeObjects: ["$$type", { sold: { $ifNull: [{ $arrayElemAt: ["$$sales.sold", 0] }, 0] }, remaining: { $max: [0, { $subtract: ["$$type.quantity", { $ifNull: [{ $arrayElemAt: ["$$sales.sold", 0] }, 0] }] }] } }] },
						},
					},
				},
			},
		},
	},
];

const organizerLookup: PipelineStage[] = [
	{
		$lookup: {
			from: "users",
			localField: "organizer",
			foreignField: "_id",
			as: "organizerDetails",
		},
	},
	{ $unwind: { path: "$organizerDetails", preserveNullAndEmptyArrays: true } },
	{
		$project: {
			ticketsSold: 1,
			title: 1,
			description: 1,
			venue: 1,
			latitude: 1,
			longitude: 1,
			category: 1,
			images: 1,
			startDate: 1,
			endDate: 1,
			ticketTypes: 1,
			capacity: 1,
			status: 1,
			featured: 1,
			tags: 1,
			createdAt: 1,
			updatedAt: 1,
			organizer: {
				_id: "$organizerDetails._id",
				name: "$organizerDetails.name",
				profileImage: "$organizerDetails.profileImage",
			},
		},
	},
];

export const listEvents = async (filters: EventListFilters) => {
	const match: Record<string, unknown> = {};
	if (filters.category) match.category = filters.category;
	if (filters.tags?.length) match.tags = { $in: filters.tags };
	if (filters.location) match.venue = new RegExp(escapeRegex(filters.location), "i");
	if (filters.organizer) match.organizer = filters.organizer;
	if (filters.featured !== undefined) match.featured = filters.featured;
	if (filters.status) match.status = filters.status;
	if (filters.search) {
		const pattern = new RegExp(escapeRegex(filters.search), "i");
		match.$or = [{ title: pattern }, { description: pattern }, { venue: pattern }, { tags: pattern }];
	}
	if (filters.dateFrom || filters.dateTo) {
		const startDate: { $gte?: Date; $lte?: Date } = {};
		if (filters.dateFrom) startDate.$gte = filters.dateFrom;
		if (filters.dateTo) startDate.$lte = filters.dateTo;
		match.startDate = startDate;
	}
	if (filters.priceMin !== undefined || filters.priceMax !== undefined) {
		match.ticketTypes = { $elemMatch: { ...(filters.priceMin !== undefined ? { price: { $gte: filters.priceMin } } : {}), ...(filters.priceMax !== undefined ? { price: { $lte: filters.priceMax } } : {}) } };
	}
	if (filters.free !== undefined) match.ticketTypes = { $elemMatch: { price: filters.free ? 0 : { $gt: 0 } } };
	if (filters.online !== undefined) match.isOnline = filters.online;
	const timeFilter: Record<string, unknown> = {};
	if (filters.timeFrom) timeFilter.$gte = filters.timeFrom;
	if (filters.timeTo) timeFilter.$lte = filters.timeTo;

	const skip = (filters.page - 1) * filters.pageSize;
	const sort: Record<string, 1 | -1> = filters.sort === "newest" ? { createdAt: -1, _id: -1 } : filters.sort === "oldest" ? { createdAt: 1, _id: 1 } : filters.sort === "priceAsc" ? { minPrice: 1, _id: 1 } : filters.sort === "priceDesc" ? { minPrice: -1, _id: 1 } : filters.sort === "rating" ? { averageRating: -1, reviewCount: -1 } : filters.sort === "popular" || filters.sort === "trending" ? { ticketsSold: -1, createdAt: -1 } : { featured: -1, startDate: 1, _id: 1 };
	const distanceStages: PipelineStage[] = filters.latitude !== undefined && filters.longitude !== undefined ? [{ $addFields: { distanceKm: { $sqrt: { $add: [{ $pow: [{ $subtract: ["$latitude", filters.latitude] }, 2] }, { $pow: [{ $subtract: ["$longitude", filters.longitude] }, 2] }] } } } }] : [];
	const timeStages: PipelineStage[] = Object.keys(timeFilter).length ? [{ $match: { $expr: { $let: { vars: { eventTime: { $dateToString: { format: "%H:%M", date: "$startDate", timezone: "UTC" } } }, in: { $and: [filters.timeFrom ? { $gte: ["$$eventTime", filters.timeFrom] } : true, filters.timeTo ? { $lte: ["$$eventTime", filters.timeTo] } : true] } } } } }] : [];
	const [result] = await Event.aggregate([
		{ $match: match },
		...ticketAvailabilityLookup,
		{ $lookup: { from: "reviews", localField: "_id", foreignField: "event", as: "reviews" } },
		{ $addFields: { averageRating: { $ifNull: [{ $avg: "$reviews.rating" }, 0] }, reviewCount: { $size: "$reviews" }, minPrice: { $min: "$ticketTypes.price" } } },
		...distanceStages,
		...(filters.distanceKm !== undefined && filters.latitude !== undefined && filters.longitude !== undefined ? [{ $match: { distanceKm: { $lte: filters.distanceKm } } }] : []),
		...timeStages,
		...(filters.rating !== undefined ? [{ $match: { averageRating: { $gte: filters.rating } } }] : []),
		...(filters.availability === "available" ? [{ $match: { $expr: { $lt: ["$ticketsSold", "$capacity"] } } }] : filters.availability === "soldOut" ? [{ $match: { $expr: { $gte: ["$ticketsSold", "$capacity"] } } }] : []),
		...organizerLookup,
		{
			$facet: {
				items: [{ $sort: sort }, { $skip: skip }, { $limit: filters.pageSize }],
				metadata: [{ $count: "total" }],
			},
		},
	]).exec();

	return {
		items: result?.items ?? [],
		total: result?.metadata[0]?.total ?? 0,
	};
};

export const getEventById = async (id: Types.ObjectId) => {
	const [event] = await Event.aggregate([
		{ $match: { _id: id } },
		...ticketAvailabilityLookup,
		...organizerLookup,
	]).exec();
	return event ?? null;
};

export const createEvent = async (input: EventInput, organizer: Types.ObjectId) => { const event = await Event.create({ ...input, organizer }); await recordActivity(organizer, "created_event", "Created an event", { subject: event._id, subjectModel: "Event", link: `/event-details/${event._id}` }); return event; };

export const findEventForManagement = (id: Types.ObjectId): Promise<EventDocument | null> => Event.findById(id).exec();

export const updateEvent = async (event: EventDocument, input: Partial<EventInput>) => {
	event.set(input);
	return event.save();
};

export const deleteEvent = (event: EventDocument) => event.deleteOne();

export const getTrendingEvents = async (limit = 6) => {
	return Event.aggregate([
		{ $match: { status: "published", startDate: { $gte: new Date() } } },
		{
			$lookup: {
				from: "tickets",
				localField: "_id",
				foreignField: "event",
				as: "bookedTickets",
			},
		},
		{
			$addFields: {
				ticketCount: { $size: "$bookedTickets" },
			},
		},
		{ $sort: { ticketCount: -1, featured: -1, startDate: 1 } },
		{ $limit: limit },
		...organizerLookup,
	]).exec();
};

export const getNearbyEvents = async (latitude: number, longitude: number, maxDistanceKm = 50, limit = 10) => {
	// Radius of Earth in kilometers = 6371
	const latDelta = maxDistanceKm / 111.12;
	const lngDelta = maxDistanceKm / (111.12 * Math.cos((latitude * Math.PI) / 180));

	return Event.aggregate([
		{
			$match: {
				status: "published",
				startDate: { $gte: new Date() },
				latitude: { $gte: latitude - latDelta, $lte: latitude + latDelta },
				longitude: { $gte: longitude - lngDelta, $lte: longitude + lngDelta },
			},
		},
		{ $sort: { startDate: 1 } },
		{ $limit: limit },
		...organizerLookup,
	]).exec();
};
