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
  const { searchParams } = new URL(request.url); const query = (searchParams.get("q") ?? "").trim().slice(0, 100); const session = await getServerSession(authOptions); await dbConnect();
  const pattern = query ? new RegExp(escape(query), "i") : undefined;
  const [events, organizers, venues, categories, tags, recent] = await Promise.all([
    Event.find(pattern ? { status: "published", $or: [{ title: pattern }, { venue: pattern }, { tags: pattern }] } : { status: "published" }).select("title venue images").limit(6).lean(),
    User.find(pattern ? { role: "organizer", name: pattern } : { role: "organizer" }).select("name profileImage").limit(5).lean(),
    Event.distinct("venue", pattern ? { status: "published", venue: pattern } : { status: "published" }),
    Event.distinct("category", pattern ? { status: "published", category: pattern } : { status: "published" }),
    Event.distinct("tags", pattern ? { status: "published", tags: pattern } : { status: "published" }),
    session?.user?.id ? SearchHistory.find({ user: new Types.ObjectId(session.user.id) }).sort({ createdAt: -1 }).limit(5).select("query -_id").lean() : [],
  ]);
  return NextResponse.json({ success: true, data: { events, organizers, venues: venues.slice(0, 5), categories: categories.slice(0, 5), tags: tags.slice(0, 8), recent: recent.map(item => item.query), popular: tags.slice(0, 5) } });
}
export async function POST(request: Request) {
  const session = await getServerSession(authOptions); if (!session?.user?.id) return NextResponse.json({ success: true }); const { query } = await request.json(); if (typeof query !== "string" || !query.trim()) return NextResponse.json({ success: true }); await dbConnect(); await SearchHistory.create({ user: new Types.ObjectId(session.user.id), query: query.trim().slice(0, 100) }); return NextResponse.json({ success: true }, { status: 201 });
}
