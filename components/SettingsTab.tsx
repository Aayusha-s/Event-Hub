"use client";

import { Bell, Lock, Shield, UserRound } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const items = [
    { href: "/settings/profile", label: "Account", icon: UserRound },
    { href: "/settings/notification", label: "Preferences", icon: Bell },
    { href: "/settings/account", label: "Security", icon: Lock },
    { href: "/settings/privacy", label: "Privacy", icon: Shield },
];

export default function SettingsTab() {
    const pathname = usePathname();
    const adminPrefix = pathname.startsWith("/admin/settings") ? "/admin/settings" : "";
    return <nav aria-label="Settings sections" className="hidden h-fit w-56 shrink-0 rounded-2xl border border-border bg-surface p-2 shadow-xs lg:block">{items.map(({ href, label, icon: Icon }) => { const target = adminPrefix ? href === "/settings/profile" ? adminPrefix : `${adminPrefix}${href.replace("/settings", "")}` : href; return <Link key={href} href={target} className={cn("mb-1 flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition-colors last:mb-0", pathname === target ? "bg-primary-light text-primary" : "text-text-dark hover:bg-surface-hover hover:text-primary")}><Icon size={18} />{label}</Link>; })}</nav>;
}
