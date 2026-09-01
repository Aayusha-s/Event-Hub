"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

const statuses = ["draft", "published", "cancelled", "completed"] as const;
type AdminEvent = {
  _id: string;
  title: string;
  venue: string;
  status: (typeof statuses)[number];
  featured: boolean;
  startDate?: string;
  organizer?: { name?: string };
};

export default function AdminEventsPage() {
  const [events, setEvents] = useState<AdminEvent[]>([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const loadEvents = useCallback(async () => {
    setLoading(true);
    setError("");
    const params = new URLSearchParams({ pageSize: "50" });
    if (search.trim()) params.set("search", search.trim());
    if (status) params.set("status", status);
    try {
      const res = await fetch(`/api/admin/events?${params}`);
      const json = await res.json();
      if (!res.ok || !json.success)
        throw new Error(json.error?.message ?? "Unable to load events.");
      setEvents(json.data.items ?? []);
    } catch (cause) {
      setError(
        cause instanceof Error ? cause.message : "Unable to load events.",
      );
    } finally {
      setLoading(false);
    }
  }, [search, status]);
  useEffect(() => {
    void loadEvents();
  }, [loadEvents]);
  const updateEvent = async (
    id: string,
    payload: Record<string, boolean | string>,
  ) => {
    setSavingId(id);
    setError("");
    setMessage("");
    try {
      const res = await fetch(`/api/admin/events/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok || !json.success)
        throw new Error(json.error?.message ?? "Unable to update event.");
      setEvents((current) =>
        current.map((event) =>
          event._id === id ? { ...event, ...json.data } : event,
        ),
      );
      setMessage("Event updated.");
    } catch (cause) {
      setError(
        cause instanceof Error ? cause.message : "Unable to update event.",
      );
    } finally {
      setSavingId("");
    }
  };
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 font-cause text-text-dark">
      <h1 className="mb-2 text-3xl font-dynapuff font-semibold">
        Manage Events
      </h1>
      <p className="mb-6 text-text-light">
        Review every event, adjust publication status, and feature approved
        events.
      </p>
      <div className="mb-5 grid gap-3 rounded-xl border border-border bg-surface p-4 md:grid-cols-3">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && void loadEvents()}
          placeholder="Search events"
          className="rounded-lg border border-border px-3 py-2"
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="rounded-lg border border-border px-3 py-2"
        >
          <option value="">All statuses</option>
          {statuses.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
        <button
          onClick={() => void loadEvents()}
          className="rounded-lg bg-primary px-4 py-2 font-medium text-white"
        >
          Apply filters
        </button>
      </div>
      {message && <p className="mb-4 text-green-700">{message}</p>}
      {error && <p className="mb-4 text-error">{error}</p>}
      {loading ? (
        <p>Loading events...</p>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-border bg-surface">
          <table className="w-full min-w-[850px] text-left">
            <thead>
              <tr className="border-b border-divider text-sm text-text-light">
                <th className="p-3">Event</th>
                <th className="p-3">Organizer</th>
                <th className="p-3">Date & location</th>
                <th className="p-3">Status</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-5 text-text-light">
                    No events found.
                  </td>
                </tr>
              ) : (
                events.map((event) => (
                  <tr
                    key={event._id}
                    className="border-b border-divider last:border-0"
                  >
                    <td className="p-3 font-medium">{event.title}</td>
                    <td className="p-3">
                      {event.organizer?.name ?? "Unknown"}
                    </td>
                    <td className="p-3 text-sm">
                      <p>
                        {event.startDate
                          ? new Date(event.startDate).toLocaleString()
                          : "-"}
                      </p>
                      <p className="text-text-light">{event.venue}</p>
                    </td>
                    <td className="p-3">
                      <select
                        value={event.status}
                        disabled={savingId === event._id}
                        onChange={(e) =>
                          void updateEvent(event._id, {
                            status: e.target.value,
                          })
                        }
                        className="rounded border border-border bg-background px-2 py-1 capitalize"
                      >
                        {statuses.map((item) => (
                          <option key={item} value={item}>
                            {item}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="p-3">
                      <div className="flex gap-2">
                        <button
                          disabled={savingId === event._id}
                          onClick={() =>
                            void updateEvent(event._id, {
                              featured: !event.featured,
                            })
                          }
                          className="rounded-lg border border-border px-3 py-1.5 text-sm hover:bg-surface-hover"
                        >
                          {event.featured ? "Unfeature" : "Feature"}
                        </button>
                        <Link
                          href={`/event-details/${event._id}`}
                          className="rounded-lg border border-border px-3 py-1.5 text-sm hover:bg-surface-hover"
                        >
                          View
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
