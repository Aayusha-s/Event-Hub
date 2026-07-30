import { UserRole } from "@/types";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { HttpError } from "@/utils/api/httpError";

export const requireRole = async (allowedRoles: UserRole[]) => {
	const session = await getServerSession(authOptions);
	if (!session?.user) {
		throw new HttpError(401, "Authentication is required.", "UNAUTHENTICATED");
	}

	if (!allowedRoles.includes(session.user.role)) {
		throw new HttpError(403, "You do not have permission to access this resource.", "FORBIDDEN");
	}

	return session;
};
