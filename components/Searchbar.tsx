"use client";

import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { Filter, Mic, MapPin, Search } from "lucide-react";

type SearchbarProps = {
    className?: string;
    showLocation?: boolean;
};

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

const Searchbar = ({ className, showLocation = true }: SearchbarProps) => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [query, setQuery] = useState(() => searchParams.get("query") ?? "");
    const [location, setLocation] = useState(() => searchParams.get("location") ?? "");
    const [isListening, setIsListening] = useState(false);

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

    const openFilters = () => {
        const params = new URLSearchParams();

        if (query.trim()) {
            params.set("query", query.trim());
        }

        if (location.trim()) {
            params.set("location", location.trim());
        }

        params.set("filters", "open");
        router.push(`/explore-events?${params.toString()}`);
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
            <div className="flex flex-col overflow-hidden rounded-full border border-border bg-surface shadow-sm lg:flex-row">
                <label className="flex min-w-0 flex-1 items-center gap-3 px-4 py-3">
                    <Search className="h-4 w-4 shrink-0 text-primary" />
                    <input
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                        placeholder="Search events, artists, venues"
                        className="w-full min-w-0 bg-transparent text-sm text-text-dark placeholder:text-text-muted focus:outline-none"
                    />
                </label>

                {showLocation && (
                    <label className="flex min-w-0 flex-1 items-center gap-3 border-t border-divider px-4 py-3 lg:border-l lg:border-t-0">
                        <MapPin className="h-4 w-4 shrink-0 text-primary" />
                        <input
                            value={location}
                            onChange={(event) => setLocation(event.target.value)}
                            placeholder="Location"
                            className="w-full min-w-0 bg-transparent text-sm text-text-dark placeholder:text-text-muted focus:outline-none"
                        />
                    </label>
                )}

                <div className="flex items-center gap-2 border-t border-divider px-3 py-3 lg:border-l lg:border-t-0">
                    <button
                        type="button"
                        onClick={openFilters}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface text-text-light transition-colors hover:border-primary hover:text-primary"
                        aria-label="Open filters"
                    >
                        <Filter className="h-4 w-4" />
                    </button>

                    <button
                        type="button"
                        onClick={startVoiceSearch}
                        className={cn(
                            "inline-flex h-10 w-10 items-center justify-center rounded-full border transition-colors",
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
                        className="inline-flex h-10 items-center justify-center rounded-full bg-primary px-5 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:bg-primary-hover hover:shadow-md active:bg-primary-active"
                    >
                        Search
                    </button>
                </div>
            </div>
        </form>
    );
};

export default Searchbar;
