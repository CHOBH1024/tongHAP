import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Search, Copy, Check, Calculator, Clock, Globe, FileText, Zap } from 'lucide-react';

const TOOLS = [
  {
    category: '📋 행정 도구',
    items: [
      { name: '교구 보고서 양식', desc: '월간 교구 현황 보고서 템플릿', icon: '📄', link: null, copyText: null },
      { name: '헌금 정산 계산기', desc: '십일조/감사헌금 자동 정산', icon: '🧮', link: null, copyText: null },
      { name: '회의록 템플릿', desc: '회의 안건·결의사항 기록 양식', icon: '📝', link: null, copyText: null },
      { name: '일정 관리 캘린더', desc: '교회 행사 및 일정 통합 관리', icon: '📅', link: null, copyText: null },
    ],
  },
  {
    category: '🌐 외부 서비스',
    items: [
      { name: '가정연합 공식 사이트', desc: 'FFWPU Korea 공식 홈페이지', icon: '🏠', link: 'https://www.ffwpu.or.kr', copyText: null },
      { name: '청평수련원', desc: '천정궁박물관·수련 예약', icon: '🏔️', link: 'https://www.cheonjeong.or.kr', copyText: null },
      { name: '참부모TV', desc: '말씀·영상 콘텐츠 플랫폼', icon: '📺', link: 'https://www.ffwpu.or.kr', copyText: null },
      { name: '가정신문', desc: '가정연합 공식 신문', icon: '📰', link: 'https://www.fam.or.kr', copyText: null },
    ],
  },
  {
    category: '⚡ 빠른 유틸리티',
    items: [
      { name: '오늘 날짜 복사', desc: '천력/양력 오늘 날짜를 클립보드로', icon: '📆', link: null, copyText: () => new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' }) },
      { name: '교구 코드 목록', desc: '전국 14개 교구 공식 코드', icon: '🗂️', link: null, copyText: () => '서울·인천·경기북·경기남·강원·충북·충남·전북·전남·경북·경남·제주·대구·부산' },
      { name: '사무장 연락처 양식', desc: '담당자 정보 입력 템플릿 복사', icon: '📋', link: null, copyText: () => '이름:\n직책:\n교구:\n연락처:\n이메일:' },
    ],
  },
];

const QUICK_CALCS = [
  { label: '1/10 계산', fn: (n: number) => (n * 0.1).toLocaleString(), suffix: '원' },
  { label: '3/10 계산', fn: (n: number) => (n * 0.3).toLocaleString(), suffix: '원' },
  { label: '교구 배정(1/14)', fn: (n: number) => Math.round(n / 14).toLocaleString(), suffix: '원' },
];

const HEX = '#0891b2';
const ha = (a: number) => `${HEX}${Math.round(a * 255).toString(16).padStart(2, '0')}`;

export function DoraemonApp() {
  const [searchQ, setSearchQ] = useState('');
  const [copied, setCopied] = useState<string | null>(null);
  const [calcInput, setCalcInput] = useState('');

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text).catch(() => {});
    setCopied(id);
    setTimeout(() => setCopied(null), 1800);
  };

  const calcNum = parseFloat(calcInput.replace(/,/g, '')) || 0;

  const filtered = TOOLS.map(cat => ({
    ...cat,
    items: cat.items.filter(i =>
      !searchQ || i.name.includes(searchQ) || i.desc.includes(searchQ)
    ),
  })).filter(cat => cat.items.length > 0);

  return (
    <div className="min-h-screen" style={{ background: `linear-gradient(160deg, ${ha(0.08)} 0%, #fff 45%, ${ha(0.04)} 100%)` }}>
      <header className="sticky top-0 z-20 flex items-center gap-3 px-5 py-3.5 bg-white/90 backdrop-blur-sm border-b" style={{ borderColor: ha(0.2) }}>
        <Link to="/" className="flex items-center gap-1.5 text-sm font-bold hover:opacity-60 transition-opacity" style={{ color: HEX }}>
          <ArrowLeft size={16} /> 홈으로
        </Link>
        <div className="h-4 w-px opacity-30" style={{ background: HEX }} />
        <span className="text-sm font-black" style={{ color: HEX }}>🤖 도라에몽 — 도구 허브</span>
        <span className="ml-auto px-2.5 py-1 text-[10px] font-black rounded-full" style={{ background: ha(0.12), color: HEX }}>BETA</span>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-5 pb-24 space-y-5">
        {/* Search */}
        <div className="relative">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: HEX }} />
          <input
            value={searchQ}
            onChange={e => setSearchQ(e.target.value)}
            placeholder="도구 검색..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border text-sm font-medium outline-none focus:ring-2"
            style={{ borderColor: ha(0.25), background: ha(0.04) }}
          />
        </div>

        {/* Quick calculator */}
        <div className="bg-white rounded-2xl border p-4" style={{ borderColor: ha(0.15) }}>
          <div className="flex items-center gap-2 mb-3">
            <Calculator size={14} style={{ color: HEX }} />
            <span className="text-xs font-black text-slate-500 uppercase tracking-widest">헌금 빠른 계산</span>
          </div>
          <div className="flex gap-2 mb-3">
            <input
              type="number"
              value={calcInput}
              onChange={e => setCalcInput(e.target.value)}
              placeholder="금액 입력 (원)"
              className="flex-1 px-3 py-2 rounded-xl border text-sm font-bold outline-none"
              style={{ borderColor: ha(0.2), background: ha(0.04) }}
            />
          </div>
          {calcInput && (
            <div className="grid grid-cols-3 gap-2">
              {QUICK_CALCS.map((c, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                  className="text-center px-2 py-2 rounded-xl cursor-pointer hover:opacity-80"
                  style={{ background: ha(0.1) }}
                  onClick={() => handleCopy(`calc-${i}`, `${c.label}: ${c.fn(calcNum)}${c.suffix}`)}>
                  <div className="text-[10px] text-slate-500 font-bold">{c.label}</div>
                  <div className="text-sm font-black mt-0.5" style={{ color: HEX }}>{c.fn(calcNum)}{c.suffix}</div>
                  {copied === `calc-${i}` && <div className="text-[9px] text-emerald-500 font-black mt-0.5">복사됨!</div>}
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Tool categories */}
        {filtered.map((cat, ci) => (
          <div key={ci} className="bg-white rounded-2xl border p-4" style={{ borderColor: ha(0.12) }}>
            <p className="text-xs font-black text-slate-500 mb-3">{cat.category}</p>
            <div className="space-y-2">
              {cat.items.map((item, ii) => {
                const copyId = `${ci}-${ii}`;
                const isCopied = copied === copyId;
                return (
                  <motion.div key={ii} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: ii * 0.05 }}
                    className={`flex items-center justify-between px-3 py-2.5 rounded-xl transition-opacity ${!item.link && !item.copyText ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90 cursor-pointer'}`}
                    style={{ background: ha(0.05) }}
                    onClick={() => {
                      if (item.link) window.open(item.link, '_blank');
                      else if (item.copyText) handleCopy(copyId, item.copyText());
                    }}>
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{item.icon}</span>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-sm font-bold text-slate-800">{item.name}</span>
                          {!item.link && !item.copyText && (
                            <span className="text-[9px] font-black px-1.5 py-0.5 rounded-full bg-slate-100 text-slate-400">준비 중</span>
                          )}
                        </div>
                        <div className="text-[11px] text-slate-400">{item.desc}</div>
                      </div>
                    </div>
                    <div className="flex-shrink-0 ml-2">
                      {item.link ? (
                        <ExternalLink size={14} style={{ color: HEX }} />
                      ) : item.copyText ? (
                        isCopied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} style={{ color: HEX }} />
                      ) : (
                        <Zap size={14} className="text-slate-300" />
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="text-center py-12 text-slate-400 font-bold text-sm">
            검색 결과가 없습니다.
          </div>
        )}

        {/* Coming soon */}
        <div className="rounded-2xl border p-4 text-center" style={{ background: ha(0.05), borderColor: ha(0.12) }}>
          <Clock size={16} className="mx-auto mb-2" style={{ color: HEX }} />
          <p className="text-xs text-slate-500 font-bold">AI 어시스턴트 & 스마트 검색 기능 개발 중</p>
        </div>
      </main>
    </div>
  );
}
