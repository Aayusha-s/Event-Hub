import { createHash, randomBytes } from "crypto";
import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import PasswordResetToken from "@/models/PasswordResetToken";
import { sendEmail } from "@/services/email/email.service";

export async function POST(request: Request) {
    try {
        const body = await request.json() as { email?: string };
        const email = body.email?.trim().toLowerCase();
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return NextResponse.json({ success: false, error: { message: "Enter a valid email address." } }, { status: 400 });
        await dbConnect();
        const user = await User.findOne({ email }).select("_id name email").lean().exec();
        if (user) {
            const token = randomBytes(32).toString("hex");
            await PasswordResetToken.deleteMany({ user: user._id, usedAt: { $exists: false } });
            await PasswordResetToken.create({ user: user._id, tokenHash: createHash("sha256").update(token).digest("hex"), expiresAt: new Date(Date.now() + 60 * 60 * 1000) });
            const resetUrl = `${new URL(request.url).origin}/reset-password?token=${token}`;
            await sendEmail({ to: user.email, subject: "Reset your Vivnt password", text: `Reset your password here: ${resetUrl}`, html: `<p>Hello ${user.name},</p><p><a href="${resetUrl}">Reset your Vivnt password</a>. This link expires in one hour.</p>` });
        }
        return NextResponse.json({ success: true, data: { message: "If an account matches that email, a reset link has been sent." } });
    } catch (error) {
        console.error("Password reset request failed:", error);
        return NextResponse.json({ success: false, error: { message: "Unable to process password reset request." } }, { status: 500 });
    }
}
