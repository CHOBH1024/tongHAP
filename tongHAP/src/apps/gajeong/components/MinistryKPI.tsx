import { BarChart3, TrendingUp, Users, Target, Activity, Calendar, ArrowUpRight, ArrowDownRight, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

export const MinistryKPI = () => {
  const kpiData = [
    { label: '월간 새가족 등록', value: '142명', target: '150명', progress: 94, trend: '+12%', isUp: true },
    { label: '정기 예배 출석률', value: '85.4%', target: '80%', progress: 100, trend: '+5.2%', isUp: true },
    { label: '청년부 참여도', value: '64%', target: '70%', progress: 91, trend: '-2.1%', isUp: false },
    { label: '소그룹 모임 활성화', value: '42개', target: '40개', progress: 100, trend: '+8%', isUp: true },
  ];

  return (
    <div className="space-y-8 pb-24">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 bg-gradient-to-r from-indigo-900 to-brand-900 p-10 rounded-[3rem] text-white shadow-2xl">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-brand-200 text-xs font-black tracking-widest uppercase backdrop-blur-md border border-white/10">
            <Activity size={14} /> Analytics Dashboard
          </div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight">사역 성과 관리 (KPI)</h2>
          <p className="text-indigo-200 font-medium max-w-xl leading-relaxed">
            데이터 기반의 객관적인 사역 평가와 목표 관리를 통해 지속 가능한 성장을 도모합니다.
          </p>
        </div>
        <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/20 text-center min-w-[200px]">
          <div className="text-sm font-black text-indigo-200 mb-1">종합 달성률</div>
          <div className="text-5xl font-black text-amber-400">92<span className="text-2xl text-amber-200">%</span></div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi, idx) => (
          <motion.div key={idx} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }}
            className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm hover:shadow-lg transition-all group">
            <div className="flex items-start justify-between mb-6">
              <div className="w-12 h-12 bg-slate-50 text-brand-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Target size={24} />
              </div>
              <div className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-black ${kpi.isUp ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                {kpi.isUp ? <ArrowUpRight size={14}/> : <ArrowDownRight size={14}/>} {kpi.trend}
              </div>
            </div>
            <h3 className="text-slate-500 font-bold text-sm mb-1">{kpi.label}</h3>
            <div className="text-3xl font-black text-slate-900 mb-4">{kpi.value}</div>
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold text-slate-400">
                <span>진행률</span>
                <span>목표: {kpi.target}</span>
              </div>
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <div className={`h-full rounded-full ${kpi.progress >= 100 ? 'bg-emerald-500' : 'bg-brand-500'}`} style={{ width: `${kpi.progress}%` }} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-black text-slate-900 flex items-center gap-3">
              <BarChart3 className="text-brand-500" /> 월간 성장 추이
            </h3>
            <select className="bg-slate-50 border-none text-sm font-bold rounded-xl px-4 py-2 text-slate-600 outline-none">
              <option>2026년 상반기</option>
              <option>2025년 하반기</option>
            </select>
          </div>
          <div className="h-[300px] flex items-end justify-between gap-2 px-4">
            {[45, 52, 48, 65, 59, 80].map((h, i) => (
              <div key={i} className="w-full flex flex-col items-center gap-4 group">
                <div className="w-full bg-brand-50 rounded-t-xl relative group-hover:bg-brand-100 transition-colors" style={{ height: `${h}%` }}>
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] font-black px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                    {h}%
                  </div>
                </div>
                <div className="text-xs font-bold text-slate-400">{i + 1}월</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm space-y-6">
           <h3 className="text-xl font-black text-slate-900 flex items-center gap-3">
              <CheckCircle2 className="text-emerald-500" /> 주간 액션 플랜
            </h3>
            <div className="space-y-4">
              {[
                { title: '신규 등록자 환영 전화', status: '완료', color: 'emerald' },
                { title: '청년부 임원진 간담회', status: '진행중', color: 'amber' },
                { title: '구역장 심방 피드백 취합', status: '대기', color: 'slate' },
                { title: '월간 재정 보고서 작성', status: '대기', color: 'slate' },
              ].map((task, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:border-brand-500/30 transition-colors cursor-pointer">
                  <span className="font-bold text-sm text-slate-700">{task.title}</span>
                  <span className={`px-3 py-1 rounded-lg text-[10px] font-black bg-${task.color}-100 text-${task.color}-600`}>{task.status}</span>
                </div>
              ))}
            </div>
            <button className="w-full py-4 rounded-xl border-2 border-dashed border-slate-200 text-slate-400 font-bold text-sm hover:border-brand-500 hover:text-brand-500 transition-colors">
              + 새 액션 추가
            </button>
        </div>
      </div>
    </div>
  );
};
