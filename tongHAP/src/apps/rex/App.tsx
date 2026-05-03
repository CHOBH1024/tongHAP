import { Link } from '@tanstack/react-router';
import { ArrowLeft, Dumbbell, TrendingUp, Heart, Star, Construction } from 'lucide-react';

export function RexApp() {
  const features = [
    { icon: <Dumbbell size={20} />, title: '훈련 프로그램', desc: '단계별 영적 훈련 커리큘럼' },
    { icon: <TrendingUp size={20} />, title: '성장 기록', desc: '개인 성장 여정 추적' },
    { icon: <Heart size={20} />, title: '멘토링 매칭', desc: '멘토-멘티 연결 시스템' },
    { icon: <Star size={20} />, title: '역량 테스트', desc: '현재 역량 수준 진단' },
  ];

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #f0fdf4 0%, #ffffff 50%, #f0fdf4 100%)' }}>
      <header className="sticky top-0 z-10 px-6 py-4 bg-white/90 backdrop-blur-sm border-b border-green-100 flex items-center gap-4">
        <Link to="/" className="flex items-center gap-2 font-bold hover:opacity-70 transition-opacity" style={{ color: '#16a34a' }}>
          <ArrowLeft size={18} />
          <span>홈으로</span>
        </Link>
        <div className="h-5 w-px bg-green-200" />
        <span className="font-black text-green-900 text-sm">🦖 렉스 구역</span>
        <span className="ml-auto px-3 py-1 text-xs font-black rounded-full" style={{ background: '#dcfce7', color: '#16a34a' }}>개발 중</span>
      </header>

      <main className="max-w-xl mx-auto px-6 py-16 space-y-12">
        <div className="text-center space-y-5">
          <div className="text-8xl leading-none">🦖</div>
          <div>
            <h1 className="text-5xl font-black text-slate-900 tracking-tight">렉스</h1>
            <p className="font-bold text-lg mt-1" style={{ color: '#16a34a' }}>훈련 & 성장</p>
            <p className="text-slate-500 font-medium mt-3 leading-relaxed">강인한 훈련과 영적 성장을<br />이끄는 구역입니다.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {features.map((f, i) => (
            <div key={i} className="bg-white rounded-2xl p-5 border border-green-100 flex items-start gap-4 opacity-60">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: '#dcfce7', color: '#16a34a' }}>{f.icon}</div>
              <div>
                <div className="font-bold text-slate-800 text-sm">{f.title}</div>
                <div className="text-slate-400 text-xs mt-0.5">{f.desc}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl font-bold text-sm" style={{ background: '#dcfce7', color: '#14532d' }}>
            <Construction size={16} /> 이 구역은 현재 개발 중입니다
          </div>
        </div>
      </main>
    </div>
  );
}
