import { Link } from '@tanstack/react-router';
import { ArrowLeft, BookOpen, MessageSquare, Library, Award, Construction } from 'lucide-react';

export function JiseongApp() {
  const features = [
    { icon: <BookOpen size={20} />, title: '교리 학습', desc: '체계적인 원리강론 학습 시스템' },
    { icon: <MessageSquare size={20} />, title: 'Q&A 게시판', desc: '질문과 답변 공유 공간' },
    { icon: <Library size={20} />, title: '문서 도서관', desc: '강의·자료 아카이브 검색' },
    { icon: <Award size={20} />, title: '퀴즈 시스템', desc: '학습 이해도 확인 테스트' },
  ];

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #eff6ff 0%, #ffffff 50%, #eff6ff 100%)' }}>
      <header className="sticky top-0 z-10 px-6 py-4 bg-white/90 backdrop-blur-sm border-b border-blue-100 flex items-center gap-4">
        <Link to="/" className="flex items-center gap-2 font-bold hover:opacity-70 transition-opacity" style={{ color: '#2563eb' }}>
          <ArrowLeft size={18} />
          <span>홈으로</span>
        </Link>
        <div className="h-5 w-px bg-blue-200" />
        <span className="font-black text-blue-900 text-sm">📚 지성 구역</span>
        <span className="ml-auto px-3 py-1 text-xs font-black rounded-full" style={{ background: '#dbeafe', color: '#2563eb' }}>개발 중</span>
      </header>

      <main className="max-w-xl mx-auto px-6 py-16 space-y-12">
        <div className="text-center space-y-5">
          <div className="text-8xl leading-none">📚</div>
          <div>
            <h1 className="text-5xl font-black text-slate-900 tracking-tight">지성</h1>
            <p className="font-bold text-lg mt-1" style={{ color: '#2563eb' }}>교리 & 지식</p>
            <p className="text-slate-500 font-medium mt-3 leading-relaxed">말씀을 깊이 탐구하고<br />지식을 나누는 구역입니다.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {features.map((f, i) => (
            <div key={i} className="bg-white rounded-2xl p-5 border border-blue-100 flex items-start gap-4 opacity-60">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: '#dbeafe', color: '#2563eb' }}>{f.icon}</div>
              <div>
                <div className="font-bold text-slate-800 text-sm">{f.title}</div>
                <div className="text-slate-400 text-xs mt-0.5">{f.desc}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl font-bold text-sm" style={{ background: '#dbeafe', color: '#1e40af' }}>
            <Construction size={16} /> 이 구역은 현재 개발 중입니다
          </div>
        </div>
      </main>
    </div>
  );
}
