import { NextResponse } from "next/server";
import { Types } from "mongoose";
import { requireRole } from "@/middleware/auth/requireRole";
import { updateUserRoleOrStatus } from "@/services/users/user.service";
import { USER_ROLES, UserRole } from "@/types";
import { HttpError } from "@/utils/api/httpError";
import User from "@/models/User";

type RouteContext = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, context: RouteContext) {
  try {
    const session = await requireRole(["admin"]);
    const { id } = await context.params;
    if (!Types.ObjectId.isValid(id))
      throw new HttpError(400, "Invalid user id.", "INVALID_ID");

    const body = await request.json();
    const { role, status } = body;
    if (
      role !== undefined &&
      (typeof role !== "string" || !USER_ROLES.includes(role as UserRole))
    )
      throw new HttpError(400, "Invalid role.", "VALIDATION_ERROR");
    if (status !== undefined && !["active", "suspended"].includes(status))
      throw new HttpError(400, "Invalid status.", "VALIDATION_ERROR");
    if (role === undefined && status === undefined)
      throw new HttpError(
        400,
        "Provide a role or status update.",
        "VALIDATION_ERROR",
      );
    if (id === session.user.id)
      throw new HttpError(
        403,
        "You cannot change your own administrative access.",
        "SELF_ADMIN_PROTECTED",
      );
    const target = await User.findById(id).select("_id").lean();
    if (!target) throw new HttpError(404, "User not found.", "NOT_FOUND");

    const updatedUser = await updateUserRoleOrStatus(id, {
      role: role as UserRole | undefined,
      status,
    });
    if (!updatedUser) throw new HttpError(404, "User not found.", "NOT_FOUND");

    return NextResponse.json({ success: true, data: updatedUser });
  } catch (error) {
    if (error instanceof HttpError) {
      return NextResponse.json(
        { success: false, error: { message: error.message, code: error.code } },
        { status: error.statusCode },
      );
    }
    console.error("Admin update user failed:", error);
    return NextResponse.json(
      { success: false, error: { message: "Unable to update user." } },
      { status: 500 },
    );
  }
}

export async function DELETE(_request: Request, context: RouteContext) {
  try {
    const session = await requireRole(["admin"]);
    const { id } = await context.params;
    if (!Types.ObjectId.isValid(id))
      throw new HttpError(400, "Invalid user id.", "INVALID_ID");
    if (id === session.user.id)
      throw new HttpError(
        403,
        "You cannot deactivate your own administrative account.",
        "SELF_ADMIN_PROTECTED",
      );
    const updatedUser = await updateUserRoleOrStatus(id, {
      status: "suspended",
    });
    if (!updatedUser) throw new HttpError(404, "User not found.", "NOT_FOUND");
    return NextResponse.json({
      success: true,
      data: { message: "User deactivated successfully.", user: updatedUser },
    });
  } catch (error) {
    if (error instanceof HttpError) {
      return NextResponse.json(
        { success: false, error: { message: error.message, code: error.code } },
        { status: error.statusCode },
      );
    }
    console.error("Admin delete user failed:", error);
    return NextResponse.json(
      { success: false, error: { message: "Unable to delete user." } },
      { status: 500 },
    );
  }
}
