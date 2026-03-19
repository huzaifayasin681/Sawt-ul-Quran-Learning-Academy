"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, ChevronRight, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function QuizPage() {
    const [level, setLevel] = useState<1 | 2 | 3 | null>(null);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);

    const quizzes = {
        1: {
            title: "Super Beginner",
            desc: "No Arabic knowledge required",
            questions: [
                { q: "What is the Quran?", options: ["A history book", "A holy book revealed to Prophet Muhammad ﷺ", "A story book", "A poem"], correct: 1 },
                { q: "In which language was the Quran revealed?", options: ["English", "Urdu", "Arabic", "Persian"], correct: 2 },
                { q: "How many chapters (Surahs) are in the Quran?", options: ["30", "114", "99", "7"], correct: 1 },
            ],
            successMessage: "See? Easy wins. You're building your foundation."
        },
        2: {
            title: "First Arabic Steps",
            desc: "Basic letter knowledge",
            questions: [
                { q: "How many letters are in the Arabic alphabet?", options: ["20", "26", "28", "30"], correct: 2 },
                { q: "What is “Harakat”?", options: ["Arabic food", "Small symbols that help you pronounce letters", "A surah", "A teacher"], correct: 1 },
                { q: "Which one is an Arabic letter?", options: ["A", "ب (Baa)", "Z", "1"], correct: 1 },
            ],
            successMessage: "Great job! Every expert started right here."
        },
        3: {
            title: "Soft Tajweed Intro",
            desc: "For those familiar with reading",
            questions: [
                { q: "Why do we learn Tajweed?", options: ["To read faster", "To make recitation more accurate and beautiful", "To memorize quicker", "To finish the Quran quickly"], correct: 1 },
                { q: "Tajweed helps us…", options: ["Change the Quran", "Recite it correctly", "Translate it", "Rewrite it"], correct: 1 },
            ],
            successMessage: "Excellent! Beautiful recitation begins with small steps."
        },
    };

    const handleAnswer = (selectedIndex: number) => {
        if (level === null) return;
        const isCorrect = selectedIndex === quizzes[level].questions[currentQuestion].correct;
        if (isCorrect) setScore(score + 1);

        if (currentQuestion + 1 < quizzes[level].questions.length) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            setShowResult(true);
        }
    };

    const startQuiz = (lvl: 1 | 2 | 3) => {
        setLevel(lvl);
        setCurrentQuestion(0);
        setScore(0);
        setShowResult(false);
    };

    const handleBookTrial = async () => {
        // Send background lead containing quiz results
        try {
            await fetch("/api/leads", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: "Quiz User", // Placeholder until contact form
                    email: "quiz_lead@noorulquran.app", // Placeholder
                    source: "quiz",
                    details: {
                        quizLevel: level ? quizzes[level].title : "Unknown",
                        score: score,
                        total: level ? quizzes[level].questions.length : 0
                    }
                })
            });
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="flex flex-col items-center min-h-[80vh] justify-center overflow-hidden" style={{ padding: 'clamp(5rem, 10vw, 8rem) clamp(1.5rem, 5vw, 5rem)', background: '#060A09' }}>

            <AnimatePresence mode="wait">
                {!level ? (
                    <motion.div
                        key="home"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4 }}
                        className="max-w-3xl w-full text-center space-y-8"
                    >
                        <div className="mb-12">
                            <h1 className="text-balance mb-4" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, color: '#EEE8D5', letterSpacing: '-0.01em' }}>
                                Start Small. Feel Confident.
                            </h1>
                            <p className="w-full md:w-3/4 mx-auto text-balance" style={{ fontSize: '1.125rem', color: '#A8B8B0', lineHeight: 1.75, fontFamily: "'DM Sans', sans-serif" }}>
                                Not sure what Tajweed or Noon Sakin means? No problem.
                                Our beginner quizzes are designed to make learning simple, friendly, and stress-free.
                                You don&apos;t need prior knowledge — just curiosity.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => startQuiz(1)} className="p-8 text-left transition-all group card-accent-top" style={{ borderRadius: '20px', background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.07)' }}>
                                <div className="icon-container mb-4 transition-transform group-hover:-translate-y-1" style={{ fontWeight: 600 }}>1</div>
                                <h3 style={{ fontSize: '1.25rem', fontFamily: "'DM Sans', sans-serif", fontWeight: 500, color: '#EEE8D5' }} className="mb-2">Beginner Level</h3>
                                <p style={{ fontSize: '0.875rem', color: '#A8B8B0', fontFamily: "'DM Sans', sans-serif" }}>Complete basics. No Arabic required.</p>
                            </motion.button>
                            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => startQuiz(2)} className="p-8 text-left transition-all group card-accent-top" style={{ borderRadius: '20px', background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.07)' }}>
                                <div className="icon-container mb-4 transition-transform group-hover:-translate-y-1" style={{ fontWeight: 600 }}>2</div>
                                <h3 style={{ fontSize: '1.25rem', fontFamily: "'DM Sans', sans-serif", fontWeight: 500, color: '#EEE8D5' }} className="mb-2">Intermediate Level</h3>
                                <p style={{ fontSize: '0.875rem', color: '#A8B8B0', fontFamily: "'DM Sans', sans-serif" }}>First Arabic letters and basic rules.</p>
                            </motion.button>
                            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => startQuiz(3)} className="p-8 text-left transition-all group card-accent-top" style={{ borderRadius: '20px', background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.07)' }}>
                                <div className="icon-container mb-4 transition-transform group-hover:-translate-y-1" style={{ fontWeight: 600 }}>3</div>
                                <h3 style={{ fontSize: '1.25rem', fontFamily: "'DM Sans', sans-serif", fontWeight: 500, color: '#EEE8D5' }} className="mb-2">Advanced Tajweed</h3>
                                <p style={{ fontSize: '0.875rem', color: '#A8B8B0', fontFamily: "'DM Sans', sans-serif" }}>Tajweed and articulation introduction.</p>
                            </motion.button>
                        </div>
                    </motion.div>
                ) : showResult ? (
                    <motion.div
                        key="result"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ type: "spring", stiffness: 200, damping: 20 }}
                        className="max-w-2xl w-full p-10 text-center"
                        style={{ borderRadius: '24px', background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(20px)', border: '1px solid rgba(201,168,76,0.25)' }}
                    >
                        <motion.div
                            initial={{ rotate: -180, scale: 0 }}
                            animate={{ rotate: 0, scale: 1 }}
                            transition={{ delay: 0.2, type: "spring" }}
                        >
                            <Sparkles className="w-16 h-16 mx-auto mb-6" style={{ color: '#C9A84C' }} />
                        </motion.div>

                        <h2 style={{ fontSize: '1.875rem', fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, color: '#EEE8D5' }} className="mb-4">Quiz Completed!</h2>
                        <p style={{ fontSize: '1.25rem', fontWeight: 500, color: '#C9A84C', fontFamily: "'DM Sans', sans-serif" }} className="mb-2">You got {score} / {quizzes[level].questions.length} right!</p>
                        <p style={{ color: '#A8B8B0', fontSize: '1.125rem', fontFamily: "'DM Sans', sans-serif" }} className="mb-8">{quizzes[level].successMessage}</p>

                        <div className="p-6 mt-8" style={{ borderRadius: '16px', background: '#0D1612', border: '1px solid rgba(255,255,255,0.07)' }}>
                            <h3 style={{ fontSize: '1.25rem', fontFamily: "'DM Sans', sans-serif", fontWeight: 500, color: '#EEE8D5' }} className="mb-3">Would you like a free assessment class to improve further?</h3>
                            <p style={{ fontSize: '0.875rem', color: '#A8B8B0', fontFamily: "'DM Sans', sans-serif" }} className="mb-6">Let our expert teachers evaluate your level in 15 minutes.</p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link onClick={handleBookTrial} href="/contact" className="rounded-full btn-glow hover:scale-105 transition-all" style={{ padding: '0.7rem 1.8rem', background: '#C9A84C', color: '#060A09', fontWeight: 600, fontFamily: "'DM Sans', sans-serif" }}>
                                    Book Free Trial
                                </Link>
                                <button onClick={() => setLevel(null)} className="rounded-full transition-colors" style={{ padding: '0.7rem 1.8rem', border: '1px solid rgba(255,255,255,0.07)', color: '#A8B8B0', fontWeight: 500, fontFamily: "'DM Sans', sans-serif" }}>
                                    Back to Quizzes
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="question"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ type: "tween", ease: "easeInOut", duration: 0.3 }}
                        className="max-w-2xl w-full p-8 md:p-12"
                        style={{ borderRadius: '24px', background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.07)' }}
                    >
                        <div className="flex justify-between items-center mb-8">
                            <span className="eyebrow">{quizzes[level].title}</span>
                            <span className="badge-gold">Question {currentQuestion + 1} of {quizzes[level].questions.length}</span>
                        </div>

                        <motion.h2
                            key={`q-${currentQuestion}`}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-8"
                            style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, color: '#EEE8D5' }}
                        >
                            {quizzes[level].questions[currentQuestion].q}
                        </motion.h2>

                        <div className="space-y-4">
                            {quizzes[level].questions[currentQuestion].options.map((opt, i) => (
                                <motion.button
                                    key={i}
                                    whileHover={{ scale: 1.02, x: 5 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => handleAnswer(i)}
                                    className="w-full text-left p-5 transition-colors flex justify-between items-center group"
                                    style={{ borderRadius: '16px', border: '1px solid rgba(255,255,255,0.07)', background: '#0D1612', fontWeight: 500, fontSize: '1rem', fontFamily: "'DM Sans', sans-serif", color: '#EEE8D5' }}
                                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(201,168,76,0.4)' }}
                                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)' }}
                                >
                                    {opt}
                                    <ChevronRight className="w-5 h-5 transition-colors" style={{ color: '#A8B8B0' }} />
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
