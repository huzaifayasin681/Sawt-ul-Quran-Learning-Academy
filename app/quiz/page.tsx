"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, ChevronRight, Sparkles, BookOpen, Brain, Trophy, ArrowRight, Play, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function QuizPage() {
    const [level, setLevel] = useState<1 | 2 | 3 | null>(null);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);

    const quizzes = {
        1: {
            title: "Basics",
            desc: "Start your journey with fundamental knowledge",
            icon: BookOpen,
            questions: [
                { q: "Which book was sent by Allah as a special guide for all of us?", options: ["A Storybook", "The Holy Quran", "A Science Book"], correct: 1 },
                { q: "Every chapter in the Quran starts with a beautiful phrase. Do you know what we say before we start reading?", options: ["Bismillah (In the name of Allah)", "Alhamdulillah (Praise be to Allah)", "SubhanAllah (Glory be to Allah)"], correct: 0 },
                { q: "The Quran tells us amazing stories about many people. Do you know who the very first Prophet was?", options: ["Prophet Nuh (AS)", "Prophet Adam (AS)", "Prophet Musa (AS)"], correct: 1 },
            ],
            successMessage: "See? Easy wins. You're building your foundation."
        },
        2: {
            title: "Intermediate",
            desc: "Explore the beautiful rules of recitation",
            icon: Brain,
            questions: [
                { q: "When we see a small 'Meem' (م) on top of a letter, it tells us to make a special sound. What do we call the rules that help us recite the Quran perfectly?", options: ["Grammar", "Tajweed", "Translation"], correct: 1 },
                { q: "Some letters in the Quran are 'Bouncy Letters.' When they have a Sukoon, we make them echo! Do you know the name for this 'Bouncing' rule?", options: ["Madd (Stretching)", "Ghunnah (Nasal sound)", "Qalqalah (Echoing)"], correct: 2 },
                { q: "In the Quran, when we see a long wavy line (~) over a letter, it’s like a 'Stretch Sign.' What does this sign tell us to do?", options: ["Hold the sound longer (Madd)", "Stop reading immediately", "Skip the letter"], correct: 0 },
            ],
            successMessage: "Great job! Every expert started right here."
        },
        3: {
            title: "Advanced",
            desc: "Master the art of perfect Tajweed",
            icon: Trophy,
            questions: [
                { q: "When a 'Noon Sakinah' or 'Tanween' is followed by one of the 'Yarmaloon' (يرملون) letters, we blend them together like a smooth wave. What is this rule called?", options: ["Izhar (Clearing)", "Idgham (Merging)", "Iqlab (Changing)"], correct: 1 },
                { q: "There are 5 special letters that 'Echo' when they have a Sukoon (ق ط ب ج د). What is the catchy nickname we use to remember them all at once?", options: ["Ahruf-ul-Madd", "Qutub-i-Jaddin", "Huroof-ul-Halqi"], correct: 1 },
                { q: "In Tajweed, some letters are pronounced 'Heavy' (Full-mouth) and some are 'Light.' Which of these letters always sounds thick and heavy?", options: ["Letter Seen (س)", "Letter Kha (خ)", "Letter Ba (ب)"], correct: 1 },
            ],
            successMessage: "Excellent! Beautiful recitation begins with mastery of these rules."
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
        try {
            await fetch("/api/leads", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: "Quiz User",
                    email: "quiz_lead@sawtulquran.app",
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
        <div className="flex flex-col items-center min-h-screen justify-center overflow-hidden bg-background relative" style={{ padding: 'clamp(5rem, 10vw, 8rem) clamp(1.5rem, 5vw, 5rem)' }}>

            {/* Ambient Background Glows */}
            <div className="absolute top-[20%] left-[10%] w-[500px] h-[500px] blur-[150px] rounded-full pointer-events-none opacity-[0.05]" style={{ background: 'var(--primary)' }} />
            <div className="absolute bottom-[20%] right-[10%] w-[400px] h-[400px] blur-[120px] rounded-full pointer-events-none opacity-[0.05]" style={{ background: 'var(--primary)' }} />

            <AnimatePresence mode="wait">
                {!level ? (
                    <motion.div
                        key="home"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="max-w-4xl w-full text-center space-y-12 relative z-10"
                    >
                        <div className="space-y-6">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.2 }}
                                className="badge-gold inline-flex items-center gap-2 mx-auto"
                            >
                                Quick Assessment
                            </motion.div>
                            <h1 className="text-balance mx-auto max-w-2xl" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontFamily: "var(--font-heading)", fontWeight: 300, color: 'var(--foreground)', letterSpacing: '-0.01em', lineHeight: 1.15 }}>
                                Discover Your <span className="italic" style={{ color: 'var(--primary)' }}>Quranic Path</span>
                            </h1>
                            <p className="w-full md:w-2/3 mx-auto text-muted-foreground text-lg" style={{ fontFamily: "var(--font-body)", lineHeight: 1.8 }}>
                                Take a 2-minute friendly quiz to see where you stand. No pressure, just a step towards your spiritual growth.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {(Object.keys(quizzes) as unknown as Array<1 | 2 | 3>).map((lvl) => (
                                <motion.button
                                    key={lvl}
                                    whileHover={{ y: -8, scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => startQuiz(lvl)}
                                    className="p-8 text-left transition-all group card-accent-top glass border-primary/10 relative overflow-hidden"
                                    style={{ borderRadius: '24px', background: 'var(--card)' }}
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500 group-hover:scale-110 group-hover:bg-primary/20" style={{ background: 'var(--color-gold-glow)' }}>
                                        {(() => {
                                            const Icon = quizzes[lvl].icon;
                                            return <Icon className="w-6 h-6" style={{ color: 'var(--primary)' }} />;
                                        })()}
                                    </div>
                                    <h3 style={{ fontSize: '1.25rem', fontFamily: "var(--font-body)", fontWeight: 700, color: 'var(--foreground)' }} className="mb-2">{quizzes[lvl].title}</h3>
                                    <p style={{ fontSize: '0.875rem', color: 'var(--muted-foreground)', fontFamily: "var(--font-body)" }}>{quizzes[lvl].desc}</p>

                                    <div className="mt-8 flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all">
                                        Start Quiz <Play className="w-3 h-3 fill-primary" />
                                    </div>
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>
                ) : showResult ? (
                    <motion.div
                        key="result"
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
                        className="max-w-2xl w-full p-12 text-center glass relative overflow-hidden"
                        style={{ borderRadius: '32px', border: '1px solid var(--color-border-accent)', background: 'var(--card)' }}
                    >
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                            className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-8 border border-primary/20"
                        >
                            <Sparkles className="w-12 h-12" style={{ color: 'var(--primary)' }} />
                        </motion.div>

                        <h2 style={{ fontSize: '2.5rem', fontFamily: "var(--font-heading)", fontWeight: 300, color: 'var(--foreground)' }} className="mb-4">Quiz Completed!</h2>

                        <div className="flex justify-center items-baseline gap-2 mb-2">
                            <span style={{ fontSize: '3.5rem', fontWeight: 700, color: 'var(--primary)' }}>{score}</span>
                            <span style={{ fontSize: '1.5rem', color: 'var(--muted-foreground)' }}>/ {quizzes[level].questions.length}</span>
                        </div>

                        <p style={{ color: 'var(--muted-foreground)', fontSize: '1.125rem', fontFamily: "var(--font-body)", lineHeight: 1.8 }} className="mb-10 max-w-md mx-auto">
                            {quizzes[level].successMessage}
                        </p>

                        <div className="p-8 space-y-8" style={{ borderRadius: '24px', background: 'var(--secondary)', border: '1px solid var(--color-border-subtle)' }}>
                            <div className="space-y-2">
                                <h3 style={{ fontSize: '1.25rem', fontFamily: "var(--font-body)", fontWeight: 700, color: 'var(--foreground)' }}>Ready for the next step?</h3>
                                <p style={{ fontSize: '0.95rem', color: 'var(--muted-foreground)' }}>Get a personalized learning plan with our 15-minute consultation.</p>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link onClick={handleBookTrial} href="/contact" className="rounded-full btn-glow hover:scale-105 transition-all w-full sm:w-auto flex items-center justify-center gap-2" style={{ padding: '1rem 2.5rem', background: 'var(--primary)', color: 'var(--primary-foreground)', fontWeight: 700, fontSize: '1rem' }}>
                                    Book Free Trial <ArrowRight className="w-4 h-4" />
                                </Link>
                                <button onClick={() => setLevel(null)} className="rounded-full transition-all w-full sm:w-auto border border-primary/20 hover:bg-primary/5" style={{ padding: '1rem 2.5rem', color: 'var(--foreground)', fontWeight: 600 }}>
                                    Try Another Quiz
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
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="max-w-2xl w-full p-8 md:p-12 glass relative"
                        style={{ borderRadius: '32px', border: '1px solid var(--color-border-subtle)', background: 'var(--card)' }}
                    >
                        {/* Progress line */}
                        <div className="absolute top-0 left-0 right-0 h-1.5 overflow-hidden rounded-t-[32px]">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${((currentQuestion) / quizzes[level].questions.length) * 100}%` }}
                                className="h-full bg-primary"
                                transition={{ duration: 0.5 }}
                            />
                        </div>

                        <div className="flex justify-between items-center mb-10 pt-4">
                            <div className="flex items-center gap-3">
                                {(() => {
                                    const Icon = quizzes[level].icon;
                                    return <Icon className="w-5 h-5" style={{ color: 'var(--primary)' }} />;
                                })()}
                                <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{quizzes[level].title}</span>
                            </div>
                            <span className="badge-gold">Q{currentQuestion + 1} of {quizzes[level].questions.length}</span>
                        </div>

                        <motion.h2
                            key={`q-${currentQuestion}`}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-10"
                            style={{ fontSize: 'clamp(1.75rem, 3vw, 2.25rem)', fontFamily: "var(--font-heading)", fontWeight: 300, color: 'var(--foreground)', lineHeight: 1.3 }}
                        >
                            {quizzes[level].questions[currentQuestion].q}
                        </motion.h2>

                        <div className="space-y-4">
                            {quizzes[level].questions[currentQuestion].options.map((opt, i) => (
                                <motion.button
                                    key={i}
                                    whileHover={{ x: 8, background: 'var(--secondary)' }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => handleAnswer(i)}
                                    className="w-full text-left p-6 transition-all flex justify-between items-center group relative overflow-hidden"
                                    style={{ borderRadius: '20px', border: '1px solid var(--color-border-subtle)', background: 'transparent', fontWeight: 600, fontSize: '1.05rem', fontFamily: "var(--font-body)", color: 'var(--foreground)' }}
                                >
                                    <span className="relative z-10">{opt}</span>
                                    <ChevronRight className="w-5 h-5 relative z-10 transition-transform group-hover:translate-x-1" style={{ color: 'var(--primary)' }} />

                                    {/* Number indicator hidden by default */}
                                    <div className="absolute -right-2 -bottom-2 text-primary/[0.03] text-6xl font-black select-none pointer-events-none">
                                        {i + 1}
                                    </div>
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
