import { NextResponse } from "next/server";
import { requireRole } from "@/middleware/auth/requireRole";
import { listEvents } from "@/services/events/event.service";
import { EventStatus } from "@/utils/events/validation";
import { HttpError } from "@/utils/api/httpError";

export async function GET(request: Request) {
  try {
    await requireRole(["admin"]);
    const { searchParams } = new URL(request.url);
    const page = Math.max(1, parseInt(searchParams.get("page") ?? "1", 10));
    const pageSize = Math.min(
      100,
      Math.max(1, parseInt(searchParams.get("pageSize") ?? "20", 10)),
    );
    const search = searchParams.get("search") || undefined;
    const status = (searchParams.get("status") as EventStatus) || undefined;
    const approvalStatus = searchParams.get("approvalStatus") as
      | "pending"
      | "approved"
      | "rejected"
      | null;
    if (
      approvalStatus &&
      !["pending", "approved", "rejected"].includes(approvalStatus)
    )
      throw new HttpError(
        400,
        "approvalStatus is invalid.",
        "VALIDATION_ERROR",
      );

    const result = await listEvents({
      page,
      pageSize,
      search,
      status,
      approvalStatus: approvalStatus ?? undefined,
      includeUnapproved: true,
    });
    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    if (error instanceof HttpError) {
      return NextResponse.json(
        { success: false, error: { message: error.message, code: error.code } },
        { status: error.statusCode },
      );
    }
    console.error("Admin list events failed:", error);
    return NextResponse.json(
      { success: false, error: { message: "Unable to list events." } },
      { status: 500 },
    );
  }
}
