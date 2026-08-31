"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Store, MapPin } from "lucide-react";

type Stall = { _id?: string; vendorId: string; businessName: string; category: string; logo?: string; stallName?: string };

export default function EventStalls({ eventId }: { eventId: string }) {
    const [items, setItems] = useState<Stall[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let active = true;
        setLoading(true);
        fetch(`/api/events/${eventId}/stalls`, { cache: "no-store" })
            .then(async (r) => {
                const j = await r.json();
                if (r.ok && j.success && active) setItems(j.data ?? []);
            })
            .catch(() => undefined)
            .finally(() => active && setLoading(false));
        return () => { active = false; };
    }, [eventId]);

    if (loading) {
        return (
            <section className="mt-10 md:mt-16">
                <h2 className="mb-4 font-dynapuff text-xl font-bold">Vendors & Stalls</h2>
                <p className="text-sm text-text-light">Loading approved vendors…</p>
            </section>
        );
    }

    if (!items.length) return null;

    return (
        <section className="mt-10 md:mt-16">
            <div className="flex flex-row items-start sm:items-center justify-between mb-4 md:mb-6">
                <h2 className="font-dynapuff font-bold text-xl md:text-xl lg:text-xl mb-3 sm:mb-0">Vendors & Stalls</h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((item) => (
                    <article
                        key={`${item.vendorId}-${item.stallName ?? "stall"}`}
                        className="rounded-xl border-2 border-brown-normal p-4 transition-all duration-200 hover:shadow-md hover:border-brown-dark"
                    >
                        <div className="flex items-center gap-3">
                            {item.logo ? (
                                <img src={item.logo} alt="" className="h-12 w-12 rounded-full object-cover" />
                            ) : (
                                <div className="rounded-full bg-brown-light p-3">
                                    <Store size={20} />
                                </div>
                            )}
                            <div className="min-w-0">
                                {item._id ? (
                                    <Link href={`/stalls/${item._id}`} className="font-semibold truncate text-brown-normal hover:text-brown-dark transition-colors block">
                                        {item.stallName ?? item.businessName}
                                    </Link>
                                ) : (
                                    <h3 className="font-semibold truncate">{item.stallName ?? item.businessName}</h3>
                                )}
                                <Link href={`/vendors/${item.vendorId}`} className="text-sm text-text-light hover:text-brown-normal transition-colors">
                                    {item.businessName} · {item.category}
                                </Link>
                            </div>
                        </div>
                        <div className="mt-3 flex items-center gap-1 text-xs text-text-light">
                            <MapPin size={12} />
                            <span>Approved vendor stall</span>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}
