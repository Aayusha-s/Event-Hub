export type BasicInformationDraft = {
    title: string;
    category: string;
    description: string;
};

export type EventDetailsDraft = {
    startDate: string;
    endDate: string;
    startTime: string;
    endTime: string;
    venueName: string;
    streetAddress: string;
    city: string;
    state: string;
    eventCapacity: string;
};

export type TicketDraft = {
    ticketName: string;
    quantity: string;
    price: string;
    description: string;
};

export type EventInfoDraft = {
    tickets: TicketDraft[];
    isFreeEvent?: boolean;
};

const draftKeys = {
    basicInformation: "BasicInformation",
    eventDetails: "EventDetails",
    eventInfo: "EventInfo",
} as const;

type DraftKey = keyof typeof draftKeys;

export const loadDraft = <T,>(key: DraftKey): T | null => {
    if (typeof window === "undefined") {
        return null;
    }

    const rawValue = window.localStorage.getItem(draftKeys[key]);
    if (!rawValue) {
        return null;
    }

    try {
        return JSON.parse(rawValue) as T;
    } catch {
        return null;
    }
};

export const saveDraft = <T,>(key: DraftKey, value: T) => {
    if (typeof window === "undefined") {
        return;
    }

    window.localStorage.setItem(draftKeys[key], JSON.stringify(value));
};

export const clearEventDraft = () => {
    if (typeof window === "undefined") {
        return;
    }

    window.localStorage.removeItem(draftKeys.basicInformation);
    window.localStorage.removeItem(draftKeys.eventDetails);
    window.localStorage.removeItem(draftKeys.eventInfo);
};

export const createEmptyTicket = (isFreeEvent = false): TicketDraft => ({
    ticketName: "",
    quantity: "",
    price: isFreeEvent ? "0" : "",
    description: "",
});

export const loadEventInfoTickets = (): TicketDraft[] => {
    const draft = loadDraft<EventInfoDraft>("eventInfo");
    if (Array.isArray(draft?.tickets) && draft.tickets.length > 0) {
        return draft.tickets;
    }

    return [createEmptyTicket()];
};

export const saveEventInfoTickets = (tickets: TicketDraft[], isFreeEvent = false) => {
    saveDraft("eventInfo", { tickets, isFreeEvent });
};

export const loadEventInfoIsFree = (): boolean => {
    const draft = loadDraft<EventInfoDraft>("eventInfo");
    return Boolean(draft?.isFreeEvent);
};
