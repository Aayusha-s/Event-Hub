import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import { HttpError } from "@/utils/api/httpError";
import { createSession } from "@/utils/auth/session";
import { validateRegisterInput } from "@/utils/auth/validation";

export async function POST(request: Request) {
  try {
    const input = validateRegisterInput(await request.json());
    await dbConnect();

    const existingUser = await User.exists({ email: input.email });
    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          error: { message: "An account with this email already exists." },
        },
        { status: 409 },
      );
    }

    const password = await bcrypt.hash(input.password, 12);
    const user = await User.create({ ...input, password });
    const response = NextResponse.json(
      {
        success: true,
        data: {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
      { status: 201 },
    );
    await createSession(response, user);
    return response;
  } catch (error) {
    if (error instanceof HttpError) {
      return NextResponse.json(
        { success: false, error: { message: error.message, code: error.code } },
        { status: error.statusCode },
      );
    }
    console.error("Registration failed:", error);
    return NextResponse.json(
      { success: false, error: { message: "Unable to create account." } },
      { status: 500 },
    );
  }
}
