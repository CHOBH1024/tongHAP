import React, { useState } from 'react';
import { 
  MessageSquare, 
  Users, 
  Target, 
  Clock, 
  MapPin, 
  Send, 
  User, 
  BookOpen, 
  Heart, 
  Flame, 
  Star, 
  CheckCircle2, 
  Lightbulb, 
  Award, 
  ChevronRight,
  Zap,
  Coffee,
  Sun,
  Moon,
  Calendar,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Comment { id: string; user: string; text: string; timestamp: string; section: string; }

export const WorkshopDashboard: React.FC = () => {
  const [activePlan, setActivePlan] = useState(0);
  const [expandedSection, setExpandedSection] = useState<number | null>(0);
  const [comments, setComments] = useState<Comment[]>([
    { id: '1', user: '김민수 사무장', text: 'AI 행정 실무형 워크숍 정말 기대됩니다! 주보 자동화가 절실했어요.', timestamp: '10분 전', section: '행정혁신' },
    { id: '2', user: '박영희 권사', text: '세대 공감형은 청년들과 소통할 수 있는 좋은 기회가 될 것 같네요.', timestamp: '30분 전', section: '세대화합' }
  ]);
  const [newComment, setNewComment] = useState('');

  const workshopPlans = [
    {
      id: 0,
      title: "혁신 행정 실무형",
      subtitle: "AI와 디지털로 무장하는 초고속 행정 혁신",
      duration: "1 Day (당일)",
      color: "bg-amber-500",
      accent: "text-amber-500",
      icon: <Zap className="w-6 h-6" />,
      schedule: [
        { time: "09:00", activity: "개회 및 비전 공유", desc: "사무장의 사명과 행정 혁신의 필요성", icon: <Flame className="w-4 h-4" /> },
        { time: "10:30", activity: "AI 행정 마스터클래스", desc: "ChatGPT 활용 주보 및 공문 자동화 실습", icon: <Zap className="w-4 h-4" /> },
        { time: "13:30", activity: "디지털 업무 표준화 토론", desc: "전국 공통 행정 매뉴얼 초안 수립", icon: <BookOpen className="w-4 h-4" /> },
        { time: "16:00", activity: "실전 혁신 도구 적용", desc: "개인별 맞춤 디지털 워크플로우 세팅", icon: <Target className="w-4 h-4" /> },
        { time: "18:00", activity: "파송 및 결단", desc: "현장 적용 계획 발표 및 폐회", icon: <Award className="w-4 h-4" /> },
      ]
    },
    {
      id: 1,
      title: "세대 공감 화합형",
      subtitle: "베테랑의 지혜와 청년의 감각이 만나는 시간",
      duration: "1 Night 2 Days",
      color: "bg-indigo-600",
      accent: "text-indigo-600",
      icon: <Users className="w-6 h-6" />,
      schedule: [
        { time: "Day 1 14:00", activity: "아이스브레이킹: '라떼'와 '요즘'", desc: "세대 간 고정관념 허물기 게임", icon: <Coffee className="w-4 h-4" /> },
        { time: "Day 1 19:00", activity: "대나무숲 익명 토크", desc: "평소 하지 못했던 진짜 속마음 나누기", icon: <MessageSquare className="w-4 h-4" /> },
        { time: "Day 2 09:00", activity: "리버스 멘토링 세션", desc: "청년이 선배에게 배우는 트렌드 역습", icon: <Zap className="w-4 h-4" /> },
        { time: "Day 2 13:00", activity: "화합의 비빔밥 오찬", desc: "서로 다른 색깔이 모여 하나 되는 식사", icon: <Heart className="w-4 h-4" /> },
        { time: "Day 2 15:00", activity: "비전 선포식", desc: "함께 그려가는 미래 교회 행정", icon: <Star className="w-4 h-4" /> },
      ]
    },
    {
      id: 2,
      title: "심정 치유 회복형",
      subtitle: "지친 영혼을 달래고 사명을 재충전하는 쉼표",
      duration: "2 Nights 3 Days",
      color: "bg-emerald-600",
      accent: "text-emerald-600",
      icon: <Heart className="w-6 h-6" />,
      schedule: [
        { time: "Day 1", activity: "침묵의 입재", desc: "일상의 소음을 끄고 내면의 소리에 집중", icon: <Moon className="w-4 h-4" /> },
        { time: "Day 2", activity: "숲속 명상 및 기도", desc: "대자연 속에서 만나는 참사랑의 향기", icon: <Sun className="w-4 h-4" /> },
        { time: "Day 2", activity: "심정 공유의 밤", desc: "따뜻한 차 한 잔과 함께하는 인생 고백", icon: <Coffee className="w-4 h-4" /> },
        { time: "Day 3", activity: "사명 재헌신 예배", desc: "처음 사랑을 회복하고 현장으로 복귀", icon: <Flame className="w-4 h-4" /> },
        { time: "Day 3", activity: "해제 및 귀가", desc: "새로운 에너지를 가득 채운 출발", icon: <Send className="w-4 h-4" /> },
      ]
    }
  ];

  const sections = [
    {
      title: "핵심 과업 및 목표",
      badge: "Vision",
      icon: <Target className="text-indigo-600" />,
      summary: "워크숍을 통해 달성하고자 하는 구체적인 결과물",
      content: [
        { subtitle: "행정 프로세스 최적화", text: "기존의 아날로그식 업무 처리를 100% 디지털화하여 업무 시간을 절반으로 단축합니다." },
        { subtitle: "세대 간 소통 모델 구축", text: "기성 세대의 경험과 젊은 세대의 IT 감각이 시너지를 낼 수 있는 협업 시스템을 제안합니다." }
      ]
    },
    {
      title: "주요 커리큘럼",
      badge: "Education",
      icon: <BookOpen className="text-amber-600" />,
      summary: "각 단계별 심화 학습 및 실습 내용",
      content: [
        { subtitle: "AI 프롬프트 엔지니어링", text: "교회 행정에 특화된 AI 명령어를 학습하여 보고서, 기획안, 주보 원고를 자동 생성합니다." },
        { subtitle: "데이터 기반 목양 시스템", text: "식구들의 성장 단계와 출석 데이터를 분석하여 맞춤형 심방 알림 시스템을 구축합니다." }
      ]
    }
  ];

  const addComment = () => {
    if (!newComment.trim()) return;
    const comment: Comment = {
      id: Date.now().toString(),
      user: '나 (공직자)',
      text: newComment,
      timestamp: '방금 전',
      section: workshopPlans[activePlan].title
    };
    setComments([comment, ...comments]);
    setNewComment('');
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-7xl mx-auto space-y-12 pb-24"
    >
      {/* Dynamic Hero Header */}
      <section className="relative p-10 md:p-20 rounded-[3rem] bg-slate-900 overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-full h-full opacity-20 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500 rounded-full blur-[120px] -mr-48 -mt-48" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500 rounded-full blur-[120px] -ml-48 -mb-48" />
        </div>
        
        <div className="relative z-10 text-center space-y-8 max-w-4xl mx-auto">
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="flex justify-center"
          >
            <span className="px-5 py-2 bg-white/10 backdrop-blur-md text-amber-400 text-[10px] font-black tracking-[0.4em] uppercase rounded-full border border-white/10">
              ✟ 2026 사무장 마스터 워크숍
            </span>
          </motion.div>
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black text-white tracking-tight leading-tight"
          >
            미래 목회를 설계하는<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-200">전략적 시나리오</span>
          </motion.h1>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-lg md:text-xl font-medium"
          >
            현장의 상황에 맞춰 선택 가능한 3가지 워크숍 모델입니다.<br/>
            최적의 플랜을 선택하여 혁신을 시작하십시오.
          </motion.p>

          {/* Plan Tabs */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-10">
            {workshopPlans.map((plan, i) => (
              <button
                key={plan.id}
                onClick={() => setActivePlan(i)}
                className={`group relative p-6 rounded-3xl transition-all duration-500 ${
                  activePlan === i 
                  ? 'bg-white shadow-2xl scale-105' 
                  : 'bg-white/5 hover:bg-white/10 border border-white/10'
                }`}
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-all duration-500 ${
                  activePlan === i ? plan.color + ' text-white shadow-lg' : 'bg-white/10 text-white'
                }`}>
                  {plan.icon}
                </div>
                <h3 className={`text-lg font-black text-left mb-1 ${activePlan === i ? 'text-slate-900' : 'text-white'}`}>
                  {plan.title}
                </h3>
                <p className={`text-[10px] font-black text-left uppercase tracking-widest ${activePlan === i ? 'text-slate-400' : 'text-slate-500'}`}>
                  {plan.duration}
                </p>
                {activePlan === i && (
                  <motion.div 
                    layoutId="active-dot"
                    className="absolute top-4 right-4 w-2 h-2 rounded-full bg-amber-400"
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Visual Timeline Schedule */}
      <section className="grid lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3 space-y-8">
          <div className="glass-card p-10 md:p-14 relative overflow-hidden bg-white border border-slate-100">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
              <div>
                <span className={`text-[10px] font-black uppercase tracking-widest ${workshopPlans[activePlan].accent}`}>Plan Visualization</span>
                <h2 className="text-3xl font-black text-slate-900">{workshopPlans[activePlan].title}</h2>
                <p className="text-slate-500 font-medium">{workshopPlans[activePlan].subtitle}</p>
              </div>
              <div className="flex items-center gap-3 px-6 py-3 bg-slate-50 rounded-2xl border border-slate-100">
                <Calendar className="w-4 h-4 text-slate-400" />
                <span className="text-sm font-black text-slate-900">{workshopPlans[activePlan].duration}</span>
              </div>
            </div>

            <div className="relative space-y-12 pl-8 md:pl-12">
              {/* Timeline Line */}
              <div className="absolute left-[1.125rem] md:left-[1.375rem] top-2 bottom-2 w-0.5 bg-slate-100" />
              
              <AnimatePresence mode="wait">
                {workshopPlans[activePlan].schedule.map((item, idx) => (
                  <motion.div
                    key={`${activePlan}-${idx}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: idx * 0.1 }}
                    className="relative flex gap-8 group"
                  >
                    <div className={`absolute -left-[2.125rem] md:-left-[2.375rem] top-1 w-8 h-8 rounded-full border-4 border-white shadow-md flex items-center justify-center transition-colors duration-500 z-10 ${workshopPlans[activePlan].color} text-white`}>
                      {item.icon}
                    </div>
                    <div className="space-y-1 pb-2">
                      <span className="text-[10px] font-black text-slate-400 tracking-[0.2em]">{item.time}</span>
                      <h4 className="text-xl font-black text-slate-800 group-hover:text-indigo-600 transition-colors">{item.activity}</h4>
                      <p className="text-slate-500 text-sm font-medium leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Detailed Info Accordion */}
          <div className="space-y-4">
            {sections.map((section, idx) => (
              <div key={idx} className="bg-white border border-slate-100 rounded-[2rem] overflow-hidden shadow-sm">
                <button 
                  onClick={() => setExpandedSection(expandedSection === idx ? null : idx)}
                  className="w-full p-8 flex items-center gap-6 text-left hover:bg-slate-50 transition-colors"
                >
                  <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center shrink-0 border border-slate-100 group-hover:bg-white transition-colors">
                    {section.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="px-2.5 py-1 bg-slate-100 text-slate-500 text-[10px] font-black rounded-lg uppercase tracking-wider">
                        {section.badge}
                      </span>
                      <h3 className="text-xl font-black text-slate-900">{section.title}</h3>
                    </div>
                    <p className="text-sm text-slate-400 font-medium">{section.summary}</p>
                  </div>
                  <ChevronRight size={24} className={`text-slate-300 transition-transform duration-300 ${expandedSection === idx ? 'rotate-90 text-indigo-600' : ''}`} />
                </button>
                <AnimatePresence>
                  {expandedSection === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="border-t border-slate-50"
                    >
                      <div className="p-8 grid md:grid-cols-2 gap-8 bg-slate-50/30">
                        {section.content.map((item, i) => (
                          <div key={i} className="space-y-3 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                            <h4 className="font-black text-slate-800 flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full bg-amber-400" />
                              {item.subtitle}
                            </h4>
                            <p className="text-sm text-slate-500 leading-relaxed font-medium">{item.text}</p>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar Info & Comments */}
        <div className="lg:col-span-2 space-y-8">
          {/* Mission Statement Card */}
          <div className="p-10 rounded-[2.5rem] bg-indigo-900 text-white relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <Flame size={120} />
            </div>
            <div className="relative z-10 space-y-8">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-md">
                  <Flame className="text-amber-400" size={28} />
                </div>
                <h3 className="text-xl font-black">사무장의 사명</h3>
              </div>
              <blockquote className="text-xl font-black italic leading-loose text-indigo-100">
                "사무장은 하나님의 뜻이 행정의 효율성을 통해 꽃피우도록 봉사하는 거룩한 직분입니다."
              </blockquote>
              <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                <div className="w-10 h-10 rounded-full bg-white/20" />
                <p className="text-sm font-bold text-indigo-200">신통일한국 시대의 주역</p>
              </div>
            </div>
          </div>

          {/* Outcome Checklist */}
          <div className="glass-card p-10 bg-white border border-slate-100">
            <h3 className="text-xl font-black text-slate-900 mb-8 flex items-center gap-3">
              <Award className="text-amber-500" />
              워크숍 기대 효과
            </h3>
            <div className="space-y-6">
              {[
                "디지털 행정 전환을 통한 업무 효율 50% 향상",
                "세대 간 소통 장벽 해소 및 화합 모델 구축",
                "개인별 목회 아키타입(Archetype) 발견 및 활용",
                "심정 치유를 통한 공직 사명감 재확립"
              ].map((text, i) => (
                <div key={i} className="flex items-start gap-4 group">
                  <div className="w-6 h-6 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center shrink-0 mt-1 group-hover:bg-emerald-500 group-hover:text-white transition-all">
                    <CheckCircle2 size={16} />
                  </div>
                  <p className="text-slate-600 font-bold leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Live Discussion */}
          <div className="glass-card p-0 flex flex-col h-[500px] overflow-hidden bg-white border border-slate-100 shadow-xl">
            <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-white sticky top-0 z-10">
              <h3 className="font-black text-slate-800 flex items-center gap-3">
                <MessageSquare className="text-indigo-500" size={20} />
                실시간 소통 창구
              </h3>
              <span className="px-3 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-black rounded-full">
                {comments.length} FEEDBACK
              </span>
            </div>
            
            <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar bg-slate-50/20">
              <AnimatePresence>
                {comments.map((c) => (
                  <motion.div 
                    key={c.id} 
                    initial={{ opacity: 0, y: 10 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    className="space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-white shadow-sm rounded-full flex items-center justify-center border border-slate-100">
                          <User size={14} className="text-slate-400" />
                        </div>
                        <span className="text-xs font-black text-slate-800">{c.user}</span>
                      </div>
                      <span className="text-[10px] text-slate-300 font-bold uppercase">{c.timestamp}</span>
                    </div>
                    <div className="relative bg-white p-5 rounded-3xl rounded-tl-none shadow-sm border border-slate-100 group">
                      <span className="absolute -top-3 right-4 px-2 py-0.5 bg-indigo-50 text-indigo-400 text-[8px] font-black rounded uppercase tracking-tighter opacity-0 group-hover:opacity-100 transition-opacity">
                        {c.section}
                      </span>
                      <p className="text-sm leading-relaxed text-slate-600 font-medium">{c.text}</p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <div className="p-8 border-t border-slate-50 bg-white">
              <div className="relative group">
                <input 
                  type="text" 
                  value={newComment} 
                  onChange={e => setNewComment(e.target.value)} 
                  onKeyDown={e => e.key === 'Enter' && addComment()}
                  placeholder="참가 신청 문의 및 의견..." 
                  className="w-full bg-slate-50 border-none rounded-2xl px-6 py-5 pr-16 text-sm font-bold focus:ring-2 ring-indigo-500/20 transition-all outline-none"
                />
                <button 
                  onClick={addComment}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-12 h-12 bg-indigo-600 text-white rounded-xl flex items-center justify-center shadow-lg shadow-indigo-100 active:scale-95 transition-all hover:bg-indigo-700"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Action CTA */}
      <section className="text-center py-12">
        <button className="px-12 py-6 bg-amber-500 text-white rounded-3xl font-black text-xl shadow-2xl shadow-amber-200 hover:scale-105 active:scale-95 transition-all flex items-center gap-4 mx-auto group">
          워크숍 참가 신청하기
          <ChevronRight className="group-hover:translate-x-2 transition-transform" />
        </button>
        <p className="mt-6 text-slate-400 font-bold text-sm">신청 마감: 2026년 5월 15일 | 전국 5개 권역 동시 진행</p>
      </section>
    </motion.div>
  );
};

