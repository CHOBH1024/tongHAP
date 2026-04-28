import { createFileRoute, Link } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import { LayoutGrid, Users, Sparkles, ChevronRight, ArrowRight, ShieldCheck, BarChart3 } from 'lucide-react';

export const Route = createFileRoute('/')({
  component: UnifiedHub,
});

function UnifiedHub() {
  return (
    <div className="relative min-h-screen bg-[#f2f4f6] overflow-hidden">
      {/* Animated Background Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-brand-500/5 blur-[120px]" 
        />
        <motion.div 
          animate={{ 
            scale: [1.2, 1, 1.2],
            x: [0, -40, 0],
            y: [0, -20, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-500/5 blur-[120px]" 
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 lg:py-32">
        <header className="text-center space-y-8 mb-20">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-6 py-2 bg-white/80 backdrop-blur-md rounded-full shadow-premium text-brand-500 font-bold text-sm border border-white/50"
          >
            <Sparkles size={16} className="animate-pulse" />
            <span>THE NEXT GENERATION PLATFORM</span>
          </motion.div>
          
          <div className="space-y-4">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.8 }}
              className="text-6xl md:text-8xl font-black tracking-tight text-brand-900 leading-[1.1]"
            >
              통합 진단 <span className="gradient-text">커맨드 센터</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-xl md:text-2xl text-slate-500 max-w-3xl mx-auto leading-relaxed font-medium"
            >
              개인의 가치 발견부터 공동체의 성장까지, <br className="hidden md:block" />
              전문적인 진단과 데이터 분석을 통한 통합 사역 지원 플랫폼입니다.
            </motion.p>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* GAJEONG Mirror Hub Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <Link
              to="/gajeong"
              className="group glass-card h-full flex flex-col justify-between"
            >
              <div>
                <div className="w-20 h-20 bg-brand-500 text-white rounded-[2rem] flex items-center justify-center mb-10 shadow-2xl shadow-brand-500/20 group-hover:scale-110 transition-transform duration-500">
                  <LayoutGrid size={40} />
                </div>
                <h2 className="text-4xl font-black mb-6 tracking-tight">GAJEONG 미러 허브</h2>
                <p className="text-slate-500 text-lg mb-10 leading-relaxed font-medium">
                  나를 알아가는 12가지 전문 진단, 워크숍 마스터 플랜 및 행정 규정 통합 플랫폼.
                </p>
                
                <div className="grid grid-cols-2 gap-4 mb-10">
                  {['12개 진단 모듈', '워크숍 기획 도구', '행정/교리 학습', '전문 멘토링'].map((feature) => (
                    <div key={feature} className="flex items-center gap-2 text-sm font-bold text-slate-400">
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-500" />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2 premium-btn-primary self-start group-hover:gap-4 transition-all">
                플랫폼 입장하기 <ArrowRight size={24} />
              </div>
            </Link>
          </motion.div>

          {/* MIM35 Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <Link
              to="/mim35"
              className="group glass-card h-full flex flex-col justify-between border-emerald-500/10"
            >
              <div>
                <div className="w-20 h-20 bg-emerald-500 text-white rounded-[2rem] flex items-center justify-center mb-10 shadow-2xl shadow-emerald-500/20 group-hover:scale-110 transition-transform duration-500">
                  <Users size={40} />
                </div>
                <h2 className="text-4xl font-black mb-6 tracking-tight">목회공직자 유형진단</h2>
                <p className="text-slate-500 text-lg mb-10 leading-relaxed font-medium">
                  에니어그램, Big 5, 커리어 앵커, VIA 강점검사를 통합한 
                  최첨단 소명 아키타입 진단 도구입니다.
                </p>

                <div className="grid grid-cols-2 gap-4 mb-10">
                  {['심층 유형 분석', '성격/강점 통합', '커리어 앵커링', '팀 빌더 지원'].map((feature) => (
                    <div key={feature} className="flex items-center gap-2 text-sm font-bold text-slate-400">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2 px-8 py-4 rounded-2xl bg-emerald-500 text-white font-bold hover:bg-emerald-600 hover:shadow-lg hover:shadow-emerald-500/20 active:scale-95 self-start group-hover:gap-4 transition-all">
                진단 시작하기 <ArrowRight size={24} />
              </div>
            </Link>
          </motion.div>

          {/* Mirror Insight Card */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <Link
              to="/mirror-insight"
              className="group glass-card h-full flex flex-col justify-between border-indigo-500/10"
            >
              <div>
                <div className="w-20 h-20 bg-indigo-500 text-white rounded-[2rem] flex items-center justify-center mb-10 shadow-2xl shadow-indigo-500/20 group-hover:scale-110 transition-transform duration-500">
                  <ShieldCheck size={40} />
                </div>
                <h2 className="text-4xl font-black mb-6 tracking-tight">Mirror Insight</h2>
                <p className="text-slate-500 text-lg mb-10 leading-relaxed font-medium">
                  내면의 가치와 윤리적 좌표를 점검하는 정밀 인사이트 시스템.
                  9가지 전문 거울로 당신의 내면을 비춰보세요.
                </p>

                <div className="grid grid-cols-2 gap-4 mb-10">
                  {['소명/가치 진단', '진정성 측정', '세대 공감 분석', '사회적 감수성'].map((feature) => (
                    <div key={feature} className="flex items-center gap-2 text-sm font-bold text-slate-400">
                      <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2 px-8 py-4 rounded-2xl bg-indigo-500 text-white font-bold hover:bg-indigo-600 hover:shadow-lg hover:shadow-indigo-500/20 active:scale-95 self-start group-hover:gap-4 transition-all">
                인사이트 확인 <ArrowRight size={24} />
              </div>
            </Link>
          </motion.div>
        </div>

        {/* Bottom Stats/Info */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="mt-20 glass-card p-12 border-none bg-brand-900 text-white relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-12 opacity-10 rotate-12 scale-150">
            <BarChart3 size={200} />
          </div>
          
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="space-y-2">
              <div className="text-5xl font-black text-brand-500">12+</div>
              <div className="text-sm font-bold text-slate-400 uppercase tracking-widest">전문 진단 모듈</div>
            </div>
            <div className="space-y-2">
              <div className="text-5xl font-black text-emerald-500">150+</div>
              <div className="text-sm font-bold text-slate-400 uppercase tracking-widest">정밀 분석 지표</div>
            </div>
            <div className="space-y-2">
              <div className="text-5xl font-black text-indigo-500">A.I</div>
              <div className="text-sm font-bold text-slate-400 uppercase tracking-widest">유형 매칭 엔진</div>
            </div>
          </div>
        </motion.div>

        <footer className="mt-20 text-center text-slate-400 font-bold py-10">
          <p>© 2026 TONGHAP UNIFIED ECOSYSTEM. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}
