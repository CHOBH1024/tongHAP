import { Link } from '@tanstack/react-router';
import { ArrowLeft, Wrench, Plug, Search, Bot, Construction } from 'lucide-react';

export function DoraemonApp() {
  const features = [
    { icon: <Wrench size={20} />, title: '도구 모음', desc: '사역에 필요한 모든 도구 모음' },
    { icon: <Plug size={20} />, title: '자원 연결', desc: '외부 자원 및 서비스 연결' },
    { icon: <Search size={20} />, title: '스마트 검색', desc: '전체 시스템 통합 검색' },
    { icon: <Bot size={20} />, title: 'AI 어시스턴트', desc: 'AI 기반 업무 자동화 도구' },
  ];

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #ecfeff 0%, #ffffff 50%, #ecfeff 100%)' }}>
      <header className="sticky top-0 z-10 px-6 py-4 bg-white/90 backdrop-blur-sm border-b border-cyan-100 flex items-center gap-4">
        <Link to="/" className="flex items-center gap-2 font-bold hover:opacity-70 transition-opacity" style={{ color: '#0891b2' }}>
          <ArrowLeft size={18} />
          <span>홈으로</span>
        </Link>
        <div className="h-5 w-px bg-cyan-200" />
        <span className="font-black text-cyan-900 text-sm">🤖 도라에몽 구역</span>
        <span className="ml-auto px-3 py-1 text-xs font-black rounded-full" style={{ background: '#cffafe', color: '#0891b2' }}>개발 중</span>
      </header>

      <main className="max-w-xl mx-auto px-6 py-16 space-y-12">
        <div className="text-center space-y-5">
          <div className="text-8xl leading-none">🤖</div>
          <div>
            <h1 className="text-5xl font-black text-slate-900 tracking-tight">도라에몽</h1>
            <p className="font-bold text-lg mt-1" style={{ color: '#0891b2' }}>도구 & 자원</p>
            <p className="text-slate-500 font-medium mt-3 leading-relaxed">필요한 도구와 자원을<br />언제나 꺼내주는 구역입니다.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {features.map((f, i) => (
            <div key={i} className="bg-white rounded-2xl p-5 border border-cyan-100 flex items-start gap-4 opacity-60">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: '#cffafe', color: '#0891b2' }}>{f.icon}</div>
              <div>
                <div className="font-bold text-slate-800 text-sm">{f.title}</div>
                <div className="text-slate-400 text-xs mt-0.5">{f.desc}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl font-bold text-sm" style={{ background: '#cffafe', color: '#164e63' }}>
            <Construction size={16} /> 이 구역은 현재 개발 중입니다
          </div>
        </div>
      </main>
    </div>
  );
}
