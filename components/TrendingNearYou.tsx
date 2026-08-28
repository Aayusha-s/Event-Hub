"use client";

import { useEffect, useState } from "react";
import EventCard from "./EventCard";
import Button from "./Button";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import SectionContainer from "./SectionContainer";
import SectionHeader from "./SectionHeader";
import FadeInView from "./motion/FadeInView";
import StaggerGrid from "./motion/StaggerGrid";

type Event = { _id: string; title: string; description: string; venue: string; tags: string[]; images: string[]; ticketTypes: { price: number }[]; organizer?: { name?: string } };

export default function TrendingNearYou() {
    const [events, setEvents] = useState<Event[]>([]);
    const [locations, setLocations] = useState<string[]>([]);
    const [location, setLocation] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let alive = true;
        const load = (url: string) => fetch(url).then((response) => response.json()).then((result) => { if (!alive || !result.success) return; setEvents(result.data.items ?? result.data); }).finally(() => { if (alive) setLoading(false); });
        fetch("/api/events?status=published&pageSize=100", { cache: "no-store" }).then((response) => response.json()).then((result) => { if (!alive || !result.success) return; const values = [...new Set((result.data.items as Event[]).map((event) => event.venue).filter(Boolean))]; setLocations(values); }).catch(() => undefined);
        if (!navigator.geolocation) { load("/api/events/trending?limit=6"); return () => { alive = false; }; }
        navigator.geolocation.getCurrentPosition((position) => { if (!alive) return; setLocation("__nearby__"); load(`/api/events/nearby?lat=${position.coords.latitude}&lng=${position.coords.longitude}&limit=6`); }, () => load("/api/events/trending?limit=6"), { maximumAge: 300000, timeout: 8000 });
        return () => { alive = false; };
    }, []);

    const selectLocation = (value: string) => {
        setLocation(value);
        setLoading(true);
        const url = value === "__nearby__" ? "/api/events/trending?limit=6" : value ? `/api/events?status=published&pageSize=6&location=${encodeURIComponent(value)}` : "/api/events/trending?limit=6";
        fetch(url).then((response) => response.json()).then((result) => { if (result.success) setEvents(result.data.items ?? result.data); }).finally(() => setLoading(false));
    };

    return <SectionContainer className="py-10 md:py-14"><FadeInView><SectionHeader title={<span className="inline-flex flex-wrap items-center gap-2">Trending near <label className="inline-flex items-center gap-2"><MapPin className="h-4 w-4 text-brown-normal" aria-hidden="true" /><select value={location} onChange={(event) => selectLocation(event.target.value)} aria-label="Choose event location" className="focus-ring rounded-lg border border-brown-normal/60 bg-white px-3 py-1 text-base font-semibold text-brown-dark"><option value="">All locations</option><option value="__nearby__">Near you</option>{locations.map((value) => <option key={value} value={value}>{value}</option>)}</select></label></span>} description="Popular events happening in your area right now." /></FadeInView><StaggerGrid className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3" staggerMs={90}>{!loading && events.map((event) => <EventCard key={event._id} eventId={event._id} tags={event.tags} imageUrl={event.images[0] ?? "/images/party.png"} imageAlt={event.title} title={event.title} organizer={`By ${event.organizer?.name ?? "Event organizer"}`} descriptions={[event.description]} location={event.venue} price={event.ticketTypes.some((ticket) => ticket.price === 0) ? "Free" : `From Rs.${Math.min(...event.ticketTypes.map((ticket) => ticket.price))}`} />)}</StaggerGrid><FadeInView delay={200} className="mt-10 flex justify-center"><Link href="/explore-events"><Button text="View All Events" iconRight={<ArrowRight className="h-4 w-4" aria-hidden="true" />} variant="cta" /></Link></FadeInView></SectionContainer>;
}
