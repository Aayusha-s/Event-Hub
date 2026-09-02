import { NextResponse } from "next/server";
import { Types } from "mongoose";
import dbConnect from "@/lib/mongodb";
import Event from "@/models/Event";
import Vendor from "@/models/Vendor";
import { HttpError } from "@/utils/api/httpError";
type Context = { params: Promise<{ id: string }> };
export async function GET(_request: Request, context: Context) {
  try {
    const { id } = await context.params;
    if (!Types.ObjectId.isValid(id))
      throw new HttpError(400, "Event id is invalid.", "INVALID_ID");
    await dbConnect();
    const event = await Event.exists({ _id: id, approvalStatus: "approved" });
    if (!event) throw new HttpError(404, "Event not found.", "NOT_FOUND");
    const vendors = await Vendor.find({
      stallBookings: {
        $elemMatch: { event: new Types.ObjectId(id), status: "confirmed" },
      },
    })
      .select("businessName category logo stallBookings")
      .lean()
      .exec();
    const items = vendors.map((vendor) => {
      const booking = vendor.stallBookings.find(
        (item) => item.event.toString() === id && item.status === "confirmed",
      );
      return {
        vendorId: vendor._id,
        businessName: vendor.businessName,
        category: vendor.category,
        logo: vendor.logo,
        stallName: booking?.stallName,
      };
    });
    return NextResponse.json({ success: true, data: items });
  } catch (error) {
    if (error instanceof HttpError)
      return NextResponse.json(
        { success: false, error: { message: error.message, code: error.code } },
        { status: error.statusCode },
      );
    return NextResponse.json(
      { success: false, error: { message: "Unable to load event stalls." } },
      { status: 500 },
    );
  }
}
