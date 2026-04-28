import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Icon } from "@/components/diagnosis/Icon";
import { HomeView } from "@/components/diagnosis/HomeView";
import { DiagnosisView } from "@/components/diagnosis/DiagnosisView";
import { AnalysisView } from "@/components/diagnosis/AnalysisView";
import { LibraryView } from "@/components/diagnosis/LibraryView";
import { GuideView } from "@/components/diagnosis/GuideView";
import { ValidityView } from "@/components/diagnosis/ValidityView";
import { archetypes } from "@/lib/data";
import { decodeInputs } from "@/lib/share";
import type { Inputs, Archetype } from "@/lib/types";
import { motion, AnimatePresence } from "framer-motion";

export function MIM35App() {
  const [activeTab, setActiveTab] = useState<string>("home");
  const [inputs, setInputs] = useState<Inputs>({
    enneagram: "",
    big5: { openness: "", conscientiousness: "", extraversion: "", agreeableness: "", neuroticism: "" },
    anchor: "",
    via: [],
    eq: { awareness: "", regulation: "", motivation: "", empathy: "", social: "" },
  });
  const [results, setResults] = useState<Archetype[]>([]);

  const calculateResults = (targetInputs: Inputs): Archetype[] => {
    const scores = archetypes.map((t) => {
      let score = 0;
      if (t.traits.enneagram.includes(targetInputs.enneagram)) score += 3;
      if (t.traits.anchor.includes(targetInputs.anchor)) score += 2;
      const targetBig5 = t.traits.big5;
      if (targetInputs.big5[targetBig5 as keyof typeof targetInputs.big5] === "High") score += 2;
      const viaMatches = targetInputs.via.filter((v) => t.traits.via.includes(v)).length;
      score += viaMatches * 1.5;
      if (targetInputs.eq) {
        if (targetInputs.eq.motivation === "High") score += 0.5;
        if (targetInputs.eq.empathy === "High") score += 0.5;
        if (targetInputs.eq.awareness === "High") score += 0.3;
      }
      return { ...t, score };
    });
    scores.sort((a, b) => (b.score || 0) - (a.score || 0));
    return scores;
  };

  const handleAnalyze = (manualInputs?: Inputs) => {
    const targetInputs = manualInputs || inputs;
    const scores = calculateResults(targetInputs);
    setResults(scores);
    setActiveTab("analysis");
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const encoded = params.get('d');
    if (encoded) {
      const decoded = decodeInputs(encoded);
      if (decoded) {
        setInputs(decoded);
        const scores = calculateResults(decoded);
        setResults(scores);
        setActiveTab("analysis");
        window.history.replaceState({}, '', window.location.pathname);
      }
    }
  }, []);

  const handleRestore = (savedInputs: Inputs) => {
    setInputs(savedInputs);
    const scores = calculateResults(savedInputs);
    setResults(scores);
    if (activeTab !== "analysis") {
      setActiveTab("analysis");
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navItems = [
    { id: "home", label: "소명의 여정", icon: "Compass" },
    { id: "diagnosis", label: "성향 진단", icon: "Fingerprint" },
    { id: "analysis", label: "종합 분석", icon: "Activity" },
    { id: "library", label: "아키타입 도서관", icon: "BookOpen" },
    { id: "guide", label: "지표 가이드", icon: "Info" },
    { id: "validity", label: "학술 타당성", icon: "ShieldCheck" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#fcfbf9]">
      <header className="bg-white/80 backdrop-blur-2xl border-b border-brand-100 sticky top-0 z-[60] px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4 cursor-pointer group" onClick={() => setActiveTab("home")}>
            <div className="w-12 h-12 bg-brand-500 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-brand-500/20 group-hover:rotate-12 transition-transform duration-500">
              <Icon name="User" size={28} />
            </div>
            <div>
              <h1 className="text-2xl font-black text-brand-900 leading-none tracking-tight">
                MIM35
              </h1>
              <span className="text-[10px] text-brand-500 tracking-[0.3em] uppercase font-black">
                Pastoral Archetype Engine
              </span>
            </div>
          </div>
          
          <nav className="hidden lg:flex items-center gap-1 bg-slate-100/50 p-1.5 rounded-2xl border border-slate-200">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-black transition-all ${
                  activeTab === item.id
                    ? "bg-white text-brand-500 shadow-lg shadow-brand-500/5"
                    : "text-slate-400 hover:text-brand-500"
                }`}
              >
                <Icon name={item.icon as any} size={14} />
                {item.label}
              </button>
            ))}
          </nav>

          <button className="hidden md:flex premium-btn-primary !py-3 !px-8 !text-xs !shadow-brand-500/20">
            Start Assessment
          </button>
        </div>
      </header>

      <main className="flex-grow w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {activeTab === "home" && <HomeView onStart={() => setActiveTab("diagnosis")} />}
            {activeTab === "diagnosis" && (
              <DiagnosisView inputs={inputs} setInputs={setInputs} onFinish={handleAnalyze} />
            )}
            {activeTab === "analysis" && (
              <AnalysisView results={results} inputs={inputs} onRestore={handleRestore} />
            )}
            {activeTab === "library" && <LibraryView />}
            {activeTab === "guide" && <GuideView />}
            {activeTab === "validity" && <ValidityView />}
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="py-24 px-6 border-t border-brand-100 bg-white/50 mt-32">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="space-y-6 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-4">
              <div className="w-12 h-12 bg-brand-500 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-brand-500/20">
                <Icon name="User" size={28} />
              </div>
              <div>
                <h2 className="text-2xl font-black text-brand-900 tracking-tight">MIM35 Assessment</h2>
                <p className="text-xs font-black text-brand-500 tracking-widest uppercase">Cheon Il Guk Public Official Assessment Tool</p>
              </div>
            </div>
            <p className="text-slate-400 font-bold max-w-md leading-relaxed">
              본 진단 도구는 공직자의 내면적 동기와 외적 역량을 다각도로 분석하여 <br/>
              최적의 섭리적 아키타입을 발견하도록 돕습니다.
            </p>
          </div>
          <div className="flex gap-12">
             <div className="space-y-4">
                <h4 className="text-sm font-black text-brand-900 uppercase tracking-widest">Resources</h4>
                <ul className="space-y-2 text-sm font-bold text-slate-500">
                  <li className="hover:text-brand-500 cursor-pointer">Documentation</li>
                  <li className="hover:text-brand-500 cursor-pointer">Validity Report</li>
                  <li className="hover:text-brand-500 cursor-pointer">Archive</li>
                </ul>
             </div>
             <div className="space-y-4">
                <h4 className="text-sm font-black text-brand-900 uppercase tracking-widest">Support</h4>
                <ul className="space-y-2 text-sm font-bold text-slate-500">
                  <li className="hover:text-brand-500 cursor-pointer">Help Center</li>
                  <li className="hover:text-brand-500 cursor-pointer">Contact</li>
                  <li className="hover:text-brand-500 cursor-pointer">Privacy</li>
                </ul>
             </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-24 pt-12 border-t border-brand-100 flex flex-col md:flex-row justify-between items-center gap-6">
           <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">© 2026 Unified Mirror Platform. All rights reserved.</p>
           <div className="flex gap-6">
              <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400 hover:bg-brand-500 hover:text-white transition-all cursor-pointer"><Icon name="Github" size={20}/></div>
              <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400 hover:bg-brand-500 hover:text-white transition-all cursor-pointer"><Icon name="Globe" size={20}/></div>
           </div>
        </div>
      </footer>
    </div>
  );
}
