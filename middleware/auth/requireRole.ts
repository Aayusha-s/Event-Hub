import { UserRole } from "@/types";

export const requireRole = (allowedRoles: UserRole[]) => {
  void allowedRoles;
  throw new Error("Not implemented yet");
};
