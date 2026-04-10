// Copyright (c) 2025-2026 Amarktai Network. All rights reserved.
import { useAuth } from "@/_core/hooks/useAuth";
import { DashboardLayout } from "@/components/DashboardLayout";
import {
  GraduationCap,
  Heart,
  Sparkles,
  ClipboardList,
  BookOpen,
  TrendingUp,
  Calendar,
  Brain,
  Trophy,
  Star,
  ChevronRight,
  Clock,
  Target,
  Flame,
  CheckCircle2,
} from "lucide-react";

/**
 * Student Dashboard — Phase 1 Skeleton
 *
 * A dedicated, engaging dashboard for student users.
 * Distinct visual identity from Standard/Stable dashboards:
 * - Warmer, more approachable color palette
 * - Guided, card-based layout
 * - Educational focus with progress tracking
 *
 * Backend logic will be implemented in later phases.
 * This skeleton provides the visual structure and navigation.
 */

// ─── Design Tokens (Student-specific) ─────────────────────────
const STUDENT_ACCENT = "#6366f1"; // indigo-500
const STUDENT_ACCENT_LIGHT = "#a5b4fc"; // indigo-300
const STUDENT_BG = "#0c1222"; // slightly warmer dark
const STUDENT_CARD = "#131a2e"; // warmer card bg
const STUDENT_BORDER = "rgba(99, 102, 241, 0.15)";

// ─── Module Sections ──────────────────────────────────────────
const studentModules = [
  {
    group: "My Learning",
    color: "from-indigo-500 to-violet-500",
    items: [
      { label: "Overview", icon: GraduationCap, description: "Your learning summary" },
      { label: "My Horse", icon: Heart, description: "View and manage your horse" },
      { label: "Daily Tasks", icon: ClipboardList, description: "Today's care activities" },
      { label: "Training Log", icon: TrendingUp, description: "Record and review sessions" },
    ],
  },
  {
    group: "Study & Progress",
    color: "from-cyan-500 to-teal-500",
    items: [
      { label: "Study Hub", icon: BookOpen, description: "Learning materials & quizzes" },
      { label: "Lessons", icon: Calendar, description: "Your lesson schedule" },
      { label: "AI Tutor", icon: Brain, description: "Get help with equine topics" },
      { label: "Progress", icon: Target, description: "Track your improvement" },
    ],
  },
  {
    group: "Achievements",
    color: "from-amber-500 to-orange-500",
    items: [
      { label: "Badges", icon: Trophy, description: "Milestones you've earned" },
      { label: "Reports", icon: Star, description: "Your progress reports" },
    ],
  },
];

// ─── Skeleton placeholders ────────────────────────────────────
function SkeletonBar({ className = "" }: { className?: string }) {
  return (
    <div
      className={`rounded-md bg-white/[0.06] animate-pulse ${className}`}
    />
  );
}

// ─── Quick Action Card ────────────────────────────────────────
function QuickAction({
  icon: Icon,
  label,
  description,
  accentColor = STUDENT_ACCENT,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  description: string;
  accentColor?: string;
}) {
  return (
    <button
      className="flex items-start gap-4 p-5 rounded-xl border transition-all duration-200 text-left group w-full"
      style={{
        backgroundColor: STUDENT_CARD,
        borderColor: STUDENT_BORDER,
      }}
    >
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform"
        style={{ backgroundColor: `${accentColor}15` }}
      >
        <span style={{ color: accentColor }}>
          <Icon className="w-5 h-5" />
        </span>
      </div>
      <div className="min-w-0">
        <p className="text-sm font-semibold text-white group-hover:text-indigo-300 transition-colors">
          {label}
        </p>
        <p className="text-xs text-gray-500 mt-0.5">{description}</p>
      </div>
      <ChevronRight className="w-4 h-4 text-gray-600 shrink-0 mt-1 group-hover:text-gray-400 transition-colors" />
    </button>
  );
}

// ─── Horse Card (Virtual / Real) ──────────────────────────────
function HorseCard({
  type,
}: {
  type: "virtual" | "real";
}) {
  const isVirtual = type === "virtual";
  const gradientClass = isVirtual
    ? "from-violet-500/15 to-purple-500/15"
    : "from-emerald-500/15 to-teal-500/15";
  const borderClass = isVirtual
    ? "border-violet-500/20 hover:border-violet-500/40"
    : "border-emerald-500/20 hover:border-emerald-500/40";
  const iconColor = isVirtual ? "#a78bfa" : "#34d399";
  const Icon = isVirtual ? Sparkles : Heart;

  return (
    <div
      className={`rounded-xl border p-6 transition-colors duration-300 bg-gradient-to-br ${gradientClass} ${borderClass}`}
    >
      <div className="flex items-center gap-3 mb-4">
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: `${iconColor}20` }}
        >
          <span style={{ color: iconColor }}>
            <Icon className="w-5 h-5" />
          </span>
        </div>
        <div>
          <h3 className="text-base font-semibold text-white">
            {isVirtual ? "Your Virtual Horse" : "Your Assigned Horse"}
          </h3>
          <p className="text-xs text-gray-500">
            {isVirtual
              ? "Learn through simulation"
              : "Assigned by your school"}
          </p>
        </div>
      </div>

      {/* Skeleton placeholder for horse data */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">Name</span>
          <SkeletonBar className="w-24 h-4" />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">Breed</span>
          <SkeletonBar className="w-20 h-4" />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">Status</span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-500/15 text-indigo-300 font-medium">
            Coming Soon
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── Stat Card ────────────────────────────────────────────────
function StatCard({
  icon: Icon,
  label,
  color,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  color: string;
}) {
  return (
    <div
      className="rounded-xl border p-5 flex items-center gap-4"
      style={{
        backgroundColor: STUDENT_CARD,
        borderColor: STUDENT_BORDER,
      }}
    >
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
        style={{ backgroundColor: `${color}15` }}
      >
        <span style={{ color }}>
          <Icon className="w-5 h-5" />
        </span>
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-xs text-gray-500">{label}</p>
        <SkeletonBar className="w-12 h-5 mt-1" />
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────
export default function StudentDashboard() {
  const { user } = useAuth();
  const rawName = user?.name?.trim() ?? "";
  const firstName = rawName.split(/\s+/)[0] || "Student";

  return (
    <DashboardLayout>
      <div
        className="min-h-screen relative"
        style={{ backgroundColor: STUDENT_BG }}
      >
        {/* Subtle background depth — student identity */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-indigo-600/[0.04] blur-[120px]" />
          <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] rounded-full bg-violet-500/[0.03] blur-[100px]" />
          <div className="absolute top-1/2 left-0 w-[300px] h-[300px] rounded-full bg-cyan-500/[0.02] blur-[80px]" />
        </div>

        <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8">
          {/* ─── Welcome Header ───────────────────────────── */}
          <section>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  Welcome back, {firstName}
                </h1>
                <p className="text-sm text-gray-500">
                  Student Dashboard · Your learning journey
                </p>
              </div>
            </div>
          </section>

          {/* ─── Quick Stats ──────────────────────────────── */}
          <section>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              <StatCard icon={Flame} label="Streak" color="#f59e0b" />
              <StatCard icon={ClipboardList} label="Tasks Today" color="#6366f1" />
              <StatCard icon={TrendingUp} label="Sessions This Week" color="#10b981" />
              <StatCard icon={Trophy} label="Achievements" color="#f97316" />
            </div>
          </section>

          {/* ─── My Horse Section ─────────────────────────── */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Heart className="w-5 h-5 text-indigo-300" />
              <h2 className="text-lg font-semibold text-white">My Horse</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <HorseCard type="virtual" />
              <HorseCard type="real" />
            </div>
          </section>

          {/* ─── Today's Focus ─────────────────────────────── */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-5 h-5 text-indigo-300" />
              <h2 className="text-lg font-semibold text-white">Today's Focus</h2>
            </div>
            <div
              className="rounded-xl border p-6"
              style={{
                backgroundColor: STUDENT_CARD,
                borderColor: STUDENT_BORDER,
              }}
            >
              <div className="space-y-4">
                {[
                  { label: "Morning feed & water check", done: true },
                  { label: "Grooming session", done: false },
                  { label: "Review: Equine nutrition basics", done: false },
                  { label: "Log afternoon training session", done: false },
                ].map((task, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.03] border border-white/[0.04]"
                  >
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 ${
                        task.done
                          ? "bg-emerald-500/20 border-emerald-500"
                          : "border-gray-600"
                      }`}
                    >
                      {task.done && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      )}
                    </div>
                    <span
                      className={`text-sm ${
                        task.done
                          ? "text-gray-500 line-through"
                          : "text-gray-300"
                      }`}
                    >
                      {task.label}
                    </span>
                    <span className="ml-auto text-xs px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 font-medium">
                      Placeholder
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ─── Quick Actions ─────────────────────────────── */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Target className="w-5 h-5 text-indigo-300" />
              <h2 className="text-lg font-semibold text-white">Quick Actions</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <QuickAction
                icon={TrendingUp}
                label="Log Training Session"
                description="Record today's riding or groundwork session"
                accentColor="#10b981"
              />
              <QuickAction
                icon={BookOpen}
                label="Open Study Hub"
                description="Continue your current study module"
                accentColor="#6366f1"
              />
              <QuickAction
                icon={Brain}
                label="Ask AI Tutor"
                description="Get help with an equine topic"
                accentColor="#a78bfa"
              />
              <QuickAction
                icon={Calendar}
                label="View Schedule"
                description="Check upcoming lessons and events"
                accentColor="#06b6d4"
              />
            </div>
          </section>

          {/* ─── Module Navigation ─────────────────────────── */}
          <section className="hidden md:block">
            <div className="flex items-center gap-2 mb-4">
              <GraduationCap className="w-5 h-5 text-indigo-300" />
              <h2 className="text-lg font-semibold text-white">Explore</h2>
            </div>
            <div className="space-y-6">
              {studentModules.map((group) => (
                <div key={group.group}>
                  <p
                    className="text-xs font-semibold uppercase tracking-wider mb-3 px-1"
                    style={{ color: STUDENT_ACCENT }}
                  >
                    {group.group}
                  </p>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                    {group.items.map((item) => (
                      <button
                        key={item.label}
                        className="flex items-center gap-3 p-4 rounded-xl border transition-all duration-200 text-left group"
                        style={{
                          backgroundColor: STUDENT_CARD,
                          borderColor: STUDENT_BORDER,
                        }}
                      >
                        <div
                          className={`w-9 h-9 rounded-lg bg-gradient-to-br ${group.color} flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform`}
                        >
                          <item.icon className="w-4 h-4 text-white" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-white truncate">
                            {item.label}
                          </p>
                          <p className="text-xs text-gray-600 truncate">
                            {item.description}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ─── Coming Soon Banner ────────────────────────── */}
          <section className="pb-8">
            <div
              className="rounded-xl border p-6 text-center"
              style={{
                backgroundColor: `${STUDENT_ACCENT}08`,
                borderColor: `${STUDENT_ACCENT}20`,
              }}
            >
              <GraduationCap
                className="w-8 h-8 mx-auto mb-3 text-indigo-300"
              />
              <h3 className="text-base font-semibold text-white mb-2">
                Student Features Coming Soon
              </h3>
              <p className="text-sm text-gray-500 max-w-md mx-auto">
                Full student functionality — including AI tutor, achievements,
                study hub, and virtual horse simulation — is being built. This
                dashboard will grow with each update.
              </p>
            </div>
          </section>
        </div>
      </div>
    </DashboardLayout>
  );
}
