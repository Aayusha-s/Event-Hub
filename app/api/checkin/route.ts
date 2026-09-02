import { NextResponse } from "next/server";
import { requireRole } from "@/middleware/auth/requireRole";
import {
  getCheckerDashboard,
  getRecentCheckIns,
  listAttendance,
  processCheckIn,
  verifyTicket,
} from "@/services/checkin/checkin.service";
import { HttpError } from "@/utils/api/httpError";

export async function POST(request: Request) {
  try {
    const session = await requireRole(["ticket_checker"]);
    const body = await request.json();
    const { ticketNumber, qrCode, identifier } = body;

    const tokenToVerify = identifier || ticketNumber || qrCode;
    if (!tokenToVerify || typeof tokenToVerify !== "string") {
      throw new HttpError(
        400,
        "ticketNumber or qrCode identifier is required.",
        "VALIDATION_ERROR",
      );
    }

    const result = await processCheckIn(tokenToVerify.trim(), session.user.id);
    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    if (error instanceof HttpError) {
      return NextResponse.json(
        {
          success: false,
          error: {
            message: error.message,
            code: error.code,
            details: error.details,
          },
        },
        { status: error.statusCode },
      );
    }
    console.error("Check-in failed:", error);
    return NextResponse.json(
      { success: false, error: { message: "Unable to process check-in." } },
      { status: 500 },
    );
  }
}

export async function GET(request: Request) {
  try {
    const session = await requireRole(["ticket_checker"]);
    const params = new URL(request.url).searchParams;
    const identifier = params.get("identifier")?.trim();
    if (identifier)
      return NextResponse.json({
        success: true,
        data: await verifyTicket(identifier),
      });
    if (params.get("view") === "dashboard")
      return NextResponse.json({
        success: true,
        data: await getCheckerDashboard(session.user.id),
      });
    if (params.get("view") === "attendance")
      return NextResponse.json({
        success: true,
        data: {
          items: await listAttendance({
            search: params.get("search") ?? undefined,
            eventId: params.get("eventId") ?? undefined,
            date: params.get("date") ?? undefined,
          }),
        },
      });
    const items = await getRecentCheckIns(session.user.id);
    return NextResponse.json({ success: true, data: { items } });
  } catch (error) {
    if (error instanceof HttpError)
      return NextResponse.json(
        { success: false, error: { message: error.message, code: error.code } },
        { status: error.statusCode },
      );
    console.error("Fetch recent check-ins failed:", error);
    return NextResponse.json(
      {
        success: false,
        error: { message: "Unable to fetch recent check-ins." },
      },
      { status: 500 },
    );
  }
}
