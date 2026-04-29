import { SurveyConfig, SurveyResultContent } from '../types';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { ArrowLeft } from 'lucide-react';
import { themeMap } from '../theme';

interface SurveyResultsProps {
  survey: SurveyConfig;
  answers: Record<number, number>;
  onRestart: () => void;
  onHome: () => void;
}

export const SurveyResults = ({ survey, answers, onRestart, onHome }: SurveyResultsProps) => {
  const t = themeMap[survey.color] || themeMap['blue'];
  
  const categoryScores: Record<number, { sum: number, count: number }> = {};
  
  Object.keys(answers).forEach(idxStr => {
    const idx = parseInt(idxStr);
    const q = survey.questions[idx % Math.max(survey.questions.length, 1)];
    if (!q) return;

    let val = answers[idx];
    if (q.t === 'R') val = 6 - val; 
    
    if (!categoryScores[q.c]) categoryScores[q.c] = { sum: 0, count: 0 };
    categoryScores[q.c].sum += val;
    categoryScores[q.c].count += 1;
  });

  const categories = survey.categories;
  const radarData = categories.map((catName, index) => {
    const cIndex = index + 1;
    const stat = categoryScores[cIndex] || { sum: 0, count: 1 };
    const rawRatio = stat.count > 0 ? (stat.sum / (stat.count * 5)) : 0;
    const finalScore = Math.round(rawRatio * 100);
    return {
      subject: catName,
      A: finalScore,
      fullMark: 100,
    };
  });

  const totalScore = radarData.reduce((acc, curr) => acc + curr.A, 0) / (radarData.length || 1);
  const resultData = survey.getResultContent(totalScore, radarData.map(r => r.A));

  // Determine actual stroke color based on survey.color, simplified here
  const strokeColor = survey.color === 'amber' ? '#f59e0b' : 
                      survey.color === 'teal' ? '#14b8a6' :
                      survey.color === 'emerald' ? '#10b981' :
                      survey.color === 'violet' ? '#8b5cf6' :
                      survey.color === 'indigo' ? '#6366f1' :
                      survey.color === 'rose' ? '#f43f5e' :
                      survey.color === 'lime' ? '#84cc16' :
                      survey.color === 'sky' ? '#0ea5e9' : '#3b82f6';

  return (
    <div className="max-w-5xl mx-auto py-12 px-6 min-h-screen">
      <div className="flex justify-between items-center mb-10">
        <button onClick={onHome} className="text-slate-500 hover:text-brand-500 flex items-center gap-2 transition-colors font-bold group">
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> 통합 홈으로
        </button>
        <button onClick={onRestart} className="premium-btn-secondary px-6 py-2 py-2 rounded-full text-sm">
          다시하기
        </button>
      </div>

      <div className="glass-card !p-10 md:!p-16 relative overflow-hidden border-none shadow-2xl">
        <div className={`absolute top-0 left-0 w-full h-2 ${t.bg}`}></div>
        
        <div className="text-center mb-16">
          <span className={`${t.text} font-black text-sm tracking-[0.2em] uppercase mb-4 block`}>최종 진단 결과 (The Result)</span>
          <h1 className="text-4xl md:text-5xl font-black text-brand-900 mb-6 word-keep">{resultData.persona}</h1>
          <p className="text-slate-500 text-xl font-bold">{resultData.headline}</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="bg-slate-50 rounded-[2rem] p-6 h-[400px] flex justify-center items-center border border-slate-100 shadow-inner">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 13, fontWeight: 'bold' }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar name={survey.name} dataKey="A" stroke={strokeColor} fill={strokeColor} fillOpacity={0.2} strokeWidth={3} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          
          <div className="space-y-4">
            {radarData.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center p-5 bg-white border border-slate-100 rounded-2xl shadow-sm">
                <span className="font-bold text-slate-600">{item.subject}</span>
                <div className="flex items-center gap-4">
                  <div className="w-32 h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className={`h-full ${t.bg} rounded-full`} style={{ width: `${item.A}%` }}></div>
                  </div>
                  <span className={`font-black ${t.text} w-8 text-right`}>{item.A}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-12">
          <section>
            <h3 className="text-2xl font-black text-brand-900 mb-6 flex items-center gap-3">
              <span className={`w-10 h-10 rounded-xl ${t.bgBg} ${t.text} flex items-center justify-center text-lg shadow-lg shadow-brand-500/10`}>1</span>
              상세 프로파일
            </h3>
            <p className="text-slate-600 leading-relaxed text-lg whitespace-pre-line bg-slate-50 p-10 rounded-[2rem] border border-slate-100 font-medium">
              {resultData.description}
            </p>
          </section>

          <div className="grid md:grid-cols-2 gap-8">
            <section className="bg-emerald-50 p-8 rounded-[2rem] border border-emerald-100">
              <h3 className="text-xl font-black text-emerald-600 mb-6 flex items-center gap-2">🔥 고유의 강점</h3>
              <ul className="space-y-4">
                {resultData.strengths.map((s, i) => (
                  <li key={i} className="flex gap-3 text-emerald-800 leading-relaxed text-sm font-bold">
                    <span className="text-emerald-500 mt-1">✔</span> {s}
                  </li>
                ))}
              </ul>
            </section>

            <section className="bg-rose-50 p-8 rounded-[2rem] border border-rose-100">
              <h3 className="text-xl font-black text-rose-600 mb-6 flex items-center gap-2">⚠️ 잠재적 약점</h3>
              <ul className="space-y-4">
                {resultData.weaknesses.map((s, i) => (
                  <li key={i} className="flex gap-3 text-rose-800 leading-relaxed text-sm font-bold">
                    <span className="text-rose-500 mt-1">!</span> {s}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <section className={`${t.bgBg} ${t.border} border-2 p-10 rounded-[2rem] shadow-xl shadow-brand-500/5`}>
            <h3 className={`text-2xl font-black mb-6 ${t.text} flex items-center gap-3`}>
              💡 시스템 분석 제언
            </h3>
            <p className="text-slate-700 leading-relaxed text-lg whitespace-pre-line font-medium">
              {resultData.advice}
            </p>
          </section>
        </div>

      </div>
    </div>
  );
};
