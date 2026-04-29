import { createFileRoute, Link } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import { LayoutGrid, Users, Sparkles, ChevronRight, ArrowRight, ShieldCheck, BarChart3 } from 'lucide-react';

export const Route = createFileRoute('/')({
  component: UnifiedHub,
});

function UnifiedHub() {
  const logoPath = import.meta.env.BASE_URL + "ffwpu_logo.png";

  return (
    <div className="relative min-h-screen bg-toss-gray-100 selection:bg-ffwpu-gold/20 selection:text-ffwpu-gold">
      <div className="max-w-3xl mx-auto px-6 py-12 md:py-24">
        <header className="mb-12 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 text-ffwpu-gold font-bold text-sm tracking-tight"
          >
            <div className="w-10 h-10 bg-white rounded-full p-1 shadow-sacred">
               <img src={logoPath} alt="FFWPU Logo" className="w-full h-full object-contain" />
            </div>
            <span>세계평화통일가정연합</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-4xl md:text-5xl font-black tracking-tight text-ffwpu-blue leading-tight"
          >
            심정과 지혜를 더하는<br />
            <span className="gradient-text">사역 통합 플랫폼</span>
          </motion.h1>
        </header>

        <div className="space-y-6">
          {/* GAJEONG Mirror Hub Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Link
              to="/gajeong"
              className="group glass-card flex items-center justify-between !p-6 md:!p-8 hover:bg-white active:scale-[0.98]"
            >
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 md:w-16 md:h-16 bg-brand-50 text-ffwpu-gold rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <LayoutGrid size={32} />
                </div>
                <div>
                  <h2 className="text-xl md:text-2xl font-black text-ffwpu-blue mb-1">GAJEONG 사역 허브</h2>
                  <p className="text-toss-gray-500 text-sm md:text-base font-medium">워크숍 · 행정규정 · 교리교육 · 멘토링</p>
                </div>
              </div>
              <ChevronRight size={24} className="text-toss-gray-200 group-hover:text-ffwpu-gold group-hover:translate-x-1 transition-all" />
            </Link>
          </motion.div>

          {/* MIM35 Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <Link
              to="/mim25"
              className="group glass-card flex items-center justify-between !p-6 md:!p-8 hover:bg-white active:scale-[0.98]"
            >
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 md:w-16 md:h-16 bg-blue-50 text-ffwpu-blue rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <Users size={32} />
                </div>
                <div>
                  <h2 className="text-xl md:text-2xl font-black text-ffwpu-blue mb-1">목회공직자 유형진단</h2>
                  <p className="text-toss-gray-500 text-sm md:text-base font-medium">에니어그램 & 강점 통합 분석</p>
                </div>
              </div>
              <ChevronRight size={24} className="text-toss-gray-200 group-hover:text-ffwpu-blue group-hover:translate-x-1 transition-all" />
            </Link>
          </motion.div>

          {/* Mirror Insight Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <Link
              to="/mirror-insight"
              className="group glass-card flex items-center justify-between !p-6 md:!p-8 hover:bg-white active:scale-[0.98]"
            >
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 md:w-16 md:h-16 bg-amber-50 text-ffwpu-gold rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <ShieldCheck size={32} />
                </div>
                <div>
                  <h2 className="text-xl md:text-2xl font-black text-ffwpu-blue mb-1">Mirror Insight</h2>
                  <p className="text-toss-gray-500 text-sm md:text-base font-medium">9가지 전문 진단도구 · 학술 기반 분석</p>
                </div>
              </div>
              <ChevronRight size={24} className="text-toss-gray-200 group-hover:text-ffwpu-gold group-hover:translate-x-1 transition-all" />
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 bg-white rounded-[2rem] p-10 space-y-10"
        >
          <div className="flex items-center justify-between border-b border-toss-gray-100 pb-8">
            <h3 className="text-lg font-black text-ffwpu-blue">통합 플랫폼 대시보드</h3>
            <span className="text-xs font-bold text-toss-gray-400 uppercase tracking-widest">Cheon Il Guk Epoch</span>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div className="space-y-1">
              <div className="text-toss-gray-500 text-[10px] font-black uppercase tracking-widest">진단 모듈</div>
              <div className="text-2xl font-black text-ffwpu-gold">9 Units</div>
            </div>
            <div className="space-y-1">
              <div className="text-toss-gray-500 text-[10px] font-black uppercase tracking-widest">심정 지표</div>
              <div className="text-2xl font-black text-ffwpu-blue">150+ Index</div>
            </div>
            <div className="space-y-1 col-span-2 md:col-span-1">
              <div className="text-toss-gray-500 text-[10px] font-black uppercase tracking-widest">분석 엔진</div>
              <div className="text-2xl font-black text-brand-600">Sacred Matcher</div>
            </div>
          </div>
        </motion.div>

        <footer className="mt-16 text-center text-toss-gray-400 font-bold py-10 space-y-6">
          <div className="flex justify-center items-center gap-2 opacity-50">
             <img src={logoPath} alt="FFWPU Logo" className="w-6 h-6 grayscale" />
             <span className="text-[10px] tracking-[0.3em] font-black uppercase">Family Federation for World Peace and Unification</span>
          </div>
          <p className="text-xs">© 2026 세계평화통일가정연합 통합 시스템.</p>
        </footer>
      </div>
    </div>
  );
}
