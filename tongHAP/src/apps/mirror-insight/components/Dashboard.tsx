// @ts-nocheck
import { motion } from 'framer-motion';
import { ShieldCheck, Mic, ScanFace, Compass, Users, Headphones, Sparkles, BookOpen, Star, ArrowLeft, ChevronRight, GraduationCap, Heart, MessageSquare } from 'lucide-react';
import { SurveyConfig } from '../types';
import { surveys } from '../data/surveys';
import { themeMap } from '../theme';
import { Link } from '@tanstack/react-router';

interface DashboardProps {
  onSelectSurvey: (config: SurveyConfig) => void;
  onMethodology: () => void;
}

const iconMap = {
  'shield-check': ShieldCheck,
  'mic': Mic,
  'scan-face': ScanFace,
  'compass': Compass,
  'users': Users,
  'headphones': Headphones,
  'sparkles': Sparkles,
  'book-open': BookOpen,
  'star': Star,
  'heart': Heart,
  'message-square': MessageSquare,
};

const SURVEY_GROUPS = [
  { label: '핵심 목회 역량', ids: ['pastoral-type', 'vocation', 'leadership'], color: 'from-amber-500 to-orange-500' },
  { label: '영성 & 관계 역량', ids: ['faith', 'counseling', 'authenticity'], color: 'from-indigo-500 to-violet-500' },
  { label: '공동체 & 소명 역량', ids: ['social', 'generation', 'burnout', 'preaching'], color: 'from-emerald-500 to-teal-500' },
];

export const Dashboard = ({ onSelectSurvey, onMethodology }: DashboardProps) => {
  return (
    <main className="pt-12 pb-24 px-6 max-w-5xl mx-auto text-ffwpu-blue overflow-hidden relative">
      <div className="absolute top-0 right-0 w-96 h-96 bg-ffwpu-gold/5 rounded-full blur-[100px] -z-10 animate-pulse" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-500/5 rounded-full blur-[80px] -z-10" />

      <div className="mb-16 flex items-center justify-between">
        <Link to="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-ffwpu-gold transition-all font-black text-sm uppercase tracking-widest group">
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> Hub
        </Link>
        <div className="flex items-center gap-4">
          <span className="text-xs font-black text-slate-400 uppercase tracking-widest hidden md:block">Mirror Insight v3.0 — 목회자 자기성찰 도구</span>
          <div className="w-10 h-10 bg-white rounded-xl p-2 shadow-sacred border border-slate-100">
            <img src={import.meta.env.BASE_URL + 'ffwpu_logo.png'} alt="Logo" className="w-full h-full object-contain" />
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
        <div className="space-y-8">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-ffwpu-gold/10 rounded-full text-ffwpu-gold text-xs font-black tracking-widest uppercase">
              <Sparkles size={14} /> 목회자 자기 성찰 도구
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-brand-950 tracking-tighter leading-[1.1]">
              목회자를 위한<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-ffwpu-gold to-amber-600">내면 성찰 거울</span>
            </h1>
            <p className="text-slate-500 text-lg md:text-xl font-medium leading-relaxed max-w-lg">
              11가지 목회 역량 진단으로 은사·사명·영성을 정밀하게 측정하고<br />
              가정연합 공직자에게 최적화된 성장 로드맵을 제시합니다.
            </p>
          </motion.div>

          <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-2xl shadow-sm border border-slate-100">
              <ShieldCheck size={16} className="text-ffwpu-gold" />
              <span className="text-sm font-black text-slate-700">학술 타당성 검증</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-2xl shadow-sm border border-slate-100">
              <GraduationCap size={16} className="text-indigo-500" />
              <span className="text-sm font-black text-slate-700">Bass·Avolio·Greenleaf 기반</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-2xl shadow-sm border border-slate-100">
              <Heart size={16} className="text-rose-500" />
              <span className="text-sm font-black text-slate-700">가정연합 맞춤 분석</span>
            </div>
          </div>
        </div>

        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="relative">
          <div className="aspect-square bg-gradient-to-br from-ffwpu-gold to-amber-200 rounded-[4rem] rotate-3 shadow-2xl shadow-ffwpu-gold/20 relative overflow-hidden">
            <div className="absolute inset-0 bg-white/20 backdrop-blur-md m-8 rounded-[3rem] flex flex-col items-center justify-center gap-4 border border-white/30 p-6">
              <div className="grid grid-cols-3 gap-3 w-full">
                {[['T', '목회유형'], ['I', '소명'], ['L', '리더십'], ['F', '영성'], ['C', '상담'], ['H', '설교']].map(([code, name]) => (
                  <div key={code} className="bg-white/60 rounded-2xl p-2 text-center">
                    <div className="text-lg font-black text-ffwpu-blue">{code}</div>
                    <div className="text-[9px] font-black text-ffwpu-blue/60">{name}</div>
                  </div>
                ))}
              </div>
              <div className="text-xs font-black text-ffwpu-blue/60 uppercase tracking-widest">11가지 역량 진단</div>
            </div>
          </div>
          <div className="absolute -top-8 -left-8 w-20 h-20 bg-white rounded-3xl shadow-xl flex items-center justify-center -rotate-12 animate-bounce">
            <Star size={28} className="text-ffwpu-gold" fill="currentColor" />
          </div>
        </motion.div>
      </div>

      <div className="space-y-16">
        <div className="flex items-end justify-between px-2">
          <div className="space-y-1">
            <h2 className="text-3xl font-black text-brand-950 tracking-tight">목회 역량 진단 라이브러리</h2>
            <p className="text-slate-400 font-bold text-sm">역량별 진단 도구를 선택하여 자기 성찰을 시작하세요.</p>
          </div>
          <button onClick={onMethodology} className="group flex items-center gap-2 text-sm font-black text-indigo-600 hover:text-indigo-700 transition-colors">
            학술 타당성 보고서 <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {SURVEY_GROUPS.map((group, gi) => {
          const groupSurveys = surveys.filter(s => group.ids.includes(s.id));
          if (groupSurveys.length === 0) return null;
          return (
            <div key={gi} className="space-y-5">
              <div className="flex items-center gap-3">
                <div className={`h-1 w-8 rounded-full bg-gradient-to-r ${group.color}`} />
                <h3 className="text-sm font-black text-slate-600 uppercase tracking-widest">{group.label}</h3>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {groupSurveys.map((survey) => {
                  const IconComponent = iconMap[survey.icon as keyof typeof iconMap] || ShieldCheck;
                  const t = themeMap[survey.color] || themeMap['blue'];
                  return (
                    <button key={survey.id} onClick={() => onSelectSurvey(survey)}
                      className="group glass-card !p-8 text-left hover:bg-white active:scale-[0.98] transition-all duration-500 border-2 border-transparent hover:border-slate-100 flex flex-col justify-between h-72">
                      <div className="space-y-5">
                        <div className="flex items-start justify-between">
                          <div className={`w-14 h-14 ${t.bgBg} ${t.text} rounded-[1.5rem] flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all shadow-lg`}>
                            <IconComponent size={26} />
                          </div>
                          <span className={`text-[10px] font-black px-2 py-1 rounded-full ${t.bgBg} ${t.text} uppercase tracking-wider`}>{survey.name}</span>
                        </div>
                        <div>
                          <h3 className="text-lg font-black text-brand-950 mb-1.5 group-hover:text-ffwpu-gold transition-colors leading-tight">{survey.title}</h3>
                          <p className="text-slate-500 text-xs font-medium leading-relaxed">{survey.subtitle}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{survey.questions.length} Questions</span>
                        <div className={`w-9 h-9 rounded-full bg-slate-50 flex items-center justify-center ${t.text} group-hover:bg-brand-500 group-hover:text-white transition-all`}>
                          <ChevronRight size={18} />
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}

        {(() => {
          const groupedIds = SURVEY_GROUPS.flatMap(g => g.ids);
          const ungrouped = surveys.filter(s => !groupedIds.includes(s.id));
          if (ungrouped.length === 0) return null;
          return (
            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <div className="h-1 w-8 rounded-full bg-gradient-to-r from-slate-400 to-slate-300" />
                <h3 className="text-sm font-black text-slate-600 uppercase tracking-widest">기타 자기 성찰</h3>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {ungrouped.map((survey) => {
                  const IconComponent = iconMap[survey.icon as keyof typeof iconMap] || ShieldCheck;
                  const t = themeMap[survey.color] || themeMap['blue'];
                  return (
                    <button key={survey.id} onClick={() => onSelectSurvey(survey)}
                      className="group glass-card !p-8 text-left hover:bg-white active:scale-[0.98] transition-all duration-500 border-2 border-transparent hover:border-slate-100 flex flex-col justify-between h-72">
                      <div className="space-y-5">
                        <div className="flex items-start justify-between">
                          <div className={`w-14 h-14 ${t.bgBg} ${t.text} rounded-[1.5rem] flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all shadow-lg`}>
                            <IconComponent size={26} />
                          </div>
                          <span className={`text-[10px] font-black px-2 py-1 rounded-full ${t.bgBg} ${t.text} uppercase tracking-wider`}>{survey.name}</span>
                        </div>
                        <div>
                          <h3 className="text-lg font-black text-brand-950 mb-1.5 group-hover:text-ffwpu-gold transition-colors leading-tight">{survey.title}</h3>
                          <p className="text-slate-500 text-xs font-medium leading-relaxed">{survey.subtitle}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{survey.questions.length} Questions</span>
                        <div className={`w-9 h-9 rounded-full bg-slate-50 flex items-center justify-center ${t.text} group-hover:bg-brand-500 group-hover:text-white transition-all`}>
                          <ChevronRight size={18} />
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })()}
      </div>

      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        className="mt-32 p-12 bg-white rounded-[4rem] border border-slate-100 text-center space-y-8 shadow-sm">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 rounded-full text-indigo-600 text-xs font-black tracking-widest uppercase">
          <ShieldCheck size={14} /> 학술 기반 목회 역량 진단
        </div>
        <h2 className="text-3xl font-black text-brand-950">가정연합 목회자를 위한 근거 중심 자기 성찰</h2>
        <p className="text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed">
          Bass & Avolio의 변혁적 리더십, Greenleaf의 서번트 리더십, MIM35 목회 아키타입 엔진을 교차 분석하여<br />
          천일국 공직자의 소명과 역량을 종합적으로 진단합니다.
        </p>
        <div className="flex justify-center gap-12 pt-4 grayscale opacity-30">
          <div className="font-black text-xl italic text-slate-400">Bass & Avolio</div>
          <div className="font-black text-xl italic text-slate-400">Greenleaf</div>
          <div className="font-black text-xl italic text-slate-400">FFWPU</div>
          <div className="font-black text-xl italic text-slate-400">MIM35</div>
        </div>
      </motion.div>
    </main>
  );
};
