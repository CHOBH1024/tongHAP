import { FileText, Download, Search, Folder, Video, BookOpen, Clock, Filter, ChevronRight, Star } from 'lucide-react';
import { motion } from 'framer-motion';

export const ResourceHub = () => {
  const categories = [
    { name: '설교/강의 원고', icon: <FileText size={20}/>, count: 124, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { name: '교육/수련회 자료', icon: <BookOpen size={20}/>, count: 56, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { name: '행정 양식/서식', icon: <Folder size={20}/>, count: 89, color: 'text-amber-600', bg: 'bg-amber-50' },
    { name: '영상/미디어 소스', icon: <Video size={20}/>, count: 42, color: 'text-rose-600', bg: 'bg-rose-50' },
  ];

  const recentFiles = [
    { title: '2026 춘계 특별 수련회 기획안 (최종).pptx', type: 'PPT', size: '15.2 MB', date: '오늘', author: '본부 교육국' },
    { title: '신입 식구 환영회 체크리스트 및 가이드.pdf', type: 'PDF', size: '2.4 MB', date: '어제', author: '행정지원팀' },
    { title: '주일 예배 대표 기도문 모음집 (상반기).hwp', type: 'DOC', size: '1.1 MB', date: '3일 전', author: '목회자료실' },
    { title: '교구별 재정 결산 보고서 양식 (v2.0).xlsx', type: 'XLS', size: '5.8 MB', date: '1주일 전', author: '재무국' },
    { title: '청년부 주관 찬양 집회 포스터 원본.ai', type: 'IMG', size: '45.0 MB', date: '2주일 전', author: '미디어팀' },
  ];

  return (
    <div className="space-y-8 pb-24">
      <div className="bg-[#1e1b4b] rounded-[3rem] p-10 md:p-14 text-white relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <BookOpen size={200} />
        </div>
        <div className="relative z-10 space-y-8">
          <div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">목회 자료실</h2>
            <p className="text-indigo-200 font-medium max-w-xl leading-relaxed text-lg">
              설교 원고부터 행정 양식까지, 사역에 필요한 모든 공식 문서를<br className="hidden md:block"/>
              한 곳에서 검색하고 다운로드하세요.
            </p>
          </div>
          
          <div className="relative max-w-2xl">
            <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
              <Search className="text-slate-400" size={20} />
            </div>
            <input 
              type="text" 
              className="w-full bg-white/10 border border-white/20 text-white rounded-2xl py-5 pl-14 pr-6 placeholder-indigo-200/50 font-bold focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all backdrop-blur-md"
              placeholder="자료명, 태그, 또는 작성자로 검색해보세요..."
            />
            <button className="absolute inset-y-2 right-2 bg-brand-500 hover:bg-brand-600 transition-colors px-6 rounded-xl font-black text-sm">
              검색
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map((cat, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
            className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col items-center text-center gap-4">
            <div className={`w-16 h-16 ${cat.bg} ${cat.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
              {cat.icon}
            </div>
            <div>
              <h3 className="font-black text-slate-800 mb-1">{cat.name}</h3>
              <p className="text-xs font-bold text-slate-400">{cat.count} 자료</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-50 flex items-center justify-between">
          <h3 className="text-xl font-black text-slate-900 flex items-center gap-3">
            <Clock className="text-brand-500" /> 최근 업데이트 자료
          </h3>
          <button className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-brand-500 transition-colors px-4 py-2 bg-slate-50 rounded-xl">
            <Filter size={16}/> 필터링
          </button>
        </div>
        <div className="divide-y divide-slate-50">
          {recentFiles.map((file, i) => (
            <div key={i} className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors group">
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 bg-indigo-50 text-indigo-500 rounded-xl flex items-center justify-center font-black text-xs shrink-0 group-hover:bg-indigo-500 group-hover:text-white transition-colors">
                  {file.type}
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-sm md:text-base group-hover:text-brand-600 transition-colors mb-1 line-clamp-1">{file.title}</h4>
                  <div className="flex items-center gap-3 text-xs font-bold text-slate-400">
                    <span>{file.author}</span>
                    <span className="w-1 h-1 bg-slate-300 rounded-full"/>
                    <span>{file.size}</span>
                    <span className="w-1 h-1 bg-slate-300 rounded-full"/>
                    <span>{file.date}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="w-10 h-10 flex items-center justify-center text-slate-300 hover:text-amber-400 transition-colors">
                  <Star size={20} />
                </button>
                <button className="w-10 h-10 flex items-center justify-center bg-brand-50 text-brand-600 rounded-xl hover:bg-brand-500 hover:text-white transition-colors">
                  <Download size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 bg-slate-50 text-center border-t border-slate-100">
          <button className="text-sm font-black text-brand-600 flex items-center gap-1 justify-center mx-auto hover:gap-2 transition-all">
            전체 자료 보기 <ChevronRight size={16}/>
          </button>
        </div>
      </div>
    </div>
  );
};
