export type StallEventDraft = {
    eventId: string;
    eventTitle: string;
    eventVenue: string;
    eventStartDate: string;
    stallApplicationDeadline: string;
    stallCapacity: number;
    stallCategories: string[];
};

export type StallDetailsDraft = {
    stallName: string;
    stallType: string;
    size: string;
    bookingFee: string;
    description: string;
};

export type StallImageDraft = {
    dataUrl: string;
    name: string;
    type: string;
};

const draftKeys = {
    stallEvent: "StallEvent",
    stallDetails: "StallDetails",
    stallImage: "StallImage",
    stallImagePreview: "StallImagePreview",
    stallImageDataUrl: "StallImageDataUrl",
    stallImageName: "StallImageName",
    stallImageType: "StallImageType",
} as const;

type DraftKey = keyof typeof draftKeys;

export const loadStallDraft = <T,>(key: DraftKey): T | null => {
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

export const saveStallDraft = <T,>(key: DraftKey, value: T) => {
    if (typeof window === "undefined") {
        return;
    }

    window.localStorage.setItem(draftKeys[key], JSON.stringify(value));
};

export const clearStallDraft = () => {
    if (typeof window === "undefined") {
        return;
    }

    window.localStorage.removeItem(draftKeys.stallEvent);
    window.localStorage.removeItem(draftKeys.stallDetails);
    window.localStorage.removeItem(draftKeys.stallImage);
    window.localStorage.removeItem(draftKeys.stallImagePreview);
    window.localStorage.removeItem(draftKeys.stallImageDataUrl);
    window.localStorage.removeItem(draftKeys.stallImageName);
    window.localStorage.removeItem(draftKeys.stallImageType);
};
