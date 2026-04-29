import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { 
  Home, BookOpen, ShieldCheck, ChevronRight, Sparkles, Menu, X, 
  ClipboardList, Users, Heart, ArrowRight, TrendingUp, Calendar,
  Globe, Award, BarChart3, Lightbulb, Target, Flame, MessageSquare
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { WorkshopDashboard } from './workshop/WorkshopDashboard';
import { MinistryKPI } from './components/MinistryKPI';
import { ResourceHub } from './components/ResourceHub';
import { Regulations } from './components/Regulations';
import { Doctrine } from './components/Doctrine';
import { Intro } from './components/Intro';
import { Methodology } from './components/Methodology';
import { AdminDashboard } from './components/AdminDashboard';
import { Mentoring } from './components/Mentoring';
import { LoadingScreen } from './components/LoadingScreen';

type Tab = 'home'|'workshop-plan'|'workshop-survey'|'regulations'|'doctrine'|'intro'|'methodology'|'admin'|'mentoring'|'kpi'|'resources';

const announcements = [
  { date: '2026.04.28', title: '제3차 전국 사무장 워크숍 안내', tag: '공지', color: 'bg-rose-50 text-rose-600' },
  { date: '2026.04.25', title: 'AI 행정 도구 활용 가이드 배포', tag: '자료', color: 'bg-blue-50 text-blue-600' },
  { date: '2026.04.20', title: '2026년 하반기 인사이동 일정 공고', tag: '인사', color: 'bg-amber-50 text-amber-600' },
  { date: '2026.04.15', title: '디지털 전환 지침 개정안 시행', tag: '규정', color: 'bg-emerald-50 text-emerald-600' },
];

const quickStats = [
  { label: '워크숍 모델', value: '3종', icon: <ClipboardList size={20}/>, color: 'text-indigo-600', bg: 'bg-indigo-50' },
  { label: '행정 규정', value: '8건', icon: <ShieldCheck size={20}/>, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { label: '교리 퀘스트', value: '5과목', icon: <BookOpen size={20}/>, color: 'text-violet-600', bg: 'bg-violet-50' },
  { label: '멘토 매칭', value: '98%', icon: <Users size={20}/>, color: 'text-rose-600', bg: 'bg-rose-50' },
];

const weeklySchedule = [
  { day: '월', activity: '훈독회 및 주간 목표 설정', time: '06:00' },
  { day: '화', activity: '교구 행정 업무 처리', time: '09:00' },
  { day: '수', activity: '식구 심방 및 상담', time: '14:00' },
  { day: '목', activity: '청년부 프로그램 기획', time: '19:00' },
  { day: '금', activity: '주말 예배 준비 및 리허설', time: '15:00' },
  { day: '토', activity: '지역 봉사 및 전도 활동', time: '10:00' },
  { day: '일', activity: '주일 예배 및 교육 프로그램', time: '10:30' },
];

const visionGoals = [
  { title: '디지털 행정 100%', progress: 72, desc: '2027년까지 모든 행정의 페이퍼리스 전환' },
  { title: '세대 소통 프로그램', progress: 58, desc: '전국 교구 리버스 멘토링 시스템 도입' },
  { title: '공직자 역량 강화', progress: 85, desc: 'Mirror Insight 기반 맞춤형 교육 체계' },
  { title: '투명 재정 시스템', progress: 90, desc: '실시간 헌금 관리 및 외부 감사 의무화' },
];

export function GajeongApp() {
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: '홈', icon: <Home size={20}/> },
    { id: 'kpi', label: '성과관리', icon: <TrendingUp size={20}/> },
    { id: 'resources', label: '목회자료', icon: <ClipboardList size={20}/> },
    { id: 'workshop-plan', label: '워크숍', icon: <Target size={20}/> },
    { id: 'regulations', label: '행정규정', icon: <ShieldCheck size={20}/> },
    { id: 'doctrine', label: '교리퀘스트', icon: <BookOpen size={20}/> },
    { id: 'mentoring', label: '멘토링', icon: <Users size={20}/> },
  ];

  const renderContent = () => {
    switch(activeTab) {
      case 'home': return (
        <motion.section key="home" initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} className="space-y-16">
          {/* Hero */}
          <div className="space-y-8 text-center md:text-left">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="inline-flex items-center gap-2 px-4 py-2 bg-brand-50 rounded-full text-brand-500 text-xs font-black tracking-widest uppercase mb-4">
              <Sparkles size={14} /> Innovation in Ministry
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-5xl md:text-7xl font-black leading-[1.05] tracking-tighter text-brand-900">
              사역의 미래를<br />
              <span className="gradient-text">데이터</span>로 열다.
            </motion.h1>
            <p className="text-slate-500 text-xl md:text-2xl leading-relaxed max-w-2xl font-medium">
              GAJEONG은 워크숍 기획, 행정 규정, 교리 교육, 멘토링을 하나로 통합하여<br className="hidden md:block" />
              현장 사역의 전문성과 효율을 극대화합니다.
            </p>
            <div className="flex flex-col md:flex-row gap-4 pt-6">
              <button onClick={() => setActiveTab('workshop-plan')} className="premium-btn-primary text-xl px-10 py-6">워크숍 기획하기</button>
              <Link to="/mirror-insight" className="premium-btn-secondary text-xl px-10 py-6">Mirror 진단 바로가기</Link>
            </div>
          </div>

          {/* New: Daily Focus & Live Stats */}
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 bg-gradient-to-br from-[#1e1b4b] to-indigo-900 rounded-[3rem] p-10 text-white relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 p-8 opacity-10 rotate-12"><Target size={180}/></div>
              <div className="relative z-10 space-y-6">
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-md">
                     <Flame className="text-amber-400" size={24} />
                   </div>
                   <h3 className="text-xl font-black">오늘의 사역 성찰 미션</h3>
                </div>
                <blockquote className="text-2xl font-black italic leading-tight text-indigo-100">
                  "식구 한 분의 이름을 정성껏 부르며,<br/>그의 내면 깊은 소리에 귀를 기울여 보십시오."
                </blockquote>
                <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                  <div className="px-4 py-2 bg-white/20 rounded-xl text-xs font-bold">훈독 명상 연계</div>
                  <div className="px-4 py-2 bg-amber-500 rounded-xl text-xs font-black">미션 완료 시 +50 XP</div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-[3rem] p-8 border border-slate-100 shadow-sm space-y-6">
              <div className="flex items-center gap-2 text-slate-400">
                <BarChart3 size={18}/>
                <span className="text-[10px] font-black uppercase tracking-widest">Global Statistics</span>
              </div>
              <div className="space-y-4">
                {[
                  { label: "전국 평균 사역 몰입도", value: "78%", trend: "+2.4%", up: true },
                  { label: "디지털 행정 전환율", value: "64%", trend: "+12%", up: true },
                  { label: "세대 간 소통 지수", value: "52%", trend: "-1.5%", up: false },
                ].map((stat, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                    <div>
                      <div className="text-[10px] font-black text-slate-400 uppercase">{stat.label}</div>
                      <div className="text-xl font-black text-slate-900">{stat.value}</div>
                    </div>
                    <div className={`text-xs font-black ${stat.up ? 'text-emerald-500' : 'text-rose-500'}`}>
                      {stat.trend}
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full py-4 text-xs font-black text-indigo-600 bg-indigo-50 rounded-2xl hover:bg-indigo-100 transition-colors">
                상세 통계 보고서 보기
              </button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickStats.map((s, i) => (
              <motion.div key={i} initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:i*0.1}}
                className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100 hover:shadow-lg transition-all group cursor-pointer"
              >
                <div className={`w-12 h-12 ${s.bg} ${s.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  {s.icon}
                </div>
                <div className="text-3xl font-black text-brand-900 mb-1">{s.value}</div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">{s.label}</div>
              </motion.div>
            ))}
          </div>
          
          {/* Feature Cards */}
          <div className="grid md:grid-cols-2 gap-8">
            <div onClick={()=>setActiveTab('kpi')} className="glass-card cursor-pointer group flex flex-col justify-between h-[380px] hover:bg-emerald-900 hover:text-white transition-all duration-700">
              <div className="space-y-6">
                <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-[2rem] flex items-center justify-center group-hover:bg-white/10 group-hover:text-white transition-all">
                  <TrendingUp size={32}/>
                </div>
                <h3 className="text-3xl font-black tracking-tight">사역 성과 관리 (KPI)</h3>
                <p className="text-slate-500 text-lg font-medium group-hover:text-white/60">주간/월간 달성 지표, 심방 현황, 재정 지수 등<br/>객관적 데이터로 사역을 진단합니다.</p>
              </div>
              <div className="text-emerald-600 font-black flex items-center gap-3 text-lg group-hover:text-white group-hover:gap-6 transition-all">
                대시보드 보기 <ArrowRight size={24}/>
              </div>
            </div>
            
            <div onClick={()=>setActiveTab('resources')} className="glass-card cursor-pointer group flex flex-col justify-between h-[380px] hover:bg-rose-900 hover:text-white transition-all duration-700">
              <div className="space-y-6">
                <div className="w-16 h-16 bg-rose-50 text-rose-600 rounded-[2rem] flex items-center justify-center group-hover:bg-white/10 group-hover:text-white transition-all">
                  <ClipboardList size={32}/>
                </div>
                <h3 className="text-3xl font-black tracking-tight">통합 목회 자료실</h3>
                <p className="text-slate-500 text-lg font-medium group-hover:text-white/60">공식 기획안, 교육 PPT, 행정 서식 등<br/>사역에 필요한 모든 리소스를 제공합니다.</p>
              </div>
              <div className="text-rose-600 font-black flex items-center gap-3 text-lg group-hover:text-white group-hover:gap-6 transition-all">
                자료 검색 <ArrowRight size={24}/>
              </div>
            </div>

            <div onClick={()=>setActiveTab('workshop-plan')} className="glass-card cursor-pointer group flex flex-col justify-between h-[380px] hover:bg-brand-900 hover:text-white transition-all duration-700">
              <div className="space-y-6">
                <div className="w-16 h-16 bg-amber-50 text-ffwpu-gold rounded-[2rem] flex items-center justify-center group-hover:bg-white/10 group-hover:text-white transition-all">
                  <Target size={32}/>
                </div>
                <h3 className="text-3xl font-black tracking-tight">워크숍 마스터</h3>
                <p className="text-slate-500 text-lg font-medium group-hover:text-white/60">혁신 행정, 세대 공감, 심정 치유 등<br/>3가지 시나리오 기반 워크숍을 기획합니다.</p>
              </div>
              <div className="text-ffwpu-gold font-black flex items-center gap-3 text-lg group-hover:text-white group-hover:gap-6 transition-all">
                플랜 보기 <ArrowRight size={24}/>
              </div>
            </div>
            
            <div onClick={()=>setActiveTab('regulations')} className="glass-card cursor-pointer group flex flex-col justify-between h-[380px] hover:bg-indigo-900 hover:text-white transition-all duration-700">
              <div className="space-y-6">
                <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-[2rem] flex items-center justify-center group-hover:bg-white/10 group-hover:text-white transition-all">
                  <ShieldCheck size={32}/>
                </div>
                <h3 className="text-3xl font-black tracking-tight">행정 규정 센터</h3>
                <p className="text-slate-500 text-lg font-medium group-hover:text-white/60">공직 윤리, 인사 배치, 투명 재정 등<br/>8개 핵심 규정을 검색하고 학습합니다.</p>
              </div>
              <div className="text-indigo-600 font-black flex items-center gap-3 text-lg group-hover:text-white group-hover:gap-6 transition-all">
                규정 보기 <ArrowRight size={24}/>
              </div>
            </div>
          </div>

          {/* Announcements */}
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-black text-brand-900 flex items-center gap-3">
                <div className="w-2 h-8 bg-brand-500 rounded-full"/>공지사항
              </h3>
            </div>
            <div className="bg-white rounded-[2rem] divide-y divide-slate-50 shadow-sm border border-slate-100 overflow-hidden">
              {announcements.map((a, i) => (
                <div key={i} className="flex items-center justify-between p-6 hover:bg-slate-50 transition-colors cursor-pointer group">
                  <div className="flex items-center gap-4">
                    <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${a.color}`}>{a.tag}</span>
                    <span className="font-bold text-slate-800 group-hover:text-brand-500 transition-colors">{a.title}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-slate-400 font-bold hidden md:block">{a.date}</span>
                    <ChevronRight size={16} className="text-slate-300 group-hover:text-brand-500 transition-colors"/>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Vision 2027 Progress */}
          <div className="space-y-8">
            <h3 className="text-2xl font-black text-brand-900 flex items-center gap-3">
              <div className="w-2 h-8 bg-ffwpu-gold rounded-full"/>Vision 2027 달성 현황
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {visionGoals.map((g, i) => (
                <div key={i} className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-black text-lg text-slate-900">{g.title}</h4>
                    <span className="text-2xl font-black text-brand-500">{g.progress}%</span>
                  </div>
                  <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div initial={{width:0}} animate={{width:`${g.progress}%`}} transition={{duration:1,delay:i*0.15}} className="h-full bg-gradient-to-r from-brand-500 to-indigo-500 rounded-full"/>
                  </div>
                  <p className="text-sm text-slate-500 font-medium">{g.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Weekly Schedule */}
          <div className="space-y-8">
            <h3 className="text-2xl font-black text-brand-900 flex items-center gap-3">
              <div className="w-2 h-8 bg-emerald-500 rounded-full"/>주간 사역 일정 (모범)
            </h3>
            <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100">
              <div className="grid grid-cols-7 gap-2">
                {weeklySchedule.map((s, i) => (
                  <div key={i} className="text-center space-y-3 p-4 rounded-2xl hover:bg-slate-50 transition-colors cursor-pointer group">
                    <div className="w-10 h-10 mx-auto bg-slate-100 rounded-full flex items-center justify-center text-sm font-black text-slate-600 group-hover:bg-brand-500 group-hover:text-white transition-all">
                      {s.day}
                    </div>
                    <div className="text-[10px] font-bold text-brand-500">{s.time}</div>
                    <div className="text-[11px] font-bold text-slate-600 leading-tight">{s.activity}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Services */}
          <div className="space-y-8">
            <h3 className="text-2xl font-black text-brand-900">추천 서비스</h3>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { label: '교리 퀘스트', desc: '게이미피케이션 학습', icon: <BookOpen size={24}/>, action: () => setActiveTab('doctrine'), color: 'text-indigo-600', bg: 'bg-indigo-50' },
                { label: '행정 규정', desc: '투명하고 효율적인 사역', icon: <ShieldCheck size={24}/>, action: () => setActiveTab('regulations'), color: 'text-blue-600', bg: 'bg-blue-50' },
                { label: '전문 멘토링', desc: 'AI 기반 세대 간 매칭', icon: <Users size={24}/>, action: () => setActiveTab('mentoring'), color: 'text-rose-600', bg: 'bg-rose-50' },
                { label: 'Mirror 진단', desc: '9가지 전문 진단도구', icon: <Target size={24}/>, action: () => {}, color: 'text-amber-600', bg: 'bg-amber-50', link: '/mirror-insight' },
              ].map((item, idx) => (
                item.link ? (
                  <Link key={idx} to={item.link} className="glass-card !p-8 group hover:bg-slate-50 transition-all border-none bg-white block">
                    <div className={`w-14 h-14 ${item.bg} ${item.color} rounded-2xl mb-6 flex items-center justify-center group-hover:rotate-12 transition-transform`}>
                      {item.icon}
                    </div>
                    <h4 className="font-black text-xl text-brand-900 mb-2">{item.label}</h4>
                    <p className="text-slate-400 font-bold text-sm leading-relaxed">{item.desc}</p>
                  </Link>
                ) : (
                  <div key={idx} onClick={item.action} className="glass-card !p-8 group hover:bg-slate-50 transition-all border-none bg-white cursor-pointer">
                    <div className={`w-14 h-14 ${item.bg} ${item.color} rounded-2xl mb-6 flex items-center justify-center group-hover:rotate-12 transition-transform`}>
                      {item.icon}
                    </div>
                    <h4 className="font-black text-xl text-brand-900 mb-2">{item.label}</h4>
                    <p className="text-slate-400 font-bold text-sm leading-relaxed">{item.desc}</p>
                  </div>
                )
              ))}
            </div>
          </div>
        </motion.section>
      );
      case 'kpi': return <MinistryKPI/>;
      case 'resources': return <ResourceHub/>;
      case 'workshop-plan': return <WorkshopDashboard/>;
      case 'workshop-survey': return <WorkshopSurvey/>;
      case 'regulations': return <Regulations/>;
      case 'doctrine': return <Doctrine/>;
      case 'mentoring': return <Mentoring/>;
      case 'methodology': return <Methodology/>;
      case 'admin': return <AdminDashboard/>;
      case 'intro': return <Intro/>;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f2f4f6] selection:bg-brand-500/10 selection:text-brand-500">
      <LoadingScreen />
      
      <nav className="sticky top-0 z-[100] px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between bg-white/70 backdrop-blur-2xl border border-white/50 rounded-[28px] px-8 py-3 shadow-sacred">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setActiveTab('home')}>
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sacred group-hover:rotate-12 transition-transform p-1">
              <img src={import.meta.env.BASE_URL + 'ffwpu_logo.png'} alt="Logo" className="w-full h-full object-contain" />
            </div>
            <span className="text-xl font-black tracking-tight text-brand-900">GAJEONG</span>
          </div>

          <div className="hidden lg:flex items-center gap-1">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as Tab)}
                className={`px-5 py-2.5 rounded-2xl text-[13px] font-black transition-all flex items-center gap-2 ${activeTab === item.id ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/20' : 'text-slate-500 hover:bg-slate-50'}`}
              >
                {item.icon} {item.label}
              </button>
            ))}
          </div>

          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden p-3 bg-slate-50 rounded-2xl text-slate-900 hover:bg-slate-100 transition-all">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <div className="hidden lg:flex items-center gap-4 border-l border-slate-100 ml-4 pl-4">
            <Link to="/mirror-insight" className="px-4 py-2 bg-brand-50 text-brand-500 rounded-xl text-xs font-black hover:bg-brand-100 transition-all flex items-center gap-2">
              <Target size={14}/> Mirror 진단
            </Link>
          </div>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 10, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              className="lg:hidden absolute top-full left-6 right-6 bg-white/95 backdrop-blur-2xl border border-white/50 rounded-[32px] p-8 shadow-2xl z-[101]"
            >
              <div className="grid grid-cols-2 gap-4">
                {navItems.map(item => (
                  <button
                    key={item.id}
                    onClick={() => { setActiveTab(item.id as Tab); setIsMenuOpen(false); }}
                    className={`flex flex-col items-center gap-3 p-6 rounded-3xl text-[13px] font-black transition-all ${activeTab === item.id ? 'bg-brand-500 text-white shadow-xl shadow-brand-500/20' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}
                  >
                    <div className={activeTab === item.id ? 'text-white' : 'text-brand-500'}>{item.icon}</div>
                    {item.label}
                  </button>
                ))}
                <Link to="/mirror-insight" className="flex flex-col items-center gap-3 p-6 rounded-3xl text-[13px] font-black bg-amber-50 text-amber-600" onClick={() => setIsMenuOpen(false)}>
                  <Target size={20}/> Mirror 진단
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main className="flex-1 max-w-6xl mx-auto w-full px-6 py-12">
        <AnimatePresence mode="wait">
          {renderContent()}
        </AnimatePresence>
      </main>

      <footer className="py-24 px-8 border-t border-slate-100 bg-white/30 backdrop-blur-md mt-32">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div className="flex items-center gap-3 text-2xl font-black text-slate-900">
              <div className="w-10 h-10 bg-brand-500 rounded-xl flex items-center justify-center p-1.5 shadow-lg shadow-brand-500/20">
                <img src={import.meta.env.BASE_URL + 'ffwpu_logo.png'} alt="Logo" className="w-full h-full object-contain brightness-0 invert" />
              </div>
              GAJEONG
            </div>
            <p className="text-slate-500 font-bold leading-relaxed max-w-sm">
              워크숍, 규정, 교육, 멘토링을 하나로 통합하여<br/>현장 사역의 새로운 미래를 설계합니다.
            </p>
          </div>
          <div className="flex flex-col md:items-end justify-between gap-8">
            <div className="flex gap-12">
              <div className="space-y-4">
                <h5 className="font-black text-xs text-slate-300 uppercase tracking-widest">Platform</h5>
                <ul className="space-y-2 text-sm font-black text-slate-600">
                <li className="cursor-pointer hover:text-brand-500 transition-colors" onClick={()=>setActiveTab('kpi')}>사역 성과 관리</li>
                <li className="cursor-pointer hover:text-brand-500 transition-colors" onClick={()=>setActiveTab('resources')}>목회 자료실</li>
                <li className="cursor-pointer hover:text-brand-500 transition-colors" onClick={()=>setActiveTab('workshop-plan')}>워크숍 기획</li>
                <li className="cursor-pointer hover:text-brand-500 transition-colors" onClick={()=>setActiveTab('regulations')}>행정 규정</li>
                <li className="cursor-pointer hover:text-brand-500 transition-colors" onClick={()=>setActiveTab('doctrine')}>교리 퀘스트</li>
                </ul>
              </div>
              <div className="space-y-4">
                <h5 className="font-black text-xs text-slate-300 uppercase tracking-widest">Connect</h5>
                <ul className="space-y-2 text-sm font-black text-slate-600">
                  <li className="cursor-pointer hover:text-brand-500 transition-colors" onClick={()=>setActiveTab('mentoring')}>멘토링</li>
                  <li><Link to="/mirror-insight" className="hover:text-brand-500 transition-colors">Mirror 진단</Link></li>
                </ul>
              </div>
            </div>
            <div className="text-[10px] font-black text-slate-300 tracking-[0.3em] uppercase">
              © 2026 GAJEONG INNOVATION PLATFORM. ALL RIGHTS RESERVED.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default GajeongApp;
