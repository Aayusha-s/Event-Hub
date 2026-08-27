"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Calendar, CheckCircle2, Clock, MapPin, Plus, Store, TriangleAlert } from "lucide-react";
import DashboardBox from "@/components/DashboardBox";
import VendorCards from "@/components/VendorCards";
import Button from "@/components/Button";

type EventSummary = { _id: string; title: string; startDate: string; venue: string; images?: string[] };
type Booking = { event: EventSummary | null; stallName?: string; status: "pending" | "confirmed" | "cancelled" };
type DashboardData = { vendor: { businessName: string; approvalStatus: string }; summary: { activeBookingsCount: number; upcomingEventsCount: number; activeEventsCount: number; completedEventsCount: number }; bookings: Booking[] };
const state = (status: Booking["status"]) => status === "confirmed" ? "success" : status === "pending" ? "warning" : "danger";
const label = (status: Booking["status"]) => status === "confirmed" ? "Approved" : status === "pending" ? "Pending" : "Rejected";

export default function VendorStallsPage() {
    const submitted = typeof window === 'undefined' ? null : new URLSearchParams(window.location.search).get('submitted');
    const [data, setData] = useState<DashboardData | null>(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let active = true;
        setLoading(true);
        fetch("/api/vendors/dashboard", { cache: "no-store" })
            .then(async (r) => {
                const j = await r.json();
                if (!r.ok || !j.success) throw new Error(j.error?.message || "Unable to load stall requests.");
                if (active) setData(j.data);
            })
            .catch((e) => active && setError(e instanceof Error ? e.message : "Unable to load stall requests."))
            .finally(() => active && setLoading(false));
        return () => { active = false; };
    }, []);

    const allBookings = (data?.bookings ?? []).sort((a, b) => {
        const dateA = a.event ? new Date(a.event.startDate).getTime() : 0;
        const dateB = b.event ? new Date(b.event.startDate).getTime() : 0;
        return dateB - dateA;
    });

    return (
        <section className="app-page font-cause text-text-dark">
            <DashboardBox
                title="My Stall Requests"
                description={data ? `Manage your stall bookings for ${data.vendor.businessName}.` : "Loading your stall requests…"}
                buttonText="Create Stall"
                buttonLink="/vendor/stalls/create/step-1"
                buttonIcon={<Plus size={18} />}
            />

            {submitted === "success" && (
                <div className="mt-6 rounded-xl border border-green-300 bg-green-50 p-4 text-green-700">
                    <CheckCircle2 className="mr-2 inline" size={18} />
                    Your stall request has been submitted for administrator approval.
                </div>
            )}

            {error && (
                <div className="mt-6 rounded-xl border border-red-300 bg-red-50 p-4 text-red-700">
                    <TriangleAlert className="mr-2 inline" size={18} />
                    {error}
                </div>
            )}

            {data && data.vendor.approvalStatus !== "approved" && (
                <div className="mt-6 rounded-xl border border-amber-300 bg-amber-50 p-4 text-amber-800">
                    <Clock className="mr-2 inline" size={18} />
                    Your vendor profile is {data.vendor.approvalStatus}. Stall booking is available after approval.
                </div>
            )}

            {data && (
                <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
                    <VendorCards icon1={<Store className="text-primary" />} count={data.summary.activeBookingsCount} label="Associated Events" subLabel="Active stall associations" />
                    <VendorCards icon1={<Calendar className="text-blue-500" />} count={data.summary.upcomingEventsCount} label="Upcoming Events" subLabel="Assigned future events" />
                    <VendorCards icon1={<Clock className="text-green-500" />} count={data.summary.activeEventsCount} label="Active Events" subLabel="Events happening now" />
                    <VendorCards icon1={<CheckCircle2 className="text-purple-500" />} count={data.summary.completedEventsCount} label="Completed Events" subLabel="Past assigned events" />
                </div>
            )}

            <div className="mt-10">
                <div className="flex items-center justify-between gap-4">
                    <h2 className="text-xl font-bold md:text-2xl">All Stall Requests</h2>
                    <Link href="/vendor/stalls/create/step-1">
                        <Button text="Create Stall" variant="cta" size="sm" iconLeft={<Plus size={16} />} />
                    </Link>
                </div>

                {loading ? (
                    <p className="mt-6 text-sm text-text-light">Loading requests…</p>
                ) : allBookings.length === 0 ? (
                    <div className="mt-6 rounded-xl border border-brown-normal p-8 text-center">
                        <p className="font-semibold">No stall requests yet.</p>
                        <p className="mt-1 text-sm text-text-light">Create your first stall request to get started.</p>
                        <div className="mt-4">
                            <Link href="/vendor/stalls/create/step-1">
                                <Button text="Create Stall" variant="cta" size="sm" iconLeft={<Plus size={16} />} />
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className="mt-6 grid grid-cols-1 gap-4 xl:grid-cols-2">
                        {allBookings.map((b) => {
                            if (!b.event) return null;
                            return (
                                <article key={`${b.event._id}-${b.stallName ?? "stall"}`} className="rounded-xl border border-brown-normal p-4">
                                    <div className="flex flex-col gap-4 sm:flex-row">
                                        <div className="h-28 w-full overflow-hidden rounded-xl bg-brown-light sm:w-40">
                                            {b.event.images?.[0] && <img src={b.event.images[0]} alt="" className="h-full w-full object-cover" />}
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <div className="flex flex-wrap items-start justify-between gap-2">
                                                <h3 className="font-bold">{b.stallName || "Unnamed Stall"}</h3>
                                                <Button text={label(b.status)} variant="tag" size="vsm" status={state(b.status)} />
                                            </div>
                                            <p className="mt-1 text-sm font-medium text-text-dark">{b.event.title}</p>
                                            <p className="mt-2 text-sm"><Calendar className="mr-1 inline" size={15} />{new Date(b.event.startDate).toLocaleString()}</p>
                                            <p className="mt-1 text-sm"><MapPin className="mr-1 inline" size={15} />{b.event.venue}</p>
                                        </div>
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                )}
            </div>
        </section>
    );
}
