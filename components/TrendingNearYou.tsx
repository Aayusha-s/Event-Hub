"use client";

import { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import EventCard from "./EventCard";
import Button from "./Button";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import SectionContainer from "./SectionContainer";
import SectionHeader from "./SectionHeader";
import FadeInView from "./motion/FadeInView";
import StaggerGrid from "./motion/StaggerGrid";

type Event = {
	_id: string;
	title: string;
	description: string;
	venue: string;
	tags: string[];
	images: string[];
	ticketTypes: { price: number }[];
	organizer?: { name?: string };
};

export default function TrendingNearYou() {
	const [events, setEvents] = useState<Event[]>([]);
	const [locations, setLocations] = useState<string[]>([]);
	const [location, setLocation] = useState("");
	const [coordinates, setCoordinates] = useState<{ lat: number; lng: number } | null>(null);
	const [loading, setLoading] = useState(true);
	const [locationOpen, setLocationOpen] = useState(false);
	const [mounted, setMounted] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);
	const dropdownButtonRef = useRef<HTMLButtonElement>(null);
	const [dropdownPosition, setDropdownPosition] = useState<{ top: number; left: number }>({ top: 0, left: 0 });

	useEffect(() => {
		setMounted(true);
	}, []);

	useEffect(() => {
		let alive = true;
		const load = (url: string) =>
			fetch(url)
				.then((response) => response.json())
				.then((result) => {
					if (!alive || !result.success) return;
					setEvents(result.data.items ?? result.data);
				})
				.finally(() => {
					if (alive) setLoading(false);
				});

		fetch("/api/events?status=published&pageSize=100", { cache: "no-store" })
			.then((response) => response.json())
			.then((result) => {
				if (!alive || !result.success) return;
				const values = [...new Set((result.data.items as Event[]).map((event) => event.venue).filter(Boolean))];
				setLocations(values);
			})
			.catch(() => undefined);

		if (!navigator.geolocation) {
			load("/api/events/trending?limit=6");
			return () => {
				alive = false;
			};
		}

		navigator.geolocation.getCurrentPosition(
			(position) => {
				if (!alive) return;
				const nextCoordinates = { lat: position.coords.latitude, lng: position.coords.longitude };
				setCoordinates(nextCoordinates);
				setLocation("__nearby__");
				load(`/api/events/nearby?lat=${nextCoordinates.lat}&lng=${nextCoordinates.lng}&limit=6`);
			},
			() => load("/api/events/trending?limit=6"),
			{ maximumAge: 300000, timeout: 8000 }
		);

		return () => {
			alive = false;
		};
	}, []);

	const selectLocation = (value: string) => {
		setLocation(value);
		setLocationOpen(false);
		setLoading(true);

		// Determine which API to call based on selected location
		let url: string;
		if (value === "__nearby__" && coordinates) {
			url = `/api/events/nearby?lat=${coordinates.lat}&lng=${coordinates.lng}&limit=6`;
		} else if (value === "__nearby__") {
			url = "/api/events/trending?limit=6";
		} else if (value === "") {
			// All Locations - fetch all published events with no location filter
			url = "/api/events?status=published&pageSize=6";
		} else {
			// Specific location
			url = `/api/events?status=published&pageSize=6&location=${encodeURIComponent(value)}`;
		}

		fetch(url)
			.then((response) => response.json())
			.then((result) => {
				if (result.success) setEvents(result.data.items ?? result.data);
			})
			.finally(() => setLoading(false));
	};

	useEffect(() => {
		if (!locationOpen) return;

		const updateDropdownPosition = () => {
			const rect = dropdownButtonRef.current?.getBoundingClientRect();
			if (!rect) return;
			// The menu is position: fixed, so these must remain viewport coordinates.
			setDropdownPosition({ top: rect.bottom + 8, left: rect.left });
		};

		updateDropdownPosition();
		window.addEventListener("resize", updateDropdownPosition);
		window.addEventListener("scroll", updateDropdownPosition, true);
		return () => {
			window.removeEventListener("resize", updateDropdownPosition);
			window.removeEventListener("scroll", updateDropdownPosition, true);
		};
	}, [locationOpen]);

	// Close dropdown when clicking outside
	useEffect(() => {
		if (!locationOpen) return;

		const handleClickOutside = (e: MouseEvent) => {
			if (
				!dropdownButtonRef.current?.contains(e.target as Node) &&
				!dropdownRef.current?.contains(e.target as Node)
			) {
				setLocationOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, [locationOpen]);

	const locationLabel = location === "__nearby__" ? "Near Me" : location || "Near Me";

	return (
		<SectionContainer className="py-10 md:py-14">
			<FadeInView>
				<SectionHeader
					title={
						<span className="inline-flex flex-wrap items-center gap-2">
							Trending near{" "}
							<div className="relative">
								<button
									ref={dropdownButtonRef}
									type="button"
									onClick={() => setLocationOpen((value) => !value)}
									aria-expanded={locationOpen}
									aria-haspopup="listbox"
									className="inline-flex items-center gap-1 text-xl font-semibold text-brown-dark underline decoration-brown-normal/40 underline-offset-4 transition hover:text-brown-normal sm:text-2xl"
								>
									{locationLabel}
									<ChevronDown
										className={`h-4 w-4 transition-transform ${locationOpen ? "rotate-180" : ""}`}
										aria-hidden="true"
									/>
								</button>

								{mounted &&
									locationOpen &&
									createPortal(
										<div
											ref={dropdownRef}
											role="listbox"
											className="fixed z-[70] max-h-64 min-w-52 overflow-y-auto rounded-xl border border-border bg-surface p-1 text-left shadow-xl"
											style={{
												top: `${dropdownPosition.top}px`,
												left: `${dropdownPosition.left}px`,
											}}
										>
											<button
												type="button"
												role="option"
												aria-selected={location === "__nearby__"}
												onClick={() => selectLocation("__nearby__")}
												className="block w-full rounded-lg px-3 py-2 text-sm hover:bg-surface-hover"
											>
												Near Me
											</button>
											<button
												type="button"
												role="option"
												aria-selected={!location}
												onClick={() => selectLocation("")}
												className="block w-full rounded-lg px-3 py-2 text-sm hover:bg-surface-hover"
											>
												All Locations
											</button>
											{locations.map((value) => (
												<button
													type="button"
													role="option"
													key={value}
													aria-selected={location === value}
													onClick={() => selectLocation(value)}
													className="block w-full rounded-lg px-3 py-2 text-sm hover:bg-surface-hover"
												>
													{value}
												</button>
											))}
										</div>,
										document.body
									)}
							</div>
						</span>
					}
					description="Popular events happening in your area right now."
				/>
			</FadeInView>

			<StaggerGrid className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3" staggerMs={90}>
				{!loading &&
					events.map((event) => (
							<EventCard
								key={event._id}
								eventId={event._id}
								tags={event.tags}
								imageUrl={event.images[0] ?? "/images/party.png"}
								imageAlt={event.title}
								title={event.title}
								organizer={`By ${event.organizer?.name || "Unknown"}`}
								descriptions={[event.description]}
								location={event.venue}
								price={event.ticketTypes.some((ticket) => ticket.price === 0) ? "Free" : `From Rs.${Math.min(...event.ticketTypes.map((ticket) => ticket.price))}`}
							/>
					))}
			</StaggerGrid>

			<div className="mt-8 flex justify-center">
				<Link href="/explore-events">
					<Button
						text="Explore all events"
						variant="secondary"
						size="sm"
						iconRight={<ArrowRight size={17} />}
					/>
				</Link>
			</div>
		</SectionContainer>
	);
}
