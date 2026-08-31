export const isEventEnded = (endDate: string | Date, now = new Date()) => {
    const end = new Date(endDate);
    return !Number.isNaN(end.getTime()) && end.getTime() < now.getTime();
};

export const getEventTimeStatus = (startDate: string | Date, endDate: string | Date, now = new Date()) => {
    if (isEventEnded(endDate, now)) return "ended";
    return new Date(startDate).getTime() <= now.getTime() ? "active" : "upcoming";
};
