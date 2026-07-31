import { Types } from "mongoose";
import dbConnect from "@/lib/mongodb";
import Event from "@/models/Event";
import Ticket from "@/models/Ticket";
import Payment from "@/models/Payment";
import User from "@/models/User";
import Vendor from "@/models/Vendor";

export const getOrganizerDashboard = async (organizerId: Types.ObjectId | string) => {
	await dbConnect();
	const orgObjId = new Types.ObjectId(organizerId);

	// Get organizer's events
	const events = await Event.find({ organizer: orgObjId }).sort({ createdAt: -1 }).exec();
	const eventIds = events.map((e) => e._id);

	// Aggregate ticket stats for these events
	const [ticketStats, checkedInCount, recentBookings, payments, ticketCounts] = await Promise.all([
		Ticket.countDocuments({ event: { $in: eventIds }, ticketStatus: "active" }),
		Ticket.countDocuments({ event: { $in: eventIds }, checkedIn: true }),
		Ticket.find({ event: { $in: eventIds } })
			.populate("event", "title startDate venue")
			.populate("user", "name email")
			.sort({ purchaseDate: -1 })
			.limit(10)
			.exec(),
		Payment.aggregate([
			{ $match: { event: { $in: eventIds }, paymentStatus: "paid" } },
			{ $group: { _id: null, totalRevenue: { $sum: "$amount" } } },
		]),
		Ticket.aggregate([
			{ $match: { event: { $in: eventIds }, ticketStatus: "active" } },
			{ $group: { _id: "$event", ticketsSold: { $sum: 1 } } },
		]),
	]);

	const totalRevenue = payments[0]?.totalRevenue ?? 0;

	return {
		summary: {
			totalEvents: events.length,
			totalTicketsSold: ticketStats,
			totalCheckedIn: checkedInCount,
			totalRevenue,
		},
			events: events.map((event) => ({
				...event.toObject(),
				ticketsSold: ticketCounts.find((count) => count._id.toString() === event._id.toString())?.ticketsSold ?? 0,
			})),
		recentBookings,
	};
};

export const getAdminDashboard = async () => {
	await dbConnect();

	const [
		totalUsers,
		usersByRole,
		totalEvents,
		eventsByStatus,
		totalTickets,
		paymentsAggregate,
		totalVendors,
		vendorsByStatus,
		recentUsers,
	] = await Promise.all([
		User.countDocuments(),
		User.aggregate([{ $group: { _id: "$role", count: { $sum: 1 } } }]),
		Event.countDocuments(),
		Event.aggregate([{ $group: { _id: "$status", count: { $sum: 1 } } }]),
		Ticket.countDocuments({ ticketStatus: "active" }),
		Payment.aggregate([
			{ $match: { paymentStatus: "paid" } },
			{ $group: { _id: null, totalRevenue: { $sum: "$amount" } } },
		]),
		Vendor.countDocuments(),
		Vendor.aggregate([{ $group: { _id: "$approvalStatus", count: { $sum: 1 } } }]),
		User.find().select("-password").sort({ createdAt: -1 }).limit(5).exec(),
	]);

	const roleCounts = usersByRole.reduce((acc, curr) => {
		acc[curr._id] = curr.count;
		return acc;
	}, {} as Record<string, number>);

	const statusCounts = eventsByStatus.reduce((acc, curr) => {
		acc[curr._id] = curr.count;
		return acc;
	}, {} as Record<string, number>);

	const vendorCounts = vendorsByStatus.reduce((acc, curr) => {
		acc[curr._id] = curr.count;
		return acc;
	}, {} as Record<string, number>);

	return {
		summary: {
			totalUsers,
			totalEvents,
			totalTickets,
			totalRevenue: paymentsAggregate[0]?.totalRevenue ?? 0,
			totalVendors,
		},
		roles: roleCounts,
		eventStatuses: statusCounts,
		vendorStatuses: vendorCounts,
		recentUsers,
	};
};
