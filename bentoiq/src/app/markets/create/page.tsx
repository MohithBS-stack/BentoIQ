"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight, ArrowLeft, Check, Wand2, Calendar, FileText, Tag, Heading } from "lucide-react";
import { toastSuccess } from "@/lib/toast";
import { useRouter } from "next/navigation";

const CATEGORIES = ["Technology", "Finance", "Sports", "Climate", "Politics", "Healthcare", "Crypto", "AI", "Community"];

export default function CreateMarketPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    date: "",
  });

  const updateForm = (key: string, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleNext = () => {
    if (step < 5) setStep(step + 1);
    else {
      toastSuccess("Decision Market Created!", "Redirecting to your new market...");
      setTimeout(() => router.push("/markets"), 1500);
    }
  };

  const handleAIAction = (action: string) => {
    toastSuccess("AI Assisting", `${action}... (Mock)`);
    if (action === "Improve Title") updateForm("title", "Will Quantum Computing achieve supremacy on RSA-2048 by end of 2027?");
    if (action === "Suggest Category") updateForm("category", "Technology");
    if (action === "Generate Summary") updateForm("description", "A market assessing the probability of quantum hardware scaling to break current encryption standards, factoring in error-correction breakthroughs.");
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 h-[calc(100vh-6rem)] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 flex-shrink-0">
        <div>
          <h1 className="text-2xl font-extrabold text-[var(--text-primary)] tracking-tight">Create Decision Market</h1>
          <p className="text-xs text-[var(--text-secondary)]">BentoIQ Studio</p>
        </div>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map(s => (
            <div key={s} className={`w-12 h-1.5 rounded-full transition-colors ${step >= s ? "bg-blue-500" : "bg-white/[0.08]"}`} />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 flex-1 min-h-0">
        {/* Main Wizard Area (8 cols) */}
        <div className="lg:col-span-8 flex flex-col h-full">
          <div className="glass-card flex-1 p-8 md:p-12 relative overflow-hidden flex flex-col justify-center border-blue-500/20">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6 w-full max-w-xl mx-auto">
                  <div className="flex items-center gap-3 text-blue-400 mb-2">
                    <Heading size={24} /> <span className="font-bold tracking-widest uppercase text-xs">Step 1</span>
                  </div>
                  <h2 className="text-3xl font-bold text-[var(--text-primary)]">What decision do you want to forecast?</h2>
                  <input 
                    type="text" 
                    placeholder="e.g. Will SpaceX land on Mars by 2028?"
                    value={formData.title}
                    onChange={(e) => updateForm("title", e.target.value)}
                    className="w-full bg-transparent border-b-2 border-white/10 text-xl text-[var(--text-primary)] placeholder:text-[var(--text-secondary)] opacity-70 py-4 focus:outline-none focus:border-blue-500 transition-colors"
                    autoFocus
                  />
                </motion.div>
              )}

              {step === 2 && (
                <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6 w-full max-w-xl mx-auto">
                  <div className="flex items-center gap-3 text-purple-400 mb-2">
                    <Tag size={24} /> <span className="font-bold tracking-widest uppercase text-xs">Step 2</span>
                  </div>
                  <h2 className="text-3xl font-bold text-[var(--text-primary)]">Select a primary category</h2>
                  <div className="flex flex-wrap gap-3">
                    {CATEGORIES.map(cat => (
                      <button
                        key={cat}
                        onClick={() => updateForm("category", cat)}
                        className={`px-4 py-2 rounded-xl text-sm font-bold border transition-all ${
                          formData.category === cat ? "bg-purple-500/20 text-purple-300 border-purple-500/50 shadow-lg shadow-purple-500/20" : "bg-white/[0.04] text-[var(--text-secondary)] border-white/[0.08] hover:bg-white/[0.08] hover:text-[var(--text-primary)]"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6 w-full max-w-xl mx-auto">
                  <div className="flex items-center gap-3 text-emerald-400 mb-2">
                    <FileText size={24} /> <span className="font-bold tracking-widest uppercase text-xs">Step 3</span>
                  </div>
                  <h2 className="text-3xl font-bold text-[var(--text-primary)]">Provide context & reasoning</h2>
                  <textarea 
                    rows={4}
                    placeholder="Describe the context, key drivers, and resolution criteria..."
                    value={formData.description}
                    onChange={(e) => updateForm("description", e.target.value)}
                    className="w-full bg-white/[0.02] border border-white/10 rounded-2xl text-base text-[var(--text-primary)] placeholder:text-[var(--text-secondary)] opacity-70 p-4 focus:outline-none focus:border-emerald-500 transition-colors resize-none"
                  />
                </motion.div>
              )}

              {step === 4 && (
                <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6 w-full max-w-xl mx-auto">
                  <div className="flex items-center gap-3 text-amber-400 mb-2">
                    <Calendar size={24} /> <span className="font-bold tracking-widest uppercase text-xs">Step 4</span>
                  </div>
                  <h2 className="text-3xl font-bold text-[var(--text-primary)]">When will this resolve?</h2>
                  <input 
                    type="date" 
                    value={formData.date}
                    onChange={(e) => updateForm("date", e.target.value)}
                    className="w-full bg-white/[0.02] border-b-2 border-white/10 text-xl text-[var(--text-primary)] py-4 px-2 focus:outline-none focus:border-amber-500 transition-colors"
                  />
                </motion.div>
              )}

              {step === 5 && (
                <motion.div key="step5" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6 w-full max-w-2xl mx-auto">
                  <div className="flex items-center gap-3 text-blue-400 mb-2">
                    <Check size={24} /> <span className="font-bold tracking-widest uppercase text-xs">Review & Submit</span>
                  </div>
                  <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] space-y-4">
                    <div>
                      <span className="text-[10px] text-[var(--text-secondary)] opacity-70 uppercase font-bold tracking-widest">Title</span>
                      <p className="text-lg font-bold text-[var(--text-primary)]">{formData.title || "Untitled"}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 border-t border-white/[0.06] pt-4">
                      <div>
                        <span className="text-[10px] text-[var(--text-secondary)] opacity-70 uppercase font-bold tracking-widest">Category</span>
                        <p className="text-sm font-semibold text-[var(--text-primary)]">{formData.category || "None"}</p>
                      </div>
                      <div>
                        <span className="text-[10px] text-[var(--text-secondary)] opacity-70 uppercase font-bold tracking-widest">Resolution Date</span>
                        <p className="text-sm font-semibold text-[var(--text-primary)]">{formData.date || "Not set"}</p>
                      </div>
                    </div>
                    <div className="border-t border-white/[0.06] pt-4">
                      <span className="text-[10px] text-[var(--text-secondary)] opacity-70 uppercase font-bold tracking-widest">Description</span>
                      <p className="text-xs text-[var(--text-secondary)] mt-1">{formData.description || "No description provided."}</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Navigation Bar */}
          <div className="flex justify-between items-center pt-6 pb-2">
            <button
              onClick={() => step > 1 && setStep(step - 1)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-colors ${step > 1 ? "text-[var(--text-secondary)] hover:text-[var(--text-primary)] bg-white/[0.05]" : "text-transparent pointer-events-none"}`}
            >
              <ArrowLeft size={16} /> Back
            </button>
            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-8 py-3 rounded-xl font-bold text-sm bg-blue-600 hover:bg-blue-500 text-[var(--text-primary)] shadow-xl shadow-blue-500/20 transition-all active:scale-95"
            >
              {step === 5 ? "Deploy Market" : "Continue"} <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* Right Col: AI Assistant (4 cols) */}
        <div className="hidden lg:flex flex-col lg:col-span-4 h-full">
          <div className="glass-card flex-1 p-6 flex flex-col space-y-6 border-purple-500/20 bg-gradient-to-b from-purple-500/[0.05] to-transparent">
            <div className="flex items-center gap-2">
              <Sparkles size={18} className="text-purple-400 animate-pulse" />
              <h3 className="text-sm font-bold text-[var(--text-primary)] tracking-tight">Gemini Copilot</h3>
            </div>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              I can help you construct a clear, unambiguous, and highly resolvable prediction market.
            </p>

            <div className="space-y-3 pt-4 border-t border-white/[0.06] flex-1">
              <h4 className="text-[10px] uppercase font-bold tracking-widest text-[var(--text-secondary)] opacity-70">Suggestions</h4>
              
              <button onClick={() => handleAIAction("Improve Title")} className="w-full flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06] hover:border-purple-500/30 transition-all group text-left">
                <span className="text-xs font-semibold text-[var(--text-primary)] group-hover:text-[var(--text-primary)]">Refine Title for Clarity</span>
                <Wand2 size={14} className="text-purple-400 opacity-50 group-hover:opacity-100" />
              </button>
              
              <button onClick={() => handleAIAction("Suggest Category")} className="w-full flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06] hover:border-purple-500/30 transition-all group text-left">
                <span className="text-xs font-semibold text-[var(--text-primary)] group-hover:text-[var(--text-primary)]">Auto-categorize</span>
                <Wand2 size={14} className="text-purple-400 opacity-50 group-hover:opacity-100" />
              </button>

              <button onClick={() => handleAIAction("Generate Summary")} className="w-full flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06] hover:border-purple-500/30 transition-all group text-left">
                <span className="text-xs font-semibold text-[var(--text-primary)] group-hover:text-[var(--text-primary)]">Generate Resolution Criteria</span>
                <Wand2 size={14} className="text-purple-400 opacity-50 group-hover:opacity-100" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
