import { Types } from "mongoose";
import dbConnect from "@/lib/mongodb";
import Vendor from "@/models/Vendor";
import Event from "@/models/Event";
import User from "@/models/User";
import { HttpError } from "@/utils/api/httpError";
import { createNotification } from "@/services/notifications/notification.service";

export interface RegisterVendorInput {
	businessName: string;
	description: string;
	category: string;
	logo?: string;
}

export const createVendorProfile = async (ownerId: Types.ObjectId | string, input: RegisterVendorInput) => {
	await dbConnect();
	const ownerObjId = new Types.ObjectId(ownerId);

	const existing = await Vendor.findOne({ owner: ownerObjId }).exec();
	if (existing) {
		throw new HttpError(409, "Vendor profile already exists for this account.", "PROFILE_EXISTS");
	}

	const vendor = await Vendor.create({
		owner: ownerObjId,
		businessName: input.businessName,
		description: input.description,
		category: input.category,
		logo: input.logo,
		approvalStatus: "pending",
		stallBookings: [],
	});

	// Upgrade user role to vendor if attendee
	await User.findByIdAndUpdate(ownerObjId, { $set: { role: "vendor" } }).exec();

	createNotification(
		ownerObjId,
		"vendor_update",
		"Vendor Profile Submitted",
		"Your vendor registration was submitted and is pending admin approval."
	).catch(console.error);

	return vendor;
};

export const getVendorProfile = async (ownerId: Types.ObjectId | string) => {
	await dbConnect();
	return Vendor.findOne({ owner: new Types.ObjectId(ownerId) }).populate("owner", "name email phone").exec();
};

export const updateVendorProfile = async (ownerId: Types.ObjectId | string, data: Partial<RegisterVendorInput>) => {
	await dbConnect();
	return Vendor.findOneAndUpdate({ owner: new Types.ObjectId(ownerId) }, { $set: data }, { new: true, runValidators: true }).exec();
};

export const listVendors = async (page = 1, pageSize = 20, status?: string) => {
	await dbConnect();
	const match: Record<string, unknown> = {};
	if (status) match.approvalStatus = status;

	const skip = (page - 1) * pageSize;
	const [items, total] = await Promise.all([
		Vendor.find(match).populate("owner", "name email phone").sort({ createdAt: -1 }).skip(skip).limit(pageSize).exec(),
		Vendor.countDocuments(match),
	]);

	return { items, total, page, pageSize, totalPages: Math.ceil(total / pageSize) };
};

export const updateVendorApprovalStatus = async (vendorId: Types.ObjectId | string, approvalStatus: "approved" | "rejected") => {
	await dbConnect();
	const vendor = await Vendor.findByIdAndUpdate(vendorId, { $set: { approvalStatus } }, { new: true }).exec();
	if (!vendor) throw new HttpError(404, "Vendor profile not found.", "NOT_FOUND");

	createNotification(
		vendor.owner,
		"vendor_update",
		`Vendor Account ${approvalStatus === "approved" ? "Approved" : "Rejected"}`,
		`Your vendor account status has been updated to ${approvalStatus}.`
	).catch(console.error);

	return vendor;
};

export const bookStall = async (ownerId: Types.ObjectId | string, eventId: string, stallName?: string) => {
	await dbConnect();
	const vendor = await Vendor.findOne({ owner: new Types.ObjectId(ownerId) }).exec();
	if (!vendor) throw new HttpError(404, "Vendor profile not found.", "NOT_FOUND");
	if (vendor.approvalStatus !== "approved") throw new HttpError(403, "Only approved vendors can book stalls.", "FORBIDDEN");

	const event = await Event.findById(eventId).exec();
	if (!event) throw new HttpError(404, "Event not found.", "NOT_FOUND");
	if (event.status !== "published") throw new HttpError(409, "Event is not open for stall booking.", "EVENT_NOT_OPEN");

	const duplicate = vendor.stallBookings.find((b) => b.event.toString() === eventId && b.status !== "cancelled");
	if (duplicate) throw new HttpError(409, "You already have a stall booking for this event.", "DUPLICATE_BOOKING");

	vendor.stallBookings.push({
		event: event._id,
		stallName: stallName || `${vendor.businessName} Stall`,
		bookedAt: new Date(),
		status: "pending",
	});

	await vendor.save();
	return vendor;
};

export const cancelStallBooking = async (ownerId: Types.ObjectId | string, eventId: string) => {
	await dbConnect();
	const vendor = await Vendor.findOne({ owner: new Types.ObjectId(ownerId) }).exec();
	if (!vendor) throw new HttpError(404, "Vendor profile not found.", "NOT_FOUND");

	const booking = vendor.stallBookings.find((b) => b.event.toString() === eventId && b.status !== "cancelled");
	if (!booking) throw new HttpError(404, "Active stall booking not found for this event.", "NOT_FOUND");

	booking.status = "cancelled";
	await vendor.save();
	return vendor;
};

export const getVendorDashboard = async (ownerId: Types.ObjectId | string) => {
	await dbConnect();
	const vendor = await Vendor.findOne({ owner: new Types.ObjectId(ownerId) })
		.populate({ path: "stallBookings.event", select: "title description organizer venue startDate endDate status images category isOnline" })
		.populate({ path: "stallBookings.event", populate: { path: "organizer", select: "name" } })
		.exec();

	if (!vendor) throw new HttpError(404, "Vendor profile not found.", "NOT_FOUND");

	const now = new Date();
	const activeBookings = vendor.stallBookings.filter((b) => b.status !== "cancelled");
	const events = activeBookings.map((booking) => booking.event as unknown as { startDate?: Date; endDate?: Date; status?: string }).filter((event) => event && typeof event === "object");
	const upcomingEvents = events.filter((event) => event.startDate && new Date(event.startDate) > now);
	const activeEvents = events.filter((event) => event.startDate && event.endDate && new Date(event.startDate) <= now && new Date(event.endDate) >= now && event.status === "published");
	const completedEvents = events.filter((event) => event.status === "completed" || (event.endDate && new Date(event.endDate) < now));

	return {
		vendor,
		summary: {
			approvalStatus: vendor.approvalStatus,
			totalBookings: vendor.stallBookings.length,
			activeBookingsCount: activeBookings.length,
			upcomingEventsCount: upcomingEvents.length,
			activeEventsCount: activeEvents.length,
			completedEventsCount: completedEvents.length,
		},
		bookings: vendor.stallBookings,
	};
};

export const getVendorAssignedEvents = async (ownerId: Types.ObjectId | string) => {
	const data = await getVendorDashboard(ownerId);
	return data.bookings.filter((booking) => booking.status !== "cancelled");
};

export const getVendorAssignedEvent = async (ownerId: Types.ObjectId | string, eventId: string) => {
	if (!Types.ObjectId.isValid(eventId)) throw new HttpError(400, "Event id is invalid.", "INVALID_ID");
	const bookings = await getVendorAssignedEvents(ownerId);
	const booking = bookings.find((item) => {
		const event = item.event as unknown as { _id?: Types.ObjectId };
		return event?._id?.toString() === eventId;
	});
	if (!booking) throw new HttpError(404, "Assigned event not found.", "NOT_FOUND");
	return booking;
};
