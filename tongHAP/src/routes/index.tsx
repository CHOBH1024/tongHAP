import { createFileRoute, Link } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import { LayoutGrid, Users, Sparkles, ChevronRight } from 'lucide-react';

export const Route = createFileRoute('/')({
  component: Hub,
});

function Hub() {
  return (
    <div className="min-h-screen bg-[#f2f4f6] py-12 px-6">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm text-toss-blue font-bold text-sm"
          >
            <Sparkles size={16} />
            <span>통합 플랫폼</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl font-black tracking-tight text-toss-gray-900"
          >
            통합 진단 시스템
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-toss-gray-600 max-w-2xl mx-auto leading-relaxed"
          >
            전문적인 진단 플랫폼 GAJEONG과 목회공직자 유형진단이 하나로 통합되었습니다.
            원하시는 기능을 선택해주세요.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Link
              to="/gajeong"
              className="group block toss-card border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-2xl transition-all h-full"
            >
              <div className="w-16 h-16 bg-toss-blue text-white rounded-3xl flex items-center justify-center mb-8 shadow-lg shadow-toss-blue/20">
                <LayoutGrid size={32} />
              </div>
              <h2 className="text-3xl font-black mb-4">GAJEONG 미러 허브</h2>
              <p className="text-toss-gray-500 text-lg mb-8 leading-relaxed">
                나를 알아가는 12가지 전문 진단, 워크숍 기획 및 행정 규정 등
                통합 사역 지원 플랫폼을 경험해보세요.
              </p>
              <div className="flex items-center gap-2 text-toss-blue font-black text-lg group-hover:gap-4 transition-all">
                플랫폼 입장하기 <ChevronRight size={24} />
              </div>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Link
              to="/mim35"
              className="group block toss-card border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-2xl transition-all h-full"
            >
              <div className="w-16 h-16 bg-emerald-500 text-white rounded-3xl flex items-center justify-center mb-8 shadow-lg shadow-emerald-500/20">
                <Users size={32} />
              </div>
              <h2 className="text-3xl font-black mb-4">목회공직자 유형진단</h2>
              <p className="text-toss-gray-500 text-lg mb-8 leading-relaxed">
                에니어그램, Big 5, 커리어 앵커, VIA 강점검사를 통합한
                목회공직자 소명 아키타입 진단 도구입니다.
              </p>
              <div className="flex items-center gap-2 text-emerald-600 font-black text-lg group-hover:gap-4 transition-all">
                진단 시작하기 <ChevronRight size={24} />
              </div>
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center pt-12 text-toss-gray-400 font-medium"
        >
          <p>© 2026 TONGHAP. All rights reserved.</p>
        </motion.div>
      </div>
    </div>
  );
}
