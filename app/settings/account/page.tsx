"use client";

import { useState } from "react";
import { LockKeyhole } from "lucide-react";
import Button from "@/components/Button";
import SettingsHeading from "@/components/SettingsHeading";
import SettingsTab from "@/components/SettingsTab";

export default function AccountSettingsPage() {
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const update = (key: keyof typeof form, value: string) =>
    setForm((current) => ({ ...current, [key]: value }));
  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage("");
    setError("");

    if (form.newPassword !== form.confirmPassword) {
      setError("New passwords do not match.");
      return;
    }
    if (form.newPassword.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    setSaving(true);
    try {
      const response = await fetch("/api/users/me/password", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const result = await response.json();
      if (!response.ok || !result.success)
        throw new Error(result.error?.message ?? "Unable to update password.");
      setForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
      setMessage("Password updated successfully.");
    } catch (cause) {
      setError(
        cause instanceof Error ? cause.message : "Unable to update password.",
      );
    } finally {
      setSaving(false);
    }
  };
  return <section className="app-page font-cause text-text-dark">
    <SettingsHeading />
    <div className="flex gap-6">
      <SettingsTab />
      <form
        onSubmit={submit}
        className="surface-card min-w-0 flex-1 p-5 sm:p-7"
      >
        <div className="flex items-start gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-light text-primary">
            <LockKeyhole size={19} />
          </span>
          <div>
            <h2 className="text-xl font-semibold">Security</h2>
            <p className="mt-1 text-sm text-text-light">
              Use your current password to keep your account secure.
            </p>
          </div>
        </div>
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
        <div className="mt-6 max-w-xl space-y-4">
          <label className="block text-sm font-semibold">
            Current password
            <input
              name="current-password"
              type="password"
              autoComplete="current-password"
              value={form.currentPassword}
              onChange={(event) =>
                update("currentPassword", event.target.value)
              }
              className="form-control mt-1.5"
              required
            />
          </label>
          <label className="block text-sm font-semibold">
            New password
            <input
              name="new-password"
              type="password"
              autoComplete="new-password"
              value={form.newPassword}
              onChange={(event) => update("newPassword", event.target.value)}
              className="form-control mt-1.5"
              minLength={8}
              required
            />
          </label>
          <label className="block text-sm font-semibold">
            Confirm new password
            <input
              name="confirm-password"
              type="password"
              autoComplete="new-password"
              value={form.confirmPassword}
              onChange={(event) =>
                update("confirmPassword", event.target.value)
              }
              className="form-control mt-1.5"
              minLength={8}
              required
            />
          </label>
        </div>
        <div className="mt-7 flex justify-end border-t border-divider pt-5">
          <Button
            type="submit"
            text={saving ? "Updating…" : "Update Password"}
            disabled={saving}
          />
        </div>
      </form>
    </div>
  </section>;
}
