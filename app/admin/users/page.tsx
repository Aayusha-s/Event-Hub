'use client';

import { useEffect, useState } from 'react';

type AdminUser = {
    _id: string;
    name: string;
    email: string;
    role: string;
};

const Page = () => {
    const [users, setUsers] = useState<AdminUser[]>([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');

    const loadUsers = async (query = '') => {
        setLoading(true);
        try {
            const res = await fetch(`/api/admin/users${query ? `?search=${encodeURIComponent(query)}` : ''}`);
            const json = await res.json();
            if (!res.ok || !json.success) {
                setError(json.error?.message ?? 'Unable to load users.');
                return;
            }
            setUsers(json.data.items ?? json.data.users ?? []);
        } catch {
            setError('Unable to load users.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadUsers();
    }, []);

    return (
        <section className="max-w-6xl mx-auto px-4 py-24 font-cause text-text-dark">
            <h1 className="text-3xl font-dynapuff font-semibold mb-6">Manage Users</h1>

            <div className="flex gap-2 mb-4">
                <input
                    type="text"
                    placeholder="Search by name or email"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="border border-brown-normal rounded-md p-2 flex-1"
                />
                <button
                    onClick={() => loadUsers(search)}
                    className="rounded-lg bg-primary px-4 py-2 text-white"
                >
                    Search
                </button>
            </div>

            {loading && <p>Loading users...</p>}
            {error && <p className="text-red-500">{error}</p>}

            {!loading && !error && (
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-divider">
                                <th className="py-2">Name</th>
                                <th className="py-2">Email</th>
                                <th className="py-2">Role</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.length === 0 && (
                                <tr><td colSpan={3} className="py-4 text-text-light">No users found.</td></tr>
                            )}
                            {users.map((user) => (
                                <tr key={user._id} className="border-b border-divider">
                                    <td className="py-2">{user.name}</td>
                                    <td className="py-2">{user.email}</td>
                                    <td className="py-2 capitalize">{user.role?.replace('_', ' ')}</td>
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
