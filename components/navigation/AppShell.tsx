"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/admin");

  
  return (
    <>
      <Navbar />
      {isAdminRoute ? children : <main className="pt-[72px]">{children}</main>}
    </>
  );
}
