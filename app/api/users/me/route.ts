import { NextResponse } from "next/server";
import { requireRole } from "@/middleware/auth/requireRole";
import { getUserProfile, updateUserProfile } from "@/services/users/user.service";
import { HttpError } from "@/utils/api/httpError";

export async function GET() {
	try {
		const session = await requireRole(["attendee", "organizer", "vendor", "ticket_checker", "admin"]);
		const user = await getUserProfile(session.user.id);
		if (!user) throw new HttpError(404, "User not found.", "NOT_FOUND");
		return NextResponse.json({ success: true, data: user });
	} catch (error) {
		if (error instanceof HttpError) {
			return NextResponse.json({ success: false, error: { message: error.message, code: error.code } }, { status: error.statusCode });
		}
		console.error("Fetch profile failed:", error);
		return NextResponse.json({ success: false, error: { message: "Unable to fetch profile." } }, { status: 500 });
	}
}

export async function PUT(request: Request) {
	try {
		const session = await requireRole(["attendee", "organizer", "vendor", "ticket_checker", "admin"]);
		const body = await request.json();
		const { name, phone, profileImage } = body;

		const updatedUser = await updateUserProfile(session.user.id, { name, phone, profileImage });
		if (!updatedUser) throw new HttpError(404, "User not found.", "NOT_FOUND");

		return NextResponse.json({ success: true, data: updatedUser });
	} catch (error) {
		if (error instanceof HttpError) {
			return NextResponse.json({ success: false, error: { message: error.message, code: error.code } }, { status: error.statusCode });
		}
		console.error("Update profile failed:", error);
		return NextResponse.json({ success: false, error: { message: "Unable to update profile." } }, { status: 500 });
	}
}
