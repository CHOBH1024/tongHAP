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
  ArrowRight
} from 'lucide-react';
import html2canvas from 'html2canvas';
import { motion, AnimatePresence } from 'framer-motion';

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

    return { finalScores, totalAvg, dilAvg, vHits, isUnreliable, maxConsecutive };
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

  return (
    <div className={`transition-all duration-700 ${viewMode === 'mobile' ? 'max-w-[414px] mx-auto border-[12px] border-toss-gray-900 rounded-[48px] h-[840px] overflow-y-auto bg-toss-gray-100 shadow-2xl relative' : 'w-full'}`}>
      
      {/* Device Toggle */}
      <div className="flex justify-end items-center mb-8 px-2">
        <div className="flex bg-toss-gray-200 rounded-2xl p-1">
          <button onClick={() => setViewMode('pc')} className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 ${viewMode === 'pc' ? 'bg-white text-toss-blue shadow-sm' : 'text-toss-gray-500'}`}>
            <Monitor size={14} /> PC
          </button>
          <button onClick={() => setViewMode('mobile')} className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 ${viewMode === 'mobile' ? 'bg-white text-toss-blue shadow-sm' : 'text-toss-gray-500'}`}>
            <Smartphone size={14} /> 모바일
          </button>
        </div>
      </div>

      <div className="bg-[#f2f4f6] min-h-full p-2 md:p-4">
        <AnimatePresence mode="wait">
          {screen === 'intro' && (
            <motion.div key="intro" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-12 py-12 px-6">
              <div className="text-center space-y-4">
                <div className="w-20 h-20 bg-white rounded-[28px] shadow-sm flex items-center justify-center mx-auto mb-8 text-toss-blue">
                  {icon}
                </div>
                <span className="text-toss-blue font-bold tracking-widest text-xs uppercase">{subtitle}</span>
                <h1 className="text-4xl font-black tracking-tight text-toss-gray-900 leading-tight">{name} 진단</h1>
                <p className="text-toss-gray-600 text-lg leading-relaxed whitespace-pre-line max-w-sm mx-auto">{description}</p>
              </div>

              <div className="toss-card border-none space-y-6">
                <h3 className="font-bold flex items-center gap-2 text-toss-gray-800"><BookOpen size={18} /> 진단 포인트</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-toss-blue-light text-toss-blue flex items-center justify-center shrink-0">1</div>
                    <p className="text-sm text-toss-gray-600 leading-relaxed font-medium">나의 5대 핵심 역량을 정밀하게 분석합니다.</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-toss-blue-light text-toss-blue flex items-center justify-center shrink-0">2</div>
                    <p className="text-sm text-toss-gray-600 leading-relaxed font-medium">실제 현장에서 마주할 수 있는 20가지 딜레마를 통해 나의 사역 스타일을 발견합니다.</p>
                  </div>
                </div>
              </div>

              <button onClick={() => setScreen('mode')} className="toss-button-primary w-full py-5 text-xl">
                시작해볼까요?
              </button>
            </motion.div>
          )}

          {screen === 'mode' && (
            <motion.div key="mode" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8 py-12 px-6">
              <div className="text-center space-y-2 mb-10">
                <h2 className="text-3xl font-black tracking-tight">얼마나 깊이 있게<br/>알아볼까요?</h2>
                <p className="text-toss-gray-500 font-medium">성찰하고 싶은 깊이를 선택해주세요.</p>
              </div>

              <div className="grid gap-4">
                <button onClick={() => selectMode(30)} className="toss-card border-none text-left flex items-center justify-between group">
                  <div className="flex items-center gap-5">
                    <div className="w-12 h-12 bg-emerald-50 text-emerald-500 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                      <Zap size={24} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-toss-gray-800">초고속 진단</h3>
                      <p className="text-xs text-toss-gray-400 font-medium">30문항 · 약 3분</p>
                    </div>
                  </div>
                  <ChevronRight size={20} className="text-toss-gray-300"/>
                </button>

                <button onClick={() => selectMode(70)} className="toss-card border-none text-left flex items-center justify-between group">
                  <div className="flex items-center gap-5">
                    <div className="w-12 h-12 bg-toss-blue-light text-toss-blue rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                      <Check size={24} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-toss-gray-800">핵심 진단</h3>
                      <p className="text-xs text-toss-gray-400 font-medium">70문항 · 약 8분</p>
                    </div>
                  </div>
                  <ChevronRight size={20} className="text-toss-gray-300"/>
                </button>

                <button onClick={() => selectMode(120)} className="w-full rounded-[24px] p-6 text-left flex items-center justify-between group bg-toss-blue text-white shadow-lg shadow-toss-blue/20 hover:bg-toss-blue/90 transition-all">
                  <div className="flex items-center gap-5">
                    <div className="w-12 h-12 bg-white/20 text-white rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                      <Layers size={24} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold">심층 정밀 분석</h3>
                      <p className="text-xs text-white/60 font-medium">120문항 · 약 15분</p>
                    </div>
                  </div>
                  <ChevronRight size={20} className="text-white/40"/>
                </button>
              </div>
            </motion.div>
          )}

          {screen === 'survey' && currentQ && (
            <motion.div key="survey" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12 py-12 px-6 max-w-2xl mx-auto">
              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <span className="text-[10px] font-black text-toss-blue uppercase tracking-widest">
                    Part {currentQ.c < 6 ? 1 : 2}
                  </span>
                  <span className="text-xs font-bold text-toss-gray-400">
                    {currentIndex + 1} / {activeQuestions.length}
                  </span>
                </div>
                <div className="h-1.5 w-full bg-toss-gray-200 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentIndex + 1) / activeQuestions.length) * 100}%` }}
                    className="h-full bg-toss-blue" 
                  />
                </div>
              </div>

              {currentQ.c < 6 ? (
                <div className="space-y-12 py-8">
                  <h2 className="text-2xl md:text-3xl font-bold text-toss-gray-900 leading-snug min-h-[3.5em] flex items-center">
                    {currentQ.q}
                  </h2>
                  <div className="flex flex-col gap-3">
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
                        className={`toss-card border-none text-left font-bold transition-all ${answers[currentIndex] === opt.v ? 'bg-toss-blue text-white' : 'hover:bg-toss-gray-50'}`}
                      >
                        {opt.t}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-10 py-8">
                  <div className="text-center space-y-4">
                    <h3 className="text-lg font-bold text-toss-blue">딜레마 선택</h3>
                    <p className="text-sm text-toss-gray-500 leading-relaxed font-medium">두 가지 가치 중 본인과 더 가까운 것을 골라주세요.</p>
                  </div>
                  <div className="grid gap-6">
                    <button onClick={() => handleAnswer(1)} className="toss-card border-none text-left p-8 space-y-3 group hover:border-toss-blue transition-all">
                      <div className="text-toss-blue font-black text-xs uppercase tracking-widest">Option A</div>
                      <h4 className="text-xl font-bold text-toss-gray-900">{currentQ.left}</h4>
                      <p className="text-sm text-toss-gray-500 leading-relaxed font-medium">{currentQ.descL}</p>
                    </button>
                    <div className="flex items-center justify-center gap-4 text-toss-gray-300 font-black italic">
                      <div className="h-px flex-1 bg-toss-gray-200"></div>
                      <span>VS</span>
                      <div className="h-px flex-1 bg-toss-gray-200"></div>
                    </div>
                    <button onClick={() => handleAnswer(5)} className="toss-card border-none text-left p-8 space-y-3 group hover:border-toss-blue transition-all">
                      <div className="text-toss-blue font-black text-xs uppercase tracking-widest">Option B</div>
                      <h4 className="text-xl font-bold text-toss-gray-900">{currentQ.right}</h4>
                      <p className="text-sm text-toss-gray-500 leading-relaxed font-medium">{currentQ.descR}</p>
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {screen === 'results' && (
            <motion.div key="results" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-12 px-2 md:px-6 space-y-10 max-w-4xl mx-auto">
              <div ref={captureRef} className="bg-[#f2f4f6] p-4 md:p-8 space-y-8 rounded-[40px]">
                {/* Header */}
                <div className="toss-card border-none flex flex-col md:flex-row justify-between items-center gap-8 relative overflow-hidden">
                  <div className="relative z-10 space-y-2">
                    <div className="flex items-center gap-2 text-toss-blue mb-2">
                      <div className="w-10 h-10 bg-toss-blue-light rounded-xl flex items-center justify-center">{icon}</div>
                      <span className="font-black text-sm uppercase tracking-widest">{name} 리포트</span>
                    </div>
                    <h2 className="text-4xl font-black tracking-tight">{personaLogic(calculateResults().totalAvg).status}</h2>
                    <p className="text-toss-gray-500 font-medium">{personaLogic(calculateResults().totalAvg).desc}</p>
                  </div>
                  <div className="relative z-10 text-center md:text-right">
                    <div className="text-6xl font-black text-toss-blue mb-1">{Math.round(calculateResults().totalAvg)}<span className="text-lg text-toss-gray-400">점</span></div>
                    <div className="text-[10px] font-black text-toss-gray-400 uppercase tracking-widest">Total Insight Score</div>
                  </div>
                </div>

                {calculateResults().vHits >= (_mode === 30 ? 1 : _mode === 70 ? 2 : 3) && (
                  <div className="p-6 bg-rose-50 border-l-4 border-rose-500 rounded-r-3xl flex gap-4">
                    <AlertTriangle className="text-rose-600 shrink-0" />
                    <div>
                      <h4 className="font-bold text-rose-900 text-sm">자기 미화 편향(L-Scale) 감지</h4>
                      <p className="text-rose-800 text-xs leading-relaxed font-medium">자신을 완벽하게 포장하려는 경향이 감지되었습니다. 정직한 직면이 성장의 시작입니다.</p>
                    </div>
                  </div>
                )}

                {calculateResults().isUnreliable && (
                  <div className="p-6 bg-amber-50 border-l-4 border-amber-500 rounded-r-3xl flex gap-4">
                    <AlertTriangle className="text-amber-600 shrink-0" />
                    <div>
                      <h4 className="font-bold text-amber-900 text-sm">응답 신뢰도 경고</h4>
                      <p className="text-amber-800 text-xs leading-relaxed font-medium">연속적인 동일 응답({calculateResults().maxConsecutive}회)이 감지되어 진단 결과의 통계적 타당성이 낮을 수 있습니다.</p>
                    </div>
                  </div>
                )}

                <div className="grid md:grid-cols-2 gap-8">
                  {/* Radar Chart */}
                  <div className="toss-card border-none flex flex-col items-center justify-center p-8 bg-white h-full min-h-[400px]">
                    <h4 className="text-sm font-black text-toss-gray-400 uppercase tracking-widest mb-8">역량 밸런스</h4>
                    <svg width="100%" height="100%" viewBox="0 0 400 400" className="w-full max-w-[320px]">
                      {[1, 2, 3, 4, 5].map(i => {
                        const r = (140 / 5) * i;
                        const pts = [0, 1, 2, 3, 4].map(j => {
                          const a = (Math.PI * 2 / 5) * j - Math.PI / 2;
                          return `${200 + r * Math.cos(a)},${200 + r * Math.sin(a)}`;
                        }).join(' ');
                        return <polygon key={i} points={pts} fill="none" stroke="#f2f4f6" strokeWidth="1" />;
                      })}
                      {dimensions.map((dim, i) => {
                        const a = (Math.PI * 2 / 5) * i - Math.PI / 2;
                        const lx = 200 + (140 + 35) * Math.cos(a);
                        const ly = 200 + (140 + 35) * Math.sin(a);
                        return <text key={dim} x={lx} y={ly} textAnchor="middle" dominantBaseline="middle" fontSize="11" fontWeight="bold" fill="#8b95a1">{dim}</text>;
                      })}
                      {(() => {
                        const res = calculateResults();
                        const pts = res.finalScores.map((s, i) => {
                          const a = (Math.PI * 2 / 5) * i - Math.PI / 2;
                          const r = (s / 100) * 140;
                          return `${200 + r * Math.cos(a)},${200 + r * Math.sin(a)}`;
                        }).join(' ');
                        return (
                          <>
                            <polygon points={pts} fill="rgba(0, 100, 255, 0.15)" stroke="#0064ff" strokeWidth="3" strokeLinejoin="round" />
                            {res.finalScores.map((s, i) => {
                              const a = (Math.PI * 2 / 5) * i - Math.PI / 2;
                              const r = (s / 100) * 140;
                              return <circle key={i} cx={200 + r * Math.cos(a)} cy={200 + r * Math.sin(a)} r="4" fill="#0064ff" stroke="white" strokeWidth="2" />;
                            })}
                          </>
                        );
                      })()}
                    </svg>
                  </div>

                  {/* Persona Details */}
                  <div className="space-y-6">
                    <div className="rounded-[24px] p-6 bg-toss-blue text-white space-y-4 shadow-lg shadow-toss-blue/10">
                      <div className="flex items-center gap-2">
                        <Trophy size={18} className="text-white/80" />
                        <h4 className="font-bold text-sm">성찰 스타일</h4>
                      </div>
                      <h3 className="text-xl font-black leading-tight">{styleLogic(calculateResults().dilAvg).header}</h3>
                      <p className="text-sm text-white/80 leading-relaxed font-medium">{styleLogic(calculateResults().dilAvg).body}</p>
                    </div>

                    <div className="toss-card border-none space-y-6">
                      <h4 className="text-xs font-black text-toss-gray-400 uppercase tracking-widest">세부 점수</h4>
                      {dimensions.map((dim, i) => (
                        <div key={dim} className="space-y-2">
                          <div className="flex justify-between text-sm font-bold">
                            <span className="text-toss-gray-700">{dim}</span>
                            <span className="text-toss-blue">{calculateResults().finalScores[i]}점</span>
                          </div>
                          <div className="h-1.5 w-full bg-toss-gray-100 rounded-full overflow-hidden">
                            <motion.div initial={{ width: 0 }} animate={{ width: `${calculateResults().finalScores[i]}%` }} className="h-full bg-toss-blue" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Growth & Ministry Roadmap */}
                <div className="toss-card border-none space-y-8 mt-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center"><Star size={20}/></div>
                    <h3 className="text-2xl font-black">성장과 사역을 위한 로드맵</h3>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="p-6 bg-rose-50 rounded-3xl space-y-4">
                      <div className="flex items-center gap-3 text-rose-600">
                        <Heart size={20} />
                        <h4 className="font-black">나의 성장을 위한 조언</h4>
                      </div>
                      <p className="text-sm text-rose-900 leading-relaxed font-medium italic">
                        "{adviceLogic(calculateResults().finalScores).personal}"
                      </p>
                    </div>

                    <div className="p-6 bg-blue-50 rounded-3xl space-y-4">
                      <div className="flex items-center gap-3 text-toss-blue">
                        <ShieldCheck size={20} />
                        <h4 className="font-black">공직 사역 가이드</h4>
                      </div>
                      <p className="text-sm text-toss-gray-800 leading-relaxed font-medium italic">
                        "{adviceLogic(calculateResults().finalScores).ministry}"
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-black text-toss-gray-800 flex items-center gap-2"><ArrowRight size={18} className="text-toss-blue"/> 지금 바로 실천할 수 있는 3단계</h4>
                    <div className="grid gap-3">
                      {adviceLogic(calculateResults().finalScores).actions.map((act, i) => (
                        <div key={i} className="flex items-center gap-4 p-4 bg-toss-gray-50 rounded-2xl group border border-transparent hover:border-toss-blue/10 transition-all">
                          <div className="w-8 h-8 rounded-full bg-white text-toss-blue shadow-sm flex items-center justify-center text-xs font-black">{i+1}</div>
                          <span className="text-sm font-bold text-toss-gray-700">{act}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button onClick={() => setScreen('intro')} className="toss-button-ghost py-4 font-black">다시 하기</button>
                <button onClick={downloadReport} className="toss-button-primary py-4 font-black">리포트 저장하기</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
