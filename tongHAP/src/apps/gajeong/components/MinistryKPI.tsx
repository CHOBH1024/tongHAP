import { BarChart3, TrendingUp, Users, Target, Activity, Calendar, ArrowUpRight, ArrowDownRight, CheckCircle2, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export const MinistryKPI = () => {
  const kpiData = [
    { label: '월간 새가족 등록', value: '142명', target: '150명', progress: 94, trend: '+12%', isUp: true, color: 'brand' },
    { label: '정기 예배 출석률', value: '85.4%', target: '80%', progress: 100, trend: '+5.2%', isUp: true, color: 'indigo' },
    { label: '청년부 참여도', value: '64%', target: '70%', progress: 91, trend: '-2.1%', isUp: false, color: 'rose' },
    { label: '소그룹 모임 활성', value: '42개', target: '40개', progress: 100, trend: '+8%', isUp: true, color: 'emerald' },
  ];

  return (
    <div className="space-y-12 pb-24">
      {/* Hero Analytics Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 bg-slate-900 p-12 rounded-[4rem] text-white shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-500/10 rounded-full blur-[100px] group-hover:scale-110 transition-transform duration-700" />
        <div className="relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-brand-300 text-xs font-black tracking-widest uppercase backdrop-blur-md border border-white/10">
            <Activity size={14} /> Ministry Impact Analytics
          </div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">사역 성과 지표<br/><span className="text-brand-400">실시간 대시보드</span></h2>
          <p className="text-slate-400 font-medium max-w-lg leading-relaxed">
            심정적 유대와 행정적 성과를 데이터로 가시화합니다. <br/>하늘부모님을 중심한 사역의 성장을 한 눈에 확인하세요.
          </p>
        </div>
        <div className="relative z-10 flex flex-col items-center justify-center bg-white/5 backdrop-blur-xl p-10 rounded-[3rem] border border-white/10 text-center min-w-[240px]">
          <div className="text-xs font-black text-slate-400 mb-2 uppercase tracking-widest">사역 온도 (종합)</div>
          <div className="text-7xl font-black text-brand-400 tracking-tighter">94.8<span className="text-2xl text-brand-200">%</span></div>
          <div className="mt-4 flex items-center gap-2 text-emerald-400 font-black text-xs">
             <TrendingUp size={14} /> 지난달 대비 2.4% 상승
          </div>
        </div>
      </div>

      {/* Quick Metrics Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi, idx) => (
          <motion.div key={idx} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }}
            className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm hover:shadow-xl transition-all group relative overflow-hidden"
          >
            <div className={`absolute top-0 left-0 w-full h-1 bg-${kpi.color}-500 opacity-0 group-hover:opacity-100 transition-opacity`} />
            <div className="flex items-start justify-between mb-6">
              <div className={`w-12 h-12 bg-slate-50 text-${kpi.color}-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                <Target size={24} />
              </div>
              <div className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-black ${kpi.isUp ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                {kpi.isUp ? <ArrowUpRight size={14}/> : <ArrowDownRight size={14}/>} {kpi.trend}
              </div>
            </div>
            <h3 className="text-slate-400 font-bold text-xs uppercase tracking-widest mb-1">{kpi.label}</h3>
            <div className="text-3xl font-black text-slate-900 mb-4">{kpi.value}</div>
            <div className="space-y-2">
              <div className="flex justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest">
                <span>Achievement</span>
                <span>Target: {kpi.target}</span>
              </div>
              <div className="h-2 w-full bg-slate-50 rounded-full overflow-hidden">
                <div className={`h-full rounded-full bg-${kpi.color}-500`} style={{ width: `${kpi.progress}%` }} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts & Details Section */}
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-[3rem] p-10 border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">주요 성장 추이</h3>
              <p className="text-sm text-slate-400 font-medium mt-1">2026년 상반기 종합 성장 리포트</p>
            </div>
            <div className="flex gap-2">
               {['참여', '헌금', '활동'].map(t => (
                 <button key={t} className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${t === '참여' ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-400 hover:bg-slate-100'}`}>
                   {t}
                 </button>
               ))}
            </div>
          </div>
          <div className="h-[350px] flex items-end justify-between gap-4 px-4 pb-10">
            {[45, 52, 48, 65, 82, 94].map((h, i) => (
              <div key={i} className="w-full flex flex-col items-center gap-6 group">
                <div className="w-full bg-slate-50 rounded-2xl relative group-hover:bg-brand-500 transition-all duration-500 overflow-hidden" style={{ height: `${h}%` }}>
                  <motion.div 
                    initial={{ height: 0 }} 
                    animate={{ height: '100%' }} 
                    className="w-full bg-gradient-to-t from-brand-600 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                  <div className="absolute top-2 left-0 w-full text-center text-white text-[10px] font-black opacity-0 group-hover:opacity-100 transition-all">
                    {h}%
                  </div>
                </div>
                <div className="text-xs font-black text-slate-400 group-hover:text-slate-900 transition-colors tracking-widest">{i + 1}월</div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-8">
          {/* Spiritual Maturity Donut Mock */}
          <div className="bg-indigo-50 rounded-[3rem] p-10 border border-indigo-100 space-y-6">
            <h3 className="text-xl font-black text-indigo-900 flex items-center gap-3">
              <Sparkles className="text-indigo-600" /> 식구 만족도 / 심정 지수
            </h3>
            <div className="aspect-square bg-white rounded-full border-[16px] border-indigo-200 relative flex items-center justify-center">
               <div className="text-center">
                  <div className="text-4xl font-black text-indigo-900">8.9</div>
                  <div className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">NPS Score</div>
               </div>
               {/* Progress ring mock */}
               <div className="absolute inset-0 border-[16px] border-indigo-600 rounded-full" style={{ clipPath: 'polygon(50% 50%, 0 0, 100% 0, 100% 100%, 0 100%, 0 0)' }}></div>
            </div>
            <p className="text-indigo-700/60 text-xs font-medium text-center leading-relaxed">
              최근 소그룹 개편 이후 <br/>식구들의 예배 만족도가 15% 상승했습니다.
            </p>
          </div>

          <div className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-sm space-y-8">
             <h3 className="text-xl font-black text-slate-900 flex items-center gap-3">
                <CheckCircle2 className="text-emerald-500" /> 긴급 실무 태스크
              </h3>
              <div className="space-y-4">
                {[
                  { title: '신규 등록자 환영 전화', status: 'D-1', color: 'emerald' },
                  { title: '청년부 임원진 간담회', status: 'D-3', color: 'amber' },
                  { title: '구역장 심방 피드백 취합', status: '대기', color: 'slate' },
                ].map((task, i) => (
                  <div key={i} className="flex items-center justify-between p-5 bg-slate-50 rounded-2xl border border-slate-50 hover:border-brand-500/30 transition-all cursor-pointer group">
                    <span className="font-bold text-sm text-slate-700 group-hover:text-brand-600">{task.title}</span>
                    <span className={`px-3 py-1 rounded-lg text-[10px] font-black bg-${task.color}-100 text-${task.color}-600`}>{task.status}</span>
                  </div>
                ))}
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};
