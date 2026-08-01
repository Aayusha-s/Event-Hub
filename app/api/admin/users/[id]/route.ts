import { NextResponse } from "next/server";
import { Types } from "mongoose";
import { requireRole } from "@/middleware/auth/requireRole";
import { deleteUser, updateUserRoleOrStatus } from "@/services/users/user.service";
import { UserRole } from "@/types";
import { HttpError } from "@/utils/api/httpError";
import User from "@/models/User";

type RouteContext = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, context: RouteContext) {
	try {
		await requireRole(["admin"]);
		const { id } = await context.params;
		if (!Types.ObjectId.isValid(id)) throw new HttpError(400, "Invalid user id.", "INVALID_ID");

		const body = await request.json();
		const { role } = body;
		if (role !== undefined && !["attendee", "organizer", "vendor", "ticket_checker"].includes(role)) throw new HttpError(403, "Admin role cannot be assigned.", "ROLE_NOT_ALLOWED");
		const target = await User.findById(id).select("email role").lean();
		if (!target) throw new HttpError(404, "User not found.", "NOT_FOUND");
		if (target.email === "admin@vivnt.com") throw new HttpError(403, "The seeded admin account cannot be changed.", "SYSTEM_ACCOUNT_PROTECTED");

		const updatedUser = await updateUserRoleOrStatus(id, { role: role as UserRole });
		if (!updatedUser) throw new HttpError(404, "User not found.", "NOT_FOUND");

		return NextResponse.json({ success: true, data: updatedUser });
	} catch (error) {
		if (error instanceof HttpError) {
			return NextResponse.json({ success: false, error: { message: error.message, code: error.code } }, { status: error.statusCode });
		}
		console.error("Admin update user failed:", error);
		return NextResponse.json({ success: false, error: { message: "Unable to update user." } }, { status: 500 });
	}
}

export async function DELETE(_request: Request, context: RouteContext) {
	try {
		await requireRole(["admin"]);
		const { id } = await context.params;
		if (!Types.ObjectId.isValid(id)) throw new HttpError(400, "Invalid user id.", "INVALID_ID");

		const target = await User.findById(id).select("email").lean();
		if (target?.email === "admin@vivnt.com" || target?.email === "checker@vivnt.com") throw new HttpError(403, "System accounts cannot be deleted.", "SYSTEM_ACCOUNT_PROTECTED");
		const deleted = await deleteUser(id);
		if (!deleted) throw new HttpError(404, "User not found.", "NOT_FOUND");

		return NextResponse.json({ success: true, data: { message: "User deleted successfully." } });
	} catch (error) {
		if (error instanceof HttpError) {
			return NextResponse.json({ success: false, error: { message: error.message, code: error.code } }, { status: error.statusCode });
		}
		console.error("Admin delete user failed:", error);
		return NextResponse.json({ success: false, error: { message: "Unable to delete user." } }, { status: 500 });
	}
}
