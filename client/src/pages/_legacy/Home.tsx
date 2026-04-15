import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageTransition } from "@/components/PageTransition";
import { ScrollReveal, Stagger, StaggerItem } from "@/components/ScrollReveal";
import { Link } from "wouter";
import {
  Heart,
  Activity,
  CloudSun,
  Utensils,
  ChevronRight,
  Zap,
  Users,
  Folder,
  Brain,
  GraduationCap,
  BookOpen,
  Target,
  BarChart3,
  ArrowRight,
} from "lucide-react";
import { useState, useEffect } from "react";
import { heroSlides } from "@/config/marketingAssets";
import { motion, AnimatePresence } from "framer-motion";
import { ImageSlider } from "@/components/ImageSlider";

const TESTIMONIAL_ROTATION_INTERVAL = 6000;

const managementFeatures = [
  {
    icon: Heart,
    title: "Health Records",
    description:
      "Vaccinations, vet visits, farrier appointments, and treatments — all logged with smart reminders so nothing is missed.",
  },
  {
    icon: Activity,
    title: "Training Logs",
    description:
      "Log every session with customisable templates. Track performance trends, competition results, and progress over time.",
  },
  {
    icon: Utensils,
    title: "Nutrition Plans",
    description:
      "Build individual feeding programmes per horse, track costs, and ensure consistent care regardless of who's on duty.",
  },
  {
    icon: Folder,
    title: "Document Storage",
    description:
      "Passports, insurance, invoices, and competition records — organised in folders, accessible anywhere.",
  },
  {
    icon: CloudSun,
    title: "Weather & Riding",
    description:
      "Real-time weather with riding suitability advice. Know before you tack up whether conditions are safe.",
  },
  {
    icon: BarChart3,
    title: "Insights & Reports",
    description:
      "Visual dashboards for health timelines, expense tracking, and training analytics across your whole stable.",
  },
];

const learningFeatures = [
  {
    icon: BookOpen,
    title: "15 Learning Pathways",
    description:
      "From horse care to rider skills, nutrition to welfare — structured across 4 progressive levels.",
  },
  {
    icon: Target,
    title: "Progression Gating",
    description:
      "Students unlock new content as they advance — Beginner → Developing → Intermediate → Advanced.",
  },
  {
    icon: Zap,
    title: "Daily Practice",
    description:
      "3 fresh scenario challenges per day, matched to each student's level and weak areas.",
  },
  {
    icon: Brain,
    title: "AI Tutor",
    description:
      "Instant answers to equine questions — from lameness signs to feed ratios, available 24/7.",
  },
  {
    icon: Users,
    title: "Teacher Dashboard",
    description:
      "Manage cohorts, assign lessons, track progress, and generate reports for students and parents.",
  },
  {
    icon: GraduationCap,
    title: "School System",
    description:
      "Full school management with cohorts, enrolment, progress tracking, and parent reporting.",
  },
];

const testimonials = [
  {
    name: "Sarah Mitchell",
    role: "Stable Manager, Hampshire",
    text: "EquiProfile transformed how we manage our 15 horses. Health records, training logs, and vet reminders — everything is in one place. We saved hours every week.",
  },
  {
    name: "James Thomson",
    role: "BHS Instructor",
    text: "The learning platform is brilliant. My students progress through structured pathways, and I can track their assignments and send feedback — all from one dashboard.",
  },
  {
    name: "Emma Clarke",
    role: "Student Rider",
    text: "I love the daily practice challenges and the AI tutor. It actually understands where I'm struggling and helps me learn at my own pace.",
  },
];

const howItWorks = [
  {
    step: "01",
    title: "Choose Your Path",
    description:
      "Decide whether you need horse management tools, the learning platform, or both.",
  },
  {
    step: "02",
    title: "Set Up Your Profile",
    description:
      "Add your horses, enrol as a student, or set up your school — it only takes a few minutes.",
  },
  {
    step: "03",
    title: "Start Managing or Learning",
    description:
      "Track health, log training, follow learning pathways, and let smart reminders keep everything on schedule.",
  },
];

const stats = [
  { value: "95+", label: "Lessons" },
  { value: "15", label: "Pathways" },
  { value: "4", label: "Levels" },
  { value: "1000+", label: "Students" },
];

export default function Home() {
  const { isAuthenticated } = useAuth();
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, TESTIMONIAL_ROTATION_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Navbar />
      <PageTransition>
        <div className="min-h-screen overflow-hidden">

          {/* ─── Hero Section with Hard Split ─── */}
          <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-[72px]">
            <div className="absolute inset-0 z-0">
              <ImageSlider
                slides={heroSlides}
                interval={6000}
                showArrows={false}
                showDots={false}
                showText={false}
                className="w-full h-full"
                overlayClass="bg-gradient-to-b from-[#1a3a5c]/85 via-[#1a3a5c]/70 to-[#1a3a5c]/50"
              />
            </div>

            <div className="container relative z-10 px-4 py-12 md:py-0">
              <div className="max-w-5xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="text-center"
                >
                  <h1 className="font-serif text-4xl md:text-5xl lg:text-7xl font-bold leading-tight mb-4 text-white drop-shadow-2xl">
                    EquiProfile
                  </h1>
                  <p className="text-lg md:text-xl text-white/85 mb-12 leading-relaxed max-w-2xl mx-auto drop-shadow-lg">
                    Professional Equestrian Management &amp; Learning
                  </p>

                  {/* ─── Two Pathway Cards ─── */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto mb-10">
                    {/* Horse Management Pathway */}
                    <a
                      href="#management"
                      className="group bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 text-center hover:bg-white/20 transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl"
                    >
                      <span className="text-5xl mb-4 block" role="img" aria-label="Horse">🐎</span>
                      <h2 className="font-serif text-2xl font-bold text-white mb-3">
                        Horse Management
                      </h2>
                      <p className="text-white/75 text-sm leading-relaxed mb-5">
                        Health records, training logs, nutrition plans, and stable management for owners and professionals.
                      </p>
                      <span className="inline-flex items-center gap-2 text-[#7dd3c0] font-semibold text-sm group-hover:gap-3 transition-all">
                        Explore Management
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </a>

                    {/* Learning Platform Pathway */}
                    <a
                      href="#learning"
                      className="group bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 text-center hover:bg-white/20 transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl"
                    >
                      <span className="text-5xl mb-4 block" role="img" aria-label="Graduation cap">🎓</span>
                      <h2 className="font-serif text-2xl font-bold text-white mb-3">
                        Learning Platform
                      </h2>
                      <p className="text-white/75 text-sm leading-relaxed mb-5">
                        95+ lessons, 15 pathways, AI tutor, and progression tracking for students, teachers, and schools.
                      </p>
                      <span className="inline-flex items-center gap-2 text-[#7dd3c0] font-semibold text-sm group-hover:gap-3 transition-all">
                        Explore Learning
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </a>
                  </div>

                  <Button
                    size="lg"
                    className="text-base px-10 py-5 bg-[#2e6da4] hover:bg-[#245a8a] text-white shadow-xl hover:shadow-2xl hover:scale-105 transition-all group border-0"
                    asChild
                  >
                    <Link href={isAuthenticated ? "/dashboard" : "/register"}>
                      {isAuthenticated ? "Go to Dashboard" : "Start Free Trial"}
                      <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </motion.div>
              </div>
            </div>
          </section>

          {/* ─── How It Works ─── */}
          <section className="py-24 bg-white">
            <div className="container px-4">
              <ScrollReveal>
                <div className="text-center mb-16">
                  <p className="text-[#3a9d8f] font-semibold text-sm uppercase tracking-widest mb-3">
                    Simple to get started
                  </p>
                  <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-[#1a3a5c] mb-4">
                    How EquiProfile Works
                  </h2>
                  <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                    Get up and running in minutes — whether you're managing a
                    stable or starting your equestrian education.
                  </p>
                </div>
              </ScrollReveal>

              <Stagger className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {howItWorks.map((item, idx) => (
                  <StaggerItem key={idx}>
                    <div className="text-center group">
                      <div className="w-16 h-16 rounded-full bg-[#2e6da4]/10 flex items-center justify-center mx-auto mb-5 group-hover:bg-[#2e6da4]/20 transition-colors">
                        <span className="text-[#2e6da4] font-bold text-xl font-serif">
                          {item.step}
                        </span>
                      </div>
                      <h3 className="font-serif text-xl font-bold text-[#1a3a5c] mb-2">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          </section>

          {/* ─── Horse Management Features ─── */}
          <section id="management" className="py-24 bg-white scroll-mt-20">
            <div className="container px-4">
              <ScrollReveal>
                <div className="text-center mb-16">
                  <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#2e6da4]/10 text-[#2e6da4] text-sm font-semibold mb-4">
                    <Heart className="w-4 h-4" />
                    Pro &amp; Stable Plans
                  </span>
                  <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-[#1a3a5c] mb-4">
                    Horse Management Platform
                  </h2>
                  <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                    Professional tools for owners, riders, and stables — health tracking,
                    training, nutrition, documents, and intelligent insights.
                  </p>
                </div>
              </ScrollReveal>

              <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {managementFeatures.map((feature, idx) => {
                  const FeatureIcon = feature.icon;
                  return (
                    <StaggerItem key={idx}>
                      <div className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 p-6 h-full group">
                        <div className="w-12 h-12 rounded-xl bg-[#2e6da4]/10 flex items-center justify-center mb-4 group-hover:bg-[#2e6da4]/20 transition-colors">
                          <FeatureIcon className="w-6 h-6 text-[#2e6da4]" />
                        </div>
                        <h3 className="font-serif text-lg font-bold text-[#1a3a5c] mb-2">
                          {feature.title}
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    </StaggerItem>
                  );
                })}
              </Stagger>

              <div className="text-center mt-12">
                <Button
                  size="lg"
                  className="bg-[#2e6da4] hover:bg-[#245a8a] text-white shadow-md hover:shadow-lg hover:scale-105 transition-all group"
                  asChild
                >
                  <Link href="/register">
                    Start Managing Your Horses
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>
            </div>
          </section>

          {/* ─── Learning Platform Features ─── */}
          <section id="learning" className="py-24 bg-[#f8f6f3] scroll-mt-20">
            <div className="container px-4">
              <ScrollReveal>
                <div className="text-center mb-16">
                  <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#3a9d8f]/10 text-[#3a9d8f] text-sm font-semibold mb-4">
                    <GraduationCap className="w-4 h-4" />
                    Student Plan
                  </span>
                  <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-[#1a3a5c] mb-4">
                    Equestrian Learning Platform
                  </h2>
                  <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                    A structured education platform for students, teachers, and riding schools —
                    with AI tutoring, daily practice, and real progression tracking.
                  </p>
                </div>
              </ScrollReveal>

              <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {learningFeatures.map((feature, idx) => {
                  const FeatureIcon = feature.icon;
                  return (
                    <StaggerItem key={idx}>
                      <div className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 p-6 h-full group">
                        <div className="w-12 h-12 rounded-xl bg-[#3a9d8f]/10 flex items-center justify-center mb-4 group-hover:bg-[#3a9d8f]/20 transition-colors">
                          <FeatureIcon className="w-6 h-6 text-[#3a9d8f]" />
                        </div>
                        <h3 className="font-serif text-lg font-bold text-[#1a3a5c] mb-2">
                          {feature.title}
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    </StaggerItem>
                  );
                })}
              </Stagger>

              <div className="text-center mt-12">
                <Button
                  size="lg"
                  className="bg-[#3a9d8f] hover:bg-[#2e8577] text-white shadow-md hover:shadow-lg hover:scale-105 transition-all group"
                  asChild
                >
                  <Link href="/register">
                    Start Learning Today
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>
            </div>
          </section>

          {/* ─── Stats Bar ─── */}
          <section className="py-16 bg-[#1a3a5c]">
            <div className="container px-4">
              <ScrollReveal>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto text-center">
                  {stats.map((stat, idx) => (
                    <div key={idx}>
                      <div className="font-serif text-3xl md:text-4xl font-bold text-white mb-1">
                        {stat.value}
                      </div>
                      <div className="text-white/60 text-sm uppercase tracking-widest font-medium">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            </div>
          </section>

          {/* ─── Testimonials ─── */}
          <section className="py-24 bg-[#f8f6f3]">
            <div className="container px-4">
              <ScrollReveal>
                <div className="text-center mb-14">
                  <p className="text-[#3a9d8f] font-semibold text-sm uppercase tracking-widest mb-3">
                    Testimonials
                  </p>
                  <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-[#1a3a5c] mb-4">
                    Loved by Equestrians
                  </h2>
                </div>
              </ScrollReveal>

              <div className="max-w-3xl mx-auto">
                <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-8 md:p-12">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTestimonial}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.4 }}
                    >
                      <blockquote className="text-lg md:text-xl leading-relaxed mb-8 text-[#1a3a5c] font-serif italic">
                        &ldquo;{testimonials[activeTestimonial].text}&rdquo;
                      </blockquote>
                      <div>
                        <div className="font-bold text-[#1a3a5c]">
                          {testimonials[activeTestimonial].name}
                        </div>
                        <div className="text-gray-500 text-sm">
                          {testimonials[activeTestimonial].role}
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                <div className="flex justify-center gap-3 mt-8">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveTestimonial(index)}
                      className="relative flex items-center justify-center min-w-[44px] min-h-[44px] transition-all duration-300"
                      aria-label={`Go to testimonial ${index + 1}`}
                      aria-current={
                        index === activeTestimonial ? "true" : undefined
                      }
                    >
                      <span
                        className={`rounded-full transition-all duration-300 ${
                          index === activeTestimonial
                            ? "bg-[#2e6da4] w-10 h-2.5"
                            : "bg-gray-300 w-2.5 h-2.5 hover:bg-gray-400"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ─── Final CTA ─── */}
          <section className="py-24 bg-gradient-to-br from-[#1a3a5c] via-[#2e6da4] to-[#3a9d8f] relative overflow-hidden">
            <div className="container px-4 relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="max-w-3xl mx-auto text-center"
              >
                <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-5">
                  Ready to Transform Your
                  <br />
                  Equestrian Journey?
                </h2>
                <p className="text-lg text-white/80 mb-10 leading-relaxed max-w-xl mx-auto">
                  Join equestrians across the UK who trust EquiProfile for management and learning.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    size="lg"
                    className="text-base px-10 py-5 bg-white text-[#1a3a5c] hover:bg-white/90 shadow-xl hover:shadow-2xl hover:scale-105 transition-all group border-0 font-semibold"
                    asChild
                  >
                    <Link href="/register">
                      Horse Management
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                  <Button
                    size="lg"
                    className="text-base px-10 py-5 bg-white/15 text-white border border-white/30 hover:bg-white/25 backdrop-blur-sm shadow-lg hover:scale-105 transition-all group font-semibold"
                    asChild
                  >
                    <Link href="/register">
                      Learning Platform
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </div>
              </motion.div>
            </div>
          </section>
        </div>
      </PageTransition>
      <Footer />
    </>
  );
}
