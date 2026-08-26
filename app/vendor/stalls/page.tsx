"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Calendar, MapPin, Store, TriangleAlert } from "lucide-react";
import Button from "@/components/Button";

type Event = { _id: string; title: string; venue: string; startDate: string; category: string };
type StallRequest = { event: Event | null; stallName: string; description?: string; stallType?: string; size?: string; bookingFee?: number; status: "pending" | "confirmed" | "cancelled" };
type Dashboard = { vendor: { approvalStatus: string }; bookings: StallRequest[] };
const initialForm = { eventId: "", stallName: "", description: "", stallType: "", size: "", bookingFee: "" };

export default function VendorStallsPage() {
  const searchParams = useSearchParams();
  const [events, setEvents] = useState<Event[]>([]);
  const [dashboard, setDashboard] = useState<Dashboard | null>(null);
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const load = async () => {
    setLoading(true);
    try {
      const [eventsResponse, dashboardResponse] = await Promise.all([
        fetch("/api/events?status=published&pageSize=100", { cache: "no-store" }),
        fetch("/api/vendors/dashboard", { cache: "no-store" }),
      ]);
      const [eventsResult, dashboardResult] = await Promise.all([eventsResponse.json(), dashboardResponse.json()]);
      if (!eventsResponse.ok || !eventsResult.success) throw new Error(eventsResult.error?.message ?? "Unable to load available events.");
      if (!dashboardResponse.ok || !dashboardResult.success) throw new Error(dashboardResult.error?.message ?? "Unable to load vendor profile.");
      setEvents(eventsResult.data.items ?? []);
      setDashboard(dashboardResult.data);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Unable to load stall requests.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { void load(); }, []);
  useEffect(() => {
    const eventId = searchParams.get("eventId");
    if (eventId) setForm((current) => ({ ...current, eventId }));
  }, [searchParams]);

  const selectedEvent = useMemo(() => events.find((event) => event._id === form.eventId), [events, form.eventId]);
  const approvedVendor = dashboard?.vendor.approvalStatus === "approved";
  const requestedEventIds = new Set((dashboard?.bookings ?? []).filter((request) => request.status !== "cancelled").map((request) => request.event?._id));
  const update = (key: keyof typeof form, value: string) => setForm((current) => ({ ...current, [key]: value }));

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage("");
    setError("");
    const bookingFee = Number(form.bookingFee);
    if (!form.eventId || form.stallName.trim().length < 2 || form.description.trim().length < 10 || form.stallType.trim().length < 2 || !form.size.trim() || !Number.isFinite(bookingFee) || bookingFee < 0) {
      setError("Complete all stall details with a valid booking fee.");
      return;
    }
    setSaving(true);
    try {
      const response = await fetch("/api/vendors/stalls", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, bookingFee }) });
      const result = await response.json();
      if (!response.ok || !result.success) throw new Error(result.error?.message ?? "Unable to submit stall request.");
      setForm(initialForm);
      setMessage("Stall request submitted for admin review.");
      await load();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Unable to submit stall request.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="app-page font-cause text-text-dark">
      <div className="mb-7"><h1 className="page-heading font-dynapuff">Create Stall</h1><p className="page-subtitle">Request a stall at an approved, published event. Every request is reviewed by an administrator.</p></div>
      {message && <p className="mb-5 rounded-xl border border-success/30 bg-success-light px-3 py-2 text-sm text-green-700">{message}</p>}
      {error && <p className="mb-5 rounded-xl border border-error/30 bg-error-light px-3 py-2 text-sm text-error">{error}</p>}
      {!loading && !approvedVendor && <p className="mb-5 flex gap-2 rounded-xl border border-warning/30 bg-warning-light px-3 py-2 text-sm text-amber-800"><TriangleAlert size={18} />Your vendor profile must be approved before you can submit a stall request.</p>}
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <form onSubmit={submit} className="surface-card p-5 sm:p-7">
          <div className="flex items-center gap-3"><Store className="text-primary" size={23} /><div><h2 className="text-xl font-semibold">Stall request details</h2><p className="text-sm text-text-light">All fields are required for review.</p></div></div>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <label className="block text-sm font-semibold sm:col-span-2">Event<select value={form.eventId} onChange={(event) => update("eventId", event.target.value)} className="form-control mt-1.5" disabled={!approvedVendor || loading} required><option value="">Select an eligible event</option>{events.map((event) => <option key={event._id} value={event._id} disabled={requestedEventIds.has(event._id)}>{event.title}{requestedEventIds.has(event._id) ? " (request already submitted)" : ""}</option>)}</select></label>
            <label className="block text-sm font-semibold">Stall name<input value={form.stallName} onChange={(event) => update("stallName", event.target.value)} className="form-control mt-1.5" disabled={!approvedVendor} minLength={2} required /></label>
            <label className="block text-sm font-semibold">Stall type / category<input value={form.stallType} onChange={(event) => update("stallType", event.target.value)} className="form-control mt-1.5" disabled={!approvedVendor} placeholder="Food, retail, services" minLength={2} required /></label>
            <label className="block text-sm font-semibold">Size<input value={form.size} onChange={(event) => update("size", event.target.value)} className="form-control mt-1.5" disabled={!approvedVendor} placeholder="e.g. 3m x 3m" required /></label>
            <label className="block text-sm font-semibold">Booking fee (Rs.)<input type="number" min="0" step="0.01" value={form.bookingFee} onChange={(event) => update("bookingFee", event.target.value)} className="form-control mt-1.5" disabled={!approvedVendor} required /></label>
            <label className="block text-sm font-semibold sm:col-span-2">Description<textarea value={form.description} onChange={(event) => update("description", event.target.value)} className="form-control mt-1.5 min-h-28 py-3" disabled={!approvedVendor} minLength={10} required /></label>
          </div>
          <div className="mt-7 flex justify-end border-t border-divider pt-5"><Button type="submit" text={saving ? "Submitting..." : "Submit Stall Request"} disabled={!approvedVendor || saving || loading} iconLeft={<Store size={17} />} /></div>
        </form>
        <aside className="surface-card h-fit min-w-0 p-5"><h2 className="text-lg font-semibold">Selected event</h2>{selectedEvent ? <div className="mt-4 space-y-3"><h3 className="font-semibold">{selectedEvent.title}</h3><p className="text-sm text-text-light"><Calendar className="mr-1 inline" size={15} />{new Date(selectedEvent.startDate).toLocaleString()}</p><p className="text-sm text-text-light"><MapPin className="mr-1 inline" size={15} />{selectedEvent.venue}</p><p className="text-sm text-text-light">Category: {selectedEvent.category}</p><p className="rounded-lg bg-surface-hover p-3 text-sm text-text-light">Event eligibility is confirmed by the server; stall availability is confirmed during admin review.</p></div> : <p className="mt-3 text-sm text-text-light">Select an event to view its details and stall-request eligibility.</p>}</aside>
      </div>
      <div className="mt-8"><h2 className="text-xl font-semibold">My stall requests</h2><p className="mt-1 text-sm text-text-light">Approved requests are active stalls; pending requests are awaiting review.</p>{loading ? <p className="mt-5 text-sm text-text-light">Loading requests...</p> : <div className="mt-5 grid gap-4 lg:grid-cols-2">{dashboard?.bookings.length ? dashboard.bookings.map((request) => {
        if (!request.event) return null;
        const label = request.status === "confirmed" ? "Approved" : request.status === "cancelled" ? "Rejected" : "Pending";
        const color = request.status === "confirmed" ? "bg-success-light text-green-700" : request.status === "pending" ? "bg-warning-light text-amber-800" : "bg-error-light text-error";
        return <article key={`${request.event._id}-${request.stallName}`} className="surface-card p-5"><div className="flex items-start justify-between gap-3"><div><h3 className="font-semibold">{request.stallName}</h3><p className="mt-1 text-sm text-text-light">{request.event.title}</p></div><span className={`rounded-full px-3 py-1 text-xs font-semibold ${color}`}>{label}</span></div><dl className="mt-4 grid grid-cols-2 gap-3 text-sm"><div><dt className="text-text-light">Type</dt><dd>{request.stallType ?? "-"}</dd></div><div><dt className="text-text-light">Size</dt><dd>{request.size ?? "-"}</dd></div><div><dt className="text-text-light">Booking fee</dt><dd>{request.bookingFee !== undefined ? `Rs. ${request.bookingFee.toLocaleString()}` : "-"}</dd></div><div><dt className="text-text-light">Status</dt><dd>{label}</dd></div></dl>{request.description && <p className="mt-3 text-sm text-text-light">{request.description}</p>}</article>;
      }) : <div className="surface-card p-6 text-center text-sm text-text-light lg:col-span-2">No stall requests yet.</div>}</div>}</div>
    </section>
  );
}
