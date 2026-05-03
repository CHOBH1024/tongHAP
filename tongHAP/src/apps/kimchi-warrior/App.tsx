import { Link } from '@tanstack/react-router';
import { ArrowLeft, Target, Map, TrendingUp, Users, Construction } from 'lucide-react';

export function KimchiWarriorApp() {
  const features = [
    { icon: <Target size={20} />, title: '전도 계획', desc: '지역별 전도 전략 수립' },
    { icon: <TrendingUp size={20} />, title: '사명 트래커', desc: '전도 성과 및 목표 추적' },
    { icon: <Map size={20} />, title: '전략 지도', desc: '지역 전도 현황 시각화' },
    { icon: <Users size={20} />, title: '팀 전도 기록', desc: '팀별 전도 활동 공유' },
  ];

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #fef2f2 0%, #ffffff 50%, #fef2f2 100%)' }}>
      <header className="sticky top-0 z-10 px-6 py-4 bg-white/90 backdrop-blur-sm border-b border-red-100 flex items-center gap-4">
        <Link to="/" className="flex items-center gap-2 font-bold hover:opacity-70 transition-opacity" style={{ color: '#dc2626' }}>
          <ArrowLeft size={18} />
          <span>홈으로</span>
        </Link>
        <div className="h-5 w-px bg-red-200" />
        <span className="font-black text-red-900 text-sm">🥋 김치워리어 구역</span>
        <span className="ml-auto px-3 py-1 text-xs font-black rounded-full" style={{ background: '#fee2e2', color: '#dc2626' }}>개발 중</span>
      </header>

      <main className="max-w-xl mx-auto px-6 py-16 space-y-12">
        <div className="text-center space-y-5">
          <div className="text-8xl leading-none">🥋</div>
          <div>
            <h1 className="text-5xl font-black text-slate-900 tracking-tight">김치워리어</h1>
            <p className="font-bold text-lg mt-1" style={{ color: '#dc2626' }}>전도 & 사명</p>
            <p className="text-slate-500 font-medium mt-3 leading-relaxed">담대하게 복음을 전하는<br />전도 전사 구역입니다.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {features.map((f, i) => (
            <div key={i} className="bg-white rounded-2xl p-5 border border-red-100 flex items-start gap-4 opacity-60">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: '#fee2e2', color: '#dc2626' }}>{f.icon}</div>
              <div>
                <div className="font-bold text-slate-800 text-sm">{f.title}</div>
                <div className="text-slate-400 text-xs mt-0.5">{f.desc}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl font-bold text-sm" style={{ background: '#fee2e2', color: '#7f1d1d' }}>
            <Construction size={16} /> 이 구역은 현재 개발 중입니다
          </div>
        </div>
      </main>
    </div>
  );
}
