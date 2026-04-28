import { ShieldCheck, Mic, ScanFace, Compass, Users, Headphones, Sparkles, Coffee, Star, ArrowLeft } from 'lucide-react';
import { SurveyConfig } from '../types';
import { surveys } from '../data/surveys';
import { themeMap } from '../theme';
import { Link } from '@tanstack/react-router';

interface DashboardProps {
  onSelectSurvey: (config: SurveyConfig) => void;
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

export const Dashboard = ({ onSelectSurvey }: DashboardProps) => {
  return (
    <main className="pt-12 pb-16 px-6 max-w-[1400px] mx-auto text-slate-200">
      <div className="mb-12">
        <Link to="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-white transition-colors font-bold group">
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> 통합 커맨드 센터로 돌아가기
        </Link>
      </div>

      <div className="text-center mb-16">
        <h1 className="text-6xl font-black text-white mb-6 tracking-tighter">Mirror Insight System</h1>
        <p className="text-slate-400 text-xl font-light">Select a diagnostic module to begin your journey of reflection.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {surveys.map((survey) => {
          const IconComponent = iconMap[survey.icon as keyof typeof iconMap];
          const t = themeMap[survey.color] || themeMap['blue'];
          return (
            <div 
              key={survey.id} 
              onClick={() => onSelectSurvey(survey)}
              className="mirror-glass-card rounded-3xl p-8 cursor-pointer hover:bg-slate-800/70 transition-all hover:-translate-y-2 group"
            >
              <div className={`p-4 rounded-2xl w-fit mb-6 ${t.bgBg} ${t.text} group-hover:scale-110 transition-transform`}>
                <IconComponent size={32} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">{survey.name}</h3>
              <p className="text-slate-400 text-sm mb-4">{survey.subtitle}</p>
              <div className={`${t.text} text-sm font-semibold group-hover:underline`}>Start Diagnostic →</div>
            </div>
          );
        })}
      </div>
    </main>
  );
};
