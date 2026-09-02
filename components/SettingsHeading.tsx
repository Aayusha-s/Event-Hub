"use client";

import { useSession } from "next-auth/react";

const roleName = (role?: string) =>
  role === "ticket_checker"
    ? "Ticket Checker"
    : role
      ? role.charAt(0).toUpperCase() + role.slice(1)
      : "Account";

export default function SettingsHeading() {
  const { data: session } = useSession();
  return (
    <div className="mb-7">
      <p className="text-sm font-semibold text-primary">
        {roleName(session?.user?.role)} settings
      </p>
      <h1 className="page-heading mt-1 font-dynapuff">Settings</h1>
      <p className="page-subtitle">Manage your account and preferences.</p>
    </div>
  );
}
