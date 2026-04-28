import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, CheckCircle2, RotateCcw } from 'lucide-react';
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  ResponsiveContainer 
} from 'recharts';

interface Question {
  id: number;
  text: string;
  dimension: string;
}

interface DiagnosticTestProps {
  moduleName: string;
  dimensions: string[];
  onClose: () => void;
}

const mockQuestions: Question[] = [
  { id: 1, text: "나는 나의 삶이 명확한 소명(Calling)에 의해 이끌리고 있다고 느낀다.", dimension: "소명" },
  { id: 2, text: "어려운 상황에서도 정직함(Integrity)을 지키는 것이 가장 중요하다고 생각한다.", dimension: "정직" },
  { id: 3, text: "타인의 고통이나 감정에 깊이 공감(Empathy)하며 행동한다.", dimension: "공감" },
  { id: 4, text: "실패나 좌절을 겪었을 때 빠르게 회복(Resilience)하고 다시 도전한다.", dimension: "회복" },
  { id: 5, text: "내가 하는 모든 일에 열정(Passion)을 쏟아부어 최선을 다한다.", dimension: "열정" },
  { id: 6, text: "나의 가치관은 행동과 일치하며 모순되지 않는다.", dimension: "정직" },
];

export const DiagnosticTest: React.FC<DiagnosticTestProps> = ({ moduleName, dimensions, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [isFinished, setIsFinished] = useState(false);

  const currentQuestion = mockQuestions[currentStep % mockQuestions.length];
  const progress = ((currentStep + 1) / 120) * 100; // Assuming 120 questions total

  const handleAnswer = (value: number) => {
    setAnswers({ ...answers, [currentStep]: value });
    if (currentStep < 5) { // Just for demo, limit to 6 questions
      setCurrentStep(currentStep + 1);
    } else {
      setIsFinished(true);
    }
  };

  const calculateResults = () => {
    return dimensions.map(dim => ({
      subject: dim,
      A: Math.floor(Math.random() * 60) + 40, // Mock score
      fullMark: 100,
    }));
  };

  if (isFinished) {
    const data = calculateResults();
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass p-8 max-w-4xl mx-auto"
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="text-green-500" size={32} />
          </div>
          <h2 className="text-3xl font-bold mb-2">{moduleName} 진단 완료</h2>
          <p className="text-slate-400">당신의 내면을 비추는 5가지 역량 지표입니다.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
                <PolarGrid stroke="#334155" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <Radar
                  name="Score"
                  dataKey="A"
                  stroke="#8b5cf6"
                  fill="#8b5cf6"
                  fillOpacity={0.6}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-4">
            {data.map((item) => (
              <div key={item.subject} className="bg-white/5 p-4 rounded-xl">
                <div className="flex justify-between mb-2">
                  <span className="font-medium">{item.subject}</span>
                  <span className="text-indigo-400 font-bold">{item.A}점</span>
                </div>
                <div className="w-full bg-slate-700 h-1.5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${item.A}%` }}
                    className="h-full gradient-bg" 
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex justify-center gap-4">
          <button onClick={onClose} className="px-6 py-3 glass rounded-xl hover:bg-white/10">
            목록으로
          </button>
          <button 
            onClick={() => {
              setCurrentStep(0);
              setAnswers({});
              setIsFinished(false);
            }}
            className="px-6 py-3 gradient-bg rounded-xl font-semibold flex items-center gap-2"
          >
            <RotateCcw size={18} /> 다시 진단하기
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto"
    >
      <div className="flex items-center justify-between mb-8">
        <button onClick={onClose} className="text-slate-400 hover:text-white flex items-center gap-2 transition-colors">
          <ChevronLeft size={20} /> 그만두기
        </button>
        <div className="text-sm font-medium text-slate-400">
          질문 {currentStep + 1} <span className="text-slate-600">/ 120</span>
        </div>
      </div>

      <div className="mb-12">
        <div className="w-full bg-slate-800 h-1 rounded-full overflow-hidden">
          <motion.div 
            className="h-full gradient-bg"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="glass p-10 mb-12">
        <span className="inline-block px-3 py-1 bg-indigo-500/20 text-indigo-400 rounded-full text-xs font-bold mb-6 tracking-wider">
          {currentQuestion.dimension}
        </span>
        <h3 className="text-2xl font-bold leading-tight mb-12">
          {currentQuestion.text}
        </h3>

        <div className="grid grid-cols-1 gap-3">
          {[
            { value: 5, label: "매우 그렇다" },
            { value: 4, label: "그렇다" },
            { value: 3, label: "보통이다" },
            { value: 2, label: "아니다" },
            { value: 1, label: "매우 아니다" },
          ].map((option) => (
            <button
              key={option.value}
              onClick={() => handleAnswer(option.value)}
              className="w-full p-5 text-left glass hover:bg-white/10 border-white/5 hover:border-indigo-500/50 transition-all flex justify-between items-center group"
            >
              <span className="font-medium group-hover:text-indigo-400">{option.label}</span>
              <ChevronRight size={18} className="text-slate-600 group-hover:text-indigo-400" />
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
