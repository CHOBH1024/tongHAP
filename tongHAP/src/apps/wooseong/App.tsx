import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, MapPin, Building2, TrendingUp, AlertTriangle,
  CheckCircle2, Clock, DollarSign, Users, BarChart3, ChevronRight,
  Megaphone, Calendar
} from 'lucide-react';

/* ── 실 데이터 (GeneralAffairs_Master) ─────────────────────── */
const DIOCESE_MAP: Record<string, { ko: string; count: number }> = {
  Seoul:         { ko: '서울',   count: 15 },
  Incheon:       { ko: '인천',   count: 15 },
  Gyeonggi_North:{ ko: '경기북', count: 15 },
  Gyeonggi_South:{ ko: '경기남', count: 15 },
  Gangwon:       { ko: '강원',   count: 15 },
  Chungbuk:      { ko: '충북',   count: 15 },
  Chungnam:      { ko: '충남',   count: 15 },
  Jeonbuk:       { ko: '전북',   count: 15 },
  Jeonnam:       { ko: '전남',   count: 15 },
  Gyeongbuk:     { ko: '경북',   count: 15 },
  Gyeongnam:     { ko: '경남',   count: 15 },
  Jeju:          { ko: '제주',   count: 15 },
  Daegu:         { ko: '대구',   count: 15 },
  Busan:         { ko: '부산',   count: 15 },
};

const PRIORITIES = [
  { level: 'HIGH',   task: '재무 이상 징후 정밀 감사',   reason: '비정상적 수치 감지 — 데이터 오입력 또는 특수 헌금 여부 즉시 확인' },
  { level: 'HIGH',   task: '예측 기반 자원 재배정 집행', reason: '₩105,000,000 예산 및 4명 유동 배치 전략' },
  { level: 'MEDIUM', task: '고위험 교구(7곳) 집중 독려', reason: '제출 지연 가능성 매우 높음' },
];

const BUDGET = {
  total: '₩1,750,000,000',
  year: '2027',
  strategy: '초지능 인프라 확충 및 글로벌 동기화 가속화',
  items: [
    { dept: 'IT / 자동화',  amount: 600_000_000, priority: 'URGENT' },
    { dept: '교구 / 협력',  amount: 400_000_000, priority: 'HIGH'   },
    { dept: '총무',         amount: 450_000_000, priority: 'HIGH'   },
    { dept: '재무 / 리스크',amount: 300_000_000, priority: 'MEDIUM' },
  ],
};

const WEEKLY_NOTICE = {
  date: '2026. 4. 27.',
  summary: '총 수입 전주 대비 ₩-450,000,000 감소 — 주의 필요',
  verse: '진리를 알지니 진리가 너희를 자유롭게 하리라',
  requests: [
    '재무 집행 이상 징후 해당 교구: 당일 17시까지 집행 사유서 제출',
    '마스터 아카이브 Safe_Reports 폴더 참조, 개인정보 보호 만전',
    '전국 교구 현장 사진 3장 공유 완료 — 수고하셨습니다',
  ],
};
/* ─────────────────────────────────────────────────────────── */

const HEX = '#d97706';
const ha = (a: number) => `${HEX}${Math.round(a * 255).toString(16).padStart(2, '0')}`;

const tabs = ['전국 현황', '우선 업무', '예산 현황', '주간 공지'] as const;
type Tab = typeof tabs[number];

const pColor = {
  URGENT: { bg: '#fef2f2', text: '#dc2626', dot: '#dc2626' },
  HIGH:   { bg: '#fffbeb', text: '#d97706', dot: '#f59e0b' },
  MEDIUM: { bg: '#f0fdf4', text: '#16a34a', dot: '#22c55e' },
};

const fmtKRW = (n: number) =>
  n >= 100_000_000 ? `${(n / 100_000_000).toFixed(0)}억` : `${(n / 10_000).toFixed(0)}만`;

const totalBudget = BUDGET.items.reduce((s, i) => s + i.amount, 0);
const totalChurches = Object.values(DIOCESE_MAP).reduce((s, v) => s + v.count, 0);

export function WooseongApp() {
  const [tab, setTab] = useState<Tab>('전국 현황');

  return (
    <div className="min-h-screen bg-[#fffbeb]" style={{ background: `linear-gradient(160deg, ${ha(0.1)} 0%, #fff 45%, ${ha(0.05)} 100%)` }}>
      {/* Header */}
      <header className="sticky top-0 z-20 flex items-center gap-3 px-5 py-3.5 bg-white/90 backdrop-blur-sm border-b" style={{ borderColor: ha(0.25) }}>
        <Link to="/" className="flex items-center gap-1.5 text-sm font-bold hover:opacity-60 transition-opacity" style={{ color: HEX }}>
          <ArrowLeft size={16} /> 홈으로
        </Link>
        <div className="h-4 w-px opacity-30" style={{ background: HEX }} />
        <span className="text-sm font-black" style={{ color: HEX }}>🦁 우성 — 행정 허브</span>
        <span className="ml-auto px-2.5 py-1 text-[10px] font-black rounded-full" style={{ background: ha(0.15), color: HEX }}>LIVE</span>
      </header>

      {/* Tab bar */}
      <div className="flex gap-1 px-4 pt-4 overflow-x-auto">
        {tabs.map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className="flex-shrink-0 px-4 py-2 rounded-xl text-xs font-black transition-all"
            style={tab === t
              ? { background: HEX, color: '#fff' }
              : { background: ha(0.08), color: HEX }}
          >
            {t}
          </button>
        ))}
      </div>

      <main className="max-w-2xl mx-auto px-4 py-6 pb-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >

            {/* ── 전국 현황 ── */}
            {tab === '전국 현황' && (
              <div className="space-y-5 mt-4">
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: '총 교구',  value: Object.keys(DIOCESE_MAP).length + '개', icon: <MapPin size={18} /> },
                    { label: '총 교회',  value: totalChurches + '개',                   icon: <Building2 size={18} /> },
                    { label: '활성 사무장', value: '842명',                              icon: <Users size={18} /> },
                  ].map((s, i) => (
                    <div key={i} className="bg-white rounded-2xl p-4 border text-center" style={{ borderColor: ha(0.2) }}>
                      <div className="flex justify-center mb-2" style={{ color: HEX }}>{s.icon}</div>
                      <div className="text-xl font-black text-slate-900">{s.value}</div>
                      <div className="text-[10px] text-slate-400 font-bold mt-0.5">{s.label}</div>
                    </div>
                  ))}
                </div>

                <div className="bg-white rounded-2xl border p-4" style={{ borderColor: ha(0.2) }}>
                  <div className="flex items-center gap-2 mb-4">
                    <MapPin size={15} style={{ color: HEX }} />
                    <span className="text-xs font-black uppercase tracking-widest text-slate-500">전국 교구 현황</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.entries(DIOCESE_MAP).map(([key, { ko, count }]) => (
                      <div key={key} className="flex items-center justify-between px-3 py-2 rounded-xl hover:opacity-80 transition-opacity cursor-default" style={{ background: ha(0.06) }}>
                        <span className="text-sm font-bold text-slate-700">{ko}</span>
                        <div className="flex items-center gap-1">
                          <span className="text-xs font-black" style={{ color: HEX }}>{count}개</span>
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-2xl border p-4" style={{ borderColor: ha(0.2) }}>
                  <div className="flex items-center gap-2 mb-3">
                    <BarChart3 size={15} style={{ color: HEX }} />
                    <span className="text-xs font-black uppercase tracking-widest text-slate-500">요약 지표</span>
                  </div>
                  <div className="space-y-3">
                    {[
                      { label: '월간 새가족 등록', value: 94, display: '142명 / 목표 150명' },
                      { label: '정기 예배 출석률', value: 100, display: '85.4% / 목표 80%' },
                      { label: '소그룹 모임 활성화', value: 100, display: '42개 / 목표 40개' },
                      { label: '청년부 참여도', value: 91, display: '64% / 목표 70%' },
                    ].map((kpi, i) => (
                      <div key={i}>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="font-bold text-slate-600">{kpi.label}</span>
                          <span className="font-black text-slate-400">{kpi.display}</span>
                        </div>
                        <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${Math.min(kpi.value, 100)}%` }}
                            transition={{ delay: i * 0.1 + 0.2, duration: 0.6 }}
                            className="h-full rounded-full"
                            style={{ background: HEX }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ── 우선 업무 ── */}
            {tab === '우선 업무' && (
              <div className="space-y-4 mt-4">
                <div className="bg-white rounded-2xl border p-4" style={{ borderColor: ha(0.2) }}>
                  <p className="text-xs text-slate-400 font-bold leading-relaxed">
                    AI 예측 엔진 종합 분석 결과 — 즉각적 의사결정이 필요한 항목입니다.
                  </p>
                </div>
                {PRIORITIES.map((p, i) => {
                  const c = pColor[p.level as keyof typeof pColor] ?? pColor.MEDIUM;
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="bg-white rounded-2xl border p-5" style={{ borderColor: ha(0.15) }}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-0.5 text-[10px] font-black rounded-full" style={{ background: c.bg, color: c.text }}>
                          {p.level}
                        </span>
                        <h3 className="font-black text-slate-900 text-sm">{p.task}</h3>
                      </div>
                      <p className="text-xs text-slate-500 leading-relaxed">{p.reason}</p>
                      <button className="mt-3 flex items-center gap-1 text-xs font-black transition-opacity hover:opacity-70" style={{ color: c.text }}>
                        처리하기 <ChevronRight size={12} />
                      </button>
                    </motion.div>
                  );
                })}
                <div className="bg-white rounded-2xl border p-4" style={{ borderColor: ha(0.2) }}>
                  <div className="flex items-center gap-2 mb-3">
                    <Clock size={14} style={{ color: HEX }} />
                    <span className="text-xs font-black text-slate-500">업무 처리 현황</span>
                  </div>
                  <div className="space-y-2">
                    {[
                      { label: '오늘 완료', count: 7, icon: <CheckCircle2 size={14} className="text-emerald-500" /> },
                      { label: '진행 중',   count: 3, icon: <Clock size={14} style={{ color: HEX }} /> },
                      { label: '지연 주의', count: 2, icon: <AlertTriangle size={14} className="text-red-500" /> },
                    ].map((s, i) => (
                      <div key={i} className="flex items-center justify-between px-3 py-2 rounded-xl" style={{ background: ha(0.05) }}>
                        <div className="flex items-center gap-2">{s.icon}<span className="text-xs font-bold text-slate-600">{s.label}</span></div>
                        <span className="text-sm font-black text-slate-800">{s.count}건</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ── 예산 현황 ── */}
            {tab === '예산 현황' && (
              <div className="space-y-4 mt-4">
                <div className="bg-white rounded-2xl border p-5 text-center" style={{ borderColor: ha(0.2) }}>
                  <div className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">{BUDGET.year}년도 총 예산 (안)</div>
                  <div className="text-4xl font-black text-slate-900 tracking-tight">{BUDGET.total}</div>
                  <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black" style={{ background: ha(0.12), color: HEX }}>
                    <TrendingUp size={10} /> {BUDGET.strategy}
                  </div>
                </div>

                <div className="bg-white rounded-2xl border p-4" style={{ borderColor: ha(0.2) }}>
                  <div className="flex items-center gap-2 mb-4">
                    <DollarSign size={15} style={{ color: HEX }} />
                    <span className="text-xs font-black uppercase tracking-widest text-slate-500">부서별 배정</span>
                  </div>
                  <div className="space-y-3">
                    {BUDGET.items.map((item, i) => {
                      const pct = Math.round((item.amount / totalBudget) * 100);
                      const c = pColor[item.priority as keyof typeof pColor] ?? pColor.MEDIUM;
                      return (
                        <div key={i}>
                          <div className="flex justify-between text-xs mb-1.5">
                            <div className="flex items-center gap-2">
                              <span className="px-1.5 py-0.5 rounded text-[9px] font-black" style={{ background: c.bg, color: c.text }}>{item.priority}</span>
                              <span className="font-bold text-slate-700">{item.dept}</span>
                            </div>
                            <span className="font-black text-slate-900">{fmtKRW(item.amount)}원 ({pct}%)</span>
                          </div>
                          <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${pct}%` }}
                              transition={{ delay: i * 0.1 + 0.2, duration: 0.5 }}
                              className="h-full rounded-full"
                              style={{ background: c.dot }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="rounded-2xl border p-4 text-xs text-slate-500" style={{ background: ha(0.06), borderColor: ha(0.2) }}>
                  <span className="font-black text-slate-700">상태:</span> DRAFT (AI 자동 생성) — 집행 전 승인 필요
                </div>
              </div>
            )}

            {/* ── 주간 공지 ── */}
            {tab === '주간 공지' && (
              <div className="space-y-4 mt-4">
                <div className="bg-white rounded-2xl border p-5" style={{ borderColor: ha(0.2) }}>
                  <div className="flex items-center gap-2 mb-3">
                    <Calendar size={14} style={{ color: HEX }} />
                    <span className="text-xs font-black text-slate-400">{WEEKLY_NOTICE.date}</span>
                  </div>
                  <div className="flex items-start gap-3 p-3 rounded-xl mb-4" style={{ background: '#fef2f2' }}>
                    <AlertTriangle size={16} className="text-red-500 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-red-700 font-bold leading-relaxed">{WEEKLY_NOTICE.summary}</p>
                  </div>
                  <div className="space-y-2">
                    {WEEKLY_NOTICE.requests.map((req, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-start gap-3 px-3 py-2.5 rounded-xl" style={{ background: ha(0.07) }}
                      >
                        <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-[10px] font-black text-white mt-0.5" style={{ background: HEX }}>
                          {i + 1}
                        </div>
                        <p className="text-xs text-slate-600 font-medium leading-relaxed">{req}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border p-5 text-center" style={{ background: ha(0.06), borderColor: ha(0.15) }}>
                  <Megaphone size={18} className="mx-auto mb-3" style={{ color: HEX }} />
                  <p className="text-xs font-bold text-slate-500 italic leading-relaxed">
                    오늘의 성구
                  </p>
                  <p className="text-sm font-black text-slate-800 mt-1 leading-relaxed">
                    "{WEEKLY_NOTICE.verse}"
                  </p>
                </div>
              </div>
            )}

          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
