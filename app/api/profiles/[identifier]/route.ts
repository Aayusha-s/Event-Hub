import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { Types } from "mongoose";
import { authOptions } from "@/auth";
import { getProfileByIdentifier } from "@/services/profiles/profile.service";
import { HttpError } from "@/utils/api/httpError";

export async function GET(
  _: Request,
  context: { params: Promise<{ identifier: string }> },
) {
  try {
    const { identifier } = await context.params;
    const session = await getServerSession(authOptions);
    const viewer =
      session?.user?.id && Types.ObjectId.isValid(session.user.id)
        ? new Types.ObjectId(session.user.id)
        : undefined;
    return NextResponse.json({
      success: true,
      data: await getProfileByIdentifier(identifier, viewer),
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: {
          message:
            error instanceof HttpError
              ? error.message
              : "Unable to load profile.",
        },
      },
      { status: error instanceof HttpError ? error.statusCode : 500 },
    );
  }
}
