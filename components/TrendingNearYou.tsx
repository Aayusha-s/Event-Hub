"use client";

import { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import EventCard from "./EventCard";
import Button from "./Button";
import Link from "next/link";
import { ArrowRight, ChevronDown, Search, MapPin } from "lucide-react";
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

// Kathmandu Valley locations organized by district
const KATHMANDU_LOCATIONS: Record<string, string[]> = {
	Kathmandu: [
		"Kathmandu",
		"Thamel",
		"Kuleshwor",
		"Kalanki",
		"Kalimati",
		"Tripureshwor",
		"Lazimpat",
		"Maharajgunj",
		"Balaju",
		"Gongabu",
		"Tokha",
		"Boudha",
		"Chabahil",
		"Gaushala",
		"Baneshwor",
		"New Baneshwor",
		"Koteshwor",
		"Putalisadak",
		"Dillibazar"
	],
	Lalitpur: [
		"Lalitpur",
		"Patan",
		"Jawalakhel",
		"Pulchowk",
		"Kupondole",
		"Lagankhel",
		"Satdobato"
	],
	Bhaktapur: [
		"Bhaktapur",
		"Suryabinayak",
		"Madhyapur Thimi",
		"Lokanthali",
		"Duwakot"
	]
};

// Flatten locations for search
const ALL_LOCATIONS = Object.entries(KATHMANDU_LOCATIONS).flatMap(([district, locations]) =>
	locations.map(loc => ({ name: loc, district }))
);

export default function TrendingNearYou() {
	const [events, setEvents] = useState<Event[]>([]);
	const [location, setLocation] = useState("");
	const [detectedLocation, setDetectedLocation] = useState<string | null>(null);
	const [coordinates, setCoordinates] = useState<{ lat: number; lng: number } | null>(null);
	const [loading, setLoading] = useState(true);
	const [locationOpen, setLocationOpen] = useState(false);
	const [mounted, setMounted] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");
	const dropdownRef = useRef<HTMLDivElement>(null);
	const dropdownButtonRef = useRef<HTMLButtonElement>(null);
	const searchInputRef = useRef<HTMLInputElement>(null);
	const [dropdownPosition, setDropdownPosition] = useState<{ top: number; left: number }>({ top: 0, left: 0 });

	useEffect(() => {
		setMounted(true);
	}, []);

	// Get user's location
	useEffect(() => {
		if (!navigator.geolocation) return;

		navigator.geolocation.getCurrentPosition(
			(position) => {
				setCoordinates({ lat: position.coords.latitude, lng: position.coords.longitude });
				// For Kathmandu Valley, assume default location based on geolocation
				// In production, you'd use a reverse geocoding API to get the precise district
				setDetectedLocation("Kathmandu");
				setLocation("");
			},
			() => {
				// Geolocation permission denied, use default
				setDetectedLocation("Kathmandu");
				setLocation("");
			},
			{ maximumAge: 300000, timeout: 8000 }
		);
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

		// Initial load
		if (coordinates && !location) {
			// Load nearby events
			load(`/api/events/nearby?lat=${coordinates.lat}&lng=${coordinates.lng}&limit=6`);
		} else if (location === "") {
			// All Locations
			load("/api/events?status=published&pageSize=6");
		} else if (location) {
			// Specific location
			load(`/api/events?status=published&pageSize=6&location=${encodeURIComponent(location)}`);
		} else {
			// Trending as fallback
			load("/api/events/trending?limit=6");
		}

		return () => {
			alive = false;
		};
	}, [location, coordinates]);

	const selectLocation = (value: string) => {
		setLocation(value);
		setLocationOpen(false);
		setSearchQuery("");
		setLoading(true);
	};

	useEffect(() => {
		if (!locationOpen) return;

		const updateDropdownPosition = () => {
			const rect = dropdownButtonRef.current?.getBoundingClientRect();
			if (!rect) return;
			setDropdownPosition({ top: rect.bottom + 8, left: rect.left });
		};

		updateDropdownPosition();
		window.addEventListener("resize", updateDropdownPosition);
		window.addEventListener("scroll", updateDropdownPosition, true);

		// Focus search input when dropdown opens
		setTimeout(() => searchInputRef.current?.focus(), 100);

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
				setSearchQuery("");
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, [locationOpen]);

	// Filter locations based on search query
	const filteredLocations = searchQuery.trim()
		? ALL_LOCATIONS.filter(loc =>
			loc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
			loc.district.toLowerCase().includes(searchQuery.toLowerCase())
		)
		: ALL_LOCATIONS;

	// Group filtered locations by district
	const groupedLocations: Record<string, typeof ALL_LOCATIONS> = {};
	filteredLocations.forEach(loc => {
		if (!groupedLocations[loc.district]) {
			groupedLocations[loc.district] = [];
		}
		groupedLocations[loc.district].push(loc);
	});

	const displayLabel = location
		? ALL_LOCATIONS.find(l => l.name === location)?.name || location
		: detectedLocation
			? `${detectedLocation}`
			: "Kathmandu";

	return (
		<SectionContainer className="py-10 md:py-14">
			<FadeInView>
				<SectionHeader
					title={
						<span className="inline-flex flex-wrap items-center gap-2">
							Trending near{" "}
							<div className="relative z-10">
								<button
									ref={dropdownButtonRef}
									type="button"
									onClick={() => setLocationOpen((value) => !value)}
									aria-expanded={locationOpen}
									aria-haspopup="listbox"
									className="inline-flex items-center gap-1 text-xl font-semibold text-brown-dark underline decoration-brown-normal/40 underline-offset-4 transition hover:text-brown-normal sm:text-2xl"
								>
									<MapPin size={20} className="inline" />
									{displayLabel}
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
											className="fixed z-[9999] w-80 max-h-96 rounded-xl border border-border bg-surface shadow-2xl"
											style={{
												top: `${dropdownPosition.top}px`,
												left: `${dropdownPosition.left}px`,
											}}
										>
											{/* Search Input */}
											<div className="sticky top-0 bg-surface border-b border-border p-3 z-10">
												<div className="relative">
													<Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-light" />
													<input
														ref={searchInputRef}
														type="text"
														placeholder="Search location..."
														value={searchQuery}
														onChange={(e) => setSearchQuery(e.target.value)}
														className="w-full pl-9 pr-3 py-2 text-sm border border-border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary"
													/>
												</div>
											</div>

											{/* Locations List */}
											<div className="overflow-y-auto max-h-80">
												{Object.entries(groupedLocations).length > 0 ? (
													Object.entries(groupedLocations).map(([district, locs]) => (
														<div key={district}>
															<div className="px-3 py-2 text-xs font-semibold text-text-light uppercase bg-surface-hover">
																{district}
															</div>
															{locs.map((locItem) => (
																<button
																	type="button"
																	role="option"
																	key={locItem.name}
																	aria-selected={location === locItem.name}
																	onClick={() => selectLocation(locItem.name)}
																	className={`block w-full text-left px-3 py-2 text-sm transition ${
																		location === locItem.name
																			? "bg-primary-light text-primary font-medium"
																			: "hover:bg-surface-hover"
																	}`}
																>
																	{locItem.name}
																</button>
															))}
														</div>
													))
												) : (
													<div className="px-3 py-8 text-sm text-center text-text-light">
														No locations found
													</div>
												)}

												{/* All Locations Option */}
												{!searchQuery && (
													<>
														<div className="border-t border-border"></div>
														<button
															type="button"
															role="option"
															aria-selected={location === ""}
															onClick={() => selectLocation("")}
															className={`block w-full text-left px-3 py-2 text-sm transition font-medium ${
																location === ""
																	? "bg-primary-light text-primary"
																	: "hover:bg-surface-hover"
															}`}
														>
															All Locations
														</button>
													</>
												)}
											</div>
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
