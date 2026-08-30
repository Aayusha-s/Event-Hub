import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { Types } from "mongoose";
import { authOptions } from "@/auth";
import dbConnect from "@/lib/mongodb";
import Event from "@/models/Event";
import User from "@/models/User";
import SearchHistory from "@/models/SearchHistory";

const escape = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = (searchParams.get("q") ?? "").trim().slice(0, 100);
  const session = await getServerSession(authOptions);
  
  await dbConnect();

  if (!query) {
    return NextResponse.json({
      success: true,
      data: {
        events: [],
        people: [],
        count: 0,
      },
    });
  }

  const pattern = new RegExp(escape(query), "i");

  // Search events and people in parallel
  const [events, people] = await Promise.all([
    // Search events
    Event.find({
      status: "published",
      $or: [
        { title: pattern },
        { venue: pattern },
        { tags: pattern },
        { description: pattern },
      ],
    })
      .select("_id title venue images tags description startDate ticketTypes organizer")
      .limit(20)
      .lean(),
    
    // Search people (Organizer, Vendor, Attendee, Ticket Checker - NOT Admin)
    User.find({
      role: { $in: ["organizer", "vendor", "attendee", "ticket_checker"] },
      $or: [
        { name: pattern },
        { username: pattern },
        { bio: pattern },
      ],
    })
      .select("_id name username profileImage role bio followers location")
      .limit(20)
      .lean(),
  ]);

  // Record search in history
  if (session?.user?.id) {
    await SearchHistory.findOneAndUpdate(
      {
        user: new Types.ObjectId(session.user.id),
        query: query,
      },
      {
        $set: { query: query },
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    ).catch(() => {
      // Silently fail if history recording fails
    });
  }

  return NextResponse.json({
    success: true,
    data: {
      events,
      people,
      count: events.length + people.length,
      query,
    },
  });
}
