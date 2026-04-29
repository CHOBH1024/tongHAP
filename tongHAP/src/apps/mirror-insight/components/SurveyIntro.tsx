import { SurveyConfig } from '../types';
import { ArrowLeft, Zap, Layers, Check } from 'lucide-react';
import { themeMap } from '../theme';
import { motion } from 'framer-motion';

interface SurveyIntroProps {
  survey: SurveyConfig;
  onBack: () => void;
  onStart: (mode: number) => void;
}

export const SurveyIntro = ({ survey, onBack, onStart }: SurveyIntroProps) => {
  const t = themeMap[survey.color] || themeMap['blue'];
  
  return (
    <div className="max-w-3xl mx-auto py-12 px-6 min-h-screen flex flex-col">
      <header className="mb-12">
        <button onClick={onBack} className="text-toss-gray-500 hover:text-brand-500 flex items-center gap-2 transition-colors font-bold group">
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> 뒤로 가기
        </button>
      </header>

      <div className="flex-1 flex flex-col justify-center">
        <div className="text-center mb-16 space-y-6">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`w-20 h-20 rounded-[2rem] ${t.bgBg} ${t.text} flex items-center justify-center mx-auto shadow-xl shadow-brand-500/10 mb-8`}
          >
             <Layers size={32} />
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-black text-toss-gray-900 tracking-tight leading-tight">
            {survey.name}<br />
            <span className="text-toss-gray-500 text-2xl md:text-3xl font-medium">{survey.subtitle}</span>
          </h1>
          <p className="text-toss-gray-500 text-lg font-medium max-w-md mx-auto">
            {survey.description}
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-black text-toss-gray-900 mb-6 px-2">진단 모드를 선택해주세요</h2>
          
          <button 
            onClick={() => onStart(30)}
            className="w-full glass-card !p-6 flex items-center justify-between group hover:bg-white active:scale-[0.98] border-none text-left"
          >
            <div className="flex items-center gap-6">
              <div className="w-14 h-14 bg-emerald-50 text-emerald-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Zap size={28} />
              </div>
              <div>
                <h3 className="text-xl font-black text-toss-gray-900">초고속 진단</h3>
                <p className="text-toss-gray-500 text-sm font-medium">30문항 · 약 3분 소요</p>
              </div>
            </div>
            <Check size={24} className="text-toss-gray-200 group-hover:text-emerald-500 transition-colors" />
          </button>

          <button 
            onClick={() => onStart(70)}
            className="w-full glass-card !p-6 flex items-center justify-between group hover:bg-white active:scale-[0.98] border-none text-left"
          >
            <div className="flex items-center gap-6">
              <div className="w-14 h-14 bg-brand-50 text-brand-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Layers size={28} />
              </div>
              <div>
                <h3 className="text-xl font-black text-toss-gray-900">핵심 역량 진단</h3>
                <p className="text-toss-gray-500 text-sm font-medium">70문항 · 약 7분 소요</p>
              </div>
            </div>
            <Check size={24} className="text-toss-gray-200 group-hover:text-brand-500 transition-colors" />
          </button>

          <button 
            onClick={() => onStart(120)}
            className="w-full glass-card !p-6 flex items-center justify-between group !bg-brand-500 active:scale-[0.98] border-none text-left shadow-lg shadow-brand-500/20"
          >
            <div className="flex items-center gap-6">
              <div className="w-14 h-14 bg-white/20 text-white rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Layers size={28} />
              </div>
              <div>
                <h3 className="text-xl font-black text-white">심층 정밀 분석</h3>
                <p className="text-white/70 text-sm font-medium">120문항 · 약 12분 소요</p>
              </div>
            </div>
            <Check size={24} className="text-white/30 group-hover:text-white transition-colors" />
          </button>
        </div>
      </div>
    </div>
  );
};
