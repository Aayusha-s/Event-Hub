import mongoose, { HydratedDocument, Model, Schema, Types } from "mongoose";

export interface ITicket {
	user: Types.ObjectId;
	event: Types.ObjectId;
	booking?: Types.ObjectId;
	payment?: Types.ObjectId;
	ticketType: string;
	qrCode: string;
	ticketNumber: string;
	paymentStatus: "pending" | "paid" | "failed" | "refunded";
	ticketStatus: "active" | "cancelled";
	checkedIn: boolean;
	purchaseDate: Date;
	cancelledAt?: Date;
}

export type TicketDocument = HydratedDocument<ITicket>;

const ticketSchema = new Schema<ITicket>(
	{
		user: { type: Schema.Types.ObjectId, ref: "User", required: true },
		event: { type: Schema.Types.ObjectId, ref: "Event", required: true },
		booking: { type: Schema.Types.ObjectId, ref: "Booking", index: true },
		payment: { type: Schema.Types.ObjectId, ref: "Payment", index: true },
		ticketType: { type: String, required: true, trim: true, maxlength: 100 },
		qrCode: { type: String, required: true, unique: true, trim: true, maxlength: 10000 },
		ticketNumber: { type: String, required: true, unique: true, trim: true, maxlength: 100 },
		paymentStatus: { type: String, enum: ["pending", "paid", "failed", "refunded"], default: "pending", required: true },
		ticketStatus: { type: String, enum: ["active", "cancelled"], default: "active", required: true },
		checkedIn: { type: Boolean, default: false, required: true },
		purchaseDate: { type: Date, default: Date.now, required: true },
		cancelledAt: { type: Date },
	},
	{ versionKey: false }
);

ticketSchema.index({ user: 1, event: 1, ticketType: 1, ticketStatus: 1 });
ticketSchema.index({ event: 1, checkedIn: 1 });

export const Ticket: Model<ITicket> =
	(mongoose.models.Ticket as Model<ITicket> | undefined) ?? mongoose.model<ITicket>("Ticket", ticketSchema);

export default Ticket;
