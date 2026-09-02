export type VoiceSearchIntent = {
    searchTerm: string;
    freeOnly: boolean;
    sort?: "trending" | "popular" | "newest" | "rating";
    peopleOnly: boolean;
    location?: string;
};

const COMMAND_WORDS = /\b(?:find|show|search for|search|look for|browse|discover|get me|i want|give me)\b/gi;
const EVENT_WORDS = /\b(?:events?|experiences?|activities?|things to do|happenings?)\b/gi;
const PEOPLE_WORDS = /\b(?:people|persons?|users?|members?|organizers?|vendors?|attendees?|creators?)\b/gi;
const LOCATION_PREFIX = /\b(?:in|at|around|near|located in)\s+([a-z][a-z\s'-]+?)(?=\s+(?:events?|people|organizers?|vendors?|this weekend|this week|tonight|today)\b|$)/i;

export const parseVoiceSearch = (value: string): VoiceSearchIntent => {
    const original = value.trim();
    const lower = original.toLowerCase();
    const peopleOnly = /\b(?:people|persons?|users?|members?|organizers?|vendors?|attendees?|creators?)\b/i.test(lower) && !/\b(?:events?|experiences?|activities?|things to do|happenings?)\b/i.test(lower);
    const freeOnly = /\bfree\b/.test(lower) || /\bno[- ]?cost\b/.test(lower);
    let sort: VoiceSearchIntent["sort"];

    if (/\b(?:trending|trend|popular|most popular|hot|top)\b/.test(lower)) {
        sort = /\b(?:popular|most popular|hot|top)\b/.test(lower) ? "popular" : "trending";
    } else if (/\b(?:new|newest|latest|recent)\b/.test(lower)) {
        sort = "newest";
    } else if (/\b(?:top rated|highest rated|best rated)\b/.test(lower)) {
        sort = "rating";
    }

    const locationMatch = lower.match(LOCATION_PREFIX);
    const location = locationMatch?.[1]?.trim().replace(/\s+/g, " ");
    const searchTerm = original
        .replace(COMMAND_WORDS, " ")
        .replace(/\b(?:named|called)\b/gi, " ")
        .replace(PEOPLE_WORDS, " ")
        .replace(EVENT_WORDS, " ")
        .replace(/\b(?:free|no[- ]?cost|trending|trend|popular|most popular|hot|top rated|highest rated|best rated|new|newest|latest|recent|this weekend|this week|tonight|today|near me)\b/gi, " ")
        .replace(locationMatch?.[0] ?? "", " ")
        .replace(/[,.!?]/g, " ")
        .replace(/\s+/g, " ")
        .trim();

    return { searchTerm, freeOnly, sort, peopleOnly, location };
};
