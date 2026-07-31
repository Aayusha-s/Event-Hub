'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

type AdminDashboardData = {
    totalUsers?: number;
    totalEvents?: number;
    totalVendors?: number;
    totalRevenue?: number;
    [key: string]: unknown;
};

const Page = () => {
    const [data, setData] = useState<AdminDashboardData | null>(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            try {
                const res = await fetch('/api/admin/dashboard');
                const json = await res.json();
                if (!res.ok || !json.success) {
                    setError(json.error?.message ?? 'Unable to load dashboard.');
                    return;
                }
                setData(json.data);
            } catch {
                setError('Unable to load dashboard.');
            } finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    return (
        <section className="max-w-6xl mx-auto px-4 py-24 font-cause text-text-dark">
            <h1 className="text-3xl font-dynapuff font-semibold mb-6">Admin Dashboard</h1>

            {loading && <p>Loading dashboard...</p>}
            {error && <p className="text-red-500">{error}</p>}

            {data && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <div className="surface-card p-4 rounded-xl border border-border">
                        <p className="text-sm text-text-light">Total Users</p>
                        <p className="text-2xl font-bold">{String(data.totalUsers ?? 0)}</p>
                    </div>
                    <div className="surface-card p-4 rounded-xl border border-border">
                        <p className="text-sm text-text-light">Total Events</p>
                        <p className="text-2xl font-bold">{String(data.totalEvents ?? 0)}</p>
                    </div>
                    <div className="surface-card p-4 rounded-xl border border-border">
                        <p className="text-sm text-text-light">Total Vendors</p>
                        <p className="text-2xl font-bold">{String(data.totalVendors ?? 0)}</p>
                    </div>
                    <div className="surface-card p-4 rounded-xl border border-border">
                        <p className="text-sm text-text-light">Total Revenue</p>
                        <p className="text-2xl font-bold">{String(data.totalRevenue ?? 0)}</p>
                    </div>
                </div>
            )}

            <div className="flex gap-4">
                <Link href="/admin/users" className="rounded-lg bg-primary px-4 py-2 text-white">Manage Users</Link>
                <Link href="/admin/events" className="rounded-lg bg-primary px-4 py-2 text-white">Manage Events</Link>
                <Link href="/analytics" className="rounded-lg bg-primary px-4 py-2 text-white">Reports</Link>
            </div>
        </section>
    );
};

export default Page;
