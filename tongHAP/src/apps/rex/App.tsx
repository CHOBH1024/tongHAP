import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Dumbbell, TrendingUp, BookOpen, Plus, Trash2, CheckCircle2, Circle, Flame, Target } from 'lucide-react';

const HEX = '#16a34a';
const ha = (a: number) => `${HEX}${Math.round(a * 255).toString(16).padStart(2, '0')}`;

const PROGRAMS = [
  { week: 1, title: '신앙의 기초', desc: '원리강론 1-3장 정독 + 개인 간증문 작성', level: '기초' },
  { week: 2, title: '기도 훈련',   desc: '새벽기도 5일 + 기도일지 작성', level: '기초' },
  { week: 3, title: '전도 실습',   desc: '1:1 대화 5회 + 전도 보고서', level: '중급' },
  { week: 4, title: '리더십',      desc: '소그룹 인도 1회 + 피드백 수렴', level: '중급' },
  { week: 5, title: '심화 교리',   desc: '원리강론 7-12장 + 교리 토론', level: '심화' },
  { week: 6, title: '멘토링',      desc: '신입 멤버 1명 멘토링 시작', level: '심화' },
];

const LEVEL_COLOR: Record<string, string> = { '기초': '#16a34a', '중급': '#ca8a04', '심화': '#dc2626' };

interface LogEntry { id: number; date: string; program: string; note: string; done: boolean; }
interface MedEntry  { id: number; date: string; verse: string; reflection: string; }

const TABS = ['훈련 프로그램', '훈련 일지', '말씀 묵상'];

export function RexApp() {
  const [tab, setTab] = useState(0);
  const [logs, setLogs] = useState<LogEntry[]>([
    { id: 1, date: '2026-04-28', program: '기도 훈련', note: '새벽 5시 기도 완료. 성령 충만함을 경험했다.', done: true },
    { id: 2, date: '2026-04-30', program: '신앙의 기초', note: '원리강론 1장 완독. 창조원리 핵심 정리함.', done: true },
    { id: 3, date: '2026-05-02', program: '전도 실습', note: '동료와 1:1 대화. 다음 주 수련회 안내.', done: false },
  ]);
  const [meds, setMeds] = useState<MedEntry[]>([
    { id: 1, date: '2026-05-01', verse: '요 8:32 — 진리를 알지니 진리가 너희를 자유롭게 하리라', reflection: '참된 자유는 진리 안에 있다. 오늘 하루 진리로 살자.' },
    { id: 2, date: '2026-05-03', verse: '빌 4:13 — 내게 능력 주시는 자 안에서 내가 모든 것을 할 수 있느니라', reflection: '두려움을 내려놓고 하나님 능력을 믿는 하루.' },
  ]);
  const [showLogForm, setShowLogForm] = useState(false);
  const [showMedForm, setShowMedForm] = useState(false);
  const [logForm, setLogForm] = useState({ program: '', note: '' });
  const [medForm, setMedForm] = useState({ verse: '', reflection: '' });

  const doneCount = logs.filter(l => l.done).length;

  const addLog = () => {
    if (!logForm.program.trim()) return;
    setLogs(p => [{ id: Date.now(), date: new Date().toISOString().slice(0, 10), ...logForm, done: false }, ...p]);
    setLogForm({ program: '', note: '' });
    setShowLogForm(false);
  };
  const addMed = () => {
    if (!medForm.verse.trim()) return;
    setMeds(p => [{ id: Date.now(), date: new Date().toISOString().slice(0, 10), ...medForm }, ...p]);
    setMedForm({ verse: '', reflection: '' });
    setShowMedForm(false);
  };

  return (
    <div className="min-h-screen" style={{ background: `linear-gradient(160deg, ${ha(0.08)} 0%, #fff 45%, ${ha(0.04)} 100%)` }}>
      <header className="sticky top-0 z-20 flex items-center gap-3 px-5 py-3.5 bg-white/90 backdrop-blur-sm border-b" style={{ borderColor: ha(0.2) }}>
        <Link to="/" className="flex items-center gap-1.5 text-sm font-bold hover:opacity-60 transition-opacity" style={{ color: HEX }}>
          <ArrowLeft size={16} /> 홈으로
        </Link>
        <div className="h-4 w-px opacity-30" style={{ background: HEX }} />
        <span className="text-sm font-black" style={{ color: HEX }}>🦖 렉스 — 훈련 & 성장</span>
        <div className="ml-auto flex items-center gap-1.5 px-2.5 py-1 rounded-full" style={{ background: ha(0.1) }}>
          <Flame size={12} style={{ color: HEX }} />
          <span className="text-[11px] font-black" style={{ color: HEX }}>{doneCount}회 완료</span>
        </div>
      </header>

      <div className="grid grid-cols-3 gap-3 px-4 pt-4">
        {[
          { label: '완료 훈련', value: doneCount, icon: <CheckCircle2 size={14} />, suffix: '회' },
          { label: '훈련 주차', value: PROGRAMS.length, icon: <Target size={14} />, suffix: '주' },
          { label: '묵상 기록', value: meds.length, icon: <BookOpen size={14} />, suffix: '개' },
        ].map((k, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
            className="bg-white rounded-2xl border p-3 text-center" style={{ borderColor: ha(0.12) }}>
            <div className="flex justify-center mb-1" style={{ color: HEX }}>{k.icon}</div>
            <div className="text-xl font-black" style={{ color: HEX }}>{k.value}<span className="text-xs ml-0.5">{k.suffix}</span></div>
            <div className="text-[10px] text-slate-400 font-bold">{k.label}</div>
          </motion.div>
        ))}
      </div>

      <div className="flex gap-1 px-4 pt-4 pb-2">
        {TABS.map((t, i) => (
          <button key={i} onClick={() => setTab(i)}
            className="flex-1 py-2 text-xs font-black rounded-xl transition-all"
            style={tab === i ? { background: HEX, color: '#fff' } : { background: ha(0.08), color: HEX }}>
            {t}
          </button>
        ))}
      </div>

      <main className="px-4 pb-24 space-y-3">
        <AnimatePresence mode="wait">
          {tab === 0 && (
            <motion.div key="prog" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-3 pt-1">
              {PROGRAMS.map((p, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                  className="bg-white rounded-2xl border p-4" style={{ borderColor: ha(0.12) }}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-black px-2 py-0.5 rounded-full text-white" style={{ background: LEVEL_COLOR[p.level] }}>{p.level}</span>
                    <span className="text-[10px] text-slate-400 font-bold">{p.week}주차</span>
                    <Dumbbell size={13} className="ml-auto" style={{ color: HEX }} />
                  </div>
                  <p className="text-sm font-black text-slate-800">{p.title}</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">{p.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          )}

          {tab === 1 && (
            <motion.div key="log" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-3 pt-1">
              <button onClick={() => setShowLogForm(v => !v)}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-black text-white"
                style={{ background: HEX }}>
                <Plus size={15} /> 훈련 일지 추가
              </button>
              <AnimatePresence>
                {showLogForm && (
                  <motion.div key="lf" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                    className="bg-white rounded-2xl border p-4 space-y-2 overflow-hidden" style={{ borderColor: ha(0.2) }}>
                    <input value={logForm.program} onChange={e => setLogForm(f => ({ ...f, program: e.target.value }))}
                      placeholder="훈련 프로그램명 (예: 기도 훈련)"
                      className="w-full px-3 py-2 rounded-xl border text-sm outline-none" style={{ borderColor: ha(0.2) }} />
                    <textarea value={logForm.note} onChange={e => setLogForm(f => ({ ...f, note: e.target.value }))}
                      placeholder="오늘의 훈련 내용과 느낀 점..."
                      rows={3} className="w-full px-3 py-2 rounded-xl border text-sm outline-none resize-none" style={{ borderColor: ha(0.2) }} />
                    <button onClick={addLog} className="w-full py-2 rounded-xl text-sm font-black text-white" style={{ background: HEX }}>저장</button>
                  </motion.div>
                )}
              </AnimatePresence>
              {logs.map((log, i) => (
                <motion.div key={log.id} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}
                  className="bg-white rounded-2xl border p-4" style={{ borderColor: log.done ? ha(0.25) : ha(0.1) }}>
                  <div className="flex items-start gap-2">
                    <button onClick={() => setLogs(p => p.map(l => l.id === log.id ? { ...l, done: !l.done } : l))} className="mt-0.5 flex-shrink-0">
                      {log.done ? <CheckCircle2 size={18} style={{ color: HEX }} /> : <Circle size={18} className="text-slate-300" />}
                    </button>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm font-black text-slate-800">{log.program}</span>
                        <span className="text-[10px] text-slate-400">{log.date}</span>
                      </div>
                      {log.note && <p className="text-[11px] text-slate-500 mt-0.5">{log.note}</p>}
                    </div>
                    <button onClick={() => setLogs(p => p.filter(l => l.id !== log.id))} className="flex-shrink-0 text-slate-200 hover:text-red-400 transition-colors">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </motion.div>
              ))}
              {logs.length === 0 && (
                <div className="text-center py-10 text-slate-300 font-bold text-sm">
                  <TrendingUp size={28} className="mx-auto mb-2" />첫 훈련 일지를 시작하세요!
                </div>
              )}
            </motion.div>
          )}

          {tab === 2 && (
            <motion.div key="med" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-3 pt-1">
              <button onClick={() => setShowMedForm(v => !v)}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-black text-white"
                style={{ background: HEX }}>
                <Plus size={15} /> 묵상 기록 추가
              </button>
              <AnimatePresence>
                {showMedForm && (
                  <motion.div key="mf" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                    className="bg-white rounded-2xl border p-4 space-y-2 overflow-hidden" style={{ borderColor: ha(0.2) }}>
                    <input value={medForm.verse} onChange={e => setMedForm(f => ({ ...f, verse: e.target.value }))}
                      placeholder="말씀 구절 (예: 요 3:16)"
                      className="w-full px-3 py-2 rounded-xl border text-sm outline-none" style={{ borderColor: ha(0.2) }} />
                    <textarea value={medForm.reflection} onChange={e => setMedForm(f => ({ ...f, reflection: e.target.value }))}
                      placeholder="오늘 말씀에서 받은 은혜..."
                      rows={3} className="w-full px-3 py-2 rounded-xl border text-sm outline-none resize-none" style={{ borderColor: ha(0.2) }} />
                    <button onClick={addMed} className="w-full py-2 rounded-xl text-sm font-black text-white" style={{ background: HEX }}>저장</button>
                  </motion.div>
                )}
              </AnimatePresence>
              {meds.map((m, i) => (
                <motion.div key={m.id} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}
                  className="bg-white rounded-2xl border p-4" style={{ borderColor: ha(0.12) }}>
                  <div className="flex items-start gap-2">
                    <BookOpen size={14} className="flex-shrink-0 mt-0.5" style={{ color: HEX }} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-black text-slate-700 italic">"{m.verse}"</p>
                      <p className="text-[11px] text-slate-500 mt-1">{m.reflection}</p>
                      <p className="text-[10px] text-slate-400 mt-1">{m.date}</p>
                    </div>
                    <button onClick={() => setMeds(p => p.filter(x => x.id !== m.id))} className="flex-shrink-0 text-slate-200 hover:text-red-400 transition-colors">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
