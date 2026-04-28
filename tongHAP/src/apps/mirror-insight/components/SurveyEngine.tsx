import { useState, useMemo } from 'react';
import { SurveyConfig } from '../types';
import { themeMap } from '../theme';

interface SurveyEngineProps {
  survey: SurveyConfig;
  modeLimit: number;
  onComplete: (answers: Record<number, number>) => void;
}

export const SurveyEngine = ({ survey, modeLimit, onComplete }: SurveyEngineProps) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const t = themeMap[survey.color] || themeMap['blue'];

  // Use up to 'modeLimit' questions by safely wrapping around if there aren't enough unique ones.
  const activeQuestions = useMemo(() => {
    const list = [];
    for (let i = 0; i < modeLimit; i++) {
        list.push(survey.questions[i % Math.max(survey.questions.length, 1)]);
    }
    return list;
  }, [survey.questions, modeLimit]);

  if (activeQuestions.length === 0 || !activeQuestions[0]) {
    return <div className="text-center py-24 text-slate-400">Loading or missing questions for {survey.name}...</div>;
  }

  const question = activeQuestions[currentIdx];
  const isDilemma = question.t === 'V';
  
  const progress = ((currentIdx) / activeQuestions.length) * 100;

  const submitAnswer = (val: number) => {
    const newAnswers = { ...answers, [currentIdx]: val };
    setAnswers(newAnswers);
    
    setTimeout(() => {
      if (currentIdx < activeQuestions.length - 1) {
        setCurrentIdx(currentIdx + 1);
      } else {
        onComplete(newAnswers);
      }
    }, 300);
  };

  return (
    <div className="max-w-2xl mx-auto py-24 px-6 min-h-screen flex flex-col justify-center">
      <div className="w-full bg-white/5 h-2 rounded-full mb-12">
        <div className={`h-full ${t.bg} rounded-full transition-all duration-300`} style={{ width: `${progress}%` }} />
      </div>
      
      <div className={`mirror-glass-card p-10 md:p-14 rounded-[3rem] text-center ${t.border} bg-slate-900/50`}>
        <span className={`${t.text} font-bold text-xs tracking-widest uppercase mb-4 block`}>
          {survey.name} — Q. {currentIdx + 1} / {activeQuestions.length}
        </span>
        
        <h2 className="text-2xl md:text-3xl font-black text-white leading-snug mb-16 word-keep">
          {question.q}
        </h2>
        
        {isDilemma ? (
          <div className="grid grid-cols-2 gap-4 md:gap-6 mb-4">
            <button onClick={() => submitAnswer(1)} className="p-6 md:p-8 rounded-3xl bg-slate-800/80 hover:bg-slate-700 border border-white/5 transition-all text-left">
              <span className={`block ${t.text} font-bold mb-2`}>{question.left}</span>
              <p className="text-slate-300 text-sm">{question.descL}</p>
            </button>
            <button onClick={() => submitAnswer(5)} className="p-6 md:p-8 rounded-3xl bg-slate-800/80 hover:bg-slate-700 border border-white/5 transition-all text-right">
              <span className={`block ${t.text} font-bold mb-2`}>{question.right}</span>
              <p className="text-slate-300 text-sm">{question.descR}</p>
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex justify-between text-[10px] font-bold text-slate-500 mb-2 px-2"><span>전혀 아니다</span><span>매우 그렇다</span></div>
            <div className="grid grid-cols-5 gap-2 md:gap-4">
              {[1, 2, 3, 4, 5].map((val) => (
                <button key={val} onClick={() => submitAnswer(val)} className={`py-4 md:py-6 bg-slate-800/80 hover:${t.bg} rounded-2xl font-black text-lg text-slate-400 hover:text-white transition-all`}>
                  {val}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

