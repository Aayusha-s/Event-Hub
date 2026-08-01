import mongoose, { HydratedDocument, Model, Schema } from "mongoose";
import { USER_ROLES, UserRole } from "@/types";

export interface IUser {
	name: string;
	email: string;
	password: string;
	phone?: string;
	role: UserRole;
	profileImage?: string;
	coverImage?: string;
	username?: string;
	bio?: string;
	location?: string;
	website?: string;
	interests: string[];
	privacy: "public" | "followers" | "private";
}

export type UserDocument = HydratedDocument<IUser>;

const userSchema = new Schema<IUser>(
	{
		name: { type: String, required: true, trim: true, minlength: 2, maxlength: 100 },
		email: {
			type: String,
			required: true,
			unique: true,
			trim: true,
			lowercase: true,
			maxlength: 254,
			match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
		},
		password: { type: String, required: true, minlength: 8, maxlength: 255, select: false },
		phone: { type: String, trim: true, maxlength: 20 },
		role: { type: String, enum: USER_ROLES, default: "attendee", required: true },
		profileImage: { type: String, trim: true, maxlength: 500 },
		coverImage: { type: String, trim: true, maxlength: 500 },
		username: { type: String, trim: true, lowercase: true, minlength: 3, maxlength: 30, match: /^[a-z0-9_]+$/ },
		bio: { type: String, trim: true, maxlength: 500 },
		location: { type: String, trim: true, maxlength: 120 },
		website: { type: String, trim: true, maxlength: 500 },
		interests: { type: [String], default: [], validate: { validator: (items: string[]) => items.length <= 20, message: "A profile can have at most 20 interests." } },
		privacy: { type: String, enum: ["public", "followers", "private"], default: "public", required: true },
	},
	{ timestamps: true, versionKey: false }
);

userSchema.index({ email: 1 }, { unique: true });
userSchema.index({ role: 1 });
userSchema.index({ username: 1 }, { unique: true, sparse: true });

export const User: Model<IUser> =
	(mongoose.models.User as Model<IUser> | undefined) ?? mongoose.model<IUser>("User", userSchema);

export default User;
