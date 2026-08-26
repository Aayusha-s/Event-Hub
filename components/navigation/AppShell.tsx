"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";

export default function AppShell({ children }: { children: React.ReactNode }) {
	const pathname = usePathname();
	const isAdminRoute = pathname.startsWith("/admin");

	// The route layout owns every /admin page. Keeping this path-based prevents a
	// session hydration change from temporarily introducing a second content wrapper.
	return <><Navbar />{isAdminRoute ? children : <main className="pt-[72px]">{children}</main>}</>;
}
