"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

type Stall = {
	_id: string;
	event: { _id: string; title: string; venue: string; startDate: string };
	vendor: { _id: string; businessName: string; logo?: string };
	stallName: string;
	description: string;
	stallType: string;
	size: string;
	bookingFee: number;
	status: "pending" | "confirmed" | "cancelled";
	createdAt: string;
};

export default function StallDetailsPage() {
	const params = useParams<{ id: string }>();
	const stallId = params.id;
	const [stall, setStall] = useState<Stall | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');

	useEffect(() => {
		if (!stallId) return;
		let active = true;

		const loadStall = async () => {
			try {
				const response = await fetch(`/api/stalls/${stallId}`);
				if (!response.ok) {
					if (active) setError('Stall not found');
					return;
				}
				const result = await response.json();
				if (result.success && active) {
					setStall(result.data);
				}
			} catch (error) {
				if (active) setError('Failed to load stall');
			} finally {
				if (active) setLoading(false);
			}
		};

		loadStall();
		return () => { active = false; };
	}, [stallId]);

	if (loading) return <main className='p-8 text-center'>Loading stall information...</main>;
	if (error || !stall) return <main className='p-8 text-center text-red-600'>{error || 'Stall not found'}</main>;

	return (
		<main className='bg-white text-text-dark font-cause'>
			<div className='max-w-4xl mx-auto px-4 md:px-6 py-8 md:py-12'>
				<Link href="/" className='text-brown-normal hover:text-brown-dark mb-4 inline-block'>← Back</Link>

				<div className='bg-brown-light rounded-xl p-8 mb-8'>
					<h1 className='text-4xl font-bold font-dynapuff mb-4'>{stall.stallName}</h1>
					
					{/* Event Info */}
					<div className='bg-white rounded-lg p-4 mb-6'>
						<p className='text-sm text-text-dark/70 mb-1'>Event</p>
						<Link href={`/event-details/${stall.event._id}`} className='text-lg font-semibold text-brown-normal hover:text-brown-dark'>
							{stall.event.title}
						</Link>
						<p className='text-sm text-text-dark/70 mt-2'>📍 {stall.event.venue}</p>
						<p className='text-sm text-text-dark/70'>📅 {new Date(stall.event.startDate).toLocaleDateString()}</p>
					</div>

					{/* Vendor Info */}
					<div className='bg-white rounded-lg p-4'>
						<p className='text-sm text-text-dark/70 mb-2'>Vendor</p>
						<Link href={`/vendors/${stall.vendor._id}`} className='flex items-center gap-3 hover:opacity-80'>
							{stall.vendor.logo && (
								<img src={stall.vendor.logo} alt={stall.vendor.businessName} className='w-12 h-12 rounded object-cover' />
							)}
							<span className='font-semibold text-brown-normal'>{stall.vendor.businessName}</span>
						</Link>
					</div>
				</div>

				{/* Details Grid */}
				<div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-8'>
					<div className='border border-brown-normal rounded-lg p-4'>
						<p className='text-sm text-text-dark/70 mb-1'>Type</p>
						<p className='text-lg font-semibold'>{stall.stallType}</p>
					</div>
					<div className='border border-brown-normal rounded-lg p-4'>
						<p className='text-sm text-text-dark/70 mb-1'>Size</p>
						<p className='text-lg font-semibold'>{stall.size}</p>
					</div>
					<div className='border border-brown-normal rounded-lg p-4'>
						<p className='text-sm text-text-dark/70 mb-1'>Booking Fee</p>
						<p className='text-lg font-semibold text-brown-normal'>Rs. {stall.bookingFee.toLocaleString()}</p>
					</div>
					<div className='border border-brown-normal rounded-lg p-4'>
						<p className='text-sm text-text-dark/70 mb-1'>Status</p>
						<span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
							stall.status === 'confirmed' ? 'bg-green-100 text-green-700' :
							stall.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
							'bg-red-100 text-red-700'
						}`}>
							{stall.status.charAt(0).toUpperCase() + stall.status.slice(1)}
						</span>
					</div>
				</div>

				{/* Description */}
				<div className='border-t pt-8'>
					<h2 className='text-2xl font-bold font-dynapuff mb-4'>About This Stall</h2>
					<p className='text-text-dark/80 leading-relaxed whitespace-pre-wrap'>{stall.description}</p>
				</div>

				{/* Created Date */}
				<div className='mt-8 text-center text-text-dark/70 text-sm'>
					Created on {new Date(stall.createdAt).toLocaleDateString()}
				</div>
			</div>
		</main>
	);
}
