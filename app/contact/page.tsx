"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";

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
        <div className="min-h-screen flex justify-center items-center" style={{ padding: 'clamp(5rem, 10vw, 8rem) clamp(1.5rem, 5vw, 5rem)', background: '#060A09' }}>
            <div className="mx-auto max-w-[1280px] w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">

                    <div className="space-y-8">
                        <div className="badge-gold inline-flex items-center gap-2">
                            Get in Touch
                        </div>
                        <h1 className="text-balance" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, color: '#EEE8D5', letterSpacing: '-0.01em', lineHeight: 1.15 }}>
                            Start Your <span className="italic text-glow" style={{ color: '#C9A84C' }}>Quranic</span> Journey Today.
                        </h1>
                        <p style={{ fontSize: '1.125rem', color: '#A8B8B0', lineHeight: 1.75, fontFamily: "'DM Sans', sans-serif" }}>
                            Book your free trial class or simply send us a message. Our team will get back to you within 24 hours to set up your learning plan.
                        </p>

                        <div className="space-y-6 pt-4">
                            <div className="flex items-center gap-4 p-4" style={{ borderRadius: '16px', background: '#0D1612', border: '1px solid rgba(255,255,255,0.07)' }}>
                                <div className="icon-container">
                                    <Mail className="w-6 h-6" style={{ color: '#C9A84C' }} />
                                </div>
                                <div>
                                    <p style={{ fontSize: '0.75rem', color: '#A8B8B0', fontWeight: 500, fontFamily: "'DM Sans', sans-serif" }}>Email Us</p>
                                    <p style={{ fontWeight: 500, color: '#EEE8D5', fontFamily: "'DM Sans', sans-serif" }}>info@noorulquran.academy</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="glass p-8 md:p-10" style={{ borderRadius: '24px', background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.07)' }}>
                        {submitted ? (
                            <div className="text-center py-16 space-y-6">
                                <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'rgba(201,168,76,0.15)' }}>
                                    <Send className="w-10 h-10 ml-1" style={{ color: '#C9A84C' }} />
                                </div>
                                <h2 style={{ fontSize: '1.875rem', fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, color: '#EEE8D5' }}>Request Sent!</h2>
                                <p style={{ fontSize: '1.125rem', color: '#A8B8B0', fontFamily: "'DM Sans', sans-serif" }}>We have received your trial booking request. A teacher will contact you shortly.</p>
                                <button onClick={() => setSubmitted(false)} className="mt-4 inline-block" style={{ color: '#C9A84C', fontWeight: 500, fontFamily: "'DM Sans', sans-serif" }}>
                                    Send another message
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <h2 style={{ fontSize: '1.5rem', fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, color: '#EEE8D5' }} className="mb-6">Book a Free Trial Class</h2>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block mb-2" style={{ fontSize: '0.75rem', color: '#A8B8B0', fontWeight: 500, fontFamily: "'DM Sans', sans-serif", textTransform: 'uppercase' as const, letterSpacing: '0.08em' }} htmlFor="name">Full Name</label>
                                        <input
                                            id="name"
                                            type="text"
                                            required
                                            placeholder="e.g. John Doe"
                                            className="w-full px-4 py-3 outline-none transition-all"
                                            style={{ borderRadius: '12px', border: '1px solid rgba(255,255,255,0.07)', background: '#0D1612', color: '#EEE8D5', fontFamily: "'DM Sans', sans-serif", fontSize: '0.95rem' }}
                                            onFocus={(e) => e.currentTarget.style.borderColor = 'rgba(201,168,76,0.5)'}
                                            onBlur={(e) => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'}
                                        />
                                    </div>
                                    <div>
                                        <label className="block mb-2" style={{ fontSize: '0.75rem', color: '#A8B8B0', fontWeight: 500, fontFamily: "'DM Sans', sans-serif", textTransform: 'uppercase' as const, letterSpacing: '0.08em' }} htmlFor="email">Email Address</label>
                                        <input
                                            id="email"
                                            type="email"
                                            required
                                            placeholder="e.g. email@example.com"
                                            className="w-full px-4 py-3 outline-none transition-all"
                                            style={{ borderRadius: '12px', border: '1px solid rgba(255,255,255,0.07)', background: '#0D1612', color: '#EEE8D5', fontFamily: "'DM Sans', sans-serif", fontSize: '0.95rem' }}
                                            onFocus={(e) => e.currentTarget.style.borderColor = 'rgba(201,168,76,0.5)'}
                                            onBlur={(e) => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'}
                                        />
                                    </div>
                                    <div>
                                        <label className="block mb-2" style={{ fontSize: '0.75rem', color: '#A8B8B0', fontWeight: 500, fontFamily: "'DM Sans', sans-serif", textTransform: 'uppercase' as const, letterSpacing: '0.08em' }} htmlFor="course">Interested Course</label>
                                        <select id="course" className="w-full px-4 py-3 outline-none transition-all appearance-none cursor-pointer" style={{ borderRadius: '12px', border: '1px solid rgba(255,255,255,0.07)', background: '#0D1612', color: '#EEE8D5', fontFamily: "'DM Sans', sans-serif", fontSize: '0.95rem' }}>
                                            <option value="qaida">Qaida Basics</option>
                                            <option value="nazra">Nazra Practice</option>
                                            <option value="tajweed">Tajweed Essentials</option>
                                            <option value="advanced">Advanced Tajweed & Nazra</option>
                                            <option value="unsure">I&apos;m not sure (Take the quiz first!)</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block mb-2" style={{ fontSize: '0.75rem', color: '#A8B8B0', fontWeight: 500, fontFamily: "'DM Sans', sans-serif", textTransform: 'uppercase' as const, letterSpacing: '0.08em' }} htmlFor="message">Any specific requirements?</label>
                                        <textarea
                                            id="message"
                                            rows={4}
                                            placeholder="e.g. I prefer evening classes for my 10-year-old son."
                                            className="w-full px-4 py-3 outline-none transition-all resize-none"
                                            style={{ borderRadius: '12px', border: '1px solid rgba(255,255,255,0.07)', background: '#0D1612', color: '#EEE8D5', fontFamily: "'DM Sans', sans-serif", fontSize: '0.95rem' }}
                                            onFocus={(e) => e.currentTarget.style.borderColor = 'rgba(201,168,76,0.5)'}
                                            onBlur={(e) => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'}
                                        />
                                    </div>
                                </div>

                                <button type="submit" className="w-full py-4 rounded-xl font-semibold text-lg transition-all hover:scale-[1.02] flex justify-center items-center gap-2 btn-glow" style={{ background: '#C9A84C', color: '#060A09', fontFamily: "'DM Sans', sans-serif", borderRadius: '12px' }}>
                                    Submit Request
                                </button>
                            </form>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
}
