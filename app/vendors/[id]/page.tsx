"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import Button from "@/components/Button";

type Vendor = {
	_id: string;
	owner: { _id: string; name: string; profileImage?: string };
	businessName: string;
	description: string;
	logo?: string;
	category: string;
	approvalStatus: "pending" | "approved" | "rejected";
	stallBookings?: Array<{
		_id: string;
		event: { _id: string; title: string };
		stallName: string;
		stallType: string;
		size: string;
		bookingFee: number;
		status: string;
	}>;
	createdAt: string;
};

export default function VendorDetailsPage() {
	const params = useParams<{ id: string }>();
	const vendorId = params.id;
	const [vendor, setVendor] = useState<Vendor | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');

	useEffect(() => {
		if (!vendorId) return;
		let active = true;

		const loadVendor = async () => {
			try {
				const response = await fetch(`/api/vendors/${vendorId}`);
				if (!response.ok) {
					if (active) setError('Vendor not found');
					return;
				}
				const result = await response.json();
				if (result.success && active) {
					setVendor(result.data);
				}
			} catch (error) {
				if (active) setError('Failed to load vendor');
			} finally {
				if (active) setLoading(false);
			}
		};

		loadVendor();
		return () => { active = false; };
	}, [vendorId]);

	if (loading) return <main className='p-8 text-center'>Loading vendor information...</main>;
	if (error || !vendor) return <main className='p-8 text-center text-red-600'>{error || 'Vendor not found'}</main>;

	return (
		<main className='bg-white text-text-dark font-cause'>
			{/* Header */}
			<div className='max-w-4xl mx-auto px-4 md:px-6 py-8 md:py-12'>
				<Link href="/" className='text-brown-normal hover:text-brown-dark mb-4 inline-block'>← Back</Link>

				<div className='flex flex-col md:flex-row gap-8 items-start'>
					{/* Logo */}
					<div className='md:w-64 shrink-0'>
						<div className='w-64 h-64 bg-gray-200 rounded-xl overflow-hidden flex items-center justify-center'>
							{vendor.logo ? (
								<img src={vendor.logo} alt={vendor.businessName} className='w-full h-full object-cover' />
							) : (
								<i className='fa-solid fa-store text-4xl text-gray-400'></i>
							)}
						</div>
					</div>

					{/* Info */}
					<div className='flex-1'>
						<h1 className='text-4xl font-bold font-dynapuff mb-2'>{vendor.businessName}</h1>
						<p className='text-brown-normal font-semibold mb-2'>{vendor.category}</p>

						{/* Owner */}
						<div className='bg-brown-light rounded-lg p-4 mb-6'>
							<p className='text-sm text-text-dark/70 mb-1'>Owner</p>
							<Link href={`/userprofile?userId=${vendor.owner._id}`} className='flex items-center gap-3 hover:opacity-80'>
								{vendor.owner.profileImage && (
									<img src={vendor.owner.profileImage} alt={vendor.owner.name} className='w-12 h-12 rounded-full object-cover' />
								)}
								<span className='font-semibold text-brown-normal'>{vendor.owner.name}</span>
							</Link>
						</div>

						{/* Status */}
						<div className='mb-6'>
							<span className={`px-3 py-1 rounded-full text-sm font-semibold ${
								vendor.approvalStatus === 'approved' ? 'bg-green-100 text-green-700' :
								vendor.approvalStatus === 'pending' ? 'bg-yellow-100 text-yellow-700' :
								'bg-red-100 text-red-700'
							}`}>
								{vendor.approvalStatus.charAt(0).toUpperCase() + vendor.approvalStatus.slice(1)}
							</span>
						</div>

						{/* Description */}
						<div className='mb-6'>
							<h2 className='text-xl font-bold font-dynapuff mb-2'>About</h2>
							<p className='text-text-dark/80 leading-relaxed'>{vendor.description}</p>
						</div>
					</div>
				</div>

				{/* Stalls */}
				{vendor.stallBookings && vendor.stallBookings.length > 0 && (
					<div className='mt-12 border-t pt-8'>
						<h2 className='text-2xl font-bold font-dynapuff mb-6'>Active Stalls</h2>
						<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
							{vendor.stallBookings.map((stall) => (
								<Link key={stall._id} href={`/stalls/${stall._id}`} className='border border-brown-normal rounded-lg p-4 hover:border-brown-dark hover:shadow-lg transition-all'>
									<h3 className='font-semibold text-lg mb-2'>{stall.stallName}</h3>
									<p className='text-sm text-text-dark/70 mb-1'>Type: {stall.stallType}</p>
									<p className='text-sm text-text-dark/70 mb-1'>Size: {stall.size}</p>
									<p className='font-semibold text-brown-normal mb-2'>Rs. {stall.bookingFee.toLocaleString()}</p>
									<p className='text-xs text-text-dark/60'>{stall.event.title}</p>
									<span className={`inline-block mt-2 px-2 py-1 rounded text-xs font-semibold ${
										stall.status === 'confirmed' ? 'bg-green-100 text-green-700' :
										stall.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
										'bg-gray-100 text-gray-700'
									}`}>
										{stall.status}
									</span>
								</Link>
							))}
						</div>
					</div>
				)}

				{/* Joined Date */}
				<div className='mt-12 text-center text-text-dark/70 text-sm'>
					Vendor since {new Date(vendor.createdAt).toLocaleDateString()}
				</div>
			</div>
		</main>
	);
}
