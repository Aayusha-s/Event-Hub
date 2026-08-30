'use client';

import Button from '@/components/Button';
import DashboardBox from '@/components/DashboardBox';
import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Archive, BarChart3, Calendar, CheckCircle2, Clock, DollarSign, Edit, Eye, Plus, Trash2, TrendingUp } from 'lucide-react';

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
	approvalStatus?: 'pending' | 'approved' | 'rejected';
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
	monthlyRevenue: Array<{ label: string; value: number }>;
	recentActivities: Array<{ _id: string; title: string; createdAt: string }>;
};

const fallbackImage = '/images/party.png';
const formatDate = (value: string) => new Intl.DateTimeFormat('en-US', { dateStyle: 'short' }).format(new Date(value));
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
		if (!confirm('Are you sure you want to delete this event?')) return;
		const response = await fetch(`/api/events/${eventId}`, { method: 'DELETE' });
		const result = await response.json();
		if (!response.ok || !result.success) throw new Error(result.error?.message || 'Unable to delete event.');
		await loadDashboard();
	};

	return (
		<section className='flex flex-col my-6 mx-2 px-4 font-cause text-text-dark md:my-8 md:mx-3 md:px-3 lg:my-8 lg:mx-4 lg:px-4 xl:my-10 xl:mx-6 xl:px-6 2xl:my-12 2xl:mx-8 2xl:px-8'>
			{/* Header */}
			<div className='mb-8 flex items-center justify-between'>
				<div>
					<h1 className='text-3xl md:text-4xl font-bold mb-2'>Event Management</h1>
					<p className='text-text-light'>Create, manage, and analyze your events</p>
				</div>
				<Button text='Create New Event' variant='cta' size='lg' iconLeft={<Plus size={20} />} onClick={() => router.push('/create-event/step-1')} />
			</div>

			{error && <div className='mb-6 rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700'>{error}</div>}

			{/* Key Metrics */}
			<div className='grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-8'>
				<div className='rounded-xl border border-border bg-surface-hover p-4'>
					<div className='text-sm text-text-light mb-1 flex items-center gap-1'><Calendar size={14} /> Total Events</div>
					<div className='text-2xl font-bold'>{dashboard?.summary.totalEvents}</div>
				</div>
				<div className='rounded-xl border border-border bg-surface-hover p-4'>
					<div className='text-sm text-text-light mb-1 flex items-center gap-1'><DollarSign size={14} /> Total Revenue</div>
					<div className='text-2xl font-bold text-green-500'>{formatMoney(dashboard?.summary.totalRevenue ?? 0)}</div>
				</div>
				<div className='rounded-xl border border-border bg-surface-hover p-4'>
					<div className='text-sm text-text-light mb-1 flex items-center gap-1'><CheckCircle2 size={14} /> Tickets Sold</div>
					<div className='text-2xl font-bold'>{dashboard?.summary.totalTicketsSold}</div>
				</div>
				<div className='rounded-xl border border-border bg-surface-hover p-4'>
					<div className='text-sm text-text-light mb-1 flex items-center gap-1'><TrendingUp size={14} /> Avg Rating</div>
					<div className='text-2xl font-bold text-yellow-500'>{(dashboard?.summary.averageRating ?? 0).toFixed(1)}</div>
				</div>
			</div>

			{/* Event Status Overview */}
			{dashboard && (
				<div className='mb-8 grid grid-cols-2 md:grid-cols-4 gap-3'>
					<div className='rounded-lg bg-blue-50 border border-blue-200 p-3 text-center'>
						<div className='text-2xl font-bold text-blue-600'>{dashboard.summary.publishedEvents}</div>
						<div className='text-xs text-blue-700'>Published</div>
					</div>
					<div className='rounded-lg bg-yellow-50 border border-yellow-200 p-3 text-center'>
						<div className='text-2xl font-bold text-yellow-600'>{dashboard.summary.draftEvents}</div>
						<div className='text-xs text-yellow-700'>Drafts</div>
					</div>
					<div className='rounded-lg bg-green-50 border border-green-200 p-3 text-center'>
						<div className='text-2xl font-bold text-green-600'>{dashboard.summary.upcomingEvents}</div>
						<div className='text-xs text-green-700'>Upcoming</div>
					</div>
					<div className='rounded-lg bg-gray-50 border border-gray-200 p-3 text-center'>
						<div className='text-2xl font-bold text-gray-600'>{dashboard.summary.cancelledEvents}</div>
						<div className='text-xs text-gray-700'>Cancelled</div>
					</div>
				</div>
			)}

			{/* Events Management Section */}
			<div className='mb-10'>
				<div className='flex items-center justify-between mb-4'>
					<h2 className='text-2xl font-bold'>Your Events</h2>
					<Button text='View Analytics' variant='secondary' size='sm' iconLeft={<BarChart3 size={16} />} onClick={() => router.push('/analytics')} />
				</div>

				{events.length === 0 ? (
					<div className='rounded-xl border-2 border-dashed border-border p-12 text-center'>
						<Calendar size={48} className='mx-auto text-primary mb-4' />
						<h3 className='text-xl font-bold mb-2'>No Events Created Yet</h3>
						<p className='text-text-light mb-6'>Start by creating your first event</p>
						<Button text='Create Event' variant='cta' onClick={() => router.push('/create-event/step-1')} />
					</div>
				) : (
					<div className='space-y-4'>
						{events.map((event) => (
							<div key={event._id} className='rounded-xl border border-border bg-surface-hover overflow-hidden hover:shadow-md transition-shadow'>
								<div className='flex flex-col md:flex-row gap-4 p-4'>
									{/* Event Image */}
									<div className='md:w-40 h-32 rounded-lg overflow-hidden bg-gray-200 flex-shrink-0'>
										<Image 
											src={event.images[0] ?? fallbackImage} 
											alt={event.title} 
											width={160} 
											height={128} 
											className='w-full h-full object-cover' 
										/>
									</div>

									{/* Event Details */}
									<div className='flex-1 min-w-0'>
										<div className='flex flex-wrap items-center gap-2 mb-2'>
											<h3 className='text-lg font-bold'>{event.title}</h3>
											<div className={`text-xs px-2 py-1 rounded-full font-semibold ${
												event.status === 'published' ? 'bg-blue-100 text-blue-700' :
												event.status === 'draft' ? 'bg-yellow-100 text-yellow-700' :
												event.status === 'completed' ? 'bg-green-100 text-green-700' :
												'bg-red-100 text-red-700'
											}`}>
												{event.status}
											</div>
											{event.approvalStatus === 'pending' && <div className='text-xs px-2 py-1 rounded-full bg-amber-100 text-amber-700 font-semibold'>Pending Approval</div>}
										</div>

										<div className='grid grid-cols-2 md:grid-cols-4 gap-3 text-sm mb-3'>
											<div>
												<p className='text-text-light text-xs'>Date</p>
												<p className='font-semibold'>{formatDate(event.startDate)}</p>
											</div>
											<div>
												<p className='text-text-light text-xs'>Tickets</p>
												<p className='font-semibold'>{event.ticketsSold}/{event.capacity}</p>
											</div>
											<div>
												<p className='text-text-light text-xs'>Revenue</p>
												<p className='font-semibold text-green-600'>{formatMoney(event.revenue)}</p>
											</div>
											<div>
												<p className='text-text-light text-xs'>Rating</p>
												<p className='font-semibold text-yellow-600'>{event.averageRating.toFixed(1)} ({event.reviewCount})</p>
											</div>
										</div>

										{/* Progress Bar */}
										<div className='mb-4'>
											<div className='flex justify-between text-xs mb-1'>
												<span className='text-text-light'>Attendance</span>
												<span className='font-semibold'>{Math.round(event.attendanceRate)}%</span>
											</div>
											<div className='h-2 bg-border rounded-full overflow-hidden'>
												<div className='h-full bg-primary transition-all' style={{ width: `${event.attendanceRate}%` }} />
											</div>
										</div>

										{/* Action Buttons */}
										<div className='flex flex-wrap gap-2'>
											<Button text='View' variant='secondary' size='sm' iconLeft={<Eye size={14} />} onClick={() => router.push(`/event-details/${event._id}`)} />
											<Button text='Edit' variant='secondary' size='sm' iconLeft={<Edit size={14} />} onClick={() => router.push(`/create-event/step-1?eventId=${event._id}`)} />
											<Button text='Duplicate' variant='secondary' size='sm' onClick={() => manageEvent(event._id, 'duplicate')} />
											<Button text='Archive' variant='secondary' size='sm' iconLeft={<Archive size={14} />} onClick={() => manageEvent(event._id, 'archive')} />
											<Button text='Delete' variant='secondary' size='sm' status='danger' iconLeft={<Trash2 size={14} />} onClick={() => deleteEvent(event._id)} />
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				)}
			</div>

			{/* Top Performing Events */}
			{topEvents.length > 0 && (
				<div>
					<h2 className='text-2xl font-bold mb-4'>Top Performing Events</h2>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
						{topEvents.slice(0, 2).map((event, index) => (
							<div key={event._id} className='rounded-xl border border-border bg-surface-hover p-4'>
								<div className='flex items-start justify-between mb-3'>
									<h3 className='font-bold text-lg flex-1 pr-2'>{event.title}</h3>
									<div className='bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-sm font-bold'>#{index + 1}</div>
								</div>

								<div className='space-y-2 mb-4'>
									<div className='flex justify-between text-sm'>
										<span className='text-text-light'>Attendees</span>
										<span className='font-semibold'>{event.ticketsSold}</span>
									</div>
									<div className='flex justify-between text-sm'>
										<span className='text-text-light'>Revenue</span>
										<span className='font-semibold text-green-600'>{formatMoney(event.revenue)}</span>
									</div>
									<div className='flex justify-between text-sm'>
										<span className='text-text-light'>Check-in Rate</span>
										<span className='font-semibold'>{Math.round(event.attendanceRate)}%</span>
									</div>
									<div className='flex justify-between text-sm'>
										<span className='text-text-light'>Rating</span>
										<span className='font-semibold text-yellow-600'>{event.averageRating.toFixed(1)}</span>
									</div>
								</div>

								<Button text='View Details' variant='cta' size='sm' className='w-full' onClick={() => router.push(`/event-details/${event._id}`)} />
							</div>
						))}
					</div>
				</div>
			)}
		</section>
	);
}
