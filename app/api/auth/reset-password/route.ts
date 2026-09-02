import bcrypt from "bcryptjs";
import { createHash } from "crypto";
import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import PasswordResetToken from "@/models/PasswordResetToken";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      token?: string;
      password?: string;
      confirmPassword?: string;
    };
    if (
      !body.token ||
      !body.password ||
      body.password.length < 8 ||
      body.password !== body.confirmPassword
    )
      return NextResponse.json(
        {
          success: false,
          error: {
            message: "Use matching passwords of at least 8 characters.",
          },
        },
        { status: 400 },
      );
    await dbConnect();
    const tokenHash = createHash("sha256").update(body.token).digest("hex");
    const reset = await PasswordResetToken.findOne({
      tokenHash,
      expiresAt: { $gt: new Date() },
      usedAt: { $exists: false },
    }).exec();
    if (!reset)
      return NextResponse.json(
        {
          success: false,
          error: { message: "This reset link is invalid or expired." },
        },
        { status: 400 },
      );
    const user = await User.findById(reset.user).select("+password").exec();
    if (!user)
      return NextResponse.json(
        {
          success: false,
          error: { message: "This reset link is invalid or expired." },
        },
        { status: 400 },
      );
    user.password = await bcrypt.hash(body.password, 12);
    await user.save();
    reset.usedAt = new Date();
    await reset.save();
    return NextResponse.json({
      success: true,
      data: { message: "Password reset successfully." },
    });
  } catch (error) {
    console.error("Password reset failed:", error);
    return NextResponse.json(
      { success: false, error: { message: "Unable to reset password." } },
      { status: 500 },
    );
  }
}
