import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Event from "@/models/Event";

export async function GET() {
  await dbConnect();
  const [categories, tags] = await Promise.all([
    Event.aggregate([
      { $match: { status: "published" } },
      { $group: { _id: "$category", count: { $sum: 1 } } },
      { $sort: { count: -1, _id: 1 } },
    ]),
    Event.aggregate([
      { $match: { status: "published" } },
      { $unwind: "$tags" },
      { $group: { _id: "$tags", count: { $sum: 1 } } },
      { $sort: { count: -1, _id: 1 } },
    ]),
  ]);
  return NextResponse.json({
    success: true,
    data: {
      categories: categories.map((item) => ({
        name: item._id,
        count: item.count,
      })),
      tags: tags.map((item) => ({ name: item._id, count: item.count })),
    },
  });
}
