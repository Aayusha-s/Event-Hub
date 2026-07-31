'use client';

import { useState } from 'react';

const Page = () => {
    const [code, setCode] = useState('');
    const [result, setResult] = useState<string>('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleCheckIn = async () => {
        if (!code.trim()) {
            setError('Enter a ticket number or QR code.');
            return;
        }
        setError('');
        setResult('');
        setLoading(true);
        try {
            const res = await fetch('/api/checkin', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ identifier: code.trim() }),
            });
            const json = await res.json();
            if (!res.ok || !json.success) {
                setError(json.error?.message ?? 'Check-in failed.');
                return;
            }
            setResult('Ticket checked in successfully.');
            setCode('');
        } catch {
            setError('Check-in failed.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="max-w-xl mx-auto px-4 py-24 font-cause text-text-dark">
            <h1 className="text-3xl font-dynapuff font-semibold mb-6">Check In</h1>
            <p className="mb-4 text-text-light">
                Scan a ticket QR code or enter the ticket number manually to check attendees in.
            </p>

            <div className="flex flex-col gap-3">
                <input
                    type="text"
                    placeholder="Ticket number or QR code"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="border border-brown-normal rounded-md p-3"
                />
                <button
                    onClick={handleCheckIn}
                    disabled={loading}
                    className="rounded-lg bg-primary px-4 py-3 text-white disabled:opacity-50"
                >
                    {loading ? 'Checking in...' : 'Check In'}
                </button>

                {result && (
                    <div className="rounded-md border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-700">
                        {result}
                    </div>
                )}
                {error && (
                    <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">
                        {error}
                    </div>
                )}
            </div>
        </section>
    );
};

export default Page;
