"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Send, ChevronRight } from "lucide-react";

export default function ContactPage() {
    const [submitted, setSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        course: "qaida",
        message: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Build payload for new CMS Leads API
        const payload = {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            source: "contact_form",
            details: {
                course: formData.course,
                message: formData.message
            }
        };

        try {
            const res = await fetch("/api/leads", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });

            if (res.ok) {
                setSubmitted(true);
                setFormData({ // Reset form after successful submission
                    name: "",
                    email: "",
                    phone: "",
                    course: "qaida",
                    message: "",
                });
            } else {
                console.error("Failed to submit lead");
                // Optionally handle error display to user
            }
        } catch (err) {
            console.error(err);
            // Optionally handle network error display to user
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-background" style={{ padding: 'clamp(5rem, 10vw, 8rem) clamp(1.5rem, 5vw, 5rem)' }}>
            <div className="mx-auto max-w-[1280px] w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">

                    <div className="space-y-8">
                        <div className="badge-gold inline-flex items-center gap-2">
                            Get in Touch
                        </div>
                        <h1 className="text-balance" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontFamily: "var(--font-heading)", fontWeight: 300, color: 'var(--foreground)', letterSpacing: '-0.01em', lineHeight: 1.1 }}>
                            Start Your <span className="italic text-glow" style={{ color: 'var(--primary)' }}>Quranic</span> Journey Today.
                        </h1>
                        <p style={{ fontSize: '1.25rem', color: 'var(--muted-foreground)', lineHeight: 1.8, fontFamily: "var(--font-body)" }}>
                            Book your free trial class or simply send us a message. Our team will get back to you within 24 hours to set up your learning plan.
                        </p>

                        <div className="space-y-6 pt-4">
                            <div className="flex items-center gap-5 p-6 glass border-border" style={{ borderRadius: '24px', background: 'var(--card)' }}>
                                <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-primary/10 border border-primary/20">
                                    <Mail className="w-6 h-6" style={{ color: 'var(--primary)' }} />
                                </div>
                                <div>
                                    <p style={{ fontSize: '0.8rem', color: 'var(--muted-foreground)', fontWeight: 600, fontFamily: "var(--font-body)", textTransform: 'uppercase', letterSpacing: '0.05em' }}>Email Us</p>
                                    <p style={{ fontWeight: 500, color: 'var(--foreground)', fontFamily: "var(--font-body)", fontSize: '1.1rem' }}>info@sawtulquran.academy</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="glass p-8 md:p-12 border-border shadow-2xl relative overflow-hidden" style={{ borderRadius: '32px', background: 'var(--card)' }}>
                        <div className="absolute inset-0 bg-primary/[0.02] pointer-events-none" />

                        {submitted ? (
                            <div className="text-center py-16 space-y-6 relative z-10">
                                <div className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: 'var(--color-gold-glow)', border: '1px solid var(--color-border-accent)' }}>
                                    <Send className="w-10 h-10 ml-1 text-primary" />
                                </div>
                                <h2 style={{ fontSize: '2rem', fontFamily: "var(--font-heading)", fontWeight: 300, color: 'var(--foreground)' }}>Request Sent!</h2>
                                <p style={{ fontSize: '1.125rem', color: 'var(--muted-foreground)', fontFamily: "var(--font-body)", lineHeight: 1.7 }}>We have received your trial booking request. A teacher will contact you shortly.</p>
                                <button onClick={() => setSubmitted(false)} className="mt-8 px-8 py-3 rounded-full border border-primary/20 text-primary font-bold hover:bg-primary/5 transition-all">
                                    Send another message
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-7 relative z-10">
                                <h2 style={{ fontSize: '1.75rem', fontFamily: "var(--font-heading)", fontWeight: 300, color: 'var(--foreground)' }} className="mb-2">Book a Free Trial Class</h2>

                                <div className="space-y-5">
                                    <div className="space-y-2">
                                        <label className="block px-1" style={{ fontSize: '0.75rem', color: 'var(--muted-foreground)', fontWeight: 600, fontFamily: "var(--font-body)", textTransform: 'uppercase', letterSpacing: '0.08em' }} htmlFor="name">Full Name</label>
                                        <input
                                            id="name"
                                            type="text"
                                            required
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="e.g. John Doe"
                                            className="w-full px-5 py-4 outline-none transition-all placeholder:opacity-30 focus:ring-2 focus:ring-primary/20 bg-secondary/30"
                                            style={{ borderRadius: '16px', border: '1px solid var(--border)', color: 'var(--foreground)', fontFamily: "var(--font-body)", fontSize: '1rem' }}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="block px-1" style={{ fontSize: '0.75rem', color: 'var(--muted-foreground)', fontWeight: 600, fontFamily: "var(--font-body)", textTransform: 'uppercase', letterSpacing: '0.08em' }} htmlFor="email">Email Address</label>
                                        <input
                                            id="email"
                                            type="email"
                                            required
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="e.g. email@example.com"
                                            className="w-full px-5 py-4 outline-none transition-all placeholder:opacity-30 focus:ring-2 focus:ring-primary/20 bg-secondary/30"
                                            style={{ borderRadius: '16px', border: '1px solid var(--border)', color: 'var(--foreground)', fontFamily: "var(--font-body)", fontSize: '1rem' }}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="block px-1" style={{ fontSize: '0.75rem', color: 'var(--muted-foreground)', fontWeight: 600, fontFamily: "var(--font-body)", textTransform: 'uppercase', letterSpacing: '0.08em' }} htmlFor="course">Interested Course</label>
                                        <div className="relative">
                                            <select
                                                id="course"
                                                value={formData.course}
                                                onChange={handleChange}
                                                className="w-full px-5 py-4 outline-none transition-all appearance-none cursor-pointer bg-secondary/30"
                                                style={{ borderRadius: '16px', border: '1px solid var(--border)', color: 'var(--foreground)', fontFamily: "var(--font-body)", fontSize: '1rem' }}
                                            >
                                                <option value="qaida">Qaida Basics</option>
                                                <option value="nazra">Nazra Practice</option>
                                                <option value="tajweed">Tajweed Essentials</option>
                                                <option value="advanced">Advanced Tajweed & Nazra</option>
                                                <option value="unsure">I&apos;m not sure (Take the quiz!)</option>
                                            </select>
                                            <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none opacity-50">
                                                <ChevronRight className="w-5 h-5 rotate-90" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="block px-1" style={{ fontSize: '0.75rem', color: 'var(--muted-foreground)', fontWeight: 600, fontFamily: "var(--font-body)", textTransform: 'uppercase', letterSpacing: '0.08em' }} htmlFor="message">Any specific requirements?</label>
                                        <textarea
                                            id="message"
                                            rows={3}
                                            value={formData.message}
                                            onChange={handleChange}
                                            placeholder="e.g. I prefer evening classes for my 10-year-old son."
                                            className="w-full px-5 py-4 outline-none transition-all resize-none placeholder:opacity-30 focus:ring-2 focus:ring-primary/20 bg-secondary/30"
                                            style={{ borderRadius: '16px', border: '1px solid var(--border)', color: 'var(--foreground)', fontFamily: "var(--font-body)", fontSize: '1rem' }}
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full py-5 rounded-2xl font-bold text-lg transition-all hover:scale-[1.01] active:scale-[0.99] flex justify-center items-center gap-3 btn-glow disabled:opacity-50"
                                    style={{ background: 'var(--primary)', color: 'var(--primary-foreground)', fontFamily: "var(--font-body)", boxShadow: '0 10px 30px var(--color-gold-glow)' }}
                                >
                                    {isSubmitting ? "Sending..." : "Submit Request"}
                                    {!isSubmitting && <Send className="w-5 h-5" />}
                                </button>
                            </form>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
}
