import { randomUUID } from "crypto";
import mongoose, { Types } from "mongoose";
import QRCode from "qrcode";
import dbConnect from "@/lib/mongodb";
import Event from "@/models/Event";
import Ticket, { TicketDocument } from "@/models/Ticket";
import { HttpError } from "@/utils/api/httpError";
import { BookTicketInput } from "@/utils/tickets/validation";

const createTicketNumber = () => `VIVNT-${new Date().toISOString().slice(0, 10).replace(/-/g, "")}-${randomUUID().replace(/-/g, "").slice(0, 10).toUpperCase()}`;

const createQrCode = (ticketNumber: string) =>
	QRCode.toDataURL(`vivnt-ticket:${ticketNumber}:${randomUUID()}`, {
		errorCorrectionLevel: "M",
		margin: 1,
		width: 300,
	});

export const bookTicket = async (userId: Types.ObjectId, input: BookTicketInput) => {
	await dbConnect();
	const session = await mongoose.startSession();
	try {
		let ticket: TicketDocument | undefined;
		await session.withTransaction(async () => {
			const event = await Event.findById(input.eventId).session(session).exec();
			if (!event) throw new HttpError(404, "Event not found.", "NOT_FOUND");
			if (event.status !== "published" || event.startDate <= new Date()) {
				throw new HttpError(409, "Tickets are not available for this event.", "BOOKING_UNAVAILABLE");
			}

			const selectedType = event.ticketTypes.find((type) => type.name === input.ticketType);
			if (!selectedType) throw new HttpError(400, "Ticket type is not available for this event.", "INVALID_TICKET_TYPE");

			const [duplicateTicket, ticketTypeCount, eventTicketCount] = await Promise.all([
				Ticket.exists({ user: userId, event: event._id, ticketType: input.ticketType, ticketStatus: "active" }).session(session),
				Ticket.countDocuments({ event: event._id, ticketType: input.ticketType, ticketStatus: "active" }).session(session),
				Ticket.countDocuments({ event: event._id, ticketStatus: "active" }).session(session),
			]);

			if (duplicateTicket) throw new HttpError(409, "You already have an active booking for this ticket type.", "DUPLICATE_BOOKING");
			if (ticketTypeCount >= selectedType.quantity || eventTicketCount >= event.capacity) {
				throw new HttpError(409, "This ticket type is sold out.", "SOLD_OUT");
			}

			const ticketNumber = createTicketNumber();
			const qrCode = await createQrCode(ticketNumber);
			const [createdTicket] = await Ticket.create(
				[
					{
						user: userId,
						event: event._id,
						ticketType: input.ticketType,
						ticketNumber,
						qrCode,
					},
				],
				{ session }
			);
			ticket = createdTicket;
		});
		return ticket!;
	} finally {
		await session.endSession();
	}
};

export const getMyTickets = async (userId: Types.ObjectId) => {
	await dbConnect();
	return Ticket.aggregate([
		{ $match: { user: userId } },
		{
			$lookup: {
				from: "events",
				localField: "event",
				foreignField: "_id",
				as: "eventDetails",
			},
		},
		{ $unwind: { path: "$eventDetails", preserveNullAndEmptyArrays: true } },
		{
			$project: {
				ticketNumber: 1,
				ticketType: 1,
				qrCode: 1,
				paymentStatus: 1,
				ticketStatus: 1,
				checkedIn: 1,
				purchaseDate: 1,
				cancelledAt: 1,
				event: {
					_id: "$eventDetails._id",
					title: "$eventDetails.title",
					venue: "$eventDetails.venue",
					images: "$eventDetails.images",
					startDate: "$eventDetails.startDate",
					endDate: "$eventDetails.endDate",
					status: "$eventDetails.status",
				},
			},
		},
		{ $sort: { purchaseDate: -1, _id: -1 } },
	]).exec();
};

export const cancelTicket = async (ticketId: Types.ObjectId, userId: Types.ObjectId) => {
	await dbConnect();
	const ticket = await Ticket.findById(ticketId).exec();
	if (!ticket) throw new HttpError(404, "Ticket not found.", "NOT_FOUND");
	if (ticket.user.toString() !== userId.toString()) throw new HttpError(403, "You can only cancel your own tickets.", "FORBIDDEN");
	if (ticket.ticketStatus === "cancelled") throw new HttpError(409, "Ticket has already been cancelled.", "ALREADY_CANCELLED");
	if (ticket.checkedIn) throw new HttpError(409, "Checked-in tickets cannot be cancelled.", "TICKET_CHECKED_IN");

	ticket.ticketStatus = "cancelled";
	ticket.cancelledAt = new Date();
	await ticket.save();
	return ticket;
};

export const getTicketById = async (ticketId: Types.ObjectId, userId: Types.ObjectId, role: string) => {
	await dbConnect();
	const ticket = await Ticket.findById(ticketId).populate("event").populate("user", "name email phone").exec();
	if (!ticket) throw new HttpError(404, "Ticket not found.", "NOT_FOUND");

	if (role !== "admin" && role !== "ticket_checker" && ticket.user._id.toString() !== userId.toString()) {
		throw new HttpError(403, "You do not have permission to view this ticket.", "FORBIDDEN");
	}
	return ticket;
};

export const updateTicketStatus = async (
	ticketId: Types.ObjectId,
	userId: Types.ObjectId,
	role: string,
	status: "active" | "cancelled"
) => {
	await dbConnect();
	const ticket = await Ticket.findById(ticketId).exec();
	if (!ticket) throw new HttpError(404, "Ticket not found.", "NOT_FOUND");

	if (role !== "admin" && ticket.user.toString() !== userId.toString()) {
		throw new HttpError(403, "You do not have permission to update this ticket.", "FORBIDDEN");
	}

	ticket.ticketStatus = status;
	if (status === "cancelled") {
		ticket.cancelledAt = new Date();
	}
	await ticket.save();
	return ticket;
};
