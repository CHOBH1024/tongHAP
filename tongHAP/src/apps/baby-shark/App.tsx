import { Link } from '@tanstack/react-router';
import { ArrowLeft, Waves, UserPlus, BookMarked, Activity, Construction } from 'lucide-react';

export function BabySharkApp() {
  const features = [
    { icon: <Waves size={20} />, title: '청소년 모임', desc: '청소년 모임 기획 및 관리' },
    { icon: <UserPlus size={20} />, title: '새신자 온보딩', desc: '새신자 환영 및 정착 지원' },
    { icon: <BookMarked size={20} />, title: '커리큘럼', desc: '청소년 맞춤 교육 과정' },
    { icon: <Activity size={20} />, title: '활동 기록', desc: '참여 활동 및 성장 기록' },
  ];

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #eef2ff 0%, #ffffff 50%, #eef2ff 100%)' }}>
      <header className="sticky top-0 z-10 px-6 py-4 bg-white/90 backdrop-blur-sm border-b border-indigo-100 flex items-center gap-4">
        <Link to="/" className="flex items-center gap-2 font-bold hover:opacity-70 transition-opacity" style={{ color: '#4f46e5' }}>
          <ArrowLeft size={18} />
          <span>홈으로</span>
        </Link>
        <div className="h-5 w-px bg-indigo-200" />
        <span className="font-black text-indigo-900 text-sm">🦈 아기상어 구역</span>
        <span className="ml-auto px-3 py-1 text-xs font-black rounded-full" style={{ background: '#e0e7ff', color: '#4f46e5' }}>개발 중</span>
      </header>

      <main className="max-w-xl mx-auto px-6 py-16 space-y-12">
        <div className="text-center space-y-5">
          <div className="text-8xl leading-none">🦈</div>
          <div>
            <h1 className="text-5xl font-black text-slate-900 tracking-tight">아기상어</h1>
            <p className="font-bold text-lg mt-1" style={{ color: '#4f46e5' }}>청소년 & 새신자</p>
            <p className="text-slate-500 font-medium mt-3 leading-relaxed">청소년과 새신자를 위한<br />활기찬 사역 구역입니다.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {features.map((f, i) => (
            <div key={i} className="bg-white rounded-2xl p-5 border border-indigo-100 flex items-start gap-4 opacity-60">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: '#e0e7ff', color: '#4f46e5' }}>{f.icon}</div>
              <div>
                <div className="font-bold text-slate-800 text-sm">{f.title}</div>
                <div className="text-slate-400 text-xs mt-0.5">{f.desc}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl font-bold text-sm" style={{ background: '#e0e7ff', color: '#312e81' }}>
            <Construction size={16} /> 이 구역은 현재 개발 중입니다
          </div>
        </div>
      </main>
    </div>
  );
}
