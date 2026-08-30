import { randomUUID } from "crypto";
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";
import { requireRole } from "@/middleware/auth/requireRole";
import { HttpError } from "@/utils/api/httpError";

const allowedTypes = new Map([
    ["image/jpeg", "jpg"],
    ["image/png", "png"],
    ["image/webp", "webp"],
]);

export async function POST(request: Request) {
    try {
        const session = await requireRole(["vendor", "organizer", "admin"]);
        const formData = await request.formData();
        const file = formData.get("file");
        
        if (!(file instanceof File)) {
            throw new HttpError(400, "A stall image is required.", "VALIDATION_ERROR");
        }

        const extension = allowedTypes.get(file.type);
        if (!extension) {
            throw new HttpError(400, "Only JPG, PNG, and WebP images are supported.", "VALIDATION_ERROR");
        }

        if (file.size > 10 * 1024 * 1024) {
            throw new HttpError(400, "Images must be 10MB or smaller.", "VALIDATION_ERROR");
        }

        const directory = path.join(process.cwd(), "public", "uploads", "stalls");
        await mkdir(directory, { recursive: true });
        const filename = `${randomUUID()}.${extension}`;
        await writeFile(path.join(directory, filename), Buffer.from(await file.arrayBuffer()));
        
        const imageUrl = `/uploads/stalls/${filename}`;
        return NextResponse.json({ success: true, data: { imageUrl } });
    } catch (error) {
        const status = error instanceof HttpError ? error.statusCode : 500;
        return NextResponse.json(
            {
                success: false,
                error: {
                    message: error instanceof HttpError ? error.message : "Unable to upload stall image.",
                },
            },
            { status }
        );
    }
}
