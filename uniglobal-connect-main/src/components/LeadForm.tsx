import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ArrowRight, GraduationCap, Globe, Settings, User, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { leadsAPI } from "@/services/api";

const steps = [
  { label: "Degree Selection", icon: GraduationCap },
  { label: "Country Selection", icon: Globe },
  { label: "Preferences", icon: Settings },
  { label: "Personal Details", icon: User },
];

const degrees = ["Bachelor's", "Master's", "MBA"];

const countries = [
  { name: "USA", flag: "🇺🇸" },
  { name: "UK", flag: "🇬🇧" },
  { name: "Canada", flag: "🇨🇦" },
  { name: "Germany", flag: "🇩🇪" },
  { name: "Australia", flag: "🇦🇺" },
  { name: "France", flag: "🇫🇷" },
  { name: "Ireland", flag: "🇮🇪" },
  { name: "Netherlands", flag: "🇳🇱" },
  { name: "Other", flag: "🌍" },
];

const budgets = ["< ₹10 Lakh", "₹10-20 Lakh", "₹20-30 Lakh", "₹30 Lakh+"];
const intakes = ["Fall 2025", "Spring 2026", "Fall 2026"];

const LeadForm = () => {
  const [step, setStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({
    degree: "",
    country: "",
    budget: "",
    intake: "",
    name: "",
    email: "",
    phone: "",
  });

  const canProceed = () => {
    if (step === 0) return !!data.degree;
    if (step === 1) return !!data.country;
    if (step === 2) return !!data.budget && !!data.intake;
    if (step === 3) return !!data.name && !!data.email && !!data.phone;
    return false;
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      
      // Map form data to API format
      const leadData = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        degree: data.degree === "Bachelor's" ? "Bachelor" : data.degree === "Master's" ? "Master" : "Diploma",
        country: data.country,
        preferredCountry: data.country,
        budget: data.budget === "< ₹10 Lakh" ? "0-20L" : data.budget === "₹10-20 Lakh" ? "20-40L" : data.budget === "₹20-30 Lakh" ? "40-60L" : "60L+",
        intake: data.intake,
      };

      // Send to backend
      const response = await leadsAPI.create(leadData);
      
      if (response.success) {
        toast.success("Thank you! Our counsellor will contact you shortly.", { duration: 5000 });
        setStep(0);
        setData({ degree: "", country: "", budget: "", intake: "", name: "", email: "", phone: "" });
      } else {
        toast.error(response.message || "Failed to submit form");
      }
    } catch (error: any) {
      const errorMsg = error.message || "Failed to submit form. Please try again.";
      toast.error(errorMsg);
      console.error("Form submission error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const next = () => {
    if (step === 3) return handleSubmit();
    setStep((s) => s + 1);
  };

  const slideVariants = {
    enter: { x: 40, opacity: 0 },
    center: { x: 0, opacity: 1 },
    exit: { x: -40, opacity: 0 },
  };

  return (
    <section id="lead-form" className="relative py-20 hero-gradient overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-accent/10 -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-accent/5 translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Left side */}
          <div className="text-primary-foreground">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-heading text-4xl md:text-5xl font-extrabold leading-tight mb-4"
            >
              Book your <span className="text-accent">free</span> study abroad consultation
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg opacity-80 mb-10 max-w-md"
            >
              Get expert help with your profile, shortlisting & applications — all in one free call.
            </motion.p>

            {/* Step indicator */}
            <div className="hidden lg:flex flex-col gap-1">
              {steps.map((s, i) => {
                const Icon = s.icon;
                const done = i < step;
                const active = i === step;
                return (
                  <div key={s.label} className="flex items-center gap-3 py-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${done ? "bg-accent text-accent-foreground" : active ? "bg-accent/20 text-accent border-2 border-accent" : "bg-primary-foreground/10 text-primary-foreground/40"}`}>
                      {done ? <Check size={16} /> : <Icon size={16} />}
                    </div>
                    <span className={`text-sm font-medium transition-colors ${active ? "text-primary-foreground" : "text-primary-foreground/50"}`}>{s.label}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right side - Form Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-card rounded-2xl p-6 md:p-8 card-shadow"
          >
            {/* Mobile step dots */}
            <div className="flex lg:hidden items-center justify-center gap-2 mb-6">
              {steps.map((_, i) => (
                <div key={i} className={`h-2 rounded-full transition-all ${i === step ? "w-8 bg-accent" : i < step ? "w-2 bg-accent/50" : "w-2 bg-border"}`} />
              ))}
            </div>

            <h3 className="font-heading font-bold text-lg text-card-foreground mb-1">{steps[step].label}</h3>
            <p className="text-sm text-muted-foreground mb-6">Step {step + 1} of 4</p>

            <AnimatePresence mode="wait">
              <motion.div key={step} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.25 }}>
                {step === 0 && (
                  <div className="grid gap-3">
                    {degrees.map((d) => (
                      <button
                        key={d}
                        onClick={() => setData({ ...data, degree: d })}
                        className={`w-full text-left px-5 py-4 rounded-xl border-2 transition-all font-medium ${data.degree === d ? "border-accent bg-accent/5 text-foreground" : "border-border hover:border-accent/30 text-muted-foreground"}`}
                      >
                        {d}
                      </button>
                    ))}
                  </div>
                )}

                {step === 1 && (
                  <div className="grid grid-cols-3 gap-3">
                    {countries.map((c) => (
                      <button
                        key={c.name}
                        onClick={() => setData({ ...data, country: c.name })}
                        className={`flex flex-col items-center gap-1 p-3 rounded-xl border-2 transition-all ${data.country === c.name ? "border-accent bg-accent/5" : "border-border hover:border-accent/30"}`}
                      >
                        <span className="text-2xl">{c.flag}</span>
                        <span className="text-xs font-medium text-card-foreground">{c.name}</span>
                      </button>
                    ))}
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-5">
                    <div>
                      <label className="text-sm font-medium text-card-foreground mb-2 block">Budget Range</label>
                      <div className="grid grid-cols-2 gap-2">
                        {budgets.map((b) => (
                          <button
                            key={b}
                            onClick={() => setData({ ...data, budget: b })}
                            className={`px-4 py-3 rounded-xl border-2 text-sm font-medium transition-all ${data.budget === b ? "border-accent bg-accent/5 text-foreground" : "border-border hover:border-accent/30 text-muted-foreground"}`}
                          >
                            {b}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-card-foreground mb-2 block">Preferred Intake</label>
                      <div className="grid grid-cols-3 gap-2">
                        {intakes.map((i) => (
                          <button
                            key={i}
                            onClick={() => setData({ ...data, intake: i })}
                            className={`px-3 py-3 rounded-xl border-2 text-sm font-medium transition-all ${data.intake === i ? "border-accent bg-accent/5 text-foreground" : "border-border hover:border-accent/30 text-muted-foreground"}`}
                          >
                            {i}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-4">
                    <Input placeholder="Full Name" value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })} className="h-12 rounded-xl" />
                    <Input placeholder="Email Address" type="email" value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} className="h-12 rounded-xl" />
                    <Input placeholder="Phone Number" type="tel" value={data.phone} onChange={(e) => setData({ ...data, phone: e.target.value })} className="h-12 rounded-xl" />
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            <div className="flex items-center gap-3 mt-8">
              {step > 0 && (
                <Button variant="outline" onClick={() => setStep((s) => s - 1)} className="rounded-xl h-12" disabled={isLoading}>
                  Back
                </Button>
              )}
              <Button
                onClick={next}
                disabled={!canProceed() || isLoading}
                className={`flex-1 h-12 rounded-xl font-semibold text-base border-0 ${step === 3 ? "accent-gradient text-accent-foreground" : "bg-primary text-primary-foreground"} disabled:opacity-40`}
              >
                {isLoading ? (
                  <>
                    <Loader size={18} className="mr-2 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    {step === 3 ? "Book Free Consultation" : "Continue"}
                    <ArrowRight size={18} className="ml-2" />
                  </>
                )}
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LeadForm;
