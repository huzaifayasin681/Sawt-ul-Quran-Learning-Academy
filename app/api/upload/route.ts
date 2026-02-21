import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { existsSync } from "fs";

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const file = formData.get("file") as File | null;

        if (!file) {
            return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Create a unique filename
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, ""); // sanitize
        const filename = uniqueSuffix + "-" + originalName;

        const publicUploadsDir = path.join(process.cwd(), "public", "uploads");

        // Ensure uploads directory exists
        if (!existsSync(publicUploadsDir)) {
            await mkdir(publicUploadsDir, { recursive: true });
        }

        const filePath = path.join(publicUploadsDir, filename);

        // Write file to public/uploads
        await writeFile(filePath, buffer);

        // Return the public URL for the file
        return NextResponse.json({ url: `/uploads/${filename}` });
    } catch (error) {
        console.error("Upload error:", error);
        return NextResponse.json({ error: "Upload failed" }, { status: 500 });
    }
}
