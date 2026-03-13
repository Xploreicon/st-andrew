"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";

type FormData = {
  name: string;
  email: string;
  projectType: string;
  budget: string;
  details: string;
};

const PROJECT_TYPES = ["Launch Video", "Brand Video", "Motion Graphics", "Social Content", "Other"];
const BUDGETS = ["< $500", "$500 - $1,000", "$1,000 - $3,000", "$3,000+", "Let's discuss"];

export default function ContactSection() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    projectType: "",
    budget: "",
    details: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [step]);

  const handleNext = () => {
    if (step < 4) {
      setStep((s) => s + 1);
    } else {
      handleSubmit();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (step === 0 && !formData.name) return;
      if (step === 1 && (!formData.email || !formData.email.includes("@"))) return;
      if (step === 4 && !formData.details) return;
      handleNext();
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setIsSubmitted(true);
      }
    } catch (error) {
      console.error(error);
    }
    setIsSubmitting(false);
  };

  const progress = ((step + 1) / 5) * 100;

  return (
    <section id="contact" className="py-32 px-6 md:px-12 bg-background min-h-[100svh] flex flex-col relative overflow-hidden">
      
      <div className="flex-1 w-full max-w-4xl mx-auto relative z-10 flex flex-col justify-center mt-20 md:mt-0">
        
        {!isSubmitted ? (
          <>
            <div className="mb-16">
              <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-foreground">
                Start a <span className="text-muted italic font-light">Project.</span>
              </h2>
            </div>

            {/* Premium Progress Bar */}
            <div className="w-full h-[2px] bg-white/10 mb-16 relative">
              <motion.div 
                className="absolute top-0 left-0 h-full bg-accent"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>

            <div className="h-[300px] relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 w-full"
                >
                  {/* Step 1: Name */}
                  {step === 0 && (
                    <div className="flex flex-col gap-8">
                      <label className="text-3xl md:text-5xl font-medium text-foreground tracking-tight">
                        What's your name?
                      </label>
                      <input
                        ref={inputRef as any}
                        type="text"
                        placeholder="Type here..."
                        className="text-2xl md:text-5xl bg-transparent border-b-2 border-white/20 focus:border-accent pb-4 outline-none text-foreground placeholder:text-zinc-800 transition-colors w-full font-light"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        onKeyDown={handleKeyDown}
                      />
                    </div>
                  )}

                  {/* Step 2: Email */}
                  {step === 1 && (
                    <div className="flex flex-col gap-8">
                      <label className="text-3xl md:text-5xl font-medium text-foreground tracking-tight">
                        What's your email?
                      </label>
                      <input
                        ref={inputRef as any}
                        type="email"
                        placeholder="name@example.com"
                        className="text-2xl md:text-5xl bg-transparent border-b-2 border-white/20 focus:border-accent pb-4 outline-none text-foreground placeholder:text-zinc-800 transition-colors w-full font-light"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        onKeyDown={handleKeyDown}
                      />
                    </div>
                  )}

                  {/* Step 3: Project Type */}
                  {step === 2 && (
                    <div className="flex flex-col gap-8">
                      <label className="text-3xl md:text-5xl font-medium text-foreground tracking-tight">
                        What type of project?
                      </label>
                      <div className="flex flex-wrap gap-4 mt-4">
                        {PROJECT_TYPES.map((type) => (
                          <button
                            key={type}
                            onClick={() => {
                              setFormData({ ...formData, projectType: type });
                              setTimeout(handleNext, 400);
                            }}
                            className={`px-8 py-4 rounded-full border text-lg md:text-xl transition-all duration-300 font-light ${formData.projectType === type ? 'bg-foreground text-background border-foreground scale-[1.02]' : 'bg-transparent border-white/10 text-muted hover:border-white/40 hover:text-foreground'}`}
                          >
                            {type}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Step 4: Budget */}
                  {step === 3 && (
                    <div className="flex flex-col gap-8">
                      <label className="text-3xl md:text-5xl font-medium text-foreground tracking-tight">
                        What's your budget range?
                      </label>
                      <div className="flex flex-wrap gap-4 mt-4">
                        {BUDGETS.map((tier) => (
                          <button
                            key={tier}
                            onClick={() => {
                              setFormData({ ...formData, budget: tier });
                              setTimeout(handleNext, 400);
                            }}
                            className={`px-8 py-4 rounded-full border text-lg md:text-xl transition-all duration-300 font-light ${formData.budget === tier ? 'bg-foreground text-background border-foreground scale-[1.02]' : 'bg-transparent border-white/10 text-muted hover:border-white/40 hover:text-foreground'}`}
                          >
                            {tier}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Step 5: Details */}
                  {step === 4 && (
                    <div className="flex flex-col gap-8 h-full">
                      <label className="text-3xl md:text-5xl font-medium text-foreground tracking-tight">
                        Tell me about your project
                      </label>
                      <textarea
                        ref={inputRef as any}
                        placeholder="Any details, references, timeline..."
                        className="h-32 md:h-48 text-xl md:text-3xl bg-transparent border-b-2 border-white/20 focus:border-accent pb-4 pt-2 outline-none text-foreground placeholder:text-zinc-800 transition-colors w-full resize-none font-light"
                        value={formData.details}
                        onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                        onKeyDown={handleKeyDown}
                      />
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="mt-16 flex items-center justify-between">
              {step > 0 ? (
                <button 
                  onClick={() => setStep(s => s - 1)}
                  className="text-lg font-medium text-muted hover:text-foreground transition-colors py-2"
                >
                  &larr; Back
                </button>
              ) : <div />}

              <button
                onClick={handleNext}
                disabled={isSubmitting || (step === 0 && !formData.name) || (step === 1 && !formData.email) || (step === 4 && !formData.details)}
                className="group inline-flex items-center gap-4 px-10 py-5 bg-foreground text-background rounded-full text-lg font-semibold tracking-wide uppercase hover:bg-zinc-200 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-20 disabled:hover:scale-100 disabled:cursor-not-allowed"
              >
                {step === 4 ? (isSubmitting ? "Sending..." : "Submit Request") : "Next"}
                {step < 4 && <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />}
              </button>
            </div>
            
            <div className="mt-6 text-sm text-zinc-600 font-medium">
              Press <kbd className="px-2 py-1 bg-white/10 rounded-md font-sans text-xs mx-1">Enter ↵</kbd> to continue
            </div>
          </>
        ) : (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center justify-center text-center py-20"
          >
            <CheckCircle2 size={80} className="text-accent mb-8" strokeWidth={1} />
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-foreground mb-6">
              Request <span className="text-muted italic font-light">Received.</span>
            </h2>
            <p className="text-xl md:text-2xl text-muted font-light">I'll review the details and get back to you shortly.</p>
          </motion.div>
        )}
      </div>

      <div className="w-full max-w-7xl mx-auto px-6 mt-20 mb-8 flex flex-col md:flex-row items-center justify-between text-zinc-500 text-sm font-medium tracking-widest uppercase relative z-10 gap-4">
        <div className="flex items-center gap-8">
          <a href="https://t.me/standrew0x" target="_blank" rel="noreferrer" className="hover:text-accent transition-colors">Telegram</a>
          <a href="https://x.com/standrew0x" target="_blank" rel="noreferrer" className="hover:text-accent transition-colors">Twitter (X)</a>
        </div>
        <div>
          &copy; {new Date().getFullYear()} Andrew. All Rights Reserved.
        </div>
      </div>
    </section>
  );
}
