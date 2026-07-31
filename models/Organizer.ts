import mongoose, { HydratedDocument, Model, Schema, Types } from "mongoose";

export interface IOrganizer {
	owner: Types.ObjectId;
	orgType: "individual" | "business" | "nonprofit" | "agency";
	organizationName: string;
	description?: string;
	website?: string;
	approvalStatus: "pending" | "approved" | "rejected";
	formData: Record<string, unknown>;
}

export type OrganizerDocument = HydratedDocument<IOrganizer>;

const organizerSchema = new Schema<IOrganizer>(
	{
		owner: { type: Schema.Types.ObjectId, ref: "User", required: true, unique: true },
		orgType: { type: String, enum: ["individual", "business", "nonprofit", "agency"], required: true },
		organizationName: { type: String, required: true, trim: true, minlength: 2, maxlength: 200 },
		description: { type: String, trim: true, maxlength: 2000 },
		website: { type: String, trim: true, maxlength: 500 },
		approvalStatus: { type: String, enum: ["pending", "approved", "rejected"], default: "pending", required: true },
		formData: { type: Schema.Types.Mixed, default: {} },
	},
	{ timestamps: true, versionKey: false }
);

organizerSchema.index({ approvalStatus: 1 });

export const Organizer: Model<IOrganizer> =
	(mongoose.models.Organizer as Model<IOrganizer> | undefined) ?? mongoose.model<IOrganizer>("Organizer", organizerSchema);

export default Organizer;