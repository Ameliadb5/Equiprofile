import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ManagementLayout } from "@/components/management/ManagementLayout";
import {
  HeartPulse,
  Dumbbell,
  Salad,
  FileText,
  CloudSun,
  BarChart3,
  ArrowRight,
  ChevronRight,
  Star,
  Users,
  Server,
  ShieldCheck,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Animation helpers                                                  */
/* ------------------------------------------------------------------ */

function AnimatedSection({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
      transition={{ duration: 0.7, ease: "easeOut", delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const stats = [
  { icon: HeartPulse, value: "Complete", label: "Health tracking", color: "from-rose-500 to-pink-600" },
  { icon: Users, value: "All-in-one", label: "Stable management", color: "from-blue-500 to-indigo-600" },
  { icon: Server, value: "Cloud", label: "Hosted & secure", color: "from-emerald-500 to-teal-600" },
  { icon: Star, value: "UK-built", label: "Equine-first platform", color: "from-amber-500 to-orange-600" },
];

const features = [
  {
    icon: HeartPulse,
    title: "Health Records",
    desc: "Centralise veterinary visits, vaccinations and medical history in one secure timeline.",
    gradient: "from-rose-500 to-pink-600",
  },
  {
    icon: Dumbbell,
    title: "Training Logs",
    desc: "Track sessions, monitor progress and plan workouts tailored to each horse.",
    gradient: "from-green-500 to-emerald-600",
  },
  {
    icon: Salad,
    title: "Nutrition Plans",
    desc: "Build custom feeding schedules, log supplements and adjust diets with ease.",
    gradient: "from-lime-500 to-green-600",
  },
  {
    icon: FileText,
    title: "Document Storage",
    desc: "Keep passports, insurance and certificates organised and accessible anywhere.",
    gradient: "from-indigo-500 to-violet-600",
  },
  {
    icon: CloudSun,
    title: "Weather & Riding",
    desc: "Real-time forecasts matched to your location so you can plan the perfect ride.",
    gradient: "from-sky-500 to-blue-600",
  },
  {
    icon: BarChart3,
    title: "Insights & Reports",
    desc: "Beautiful dashboards and exportable reports to keep every stakeholder informed.",
    gradient: "from-amber-500 to-orange-600",
  },
];

const galleryImages = [
  { src: "/images/hero/image2.jpg", alt: "Horse training session" },
  { src: "/images/gallery/1.jpg", alt: "Stable yard" },
  { src: "/images/hero/image4.jpg", alt: "Horse and rider" },
  { src: "/images/gallery/2.jpg", alt: "Equestrian care" },
];

const testimonials = [
  {
    name: "Eleanor Whitfield",
    role: "Dressage Trainer, Berkshire",
    initials: "EW",
    quote:
      "EquiProfile transformed the way we manage our yard. Health records, feeding plans — everything in one place. I can't imagine going back.",
  },
  {
    name: "James Haverford",
    role: "Stable Owner, Yorkshire",
    initials: "JH",
    quote:
      "The training logs alone saved us hours every week. My grooms finally have a single source of truth they actually enjoy using.",
  },
  {
    name: "Sofia Lindgren",
    role: "Event Rider, Hampshire",
    initials: "SL",
    quote:
      "Beautifully designed and genuinely useful. The weather integration is a game-changer for scheduling — highly recommend.",
  },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function Home() {
  return (
    <ManagementLayout>
      <div className="min-h-screen">

        {/* ======================== HERO ======================== */}
        <section className="relative min-h-[92vh] flex items-center overflow-hidden">
          <img
            src="/images/hero/image1.jpg"
            alt="Horses in a field at sunset"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          {/* Rich layered gradient — deep navy preserves the horse silhouettes */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#0a1628]/92 via-[#0f1d2e]/75 to-[#1a7a6d]/35" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_40%,_rgba(10,22,40,0.55)_100%)]" />

          <div className="relative z-10 container mx-auto px-4 pt-28 pb-24 text-center">
            {/* Eyebrow pill */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/15 rounded-full px-4 py-1.5 text-sm text-white/80 font-medium mb-6"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#c5a55a]" />
              Professional equine management platform
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-serif text-white leading-[1.1] max-w-5xl mx-auto"
            >
              Professional Horse
              <br />
              <span className="bg-gradient-to-r from-[#c5a55a] via-[#e8cf8a] to-[#c5a55a] bg-clip-text text-transparent">
                Management Software
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25 }}
              className="mt-6 text-lg md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed"
            >
              The all-in-one platform trusted by trainers, owners and stables to
              keep every horse healthy, happy and performing at its best.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link href="/register">
                <Button
                  size="lg"
                  className="bg-[#c5a55a] hover:bg-[#b8963f] text-[#0f1d2e] font-semibold px-9 h-12 text-base rounded-full shadow-xl shadow-[#c5a55a]/25 border-0 transition-all duration-200 hover:shadow-2xl hover:shadow-[#c5a55a]/30 hover:-translate-y-0.5"
                >
                  Get Started Free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/features">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/25 text-white hover:bg-white/10 hover:border-white/40 px-8 h-12 text-base rounded-full backdrop-blur-sm transition-all duration-200"
                >
                  See All Features
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-8 text-xs text-white/35 tracking-wide"
            >
              7-day free trial · No credit card required · Cancel anytime
            </motion.p>
          </div>

          {/* Bottom fade into dark stats section */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a1628] to-transparent" />
        </section>

        {/* ====================== STATS BAR ====================== */}
        {/* Continuation of hero — stays dark for strong visual flow */}
        <section className="relative bg-[#0a1628] pt-2 pb-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto">
              {stats.map((s, i) => (
                <AnimatedSection key={s.label} delay={i * 0.08}>
                  <div className="relative flex flex-col items-center text-center p-6 rounded-2xl bg-white/[0.045] border border-white/[0.08] hover:bg-white/[0.08] hover:border-white/[0.15] transition-all duration-300 group">
                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${s.color} mb-4 shadow-lg group-hover:scale-105 transition-transform duration-300`}>
                      <s.icon className="w-5 h-5 text-white" />
                    </div>
                    <p className="text-2xl md:text-3xl font-bold font-serif text-white">
                      {s.value}
                    </p>
                    <p className="text-[11px] text-white/40 mt-1.5 tracking-wide">{s.label}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
          {/* Gradient fade into light features section */}
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-b from-transparent to-[#f8f9fb]" />
        </section>

        {/* ==================== FEATURES GRID ==================== */}
        <section className="bg-[#f8f9fb] py-20 md:py-28">
          <div className="container mx-auto px-4">
            <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
              <p className="text-sm font-semibold tracking-widest uppercase text-[#1a7a6d] mb-3">
                Core Capabilities
              </p>
              <h2 className="text-3xl md:text-4xl font-bold font-serif text-[#0f1d2e]">
                Everything you need, nothing you don't
              </h2>
              <p className="mt-4 text-[#0f1d2e]/55 text-lg">
                Six powerful modules designed by equestrians, for equestrians.
              </p>
            </AnimatedSection>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
              {features.map((f, i) => (
                <AnimatedSection key={f.title} delay={i * 0.08}>
                  <div className="group relative rounded-2xl border border-[#0f1d2e]/5 bg-white p-8 transition-all duration-300 hover:shadow-2xl hover:shadow-[#2e6da4]/8 hover:-translate-y-1.5 overflow-hidden h-full">
                    <div className={`relative flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${f.gradient} text-white mb-6 shadow-lg group-hover:scale-105 transition-transform duration-300`}>
                      <f.icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold font-serif text-[#0f1d2e] mb-3">
                      {f.title}
                    </h3>
                    <p className="text-[#0f1d2e]/55 leading-relaxed">{f.desc}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>

            <AnimatedSection delay={0.3} className="text-center mt-12">
              <Link href="/features">
                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-full border-[#2e6da4]/30 text-[#2e6da4] hover:bg-[#2e6da4]/5 hover:border-[#2e6da4]/50 px-8"
                >
                  Explore all features
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </AnimatedSection>
          </div>
        </section>

        {/* ================== IMAGE GALLERY STRIP ================== */}
        {/* Platform visual showcase — framed horse and yard photography */}
        <section className="bg-[#0f1d2e] py-16 overflow-hidden">
          <div className="container mx-auto px-4 mb-10">
            <AnimatedSection className="text-center">
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#c5a55a]/70">
                Built for professionals
              </p>
              <p className="mt-2 text-2xl md:text-3xl font-bold font-serif text-white">
                Designed for the demands of the yard
              </p>
            </AnimatedSection>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex gap-4 px-4 sm:px-8 overflow-x-auto snap-x snap-mandatory pb-2"
            style={{ scrollbarWidth: "none" }}
          >
            {galleryImages.map((img) => (
              <div
                key={img.src}
                className="flex-shrink-0 snap-center w-72 sm:w-80 md:w-96 rounded-2xl overflow-hidden ring-1 ring-white/10 shadow-2xl shadow-black/40"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-56 sm:h-64 object-cover object-center hover:scale-105 transition-transform duration-700"
                />
              </div>
            ))}
          </motion.div>
        </section>

        {/* ================== SPLIT IMAGE + TEXT ================== */}
        <section className="bg-[#0f1d2e] py-20 md:py-28 overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center max-w-6xl mx-auto">
              <AnimatedSection>
                {/* Framed image — bordered container prevents awkward crops */}
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                  <img
                    src="/images/hero/image3.jpg"
                    alt="Horse and rider training"
                    className="w-full h-[380px] md:h-[480px] object-cover object-center"
                  />
                  <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-2xl pointer-events-none" />
                </div>
              </AnimatedSection>

              <AnimatedSection delay={0.15}>
                <p className="text-sm font-semibold tracking-widest uppercase text-[#c5a55a] mb-4">
                  Why EquiProfile
                </p>
                <h2 className="text-3xl md:text-4xl font-bold font-serif text-white leading-tight">
                  Built by riders.
                  <br />
                  Loved by stables.
                </h2>
                <p className="mt-6 text-white/55 leading-relaxed text-lg">
                  We started EquiProfile because no tool on the market truly
                  understood the daily reality of horse care. From morning feeds
                  to competition prep, every feature has been shaped by real
                  feedback from trainers, owners and grooms.
                </p>
                <ul className="mt-8 space-y-4">
                  {[
                    "Designed for equestrians, not generic pet software",
                    "Offline-capable — works even at remote yards",
                    "Invite your team with role-based permissions",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-white/70">
                      <span className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-[#1a7a6d]/30 border border-[#1a7a6d]/50 flex items-center justify-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#4eca9d]" />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-col sm:flex-row gap-3 mt-10">
                  <Link href="/about">
                    <Button className="bg-[#c5a55a] hover:bg-[#b8963f] text-[#0f1d2e] font-semibold rounded-full px-6 transition-all duration-200 hover:-translate-y-0.5">
                      Our Story
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/features">
                    <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 rounded-full px-6">
                      All Features
                    </Button>
                  </Link>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* =================== TESTIMONIALS =================== */}
        <section className="relative bg-[#f8f9fb] py-20 md:py-28 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(46,109,164,0.06)_0%,_transparent_60%)] pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(26,122,109,0.05)_0%,_transparent_60%)] pointer-events-none" />

          <div className="relative container mx-auto px-4">
            <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
              <p className="text-sm font-semibold tracking-widest uppercase text-[#2e6da4] mb-3">
                Testimonials
              </p>
              <h2 className="text-3xl md:text-4xl font-bold font-serif text-[#0f1d2e]">
                Trusted by equestrians everywhere
              </h2>
              <p className="mt-4 text-[#0f1d2e]/50 text-lg">
                From solo owners to professional training yards.
              </p>
            </AnimatedSection>

            <div className="grid md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
              {testimonials.map((t, i) => (
                <AnimatedSection key={t.name} delay={i * 0.1}>
                  <div className="relative bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl hover:shadow-[#2e6da4]/6 border border-[#0f1d2e]/5 h-full flex flex-col transition-all duration-300 hover:-translate-y-1.5">
                    <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-[#c5a55a]/45 to-transparent" />
                    <div className="flex gap-1 mb-5">
                      {Array.from({ length: 5 }).map((_, si) => (
                        <Star
                          key={si}
                          className="w-3.5 h-3.5 fill-[#c5a55a] text-[#c5a55a]"
                        />
                      ))}
                    </div>
                    <p className="text-[#0f1d2e]/65 leading-relaxed flex-1 italic text-[15px]">
                      "{t.quote}"
                    </p>
                    <div className="flex items-center gap-3 mt-7 pt-6 border-t border-[#0f1d2e]/5">
                      <Avatar className="w-10 h-10">
                        <AvatarFallback className="bg-gradient-to-br from-[#2e6da4]/15 to-[#4a9eca]/15 text-[#2e6da4] text-sm font-bold">
                          {t.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold text-[#0f1d2e] text-sm">
                          {t.name}
                        </p>
                        <p className="text-xs text-[#0f1d2e]/45">{t.role}</p>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* ===================== CTA BANNER ===================== */}
        <section className="relative py-24 md:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0a1628] via-[#0f1d2e] to-[#091524]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,_rgba(46,109,164,0.18)_0%,_transparent_60%)] pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_50%,_rgba(26,122,109,0.12)_0%,_transparent_60%)] pointer-events-none" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-px bg-gradient-to-r from-transparent via-[#c5a55a]/40 to-transparent" />

          <div className="relative z-10 container mx-auto px-4 text-center">
            <AnimatedSection>
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#c5a55a]/70 mb-4">
                Start today
              </p>
              <h2 className="text-3xl md:text-5xl font-bold font-serif text-white max-w-3xl mx-auto leading-tight">
                Ready to elevate your horse management?
              </h2>
              <p className="mt-6 text-white/50 text-lg max-w-xl mx-auto">
                The platform built for equestrians who take horse care seriously.
                Start your free 7-day trial — no credit card required.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/register">
                  <Button
                    size="lg"
                    className="bg-[#c5a55a] hover:bg-[#b8963f] text-[#0f1d2e] font-semibold px-10 h-12 text-base rounded-full shadow-xl shadow-[#c5a55a]/20 border-0 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-2xl"
                  >
                    Start Free Trial
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/pricing">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white/15 text-white hover:bg-white/10 hover:border-white/25 px-8 h-12 text-base rounded-full transition-all duration-200"
                  >
                    View Pricing
                  </Button>
                </Link>
              </div>
              <p className="mt-8 text-xs text-white/30">
                Join trainers, owners and yard managers already using EquiProfile
              </p>
            </AnimatedSection>
          </div>
        </section>
      </div>
    </ManagementLayout>
  );
}
