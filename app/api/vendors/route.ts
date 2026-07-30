import { NextResponse } from "next/server";
import { requireRole } from "@/middleware/auth/requireRole";
import { createVendorProfile, getVendorProfile, listVendors } from "@/services/vendors/vendor.service";
import { HttpError } from "@/utils/api/httpError";

export async function GET(request: Request) {
	try {
		const session = await requireRole(["attendee", "organizer", "vendor", "ticket_checker", "admin"]);
		const { searchParams } = new URL(request.url);
		const mode = searchParams.get("mode");

		if (mode === "mine" || session.user.role === "vendor") {
			const profile = await getVendorProfile(session.user.id);
			return NextResponse.json({ success: true, data: profile });
		}

		const page = Math.max(1, parseInt(searchParams.get("page") ?? "1", 10));
		const pageSize = Math.min(100, Math.max(1, parseInt(searchParams.get("pageSize") ?? "20", 10)));
		const result = await listVendors(page, pageSize, "approved");
		return NextResponse.json({ success: true, data: result });
	} catch (error) {
		if (error instanceof HttpError) {
			return NextResponse.json({ success: false, error: { message: error.message, code: error.code } }, { status: error.statusCode });
		}
		console.error("Fetch vendor failed:", error);
		return NextResponse.json({ success: false, error: { message: "Unable to fetch vendor profile." } }, { status: 500 });
	}
}

export async function POST(request: Request) {
	try {
		const session = await requireRole(["attendee", "vendor", "admin"]);
		const body = await request.json();
		const { businessName, description, category, logo } = body;

		if (!businessName || !description || !category) {
			throw new HttpError(400, "businessName, description, and category are required.", "VALIDATION_ERROR");
		}

		const vendor = await createVendorProfile(session.user.id, { businessName, description, category, logo });
		return NextResponse.json({ success: true, data: vendor }, { status: 201 });
	} catch (error) {
		if (error instanceof HttpError) {
			return NextResponse.json({ success: false, error: { message: error.message, code: error.code } }, { status: error.statusCode });
		}
		console.error("Vendor registration failed:", error);
		return NextResponse.json({ success: false, error: { message: "Unable to register vendor." } }, { status: 500 });
	}
}
