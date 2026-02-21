import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";

const dataDir = path.join(process.cwd(), "data");

const blogs = [
    {
        id: uuidv4(),
        slug: "how-to-start-learning-the-quran",
        title: "How to Start Learning the Quran as a Beginner (Step-by-Step Guide)",
        excerpt: "Starting to learn the Quran can feel overwhelming if you don't speak Arabic. Here is a simple step-by-step guide to begin your Quran journey with confidence.",
        date: new Date("2026-02-20T00:00:00Z").toISOString(),
        readTime: "4 min read",
        tag: "Beginners",
        published: true,
        content: "# How to Start Learning the Quran as a Beginner\n\nStarting to learn the Quran can feel overwhelming if you don't speak Arabic. Here is a simple step-by-step guide to begin your Quran journey with confidence.\n\n## 1. Start with the Qaida\nThe foundational book for learning Arabic letters and pronunciation. This is step one for anyone who does not know how to read the Arabic alphabet.\n\n## 2. Be Consistent\n15 minutes every day is better than 2 hours once a week. Building a habit is key to learning any language, especially the language of the Quran.\n\n## 3. Find a Teacher\nA qualified teacher will correct your mistakes and guide your pronunciation. Self-learning can lead to engrained errors that are hard to undo later."
    },
    {
        id: uuidv4(),
        slug: "what-is-tajweed",
        title: "What Is Tajweed? A Simple Explanation for Beginners",
        excerpt: "Many people hear the word Tajweed and feel intimidated. Let's make it simple. Tajweed means giving every letter of the Quran its proper right.",
        date: new Date("2026-02-15T00:00:00Z").toISOString(),
        readTime: "3 min read",
        tag: "Tajweed",
        published: true,
        content: "# What Is Tajweed?\n\nMany people hear the word Tajweed and feel intimidated. Let's make it simple. Tajweed means giving every letter of the Quran its proper right.\n\n## The Meaning of Tajweed\nLinguistically, Tajweed means 'doing something well' or 'proficiency'. It comes from the root word 'Jawwada'.\n\n## Why is it important?\nReading the Quran with Tajweed ensures we don't change the meaning of the words of Allah due to incorrect pronunciation. For example, a heavy 'T' sound versus a light 'T' sound can change a word completely in Arabic."
    },
    {
        id: uuidv4(),
        slug: "benefits-of-learning-quran-online-for-kids",
        title: "Benefits of Learning Quran Online for Kids",
        excerpt: "Online Quran classes are becoming popular. Discover why parents prefer flexible, one-to-one online learning for their children's islamic education.",
        date: new Date("2026-02-10T00:00:00Z").toISOString(),
        readTime: "5 min read",
        tag: "Parents & Kids",
        published: true,
        content: "# Benefits of Learning Quran Online for Kids\n\nOnline Quran classes are becoming popular. Discover why parents prefer flexible, one-to-one online learning for their children's islamic education.\n\n## 1. Safety and Comfort\nKids learn from the comfort of their homes. This eliminates commute time and allows parents to directly monitor their children's education.\n\n## 2. Flexible Scheduling\nFit classes around school and other activities. With online classes, you are not bound by the fixed times of a local madrasah.\n\n## 3. Dedicated Attention\nOne-on-one sessions mean the teacher is focused 100% on your child's progress, customizing the pace to match their learning speed."
    }
];

fs.writeFileSync(path.join(dataDir, "blogs.json"), JSON.stringify(blogs, null, 2));

console.log("Seeded blogs to local file DB!");
