import { NextResponse } from "next/server";
import mongoose, { Types } from "mongoose";
import { requireRole } from "@/middleware/auth/requireRole";
import {
  cancelTicket,
  getTicketById,
  updateTicketStatus,
} from "@/services/tickets/ticket.service";
import { HttpError } from "@/utils/api/httpError";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_request: Request, context: RouteContext) {
  try {
    const session = await requireRole([
      "attendee",
      "organizer",
      "vendor",
      "ticket_checker",
      "admin",
    ]);
    const { id } = await context.params;
    if (!Types.ObjectId.isValid(id))
      throw new HttpError(400, "Ticket id is invalid.", "INVALID_ID");

    const ticket = await getTicketById(
      new Types.ObjectId(id),
      new Types.ObjectId(session.user.id),
      session.user.role,
    );
    return NextResponse.json({ success: true, data: ticket });
  } catch (error) {
    if (error instanceof HttpError) {
      return NextResponse.json(
        { success: false, error: { message: error.message, code: error.code } },
        { status: error.statusCode },
      );
    }
    console.error("Fetch ticket details failed:", error);
    return NextResponse.json(
      { success: false, error: { message: "Unable to fetch ticket details." } },
      { status: 500 },
    );
  }
}

export async function PATCH(request: Request, context: RouteContext) {
  try {
    const session = await requireRole([
      "attendee",
      "organizer",
      "vendor",
      "ticket_checker",
      "admin",
    ]);
    const { id } = await context.params;
    if (!Types.ObjectId.isValid(id))
      throw new HttpError(400, "Ticket id is invalid.", "INVALID_ID");

    const body = await request.json();
    const { ticketStatus } = body;
    if (
      !ticketStatus ||
      (ticketStatus !== "active" && ticketStatus !== "cancelled")
    ) {
      throw new HttpError(
        400,
        "ticketStatus must be 'active' or 'cancelled'.",
        "VALIDATION_ERROR",
      );
    }

    const ticket = await updateTicketStatus(
      new Types.ObjectId(id),
      new Types.ObjectId(session.user.id),
      session.user.role,
      ticketStatus,
    );
    return NextResponse.json({ success: true, data: ticket });
  } catch (error) {
    if (error instanceof HttpError) {
      return NextResponse.json(
        { success: false, error: { message: error.message, code: error.code } },
        { status: error.statusCode },
      );
    }
    console.error("Update ticket failed:", error);
    return NextResponse.json(
      { success: false, error: { message: "Unable to update ticket." } },
      { status: 500 },
    );
  }
}

export async function DELETE(_request: Request, context: RouteContext) {
  try {
    const session = await requireRole([
      "attendee",
      "organizer",
      "vendor",
      "ticket_checker",
      "admin",
    ]);
    const { id } = await context.params;
    if (!Types.ObjectId.isValid(id))
      throw new HttpError(400, "Ticket id is invalid.", "INVALID_ID");
    const ticket = await cancelTicket(
      new Types.ObjectId(id),
      new Types.ObjectId(session.user.id),
    );
    return NextResponse.json({ success: true, data: ticket });
  } catch (error) {
    if (error instanceof HttpError) {
      return NextResponse.json(
        { success: false, error: { message: error.message, code: error.code } },
        { status: error.statusCode },
      );
    }
    if (error instanceof mongoose.Error.ValidationError) {
      return NextResponse.json(
        {
          success: false,
          error: { message: error.message, code: "VALIDATION_ERROR" },
        },
        { status: 400 },
      );
    }
    console.error("Ticket cancellation failed:", error);
    return NextResponse.json(
      { success: false, error: { message: "Unable to cancel ticket." } },
      { status: 500 },
    );
  }
}
