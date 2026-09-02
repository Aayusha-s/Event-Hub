import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import { getNearbyEvents } from "@/services/events/event.service";
import { HttpError } from "@/utils/api/httpError";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const latStr = searchParams.get("lat") ?? searchParams.get("latitude");
    const lngStr = searchParams.get("lng") ?? searchParams.get("longitude");
    const radiusKm = parseFloat(searchParams.get("radius") ?? "50");
    const limit = Math.min(
      50,
      Math.max(1, parseInt(searchParams.get("limit") ?? "10", 10)),
    );

    if (!latStr || !lngStr) {
      throw new HttpError(
        400,
        "Latitude (lat) and longitude (lng) are required query parameters.",
        "VALIDATION_ERROR",
      );
    }

    const lat = parseFloat(latStr);
    const lng = parseFloat(lngStr);

    if (
      isNaN(lat) ||
      lat < -90 ||
      lat > 90 ||
      isNaN(lng) ||
      lng < -180 ||
      lng > 180
    ) {
      throw new HttpError(
        400,
        "Invalid latitude or longitude coordinates.",
        "VALIDATION_ERROR",
      );
    }

    await dbConnect();
    const events = await getNearbyEvents(lat, lng, radiusKm, limit);
    return NextResponse.json({ success: true, data: events });
  } catch (error) {
    if (error instanceof HttpError) {
      return NextResponse.json(
        { success: false, error: { message: error.message, code: error.code } },
        { status: error.statusCode },
      );
    }
    console.error("Fetch nearby events failed:", error);
    return NextResponse.json(
      { success: false, error: { message: "Unable to fetch nearby events." } },
      { status: 500 },
    );
  }
}
