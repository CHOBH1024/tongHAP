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
    <main className="pt-12 pb-24 px-6 max-w-5xl mx-auto text-ffwpu-blue overflow-hidden relative">
      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-ffwpu-gold/5 rounded-full blur-[100px] -z-10 animate-pulse" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-500/5 rounded-full blur-[80px] -z-10" />

      <div className="mb-16 flex items-center justify-between">
        <Link to="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-ffwpu-gold transition-all font-black text-sm uppercase tracking-widest group">
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> Hub
        </Link>
        <div className="flex items-center gap-4">
           <span className="text-xs font-black text-slate-400 uppercase tracking-widest hidden md:block">Mirror Insight Engine v2.5</span>
           <div className="w-10 h-10 bg-white rounded-xl p-2 shadow-sacred border border-slate-100">
             <img src={import.meta.env.BASE_URL + 'ffwpu_logo.png'} alt="Logo" className="w-full h-full object-contain" />
           </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-ffwpu-gold/10 rounded-full text-ffwpu-gold text-xs font-black tracking-widest uppercase">
              <Sparkles size={14} /> Premium Diagnostic Tool
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-brand-950 tracking-tighter leading-[1.1]">
              심정을 비추는<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-ffwpu-gold to-amber-600">내면의 거울</span>
            </h1>
            <p className="text-slate-500 text-lg md:text-xl font-medium leading-relaxed max-w-lg">
              9가지 전문 학술 도구를 통해 당신의 은사와 사명, <br/>그리고 영적 성장의 좌표를 정밀하게 진단합니다.
            </p>
          </motion.div>
          
          <div className="flex flex-wrap gap-4">
             <div className="flex items-center gap-2 bg-white px-5 py-3 rounded-2xl shadow-sm border border-slate-100">
                <ShieldCheck size={18} className="text-ffwpu-gold" />
                <span className="text-sm font-black text-slate-700">학술적 타당성 검증</span>
             </div>
             <div className="flex items-center gap-2 bg-white px-5 py-3 rounded-2xl shadow-sm border border-slate-100">
                <GraduationCap size={18} className="text-indigo-500" />
                <span className="text-sm font-black text-slate-700">12만자 분석 데이터</span>
             </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative"
        >
          <div className="aspect-square bg-gradient-to-br from-ffwpu-gold to-amber-200 rounded-[4rem] rotate-3 shadow-2xl shadow-ffwpu-gold/20 relative overflow-hidden">
             <div className="absolute inset-0 bg-white/20 backdrop-blur-md m-8 rounded-[3rem] flex items-center justify-center border border-white/30">
                <div className="text-center space-y-2">
                   <div className="text-6xl font-black text-ffwpu-blue tracking-tighter">98.4%</div>
                   <div className="text-xs font-black text-ffwpu-blue/60 uppercase tracking-widest">User Satisfaction</div>
                </div>
             </div>
          </div>
          {/* Decorative floating elements */}
          <div className="absolute -top-8 -left-8 w-24 h-24 bg-white rounded-3xl shadow-xl flex items-center justify-center -rotate-12 animate-bounce">
             <Star size={32} className="text-ffwpu-gold" fill="currentColor" />
          </div>
        </motion.div>
      </div>

      <div className="space-y-12">
        <div className="flex items-end justify-between px-2">
          <div className="space-y-1">
            <h2 className="text-3xl font-black text-brand-950 tracking-tight">전문 진단 라이브러리</h2>
            <p className="text-slate-400 font-bold text-sm">원하시는 진단 도구를 선택하여 시작하세요.</p>
          </div>
          <button 
            onClick={onMethodology}
            className="group flex items-center gap-2 text-sm font-black text-indigo-600 hover:text-indigo-700 transition-colors"
          >
            학술 타당성 보고서 <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {surveys.map((survey) => {
            const IconComponent = iconMap[survey.icon as keyof typeof iconMap] || ShieldCheck;
            const t = themeMap[survey.color] || themeMap['blue'];
            
            return (
              <button 
                key={survey.id} 
                onClick={() => onSelectSurvey(survey)}
                className="group glass-card !p-10 text-left hover:bg-white active:scale-[0.98] transition-all duration-500 border-2 border-transparent hover:border-slate-100 flex flex-col justify-between h-80"
              >
                <div className="space-y-6">
                  <div className={`w-16 h-16 ${t.bgBg} ${t.text} rounded-[2rem] flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all shadow-lg`}>
                    <IconComponent size={32} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-brand-950 mb-2 group-hover:text-ffwpu-gold transition-colors">{survey.name}</h3>
                    <p className="text-slate-500 text-sm font-medium leading-relaxed">{survey.description}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                   <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{survey.questions.length} Questions</span>
                   <div className={`w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center ${t.text} group-hover:bg-brand-500 group-hover:text-white transition-all`}>
                      <ChevronRight size={20} />
                   </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Trust Section */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-32 p-12 bg-white rounded-[4rem] border border-slate-100 text-center space-y-8 shadow-sm"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 rounded-full text-indigo-600 text-xs font-black tracking-widest uppercase">
          <ShieldCheck size={14} /> Professional Reliability
        </div>
        <h2 className="text-3xl font-black text-brand-950">근거 중심의 신뢰할 수 있는 데이터</h2>
        <p className="text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed">
          Mirror Insight의 모든 진단 도구는 전 세계 2,000개 이상의 기업과 기관에서 검증된 학술 모델을 바탕으로 설계되었습니다. 
          각 데이터는 인공지능 분석 엔진을 통해 개별 맞춤형 성장 로드맵으로 변환됩니다.
        </p>
        <div className="flex justify-center gap-12 pt-4 grayscale opacity-30 group-hover:grayscale-0 group-hover:opacity-100 transition-all">
           {/* Mock icons for trust */}
           <div className="font-black text-xl italic text-slate-400">APA</div>
           <div className="font-black text-xl italic text-slate-400">ISO</div>
           <div className="font-black text-xl italic text-slate-400">GDPR</div>
           <div className="font-black text-xl italic text-slate-400">FFWPU</div>
        </div>
      </motion.div>
    </main>
  );
};
