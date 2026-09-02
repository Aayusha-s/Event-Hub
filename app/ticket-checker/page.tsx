"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Camera, ClipboardList, Keyboard } from "lucide-react";
import TicketLookup from "@/components/TicketLookup";
import ScannerPage from "./scanner/page";

type Data = { summary: Record<string, number> };
export default function TicketCheckerDashboard() {
  const [mode, setMode] = useState<"scanner" | "manual">("scanner");
  const [data, setData] = useState<Data | null>(null);
  const [error, setError] = useState("");
  useEffect(() => {
    fetch("/api/checkin?view=dashboard")
      .then(async (res) => {
        const json = await res.json();
        if (!res.ok || !json.success) throw new Error(json.error?.message);
        setData(json.data);
      })
      .catch(() => setError("Unable to load ticket checker data."));
  }, []);
  return (
    <section className="mx-auto max-w-6xl px-4 py-10 font-cause text-text-dark">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-dynapuff font-semibold">
            Check Tickets
          </h1>
          <p className="mt-1 text-text-light">
            Scan a QR code or enter a ticket ID to verify and check in
            attendees.
          </p>
        </div>
        <Link
          href="/ticket-checker/attendance"
          className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium hover:bg-primary-light"
        >
          <ClipboardList size={17} />
          Attendance log
        </Link>
      </div>
      {error && <p className="mb-5 text-error">{error}</p>}
      {data && (
        <div className="mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {Object.entries(data.summary).map(([label, value]) => (
            <div
              key={label}
              className="rounded-xl border border-border bg-surface p-4"
            >
              <p className="text-sm text-text-light">
                {label
                  .replace(/([A-Z])/g, " $1")
                  .replace(/^./, (v) => v.toUpperCase())}
              </p>
              <p className="mt-1 text-2xl font-semibold">{value}</p>
            </div>
          ))}
        </div>
      )}
      <div className="mb-5 flex gap-2 border-b border-divider">
        <button
          type="button"
          onClick={() => setMode("scanner")}
          className={
            mode === "scanner"
              ? "border-b-2 border-primary px-4 py-3 font-semibold text-primary"
              : "px-4 py-3 text-text-light hover:text-primary"
          }
        >
          <Camera className="mr-2 inline" size={17} />
          QR Scanner
        </button>
        <button
          type="button"
          onClick={() => setMode("manual")}
          className={
            mode === "manual"
              ? "border-b-2 border-primary px-4 py-3 font-semibold text-primary"
              : "px-4 py-3 text-text-light hover:text-primary"
          }
        >
          <Keyboard className="mr-2 inline" size={17} />
          Manual Ticket ID
        </button>
      </div>
      {mode === "scanner" ? (
        <ScannerPage />
      ) : (
        <TicketLookup
          title="Manual Ticket ID"
          description="Enter a ticket number to verify it and confirm check-in."
        />
      )}
    </section>
  );
}
