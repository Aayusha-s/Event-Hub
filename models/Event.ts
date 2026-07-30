import mongoose, { HydratedDocument, Model, Schema, Types } from "mongoose";

export interface ITicketType {
	name: string;
	price: number;
	quantity: number;
	description?: string;
}

export interface IEvent {
	title: string;
	description: string;
	organizer: Types.ObjectId;
	venue: string;
	latitude: number;
	longitude: number;
	category: string;
	images: string[];
	startDate: Date;
	endDate: Date;
	ticketTypes: ITicketType[];
	capacity: number;
	status: "draft" | "published" | "cancelled" | "completed";
	featured: boolean;
	tags: string[];
}

export type EventDocument = HydratedDocument<IEvent>;

const ticketTypeSchema = new Schema<ITicketType>(
	{
		name: { type: String, required: true, trim: true, maxlength: 100 },
		price: { type: Number, required: true, min: 0 },
		quantity: { type: Number, required: true, min: 1, validate: { validator: Number.isInteger, message: "Ticket quantity must be an integer." } },
		description: { type: String, trim: true, maxlength: 500 },
	},
	{ _id: false }
);

const eventSchema = new Schema<IEvent>(
	{
		title: { type: String, required: true, trim: true, minlength: 3, maxlength: 200 },
		description: { type: String, required: true, trim: true, minlength: 10, maxlength: 5000 },
		organizer: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
		venue: { type: String, required: true, trim: true, maxlength: 300 },
		latitude: { type: Number, required: true, min: -90, max: 90 },
		longitude: { type: Number, required: true, min: -180, max: 180 },
		category: { type: String, required: true, trim: true, maxlength: 100 },
		images: [{ type: String, trim: true, maxlength: 500 }],
		startDate: { type: Date, required: true },
		endDate: { type: Date, required: true },
		ticketTypes: { type: [ticketTypeSchema], required: true, validate: { validator: (value: ITicketType[]) => value.length > 0, message: "At least one ticket type is required." } },
		capacity: { type: Number, required: true, min: 1, validate: { validator: Number.isInteger, message: "Capacity must be an integer." } },
		status: { type: String, enum: ["draft", "published", "cancelled", "completed"], default: "draft", required: true },
		featured: { type: Boolean, default: false, required: true },
		tags: [{ type: String, trim: true, maxlength: 50 }],
	},
	{ timestamps: true, versionKey: false }
);

eventSchema.path("endDate").validate(function (value: Date) {
	return value > this.startDate;
}, "End date must be after the start date.");
eventSchema.index({ status: 1, startDate: 1 });
eventSchema.index({ featured: 1, startDate: 1 });
eventSchema.index({ category: 1, startDate: 1 });
eventSchema.index({ tags: 1 });

export const Event: Model<IEvent> =
	(mongoose.models.Event as Model<IEvent> | undefined) ?? mongoose.model<IEvent>("Event", eventSchema);

export default Event;
