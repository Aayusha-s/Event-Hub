import { NextResponse } from "next/server";
import { requireRole } from "@/middleware/auth/requireRole";
import { verifyPayment } from "@/services/payments/payment.service";
import { HttpError } from "@/utils/api/httpError";

export async function POST(request: Request) {
  try {
    await requireRole([
      "attendee",
      "organizer",
      "vendor",
      "ticket_checker",
      "admin",
    ]);
    const body = await request.json();
    const { paymentId, data } = body;

    if (!paymentId) {
      throw new HttpError(400, "paymentId is required.", "VALIDATION_ERROR");
    }

    const result = await verifyPayment(paymentId, data);
    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    if (error instanceof HttpError) {
      return NextResponse.json(
        { success: false, error: { message: error.message, code: error.code } },
        { status: error.statusCode },
      );
    }
    console.error("Payment verification failed:", error);
    return NextResponse.json(
      { success: false, error: { message: "Unable to verify payment." } },
      { status: 500 },
    );
  }
}
