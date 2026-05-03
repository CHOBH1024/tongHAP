import { Link } from '@tanstack/react-router';
import { ArrowLeft, MessageCircle, CalendarDays, Smile, Users, Construction } from 'lucide-react';

export function JjanguApp() {
  const features = [
    { icon: <MessageCircle size={20} />, title: '커뮤니티 피드', desc: '공동체 소식 및 나눔 공간' },
    { icon: <CalendarDays size={20} />, title: '문화 행사', desc: '교회 행사 기획 및 참여' },
    { icon: <Smile size={20} />, title: '유머 코너', desc: '즐거운 공동체 문화 공간' },
    { icon: <Users size={20} />, title: '소그룹 관리', desc: '소그룹 모임 운영 지원' },
  ];

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #fff7ed 0%, #ffffff 50%, #fff7ed 100%)' }}>
      <header className="sticky top-0 z-10 px-6 py-4 bg-white/90 backdrop-blur-sm border-b border-orange-100 flex items-center gap-4">
        <Link to="/" className="flex items-center gap-2 font-bold hover:opacity-70 transition-opacity" style={{ color: '#ea580c' }}>
          <ArrowLeft size={18} />
          <span>홈으로</span>
        </Link>
        <div className="h-5 w-px bg-orange-200" />
        <span className="font-black text-orange-900 text-sm">😄 짱구 구역</span>
        <span className="ml-auto px-3 py-1 text-xs font-black rounded-full" style={{ background: '#ffedd5', color: '#ea580c' }}>개발 중</span>
      </header>

      <main className="max-w-xl mx-auto px-6 py-16 space-y-12">
        <div className="text-center space-y-5">
          <div className="text-8xl leading-none">😄</div>
          <div>
            <h1 className="text-5xl font-black text-slate-900 tracking-tight">짱구</h1>
            <p className="font-bold text-lg mt-1" style={{ color: '#ea580c' }}>커뮤니티 & 문화</p>
            <p className="text-slate-500 font-medium mt-3 leading-relaxed">유머와 따뜻함으로 공동체를<br />하나로 묶는 구역입니다.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {features.map((f, i) => (
            <div key={i} className="bg-white rounded-2xl p-5 border border-orange-100 flex items-start gap-4 opacity-60">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: '#ffedd5', color: '#ea580c' }}>{f.icon}</div>
              <div>
                <div className="font-bold text-slate-800 text-sm">{f.title}</div>
                <div className="text-slate-400 text-xs mt-0.5">{f.desc}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl font-bold text-sm" style={{ background: '#ffedd5', color: '#7c2d12' }}>
            <Construction size={16} /> 이 구역은 현재 개발 중입니다
          </div>
        </div>
      </main>
    </div>
  );
}
