"use client";

import Link from "next/link";
import { ChevronRight, Star, PlayCircle, BookOpen, GraduationCap, Users, Video } from "lucide-react";
import { motion, Variants, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Teacher } from "@/lib/db";

const fadeUpText: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const cardVariant: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const TypewriterText = ({ text, className }: { text: string, className?: string }) => {
  return (
    <motion.span
      className={className}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: 0.04, delayChildren: 0.3 }
        }
      }}
    >
      {text.split("").map((char, i) => (
        <motion.span key={i} variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}>
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
};

export default function Home() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/teachers")
      .then(res => res.json())
      .then((data: Teacher[]) => {
        setTeachers(data.filter(t => t.isActive));
      })
      .catch(console.error);
  }, []);

  const testimonials = [
    { text: "My kids used to find Quran class boring, but now they are excited every day. Ibrahim's team is so engaging.", author: "Mother of 2 (UK)", rating: 5 },
    { text: "Starting from zero as an adult convert was intimidating, but they made Tajweed easy to understand without pressure.", author: "Newbie Adult Learner (US)", rating: 5 },
    { text: "The deep error correction in the advanced Tajweed level completely transformed my recitation fluency.", author: "Advanced Student (Canada)", rating: 5 },
    { text: "I love how the teachers focus on pronunciation. Best decision I made for my islamic studies.", author: "University Student (Australia)", rating: 5 },
  ];
  return (
    <div className="flex flex-col items-center overflow-hidden">
      {/* Hero Section */}
      <section className="relative w-full py-20 md:py-32 flex flex-col items-center text-center px-4">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] md:w-[800px] h-[300px] md:h-[400px] bg-primary/20 blur-[100px] md:blur-[120px] rounded-full pointer-events-none" />

        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="relative z-10 max-w-4xl mx-auto space-y-8"
        >
          <motion.div variants={fadeUpText} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-sm font-medium mb-4 ring-1 ring-primary/20">
            <Star className="h-4 w-4 text-accent" />
            <span>Trusted by parents & students worldwide</span>
          </motion.div>

          <motion.h1 variants={fadeUpText} className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-balance leading-tight">
            From <span className="text-primary italic font-serif">Qaida</span> to <span className="text-primary italic font-serif">Quran</span>,<br />
            <TypewriterText text="step-by-step with proper guidance." />
          </motion.h1>

          <motion.p variants={fadeUpText} className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
            Online Quran classes for kids and adults. Structured courses, qualified teachers, personal feedback, and a learning system built on tradition and excellence.
          </motion.p>

          <motion.div variants={fadeUpText} className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/contact"
              className="w-full sm:w-auto px-8 py-4 bg-primary text-primary-foreground hover:bg-primary/90 rounded-full font-semibold text-lg flex items-center justify-center gap-2 transition-all hover:scale-105 shadow-xl shadow-primary/20"
            >
              Free Trial Class
              <ChevronRight className="h-5 w-5" />
            </Link>
            <Link
              href="/courses"
              className="w-full sm:w-auto px-8 py-4 bg-card text-card-foreground border border-border hover:bg-muted rounded-full font-semibold text-lg flex items-center justify-center gap-2 transition-colors hover:scale-105"
            >
              Explore Courses
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Testimonials Banner */}
      <section className="w-full bg-secondary/30 border-y border-border py-16 px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="container mx-auto"
        >
          <motion.div variants={fadeUpText} className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-4 text-balance">Real Results, Real Trust</h2>
            <p className="text-muted-foreground">Hear from our students and parents.</p>
          </motion.div>
          <div className="relative flex overflow-x-hidden w-full max-w-6xl mx-auto py-8">
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-secondary/30 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-secondary/30 to-transparent z-10 pointer-events-none" />

            <motion.div
              className="flex gap-8 whitespace-nowrap px-4"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
            >
              {[...testimonials, ...testimonials].map((testimonial, i) => (
                <div
                  key={i}
                  className="glass p-6 rounded-2xl flex flex-col gap-4 relative overflow-hidden group hover:border-primary/50 transition-colors shadow-sm w-[350px] shrink-0 whitespace-normal"
                >
                  <div className="flex gap-1">
                    {[...Array(testimonial.rating)].map((_, j) => (
                      <Star key={j} className="h-4 w-4 fill-accent text-accent" />
                    ))}
                  </div>
                  <p className="text-foreground flex-1 italic text-sm md:text-base leading-relaxed">"{testimonial.text}"</p>
                  <div className="font-semibold text-sm text-primary">{testimonial.author}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Quick Courses Preview */}
      <section className="w-full py-24 px-4 bg-background overflow-hidden">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="container mx-auto max-w-6xl"
        >
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <motion.div variants={fadeUpText} className="flex-1 space-y-6">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-balance">
                Structured Learning for All Ages
              </h2>
              <p className="text-lg text-muted-foreground">
                Whether you are a complete beginner looking to recognize Arabic letters, or an advanced student perfecting your Makharij, we have a specialized path.
              </p>

              <ul className="space-y-4">
                <li className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary mt-1"><BookOpen className="w-5 h-5" /></div>
                  <div>
                    <h3 className="font-bold">Qaida Basics</h3>
                    <p className="text-sm text-muted-foreground">Start from zero with Arabic letters and Harakat.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary mt-1"><PlayCircle className="w-5 h-5" /></div>
                  <div>
                    <h3 className="font-bold">Nazra Practice</h3>
                    <p className="text-sm text-muted-foreground">Build fluency, reading speed, and correct mistakes.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary mt-1"><GraduationCap className="w-5 h-5" /></div>
                  <div>
                    <h3 className="font-bold">Tajweed & Advanced</h3>
                    <p className="text-sm text-muted-foreground">Master the articulation points and beautiful recitation rules.</p>
                  </div>
                </li>
              </ul>

              <Link href="/courses" className="inline-flex items-center gap-2 font-semibold text-primary hover:text-primary/80 transition-colors group">
                View detailed curriculum <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

            <motion.div
              variants={fadeUpText}
              className="flex-1 w-full bg-secondary/50 rounded-3xl p-8 border border-border relative"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none" />
              <div className="grid grid-cols-2 gap-4 relative z-10">
                <div className="space-y-4 pt-12">
                  <motion.div whileHover={{ scale: 1.05 }} className="bg-card p-6 rounded-2xl shadow-md border border-border">
                    <h4 className="font-bold mb-2 text-xl"> Kids </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">Fun, interactive, and engaging sessions with high motivation.</p>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} className="bg-primary text-primary-foreground p-6 rounded-2xl shadow-md">
                    <h4 className="font-bold mb-2 text-xl"> Teens </h4>
                    <p className="text-sm text-primary-foreground/80 leading-relaxed">Guidance and mentorship along with confident reading.</p>
                  </motion.div>
                </div>
                <div className="space-y-4">
                  <motion.div whileHover={{ scale: 1.05 }} className="bg-card p-6 rounded-2xl shadow-md border border-border">
                    <h4 className="font-bold mb-2 text-xl"> Adults </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">Flexible evening slots, zero-pressure environment.</p>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} className="bg-accent/10 p-6 rounded-2xl border border-accent/20">
                    <Users className="w-8 h-8 text-accent mb-4" />
                    <h4 className="font-bold mb-2">1-to-1 & Group</h4>
                    <p className="text-xs text-muted-foreground">Choose your preferred class style and teacher gender.</p>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* About Ibrahim Section */}
      <section className="w-full py-24 px-4 bg-secondary/30 border-y border-border">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="container mx-auto max-w-5xl text-center space-y-12"
        >
          <motion.div variants={fadeUpText} className="space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">About Ibrahim</h2>
            <p className="text-primary font-serif italic text-xl">Certified with Ijazah from Masjid Nabawi</p>
          </motion.div>

          <motion.div variants={fadeUpText} className="text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto space-y-6">
            <p>
              I am honored to hold an Ijazah (a high-level teaching certification) directly connected to scholars of Masjid al-Nabawi in Madinah. This means my teaching is rooted in authentic tradition, precision, and responsibility.
            </p>
            <p>
              For the past 8 years, I have taught students of all ages across different countries through online classes. From young children learning their first letters to adults improving their Tajweed, I have helped students strengthen both their recitation and their love for the Quran.
            </p>
            <p className="font-medium text-foreground">
              We believe learning the Quran should never feel heavy or boring. We break complex Tajweed rules into easy, practical steps.
            </p>
          </motion.div>

          <motion.div variants={fadeUpText} className="flex justify-center">
            <Link href="/contact" className="px-8 py-4 bg-foreground text-background hover:bg-foreground/90 rounded-full font-semibold transition-transform hover:scale-105 shadow-xl">
              Start Learning Today
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Teachers Section */}
      <section className="w-full py-24 px-4 bg-background">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="container mx-auto max-w-6xl"
        >
          <motion.div variants={fadeUpText} className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Our Dedicated Teachers</h2>
            <p className="text-muted-foreground text-lg">Learn from highly qualified instructors who are passionate about the Quran.</p>
          </motion.div>

          {teachers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {teachers.map((teacher, index) => (
                <motion.div
                  key={teacher.id || index}
                  variants={cardVariant}
                  whileHover={{ y: -5 }}
                  className="glass p-6 rounded-3xl border border-border space-y-4 hover:border-primary/50 transition-colors shadow-md relative overflow-hidden group"
                >
                  <div className="w-24 h-24 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4 overflow-hidden border-2 border-primary/20">
                    {teacher.imagePath ? (
                      <img src={teacher.imagePath} alt={teacher.name} className="w-full h-full object-cover" />
                    ) : (
                      <Users className="w-10 h-10 text-primary" />
                    )}
                  </div>
                  <div className="text-center">
                    <h3 className="text-xl font-bold">{teacher.name}</h3>
                    <p className="text-primary text-sm font-semibold mb-3">{teacher.role}</p>
                    <p className="text-muted-foreground text-sm line-clamp-3 mb-4">{teacher.bio}</p>
                    <Link href={`/teachers/${teacher.id}`} className="inline-block mt-2 font-semibold text-primary hover:text-primary/80 transition-colors group">
                      View Full Profile <ChevronRight className="inline w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>

                  {teacher.videoPath && (
                    <div className="pt-4 border-t border-border mt-4">
                      {teacher.videoPath.includes("youtube.com") || teacher.videoPath.includes("youtu.be") ? (
                        <Link href={teacher.videoPath} target="_blank" className="flex items-center justify-center gap-2 w-full py-2.5 bg-secondary text-secondary-foreground rounded-xl text-sm font-semibold hover:bg-secondary/80 transition-colors">
                          <Video className="w-4 h-4" /> Watch Intro
                        </Link>
                      ) : (
                        <button onClick={() => setActiveVideo(teacher.videoPath as string)} className="flex items-center justify-center gap-2 w-full py-2.5 bg-primary/10 text-primary rounded-xl text-sm font-semibold hover:bg-primary/20 transition-colors">
                          <PlayCircle className="w-4 h-4" /> Play Intro Video
                        </button>
                      )}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Fallback Static Cards */}
              <motion.div variants={cardVariant} className="glass p-8 rounded-3xl border border-border text-center space-y-4 shadow-md">
                <div className="w-24 h-24 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-6">
                  <Users className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-2xl font-bold">Male Teachers</h3>
                <p className="text-muted-foreground">Expert Qaris available for brothers and young boys. Focus on strong Arabic articulation.</p>
              </motion.div>
              <motion.div variants={cardVariant} className="glass p-8 rounded-3xl border border-border text-center space-y-4 shadow-md">
                <div className="w-24 h-24 mx-auto bg-secondary/80 rounded-full flex items-center justify-center mb-6">
                  <Users className="w-10 h-10 text-secondary-foreground" />
                </div>
                <h3 className="text-2xl font-bold">Female Teachers</h3>
                <p className="text-muted-foreground">Qualified female instructors for sisters and young girls, providing a supportive environment.</p>
              </motion.div>
            </div>
          )}
        </motion.div>
      </section>

      {/* Video Modal */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/90 backdrop-blur-sm"
            onClick={() => setActiveVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }}
              className="w-full max-w-4xl bg-black rounded-2xl overflow-hidden shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button onClick={() => setActiveVideo(null)} className="absolute top-4 right-4 z-10 w-8 h-8 bg-black/50 hover:bg-black text-white rounded-full flex items-center justify-center transition-colors">✕</button>
              <video src={activeVideo} className="w-full aspect-video outline-none" controls autoPlay />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Final CTA Section */}
      <section className="w-full py-24 px-4 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-background/10 blur-[100px] rounded-full pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="container mx-auto max-w-4xl text-center space-y-8 relative z-10"
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Ready to Improve Your Recitation?</h2>
          <p className="text-primary-foreground/90 text-lg md:text-xl">
            Join structured online Quran classes with qualified teachers. Book your free trial session today and start learning with confidence.
          </p>
          <div className="flex justify-center pt-8">
            <Link href="/contact" className="px-10 py-5 bg-background text-foreground hover:bg-muted/90 rounded-full font-bold text-lg transition-transform hover:scale-110 shadow-xl">
              Book Your Free Trial
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
