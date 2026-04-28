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
      <div className="flex justify-between items-center mb-8">
        <button onClick={onHome} className="text-slate-400 hover:text-white flex items-center gap-2 transition-colors">
          <ArrowLeft size={16} /> 홈으로
        </button>
        <button onClick={onRestart} className="px-4 py-2 bg-slate-800 text-white rounded-full text-sm font-bold hover:bg-slate-700 transition-colors">
          다시하기
        </button>
      </div>

      <div className="bg-slate-900 text-slate-200 rounded-[3rem] shadow-2xl p-10 md:p-16 border border-slate-800 relative overflow-hidden">
        <div className={`absolute top-0 left-0 w-full h-3 ${t.bg}`}></div>
        
        <div className="text-center mb-16">
          <span className={`${t.text} font-black text-sm tracking-widest uppercase mb-4 block`}>최종 진단 결과 (The Result)</span>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-6 word-keep">{resultData.persona}</h1>
          <p className="text-slate-400 text-xl font-bold">{resultData.headline}</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="bg-slate-950 rounded-[2rem] p-6 h-[400px] flex justify-center items-center border border-slate-800">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                <PolarGrid stroke="#334155" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#cbd5e1', fontSize: 13, fontWeight: 'bold' }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar name={survey.name} dataKey="A" stroke={strokeColor} fill={strokeColor} fillOpacity={0.3} strokeWidth={3} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          
          <div className="space-y-4">
            {radarData.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center p-4 bg-slate-800 rounded-2xl">
                <span className="font-bold text-slate-300">{item.subject}</span>
                <div className="flex items-center gap-4">
                  <div className="w-32 h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div className={`h-full ${t.bg}`} style={{ width: `${item.A}%` }}></div>
                  </div>
                  <span className={`font-black ${t.text} w-8 text-right`}>{item.A}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-12">
          <section>
            <h3 className="text-2xl font-black text-white mb-6 flex items-center gap-2">
              <span className={`w-8 h-8 rounded-full ${t.bgBg} ${t.text} flex items-center justify-center text-sm`}>1</span>
              상세 프로파일
            </h3>
            <p className="text-slate-300 leading-relaxed text-lg whitespace-pre-line bg-slate-800 p-8 rounded-3xl">
              {resultData.description}
            </p>
          </section>

          <div className="grid md:grid-cols-2 gap-8">
            <section className="bg-emerald-950/30 p-8 rounded-3xl border border-emerald-900/50">
              <h3 className="text-xl font-black text-emerald-400 mb-4 flex items-center gap-2">🔥 고유의 강점</h3>
              <ul className="space-y-3">
                {resultData.strengths.map((s, i) => (
                  <li key={i} className="flex gap-3 text-emerald-100 leading-relaxed text-sm">
                    <span className="text-emerald-500 mt-1">✔</span> {s}
                  </li>
                ))}
              </ul>
            </section>

            <section className="bg-rose-950/30 p-8 rounded-3xl border border-rose-900/50">
              <h3 className="text-xl font-black text-rose-400 mb-4 flex items-center gap-2">⚠️ 잠재적 약점</h3>
              <ul className="space-y-3">
                {resultData.weaknesses.map((s, i) => (
                  <li key={i} className="flex gap-3 text-rose-100 leading-relaxed text-sm">
                    <span className="text-rose-500 mt-1">!</span> {s}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <section className={`${t.bgBg} ${t.border} border p-10 rounded-3xl`}>
            <h3 className={`text-2xl font-black mb-6 ${t.text} flex items-center gap-2`}>
              💡 시스템 분석 제언
            </h3>
            <p className="text-slate-300 leading-relaxed text-lg whitespace-pre-line">
              {resultData.advice}
            </p>
          </section>
        </div>

      </div>
    </div>
  );
};
