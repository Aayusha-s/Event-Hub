import { NextResponse } from "next/server";
import { requireRole } from "@/middleware/auth/requireRole";
import { updateStallApprovalStatus } from "@/services/vendors/vendor.service";
import { HttpError } from "@/utils/api/httpError";
type Context = { params: Promise<{ vendorId: string; eventId: string }> };
export async function PATCH(request: Request, context: Context) {
  try {
    await requireRole(["admin"]);
    const { vendorId, eventId } = await context.params;
    const { approvalStatus } = await request.json();
    if (approvalStatus !== "approved" && approvalStatus !== "rejected")
      throw new HttpError(
        400,
        "approvalStatus must be approved or rejected.",
        "VALIDATION_ERROR",
      );
    const data = await updateStallApprovalStatus(
      vendorId,
      eventId,
      approvalStatus === "approved" ? "confirmed" : "cancelled",
    );
    return NextResponse.json({ success: true, data });
  } catch (error) {
    if (error instanceof HttpError)
      return NextResponse.json(
        { success: false, error: { message: error.message, code: error.code } },
        { status: error.statusCode },
      );
    return NextResponse.json(
      { success: false, error: { message: "Unable to update stall request." } },
      { status: 500 },
    );
  }
}
