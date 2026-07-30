import mongoose, { HydratedDocument, Model, Schema } from "mongoose";
import { USER_ROLES, UserRole } from "@/types";

export interface IUser {
	name: string;
	email: string;
	password: string;
	phone?: string;
	role: UserRole;
	profileImage?: string;
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
	},
	{ timestamps: true, versionKey: false }
);

userSchema.index({ email: 1 }, { unique: true });
userSchema.index({ role: 1 });

export const User: Model<IUser> =
	(mongoose.models.User as Model<IUser> | undefined) ?? mongoose.model<IUser>("User", userSchema);

export default User;
