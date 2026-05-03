import { createFileRoute, Link } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import { LayoutGrid, Users, Sparkles, ChevronRight, ArrowRight, ShieldCheck, BarChart3, Target } from 'lucide-react';
import { CHARACTERS } from '../characters';

export const Route = createFileRoute('/')({ component: UnifiedHub });

function UnifiedHub() {
  const logoPath = import.meta.env.BASE_URL + 'ffwpu_logo.png';

  return (
    <div className="relative min-h-screen bg-[#f8fafc] overflow-hidden selection:bg-brand-500/10 selection:text-brand-500">
      <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-brand-50/50 to-transparent -z-10" />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-ffwpu-gold/5 rounded-full blur-[100px] -z-10 animate-pulse" />
      <div className="absolute top-1/2 -left-24 w-80 h-80 bg-brand-500/5 rounded-full blur-[80px] -z-10" />

      <div className="max-w-5xl mx-auto px-6 py-12 md:py-24">
        {/* Header */}
        <header className="mb-16 space-y-8 text-center md:text-left">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center md:justify-start gap-3"
          >
            <div className="w-12 h-12 bg-white rounded-2xl p-2 shadow-sacred hover:rotate-12 transition-transform duration-500">
              <img src={logoPath} alt="FFWPU Logo" className="w-full h-full object-contain" />
            </div>
            <div className="flex flex-col items-start">
              <span className="text-ffwpu-gold font-black text-xs tracking-[0.3em] uppercase">Cheon Il Guk</span>
              <span className="text-brand-900 font-bold text-sm tracking-tight">세계평화통일가정연합</span>
            </div>
          </motion.div>

          <div className="space-y-4">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="text-5xl md:text-7xl font-black tracking-tighter text-brand-950 leading-[1.1]"
            >
              사역의 <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-indigo-600">본질</span>을 잇다,<br />
              지혜를 <span className="italic font-serif text-ffwpu-gold">통합</span>하다
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-slate-500 text-lg md:text-xl font-medium max-w-2xl mx-auto md:mx-0 leading-relaxed"
            >
              현장의 심정과 행정의 효율을 하나로 묶는<br className="hidden md:block" />
              천일국 공직자 전용 통합 사역 지원 플랫폼입니다.
            </motion.p>
          </div>
        </header>

        {/* Characters Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-20"
        >
          <div className="flex items-center justify-between mb-8 px-1">
            <div>
              <h2 className="text-2xl font-black text-brand-950 tracking-tight">가족 캐릭터 구역</h2>
              <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mt-1">Family Character Zones</p>
            </div>
            <span className="px-3 py-1.5 bg-slate-100 text-slate-500 text-xs font-black rounded-xl tracking-wide">8 ZONES</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {CHARACTERS.map((char, i) => (
              <motion.div
                key={char.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 + i * 0.05 }}
              >
                <Link
                  to={char.route as any}
                  className="group relative bg-white rounded-3xl p-6 border border-slate-100 hover:border-slate-200 hover:shadow-xl hover:-translate-y-1 active:scale-[0.98] transition-all duration-300 flex flex-col items-center text-center gap-3 block"
                >
                  {char.status === 'coming-soon' && (
                    <span className="absolute top-3 right-3 px-2 py-0.5 bg-slate-100 text-slate-400 text-[9px] font-black rounded-lg tracking-wide">준비 중</span>
                  )}
                  <div className="text-4xl group-hover:scale-110 transition-transform duration-300">{char.emoji}</div>
                  <div>
                    <div className="font-black text-slate-900 text-sm">{char.nameKo}</div>
                    <div className={`text-[11px] font-bold mt-0.5 ${char.accentClass}`}>{char.role}</div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Platform Apps Section */}
        <div className="mb-6 px-1">
          <h2 className="text-2xl font-black text-brand-950 tracking-tight">사역 플랫폼</h2>
          <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mt-1">Ministry Platforms</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Main Hero Card - GAJEONG */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="md:col-span-2"
          >
            <Link
              to="/gajeong"
              className="group relative overflow-hidden glass-card flex flex-col md:flex-row items-center justify-between !p-10 md:!p-16 bg-white/40 hover:bg-white active:scale-[0.99] transition-all duration-700 border-2 border-white/50 hover:border-brand-500/20"
            >
              <div className="absolute top-0 right-0 p-12 opacity-5 text-9xl font-black group-hover:scale-110 transition-transform duration-700">G</div>
              <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
                <div className="w-24 h-24 md:w-32 md:h-32 bg-brand-500 rounded-[2.5rem] flex items-center justify-center text-white shadow-2xl shadow-brand-500/20 group-hover:rotate-12 transition-transform duration-700">
                  <LayoutGrid size={56} strokeWidth={1.5} />
                </div>
                <div className="text-center md:text-left space-y-4">
                  <div className="flex items-center justify-center md:justify-start gap-3">
                    <span className="px-3 py-1 bg-brand-100 text-brand-600 text-[10px] font-black tracking-widest uppercase rounded-lg">Administrative Hub</span>
                    <span className="w-1.5 h-1.5 bg-brand-500 rounded-full animate-ping" />
                  </div>
                  <h2 className="text-3xl md:text-5xl font-black text-brand-950 tracking-tight">GAJEONG 사역 허브</h2>
                  <p className="text-slate-500 text-lg font-medium max-w-md">현장 워크숍 기획부터 행정 규정, 교리 퀘스트까지<br />사무장 업무의 모든 것을 통합 관리합니다.</p>
                </div>
              </div>
              <div className="mt-10 md:mt-0 flex items-center gap-4 bg-brand-50 text-brand-600 px-8 py-4 rounded-2xl font-black group-hover:bg-brand-500 group-hover:text-white transition-all shadow-sm group-hover:shadow-brand-500/30">
                입장하기 <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </motion.div>

          {/* MIM25 */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Link
              to="/mim25"
              className="group glass-card !p-10 hover:bg-white active:scale-[0.98] h-full flex flex-col justify-between border-2 border-transparent hover:border-indigo-100 transition-all duration-500"
            >
              <div className="space-y-8">
                <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Users size={32} />
                </div>
                <div className="space-y-3">
                  <h3 className="text-2xl font-black text-brand-950 tracking-tight">목회공직자 유형진단</h3>
                  <p className="text-slate-500 font-medium">에니어그램과 5대 지표를 활용한<br />섭리적 아키타입 다면 분석 시스템</p>
                </div>
              </div>
              <div className="mt-10 flex items-center justify-between text-indigo-600 font-black">
                <span className="text-sm">MIM25 Assessment</span>
                <ChevronRight size={20} className="group-hover:translate-x-1 transition-all" />
              </div>
            </Link>
          </motion.div>

          {/* Mirror Insight */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Link
              to="/mirror-insight"
              className="group glass-card !p-10 hover:bg-white active:scale-[0.98] h-full flex flex-col justify-between border-2 border-transparent hover:border-ffwpu-gold/20 transition-all duration-500"
            >
              <div className="space-y-8">
                <div className="w-16 h-16 bg-amber-50 text-ffwpu-gold rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <ShieldCheck size={32} />
                </div>
                <div className="space-y-3">
                  <h3 className="text-2xl font-black text-brand-950 tracking-tight">Mirror Insight</h3>
                  <p className="text-slate-500 font-medium">9가지 전문 진단도구 기반의<br />심층적 자아 성찰 및 역량 관리 플랫폼</p>
                </div>
              </div>
              <div className="mt-10 flex items-center justify-between text-ffwpu-gold font-black">
                <span className="text-sm">Research Based Insight</span>
                <ChevronRight size={20} className="group-hover:translate-x-1 transition-all" />
              </div>
            </Link>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24 space-y-10"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 px-4">
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-black text-brand-950 tracking-tight">플랫폼 데이터 현황</h3>
              <p className="text-slate-400 font-bold text-sm uppercase tracking-widest mt-1">Real-time Platform Statistics</p>
            </div>
            <div className="flex items-center gap-2 bg-white px-6 py-3 rounded-2xl shadow-sm border border-slate-100">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-xs font-black text-slate-600">서버 상태 정상</span>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: '누적 진단', value: '12,402', icon: <Sparkles size={20} />, color: 'text-brand-600' },
              { label: '활성 사무장', value: '842', icon: <Users size={20} />, color: 'text-indigo-600' },
              { label: '교육 자료', value: '1,250', icon: <BarChart3 size={20} />, color: 'text-amber-600' },
              { label: '매칭 성공률', value: '98.2%', icon: <Target size={20} />, color: 'text-rose-600' },
            ].map((stat, i) => (
              <div key={i} className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all group">
                <div className={`w-10 h-10 rounded-xl bg-slate-50 ${stat.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  {stat.icon}
                </div>
                <div className="text-3xl font-black text-brand-950 mb-1">{stat.value}</div>
                <div className="text-xs font-black text-slate-400 uppercase tracking-widest">{stat.label}</div>
              </div>
            ))}
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
