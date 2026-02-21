import { NextResponse } from "next/server";
import { getCourses, saveCourse, deleteCourse, Course } from "@/lib/db";
import { v4 as uuidv4 } from "uuid";

// Get all courses
export async function GET() {
    try {
        const courses = getCourses();
        return NextResponse.json(courses);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch courses" }, { status: 500 });
    }
}

// Create or Update a Course (Admin)
export async function POST(request: Request) {
    try {
        const data = await request.json();

        if (!data.title || !data.subtitle) {
            return NextResponse.json({ error: "Title and subtitle are required" }, { status: 400 });
        }

        const course: Course = {
            id: data.id || uuidv4(),
            title: data.title,
            subtitle: data.subtitle,
            iconName: data.iconName || "BookOpen",
            features: data.features || [],
            color: data.color || "bg-card border-border",
            iconColor: data.iconColor || "text-primary",
            isActive: data.isActive ?? true,
        };

        saveCourse(course);
        return NextResponse.json(course, { status: data.id ? 200 : 201 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to save course" }, { status: 500 });
    }
}

// Delete a Course (Admin)
export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json({ error: "Course ID required" }, { status: 400 });
        }

        deleteCourse(id);
        return NextResponse.json({ success: true });
    } catch (err) {
        return NextResponse.json({ error: "Failed to delete course" }, { status: 500 })
    }
}
