import mongoose, { HydratedDocument, Model, Schema, Types } from "mongoose";

export interface IBookingItem { ticketType: string; quantity: number; unitPrice: number; }
export interface IBooking { user: Types.ObjectId; event: Types.ObjectId; items: IBookingItem[]; totalAmount: number; payment?: Types.ObjectId; status: "pending" | "paid" | "failed" | "cancelled"; }
export type BookingDocument = HydratedDocument<IBooking>;
const itemSchema = new Schema<IBookingItem>({ ticketType: { type: String, required: true, trim: true }, quantity: { type: Number, required: true, min: 1 }, unitPrice: { type: Number, required: true, min: 0 } }, { _id: false });
const bookingSchema = new Schema<IBooking>({ user: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true }, event: { type: Schema.Types.ObjectId, ref: "Event", required: true, index: true }, items: { type: [itemSchema], required: true, validate: { validator: (items: IBookingItem[]) => items.length > 0, message: "A booking requires tickets." } }, totalAmount: { type: Number, required: true, min: 0 }, payment: { type: Schema.Types.ObjectId, ref: "Payment" }, status: { type: String, enum: ["pending", "paid", "failed", "cancelled"], default: "pending", required: true } }, { timestamps: true, versionKey: false });
bookingSchema.index({ user: 1, event: 1, createdAt: -1 });
export const Booking: Model<IBooking> = (mongoose.models.Booking as Model<IBooking> | undefined) ?? mongoose.model<IBooking>("Booking", bookingSchema);
export default Booking;
