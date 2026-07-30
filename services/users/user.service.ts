import { Types } from "mongoose";
import dbConnect from "@/lib/mongodb";
import User, { IUser } from "@/models/User";
import { UserRole } from "@/types";

export type UserListFilters = {
	page: number;
	pageSize: number;
	search?: string;
	role?: UserRole;
};

export const getUserProfile = async (userId: Types.ObjectId | string) => {
	await dbConnect();
	return User.findById(userId).select("-password").exec();
};

export const updateUserProfile = async (
	userId: Types.ObjectId | string,
	data: Partial<Pick<IUser, "name" | "phone" | "profileImage">>
) => {
	await dbConnect();
	return User.findByIdAndUpdate(userId, { $set: data }, { new: true, runValidators: true }).select("-password").exec();
};

export const listUsers = async (filters: UserListFilters) => {
	await dbConnect();
	const match: Record<string, unknown> = {};
	if (filters.role) match.role = filters.role;
	if (filters.search) {
		const pattern = new RegExp(filters.search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");
		match.$or = [{ name: pattern }, { email: pattern }, { phone: pattern }];
	}

	const skip = (filters.page - 1) * filters.pageSize;
	const [users, total] = await Promise.all([
		User.find(match).select("-password").sort({ createdAt: -1 }).skip(skip).limit(filters.pageSize).exec(),
		User.countDocuments(match),
	]);

	return {
		items: users,
		total,
		page: filters.page,
		pageSize: filters.pageSize,
		totalPages: Math.ceil(total / filters.pageSize),
	};
};

export const updateUserRoleOrStatus = async (
	userId: Types.ObjectId | string,
	data: Partial<{ role: UserRole }>
) => {
	await dbConnect();
	return User.findByIdAndUpdate(userId, { $set: data }, { new: true, runValidators: true }).select("-password").exec();
};

export const deleteUser = async (userId: Types.ObjectId | string) => {
	await dbConnect();
	return User.findByIdAndDelete(userId).exec();
};
