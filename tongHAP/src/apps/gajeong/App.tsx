import React, { useState, useEffect } from 'react';
import { Link } from '@tanstack/react-router';
import { 
  LayoutGrid, 
  Users, 
  ClipboardList, 
  TrendingUp, 
  Target, 
  ShieldCheck, 
  MessageSquare, 
  Menu, 
  X, 
  ChevronRight, 
  ArrowRight,
  BookOpen,
  Flame,
  Search,
  Sparkles,
  Home,
  BarChart3,
  Calendar,
  Star,
  ArrowUpRight,
  Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { WorkshopDashboard } from './workshop/WorkshopDashboard';
import { WorkshopSurvey } from './workshop/WorkshopSurvey';
import { MinistryKPI } from './components/MinistryKPI';
import { ResourceHub } from './components/ResourceHub';
import { Regulations } from './components/Regulations';
import { Doctrine } from './components/Doctrine';
import { Intro } from './components/Intro';
import { Methodology } from './components/Methodology';
import { AdminDashboard } from './components/AdminDashboard';
import { Mentoring } from './components/Mentoring';
import { LoadingScreen } from './components/LoadingScreen';

type Tab = 'home' | 'kpi' | 'resources' | 'workshop-plan' | 'workshop-survey' | 'regulations' | 'doctrine' | 'mentoring' | 'methodology' | 'admin' | 'intro';

export function GajeongApp() {
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: '홈', icon: <Home size={18}/> },
    { id: 'kpi', label: '성과관리', icon: <TrendingUp size={18}/> },
    { id: 'resources', label: '목회자료', icon: <ClipboardList size={18}/> },
    { id: 'workshop-plan', label: '워크숍', icon: <Target size={18}/> },
    { id: 'regulations', label: '행정규정', icon: <ShieldCheck size={18}/> },
    { id: 'doctrine', label: '교리교육', icon: <BookOpen size={18}/> },
    { id: 'mentoring', label: '멘토링', icon: <Users size={18}/> },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'home': return (
        <motion.section
          key="home"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="space-y-16"
        >
          {/* Welcome & Stats Hero */}
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-gradient-to-br from-brand-900 to-indigo-950 p-10 md:p-14 rounded-[3.5rem] text-white shadow-2xl relative overflow-hidden group">
              <div className="absolute -top-24 -right-24 w-80 h-80 bg-brand-500/20 rounded-full blur-[100px] group-hover:scale-110 transition-transform duration-700" />
              <div className="relative z-10 space-y-8">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-brand-300 text-xs font-black tracking-widest uppercase backdrop-blur-md border border-white/10">
                    <Sparkles size={14} /> Today's Ministry Insight
                  </div>
                  <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-[1.1]">
                    반갑습니다, <br/>
                    <span className="text-brand-400">김사무장님.</span>
                  </h1>
                  <p className="text-indigo-200 text-lg font-medium max-w-xl leading-relaxed">
                    오늘의 주요 사역 목표는 '신규 등록 식구 정착 가이드' 배포와 '하반기 워크숍 장소 확정'입니다. 데이터를 통해 더 지혜로운 결정을 내려보세요.
                  </p>
                </div>
                <div className="flex flex-wrap gap-4 pt-4">
                  <button onClick={() => setActiveTab('kpi')} className="bg-brand-500 hover:bg-brand-600 px-8 py-4 rounded-2xl font-black transition-all shadow-lg shadow-brand-500/20 flex items-center gap-2">
                    대시보드 리포트 <ArrowRight size={20} />
                  </button>
                  <button onClick={() => setActiveTab('resources')} className="bg-white/10 hover:bg-white/20 px-8 py-4 rounded-2xl font-black transition-all backdrop-blur-md border border-white/10 flex items-center gap-2">
                    자료실 바로가기 <Search size={20} />
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm space-y-8 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-3">
                  <Calendar className="text-ffwpu-gold" /> 주요 사역 일정
                </h3>
                <div className="space-y-4">
                  {[
                    { date: '05.12', title: '2026 사무장 해커톤', type: '워크숍' },
                    { date: '05.15', title: '참부모님 말씀 훈독회', type: '예배' },
                    { date: '05.20', title: '행정 규정 개정 공청회', type: '회의' },
                  ].map((event, i) => (
                    <div key={i} className="flex items-center gap-4 p-4 hover:bg-slate-50 rounded-2xl transition-colors cursor-pointer group">
                      <div className="flex flex-col items-center justify-center w-14 h-14 bg-brand-50 rounded-xl group-hover:bg-brand-500 group-hover:text-white transition-all">
                        <span className="text-[10px] font-black uppercase opacity-60">May</span>
                        <span className="text-lg font-black leading-none">{event.date.split('.')[1]}</span>
                      </div>
                      <div>
                        <div className="text-sm font-black text-slate-900">{event.title}</div>
                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{event.type}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <button className="w-full py-4 text-brand-600 font-black text-sm hover:underline">
                전체 일정 보기
              </button>
            </div>
          </div>

          {/* Quick Access Grid */}
          <div className="space-y-8">
             <div className="flex items-center justify-between px-2">
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">퀵 메뉴 & 추천 서비스</h2>
                <span className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Quick Access</span>
             </div>
             <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { label: '교리 퀘스트', desc: '심정 교육 게임', icon: <Flame size={28}/>, id: 'doctrine', color: 'text-orange-600', bg: 'bg-orange-50' },
                  { label: '규정 검색', desc: '행정 지침 확인', icon: <ShieldCheck size={28}/>, id: 'regulations', color: 'text-brand-600', bg: 'bg-brand-50' },
                  { label: '멘토링 매칭', desc: '선후배 공직자 연결', icon: <Users size={28}/>, id: 'mentoring', color: 'text-indigo-600', bg: 'bg-indigo-50' },
                  { label: '워크숍 기획', desc: '현장 행사 설계', icon: <Zap size={28}/>, id: 'workshop-plan', color: 'text-emerald-600', bg: 'bg-emerald-50' },
                ].map((item, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveTab(item.id as Tab)}
                    className="group glass-card !p-8 hover:bg-white active:scale-[0.97] transition-all text-left border-2 border-transparent hover:border-slate-100 flex flex-col justify-between h-56"
                  >
                    <div className={`w-14 h-14 ${item.bg} ${item.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="text-lg font-black text-slate-900 mb-1">{item.label}</h4>
                      <p className="text-xs font-medium text-slate-400">{item.desc}</p>
                    </div>
                  </button>
                ))}
             </div>
          </div>

          {/* Platform News & Feedback */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-slate-900 rounded-[3rem] p-10 text-white space-y-6">
              <h3 className="text-xl font-black flex items-center gap-3">
                <LayoutGrid size={24} className="text-brand-400" /> 사역 자료 업데이트
              </h3>
              <div className="space-y-4">
                {[
                  '2026 하반기 신규 식구 정착 가이드.pdf',
                  '사무장 워크숍 해커톤 참고용 사례집.xlsx',
                  '천일국 행정 규정 제7차 개정안 요약.docx'
                ].map((doc, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors cursor-pointer">
                    <span className="text-sm font-medium opacity-80">{doc}</span>
                    <ArrowUpRight size={18} className="opacity-40" />
                  </div>
                ))}
              </div>
              <button onClick={() => setActiveTab('resources')} className="text-sm font-black text-brand-400 hover:underline">
                자료실 전체보기
              </button>
            </div>

            <div className="bg-amber-50 rounded-[3rem] p-10 border border-amber-100 space-y-6">
              <h3 className="text-xl font-black text-amber-900 flex items-center gap-3">
                <Target size={24} className="text-amber-600" /> 오늘의 사역 팁
              </h3>
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-amber-100">
                <p className="text-amber-900 font-medium leading-relaxed italic">
                  "식구들과의 상담 시 첫 5분은 경청에만 집중해보세요. 행정적인 답변보다 심정적인 공감이 먼저일 때 사역의 문이 열립니다."
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xs font-black text-amber-500 uppercase tracking-widest">— 멘토 그룹 제언</span>
                  <div className="flex gap-1 text-amber-300">
                     <Star size={14} fill="currentColor" />
                     <Star size={14} fill="currentColor" />
                     <Star size={14} fill="currentColor" />
                     <Star size={14} fill="currentColor" />
                     <Star size={14} fill="currentColor" />
                  </div>
                </div>
              </div>
              <button onClick={() => setActiveTab('workshop-survey')} className="w-full bg-amber-600 text-white py-4 rounded-2xl font-black hover:bg-amber-700 transition-all shadow-lg shadow-amber-600/20">
                워크숍 의견 보내기
              </button>
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
    <div className="min-h-screen flex flex-col bg-[#f8fafc] selection:bg-brand-500/10 selection:text-brand-500">
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
                <Link to="/" className="flex flex-col items-center gap-3 p-6 rounded-3xl text-[13px] font-black bg-slate-900 text-white" onClick={() => setIsMenuOpen(false)}>
                  <Home size={20}/> 통합 허브
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
