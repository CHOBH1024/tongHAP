import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Book, Scale, Shield, FileText, ChevronRight, Search, Download, ExternalLink, X } from 'lucide-react';

export const Regulations: React.FC = () => {
  const [selectedDoc, setSelectedDoc] = useState<string | null>(null);

  const categories = [
    {
      id: 'ethics',
      title: '윤리 및 공직 기강',
      icon: <Scale className="text-toss-blue" />,
      color: 'bg-toss-blue-light',
      docs: [
        { title: '공직자 윤리 강령', date: '2025.01.10', version: 'v3.2', desc: '공직자의 도덕적 의무와 행동 지침을 규정합니다.' },
        { title: '성희롱·성폭력 예방 및 처리에 관한 규정', date: '2024.11.20', version: 'v2.1', desc: '건강한 공동체 문화를 위한 보호 체계입니다.' },
        { title: '금전 거래 및 청탁 금지 지침', date: '2025.02.15', version: 'v1.0', desc: '투명한 재정 윤리를 위한 핵심 가이드라인입니다.' }
      ]
    },
    {
      id: 'personnel',
      title: '인사 및 복무',
      icon: <Shield className="text-amber-600" />,
      color: 'bg-amber-50',
      docs: [
        { title: '인사 관리 기본 규정', date: '2025.01.01', version: 'v4.0', desc: '임용, 발령, 승진의 공정성을 담보하는 법적 기준입니다.' },
        { title: '공직자 복무 및 근무 시간 지침', date: '2024.09.15', version: 'v2.5', desc: '효율적인 섭리 활동을 위한 근무 환경 규정입니다.' },
        { title: '성과 평가 및 상벌 규정', date: '2025.03.01', version: 'v1.2', desc: '기여도에 따른 합리적인 보상과 책임 체계입니다.' }
      ]
    },
    {
      id: 'finance',
      title: '재무 및 자산 관리',
      icon: <Book className="text-emerald-600" />,
      color: 'bg-emerald-50',
      docs: [
        { title: '통합 회계 처리 준칙', date: '2024.12.30', version: 'v5.1', desc: '전국 교회의 회계 투명성을 위한 표준 매뉴얼입니다.' },
        { title: '자산 매입 및 매각에 관한 법규', date: '2025.01.20', version: 'v2.0', desc: '교단 소유 자산의 안전한 관리와 처분 절차입니다.' },
        { title: '특별 헌금 및 기금 운용 규정', date: '2025.02.10', version: 'v1.1', desc: '섭리적 목적 자산의 효율적 운용 지침입니다.' }
      ]
    },
    {
      id: 'risk',
      title: '위기 관리 및 대외협력',
      icon: <FileText className="text-rose-600" />,
      color: 'bg-rose-50',
      docs: [
        { title: '대외 홍보 및 언론 대응 매뉴얼', date: '2025.02.05', version: 'v3.0', desc: '일관된 목소리를 위한 대외 소통 전략입니다.' },
        { title: '교회 내 사고 예방 및 조치 규정', date: '2024.10.15', version: 'v2.2', desc: '안전한 예배 환경 조성을 위한 안전 가이드입니다.' },
        { title: '법적 분쟁 대응 및 법무 지원 지침', date: '2025.01.25', version: 'v1.5', desc: '교단의 법적 권익 보호를 위한 절차 안내입니다.' }
      ]
    }
  ];

  const detailContent: Record<string, string> = {
    '공직자 윤리 강령': '본 강령은 세계평화통일가정연합의 모든 공직자가 참부모님의 말씀을 중심으로 하여 가져야 할 기본적인 도덕적 품성과 사회적 책임을 명시한다. 제1조(목적): 본 강령은 공직자의 윤리적 판단 기준을 제공함으로써 교단의 신뢰성을 제고함을 목적으로 한다. 제2조(공명정대): 모든 행정 집행은 사적인 감정이나 파벌을 배제하고 오직 섭리적 공의에 입각하여 처리해야 한다. 제3조(청렴결백): 공직자는 직무와 관련하여 일체의 부당한 금품이나 향응을 받아서는 안 되며, 검소한 생활을 통해 식구들에게 모범이 되어야 한다.',
    '인사 관리 기본 규정': '제1장 총칙 - 본 규정은 가정연합 공직자의 채용, 보직, 승진, 퇴직 등에 관한 사항을 규정하여 효율적인 인적 자원 관리를 실현함을 목적으로 한다. 인사 위원회는 연 2회 정기적으로 개최되며, 특별한 필요가 있을 시 임시 위원회를 소집할 수 있다. 인사 평가의 50%는 정량적인 실적(전도, 교육, 활동)이며, 나머지 50%는 정성적인 영성 및 인격 평가로 구성된다.',
  };

  return (
    <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} className="max-w-5xl mx-auto space-y-12 pb-20 px-6">
      
      {/* Header with Search */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-toss-blue">
            <Shield size={24} />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Administrative Standard</span>
          </div>
          <h1 className="text-4xl font-black text-toss-gray-900 tracking-tight leading-tight">행정 규정 및 법무 지침</h1>
          <p className="text-toss-gray-500 font-medium text-lg leading-relaxed">천일국 안착을 위한 투명하고 공정한<br/>행정의 표준을 확인하세요.</p>
        </div>
        <div className="relative w-full md:w-80 group">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-toss-gray-400 group-focus-within:text-toss-blue transition-colors" size={20} />
          <input 
            type="text" 
            placeholder="규정 검색하기..." 
            className="w-full pl-14 pr-6 py-4 bg-toss-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-toss-blue transition-all outline-none font-bold"
          />
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: '전체 규정', val: '156건' },
          { label: '최근 업데이트', val: '12건' },
          { label: '필독 지침', val: '08건' },
          { label: '다운로드 수', val: '2,401회' }
        ].map((s, i) => (
          <div key={i} className="toss-card border-none bg-toss-gray-50 p-6 flex flex-col items-center justify-center text-center">
            <div className="text-[10px] font-black text-toss-gray-400 uppercase mb-2 tracking-widest">{s.label}</div>
            <div className="text-xl font-black text-toss-gray-900">{s.val}</div>
          </div>
        ))}
      </div>

      {/* Regulation Categories */}
      <div className="space-y-16">
        {categories.map((cat) => (
          <div key={cat.id} className="space-y-8">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 ${cat.color} rounded-2xl flex items-center justify-center`}>
                {cat.icon}
              </div>
              <h2 className="text-2xl font-black text-toss-gray-900 tracking-tight">{cat.title}</h2>
            </div>
            
            <div className="grid gap-4">
              {cat.docs.map((doc, di) => (
                <div 
                  key={di} 
                  onClick={() => setSelectedDoc(doc.title)}
                  className="toss-card border-none shadow-[0_8px_30px_rgb(0,0,0,0.02)] hover:shadow-md transition-all group cursor-pointer flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
                >
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-bold text-toss-gray-900 group-hover:text-toss-blue transition-colors">{doc.title}</h3>
                      <span className="px-2 py-0.5 bg-toss-gray-100 text-[10px] font-black text-toss-gray-400 rounded-md uppercase tracking-widest">{doc.version}</span>
                    </div>
                    <p className="text-sm text-toss-gray-500 leading-relaxed font-medium">{doc.desc}</p>
                  </div>
                  <div className="flex items-center gap-6 w-full md:w-auto border-t md:border-none pt-4 md:pt-0">
                    <div className="text-right">
                      <div className="text-[10px] font-black text-toss-gray-300 uppercase tracking-widest">Last Updated</div>
                      <div className="text-xs font-bold text-toss-gray-500">{doc.date}</div>
                    </div>
                    <ChevronRight size={20} className="text-toss-gray-300 group-hover:text-toss-blue transition-colors ml-auto md:ml-0" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Footer Info */}
      <div className="toss-card border-none bg-toss-gray-900 text-white p-10 md:p-14 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 p-10 opacity-10 text-white">
          <Book size={120} />
        </div>
        <div className="relative z-10 max-w-2xl space-y-6">
          <h4 className="text-2xl font-black">맞춤형 규정 상담이 필요하신가요?</h4>
          <p className="text-white/70 text-base leading-relaxed font-medium">교구 현장에서 발생하는 다양한 사례에 대해 법무 행정팀이 직접 답변해 드립니다. 비공개로 안전하게 상담하세요.</p>
          <div className="flex flex-wrap gap-4 pt-4">
            <button className="bg-toss-blue text-white font-black px-8 py-4 rounded-2xl text-sm active:scale-95 transition-all flex items-center gap-2">
              상담 신청하기 <ChevronRight size={18} />
            </button>
            <button className="bg-white/10 text-white font-black px-8 py-4 rounded-2xl text-sm active:scale-95 transition-all hover:bg-white/20">
              Q&A 게시판 가기
            </button>
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedDoc && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-toss-gray-900/60 backdrop-blur-sm">
            <motion.div initial={{scale:0.9, y:20}} animate={{scale:1, y:0}} exit={{scale:0.9, y:20}} className="bg-white w-full max-w-3xl rounded-[40px] overflow-hidden shadow-2xl flex flex-col max-h-[85vh]">
              <div className="p-10 border-b border-toss-gray-100 flex justify-between items-center bg-white sticky top-0 z-10">
                <div className="space-y-1">
                  <div className="text-[10px] font-black text-toss-blue uppercase tracking-[0.2em]">Full Document</div>
                  <h2 className="text-2xl font-black text-toss-gray-900 tracking-tight">{selectedDoc}</h2>
                </div>
                <button onClick={() => setSelectedDoc(null)} className="p-3 hover:bg-toss-gray-100 rounded-2xl transition-colors"><X size={24}/></button>
              </div>
              <div className="flex-1 overflow-y-auto p-10 space-y-10 custom-scrollbar">
                <div className="space-y-6">
                  <div className="flex items-center gap-2 text-rose-500">
                    <div className="w-1.5 h-1.5 bg-rose-500 rounded-full"></div>
                    <span className="text-xs font-black uppercase tracking-widest">핵심 요약</span>
                  </div>
                  <div className="p-8 bg-rose-50 rounded-3xl text-rose-900 font-bold leading-loose">
                    {detailContent[selectedDoc] || '세부 본문 데이터가 준비 중입니다. 원본 파일을 다운로드해 주세요.'}
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center gap-2 text-toss-blue">
                    <div className="w-1.5 h-1.5 bg-toss-blue rounded-full"></div>
                    <span className="text-xs font-black uppercase tracking-widest">상세 조항 (Preview)</span>
                  </div>
                  <div className="space-y-8 font-medium text-toss-gray-700 leading-relaxed">
                    <p>본 규정은 신통일한국 시대의 개막과 함께 전국 교구 및 산하 기관의 행정적 효율성을 극대화하기 위해 제정되었습니다. 모든 공직자는 본 규정을 숙지하고 현장에서 발생할 수 있는 행정적 착오를 최소화해야 할 의무가 있습니다.</p>
                    <p>특히 재무 관련 조항은 강화된 감사 기준을 따르며, 식구들의 소중한 정성이 1원의 낭비 없이 섭리적 목적을 위해 사용되도록 엄격한 증빙 절차를 요구합니다.</p>
                  </div>
                </div>
              </div>
              <div className="p-10 bg-toss-gray-50 border-t border-toss-gray-100 flex gap-4">
                <button className="flex-1 toss-button-ghost bg-white py-4 flex items-center justify-center gap-2 font-black text-sm">
                  <Download size={18}/> PDF 다운로드
                </button>
                <button className="flex-1 toss-button-primary shadow-none py-4 flex items-center justify-center gap-2 font-black text-sm">
                  <ExternalLink size={18}/> 공문함 이동
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </motion.div>
  );
};
