import { Link } from '@tanstack/react-router';
import { ArrowLeft, Crown, Users, Calendar, FileText, Construction } from 'lucide-react';

export function WooseongApp() {
  const features = [
    { icon: <Crown size={20} />, title: '리더십 대시보드', desc: '팀 현황 및 목표 한눈에 보기' },
    { icon: <Users size={20} />, title: '팀 관리', desc: '구성원 역할 및 권한 설정' },
    { icon: <Calendar size={20} />, title: '일정 조율', desc: '회의·행사 일정 통합 관리' },
    { icon: <FileText size={20} />, title: '행정 보고서', desc: '보고서 작성 및 공유' },
  ];

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #fffbeb 0%, #ffffff 50%, #fffbeb 100%)' }}>
      <header className="sticky top-0 z-10 px-6 py-4 bg-white/90 backdrop-blur-sm border-b border-amber-100 flex items-center gap-4">
        <Link to="/" className="flex items-center gap-2 font-bold hover:opacity-70 transition-opacity" style={{ color: '#d97706' }}>
          <ArrowLeft size={18} />
          <span>홈으로</span>
        </Link>
        <div className="h-5 w-px bg-amber-200" />
        <span className="font-black text-amber-900 text-sm">🦁 우성 구역</span>
        <span className="ml-auto px-3 py-1 text-xs font-black rounded-full" style={{ background: '#fef3c7', color: '#d97706' }}>개발 중</span>
      </header>

      <main className="max-w-xl mx-auto px-6 py-16 space-y-12">
        <div className="text-center space-y-5">
          <div className="text-8xl leading-none">🦁</div>
          <div>
            <h1 className="text-5xl font-black text-slate-900 tracking-tight">우성</h1>
            <p className="font-bold text-lg mt-1" style={{ color: '#d97706' }}>리더십 & 행정</p>
            <p className="text-slate-500 font-medium mt-3 leading-relaxed">팀을 이끌고 조직을 세우는<br />리더십 구역입니다.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {features.map((f, i) => (
            <div key={i} className="bg-white rounded-2xl p-5 border border-amber-100 flex items-start gap-4 opacity-60">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: '#fef3c7', color: '#d97706' }}>{f.icon}</div>
              <div>
                <div className="font-bold text-slate-800 text-sm">{f.title}</div>
                <div className="text-slate-400 text-xs mt-0.5">{f.desc}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl font-bold text-sm" style={{ background: '#fef3c7', color: '#92400e' }}>
            <Construction size={16} /> 이 구역은 현재 개발 중입니다
          </div>
        </div>
      </main>
    </div>
  );
}
