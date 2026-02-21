import { NextResponse } from "next/server";
import { getLeads, addLead, updateLeadStatus, Lead } from "@/lib/db";
import { v4 as uuidv4 } from "uuid";

// Get all leads (Admin)
export async function GET() {
    try {
        const leads = getLeads();
        // Return newest first
        return NextResponse.json(leads.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch leads" }, { status: 500 });
    }
}

// Submit a new lead (Public Website Contact/Quiz Form)
export async function POST(request: Request) {
    try {
        const data = await request.json();

        // Validate required fields
        if (!data.name || !data.email) {
            return NextResponse.json({ error: "Name and email are required" }, { status: 400 });
        }

        const newLead: Lead = {
            id: uuidv4(),
            name: data.name,
            email: data.email,
            phone: data.phone || "",
            source: data.source || "contact_form",
            details: data.details || {},
            status: "new",
            date: new Date().toISOString(),
        };

        addLead(newLead);
        return NextResponse.json({ success: true, leadId: newLead.id }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to submit lead" }, { status: 500 });
    }
}

// Update Lead Status (Admin)
export async function PUT(request: Request) {
    try {
        const { id, status } = await request.json();
        if (!id || !status) {
            return NextResponse.json({ error: "ID and status are required" }, { status: 400 });
        }
        updateLeadStatus(id, status);
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: "Failed to update lead" }, { status: 500 });
    }
}
