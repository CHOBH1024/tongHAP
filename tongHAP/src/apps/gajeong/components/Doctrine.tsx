import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, 
  Sun, 
  Globe, 
  Cross, 
  ShieldCheck, 
  Trophy, 
  X, 
  BookOpen, 
  ChevronRight,
  Flame,
  Star,
  Quote
} from 'lucide-react';

export const Doctrine: React.FC = () => {
  const [activeQuiz, setActiveQuiz] = useState<string | null>(null);
  const [studyMode, setStudyMode] = useState<string | null>(null);
  const [quizIndex, setQuizIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [xp, setXp] = useState(1250);
  const [showResult, setShowResult] = useState(false);

  // Persistence
  useEffect(() => {
    const savedXp = localStorage.getItem('gajeong_xp');
    if (savedXp) setXp(parseInt(savedXp));
  }, []);

  useEffect(() => {
    localStorage.setItem('gajeong_xp', xp.toString());
  }, [xp]);

  const modules = [
    { 
      id: 'creation', 
      title: '창조원리', 
      icon: <Sun size={32} />, 
      color: 'blue', 
      desc: '하나님의 창조 목적과 우주 형성의 원리, 이상가정의 비전을 배웁니다.',
      summary: '창조원리는 하나님이 왜 우주와 인간을 만드셨는지를 설명합니다. 핵심은 "참사랑을 통한 기쁨"이며, 모든 존재는 수수작용을 통해 생존하고 번식합니다. 인간은 하나님의 형상을 닮은 실체로서 3대 축복(개성완성, 가정완성, 주관권완성)을 이뤄야 합니다.',
      quiz: [
        { q: '하나님의 창조 목적은 무엇입니까?', options: ['기쁨', '권력', '지식', '인내'], a: 0 },
        { q: '모든 존재가 관계를 맺고 생존/번식하는 원동력은?', options: ['자유의지', '수수작용', '정분합작용', '탕감복귀'], a: 1 },
        { q: '하나님을 닮은 실체로서 인간이 이뤄야 할 궁극적 목표는?', options: ['경제적 자립', '이상가정 완성', '개인적 해탈', '학문적 성취'], a: 1 },
      ]
    },
    { 
      id: 'fall', 
      title: '타락론', 
      icon: <Cross size={32} />, 
      color: 'rose', 
      desc: '인류 역사의 고통과 죄악의 원인, 타락의 진실을 규명합니다.',
      summary: '타락론은 인류 불행의 기원을 다룹니다. 선악과는 실제 과일이 아닌 사랑의 정조를 상징하며, 천사장 루시엘과 인간 조상의 비원리적 사랑의 관계가 타락의 본질입니다. 이로 인해 인류는 사탄의 혈통을 이어받게 되었으며, 이를 청산하는 것이 복귀의 시작입니다.',
      quiz: [
        { q: '성서에 기록된 선악과의 본질적 상징은 무엇입니까?', options: ['문자 그대로의 열매', '천사의 유혹', '에바의 사랑(성적 타락)', '물질적 탐욕'], a: 2 },
        { q: '인간 타락의 결과로 초래된 가장 큰 비극은 무엇입니까?', options: ['육신의 죽음', '혈통의 더럽힘', '자연 만물의 상실', '과학 기술의 퇴보'], a: 1 },
        { q: '천사장 루시엘이 타락하게 된 근본적인 동기는?', options: ['권력 탐욕', '하나님 원망', '사랑의 감소감과 질투', '천사 세계 반란'], a: 2 }
      ]
    },
    { 
      id: 'restoration', 
      title: '복귀원리', 
      icon: <Globe size={32} />, 
      color: 'emerald', 
      desc: '타락한 인류를 회복시키려는 탕감복귀 노정과 재림의 필연성을 배웁니다.',
      summary: '복귀원리는 탕감복귀 섭리를 통해 인간을 창조본연의 상태로 되찾아오시는 하나님의 역사 노정입니다. 메시아를 맞이하기 위해서는 "믿음의 기대"와 "실체기대"를 세워야 합니다. 아담 가정부터 시작된 이 노정은 오늘날 재림주님을 통해 완성에 이르게 됩니다.',
      quiz: [
        { q: '타락한 인간이 창조본연의 상태로 돌아가기 위해 치러야 하는 원칙은?', options: ['자연 치유', '시간의 경과', '탕감 복귀', '무조건적 은혜'], a: 2 },
        { q: '메시아를 맞이하기 위해 중심인물이 갖추어야 할 핵심 조건은?', options: ['재물과 권력', '믿음의 기대와 실체기대', '학문적 깨달음', '군사적 정복'], a: 1 },
        { q: '예수님이 십자가에 돌아가신 역사적 섭리의 의미는?', options: ['하나님의 예정된 뜻', '유대 민족의 불신에 의한 차선책', '로마 제국의 필연적 결과', '인간의 정치적 실패'], a: 1 }
      ]
    },
    { 
      id: 'parents', 
      title: '참부모론', 
      icon: <Heart size={32} />, 
      color: 'amber', 
      desc: '참부모님의 생애노정과 사상을 연구하고 축복의 가치를 내면화합니다.',
      summary: '참부모론은 승리하신 참부모님의 생애와 그 가치를 다룹니다. 참부모님은 원죄 없는 독생자, 독생녀로 오시어 성혼을 통해 인류의 참된 부모가 되셨습니다. 축복결혼은 혈통을 전환하여 하나님 중심한 이상가정을 이루는 구원의 완성입니다.',
      quiz: [
        { q: '참부모가 인류 역사상 가지는 가장 중요한 섭리적 의의는?', options: ['새로운 종교 창시', '접붙임을 통한 원죄 청산과 축복', '세계 경제 평등화', '정치 체제의 통합'], a: 1 },
        { q: '참부모님께서 선포하신 이상적 평화 세계의 이름은?', options: ['유토피아', '지상천국', '천일국', '에덴동산'], a: 2 },
        { q: '참사랑(True Love)의 본질적 특징이 아닌 것은?', options: ['위하여 사는 삶', '원수까지도 사랑함', '조건적인 보상 기대', '희생과 투입'], a: 2 }
      ]
    },
    { 
      id: 'eschatology', 
      title: '종말론/재림론', 
      icon: <Flame size={32} />, 
      color: 'orange', 
      desc: '인류 역사의 종말과 새로운 시대의 개막, 재림의 원리를 학습합니다.',
      summary: '종말론은 악의 주권이 선의 주권으로 교체되는 시기를 뜻합니다. 재림은 구름을 타고 오는 것이 아니라 지상에 인간의 모습으로 탄생하시는 것이며, 참부모님을 통해 그 예언이 성취되었습니다.',
      quiz: [
        { q: '종말의 진정한 의미는 무엇입니까?', options: ['지구의 파멸', '선의 주권으로의 전환', '심판과 형벌', '역사의 중단'], a: 1 },
        { q: '재림주님이 지상에 강림하시는 방식은?', options: ['구름 위에서', '환상 중에', '여인의 몸을 통해 탄생', '우주선 타고'], a: 2 }
      ]
    },
    { 
      id: 'mission', 
      title: '신종족메시아', 
      icon: <Star size={32} />, 
      color: 'violet', 
      desc: '가정연합 식구로서의 정체성과 종족 복귀를 위한 사명을 고취합니다.',
      summary: '신종족메시아는 참부모님을 대신하여 자신의 종족과 이웃을 구원하는 작은 메시아를 뜻합니다. 가정을 천국화하고 주변 430가정을 축복으로 이끄는 것이 목표입니다.',
      quiz: [
        { q: '신종족메시아의 핵심 목표 숫자는 몇 가입니까?', options: ['12가정', '70가정', '430가정', '1000가정'], a: 2 },
        { q: '신종족메시아 활동의 가장 기초가 되는 단위는?', options: ['개인', '참가정(축복가정)', '교회', '국가'], a: 1 }
      ]
    }
  ];

  const handleStartQuiz = (id: string) => {
    setActiveQuiz(id);
    setQuizIndex(0);
    setScore(0);
    setShowResult(false);
  };

  const handleAnswer = (selectedIndex: number) => {
    const mod = modules.find(m => m.id === activeQuiz);
    if (!mod) return;
    
    if (selectedIndex === mod.quiz[quizIndex].a) {
      setScore(prev => prev + 100);
    }
    
    if (quizIndex < mod.quiz.length - 1) {
      setQuizIndex(quizIndex + 1);
    } else {
      setShowResult(true);
      const earned = score + (selectedIndex === mod.quiz[quizIndex].a ? 100 : 0);
      setXp(prev => prev + earned);
    }
  };

  const level = Math.floor(xp / 1000) + 1;
  const progressInLevel = (xp % 1000) / 10;

  return (
    <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} className="max-w-5xl mx-auto space-y-12 pb-20 px-6">
      
      {/* Gamification Header */}
      <div className="toss-card border-none flex flex-col md:flex-row justify-between items-center gap-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
        <div className="flex items-center gap-6">
          <div className="relative">
            <div className="w-16 h-16 bg-toss-blue rounded-2xl flex items-center justify-center shadow-lg shadow-toss-blue/20">
              <Trophy className="text-white" size={32} />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-amber-500 text-white text-[10px] font-black px-2 py-1 rounded-lg border-2 border-white">
              LV.{level}
            </div>
          </div>
          <div>
            <div className="text-[10px] font-black text-toss-blue uppercase tracking-widest mb-1">Faith Quest</div>
            <h2 className="text-2xl font-black text-toss-gray-900 tracking-tight">신앙의 탐구자</h2>
          </div>
        </div>
        <div className="w-full md:w-auto text-center md:text-right space-y-3">
          <div className="text-3xl font-black text-toss-gray-900 flex items-center gap-2 justify-center md:justify-end">
            {xp.toLocaleString()} <span className="text-xs font-bold text-toss-gray-400">XP</span>
          </div>
          <div className="w-full md:w-64 h-2 bg-toss-gray-100 rounded-full overflow-hidden">
            <motion.div initial={{ width: 0 }} animate={{ width: `${progressInLevel}%` }} className="h-full bg-toss-blue" />
          </div>
          <div className="text-[10px] font-bold text-toss-gray-400 uppercase tracking-widest">Next Level: {1000 - (xp % 1000)} XP Remaining</div>
        </div>
      </div>

      {/* Daily Word Section */}
      <div className="toss-card border-none bg-toss-gray-900 text-white p-10 relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 opacity-10 rotate-12">
          <Quote size={200} />
        </div>
        <div className="relative z-10 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-toss-blue rounded-full flex items-center justify-center"><Heart size={16} fill="white"/></div>
            <span className="text-xs font-black uppercase tracking-[0.2em] text-toss-blue-light">오늘의 훈독 말씀</span>
          </div>
          <blockquote className="text-xl md:text-2xl font-bold leading-relaxed max-w-3xl">
            "참사랑은 주는 것이 기뻐서 또 주고 싶고, 주어도 준 사실을 잊어버리는 무조건적인 사랑입니다. 하늘부모님의 심정은 자녀에게 모든 것을 다 주고도 더 주지 못해 안타까워하시는 부모의 마음입니다."
          </blockquote>
          <div className="flex items-center gap-4 text-white/50 text-sm">
            <span className="font-bold">천성경 제1권 3장 2절</span>
            <div className="w-1 h-1 bg-white/20 rounded-full"></div>
            <span>2026.04.27 훈독회</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h1 className="text-4xl font-black text-toss-gray-900 tracking-tight leading-tight">교리 학습 센터</h1>
        <p className="text-toss-gray-500 font-medium text-lg">원리를 체계적으로 학습하고 도전 과제를 수행하여<br/>당신의 영적 지능(SQ)을 높여보세요.</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {modules.map(mod => (
          <div key={mod.id} className="toss-card border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col justify-between hover:scale-[1.02] transition-all">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className={`w-14 h-14 bg-toss-gray-50 flex items-center justify-center rounded-2xl`}>
                  {mod.icon}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-toss-gray-900">{mod.title}</h3>
                  <div className="text-[10px] font-black text-toss-gray-400 uppercase tracking-widest">Standard Course</div>
                </div>
              </div>
              <p className="text-sm text-toss-gray-600 leading-relaxed font-medium h-[3em] line-clamp-2">{mod.desc}</p>
            </div>
            <div className="flex gap-2 mt-8">
              <button onClick={() => setStudyMode(mod.id)} className="flex-1 toss-button-ghost py-3 text-[11px]">학습하기</button>
              <button onClick={() => handleStartQuiz(mod.id)} className="flex-1 toss-button-primary py-3 text-[11px] shadow-none">퀘스트</button>
            </div>
          </div>
        ))}
      </div>

      {/* Study Modal */}
      <AnimatePresence>
        {studyMode && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-toss-gray-900/60 backdrop-blur-sm">
            <motion.div initial={{scale:0.9, y:20}} animate={{scale:1, y:0}} exit={{scale:0.9, y:20}} className="bg-white w-full max-w-2xl p-10 rounded-[32px] shadow-2xl relative">
              <button onClick={() => setStudyMode(null)} className="absolute top-8 right-8 text-toss-gray-400 hover:text-toss-gray-900"><X size={24}/></button>
              <div className="space-y-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-toss-blue-light text-toss-blue flex items-center justify-center"><BookOpen size={24}/></div>
                  <h2 className="text-2xl font-black text-toss-gray-900">{modules.find(m => m.id === studyMode)?.title} 요약</h2>
                </div>
                <div className="p-8 bg-toss-gray-50 rounded-2xl leading-loose text-toss-gray-700 font-medium max-h-[40vh] overflow-y-auto custom-scrollbar">
                  {modules.find(m => m.id === studyMode)?.summary}
                </div>
                <div className="flex gap-4">
                  <button onClick={() => setStudyMode(null)} className="flex-1 toss-button-ghost">닫기</button>
                  <button onClick={() => { setStudyMode(null); handleStartQuiz(studyMode); }} className="flex-1 toss-button-primary shadow-none">퀴즈 도전하기</button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Quiz Modal */}
      <AnimatePresence>
        {activeQuiz && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-toss-gray-900/60 backdrop-blur-sm">
            <motion.div initial={{scale:0.9, y:20}} animate={{scale:1, y:0}} exit={{scale:0.9, y:20}} className="bg-white w-full max-w-lg rounded-[32px] overflow-hidden shadow-2xl">
              <div className="flex justify-between items-center p-8 border-b border-toss-gray-100">
                <h3 className="font-bold text-lg flex items-center gap-2">
                  <ShieldCheck className="text-toss-blue"/> {modules.find(m => m.id === activeQuiz)?.title} 퀘스트
                </h3>
                <button onClick={() => setActiveQuiz(null)} className="text-toss-gray-400 hover:text-toss-gray-900"><X size={20}/></button>
              </div>

              <div className="p-8">
                {showResult ? (
                  <div className="text-center space-y-8 py-8">
                    <motion.div initial={{scale:0}} animate={{scale:1}} className="w-24 h-24 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto">
                      <Trophy size={48} />
                    </motion.div>
                    <div className="space-y-2">
                      <h2 className="text-3xl font-black text-toss-gray-900">미션 완료!</h2>
                      <p className="text-toss-blue font-black text-xl">+{score} XP 획득</p>
                    </div>
                    <button onClick={() => setActiveQuiz(null)} className="toss-button-primary w-full py-5 text-xl">완료</button>
                  </div>
                ) : (
                  <div className="space-y-8">
                    <div className="flex justify-between items-end">
                      <span className="text-[10px] font-black text-toss-gray-400 uppercase tracking-widest">Progress</span>
                      <span className="text-xs font-black text-toss-blue">{quizIndex + 1} / {modules.find(m => m.id === activeQuiz)?.quiz.length}</span>
                    </div>
                    <div className="h-1.5 w-full bg-toss-gray-100 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${((quizIndex + 1) / (modules.find(m => m.id === activeQuiz)?.quiz.length || 1)) * 100}%` }}
                        className="h-full bg-toss-blue" 
                      />
                    </div>
                    <h2 className="text-2xl font-black text-toss-gray-900 leading-tight min-h-[4em] flex items-center text-center justify-center">
                      {modules.find(m => m.id === activeQuiz)?.quiz[quizIndex].q}
                    </h2>
                    <div className="space-y-3">
                      {modules.find(m => m.id === activeQuiz)?.quiz[quizIndex].options.map((opt, i) => (
                        <button key={i} onClick={() => handleAnswer(i)} className="w-full p-5 bg-toss-gray-50 hover:bg-toss-blue hover:text-white rounded-2xl font-bold transition-all flex justify-between items-center group">
                          <span>{opt}</span>
                          <ChevronRight size={18} className="text-toss-gray-200 group-hover:text-white transition-colors" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </motion.div>
  );
};
