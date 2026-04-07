import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { trpc } from "@/lib/trpc";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2,
  Users,
  UserCog,
  FolderOpen,
  Heart,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Loader2,
  MapPin,
  Settings,
} from "lucide-react";
import { toast } from "sonner";

const SETUP_STEPS = [
  {
    id: "details",
    title: "Stable Details",
    description: "Set up your stable's name, location, and contact info",
    icon: Building2,
    color: "from-amber-500 to-orange-600",
  },
  {
    id: "staff",
    title: "Add Staff",
    description: "Invite your first team members",
    icon: UserCog,
    color: "from-blue-500 to-cyan-600",
  },
  {
    id: "owners",
    title: "Owners & Clients",
    description: "Add horse owners and client contacts",
    icon: Users,
    color: "from-purple-500 to-violet-600",
  },
  {
    id: "documents",
    title: "Document Structure",
    description: "Review document categories for your stable",
    icon: FolderOpen,
    color: "from-teal-500 to-green-600",
  },
  {
    id: "horses",
    title: "First Horses",
    description: "Add your stable's horses to get started",
    icon: Heart,
    color: "from-rose-500 to-pink-600",
  },
];

const DOCUMENT_CATEGORIES = [
  { icon: "🐴", name: "Passports", description: "Horse passports and FEI documents" },
  { icon: "💉", name: "Vaccinations", description: "Vaccination records and certificates" },
  { icon: "🩺", name: "Medical", description: "Vet reports, treatments, and health records" },
  { icon: "🦷", name: "Dental", description: "Dental care and examination records" },
  { icon: "🔬", name: "X-Rays / Imaging", description: "Radiographs and scan results" },
  { icon: "🔧", name: "Hoof Care", description: "Farrier records and hoof notes" },
  { icon: "🛡️", name: "Insurance", description: "Policy documents and claims" },
  { icon: "📋", name: "Contracts", description: "Livery, lease, and sale contracts" },
  { icon: "💳", name: "Invoices", description: "Billing, invoices, and receipts" },
  { icon: "🏋️", name: "Training Plans", description: "Training programs and competition prep" },
  { icon: "📂", name: "Other", description: "Miscellaneous stable documents" },
];

function StepIndicator({
  steps,
  current,
}: {
  steps: typeof SETUP_STEPS;
  current: number;
}) {
  return (
    <div className="flex items-center gap-1 overflow-x-auto pb-1">
      {steps.map((step, i) => {
        const Icon = step.icon;
        const isDone = i < current;
        const isActive = i === current;
        return (
          <div key={step.id} className="flex items-center gap-1 shrink-0">
            <div
              aria-label={`Step ${i + 1}: ${step.title}${isDone ? " (completed)" : isActive ? " (current)" : ""}`}
              className={`flex items-center gap-1.5 px-2 py-1 rounded-lg text-xs font-medium transition-all ${
                isDone
                  ? "bg-green-500/20 text-green-400"
                  : isActive
                    ? "bg-primary/20 text-primary"
                    : "bg-muted/30 text-muted-foreground"
              }`}
            >
              {isDone ? (
                <CheckCircle2 className="w-3.5 h-3.5" />
              ) : (
                <Icon className="w-3.5 h-3.5" />
              )}
              <span className="hidden sm:inline">{step.title}</span>
              <span className="sm:hidden">{i + 1}</span>
            </div>
            {i < steps.length - 1 && (
              <ChevronRight className="w-3 h-3 text-muted-foreground/40 shrink-0" />
            )}
          </div>
        );
      })}
    </div>
  );
}

function StableDetailsStep({
  onNext,
}: {
  onNext: () => void;
}) {
  const { data: stables = [] } = trpc.stables.list.useQuery();
  const createStable = trpc.stables.create.useMutation();
  const utils = trpc.useUtils();

  const [form, setForm] = useState({
    name: "",
    description: "",
    location: "",
  });
  const [saving, setSaving] = useState(false);

  const hasStable = stables.length > 0;

  const handleSave = async () => {
    if (!form.name.trim()) {
      toast.error("Stable name is required");
      return;
    }
    setSaving(true);
    try {
      await createStable.mutateAsync(form);
      await utils.stables.list.invalidate();
      toast.success("Stable created!");
      onNext();
    } catch {
      toast.error("Failed to create stable");
    } finally {
      setSaving(false);
    }
  };

  if (hasStable) {
    return (
      <div className="space-y-4">
        <div className="rounded-xl border border-green-500/30 bg-green-500/10 p-4 flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
          <div>
            <p className="font-medium text-green-300 text-sm">
              Stable already configured
            </p>
            <p className="text-xs text-green-400/70 mt-0.5">
              {stables[0]?.name} — {stables[0]?.location || "No location set"}
            </p>
          </div>
        </div>
        <Button onClick={onNext} className="w-full gap-2">
          Continue <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="space-y-1.5">
        <Label>Stable / Yard Name *</Label>
        <div className="relative">
          <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            className="pl-9"
            placeholder="e.g. Greenfield Equestrian Centre"
            value={form.name}
            onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
          />
        </div>
      </div>
      <div className="space-y-1.5">
        <Label>Location</Label>
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            className="pl-9"
            placeholder="e.g. Newmarket, Suffolk"
            value={form.location}
            onChange={(e) =>
              setForm((p) => ({ ...p, location: e.target.value }))
            }
          />
        </div>
      </div>
      <div className="space-y-1.5">
        <Label>Description</Label>
        <Textarea
          placeholder="A short description of your stable or yard..."
          rows={2}
          value={form.description}
          onChange={(e) =>
            setForm((p) => ({ ...p, description: e.target.value }))
          }
        />
      </div>
      <div className="flex gap-3">
        <Button
          onClick={handleSave}
          disabled={saving}
          className="flex-1 bg-gradient-to-r from-amber-600 to-orange-600 text-white border-0 gap-2"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
          Save & Continue
        </Button>
        <Button variant="ghost" onClick={onNext} className="text-muted-foreground">
          Skip
        </Button>
      </div>
    </div>
  );
}

function StaffStep({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Your stable&apos;s staff members are managed in the dedicated Staff
        Management area. You can add trainers, grooms, instructors, farriers,
        and more.
      </p>
      <div className="rounded-xl border border-white/5 bg-muted/20 p-4 space-y-2">
        <p className="text-sm font-medium">Staff roles available:</p>
        <div className="flex flex-wrap gap-1.5">
          {[
            "Stable Manager",
            "Trainer",
            "Instructor",
            "Groom / Yard Hand",
            "Farrier",
            "Vet / Veterinary",
          ].map((role) => (
            <Badge key={role} variant="secondary" className="text-xs">
              {role}
            </Badge>
          ))}
        </div>
      </div>
      <div className="flex gap-3">
        <Link href="/staff" className="flex-1">
          <Button className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white border-0 gap-2">
            <UserCog className="w-4 h-4" /> Go to Staff Management
          </Button>
        </Link>
        <Button variant="ghost" onClick={onNext} className="text-muted-foreground">
          Skip
        </Button>
      </div>
      <Button
        variant="outline"
        size="sm"
        onClick={onBack}
        className="w-full text-muted-foreground"
      >
        <ChevronLeft className="w-3.5 h-3.5 mr-1" /> Back
      </Button>
    </div>
  );
}

function OwnersStep({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Add horse owners and clients to your stable. Owner and client contacts
        are managed through the Contacts area, separate from your staff.
      </p>
      <div className="rounded-xl border border-white/5 bg-muted/20 p-4">
        <p className="text-sm font-medium mb-2">Contact types for owners:</p>
        <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
          <li>Horse Owner / Client</li>
          <li>Emergency Contact</li>
          <li>Breeder / Supplier</li>
          <li>Other Stable Contacts</li>
        </ul>
      </div>
      <div className="flex gap-3">
        <Link href="/contacts" className="flex-1">
          <Button className="w-full bg-gradient-to-r from-purple-600 to-violet-600 text-white border-0 gap-2">
            <Users className="w-4 h-4" /> Go to Contacts
          </Button>
        </Link>
        <Button variant="ghost" onClick={onNext} className="text-muted-foreground">
          Skip
        </Button>
      </div>
      <Button
        variant="outline"
        size="sm"
        onClick={onBack}
        className="w-full text-muted-foreground"
      >
        <ChevronLeft className="w-3.5 h-3.5 mr-1" /> Back
      </Button>
    </div>
  );
}

function DocumentsStep({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Your stable document storage is organised into categories so every file
        is easy to find. Here&apos;s the structure ready for you:
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-64 overflow-y-auto pr-1">
        {DOCUMENT_CATEGORIES.map((cat) => (
          <div
            key={cat.name}
            className="flex items-center gap-2.5 rounded-lg border border-white/5 bg-muted/20 p-2.5"
          >
            <span className="text-xl">{cat.icon}</span>
            <div>
              <p className="text-xs font-medium">{cat.name}</p>
              <p className="text-[10px] text-muted-foreground">
                {cat.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-3">
        <Link href="/documents" className="flex-1">
          <Button className="w-full bg-gradient-to-r from-teal-600 to-green-600 text-white border-0 gap-2">
            <FolderOpen className="w-4 h-4" /> Go to Documents
          </Button>
        </Link>
        <Button variant="ghost" onClick={onNext} className="text-muted-foreground">
          Continue
        </Button>
      </div>
      <Button
        variant="outline"
        size="sm"
        onClick={onBack}
        className="w-full text-muted-foreground"
      >
        <ChevronLeft className="w-3.5 h-3.5 mr-1" /> Back
      </Button>
    </div>
  );
}

function HorsesStep({ onFinish, onBack }: { onFinish: () => void; onBack: () => void }) {
  const { data: horses = [] } = trpc.horses.list.useQuery(undefined, {
    retry: false,
  });

  return (
    <div className="space-y-4">
      {horses.length > 0 ? (
        <div className="rounded-xl border border-green-500/30 bg-green-500/10 p-4 flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
          <div>
            <p className="font-medium text-green-300 text-sm">
              {horses.length} horse{horses.length !== 1 ? "s" : ""} already registered
            </p>
            <p className="text-xs text-green-400/70 mt-0.5">
              Your stable horses are all set.
            </p>
          </div>
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">
          Add your horses to complete your stable setup. You can add as many
          horses as needed and manage their health, training, and documents
          individually.
        </p>
      )}
      <div className="flex gap-3">
        <Link href="/horses/new" className="flex-1">
          <Button className="w-full bg-gradient-to-r from-rose-600 to-pink-600 text-white border-0 gap-2">
            <Heart className="w-4 h-4" /> Add a Horse
          </Button>
        </Link>
        <Button
          onClick={onFinish}
          variant="ghost"
          className="text-muted-foreground"
        >
          Finish
        </Button>
      </div>
      <Button
        variant="outline"
        size="sm"
        onClick={onBack}
        className="w-full text-muted-foreground"
      >
        <ChevronLeft className="w-3.5 h-3.5 mr-1" /> Back
      </Button>
    </div>
  );
}

function StableSetupContent() {
  const [currentStep, setCurrentStep] = useState(0);
  const [completed, setCompleted] = useState(false);

  const currentStepData = SETUP_STEPS[currentStep];
  const Icon = currentStepData.icon;

  if (completed) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4"
      >
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center mb-6 shadow-lg shadow-green-900/30">
          <CheckCircle2 className="w-10 h-10 text-white" />
        </div>
        <h2 className="font-serif text-2xl font-bold mb-2">
          Stable Setup Complete!
        </h2>
        <p className="text-muted-foreground mb-8 max-w-md text-sm">
          Your stable is ready. Head to the Stable Dashboard to get an overview
          of your operations, or explore any section from the navigation.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link href="/stable-dashboard">
            <Button
              size="lg"
              className="bg-gradient-to-r from-amber-600 to-orange-600 text-white border-0 gap-2"
            >
              <Building2 className="w-5 h-5" /> Go to Stable Dashboard
            </Button>
          </Link>
          <Button
            variant="outline"
            size="lg"
            onClick={() => {
              setCurrentStep(0);
              setCompleted(false);
            }}
          >
            <Settings className="w-5 h-5 mr-2" /> Review Setup
          </Button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="space-y-6 pb-6 max-w-2xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="font-serif text-2xl font-bold flex items-center gap-2">
          <Building2 className="w-6 h-6 text-amber-400" />
          Stable Setup
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Configure your stable step by step. You can always come back to this
          page to update your setup.
        </p>
      </div>

      {/* Step indicator */}
      <StepIndicator steps={SETUP_STEPS} current={currentStep} />

      {/* Step card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
        >
          <Card className="border-white/5 bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-xl bg-gradient-to-br ${currentStepData.color} flex items-center justify-center shadow-sm`}
                >
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <CardTitle className="font-serif text-base">
                    Step {currentStep + 1} of {SETUP_STEPS.length}:{" "}
                    {currentStepData.title}
                  </CardTitle>
                  <CardDescription className="text-xs">
                    {currentStepData.description}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {currentStep === 0 && (
                <StableDetailsStep onNext={() => setCurrentStep(1)} />
              )}
              {currentStep === 1 && (
                <StaffStep
                  onNext={() => setCurrentStep(2)}
                  onBack={() => setCurrentStep(0)}
                />
              )}
              {currentStep === 2 && (
                <OwnersStep
                  onNext={() => setCurrentStep(3)}
                  onBack={() => setCurrentStep(1)}
                />
              )}
              {currentStep === 3 && (
                <DocumentsStep
                  onNext={() => setCurrentStep(4)}
                  onBack={() => setCurrentStep(2)}
                />
              )}
              {currentStep === 4 && (
                <HorsesStep
                  onFinish={() => setCompleted(true)}
                  onBack={() => setCurrentStep(3)}
                />
              )}
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default function StableSetup() {
  return (
    <DashboardLayout>
      <StableSetupContent />
    </DashboardLayout>
  );
}
