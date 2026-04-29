import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  Users, 
  TrendingUp, 
  ShieldCheck, 
  Globe, 
  Calendar, 
  AlertTriangle,
  Zap,
  Lock,
  ChevronRight
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const [timeRange, setTimeRange] = useState<'주'|'월'|'년'>('월');

  // Simulated aggregate data
  const stats = [
    { label: '누적 진단 참여자', value: '14,892', trend: '+18.4%', icon: <Users className="text-toss-blue" /> },
    { label: '데이터 무결성', value: '100.0%', trend: '안정', icon: <Lock className="text-indigo-500" /> },
    { label: '비전 2027 준비도', value: '92점', trend: '+12.4', icon: <TrendingUp className="text-amber-500" /> },
    { label: '시스템 가동률', value: '99.9%', trend: '정상', icon: <Zap className="text-rose-500" /> },
  ];

  const mirrorStats = [
    { name: 'I-Mirror', score: 82, color: 'bg-toss-blue' },
    { name: 'L-Mirror', score: 76, color: 'bg-purple-500' },
    { name: 'C-Mirror', score: 89, color: 'bg-pink-500' },
    { name: 'G-Mirror', score: 68, color: 'bg-emerald-500' },
    { name: 'F-Mirror', score: 91, color: 'bg-amber-500' },
    { name: 'P-Mirror', score: 85, color: 'bg-blue-600' },
    { name: 'V-Mirror', score: 79, color: 'bg-teal-500' },
    { name: 'M-Mirror', score: 88, color: 'bg-rose-500' },
    { name: 'R-Mirror', score: 72, color: 'bg-orange-500' },
    { name: 'E-Mirror', score: 81, color: 'bg-cyan-500' },
    { name: 'S-Mirror', score: 94, color: 'bg-violet-600' },
    { name: 'W-Mirror', score: 77, color: 'bg-lime-500' },
  ];

  return (
    <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} className="max-w-6xl mx-auto space-y-10 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-black tracking-widest uppercase rounded-full">
            <ShieldCheck size={12}/> Security Level: High
          </div>
          <h1 className="text-4xl font-black text-brand-900 tracking-tight flex items-center gap-4">
            통계 분석 대시보드
          </h1>
          <p className="text-slate-500 font-medium text-lg">학술적 진단 데이터를 기반으로 실시간 조직 혁신 지표를 분석합니다.</p>
        </div>
        <div className="flex bg-slate-200 p-1 rounded-2xl">
          {['주', '월', '년'].map(t => (
            <button key={t} onClick={() => setTimeRange(t as any)} className={`px-6 py-2 rounded-xl text-xs font-black transition-all ${timeRange === t ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}>
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map(s => (
          <div key={s.label} className="glass-card border-none bg-white">
            <div className="flex justify-between items-start mb-6">
              <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center">{s.icon}</div>
              <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">{s.trend}</span>
            </div>
            <div className="text-3xl font-black text-slate-900 mb-1 tracking-tight">{s.value}</div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="glass-card border-none bg-white p-10 space-y-10">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-black text-brand-900 tracking-tight flex items-center gap-3">
                <BarChart3 className="text-indigo-600" size={24}/> 종합 역량 성숙도
              </h2>
              <button className="text-indigo-600 font-bold text-sm flex items-center gap-1">데이터 다운로드 <ChevronRight size={16}/></button>
            </div>
            
            <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
              {mirrorStats.map(m => (
                <div key={m.name} className="space-y-3">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-slate-500">{m.name}</span>
                    <span className="text-slate-900">{m.score}%</span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }} 
                      animate={{ width: `${m.score}%` }} 
                      transition={{ duration: 1.5, ease: "circOut" }} 
                      className={`h-full ${m.color}`} 
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="glass-card border-none bg-rose-50 p-8 space-y-4">
              <h3 className="text-rose-600 font-black text-xs flex items-center gap-2 uppercase tracking-widest">
                <AlertTriangle size={18}/> 위기 감지 리포트
              </h3>
              <p className="text-slate-800 text-sm leading-relaxed font-medium">
                최근 <strong>R-Mirror(관계)</strong> 지수가 급감한 교구가 발견되었습니다. 고립 및 감정적 소진 위험군에 대한 즉각적인 지원이 권장됩니다.
              </p>
              <button className="w-full py-4 bg-rose-500 text-white text-sm font-black rounded-2xl active:scale-95 transition-all shadow-lg shadow-rose-500/20">
                위기대응 프로세스 가동
              </button>
            </div>

            <div className="glass-card border-none bg-emerald-50 p-8 space-y-6">
              <h3 className="text-emerald-600 font-black text-xs flex items-center gap-2 uppercase tracking-widest">
                <Zap size={18}/> 자율 가동 시스템
              </h3>
              <div className="space-y-4">
                {[
                  { label: '자동 앱 배포', status: '정상', time: '12분 전' },
                  { label: 'AI 매칭 엔진', status: '안정', time: '실시간' },
                  { label: '교리 데이터 동기화', status: '완료', time: '1시간 전' }
                ].map((item, i) => (
                  <div key={i} className="flex justify-between items-center text-[11px] font-bold border-b border-emerald-100 pb-2">
                    <span className="text-toss-gray-600">{item.label}</span>
                    <div className="flex gap-2">
                      <span className="text-toss-gray-400">{item.time}</span>
                      <span className="text-emerald-600">{item.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="glass-card border-none bg-white p-10 space-y-8">
            <h2 className="text-2xl font-black text-brand-900 tracking-tight flex items-center gap-3">
              <Globe className="text-emerald-500" size={24}/> 교구별 참여 현황 및 혁신 지수
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-xs font-black text-slate-400 uppercase tracking-widest border-b border-slate-50 pb-4">
                    <th className="pb-4">교구명</th>
                    <th className="pb-4">참여자 수</th>
                    <th className="pb-4">혁신 지수</th>
                    <th className="pb-4">상태</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {[
                    { region: "서울남부교구", count: "1,240명", index: "94점", status: "최우수" },
                    { region: "경기북부교구", count: "1,102명", index: "88점", status: "우수" },
                    { region: "인천교구", count: "980명", index: "82점", status: "양호" },
                    { region: "충남교구", count: "850명", index: "76점", status: "보통" },
                    { region: "영남교구", count: "1,450명", index: "91점", status: "최우수" },
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-slate-50 transition-colors">
                      <td className="py-4 font-bold text-slate-900">{row.region}</td>
                      <td className="py-4 text-sm font-medium text-slate-600">{row.count}</td>
                      <td className="py-4 text-sm font-bold text-indigo-600">{row.index}</td>
                      <td className="py-4">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-black ${row.status === '최우수' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-500'}`}>
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="glass-card border-none bg-white p-8 space-y-8">
            <h2 className="text-lg font-black text-brand-900 tracking-tight uppercase flex items-center gap-2">
              <Globe className="text-indigo-600" size={20}/> 글로벌 활동
            </h2>
            <div className="aspect-square bg-slate-50 rounded-[32px] relative overflow-hidden flex items-center justify-center">
              <div className="z-10 text-center">
                <div className="text-5xl font-black text-brand-900 tracking-tighter">54</div>
                <div className="text-[10px] font-black text-indigo-600 mt-2 tracking-[0.2em] uppercase bg-indigo-50 px-3 py-1 rounded-full">개국 활성화</div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-5 bg-slate-50 rounded-2xl text-center space-y-1">
                <div className="text-xl font-black text-slate-900">4.2s</div>
                <div className="text-[10px] font-bold text-slate-400 uppercase">지연 시간</div>
              </div>
              <div className="p-5 bg-slate-50 rounded-2xl text-center space-y-1">
                <div className="text-xl font-black text-toss-gray-900">8.5k</div>
                <div className="text-[10px] font-bold text-toss-gray-400 uppercase">동시 접속</div>
              </div>
            </div>
          </div>

          <div className="glass-card border-none bg-white p-8">
            <h2 className="text-lg font-black mb-8 flex items-center gap-2 text-brand-900 uppercase tracking-tight">
              <Calendar className="text-amber-500" size={20}/> 주요 혁신 파이프라인
            </h2>
            <div className="space-y-6">
              {[
                { time: '00:00', task: '글로벌 데이터 동기화', status: '진행중' },
                { time: '09:00', task: 'AI 전략 리포트 생성', status: '준비완료' },
                { time: 'T-Cycle', task: '문항 타당성 자동 스캔', status: '대기중' },
                { time: 'Hourly', task: 'Vercel 자동 배포', status: '실행중' }
              ].map((item, i) => (
                <div key={i} className="flex justify-between items-center group">
                  <div className="flex items-center gap-4">
                    <div className={`w-2 h-2 rounded-full ${item.status === '진행중' || item.status === '실행중' ? 'bg-emerald-500 animate-pulse' : 'bg-toss-gray-300'}`} />
                    <span className="text-sm text-slate-700 font-bold">{item.task}</span>
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase">{item.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
