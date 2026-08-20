import { Types } from "mongoose";
import dbConnect from "@/lib/mongodb";
import Ticket from "@/models/Ticket";
import Event from "@/models/Event";
import Booking from "@/models/Booking";
import { HttpError } from "@/utils/api/httpError";
import { createNotification } from "@/services/notifications/notification.service";

const ticketQuery = (identifier: string): Record<string, unknown> => {
	if (identifier.startsWith("VIVNT-")) return { ticketNumber: identifier };
	if (identifier.includes("vivnt-ticket:")) {
		const ticketNumber = identifier.split(":")[1];
		return ticketNumber ? { ticketNumber } : { qrCode: identifier };
	}
	return { $or: [{ ticketNumber: identifier }, { qrCode: identifier }] };
};

export const verifyTicket = async (identifier: string) => {
	await dbConnect();
	const ticket = await Ticket.findOne(ticketQuery(identifier)).populate("event").populate("user", "name").populate("checkedInBy", "name").exec();
	if (!ticket) throw new HttpError(404, "Invalid ticket. Ticket record not found.", "INVALID_TICKET");
	const event = ticket.event as unknown as { _id: Types.ObjectId; title: string; venue: string; startDate: Date; endDate: Date; status: string };
	if (!event?._id) throw new HttpError(404, "Associated event not found.", "EVENT_NOT_FOUND");
	const base = { ticketNumber: ticket.ticketNumber, ticketType: ticket.ticketType, attendee: { name: (ticket.user as unknown as { name: string }).name }, event: { title: event.title, venue: event.venue, startDate: event.startDate } };
	if (ticket.checkedIn) return { state: "used" as const, ...base, checkedInAt: ticket.checkedInAt, checker: (ticket.checkedInBy as unknown as { name?: string } | undefined)?.name };
	if (ticket.ticketStatus !== "active" || event.status === "cancelled") return { state: "cancelled" as const, ...base };
	if (ticket.paymentStatus !== "paid") return { state: "invalid" as const, ...base, message: "Payment has not been completed." };
	if (event.endDate < new Date()) return { state: "invalid" as const, ...base, message: "This event has already ended." };
	if (ticket.booking) {
		const booking = await Booking.exists({ _id: ticket.booking, user: ticket.user._id, event: event._id, status: "paid" });
		if (!booking) return { state: "invalid" as const, ...base, message: "The ticket booking is no longer valid." };
	}
	return { state: "valid" as const, ...base };
};

export const processCheckIn = async (identifier: string, checkerUserId: Types.ObjectId | string) => {
	await dbConnect();
	const query = ticketQuery(identifier);
	const ticket = await Ticket.findOne(query).populate("event").populate("user", "name").exec();

	if (!ticket) {
		throw new HttpError(404, "Invalid ticket. Ticket record not found.", "INVALID_TICKET");
	}

	if (ticket.ticketStatus !== "active") {
		throw new HttpError(409, "Ticket is not active (status: " + ticket.ticketStatus + ").", "INACTIVE_TICKET");
	}

	if (ticket.paymentStatus !== "paid") {
		throw new HttpError(409, "Payment for this ticket has not been completed.", "UNPAID_TICKET");
	}

	if (ticket.checkedIn) {
		throw new HttpError(409, "Ticket has already been checked-in.", "ALREADY_CHECKED_IN", { checkedInAt: ticket.checkedInAt });
	}

	const event = await Event.findById(ticket.event._id).exec();
	if (!event) {
		throw new HttpError(404, "Associated event not found.", "EVENT_NOT_FOUND");
	}

	const now = new Date();
	if (event.status === "cancelled") {
		throw new HttpError(409, "This event has been cancelled.", "EVENT_CANCELLED");
	}
	if (event.endDate < now) {
		throw new HttpError(410, "This event has already ended.", "EVENT_EXPIRED");
	}
	if (ticket.booking) {
		const booking = await Booking.findOne({ _id: ticket.booking, user: ticket.user._id, event: event._id, status: "paid" }).select("_id").lean().exec();
		if (!booking) throw new HttpError(409, "The ticket booking is no longer valid.", "INVALID_BOOKING");
	}

	const checkedInAt = new Date();
	const updated = await Ticket.findOneAndUpdate(
		{ _id: ticket._id, checkedIn: false, ticketStatus: "active", paymentStatus: "paid" },
		{ $set: { checkedIn: true, checkedInAt, checkedInBy: new Types.ObjectId(checkerUserId) } },
		{ new: true }
	).exec();
	if (!updated) throw new HttpError(409, "Ticket has already been checked-in.", "ALREADY_CHECKED_IN");

	// Notify ticket owner
	createNotification(
		ticket.user._id,
		"booking",
		"Checked In!",
		`Your ticket for ${event.title} was successfully checked in.`
	).catch(console.error);

	return {
		success: true,
		ticketNumber: ticket.ticketNumber,
		checkedInAt,
		attendee: {
			name: (ticket.user as unknown as { name: string }).name,
		},
		event: {
			title: event.title,
			venue: event.venue,
			startDate: event.startDate,
		},
	};
};

export const getRecentCheckIns = async (checkerUserId: Types.ObjectId | string) => {
	await dbConnect();
	return Ticket.find({ checkedInBy: new Types.ObjectId(checkerUserId), checkedIn: true })
		.select("ticketNumber ticketType checkedInAt")
		.populate("user", "name")
		.populate("event", "title")
		.sort({ checkedInAt: -1 })
		.limit(10)
		.lean()
		.exec();
};

export const getCheckerDashboard = async (checkerUserId: Types.ObjectId | string) => {
	await dbConnect();
	const today = new Date(); today.setHours(0, 0, 0, 0);
	const [totalTickets, checkedInTickets, todayCheckIns, recentCheckIns] = await Promise.all([
		Ticket.countDocuments({ ticketStatus: "active", paymentStatus: "paid" }),
		Ticket.countDocuments({ checkedIn: true }),
		Ticket.countDocuments({ checkedInBy: new Types.ObjectId(checkerUserId), checkedInAt: { $gte: today } }),
		getRecentCheckIns(checkerUserId),
	]);
	return { summary: { totalTickets, checkedInTickets, remainingTickets: Math.max(0, totalTickets - checkedInTickets), todayCheckIns }, recentCheckIns };
};

export const listAttendance = async (filters: { search?: string; eventId?: string; date?: string }) => {
	await dbConnect();
	const match: Record<string, unknown> = { checkedIn: true };
	if (filters.eventId && Types.ObjectId.isValid(filters.eventId)) match.event = new Types.ObjectId(filters.eventId);
	if (filters.date) { const start = new Date(`${filters.date}T00:00:00.000Z`); const end = new Date(start); end.setUTCDate(end.getUTCDate() + 1); if (!Number.isNaN(start.getTime())) match.checkedInAt = { $gte: start, $lt: end }; }
	if (filters.search) { const pattern = new RegExp(filters.search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i"); match.$or = [{ ticketNumber: pattern }, { ticketType: pattern }]; }
	return Ticket.find(match).select("ticketNumber ticketType checkedInAt").populate("user", "name").populate("event", "title").populate("checkedInBy", "name").sort({ checkedInAt: -1 }).limit(200).lean().exec();
};
