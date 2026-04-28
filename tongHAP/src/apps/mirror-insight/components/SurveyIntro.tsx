import { SurveyConfig } from '../types';
import { ArrowLeft } from 'lucide-react';
import { themeMap } from '../theme';

interface SurveyIntroProps {
  survey: SurveyConfig;
  onBack: () => void;
  onStart: (mode: number) => void;
}

export const SurveyIntro = ({ survey, onBack, onStart }: SurveyIntroProps) => {
  const t = themeMap[survey.color] || themeMap['blue'];
  return (
    <div className="max-w-3xl mx-auto py-24 px-6 min-h-screen flex flex-col justify-center">
      <button onClick={onBack} className="text-slate-400 hover:text-white flex items-center gap-2 mb-12 w-fit transition-colors group">
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Modules
      </button>

      <div className="text-center mb-16">
        <span className={`px-4 py-1.5 rounded-full ${t.bgBg} ${t.text} text-xs font-bold tracking-widest uppercase mb-6 inline-block ${t.border}`}>
          {survey.name}
        </span>
        <h1 className="text-5xl md:text-6xl font-black text-white mb-6 leading-tight tracking-tight">
          {survey.title}
        </h1>
        <p className="text-slate-400 text-lg md:text-xl leading-relaxed">
          {survey.subtitle}
        </p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 mb-8">
        <h2 className="text-xl font-bold text-white mb-6 text-center">진단 모드 선택 (Mode Selection)</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <button onClick={() => onStart(30)} className="mirror-glass-card p-6 rounded-2xl flex flex-col items-center hover:bg-slate-800/80 transition-all hover:-translate-y-1">
            <h3 className="text-2xl font-black text-white mb-2">30 문항</h3>
            <p className="text-slate-400 text-sm text-center">핵심 성향 파악<br/>(약 3분 소요)</p>
          </button>
          <button onClick={() => onStart(70)} className="mirror-glass-card p-6 rounded-2xl flex flex-col items-center hover:bg-slate-800/80 transition-all hover:-translate-y-1">
            <h3 className="text-2xl font-black text-white mb-2">70 문항</h3>
            <p className="text-slate-400 text-sm text-center">심층 가치관 분석<br/>(약 7분 소요)</p>
          </button>
          <button onClick={() => onStart(120)} className={`${t.bgBg} ${t.border} p-6 rounded-2xl flex flex-col items-center hover:brightness-125 transition-all hover:-translate-y-1`}>
            <h3 className={`text-2xl font-black ${t.text} mb-2`}>120 문항</h3>
            <p className={`${t.text} opacity-80 text-sm text-center`}>최고 해상도 정밀 진단<br/>(약 12분 소요)</p>
          </button>
        </div>
      </div>
    </div>
  );
};
