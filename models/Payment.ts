import mongoose, { HydratedDocument, Model, Schema, Types } from "mongoose";

export interface IPayment {
	user: Types.ObjectId;
	event: Types.ObjectId;
	ticket?: Types.ObjectId;
	amount: number;
	paymentMethod: "esewa" | "khalti" | "stripe" | "cash" | "bank_transfer";
	paymentStatus: "pending" | "paid" | "failed" | "refunded";
	transactionId?: string;
	pidx?: string;
	stripePaymentIntentId?: string;
	metadata?: Record<string, unknown>;
}

export type PaymentDocument = HydratedDocument<IPayment>;

const paymentSchema = new Schema<IPayment>(
	{
		user: { type: Schema.Types.ObjectId, ref: "User", required: true },
		event: { type: Schema.Types.ObjectId, ref: "Event", required: true },
		ticket: { type: Schema.Types.ObjectId, ref: "Ticket" },
		amount: { type: Number, required: true, min: 0 },
		paymentMethod: { type: String, enum: ["esewa", "khalti", "stripe", "cash", "bank_transfer"], required: true },
		paymentStatus: { type: String, enum: ["pending", "paid", "failed", "refunded"], default: "pending", required: true },
		transactionId: { type: String, trim: true, unique: true, sparse: true, maxlength: 255 },
		pidx: { type: String, trim: true, sparse: true, maxlength: 255 },
		stripePaymentIntentId: { type: String, trim: true, sparse: true, maxlength: 255 },
		metadata: { type: Schema.Types.Mixed },
	},
	{ timestamps: true, versionKey: false }
);

paymentSchema.index({ user: 1, createdAt: -1 });
paymentSchema.index({ event: 1, paymentStatus: 1 });
paymentSchema.index({ ticket: 1 });

export const Payment: Model<IPayment> =
	(mongoose.models.Payment as Model<IPayment> | undefined) ?? mongoose.model<IPayment>("Payment", paymentSchema);

export default Payment;
