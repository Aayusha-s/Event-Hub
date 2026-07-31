"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { Filter, Mic, MapPin, Search } from "lucide-react";

type SearchbarProps = {
    className?: string;
    showLocation?: boolean;
    /** Compact, single-row pill used inside the navbar (fixed height, no vertical stacking). */
    compact?: boolean;
};

type FilterState = {
    dateFrom: string;
    dateTo: string;
    location: string;
    distanceValue: string;
    distanceUnit: "miles" | "km";
    categories: string[];
    priceMin: string;
    priceMax: string;
    popularity: string;
};

const DEFAULT_FILTERS: FilterState = {
    dateFrom: "",
    dateTo: "",
    location: "",
    distanceValue: "",
    distanceUnit: "miles",
    categories: [],
    priceMin: "",
    priceMax: "",
    popularity: "",
};

const CATEGORY_OPTIONS = ["Music", "Food & Drink", "Business", "Arts", "Sports", "Community", "Health & Wellness", "Technology"];
const POPULARITY_OPTIONS = [
    { value: "trending", label: "Trending" },
    { value: "most-popular", label: "Most Popular" },
    { value: "new", label: "New & Noteworthy" },
    { value: "top-rated", label: "Top Rated" },
];

type SpeechRecognitionEventLike = {
    results: Array<Array<{ transcript: string }>>;
};

type SpeechRecognitionInstanceLike = {
    lang: string;
    interimResults: boolean;
    maxAlternatives: number;
    onstart: (() => void) | null;
    onend: (() => void) | null;
    onerror: (() => void) | null;
    onresult: ((event: SpeechRecognitionEventLike) => void) | null;
    start: () => void;
};

type SpeechRecognitionConstructorLike = new () => SpeechRecognitionInstanceLike;

const Searchbar = ({ className, showLocation = true, compact = false }: SearchbarProps) => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [query, setQuery] = useState(() => searchParams.get("query") ?? "");
    const [location, setLocation] = useState(() => searchParams.get("location") ?? "");
    const [isListening, setIsListening] = useState(false);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [filters, setFilters] = useState<FilterState>(() => ({
        dateFrom: searchParams.get("dateFrom") ?? "",
        dateTo: searchParams.get("dateTo") ?? "",
        location: searchParams.get("filterLocation") ?? "",
        distanceValue: searchParams.get("distance") ?? "",
        distanceUnit: (searchParams.get("distanceUnit") as "miles" | "km") ?? "miles",
        categories: searchParams.get("categories")?.split(",").filter(Boolean) ?? [],
        priceMin: searchParams.get("priceMin") ?? "",
        priceMax: searchParams.get("priceMax") ?? "",
        popularity: searchParams.get("popularity") ?? "",
    }));
    const filterRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!isFilterOpen) return;

        const handleClickOutside = (event: MouseEvent) => {
            if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
                setIsFilterOpen(false);
            }
        };
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === "Escape") setIsFilterOpen(false);
        };

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleEscape);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleEscape);
        };
    }, [isFilterOpen]);

    const submitSearch = (nextQuery = query, nextLocation = location) => {
        const params = new URLSearchParams();

        if (nextQuery.trim()) {
            params.set("query", nextQuery.trim());
        }

        if (nextLocation.trim()) {
            params.set("location", nextLocation.trim());
        }

        const targetPath = `/explore-events${params.toString() ? `?${params.toString()}` : ""}`;

        if (pathname === "/explore-events") {
            router.replace(targetPath);
        } else {
            router.push(targetPath);
        }
    };

    const toggleFilters = () => setIsFilterOpen((open) => !open);

    const toggleCategory = (category: string) => {
        setFilters((prev) => ({
            ...prev,
            categories: prev.categories.includes(category)
                ? prev.categories.filter((c) => c !== category)
                : [...prev.categories, category],
        }));
    };

    const clearFilters = () => setFilters(DEFAULT_FILTERS);

    const activeFilterCount =
        (filters.dateFrom ? 1 : 0) +
        (filters.dateTo ? 1 : 0) +
        (filters.location ? 1 : 0) +
        (filters.distanceValue ? 1 : 0) +
        filters.categories.length +
        (filters.priceMin ? 1 : 0) +
        (filters.priceMax ? 1 : 0) +
        (filters.popularity ? 1 : 0);

    const applyFilters = () => {
        const params = new URLSearchParams();

        if (query.trim()) params.set("query", query.trim());
        if (location.trim()) params.set("location", location.trim());
        if (filters.dateFrom) params.set("dateFrom", filters.dateFrom);
        if (filters.dateTo) params.set("dateTo", filters.dateTo);
        if (filters.location) params.set("filterLocation", filters.location);
        if (filters.distanceValue) {
            params.set("distance", filters.distanceValue);
            params.set("distanceUnit", filters.distanceUnit);
        }
        if (filters.categories.length) params.set("categories", filters.categories.join(","));
        if (filters.priceMin) params.set("priceMin", filters.priceMin);
        if (filters.priceMax) params.set("priceMax", filters.priceMax);
        if (filters.popularity) params.set("popularity", filters.popularity);

        setIsFilterOpen(false);
        router.push(`/explore-events${params.toString() ? `?${params.toString()}` : ""}`);
    };

    const startVoiceSearch = () => {
        if (typeof window === "undefined") {
            return;
        }

        const speechWindow = window as Window & {
            SpeechRecognition?: SpeechRecognitionConstructorLike;
            webkitSpeechRecognition?: SpeechRecognitionConstructorLike;
        };

        const SpeechRecognition = speechWindow.SpeechRecognition ?? speechWindow.webkitSpeechRecognition;

        if (!SpeechRecognition) {
            window.alert("Voice search is not supported in this browser.");
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.lang = "en-US";
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.onstart = () => setIsListening(true);
        recognition.onend = () => setIsListening(false);
        recognition.onerror = () => setIsListening(false);
        recognition.onresult = (event) => {
            const transcript = event.results?.[0]?.[0]?.transcript ?? "";
            if (!transcript) {
                return;
            }

            setQuery(transcript);
            submitSearch(transcript, location);
        };

        recognition.start();
    };

    return (
        <form
            className={cn("w-full", className)}
            onSubmit={(event) => {
                event.preventDefault();
                submitSearch();
            }}
        >
            <div
                className={cn(
                    "flex overflow-hidden rounded-full border border-border bg-surface shadow-sm transition-shadow duration-200 focus-within:shadow-md",
                    compact ? "h-11 flex-row items-center" : "flex-col lg:flex-row"
                )}
            >
                <label className={cn("flex min-w-0 flex-1 items-center gap-2.5", compact ? "h-full px-4" : "px-4 py-3")}>
                    <Search className="h-4 w-4 shrink-0 text-primary" />
                    <input
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                        placeholder={compact ? "Search events..." : "Search events, artists, venues"}
                        className="w-full min-w-0 bg-transparent text-sm text-text-dark placeholder:text-text-muted focus:outline-none"
                    />
                </label>

                {showLocation && (
                    <label
                        className={cn(
                            "flex min-w-0 flex-1 items-center gap-2.5 border-divider",
                            compact ? "h-full border-l px-4" : "border-t px-4 py-3 lg:border-l lg:border-t-0"
                        )}
                    >
                        <MapPin className="h-4 w-4 shrink-0 text-primary" />
                        <input
                            value={location}
                            onChange={(event) => setLocation(event.target.value)}
                            placeholder="Location"
                            className="w-full min-w-0 bg-transparent text-sm text-text-dark placeholder:text-text-muted focus:outline-none"
                        />
                    </label>
                )}

                <div
                    className={cn(
                        "flex items-center gap-1.5 border-divider",
                        compact ? "h-full border-l px-2" : "border-t px-3 py-3 lg:border-l lg:border-t-0"
                    )}
                >
                    <div className="relative" ref={filterRef}>
                        <button
                            type="button"
                            onClick={toggleFilters}
                            className={cn(
                                "relative inline-flex items-center justify-center rounded-full border transition-colors",
                                compact ? "h-8 w-8" : "h-10 w-10",
                                isFilterOpen
                                    ? "border-primary bg-primary-light text-primary"
                                    : "border-border bg-surface text-text-light hover:border-primary hover:text-primary"
                            )}
                            aria-label="Open filters"
                            aria-expanded={isFilterOpen}
                        >
                            <Filter className="h-4 w-4" />
                            {activeFilterCount > 0 && (
                                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-semibold text-white">
                                    {activeFilterCount}
                                </span>
                            )}
                        </button>

                        {isFilterOpen && (
                            <div className="absolute right-0 top-full z-50 mt-2 w-[92vw] max-w-sm rounded-2xl border border-border bg-surface p-4 shadow-xl duration-150 animate-in fade-in slide-in-from-top-2">
                                <div className="flex max-h-[70vh] flex-col gap-4 overflow-y-auto pr-1">
                                    {/* Date & Time Range */}
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-xs font-semibold text-text-light">Date &amp; Time Range</label>
                                        <div className="flex items-center gap-2">
                                            <input
                                                type="date"
                                                value={filters.dateFrom}
                                                onChange={(e) => setFilters((prev) => ({ ...prev, dateFrom: e.target.value }))}
                                                className="w-full rounded-lg border border-border bg-transparent px-2 py-1.5 text-sm text-text-dark focus:outline-none focus:border-primary"
                                            />
                                            <span className="text-xs text-text-light">to</span>
                                            <input
                                                type="date"
                                                value={filters.dateTo}
                                                onChange={(e) => setFilters((prev) => ({ ...prev, dateTo: e.target.value }))}
                                                className="w-full rounded-lg border border-border bg-transparent px-2 py-1.5 text-sm text-text-dark focus:outline-none focus:border-primary"
                                            />
                                        </div>
                                    </div>

                                    {/* Location */}
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-xs font-semibold text-text-light">Location</label>
                                        <input
                                            value={filters.location}
                                            onChange={(e) => setFilters((prev) => ({ ...prev, location: e.target.value }))}
                                            placeholder="City or venue"
                                            className="rounded-lg border border-border bg-transparent px-2 py-1.5 text-sm text-text-dark focus:outline-none focus:border-primary"
                                        />
                                    </div>

                                    {/* Distance */}
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-xs font-semibold text-text-light">Distance</label>
                                        <div className="flex items-center gap-2">
                                            <input
                                                type="number"
                                                min="0"
                                                value={filters.distanceValue}
                                                onChange={(e) => setFilters((prev) => ({ ...prev, distanceValue: e.target.value }))}
                                                placeholder="e.g. 10"
                                                className="w-full rounded-lg border border-border bg-transparent px-2 py-1.5 text-sm text-text-dark focus:outline-none focus:border-primary"
                                            />
                                            <div className="flex shrink-0 overflow-hidden rounded-lg border border-border text-xs font-medium">
                                                <button
                                                    type="button"
                                                    onClick={() => setFilters((prev) => ({ ...prev, distanceUnit: "miles" }))}
                                                    className={cn("px-2.5 py-1.5 transition-colors", filters.distanceUnit === "miles" ? "bg-primary text-white" : "bg-surface text-text-light hover:text-primary")}
                                                >
                                                    Miles
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => setFilters((prev) => ({ ...prev, distanceUnit: "km" }))}
                                                    className={cn("px-2.5 py-1.5 transition-colors border-l border-border", filters.distanceUnit === "km" ? "bg-primary text-white" : "bg-surface text-text-light hover:text-primary")}
                                                >
                                                    Km
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Categories */}
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-xs font-semibold text-text-light">Categories</label>
                                        <div className="flex flex-wrap gap-1.5">
                                            {CATEGORY_OPTIONS.map((category) => (
                                                <button
                                                    key={category}
                                                    type="button"
                                                    onClick={() => toggleCategory(category)}
                                                    className={cn(
                                                        "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
                                                        filters.categories.includes(category)
                                                            ? "border-primary bg-primary-light text-primary"
                                                            : "border-border text-text-dark hover:border-primary"
                                                    )}
                                                >
                                                    {category}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Price Range */}
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-xs font-semibold text-text-light">Price Range</label>
                                        <div className="flex items-center gap-2">
                                            <input
                                                type="number"
                                                min="0"
                                                value={filters.priceMin}
                                                onChange={(e) => setFilters((prev) => ({ ...prev, priceMin: e.target.value }))}
                                                placeholder="Min"
                                                className="w-full rounded-lg border border-border bg-transparent px-2 py-1.5 text-sm text-text-dark focus:outline-none focus:border-primary"
                                            />
                                            <span className="text-xs text-text-light">to</span>
                                            <input
                                                type="number"
                                                min="0"
                                                value={filters.priceMax}
                                                onChange={(e) => setFilters((prev) => ({ ...prev, priceMax: e.target.value }))}
                                                placeholder="Max"
                                                className="w-full rounded-lg border border-border bg-transparent px-2 py-1.5 text-sm text-text-dark focus:outline-none focus:border-primary"
                                            />
                                        </div>
                                    </div>

                                    {/* Popularity */}
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-xs font-semibold text-text-light">Popularity</label>
                                        <div className="flex flex-wrap gap-1.5">
                                            {POPULARITY_OPTIONS.map((option) => (
                                                <button
                                                    key={option.value}
                                                    type="button"
                                                    onClick={() =>
                                                        setFilters((prev) => ({
                                                            ...prev,
                                                            popularity: prev.popularity === option.value ? "" : option.value,
                                                        }))
                                                    }
                                                    className={cn(
                                                        "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
                                                        filters.popularity === option.value
                                                            ? "border-primary bg-primary-light text-primary"
                                                            : "border-border text-text-dark hover:border-primary"
                                                    )}
                                                >
                                                    {option.label}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-4 flex items-center justify-between border-t border-divider pt-3">
                                    <button type="button" onClick={clearFilters} className="text-sm font-medium text-text-light hover:text-primary">
                                        Clear
                                    </button>
                                    <button
                                        type="button"
                                        onClick={applyFilters}
                                        className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-hover"
                                    >
                                        Apply Filters
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    <button
                        type="button"
                        onClick={startVoiceSearch}
                        className={cn(
                            "inline-flex items-center justify-center rounded-full border transition-colors",
                            compact ? "h-8 w-8" : "h-10 w-10",
                            isListening
                                ? "border-primary bg-primary-light text-primary"
                                : "border-border bg-surface text-text-light hover:border-primary hover:text-primary"
                        )}
                        aria-label="Voice search"
                    >
                        <Mic className="h-4 w-4" />
                    </button>

                    <button
                        type="submit"
                        className={cn(
                            "inline-flex items-center justify-center rounded-full bg-primary font-medium text-white shadow-sm transition-all duration-200 hover:bg-primary-hover hover:shadow-md active:bg-primary-active",
                            compact ? "h-8 px-4 text-xs" : "h-10 px-5 text-sm"
                        )}
                    >
                        Search
                    </button>
                </div>
            </div>
        </form>
    );
};

export default Searchbar;