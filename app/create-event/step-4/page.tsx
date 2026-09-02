"use client";
import Button from "@/components/Button";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import CreateEventStepShell from "@/components/CreateEventStepShell";
import { useCreateEventTickets } from "@/components/CreateEventDraftProvider";
import { clearEventDraft, loadDraft } from "@/lib/createEventDraft";

type BasicInformationDraft = {
  title: string;
  category: string;
  description: string;
  images?: string[];
};

type EventDetailsDraft = {
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  venueName: string;
  streetAddress: string;
  city: string;
  state: string;
  eventCapacity: string;
  latitude?: number;
  longitude?: number;
  allowVendorStalls?: boolean;
  stallOpeningDate?: string;
  stallApplicationDeadline?: string;
  stallCapacity?: string;
  stallCategories?: string;
};

const Page = () => {
  const [basicInformation, setBasicInformation] =
    useState<BasicInformationDraft | null>(null);
  const [eventDetails, setEventDetails] = useState<EventDetailsDraft | null>(
    null,
  );
  const { tickets } = useCreateEventTickets();
  const router = useRouter();

  useEffect(() => {
    setBasicInformation(loadDraft<BasicInformationDraft>("basicInformation"));
    setEventDetails(loadDraft<EventDetailsDraft>("eventDetails"));
  }, []);
  const eventIdFromUrl = () =>
    typeof window === "undefined"
      ? null
      : new URLSearchParams(window.location.search).get("eventId");
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishError, setPublishError] = useState("");

  const handlePublish = async () => {
    const latestBasicInformation =
      loadDraft<BasicInformationDraft>("basicInformation") ?? basicInformation;
    const latestEventDetails =
      loadDraft<EventDetailsDraft>("eventDetails") ?? eventDetails;
    const eventInfoDraft = loadDraft<{ isFreeEvent?: boolean }>("eventInfo");
    const isFreeEvent =
      Boolean(eventInfoDraft?.isFreeEvent) ||
      tickets.every((ticket) => Number(ticket.price) === 0);

    if (!latestBasicInformation || !latestEventDetails || !tickets.length) {
      setPublishError(
        "Your event draft is incomplete. Please return to the previous steps and complete every required field.",
      );
      return;
    }

    setIsPublishing(true);
    setPublishError("");

    try {
      const [startYear, startMonth, startDay] = latestEventDetails.startDate
        .split("-")
        .map(Number);
      const [startHours, startMinutes] = latestEventDetails.startTime
        .split(":")
        .map(Number);
      const startDate = new Date(
        startYear,
        startMonth - 1,
        startDay,
        startHours,
        startMinutes,
        0,
      );

      const [endYear, endMonth, endDay] = latestEventDetails.endDate
        .split("-")
        .map(Number);
      const [endHours, endMinutes] = latestEventDetails.endTime
        .split(":")
        .map(Number);
      const endDate = new Date(
        endYear,
        endMonth - 1,
        endDay,
        endHours,
        endMinutes,
        0,
      );

      const capacity = Number(latestEventDetails.eventCapacity);

      if (
        Number.isNaN(startDate.getTime()) ||
        Number.isNaN(endDate.getTime()) ||
        !Number.isInteger(capacity) ||
        capacity < 1
      ) {
        throw new Error(
          "Your date, time, or capacity is invalid. Please review Step 2.",
        );
      }

      const eventId =
        eventIdFromUrl() ||
        (latestBasicInformation as BasicInformationDraft & { eventId?: string })
          .eventId;
      const response = await fetch(
        eventId ? `/api/events/${eventId}` : "/api/events",
        {
          method: eventId ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: latestBasicInformation.title,
            description: latestBasicInformation.description,
            category: latestBasicInformation.category,
            venue: [
              latestEventDetails.venueName,
              latestEventDetails.streetAddress,
              latestEventDetails.city,
              latestEventDetails.state,
            ]
              .filter(Boolean)
              .join(", "),
            latitude: latestEventDetails.latitude ?? 0,
            longitude: latestEventDetails.longitude ?? 0,
            images: latestBasicInformation.images ?? [],
            startDate: startDate.toISOString(),
            endDate: endDate.toISOString(),
            capacity,
            allowVendorStalls: Boolean(latestEventDetails.allowVendorStalls),
            stallOpeningDate: latestEventDetails.allowVendorStalls
              ? new Date(
                  `${latestEventDetails.stallOpeningDate}T00:00:00`,
                ).toISOString()
              : undefined,
            stallApplicationDeadline: latestEventDetails.allowVendorStalls
              ? new Date(
                  `${latestEventDetails.stallApplicationDeadline}T23:59:59`,
                ).toISOString()
              : undefined,
            stallCapacity: latestEventDetails.allowVendorStalls
              ? Number(latestEventDetails.stallCapacity)
              : undefined,
            stallCategories: latestEventDetails.allowVendorStalls
              ? (latestEventDetails.stallCategories ?? "")
                  .split(",")
                  .map((item) => item.trim())
                  .filter(Boolean)
              : [],
            status: "draft",
            tags: [latestBasicInformation.category],
            ticketTypes: tickets.map((ticket) => ({
              name: ticket.ticketName,
              quantity: Number(ticket.quantity),
              price: isFreeEvent ? 0 : Number(ticket.price),
              description: ticket.description,
            })),
          }),
        },
      );

      const result: {
        success?: boolean;
        data?: { _id?: string };
        error?: { message?: string };
      } = response.headers.get("content-type")?.includes("application/json")
        ? await response.json()
        : {};

      if (!response.ok || !result.success || !result.data?._id) {
        throw new Error(
          result.error?.message ||
            "Unable to publish this event. Please try again.",
        );
      }

      clearEventDraft();
      router.push("/organizerdashboard?submitted=approval-pending");
    } catch (error) {
      setPublishError(
        error instanceof Error
          ? error.message
          : "Unable to publish this event. Please try again.",
      );
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <CreateEventStepShell
      stepLabel="Step 4 of 4"
      title="Review and Publish"
      description="Check your event details before submitting them for administrator approval."
      footer={
        <div className="flex items-center justify-between gap-3">
          <Button
            text="Previous Step"
            variant="secondary"
            size="sm"
            onClick={() =>
              router.push(
                `/create-event/step-3${eventIdFromUrl() ? `?eventId=${eventIdFromUrl()}` : ""}`,
              )
            }
            disabled={isPublishing}
          />
          <Button
            text={isPublishing ? "Submitting..." : "Submit for Approval"}
            variant="cta"
            size="sm"
            onClick={handlePublish}
            disabled={isPublishing}
          />
        </div>
      }
    >
      <div className="space-y-4">
        {publishError && (
          <p className="rounded-xl border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-700">
            {publishError}
          </p>
        )}
        <div className="surface-card p-4">
          <h3 className="mb-3 text-sm font-semibold text-text-dark">
            Event Information
          </h3>
          <div className="space-y-2 text-sm text-text-light">
            <p>
              <strong className="text-text-dark">Title:</strong>{" "}
              {basicInformation?.title || ""}
            </p>
            <p>
              <strong className="text-text-dark">Category:</strong>{" "}
              {basicInformation?.category || ""}
            </p>
            <p>
              <strong className="text-text-dark">Description:</strong>{" "}
              {basicInformation?.description || ""}
            </p>
          </div>
        </div>

        <div className="surface-card p-4">
          <h3 className="mb-3 text-sm font-semibold text-text-dark">
            Date and Location
          </h3>
          <div className="space-y-2 text-sm text-text-light">
            <p>
              <strong className="text-text-dark">Start Time:</strong>{" "}
              {eventDetails?.startTime || ""}
            </p>
            <p>
              <strong className="text-text-dark">End Time:</strong>{" "}
              {eventDetails?.endTime || ""}
            </p>
            <p>
              <strong className="text-text-dark">Venue:</strong>{" "}
              {eventDetails?.venueName || ""}
            </p>
            <p>
              <strong className="text-text-dark">Capacity:</strong>{" "}
              {eventDetails?.eventCapacity || ""}
            </p>
            <p>
              <strong className="text-text-dark">Vendor stalls:</strong>{" "}
              {eventDetails?.allowVendorStalls
                ? `Open from ${eventDetails.stallOpeningDate} until ${eventDetails.stallApplicationDeadline} (${eventDetails.stallCapacity} stalls)`
                : "Not available"}
            </p>
          </div>
        </div>

        <div className="surface-card p-4">
          <h3 className="mb-3 text-sm font-semibold text-text-dark">Tickets</h3>
          <div className="space-y-3 text-sm text-text-light">
            {tickets.length ? (
              tickets.map((ticket, index) => (
                <div
                  key={index}
                  className="rounded-xl border border-border bg-surface-hover p-3"
                >
                  <p>
                    <strong className="text-text-dark">
                      {ticket.ticketName}
                    </strong>
                  </p>
                  <p>Quantity: {ticket.quantity || ""}</p>
                  <p>Price: {ticket.price || ""}</p>
                </div>
              ))
            ) : (
              <p>No tickets added yet.</p>
            )}
          </div>
        </div>
      </div>
    </CreateEventStepShell>
  );
};

export default Page;
