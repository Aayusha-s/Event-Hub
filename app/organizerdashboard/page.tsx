'use client';

import Button from '@/components/Button';
import DashboardBox from '@/components/DashboardBox';
import VendorCards from '@/components/VendorCards';
import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, Calendar, Clock, Crown, DollarSign, Goal, MapPin, Megaphone, Plus, SquarePen, Star, Ticket, TrendingUp, Users, Zap } from 'lucide-react';

type DashboardEvent = {
	_id: string;
	title: string;
	venue: string;
	startDate: string;
	endDate: string;
	capacity: number;
	ticketsSold: number;
	checkedIn: number;
	revenue: number;
	averageRating: number;
	reviewCount: number;
	attendanceRate: number;
	remaining: number;
	status: 'draft' | 'published' | 'cancelled' | 'completed';
	images: string[];
};

type DashboardData = {
	summary: {
		totalEvents: number;
		totalTicketsSold: number;
		totalCheckedIn: number;
		totalRevenue: number;
		averageRating: number;
		completionRate: number;
		draftEvents: number;
		publishedEvents: number;
		cancelledEvents: number;
		upcomingEvents: number;
	};
	events: DashboardEvent[];
	recentBookings: Array<{ _id: string; user?: { name?: string }; event?: { title?: string }; totalAmount?: number; createdAt?: string }>;
	recentAttendees: Array<{ _id: string; user?: { name?: string }; event?: { title?: string }; ticketType?: string; purchaseDate?: string }>;
	topEvents: DashboardEvent[];
	statusCounts: Record<string, number>;
	categoryCounts: Record<string, number>;
	monthlyRevenue: Array<{ label: string; value: number }>;
	monthlyTickets: Array<{ label: string; value: number }>;
	monthlyAttendance: Array<{ label: string; value: number }>;
	revenueByEvent: Array<{ label: string; value: number; meta?: string }>;
	ticketTypeBreakdown: Array<{ eventId: string; title: string; items: Array<{ name: string; sold: number; remaining: number; revenue: number }> }>;
	recentActivities: Array<{ _id: string; title: string; createdAt: string }>;
};

const fallbackImage = '/images/party.png';
const formatDate = (value: string) => new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' }).format(new Date(value));
const formatMoney = (value: number) => `Rs. ${Number(value).toLocaleString()}`;

export default function Page() {
	const router = useRouter();
	const [dashboard, setDashboard] = useState<DashboardData | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');

	const loadDashboard = async () => {
		try {
			setLoading(true);
			const response = await fetch('/api/organizer/dashboard', { cache: 'no-store' });
			const result = await response.json();
			if (!response.ok || !result.success) throw new Error(result.error?.message || 'Unable to load dashboard.');
			setDashboard(result.data as DashboardData);
			setError('');
		} catch (loadError) {
			setError(loadError instanceof Error ? loadError.message : 'Unable to load dashboard.');
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		loadDashboard();
	}, []);

	const events = dashboard?.events ?? [];
	const topEvents = dashboard?.topEvents ?? [];
	const recentBookings = dashboard?.recentBookings ?? [];
	const recentAttendees = dashboard?.recentAttendees ?? [];
	const activeEvent = events[0];
	const secondaryEvent = events[1];
	const maxRevenue = Math.max(...(dashboard?.monthlyRevenue.map((item) => item.value) ?? [1]), 1);

	const quickStats = useMemo(() => ([
		{ label: 'Draft', value: dashboard?.summary.draftEvents ?? 0 },
		{ label: 'Published', value: dashboard?.summary.publishedEvents ?? 0 },
		{ label: 'Cancelled', value: dashboard?.summary.cancelledEvents ?? 0 },
		{ label: 'Upcoming', value: dashboard?.summary.upcomingEvents ?? 0 },
	]), [dashboard]);

	const manageEvent = async (eventId: string, action: string) => {
		const response = await fetch(`/api/events/${eventId}`, {
			method: action === 'duplicate' ? 'POST' : 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ action }),
		});
		const result = await response.json();
		if (!response.ok || !result.success) throw new Error(result.error?.message || 'Unable to update event.');
		await loadDashboard();
	};

	const deleteEvent = async (eventId: string) => {
		const response = await fetch(`/api/events/${eventId}`, { method: 'DELETE' });
		const result = await response.json();
		if (!response.ok || !result.success) throw new Error(result.error?.message || 'Unable to delete event.');
		await loadDashboard();
	};

	return (
		<section className='flex flex-col my-4 mx-2 px-4 font-cause text-text-dark md:my-3 md:mx-3 md:px-3 lg:my-4 lg:mx-4 lg:px-4 xl:my-6 xl:mx-6 xl:px-6 2xl:my-8 2xl:mx-8 2xl:px-8'>
			<DashboardBox
				title='Organizer Dashboard'
				description={loading ? 'Loading your events and revenue metrics…' : `Managing ${dashboard?.summary.totalEvents ?? 0} events with ${dashboard?.summary.totalTicketsSold ?? 0} tickets sold and ${formatMoney(dashboard?.summary.totalRevenue ?? 0)} revenue`}
				buttonText='Create New Event'
				buttonIcon={<Plus />}
				buttonLink='/create-event/step-1'
			/>

			{error && <p className='mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700'>{error}</p>}

			<div className='w-full border border-brown-normal rounded-xl p-4 mt-6 space-y-4'>
				<h3 className='font-dynapuff'><Crown className='inline-block mr-2' />Upgrade to Premium Organizer</h3>
				<p>Get featured placement, advanced analytics, promotion tools, lower fees, and early payouts for $49/month</p>
				<div className='mt-4 space-y-2 flex flex-row flex-wrap gap-5 font-bold'>
					<p><Star className='inline-block mr-1 text-blue-500' />Featured Placement</p>
					<p><Megaphone className='inline-block mr-1' />Promotion Tools</p>
					<p><Zap className='inline-block mr-1' />Early Payouts</p>
					<p><TrendingUp className='inline-block mr-1' />Advanced Analytics</p>
				</div>
				<div><Button text='Upgrade Now - $49/month' variant='cta' iconRight={<i className='fa-solid fa-arrow-right ml-2 '></i>} /></div>
			</div>

			<div className='flex flex-col md:flex-row md:gap-4 lg:gap-6 justify-between'>
				<VendorCards icon1={<DollarSign className='text-3xl text-green-500' />} count={formatMoney(dashboard?.summary.totalRevenue ?? 0)} label='Total Revenue' icon2={<TrendingUp className='inline mr-2 text-green-500' />} subLabel='Live from MongoDB' />
				<VendorCards icon1={<Ticket className='text-3xl text-blue-500' />} count={dashboard?.summary.totalTicketsSold ?? 0} label='Tickets Sold' subLabel='Across all events' />
				<VendorCards icon1={<Star className='text-3xl text-yellow-500' />} count={(dashboard?.summary.averageRating ?? 0).toFixed(1)} label='Average Rating' subLabel='From live reviews' />
				<VendorCards icon1={<Goal className='text-3xl text-purple-500' />} count={`${dashboard?.summary.completionRate ?? 0}%`} label='Attendance' subLabel='Checked-in ticket rate' />
			</div>

			<div className='flex flex-wrap gap-3 mt-4'>
				{quickStats.map((item) => <div key={item.label} className='rounded-full border border-brown-normal px-4 py-2 text-sm font-semibold'>{item.label}: {item.value}</div>)}
			</div>

			<div className='flex flex-col gap-6 justify-between'>
				<div className='flex flex-col justify-between mt-10'>
					<div className='flex flex-row items-center justify-between'>
						<h2 className='text-xl md:text-xl lg:text-2xl font-bold'>Upcoming Events</h2>
						<Button text='View All' variant='secondary' size='sm' iconRight={<ArrowRight size={18} />} onClick={() => router.push('/explore-events')} />
					</div>

					<div className='border border-brown-normal rounded-xl mt-6 p-4 w-full grid grid-cols-1 xl:grid-cols-2 gap-4'>
						{[activeEvent, secondaryEvent].filter(Boolean).map((event) => (
							<div key={event!._id} className='p-4 w-full border border-brown-normal rounded-xl space-y-1'>
								<div className='flex flex-col md:flex-row gap-4 w-full'>
									<Image src={event!.images[0] ?? fallbackImage} alt={event!.title} width={200} height={150} className='rounded-2xl w-[200px] h-auto object-cover' />
									<div className='flex-1'>
										<div className='flex flex-col gap-4'>
											<div className='flex flex-row gap-4 items-center flex-wrap'><h3 className='font-bold text-lg'>{event!.title}</h3><div className='flex items-center gap-1 bg-green-100 px-2 py-1 rounded-full text-xs font-medium'><Clock size={14} className='text-green-700' /><p className='text-green-700 capitalize'>{event!.status}</p></div></div>
											<div className='flex flex-col md:flex-row gap-4'><p className='text-sm'><Calendar className='inline mr-1' size={18} /> {formatDate(event!.startDate)}</p><p className='text-sm'><MapPin className='inline mr-1' size={18} /> {event!.venue}</p></div>
										</div>

										<div className='flex flex-row justify-between mt-4'><p className='text-sm'>{event!.ticketsSold}/{event!.capacity} tickets sold</p><p className='text-sm'>{event!.attendanceRate}%</p></div>

										<div className='h-2 bg-gray-300 w-full rounded-full mt-1'><div className='bg-green-500 h-2 rounded-full' style={{ width: `${Math.min(100, event!.attendanceRate)}%` }} /></div>

										<div className='mt-4 flex flex-col md:flex-row gap-4 justify-between items-center'>
											<p className='text-lg font-bold'><DollarSign className='inline text-green-500' size={18} /> {event!.revenue.toLocaleString()}</p>
											<div className='flex flex-row gap-2 justify-between items-center flex-wrap'>
												<Button text='Details' variant='cta' size='sm' iconLeft={<ArrowRight size={18} />} onClick={() => router.push(`/event-details/${event!._id}`)} />
												<Button text='Edit' variant='cta' size='sm' iconLeft={<SquarePen size={18} />} onClick={() => router.push(`/create-event/step-1?eventId=${event!._id}`)} />
												<Button text='Duplicate' variant='secondary' size='sm' onClick={() => manageEvent(event!._id, 'duplicate')} />
												<Button text={event!.status === 'published' ? 'Unpublish' : 'Publish'} variant='secondary' size='sm' onClick={() => manageEvent(event!._id, event!.status === 'published' ? 'unpublish' : 'published')} />
												<Button text='Archive' variant='secondary' size='sm' onClick={() => manageEvent(event!._id, 'archive')} />
												<Button text='Delete' variant='secondary' size='sm' status='danger' onClick={() => deleteEvent(event!._id)} />
											</div>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>

				<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
					<div className='flex flex-col mt-10'>
						<div className='flex flex-row items-center justify-between'>
							<h2 className='text-lg md:text-xl lg:text-2xl font-bold'>Sales Performance</h2>
							<Button text='View All' variant='secondary' size='sm' iconRight={<ArrowRight size={18} />} onClick={() => router.push('/analytics')} />
						</div>

						<div className='border border-brown-normal rounded-xl mt-6 p-4 w-full justify-items-center'>
							{topEvents.length ? topEvents.map((event, index) => (
								<div key={event._id} className='w-full'>
									<div className='flex flex-row gap-4 justify-between items-center'><h3 className='text-lg font-bold'>{index + 1}. {event.title}</h3><div className='flex flex-row items-center gap-1'><Star className='text-yellow-500' size={18} /><h3>{event.averageRating.toFixed(1)} ({event.reviewCount})</h3></div></div>
									<div><h3 className='text-sm'>{formatDate(event.startDate)}</h3></div>
									<div className='flex flex-row justify-between mt-4'><div><h3>Attendees</h3><div className='flex flex-row items-center gap-2'><Users size={18} /><p>{event.ticketsSold}</p></div></div><div><h3>Revenue</h3><div className='flex flex-row items-center gap-2'><DollarSign size={18} className='text-green-500' /><p>{event.revenue.toLocaleString()}</p></div></div></div>
									{index < topEvents.length - 1 && <div className='w-full h-0.5 bg-brown-light-hover mb-6 mt-4' />}
								</div>
							)) : <p className='text-sm text-text-light'>No events available yet.</p>}
							<Button text='View Analytics' variant='cta' className='mt-4' onClick={() => router.push('/analytics')} />
						</div>
					</div>

					<div className='flex flex-col mt-10'>
						<div className='flex flex-row items-center justify-between'>
							<h2 className='text-lg md:text-xl lg:text-2xl font-bold'>Recent Activity</h2>
							<Button text='View All' variant='secondary' size='sm' iconRight={<ArrowRight size={18} />} onClick={() => router.push('/analytics')} />
						</div>

						<div className='border border-brown-normal rounded-xl mt-6 p-4 w-full justify-items-center'>
							{[
								...recentBookings.slice(0, 3).map((booking) => ({ icon: <Ticket className='text-green-500' size={18} />, label: `${booking.user?.name ?? 'Guest'} booked ${booking.event?.title ?? 'an event'}`, time: booking.createdAt ? new Date(booking.createdAt).toLocaleString() : 'Recently' })),
								...recentAttendees.slice(0, 2).map((ticket) => ({ icon: <Users className='text-blue-500' size={18} />, label: `${ticket.user?.name ?? 'Guest'} checked in for ${ticket.event?.title ?? 'an event'}`, time: ticket.purchaseDate ? new Date(ticket.purchaseDate).toLocaleString() : 'Recently' })),
							].slice(0, 5).map((item, index, list) => (
								<div key={`${item.label}-${index}`} className='w-full'>
									<div className='w-full flex flex-row gap-4 items-center'><div className='w-10 h-10 bg-green-50 rounded-[50px] flex items-center justify-center'>{item.icon}</div><div className='flex flex-col'><p className='font-semibold'>{item.label}</p><p className='text-sm text-gray-500'>{item.time}</p></div></div>
									{index < list.length - 1 && <div className='w-full h-0.5 bg-brown-light-hover my-4' />}
								</div>
							))}

							<div className='w-full h-0.5 bg-brown-light-hover my-4' />
							<Button text='View All Activity' variant='cta' onClick={() => router.push('/analytics')} />
						</div>
					</div>
				</div>

				<div className='grid grid-cols-1 lg:grid-cols-3 gap-4 mt-6'>
					<div className='border border-brown-normal rounded-xl p-4'>
						<h3 className='text-lg font-bold mb-4'>Monthly Revenue</h3>
						<div className='space-y-3'>
							{dashboard?.monthlyRevenue.map((item) => <div key={item.label}><div className='flex justify-between text-sm font-semibold'><span>{item.label}</span><span>{item.value.toLocaleString()}</span></div><div className='h-2 rounded-full bg-brown-light-active mt-1'><div className='h-2 rounded-full bg-brown-normal' style={{ width: `${Math.max(8, Math.round((item.value / maxRevenue) * 100))}%` }} /></div></div>)}
						</div>
					</div>
					<div className='border border-brown-normal rounded-xl p-4'>
						<h3 className='text-lg font-bold mb-4'>Status Counts</h3>
						<div className='space-y-3 text-sm'>{Object.entries(dashboard?.statusCounts ?? {}).map(([status, count]) => <div key={status} className='flex justify-between'><span className='capitalize'>{status}</span><span>{count}</span></div>)}</div>
					</div>
					<div className='border border-brown-normal rounded-xl p-4'>
						<h3 className='text-lg font-bold mb-4'>Category Analytics</h3>
						<div className='space-y-3 text-sm'>{Object.entries(dashboard?.categoryCounts ?? {}).map(([category, count]) => <div key={category} className='flex justify-between gap-3'><span className='truncate'>{category}</span><span>{count}</span></div>)}</div>
					</div>
				</div>
			</div>
		</section>
	);
}