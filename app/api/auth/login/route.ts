import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import { HttpError } from "@/utils/api/httpError";
import { createSession } from "@/utils/auth/session";
import { validateLoginInput } from "@/utils/auth/validation";

export async function POST(request: Request) {
	try {
		const { email, password } = validateLoginInput(await request.json());
		await dbConnect();

		const user = await User.findOne({ email }).select("+password").exec();
		if (!user || !(await bcrypt.compare(password, user.password))) {
			return NextResponse.json({ success: false, error: { message: "Invalid email or password." } }, { status: 401 });
		}

		const response = NextResponse.json({
			success: true,
			data: { id: user._id.toString(), name: user.name, email: user.email, role: user.role },
		});
		await createSession(response, user);
		return response;
	} catch (error) {
		if (error instanceof HttpError) {
			return NextResponse.json({ success: false, error: { message: error.message, code: error.code } }, { status: error.statusCode });
		}
		console.error("Login failed:", error);
		return NextResponse.json({ success: false, error: { message: "Unable to sign in." } }, { status: 500 });
	}
}
