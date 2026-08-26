"use client";

import { useEffect, useState } from "react";
import Button from "@/components/Button";
import SettingsHeading from "@/components/SettingsHeading";
import SettingsTab from "@/components/SettingsTab";
import ToggleSwitch from "@/components/ToggleSwitch";

type PrivacyPreferences = Record<string, boolean>;
const rows = [
    { key: "showEmail", title: "Show email address", description: "Display your email on your public profile." },
    { key: "showPhone", title: "Show phone number", description: "Display your phone number on your public profile." },
    { key: "showEvents", title: "Show attending events", description: "Allow others to see events you are attending." },
    { key: "allowMessages", title: "Allow direct messages", description: "Let other users message you through Vivnt." },
];

export default function PrivacySettingsPage() {
    const [preferences, setPreferences] = useState<PrivacyPreferences>({ showEmail: false, showPhone: false, showEvents: true, allowMessages: true }); const [saving, setSaving] = useState(false); const [message, setMessage] = useState(""); const [error, setError] = useState("");
    useEffect(() => { fetch("/api/settings", { cache: "no-store" }).then(async (response) => { const result = await response.json(); if (!response.ok || !result.success) throw new Error(result.error?.message ?? "Unable to load privacy preferences."); setPreferences((current) => ({ ...current, ...(result.data.privacy ?? {}) })); }).catch((cause) => setError(cause instanceof Error ? cause.message : "Unable to load privacy preferences.")); }, []);
    const save = async () => { setSaving(true); setMessage(""); setError(""); try { const response = await fetch("/api/settings", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ privacy: preferences }) }); const result = await response.json(); if (!response.ok || !result.success) throw new Error(result.error?.message ?? "Unable to save privacy preferences."); setMessage("Privacy preferences saved."); } catch (cause) { setError(cause instanceof Error ? cause.message : "Unable to save privacy preferences."); } finally { setSaving(false); } };
    return <section className="app-page font-cause text-text-dark"><SettingsHeading /><div className="flex flex-col gap-6 lg:flex-row"><SettingsTab /><div className="surface-card min-w-0 flex-1 p-5 sm:p-7"><h2 className="text-xl font-semibold">Privacy</h2><p className="mt-1 text-sm text-text-light">Control how your account information is shared.</p>{message && <p className="mt-5 rounded-xl border border-success/30 bg-success-light px-3 py-2 text-sm text-green-700">{message}</p>}{error && <p className="mt-5 rounded-xl border border-error/30 bg-error-light px-3 py-2 text-sm text-error">{error}</p>}<div className="mt-5 divide-y divide-divider">{rows.map((item) => <div key={item.key} className="flex min-w-0 items-center justify-between gap-5 py-5"><div className="min-w-0"><h3 className="font-semibold">{item.title}</h3><p className="mt-1 text-sm text-text-light">{item.description}</p></div><ToggleSwitch checked={Boolean(preferences[item.key])} onChange={() => setPreferences((current) => ({ ...current, [item.key]: !current[item.key] }))} /></div>)}</div><div className="mt-6 flex justify-end border-t border-divider pt-5"><Button text={saving ? "Saving…" : "Save Changes"} disabled={saving} onClick={save} /></div></div></div></section>;
}
