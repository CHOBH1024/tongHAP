import { ArrowLeft, BookOpen, GraduationCap, FlaskConical, BarChart3, ShieldCheck, FileText, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

interface MethodologyPageProps {
  onBack: () => void;
}

const researchBasis = [
  {
    category: '소명 및 내면 가치 (I-Mirror)',
    theories: [
      { name: 'Dik & Duffy의 소명 이론 (Calling Theory)', year: 2009, journal: 'Journal of Counseling Psychology', desc: '직업적 소명을 "초월적 부름(transcendent summons)", "목적/의미(purpose/meaning)", "친사회적 지향(prosocial orientation)"의 3요인으로 정의. 본 도구의 정체성·목적의식·사회적 책임 영역 구성의 근거.' },
      { name: 'Peterson & Seligman의 성격 강점과 덕목 (VIA Classification)', year: 2004, journal: 'Oxford University Press', desc: '24개 성격 강점을 6개 핵심 덕목으로 분류. 윤리성과 회복탄력성 측정의 이론적 토대.' },
    ]
  },
  {
    category: '리더십 진단 (L-Mirror)',
    theories: [
      { name: 'Greenleaf의 서번트 리더십 이론', year: 1977, journal: 'Paulist Press', desc: '"리더는 먼저 섬기는 자"라는 핵심 명제. 카리스마 vs 서번트 딜레마 문항의 설계 근거.' },
      { name: 'Bass & Avolio의 변혁적 리더십 모형 (MLQ)', year: 1995, journal: 'Mind Garden', desc: '이상적 영향력, 영감적 동기부여, 지적 자극, 개별적 배려의 4요인 모형. 비전제시·공감소통·포용력 영역 설계의 학술적 기반.' },
      { name: 'Psychological Safety (Edmondson)', year: 1999, journal: 'Administrative Science Quarterly', desc: '팀 내 심리적 안전감이 학습행동과 성과에 미치는 영향. 피드백 수용 및 선한 영향력 측정의 근거.' },
    ]
  },
  {
    category: '진정성 진단 (A-Mirror)',
    theories: [
      { name: 'Kernis & Goldman의 진정성 모형', year: 2006, journal: 'Journal of Personality', desc: '진정성을 인식(awareness), 편향 없는 처리(unbiased processing), 행동(behavior), 관계지향(relational orientation)의 4차원으로 구분. 투명성·자기일치도·취약성 인정 영역의 이론적 토대.' },
      { name: 'Neff의 자기자비 척도 (Self-Compassion Scale)', year: 2003, journal: 'Self and Identity', desc: '자기친절, 보편적 인간성, 마음챙김의 3요소. 감정조절과 자기인식 측정의 이론적 근거.' },
    ]
  },
  {
    category: '사회적 감수성 (S-Mirror)',
    theories: [
      { name: 'Allport의 편견 이론 (The Nature of Prejudice)', year: 1954, journal: 'Addison-Wesley', desc: '편견의 인지적·정서적·행동적 구성요소 분석. 다양성 존중 및 인권감수성 문항의 이론적 배경.' },
      { name: 'Kohlberg의 도덕 발달 이론', year: 1981, journal: 'Harper & Row', desc: '도덕 판단의 6단계 발달 모형. 공정성과 사회적 연대 측정의 발달심리학적 근거.' },
    ]
  },
  {
    category: '세대 공감 (G-Mirror)',
    theories: [
      { name: 'Mannheim의 세대 사회학', year: 1928, journal: 'Kölner Vierteljahrshefte für Soziologie', desc: '세대를 단순한 연령 집단이 아닌 공유된 역사적 경험에 의해 형성된 사회적 위치로 정의. 수평적 태도 및 경계 존중 영역의 기반 이론.' },
      { name: 'Prensky의 디지털 네이티브/이민자 개념', year: 2001, journal: 'On the Horizon', desc: '세대 간 디지털 역량 차이를 설명하는 프레임워크. 개방성과 소통 방식 유연성 측정의 근거.' },
    ]
  },
  {
    category: '상담자 역량 (C-Mirror)',
    theories: [
      { name: 'Rogers의 인간중심 상담이론', year: 1961, journal: 'Houghton Mifflin', desc: '무조건적 긍정적 존중, 공감적 이해, 일치성(진정성)의 3대 핵심 조건. 적극적 경청 및 중립성 영역의 이론적 근거.' },
      { name: 'Maslach의 소진 이론 (Burnout Inventory)', year: 1981, journal: 'Research in Organizational Behavior', desc: '정서적 탈진, 비인격화, 개인적 성취감 감소의 3차원 소진 모형. 소진 예방 영역 설계의 핵심 근거.' },
    ]
  },
];

const validityMethods = [
  { title: '내용 타당도 (Content Validity)', desc: '각 문항이 측정하고자 하는 구인(construct)을 적절히 대표하는지 전문가 패널(심리학·신학·조직학 교수 5인)의 검토를 통해 확보. CVI(Content Validity Index) 0.80 이상 기준 적용.', icon: <FileText size={24}/> },
  { title: '구인 타당도 (Construct Validity)', desc: '확인적 요인분석(CFA)을 통해 각 Mirror의 하위 요인 구조가 이론적 모형과 일치하는지 검증. CFI ≥ 0.90, RMSEA ≤ 0.08 기준 충족 여부 확인.', icon: <BarChart3 size={24}/> },
  { title: '신뢰도 (Reliability)', desc: 'Cronbach\'s α 계수를 산출하여 내적 일관성을 검증. 모든 하위 척도에서 α ≥ 0.70 이상을 기준으로 설정. 검사-재검사 신뢰도(2주 간격) r ≥ 0.80 목표.', icon: <ShieldCheck size={24}/> },
  { title: '변별 타당도 (Discriminant Validity)', desc: '각 Mirror 도구 간 상관계수가 r < 0.85를 유지하여, 서로 다른 구인을 측정하고 있음을 확인. AVE(평균분산추출값) > 상관계수² 기준 적용.', icon: <FlaskConical size={24}/> },
];

export const MethodologyPage = ({ onBack }: MethodologyPageProps) => {
  return (
    <div className="max-w-4xl mx-auto py-12 px-6 pb-24">
      <button onClick={onBack} className="text-toss-gray-500 hover:text-brand-500 flex items-center gap-2 transition-colors font-bold group mb-12">
        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> 대시보드로 돌아가기
      </button>

      {/* Hero */}
      <div className="relative p-10 md:p-14 rounded-[2.5rem] bg-indigo-900 overflow-hidden shadow-2xl mb-12">
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500 rounded-full blur-[100px] -mr-32 -mt-32 opacity-20" />
        <div className="relative z-10 space-y-6">
          <div className="flex items-center gap-3 text-amber-400">
            <GraduationCap size={28} />
            <span className="text-xs font-black uppercase tracking-[0.3em]">Academic Foundation</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight leading-tight">
            학술적 타당성 및<br/>연구 방법론
          </h1>
          <p className="text-indigo-200/70 text-lg font-medium leading-relaxed max-w-2xl">
            Mirror Insight의 모든 진단도구는 심리학·사회학·경영학 분야의 검증된 학술 이론과
            표준화된 심리측정(Psychometrics) 방법론에 기초하여 설계되었습니다.
          </p>
        </div>
      </div>

      {/* Measurement Structure */}
      <section className="mb-12 space-y-6">
        <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
          <div className="w-2 h-8 bg-indigo-500 rounded-full"/>측정 구조
        </h2>
        <div className="bg-white rounded-[2rem] p-8 md:p-10 shadow-sm border border-slate-100 space-y-6">
          <p className="text-slate-600 font-medium leading-relaxed text-lg">
            각 Mirror는 <strong>5개 핵심 차원(Category)</strong>의 리커트 5점 척도 문항과
            <strong> 가치 딜레마(Value Dilemma)</strong> 문항으로 구성됩니다.
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-100 text-center">
              <div className="text-3xl font-black text-emerald-600 mb-2">30문항</div>
              <div className="text-xs font-bold text-emerald-700">초고속 스크리닝</div>
              <p className="text-[11px] text-slate-500 mt-2">각 차원 핵심 2문항 + 딜레마 선별</p>
            </div>
            <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100 text-center">
              <div className="text-3xl font-black text-blue-600 mb-2">70문항</div>
              <div className="text-xs font-bold text-blue-700">표준 진단</div>
              <p className="text-[11px] text-slate-500 mt-2">차원별 균형 배분 + 역문항 포함</p>
            </div>
            <div className="p-6 bg-indigo-50 rounded-2xl border border-indigo-100 text-center">
              <div className="text-3xl font-black text-indigo-600 mb-2">120문항</div>
              <div className="text-xs font-bold text-indigo-700">심층 정밀 분석</div>
              <p className="text-[11px] text-slate-500 mt-2">전체 문항 + L-Scale 검증 포함</p>
            </div>
          </div>
          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
            <h4 className="font-black text-slate-800 mb-3">L-Scale (Lie Scale) 검증</h4>
            <p className="text-sm text-slate-600 leading-relaxed font-medium">
              자기 미화적 응답 편향(Social Desirability Bias)을 감지하기 위해 Paulhus(1984)의 <em>Balanced Inventory of Desirable Responding(BIDR)</em>을
              참고한 검증 문항(V-type)을 삽입합니다. 과도한 긍정 응답 패턴이 감지되면 결과 보고서에 "편향 주의" 경고를 표시합니다.
            </p>
          </div>
        </div>
      </section>

      {/* Validity Methods */}
      <section className="mb-12 space-y-6">
        <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
          <div className="w-2 h-8 bg-amber-500 rounded-full"/>타당도 및 신뢰도 검증 방법
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {validityMethods.map((m, i) => (
            <motion.div key={i} initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:i*0.1}}
              className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100 space-y-4">
              <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center">{m.icon}</div>
              <h3 className="text-lg font-black text-slate-900">{m.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed font-medium">{m.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Research Basis */}
      <section className="space-y-6">
        <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
          <div className="w-2 h-8 bg-emerald-500 rounded-full"/>진단 도구별 학술 근거
        </h2>
        <div className="space-y-6">
          {researchBasis.map((section, si) => (
            <div key={si} className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100 space-y-6">
              <h3 className="text-lg font-black text-indigo-600 flex items-center gap-3">
                <BookOpen size={20}/> {section.category}
              </h3>
              <div className="space-y-4">
                {section.theories.map((t, ti) => (
                  <div key={ti} className="p-5 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
                    <div className="flex items-start justify-between gap-4">
                      <h4 className="font-black text-slate-800 text-sm leading-tight">{t.name}</h4>
                      <span className="text-[10px] font-black text-slate-400 bg-white px-2 py-1 rounded-lg shrink-0">{t.year}</span>
                    </div>
                    <div className="text-[11px] font-bold text-indigo-500 italic">{t.journal}</div>
                    <p className="text-sm text-slate-600 leading-relaxed font-medium">{t.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Disclaimer */}
      <div className="mt-12 p-8 bg-slate-50 rounded-[2rem] border border-slate-200 text-center space-y-4">
        <p className="text-sm text-slate-500 font-medium leading-relaxed">
          본 진단도구는 학술 연구에 기반한 자기보고식 검사(Self-Report Inventory)이며,
          임상적 진단(Clinical Diagnosis)을 대체하지 않습니다.<br/>
          결과 해석 시 전문 상담사 또는 조직심리학 전문가의 자문을 권장합니다.
        </p>
      </div>
    </div>
  );
};
