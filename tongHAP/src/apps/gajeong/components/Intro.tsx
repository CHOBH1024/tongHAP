import React from 'react';
import { motion } from 'framer-motion';
import { Users, Globe, Flame, Star, Shield, Layout, Zap, Database, BarChart3, ChevronRight } from 'lucide-react';

export const Intro: React.FC = () => {
  return (
    <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} className="max-w-6xl mx-auto space-y-32 pb-32 px-6">
      
      {/* Hero Section */}
      <div className="text-center space-y-10 pt-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-5 py-2 bg-toss-blue-light text-toss-blue text-[11px] font-black tracking-[0.3em] uppercase rounded-full shadow-sm"
        >
          <Star size={14} fill="currentColor"/> 2026 GAJEONG NEXT-GEN PLATFORM
        </motion.div>
        <h1 className="text-5xl md:text-7xl font-black text-toss-gray-900 leading-[1.1] tracking-tight">
          심정의 계량화,<br />
          <span className="text-toss-blue">미래 목회의 나침반</span>
        </h1>
        <p className="text-toss-gray-500 text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed font-medium">
          Mirror Hub은 가정연합 공직자와 식구들의 영적 역량을 정밀 진단하고,<br/>참사랑의 실천을 체계적으로 돕는 글로벌 혁신 플랫폼입니다.
        </p>
        <div className="flex flex-wrap justify-center gap-4 pt-4">
          <button className="toss-button-primary px-10 py-5 text-lg shadow-xl shadow-toss-blue/20">플랫폼 시작하기</button>
          <button className="toss-button-ghost px-10 py-5 text-lg bg-white">학술 가이드 보기</button>
        </div>
      </div>

      {/* Core Ecosystem */}
      <div className="space-y-16">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-black text-toss-gray-900">플랫폼 핵심 생태계</h2>
          <p className="text-toss-gray-500 font-medium text-lg">데이터와 심정이 만나는 3가지 핵심 축</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { 
              icon: <Database size={32} />, 
              title: 'Mirror Hub', 
              color: 'text-toss-blue', 
              bg: 'bg-toss-blue-light', 
              desc: 'I, L, C, G, F 등 12가지 차원의 정밀 진단을 통해 개인과 조직의 상태를 투명하게 비춥니다.' 
            },
            { 
              icon: <Zap size={32} />, 
              title: 'Innovation Workshop', 
              color: 'text-amber-500', 
              bg: 'bg-amber-50', 
              desc: '진단 결과를 바탕으로 세대 간의 벽을 허물고 실무 혁신을 이끄는 역동적인 학습의 장입니다.' 
            },
            { 
              icon: <Shield size={32} />, 
              title: 'Admin & Policy', 
              color: 'text-emerald-600', 
              bg: 'bg-emerald-50', 
              desc: '천일국 안착 시대를 뒷받침하는 투명한 행정 규정과 교리 학습 시스템으로 조직의 뼈대를 세웁니다.' 
            }
          ].map((item, idx) => (
            <div key={idx} className="toss-card border-none shadow-[0_8px_30px_rgb(0,0,0,0.03)] p-12 space-y-8 hover:scale-[1.03] transition-all">
              <div className={`w-20 h-20 ${item.bg} ${item.color} rounded-[24px] flex items-center justify-center mb-2`}>
                {item.icon}
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-black text-toss-gray-900">{item.title}</h3>
                <p className="text-base text-toss-gray-500 leading-relaxed font-medium">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Philosophy Section */}
      <div className="toss-card border-none bg-toss-gray-900 text-white p-12 md:p-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-20 opacity-10 text-white">
          <Globe size={300} />
        </div>
        <div className="flex flex-col md:flex-row items-center gap-16 relative z-10">
          <div className="w-full md:w-1/2 space-y-10">
            <div className="space-y-6">
              <span className="text-toss-blue font-black text-xs uppercase tracking-[0.3em]">Our Philosophy</span>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">심정(Shim-Jung)을<br/>과학으로 증명하다</h2>
              <p className="text-white/70 leading-relaxed text-lg font-medium">
                우리는 보이지 않는 '심정'과 '영성'을 데이터로 시각화하여, 막연한 추측이 아닌 명확한 근거 위에서 서로를 이해하고 성장하도록 돕습니다. 이것이 가정연합이 추구하는 디지털 전환(DX)의 본질입니다.
              </p>
            </div>
            <div className="grid gap-6">
              {[
                { title: '심정의 계량화', desc: '주관적 신앙 체험을 객관적 지표로 전환' },
                { title: '세대 간 공명', desc: '데이터를 통한 세대 간 언어의 번역과 통합' },
                { title: '실천적 영성', desc: '진단이 삶의 변화와 사역의 성과로 이어지는 구조' }
              ].map((li, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-6 h-6 bg-toss-blue rounded-full flex items-center justify-center text-[10px] font-black shrink-0 mt-1">✓</div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-white">{li.title}</h4>
                    <p className="text-sm text-white/50">{li.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full md:w-1/2 grid grid-cols-2 gap-4">
            <div className="space-y-4 pt-12">
              <div className="aspect-square bg-white/5 rounded-[40px] flex flex-col items-center justify-center p-8 text-center border border-white/10">
                <BarChart3 className="text-toss-blue mb-4" size={40} />
                <div className="text-2xl font-black italic">99.8%</div>
                <div className="text-[10px] font-bold text-white/40 uppercase mt-2">Data Precision</div>
              </div>
              <div className="aspect-square bg-toss-blue rounded-[40px] flex flex-col items-center justify-center p-8 text-center shadow-2xl shadow-toss-blue/40">
                <Layout className="text-white mb-4" size={40} />
                <div className="text-2xl font-black italic">12 Dim</div>
                <div className="text-[10px] font-bold text-white/80 uppercase mt-2">Analysis Scope</div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="aspect-square bg-white/10 rounded-[40px] flex flex-col items-center justify-center p-8 text-center border border-white/20">
                <Users className="text-emerald-400 mb-4" size={40} />
                <div className="text-2xl font-black italic">5,000+</div>
                <div className="text-[10px] font-bold text-white/40 uppercase mt-2">Active Users</div>
              </div>
              <div className="aspect-square bg-white/5 rounded-[40px] flex flex-col items-center justify-center p-8 text-center border border-white/10">
                <Flame className="text-orange-400 mb-4" size={40} />
                <div className="text-2xl font-black italic">2026</div>
                <div className="text-[10px] font-bold text-white/40 uppercase mt-2">Vision Year</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center space-y-10 py-10">
        <h2 className="text-3xl font-black text-toss-gray-900 tracking-tight">당신의 Mirror를 발견할 준비가 되었나요?</h2>
        <button className="toss-button-primary px-12 py-6 text-xl shadow-2xl shadow-toss-blue/30 group">
          지금 무료 진단 시작하기 <ChevronRight className="inline-block ml-2 group-hover:translate-x-1 transition-transform" />
        </button>
        <p className="text-toss-gray-400 text-sm font-medium">본 플랫폼은 세계평화통일가정연합 공직자 및 식구 전용 서비스입니다.</p>
      </div>

    </motion.div>
  );
};
