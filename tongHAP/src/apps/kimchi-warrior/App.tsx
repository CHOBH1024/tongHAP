import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import { ArrowLeft, Plus, Trash2, TrendingUp, MapPin, Users, Target } from 'lucide-react';

const DIOCESES = ['서울','인천','경기북','경기남','강원','충북','충남','전북','전남','경북','경남','제주','대구','부산'];

interface MissionLog { id: number; date: string; name: string; diocese: string; type: string; note: string; }

const TYPES = ['첫 만남', '심화 상담', '교육 초대', '예배 참석', '축복 준비'];

const WEEKLY_GOAL = 10;

const HEX = '#dc2626';
const ha = (a: number) => `${HEX}${Math.round(a * 255).toString(16).padStart(2, '0')}`;

export function KimchiWarriorApp() {
  const [logs, setLogs] = useState<MissionLog[]>([
    { id: 1, date: '2026-05-01', name: '김○○', diocese: '서울', type: '첫 만남', note: '교회 근처에서 만남, 다음 주 재연결 약속' },
    { id: 2, date: '2026-05-02', name: '이○○', diocese: '인천', type: '심화 상담', note: '원리 설명 완료, 예배 초청' },
    { id: 3, date: '2026-05-03', name: '박○○', diocese: '경기북', type: '교육 초대', note: '원리강론 소개 영상 공유' },
  ]);
  const [form, setForm] = useState({ name: '', diocese: '서울', type: '첫 만남', note: '' });
  const [showForm, setShowForm] = useState(false);

  const addLog = () => {
    if (!form.name) return;
    setLogs(prev => [...prev, { ...form, id: Date.now(), date: new Date().toISOString().slice(0, 10) }]);
    setForm({ name: '', diocese: '서울', type: '첫 만남', note: '' });
    setShowForm(false);
  };

  const thisWeek = logs.filter(l => {
    const d = new Date(l.date);
    const now = new Date();
    const diff = (now.getTime() - d.getTime()) / 86400000;
    return diff <= 7;
  }).length;

  const byType = TYPES.map(t => ({ type: t, count: logs.filter(l => l.type === t).length }));

  return (
    <div className="min-h-screen" style={{ background: `linear-gradient(160deg, ${ha(0.07)} 0%, #fff 45%, ${ha(0.04)} 100%)` }}>
      <header className="sticky top-0 z-20 flex items-center gap-3 px-5 py-3.5 bg-white/90 backdrop-blur-sm border-b" style={{ borderColor: ha(0.2) }}>
        <Link to="/" className="flex items-center gap-1.5 text-sm font-bold hover:opacity-60 transition-opacity" style={{ color: HEX }}>
          <ArrowLeft size={16} /> 홈으로
        </Link>
        <div className="h-4 w-px opacity-30" style={{ background: HEX }} />
        <span className="text-sm font-black" style={{ color: HEX }}>🥋 김치워리어 — 전도 기록</span>
        <span className="ml-auto px-2.5 py-1 text-[10px] font-black rounded-full" style={{ background: ha(0.12), color: HEX }}>LIVE</span>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-5 pb-24 space-y-4">
        {/* Weekly progress */}
        <div className="bg-white rounded-2xl border p-4" style={{ borderColor: ha(0.2) }}>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Target size={14} style={{ color: HEX }} />
              <span className="text-xs font-black text-slate-500">이번 주 전도 목표</span>
            </div>
            <span className="font-black text-sm" style={{ color: HEX }}>{thisWeek} / {WEEKLY_GOAL}명</span>
          </div>
          <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
            <motion.div initial={{ width: 0 }} animate={{ width: `${Math.min((thisWeek / WEEKLY_GOAL) * 100, 100)}%` }}
              transition={{ duration: 0.8 }} className="h-full rounded-full" style={{ background: HEX }} />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: '총 기록', value: logs.length + '명', icon: <Users size={16} /> },
            { label: '이번 주', value: thisWeek + '명',   icon: <TrendingUp size={16} /> },
            { label: '교구 수', value: new Set(logs.map(l => l.diocese)).size + '개', icon: <MapPin size={16} /> },
          ].map((s, i) => (
            <div key={i} className="bg-white rounded-2xl border p-3 text-center" style={{ borderColor: ha(0.15) }}>
              <div className="flex justify-center mb-1.5" style={{ color: HEX }}>{s.icon}</div>
              <div className="text-lg font-black text-slate-900">{s.value}</div>
              <div className="text-[10px] text-slate-400 font-bold">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Type breakdown */}
        <div className="bg-white rounded-2xl border p-4" style={{ borderColor: ha(0.12) }}>
          <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">유형별 현황</p>
          <div className="space-y-2">
            {byType.map((bt, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="text-xs font-bold text-slate-600 w-20 flex-shrink-0">{bt.type}</span>
                <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: logs.length ? `${(bt.count / logs.length) * 100}%` : '0%' }}
                    transition={{ delay: i * 0.08, duration: 0.5 }} className="h-full rounded-full" style={{ background: HEX }} />
                </div>
                <span className="text-xs font-black text-slate-500 w-4">{bt.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Add button */}
        <button onClick={() => setShowForm(!showForm)}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl text-sm font-black text-white transition-opacity hover:opacity-90"
          style={{ background: HEX }}>
          <Plus size={15} /> 전도 기록 추가
        </button>

        {showForm && (
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl border p-4 space-y-3" style={{ borderColor: ha(0.2) }}>
            <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
              placeholder="대상자 이름 (익명 가능)" className="w-full px-3 py-2 rounded-xl border text-sm font-medium outline-none"
              style={{ borderColor: ha(0.2), background: ha(0.04) }} />
            <div className="grid grid-cols-2 gap-2">
              <select value={form.diocese} onChange={e => setForm(f => ({ ...f, diocese: e.target.value }))}
                className="px-3 py-2 rounded-xl border text-sm font-medium outline-none"
                style={{ borderColor: ha(0.2), background: ha(0.04) }}>
                {DIOCESES.map(d => <option key={d}>{d}</option>)}
              </select>
              <select value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))}
                className="px-3 py-2 rounded-xl border text-sm font-medium outline-none"
                style={{ borderColor: ha(0.2), background: ha(0.04) }}>
                {TYPES.map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
            <input value={form.note} onChange={e => setForm(f => ({ ...f, note: e.target.value }))}
              placeholder="간단한 메모" className="w-full px-3 py-2 rounded-xl border text-sm font-medium outline-none"
              style={{ borderColor: ha(0.2), background: ha(0.04) }} />
            <div className="flex gap-2">
              <button onClick={addLog} className="flex-1 py-2.5 rounded-xl text-sm font-black text-white" style={{ background: HEX }}>저장</button>
              <button onClick={() => setShowForm(false)} className="px-4 py-2.5 rounded-xl text-sm font-black bg-slate-100 text-slate-500">취소</button>
            </div>
          </motion.div>
        )}

        {/* Log list */}
        <div className="space-y-2">
          {[...logs].reverse().map((log, i) => (
            <motion.div key={log.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
              className="bg-white rounded-2xl border p-4 flex items-start justify-between" style={{ borderColor: ha(0.1) }}>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-black text-slate-900 text-sm">{log.name}</span>
                  <span className="px-2 py-0.5 text-[9px] font-black rounded-full" style={{ background: ha(0.12), color: HEX }}>{log.type}</span>
                  <span className="text-[10px] text-slate-400">{log.diocese}</span>
                </div>
                {log.note && <p className="text-xs text-slate-500 leading-relaxed">{log.note}</p>}
                <p className="text-[10px] text-slate-300 mt-1">{log.date}</p>
              </div>
              <button onClick={() => setLogs(prev => prev.filter(l => l.id !== log.id))} className="text-slate-200 hover:text-red-400 transition-colors ml-2">
                <Trash2 size={13} />
              </button>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}
