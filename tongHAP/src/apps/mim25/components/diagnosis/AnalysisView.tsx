import React, { useState, useMemo, useEffect } from 'react';
import { Icon } from '@/components/diagnosis/Icon';
import { detailData, managementProfiles } from '@/lib/data';
import { educationContent } from '@/lib/educationData';
import { Archetype, Inputs, SavedAnalysis } from '@/lib/types';
import { TeamBuilder } from '@/components/diagnosis/TeamBuilder';
import { generateAnalysisPdf } from '@/lib/generatePdf';
import { buildShareUrl, copyToClipboard, webShare } from '@/lib/share';
import { motion, AnimatePresence } from 'framer-motion';

interface AnalysisViewProps {
    results: Archetype[];
    inputs: Inputs;
    onRestore: (inputs: Inputs) => void;
}

// --- Premium Radar Chart Component ---
const ArchetypeRadarChart: React.FC<{ data: Archetype[] }> = ({ data }) => {
    const sortedData = [...data].sort((a, b) => a.id - b.id);
    const size = 360;
    const center = size / 2;
    const radius = 120;
    const maxScore = Math.max(...data.map(d => d.score || 0)) || 1;

    const getCoords = (score: number, index: number, total: number, scaleRadius: number) => {
        const angle = (Math.PI * 2 * index) / total - Math.PI / 2;
        const normalizedScore = score / maxScore;
        const x = center + scaleRadius * normalizedScore * Math.cos(angle);
        const y = center + scaleRadius * normalizedScore * Math.sin(angle);
        return { x, y };
    };

    const points = sortedData.map((d, i) => {
        const { x, y } = getCoords(d.score || 0, i, 9, radius);
        return `${x},${y}`;
    }).join(' ');

    const levels = [0.25, 0.5, 0.75, 1];

    return (
        <div className="flex flex-col items-center">
            <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="max-w-full drop-shadow-2xl">
                <defs>
                    <linearGradient id="polyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#6366f1" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#10b981" stopOpacity="0.4" />
                    </linearGradient>
                    <filter id="glow">
                        <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
                        <feMerge>
                            <feMergeNode in="coloredBlur"/>
                            <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                    </filter>
                </defs>
                
                {/* Background Grid */}
                {levels.map((level, lvlIdx) => (
                    <polygon
                        key={lvlIdx}
                        points={sortedData.map((_, i) => {
                            const { x, y } = getCoords(maxScore, i, 9, radius * level);
                            return `${x},${y}`;
                        }).join(' ')}
                        fill="none"
                        stroke="#e2e8f0"
                        strokeWidth="1"
                        strokeDasharray={lvlIdx === levels.length - 1 ? "0" : "4 4"}
                    />
                ))}

                {/* Axes */}
                {sortedData.map((_, i) => {
                    const { x, y } = getCoords(maxScore, i, 9, radius);
                    return <line key={i} x1={center} y1={center} x2={x} y2={y} stroke="#e2e8f0" strokeWidth="1" />;
                })}

                {/* Main Data Polygon */}
                <motion.polygon
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    points={points}
                    fill="url(#polyGradient)"
                    stroke="#6366f1"
                    strokeWidth="3"
                    filter="url(#glow)"
                />

                {/* Data Points */}
                {sortedData.map((d, i) => {
                    const { x, y } = getCoords(d.score || 0, i, 9, radius);
                    return (
                        <circle
                            key={i}
                            cx={x}
                            cy={y}
                            r="5"
                            fill={d.score === maxScore ? "#10b981" : "#6366f1"}
                            className="transition-all duration-500 hover:r-8 cursor-pointer"
                        />
                    );
                })}

                {/* Labels */}
                {sortedData.map((d, i) => {
                    const { x, y } = getCoords(maxScore, i, 9, radius + 30);
                    const anchor = Math.abs(x - center) < 10 ? 'middle' : x > center ? 'start' : 'end';
                    return (
                        <text
                            key={i}
                            x={x}
                            y={y}
                            textAnchor={anchor}
                            alignmentBaseline="middle"
                            className={`text-[10px] font-black uppercase tracking-tighter ${d.score === maxScore ? 'fill-brand-900' : 'fill-slate-400'}`}
                        >
                            {d.id}. {d.title}
                        </text>
                    );
                })}
            </svg>
        </div>
    );
};

const getMBTI = (big5: Inputs['big5']): string => {
    let mbti = '';
    mbti += big5.extraversion === 'High' ? 'E' : big5.extraversion === 'Low' ? 'I' : 'x';
    mbti += big5.openness === 'High' ? 'N' : big5.openness === 'Low' ? 'S' : 'x';
    mbti += big5.agreeableness === 'High' ? 'F' : big5.agreeableness === 'Low' ? 'T' : 'x';
    mbti += big5.conscientiousness === 'High' ? 'J' : big5.conscientiousness === 'Low' ? 'P' : 'x';
    return mbti.replace(/x/g, '-'); 
};

export const AnalysisView: React.FC<AnalysisViewProps> = ({ results, inputs, onRestore }) => {
    const [tab, setTab] = useState<'details' | 'cross_analysis' | 'growth' | 'practical' | 'prayer' | 'hr' | 'team' | 'management' | 'education'>('details');
    const [savedAnalyses, setSavedAnalyses] = useState<SavedAnalysis[]>([]);
    const [saveName, setSaveName] = useState('');
    const [showSaveUI, setShowSaveUI] = useState(false);
    const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
    const [copySuccess, setCopySuccess] = useState(false);

    const result = results.length > 0 ? results[0] : null;

    const activeVariationKey = useMemo((): 'strength' | 'crisis' | 'relational' => {
        const eq = inputs.eq;
        const big5 = inputs.big5;
        if (eq.regulation === 'Low' || big5.neuroticism === 'High') return 'crisis';
        if (eq.empathy === 'High' && big5.agreeableness === 'High') return 'relational';
        return 'strength';
    }, [inputs]);

    const activePastorVariation = useMemo(() =>
        result?.pastorSubVariations?.find(v => v.variationKey === activeVariationKey) ?? null,
    [result, activeVariationKey]);

    const activeSubType = useMemo(() =>
        result?.subTypes?.find(s => s.variationKey === activeVariationKey) ?? null,
    [result, activeVariationKey]);

    useEffect(() => {
        const stored = localStorage.getItem('cig_saved_analyses');
        if (stored) {
            try { setSavedAnalyses(JSON.parse(stored)); } catch (e) { console.error(e); }
        }
    }, []);

    const handleSaveAnalysis = () => {
        if (!saveName.trim() || !result) return;
        const newAnalysis: SavedAnalysis = {
            id: Date.now().toString(),
            name: saveName,
            inputs: inputs,
            resultTitle: result.title,
            createdAt: Date.now()
        };
        const updated = [newAnalysis, ...savedAnalyses];
        setSavedAnalyses(updated);
        localStorage.setItem('cig_saved_analyses', JSON.stringify(updated));
        setSaveName('');
        setShowSaveUI(false);
    };

    const matchMetrics = useMemo(() => {
        if (!result) return null;
        const dominantTrait = result.traits.big5;
        const userLevel = inputs.big5[dominantTrait];
        const isBig5Match = userLevel === 'High';
        const isAnchorMatch = result.traits.anchor.includes(inputs.anchor);
        const matchedVia = inputs.via.filter(v => result.traits.via.includes(v));
        return { isBig5Match, isAnchorMatch, matchedVia, userLevel };
    }, [result, inputs]);

    if (!result || !matchMetrics) return null;

    const userMBTI = getMBTI(inputs.big5);
    const userAnchorLabel = detailData.anchor[inputs.anchor]?.label;
    const maxScore = Math.max(...results.map(r => r.score || 0));

    const tabs = [
        { id: 'details', label: '상세 분석', icon: 'User' },
        { id: 'cross_analysis', label: '교차 분석', icon: 'Activity' },
        { id: 'growth', label: '성장 가이드', icon: 'Sprout' },
        { id: 'practical', label: '실전 지침', icon: 'Briefcase' },
        { id: 'prayer', label: '기도와 묵상', icon: 'Heart' },
        { id: 'hr', label: '인사 배치', icon: 'Building' },
        { id: 'team', label: '팀 빌딩', icon: 'Users' },
        { id: 'management', label: '경영 성향', icon: 'BarChart2' },
        { id: 'education', label: '교육 과정', icon: 'GraduationCap' },
    ];

    return (
        <div className="max-w-7xl mx-auto px-6 py-12 space-y-12">
            {/* Header Control Bar */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-6 glass-card !p-6">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-brand-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-brand-500/20">
                        <Icon name="LayoutDashboard" size={20}/>
                    </div>
                    <h2 className="text-xl font-black text-brand-900 uppercase tracking-wider">Analysis Hub</h2>
                </div>
                <div className="flex flex-wrap justify-center gap-3">
                    <button 
                        onClick={async () => {
                            setIsGeneratingPdf(true);
                            try { await generateAnalysisPdf(result, results, inputs); } 
                            catch (e) { alert('PDF 생성 실패'); } 
                            finally { setIsGeneratingPdf(false); }
                        }}
                        disabled={isGeneratingPdf}
                        className="premium-btn-secondary !py-2.5 !px-5 text-sm"
                    >
                        <Icon name="Download" size={16}/> {isGeneratingPdf ? 'Generating...' : 'PDF Export'}
                    </button>
                    <button 
                        onClick={() => {
                            const url = buildShareUrl(inputs);
                            copyToClipboard(url).then(() => {
                                setCopySuccess(true);
                                setTimeout(() => setCopySuccess(false), 2000);
                            });
                        }}
                        className="premium-btn-secondary !py-2.5 !px-5 text-sm"
                    >
                        <Icon name="Link2" size={16}/> {copySuccess ? 'Copied!' : 'Copy Link'}
                    </button>
                    <button onClick={() => setShowSaveUI(!showSaveUI)} className="premium-btn-secondary !py-2.5 !px-5 text-sm">
                        <Icon name="Save" size={16}/> Save Results
                    </button>
                </div>
            </div>

            {showSaveUI && (
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="glass-card !bg-amber-50/50 border-amber-200 !p-8">
                    <div className="flex gap-4">
                        <input 
                            type="text" value={saveName} onChange={e => setSaveName(e.target.value)}
                            placeholder="저장할 분석 결과의 이름을 입력하세요..."
                            className="flex-1 px-6 py-4 bg-white rounded-2xl border border-amber-200 text-brand-900 font-bold focus:ring-2 focus:ring-amber-500/20"
                        />
                        <button onClick={handleSaveAnalysis} className="premium-btn-primary !bg-amber-600 !px-8">저장하기</button>
                    </div>
                </motion.div>
            )}

            {/* Cinematic Hero Section */}
            <div className="relative overflow-hidden rounded-[3rem] shadow-2xl bg-brand-900 text-white min-h-[500px] flex items-center justify-center text-center p-12 group">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-900 via-brand-800 to-emerald-900 opacity-90"></div>
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-brand-500/20 rounded-full blur-[100px] group-hover:bg-brand-500/30 transition-all duration-1000"></div>
                <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-emerald-500/20 rounded-full blur-[100px] group-hover:bg-emerald-500/30 transition-all duration-1000"></div>
                
                <div className="relative z-10 max-w-4xl space-y-8">
                    <motion.span 
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                        className="inline-block px-6 py-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full text-brand-300 text-xs font-black tracking-[0.4em] uppercase"
                    >
                        Primary Archetype Discovered
                    </motion.span>
                    <motion.h1 
                        initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                        className="text-6xl md:text-8xl font-black tracking-tight leading-tight"
                    >
                        {result.title}
                    </motion.h1>
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="text-2xl font-bold text-white/60 italic font-serif">
                        "{result.engTitle}"
                    </motion.p>
                    <div className="w-24 h-1 bg-gradient-to-r from-brand-500 to-emerald-500 mx-auto rounded-full"></div>
                    <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="text-xl md:text-2xl text-slate-200 font-serif leading-relaxed italic max-w-3xl mx-auto">
                        {result.verse}
                    </motion.p>
                </div>
            </div>

            {/* Premium Tab Navigation */}
            <div className="sticky top-4 z-40">
                <div className="glass-card !p-2 flex gap-1 overflow-x-auto no-scrollbar shadow-2xl shadow-brand-900/10">
                    {tabs.map(t => (
                        <button 
                            key={t.id} 
                            onClick={() => setTab(t.id as any)}
                            className={`
                                flex items-center gap-3 px-6 py-4 rounded-2xl transition-all whitespace-nowrap font-black text-sm uppercase tracking-wider
                                ${tab === t.id ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/30' : 'text-slate-400 hover:text-brand-500 hover:bg-brand-50'}
                            `}
                        >
                            <Icon name={t.icon} size={18}/> {t.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Content Body */}
            <AnimatePresence mode="wait">
                <motion.div 
                    key={tab}
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                    className="space-y-16"
                >
                    {tab === 'details' && (
                        <>
                            <section className="grid lg:grid-cols-12 gap-12">
                                <div className="lg:col-span-8 space-y-12">
                                    <div className="glass-card !p-12 space-y-8">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-brand-500/10 text-brand-500 rounded-xl flex items-center justify-center"><Icon name="Target" size={24}/></div>
                                            <h3 className="text-3xl font-black text-brand-900">정체성 및 목회 아키타입</h3>
                                        </div>
                                        <div className="space-y-6">
                                            <h4 className="text-2xl font-black text-brand-500">"{result.subtitle}"</h4>
                                            <p className="text-xl text-slate-700 leading-loose text-justify font-bold">{result.summary}</p>
                                            <div className="bg-brand-50 p-8 rounded-[2rem] border border-brand-100 flex gap-6">
                                                <Icon name="Briefcase" className="text-brand-500 shrink-0" size={32}/>
                                                <p className="text-lg text-brand-900 font-bold leading-relaxed"><span className="text-brand-500 block mb-1 uppercase tracking-widest text-xs">Ministry Guide</span> {result.details.guide}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid md:grid-cols-3 gap-6">
                                        {[
                                            { label: 'BEHAVIOR', title: 'HOW (행동)', content: result.dna.how, icon: 'Zap', color: 'bg-emerald-50 text-emerald-600 border-emerald-100' },
                                            { label: 'STRENGTH', title: 'WHAT (강점)', content: result.dna.what, icon: 'Sparkles', color: 'bg-brand-50 text-brand-600 border-brand-100' },
                                            { label: 'MOTIVATION', title: 'WHY (동기)', content: result.dna.why, icon: 'Heart', color: 'bg-rose-50 text-rose-600 border-rose-100' },
                                        ].map(item => (
                                            <div key={item.label} className={`glass-card !p-8 border-none ${item.color}`}>
                                                <div className="flex flex-col h-full space-y-4">
                                                    <span className="text-[10px] font-black tracking-[0.3em] opacity-60">{item.label}</span>
                                                    <h4 className="text-xl font-black flex items-center gap-2"><Icon name={item.icon} size={20}/> {item.title}</h4>
                                                    <p className="text-base font-bold leading-relaxed opacity-80">{item.content}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="lg:col-span-4 space-y-6">
                                    <div className="glass-card !bg-brand-900 !text-white !p-10 space-y-6">
                                        <h3 className="text-xl font-black flex items-center gap-3"><Icon name="Sprout" className="text-emerald-500"/> 핵심 성장 과제</h3>
                                        <p className="text-white/70 text-lg font-bold leading-relaxed">{result.details.development}</p>
                                    </div>
                                    <div className="glass-card !bg-amber-50 !border-amber-200 !p-10 space-y-6">
                                        <h3 className="text-xl font-black text-amber-900 flex items-center gap-3"><Icon name="AlertTriangle"/> 주의사항</h3>
                                        <p className="text-amber-800/70 text-lg font-bold leading-relaxed">{result.details.caution}</p>
                                    </div>
                                </div>
                            </section>

                            {/* Biblical Role Model */}
                            <section className="glass-card overflow-hidden !p-0 border-none shadow-2xl">
                                <div className="grid lg:grid-cols-5">
                                    <div className="lg:col-span-2 bg-brand-900 p-12 text-white flex flex-col justify-center relative overflow-hidden">
                                        <div className="absolute inset-0 bg-gradient-to-br from-brand-900 to-indigo-900"></div>
                                        <div className="relative z-10 space-y-6 text-center lg:text-left">
                                            <span className="px-4 py-1.5 bg-white/10 rounded-full text-xs font-black uppercase tracking-widest text-emerald-400 border border-white/10">Biblical Reference</span>
                                            <h4 className="text-5xl font-black tracking-tight leading-tight">{result.roleModel.name}</h4>
                                            <p className="text-xl font-bold text-white/60 italic font-serif">"{result.roleModel.epithet}"</p>
                                            <div className="pt-8 border-t border-white/10">
                                                <span className="text-[10px] font-black text-white/40 uppercase tracking-widest block mb-2">Leadership Signature</span>
                                                <p className="text-lg font-bold text-emerald-400">{result.roleModel.leadershipStyle}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="lg:col-span-3 p-12 space-y-10">
                                        <div className="space-y-4">
                                            <h5 className="text-2xl font-black text-brand-900 flex items-center gap-3"><Icon name="History"/> Biblical Insights</h5>
                                            <p className="text-lg text-slate-600 font-bold leading-loose text-justify">{result.roleModel.description}</p>
                                        </div>
                                        <div className="bg-slate-50 p-8 rounded-[2rem] space-y-4">
                                            <h5 className="font-black text-brand-500 flex items-center gap-2 uppercase tracking-widest text-sm"><Icon name="Link"/> Connection to You</h5>
                                            <p className="text-slate-800 font-bold leading-relaxed">{result.roleModel.connection}</p>
                                        </div>
                                        <div className="flex flex-col md:flex-row gap-6">
                                            <div className="flex-1 p-6 bg-brand-50 rounded-2xl border border-brand-100">
                                                <span className="text-xs font-black text-brand-500 uppercase block mb-2">The Lesson</span>
                                                <p className="text-sm font-bold text-slate-700">{result.roleModel.lesson}</p>
                                            </div>
                                            <div className="flex-1 p-6 bg-slate-900 rounded-2xl text-white italic font-serif text-sm leading-relaxed border-l-4 border-emerald-500">
                                                "{result.roleModel.bibleVerse}"
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </>
                    )}

                    {tab === 'cross_analysis' && (
                        <div className="space-y-12">
                            <section className="glass-card !p-12">
                                <div className="grid lg:grid-cols-2 gap-16 items-center">
                                    <div className="bg-slate-50 rounded-[3rem] p-12 flex justify-center shadow-inner">
                                        <ArchetypeRadarChart data={results} />
                                    </div>
                                    <div className="space-y-10">
                                        <div className="space-y-4">
                                            <h3 className="text-4xl font-black text-brand-900 tracking-tight">당신의 성향 스펙트럼</h3>
                                            <p className="text-lg text-slate-500 font-bold leading-relaxed">
                                                하나의 아키타입이 주된 성향이지만, 내부에는 다양한 잠재력이 공존합니다. 
                                                <span className="text-brand-500"> {result.title}</span>(이)가 가장 강력하지만 다른 요소들과의 상호작용을 확인하세요.
                                            </p>
                                        </div>
                                        <div className="space-y-6 h-[400px] overflow-y-auto pr-6 custom-scrollbar">
                                            {results.map((r, idx) => (
                                                <div key={r.id} className="space-y-3 group">
                                                    <div className="flex justify-between items-end">
                                                        <span className="text-lg font-black text-brand-900">{r.id}. {r.title}</span>
                                                        <span className="text-xs font-black text-slate-400 uppercase tracking-widest">{Math.round(r.score || 0)} Points</span>
                                                    </div>
                                                    <div className="h-3 bg-slate-100 rounded-full overflow-hidden shadow-inner">
                                                        <motion.div 
                                                            initial={{ width: 0 }} animate={{ width: `${((r.score || 0)/maxScore)*100}%` }}
                                                            className={`h-full rounded-full transition-all ${idx === 0 ? 'bg-gradient-to-r from-brand-500 to-emerald-500' : 'bg-slate-300 group-hover:bg-brand-200'}`}
                                                        />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section className="grid md:grid-cols-3 gap-8">
                                {[
                                    { title: '행동양식 (Big 5)', input: `INPUT: ${userMBTI}`, content: matchMetrics.isBig5Match ? '아키타입의 성격 구조와 완벽히 부합합니다.' : '아키타입과의 성격적 차이를 인지하고 보완이 필요합니다.', status: matchMetrics.isBig5Match ? 'Matching' : 'Gap Detected', color: 'brand' },
                                    { title: '동기요인 (Anchor)', input: `INPUT: ${userAnchorLabel}`, content: matchMetrics.isAnchorMatch ? '직업적 가치관이 아키타입의 방향성과 일치합니다.' : '동기부여를 위해 자신만의 관점 정립이 필요합니다.', status: matchMetrics.isAnchorMatch ? 'Aligned' : 'Context Shift', color: 'emerald' },
                                    { title: '핵심강점 (VIA)', input: `${matchMetrics.matchedVia.length}건 일치`, content: matchMetrics.matchedVia.length > 0 ? matchMetrics.matchedVia.join(', ') : '강점 조율이 필요합니다.', status: 'Core Strengths', color: 'rose' },
                                ].map(card => (
                                    <div key={card.title} className="glass-card !p-8 space-y-6">
                                        <div className="flex justify-between items-start">
                                            <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest">{card.title}</h4>
                                            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${card.status.includes('Gap') ? 'bg-amber-100 text-amber-600' : 'bg-emerald-100 text-emerald-600'}`}>{card.status}</span>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="text-2xl font-black text-brand-900">{card.input}</div>
                                            <p className="text-sm font-bold text-slate-500 leading-relaxed">{card.content}</p>
                                        </div>
                                    </div>
                                ))}
                            </section>
                        </div>
                    )}

                    {tab === 'growth' && (
                        <div className="space-y-12">
                            <div className="text-center space-y-4">
                                <h3 className="text-4xl font-black text-brand-900">4D Growth Roadmap</h3>
                                <p className="text-lg text-slate-500 font-bold max-w-2xl mx-auto">영성, 직무, 리더십, 관계 - 전인격적 성장을 위한 전략적 가이드입니다.</p>
                            </div>
                            <div className="grid md:grid-cols-2 gap-8">
                                {[
                                    { key: 'discipline', label: 'Spiritual Discipline', title: '내적 영성 훈련', color: 'indigo', icon: 'Dumbbell' },
                                    { key: 'skill', label: 'Professional Mastery', title: '직무 전문성', color: 'emerald', icon: 'Zap' },
                                    { key: 'leadership', label: 'Strategic Leadership', title: '리더십 스타일', color: 'amber', icon: 'Crown' },
                                    { key: 'relationship', label: 'Sync & Connection', title: '관계와 소통', color: 'rose', icon: 'Users' },
                                ].map(guide => {
                                    const data = (result.growthGuide as any)[guide.key];
                                    return (
                                        <div className="glass-card overflow-hidden !p-0 border-none shadow-xl flex flex-col">
                                            <div className={`p-8 text-white flex items-center justify-between ${
                                                guide.color === 'indigo' ? 'bg-indigo-500' :
                                                guide.color === 'emerald' ? 'bg-emerald-500' :
                                                guide.color === 'amber' ? 'bg-amber-500' :
                                                guide.color === 'rose' ? 'bg-rose-500' : 'bg-slate-500'
                                            }`}>
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-md"><Icon name={guide.icon} size={24}/></div>
                                                    <div>
                                                        <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60">{guide.label}</span>
                                                        <h4 className="text-xl font-black">{guide.title}</h4>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="p-10 flex-1 space-y-8">
                                                <div className="space-y-4">
                                                    <h5 className="text-2xl font-black text-brand-900">{data.title}</h5>
                                                    <p className="text-base text-slate-600 font-bold leading-loose">{data.description}</p>
                                                </div>
                                                <div className={`p-6 rounded-[1.5rem] border ${
                                                    guide.color === 'indigo' ? 'bg-indigo-50/50 border-indigo-100' :
                                                    guide.color === 'emerald' ? 'bg-emerald-50/50 border-emerald-100' :
                                                    guide.color === 'amber' ? 'bg-amber-50/50 border-amber-100' :
                                                    guide.color === 'rose' ? 'bg-rose-50/50 border-rose-100' : 'bg-slate-50/50 border-slate-100'
                                                }`}>
                                                    <span className={`text-xs font-black uppercase tracking-widest block mb-4 ${
                                                        guide.color === 'indigo' ? 'text-indigo-600' :
                                                        guide.color === 'emerald' ? 'text-emerald-600' :
                                                        guide.color === 'amber' ? 'text-amber-600' :
                                                        guide.color === 'rose' ? 'text-rose-600' : 'text-slate-600'
                                                    }`}>Growth Strategy</span>
                                                    <ul className="space-y-3">
                                                        {data.actionItems.map((item: string, i: number) => (
                                                            <li key={i} className="flex items-start gap-3 text-sm font-bold text-slate-700">
                                                                <Icon name="Check" size={16} className={`mt-0.5 shrink-0 ${
                                                                    guide.color === 'indigo' ? 'text-indigo-500' :
                                                                    guide.color === 'emerald' ? 'text-emerald-500' :
                                                                    guide.color === 'amber' ? 'text-amber-500' :
                                                                    guide.color === 'rose' ? 'text-rose-500' : 'text-slate-500'
                                                                }`}/> {item}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {tab === 'practical' && (
                        <div className="space-y-16">
                            <section className="glass-card !p-12">
                                <h3 className="text-3xl font-black text-brand-900 mb-10 flex items-center gap-4"><Icon name="Calendar" className="text-emerald-500"/> Weekly Command Center</h3>
                                <div className="grid grid-cols-2 md:grid-cols-7 gap-4">
                                    {Object.entries(result.weeklyPlan || {}).map(([day, task]) => (
                                        <div key={day} className="flex flex-col gap-3 p-6 rounded-3xl bg-slate-50 border border-slate-100 hover:border-brand-500/30 transition-all group">
                                            <span className="text-sm font-black text-brand-500 uppercase tracking-widest">{day}</span>
                                            <p className="text-sm font-bold text-slate-700 leading-relaxed group-hover:text-brand-900">{task as string}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            <section className="space-y-8">
                                <h3 className="text-3xl font-black text-brand-900 flex items-center gap-4"><Icon name="Zap" className="text-amber-500"/> Critical Scenarios</h3>
                                <div className="grid gap-6">
                                    {result.conflictScenarios?.map((s, idx) => (
                                        <div key={idx} className="glass-card !p-0 border-none overflow-hidden shadow-xl">
                                            <div className="bg-slate-900 text-white p-8">
                                                <span className="text-[10px] font-black text-brand-500 uppercase tracking-widest block mb-2">Scenario Analysis</span>
                                                <h4 className="text-xl font-black">{s.situation}</h4>
                                            </div>
                                            <div className="grid md:grid-cols-2">
                                                <div className="p-8 bg-rose-50/50 border-r border-slate-100">
                                                    <span className="flex items-center gap-2 text-rose-600 font-black mb-4 uppercase tracking-widest text-xs"><Icon name="X" size={16}/> Warning Response</span>
                                                    <p className="text-slate-700 font-bold leading-relaxed">{s.wrongResponse}</p>
                                                </div>
                                                <div className="p-8 bg-emerald-50/50">
                                                    <span className="flex items-center gap-2 text-emerald-600 font-black mb-4 uppercase tracking-widest text-xs"><Icon name="Check" size={16}/> Recommended Response</span>
                                                    <p className="text-slate-700 font-bold leading-relaxed">{s.rightResponse}</p>
                                                </div>
                                            </div>
                                            <div className="p-6 bg-brand-50 border-t border-brand-100">
                                                <p className="text-brand-900 font-black text-sm text-center">Core Principle: <span className="opacity-60">{s.principle}</span></p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        </div>
                    )}

                    {tab === 'prayer' && (
                         <div className="space-y-12">
                            <div className="text-center space-y-4">
                                <h3 className="text-4xl font-black text-brand-900">Spiritual Connection</h3>
                                <p className="text-lg text-slate-500 font-bold max-w-2xl mx-auto">하나님과의 깊은 교제를 위한 아침, 낮, 저녁의 영적 루틴입니다.</p>
                            </div>
                            <div className="grid lg:grid-cols-2 gap-8">
                                {[
                                    { id: 'morning', title: '아침 기도문', content: result.prayerGuide?.morningPrayer, icon: 'Sun', color: 'amber' },
                                    { id: 'noon', title: '낮 기도문', content: result.prayerGuide?.noonPrayer, icon: 'CloudSun', color: 'sky' },
                                    { id: 'evening', title: '저녁 성찰', content: result.prayerGuide?.eveningReflection, icon: 'Moon', color: 'indigo' },
                                    { id: 'special', title: '특별 기도문', content: result.prayerGuide?.specialPrayer, icon: 'Flame', color: 'rose' },
                                ].map(p => (
                                    <div key={p.id} className="glass-card !p-12 space-y-8 relative overflow-hidden group">
                                        <div className={`absolute -top-10 -right-10 w-40 h-40 rounded-full blur-3xl group-hover:scale-150 transition-all duration-700 ${
                                            p.color === 'amber' ? 'bg-amber-500/10' :
                                            p.color === 'sky' ? 'bg-sky-500/10' :
                                            p.color === 'indigo' ? 'bg-indigo-500/10' :
                                            p.color === 'rose' ? 'bg-rose-500/10' : 'bg-slate-500/10'
                                        }`}></div>
                                        <div className="flex items-center gap-4 relative z-10">
                                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                                                p.color === 'amber' ? 'bg-amber-500/10 text-amber-600' :
                                                p.color === 'sky' ? 'bg-sky-500/10 text-sky-600' :
                                                p.color === 'indigo' ? 'bg-indigo-500/10 text-indigo-600' :
                                                p.color === 'rose' ? 'bg-rose-500/10 text-rose-600' : 'bg-slate-500/10 text-slate-600'
                                            }`}><Icon name={p.icon} size={28}/></div>
                                            <h4 className="text-2xl font-black text-brand-900">{p.title}</h4>
                                        </div>
                                        <p className="text-xl font-bold text-slate-700 leading-loose italic font-serif text-justify relative z-10">
                                            "{p.content}"
                                        </p>
                                    </div>
                                ))}
                            </div>
                         </div>
                    )}

                    {tab === 'hr' && (
                        <div className="space-y-12">
                             <div className="glass-card !bg-brand-900 !text-white !p-12 space-y-8 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/20 rounded-full blur-[100px]"></div>
                                <div className="relative z-10 space-y-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center"><Icon name="Building" size={24}/></div>
                                        <h3 className="text-3xl font-black">인사 배치 가이드</h3>
                                    </div>
                                    <p className="text-xl text-white/70 font-bold leading-relaxed max-w-4xl">{result.deploymentFit?.hrRecommendation}</p>
                                </div>
                             </div>

                             <div className="grid lg:grid-cols-2 gap-8">
                                <div className="glass-card !p-10 space-y-10">
                                    <h4 className="text-xl font-black text-brand-900 uppercase tracking-widest">Environment Suitability</h4>
                                    <div className="space-y-8">
                                        <div className="space-y-4">
                                            <div className="flex justify-between items-end">
                                                <span className="text-lg font-black text-slate-700 flex items-center gap-2"><Icon name="Building" className="text-brand-500"/> 본부 (HQ)</span>
                                                <span className="text-2xl font-black text-brand-500">{result.deploymentFit?.hqScore}/10</span>
                                            </div>
                                            <div className="h-4 bg-slate-100 rounded-full overflow-hidden shadow-inner">
                                                <motion.div initial={{width:0}} animate={{width:`${(result.deploymentFit?.hqScore || 0)*10}%`}} className="h-full bg-brand-500"/>
                                            </div>
                                        </div>
                                        <div className="space-y-4">
                                            <div className="flex justify-between items-end">
                                                <span className="text-lg font-black text-slate-700 flex items-center gap-2"><Icon name="MapPin" className="text-emerald-500"/> 현장 (Field)</span>
                                                <span className="text-2xl font-black text-emerald-500">{result.deploymentFit?.fieldScore}/10</span>
                                            </div>
                                            <div className="h-4 bg-slate-100 rounded-full overflow-hidden shadow-inner">
                                                <motion.div initial={{width:0}} animate={{width:`${(result.deploymentFit?.fieldScore || 0)*10}%`}} className="h-full bg-emerald-500"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 font-bold text-slate-600 leading-relaxed italic">
                                        {result.deploymentFit?.reasoning}
                                    </div>
                                </div>

                                <div className="glass-card !bg-brand-50 !border-brand-100 !p-10 space-y-8">
                                    <h4 className="text-xl font-black text-brand-900 uppercase tracking-widest">DISC Profile Matching</h4>
                                    <div className="space-y-6">
                                        <div className="text-3xl font-black text-brand-500">{result.deploymentFit?.discProfile.primaryType}</div>
                                        <p className="text-lg text-slate-700 font-bold leading-relaxed">{result.deploymentFit?.discProfile.description}</p>
                                        <div className="bg-white/80 p-6 rounded-2xl border border-brand-200">
                                            <span className="text-xs font-black text-brand-500 uppercase tracking-widest block mb-2">Ideal Departments</span>
                                            <div className="flex flex-wrap gap-2">
                                                {result.deploymentFit?.idealDepartments.map(d => (
                                                    <span key={d} className="px-4 py-2 bg-brand-500 text-white rounded-xl text-xs font-black shadow-sm">{d}</span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                             </div>
                        </div>
                    )}

                    {tab === 'team' && <TeamBuilder results={results} inputs={inputs} />}

                    {tab === 'management' && (
                        <div className="space-y-12">
                            <div className="glass-card !p-12 text-center space-y-6">
                                <h3 className="text-4xl font-black text-brand-900">Professional Management Profile</h3>
                                <p className="text-lg text-slate-500 font-bold max-w-3xl mx-auto">경영학적 관점에서 본 당신의 사역 스타일과 조직 운영 아키타입입니다.</p>
                            </div>
                            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {Object.entries(managementProfiles).filter(([k]) => result.traits.management?.includes(k)).map(([key, p]) => (
                                    <div key={key} className="glass-card !p-8 space-y-4 hover:border-brand-500 transition-all group">
                                        <div className="w-12 h-12 bg-brand-50 rounded-xl flex items-center justify-center text-brand-500 group-hover:bg-brand-500 group-hover:text-white transition-all"><Icon name="TrendingUp" size={24}/></div>
                                        <h4 className="text-xl font-black text-brand-900">{p.title}</h4>
                                        <p className="text-sm font-bold text-slate-500 leading-relaxed">{p.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {tab === 'education' && (
                         <div className="space-y-12">
                            <div className="glass-card !p-12 bg-gradient-to-r from-brand-900 to-indigo-900 text-white space-y-6">
                                <h3 className="text-4xl font-black">Tailored Curriculum</h3>
                                <p className="text-xl text-white/60 font-bold">당신의 유형에 최적화된 학습 로드맵입니다.</p>
                            </div>
                            <div className="grid gap-8">
                                {educationContent.filter(e => e.archetypeIds.includes(result.id)).map(edu => (
                                    <div key={edu.id} className="glass-card !p-10 space-y-8">
                                        <div className="flex justify-between items-start">
                                            <div className="space-y-2">
                                                <span className="text-xs font-black text-brand-500 uppercase tracking-[0.2em]">{edu.level} Curriculum</span>
                                                <h4 className="text-3xl font-black text-brand-900">{edu.title}</h4>
                                            </div>
                                            <div className="text-right">
                                                <span className="text-xs font-black text-slate-400 uppercase block mb-1">Duration</span>
                                                <span className="text-xl font-black text-brand-500">{edu.duration}</span>
                                            </div>
                                        </div>
                                        <div className="grid md:grid-cols-2 gap-12">
                                            <div className="space-y-6">
                                                <h5 className="font-black text-brand-900 flex items-center gap-2"><Icon name="ListChecks"/> Key Topics</h5>
                                                <ul className="grid grid-cols-1 gap-3">
                                                    {edu.topics.map(t => (
                                                        <li key={t} className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100 font-bold text-slate-700">
                                                            <Icon name="BookOpen" size={16} className="text-brand-500"/> {t}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                            <div className="space-y-6">
                                                <h5 className="font-black text-brand-900 flex items-center gap-2"><Icon name="GraduationCap"/> Outcome</h5>
                                                <p className="text-lg text-slate-600 font-bold leading-relaxed">{edu.outcome}</p>
                                                <button className="premium-btn-primary w-full py-5 text-xl">교육 신청하기</button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                         </div>
                    )}
                </motion.div>
            </AnimatePresence>

            {/* Bottom Floating Action Button */}
            <div className="fixed bottom-8 right-8 z-[100] flex flex-col gap-4">
                <motion.button 
                    whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="w-16 h-16 bg-white border-2 border-brand-500 text-brand-500 rounded-full flex items-center justify-center shadow-2xl"
                >
                    <Icon name="ArrowUp" size={24}/>
                </motion.button>
            </div>
        </div>
    );
};
