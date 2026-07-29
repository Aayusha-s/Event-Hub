export type UserRole =
  | "guest"
  | "attendee"
  | "organizer"
  | "vendor"
  | "ticket-checker"
  | "admin";

export const USER_ROLES: UserRole[] = [
  "guest",
  "attendee",
  "organizer",
  "vendor",
  "ticket-checker",
  "admin",
];
