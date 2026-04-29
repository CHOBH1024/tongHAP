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
  Quote,
  Scale,
  Award,
  CheckCircle,
  Zap
} from 'lucide-react';

const dailyQuotes = [
  { text: '"참사랑은 주는 것이 기뻐서 또 주고 싶고, 주어도 준 사실을 잊어버리는 무조건적인 사랑입니다. 하늘부모님의 심정은 자녀에게 모든 것을 다 주고도 더 주지 못해 안타까워하시는 부모의 마음입니다."', source: '천성경 제1권 3장 2절' },
  { text: '"하나님은 참사랑의 본체이시다. 참사랑은 자기를 위해 존재하는 것이 아니라 상대를 위해 존재하는 것이다."', source: '평화경 1편 2장' },
  { text: '"가정은 사랑의 학교입니다. 부모의 사랑, 부부의 사랑, 자녀의 사랑, 형제의 사랑을 배우는 곳이 가정입니다."', source: '천성경 제3권 1장 1절' },
  { text: '"참된 평화는 힘의 균형에서 오는 것이 아니라, 참사랑의 실천에서 온다."', source: '평화경 3편 1장' },
  { text: '"효도하는 자녀, 충성하는 신하, 성인, 성자의 길은 모두 참사랑의 길이다."', source: '천성경 제2권 4장 3절' },
];

export const Doctrine: React.FC = () => {
  const [activeQuiz, setActiveQuiz] = useState<string | null>(null);
  const [studyMode, setStudyMode] = useState<string | null>(null);
  const [quizIndex, setQuizIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [xp, setXp] = useState(1250);
  const [showResult, setShowResult] = useState(false);
  const [answerFeedback, setAnswerFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [streak, setStreak] = useState(0);
  const [completedModules, setCompletedModules] = useState<string[]>([]);

  const todayQuote = dailyQuotes[new Date().getDate() % dailyQuotes.length];

  // Persistence
  useEffect(() => {
    const savedXp = localStorage.getItem('gajeong_xp');
    if (savedXp) setXp(parseInt(savedXp));
    const savedStreak = localStorage.getItem('gajeong_streak');
    if (savedStreak) setStreak(parseInt(savedStreak));
    const savedCompleted = localStorage.getItem('gajeong_completed');
    if (savedCompleted) setCompletedModules(JSON.parse(savedCompleted));
  }, []);

  useEffect(() => {
    localStorage.setItem('gajeong_xp', xp.toString());
  }, [xp]);

  useEffect(() => {
    localStorage.setItem('gajeong_streak', streak.toString());
  }, [streak]);

  useEffect(() => {
    localStorage.setItem('gajeong_completed', JSON.stringify(completedModules));
  }, [completedModules]);

  const modules = [
    { 
      id: 'creation', 
      title: '창조원리', 
      icon: <Sun size={32} className="text-amber-500" />, 
      color: 'amber', 
      desc: '하나님의 창조 목적과 우주 형성의 원리, 이상가정의 비전을 배웁니다.',
      summary: '창조원리는 하나님이 왜 우주와 인간을 만드셨는지를 설명합니다. 핵심은 "참사랑을 통한 기쁨"이며, 모든 존재는 수수작용을 통해 생존하고 번식합니다. 인간은 하나님의 형상을 닮은 실체로서 3대 축복(개성완성, 가정완성, 주관권완성)을 이뤄야 합니다.',
      quiz: [
        { q: '하나님의 창조 목적은 무엇입니까?', options: ['기쁨', '권력', '지식', '인내'], a: 0 },
        { q: '모든 존재가 관계를 맺고 생존/번식하는 원동력은?', options: ['자유의지', '수수작용', '정분합작용', '탕감복귀'], a: 1 },
        { q: '하나님을 닮은 실체로서 인간이 이뤄야 할 궁극적 목표는?', options: ['경제적 자립', '이상가정 완성', '개인적 해탈', '학문적 성취'], a: 1 },
      ]
    },
    { 
      id: 'parents', 
      title: '참부모론 (신학적 정립)', 
      icon: <Heart size={32} className="text-rose-500" />, 
      color: 'rose', 
      desc: '독생자·독생녀의 현현과 참부모 성혼의 섭리적 가치를 연구합니다.',
      summary: '참부모론은 원죄 없는 독생자와 독생녀의 성혼을 통해 인류의 참된 부모가 되심을 핵심으로 합니다. 특히 참어머님의 "독생녀" 선포는 타락한 혈통을 근원적으로 전환하고 신통일한국 시대를 안착시키는 결정적인 섭리적 의미를 지닙니다.',
      quiz: [
        { q: '참어머님께서 선포하신 섭리적 본체로서의 명칭은?', options: ['지혜의 여신', '독생녀', '평화의 어머니', '인류의 스승'], a: 1 },
        { q: '참부모님의 성혼이 인류 역사에 가져온 가장 큰 변화는?', options: ['종교의 통합', '혈통의 전환과 축복', '민주주의 확산', '과학기술의 비약'], a: 1 },
        { q: '참부모론에서 강조하는 "위하여 사는 삶"의 근본은?', options: ['사회 정의', '자기 희생적 참사랑', '경제적 평등', '지식의 공유'], a: 1 }
      ]
    },
    { 
      id: 'hyojeong', 
      title: '효정의 인재상', 
      icon: <Star size={32} className="text-indigo-600" />, 
      color: 'indigo', 
      desc: '효정(孝情)의 성숙과 발달 과정으로 본 가정연합의 핵심 인재상을 탐구합니다.',
      summary: '효정의 인재상은 하늘부모님을 향한 수직적 효심과 인류를 향한 수평적 참사랑을 겸비한 인재를 뜻합니다. 이는 단순한 지식 습득이 아니라, 심정적 성숙을 통해 참된 부모, 참된 스승, 참된 주인의 자격을 갖추는 과정을 의미합니다.',
      quiz: [
        { q: '가정연합이 지향하는 효정 인재상의 핵심 가치는?', options: ['경쟁 승리', '심정적 성숙과 효(孝)', '기술적 전문성', '카리스마적 리더십'], a: 1 },
        { q: '효정의 성숙 단계 중 가장 기초가 되는 마음은?', options: ['주관하는 마음', '위하는 마음(심정)', '개척하는 마음', '분석하는 마음'], a: 1 }
      ]
    },
    { 
      id: 'law', 
      title: '천일국 교육기본법', 
      icon: <Scale size={32} className="text-emerald-600" />, 
      color: 'emerald', 
      desc: '천일국 국민으로서 갖춰야 할 법적·윤리적 소양과 교육의 원칙을 배웁니다.',
      summary: '천일국 교육기본법은 모든 천일국 국민이 하늘부모님의 말씀을 훈독하고 실천하며, 평화 세계의 주인으로서 자질을 함양할 권리와 의무를 명시합니다. 교육의 목적은 홍익인간을 넘어 "천일국 시민으로서의 완성"에 있습니다.',
      quiz: [
        { q: '천일국 교육기본법에서 명시한 교육의 궁극적 목적은?', options: ['엘리트 양성', '천일국 시민(국민)으로서의 완성', '직업적 성공', '종교적 교리 주입'], a: 1 },
        { q: '천일국 국민이 일상에서 실천해야 할 가장 기본적인 교육법은?', options: ['토론회', '훈독회', '웅변대회', '봉사활동'], a: 1 }
      ]
    },
    { 
      id: 'mission', 
      title: '신종족메시아', 
      icon: <Zap size={32} className="text-violet-600" />, 
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
    
    const isCorrect = selectedIndex === mod.quiz[quizIndex].a;
    setAnswerFeedback(isCorrect ? 'correct' : 'wrong');
    
    if (isCorrect) {
      setScore(prev => prev + 100);
      setStreak(prev => prev + 1);
    } else {
      setStreak(0);
    }
    
    setTimeout(() => {
      setAnswerFeedback(null);
      if (quizIndex < mod.quiz.length - 1) {
        setQuizIndex(quizIndex + 1);
      } else {
        setShowResult(true);
        const earned = score + (isCorrect ? 100 : 0);
        setXp(prev => prev + earned);
        if (!completedModules.includes(mod.id)) {
          setCompletedModules(prev => [...prev, mod.id]);
        }
      }
    }, 800);
  };

  const level = Math.floor(xp / 1000) + 1;
  const progressInLevel = (xp % 1000) / 10;

  return (
    <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} className="max-w-6xl mx-auto space-y-12 pb-20 px-6">
      
      {/* Gamification Header - FFWPU Premium */}
      <div className="relative p-8 md:p-10 rounded-[2.5rem] bg-indigo-900 overflow-hidden shadow-2xl flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500 rounded-full blur-[100px] -mr-32 -mt-32 opacity-20" />
        <div className="relative z-10 flex items-center gap-8">
          <div className="relative">
            <div className="w-20 h-20 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl flex items-center justify-center shadow-2xl">
              <Trophy className="text-amber-400" size={40} />
            </div>
            <div className="absolute -bottom-3 -right-3 bg-ffwpu-gold text-white text-[12px] font-black px-3 py-1.5 rounded-xl border-4 border-indigo-900 shadow-lg">
              LV.{level}
            </div>
          </div>
          <div>
            <div className="text-[10px] font-black text-amber-400 uppercase tracking-[0.4em] mb-2">Theological Journey · 🔥 {streak} Streak</div>
            <h2 className="text-3xl font-black text-white tracking-tight">신앙의 탐구자 <span className="text-lg text-amber-300">({completedModules.length}/{modules.length} 완료)</span></h2>
            <p className="text-indigo-200/60 text-sm font-medium">말씀을 체득하여 성숙한 인재로 거듭나세요.</p>
          </div>
        </div>
        
        <div className="relative z-10 w-full md:w-80 text-center md:text-right space-y-4">
          <div className="text-4xl font-black text-white flex items-center gap-2 justify-center md:justify-end tracking-tighter">
            {xp.toLocaleString()} <span className="text-xs font-black text-amber-400">XP</span>
          </div>
          <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden backdrop-blur-md">
            <motion.div initial={{ width: 0 }} animate={{ width: `${progressInLevel}%` }} className="h-full bg-gradient-to-r from-amber-500 to-ffwpu-gold" />
          </div>
          <div className="text-[10px] font-black text-indigo-300 uppercase tracking-widest opacity-60">Next Level: {1000 - (xp % 1000)} XP Remaining</div>
        </div>
      </div>

      {/* Daily Word Card */}
      <div className="glass-card !bg-white relative overflow-hidden border-none shadow-sacred p-10 md:p-14">
        <div className="absolute top-0 right-0 p-12 opacity-5 text-indigo-900">
          <Quote size={240} />
        </div>
        <div className="relative z-10 space-y-8">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-rose-50 text-rose-500 rounded-2xl flex items-center justify-center shadow-sm">
               <Heart size={20} fill="currentColor" />
            </div>
            <span className="text-xs font-black uppercase tracking-[0.3em] text-slate-400">오늘의 훈독 명언</span>
          </div>
          <blockquote className="text-2xl md:text-3xl font-black leading-tight text-slate-900 max-w-4xl tracking-tight">
            {todayQuote.text}
          </blockquote>
          <div className="flex items-center gap-6 pt-6 border-t border-slate-50">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
                 <BookOpen size={14} className="text-slate-400" />
              </div>
              <span className="font-black text-slate-800 text-sm">{todayQuote.source}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Course Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {modules.map(mod => (
          <motion.div 
            key={mod.id} 
            whileHover={{ y: -8 }}
            className={`glass-card group cursor-pointer border-none bg-white shadow-md hover:shadow-2xl ${completedModules.includes(mod.id) ? 'ring-2 ring-emerald-400 ring-offset-2' : ''}`}
          >
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <div className="w-16 h-16 bg-slate-50 rounded-[2rem] flex items-center justify-center group-hover:bg-indigo-50 transition-colors relative">
                  {mod.icon}
                  {completedModules.includes(mod.id) && (
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center text-white shadow-lg">
                      <Award size={14} />
                    </div>
                  )}
                </div>
                <div className="w-10 h-10 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-300 group-hover:text-indigo-600 group-hover:bg-indigo-50 transition-all">
                  <ChevronRight size={20} />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors">{mod.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed font-medium line-clamp-3">{mod.desc}</p>
              </div>
            </div>
            <div className="flex gap-3 mt-10">
              <button onClick={() => setStudyMode(mod.id)} className="flex-1 py-4 bg-slate-50 text-slate-600 rounded-2xl text-xs font-black hover:bg-slate-100 transition-all">학습 모드</button>
              <button onClick={() => handleStartQuiz(mod.id)} className="flex-1 py-4 bg-indigo-600 text-white rounded-2xl text-xs font-black shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all">퀘스트 도전</button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Study Modal */}
      <AnimatePresence>
        {studyMode && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
            <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="absolute inset-0 bg-slate-950/80 backdrop-blur-md" onClick={() => setStudyMode(null)} />
            <motion.div 
              initial={{scale:0.9, y:40, opacity:0}} 
              animate={{scale:1, y:0, opacity:1}} 
              exit={{scale:0.9, y:40, opacity:0}} 
              className="relative bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl overflow-hidden"
            >
              <div className="p-10 md:p-14 space-y-10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center"><BookOpen size={28}/></div>
                    <h2 className="text-2xl font-black text-slate-900">{modules.find(m => m.id === studyMode)?.title}</h2>
                  </div>
                  <button onClick={() => setStudyMode(null)} className="p-4 bg-slate-50 rounded-2xl text-slate-400 hover:text-slate-900 transition-all"><X size={24}/></button>
                </div>
                <div className="p-10 bg-slate-50 rounded-[2.5rem] border border-slate-100 leading-loose text-slate-700 font-bold text-lg max-h-[50vh] overflow-y-auto custom-scrollbar">
                  {modules.find(m => m.id === studyMode)?.summary}
                </div>
                <div className="flex gap-4">
                  <button onClick={() => setStudyMode(null)} className="flex-1 py-5 bg-white border border-slate-200 text-slate-600 rounded-3xl font-black text-lg hover:bg-slate-50 transition-all">나중에 하기</button>
                  <button onClick={() => { setStudyMode(null); handleStartQuiz(studyMode); }} className="flex-1 py-5 bg-indigo-600 text-white rounded-3xl font-black text-lg shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all">지금 테스트</button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Quiz Quest Modal */}
      <AnimatePresence>
        {activeQuiz && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
            <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="absolute inset-0 bg-indigo-950/90 backdrop-blur-xl" onClick={() => setActiveQuiz(null)} />
            <motion.div 
              initial={{scale:0.9, y:40, opacity:0}} 
              animate={{scale:1, y:0, opacity:1}} 
              exit={{scale:0.9, y:40, opacity:0}} 
              className="relative bg-white w-full max-w-xl rounded-[3rem] overflow-hidden shadow-2xl"
            >
              <div className="flex justify-between items-center p-10 border-b border-slate-50">
                <h3 className="font-black text-xl flex items-center gap-3 text-slate-900">
                  <ShieldCheck className="text-indigo-600" size={24}/> {modules.find(m => m.id === activeQuiz)?.title} Quest
                </h3>
                <button onClick={() => setActiveQuiz(null)} className="p-3 bg-slate-50 rounded-xl text-slate-400 hover:text-slate-900"><X size={20}/></button>
              </div>

              <div className="p-10 md:p-14">
                {showResult ? (
                  <div className="text-center space-y-10">
                    <motion.div 
                      initial={{scale:0, rotate:-45}} 
                      animate={{scale:1, rotate:0}} 
                      className="w-28 h-28 bg-amber-50 text-amber-500 rounded-[2.5rem] flex items-center justify-center mx-auto shadow-xl"
                    >
                      <Trophy size={56} />
                    </motion.div>
                    <div className="space-y-4">
                      <h2 className="text-4xl font-black text-slate-900 tracking-tight">미션 클리어!</h2>
                      <div className="inline-block px-6 py-2 bg-indigo-50 rounded-full">
                        <p className="text-indigo-600 font-black text-2xl">+{score} <span className="text-sm">XP COLLECTED</span></p>
                      </div>
                    </div>
                    <button onClick={() => setActiveQuiz(null)} className="w-full py-6 bg-indigo-600 text-white rounded-3xl font-black text-xl shadow-2xl shadow-indigo-100 hover:scale-[1.02] transition-all">결과 저장 및 닫기</button>
                  </div>
                ) : (
                  <div className="space-y-10">
                    <div className="space-y-4">
                      <div className="flex justify-between items-end">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Current Progress</span>
                        <span className="text-sm font-black text-indigo-600">{quizIndex + 1} / {modules.find(m => m.id === activeQuiz)?.quiz.length}</span>
                      </div>
                      <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${((quizIndex + 1) / (modules.find(m => m.id === activeQuiz)?.quiz.length || 1)) * 100}%` }}
                          className="h-full bg-indigo-600" 
                        />
                      </div>
                    </div>
                    
                    <div className="min-h-[120px] flex items-center justify-center">
                      <h2 className="text-2xl font-black text-slate-900 leading-tight text-center">
                        {modules.find(m => m.id === activeQuiz)?.quiz[quizIndex].q}
                      </h2>
                    </div>

                    <div className="space-y-4">
                      {modules.find(m => m.id === activeQuiz)?.quiz[quizIndex].options.map((opt, i) => (
                        <button 
                          key={i} 
                          onClick={() => !answerFeedback && handleAnswer(i)} 
                          disabled={!!answerFeedback}
                          className={`w-full p-6 border-2 rounded-[2rem] font-black text-lg transition-all flex justify-between items-center group text-left ${
                            answerFeedback && i === modules.find(m => m.id === activeQuiz)?.quiz[quizIndex].a
                              ? 'bg-emerald-50 border-emerald-500 scale-[1.02]'
                              : answerFeedback === 'wrong' && i !== modules.find(m => m.id === activeQuiz)?.quiz[quizIndex].a
                              ? 'bg-slate-50 border-transparent opacity-50'
                              : 'bg-slate-50 hover:bg-white hover:shadow-xl hover:border-indigo-600 border-transparent'
                          }`}
                        >
                          <span className={`${
                            answerFeedback && i === modules.find(m => m.id === activeQuiz)?.quiz[quizIndex].a
                              ? 'text-emerald-700' : 'text-slate-800 group-hover:text-indigo-600'
                          }`}>{opt}</span>
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all shadow-sm ${
                            answerFeedback && i === modules.find(m => m.id === activeQuiz)?.quiz[quizIndex].a
                              ? 'bg-emerald-500 text-white' : 'bg-white text-slate-200 group-hover:bg-indigo-600 group-hover:text-white'
                          }`}>
                             <ChevronRight size={18} />
                          </div>
                        </button>
                      ))}
                    </div>
                    {answerFeedback && (
                      <motion.div 
                        initial={{opacity:0, y:10}} animate={{opacity:1, y:0}}
                        className={`text-center py-3 rounded-2xl font-black text-lg ${
                          answerFeedback === 'correct' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                        }`}
                      >
                        {answerFeedback === 'correct' ? `✅ 정답! 🔥 ${streak} 연속` : '❌ 아쉬워요! 다음엔 꼭!'}
                      </motion.div>
                    )}
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

export default Doctrine;
