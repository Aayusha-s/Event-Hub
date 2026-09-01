"use client";

import { useEffect, useState } from "react";

type ActivityItem = {
  _id: string;
  title: string;
  description?: string;
  createdAt: string;
  link?: string;
};

export default function ActivityPage() {
  const [items, setItems] = useState<ActivityItem[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/organizer/dashboard", { cache: "no-store" })
      .then(async (response) => {
        const result = await response.json();
        if (!response.ok || !result.success)
          throw new Error(result.error?.message || "Unable to load activity.");
        setItems(result.data.recentActivities as ActivityItem[]);
      })
      .catch((loadError) =>
        setError(
          loadError instanceof Error
            ? loadError.message
            : "Unable to load activity.",
        ),
      );
  }, []);

  return (
    <section className="app-page font-cause text-text-dark">
      <h1 className="font-dynapuff text-2xl font-bold md:text-3xl">
        Recent Activity
      </h1>
      {error && (
        <p className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3 text-red-700">
          {error}
        </p>
      )}
      <div className="mt-6 space-y-3">
        {items.length ? (
          items.map((item) => (
            <article key={item._id} className="surface-card p-4">
              <p className="font-semibold">{item.title}</p>
              <p className="text-sm text-text-light">
                {item.description ?? ""}
              </p>
              <p className="mt-1 text-xs text-text-muted">
                {new Date(item.createdAt).toLocaleString()}
              </p>
            </article>
          ))
        ) : (
          <p className="text-text-light">No recent activity yet.</p>
        )}
      </div>
    </section>
  );
}
