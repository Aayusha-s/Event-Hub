import { PipelineStage, Types } from "mongoose";
import Event, { EventDocument } from "@/models/Event";
import { EventInput, EventStatus } from "@/utils/events/validation";

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
};

const escapeRegex = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

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

	const skip = (filters.page - 1) * filters.pageSize;
	const [result] = await Event.aggregate([
		{ $match: match },
		...organizerLookup,
		{
			$facet: {
				items: [{ $sort: { featured: -1, startDate: 1, _id: 1 } }, { $skip: skip }, { $limit: filters.pageSize }],
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
	const [event] = await Event.aggregate([{ $match: { _id: id } }, ...organizerLookup]).exec();
	return event ?? null;
};

export const createEvent = (input: EventInput, organizer: Types.ObjectId) => Event.create({ ...input, organizer });

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
