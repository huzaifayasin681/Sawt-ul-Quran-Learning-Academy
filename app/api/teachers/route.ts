import { NextResponse } from "next/server";
import { getTeachers, saveTeacher, deleteTeacher, Teacher } from "@/lib/db";
import { v4 as uuidv4 } from "uuid";

// Get all teachers
export async function GET() {
    try {
        const teachers = getTeachers();
        return NextResponse.json(teachers);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch teachers" }, { status: 500 });
    }
}

// Create or Update a Teacher (Admin)
export async function POST(request: Request) {
    try {
        const data = await request.json();

        if (!data.name || !data.role) {
            return NextResponse.json({ error: "Name and role are required" }, { status: 400 });
        }

        const teacher: Teacher = {
            id: data.id || uuidv4(),
            name: data.name,
            role: data.role,
            bio: data.bio || "",
            imagePath: data.imagePath || "",
            videoPath: data.videoPath || "",
            isActive: data.isActive ?? true,
            qualifications: data.qualifications || [],
            experience: data.experience || "",
            languages: data.languages || [],
            featuredQuote: data.featuredQuote || "",
        };

        saveTeacher(teacher);
        return NextResponse.json(teacher, { status: data.id ? 200 : 201 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to save teacher" }, { status: 500 });
    }
}

// Delete a Teacher (Admin)
export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json({ error: "Teacher ID required" }, { status: 400 });
        }

        deleteTeacher(id);
        return NextResponse.json({ success: true });
    } catch (err) {
        return NextResponse.json({ error: "Failed to delete teacher" }, { status: 500 })
    }
}
