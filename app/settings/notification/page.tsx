"use client";

import { useEffect, useMemo, useState } from "react";
import { useSession } from "next-auth/react";
import Button from "@/components/Button";
import SettingsHeading from "@/components/SettingsHeading";
import SettingsTab from "@/components/SettingsTab";
import ToggleSwitch from "@/components/ToggleSwitch";

type Preferences = Record<string, boolean>;
const roleCopy: Record<
  string,
  {
    title: string;
    description: string;
    items: { key: string; title: string; description: string }[];
  }
> = {
  attendee: {
    title: "Event preferences",
    description: "Choose updates about events, tickets, and recommendations.",
    items: [
      {
        key: "eventReminders",
        title: "Event reminders",
        description: "Reminders for events you plan to attend.",
      },
      {
        key: "ticketUpdates",
        title: "Ticket updates",
        description: "Booking confirmations and ticket changes.",
      },
      {
        key: "recommendations",
        title: "Event recommendations",
        description: "Suggested events and weekly discovery updates.",
      },
    ],
  },
  organizer: {
    title: "Organizer preferences",
    description: "Choose updates about your events and attendee activity.",
    items: [
      {
        key: "eventActivity",
        title: "Event activity",
        description: "Updates about registrations and attendee activity.",
      },
      {
        key: "approvalUpdates",
        title: "Approval updates",
        description: "Updates about your event approval status.",
      },
      {
        key: "organizerDigest",
        title: "Organizer digest",
        description: "A summary of your event performance.",
      },
    ],
  },
  vendor: {
    title: "Vendor preferences",
    description: "Choose updates about stall requests and assigned events.",
    items: [
      {
        key: "stallUpdates",
        title: "Stall updates",
        description: "Changes to your stall requests and approvals.",
      },
      {
        key: "vendorEvents",
        title: "Assigned event updates",
        description: "Changes to events where you have a stall.",
      },
      {
        key: "vendorDigest",
        title: "Vendor digest",
        description: "A summary of your vendor activity.",
      },
    ],
  },
  ticket_checker: {
    title: "Ticket Checker preferences",
    description: "Choose updates relevant to ticket check-in work.",
    items: [
      {
        key: "checkinUpdates",
        title: "Check-in updates",
        description: "Changes to ticket-checking assignments.",
      },
      {
        key: "eventReminders",
        title: "Event reminders",
        description: "Reminders for upcoming check-in shifts.",
      },
    ],
  },
  admin: {
    title: "Admin preferences",
    description: "Choose updates about platform moderation and administration.",
    items: [
      {
        key: "approvalUpdates",
        title: "Approval updates",
        description: "Pending events, vendors, and stalls.",
      },
      {
        key: "platformAlerts",
        title: "Platform alerts",
        description: "Important platform and account alerts.",
      },
      {
        key: "adminDigest",
        title: "Admin digest",
        description: "A summary of platform activity.",
      },
    ],
  },
};

export default function NotificationSettingsPage() {
  const { data: session } = useSession();
  const role = session?.user?.role ?? "attendee";
  const config = useMemo(() => roleCopy[role] ?? roleCopy.attendee, [role]);
  const [preferences, setPreferences] = useState<Preferences>({
    email: true,
    push: false,
  });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  useEffect(() => {
    fetch("/api/settings", { cache: "no-store" })
      .then(async (response) => {
        const result = await response.json();
        if (!response.ok || !result.success)
          throw new Error(
            result.error?.message ?? "Unable to load preferences.",
          );
        setPreferences({
          email: true,
          push: false,
          ...(result.data.notifications ?? {}),
        });
      })
      .catch((cause) =>
        setError(
          cause instanceof Error
            ? cause.message
            : "Unable to load preferences.",
        ),
      );
  }, []);
  const toggle = (key: string) =>
    setPreferences((current) => ({ ...current, [key]: !current[key] }));
  const save = async () => {
    setSaving(true);
    setMessage("");
    setError("");
    try {
      const response = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notifications: preferences }),
      });
      const result = await response.json();
      if (!response.ok || !result.success)
        throw new Error(result.error?.message ?? "Unable to save preferences.");
      setMessage("Notification preferences saved.");
    } catch (cause) {
      setError(
        cause instanceof Error ? cause.message : "Unable to save preferences.",
      );
    } finally {
      setSaving(false);
    }
  };
  const rows = [
    {
      key: "email",
      title: "Email notifications",
      description: "Receive updates at your account email.",
    },
    {
      key: "push",
      title: "Push notifications",
      description: "Receive updates in supported browsers.",
    },
    ...config.items,
  ];
  return (
    <section className="app-page font-cause text-text-dark">
      <SettingsHeading />
      <div className="flex gap-6">
        <SettingsTab />
        <div className="surface-card min-w-0 flex-1 p-5 sm:p-7">
          <h2 className="text-xl font-semibold">{config.title}</h2>
          <p className="mt-1 text-sm text-text-light">{config.description}</p>
          {message && (
            <p className="mt-5 rounded-xl border border-success/30 bg-success-light px-3 py-2 text-sm text-green-700">
              {message}
            </p>
          )}
          {error && (
            <p className="mt-5 rounded-xl border border-error/30 bg-error-light px-3 py-2 text-sm text-error">
              {error}
            </p>
          )}
          <div className="mt-5 divide-y divide-divider">
            {rows.map((item) => (
              <div
                key={item.key}
                className="flex items-center justify-between gap-5 py-5"
              >
                <div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="mt-1 text-sm text-text-light">
                    {item.description}
                  </p>
                </div>
                <ToggleSwitch
                  checked={Boolean(preferences[item.key])}
                  onChange={() => toggle(item.key)}
                />
              </div>
            ))}
          </div>
          <div className="mt-6 flex justify-end border-t border-divider pt-5">
            <Button
              text={saving ? "Saving…" : "Save Changes"}
              disabled={saving}
              onClick={save}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
