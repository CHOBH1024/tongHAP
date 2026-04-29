import React, { useState, useEffect } from 'react';
import { 
  Search, 
  ChevronRight, 
  ShieldCheck, 
  Users, 
  Scale, 
  Download,
  ExternalLink,
  BookOpen,
  Info,
  Clock,
  AlertCircle,
  X,
  FileText,
  Bookmark,
  BookmarkCheck,
  Eye,
  TrendingUp
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Regulation {
  id: string;
  category: 'ethics' | 'hr' | 'finance' | 'operations';
  title: string;
  desc: string;
  lastUpdated: string;
  importance: 'high' | 'medium' | 'low';
  content: string;
  tags: string[];
}

const regulations: Regulation[] = [
  {
    id: 'reg-001',
    category: 'ethics',
    title: '공직윤리위원회 운영 규정',
    desc: '공직자의 도덕성 확립 및 부패 방지를 위한 위원회 설치 및 운영 지침',
    lastUpdated: '2026.04.14',
    importance: 'high',
    tags: ['윤리', '감사', '쇄신'],
    content: `
      ## 1. 목적
      본 규정은 세계평화통일가정연합 공직자의 윤리 의식을 고취하고, 투명한 공직 문화를 조성하기 위한 공직윤리위원회의 설치 및 운영에 관한 사항을 규정함을 목적으로 한다.

      ## 2. 주요 구성
      - 위원회는 위원장을 포함하여 7인 이내의 위원으로 구성한다.
      - 외부 전문가(법조인, 회계사 등)를 30% 이상 포함하여 객관성을 확보한다.

      ## 3. 심의 사항
      - 공직자 윤리 강령 위반 사례 조사 및 심의
      - 부패 방지 및 규범 준수(Compliance) 체계 점검
      - 내부 제보자 보호 및 보상에 관한 사항
    `
  },
  {
    id: 'reg-002',
    category: 'hr',
    title: '통합 목회유형 진단 및 인사 배치 규정',
    desc: '공직자 아키타입(설계자, 부모, 전략가 등) 기반의 적재적소 배치 원칙',
    lastUpdated: '2026.04.20',
    importance: 'high',
    tags: ['인사', '진단', '역량'],
    content: `
      ## 1. 개요
      공직자 개개인의 하늘이 주신 은사와 성향(Archetype)을 과학적으로 진단하여, 섭리적 효율을 극대화할 수 있는 보직에 배치하는 것을 원칙으로 한다.

      ## 2. 진단 도구 (CLA/Mirror)
      - **설계자(Architect):** 본부 기획, 감사, 법무 파트 우선 배치
      - **부모(Parent):** 현장 목양, 심방, 상담 파트 우선 배치
      - **전략가(Strategist):** 전도 특공대, 대외 협력, 프로젝트 TF 우선 배치

      ## 3. 인사 이동 원칙
      - 3년 주기 정기 순환 근무를 원칙으로 하되, 전문직군은 예외를 둘 수 있다.
      - 부부 목회 선택제를 도입하여 여성 공직자의 경력 단절을 예방한다.
    `
  },
  {
    id: 'reg-003',
    category: 'finance',
    title: '투명 재정 및 예산 집행 지침',
    desc: '교구 및 지교회 재정의 투명성 확보를 위한 예산 편성 및 집행 가이드',
    lastUpdated: '2026.03.15',
    importance: 'high',
    tags: ['재정', '예산', '투명성'],
    content: `
      ## 1. 예산 편성 원칙
      - 모든 예산은 섭리 목표(Vision 2027)와 연동하여 편성되어야 한다.
      - 예산의 10% 이상을 교구 발전 기금 및 구제 사업으로 배정한다.

      ## 2. 집행 및 증빙
      - 모든 지출은 법인카드 사용을 원칙으로 하며, 5만원 이상의 지출은 적격 증빙을 첨부해야 한다.
      - 분기별 재정 보고서를 신도(식구) 총회에 공개하여 투명성을 확보한다.
    `
  },
  {
    id: 'reg-004',
    category: 'operations',
    title: '내부 제보 제도(Whistleblowing) 운영 세칙',
    desc: '익명성이 보장되는 내부 비리 제보 시스템 운영 및 제보자 보호 방안',
    lastUpdated: '2026.04.01',
    importance: 'medium',
    tags: ['운영', '리스크관리', '익명'],
    content: `
      ## 1. 제보 채널
      - 온라인 익명 제보 시스템 (Hotline)
      - 오프라인 무기명 우편 접수

      ## 2. 제보자 보호
      - 제보자의 신원은 철저히 비밀로 보장되며, 어떠한 불이익 처분도 금지한다.
      - 신분 노출로 인한 피해 발생 시 위원회 차원의 보상 및 복구 조치를 시행한다.
    `
  },
  {
    id: 'reg-005',
    category: 'ethics',
    title: '부패방지 및 규범준수 방침',
    desc: '2026년 가정연합 글로벌 컴플라이언스 표준 준수 가이드라인',
    lastUpdated: '2026.04.28',
    importance: 'high',
    tags: ['윤리', '글로벌', '표준'],
    content: `
      ## 1. 기본 원칙
      참부모님의 참사랑 정신을 바탕으로, 모든 공직 행위에서 정직과 공정을 최우선 가치로 삼는다.

      ## 2. 금지 행위
      - 공금 유용 및 횡령 (무관용 원칙)
      - 권력 남용을 통한 사적 이익 취득
      - 성비위 및 직장 내 괴롭힘
    `
  },
  {
    id: 'reg-006',
    category: 'hr',
    title: '공직자 심리상담 지원 제도',
    desc: '정서적 소진 예방 및 정신건강 지원을 위한 전문 상담 프로그램 운영 지침',
    lastUpdated: '2026.04.10',
    importance: 'medium',
    tags: ['복지', '상담', '소진예방'],
    content: `
      ## 1. 도입 배경
      현장 공직자의 정서적 소진(Burnout)은 사역의 질을 저하시키고, 이탈을 유발하는 주요 원인이다. 이에 전문 심리상담을 제도적으로 보장한다.

      ## 2. 지원 내용
      - 연간 12회 전문 심리상담 무료 제공 (본인 및 배우자)
      - 외부 전문기관과의 협약을 통한 비밀 보장 상담
      - 분기별 집단 힐링 프로그램 (명상, 미술치료 등) 운영
    `
  },
  {
    id: 'reg-007',
    category: 'operations',
    title: '디지털 전환 및 AI 활용 지침',
    desc: '교회 행정의 디지털 전환과 AI 도구 도입에 관한 표준 가이드라인',
    lastUpdated: '2026.04.25',
    importance: 'high',
    tags: ['AI', '디지털', '혁신'],
    content: `
      ## 1. 디지털 전환 원칙
      모든 행정 문서는 클라우드 기반 시스템으로 관리하며, 2027년까지 100% 페이퍼리스를 목표로 한다.

      ## 2. AI 활용 허용 범위
      - 주보, 공문, 보고서 초안 작성 시 AI 보조 도구 사용 가능
      - 식구 개인정보가 포함된 데이터는 AI에 입력 금지
      - AI 생성 콘텐츠는 반드시 담당자의 검토 및 승인을 거쳐야 한다
    `
  },
  {
    id: 'reg-008',
    category: 'finance',
    title: '헌금 및 특별 정성 관리 규정',
    desc: '각종 헌금의 수납, 관리, 보고에 관한 투명성 확보 지침',
    lastUpdated: '2026.03.28',
    importance: 'high',
    tags: ['헌금', '회계', '투명성'],
    content: `
      ## 1. 수납 원칙
      - 모든 헌금은 공식 영수증을 발행하며, 전산 시스템에 즉시 입력한다.
      - 현금 수납은 2인 이상 입회 하에 처리함을 원칙으로 한다.

      ## 2. 보고 체계
      - 월별 헌금 내역을 본부 재정부에 보고한다.
      - 연 1회 외부 회계법인의 감사를 의무적으로 실시한다.
    `
  }
];

const categoryIcons = {
  ethics: <ShieldCheck className="w-5 h-5" />,
  hr: <Users className="w-5 h-5" />,
  finance: <Scale className="w-5 h-5" />,
  operations: <BookOpen className="w-5 h-5" />
};

const categoryNames = {
  ethics: '신앙 및 윤리',
  hr: '인사 및 복지',
  finance: '재정 및 감사',
  operations: '조직 및 운영'
};

export const Regulations: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedReg, setSelectedReg] = useState<Regulation | null>(null);
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [readItems, setReadItems] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('gajeong_reg_bookmarks');
    if (saved) setBookmarks(JSON.parse(saved));
    const savedRead = localStorage.getItem('gajeong_reg_read');
    if (savedRead) setReadItems(JSON.parse(savedRead));
  }, []);

  const toggleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const next = bookmarks.includes(id) ? bookmarks.filter(b => b !== id) : [...bookmarks, id];
    setBookmarks(next);
    localStorage.setItem('gajeong_reg_bookmarks', JSON.stringify(next));
  };

  const markAsRead = (id: string) => {
    if (!readItems.includes(id)) {
      const next = [...readItems, id];
      setReadItems(next);
      localStorage.setItem('gajeong_reg_read', JSON.stringify(next));
    }
  };

  const filteredRegulations = regulations.filter(reg => {
    const matchesSearch = reg.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         reg.desc.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         reg.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory ? reg.category === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8 pb-20"
    >
      {/* Premium Header */}
      <div className="relative p-8 md:p-12 rounded-[2.5rem] bg-indigo-900 overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 p-12 opacity-10 text-white">
          <BookOpen size={180} />
        </div>
        <div className="relative z-10 space-y-6 max-w-2xl">
          <div className="flex items-center gap-3 text-amber-400">
            <ShieldCheck size={28} />
            <span className="text-xs font-black uppercase tracking-[0.3em]">Compliance & Standards</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
            행정 규정 및<br/>공직 표준 가이드
          </h1>
          <p className="text-indigo-100/70 text-lg font-medium leading-relaxed">
            천일국 안착 시대를 위한 투명하고 공정한 행정의 표준.<br/>
            참부모님의 말씀에 기초한 공직 윤리와 운영 지침을 확인하십시오.
          </p>
          
          <div className="relative group max-w-md pt-4">
            <Search className="absolute left-5 top-[calc(1rem+1.25rem)] text-indigo-300 group-focus-within:text-amber-400 transition-colors" size={20} />
            <input 
              type="text" 
              placeholder="규정 제목, 키워드 검색..." 
              className="w-full pl-14 pr-6 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder:text-indigo-200/50 focus:bg-white/20 focus:ring-2 focus:ring-amber-400 transition-all outline-none font-bold backdrop-blur-md"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: '전체 규정', value: regulations.length, icon: <FileText size={18} className="text-indigo-500" />, bg: 'bg-indigo-50' },
          { label: '북마크', value: bookmarks.length, icon: <BookmarkCheck size={18} className="text-amber-500" />, bg: 'bg-amber-50' },
          { label: '열람 완료', value: readItems.length, icon: <Eye size={18} className="text-emerald-500" />, bg: 'bg-emerald-50' },
        ].map((s, i) => (
          <div key={i} className="bg-white rounded-2xl p-5 flex items-center gap-4 shadow-sm border border-slate-100">
            <div className={`w-10 h-10 ${s.bg} rounded-xl flex items-center justify-center`}>{s.icon}</div>
            <div>
              <div className="text-2xl font-black text-slate-900">{s.value}</div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Category Selection */}
      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`px-6 py-3 rounded-2xl text-sm font-black transition-all ${
            selectedCategory === null 
            ? 'bg-amber-500 text-white shadow-lg shadow-amber-200' 
            : 'bg-white text-slate-500 hover:bg-slate-50 border border-slate-100 shadow-sm'
          }`}
        >
          전체 보기
        </button>
        {Object.entries(categoryNames).map(([id, name]) => (
          <button
            key={id}
            onClick={() => setSelectedCategory(id)}
            className={`px-6 py-3 rounded-2xl text-sm font-black transition-all flex items-center gap-2 ${
              selectedCategory === id 
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' 
              : 'bg-white text-slate-500 hover:bg-slate-50 border border-slate-100 shadow-sm'
            }`}
          >
            {categoryIcons[id as keyof typeof categoryIcons]}
            {name}
          </button>
        ))}
      </div>

      {/* Regulation Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredRegulations.map((reg) => (
            <motion.div
              layout
              key={reg.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={() => { setSelectedReg(reg); markAsRead(reg.id); }}
              className="glass-card p-8 cursor-pointer group hover:shadow-2xl transition-all border border-slate-100 hover:border-indigo-200 relative overflow-hidden bg-white"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-full -mr-16 -mt-16 opacity-50 group-hover:scale-150 transition-transform duration-700" />
              
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-6">
                  <div className={`p-4 rounded-2xl ${
                    reg.category === 'ethics' ? 'bg-amber-50 text-amber-600' :
                    reg.category === 'hr' ? 'bg-indigo-50 text-indigo-600' :
                    reg.category === 'finance' ? 'bg-emerald-50 text-emerald-600' :
                    'bg-violet-50 text-violet-600'
                  }`}>
                    {categoryIcons[reg.category]}
                  </div>
                  <div className="flex items-center gap-2">
                    {readItems.includes(reg.id) && (
                      <span className="w-6 h-6 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center">
                        <Eye className="w-3 h-3" />
                      </span>
                    )}
                    <button onClick={(e) => toggleBookmark(reg.id, e)} className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-amber-50 transition-colors">
                      {bookmarks.includes(reg.id) 
                        ? <BookmarkCheck className="w-4 h-4 text-amber-500" />
                        : <Bookmark className="w-4 h-4 text-slate-300" />
                      }
                    </button>
                    {reg.importance === 'high' && (
                      <span className="flex items-center gap-1 text-[10px] font-black px-2.5 py-1 bg-rose-50 text-rose-600 rounded-full uppercase tracking-wider">
                        <AlertCircle className="w-3 h-3" />
                        중요
                      </span>
                    )}
                  </div>
                </div>

                <h3 className="text-xl font-black text-slate-800 mb-3 group-hover:text-indigo-600 transition-colors leading-tight">
                  {reg.title}
                </h3>
                <p className="text-sm text-slate-500 line-clamp-2 mb-6 font-medium leading-relaxed">
                  {reg.desc}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {reg.tags.map(tag => (
                    <span key={tag} className="text-[10px] font-bold bg-slate-50 text-slate-400 px-2.5 py-1 rounded-lg">
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                  <span className="text-[11px] text-slate-400 font-bold flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    REV: {reg.lastUpdated}
                  </span>
                  <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-all">
                    <ChevronRight className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Empty State */}
      {filteredRegulations.length === 0 && (
        <div className="py-24 text-center bg-white rounded-[2.5rem] border-2 border-dashed border-slate-100 shadow-inner">
          <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <Search className="w-10 h-10 text-slate-200" />
          </div>
          <h3 className="text-xl font-black text-slate-800 mb-2">검색 결과가 없습니다</h3>
          <p className="text-slate-400 font-medium mb-8">다른 키워드나 카테고리를 선택해 보세요.</p>
          <button 
            onClick={() => { setSearchTerm(''); setSelectedCategory(null); }}
            className="px-8 py-3 bg-indigo-600 text-white rounded-2xl font-black text-sm hover:shadow-lg transition-all"
          >
            전체 보기로 돌아가기
          </button>
        </div>
      )}

      {/* Modern Modal Overlay */}
      <AnimatePresence>
        {selectedReg && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
              onClick={() => setSelectedReg(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 40 }}
              className="relative w-full max-w-4xl bg-white rounded-[3rem] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
            >
              <div className={`p-10 md:p-14 text-white relative overflow-hidden ${
                selectedReg.category === 'ethics' ? 'bg-amber-600' :
                selectedReg.category === 'hr' ? 'bg-indigo-600' :
                selectedReg.category === 'finance' ? 'bg-emerald-600' :
                'bg-violet-600'
              }`}>
                <div className="absolute top-0 right-0 p-10 opacity-10">
                  <FileText size={160} />
                </div>
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4 text-white/70 text-sm font-black uppercase tracking-[0.2em]">
                    {categoryIcons[selectedReg.category]}
                    {categoryNames[selectedReg.category]}
                  </div>
                  <h3 className="text-3xl md:text-4xl font-black mb-6 tracking-tight">{selectedReg.title}</h3>
                  <div className="flex flex-wrap gap-3">
                    {selectedReg.tags.map(tag => (
                      <span key={tag} className="px-4 py-1.5 bg-white/10 rounded-xl text-xs font-bold backdrop-blur-md">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedReg(null)}
                  className="absolute top-8 right-8 p-4 bg-white/10 hover:bg-white/20 rounded-2xl transition-all text-white backdrop-blur-md"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-10 md:p-14 custom-scrollbar">
                <div className="max-w-3xl mx-auto space-y-8">
                  {selectedReg.content.split('\n').map((line, i) => {
                    if (line.trim().startsWith('##')) {
                      return <h4 key={i} className="text-2xl font-black text-slate-900 mt-12 mb-6 flex items-center gap-3">
                        <span className="w-1.5 h-8 bg-indigo-500 rounded-full" />
                        {line.replace('##', '').trim()}
                      </h4>;
                    }
                    if (line.trim().startsWith('-')) {
                      return <div key={i} className="flex items-start gap-4 bg-slate-50 p-6 rounded-2xl border border-slate-100 group hover:border-indigo-200 transition-colors">
                        <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-black shrink-0">
                          {i}
                        </div>
                        <p className="text-slate-700 font-bold leading-relaxed">{line.replace('-', '').trim()}</p>
                      </div>;
                    }
                    if (line.trim().startsWith('**')) {
                      return <div key={i} className="p-8 bg-indigo-50/50 border border-indigo-100 rounded-[2rem] text-indigo-900 font-black leading-loose text-lg">
                        {line.replace(/\*\*/g, '').trim()}
                      </div>;
                    }
                    return line.trim() ? <p key={i} className="text-slate-500 font-medium text-lg leading-relaxed mb-6">{line.trim()}</p> : null;
                  })}
                </div>
              </div>

              <div className="p-10 md:px-14 md:py-8 bg-slate-50 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4 text-slate-400 font-bold text-sm">
                  <Clock className="w-5 h-5" />
                  Last Updated: {selectedReg.lastUpdated}
                </div>
                <div className="flex gap-4 w-full md:w-auto">
                  <button className="flex-1 md:flex-none flex items-center justify-center gap-3 px-8 py-4 bg-white text-slate-700 rounded-2xl font-black text-sm shadow-sm hover:shadow-md transition-all border border-slate-100">
                    <Download className="w-5 h-5 text-indigo-600" />
                    PDF 지침서 다운로드
                  </button>
                  <button className="flex-1 md:flex-none flex items-center justify-center gap-3 px-8 py-4 bg-indigo-600 text-white rounded-2xl font-black text-sm shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all">
                    <ExternalLink className="w-5 h-5 text-amber-400" />
                    관련 부서 문의
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

