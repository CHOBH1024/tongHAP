import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Database, FileText, Activity, ChevronRight } from 'lucide-react';

export const Methodology: React.FC = () => {
  return (
    <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} className="max-w-4xl mx-auto space-y-12 pb-20">
      <div className="space-y-4">
        <h1 className="text-4xl font-black text-toss-gray-900 tracking-tight">진단 도구의 과학적 근거</h1>
        <p className="text-toss-gray-500 font-medium text-lg leading-relaxed">학술적 근거와 심리계측적 객관성에 기반한<br/>GAJEONG만의 정밀 진단 시스템입니다.</p>
      </div>

      <div className="space-y-8">
        <div className="toss-card border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-10">
          <h2 className="text-2xl font-black mb-8 flex items-center gap-3">
            <Database className="text-toss-blue" /> 문항 개발 및 검증 절차
          </h2>
          <p className="text-toss-gray-700 leading-relaxed mb-8 font-medium">
            본 플랫폼의 모든 진단 문항은 아래와 같은 엄격한 학술적 절차를 거쳐 개발되었습니다.
          </p>
          <div className="grid gap-6">
            {[
              { label: '문헌 고찰 (Literature Review)', desc: '목회상담학, 조직심리학, 세대사회학 등 학술지 논문 200여 편을 분석하여 핵심 요인을 도출했습니다.' },
              { label: '전문가 타당도 검증', desc: '신학 교수, 전문 상담사, 현장 목회자 등 전문가 그룹의 델파이(Delphi) 조사를 통해 문항의 적합성을 검증했습니다.' },
              { label: '신뢰도 분석 (Cronbach\'s Alpha)', desc: '예비 조사를 통해 모든 척도의 내적 일관성 신뢰도(.85 이상)가 확보된 문항만을 최종 채택했습니다.' }
            ].map((item, i) => (
              <div key={i} className="flex gap-4 p-5 bg-toss-gray-50 rounded-2xl">
                <div className="w-6 h-6 rounded-full bg-toss-blue text-white flex items-center justify-center text-[10px] font-black shrink-0 mt-1">{i+1}</div>
                <div className="space-y-1">
                  <h4 className="font-bold text-toss-gray-900">{item.label}</h4>
                  <p className="text-sm text-toss-gray-500 leading-relaxed font-medium">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="toss-card border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-emerald-600">
              <CheckCircle size={20} /> 타당성 검증 (Validity)
            </h3>
            <p className="text-sm text-toss-gray-600 leading-relaxed mb-6 font-medium">
              구성 타당도를 확보하기 위해 탐색적 요인분석(EFA)과 확인적 요인분석(CFA)을 실시하였습니다. 5대 핵심 역량이 통계적으로 유의미하게 분류됨을 확인하였습니다.
            </p>
            <div className="bg-toss-gray-900 rounded-2xl p-6 text-xs font-mono text-emerald-400 space-y-1">
              <div className="flex justify-between"><span>RMSEA</span> <span>&lt; .06</span></div>
              <div className="flex justify-between"><span>CFI</span> <span>&gt; .92</span></div>
              <div className="flex justify-between"><span>TLI</span> <span>&gt; .90</span></div>
            </div>
          </div>

          <div className="toss-card border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-amber-600">
              <Activity size={20} /> 반응 왜곡 통제 (L-Scale)
            </h3>
            <p className="text-sm text-toss-gray-600 leading-relaxed mb-6 font-medium">
              자신을 긍정적으로 포장하려는 <strong>사회적 바람직성 편향</strong>을 통제하기 위해 타당도 척도(V-Scale) 문항을 은닉 배치하였습니다. 
            </p>
            <p className="text-sm text-toss-gray-500 leading-relaxed font-medium">
              방어 기제가 감지될 경우 리포트에 알림을 제공하여 진실한 성찰을 돕습니다.
            </p>
          </div>
        </div>

        <div className="toss-card border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8">
          <h3 className="text-xl font-bold mb-8 flex items-center gap-2">
            <FileText className="text-toss-blue" /> 주요 이론적 배경
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { title: "I-Mirror (자아)", desc: "Carl Rogers 인간중심이론, Schwartz 가치 이론" },
              { title: "L-Mirror (리더십)", desc: "Bass 변혁적 리더십, Greenleaf 서번트 리더십" },
              { title: "C-Mirror (상담)", desc: "Egan 조력자 모델, 목회상담 위기개입 이론" },
              { title: "G-Mirror (세대)", desc: "Mannheim 세대 이론, Hofstede 문화차원 이론" },
              { title: "F-Mirror (신앙)", desc: "Fowler 신앙발달이론, 통일사상 심정론" },
              { title: "P-Mirror (공직)", desc: "Weber 관료제 이론, 공익 가치 지표" },
              { title: "V-Mirror (비전)", desc: "Collins 비전 기업 연구, 퓨처스 휠" },
              { title: "M-Mirror (미션)", desc: "Sinek 사이먼 시넥 WHY 모델, 소명 이론" },
              { title: "R-Mirror (관계)", desc: "Gottman 관계 치료, 사회적 자본 이론" },
              { title: "E-Mirror (감성)", desc: "Goleman 정서 지능, 회복 탄력성 이론" },
              { title: "S-Mirror (봉사)", desc: "Aristotle 에우다이모니아, 이타주의 심리학" },
              { title: "W-Mirror (역량)", desc: "McClelland 역량 모델링, 역량 중심 교육" },
            ].map(item => (
              <div key={item.title} className="flex items-center justify-between p-5 hover:bg-toss-gray-50 rounded-2xl group transition-colors cursor-pointer">
                <div className="space-y-1">
                  <div className="font-black text-toss-gray-900 text-sm">{item.title}</div>
                  <div className="text-xs text-toss-gray-400 font-medium">{item.desc}</div>
                </div>
                <ChevronRight size={18} className="text-toss-gray-200 group-hover:text-toss-gray-900 transition-colors"/>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
