import { BasicInformationDraft, EventDetailsDraft, TicketDraft } from "@/lib/createEventDraft";

const DEFAULT_EVENT_IMAGE = "https://placehold.co/800x600/png?text=Event+Hub";

const combineDateTime = (date: string, time: string) => new Date(`${date}T${time}`).toISOString();

export const buildEventPayloadFromDraft = (
	basic: BasicInformationDraft,
	details: EventDetailsDraft,
	tickets: TicketDraft[]
) => ({
	title: basic.title,
	description: basic.description,
	category: basic.category,
	venue: `${details.venueName}, ${details.streetAddress}, ${details.city}, ${details.state}`,
	latitude: 27.7172,
	longitude: 85.324,
	images: [DEFAULT_EVENT_IMAGE],
	startDate: combineDateTime(details.startDate, details.startTime),
	endDate: combineDateTime(details.endDate, details.endTime),
	capacity: Number.parseInt(details.eventCapacity, 10),
	status: "published" as const,
	ticketTypes: tickets.map((ticket) => ({
		name: ticket.ticketName,
		price: Number.parseFloat(ticket.price),
		quantity: Number.parseInt(ticket.quantity, 10),
		description: ticket.description,
	})),
	tags: [basic.category],
});
