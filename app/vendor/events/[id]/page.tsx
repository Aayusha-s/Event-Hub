"use client";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Calendar, MapPin, TriangleAlert } from "lucide-react";
import Button from "@/components/Button";
import Map from "@/components/Map";

type TicketType = { name: string; price: number; quantity: number; description?: string };
type EventData = {
  _id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  venue?: string;
  latitude?: number;
  longitude?: number;
  category: string;
  status: string;
  isOnline?: boolean;
  organizer?: { name?: string; profileImage?: string };
  images?: string[];
  ticketTypes?: TicketType[];
  capacity?: number;
  ticketsSold?: number;
  tags?: string[];
};
type Data = {
  stallName?: string;
  status: string;
  event: EventData;
};

const formatDate = (value: string) =>
  new Intl.DateTimeFormat("en-US", { dateStyle: "long" }).format(new Date(value));
const formatTime = (value: string) =>
  new Intl.DateTimeFormat("en-US", { hour: "numeric", minute: "2-digit" }).format(new Date(value));
const fallbackImage = "/images/party.png";

const getMapUrl = (event: EventData) => {
  const readableLocation = event.venue?.trim();
  const hasCoordinates =
    typeof event.latitude === "number" &&
    typeof event.longitude === "number" &&
    (event.latitude !== 0 || event.longitude !== 0);
  const mapQuery = readableLocation || (hasCoordinates ? `${event.latitude},${event.longitude}` : "");
  return mapQuery ? `https://www.google.com/maps?q=${encodeURIComponent(mapQuery)}&output=embed` : undefined;
};

export default function VendorEventDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [data, setData] = useState<Data | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    params.then(({ id }) =>
      fetch(`/api/vendors/events/${id}`, { cache: "no-store" })
        .then(async (r) => {
          const j = await r.json();
          if (!r.ok || !j.success)
            throw new Error(
              j.error?.message || "Unable to load assigned event.",
            );
          setData(j.data);
        })
        .catch((e) =>
          setError(
            e instanceof Error ? e.message : "Unable to load assigned event.",
          ),
        ),
    );
  }, [params]);

  const details = useMemo(() => {
    if (!data?.event) return [];
    const event = data.event;
    const eventStatus = event.status ? event.status.toLowerCase() : "upcoming";
    const organizerName = event.organizer?.name ?? "Event organizer";
    const ticketPrice = event.ticketTypes?.length
      ? Math.min(...event.ticketTypes.map((ticket) => ticket.price))
      : 0;
    const seatsLeft = event.capacity && event.ticketsSold !== undefined
      ? Math.max(0, event.capacity - event.ticketsSold)
      : 0;

    return [
      { label: "Date", value: formatDate(event.startDate) },
      { label: "Time", value: `${formatTime(event.startDate)} - ${formatTime(event.endDate)}` },
      { label: "Location", value: event.isOnline ? "Online event" : event.venue || "Location unavailable" },
      { label: "Organizer", value: organizerName },
      { label: "Price", value: event.ticketTypes?.some((ticket) => ticket.price === 0) ? "Free tickets available" : `From Rs. ${ticketPrice.toLocaleString()}` },
      { label: "Seats", value: seatsLeft > 0 ? `${seatsLeft.toLocaleString()} remaining of ${event.capacity?.toLocaleString() ?? "0"}` : "Fully booked" },
      { label: "Assigned vendor status", value: data.status ? data.status.toUpperCase() : eventStatus.toUpperCase() },
      { label: "Event status", value: event.status },
    ];
  }, [data]);

  const mapUrl = data?.event ? getMapUrl(data.event) : undefined;

  return (
    <section className="my-4 mx-2 px-4 font-cause text-text-dark md:mx-3 lg:mx-4 xl:mx-6">
      <Link href="/vendor/events">
        <Button
          text="Back to My Events"
          variant="secondary"
          size="sm"
          iconLeft={<ArrowLeft size={16} />}
        />
      </Link>
      {error && (
        <p className="mt-6 rounded-xl border border-red-300 bg-red-50 p-4 text-red-700">
          <TriangleAlert className="mr-2 inline" size={18} />
          {error}
        </p>
      )}
      {!data && !error && <p className="mt-6">Loading assigned event...</p>}
      {data && (
        <article className="mt-6 overflow-hidden rounded-xl border border-brown-normal bg-white">
          <div className="relative h-64 bg-brown-light md:h-80 lg:h-[420px]">
            {data.event.images?.[0] ? (
              <img
                src={data.event.images[0]}
                alt={data.event.title}
                className="h-full w-full object-cover"
              />
            ) : (
              <img
                src={fallbackImage}
                alt={data.event.title}
                className="h-full w-full object-cover"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" />
            <div className="absolute left-4 top-4 flex flex-wrap gap-2">
              <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-text-dark">
                Assigned event
              </span>
              <span className="rounded-full bg-brown-normal px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
                {data.status}
              </span>
            </div>
          </div>

          <div className="p-5 md:p-8">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-sm capitalize text-text-light">
                  {data.event.category}
                </p>
                <h1 className="font-dynapuff text-2xl font-bold md:text-3xl">
                  {data.event.title}
                </h1>
              </div>
              <span className="rounded-full bg-brown-light px-3 py-1 text-sm capitalize">
                Assigned to vendor
              </span>
            </div>

            <div className="mt-6 grid gap-4 rounded-xl bg-brown-light p-4 md:grid-cols-2">
              <p>
                <Calendar className="mr-2 inline" size={18} />
                <b>Starts:</b> {new Date(data.event.startDate).toLocaleString()}
              </p>
              <p>
                <Calendar className="mr-2 inline" size={18} />
                <b>Ends:</b> {new Date(data.event.endDate).toLocaleString()}
              </p>
              <p>
                <MapPin className="mr-2 inline" size={18} />
                <b>Location:</b>{" "}
                {data.event.isOnline ? "Online event" : data.event.venue || "Location unavailable"}
              </p>
              <p>
                <b>Organizer:</b>{" "}
                {data.event.organizer?.name ?? "Event organizer"}
              </p>
              {data.stallName && (
                <p>
                  <b>Your stall:</b> {data.stallName}
                </p>
              )}
              <p>
                <b>Event status:</b>{" "}
                <span className="capitalize">{data.event.status}</span>
              </p>
            </div>

            <div className="mt-8 grid gap-4 rounded-xl border border-gray-200 bg-gray-50 p-4 md:grid-cols-2">
              {details.map((item) => (
                <div key={item.label} className="rounded-lg border border-gray-200 bg-white p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-text-light">
                    {item.label}
                  </p>
                  <p className="mt-2 text-sm font-semibold text-text-dark">{item.value}</p>
                </div>
              ))}
            </div>

            {mapUrl && (
              <div className="mt-8">
                <Map mapId={1} mapUrl={mapUrl} />
              </div>
            )}

            <div className="mt-8">
              <h2 className="font-dynapuff text-xl">Event Description</h2>
              <p className="mt-2 whitespace-pre-wrap leading-relaxed text-text-light">
                {data.event.description}
              </p>
            </div>

            {data.event.ticketTypes && data.event.ticketTypes.length > 0 && (
              <div className="mt-8">
                <h2 className="font-dynapuff text-xl">Tickets</h2>
                <div className="mt-4 space-y-3">
                  {data.event.ticketTypes.map((ticket) => (
                    <div key={`${ticket.name}-${ticket.price}`} className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 p-4">
                      <div>
                        <p className="font-semibold text-text-dark">{ticket.name}</p>
                        {ticket.description && (
                          <p className="mt-1 text-sm text-text-light">{ticket.description}</p>
                        )}
                        <p className="mt-2 text-xs text-text-light">{ticket.quantity} available</p>
                      </div>
                      <p className="text-lg font-bold text-brown-normal">
                        {ticket.price === 0 ? "Free" : `Rs. ${ticket.price.toLocaleString()}`}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </article>
      )}
    </section>
  );
}
