import React, { useState } from 'react';
import { MessageSquare, Users, Target, Clock, MapPin, Send, User, BookOpen, Heart, Flame, Star, CheckCircle2, Lightbulb, Award, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Comment { id:string; user:string; text:string; timestamp:string; section:string; }

export const WorkshopDashboard: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>([
    { id:'1', user:'청년사무장A', text:'리버스 멘토링 세션이 정말 기대됩니다! AI 활용법을 선배님들께 알려드리고 싶어요.', timestamp:'1시간 전', section:'all' },
    { id:'2', user:'베테랑사무장B', text:'대나무숲 토크에서 진짜 현장의 목소리가 나왔으면 좋겠습니다. 하나님의 뜻 안에서 솔직한 대화가 필요합니다.', timestamp:'30분 전', section:'all' },
    { id:'3', user:'지방사무장C', text:'지방 교회 현장의 어려움을 공유하고 함께 기도하는 시간이 있으면 감사하겠습니다.', timestamp:'15분 전', section:'all' },
  ]);
  const [newComment, setNewComment] = useState('');
  const [expandedSection, setExpandedSection] = useState<number|null>(null);

  const addComment = () => {
    if(!newComment.trim()) return;
    setComments([{ id:Date.now().toString(), user:'익명참가자', text:newComment, timestamp:'방금 전', section:'all' }, ...comments]);
    setNewComment('');
  };

  const sections = [
    {
      title:"제1장. 기획 배경 및 핵심 철학",
      icon:<Flame className="text-amber-500"/>,
      badge:"WHY",
      summary:"왜 이 워크숍이 필요한가?",
      content:[
        { subtitle:"1.1 시대적 배경", text:"천일국 안착 시대를 맞이하여 가정연합은 전례 없는 전환기에 놓여 있습니다. 참부모님의 유업을 현장에서 구현해야 하는 사무장들은 급격한 세대 교체, 디지털 전환, 그리고 교세 확장이라는 삼중 과제에 직면해 있습니다." },
        { subtitle:"1.2 현장의 목소리", text:"전국 교구/교회 현장에서 반복적으로 제기되는 과제들이 있습니다: ① 세대 간 소통 단절, ② 행정 관행의 답습, ③ 과중한 업무 스트레스와 영적 소진, ④ 교회 행정과 목회 사이의 역할 혼란." },
        { subtitle:"1.3 핵심 철학 (3 Core Principles)", text:"첫째, 'Top-Down 강의 금지, Bottom-Up 참여 필수'. 둘째, '심리적 안전감과 익명성 보장'. 셋째, '추상적 담론 금지, 실질적 대안 도출'." }
      ]
    },
    {
      title:"제2장. 사전 준비 및 현장 진단",
      icon:<Target className="text-emerald-500"/>,
      badge:"HOW",
      summary:"어떻게 준비하는가?",
      content:[
        { subtitle:"2.1 사전 익명 설문조사", text:"모바일/웹 기반 철저한 익명 설문을 실시하여 세대 간 갈등의 진짜 원인과 비효율적인 업무 프로세스를 파악합니다." },
        { subtitle:"2.2 전략적 조 편성 (Cross-Matching)", text:"직급/연령/성별/소속 교구를 교차하여 한 조 내에 청년과 베테랑이 적정 비율로 섞이도록 구성합니다." }
      ]
    },
    {
      title:"제3장. 핵심 프로그램: 이음(Connection)",
      icon:<Star className="text-toss-blue"/>,
      badge:"WHAT",
      summary:"무엇을 하는가? (소통과 공감)",
      content:[
        { subtitle:"모듈 1: 대나무숲 토크 (익명 기반)", text:"직급의 눈치 없이 평소 하지 못했던 말을 익명으로 쏟아내는 카타르시스와 공감의 시간입니다. 포스트잇과 실시간 웹 보드를 활용합니다." },
        { subtitle:"모듈 2: 리버스 멘토링", text:"청년 사무장이 베테랑 사무장의 멘토가 되어 최신 트렌드를 공유하고, 베테랑은 현장의 지혜를 전수합니다." }
      ]
    },
    {
      title:"제4장. 핵심 프로그램: 채움(Inspiration)",
      icon:<Lightbulb className="text-violet-500"/>,
      badge:"WHAT",
      summary:"무엇을 채우는가? (실무와 혁신)",
      content:[
        { subtitle:"모듈 3: AI 행정 혁신 세미나", text:"ChatGPT와 AI 도구들을 활용하여 주보 제작, 공문 작성, 데이터 관리 시간을 50% 단축하는 실전 스킬을 익힙니다." },
        { subtitle:"모듈 4: 천일국 행정 표준화 끝장 토론", text:"복잡한 행정 규정을 단순화하고, 전국 어디서나 동일한 수준의 행정 서비스가 제공될 수 있는 매뉴얼을 함께 만듭니다." }
      ]
    },
    {
      title:"제5장. 사후 관리 및 상시 학습",
      icon:<CheckCircle2 className="text-rose-500"/>,
      badge:"NEXT",
      summary:"워크숍 이후의 변화는?",
      content:[
        { subtitle:"5.1 지역별 혁신 클러스터 구축", text:"워크숍에서 매칭된 청년-베테랑 듀오가 지역으로 돌아가 실제 혁신 사례를 만들고 공유하는 네트워크를 상설화합니다." },
        { subtitle:"5.2 '사무장 미러 허브' 정기 진단", text:"본 플랫폼의 진단 도구를 통해 분기별로 자신의 성장과 조직의 소통 수준을 점검하고 피드백을 받습니다." }
      ]
    }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-20">
      {/* Header */}
      <section className="text-center space-y-8">
        <div className="flex justify-center">
          <span className="px-4 py-1.5 bg-amber-50 text-amber-600 text-[10px] font-black tracking-[0.3em] uppercase rounded-full">✟ 천일국 안착 시대</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight text-toss-gray-900">
          "이음과 채움"<br/>
          <span className="text-toss-blue">사무장 실무 혁신 워크숍</span>
        </h1>
        <p className="text-toss-gray-500 max-w-2xl mx-auto text-lg md:text-xl font-medium leading-relaxed">
          세대의 벽을 허물고 행정의 본질을 채우는<br/>거룩한 소통과 화합의 장을 기획합니다.
        </p>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
          {[
            {icon:<MapPin size={16}/>,label:"장소",value:"청심수련원"},
            {icon:<Users size={16}/>,label:"대상",value:"전국 사무장"},
            {icon:<Clock size={16}/>,label:"일정",value:"1박 2일"},
            {icon:<Heart size={16}/>,label:"핵심",value:"소통과 혁신"}
          ].map((s,i)=>(
            <div key={i} className="toss-card border-none bg-white p-5 text-center shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
              <div className="flex justify-center mb-3 text-toss-blue">{s.icon}</div>
              <div className="text-[10px] text-toss-gray-400 font-bold uppercase mb-1">{s.label}</div>
              <div className="text-sm font-black text-toss-gray-900">{s.value}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Mission Statement */}
      <div className="rounded-[32px] bg-toss-blue text-white p-10 md:p-14 relative overflow-hidden shadow-lg shadow-toss-blue/20">
        <div className="absolute top-0 right-0 p-10 opacity-10 text-white">
          <BookOpen size={120} />
        </div>
        <div className="flex items-start gap-8 relative z-10">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center shrink-0">
            <Flame className="text-white" size={32}/>
          </div>
          <div className="space-y-6">
            <h3 className="text-xl font-black text-white/90">✟ 사무장의 사명 선언</h3>
            <blockquote className="text-white leading-loose italic text-lg md:text-xl font-medium border-l-4 border-white/30 pl-8">
              "사무장은 하나님의 뜻이 행정의 효율성을 통해 꽃피우도록 봉사하는 거룩한 직분입니다.
              참부모님의 유업이 현장에서 살아 숨 쉬도록 헌신하는 천일국의 기둥입니다."
            </blockquote>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Plan Sections (Accordion) */}
        <div className="lg:col-span-2 space-y-6">
          {sections.map((section,idx)=>(
            <div key={idx} className={`toss-card border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden p-0`}>
              <button onClick={()=>setExpandedSection(expandedSection===idx?null:idx)} className="w-full p-8 flex items-center gap-6 text-left group">
                <div className="w-14 h-14 bg-toss-gray-50 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-toss-blue-light transition-colors">{section.icon}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="px-2 py-0.5 bg-toss-gray-100 text-toss-gray-500 text-[10px] font-black rounded uppercase">{section.badge}</span>
                    <h3 className="text-xl font-black text-toss-gray-900">{section.title}</h3>
                  </div>
                  <p className="text-sm text-toss-gray-400 font-medium">{section.summary}</p>
                </div>
                <ChevronRight size={20} className={`text-toss-gray-300 transition-transform ${expandedSection===idx?'rotate-90 text-toss-gray-900':''}`}/>
              </button>
              <AnimatePresence>
                {expandedSection===idx && (
                  <motion.div initial={{height:0,opacity:0}} animate={{height:'auto',opacity:1}} exit={{height:0,opacity:0}}>
                    <div className="px-8 pb-8 space-y-8 border-t border-toss-gray-50 pt-8">
                      {section.content.map((item,i)=>(
                        <div key={i} className="space-y-3">
                          <h4 className="text-base font-bold text-toss-blue flex items-center gap-2">
                            <Lightbulb size={18}/> {item.subtitle}
                          </h4>
                          <p className="text-sm text-toss-gray-600 leading-relaxed font-medium pl-7">{item.text}</p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          <div className="toss-card border-none bg-emerald-50 p-8 space-y-6">
            <h4 className="text-lg font-black text-emerald-600 flex items-center gap-2"><Award size={20}/> 기대 효과</h4>
            <div className="space-y-4">
              {["세대 간 소통 장벽 해소","행정 업무 30% 감축","디지털 역량 표준화","영적 소진 예방"].map((e,i)=>(
                <div key={i} className="flex items-center gap-3 text-sm font-bold text-toss-gray-700">
                  <CheckCircle2 size={18} className="text-emerald-500 shrink-0"/>{e}
                </div>
              ))}
            </div>
          </div>

          {/* Comment System */}
          <div className="toss-card border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col h-[600px] p-0 overflow-hidden">
            <div className="p-6 border-b border-toss-gray-50 flex justify-between items-center">
              <h4 className="font-black text-toss-gray-900 flex items-center gap-2"><MessageSquare size={18}/> 실시간 의견</h4>
              <span className="text-[11px] text-toss-blue font-black bg-toss-blue-light px-3 py-1 rounded-full">{comments.length}</span>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              <AnimatePresence>
                {comments.map(c=>(
                  <motion.div key={c.id} initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-toss-gray-100 rounded-full flex items-center justify-center"><User size={12} className="text-toss-gray-400"/></div>
                        <span className="text-[11px] font-black text-toss-gray-400">{c.user}</span>
                      </div>
                      <span className="text-[10px] text-toss-gray-300 font-bold">{c.timestamp}</span>
                    </div>
                    <div className="bg-toss-gray-50 p-4 rounded-2xl rounded-tl-none text-sm leading-relaxed text-toss-gray-700 font-medium border border-toss-gray-100">{c.text}</div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            <div className="p-6 border-t border-toss-gray-50">
              <div className="relative">
                <input type="text" value={newComment} onChange={e=>setNewComment(e.target.value)} onKeyDown={e=>e.key==='Enter'&&addComment()} placeholder="의견을 남겨주세요" className="w-full bg-toss-gray-50 border-none rounded-2xl px-5 py-4 pr-14 text-sm focus:ring-2 ring-toss-blue/20"/>
                <button onClick={addComment} className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-toss-blue rounded-xl flex items-center justify-center text-white active:scale-95 transition-all"><Send size={16}/></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
