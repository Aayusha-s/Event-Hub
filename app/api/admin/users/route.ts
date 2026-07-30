import { NextResponse } from "next/server";
import { requireRole } from "@/middleware/auth/requireRole";
import { listUsers } from "@/services/users/user.service";
import { UserRole } from "@/types";
import { HttpError } from "@/utils/api/httpError";

export async function GET(request: Request) {
	try {
		await requireRole(["admin"]);
		const { searchParams } = new URL(request.url);
		const page = Math.max(1, parseInt(searchParams.get("page") ?? "1", 10));
		const pageSize = Math.min(100, Math.max(1, parseInt(searchParams.get("pageSize") ?? "20", 10)));
		const search = searchParams.get("search")?.trim();
		const role = searchParams.get("role") as UserRole | undefined;

		const result = await listUsers({ page, pageSize, search, role });
		return NextResponse.json({ success: true, data: result });
	} catch (error) {
		if (error instanceof HttpError) {
			return NextResponse.json({ success: false, error: { message: error.message, code: error.code } }, { status: error.statusCode });
		}
		console.error("Admin list users failed:", error);
		return NextResponse.json({ success: false, error: { message: "Unable to list users." } }, { status: 500 });
	}
}
