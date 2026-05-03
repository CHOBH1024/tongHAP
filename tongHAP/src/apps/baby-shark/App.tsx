import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, UserPlus, BookMarked, Activity, Plus, Trash2, CheckCircle2, Circle, Phone, Users } from 'lucide-react';

const HEX = '#4f46e5';
const ha = (a: number) => `${HEX}${Math.round(a * 255).toString(16).padStart(2, '0')}`;

const ONBOARDING_STEPS = [
  { step: 1, title: '환영 인사 & 소개', desc: '담당자 소개, 교회 안내 브로셔 전달', duration: '1주차' },
  { step: 2, title: '원리 강의 초청', desc: '원리강론 기초 강의(1강) 참석 안내', duration: '2주차' },
  { step: 3, title: '소그룹 연결', desc: '나이·지역 맞는 소그룹에 연결', duration: '3주차' },
  { step: 4, title: '수련 참가 권유', desc: '가까운 수련원 또는 특별집회 안내', duration: '4주차' },
  { step: 5, title: '멘토 배정', desc: '1:1 신앙 멘토 배정 및 첫 만남', duration: '5주차' },
  { step: 6, title: '정착 확인', desc: '정기 예배 참석 확인 및 봉사 연결', duration: '6주차' },
];

interface NewMember {
  id: number; name: string; contact: string; referrer: string;
  registeredDate: string; currentStep: number;
}

interface YouthEvent { id: number; title: string; date: string; location: string; participants: number; }

const TABS = ['새신자 온보딩', '새신자 등록', '청소년 모임'];

export function BabySharkApp() {
  const [tab, setTab] = useState(0);
  const [members, setMembers] = useState<NewMember[]>([
    { id: 1, name: '김새벽', contact: '010-1234-5678', referrer: '이성민 형제', registeredDate: '2026-04-20', currentStep: 3 },
    { id: 2, name: '박소망', contact: '010-9876-5432', referrer: '박진희 자매', registeredDate: '2026-04-27', currentStep: 1 },
    { id: 3, name: '최하늘', contact: '010-5555-1234', referrer: '자체 방문', registeredDate: '2026-05-01', currentStep: 2 },
  ]);
  const [events, setEvents] = useState<YouthEvent[]>([
    { id: 1, title: '청소년 특별기도회', date: '2026-05-10', location: '본당', participants: 25 },
    { id: 2, title: '청평수련원 캠프', date: '2026-05-24', location: '청평', participants: 40 },
    { id: 3, title: '어린이날 합동 행사', date: '2026-05-05', location: '교회 마당', participants: 60 },
  ]);
  const [showMemberForm, setShowMemberForm] = useState(false);
  const [showEventForm, setShowEventForm] = useState(false);
  const [memberForm, setMemberForm] = useState({ name: '', contact: '', referrer: '' });
  const [eventForm, setEventForm] = useState({ title: '', date: '', location: '' });

  const addMember = () => {
    if (!memberForm.name.trim()) return;
    setMembers(p => [...p, { id: Date.now(), ...memberForm, registeredDate: new Date().toISOString().slice(0, 10), currentStep: 1 }]);
    setMemberForm({ name: '', contact: '', referrer: '' });
    setShowMemberForm(false);
  };

  const addEvent = () => {
    if (!eventForm.title.trim()) return;
    setEvents(p => [...p, { id: Date.now(), ...eventForm, participants: 0 }]);
    setEventForm({ title: '', date: '', location: '' });
    setShowEventForm(false);
  };

  const advanceStep = (id: number) =>
    setMembers(p => p.map(m => m.id === id && m.currentStep < ONBOARDING_STEPS.length ? { ...m, currentStep: m.currentStep + 1 } : m));

  return (
    <div className="min-h-screen" style={{ background: `linear-gradient(160deg, ${ha(0.08)} 0%, #fff 45%, ${ha(0.04)} 100%)` }}>
      <header className="sticky top-0 z-20 flex items-center gap-3 px-5 py-3.5 bg-white/90 backdrop-blur-sm border-b" style={{ borderColor: ha(0.2) }}>
        <Link to="/" className="flex items-center gap-1.5 text-sm font-bold hover:opacity-60 transition-opacity" style={{ color: HEX }}>
          <ArrowLeft size={16} /> 홈으로
        </Link>
        <div className="h-4 w-px opacity-30" style={{ background: HEX }} />
        <span className="text-sm font-black" style={{ color: HEX }}>🦈 아기상어 — 청소년 & 새신자</span>
        <div className="ml-auto flex items-center gap-1.5 px-2.5 py-1 rounded-full" style={{ background: ha(0.1) }}>
          <Users size={12} style={{ color: HEX }} />
          <span className="text-[11px] font-black" style={{ color: HEX }}>{members.length}명 관리 중</span>
        </div>
      </header>

      <div className="grid grid-cols-3 gap-3 px-4 pt-4">
        {[
          { label: '새신자', value: members.length, icon: <UserPlus size={14} />, suffix: '명' },
          { label: '정착 완료', value: members.filter(m => m.currentStep >= ONBOARDING_STEPS.length).length, icon: <CheckCircle2 size={14} />, suffix: '명' },
          { label: '예정 행사', value: events.length, icon: <Activity size={14} />, suffix: '개' },
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
            <motion.div key="steps" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-3 pt-1">
              <p className="text-[11px] text-slate-400 font-bold px-1">6주 새신자 정착 프로세스</p>
              <div className="relative">
                <div className="absolute left-[22px] top-4 bottom-4 w-0.5" style={{ background: ha(0.15) }} />
                {ONBOARDING_STEPS.map((s, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }}
                    className="flex gap-3 mb-3">
                    <div className="flex-shrink-0 w-11 h-11 rounded-full flex items-center justify-center text-white text-sm font-black z-10" style={{ background: HEX }}>
                      {s.step}
                    </div>
                    <div className="bg-white rounded-2xl border p-3 flex-1" style={{ borderColor: ha(0.12) }}>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-black text-slate-800">{s.title}</span>
                        <span className="text-[10px] text-slate-400 ml-auto">{s.duration}</span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">{s.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {tab === 1 && (
            <motion.div key="members" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-3 pt-1">
              <button onClick={() => setShowMemberForm(v => !v)}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-black text-white"
                style={{ background: HEX }}>
                <Plus size={15} /> 새신자 등록
              </button>
              <AnimatePresence>
                {showMemberForm && (
                  <motion.div key="mf" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                    className="bg-white rounded-2xl border p-4 space-y-2 overflow-hidden" style={{ borderColor: ha(0.2) }}>
                    <input value={memberForm.name} onChange={e => setMemberForm(f => ({ ...f, name: e.target.value }))}
                      placeholder="이름" className="w-full px-3 py-2 rounded-xl border text-sm outline-none" style={{ borderColor: ha(0.2) }} />
                    <input value={memberForm.contact} onChange={e => setMemberForm(f => ({ ...f, contact: e.target.value }))}
                      placeholder="연락처 (010-XXXX-XXXX)" className="w-full px-3 py-2 rounded-xl border text-sm outline-none" style={{ borderColor: ha(0.2) }} />
                    <input value={memberForm.referrer} onChange={e => setMemberForm(f => ({ ...f, referrer: e.target.value }))}
                      placeholder="소개자 (예: 이성민 형제)" className="w-full px-3 py-2 rounded-xl border text-sm outline-none" style={{ borderColor: ha(0.2) }} />
                    <button onClick={addMember} className="w-full py-2 rounded-xl text-sm font-black text-white" style={{ background: HEX }}>등록</button>
                  </motion.div>
                )}
              </AnimatePresence>

              {members.map((m, i) => {
                const pct = Math.round((m.currentStep / ONBOARDING_STEPS.length) * 100);
                const done = m.currentStep >= ONBOARDING_STEPS.length;
                return (
                  <motion.div key={m.id} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                    className="bg-white rounded-2xl border p-4" style={{ borderColor: done ? ha(0.3) : ha(0.1) }}>
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <span className="text-sm font-black text-slate-800">{m.name}</span>
                        {done && <span className="ml-2 text-[10px] font-black px-1.5 py-0.5 rounded-full text-white" style={{ background: HEX }}>정착 완료</span>}
                      </div>
                      <button onClick={() => setMembers(p => p.filter(x => x.id !== m.id))} className="text-slate-200 hover:text-red-400 transition-colors">
                        <Trash2 size={14} />
                      </button>
                    </div>
                    <div className="flex items-center gap-2 text-[10px] text-slate-400 mb-2">
                      <Phone size={10} />{m.contact}
                      <span className="ml-2">소개: {m.referrer}</span>
                    </div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <BookMarked size={11} style={{ color: HEX }} />
                      <span className="text-[10px] font-black text-slate-600">{ONBOARDING_STEPS[Math.min(m.currentStep - 1, ONBOARDING_STEPS.length - 1)].title}</span>
                      <span className="text-[10px] text-slate-400 ml-auto">{pct}%</span>
                    </div>
                    <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden mb-2">
                      <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 0.6 }}
                        className="h-full rounded-full" style={{ background: HEX }} />
                    </div>
                    {!done && (
                      <button onClick={() => advanceStep(m.id)}
                        className="flex items-center gap-1 text-[11px] font-black px-3 py-1 rounded-full text-white"
                        style={{ background: HEX }}>
                        <Circle size={10} /> 다음 단계로
                      </button>
                    )}
                    {done && <div className="flex items-center gap-1 text-[11px] font-black" style={{ color: HEX }}><CheckCircle2 size={12} /> 온보딩 완료!</div>}
                  </motion.div>
                );
              })}
            </motion.div>
          )}

          {tab === 2 && (
            <motion.div key="events" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-3 pt-1">
              <button onClick={() => setShowEventForm(v => !v)}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-black text-white"
                style={{ background: HEX }}>
                <Plus size={15} /> 행사 추가
              </button>
              <AnimatePresence>
                {showEventForm && (
                  <motion.div key="ef" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                    className="bg-white rounded-2xl border p-4 space-y-2 overflow-hidden" style={{ borderColor: ha(0.2) }}>
                    <input value={eventForm.title} onChange={e => setEventForm(f => ({ ...f, title: e.target.value }))}
                      placeholder="행사명" className="w-full px-3 py-2 rounded-xl border text-sm outline-none" style={{ borderColor: ha(0.2) }} />
                    <input type="date" value={eventForm.date} onChange={e => setEventForm(f => ({ ...f, date: e.target.value }))}
                      className="w-full px-3 py-2 rounded-xl border text-sm outline-none" style={{ borderColor: ha(0.2) }} />
                    <input value={eventForm.location} onChange={e => setEventForm(f => ({ ...f, location: e.target.value }))}
                      placeholder="장소" className="w-full px-3 py-2 rounded-xl border text-sm outline-none" style={{ borderColor: ha(0.2) }} />
                    <button onClick={addEvent} className="w-full py-2 rounded-xl text-sm font-black text-white" style={{ background: HEX }}>저장</button>
                  </motion.div>
                )}
              </AnimatePresence>
              {events.sort((a, b) => a.date.localeCompare(b.date)).map((ev, i) => (
                <motion.div key={ev.id} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                  className="bg-white rounded-2xl border p-4" style={{ borderColor: ha(0.12) }}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-black text-slate-800">{ev.title}</p>
                      <p className="text-[11px] text-slate-500 mt-0.5">{ev.date} · {ev.location}</p>
                      <div className="flex items-center gap-1 mt-1 text-[10px]" style={{ color: HEX }}>
                        <Users size={10} /><span className="font-black">{ev.participants}명 예정</span>
                      </div>
                    </div>
                    <button onClick={() => setEvents(p => p.filter(x => x.id !== ev.id))} className="text-slate-200 hover:text-red-400 transition-colors">
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
