"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import { Search, Mail, Phone, BookOpen, CheckCircle2, Circle, MoreVertical } from "lucide-react";

type Lead = {
    id: string;
    name: string;
    email: string;
    phone?: string;
    source: string;
    details: any;
    date: string;
    status: "new" | "contacted" | "enrolled";
};

export default function LeadsManager() {
    const [leads, setLeads] = useState<Lead[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchLeads = async () => {
        try {
            const res = await fetch("/api/leads");
            if (res.ok) {
                setLeads(await res.json());
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLeads();
    }, []);

    const handleStatusChange = async (id: string, newStatus: Lead["status"]) => {
        try {
            await fetch("/api/leads", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id, status: newStatus }),
            });
            // Refresh local state without full refetch
            setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status: newStatus } : l)));
        } catch (err) {
            console.error("Failed to update status");
        }
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "new":
                return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold bg-red-100 text-red-700 rounded-full"><Circle className="w-3 h-3 fill-red-500" /> New</span>;
            case "contacted":
                return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold bg-blue-100 text-blue-700 rounded-full"><BookOpen className="w-3 h-3" /> Contacted</span>;
            case "enrolled":
                return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold bg-green-100 text-green-700 rounded-full"><CheckCircle2 className="w-3 h-3" /> Enrolled</span>;
            default:
                return <span>{status}</span>;
        }
    };

    return (
        <div className="space-y-6 max-w-full overflow-hidden">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Leads & Students</h1>
                    <p className="text-muted-foreground mt-1">Manage contact form queries and quiz submissions.</p>
                </div>
                <div className="relative w-full sm:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input type="text" placeholder="Search leads..." className="w-full pl-10 pr-4 py-2 bg-card border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary shadow-sm" />
                </div>
            </div>

            <div className="bg-card border border-border shadow-sm rounded-2xl overflow-hidden overflow-x-auto w-full">
                <table className="w-full text-sm text-left">
                    <thead className="text-xs text-muted-foreground bg-muted/30 uppercase border-b border-border">
                        <tr>
                            <th className="px-6 py-4 font-semibold">Student Name / Contact</th>
                            <th className="px-6 py-4 font-semibold">Source & Interests</th>
                            <th className="px-6 py-4 font-semibold">Date Received</th>
                            <th className="px-6 py-4 font-semibold">Status</th>
                            <th className="px-6 py-4 font-semibold text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {loading ? (
                            <tr><td colSpan={5} className="text-center py-10 text-muted-foreground">Loading leads...</td></tr>
                        ) : leads.length === 0 ? (
                            <tr><td colSpan={5} className="text-center py-10 text-muted-foreground">No leads found yet.</td></tr>
                        ) : (
                            leads.map((lead) => (
                                <tr key={lead.id} className="hover:bg-muted/10 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="font-medium text-foreground text-base mb-1">{lead.name}</div>
                                        <div className="flex items-center gap-2 text-muted-foreground text-xs">
                                            <Mail className="w-3 h-3" /> {lead.email}
                                        </div>
                                        {lead.phone && (
                                            <div className="flex items-center gap-2 text-muted-foreground text-xs mt-1">
                                                <Phone className="w-3 h-3" /> {lead.phone}
                                            </div>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="mb-1">
                                            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground bg-muted px-2 py-0.5 rounded mr-2">
                                                {lead.source === "quiz" ? "Quiz Result" : "Contact Form"}
                                            </span>
                                        </div>
                                        <div className="text-foreground font-medium mt-2">
                                            {lead.source === "quiz" ? (
                                                <>Level: <span className="text-primary">{lead.details.quizLevel}</span> (Score: {lead.details.score}/{lead.details.total})</>
                                            ) : (
                                                <>Course: <span className="capitalize text-primary">{lead.details.course}</span></>
                                            )}
                                        </div>
                                        {lead.details.message && <div className="text-xs text-muted-foreground mt-1 line-clamp-1 italic">"{lead.details.message}"</div>}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-muted-foreground">
                                        {format(new Date(lead.date), "MMM d, yyyy h:mm a")}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {getStatusBadge(lead.status)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right">
                                        <select
                                            value={lead.status}
                                            onChange={(e) => handleStatusChange(lead.id, e.target.value as Lead["status"])}
                                            className="bg-transparent border border-border rounded-lg text-sm px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer hover:bg-muted"
                                        >
                                            <option value="new">Mark New</option>
                                            <option value="contacted">Mark Contacted</option>
                                            <option value="enrolled">Mark Enrolled</option>
                                        </select>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
