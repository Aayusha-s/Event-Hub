'use client';

import { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import EventCard from '@/components/EventCard';
import Pagination from '@/components/Pagination';
import { Search, ListFilter, X, ChevronDown } from 'lucide-react';

type Event = {
	_id: string;
	title: string;
	description: string;
	venue: string;
	category: string;
	tags: string[];
	images: string[];
	ticketTypes: { price: number }[];
	startDate: string;
	endDate: string;
	organizer?: { name?: string };
};

type Result = {
	items: Event[];
	pagination: { page: number; totalPages: number; total: number };
};

function Content() {
	const params = useSearchParams();
	const router = useRouter();
	const [result, setResult] = useState<Result | null>(null);
	const [loading, setLoading] = useState(true);
	const [showFilters, setShowFilters] = useState(false);
	const [searchInput, setSearchInput] = useState(params.get('search') || '');

	const update = (key: string, value: string) => {
		const q = new URLSearchParams(params.toString());
		if (value) q.set(key, value);
		else q.delete(key);
		q.set('page', '1');
		router.push(`/explore-events?${q}`);
	};

	const handleSearch = (e: React.FormEvent) => {
		e.preventDefault();
		update('search', searchInput);
	};

	useEffect(() => {
		const q = new URLSearchParams(params.toString());
		q.set('status', 'published');
		q.set('pageSize', q.get('pageSize') ?? '12');
		if (q.get('query')) {
			q.set('search', q.get('query')!);
			q.delete('query');
		}
		fetch(`/api/events?${q}`)
			.then((r) => r.json())
			.then((r) => {
				if (r.success) setResult(r.data);
			})
			.finally(() => setLoading(false));
	}, [params]);

	const page = Number(params.get('page') ?? '1');
	const hasActiveFilters =
		params.get('search') ||
		params.get('sort') ||
		params.get('availability') ||
		params.get('category');

	return (
		<div className="min-h-screen bg-gradient-to-b from-background to-white">
			{/* Hero Header */}
			<section className="bg-gradient-to-r from-brown-light via-background to-white py-12 md:py-16 border-b border-border">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<div className="mb-8">
						<h1 className="font-dynapuff text-4xl md:text-5xl font-bold text-text-dark mb-2">
							Discover Events
						</h1>
						<p className="text-lg text-text-light">
							Find and explore thousands of amazing events happening around you
						</p>
					</div>

					{/* Search Bar */}
					<form onSubmit={handleSearch} className="flex gap-2">
						<div className="flex-1 relative">
							<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-light" size={20} />
							<input
								type="text"
								placeholder="Search events, organizers, or venues..."
								value={searchInput}
								onChange={(e) => setSearchInput(e.target.value)}
								className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-white text-text-dark placeholder-text-light focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
							/>
						</div>
						<button
							type="submit"
							className="px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary-dark transition"
						>
							Search
						</button>
					</form>
				</div>
			</section>

			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
				{/* Filter Toggle & Active Filters */}
				<div className="mb-8">
					<div className="flex items-center justify-between mb-4">
						<div className="flex items-center gap-2">
							<button
								onClick={() => setShowFilters(!showFilters)}
								className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border hover:bg-surface transition text-sm font-medium"
							>
								<ListFilter size={18} />
								Filters {hasActiveFilters && <span className="bg-primary text-white text-xs px-2 py-1 rounded-full">Active</span>}
							</button>

							{/* Clear Filters Button */}
							{hasActiveFilters && (
								<button
									onClick={() => router.push('/explore-events')}
									className="inline-flex items-center gap-1 px-3 py-2 rounded-lg text-sm text-error hover:bg-red-50 transition"
								>
									<X size={16} />
									Clear
								</button>
							)}
						</div>

						<div className="text-sm text-text-light">
							{result?.pagination.total && (
								<span>{result.pagination.total} events found</span>
							)}
						</div>
					</div>

					{/* Expandable Filters */}
					{showFilters && (
						<div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-surface rounded-xl border border-border mb-6">
							<div>
								<label className="block text-sm font-medium mb-2">Sort By</label>
								<select
									value={params.get('sort') ?? ''}
									onChange={(e) => update('sort', e.target.value)}
									className="w-full px-3 py-2 border border-border rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary"
								>
									<option value="">Default</option>
									<option value="newest">Newest</option>
									<option value="oldest">Oldest</option>
									<option value="trending">Trending</option>
									<option value="popular">Most Popular</option>
									<option value="rating">Highest Rated</option>
									<option value="priceAsc">Price: Low to High</option>
									<option value="priceDesc">Price: High to Low</option>
								</select>
							</div>

							<div>
								<label className="block text-sm font-medium mb-2">Availability</label>
								<select
									value={params.get('availability') ?? ''}
									onChange={(e) => update('availability', e.target.value)}
									className="w-full px-3 py-2 border border-border rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary"
								>
									<option value="">All</option>
									<option value="available">Available</option>
									<option value="soldOut">Sold Out</option>
								</select>
							</div>

							<div>
								<label className="block text-sm font-medium mb-2">Category</label>
								<select
									value={params.get('category') ?? ''}
									onChange={(e) => update('category', e.target.value)}
									className="w-full px-3 py-2 border border-border rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary"
								>
									<option value="">All Categories</option>
									<option value="music">Music</option>
									<option value="food">Food & Dining</option>
									<option value="business">Business</option>
									<option value="arts">Arts & Culture</option>
									<option value="sports">Sports</option>
									<option value="technology">Technology</option>
									<option value="education">Education</option>
								</select>
							</div>

							<div className="flex items-end">
								<button
									onClick={() => router.push('/explore-events')}
									className="w-full px-3 py-2 bg-surface-hover rounded-lg text-sm font-medium hover:bg-border transition"
								>
									Reset All
								</button>
							</div>
						</div>
					)}
				</div>

				{/* Results Section */}
				{loading ? (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{Array.from({ length: 6 }).map((_, i) => (
							<div key={i} className="h-80 bg-surface rounded-lg animate-pulse" />
						))}
					</div>
				) : result && result.items.length > 0 ? (
					<>
						{/* Event Grid */}
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
							{result.items.map((event) => (
								<EventCard
									key={event._id}
									eventId={event._id}
									tags={event.tags}
									imageUrl={event.images[0] ?? '/images/party.png'}
									imageAlt={event.title}
									title={event.title}
									organizer={`By ${event.organizer?.name || 'Unknown'}`}
									descriptions={[event.description]}
									location={event.venue}
									price={
										event.ticketTypes.some((ticket) => ticket.price === 0)
											? 'Free'
											: `From Rs.${Math.min(...event.ticketTypes.map((ticket) => ticket.price))}`
									}
									endDate={event.endDate}
								/>
							))}
						</div>

						{/* Pagination */}
						{result.pagination.totalPages > 1 && (
							<div className="flex justify-center">
								<Pagination
									page={page}
									totalPages={result.pagination.totalPages}
									onPageChange={(newPage) => update('page', String(newPage))}
								/>
							</div>
						)}
					</>
				) : (
					<div className="text-center py-16">
						<div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-surface mb-4">
							<Search className="text-text-light" size={32} />
						</div>
						<h3 className="text-xl font-semibold text-text-dark mb-2">No Events Found</h3>
						<p className="text-text-light mb-6">
							Try adjusting your search or filter criteria
						</p>
						<button
							onClick={() => router.push('/explore-events')}
							className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition"
						>
							Clear Filters
						</button>
					</div>
				)}
			</div>
		</div>
	);
}

export default function Page() {
	return (
		<Suspense fallback={
			<div className="min-h-screen bg-gradient-to-b from-background to-white flex items-center justify-center">
				<div className="text-center">
					<div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-surface mb-4">
						<div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
					</div>
					<p className="text-text-muted">Loading events…</p>
				</div>
			</div>
		}>
			<Content />
		</Suspense>
	);
}
