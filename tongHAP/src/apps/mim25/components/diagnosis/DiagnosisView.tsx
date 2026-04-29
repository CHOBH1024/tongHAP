import React, { useState, useEffect, useMemo } from 'react';
import { Icon } from '@/components/diagnosis/Icon';
import { SectionTitle } from '@/components/diagnosis/SectionTitle';
import { externalTests, detailData, archetypes } from '@/lib/data';
import { Inputs, Big5Level, EQTrait, Archetype } from '@/lib/types';
import { motion, AnimatePresence } from 'framer-motion';

interface DiagnosisViewProps {
    inputs: Inputs;
    setInputs: React.Dispatch<React.SetStateAction<Inputs>>;
    onFinish: (inputs?: Inputs) => void;
}

interface DiagnosisModalProps {
    type: 'enneagram' | 'big5' | 'anchor' | 'via' | 'eq';
    inputs: Inputs;
    setInputs: React.Dispatch<React.SetStateAction<Inputs>>;
    onClose: () => void;
}

// Premium Progress Bar
const ProgressBar = ({ progress }: { progress: number }) => (
    <div className="w-full mb-12">
        <div className="flex justify-between items-end mb-3 px-1">
            <span className="text-xs font-black text-brand-500 uppercase tracking-[0.2em]">Diagnostic Progress</span>
            <span className="text-2xl font-black text-brand-900">{Math.round(progress)}%</span>
        </div>
        <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden shadow-inner">
            <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                className="h-full bg-gradient-to-r from-brand-500 to-emerald-500 shadow-[0_0_15px_rgba(49,130,246,0.4)]" 
            />
        </div>
    </div>
);

const EQ_QUESTIONS: Record<string, string[]> = {
    awareness: [
        "힘든 심방을 마친 직후 내 감정 상태가 어떤지 즉시 알아차린다",
        "사역 중 화가 날 때 그 원인이 무엇인지 정확히 파악한다",
        "내 감정이 식구들을 대하는 방식에 어떤 영향을 미치는지 인식한다",
        "나의 사역적 강점과 약점을 객관적으로 파악하고 있다",
        "나의 내면 상태(지침·불안·기쁨 등)를 다른 사람에게 솔직하게 표현할 수 있다",
    ],
    regulation: [
        "식구가 무례하게 대할 때 즉각 반응하지 않고 감정을 먼저 다스린다",
        "예상치 못한 사역 변화가 생겨도 침착하게 대처한다",
        "회의 중 날카로운 비판을 받아도 방어적이 되지 않고 경청한다",
        "부정적인 감정이 다음 사역에까지 이어지지 않도록 전환할 수 있다",
        "충동적으로 결정을 내리기보다 감정이 가라앉은 후 판단한다",
    ],
    motivation: [
        "외부 보상이나 인정이 없어도 사역에 열정을 유지한다",
        "어려운 목표를 스스로 설정하고 끝까지 추구한다",
        "실패하거나 비판을 받아도 사명감으로 다시 일어난다",
        "사역이 힘들어도 '왜 이 일을 하는가'를 스스로 되새기며 동기를 유지한다",
        "단기 성과보다 장기적인 섭리적 목표를 더 중요하게 여긴다",
    ],
    empathy: [
        "식구의 말투나 표정에서 말하지 않은 감정 상태를 읽어낸다",
        "상담 중 상대방이 무엇을 필요로 하는지 직감적으로 안다",
        "나와 다른 가치관이나 배경을 가진 식구의 입장도 충분히 이해할 수 있다",
        "힘든 식구를 만날 때 해결책보다 먼저 공감을 표현한다",
        "타인의 감정에 영향을 받는 편이며 그들의 아픔이 나의 아픔으로 느껴진다",
    ],
    social: [
        "갈등 상황에서 양쪽이 모두 수긍할 수 있는 해결책을 찾아낸다",
        "처음 만나는 사람과도 짧은 시간 안에 신뢰 관계를 형성한다",
        "팀 내 분위기가 가라앉아 있을 때 자연스럽게 분위기를 끌어올린다",
        "다양한 성격의 사람들로 구성된 팀에서도 협업을 원활하게 이끈다",
        "설득이 필요한 상황에서 논리보다 관계와 신뢰를 먼저 활용한다",
    ],
};

const ENNEAGRAM_KEYWORDS: Record<string, string> = {
    '1': '원칙·완벽', '2': '돌봄·관계', '3': '성취·인정',
    '4': '정체성·독창', '5': '지식·독립', '6': '충성·안전',
    '7': '자유·즐거움', '8': '힘·도전', '9': '평화·화합',
};

const ANCHOR_HINTS: Record<string, string> = {
    managerial: "조직 전체를 이끌고 책임질 때 가장 보람을 느낀다",
    expert: "특정 분야의 깊은 전문성을 쌓고 인정받을 때 보람을 느낀다",
    autonomy: "내 방식대로 자율적으로 사역할 수 있을 때 최선을 발휘한다",
    security: "안정적인 환경과 예측 가능한 미래가 보장될 때 헌신한다",
    entrepreneurial: "새로운 것을 만들고 창조적 도전을 할 때 살아있음을 느낀다",
    service: "타인을 돕고 세상에 의미 있는 기여를 할 때 보람을 느낀다",
    challenge: "불가능해 보이는 문제를 해결하는 도전 자체에서 에너지를 얻는다",
    lifestyle: "사역·가정·개인 삶의 균형이 유지될 때 지속적으로 헌신할 수 있다",
};

const DiagnosisModal: React.FC<DiagnosisModalProps> = ({ type, inputs, setInputs, onClose }) => {
    const isBig5 = type === 'big5';
    const isVia = type === 'via';
    const isEQ = type === 'eq';

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    const viaList = detailData.via.list || [];
    const eqData = detailData.eq || {};
    const [viaSearch, setViaSearch] = useState('');
    const [eqAnswers, setEqAnswers] = useState<Record<string, number[]>>({
        awareness: [0,0,0,0,0], regulation: [0,0,0,0,0], motivation: [0,0,0,0,0],
        empathy: [0,0,0,0,0], social: [0,0,0,0,0],
    });

    const calcEQLevel = (answers: number[]): Big5Level | '' => {
        if (answers.some(a => a === 0)) return '';
        const sum = answers.reduce((a, b) => a + b, 0);
        return sum >= 13 ? 'High' : sum >= 8 ? 'Mid' : 'Low';
    };

    useEffect(() => {
        if (!isEQ) return;
        setInputs(prev => {
            const newEq = { ...prev.eq };
            (Object.keys(eqAnswers) as EQTrait[]).forEach(trait => {
                const lvl = calcEQLevel(eqAnswers[trait]);
                if (lvl) newEq[trait] = lvl;
            });
            return { ...prev, eq: newEq };
        });
    }, [eqAnswers]);

    const handleBig5Change = (trait: string, value: Big5Level) => {
        setInputs(prev => ({
            ...prev,
            big5: { ...prev.big5, [trait]: value }
        }));
    };

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div 
            className="fixed inset-0 bg-brand-900/40 backdrop-blur-xl z-[100] flex items-center justify-center p-4"
            onClick={handleBackdropClick}
        >
            <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="bg-white/90 backdrop-blur-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-[3rem] shadow-2xl relative flex flex-col border border-white/50"
            >
                {/* Modal Header */}
                <div className="px-10 py-8 border-b border-brand-100 flex justify-between items-center bg-white/50">
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-brand-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-brand-500/20">
                            <Icon name={isBig5 ? "Brain" : isVia ? "Sparkles" : isEQ ? "Heart" : type === 'enneagram' ? "Fingerprint" : "Anchor"} size={28} />
                        </div>
                        <div>
                            <h3 className="text-2xl font-black text-brand-900">
                                {isBig5 ? "Big 5 성격 프로파일링" : isVia ? "VIA 강점 선택 (5개)" : isEQ ? "EQ 감성지능 프로파일링" : type === 'enneagram' ? "에니어그램 유형 선택" : "커리어 앵커 선택"}
                            </h3>
                            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Diagnostic Input Engine</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-3 hover:bg-brand-50 rounded-2xl text-slate-400 hover:text-brand-500 transition-all">
                        <Icon name="X" size={28} />
                    </button>
                </div>

                {/* Modal Content */}
                <div className="flex-1 overflow-y-auto p-10 space-y-8">
                    {isBig5 ? (
                        <div className="space-y-10">
                            <div className="bg-brand-50 p-6 rounded-[2rem] border border-brand-100 flex gap-4">
                                <Icon name="Zap" size={24} className="text-brand-500 shrink-0"/>
                                <div>
                                    <span className="font-black text-brand-900 block mb-1">결과 해석 가이드 (bigfive-test.com)</span>
                                    <p className="text-sm text-slate-500 font-bold">검사 결과의 백분위 점수를 아래 기준에 맞춰 선택해주세요.</p>
                                    <div className="flex gap-3 mt-4">
                                        <span className="bg-brand-500 text-white px-3 py-1 rounded-full text-xs font-black">60%+ 높음</span>
                                        <span className="bg-slate-300 text-white px-3 py-1 rounded-full text-xs font-black">40-60% 보통</span>
                                        <span className="bg-slate-500 text-white px-3 py-1 rounded-full text-xs font-black">40% 미만 낮음</span>
                                    </div>
                                </div>
                            </div>
                            {Object.entries(detailData.big5).map(([key, info]) => (
                                <div key={key} className="glass-card !p-8 border-none bg-white">
                                    <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-6">
                                        <div>
                                            <h4 className="text-2xl font-black text-brand-900">{info.name}</h4>
                                            <p className="text-sm text-slate-400 font-bold mt-1">{info.desc}</p>
                                        </div>
                                        <div className="flex bg-slate-100 rounded-2xl p-1.5 border border-slate-200 shrink-0">
                                            {(['Low', 'Mid', 'High'] as Big5Level[]).map(level => (
                                                <button 
                                                    key={level} 
                                                    onClick={() => handleBig5Change(key, level)}
                                                    className={`px-6 py-2.5 rounded-xl text-sm font-black transition-all ${
                                                        inputs.big5[key as keyof typeof inputs.big5] === level 
                                                            ? 'bg-white text-brand-500 shadow-sm' 
                                                            : 'text-slate-400 hover:text-slate-600'
                                                    }`}
                                                >
                                                    {level === 'High' ? '높음' : level === 'Mid' ? '보통' : '낮음'}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className={`p-5 rounded-2xl transition-all border ${inputs.big5[key as keyof typeof inputs.big5] === 'High' ? 'bg-brand-50 border-brand-200 text-brand-900 shadow-sm' : 'bg-slate-50 border-transparent text-slate-400'}`}>
                                            <span className="font-black text-xs uppercase block mb-1">High Profile</span> {info.high}
                                        </div>
                                        <div className={`p-5 rounded-2xl transition-all border ${inputs.big5[key as keyof typeof inputs.big5] === 'Low' ? 'bg-slate-200 border-slate-300 text-slate-800' : 'bg-slate-50 border-transparent text-slate-400'}`}>
                                            <span className="font-black text-xs uppercase block mb-1">Low Profile</span> {info.low}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : isVia ? (
                        <div className="space-y-8">
                            <div className="bg-emerald-50 p-6 rounded-[2rem] border border-emerald-100 flex gap-4">
                                <Icon name="Sparkles" size={24} className="text-emerald-500 shrink-0"/>
                                <p className="text-sm text-emerald-800 font-bold leading-relaxed">
                                    <span className="font-black block text-emerald-900 mb-1">Signature Strengths (viacharacter.org)</span>
                                    상위 5개 강점을 선택해주세요. 당신의 성품을 대변하는 핵심 역량입니다.
                                </p>
                            </div>
                            <div className="flex items-center gap-6 sticky top-0 bg-white/80 backdrop-blur-md p-4 rounded-3xl z-10 border border-slate-100">
                                <div className="flex-1 relative">
                                    <Icon name="Search" className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18}/>
                                    <input
                                        type="text"
                                        placeholder="강점 검색..."
                                        value={viaSearch}
                                        onChange={e => setViaSearch(e.target.value)}
                                        className="w-full pl-12 pr-6 py-4 bg-slate-100 border-none rounded-2xl text-base font-bold focus:ring-2 focus:ring-emerald-500/20"
                                    />
                                </div>
                                <div className="bg-emerald-500 text-white px-6 py-4 rounded-2xl font-black flex items-center gap-3 shadow-lg shadow-emerald-500/20">
                                    <span className="text-2xl">{inputs.via.length}</span> <span className="opacity-40">/</span> <span>5</span>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {viaList.filter(v => v.includes(viaSearch)).map(v => {
                                    const isSelected = inputs.via.includes(v);
                                    const isDisabled = !isSelected && inputs.via.length >= 5;
                                    return (
                                        <button 
                                            key={v} 
                                            disabled={isDisabled}
                                            onClick={() => {
                                                const newVia = isSelected 
                                                    ? inputs.via.filter(i => i !== v) 
                                                    : inputs.via.length < 5 ? [...inputs.via, v] : inputs.via;
                                                setInputs({...inputs, via: newVia});
                                            }} 
                                            className={`p-4 rounded-2xl text-sm font-black transition-all border-2 text-center h-20 flex items-center justify-center ${
                                                isSelected 
                                                    ? 'bg-emerald-500 border-emerald-500 text-white shadow-lg scale-105' 
                                                    : isDisabled
                                                        ? 'bg-slate-50 border-slate-100 text-slate-200 cursor-not-allowed opacity-50'
                                                        : 'bg-white border-slate-200 text-slate-500 hover:border-emerald-300 hover:bg-emerald-50'
                                            }`}
                                        >
                                            {v}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    ) : isEQ ? (
                        <div className="space-y-10">
                            {(() => {
                                const totalAnswered = Object.values(eqAnswers).flat().filter(a => a > 0).length;
                                return (
                                    <div className="bg-rose-50 p-8 rounded-[2.5rem] border border-rose-100 space-y-4">
                                        <div className="flex justify-between items-end">
                                            <div>
                                                <h4 className="text-xl font-black text-rose-900">EQ 정밀 진단</h4>
                                                <p className="text-sm text-rose-600 font-bold">25문항에 성실히 답변해주세요.</p>
                                            </div>
                                            <span className="text-2xl font-black text-rose-500">{totalAnswered} <span className="text-xs opacity-50">/ 25</span></span>
                                        </div>
                                        <div className="h-2.5 bg-rose-200 rounded-full overflow-hidden">
                                            <motion.div initial={{width:0}} animate={{width:`${(totalAnswered/25)*100}%`}} className="h-full bg-rose-500"/>
                                        </div>
                                    </div>
                                );
                            })()}
                            {Object.entries(eqData).map(([key, info]) => {
                                const questions = EQ_QUESTIONS[key] || [];
                                const answers = eqAnswers[key] || [];
                                const level = calcEQLevel(answers);
                                const dimDone = answers.every(a => a > 0);
                                return (
                                    <div key={key} className={`glass-card !p-0 border-none overflow-hidden transition-all ${dimDone ? 'ring-2 ring-rose-500 shadow-xl' : ''}`}>
                                        <div className={`px-8 py-6 flex items-center justify-between ${dimDone ? 'bg-rose-500 text-white' : 'bg-slate-50'}`}>
                                            <div>
                                                <h4 className={`text-xl font-black ${dimDone ? 'text-white' : 'text-brand-900'}`}>{info.name}</h4>
                                                <p className={`text-xs font-bold ${dimDone ? 'text-white/60' : 'text-slate-400'}`}>{info.desc}</p>
                                            </div>
                                            {dimDone && (
                                                <div className="bg-white text-rose-500 px-4 py-1 rounded-full text-xs font-black shadow-sm uppercase tracking-widest">
                                                    {level === 'High' ? 'High Level' : level === 'Mid' ? 'Medium Level' : 'Low Level'}
                                                </div>
                                            )}
                                        </div>
                                        <div className="p-8 space-y-6">
                                            {questions.map((q, qi) => (
                                                <div key={qi} className="space-y-4">
                                                    <p className="text-base text-slate-700 font-bold leading-relaxed flex gap-3">
                                                        <span className="text-rose-500 font-black">Q{qi+1}.</span> {q}
                                                    </p>
                                                    <div className="flex gap-3">
                                                        {[{score:1,label:'전혀 아니다'},{score:2,label:'보통이다'},{score:3,label:'매우 그렇다'}].map(opt => (
                                                            <button
                                                                key={opt.score}
                                                                onClick={() => {
                                                                    const newA = [...answers]; newA[qi] = opt.score;
                                                                    setEqAnswers(prev => ({...prev, [key]: newA}));
                                                                }}
                                                                className={`flex-1 py-4 rounded-2xl text-sm font-black transition-all border-2 ${
                                                                    answers[qi] === opt.score
                                                                        ? 'bg-rose-500 border-rose-500 text-white shadow-lg'
                                                                        : 'bg-white border-slate-100 text-slate-400 hover:border-rose-200'
                                                                }`}
                                                            >
                                                                {opt.label}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {Object.entries(type === 'enneagram' ? detailData.enneagram : detailData.anchor).map(([k, v]) => (
                                <button
                                    key={k}
                                    onClick={() => { setInputs({...inputs, [type]: k}); onClose(); }}
                                    className={`w-full text-left p-8 rounded-[2.5rem] border-2 transition-all hover:shadow-xl ${
                                        inputs[type as 'enneagram'|'anchor'] === k
                                            ? 'border-brand-500 bg-brand-50 shadow-brand-500/10'
                                            : 'border-slate-100 hover:border-brand-200 bg-white'
                                    }`}
                                >
                                    <div className="flex justify-between items-start gap-6">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <span className={`text-2xl font-black ${inputs[type as 'enneagram'|'anchor'] === k ? 'text-brand-900' : 'text-slate-800'}`}>
                                                    {v.label}
                                                </span>
                                                {type === 'enneagram' && ENNEAGRAM_KEYWORDS[k] && (
                                                    <span className="bg-brand-500/10 text-brand-500 px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest">{ENNEAGRAM_KEYWORDS[k]}</span>
                                                )}
                                            </div>
                                            {type === 'anchor' && ANCHOR_HINTS[k] && (
                                                <p className="text-sm font-bold text-brand-500 italic mb-3 opacity-60">"{ANCHOR_HINTS[k]}"</p>
                                            )}
                                            <p className="text-base text-slate-500 font-medium leading-relaxed">{v.desc}</p>
                                        </div>
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border-2 transition-all ${inputs[type as 'enneagram'|'anchor'] === k ? 'bg-brand-500 border-brand-500 text-white' : 'border-slate-100 text-transparent'}`}>
                                            <Icon name="Check" size={24}/>
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Modal Footer */}
                <div className="px-10 py-8 border-t border-brand-100 bg-white/50">
                     <button 
                        onClick={onClose}
                        className="premium-btn-primary w-full py-5 text-xl justify-center shadow-2xl"
                    >
                        {isBig5 ? "입력 데이터 반영하기" : isVia ? `선택 완료 (${inputs.via.length}/5)` : isEQ ? `EQ 분석 데이터 동기화` : "선택 취소 및 닫기"}
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export const DiagnosisView: React.FC<DiagnosisViewProps> = ({ inputs, setInputs, onFinish }) => {
    const [activeModal, setActiveModal] = useState<'enneagram' | 'big5' | 'anchor' | 'via' | 'eq' | null>(null);

    const isEnneagramDone = !!inputs.enneagram;
    const big5Count = Object.values(inputs.big5).filter(v => v !== '').length;
    const isBig5Done = big5Count === 5;
    const isAnchorDone = !!inputs.anchor;
    const isViaDone = inputs.via.length === 5;
    const eqCount = Object.values(inputs.eq).filter(v => v !== '').length;
    const isEQDone = eqCount === 5;

    const progress = useMemo(() => {
        let count = 0;
        if (isEnneagramDone) count += 1;
        if (isAnchorDone) count += 1;
        if (isViaDone) count += 1;
        count += (big5Count / 5);
        count += (eqCount / 5);
        return (count / 5) * 100;
    }, [inputs, isEnneagramDone, isAnchorDone, isViaDone, big5Count, eqCount]);

    const isReady = isEnneagramDone && isBig5Done && isAnchorDone && isViaDone && isEQDone;

    const renderCard = (
        type: 'enneagram' | 'big5' | 'anchor' | 'via' | 'eq',
        title: string,
        subtitle: string,
        icon: string,
        colorClass: string,
        isDone: boolean,
        valuePreview?: React.ReactNode
    ) => (
        <div 
            onClick={() => setActiveModal(type as any)}
            className={`
                glass-card group relative !p-8 flex flex-col justify-between transition-all duration-500 border-2
                ${isDone 
                    ? 'border-brand-500 shadow-xl shadow-brand-500/5 bg-white' 
                    : 'border-transparent hover:border-brand-200 bg-white/50'
                }
            `}
        >
            <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-5">
                    <div className={`
                        w-16 h-16 rounded-[1.5rem] flex items-center justify-center transition-all duration-500 shadow-sm
                        ${isDone ? 'bg-brand-500 text-white scale-110 shadow-lg shadow-brand-500/20' : `bg-white ${colorClass} group-hover:scale-110 group-hover:shadow-md`}
                    `}>
                        <Icon name={icon} size={32}/>
                    </div>
                    <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-1">{subtitle}</p>
                        <h4 className={`text-2xl font-black ${isDone ? 'text-brand-900' : 'text-slate-700'}`}>
                            {title}
                        </h4>
                    </div>
                </div>
                <div className={`
                    w-10 h-10 rounded-full flex items-center justify-center transition-all border-2
                    ${isDone ? 'bg-brand-50 text-brand-500 border-brand-500' : 'text-slate-200 border-slate-100 group-hover:border-brand-200 group-hover:text-brand-500'}
                `}>
                    <Icon name={isDone ? "Check" : "ArrowRight"} size={20}/>
                </div>
            </div>
            
            <div className="min-h-[2.5rem] flex items-end">
                {isDone ? (
                    <div className="w-full">
                        {valuePreview}
                    </div>
                ) : (
                    <span className="text-sm font-black text-slate-300 uppercase tracking-widest">Awaiting Input</span>
                )}
            </div>
        </div>
    );

    const handleManualSelect = (archetype: Archetype) => {
        const syntheticInputs: Inputs = {
            enneagram: archetype.traits.enneagram[0],
            anchor: archetype.traits.anchor[0],
            big5: {
                openness: 'Mid',
                conscientiousness: 'Mid',
                extraversion: 'Mid',
                agreeableness: 'Mid',
                neuroticism: 'Mid',
                [archetype.traits.big5 as keyof Inputs['big5']]: 'High'
            },
            via: archetype.traits.via.slice(0, 5),
            eq: { awareness: 'Mid', regulation: 'Mid', motivation: 'Mid', empathy: 'Mid', social: 'Mid' }
        };

        setInputs(syntheticInputs);
        onFinish(syntheticInputs);
    };

    return (
        <div className="max-w-6xl mx-auto px-6 py-12 space-y-16">
            <div className="text-center space-y-4">
                <SectionTitle title="소명 성향 진단" subtitle="자신을 가장 잘 나타내는 핵심 지표들을 통합하여 분석합니다." />
                <p className="text-slate-400 font-bold max-w-2xl mx-auto leading-relaxed">
                    에니어그램, Big 5, 커리어 앵커, VIA 강점, 그리고 EQ 감성지능까지 - <br/>
                    5가지 전문 다면 진단을 통해 당신의 '목회 아키타입'을 도출합니다.
                </p>
            </div>
            
            {/* External Support Box */}
            <div className="glass-card !bg-brand-900 !text-white !p-10 flex flex-col md:flex-row items-center justify-between gap-10">
                <div className="space-y-3 text-center md:text-left">
                    <h3 className="text-2xl font-black flex items-center justify-center md:justify-start gap-3">
                        <Icon name="ExternalLink" size={24} className="text-brand-500"/> 
                        전문 외부 진단 지원
                    </h3>
                    <p className="text-white/60 font-bold max-w-lg">
                        아직 결과가 없으신가요? 공신력 있는 무료 진단 사이트에서 <br/>먼저 테스트를 진행한 후 결과를 입력해주세요.
                    </p>
                </div>
                <div className="flex flex-wrap justify-center gap-3 max-w-md">
                    {externalTests.map(t => (
                        <a key={t.id} href={t.url} target="_blank" rel="noopener noreferrer" 
                           className="px-5 py-3 bg-white/10 hover:bg-white/20 rounded-2xl text-sm font-black flex items-center gap-2 transition-all border border-white/10 hover:border-white/30">
                            <Icon name={t.icon} size={16}/> {t.name}
                        </a>
                    ))}
                </div>
            </div>

            <ProgressBar progress={progress} />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {renderCard(
                    'enneagram', 
                    "에니어그램", 
                    "Inner Motivation", 
                    "Fingerprint", 
                    "text-brand-500",
                    isEnneagramDone,
                    <div className="bg-brand-50 text-brand-900 px-4 py-2 rounded-xl text-sm font-black border border-brand-100 inline-block shadow-sm">
                        {inputs.enneagram ? detailData.enneagram[inputs.enneagram as keyof typeof detailData.enneagram]?.label?.split(':')[0] : ''}
                    </div>
                )}

                {renderCard(
                    'big5', 
                    "Big 5 성격", 
                    "Core Personality", 
                    "Brain", 
                    "text-emerald-500",
                    isBig5Done,
                    <div className="flex items-center gap-3">
                        <div className="flex gap-1.5">
                            {Object.entries(inputs.big5).map(([k, v]) => (
                                <div key={k} className={`w-3 h-3 rounded-full ${v === 'High' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : v === 'Mid' ? 'bg-emerald-200' : 'bg-slate-200'}`}></div>
                            ))}
                        </div>
                        <span className="text-sm font-black text-emerald-600 uppercase tracking-widest">{big5Count}/5 Metrics</span>
                    </div>
                )}

                {renderCard(
                    'anchor', 
                    "커리어 앵커", 
                    "Work Values", 
                    "Anchor", 
                    "text-indigo-500",
                    isAnchorDone,
                    <div className="bg-indigo-50 text-indigo-900 px-4 py-2 rounded-xl text-sm font-black border border-indigo-100 inline-block shadow-sm">
                        {inputs.anchor ? detailData.anchor[inputs.anchor as keyof typeof detailData.anchor]?.label : ''}
                    </div>
                )}

                {renderCard(
                    'via',
                    "VIA 5대 강점",
                    "Strengths",
                    "Sparkles",
                    "text-amber-500",
                    isViaDone,
                    <div className="flex flex-wrap gap-2">
                        {inputs.via.map(v => (
                            <span key={v} className="text-[10px] bg-amber-50 text-amber-800 px-2 py-1 rounded-lg border border-amber-100 font-black uppercase tracking-tighter">
                                {v}
                            </span>
                        ))}
                    </div>
                )}

                {renderCard(
                    'eq',
                    "EQ 감성지능",
                    "Emotional IQ",
                    "Heart",
                    "text-rose-500",
                    isEQDone,
                    <div className="flex items-center gap-3">
                        <div className="flex gap-1.5">
                            {Object.entries(inputs.eq).map(([k, v]) => (
                                <div key={k} className={`w-3 h-3 rounded-full ${v === 'High' ? 'bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.5)]' : v === 'Mid' ? 'bg-rose-200' : 'bg-slate-200'}`}></div>
                            ))}
                        </div>
                        <span className="text-sm font-black text-rose-600 uppercase tracking-widest">{eqCount}/5 Factors</span>
                    </div>
                )}

                {/* Submit Placeholder Card */}
                <div 
                    onClick={() => isReady && onFinish()}
                    className={`
                        group relative !p-8 flex flex-col justify-center items-center transition-all duration-500 border-2 rounded-[2.5rem] cursor-pointer
                        ${isReady 
                            ? 'bg-brand-500 border-brand-500 text-white shadow-2xl shadow-brand-500/20 scale-105' 
                            : 'bg-slate-50 border-dashed border-slate-200 text-slate-300'
                        }
                    `}
                >
                    <Icon name={isReady ? "Cpu" : "Lock"} size={48} className={isReady ? "mb-4 animate-pulse" : "mb-4 opacity-20"} />
                    <h4 className="text-xl font-black mb-2">{isReady ? "분석 리포트 생성" : "분석 대기 중"}</h4>
                    <p className="text-xs font-bold text-center opacity-60">
                        {isReady ? "데이터 준비 완료! 지금 확인하세요." : "모든 정보를 입력하면 분석이 시작됩니다."}
                    </p>
                </div>
            </div>

            {/* Quick Access Section */}
            <div className="pt-20 border-t border-slate-100">
                <div className="text-center mb-12 space-y-4">
                    <span className="px-4 py-1.5 bg-brand-50 text-brand-500 rounded-full text-xs font-black uppercase tracking-widest">Fast Track</span>
                    <h4 className="text-3xl font-black text-brand-900 tracking-tight">유형별 즉시 확인</h4>
                    <p className="text-slate-400 font-bold max-w-lg mx-auto">이미 결과를 알고 계시다면 특정 유형의 리포트를 바로 조회할 수 있습니다.</p>
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-9 gap-4">
                    {archetypes.map(t => (
                        <button 
                            key={t.id}
                            onClick={() => handleManualSelect(t)}
                            className="flex flex-col items-center p-6 rounded-3xl border border-slate-100 bg-white hover:border-brand-300 hover:shadow-2xl hover:-translate-y-2 transition-all group"
                        >
                            <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-300 group-hover:bg-brand-500 group-hover:text-white mb-4 transition-all shadow-sm">
                                <Icon name={t.symbol} size={24}/>
                            </div>
                            <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1 group-hover:text-brand-500 transition-colors">Type {t.id}</span>
                            <span className="text-xs font-black text-brand-900 leading-snug break-keep text-center">{t.title}</span>
                        </button>
                    ))}
                </div>
            </div>

            <AnimatePresence>
                {activeModal && (
                    <DiagnosisModal 
                        type={activeModal} 
                        inputs={inputs} 
                        setInputs={setInputs} 
                        onClose={() => setActiveModal(null)} 
                    />
                )}
            </AnimatePresence>
        </div>
    );
};