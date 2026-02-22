"use client";

export const dynamic = "force-dynamic";

import { Suspense, useEffect, useState, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, Save, Loader2, UploadCloud, Film } from "lucide-react";
import Link from "next/link";
import { Teacher } from "@/lib/db";

function TeacherEditorContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const editId = searchParams.get("id");

    const [loading, setLoading] = useState(!!editId);
    const [saving, setSaving] = useState(false);
    const [uploadingImage, setUploadingImage] = useState(false);
    const [uploadingVideo, setUploadingVideo] = useState(false);

    const [formData, setFormData] = useState<Partial<Teacher>>({
        name: "",
        role: "Quran Instructor",
        bio: "",
        imagePath: "",
        videoPath: "",
        isActive: true,
        qualifications: [],
        experience: "",
        languages: [],
        featuredQuote: "",
    });

    const imageInputRef = useRef<HTMLInputElement>(null);
    const videoInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (editId) {
            fetch(`/api/teachers`)
                .then((res) => res.json())
                .then((data: Teacher[]) => {
                    const teacher = data.find((t) => t.id === editId);
                    if (teacher) setFormData(teacher);
                })
                .finally(() => setLoading(false));
        }
    }, [editId]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleArrayChange = (e: React.ChangeEvent<HTMLInputElement>, field: "qualifications" | "languages") => {
        setFormData((prev) => ({ ...prev, [field]: e.target.value.split(",").map(s => s.trim()).filter(Boolean) }));
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({ ...prev, isActive: e.target.checked }));
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: "image" | "video") => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (type === "image") setUploadingImage(true);
        if (type === "video") setUploadingVideo(true);

        const uploadData = new FormData();
        uploadData.append("file", file);

        try {
            const res = await fetch("/api/upload", {
                method: "POST",
                body: uploadData,
            });
            const data = await res.json();
            if (res.ok) {
                if (type === "image") setFormData((prev) => ({ ...prev, imagePath: data.url }));
                if (type === "video") setFormData((prev) => ({ ...prev, videoPath: data.url }));
            } else {
                alert(data.error);
            }
        } catch (err) {
            console.error("Upload failed", err);
            alert("Upload failed. Try again.");
        } finally {
            if (type === "image") setUploadingImage(false);
            if (type === "video") setUploadingVideo(false);
        }
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            const res = await fetch("/api/teachers", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                // @ts-ignore
                body: JSON.stringify({ ...formData }),
            });
            if (res.ok) {
                router.push("/admin/teachers");
                router.refresh();
            } else {
                console.error("Save failed", await res.text());
            }
        } catch (err) {
            console.error(err);
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="p-10 text-center text-muted-foreground">Loading editor...</div>;

    return (
        <div className="space-y-6 max-w-4xl mx-auto pb-20">
            <div className="flex items-center justify-between gap-4 border-b border-border pb-6 sticky top-0 bg-background/80 backdrop-blur-md z-10 pt-4">
                <div className="flex items-center gap-4">
                    <Link href="/admin/teachers" className="p-2 border border-border rounded-full hover:bg-muted transition-colors">
                        <ArrowLeft className="w-5 h-5 text-muted-foreground" />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">{editId ? "Edit Teacher Profile" : "Add Teacher Profile"}</h1>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <label className="flex items-center gap-2 text-sm font-medium mr-4">
                        <input type="checkbox" checked={formData.isActive} onChange={handleCheckboxChange} className="w-4 h-4 rounded text-primary focus:ring-primary" />
                        Active Profile
                    </label>
                    <button
                        onClick={handleSave}
                        disabled={saving || !formData.name || !formData.role}
                        className="flex items-center gap-2 px-6 py-2 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 shadow-md"
                    >
                        {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                        Save Profile
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Main Info */}
                <div className="md:col-span-2 space-y-6 bg-card border border-border p-6 rounded-2xl shadow-sm">
                    <h3 className="font-bold text-lg border-b border-border pb-2">Personal Details</h3>
                    <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-semibold">Full Name <span className="text-red-500">*</span></label>
                        <input
                            id="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="e.g. Ustadha Sarah"
                            className="w-full px-4 py-2.5 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary outline-none"
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="role" className="text-sm font-semibold">Specialization / Role <span className="text-red-500">*</span></label>
                        <input
                            id="role"
                            value={formData.role}
                            onChange={handleChange}
                            placeholder="e.g. Senior Tajweed Instructor"
                            className="w-full px-4 py-2.5 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary outline-none"
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="bio" className="text-sm font-semibold">Biography</label>
                        <textarea
                            id="bio"
                            value={formData.bio}
                            onChange={handleChange}
                            placeholder="Tell students about this teacher's qualifications..."
                            className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary outline-none min-h-[120px] resize-y"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label htmlFor="experience" className="text-sm font-semibold">Experience</label>
                            <input
                                id="experience"
                                value={formData.experience || ""}
                                onChange={handleChange}
                                placeholder="e.g. 10+ Years"
                                className="w-full px-4 py-2.5 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary outline-none"
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="languages" className="text-sm font-semibold">Languages (comma separated)</label>
                            <input
                                id="languages"
                                value={formData.languages?.join(", ") || ""}
                                onChange={(e) => handleArrayChange(e, "languages")}
                                placeholder="e.g. English, Arabic, Urdu"
                                className="w-full px-4 py-2.5 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary outline-none"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="qualifications" className="text-sm font-semibold">Qualifications (comma separated)</label>
                        <input
                            id="qualifications"
                            value={formData.qualifications?.join(", ") || ""}
                            onChange={(e) => handleArrayChange(e, "qualifications")}
                            placeholder="e.g. Ijazah from Masjid Nabawi, BA Islamic Studies"
                            className="w-full px-4 py-2.5 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary outline-none"
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="featuredQuote" className="text-sm font-semibold">Featured Quote</label>
                        <input
                            id="featuredQuote"
                            value={formData.featuredQuote || ""}
                            onChange={handleChange}
                            placeholder="e.g. Learning the Quran should never feel heavy."
                            className="w-full px-4 py-2.5 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary outline-none italic"
                        />
                    </div>
                </div>

                {/* Media Uploads */}
                <div className="space-y-6">
                    <div className="bg-card border border-border rounded-2xl p-6 space-y-4 shadow-sm">
                        <h3 className="font-bold text-lg border-b border-border pb-2 flex items-center gap-2">
                            <UploadCloud className="w-5 h-5 text-primary" /> Profile Media
                        </h3>

                        {/* Image Upload */}
                        <div className="space-y-3">
                            <label className="text-sm font-semibold block">Profile Photo</label>
                            <div
                                className="w-full aspect-square bg-muted/30 border-2 border-dashed border-border rounded-xl flex flex-col items-center justify-center cursor-pointer hover:bg-muted/50 transition relative overflow-hidden group"
                                onClick={() => imageInputRef.current?.click()}
                            >
                                {formData.imagePath ? (
                                    <img src={formData.imagePath} alt="Preview" className="w-full h-full object-cover" />
                                ) : (
                                    <div className="text-center p-4">
                                        <UploadCloud className="w-8 h-8 text-muted-foreground mx-auto mb-2 group-hover:text-primary transition-colors" />
                                        <span className="text-xs text-muted-foreground font-medium">Click to upload image</span>
                                    </div>
                                )}
                                {uploadingImage && <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center"><Loader2 className="w-6 h-6 text-primary animate-spin" /></div>}
                            </div>
                            <input type="file" accept="image/*" ref={imageInputRef} className="hidden" onChange={(e) => handleFileUpload(e, "image")} />
                            {formData.imagePath && <button onClick={() => setFormData(prev => ({ ...prev, imagePath: "" }))} className="text-xs text-red-500 hover:underline w-full text-center">Remove Photo</button>}
                        </div>

                        {/* Video Upload */}
                        <div className="space-y-3 pt-4 border-t border-border">
                            <label className="text-sm font-semibold block">Introductory Video</label>
                            {!formData.videoPath ? (
                                <button
                                    onClick={() => videoInputRef.current?.click()}
                                    disabled={uploadingVideo}
                                    className="w-full py-4 border-2 border-dashed border-border rounded-xl flex flex-col items-center justify-center hover:bg-muted/50 transition-colors bg-muted/20"
                                >
                                    {uploadingVideo ? (
                                        <Loader2 className="w-6 h-6 text-primary animate-spin mb-2" />
                                    ) : (
                                        <Film className="w-6 h-6 text-muted-foreground mb-2" />
                                    )}
                                    <span className="text-xs font-medium text-muted-foreground">{uploadingVideo ? "Uploading..." : "Click to upload .mp4"}</span>
                                </button>
                            ) : (
                                <div className="space-y-2">
                                    <video src={formData.videoPath} className="w-full rounded-xl bg-black aspect-video object-cover" controls />
                                    <button onClick={() => setFormData(prev => ({ ...prev, videoPath: "" }))} className="text-xs text-red-500 hover:underline w-full text-center block">Remove Video</button>
                                </div>
                            )}
                            <input type="file" accept="video/*" ref={videoInputRef} className="hidden" onChange={(e) => handleFileUpload(e, "video")} />

                            <div className="mt-4 pt-4 border-t border-border">
                                <label className="text-xs font-semibold text-muted-foreground mb-1 block">Or use YouTube Link:</label>
                                <input
                                    type="text"
                                    value={formData.videoPath?.startsWith("http") ? formData.videoPath : ""}
                                    onChange={(e) => setFormData(prev => ({ ...prev, videoPath: e.target.value }))}
                                    placeholder="https://youtube.com/..."
                                    className="w-full px-3 py-2 bg-background border border-border rounded-lg text-xs focus:ring-1 focus:ring-primary outline-none"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function TeacherEditor() {
    return (
        <Suspense fallback={<div className="p-10 text-center text-muted-foreground">Loading editor...</div>}>
            <TeacherEditorContent />
        </Suspense>
    );
}
