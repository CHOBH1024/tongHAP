// @ts-nocheck
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

  const activeQuestions = useMemo(() => {
    const totalNeeded = modeLimit;
    const categoriesCount = survey.categories.length;
    const perCategory = Math.floor((totalNeeded - (totalNeeded > 70 ? 20 : 5)) / categoriesCount);

    const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);

    let selected: any[] = [];

    // 1. 각 카테고리별로 셔플 후 중복 없이 추출
    for (let c = 1; c <= categoriesCount; c++) {
      const catQs = shuffle(survey.questions.filter(q => q.c === c && q.t !== 'V'));
      selected.push(...catQs.slice(0, Math.min(perCategory, catQs.length)));
    }

    // 2. V 문항 중복 없이 추출
    const vQs = shuffle(survey.questions.filter(q => q.t === 'V'));
    const vCount = totalNeeded > 70 ? 10 : 5;
    selected.push(...vQs.slice(0, Math.min(vCount, vQs.length)));

    // 3. 부족한 슬롯은 미사용 문항에서 채움
    if (selected.length < totalNeeded) {
      const usedSet = new Set(selected);
      const remaining = shuffle(survey.questions.filter(q => !usedSet.has(q)));
      selected.push(...remaining.slice(0, totalNeeded - selected.length));
    }

    return shuffle(selected).slice(0, totalNeeded);
  }, [survey.questions, modeLimit, survey.categories]);

  if (activeQuestions.length === 0 || !activeQuestions[0]) {
    return <div className="text-center py-24 text-slate-500 font-medium">진단 문항을 불러오는 중입니다...</div>;
  }

  const question = activeQuestions[currentIdx];
  const isDilemma = question.t === 'V';

  const progress = (currentIdx / activeQuestions.length) * 100;

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

  const optsScore = (i: number, n: number) =>
    Math.round(5 - (i * 4) / Math.max(n - 1, 1));

  return (
    <div className="max-w-2xl mx-auto py-24 px-6 min-h-screen flex flex-col justify-center">
      <div className="w-full bg-brand-100 h-3 rounded-full mb-12 overflow-hidden shadow-inner">
        <div
          className={`h-full ${t.bg} rounded-full transition-all duration-500 ease-out`}
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className={`glass-card p-10 md:p-14 text-center border-t-4 ${t.border}`}>
        <span className={`${t.text} font-bold text-xs tracking-[0.2em] uppercase mb-6 block`}>
          {survey.name} — Q. {currentIdx + 1} / {activeQuestions.length}
        </span>

        <h2 className="text-2xl md:text-3xl font-black text-brand-900 leading-snug mb-16 word-keep">
          {question.q}
        </h2>

        {!isDilemma ? (
          <div className="space-y-4">
            <div className="flex justify-between text-[10px] font-bold text-slate-500 mb-2 px-2">
              <span>전혀 아니다</span><span>매우 그렇다</span>
            </div>
            <div className="grid grid-cols-5 gap-2 md:gap-4">
              {[1, 2, 3, 4, 5].map((val) => (
                <button
                  key={val}
                  onClick={() => submitAnswer(val)}
                  className="py-4 md:py-6 bg-white border-2 border-slate-100 hover:border-brand-500 hover:bg-brand-50 rounded-2xl font-black text-xl text-slate-400 hover:text-brand-500 shadow-sm transition-all"
                >
                  {val}
                </button>
              ))}
            </div>
          </div>
        ) : question.opts ? (
          <div className="space-y-3 text-left">
            {question.opts.map((opt, i) => (
              <button
                key={i}
                onClick={() => submitAnswer(optsScore(i, question.opts.length))}
                className="w-full p-5 rounded-2xl bg-white border border-slate-200 hover:border-brand-500 hover:bg-brand-50 text-left font-bold transition-all"
              >
                <span className={`${t.text} font-black mr-3`}>{String.fromCharCode(65 + i)}.</span>
                <span className="text-slate-700">{opt}</span>
              </button>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 md:gap-6 mb-4">
            <button
              onClick={() => submitAnswer(1)}
              className="p-6 md:p-8 rounded-3xl bg-white border border-slate-200 hover:border-brand-500 hover:bg-brand-50 shadow-sm transition-all text-left group"
            >
              <span className={`block ${t.text} font-bold mb-2 group-hover:scale-105 transition-transform`}>{question.left}</span>
              <p className="text-slate-500 text-sm font-medium">{question.descL}</p>
            </button>
            <button
              onClick={() => submitAnswer(5)}
              className="p-6 md:p-8 rounded-3xl bg-white border border-slate-200 hover:border-brand-500 hover:bg-brand-50 shadow-sm transition-all text-right group"
            >
              <span className={`block ${t.text} font-bold mb-2 group-hover:scale-105 transition-transform`}>{question.right}</span>
              <p className="text-slate-500 text-sm font-medium">{question.descR}</p>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
