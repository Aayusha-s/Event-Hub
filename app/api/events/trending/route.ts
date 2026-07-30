import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import { getTrendingEvents } from "@/services/events/event.service";
import { HttpError } from "@/utils/api/httpError";

export async function GET(request: Request) {
	try {
		const { searchParams } = new URL(request.url);
		const limit = Math.min(50, Math.max(1, parseInt(searchParams.get("limit") ?? "6", 10)));

		await dbConnect();
		const events = await getTrendingEvents(limit);
		return NextResponse.json({ success: true, data: events });
	} catch (error) {
		if (error instanceof HttpError) {
			return NextResponse.json({ success: false, error: { message: error.message, code: error.code } }, { status: error.statusCode });
		}
		console.error("Fetch trending events failed:", error);
		return NextResponse.json({ success: false, error: { message: "Unable to fetch trending events." } }, { status: 500 });
	}
}
