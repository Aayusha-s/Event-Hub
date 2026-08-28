import { randomUUID } from "crypto";
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";
import { Types } from "mongoose";
import { requireRole } from "@/middleware/auth/requireRole";
import { updateProfile } from "@/services/profiles/profile.service";
import { HttpError } from "@/utils/api/httpError";

const roles = ["attendee", "organizer", "vendor", "ticket_checker", "admin"] as const;
const allowedTypes = new Map([["image/jpeg", "jpg"], ["image/png", "png"], ["image/gif", "gif"]]);

export async function POST(request: Request) {
    try {
        const session = await requireRole([...roles]);
        const formData = await request.formData();
        const file = formData.get("file");
        if (!(file instanceof File)) throw new HttpError(400, "A profile image is required.", "VALIDATION_ERROR");
        const extension = allowedTypes.get(file.type);
        if (!extension) throw new HttpError(400, "Only JPG, PNG, and GIF images are supported.", "VALIDATION_ERROR");
        if (file.size > 5 * 1024 * 1024) throw new HttpError(400, "Profile images must be 5MB or smaller.", "VALIDATION_ERROR");

        const directory = path.join(process.cwd(), "public", "uploads", "profiles");
        await mkdir(directory, { recursive: true });
        const filename = `${session.user.id}-${randomUUID()}.${extension}`;
        await writeFile(path.join(directory, filename), Buffer.from(await file.arrayBuffer()));
        const profileImage = `/uploads/profiles/${filename}`;
        const user = await updateProfile(new Types.ObjectId(session.user.id), { profileImage });
        return NextResponse.json({ success: true, data: { profileImage, user } });
    } catch (error) {
        const status = error instanceof HttpError ? error.statusCode : 500;
        return NextResponse.json({ success: false, error: { message: error instanceof HttpError ? error.message : "Unable to upload profile image." } }, { status });
    }
}
