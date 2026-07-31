'use client';

import { useEffect, useState } from 'react';

type AdminEvent = {
    _id: string;
    title: string;
    status: string;
    startDate?: string;
};

const Page = () => {
    const [events, setEvents] = useState<AdminEvent[]>([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            try {
                const res = await fetch('/api/admin/events');
                const json = await res.json();
                if (!res.ok || !json.success) {
                    setError(json.error?.message ?? 'Unable to load events.');
                    return;
                }
                setEvents(json.data.items ?? json.data.events ?? []);
            } catch {
                setError('Unable to load events.');
            } finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    return (
        <section className="max-w-6xl mx-auto px-4 py-24 font-cause text-text-dark">
            <h1 className="text-3xl font-dynapuff font-semibold mb-6">Manage Events</h1>

            {loading && <p>Loading events...</p>}
            {error && <p className="text-red-500">{error}</p>}

            {!loading && !error && (
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-divider">
                                <th className="py-2">Title</th>
                                <th className="py-2">Status</th>
                                <th className="py-2">Start Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {events.length === 0 && (
                                <tr><td colSpan={3} className="py-4 text-text-light">No events found.</td></tr>
                            )}
                            {events.map((event) => (
                                <tr key={event._id} className="border-b border-divider">
                                    <td className="py-2">{event.title}</td>
                                    <td className="py-2 capitalize">{event.status}</td>
                                    <td className="py-2">{event.startDate ? new Date(event.startDate).toLocaleDateString() : '-'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </section>
    );
};

export default Page;
