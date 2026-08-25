"use client";

import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import AdminSidebar from "@/components/navigation/AdminSidebar";

export default function AppShell({ children }: { children: React.ReactNode }) {
	const { data: session } = useSession(); const pathname = usePathname(); const admin = session?.user?.role === "admin" && pathname.startsWith("/admin");
	return <><Navbar />{admin && <AdminSidebar />}<main className={admin ? "pt-[72px] lg:pl-64" : "pt-[72px]"}>{children}</main></>;
}
