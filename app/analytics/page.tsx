'use client';

import { useEffect, useMemo, useState } from 'react';
import { ChartColumn, DollarSign, ShoppingBag, TrendingUp, Users } from 'lucide-react';
import VendorCards from '@/components/VendorCards';
import Button from '@/components/Button';
import { useRouter } from 'next/navigation';

type DashboardEvent = {
	_id: string;
	title: string;
	startDate: string;
	ticketsSold: number;
	revenue: number;
	averageRating: number;
	reviewCount: number;
	venue: string;
	status: string;
};

type DashboardData = {
	summary: {
		totalRevenue: number;
		totalTicketsSold: number;
		totalCheckedIn: number;
		averageRating: number;
		completionRate: number;
	};
	monthlyRevenue: Array<{ label: string; value: number }>;
	monthlyTickets: Array<{ label: string; value: number }>;
	monthlyAttendance: Array<{ label: string; value: number }>;
	revenueByEvent: Array<{ label: string; value: number; meta?: string }>;
	topEvents: DashboardEvent[];
	categoryCounts: Record<string, number>;
	ticketTypeBreakdown: Array<{ eventId: string; title: string; items: Array<{ name: string; sold: number; remaining: number; revenue: number }> }>;
};

const formatMoney = (value: number) => `Rs. ${Number(value).toLocaleString()}`;

export default function Page() {
	const router = useRouter();
	const [dashboard, setDashboard] = useState<DashboardData | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');

	useEffect(() => {
		let active = true;
		fetch('/api/organizer/dashboard', { cache: 'no-store' }).then(async (response) => {
			const result = await response.json();
			if (!response.ok || !result.success) throw new Error(result.error?.message || 'Unable to load analytics.');
			if (active) setDashboard(result.data as DashboardData);
		}).catch((loadError) => {
			if (active) setError(loadError instanceof Error ? loadError.message : 'Unable to load analytics.');
		}).finally(() => {
			if (active) setLoading(false);
		});
		return () => { active = false; };
	}, []);

	const maxRevenue = Math.max(...(dashboard?.monthlyRevenue.map((item) => item.value) ?? [1]), 1);
	const maxTickets = Math.max(...(dashboard?.monthlyTickets.map((item) => item.value) ?? [1]), 1);
	const maxAttendance = Math.max(...(dashboard?.monthlyAttendance.map((item) => item.value) ?? [1]), 1);
	const topEvents = dashboard?.topEvents ?? [];

	const statCards = useMemo(() => ([
		{ icon: <DollarSign className='text-3xl text-green-500' />, count: formatMoney(dashboard?.summary.totalRevenue ?? 0), label: 'Total Revenue', subLabel: 'Live from MongoDB' },
		{ icon: <ShoppingBag className='text-3xl text-purple-500' />, count: dashboard?.summary.totalTicketsSold ?? 0, label: 'Total Sales', subLabel: 'Tickets sold' },
		{ icon: <Users className='text-3xl text-blue-500' />, count: dashboard?.summary.totalCheckedIn ?? 0, label: 'Customer Reach', subLabel: 'Checked-in attendees' },
		{ icon: <ChartColumn className='text-3xl text-red-500' />, count: `${dashboard?.summary.completionRate ?? 0}%`, label: 'Conversion Rate', subLabel: 'Attendance completion' },
	]), [dashboard]);

	return (
		<section className='flex flex-col my-4 mx-2 px-4 font-cause text-text-dark md:my-3 md:mx-3 md:px-3 lg:my-4 lg:mx-4 lg:px-4 xl:my-6 xl:mx-6 xl:px-6 2xl:my-8 2xl:mx-8 2xl:px-8'>
			<h3 className='font-dynapuff text-lg md:text-xl lg:text-2xl font-semibold mb-1'>Detailed Analytics</h3>
			<p className='text-lg md:text-xl lg:text-xl font-semibold'>{loading ? 'Loading live analytics…' : 'Track your performance and sales metrics'}</p>

			{error && <p className='mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700'>{error}</p>}

			<div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-2 lg:gap-4 justify-between'>
				{statCards.map((card) => <VendorCards key={card.label} icon1={card.icon} count={card.count} label={card.label} icon2={<TrendingUp className='inline mr-2 text-green-500' />} subLabel={card.subLabel} />)}
			</div>

			<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
				<div className='flex flex-col mt-10'>
					<div className='border border-brown-normal rounded-xl p-4 w-full'>
						<h2 className='text-lg md:text-xl lg:text-2xl font-bold mb-8'>Revenue by Event</h2>
						<div className='space-y-6'>
							{dashboard?.revenueByEvent.length ? dashboard.revenueByEvent.map((event) => (
								<div key={event.label} className='mb-2'>
									<div className='flex flex-row justify-between font-bold mb-2 text-md lg:text-xl'><p className='pr-4'>{event.label}</p><p>{formatMoney(event.value)}</p></div>
									<div className='flex flex-col gap-2'><p className='text-sm md:text-md lg:text-lg'>{event.meta ?? 'Event revenue'}</p><div className='w-full bg-brown-light-active h-2 rounded-full mt-2'><div className='bg-brown-normal h-2 rounded-full' style={{ width: `${Math.max(10, Math.round((event.value / maxRevenue) * 100))}%` }} /></div></div>
								</div>
							)) : <p className='text-sm text-text-light'>No revenue data available yet.</p>}
						</div>
					</div>
				</div>

				<div className='flex flex-col mt-10'>
					<div className='border border-brown-normal rounded-xl p-4 w-full'>
						<h2 className='text-lg md:text-xl lg:text-2xl font-bold mb-6'>Top Performing Events</h2>
						<div className='flex flex-col gap-8'>
							{topEvents.length ? topEvents.map((event, index) => (
								<div key={event._id} className='flex items-center justify-between'>
									<div className='flex flex-row gap-4 items-center'>
										<div className='border border-purple-500 bg-purple-50 w-15 h-15 flex items-center justify-center rounded-xl'><p className='font-bold'>{index + 1}</p></div>
										<div><p className='text-lg font-bold'>{event.title}</p><p>{event.ticketsSold} sales</p></div>
									</div>
									<p className='font-bold'>{formatMoney(event.revenue)}</p>
								</div>
							)) : <p className='text-sm text-text-light'>No top events yet.</p>}
						</div>
						<Button text='Open Organizer Dashboard' variant='cta' className='mt-6' onClick={() => router.push('/organizerdashboard')} />
					</div>
				</div>
			</div>

			<div className='border border-brown-normal rounded-xl p-4 w-full mt-10'>
				<div className='flex justify-between'>
					<h2 className='text-lg md:text-xl lg:text-2xl font-bold mb-6'>Revenue Trend</h2>
					<div><button className='flex items-center justify-end gap-1 bg-gray-300 text-black px-2 py-1 rounded-full text-sm'>Last 6 months</button></div>
				</div>
				<div className='flex flex-col gap-4'>
					{dashboard?.monthlyRevenue.length ? dashboard.monthlyRevenue.map((item) => (
						<div key={item.label}>
							<div className='flex justify-between font-bold'><p>{item.label}</p><p>{formatMoney(item.value)}</p></div>
							<div className='w-full bg-brown-light-active h-2 rounded-full mt-2 mb-4'><div className='bg-brown-normal h-2 rounded-full' style={{ width: `${Math.max(8, Math.round((item.value / maxRevenue) * 100))}%` }} /></div>
						</div>
					)) : <p className='text-sm text-text-light'>No monthly revenue yet.</p>}
				</div>
			</div>

			<div className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-10'>
				<div className='border border-brown-normal rounded-xl p-4'>
					<h2 className='text-lg md:text-xl lg:text-2xl font-bold mb-4'>Ticket Sales Trend</h2>
					<div className='space-y-3'>{dashboard?.monthlyTickets.map((item) => (<div key={item.label}><div className='flex justify-between text-sm font-semibold'><span>{item.label}</span><span>{item.value}</span></div><div className='h-2 rounded-full bg-brown-light-active mt-1'><div className='h-2 rounded-full bg-brown-normal' style={{ width: `${Math.max(8, Math.round((item.value / maxTickets) * 100))}%` }} /></div></div>))}</div>
				</div>
				<div className='border border-brown-normal rounded-xl p-4'>
					<h2 className='text-lg md:text-xl lg:text-2xl font-bold mb-4'>Attendance Trend</h2>
					<div className='space-y-3'>{dashboard?.monthlyAttendance.map((item) => (<div key={item.label}><div className='flex justify-between text-sm font-semibold'><span>{item.label}</span><span>{item.value}</span></div><div className='h-2 rounded-full bg-brown-light-active mt-1'><div className='h-2 rounded-full bg-green-500' style={{ width: `${Math.max(8, Math.round((item.value / maxAttendance) * 100))}%` }} /></div></div>))}</div>
				</div>
				<div className='border border-brown-normal rounded-xl p-4'>
					<h2 className='text-lg md:text-xl lg:text-2xl font-bold mb-4'>Category Analytics</h2>
					<div className='space-y-3 text-sm'>{Object.entries(dashboard?.categoryCounts ?? {}).map(([category, count]) => <div key={category} className='flex justify-between gap-3'><span className='truncate'>{category}</span><span>{count}</span></div>)}</div>
				</div>
			</div>

			<div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-10'>
				<div className='border border-brown-normal rounded-xl p-4 w-full'>
					<h2 className='text-lg md:text-xl lg:text-2xl font-bold mb-6'>Ticket Type Breakdown</h2>
					<div className='space-y-6'>
						{dashboard?.ticketTypeBreakdown.length ? dashboard.ticketTypeBreakdown.map((event) => (
							<div key={event.eventId} className='space-y-3'>
								<div className='font-bold'>{event.title}</div>
								{event.items.map((item) => <div key={`${event.eventId}-${item.name}`} className='text-sm'><div className='flex justify-between'><span>{item.name}</span><span>{item.sold} sold</span></div><div className='h-2 rounded-full bg-brown-light-active mt-1'><div className='h-2 rounded-full bg-brown-normal' style={{ width: `${Math.max(8, item.sold + item.remaining > 0 ? Math.round((item.sold / (item.sold + item.remaining)) * 100) : 0)}%` }} /></div></div>)}
							</div>
						)) : <p className='text-sm text-text-light'>No ticket breakdown available yet.</p>}
					</div>
				</div>

				<div className='border border-brown-normal rounded-xl p-4 w-full'>
					<h2 className='text-lg md:text-xl lg:text-2xl font-bold mb-6'>Key Insights</h2>
					<ul className='list-disc list-inside space-y-3'>
						<li>Your revenue total is <span className='font-bold'>{formatMoney(dashboard?.summary.totalRevenue ?? 0)}</span> and updates directly from MongoDB.</li>
						<li>Your top event is <span className='font-bold'>{topEvents[0]?.title ?? 'not available yet'}</span>.</li>
						<li>You have <span className='font-bold'>{dashboard?.summary.totalTicketsSold ?? 0}</span> live ticket sales and <span className='font-bold'>{dashboard?.summary.totalCheckedIn ?? 0}</span> checked-in attendees.</li>
						<li>The average rating across organizer events is <span className='font-bold'>{(dashboard?.summary.averageRating ?? 0).toFixed(1)}</span>.</li>
						<li>The attendance completion rate is <span className='font-bold'>{dashboard?.summary.completionRate ?? 0}%</span>.</li>
					</ul>
				</div>
			</div>
		</section>
	);
}