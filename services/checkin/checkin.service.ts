import { Types } from "mongoose";
import dbConnect from "@/lib/mongodb";
import Ticket from "@/models/Ticket";
import Event from "@/models/Event";
import { HttpError } from "@/utils/api/httpError";
import { createNotification } from "@/services/notifications/notification.service";

export const processCheckIn = async (identifier: string, _checkerUserId?: Types.ObjectId | string) => {
	await dbConnect();

	// Accept ticketNumber or raw QR data
	const query: Record<string, unknown> = {};
	if (identifier.startsWith("VIVNT-")) {
		query.ticketNumber = identifier;
	} else if (identifier.includes("vivnt-ticket:")) {
		const parts = identifier.split(":");
		if (parts[1]) {
			query.ticketNumber = parts[1];
		} else {
			query.qrCode = identifier;
		}
	} else {
		query.$or = [{ ticketNumber: identifier }, { qrCode: identifier }];
	}

	const ticket = await Ticket.findOne(query).populate("event").populate("user", "name email phone").exec();

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
		throw new HttpError(409, "Ticket has already been checked-in.", "ALREADY_CHECKED_IN");
	}

	const event = await Event.findById(ticket.event._id).exec();
	if (!event) {
		throw new HttpError(404, "Associated event not found.", "EVENT_NOT_FOUND");
	}

	const now = new Date();
	if (event.endDate < now) {
		throw new HttpError(410, "This event has already ended.", "EVENT_EXPIRED");
	}

	ticket.checkedIn = true;
	await ticket.save();

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
		checkedInAt: new Date(),
		attendee: {
			name: (ticket.user as unknown as { name: string }).name,
			email: (ticket.user as unknown as { email: string }).email,
			phone: (ticket.user as unknown as { phone?: string }).phone,
		},
		event: {
			title: event.title,
			venue: event.venue,
			startDate: event.startDate,
		},
	};
};
