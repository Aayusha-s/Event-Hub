import { NextResponse } from "next/server";
import { requireRole } from "@/middleware/auth/requireRole";
import { createOrganizerProfile, getOrganizerProfile } from "@/services/organizer/organizer.service";
import { HttpError } from "@/utils/api/httpError";

export async function GET() {
	try {
		const session = await requireRole(["attendee", "organizer", "vendor", "ticket_checker", "admin"]);
		const profile = await getOrganizerProfile(session.user.id);
		return NextResponse.json({ success: true, data: profile });
	} catch (error) {
		if (error instanceof HttpError) {
			return NextResponse.json({ success: false, error: { message: error.message, code: error.code } }, { status: error.statusCode });
		}
		console.error("Fetch organizer application failed:", error);
		return NextResponse.json({ success: false, error: { message: "Unable to fetch organizer application." } }, { status: 500 });
	}
}

export async function POST(request: Request) {
	try {
		const session = await requireRole(["attendee", "organizer", "admin"]);
		const body = await request.json();
		const { orgType, organizationName, description, website, formData } = body;

		if (!orgType || !organizationName) {
			throw new HttpError(400, "orgType and organizationName are required.", "VALIDATION_ERROR");
		}

		const organizer = await createOrganizerProfile(session.user.id, {
			orgType,
			organizationName,
			description,
			website,
			formData,
		});

		return NextResponse.json({ success: true, data: organizer }, { status: 201 });
	} catch (error) {
		if (error instanceof HttpError) {
			return NextResponse.json({ success: false, error: { message: error.message, code: error.code } }, { status: error.statusCode });
		}
		console.error("Organizer application submission failed:", error);
		return NextResponse.json({ success: false, error: { message: "Unable to submit organizer application." } }, { status: 500 });
	}
}