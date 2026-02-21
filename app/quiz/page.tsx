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
        <div className="flex flex-col items-center min-h-[80vh] justify-center py-20 px-4 bg-muted/20 overflow-hidden">

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
                            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-balance">
                                Start Small. Feel Confident.
                            </h1>
                            <p className="text-lg text-muted-foreground w-full md:w-3/4 mx-auto text-balance">
                                Not sure what Tajweed or Noon Sakin means? No problem.
                                Our beginner quizzes are designed to make learning simple, friendly, and stress-free.
                                You don&apos;t need prior knowledge — just curiosity.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => startQuiz(1)} className="glass p-8 rounded-2xl border hover:border-primary/50 text-left transition-colors hover:shadow-lg group bg-card">
                                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4 text-primary font-bold transition-transform group-hover:-translate-y-1">1</div>
                                <h3 className="font-bold text-xl mb-2 group-hover:text-primary transition-colors">Beginner Level</h3>
                                <p className="text-sm text-muted-foreground">Complete basics. No Arabic required.</p>
                            </motion.button>
                            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => startQuiz(2)} className="glass p-8 rounded-2xl border hover:border-primary/50 text-left transition-colors hover:shadow-lg group bg-card">
                                <div className="w-12 h-12 bg-secondary/80 rounded-full flex items-center justify-center mb-4 text-secondary-foreground font-bold transition-transform group-hover:-translate-y-1">2</div>
                                <h3 className="font-bold text-xl mb-2 group-hover:text-primary transition-colors">Intermediate Level</h3>
                                <p className="text-sm text-muted-foreground">First Arabic letters and basic rules.</p>
                            </motion.button>
                            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => startQuiz(3)} className="glass p-8 rounded-2xl border hover:border-primary/50 text-left transition-colors hover:shadow-lg group bg-card">
                                <div className="w-12 h-12 bg-accent/30 rounded-full flex items-center justify-center mb-4 text-accent-foreground font-bold transition-transform group-hover:-translate-y-1">3</div>
                                <h3 className="font-bold text-xl mb-2 group-hover:text-primary transition-colors">Advanced Tajweed</h3>
                                <p className="text-sm text-muted-foreground">Tajweed and articulation introduction.</p>
                            </motion.button>
                        </div>
                    </motion.div>
                ) : showResult ? (
                    <motion.div
                        key="result"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ type: "spring", stiffness: 200, damping: 20 }}
                        className="max-w-2xl w-full glass p-10 rounded-3xl text-center shadow-lg border-primary/20 bg-primary/5"
                    >
                        <motion.div
                            initial={{ rotate: -180, scale: 0 }}
                            animate={{ rotate: 0, scale: 1 }}
                            transition={{ delay: 0.2, type: "spring" }}
                        >
                            <Sparkles className="w-16 h-16 text-accent mx-auto mb-6" />
                        </motion.div>

                        <h2 className="text-3xl font-bold mb-4">Quiz Completed!</h2>
                        <p className="text-xl font-medium text-primary mb-2">You got {score} / {quizzes[level].questions.length} right!</p>
                        <p className="text-muted-foreground mb-8 text-lg">{quizzes[level].successMessage}</p>

                        <div className="bg-card p-6 rounded-2xl shadow-sm border border-border mt-8">
                            <h3 className="font-bold text-xl mb-3">Would you like a free assessment class to improve further?</h3>
                            <p className="text-sm text-muted-foreground mb-6">Let our expert teachers evaluate your level in 15 minutes.</p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link onClick={handleBookTrial} href="/contact" className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-full hover:bg-primary/90 transition-transform hover:scale-105 shadow-md">
                                    Book Free Trial
                                </Link>
                                <button onClick={() => setLevel(null)} className="px-8 py-3 bg-transparent border border-border font-medium rounded-full hover:bg-muted transition-colors">
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
                        className="max-w-2xl w-full glass p-8 md:p-12 rounded-3xl shadow-sm border-border"
                    >
                        <div className="flex justify-between items-center mb-8">
                            <span className="text-sm font-semibold tracking-wider text-muted-foreground uppercase">{quizzes[level].title}</span>
                            <span className="text-sm bg-primary/10 text-primary px-3 py-1 rounded-full font-medium">Question {currentQuestion + 1} of {quizzes[level].questions.length}</span>
                        </div>

                        <motion.h2
                            key={`q-${currentQuestion}`}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-2xl md:text-3xl font-bold mb-8"
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
                                    className="w-full text-left p-5 rounded-2xl border border-border bg-card hover:border-primary hover:bg-primary/5 transition-colors font-medium text-lg flex justify-between items-center group shadow-sm"
                                >
                                    {opt}
                                    <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
