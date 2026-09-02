import { NextResponse } from "next/server";
import mongoose, { Types } from "mongoose";
import { requireRole } from "@/middleware/auth/requireRole";
import { bookingService } from "@/services/bookings/booking.service";
import { HttpError } from "@/utils/api/httpError";
import { validateBookTicketInput } from "@/utils/tickets/validation";

const errorResponse = (error: unknown) => {
  if (error instanceof HttpError) {
    return NextResponse.json(
      { success: false, error: { message: error.message, code: error.code } },
      { status: error.statusCode },
    );
  }
  if (
    error instanceof SyntaxError ||
    error instanceof mongoose.Error.ValidationError
  ) {
    return NextResponse.json(
      {
        success: false,
        error: { message: error.message, code: "VALIDATION_ERROR" },
      },
      { status: 400 },
    );
  }
  if (
    typeof error === "object" &&
    error &&
    "code" in error &&
    error.code === 11000
  ) {
    return NextResponse.json(
      {
        success: false,
        error: {
          message: "You already have an active booking for this ticket type.",
          code: "DUPLICATE_BOOKING",
        },
      },
      { status: 409 },
    );
  }
  console.error("Ticket booking failed:", error);
  return NextResponse.json(
    { success: false, error: { message: "Unable to book ticket." } },
    { status: 500 },
  );
};

export async function POST(request: Request) {
  try {
    const session = await requireRole(["attendee"]);
    const input = validateBookTicketInput(await request.json());
    const booking = await bookingService.createBooking(
      new Types.ObjectId(session.user.id),
      input,
    );
    return NextResponse.json({ success: true, data: booking }, { status: 201 });
  } catch (error) {
    return errorResponse(error);
  }
}
