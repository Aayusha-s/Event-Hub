import bcrypt from "bcryptjs";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import { HttpError } from "@/utils/api/httpError";
import { validateRegisterInput, validateLoginInput } from "@/utils/auth/validation";
import { sendRegistrationEmail } from "@/services/email/email.service";
import { createNotification } from "@/services/notifications/notification.service";

type RegisterInput = ReturnType<typeof validateRegisterInput>;
type LoginInput = ReturnType<typeof validateLoginInput>;

export const signup = async (input: RegisterInput) => {
	await dbConnect();
	const existingUser = await User.exists({ email: input.email });
	if (existingUser) {
		throw new HttpError(409, "An account with this email already exists.", "EMAIL_EXISTS");
	}

	const hashedPassword = await bcrypt.hash(input.password, 12);
	const user = await User.create({ ...input, password: hashedPassword });

	// Async non-blocking notifications
	sendRegistrationEmail(user.email, user.name).catch(console.error);
	createNotification(user._id, "registration", "Welcome to Vivnt!", `Hi ${user.name}, welcome to Event Hub.`).catch(console.error);

	return user;
};

export const login = async (input: LoginInput) => {
	await dbConnect();
	const user = await User.findOne({ email: input.email }).select("+password").exec();
	if (!user || !(await bcrypt.compare(input.password, user.password))) {
		throw new HttpError(401, "Invalid email or password.", "INVALID_CREDENTIALS");
	}
	return user;
};
