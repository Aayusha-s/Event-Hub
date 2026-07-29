import mongoose, { HydratedDocument, Model, Schema, Types } from "mongoose";
import { USER_ROLES, UserRole } from "@/types";

export type AuthProvider = "local" | "google" | "github";

export type UserStatus = "active" | "suspended" | "pending";

export interface User {
	fullName: string;
	email: string;
	username?: string;
	passwordHash?: string;
	authProviders: AuthProvider[];

	roles: UserRole[];
	primaryRole: UserRole;
	status: UserStatus;

	avatarUrl?: string;
	phoneNumber?: string;
	bio?: string;
	location?: string;
	website?: string;

	isEmailVerified: boolean;
	emailVerifiedAt?: Date;
	lastLoginAt?: Date;

	wishlistEventIds: Types.ObjectId[];
	followingUserIds: Types.ObjectId[];
	followerUserIds: Types.ObjectId[];
}

export type UserDocument = HydratedDocument<User>;

type UserModel = Model<User>;

const userSchema = new Schema<User, UserModel>(
	{
		fullName: {
			type: String,
			required: true,
			trim: true,
			minlength: 3,
			maxlength: 100,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			trim: true,
			lowercase: true,
			maxlength: 254,
			match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
		},
		username: {
			type: String,
			trim: true,
			lowercase: true,
			minlength: 3,
			maxlength: 30,
			match: /^[a-z0-9_]+$/,
			sparse: true,
			unique: true,
		},
		passwordHash: {
			type: String,
			minlength: 60,
			maxlength: 255,
			select: false,
		},
		authProviders: {
			type: [String],
			enum: ["local", "google", "github"],
			default: ["local"],
		},

		roles: {
			type: [String],
			enum: USER_ROLES,
			default: ["attendee"],
			validate: {
				validator: (value: string[]) => Array.isArray(value) && value.length > 0,
				message: "At least one role is required.",
			},
		},
		primaryRole: {
			type: String,
			enum: USER_ROLES,
			default: "attendee",
			required: true,
		},
		status: {
			type: String,
			enum: ["active", "suspended", "pending"],
			default: "active",
			required: true,
		},

		avatarUrl: {
			type: String,
			trim: true,
			maxlength: 500,
		},
		phoneNumber: {
			type: String,
			trim: true,
			maxlength: 20,
		},
		bio: {
			type: String,
			trim: true,
			maxlength: 500,
		},
		location: {
			type: String,
			trim: true,
			maxlength: 120,
		},
		website: {
			type: String,
			trim: true,
			maxlength: 300,
		},

		isEmailVerified: {
			type: Boolean,
			default: false,
			required: true,
		},
		emailVerifiedAt: {
			type: Date,
		},
		lastLoginAt: {
			type: Date,
		},

		wishlistEventIds: {
			type: [Schema.Types.ObjectId],
			ref: "Event",
			default: [],
		},
		followingUserIds: {
			type: [Schema.Types.ObjectId],
			ref: "User",
			default: [],
		},
		followerUserIds: {
			type: [Schema.Types.ObjectId],
			ref: "User",
			default: [],
		},
	},
	{
		timestamps: true,
		versionKey: false,
	}
);

userSchema.index({ email: 1 }, { unique: true });
userSchema.index({ username: 1 }, { unique: true, sparse: true });
userSchema.index({ roles: 1 });
userSchema.index({ primaryRole: 1 });

userSchema.pre("validate", function syncPrimaryRole(next) {
	if (!this.roles || this.roles.length === 0) {
		this.roles = ["attendee"];
	}

	if (!this.roles.includes(this.primaryRole)) {
		this.primaryRole = this.roles[0] as UserRole;
	}

	next();
});

const UserModel =
	(mongoose.models.User as UserModel | undefined) ||
	mongoose.model<User, UserModel>("User", userSchema);

export default UserModel;
