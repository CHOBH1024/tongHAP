import { useState } from 'react';
import { Home, LayoutGrid, BookOpen, Info, ShieldCheck, ChevronRight, Sparkles, Menu, X, ClipboardList, BarChart3, Headphones, Users, ArrowLeft, Check, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { MirrorApp } from './components/MirrorApp';
import { WorkshopDashboard } from './workshop/WorkshopDashboard';
import { WorkshopSurvey } from './workshop/WorkshopSurvey';
import { cMirrorPart1, cMirrorPart2 } from './data/cMirrorData';
import { iMirrorPart1, iMirrorPart2 } from './data/iMirrorData';
import { lMirrorPart1, lMirrorPart2 } from './data/lMirrorData';
import { Regulations } from './components/Regulations';
import { Doctrine } from './components/Doctrine';
import { Intro } from './components/Intro';
import { Methodology } from './components/Methodology';
import { AdminDashboard } from './components/AdminDashboard';
import { Mentoring } from './components/Mentoring';
import { LoadingScreen } from './components/LoadingScreen';

import { gMirrorPart1, gMirrorPart2 } from './data/gMirrorData';
import { fMirrorPart1, fMirrorPart2 } from './data/fMirrorData';
import { pMirrorPart1, pMirrorPart2 } from './data/pMirrorData';
import { vMirrorPart1, vMirrorPart2 } from './data/vMirrorData';
import { mMirrorPart1, mMirrorPart2 } from './data/mMirrorData';
import { rMirrorPart1, rMirrorPart2 } from './data/rMirrorData';
import { eMirrorPart1, eMirrorPart2 } from './data/eMirrorData';
import { sMirrorPart1, sMirrorPart2 } from './data/sMirrorData';
import { wMirrorPart1, wMirrorPart2 } from './data/wMirrorData';

type Tab = 'home'|'mirror-hub'|'workshop-plan'|'workshop-survey'|'regulations'|'doctrine'|'intro'|'methodology'|'admin'|'mentoring';

const modules = [
  { id:'i-mirror', name:'I-Mirror', subtitle:'나의 가치 찾기', description:'내면의 소중한 가치와 소명을 발견해보세요.', icon:<Sparkles/>, color:'#6366f1',
    p1:iMirrorPart1, p2:iMirrorPart2, dims:["자기인식","가치정립","소명의식","정서조절","성장지향"],
    persona:(a:number)=>a>=80?{status:"깨어있는 자아",desc:"내면의 나침반이 아주 선명해요."}:a<=50?{status:"방황하는 영혼",desc:"자신을 알아가는 여행이 필요할 것 같아요."}:{status:"성장하는 존재",desc:"나만의 가치를 차근차근 쌓아가고 있네요."},
    style:(d:number)=>d<2.6?{header:"실용적 현실주의자",body:"논리와 계획을 중요하게 생각하는 타입이에요."}:d>3.4?{header:"이상적 헌신가",body:"공동체와 희생의 가치를 높게 평가해요."}:{header:"균형적 탐색자",body:"현실과 이상 사이에서 지혜를 찾고 있군요."},
    adviceLogic:(_s:number[])=>{
      const lowIdx = _s.indexOf(Math.min(..._s));
      const topics = ["자기 성찰", "핵심 가치", "소명의 본질", "감정 조절", "지속 가능한 성장"];
      return {
        personal: `${topics[lowIdx]} 부분에서 보완이 필요해요. 가끔은 아무것도 하지 않고 오직 나만의 시간을 갖는 것이 큰 도움이 될 거예요.`,
        ministry: "공직자로서 지칠 때가 있죠? 그럴 땐 현장의 소리보다 내면의 소리에 먼저 귀를 기울여보세요. 하늘부모님과의 수직적 정렬이 우선입니다.",
        actions: [
          "매일 아침 10분, 고요한 마음으로 명상하기",
          "나의 핵심 가치 3가지를 적어보고 책상에 붙여두기",
          "가장 신뢰하는 동료에게 나의 강점을 물어보기"
        ]
      };
    }
  },
  { id:'l-mirror', name:'L-Mirror', subtitle:'리더십 진단', description:'나의 리더십 스타일과 소통 능력을 점검합니다.', icon:<BarChart3/>, color:'#8b5cf6',
    p1:lMirrorPart1, p2:lMirrorPart2, dims:["비전제시","팀빌딩","의사결정","커뮤니케이션","자기관리"],
    persona:(a:number)=>a>=80?{status:"비전의 설계자",desc:"조직을 이끄는 탁월한 힘을 가졌어요."}:a<=50?{status:"고립된 관리자",desc:"리더십 역량을 채워줄 조력자가 필요해요."}:{status:"성장하는 리더",desc:"잠재력이 멋지게 발현되고 있네요."},
    style:(d:number)=>d<2.6?{header:"카리스마 추진형",body:"강한 실행력으로 성과를 만들어내요."}:d>3.4?{header:"서번트 공감형",body:"사람을 소중히 여기며 함께 나아가요."}:{header:"상황적응 균형형",body:"상황에 맞는 유연한 리더십입니다."},
    adviceLogic:(s:number[])=>{
      const lowIdx = s.indexOf(Math.min(...s));
      const topics = ["비전 제시", "팀 빌딩", "의사 결정", "커뮤니케이션", "자기 관리"];
      const tips = [
        "미래의 청사진을 더 구체적으로 그려보세요. 구성원들은 명확한 방향성을 원합니다.",
        "팀원들의 개별적인 강점을 파악하여 적재적소에 배치하는 연습이 필요해요.",
        "데이터와 직관 사이의 균형을 잡아보세요. 가끔은 과감한 결정이 조직을 살립니다.",
        "말하기보다 듣기에 70%의 시간을 할애해보세요. 진정한 소통은 경청에서 시작됩니다.",
        "리더의 건강과 정서가 조직의 온도입니다. 규칙적인 휴식과 명상을 잊지 마세요."
      ];
      return {
        personal: `${topics[lowIdx]} 역량을 보완하면 더 멋진 리더가 될 거예요. ${tips[lowIdx]}`,
        ministry: "공직에서의 리더십은 하늘의 심정을 대변하는 권위입니다. 지시보다는 감동을, 명령보다는 모범을 보여주세요.",
        actions: [
          "주간 회의 전 10분간 팀원들의 장점 한 가지씩 생각하기",
          "의사 결정 시 원리적 관점과 현실적 대안을 동시에 기록해보기",
          "나의 리더십 스타일을 동료들에게 솔직하게 물어보는 시간 갖기"
        ]
      };
    }
  },
  { id:'c-mirror', name:'C-Mirror', subtitle:'상담가 진단', description:'식구들의 마음을 만져주는 상담 능력을 알아봐요.', icon:<Headphones/>, color:'#ec4899',
    p1:cMirrorPart1, p2:cMirrorPart2, dims:["기본 윤리","경청/공감","위기 대처","객관성","소진 예방"],
    persona:(a:number)=>a>=80?{status:"치유하는 멘토",desc:"누구든 안심하고 기댈 수 있는 큰 나무 같아요."}:a<=50?{status:"위기의 소통자",desc:"상담자로서의 재충전과 교육이 필요해 보여요."}:{status:"노력하는 경청자",desc:"마음의 소리에 귀 기울이는 법을 배우고 있네요."},
    style:(d:number)=>d<2.6?{header:"구조화된 분석가",body:"문제의 원인을 명확히 짚어주는 스타일이에요."}:d>3.4?{header:"포용적인 조력자",body:"따뜻한 공감으로 마음을 녹여주네요."}:{header:"균형형 중재자",body:"이성과 감성의 적절한 조화를 이루고 있어요."},
    adviceLogic:(s:number[])=>{
      const lowIdx = s.indexOf(Math.min(...s));
      const topics = ["기본 윤리", "경청과 공감", "위기 대처", "객관성 유지", "소진 예방"];
      const tips = [
        "상담의 윤리는 신뢰의 기초입니다. 비밀 유지와 인격 존중을 다시 한번 상기해보세요.",
        "상대의 말을 가로막지 말고 끝까지 들어주는 연습이 필요해요. 공감이 최고의 치유입니다.",
        "예상치 못한 위기 상황에서도 평정심을 유지하는 훈련을 해보세요.",
        "지나친 감입입은 객관성을 해칠 수 있어요. 적절한 심리적 거리를 유지하는 지혜가 필요합니다.",
        "다른 이의 아픔을 담아내려면 내 마음의 그릇을 먼저 비우고 채워야 합니다."
      ];
      return {
        personal: `${topics[lowIdx]} 부분에 집중해보세요. ${tips[lowIdx]}`,
        ministry: "상담은 하늘의 눈물을 닦아드리는 성사입니다. 인간적인 조언보다 하나님의 심정을 함께 느껴주는 동행자가 되어주세요.",
        actions: [
          "상담 후 10분간 정적 속에서 감정을 분리하는 기도하기",
          "경청 중 상대방의 감정 단어를 반복해서 말해주기(Reflecting)",
          "전문 상담 서적이나 강의를 통해 기술적 역량 보완하기"
        ]
      };
    }
  },
  { id:'g-mirror', name:'G-Mirror', subtitle:'세대 소통 진단', description:'부모님 세대와 자녀 세대의 다리가 되어주세요.', icon:<Users/>, color:'#10b981',
    p1:gMirrorPart1, p2:gMirrorPart2, dims:["세대이해","유연성","디지털역량","공감능력","변화수용"],
    persona:(a:number)=>a>=80?{status:"세대 연결자",desc:"모든 세대가 당신 곁에서 편안함을 느껴요."}:a<=50?{status:"세대 단절자",desc:"소통의 문을 조금 더 열어보는 건 어떨까요?"}:{status:"소통 학습자",desc:"세대 간의 다름을 인정하며 배우고 있네요."},
    style:(d:number)=>d<2.6?{header:"전통 수호자",body:"우리의 소중한 전통과 질서를 지키려 노력해요."}:d>3.4?{header:"혁신 수용자",body:"새로운 변화와 문화를 적극적으로 받아들여요."}:{header:"세대 중재자",body:"전통과 혁신 사이에서 균형을 잘 잡고 있네요."},
    adviceLogic:(s:number[])=>{
      const lowIdx = s.indexOf(Math.min(...s));
      const topics = ["세대 이해", "유연성", "디지털 역량", "공감 능력", "변화 수용"];
      const tips = [
        "다른 세대의 문화를 틀린 것이 아닌 다른 것으로 인정하는 태도가 필요해요.",
        "익숙한 방식만 고집하기보다 새로운 변화의 파도를 타보세요.",
        "최신 디지털 도구는 소통의 강력한 무기가 됩니다. 조금씩 배워보세요.",
        "상대 세대의 언어로 대화하려 노력해보세요. 진심은 언어를 넘어 전달됩니다.",
        "급변하는 시대 정신을 열린 마음으로 받아들이는 용기가 필요합니다."
      ];
      return {
        personal: `${topics[lowIdx]} 역량을 키워보세요. ${tips[lowIdx]}`,
        ministry: "조직 내 세대 갈등은 에너지 낭비가 아닌, 시너지를 위한 산통입니다. 당신이 그 사이의 멋진 다리가 되어주세요.",
        actions: [
          "나와 세대 차이가 많이 나는 동료와 차 한잔하며 관심사 물어보기",
          "유튜브에서 최신 유행어나 트렌드 3가지 찾아보고 의미 파악하기",
          "나의 고정관념 3가지를 적어보고 반대 입장에서 생각해보기"
        ]
      };
    }
  },
  { id:'f-mirror', name:'F-Mirror', subtitle:'신앙 생활 점검', description:'나의 신앙과 말씀 실천은 어떤 모습일까요?', icon:<ShieldCheck/>, color:'#f59e0b',
    p1:fMirrorPart1, p2:fMirrorPart2, dims:["교리이해","실천역량","공동체성","영성깊이","사명감"],
    persona:(a:number)=>a>=80?{status:"신앙의 등대",desc:"주변 사람들에게 믿음의 본보기가 되어주네요."}:a<=50?{status:"갈대같은 신앙",desc:"신앙의 뿌리를 깊게 내릴 수 있게 정성이 필요해요."}:{status:"성장하는 믿음",desc:"말씀을 실천하며 한 걸음씩 나아가고 있어요."},
    style:(d:number)=>d<2.6?{header:"율법적 경건주의",body:"원칙과 규율을 지키는 것에 엄격한 편이에요."}:d>3.4?{header:"은혜적 자유주의",body:"하나님의 사랑과 자유로운 신앙을 추구해요."}:{header:"균형적 신앙인",body:"원칙과 사랑의 조화를 잘 이루고 있군요."},
    adviceLogic:(s:number[])=>{
      const lowIdx = s.indexOf(Math.min(...s));
      const topics = ["교리 이해", "실천 역량", "공동체성", "영성 깊이", "사명감"];
      const tips = [
        "원리 말씀을 머리로만 아는 것이 아니라 가슴으로 체휼하는 시간이 필요해요.",
        "작은 일부터 말씀대로 실천해보세요. 실천이 신앙의 완성입니다.",
        "혼자보다는 함께할 때 신앙은 성장합니다. 소그룹 모임에 더 적극적으로 참여해보세요.",
        "하나님과의 1:1 관계를 깊게 하는 정성 시간이 절실합니다.",
        "나를 부르신 하늘의 뜻을 다시 한번 명확히 정립하는 계기를 만들어보세요."
      ];
      return {
        personal: `${topics[lowIdx]} 부분을 강화하면 신앙의 기쁨이 더 커질 거예요. ${tips[lowIdx]}`,
        ministry: "말씀 전달자이기 전에 말씀의 본보기가 되어주세요. 당신의 삶이 가장 강력한 복음입니다.",
        actions: [
          "매일 정해진 시간에 훈독회 30분 실시하기",
          "나의 신앙 고백을 글로 정리하여 소중한 식구와 나누기",
          "교회 내 소외된 이웃을 위해 일주일간 이름 불러가며 기도하기"
        ]
      };
    }
  },
  { id:'p-mirror', name:'P-Mirror', subtitle:'공직 역량 진단', description:'목회자와 공직자로서의 나의 모습은 어떨까요?', icon:<Users/>, color:'#3b82f6',
    p1:pMirrorPart1, p2:pMirrorPart2, dims:["원칙수호","심정돌봄","목표달성","진리탐구","현장혁신"],
    persona:(a:number)=>a>=80?{status:"천일국 설계자",desc:"완벽한 리더십으로 현장을 변화시키고 있어요."}:a<=50?{status:"초보 사역자",desc:"선배 사역자에게 조언을 구하며 성장해볼까요?"}:{status:"성장하는 공직자",desc:"사역의 방향을 올바르게 잡아가고 있네요."},
    style:(d:number)=>d<2.6?{header:"원칙 중심형",body:"규정과 제도를 통해 조직을 안정시켜요."}:d>3.4?{header:"심정 중심형",body:"식구들의 마음을 돌보는 일에 최선을 다해요."}:{header:"균형 잡힌 목회자",body:"원칙과 사랑 사이에서 현명하게 판단하네요."},
    adviceLogic:(s:number[])=>{
      const lowIdx = s.indexOf(Math.min(...s));
      const topics = ["원칙 수호", "심정 돌봄", "목표 달성", "진리 탐구", "현장 혁신"];
      const tips = [
        "공직의 권위는 규정과 원칙을 준수할 때 바로 섭니다.",
        "식구들의 마음을 얻는 것이 행정보다 중요합니다. 한 명 한 명의 사정을 귀 기울여 들어주세요.",
        "결과를 만들어내는 실행력이 필요해요. 목표를 수치화하고 전략적으로 접근해보세요.",
        "끊임없이 말씀을 연구하여 시대적 대안을 제시할 수 있는 식견을 넓히세요.",
        "과거의 방식에 머물지 말고 최신 도구와 방법론을 현장에 과감히 도입해보세요."
      ];
      return {
        personal: `${topics[lowIdx]} 역량을 높이는 것이 현재 당신의 과제입니다. ${tips[lowIdx]}`,
        ministry: "사역은 하늘의 사랑을 현장에 번역하는 과정입니다. 행정적 완벽함보다 심정적 일치를 우선순위에 두세요.",
        actions: [
          "주간 업무 계획 시 '심정적 소통' 시간을 별도로 배정하기",
          "타 교구의 혁신 사례를 하나 골라 우리 현장에 맞게 변형하여 적용해보기",
          "나의 사역 철학을 담은 비전 선언문 작성하여 책상에 붙여두기"
        ]
      };
    }
  },
  { id:'v-mirror', name:'V-Mirror', subtitle:'소명과 직업', description:'나의 재능이 하늘의 뜻과 만나는 지점을 찾아요.', icon:<Sparkles/>, color:'#f97316',
    p1:vMirrorPart1, p2:vMirrorPart2, dims:["가치발견","사회기여","혁신창출","체계구축","진리탐구"],
    persona:(a:number)=>a>=80?{status:"소명의 개척자",desc:"내가 가야 할 길이 아주 명확하군요."}:a<=50?{status:"방황하는 직업인",desc:"나의 재능이 무엇인지 다시 한번 생각해보는 시간이 필요해요."}:{status:"성장하는 사명자",desc:"나만의 역할을 찾아 멋지게 수행 중이네요."},
    style:(d:number)=>d<2.6?{header:"안정 지향형",body:"탄탄한 기초 위에 성장을 쌓아가는 걸 좋아해요."}:d>3.4?{header:"도전 지향형",body:"새로운 기회를 발견하고 용기 있게 도전하네요."}:{header:"균형 지향형",body:"안정과 도전 사이에서 지혜로운 길을 찾아요."},
    adviceLogic:(s:number[])=>{
      const lowIdx = s.indexOf(Math.min(...s));
      const topics = ["가치 발견", "사회 기여", "혁신 창출", "체계 구축", "진리 탐구"];
      const tips = [
        "내가 하는 일의 근본적 가치를 재발견해보세요. 단순한 노동이 아닌 성직입니다.",
        "나의 전문성이 세상을 어떻게 이롭게 할지 고민하고 실천해보세요.",
        "기존의 방식에서 벗어나 창의적인 문제 해결 방법을 시도해보세요.",
        "지속 가능한 성장을 위해 효율적인 시스템과 프로세스를 만들어보세요.",
        "내 분야의 전문성을 높이기 위한 끊임없는 학습이 필요합니다."
      ];
      return {
        personal: `${topics[lowIdx]} 측면에서 더 깊은 성찰이 필요해요. ${tips[lowIdx]}`,
        ministry: "직업은 하나님께 드리는 최상의 제물입니다. 공직에서의 내 역할이 섭리적으로 어떤 의미가 있는지 명확히 하세요.",
        actions: [
          "나의 전문 역량 강화를 위한 월간 교육 계획 세우기",
          "현재 업무 프로세스 중 비효율적인 부분 하나 개선해보기",
          "나의 10년 후 커리어 로드맵을 소명 중심으로 그려보기"
        ]
      };
    }
  },
  { id:'m-mirror', name:'M-Mirror', subtitle:'업무 수행 진단', description:'사명과 과업을 수행하는 나의 스타일을 알아봐요.', icon:<Check/>, color:'#10b981',
    p1:mMirrorPart1, p2:mMirrorPart2, dims:["계획성","실행력","협업능력","분석력","문제해결"],
    persona:(a:number)=>a>=80?{status:"완벽한 해결사",desc:"과업 수행 능력이 아주 탁월하군요."}:a<=50?{status:"미숙한 실행자",desc:"업무 프로세스를 조금 더 다듬어볼까요?"}:{status:"성장하는 실무자",desc:"나만의 업무 스타일을 잘 찾아가고 있네요."},
    style:(d:number)=>d<2.6?{header:"신중한 계획가",body:"철저한 분석 후에 실행에 옮기는 타입이에요."}:d>3.4?{header:"행동파 개척자",body:"일단 부딪히며 문제를 해결해 나가는군요."}:{header:"유연한 실무자",body:"상황에 맞춰 유연하게 대처하는 능력이 있어요."},
    adviceLogic:(s:number[])=>{
      const lowIdx = s.indexOf(Math.min(...s));
      const topics = ["계획성", "실행력", "협업 능력", "분석력", "문제 해결"];
      const tips = [
        "일의 우선순위를 정하고 체계적으로 접근하는 습관이 필요해요.",
        "생각에 머물지 말고 즉각 행동으로 옮기는 용기를 가져보세요.",
        "혼자보다는 함께 성과를 만드는 협업의 즐거움을 느껴보세요.",
        "데이터를 기반으로 현상을 정확히 파악하는 분석력을 키워보세요.",
        "예상치 못한 난관 앞에서도 당황하지 않고 대안을 찾는 유연함이 필요합니다."
      ];
      return {
        personal: `${topics[lowIdx]} 역량을 보완하면 업무 효율이 배가될 거예요. ${tips[lowIdx]}`,
        ministry: "공직 업무는 정교한 톱니바퀴와 같습니다. 나의 역할이 전체 섭리 노정에서 어떤 가치를 갖는지 상기하세요.",
        actions: [
          "매일 아침 10분, 당일의 핵심 과업 3가지 정의하기",
          "협업 툴(노션, 슬랙 등)을 활용하여 업무 과정을 투명하게 공유하기",
          "완료된 프로젝트의 '사후 검토(AAR)'를 통해 배울 점 정리하기"
        ]
      };
    }
  },
  { id:'r-mirror', name:'R-Mirror', subtitle:'대인 관계 진단', description:'나의 소통 방식과 네트워크 역량을 점검해요.', icon:<Users/>, color:'#ec4899',
    p1:rMirrorPart1, p2:rMirrorPart2, dims:["외향성","공감력","논리성","네트워킹","갈등관리"],
    persona:(a:number)=>a>=80?{status:"소통의 마스터",desc:"인간관계가 아주 원만하고 깊군요."}:a<=50?{status:"고립된 개인",desc:"소통 능력을 키워줄 멘토를 만나보는 건 어떨까요?"}:{status:"성장하는 네트워커",desc:"관계의 폭을 넓히며 조화롭게 지내고 있네요."},
    style:(d:number)=>d<2.6?{header:"목적 지향 소통가",body:"일 중심의 합리적 관계를 맺는 스타일이에요."}:d>3.4?{header:"정서 중심 소통가",body:"감정과 공감을 중요하게 생각하는군요."}:{header:"상황 맞춤 소통가",body:"상대에 따라 유연하게 소통하는 지혜가 있어요."},
    adviceLogic:(s:number[])=>{
      const lowIdx = s.indexOf(Math.min(...s));
      const topics = ["외향성", "공감력", "논리성", "네트워킹", "갈등 관리"];
      const tips = [
        "조금 더 적극적으로 먼저 다가가 인사를 건네보세요. 관계의 시작은 작은 용기입니다.",
        "상대의 감정을 있는 그대로 인정해주고 공감하는 연습이 필요해요.",
        "감정에 치우치기보다 논리적이고 명확한 의사소통을 시도해보세요.",
        "다양한 분야의 사람들과 만나며 인적 네트워크의 폭을 넓혀보세요.",
        "갈등은 피하는 것이 아니라 지혜롭게 해결하는 것입니다. 비폭력 대화법을 익혀보세요."
      ];
      return {
        personal: `${topics[lowIdx]} 역량을 키워 인간관계의 풍요로움을 누려보세요. ${tips[lowIdx]}`,
        ministry: "공직 생활의 성공은 관계의 성공에 달려 있습니다. 식구들과의 심정적 유대를 강화하는 데 정성을 들이세요.",
        actions: [
          "가장 대화하기 어려웠던 동료에게 가벼운 안부 메시지 보내기",
          "대화 중 상대의 말을 끊지 않고 끝까지 듣는 '3분 경청' 실천하기",
          "나의 의사소통 스타일의 장단점을 지인들에게 물어보기"
        ]
      };
    }
  },
  { id:'e-mirror', name:'E-Mirror', subtitle:'감성 지능 진단', description:'나의 감정을 다스리고 타인과 공감하는 능력을 알아봐요.', icon:<Heart/>, color:'#8b5cf6',
    p1:eMirrorPart1, p2:eMirrorPart2, dims:["자기인식","자기조절","공감","동기부여","사회적기술"],
    persona:(a:number)=>a>=80?{status:"감정의 달인",desc:"높은 감성 지능으로 주변을 밝게 만드네요."}:a<=50?{status:"감정의 노예",desc:"감정을 다스리는 마음 공부가 필요해 보여요."}:{status:"성장하는 자아",desc:"감정을 조절하는 법을 차근차근 배우고 있네요."},
    style:(d:number)=>d<2.6?{header:"이성 통제형",body:"감정보다 이성적인 판단을 중요하게 생각해요."}:d>3.4?{header:"감성 발산형",body:"자신의 감정을 솔직하고 풍부하게 표현하네요."}:{header:"유연한 조절형",body:"상황에 맞춰 감정을 지혜롭게 조절할 줄 알아요."},
    adviceLogic:(s:number[])=>{
      const lowIdx = s.indexOf(Math.min(...s));
      const topics = ["자기 인식", "자기 조절", "공감", "동기 부여", "사회적 기술"];
      const tips = [
        "현재 나의 감정 상태를 객관적으로 이름 붙여보는 연습을 해보세요.",
        "화가 나거나 불안할 때 6초간 심호흡하며 감정의 파도를 다스려보세요.",
        "타인의 감정 변화를 예민하게 살피고 따뜻하게 반응해주는 연습이 필요해요.",
        "내면의 열정을 깨울 수 있는 명확한 목표와 보상을 설정해보세요.",
        "조직 내에서 조화롭게 소통하고 협력하는 기술을 연마해보세요."
      ];
      return {
        personal: `${topics[lowIdx]} 역량을 높이면 삶의 질이 달라질 거예요. ${tips[lowIdx]}`,
        ministry: "공직자는 식구들의 감정을 담아내는 큰 그릇입니다. 내 감정의 건강을 먼저 챙기는 것이 사역의 시작입니다.",
        actions: [
          "매일 밤 '감정 일기'를 쓰며 하루의 마음을 정리하기",
          "스트레스 상황에서 나만의 '마음 진정 루틴' 만들기",
          "긍정적인 감정을 표현하는 단어를 하루에 5번 이상 사용하기"
        ]
      };
    }
  },
  { id:'s-mirror', name:'S-Mirror', subtitle:'영성 성숙 진단', description:'나의 영적 깊이와 신앙의 성숙도를 점검합니다.', icon:<Sparkles/>, color:'#eab308',
    p1:sMirrorPart1, p2:sMirrorPart2, dims:["말씀연구","기도생활","봉사실천","예배참석","심정공명"],
    persona:(a:number)=>a>=80?{status:"영적 거장",desc:"깊은 영성으로 하늘과 하나 된 삶을 살고 있군요."}:a<=50?{status:"영적 어린아이",desc:"영적 양식을 꾸준히 섭취하며 성장해볼까요?"}:{status:"성장하는 신앙인",desc:"영적 깊이를 더해가며 신앙의 뿌리를 내리고 있네요."},
    style:(d:number)=>d<2.6?{header:"이성적 탐구자",body:"진리와 말씀을 깊이 있게 탐구하는 스타일이에요."}:d>3.4?{header:"감성적 체험자",body:"은혜와 기적을 사모하며 뜨겁게 신앙 생활 하네요."}:{header:"균형 잡힌 구도자",body:"말씀과 기도가 조화롭게 어우러져 있군요."},
    adviceLogic:(s:number[])=>{
      const lowIdx = s.indexOf(Math.min(...s));
      const topics = ["말씀 연구", "기도 생활", "봉사 실천", "예배 참석", "심정 공명"];
      const tips = [
        "원리 말씀을 깊이 있게 탐구하고 내 삶에 적용하는 공부가 필요해요.",
        "하늘부모님과의 수직적 정렬을 위한 깊은 기도 시간을 확보하세요.",
        "말씀을 삶으로 실천하는 봉사의 현장에서 진정한 영성이 피어납니다.",
        "공동체와 함께 드리는 예배를 통해 영적 에너지를 충전하세요.",
        "하나님의 슬픔과 기쁨에 함께 공명할 수 있는 심정적 감수성을 키워보세요."
      ];
      return {
        personal: `${topics[lowIdx]} 부분을 강화하여 영적 성숙을 이뤄보세요. ${tips[lowIdx]}`,
        ministry: "영적 권위는 지위가 아닌 정성에서 나옵니다. 식구들을 위한 중보 기도의 제단을 먼저 쌓으세요.",
        actions: [
          "매일 아침 30분, 말씀을 읽고 묵상하는 '영적 독서' 시간 갖기",
          "나의 영적 체험이나 깨달음을 신앙 노트에 기록하기",
          "주변의 어려운 이웃을 위해 남몰래 선행 실천하기"
        ]
      };
    }
  },
  { id:'w-mirror', name:'W-Mirror', subtitle:'재정 관리 진단', description:'만물을 주관하고 관리하는 나의 성향을 알아봐요.', icon:<BarChart3/>, color:'#06b6d4',
    p1:wMirrorPart1, p2:wMirrorPart2, dims:["저축/절약","가치투자","나눔/봉사","목적소비","리스크관리"],
    persona:(a:number)=>a>=80?{status:"지혜로운 청지기",desc:"탁월한 만물 주관 능력으로 뜻을 받들고 있네요."}:a<=50?{status:"재정적 방황자",desc:"올바른 경제 관념을 세우기 위한 학습이 필요해요."}:{status:"성장하는 관리자",desc:"재정 관리 능력을 키우며 풍요로운 삶을 준비 중이네요."},
    style:(d:number)=>d<2.6?{header:"안전 지향 보수형",body:"저축과 절약을 통해 내실을 기하는 타입이에요."}:d>3.4?{header:"가치 지향 투자형",body:"미래 가치와 나눔을 위해 과감하게 투자하네요."}:{header:"균형 잡힌 관리자",body:"안정과 성장을 조화롭게 추구하는 지혜가 있어요."},
    adviceLogic:(s:number[])=>{
      const lowIdx = s.indexOf(Math.min(...s));
      const topics = ["저축과 절약", "가치 투자", "나눔과 봉사", "목적 소비", "리스크 관리"];
      const tips = [
        "지출 내역을 꼼꼼히 살피고 불필요한 낭비를 줄이는 훈련이 필요해요.",
        "미래의 가치를 위해 자산을 지혜롭게 배분하는 전략을 배워보세요.",
        "가진 것을 나눌 때 물질의 진정한 가치가 실현됩니다. 나눔의 기쁨을 누려보세요.",
        "소비의 목적을 분명히 하고 하늘의 뜻에 맞는 경제 활동을 지향하세요.",
        "불확실한 미래에 대비하여 재정적 안정성을 확보하는 지혜가 필요합니다."
      ];
      return {
        personal: `${topics[lowIdx]} 측면에서 더 체계적인 관리가 필요해요. ${tips[lowIdx]}`,
        ministry: "공직 재정은 식구들의 정성입니다. 단 1원의 오차도 없는 투명한 집행으로 신뢰의 본을 보이세요.",
        actions: [
          "가계부나 자산 관리 앱을 통해 매달 지출 패턴 분석하기",
          "수입의 일정 부분을 섭리적 목적을 위해 별도로 적립하기",
          "경제적 지혜를 키울 수 있는 신뢰할 만한 서적 읽기"
        ]
      };
    }
  }
];

export function GajeongApp() {
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [activeModuleId, setActiveModuleId] = useState<string|null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { id:'home', label:'홈', icon:<Home size={18}/> },
    { id:'mirror-hub', label:'미러 허브', icon:<LayoutGrid size={18}/> },
    { id:'workshop-plan', label:'워크숍 기획', icon:<ClipboardList size={18}/> },
    { id:'workshop-survey', label:'워크숍 설문', icon:<BarChart3 size={18}/> },
    { id:'regulations', label:'행정 규정', icon:<ShieldCheck size={18}/> },
    { id:'doctrine', label:'교리 학습', icon:<BookOpen size={18}/> },
    { id:'mentoring', label:'멘토링', icon:<Users size={18}/> },
    { id:'intro', label:'플랫폼 소개', icon:<Info size={18}/> },
    { id:'methodology', label:'학술 근거', icon:<Check size={18}/> },
    { id:'admin', label:'관리자', icon:<BarChart3 size={18}/> },
  ];

  const renderMirrorModule = () => {
    const mod = modules.find(m => m.id === activeModuleId);
    if (!mod) return null;
    return (
      <div className="max-w-4xl mx-auto">
        <button onClick={()=>setActiveModuleId(null)} className="flex items-center gap-2 text-toss-gray-500 font-bold mb-8 hover:text-toss-gray-900 transition-colors">
          <ArrowLeft size={20}/> 뒤로 가기
        </button>
        <MirrorApp id={mod.id} name={mod.name} subtitle={mod.subtitle} description={mod.description} icon={mod.icon}
          part1Questions={mod.p1} part2Questions={mod.p2} dimensions={mod.dims} personaLogic={mod.persona} styleLogic={mod.style} adviceLogic={mod.adviceLogic}/>
      </div>
    );
  };

  const renderContent = () => {
    switch(activeTab) {
      case 'home': return (
        <motion.section key="home" initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} className="py-12 space-y-12">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-black leading-tight tracking-tight">
              안녕하세요,<br/>
              나를 알아가는<br/>
              <span className="text-toss-blue">성찰의 시간</span>을 가져볼까요?
            </h1>
            <p className="text-toss-gray-600 text-lg leading-relaxed max-w-lg">
              GAJEONG 플랫폼은 전문적인 진단과 워크숍 도구를 통해 개인의 성장과 현장의 혁신을 돕습니다.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div onClick={()=>setActiveTab('mirror-hub')} className="toss-card cursor-pointer flex flex-col justify-between h-64 border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
              <div>
                <div className="w-12 h-12 bg-toss-blue-light text-toss-blue rounded-2xl flex items-center justify-center mb-6">
                  <LayoutGrid size={24}/>
                </div>
                <h3 className="text-2xl font-bold mb-2">미러 허브</h3>
                <p className="text-toss-gray-500">12가지 전문 진단으로<br/>나의 상태를 확인해보세요.</p>
              </div>
              <div className="text-toss-blue font-bold flex items-center gap-1 text-sm">
                진단 시작하기 <ChevronRight size={16}/>
              </div>
            </div>
            
            <div onClick={()=>setActiveTab('workshop-plan')} className="toss-card cursor-pointer flex flex-col justify-between h-64 border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
              <div>
                <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-6">
                  <ClipboardList size={24}/>
                </div>
                <h3 className="text-2xl font-bold mb-2">워크숍 마스터 플랜</h3>
                <p className="text-toss-gray-500">성공적인 현장 워크숍을 위한<br/>모든 기획 도구가 모여있어요.</p>
              </div>
              <div className="text-emerald-600 font-bold flex items-center gap-1 text-sm">
                기획 도구 보기 <ChevronRight size={16}/>
              </div>
            </div>
          </div>

          <div className="toss-card border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
            <h3 className="text-xl font-bold mb-6">추천 학습</h3>
            <div className="space-y-4">
              {[
                { label: '교리 학습 퀘스트', icon: <BookOpen className="text-purple-500"/>, action: () => setActiveTab('doctrine') },
                { label: '최신 행정 규정 확인', icon: <ShieldCheck className="text-blue-500"/>, action: () => setActiveTab('regulations') },
                { label: '선배 공직자 멘토링', icon: <Users className="text-orange-500"/>, action: () => setActiveTab('mentoring') }
              ].map((item, idx) => (
                <div key={idx} onClick={item.action} className="flex items-center justify-between p-4 hover:bg-toss-gray-50 rounded-2xl cursor-pointer transition-colors group">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center">
                      {item.icon}
                    </div>
                    <span className="font-bold text-toss-gray-800">{item.label}</span>
                  </div>
                  <ChevronRight size={18} className="text-toss-gray-300 group-hover:text-toss-gray-900 transition-colors"/>
                </div>
              ))}
            </div>
          </div>
        </motion.section>
      );
      case 'mirror-hub':
        if(activeModuleId) return renderMirrorModule();
        return (
          <motion.section key="hub" initial={{opacity:0}} animate={{opacity:1}} className="py-8 space-y-10">
            <div className="space-y-2">
              <h2 className="text-3xl font-black tracking-tight">미러 허브</h2>
              <p className="text-toss-gray-500 font-medium">나의 가치를 비춰보는 12개의 거울 — 30 / 70 / 120문항 선택</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {modules.map(m=>(
                <div key={m.id} onClick={()=>setActiveModuleId(m.id)} className="toss-card border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] cursor-pointer group">
                  <div className="w-12 h-12 rounded-2xl mb-6 flex items-center justify-center text-white" style={{backgroundColor:m.color}}>{m.icon}</div>
                  <h3 className="text-xl font-black mb-1">{m.name}</h3>
                  <p className="text-xs text-toss-gray-400 mb-3 uppercase tracking-widest">{m.subtitle}</p>
                  <p className="text-sm text-toss-gray-600 mb-8 leading-relaxed">{m.description}</p>
                  <div className="flex items-center gap-1 text-sm font-bold text-toss-blue group-hover:gap-2 transition-all">
                    지금 진단하기 <ChevronRight size={16}/>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>
        );
      case 'workshop-plan': return <WorkshopDashboard/>;
      case 'workshop-survey': return <WorkshopSurvey/>;
      case 'regulations': return <Regulations/>;
      case 'doctrine': return <Doctrine/>;
      case 'mentoring': return <Mentoring/>;
      case 'methodology': return <Methodology/>;
      case 'admin': return <AdminDashboard/>;
      case 'intro': return <Intro/>;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f2f4f6]">
      <LoadingScreen />
      
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer" onClick={()=>{setActiveTab('home');setActiveModuleId(null);}}>
            <div className="w-8 h-8 bg-toss-blue rounded-lg flex items-center justify-center shadow-lg shadow-toss-blue/20">
              <Sparkles className="text-white" size={18}/>
            </div>
            <span className="text-xl font-black tracking-tight text-toss-gray-900">GAJEONG</span>
          </div>
          
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map(item=>(
              <button key={item.id} onClick={()=>{setActiveTab(item.id as Tab);setActiveModuleId(null);}} className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${activeTab===item.id?'bg-toss-gray-100 text-toss-blue':'text-toss-gray-500 hover:text-toss-gray-900'}`}>
                {item.label}
              </button>
            ))}
          </div>
          
          <button className="lg:hidden text-toss-gray-900" onClick={()=>setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24}/> : <Menu size={24}/>}
          </button>
        </div>
        
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div initial={{opacity:0, height:0}} animate={{opacity:1, height:'auto'}} exit={{opacity:0, height:0}} className="lg:hidden overflow-hidden border-t border-toss-gray-100 mt-4 pt-4">
              <div className="grid grid-cols-2 gap-2">
                {navItems.map(item=>(
                  <button key={item.id} onClick={()=>{setActiveTab(item.id as Tab);setActiveModuleId(null);setIsMenuOpen(false);}} className="px-4 py-3 rounded-xl text-left flex items-center gap-2 text-sm font-bold text-toss-gray-600 hover:bg-toss-gray-100 active:bg-toss-gray-200">
                    {item.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-12">
        <AnimatePresence mode="wait">
          {renderContent()}
        </AnimatePresence>
      </main>

      <footer className="py-16 px-6 text-toss-gray-400">
        <div className="max-w-7xl mx-auto text-center space-y-4">
          <div className="flex justify-center items-center gap-2 font-black text-toss-gray-600">
            <Sparkles size={16}/> GAJEONG
          </div>
          <p className="text-xs font-medium">© 2026 Gajeong. All rights reserved.</p>
          <div className="flex justify-center gap-4 text-[10px] font-bold uppercase tracking-widest">
            <span>Privacy</span>
            <span>Terms</span>
            <span>Contact</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
