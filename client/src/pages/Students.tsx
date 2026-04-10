// Copyright (c) 2025-2026 Amarktai Network. All rights reserved.
import { Link } from "wouter";
import { MarketingLayout } from "@/components/MarketingLayout";
import { PageBanner } from "@/components/PageBanner";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  GraduationCap,
  Heart,
  BookOpen,
  Trophy,
  Users,
  Brain,
  ClipboardList,
  Calendar,
  TrendingUp,
  Shield,
  ChevronRight,
  CheckCircle2,
  School,
  Sparkles,
  Star,
} from "lucide-react";

const studentFeatures = [
  {
    icon: Heart,
    title: "My Horse — Virtual or Real",
    description:
      "Every student gets a horse to manage. Learn with a virtual horse, or track a real horse assigned by your school or stable. Build real care skills from day one.",
    color: "from-rose-500 to-pink-500",
  },
  {
    icon: ClipboardList,
    title: "Daily Care Tasks",
    description:
      "Follow structured daily routines — feeding, grooming, health checks, and turnout. Build discipline and confidence through hands-on responsibility.",
    color: "from-amber-500 to-orange-500",
  },
  {
    icon: BookOpen,
    title: "Study Hub & Learning Resources",
    description:
      "Access educational materials, quizzes, and study guides covering equine anatomy, nutrition, first aid, and stable management theory.",
    color: "from-blue-500 to-indigo-500",
  },
  {
    icon: TrendingUp,
    title: "Training Logs & Progress",
    description:
      "Record riding lessons, track skill development, and see your progress over time. Trainers and parents can follow along with detailed summaries.",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: Brain,
    title: "AI Tutor Support",
    description:
      "Get intelligent help with equine topics. Ask questions, get explanations, and deepen your understanding with AI-powered learning assistance.",
    color: "from-violet-500 to-purple-500",
  },
  {
    icon: Trophy,
    title: "Achievements & Reports",
    description:
      "Earn badges for milestones, track completed tasks, and generate progress reports. Perfect for portfolios, assessments, and goal-setting.",
    color: "from-cyan-500 to-teal-500",
  },
];

const schoolBenefits = [
  {
    title: "Structured Curriculum Support",
    description:
      "Align student activities with your teaching syllabus. Track progress against learning objectives.",
  },
  {
    title: "Multi-Student Management",
    description:
      "Oversee all students from a single dashboard. Assign horses, set tasks, and monitor engagement.",
  },
  {
    title: "Progress Reporting",
    description:
      "Generate progress reports for students, parents, and accreditation bodies with real data.",
  },
  {
    title: "Volume Pricing",
    description:
      "Affordable pricing that scales. The more students you enrol, the more you save — up to 20% off.",
  },
];

const volumePricing = [
  { range: "1–19 students", discount: "Standard pricing", price: "£5/student/month" },
  { range: "20+ students", discount: "10% discount", price: "£4.50/student/month" },
  { range: "50+ students", discount: "15% discount", price: "£4.25/student/month" },
  { range: "100+ students", discount: "20% discount", price: "£4/student/month" },
];

export default function Students() {
  return (
    <MarketingLayout>
      <PageBanner
        title="For Students"
        subtitle="Learn, train, and grow with real equine management tools"
        imageSrc="/images/hero/image4.jpg"
        imagePosition="center"
      />

      <div className="min-h-screen bg-[#0a1628] bg-gradient-to-br from-[#0a1628] via-[#0f1f45] to-[#0a1628]">
        {/* Hero Intro */}
        <section className="container mx-auto px-4 pt-16 pb-12">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#4f5fd6]/15 border border-[#4f5fd6]/30 mb-6">
              <GraduationCap className="w-5 h-5 text-[#8b9cf7]" />
              <span className="text-sm font-medium text-[#8b9cf7]">
                Student Programme
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-serif text-white mb-6 tracking-tight">
              The Modern Way to{" "}
              <span className="bg-gradient-to-r from-[#8b9cf7] to-cyan-400 bg-clip-text text-transparent">
                Learn Horse Care
              </span>
            </h2>
            <p className="text-lg text-gray-300 leading-relaxed max-w-2xl mx-auto">
              EquiProfile for Students gives learners a dedicated dashboard with
              real tools — manage a virtual horse or a real one, track progress,
              complete daily tasks, and build the skills that matter.
            </p>
          </motion.div>
        </section>

        {/* Virtual vs Real Horse */}
        <section className="container mx-auto px-4 py-12">
          <motion.div
            className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="bg-gradient-to-br from-[#4f5fd6]/10 to-violet-500/10 border border-[#4f5fd6]/20 rounded-2xl p-8 hover:border-[#4f5fd6]/40 transition-colors duration-300">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-violet-500 to-purple-500 flex items-center justify-center mb-5">
                <Sparkles className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                Your Virtual Horse
              </h3>
              <p className="text-gray-400 leading-relaxed mb-4">
                Start learning with a simulated horse. Practice care routines,
                feeding schedules, and health monitoring in a safe environment
                — perfect for beginners building confidence before working
                with real animals.
              </p>
              <ul className="space-y-2">
                {[
                  "Realistic care simulation",
                  "Safe learning environment",
                  "Build core skills first",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-gray-300">
                    <CheckCircle2 className="w-4 h-4 text-violet-400 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 rounded-2xl p-8 hover:border-emerald-500/40 transition-colors duration-300">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center justify-center mb-5">
                <Heart className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                Your Assigned Horse
              </h3>
              <p className="text-gray-400 leading-relaxed mb-4">
                For students at riding schools and stables — work with a real
                horse assigned by your instructor. Log actual care activities,
                track real training sessions, and build genuine experience.
              </p>
              <ul className="space-y-2">
                {[
                  "Real horse, real responsibility",
                  "Assigned by school or trainer",
                  "Genuine care experience",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-gray-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </section>

        {/* Student Features Grid */}
        <section className="container mx-auto px-4 py-16">
          <motion.div
            className="text-center mb-14"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold font-serif text-white mb-4 tracking-tight">
              Everything Students{" "}
              <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                Need to Succeed
              </span>
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              A dedicated learning environment built specifically for equestrian
              students, from beginners to advanced riders
            </p>
          </motion.div>

          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {studentFeatures.map((feature, index) => (
              <motion.article
                key={index}
                className="bg-[#0f2040]/60 backdrop-blur-md border border-white/10 rounded-xl p-7 hover:border-white/25 transition-all duration-300 group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.15 + index * 0.08 }}
              >
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}
                >
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </motion.article>
            ))}
          </div>
        </section>

        {/* Who Is This For */}
        <section className="container mx-auto px-4 py-16">
          <motion.div
            className="max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold font-serif text-white mb-4 tracking-tight">
                Built for{" "}
                <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                  Everyone in Education
                </span>
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: GraduationCap,
                  title: "Students",
                  description:
                    "Learn horse care with real tools. Track your progress, complete tasks, and build skills whether you're a complete beginner or working towards qualifications.",
                },
                {
                  icon: School,
                  title: "Schools & Academies",
                  description:
                    "Manage student cohorts, assign horses, set structured tasks, and generate progress reports. Integrate EquiProfile into your teaching programme.",
                },
                {
                  icon: Users,
                  title: "Parents & Trainers",
                  description:
                    "Stay informed about student progress. View achievements, training summaries, and care logs. Support learning with clear visibility.",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-[#0f2040]/60 backdrop-blur-md border border-white/10 rounded-xl p-7 text-center hover:border-white/25 transition-colors duration-300"
                >
                  <div className="w-14 h-14 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500 flex items-center justify-center mx-auto mb-5">
                    <item.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Schools Section */}
        <section className="container mx-auto px-4 py-16">
          <motion.div
            className="max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
          >
            <div className="bg-gradient-to-br from-[#4f5fd6]/10 to-indigo-500/5 border border-[#4f5fd6]/20 rounded-2xl p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-10 items-start">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#4f5fd6]/15 border border-[#4f5fd6]/30 mb-5">
                    <School className="w-4 h-4 text-[#8b9cf7]" />
                    <span className="text-xs font-medium text-[#8b9cf7] uppercase tracking-wider">
                      For Schools
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold font-serif text-white mb-4 tracking-tight">
                    Bring EquiProfile to Your{" "}
                    <span className="text-[#8b9cf7]">Riding School</span>
                  </h2>
                  <p className="text-gray-400 leading-relaxed mb-6">
                    EquiProfile helps riding schools, equestrian colleges, and
                    training academies deliver structured, trackable learning
                    experiences. Give every student the tools to learn
                    effectively — and give your team the oversight to ensure it.
                  </p>
                  <Link href="/contact">
                    <Button className="bg-[#4f5fd6] hover:bg-[#4554c4] text-white px-6 py-3 rounded-lg">
                      Contact Us for Schools
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </Link>
                </div>

                <div className="space-y-4">
                  {schoolBenefits.map((benefit, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-4 rounded-lg bg-white/5 border border-white/5"
                    >
                      <CheckCircle2 className="w-5 h-5 text-[#8b9cf7] shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-sm font-semibold text-white mb-1">
                          {benefit.title}
                        </h4>
                        <p className="text-xs text-gray-400 leading-relaxed">
                          {benefit.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Volume Pricing */}
        <section className="container mx-auto px-4 py-16">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold font-serif text-white mb-4 tracking-tight">
              Simple,{" "}
              <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                Affordable Pricing
              </span>
            </h2>
            <p className="text-lg text-gray-400 mb-10 max-w-2xl mx-auto">
              From £5 per month per student. Schools enrolling more students save
              more — up to 20% off.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
              {volumePricing.map((tier, index) => (
                <div
                  key={index}
                  className={`rounded-xl p-6 border transition-colors duration-300 ${
                    index === 3
                      ? "bg-[#4f5fd6]/15 border-[#4f5fd6]/40"
                      : "bg-[#0f2040]/60 border-white/10 hover:border-white/25"
                  }`}
                >
                  <p className="text-sm font-medium text-gray-400 mb-2">
                    {tier.range}
                  </p>
                  <p className="text-xl font-bold text-white mb-1">
                    {tier.price}
                  </p>
                  <p className="text-xs text-[#8b9cf7] font-medium">
                    {tier.discount}
                  </p>
                </div>
              ))}
            </div>

            <p className="text-sm text-gray-500 mb-8">
              Yearly billing available at £50/student/year (save over 15%).
              Volume discounts apply to yearly billing too.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register?plan=student">
                <Button
                  size="lg"
                  className="text-lg px-10 py-6 bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-700 hover:to-cyan-700 text-white border-0 shadow-xl"
                >
                  Start Free Trial
                  <ChevronRight className="w-5 h-5 ml-1" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-10 py-6 border-white/20 text-white hover:bg-white/10"
                >
                  Contact for Schools
                </Button>
              </Link>
            </div>
          </motion.div>
        </section>

        {/* Final CTA */}
        <section className="container mx-auto px-4 py-16 pb-24">
          <motion.div
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-[#4f5fd6]/20 to-cyan-500/20 rounded-3xl blur-3xl" />
              <div className="relative backdrop-blur-md bg-white/5 border-2 border-white/20 rounded-3xl p-8 md:p-12 hover:bg-white/10 hover:border-white/30 transition-all duration-500">
                <div className="text-center">
                  <div className="inline-flex items-center gap-2 mb-6">
                    <Star className="w-5 h-5 text-amber-400" />
                    <Star className="w-5 h-5 text-amber-400" />
                    <Star className="w-5 h-5 text-amber-400" />
                    <Star className="w-5 h-5 text-amber-400" />
                    <Star className="w-5 h-5 text-amber-400" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold font-serif mb-4 text-white">
                    Ready to Transform{" "}
                    <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                      Equestrian Education?
                    </span>
                  </h2>
                  <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                    Join riding schools and students already using EquiProfile to
                    learn smarter, train better, and care with confidence.
                  </p>
                  <Link href="/register?plan=student">
                    <Button
                      size="lg"
                      className="text-lg px-10 py-6 bg-[#4f5fd6] hover:bg-[#4554c4] text-white border-0 shadow-xl"
                    >
                      Get Started — It's Free for 7 Days
                      <ChevronRight className="w-5 h-5 ml-1" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </section>
      </div>
    </MarketingLayout>
  );
}
