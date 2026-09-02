import { NextResponse } from "next/server";
import { Types } from "mongoose";
import { requireRole } from "@/middleware/auth/requireRole";
import CommunityPost from "@/models/CommunityPost";
import PostComment from "@/models/PostComment";
import { HttpError } from "@/utils/api/httpError";
const roles = [
  "attendee",
  "organizer",
  "vendor",
  "ticket_checker",
  "admin",
] as const;
export async function GET(request: Request) {
  try {
    const query = new URL(request.url).searchParams,
      page = Math.max(1, Number(query.get("page") ?? 1)),
      pageSize = Math.min(50, Math.max(1, Number(query.get("pageSize") ?? 20)));
    const search = query.get("q")?.trim();
    const match: Record<string, unknown> = {};
    if (search)
      match.content = new RegExp(
        search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
        "i",
      );
    const [items, total] = await Promise.all([
      CommunityPost.find(match)
        .populate("author", "name username profileImage role")
        .sort({ createdAt: -1 })
        .skip((page - 1) * pageSize)
        .limit(pageSize)
        .lean(),
      CommunityPost.countDocuments(match),
    ]);
    const counts = await PostComment.aggregate([
      { $match: { post: { $in: items.map((item) => item._id) } } },
      { $group: { _id: "$post", count: { $sum: 1 } } },
    ]);
    const byPost = new Map(
      counts.map((item) => [String(item._id), item.count]),
    );
    return NextResponse.json({
      success: true,
      data: {
        items: items.map((item) => ({
          ...item,
          commentCount: byPost.get(String(item._id)) ?? 0,
        })),
        page,
        pageSize,
        total,
        totalPages: Math.ceil(total / pageSize),
      },
    });
  } catch {
    return NextResponse.json(
      { success: false, error: { message: "Unable to load posts." } },
      { status: 500 },
    );
  }
}
export async function POST(request: Request) {
  try {
    const session = await requireRole([...roles]);
    const body = await request.json();
    if (typeof body.content !== "string" || !body.content.trim())
      throw new HttpError(400, "Post content is required.", "VALIDATION_ERROR");
    const images = Array.isArray(body.images)
      ? body.images
          .filter(
            (value: unknown): value is string =>
              typeof value === "string" && value.length <= 500,
          )
          .slice(0, 10)
      : [];
    const post = await CommunityPost.create({
      author: new Types.ObjectId(session.user.id),
      content: body.content.trim(),
      images,
    });
    return NextResponse.json({ success: true, data: post }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: {
          message:
            error instanceof HttpError
              ? error.message
              : "Unable to create post.",
        },
      },
      { status: error instanceof HttpError ? error.statusCode : 500 },
    );
  }
}
