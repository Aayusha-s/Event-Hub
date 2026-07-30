import { Types } from "mongoose";
import dbConnect from "@/lib/mongodb";
import Notification, { INotification } from "@/models/Notification";

export const createNotification = async (
	userId: Types.ObjectId | string,
	type: INotification["type"],
	title: string,
	message: string,
	link?: string
) => {
	await dbConnect();
	return Notification.create({
		user: new Types.ObjectId(userId),
		type,
		title,
		message,
		link,
	});
};

export const getUserNotifications = async (userId: Types.ObjectId | string, page = 1, pageSize = 20) => {
	await dbConnect();
	const userObjId = new Types.ObjectId(userId);
	const skip = (page - 1) * pageSize;

	const [notifications, unreadCount, total] = await Promise.all([
		Notification.find({ user: userObjId }).sort({ createdAt: -1 }).skip(skip).limit(pageSize).exec(),
		Notification.countDocuments({ user: userObjId, read: false }),
		Notification.countDocuments({ user: userObjId }),
	]);

	return {
		items: notifications,
		unreadCount,
		total,
		page,
		pageSize,
		totalPages: Math.ceil(total / pageSize),
	};
};

export const markNotificationAsRead = async (notificationId: Types.ObjectId | string, userId: Types.ObjectId | string) => {
	await dbConnect();
	return Notification.findOneAndUpdate(
		{ _id: new Types.ObjectId(notificationId), user: new Types.ObjectId(userId) },
		{ $set: { read: true } },
		{ new: true }
	).exec();
};

export const markAllNotificationsAsRead = async (userId: Types.ObjectId | string) => {
	await dbConnect();
	await Notification.updateMany({ user: new Types.ObjectId(userId), read: false }, { $set: { read: true } }).exec();
	return { success: true };
};
