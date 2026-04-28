import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Heart, 
  Compass, 
  X, 
  Send,
  ChevronRight
} from 'lucide-react';

export const Mentoring: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'recommend' | 'active'>('recommend');
  const [selectedMentor, setSelectedMentor] = useState<any | null>(null);
  const [requestSent, setRequestSent] = useState(false);

  const recommendations = [
    {
      id: 1,
      role: '원로 목회자',
      name: '이평화 멘토',
      strength: 'L-Mirror 리더십 최상위',
      seeking: 'G-Mirror 세대공감 우수 청년',
      matchScore: 98,
      avatarColor: 'bg-indigo-100 text-indigo-600',
      description: '30년간 선교 현장에서 쌓은 지혜를 나누고 싶어요. 특히 원리강론의 현대적 해석과 비전 수립에 자신이 있습니다.',
      tags: ['전도', '시스템 구축', '영적 상담']
    },
    {
      id: 2,
      role: '청년 리더',
      name: '김통일 멘티',
      strength: 'G-Mirror 디지털 역량 최상위',
      seeking: 'C-Mirror 상담 전문가',
      matchScore: 94,
      avatarColor: 'bg-emerald-100 text-emerald-600',
      description: '교회 내 디지털 혁신에 관심이 많은 2세 청년입니다. 선배님들의 깊은 심정과 지혜를 배워 현장에 적용하고 싶습니다.',
      tags: ['IT 혁신', '온라인 전도', '커뮤니티']
    },
    {
      id: 3,
      role: '현장 사역자',
      name: '박사랑 멘토',
      strength: 'F-Mirror 신앙 교리 최상위',
      seeking: 'I-Mirror 탐색 중인 청년',
      matchScore: 89,
      avatarColor: 'bg-amber-100 text-amber-600',
      description: '심정 목회의 길을 걷고 있습니다. 방황하는 청년들이 하나님과의 수직적 관계를 회복하도록 돕고 싶습니다.',
      tags: ['심정 공명', '가정 행복', '말씀 연구']
    }
  ];

  const handleRequest = () => {
    setRequestSent(true);
    setTimeout(() => {
      setRequestSent(false);
      setSelectedMentor(null);
    }, 2000);
  };

  return (
    <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} className="max-w-4xl mx-auto space-y-10 pb-20">
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-black tracking-widest uppercase rounded-full">
          <Sparkles size={14}/> 70대 혁신 과제 #21
        </div>
        <h1 className="text-4xl font-black text-toss-gray-900 tracking-tight leading-tight">세대를 잇는<br/>AI 멘토링 매칭</h1>
        <p className="text-toss-gray-500 font-medium text-lg">Mirror 진단 데이터를 기반으로<br/>나를 채워줄 최적의 파트너를 추천합니다.</p>
      </div>

      <div className="flex gap-6 border-b border-toss-gray-200">
        <button onClick={() => setActiveTab('recommend')} className={`pb-4 font-bold text-sm transition-all relative ${activeTab === 'recommend' ? 'text-toss-blue' : 'text-toss-gray-400 hover:text-toss-gray-900'}`}>
          AI 맞춤 추천
          {activeTab === 'recommend' && <motion.div layoutId="tab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-toss-blue" />}
        </button>
        <button onClick={() => setActiveTab('active')} className={`pb-4 font-bold text-sm transition-all relative ${activeTab === 'active' ? 'text-toss-blue' : 'text-toss-gray-400 hover:text-toss-gray-900'}`}>
          진행 중인 멘토링
          {activeTab === 'active' && <motion.div layoutId="tab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-toss-blue" />}
        </button>
      </div>

      {activeTab === 'recommend' && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} className="space-y-8">
          <div className="toss-card border-none bg-toss-blue-light flex flex-col md:flex-row items-center justify-between gap-8 p-8">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 rounded-2xl bg-toss-blue text-white flex items-center justify-center shrink-0 shadow-lg shadow-toss-blue/20">
                <Compass size={32}/>
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-black text-toss-gray-900">나의 매칭 알고리즘 상태</h3>
                <p className="text-sm text-toss-gray-600 leading-relaxed font-medium">당신의 리더십 스타일은 <span className="text-toss-blue font-bold">"성장하는 실무자"</span>이며,<br/><span className="text-toss-blue font-bold">"심정의 부모"</span> 유형의 멘토를 찾고 있습니다.</p>
              </div>
            </div>
            <button className="toss-button-primary shadow-none px-6 py-3 text-sm">알고리즘 업데이트</button>
          </div>

          <div className="grid gap-6">
            {recommendations.map(rec => (
              <div key={rec.id} onClick={() => setSelectedMentor(rec)} className="toss-card border-none flex flex-col md:flex-row items-center justify-between gap-6 cursor-pointer group">
                <div className="flex items-center gap-6">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center ${rec.avatarColor} shrink-0`}>
                    <Users size={28}/>
                  </div>
                  <div className="space-y-1">
                    <div className="text-xs font-bold text-toss-gray-400">{rec.role}</div>
                    <h3 className="text-xl font-bold text-toss-gray-900">{rec.name}</h3>
                    <div className="text-sm text-toss-gray-500 font-medium">{rec.strength}</div>
                  </div>
                </div>
                <div className="flex items-center gap-6 w-full md:w-auto">
                  <div className="text-right space-y-1">
                    <div className="text-xs font-black text-toss-blue uppercase tracking-widest">매칭률 {rec.matchScore}%</div>
                    <div className="w-24 h-1.5 bg-toss-gray-100 rounded-full overflow-hidden">
                      <motion.div initial={{width:0}} animate={{width:`${rec.matchScore}%` }} className="h-full bg-toss-blue"/>
                    </div>
                  </div>
                  <ChevronRight size={20} className="text-toss-gray-300 group-hover:text-toss-gray-900 transition-colors ml-auto"/>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Mentor Detail Modal */}
      <AnimatePresence>
        {selectedMentor && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-toss-gray-900/60 backdrop-blur-sm">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-lg bg-white p-10 rounded-[32px] shadow-2xl overflow-hidden"
            >
              <button onClick={() => setSelectedMentor(null)} className="absolute top-8 right-8 text-toss-gray-400 hover:text-toss-gray-900 transition-colors">
                <X size={24}/>
              </button>

              <div className="flex items-center gap-6 mb-10">
                <div className={`w-20 h-20 rounded-2xl flex items-center justify-center ${selectedMentor.avatarColor}`}>
                  <Users size={32}/>
                </div>
                <div>
                  <div className="text-sm font-bold text-toss-blue mb-1">{selectedMentor.role}</div>
                  <h2 className="text-2xl font-black text-toss-gray-900">{selectedMentor.name}</h2>
                  <div className="flex gap-2 mt-2">
                    {selectedMentor.tags.map((tag: string) => (
                      <span key={tag} className="text-[10px] font-black px-2 py-0.5 bg-toss-gray-100 text-toss-gray-500 rounded uppercase">#{tag}</span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-6 mb-10">
                <div className="p-6 bg-toss-gray-50 rounded-2xl space-y-2">
                  <h4 className="text-xs font-black text-toss-gray-400 uppercase tracking-widest">소개 및 철학</h4>
                  <p className="text-sm text-toss-gray-700 leading-relaxed font-medium">{selectedMentor.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-toss-blue-light rounded-2xl">
                    <div className="flex items-center gap-2 mb-2 text-toss-blue">
                      <ShieldCheck size={16}/>
                      <span className="text-[10px] font-black uppercase">검증된 강점</span>
                    </div>
                    <div className="text-xs text-toss-gray-900 font-bold">{selectedMentor.strength}</div>
                  </div>
                  <div className="p-4 bg-rose-50 rounded-2xl">
                    <div className="flex items-center gap-2 mb-2 text-rose-500">
                      <Heart size={16}/>
                      <span className="text-[10px] font-black uppercase">찾는 파트너</span>
                    </div>
                    <div className="text-xs text-toss-gray-900 font-bold">{selectedMentor.seeking}</div>
                  </div>
                </div>
              </div>

              <button 
                onClick={handleRequest}
                disabled={requestSent}
                className={`w-full py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-3 transition-all ${requestSent ? 'bg-emerald-500 text-white' : 'toss-button-primary'}`}
              >
                {requestSent ? (
                  <><ShieldCheck size={24}/> 요청을 보냈어요!</>
                ) : (
                  <><Send size={24}/> 멘토링 매칭 신청하기</>
                )}
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {activeTab === 'active' && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} className="toss-card border-none py-20 text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-toss-gray-100 flex items-center justify-center text-toss-gray-300 mx-auto">
            <Users size={32}/>
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-toss-gray-900">현재 진행 중인 멘토링이 없어요</h3>
            <p className="text-toss-gray-500 font-medium">새로운 멘토/멘티를 만나 세대간의 벽을 허물어보세요.</p>
          </div>
          <button onClick={() => setActiveTab('recommend')} className="text-toss-blue font-bold flex items-center gap-2 mx-auto hover:gap-3 transition-all">
            추천 리스트 보기 <ArrowRight size={18}/>
          </button>
        </motion.div>
      )}

      {/* Success Stories Section */}
      <div className="space-y-8">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-amber-50 text-amber-500 rounded-xl flex items-center justify-center">
            <Sparkles size={20}/>
          </div>
          <h2 className="text-2xl font-black text-toss-gray-900 tracking-tight">멘토링 성공 사례</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            { title: "디지털로 핀 심정 목회", content: "70대 베테랑 목회자와 20대 IT 전공 청년이 만나 교회 홈페이지와 SNS를 혁신했습니다. 어르신들은 청년의 열정을 배우고, 청년은 깊은 신앙의 뿌리를 찾았습니다.", author: "강원교구 박OO 목사" },
            { title: "세대 간 갈등, 대화로 녹이다", content: "사무장 간의 업무 지시 방식 차이로 힘들었던 교구에서 멘토링을 도입한 후, 서로의 언어를 이해하게 되었습니다. 이제는 매주 차담 시간을 가질 정도로 가까워졌어요.", author: "경기교구 이OO 사무장" }
          ].map((story, i) => (
            <div key={i} className="toss-card border-none bg-white p-8 space-y-4 shadow-[0_8px_30px_rgb(0,0,0,0.02)]">
              <h4 className="text-lg font-black text-toss-gray-900">{story.title}</h4>
              <p className="text-sm text-toss-gray-600 leading-relaxed font-medium">"{story.content}"</p>
              <div className="text-[10px] font-black text-toss-blue uppercase tracking-widest">— {story.author}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Mentoring Guidebook Section */}
      <div className="toss-card border-none bg-toss-gray-50 p-10 md:p-14 space-y-10">
        <div className="space-y-2">
          <h2 className="text-2xl font-black text-toss-gray-900 tracking-tight">멘토링 가이드북</h2>
          <p className="text-sm text-toss-gray-500 font-medium">효과적인 멘토링을 위해 이것만은 꼭 지켜주세요.</p>
        </div>
        <div className="grid gap-4">
          {[
            { q: "첫 만남에서는 무엇을 하나요?", a: "서로의 Mirror 진단 결과를 공유하며 '강점'과 '보완점'을 솔직하게 나누는 것부터 시작하세요. 심정적 유대감이 형성되는 가장 빠른 길입니다." },
            { q: "만남의 주기는 어느 정도가 적당한가요?", a: "월 1~2회 정기적인 만남을 권장합니다. 오프라인 만남이 어렵다면 화상 회의나 카카오톡을 통한 수시 소통도 좋습니다." },
            { q: "멘토링의 목표는 어떻게 잡아야 하나요?", a: "거창한 목표보다는 '이번 달에는 AI 도구 하나 마스터하기' 또는 '원리강론 1장 함께 훈독하기'처럼 구체적이고 작은 실천 위주로 잡으세요." }
          ].map((item, i) => (
            <div key={i} className="space-y-2 border-b border-toss-gray-200 pb-6 last:border-none">
              <div className="flex items-start gap-3">
                <span className="text-toss-blue font-black mt-1">Q.</span>
                <h4 className="text-base font-bold text-toss-gray-900">{item.q}</h4>
              </div>
              <div className="flex items-start gap-3 pl-6">
                <p className="text-sm text-toss-gray-600 leading-relaxed font-medium">{item.a}</p>
              </div>
            </div>
          ))}
        </div>
        <button className="toss-button-ghost bg-white w-full py-4 text-sm flex items-center justify-center gap-2">
          가이드북 전문 다운로드 (PDF) <ChevronRight size={18} />
        </button>
      </div>

    </motion.div>
  );
};
