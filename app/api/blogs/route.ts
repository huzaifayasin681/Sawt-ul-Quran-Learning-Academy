import { NextResponse } from "next/server";
import { getBlogs, saveBlog, deleteBlog, Blog } from "@/lib/db";
import { v4 as uuidv4 } from "uuid";

// Get all published blogs (Public) or all blogs (Admin based on query param)
export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const admin = searchParams.get("admin") === "true";

        let blogs = getBlogs();

        // Sort by Date Descending
        blogs.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

        // Public API only sees published blogs
        if (!admin) {
            blogs = blogs.filter((b) => b.published);
        }

        return NextResponse.json(blogs);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch blogs" }, { status: 500 });
    }
}

// Create or Update a blog (Admin)
export async function POST(request: Request) {
    try {
        const data = await request.json();

        if (!data.title || !data.content) {
            return NextResponse.json({ error: "Title and content are required" }, { status: 400 });
        }

        // Auto-generate slug if not provided
        const slug = data.slug || data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

        const blog: Blog = {
            id: data.id || uuidv4(),
            slug: slug,
            title: data.title,
            excerpt: data.excerpt || "",
            content: data.content,
            date: data.date || new Date().toISOString(), // Use existing date if update, else now
            readTime: data.readTime || `${Math.ceil(data.content.length / 1000)} min read`,
            tag: data.tag || "General",
            published: data.published ?? false,
        };

        saveBlog(blog);
        return NextResponse.json(blog, { status: data.id ? 200 : 201 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to save blog" }, { status: 500 });
    }
}

// Delete a blog
export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json({ error: "Blog ID required" }, { status: 400 });
        }

        deleteBlog(id);
        return NextResponse.json({ success: true });
    } catch (err) {
        return NextResponse.json({ error: "Failed to delete blog" }, { status: 500 })
    }
}
