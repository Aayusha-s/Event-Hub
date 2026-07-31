import { randomUUID } from "crypto";
import mongoose, { Types } from "mongoose";
import QRCode from "qrcode";
import dbConnect from "@/lib/mongodb";
import Booking from "@/models/Booking";
import Event from "@/models/Event";
import Payment from "@/models/Payment";
import Ticket from "@/models/Ticket";
import { HttpError } from "@/utils/api/httpError";
import { BookTicketInput } from "@/utils/tickets/validation";

const ticketNumber = () => `VIVNT-${new Date().toISOString().slice(0, 10).replace(/-/g, "")}-${randomUUID().replace(/-/g, "").slice(0, 10).toUpperCase()}`;

export const bookingService = {
	createBooking: async (userId: Types.ObjectId | string, input: BookTicketInput) => {
		await dbConnect();
		const user = new Types.ObjectId(userId);
		const event = await Event.findById(input.eventId).exec();
		if (!event) throw new HttpError(404, "Event not found.", "NOT_FOUND");
		if (event.status !== "published") throw new HttpError(409, "This event is not published.", "EVENT_NOT_PUBLISHED");
		if (event.startDate <= new Date()) throw new HttpError(409, "This event has already started.", "EVENT_STARTED");
		const types = new Map(event.ticketTypes.map((type) => [type.name, type]));
		const items = input.items.map((item) => {
			const type = types.get(item.ticketType);
			if (!type) throw new HttpError(400, `${item.ticketType} is not available for this event.`, "INVALID_TICKET_TYPE");
			return { ...item, unitPrice: type.price };
		});
		const total = items.reduce((sum, item) => sum + item.quantity, 0);
		const ticketCounts = await Ticket.aggregate([{ $match: { event: event._id, ticketStatus: "active" } }, { $group: { _id: "$ticketType", count: { $sum: 1 } } }]).exec();
		const sold = new Map(ticketCounts.map((item) => [item._id as string, item.count as number]));
		for (const item of items) if ((sold.get(item.ticketType) ?? 0) + item.quantity > types.get(item.ticketType)!.quantity) throw new HttpError(409, `${item.ticketType} is sold out.`, "TICKET_TYPE_SOLD_OUT");
		const eventSold = [...sold.values()].reduce((sum, count) => sum + count, 0);
		if (eventSold + total > event.capacity) throw new HttpError(409, "This event is sold out.", "EVENT_SOLD_OUT");
		return Booking.create({ user, event: event._id, items, totalAmount: items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0) });
	},
	completeBooking: async (bookingId: Types.ObjectId, paymentId: Types.ObjectId) => {
		await dbConnect(); const session = await mongoose.startSession();
		try { let tickets: Awaited<ReturnType<typeof Ticket.create>> = [] as never;
			await session.withTransaction(async () => {
				const booking = await Booking.findById(bookingId).session(session).exec(); const payment = await Payment.findById(paymentId).session(session).exec();
				if (!booking || !payment) throw new HttpError(404, "Booking or payment was not found.", "NOT_FOUND");
				if (booking.status === "paid") return;
				const event = await Event.findById(booking.event).session(session).exec(); if (!event || event.status !== "published" || event.startDate <= new Date()) throw new HttpError(409, "This event is no longer available.", "BOOKING_UNAVAILABLE");
				const existing = await Ticket.aggregate([{ $match: { event: event._id, ticketStatus: "active" } }, { $group: { _id: "$ticketType", count: { $sum: 1 } } }]).session(session).exec(); const sold = new Map(existing.map((item) => [item._id as string, item.count as number]));
				const total = booking.items.reduce((sum, item) => sum + item.quantity, 0); if ([...sold.values()].reduce((sum, count) => sum + count, 0) + total > event.capacity) throw new HttpError(409, "This event is sold out.", "EVENT_SOLD_OUT");
				for (const item of booking.items) { const type = event.ticketTypes.find((candidate) => candidate.name === item.ticketType); if (!type || (sold.get(item.ticketType) ?? 0) + item.quantity > type.quantity) throw new HttpError(409, `${item.ticketType} is sold out.`, "TICKET_TYPE_SOLD_OUT"); }
				const rows = await Promise.all(booking.items.flatMap((item) => Array.from({ length: item.quantity }, async () => { const number = ticketNumber(); return { user: booking.user, event: booking.event, booking: booking._id, payment: payment._id, ticketType: item.ticketType, ticketNumber: number, qrCode: await QRCode.toDataURL(`vivnt-ticket:${number}`, { width: 300, margin: 1 }), paymentStatus: "paid" as const }; })));
				tickets = await Ticket.create(rows, { session }); booking.status = "paid"; booking.payment = payment._id; payment.paymentStatus = "paid"; await Promise.all([booking.save({ session }), payment.save({ session })]);
			}); return tickets;
		} finally { await session.endSession(); }
	},
};
