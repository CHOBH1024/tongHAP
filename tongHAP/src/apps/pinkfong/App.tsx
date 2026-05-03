import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Music, Paintbrush, Baby, Plus, Trash2, Star, CheckCircle2, Circle, Heart } from 'lucide-react';

const HEX = '#db2777';
const ha = (a: number) => `${HEX}${Math.round(a * 255).toString(16).padStart(2, '0')}`;

const LESSON_PLANS = [
  { age: '유아부 (4-7세)',   title: '하나님의 사랑 노래', type: '찬양', desc: '율동과 함께 배우는 하나님 사랑 찬양 3곡', date: '2026-05-04' },
  { age: '유치부 (5-7세)',   title: '노아 방주 이야기',   type: '성경', desc: '플래시카드와 역할극으로 배우는 노아 이야기', date: '2026-05-04' },
  { age: '초등부 (8-13세)', title: '창조원리 기초',       type: '교리', desc: '삼색볼펜 필기로 창조의 목적 이해하기', date: '2026-05-11' },
  { age: '초등부 (8-13세)', title: '나의 간증 쓰기',     type: '훈련', desc: '짧은 개인 신앙 간증문 작성 워크샵', date: '2026-05-18' },
];

const TYPE_COLOR: Record<string, string> = { '찬양': '#db2777', '성경': '#7c3aed', '교리': '#2563eb', '훈련': '#16a34a' };

interface AttendChild { id: number; name: string; age: string; present: boolean; }

const TABS = ['교육 자료', '출석 체크', '부모 공지'];

const NOTICES = [
  { date: '2026-05-04', title: '이번 주 주일학교 공지', body: '오는 주일 찬양 발표회가 있습니다. 아이들이 하얀 옷을 입고 오도록 안내 부탁드립니다.' },
  { date: '2026-04-27', title: '어린이날 행사 안내', body: '5월 5일 어린이날 교회 행사: 오후 2시 본당. 간식 및 선물 준비 예정.' },
];

export function PinkfongApp() {
  const [tab, setTab] = useState(0);
  const [children, setChildren] = useState<AttendChild[]>([
    { id: 1, name: '김하늘',   age: '유아부', present: true },
    { id: 2, name: '이사랑',   age: '유치부', present: true },
    { id: 3, name: '박기쁨',   age: '초등부', present: false },
    { id: 4, name: '최은혜',   age: '초등부', present: true },
    { id: 5, name: '정소망',   age: '유치부', present: false },
  ]);
  const [showAddChild, setShowAddChild] = useState(false);
  const [childForm, setChildForm] = useState({ name: '', age: '유아부' });

  const presentCount = children.filter(c => c.present).length;
  const attendRate = children.length ? Math.round((presentCount / children.length) * 100) : 0;

  const addChild = () => {
    if (!childForm.name.trim()) return;
    setChildren(p => [...p, { id: Date.now(), ...childForm, present: false }]);
    setChildForm({ name: '', age: '유아부' });
    setShowAddChild(false);
  };

  return (
    <div className="min-h-screen" style={{ background: `linear-gradient(160deg, ${ha(0.08)} 0%, #fff 45%, ${ha(0.04)} 100%)` }}>
      <header className="sticky top-0 z-20 flex items-center gap-3 px-5 py-3.5 bg-white/90 backdrop-blur-sm border-b" style={{ borderColor: ha(0.2) }}>
        <Link to="/" className="flex items-center gap-1.5 text-sm font-bold hover:opacity-60 transition-opacity" style={{ color: HEX }}>
          <ArrowLeft size={16} /> 홈으로
        </Link>
        <div className="h-4 w-px opacity-30" style={{ background: HEX }} />
        <span className="text-sm font-black" style={{ color: HEX }}>🦊 핑크퐁 — 어린이 & 교육</span>
        <div className="ml-auto flex items-center gap-1.5 px-2.5 py-1 rounded-full" style={{ background: ha(0.1) }}>
          <Heart size={12} style={{ color: HEX }} />
          <span className="text-[11px] font-black" style={{ color: HEX }}>출석 {attendRate}%</span>
        </div>
      </header>

      <div className="grid grid-cols-3 gap-3 px-4 pt-4">
        {[
          { label: '교육 자료', value: LESSON_PLANS.length, icon: <Paintbrush size={14} />, suffix: '개' },
          { label: '등록 어린이', value: children.length, icon: <Baby size={14} />, suffix: '명' },
          { label: '오늘 출석', value: presentCount, icon: <Star size={14} />, suffix: '명' },
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
            <motion.div key="lessons" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-3 pt-1">
              <p className="text-[11px] text-slate-400 font-bold px-1">이번 달 주일학교 교육 자료</p>
              {LESSON_PLANS.map((lp, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }}
                  className="bg-white rounded-2xl border p-4" style={{ borderColor: ha(0.12) }}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-black px-2 py-0.5 rounded-full text-white" style={{ background: TYPE_COLOR[lp.type] ?? HEX }}>{lp.type}</span>
                    <span className="text-[10px] text-slate-400 font-bold">{lp.age}</span>
                    <Music size={12} className="ml-auto" style={{ color: HEX }} />
                  </div>
                  <p className="text-sm font-black text-slate-800">{lp.title}</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">{lp.desc}</p>
                  <p className="text-[10px] text-slate-400 mt-1">{lp.date}</p>
                </motion.div>
              ))}
            </motion.div>
          )}

          {tab === 1 && (
            <motion.div key="attend" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-3 pt-1">
              <div className="bg-white rounded-2xl border p-3" style={{ borderColor: ha(0.12) }}>
                <div className="flex justify-between text-[11px] font-black mb-1.5">
                  <span className="text-slate-600">출석률</span>
                  <span style={{ color: HEX }}>{attendRate}%</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${attendRate}%` }} transition={{ duration: 0.7 }}
                    className="h-full rounded-full" style={{ background: HEX }} />
                </div>
              </div>

              <button onClick={() => setShowAddChild(v => !v)}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-black text-white"
                style={{ background: HEX }}>
                <Plus size={15} /> 어린이 등록
              </button>

              <AnimatePresence>
                {showAddChild && (
                  <motion.div key="cf" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                    className="bg-white rounded-2xl border p-4 space-y-2 overflow-hidden" style={{ borderColor: ha(0.2) }}>
                    <input value={childForm.name} onChange={e => setChildForm(f => ({ ...f, name: e.target.value }))}
                      placeholder="어린이 이름"
                      className="w-full px-3 py-2 rounded-xl border text-sm outline-none" style={{ borderColor: ha(0.2) }} />
                    <select value={childForm.age} onChange={e => setChildForm(f => ({ ...f, age: e.target.value }))}
                      className="w-full px-3 py-2 rounded-xl border text-sm outline-none bg-white" style={{ borderColor: ha(0.2) }}>
                      {['유아부', '유치부', '초등부'].map(a => <option key={a}>{a}</option>)}
                    </select>
                    <button onClick={addChild} className="w-full py-2 rounded-xl text-sm font-black text-white" style={{ background: HEX }}>등록</button>
                  </motion.div>
                )}
              </AnimatePresence>

              {children.map((c, i) => (
                <motion.div key={c.id} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}
                  className="bg-white rounded-2xl border p-3 flex items-center gap-3" style={{ borderColor: c.present ? ha(0.25) : ha(0.1) }}>
                  <button onClick={() => setChildren(p => p.map(x => x.id === c.id ? { ...x, present: !x.present } : x))} className="flex-shrink-0">
                    {c.present ? <CheckCircle2 size={20} style={{ color: HEX }} /> : <Circle size={20} className="text-slate-300" />}
                  </button>
                  <div className="flex-1">
                    <span className="text-sm font-black text-slate-800">{c.name}</span>
                    <span className="text-[10px] text-slate-400 ml-2">{c.age}</span>
                  </div>
                  <button onClick={() => setChildren(p => p.filter(x => x.id !== c.id))} className="text-slate-200 hover:text-red-400 transition-colors">
                    <Trash2 size={14} />
                  </button>
                </motion.div>
              ))}
            </motion.div>
          )}

          {tab === 2 && (
            <motion.div key="notices" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-3 pt-1">
              <p className="text-[11px] text-slate-400 font-bold px-1">학부모 공지 및 알림</p>
              {NOTICES.map((n, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }}
                  className="bg-white rounded-2xl border p-4" style={{ borderColor: ha(0.12) }}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-black px-2 py-0.5 rounded-full text-white" style={{ background: HEX }}>공지</span>
                    <span className="text-[10px] text-slate-400">{n.date}</span>
                  </div>
                  <p className="text-sm font-black text-slate-800">{n.title}</p>
                  <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">{n.body}</p>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
