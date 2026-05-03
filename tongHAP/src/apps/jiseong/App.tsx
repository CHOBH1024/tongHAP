import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ChevronRight, Lightbulb, BookMarked, Trophy, RotateCcw, Circle, CheckCircle2 } from 'lucide-react';

const PRINCIPLES = [
  {
    id: 'creation', title: '창조원리', emoji: '🌿',
    summary: '하나님의 창조 목적과 피조세계의 본연의 모습을 밝힌다.',
    keyPoints: [
      '이중목적 — 전체 목적과 개체 목적의 조화',
      '삼대축복 — 개인완성, 가정완성, 주관완성',
      '이성성상 — 모든 존재는 양성과 음성의 통일체',
      '수수작용 — 주체와 대상의 수수작용으로 에너지 발생',
    ], level: 1,
  },
  {
    id: 'fall', title: '타락론', emoji: '🍎',
    summary: '인간 시조의 타락 경위와 그 결과로 나타난 악의 기원을 밝힌다.',
    keyPoints: [
      '영적 타락 — 천사장과 해와의 불륜 관계',
      '육적 타락 — 아담과 해와의 무절제한 합궤',
      '원죄 — 타락으로 인해 내려온 근본적 죄성',
      '사탄 — 타락한 천사장이 가정·사회·국가를 지배',
    ], level: 1,
  },
  {
    id: 'providence', title: '복귀원리', emoji: '🕊️',
    summary: '인류 역사는 하나님이 타락한 인간을 복귀시키는 섭리의 역사다.',
    keyPoints: [
      '복귀의 법칙 — 탕감조건을 세워 복귀해 나가는 원리',
      '메시아 강림 준비 — 400년 민주주의 발전',
      '실체기대 — 아담형 인물과 해와형 인물의 조건',
      '가나안 복귀 노정 — 모형노정·상징노정·실체노정',
    ], level: 2,
  },
  {
    id: 'messiah', title: '메시아론', emoji: '✝️',
    summary: '예수님은 인류를 구원하기 위해 오신 참부모이시며 메시아이시다.',
    keyPoints: [
      '예수님의 사명 — 영육 아울러 구원 (영적 구원만 성취)',
      '삼위일체 — 하나님, 예수, 성신의 관계',
      '재림주 강림 목적 — 예수님이 완성 못 한 사명 완수',
      '참부모님 — 원죄 없는 인류의 참부모로 오심',
    ], level: 2,
  },
  {
    id: 'second-coming', title: '재림론', emoji: '🌅',
    summary: '예수님은 육신을 지닌 인간으로 지상에 재림하신다.',
    keyPoints: [
      '재림의 때 — 1차 세계대전 이후 섭리적 시점',
      '재림의 방식 — 구름 재림(상징), 실제는 육신 탄생',
      '재림의 땅 — 동방의 나라 한국',
      '문선명 총재 — 재림주로서의 사명 수행',
    ], level: 3,
  },
  {
    id: 'eschatology', title: '종말론', emoji: '🌍',
    summary: '지상천국 건설이란 모든 인류가 참사랑으로 하나 되는 것이다.',
    keyPoints: [
      '천국의 3단계 — 개인·가정·종족·민족·세계 천국',
      '지상천국 — 하나님의 나라가 이 땅에 이루어짐',
      '천상천국 — 지상에서 완성한 사람이 가는 세계',
      '심판 — 말씀으로 심판받는 생명부의 원리',
    ], level: 3,
  },
];

const QUIZ = [
  { q: '하나님의 창조 목적을 이루기 위한 삼대축복이 아닌 것은?', options: ['개인 완성', '가정 완성', '주관 완성', '국가 완성'], answer: 3 },
  { q: '인간 시조의 영적 타락은 누구와의 관계에서 비롯되었는가?', options: ['하나님', '아담', '천사장', '루시퍼'], answer: 2 },
  { q: '탕감조건을 세워 원래의 위치로 돌아가는 원리는?', options: ['창조원리', '복귀원리', '타락론', '종말론'], answer: 1 },
  { q: '재림주는 어떤 방식으로 이 땅에 오시는가?', options: ['구름을 타고', '육신으로 탄생', '천사로', '영으로만'], answer: 1 },
];

const VERSE = {
  text: '진리를 알지니 진리가 너희를 자유롭게 하리라.',
  ref: '요한복음 8:32',
  note: '원리강론은 인간 존재 목적과 역사의 섭리를 밝혀 우리를 죄악으로부터 해방시키는 진리입니다.',
};

const ROADMAP = [
  { level: 1, name: '기초', topics: ['창조원리', '타락론'], color: '#22c55e' },
  { level: 2, name: '중급', topics: ['복귀원리', '메시아론'], color: '#3b82f6' },
  { level: 3, name: '심화', topics: ['재림론', '종말론'],    color: '#8b5cf6' },
];

const HEX = '#2563eb';
const ha = (a: number) => `${HEX}${Math.round(a * 255).toString(16).padStart(2, '0')}`;
const tabs = ['오늘의 말씀', '학습 로드맵', '교리 탐구', '퀴즈'] as const;
type Tab = typeof tabs[number];

export function JiseongApp() {
  const [tab, setTab] = useState<Tab>('오늘의 말씀');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [completed, setCompleted] = useState<Set<string>>(new Set());
  const [qIdx, setQIdx] = useState(0);
  const [qSel, setQSel] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const topic = selectedId ? PRINCIPLES.find(p => p.id === selectedId) : null;

  const handleQuiz = (i: number) => {
    if (qSel !== null) return;
    setQSel(i);
    if (QUIZ[qIdx].answer === i) setScore(s => s + 1);
    setTimeout(() => {
      if (qIdx + 1 < QUIZ.length) { setQIdx(x => x + 1); setQSel(null); }
      else setDone(true);
    }, 900);
  };

  return (
    <div className="min-h-screen" style={{ background: `linear-gradient(160deg, ${ha(0.08)} 0%, #fff 45%, ${ha(0.04)} 100%)` }}>
      <header className="sticky top-0 z-20 flex items-center gap-3 px-5 py-3.5 bg-white/90 backdrop-blur-sm border-b" style={{ borderColor: ha(0.2) }}>
        <Link to="/" className="flex items-center gap-1.5 text-sm font-bold hover:opacity-60 transition-opacity" style={{ color: HEX }}>
          <ArrowLeft size={16} /> 홈으로
        </Link>
        <div className="h-4 w-px opacity-30" style={{ background: HEX }} />
        <span className="text-sm font-black" style={{ color: HEX }}>📚 지성 — 교리 학습</span>
        <span className="ml-auto px-2.5 py-1 text-[10px] font-black rounded-full" style={{ background: ha(0.12), color: HEX }}>
          {completed.size}/{PRINCIPLES.length} 완료
        </span>
      </header>

      <div className="flex gap-1 px-4 pt-4 overflow-x-auto">
        {tabs.map(t => (
          <button key={t} onClick={() => { setTab(t); setSelectedId(null); }}
            className="flex-shrink-0 px-4 py-2 rounded-xl text-xs font-black transition-all"
            style={tab === t ? { background: HEX, color: '#fff' } : { background: ha(0.08), color: HEX }}>
            {t}
          </button>
        ))}
      </div>

      <main className="max-w-2xl mx-auto px-4 py-6 pb-24">
        <AnimatePresence mode="wait">
          <motion.div key={tab + (selectedId ?? '')}
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>

            {tab === '오늘의 말씀' && (
              <div className="space-y-4 mt-4">
                <div className="bg-white rounded-3xl border p-6 text-center" style={{ borderColor: ha(0.15) }}>
                  <BookMarked size={28} className="mx-auto mb-4" style={{ color: HEX }} />
                  <p className="text-2xl font-black text-slate-900 leading-relaxed">"{VERSE.text}"</p>
                  <p className="text-sm font-bold mt-3" style={{ color: HEX }}>{VERSE.ref}</p>
                </div>
                <div className="rounded-2xl border p-4" style={{ background: ha(0.05), borderColor: ha(0.12) }}>
                  <div className="flex items-start gap-2">
                    <Lightbulb size={14} className="flex-shrink-0 mt-0.5" style={{ color: HEX }} />
                    <p className="text-xs text-slate-600 font-medium leading-relaxed">{VERSE.note}</p>
                  </div>
                </div>
                <div className="bg-white rounded-2xl border p-4" style={{ borderColor: ha(0.12) }}>
                  <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">오늘 학습 제안</p>
                  {PRINCIPLES.slice(0, 3).map(p => (
                    <button key={p.id} onClick={() => { setTab('교리 탐구'); setSelectedId(p.id); }}
                      className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left hover:opacity-80 mb-2 transition-opacity"
                      style={{ background: ha(0.06) }}>
                      <span className="text-sm font-bold text-slate-700">{p.emoji} {p.title}</span>
                      <ChevronRight size={14} style={{ color: HEX }} />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {tab === '학습 로드맵' && (
              <div className="space-y-4 mt-4">
                {ROADMAP.map(lvl => (
                  <div key={lvl.level} className="bg-white rounded-2xl border p-4" style={{ borderColor: ha(0.12) }}>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-black" style={{ background: lvl.color }}>{lvl.level}</div>
                      <span className="font-black text-slate-800">{lvl.name} 과정</span>
                    </div>
                    {lvl.topics.map(t => {
                      const p = PRINCIPLES.find(x => x.title === t)!;
                      const isDone = completed.has(p.id);
                      return (
                        <button key={t} onClick={() => { setTab('교리 탐구'); setSelectedId(p.id); }}
                          className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left hover:opacity-80 mb-2 transition-opacity"
                          style={{ background: `${lvl.color}12` }}>
                          <div className="flex items-center gap-2">
                            {isDone ? <CheckCircle2 size={15} className="text-emerald-500" /> : <Circle size={15} style={{ color: lvl.color }} />}
                            <span className="text-sm font-bold text-slate-700">{p.emoji} {p.title}</span>
                          </div>
                          <ChevronRight size={13} className="text-slate-300" />
                        </button>
                      );
                    })}
                  </div>
                ))}
              </div>
            )}

            {tab === '교리 탐구' && !topic && (
              <div className="space-y-3 mt-4">
                {PRINCIPLES.map((p, i) => (
                  <motion.button key={p.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                    onClick={() => setSelectedId(p.id)}
                    className="w-full bg-white rounded-2xl border p-4 text-left hover:shadow-md hover:-translate-y-0.5 transition-all"
                    style={{ borderColor: ha(0.12) }}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{p.emoji}</span>
                        <div>
                          <div className="font-black text-slate-900 text-sm">{p.title}</div>
                          <div className="text-[11px] text-slate-400 mt-0.5">{p.summary.slice(0, 35)}…</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {completed.has(p.id) && <CheckCircle2 size={15} className="text-emerald-500" />}
                        <ChevronRight size={15} style={{ color: HEX }} />
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            )}

            {tab === '교리 탐구' && topic && (
              <div className="space-y-4 mt-4">
                <button onClick={() => setSelectedId(null)} className="flex items-center gap-1 text-xs font-bold hover:opacity-60 transition-opacity" style={{ color: HEX }}>
                  <ArrowLeft size={13} /> 목록으로
                </button>
                <div className="bg-white rounded-3xl border p-6" style={{ borderColor: ha(0.15) }}>
                  <div className="text-5xl mb-3">{topic.emoji}</div>
                  <h2 className="text-2xl font-black text-slate-900 mb-1">{topic.title}</h2>
                  <p className="text-sm text-slate-500 font-medium mb-5 leading-relaxed">{topic.summary}</p>
                  <div className="space-y-2">
                    {topic.keyPoints.map((pt, i) => (
                      <motion.div key={i} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}
                        className="flex items-start gap-3 px-3 py-2.5 rounded-xl" style={{ background: ha(0.07) }}>
                        <div className="w-5 h-5 rounded-full flex items-center justify-center text-white text-[10px] font-black flex-shrink-0 mt-0.5" style={{ background: HEX }}>{i + 1}</div>
                        <p className="text-xs text-slate-600 font-medium leading-relaxed">{pt}</p>
                      </motion.div>
                    ))}
                  </div>
                  <button onClick={() => { setCompleted(prev => new Set([...prev, topic.id])); setSelectedId(null); }}
                    className="mt-5 w-full py-3 rounded-2xl text-sm font-black text-white disabled:opacity-50"
                    style={{ background: HEX }}
                    disabled={completed.has(topic.id)}>
                    {completed.has(topic.id) ? '✓ 학습 완료' : '학습 완료 체크'}
                  </button>
                </div>
              </div>
            )}

            {tab === '퀴즈' && !done && (
              <div className="space-y-4 mt-4">
                <div className="flex justify-between px-1">
                  <span className="text-xs font-black text-slate-400">{qIdx + 1} / {QUIZ.length}</span>
                  <span className="text-xs font-black px-2.5 py-1 rounded-full" style={{ background: ha(0.1), color: HEX }}>점수 {score}</span>
                </div>
                <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all" style={{ width: `${(qIdx / QUIZ.length) * 100}%`, background: HEX }} />
                </div>
                <div className="bg-white rounded-2xl border p-5" style={{ borderColor: ha(0.12) }}>
                  <p className="font-black text-slate-900 text-sm leading-relaxed">{QUIZ[qIdx].q}</p>
                </div>
                <div className="space-y-2">
                  {QUIZ[qIdx].options.map((opt, i) => {
                    const correct = i === QUIZ[qIdx].answer;
                    const selected = i === qSel;
                    return (
                      <motion.button key={i} whileTap={{ scale: 0.97 }}
                        onClick={() => handleQuiz(i)}
                        disabled={qSel !== null}
                        className="w-full rounded-xl border px-4 py-3 text-left text-sm font-bold text-slate-700 hover:opacity-90 transition-all"
                        style={{
                          background: qSel !== null ? (correct ? '#f0fdf4' : selected ? '#fef2f2' : '#fff') : '#fff',
                          borderColor: qSel !== null ? (correct ? '#22c55e' : selected ? '#ef4444' : ha(0.12)) : ha(0.12),
                        }}>
                        <span className="font-black mr-2" style={{ color: HEX }}>{String.fromCharCode(65 + i)}.</span>{opt}
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            )}

            {tab === '퀴즈' && done && (
              <div className="mt-12 text-center space-y-5">
                <Trophy size={52} className="mx-auto" style={{ color: HEX }} />
                <div>
                  <p className="text-4xl font-black text-slate-900">{score} / {QUIZ.length}</p>
                  <p className="text-slate-500 font-bold mt-1">
                    {score === QUIZ.length ? '만점! 탁월합니다 🎉' : score >= 3 ? '훌륭합니다!' : '다시 도전해 보세요!'}
                  </p>
                </div>
                <button onClick={() => { setQIdx(0); setQSel(null); setScore(0); setDone(false); }}
                  className="flex items-center gap-2 mx-auto px-6 py-3 rounded-2xl text-sm font-black text-white"
                  style={{ background: HEX }}>
                  <RotateCcw size={14} /> 다시 풀기
                </button>
              </div>
            )}

          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
