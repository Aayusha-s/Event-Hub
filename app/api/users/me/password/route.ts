import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { requireRole } from "@/middleware/auth/requireRole";
import User from "@/models/User";
import dbConnect from "@/lib/mongodb";
import { HttpError } from "@/utils/api/httpError";

const roles = ["attendee", "organizer", "vendor", "ticket_checker", "admin"] as const;

export async function PUT(request: Request) {
    try {
        const session = await requireRole([...roles]);
        const body = await request.json();
        const currentPassword = typeof body.currentPassword === "string" ? body.currentPassword : "";
        const newPassword = typeof body.newPassword === "string" ? body.newPassword : "";
        const confirmPassword = typeof body.confirmPassword === "string" ? body.confirmPassword : "";
        if (!currentPassword || !newPassword || !confirmPassword) throw new HttpError(400, "All password fields are required.", "VALIDATION_ERROR");
        if (newPassword.length < 8 || newPassword.length > 255) throw new HttpError(400, "Password must be between 8 and 255 characters.", "VALIDATION_ERROR");
        if (newPassword !== confirmPassword) throw new HttpError(400, "New passwords do not match.", "VALIDATION_ERROR");
        await dbConnect();
        const user = await User.findById(session.user.id).select("+password").exec();
        if (!user || !(await bcrypt.compare(currentPassword, user.password))) throw new HttpError(400, "Current password is incorrect.", "INVALID_CREDENTIALS");
        user.password = await bcrypt.hash(newPassword, 12);
        await user.save();
        return NextResponse.json({ success: true, data: { message: "Password updated successfully." } });
    } catch (error) {
        if (error instanceof HttpError) return NextResponse.json({ success: false, error: { message: error.message, code: error.code } }, { status: error.statusCode });
        return NextResponse.json({ success: false, error: { message: "Unable to update password." } }, { status: 500 });
    }
}
