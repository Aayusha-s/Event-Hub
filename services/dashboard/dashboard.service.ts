import { Types } from "mongoose";
import dbConnect from "@/lib/mongodb";
import Booking from "@/models/Booking";
import Event from "@/models/Event";
import Ticket from "@/models/Ticket";
import Payment from "@/models/Payment";
import User from "@/models/User";
import Vendor from "@/models/Vendor";
import Review from "@/models/Review";
import Activity from "@/models/Activity";

type DashboardSeriesPoint = { label: string; value: number };

const monthLabel = (date: Date) => new Intl.DateTimeFormat("en-US", { month: "short" }).format(date);

const buildMonthlySeries = (dates: Date[], values: number[], months = 6): DashboardSeriesPoint[] => {
	const now = new Date();
	const buckets = Array.from({ length: months }, (_, index) => {
		const date = new Date(now.getFullYear(), now.getMonth() - (months - 1 - index), 1);
		return { key: `${date.getFullYear()}-${date.getMonth()}`, label: monthLabel(date), value: 0 };
	});

	dates.forEach((date, index) => {
		const key = `${date.getFullYear()}-${date.getMonth()}`;
		const bucket = buckets.find((item) => item.key === key);
		if (bucket) bucket.value += values[index] ?? 0;
	});

	return buckets.map(({ label, value }) => ({ label, value }));
};

const toDate = (value: Date | string | undefined) => new Date(value ?? new Date());

export const getOrganizerDashboard = async (organizerId: Types.ObjectId | string) => {
	await dbConnect();
	const orgObjId = new Types.ObjectId(organizerId);

	const [events, tickets, payments, bookings, reviews, recentActivities] = await Promise.all([
		Event.find({ organizer: orgObjId }).sort({ createdAt: -1 }).lean().exec(),
		Ticket.find({ event: { $in: await Event.find({ organizer: orgObjId }).distinct("_id") } })
			.populate("user", "name profileImage")
			.populate("event", "title venue startDate status ticketTypes")
			.sort({ purchaseDate: -1 })
			.lean()
			.exec(),
		Payment.find({ event: { $in: await Event.find({ organizer: orgObjId }).distinct("_id") }, paymentStatus: "paid" }).sort({ createdAt: -1 }).lean().exec(),
		Booking.find({ event: { $in: await Event.find({ organizer: orgObjId }).distinct("_id") } }).populate("user", "name profileImage").populate("event", "title venue startDate status").sort({ createdAt: -1 }).limit(20).lean().exec(),
		Review.find({ event: { $in: await Event.find({ organizer: orgObjId }).distinct("_id") } }).populate("user", "name profileImage").populate("event", "title venue").sort({ createdAt: -1 }).lean().exec(),
		Activity.find({ subject: { $in: await Event.find({ organizer: orgObjId }).distinct("_id") } }).sort({ createdAt: -1 }).limit(20).lean().exec(),
	]);

	const ticketByEvent = new Map<string, number>();
	const checkedInByEvent = new Map<string, number>();
	const revenueByEvent = new Map<string, number>();
	const reviewByEvent = new Map<string, { sum: number; count: number }>();
	const ticketTypeBreakdown = new Map<string, Map<string, { sold: number; revenue: number; quantity: number }>>();

	tickets.forEach((ticket) => {
		const eventId = ticket.event?._id?.toString?.() ?? ticket.event?.toString?.() ?? "";
		if (!eventId) return;
		ticketByEvent.set(eventId, (ticketByEvent.get(eventId) ?? 0) + 1);
		if (ticket.checkedIn) checkedInByEvent.set(eventId, (checkedInByEvent.get(eventId) ?? 0) + 1);
		const event = events.find((item) => item._id.toString() === eventId);
		const ticketType = String(ticket.ticketType ?? "General");
		const eventBreakdown = ticketTypeBreakdown.get(eventId) ?? new Map<string, { sold: number; revenue: number; quantity: number }>();
		const ticketTypeDetails = event?.ticketTypes?.find((type) => type.name === ticketType);
		const current = eventBreakdown.get(ticketType) ?? { sold: 0, revenue: 0, quantity: ticketTypeDetails?.quantity ?? 0 };
		current.sold += 1;
		current.revenue += ticketTypeDetails?.price ?? 0;
		current.quantity = ticketTypeDetails?.quantity ?? current.quantity;
		eventBreakdown.set(ticketType, current);
		ticketTypeBreakdown.set(eventId, eventBreakdown);
	});

	payments.forEach((payment) => {
		const eventId = payment.event?.toString?.() ?? "";
		if (!eventId) return;
		revenueByEvent.set(eventId, (revenueByEvent.get(eventId) ?? 0) + Number(payment.amount ?? 0));
	});

	reviews.forEach((review) => {
		const eventId = review.event?._id?.toString?.() ?? review.event?.toString?.() ?? "";
		if (!eventId) return;
		const bucket = reviewByEvent.get(eventId) ?? { sum: 0, count: 0 };
		bucket.sum += Number(review.rating ?? 0);
		bucket.count += 1;
		reviewByEvent.set(eventId, bucket);
	});

	const ticketDates = tickets.map((ticket) => toDate(ticket.purchaseDate));
	const ticketCounts = tickets.map(() => 1);
	const checkedInDates = tickets.filter((ticket) => ticket.checkedIn).map((ticket) => toDate(ticket.purchaseDate));
	const checkedInValues = checkedInDates.map(() => 1);
	const paymentDates = payments.map((payment) => toDate((payment as { createdAt?: Date }).createdAt));
	const paymentValues = payments.map((payment) => Number(payment.amount ?? 0));

	const monthlyTickets = buildMonthlySeries(ticketDates, ticketCounts);
	const monthlyAttendance = buildMonthlySeries(checkedInDates, checkedInValues);
	const monthlyRevenue = buildMonthlySeries(paymentDates, paymentValues);

	const totalTicketsSold = tickets.length;
	const totalCheckedIn = tickets.filter((ticket) => ticket.checkedIn).length;
	const totalRevenue = payments.reduce((sum, payment) => sum + Number(payment.amount ?? 0), 0);
	const averageRating = reviews.length ? reviews.reduce((sum, review) => sum + Number(review.rating ?? 0), 0) / reviews.length : 0;
	const completionRate = totalTicketsSold ? Math.round((totalCheckedIn / totalTicketsSold) * 100) : 0;

	const eventAnalytics = events.map((event) => {
		const eventId = event._id.toString();
		const sold = ticketByEvent.get(eventId) ?? 0;
		const checkedIn = checkedInByEvent.get(eventId) ?? 0;
		const revenue = revenueByEvent.get(eventId) ?? 0;
		const rating = reviewByEvent.get(eventId);
		const totalCapacity = Number(event.capacity ?? 0);
		return {
			...event,
			ticketsSold: sold,
			checkedIn,
			revenue,
			averageRating: rating && rating.count ? rating.sum / rating.count : 0,
			reviewCount: rating?.count ?? 0,
			attendanceRate: totalCapacity ? Math.round((sold / totalCapacity) * 100) : 0,
			remaining: Math.max(0, totalCapacity - sold),
		};
	});

	const recentBookings = bookings.slice(0, 10).map((booking) => ({
		...booking,
		event: booking.event,
		user: booking.user,
		amount: booking.totalAmount,
	}));

	const recentAttendees = tickets.filter((ticket) => ticket.checkedIn).slice(0, 10).map((ticket) => ({
		_id: ticket._id,
		user: ticket.user,
		event: ticket.event,
		ticketType: ticket.ticketType,
		purchaseDate: ticket.purchaseDate,
	}));

	const topEvents = [...eventAnalytics].sort((left, right) => right.revenue - left.revenue || right.ticketsSold - left.ticketsSold).slice(0, 6);
	const statusCounts = events.reduce((acc, event) => {
		acc[event.status] = (acc[event.status] ?? 0) + 1;
		return acc;
	}, {} as Record<string, number>);

	const now = new Date();
	const upcomingEvents = eventAnalytics.filter((event) => event.status === "published" && new Date(event.startDate) >= now);
	const draftEvents = eventAnalytics.filter((event) => event.status === "draft");
	const cancelledEvents = eventAnalytics.filter((event) => event.status === "cancelled");
	const publishedEvents = eventAnalytics.filter((event) => event.status === "published");
	const categories = events.reduce((acc, event) => {
		acc[event.category] = (acc[event.category] ?? 0) + 1;
		return acc;
	}, {} as Record<string, number>);

	const revenueByEventSeries = [...eventAnalytics].sort((left, right) => right.revenue - left.revenue).slice(0, 8).map((event) => ({
		label: event.title,
		value: event.revenue,
		meta: `${event.ticketsSold} sold`,
	}));

	const ticketTypeBreakdownSeries = [...ticketTypeBreakdown.entries()].map(([eventId, types]) => {
		const event = events.find((item) => item._id.toString() === eventId);
		return {
			eventId,
			title: event?.title ?? "Event",
			items: [...types.entries()].map(([name, value]) => ({ name, sold: value.sold, remaining: Math.max(0, value.quantity - value.sold), revenue: value.revenue })),
		};
	}).slice(0, 6);

	return {
		summary: {
			totalEvents: events.length,
			totalTicketsSold,
			totalCheckedIn,
			totalRevenue,
			averageRating,
			completionRate,
			draftEvents: draftEvents.length,
			publishedEvents: publishedEvents.length,
			cancelledEvents: cancelledEvents.length,
			upcomingEvents: upcomingEvents.length,
		},
		events: eventAnalytics,
		recentBookings,
		recentAttendees,
		topEvents,
		statusCounts,
		categoryCounts: categories,
		monthlyRevenue,
		monthlyTickets,
		monthlyAttendance,
		revenueByEvent: revenueByEventSeries,
		ticketTypeBreakdown: ticketTypeBreakdownSeries,
		recentActivities,
	};
};

export const getAdminDashboard = async () => {
	await dbConnect();
	const now = new Date(); const startToday = new Date(now.getFullYear(), now.getMonth(), now.getDate()); const startWeek = new Date(startToday); startWeek.setDate(startToday.getDate() - startToday.getDay()); const startMonth = new Date(now.getFullYear(), now.getMonth(), 1);

	const [
		totalUsers,
		usersByRole,
		totalEvents,
		eventsByStatus,
		totalTickets,
		paymentsAggregate,
		totalVendors,
		vendorsByStatus,
		pendingStalls,
		recentUsers,
		recentEvents,
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
		Vendor.aggregate([{ $unwind: "$stallBookings" }, { $match: { "stallBookings.status": "pending" } }, { $count: "count" }]),
		User.find().select("-password").sort({ createdAt: -1 }).limit(5).exec(),
		Event.find().select("title organizer venue startDate status createdAt").populate("organizer", "name").sort({ createdAt: -1 }).limit(5).lean().exec(),
	]);
	const [todayTickets, paymentsByStatus, revenueWindows, newUsersThisWeek, newEventsThisWeek, ongoingEvents] = await Promise.all([
		Ticket.countDocuments({ ticketStatus: "active", purchaseDate: { $gte: startToday } }),
		Payment.aggregate([{ $group: { _id: "$paymentStatus", count: { $sum: 1 } } }]),
		Payment.aggregate([{ $match: { paymentStatus: "paid" } }, { $group: { _id: null, today: { $sum: { $cond: [{ $gte: ["$createdAt", startToday] }, "$amount", 0] } }, week: { $sum: { $cond: [{ $gte: ["$createdAt", startWeek] }, "$amount", 0] } }, month: { $sum: { $cond: [{ $gte: ["$createdAt", startMonth] }, "$amount", 0] } } } }]),
		User.countDocuments({ createdAt: { $gte: startWeek } }), Event.countDocuments({ createdAt: { $gte: startWeek } }), Event.countDocuments({ status: "published", startDate: { $lte: now }, endDate: { $gte: now } }),
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
	const paymentCounts = paymentsByStatus.reduce((acc, curr) => { acc[curr._id] = curr.count; return acc; }, {} as Record<string, number>);

	return {
			summary: {
			totalUsers,
			totalEvents,
			totalTickets,
			totalRevenue: paymentsAggregate[0]?.totalRevenue ?? 0,
			totalVendors,
			activeEvents: statusCounts.published ?? 0, draftEvents: statusCounts.draft ?? 0, completedEvents: statusCounts.completed ?? 0, cancelledEvents: statusCounts.cancelled ?? 0, upcomingEvents: await Event.countDocuments({ status: "published", startDate: { $gt: now } }), ongoingEvents, ticketsSoldToday: todayTickets, revenueToday: revenueWindows[0]?.today ?? 0, revenueThisWeek: revenueWindows[0]?.week ?? 0, revenueThisMonth: revenueWindows[0]?.month ?? 0, pendingPayments: paymentCounts.pending ?? 0, successfulPayments: paymentCounts.paid ?? 0, failedPayments: paymentCounts.failed ?? 0, refundedPayments: paymentCounts.refunded ?? 0, totalOrganizers: roleCounts.organizer ?? 0, totalAttendees: roleCounts.attendee ?? 0, totalTicketCheckers: roleCounts.ticket_checker ?? 0, pendingVendors: vendorCounts.pending ?? 0, pendingEvents: await Event.countDocuments({ approvalStatus: "pending" }), pendingStalls: pendingStalls[0]?.count ?? 0, newUsersThisWeek, newEventsThisWeek,
		},
		roles: roleCounts,
		eventStatuses: statusCounts,
		vendorStatuses: vendorCounts,
		recentUsers,
		recentEvents,
	};
};
