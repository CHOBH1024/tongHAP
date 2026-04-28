import React, { useState, useRef } from 'react';
import { 
  Monitor, 
  Smartphone, 
  Zap, 
  Layers, 
  AlertTriangle,
  Check,
  BookOpen,
  Trophy,
  Star,
  Heart,
  ShieldCheck,
  ChevronRight,
  ArrowRight,
  Download,
  RotateCcw
} from 'lucide-react';
import html2canvas from 'html2canvas';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  ResponsiveContainer 
} from 'recharts';

export interface Question {
  c: number; // category (1-5 for part 1, 6 for part 2)
  t: "L" | "R" | "V"; // L: Likert, R: Reverse, V: Verification (L-Scale)
  q?: string;
  left?: string;
  right?: string;
  descL?: string;
  descR?: string;
}

interface MirrorAppProps {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
  part1Questions: Question[];
  part2Questions: any[];
  dimensions: string[];
  personaLogic: (avg: number) => { status: string; desc: string };
  styleLogic: (dilAvg: number) => { header: string; body: string };
  adviceLogic: (scores: number[]) => { personal: string; ministry: string; actions: string[] };
}

export const MirrorApp: React.FC<MirrorAppProps> = ({ 
  name, subtitle, description, icon, part1Questions, part2Questions, dimensions, personaLogic, styleLogic, adviceLogic 
}) => {
  const [viewMode, setViewMode] = useState<'pc' | 'mobile'>('pc');
  const [screen, setScreen] = useState<'intro' | 'mode' | 'survey' | 'results'>('intro');
  const [_mode, setMode] = useState<30 | 70 | 120>(120);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [activeQuestions, setActiveQuestions] = useState<any[]>([]);
  const captureRef = useRef<HTMLDivElement>(null);

  const selectMode = (m: 30 | 70 | 120) => {
    setMode(m);
    let subset: any[] = [];
    if (m === 30) {
      for(let i=1; i<=5; i++) {
        subset.push(...part1Questions.filter(q => q.c === i).slice(0, 2));
      }
      setActiveQuestions([...subset, ...part2Questions]);
    } else if (m === 70) {
      for(let i=1; i<=5; i++) {
        subset.push(...part1Questions.filter(q => q.c === i).slice(0, 10));
      }
      setActiveQuestions([...subset, ...part2Questions]);
    } else {
      setActiveQuestions([...part1Questions, ...part2Questions]);
    }
    setScreen('survey');
  };

  const handleAnswer = (val: number) => {
    const newAnswers = { ...answers, [currentIndex]: val };
    setAnswers(newAnswers);
    
    setTimeout(() => {
      if (currentIndex < activeQuestions.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        setScreen('results');
      }
    }, 200);
  };

  const calculateResults = () => {
    let scores = [0, 0, 0, 0, 0];
    let counts = [0, 0, 0, 0, 0];
    let vHits = 0;
    let consecutiveCount = 0;
    let maxConsecutive = 0;
    let lastAns = -1;

    const p1Len = activeQuestions.filter(q => q.c < 6).length;
    
    activeQuestions.slice(0, p1Len).forEach((q, i) => {
      let ans = answers[i] || 3;
      if (ans === lastAns) {
        consecutiveCount++;
        maxConsecutive = Math.max(maxConsecutive, consecutiveCount);
      } else {
        consecutiveCount = 1;
        lastAns = ans;
      }
      if (q.t === "R") ans = 6 - ans;
      if (q.t === "V" && ans >= 4) vHits++;
      scores[q.c - 1] += ans;
      counts[q.c - 1]++;
    });

    const finalScores = scores.map((s, i) => counts[i] > 0 ? Math.round((s / (counts[i] * 5)) * 100) : 0);
    const totalAvg = finalScores.reduce((a, b) => a + b, 0) / 5;

    let dilSum = 0;
    activeQuestions.slice(p1Len).forEach((_, i) => {
      dilSum += (answers[p1Len + i] || 3);
    });
    const dilAvg = part2Questions.length > 0 ? dilSum / part2Questions.length : 3;
    const isUnreliable = p1Len > 0 && maxConsecutive >= (p1Len * 0.4);

    const chartData = dimensions.map((dim, i) => ({
      subject: dim,
      A: finalScores[i],
      fullMark: 100,
    }));

    return { finalScores, totalAvg, dilAvg, vHits, isUnreliable, maxConsecutive, chartData };
  };

  const downloadReport = async () => {
    if (!captureRef.current) return;
    const canvas = await html2canvas(captureRef.current, { scale: 2, backgroundColor: '#f2f4f6' });
    const link = document.createElement('a');
    link.download = `${name}_Result_Report.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  const currentQ = activeQuestions[currentIndex];
  const results = screen === 'results' ? calculateResults() : null;

  return (
    <div className={`transition-all duration-700 ${viewMode === 'mobile' ? 'max-w-[414px] mx-auto border-[12px] border-brand-900 rounded-[48px] h-[840px] overflow-y-auto bg-brand-50 shadow-2xl relative' : 'w-full'}`}>
      
      {/* Device Toggle */}
      <div className="flex justify-end items-center mb-6 px-2 sticky top-4 z-50">
        <div className="flex bg-white/50 backdrop-blur-md rounded-2xl p-1 shadow-sm border border-white/50">
          <button onClick={() => setViewMode('pc')} className={`px-4 py-2 rounded-xl text-xs font-black flex items-center gap-2 transition-all ${viewMode === 'pc' ? 'bg-white text-brand-500 shadow-sm' : 'text-slate-400'}`}>
            <Monitor size={14} /> PC
          </button>
          <button onClick={() => setViewMode('mobile')} className={`px-4 py-2 rounded-xl text-xs font-black flex items-center gap-2 transition-all ${viewMode === 'mobile' ? 'bg-white text-brand-500 shadow-sm' : 'text-slate-400'}`}>
            <Smartphone size={14} /> MOBILE
          </button>
        </div>
      </div>

      <div className="bg-[#f2f4f6] min-h-full p-2 md:p-6">
        <AnimatePresence mode="wait">
          {screen === 'intro' && (
            <motion.div key="intro" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-12 py-12 px-6">
              <div className="text-center space-y-4">
                <motion.div 
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  className="w-24 h-24 bg-white rounded-[32px] shadow-premium flex items-center justify-center mx-auto mb-8 text-brand-500"
                >
                  {React.cloneElement(icon as React.ReactElement, { size: 40 })}
                </motion.div>
                <span className="text-brand-500 font-black tracking-[0.3em] text-xs uppercase">{subtitle}</span>
                <h1 className="text-4xl md:text-5xl font-black tracking-tight text-brand-900 leading-tight">{name} 진단</h1>
                <p className="text-slate-500 text-lg leading-relaxed whitespace-pre-line max-w-sm mx-auto font-medium">{description}</p>
              </div>

              <div className="glass-card space-y-8">
                <h3 className="font-black flex items-center gap-2 text-brand-900 text-xl"><BookOpen size={24} className="text-brand-500" /> 진단 가이드</h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-500 flex items-center justify-center shrink-0 font-black">01</div>
                    <p className="text-sm text-slate-600 leading-relaxed font-bold pt-2">개인의 5대 핵심 역량을 정밀하게 분석하여 가시화합니다.</p>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-500 flex items-center justify-center shrink-0 font-black">02</div>
                    <p className="text-sm text-slate-600 leading-relaxed font-bold pt-2">현장 사역의 딜레마 상황을 통해 실제적인 대처 스타일을 파악합니다.</p>
                  </div>
                </div>
              </div>

              <button onClick={() => setScreen('mode')} className="premium-btn-primary w-full py-6 text-xl justify-center group">
                진단 시작하기 <ArrowRight className="group-hover:translate-x-2 transition-transform" />
              </button>
            </motion.div>
          )}

          {screen === 'mode' && (
            <motion.div key="mode" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8 py-12 px-6">
              <div className="text-center space-y-2 mb-10">
                <h2 className="text-4xl font-black tracking-tight text-brand-900 leading-tight">진단 모드를<br/>선택해주세요</h2>
                <p className="text-slate-500 font-bold text-lg">성찰하고 싶은 깊이를 결정합니다.</p>
              </div>

              <div className="grid gap-6">
                {[
                  { m: 30, t: "초고속 진단", d: "30문항 · 약 3분", c: "bg-emerald-50", ic: <Zap size={24} className="text-emerald-500" />, p: false },
                  { m: 70, t: "핵심 역량 진단", d: "70문항 · 약 8분", c: "bg-brand-50", ic: <Check size={24} className="text-brand-500" />, p: false },
                  { m: 120, t: "심층 정밀 분석", d: "120문항 · 약 15분", c: "bg-brand-500", ic: <Layers size={24} className="text-white" />, p: true }
                ].map((mode) => (
                  <button 
                    key={mode.m} 
                    onClick={() => selectMode(mode.m as any)} 
                    className={`glass-card !p-6 text-left flex items-center justify-between group border-none ${mode.p ? '!bg-brand-900 !text-white' : ''}`}
                  >
                    <div className="flex items-center gap-6">
                      <div className={`w-14 h-14 ${mode.c} rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform shadow-sm`}>
                        {mode.ic}
                      </div>
                      <div>
                        <h3 className={`text-xl font-black ${mode.p ? 'text-white' : 'text-brand-900'}`}>{mode.t}</h3>
                        <p className={`text-sm font-bold ${mode.p ? 'text-white/60' : 'text-slate-400'}`}>{mode.d}</p>
                      </div>
                    </div>
                    <ChevronRight size={24} className={mode.p ? 'text-white/20' : 'text-slate-300'}/>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {screen === 'survey' && currentQ && (
            <motion.div key="survey" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12 py-12 px-6 max-w-2xl mx-auto">
              <div className="space-y-6">
                <div className="flex justify-between items-end">
                  <span className="text-[10px] font-black text-brand-500 uppercase tracking-[0.3em] bg-brand-50 px-3 py-1 rounded-full">
                    Part {currentQ.c < 6 ? 1 : 2}
                  </span>
                  <span className="text-sm font-black text-slate-400">
                    {currentIndex + 1} <span className="text-xs text-slate-300">/</span> {activeQuestions.length}
                  </span>
                </div>
                <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden shadow-inner">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentIndex + 1) / activeQuestions.length) * 100}%` }}
                    className="h-full bg-gradient-to-r from-brand-500 to-indigo-600 shadow-[0_0_10px_rgba(49,130,246,0.5)]" 
                  />
                </div>
              </div>

              {currentQ.c < 6 ? (
                <div className="space-y-12 py-8">
                  <motion.h2 
                    key={currentIndex}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-3xl md:text-4xl font-black text-brand-900 leading-tight min-h-[4em] flex items-center"
                  >
                    {currentQ.q}
                  </motion.h2>
                  <div className="grid gap-3">
                    {[
                      { v: 5, t: "매우 그렇다" },
                      { v: 4, t: "그렇다" },
                      { v: 3, t: "보통이다" },
                      { v: 2, t: "그렇지 않다" },
                      { v: 1, t: "매우 그렇지 않다" }
                    ].map((opt) => (
                      <button 
                        key={opt.v} 
                        onClick={() => handleAnswer(opt.v)} 
                        className={`glass-card !p-6 text-left font-black text-lg transition-all border-2 ${answers[currentIndex] === opt.v ? 'border-brand-500 bg-brand-50 text-brand-500' : 'border-transparent hover:bg-white hover:shadow-premium'}`}
                      >
                        {opt.t}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-12 py-8">
                  <div className="text-center space-y-4 bg-brand-900 p-8 rounded-[2rem] text-white overflow-hidden relative">
                    <div className="absolute top-0 right-0 p-4 opacity-10 rotate-12 scale-150"><Zap size={100} /></div>
                    <h3 className="text-xl font-black tracking-tight relative z-10">사역 딜레마 선택</h3>
                    <p className="text-sm text-white/60 font-bold relative z-10">두 가치 중 본인과 더 가까운 대처 방식을 선택하세요.</p>
                  </div>
                  <div className="grid gap-8">
                    <button onClick={() => handleAnswer(1)} className="glass-card !p-10 text-left space-y-4 group hover:border-brand-500 border-2 border-transparent transition-all">
                      <div className="text-brand-500 font-black text-xs uppercase tracking-[0.2em]">Strategy A</div>
                      <h4 className="text-2xl font-black text-brand-900">{currentQ.left}</h4>
                      <p className="text-slate-500 font-bold leading-relaxed">{currentQ.descL}</p>
                    </button>
                    <div className="flex items-center justify-center gap-6 text-slate-200 font-black italic text-xl">
                      <div className="h-px flex-1 bg-slate-200"></div>
                      <span className="text-slate-300">VS</span>
                      <div className="h-px flex-1 bg-slate-200"></div>
                    </div>
                    <button onClick={() => handleAnswer(5)} className="glass-card !p-10 text-left space-y-4 group hover:border-brand-500 border-2 border-transparent transition-all">
                      <div className="text-brand-500 font-black text-xs uppercase tracking-[0.2em]">Strategy B</div>
                      <h4 className="text-2xl font-black text-brand-900">{currentQ.right}</h4>
                      <p className="text-slate-500 font-bold leading-relaxed">{currentQ.descR}</p>
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {screen === 'results' && results && (
            <motion.div key="results" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-12 px-2 md:px-6 space-y-10 max-w-5xl mx-auto">
              <div ref={captureRef} className="space-y-8">
                {/* Result Header */}
                <div className="glass-card !p-12 flex flex-col md:flex-row justify-between items-center gap-10 bg-white relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-brand-500 via-indigo-500 to-purple-500" />
                  <div className="relative z-10 space-y-4 text-center md:text-left">
                    <div className="flex items-center justify-center md:justify-start gap-3 text-brand-500 mb-2">
                      <div className="w-14 h-14 bg-brand-50 rounded-2xl flex items-center justify-center shadow-sm">{icon}</div>
                      <span className="font-black text-sm uppercase tracking-[0.3em]">{name} ANALYSIS</span>
                    </div>
                    <h2 className="text-5xl md:text-6xl font-black tracking-tighter text-brand-900">
                      {personaLogic(results.totalAvg).status}
                    </h2>
                    <p className="text-slate-500 text-xl font-bold max-w-lg">{personaLogic(results.totalAvg).desc}</p>
                  </div>
                  <div className="relative z-10 text-center md:text-right bg-brand-50 p-10 rounded-[3rem] border border-brand-100 min-w-[200px]">
                    <div className="text-7xl font-black text-brand-500 mb-1">{Math.round(results.totalAvg)}<span className="text-xl text-slate-400 ml-1">pts</span></div>
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Insight Score</div>
                  </div>
                </div>

                <div className="grid lg:grid-cols-5 gap-8">
                  {/* Radar Chart (using Recharts) */}
                  <div className="lg:col-span-3 glass-card !p-10 flex flex-col items-center justify-center bg-white min-h-[500px]">
                    <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.3em] mb-12">Capacity Balance Map</h4>
                    <div className="w-full h-[400px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={results.chartData}>
                          <PolarGrid stroke="#e5e8eb" strokeDasharray="3 3" />
                          <PolarAngleAxis dataKey="subject" tick={{ fill: '#8b95a1', fontSize: 13, fontWeight: 900 }} />
                          <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                          <Radar
                            name="Capacity"
                            dataKey="A"
                            stroke="#3182f6"
                            strokeWidth={4}
                            fill="#3182f6"
                            fillOpacity={0.15}
                            animationDuration={1500}
                          />
                        </RadarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Right Details */}
                  <div className="lg:col-span-2 space-y-8">
                    {/* Unreliable Alerts */}
                    {(results.vHits >= (_mode === 30 ? 1 : _mode === 70 ? 2 : 3) || results.isUnreliable) && (
                      <div className="space-y-4">
                        {results.vHits >= (_mode === 30 ? 1 : _mode === 70 ? 2 : 3) && (
                          <div className="p-6 bg-rose-50 border border-rose-100 rounded-[2rem] flex gap-4">
                            <AlertTriangle className="text-rose-500 shrink-0" size={24} />
                            <div>
                              <h4 className="font-black text-rose-900 text-sm mb-1">편향 감지 (L-Scale)</h4>
                              <p className="text-rose-800 text-xs font-bold leading-relaxed">자기 미화적 성향이 감지되었습니다. 결과 해석 시 객관적 성찰이 필요합니다.</p>
                            </div>
                          </div>
                        )}
                        {results.isUnreliable && (
                          <div className="p-6 bg-amber-50 border border-amber-100 rounded-[2rem] flex gap-4">
                            <AlertTriangle className="text-amber-500 shrink-0" size={24} />
                            <div>
                              <h4 className="font-black text-amber-900 text-sm mb-1">응답 신뢰도 주의</h4>
                              <p className="text-amber-800 text-xs font-bold leading-relaxed">동일 패턴 응답이 감지되어 분석의 타당성이 낮을 수 있습니다.</p>
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    <div className="glass-card !bg-brand-500 !text-white !p-8 shadow-xl shadow-brand-500/20">
                      <div className="flex items-center gap-3 mb-6">
                        <Trophy size={24} className="text-white/60" />
                        <h4 className="font-black text-xs uppercase tracking-widest">Spritual Style</h4>
                      </div>
                      <h3 className="text-2xl font-black mb-4 leading-tight">{styleLogic(results.dilAvg).header}</h3>
                      <p className="text-sm text-white/70 font-bold leading-relaxed">{styleLogic(results.dilAvg).body}</p>
                    </div>

                    <div className="glass-card !p-8 space-y-6 bg-white">
                      <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Detailed Metrics</h4>
                      {dimensions.map((dim, i) => (
                        <div key={dim} className="space-y-3">
                          <div className="flex justify-between items-end">
                            <span className="text-sm font-black text-brand-900">{dim}</span>
                            <span className="text-sm font-black text-brand-500">{results.finalScores[i]}%</span>
                          </div>
                          <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                            <motion.div 
                              initial={{ width: 0 }} 
                              animate={{ width: `${results.finalScores[i]}%` }} 
                              transition={{ duration: 1, delay: i * 0.1 }}
                              className="h-full bg-brand-500" 
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Advice Section */}
                <div className="glass-card !p-12 space-y-12 bg-white">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-[1.5rem] flex items-center justify-center shadow-sm">
                      <Star size={28}/>
                    </div>
                    <div>
                      <h3 className="text-3xl font-black text-brand-900 tracking-tight">성장 로드맵</h3>
                      <p className="text-slate-400 font-bold">진단 데이터를 기반으로 한 개인별 맞춤 가이드</p>
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="p-8 bg-rose-50/50 rounded-[2.5rem] border border-rose-100 space-y-6">
                      <div className="flex items-center gap-3 text-rose-500">
                        <Heart size={24} />
                        <h4 className="font-black text-lg uppercase tracking-tight">Personal Advice</h4>
                      </div>
                      <p className="text-lg text-rose-900 leading-relaxed font-bold italic">
                        "{adviceLogic(results.finalScores).personal}"
                      </p>
                    </div>

                    <div className="p-8 bg-blue-50/50 rounded-[2.5rem] border border-blue-100 space-y-6">
                      <div className="flex items-center gap-3 text-brand-500">
                        <ShieldCheck size={24} />
                        <h4 className="font-black text-lg uppercase tracking-tight">Ministry Guide</h4>
                      </div>
                      <p className="text-lg text-brand-900 leading-relaxed font-bold italic">
                        "{adviceLogic(results.finalScores).ministry}"
                      </p>
                    </div>
                  </div>

                  <div className="space-y-8">
                    <h4 className="font-black text-brand-900 text-xl flex items-center gap-3">
                      <div className="w-2 h-8 bg-brand-500 rounded-full" />
                      실천 과제 (Action Plan)
                    </h4>
                    <div className="grid md:grid-cols-3 gap-4">
                      {adviceLogic(results.finalScores).actions.map((act, i) => (
                        <div key={i} className="flex flex-col gap-4 p-8 bg-slate-50 rounded-[2rem] border border-transparent hover:border-brand-500/20 transition-all group">
                          <div className="w-10 h-10 rounded-full bg-white text-brand-500 shadow-sm flex items-center justify-center text-sm font-black group-hover:scale-110 transition-transform">
                            {i+1}
                          </div>
                          <span className="text-lg font-black text-slate-700 leading-tight">{act}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col md:flex-row gap-4">
                <button onClick={() => setScreen('intro')} className="premium-btn-secondary flex-1 justify-center py-5 font-black text-lg">
                  <RotateCcw size={20} /> 처음으로 돌아가기
                </button>
                <button onClick={downloadReport} className="premium-btn-primary flex-1 justify-center py-5 font-black text-lg">
                  <Download size={20} /> 분석 리포트 저장 (PNG)
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
