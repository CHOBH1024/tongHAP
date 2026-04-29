import { ShieldCheck, Mic, ScanFace, Compass, Users, Headphones, Sparkles, Coffee, Star, ArrowLeft, ChevronRight, GraduationCap } from 'lucide-react';
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
  'coffee': Coffee,
  'star': Star,
};

export const Dashboard = ({ onSelectSurvey, onMethodology }: DashboardProps) => {
  return (
    <main className="pt-12 pb-16 px-6 max-w-3xl mx-auto text-ffwpu-blue">
      <div className="mb-12 flex items-center justify-between">
        <Link to="/" className="inline-flex items-center gap-2 text-toss-gray-500 hover:text-ffwpu-gold transition-colors font-bold group">
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> Hub
        </Link>
        <div className="w-10 h-10 bg-white rounded-xl p-1 shadow-sacred">
          <img src={import.meta.env.BASE_URL + 'ffwpu_logo.png'} alt="Logo" className="w-full h-full object-contain" />
        </div>
      </div>

      <div className="mb-8 space-y-2">
        <h1 className="text-4xl md:text-5xl font-black text-ffwpu-blue tracking-tight leading-tight">
          Mirror Insight<br />
          <span className="text-ffwpu-gold text-2xl md:text-3xl font-medium">내면을 비추는 사명적 성찰</span>
        </h1>
      </div>

      {/* Academic Badge */}
      <button 
        onClick={onMethodology}
        className="w-full glass-card !p-5 flex items-center justify-between mb-8 group hover:bg-indigo-50 border-none cursor-pointer active:scale-[0.98]"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
            <GraduationCap size={24} />
          </div>
          <div className="text-left">
            <h3 className="text-sm font-black text-slate-900">학술적 타당성 및 연구 방법론</h3>
            <p className="text-xs text-slate-500 font-medium">심리측정학 기반 설계 · 실증 연구 인용</p>
          </div>
        </div>
        <ChevronRight size={20} className="text-slate-300 group-hover:text-indigo-500 transition-colors" />
      </button>

      <div className="space-y-4">
        {surveys.map((survey) => {
          const IconComponent = iconMap[survey.icon as keyof typeof iconMap];
          const t = themeMap[survey.color] || themeMap['blue'];
          return (
            <div 
              key={survey.id} 
              onClick={() => onSelectSurvey(survey)}
              className="glass-card !p-6 flex items-center justify-between cursor-pointer group hover:bg-white active:scale-[0.98]"
            >
              <div className="flex items-center gap-6">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 ${t.bgBg} ${t.text} group-hover:scale-110 transition-transform`}>
                  <IconComponent size={28} />
                </div>
                <div>
                  <h3 className="text-lg font-black text-toss-gray-900">{survey.name}</h3>
                  <p className="text-toss-gray-500 text-sm font-medium">{survey.subtitle}</p>
                </div>
              </div>
              <ChevronRight size={24} className="text-toss-gray-200 group-hover:text-brand-500 group-hover:translate-x-1 transition-all" />
            </div>
          );
        })}
      </div>
    </main>
  );
};
