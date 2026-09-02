"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Calendar, Eye, MapPin, TriangleAlert } from "lucide-react";
import Button from "@/components/Button";
type Event = {
  _id: string;
  title: string;
  startDate: string;
  venue: string;
  images?: string[];
  organizer?: { name?: string };
};
type Booking = { event: Event | null; stallName?: string; status: string };
export default function VendorEventsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    fetch("/api/vendors/events", { cache: "no-store" })
      .then(async (r) => {
        const j = await r.json();
        if (!r.ok || !j.success)
          throw new Error(
            j.error?.message || "Unable to load assigned events.",
          );
        setBookings(j.data);
      })
      .catch((e) =>
        setError(
          e instanceof Error ? e.message : "Unable to load assigned events.",
        ),
      )
      .finally(() => setLoading(false));
  }, []);
  return (
    <section className="my-4 mx-2 px-4 font-cause text-text-dark md:mx-3 lg:mx-4 xl:mx-6">
      <h1 className="font-dynapuff text-2xl font-bold md:text-3xl">
        My Events
      </h1>
      <p className="mt-1 text-text-light">
        Events with an active stall booking for your vendor profile.
      </p>
      {error && (
        <p className="mt-6 rounded-xl border border-red-300 bg-red-50 p-4 text-red-700">
          <TriangleAlert className="mr-2 inline" size={18} />
          {error}
        </p>
      )}
      {loading ? (
        <p className="mt-6">Loading assigned events...</p>
      ) : bookings.length === 0 ? (
        <div className="mt-6 rounded-xl border border-brown-normal p-8 text-center">
          No assigned events yet.
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-2">
          {bookings.map(
            (b) =>
              b.event && (
                <article
                  key={b.event._id}
                  className="overflow-hidden rounded-xl border border-brown-normal"
                >
                  <div className="h-44 bg-brown-light">
                    {b.event.images?.[0] && (
                      <img
                        src={b.event.images[0]}
                        alt=""
                        className="h-full w-full object-cover"
                      />
                    )}
                  </div>
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-3">
                      <h2 className="font-dynapuff text-xl">{b.event.title}</h2>
                      <span className="rounded-full bg-brown-light px-3 py-1 text-xs capitalize">
                        {b.status}
                      </span>
                    </div>
                    <p className="mt-3 text-sm">
                      <Calendar className="mr-1 inline" size={15} />
                      {new Date(b.event.startDate).toLocaleString()}
                    </p>
                    <p className="mt-2 text-sm">
                      <MapPin className="mr-1 inline" size={15} />
                      {b.event.venue}
                    </p>
                    <p className="mt-2 text-sm">
                      Organizer: {b.event.organizer?.name ?? "Event organizer"}
                    </p>
                    {b.stallName && (
                      <p className="mt-2 text-sm text-text-light">
                        Stall: {b.stallName}
                      </p>
                    )}
                    <div className="mt-5">
                      <Link href={`/vendor/events/${b.event._id}`}>
                        <Button
                          text="View Details"
                          size="sm"
                          iconLeft={<Eye size={16} />}
                        />
                      </Link>
                    </div>
                  </div>
                </article>
              ),
          )}
        </div>
      )}
    </section>
  );
}
