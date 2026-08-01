import { UserRole } from "@/types";
import { HttpError } from "@/utils/api/httpError";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^[+\d][\d\s()-]{6,19}$/;

type AuthPayload = Record<string, unknown>;

const asPayload = (value: unknown): AuthPayload => {
	if (!value || typeof value !== "object" || Array.isArray(value)) {
		throw new HttpError(400, "Request body must be a JSON object.", "INVALID_BODY");
	}
	return value as AuthPayload;
};

const requiredString = (payload: AuthPayload, key: string): string => {
	const value = payload[key];
	if (typeof value !== "string" || !value.trim()) {
		throw new HttpError(400, `${key} is required.`, "VALIDATION_ERROR");
	}
	return value.trim();
};

export const validateLoginInput = (value: unknown) => {
	const payload = asPayload(value);
	const email = requiredString(payload, "email").toLowerCase();
	const password = requiredString(payload, "password");

	if (!emailPattern.test(email) || password.length < 8 || password.length > 255) {
		throw new HttpError(400, "Email or password format is invalid.", "VALIDATION_ERROR");
	}

	return { email, password };
};

export const validateRegisterInput = (value: unknown) => {
	const payload = asPayload(value);
	const name = requiredString(payload, "name");
	const { email, password } = validateLoginInput(payload);
	const phone = payload.phone;
	const profileImage = payload.profileImage;
	const role = payload.role;

	if (name.length < 2 || name.length > 100) {
		throw new HttpError(400, "Name must be between 2 and 100 characters.", "VALIDATION_ERROR");
	}

	if (phone !== undefined && (typeof phone !== "string" || !phonePattern.test(phone.trim()))) {
		throw new HttpError(400, "Phone number format is invalid.", "VALIDATION_ERROR");
	}

	if (profileImage !== undefined && (typeof profileImage !== "string" || profileImage.length > 500)) {
		throw new HttpError(400, "Profile image URL is invalid.", "VALIDATION_ERROR");
	}

	if (role !== undefined && !["attendee", "organizer", "vendor"].includes(String(role))) {
		throw new HttpError(403, "Public registration cannot create privileged accounts.", "ROLE_NOT_ALLOWED");
	}

	return {
		name,
		email,
		password,
		phone: typeof phone === "string" ? phone.trim() : undefined,
		profileImage: typeof profileImage === "string" ? profileImage.trim() : undefined,
		role: (role ?? "attendee") as "attendee" | "organizer" | "vendor",
	};
};
