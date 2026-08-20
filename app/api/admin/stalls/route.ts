import { NextResponse } from "next/server";
import { requireRole } from "@/middleware/auth/requireRole";
import { listStallRequests } from "@/services/vendors/vendor.service";
import { HttpError } from "@/utils/api/httpError";

export async function GET(request: Request) { try { await requireRole(["admin"]); const { searchParams } = new URL(request.url); const status = searchParams.get("status") as "pending" | "confirmed" | "cancelled" | null; if (status && !["pending", "confirmed", "cancelled"].includes(status)) throw new HttpError(400, "status is invalid.", "VALIDATION_ERROR"); return NextResponse.json({ success: true, data: await listStallRequests(1, 100, status ?? undefined) }); } catch (error) { if (error instanceof HttpError) return NextResponse.json({ success: false, error: { message: error.message, code: error.code } }, { status: error.statusCode }); return NextResponse.json({ success: false, error: { message: "Unable to list stall requests." } }, { status: 500 }); } }
