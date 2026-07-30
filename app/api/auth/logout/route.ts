import { NextResponse } from "next/server";
import { destroySession } from "@/utils/auth/session";

export async function POST() {
	const response = NextResponse.json({ success: true, data: { message: "Signed out successfully." } });
	destroySession(response);
	return response;
}
