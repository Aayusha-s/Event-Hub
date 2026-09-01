import { randomUUID } from "crypto";
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";
import { Types } from "mongoose";
import { requireRole } from "@/middleware/auth/requireRole";
import { updateProfile } from "@/services/profiles/profile.service";
import { HttpError } from "@/utils/api/httpError";

const roles = ["attendee", "organizer", "vendor", "ticket_checker", "admin"] as const;
const allowedTypes = new Map([
    ["image/jpeg", "jpg"],
    ["image/jpg", "jpg"],
    ["image/png", "png"],
    ["image/gif", "gif"],
    ["image/webp", "webp"],
    ["image/heic", "heic"],
    ["image/heif", "heif"],
]);

export async function POST(request: Request) {
    try {
        const session = await requireRole([...roles]);
        const formData = await request.formData();
        const file = formData.get("file");
        if (!(file instanceof File)) throw new HttpError(400, "A profile image is required.", "VALIDATION_ERROR");

        const mimeExtension = allowedTypes.get(file.type.toLowerCase());
        const fileExtension = file.name?.split(".").pop()?.toLowerCase();
        const extension = mimeExtension ?? (fileExtension && allowedTypes.has(`image/${fileExtension}`) ? allowedTypes.get(`image/${fileExtension}`) : fileExtension && ["jpg", "jpeg", "png", "gif", "webp", "heic", "heif"].includes(fileExtension) ? fileExtension : undefined);
        if (!extension) throw new HttpError(400, "Only JPG, PNG, GIF, WebP, HEIC, and HEIF images are supported.", "VALIDATION_ERROR");
        if (file.size > 5 * 1024 * 1024) throw new HttpError(400, "Profile images must be 5MB or smaller.", "VALIDATION_ERROR");

        const directory = path.join(process.cwd(), "public", "uploads", "profiles");
        await mkdir(directory, { recursive: true });
        const filename = `${session.user.id}-${randomUUID()}.${extension === "jpeg" ? "jpg" : extension}`;
        await writeFile(path.join(directory, filename), Buffer.from(await file.arrayBuffer()));
        const profileImage = `/uploads/profiles/${filename}`;
        const user = await updateProfile(new Types.ObjectId(session.user.id), { profileImage });
        return NextResponse.json({ success: true, data: { profileImage, user } });
    } catch (error) {
        const status = error instanceof HttpError ? error.statusCode : 500;
        return NextResponse.json({ success: false, error: { message: error instanceof HttpError ? error.message : "Unable to upload profile image." } }, { status });
    }
}
