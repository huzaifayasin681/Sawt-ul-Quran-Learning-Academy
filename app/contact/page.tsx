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
        <div className="min-h-screen py-20 px-4 flex justify-center items-center bg-muted/20">
            <div className="container mx-auto max-w-6xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">

                    <div className="space-y-8">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-bold tracking-wider uppercase mb-2">
                            Get in Touch
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-balance leading-tight">
                            Start Your <span className="text-primary italic font-serif">Quranic</span> Journey Today.
                        </h1>
                        <p className="text-lg text-muted-foreground">
                            Book your free trial class or simply send us a message. Our team will get back to you within 24 hours to set up your learning plan.
                        </p>

                        <div className="space-y-6 pt-4">
                            <div className="flex items-center gap-4 p-4 rounded-2xl bg-card border border-border shadow-sm">
                                <div className="bg-primary/10 p-3 rounded-full text-primary">
                                    <Mail className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground font-medium">Email Us</p>
                                    <p className="font-bold">info@noorulquran.academy</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="glass p-8 md:p-10 rounded-3xl border border-border shadow-xl">
                        {submitted ? (
                            <div className="text-center py-16 space-y-6 animate-in fade-in zoom-in duration-500">
                                <div className="w-20 h-20 bg-primary/20 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Send className="w-10 h-10 ml-1" />
                                </div>
                                <h2 className="text-3xl font-bold">Request Sent!</h2>
                                <p className="text-muted-foreground text-lg">We have received your trial booking request. A teacher will contact you shortly.</p>
                                <button onClick={() => setSubmitted(false)} className="text-primary font-medium hover:underline mt-4 inline-block">
                                    Send another message
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <h2 className="text-2xl font-bold mb-6">Book a Free Trial Class</h2>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-2" htmlFor="name">Full Name</label>
                                        <input
                                            id="name"
                                            type="text"
                                            required
                                            placeholder="e.g. John Doe"
                                            className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2" htmlFor="email">Email Address</label>
                                        <input
                                            id="email"
                                            type="email"
                                            required
                                            placeholder="e.g. email@example.com"
                                            className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2" htmlFor="course">Interested Course</label>
                                        <select id="course" className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all appearance-none cursor-pointer">
                                            <option value="qaida">Qaida Basics</option>
                                            <option value="nazra">Nazra Practice</option>
                                            <option value="tajweed">Tajweed Essentials</option>
                                            <option value="advanced">Advanced Tajweed & Nazra</option>
                                            <option value="unsure">I'm not sure (Take the quiz first!)</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2" htmlFor="message">Any specific requirements?</label>
                                        <textarea
                                            id="message"
                                            rows={4}
                                            placeholder="e.g. I prefer evening classes for my 10-year-old son."
                                            className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none"
                                        />
                                    </div>
                                </div>

                                <button type="submit" className="w-full py-4 bg-accent text-accent-foreground rounded-xl font-bold text-lg hover:bg-accent/90 transition-transform hover:scale-[1.02] shadow-lg flex justify-center items-center gap-2">
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
