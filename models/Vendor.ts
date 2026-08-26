import mongoose, { HydratedDocument, Model, Schema, Types } from "mongoose";

export interface IStallBooking {
	event: Types.ObjectId;
	stallName: string;
	description: string;
	stallType: string;
	size: string;
	bookingFee: number;
	bookedAt: Date;
	status: "pending" | "confirmed" | "cancelled";
}

export interface IVendor {
	owner: Types.ObjectId;
	businessName: string;
	description: string;
	logo?: string;
	category: string;
	approvalStatus: "pending" | "approved" | "rejected";
	stallBookings: IStallBooking[];
}

export type VendorDocument = HydratedDocument<IVendor>;

const stallBookingSchema = new Schema<IStallBooking>(
	{
		event: { type: Schema.Types.ObjectId, ref: "Event", required: true },
		stallName: { type: String, required: true, trim: true, minlength: 2, maxlength: 100 },
		description: { type: String, required: true, trim: true, minlength: 10, maxlength: 1000 },
		stallType: { type: String, required: true, trim: true, minlength: 2, maxlength: 100 },
		size: { type: String, required: true, trim: true, maxlength: 100 },
		bookingFee: { type: Number, required: true, min: 0 },
		bookedAt: { type: Date, default: Date.now, required: true },
		status: { type: String, enum: ["pending", "confirmed", "cancelled"], default: "pending", required: true },
	},
	{ _id: false }
);

const vendorSchema = new Schema<IVendor>(
	{
		owner: { type: Schema.Types.ObjectId, ref: "User", required: true, unique: true },
		businessName: { type: String, required: true, trim: true, minlength: 2, maxlength: 200 },
		description: { type: String, required: true, trim: true, minlength: 10, maxlength: 2000 },
		logo: { type: String, trim: true, maxlength: 500 },
		category: { type: String, required: true, trim: true, maxlength: 100 },
		approvalStatus: { type: String, enum: ["pending", "approved", "rejected"], default: "pending", required: true },
		stallBookings: { type: [stallBookingSchema], default: [] },
	},
	{ timestamps: true, versionKey: false }
);

vendorSchema.index({ approvalStatus: 1, category: 1 });
vendorSchema.index({ "stallBookings.event": 1 });

export const Vendor: Model<IVendor> =
	(mongoose.models.Vendor as Model<IVendor> | undefined) ?? mongoose.model<IVendor>("Vendor", vendorSchema);

export default Vendor;
