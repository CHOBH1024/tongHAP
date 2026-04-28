import { SurveyConfig, SurveyResultContent } from '../types';

function generateDetailedResult(score: number): SurveyResultContent {
  if (score >= 80) {
    return {
      persona: '탁월한 소명가 (The Driven Visionary)',
      headline: '내면의 나침반이 확고한, 진리와 헌신의 아이콘',
      description: '당신은 외부의 흔들림에 굴하지 않고, 내면의 가치가 지향하는 바를 향해 강력하게 나아가는 사람입니다. 직업을 넘어 자신이 해야 할 일의 본질적 이유를 발견하였으며, 어떠한 시련이나 유혹이 닥쳐와도 타협하지 않는 단단함을 지니고 있습니다. 당신의 존재 자체가 주위 사람들에게 거울이 되고 나침반이 됩니다. 다만, 때로는 철저한 원칙주의로 인해 주변의 약한 이들을 살피기보다는 목표 지향적으로 보일 수 있습니다.',
      strengths: [
        '흔들리지 않는 굳건한 가치관과 정체성',
        '모범이 되는 윤리 의식과 책임감',
        '역경을 성장의 원동력으로 삼는 회복 탄력성'
      ],
      weaknesses: [
        '자신의 높은 기준을 타인에게도 동일하게 기대함',
        '원칙을 고수하느라 융통성이 부족할 수 있음'
      ],
      advice: '이미 확고한 소명을 이루어 낸 당신에게 필요한 것은 "여유"와 "자비"입니다. 사람들은 각자의 속도로 성숙해 간다는 것을 이해하고, 원칙의 칼날보다 공감의 품을 내어준다면 진정한 생명력을 발휘하는 리더가 될 것입니다. 완벽함을 내려놓고, 주변 사람들의 작은 성과를 격려해 주십시오.'
    };
  } else if (score >= 60) {
    return {
      persona: '안정적 실무자 (The Reliable Navigator)',
      headline: '현실과 이상의 균형을 찾아가는 믿음직한 러너',
      description: '당신은 직무에 대한 책임감과 윤리 의식을 갖추고 있으면서도, 현실적인 요인들(조직 문화, 생계, 피로감 등)을 고려할 줄 아는 안정적인 실용주의자입니다. 자신의 소명을 완전히 확신하거나 희생하기보다는 주어진 일을 책임감 있게 완수하는 데서 존재 가치를 찾습니다. 그러나 때때로 "내가 과연 이 길에 맞는가?" 하는 본질적 질문에 직면하기도 합니다.',
      strengths: [
        '현실과 이상을 절충하는 유연함',
        '주어진 책무를 다하는 성실함',
        '타인의 상황을 이해하는 현실적 공감 능력'
      ],
      weaknesses: [
        '결정적인 순간에 자기 방어적이 될 수 있음',
        '매너리즘이나 소진(Burnout)에 취약할 위험'
      ],
      advice: '안정적으로 잘 해내고 있지만, 당신의 열정을 깨울 "한 스푼의 영감"이 필요합니다. 내가 이 일을 처음 시작했을 때의 초심을 기록해 보세요. 일상 속에서 성과가 아닌 과정의 기쁨을 찾는 연습을 한다면, 매너리즘에 빠지지 않고 더 깊은 차원의 소명으로 나아갈 수 있습니다.'
    };
  } else {
    return {
      persona: '성찰이 필요한 번아웃 (The Wandering Soul)',
      headline: '내면의 나침반을 재점검해야 할 고립의 시간',
      description: '현재 당신은 내적 가치관이 심하게 흔들리거나, 주어진 환경에 압도되어 심리적 소진 상태(Burnout)에 놓여 있을 가능성이 큽니다. 일이 주는 의미를 잃어버린 채 생존 혹은 의무감만으로 버티고 있을 수 있습니다. 지금은 자책할 때가 아니라, 숨을 고르고 내가 어디에 서 있는지 돌아보며 재충전해야 할 결정적 시기입니다.',
      strengths: [
        '상황을 객관적으로 인식하고 변화를 갈망함',
        '새로운 전환점을 모색할 수 있는 유연한 상태',
        '아픔을 겪으며 타인의 상처를 공감하는 능력'
      ],
      weaknesses: [
        '목적의식 결여로 인한 만성적 무기력',
        '작은 비판에도 쉽게 상처받는 낮은 회복탄력성'
      ],
      advice: '잠시 멈춰 서야 합니다. 지금의 피로는 그저 몸의 피로가 아니라 마음과 영혼의 피로입니다. 작은 책임들을 과감히 내려놓고, 아무것도 하지 않는 시간을 통해 자신을 돌보십시오. "내가 정말 좋아했던 것"이 무엇인지 아주 사소한 것부터 찾아보길 권합니다.'
    };
  }
}

export const surveys: SurveyConfig[] = [
  {
    id: 'vocation',
    name: 'I-Mirror',
    title: '소명 및 내면 가치 진단',
    subtitle: '기복신앙이나 외적 성과를 넘어선 존재의 본질과 정직성을 점검합니다.',
    color: 'blue',
    icon: 'shield-check',
    categories: ['정체성', '윤리성', '목적의식', '회복탄력성', '사회적 책임'],
    questions: [
        {c:1,t:'L',q:'나의 일은 단순한 직업 이상의 소명이다.'},
        {c:1,t:'R',q:'내 직무에서 특별한 의미를 찾기 어렵다.'},
        {c:1,t:'L',q:'나는 내가 하는 일을 통해 내 존재가치를 확인한다.'},
        {c:1,t:'R',q:'일은 단지 돈을 벌기 위한 수단일 뿐이다.'},
        {c:1,t:'L',q:'내 직업적 정체성은 나의 삶의 방식과 일치한다.'},
        {c:2,t:'L',q:'아무도 보지 않을 때도 원칙을 지킨다.'},
        {c:2,t:'R',q:'목표 달성을 위해서는 사소한 편법은 용인될 수 있다.'},
        {c:2,t:'L',q:'정직함이 결국 최고의 성과를 만든다고 믿는다.'},
        {c:2,t:'R',q:'과도한 도덕성은 현실적인 성공에 방해가 된다.'},
        {c:2,t:'L',q:'부당한 지시에는 불이익을 감수하고서라도 반대한다.'},
        {c:3,t:'L',q:'나의 일은 세상에 긍정적인 변화를 만든다.'},
        {c:3,t:'R',q:'내가 하는 일이 사회에 기여하는 바를 모르겠다.'},
        {c:3,t:'L',q:'업무 중 겪는 고난도 큰 목적을 위한 과정이라 생각한다.'},
        {c:3,t:'R',q:'명확한 비전 없이 하루하루 주어진 일을 처리한다.'},
        {c:3,t:'L',q:'장기적인 가치를 위해 단기적 손실을 감수할 수 있다.'},
        {c:4,t:'L',q:'실패를 겪어도 빠르게 마음을 추스르고 일어난다.'},
        {c:4,t:'R',q:'작은 비판에도 깊은 상처를 받고 오래 힘들어한다.'},
        {c:4,t:'L',q:'스트레스 상황에서도 감정을 잘 통제한다.'},
        {c:4,t:'R',q:'업무적 압박감이 내 일상 전체를 지배하곤 한다.'},
        {c:4,t:'L',q:'어려움 속에서도 배울 점을 찾아낸다.'},
        {c:5,t:'L',q:'나의 성취는 동료와 사회의 도움 덕분이다.'},
        {c:5,t:'R',q:'내가 거둔 성공은 오로지 내 노력의 결과다.'},
        {c:5,t:'L',q:'약자를 돕고 배려하는 것은 리더의 필수 덕목이다.'},
        {c:5,t:'R',q:'경쟁에서 뒤처진 사람을 챙길 여유는 없다.'},
        {c:5,t:'L',q:'조직의 이익보다 사회적 공익이 우선될 때가 있다.'},
        {c:6,t:'V',q:'어느 쪽에 더 동의하십니까?', left:'원칙', right:'유연성', descL:'규칙은 예외 없이 지켜져야 한다', descR:'상황에 따라 규칙은 변경될 수 있다'},
        {c:6,t:'V',q:'어느 쪽에 더 동의하십니까?', left:'과정', right:'결과', descL:'정당한 과정이 최우선이다', descR:'좋은 결과가 과정을 증명한다'},
        {c:6,t:'V',q:'어느 쪽에 더 동의하십니까?', left:'조직', right:'개인', descL:'조직의 목표가 우선이다', descR:'개인의 신념이 우선이다'},
        {c:6,t:'V',q:'어느 쪽에 더 동의하십니까?', left:'안정', right:'혁신', descL:'안정적인 기반 유지가 중요하다', descR:'리스크를 감수한 혁신이 중요하다'},
        {c:6,t:'V',q:'어느 쪽에 더 동의하십니까?', left:'공정', right:'자비', descL:'모두에게 동일한 잣대를 적용해야 한다', descR:'개인의 특수한 사정을 고려해야 한다'}
    ],
    getResultContent: generateDetailedResult
  },
  { id: 'leadership', name: 'L-Mirror', title: '리더십 진단', subtitle: '말과 태도가 조직에 미치는 온도를 측정합니다.', color: 'amber', icon: 'mic', categories: ['비전제시', '공감소통', '포용력', '피드백 수용', '선한 영향력'], questions: [], getResultContent: generateDetailedResult },
  { id: 'authenticity', name: 'A-Mirror', title: '진정성 진단', subtitle: '무대 위와 무대 아래의 괴리감을 측정합니다.', color: 'teal', icon: 'scan-face', categories: ['투명성', '자기일치도', '취약성인정', '자기인식', '감정조절'], questions: [], getResultContent: generateDetailedResult },
  { id: 'social', name: 'S-Mirror', title: '사회적 감수성 진단', subtitle: '현대 사회 속 나의 윤리적 좌표를 점검합니다.', color: 'emerald', icon: 'compass', categories: ['다양성존중', '인권감수성', '환경의식', '공정성', '사회적연대'], questions: [], getResultContent: generateDetailedResult },
  { id: 'generation', name: 'G-Mirror', title: '세대 공감 진단', subtitle: '무의식적으로 범하는 물리적/정서적 경계 침범.', color: 'violet', icon: 'users', categories: ['수평적태도', '언어습관', '경계존중', '개방성', '공감능력'], questions: [], getResultContent: generateDetailedResult },
  { id: 'counseling', name: 'C-Mirror', title: '상담자 역량 진단', subtitle: '경청의 깊이와 위기 대처, 감정적 소진을 진단.', color: 'indigo', icon: 'headphones', categories: ['적극적경청', '분석력', '중립성', '위기대처', '소진예방'], questions: [], getResultContent: generateDetailedResult },
  { id: 'personal', name: 'P-Mirror', title: '개인 역량 및 매력도 진단', subtitle: '내가 얼마나 호감 가고 일 잘하는 사람인지 해부.', color: 'rose', icon: 'sparkles', categories: ['문제해결력', '실행력', '대인관계', '센스/눈치', '인간적매력'], questions: [], getResultContent: generateDetailedResult },
  { id: 'lifestyle', name: 'V-Mirror', title: '취향 및 라이프스타일 진단', subtitle: '내 영혼의 배터리를 채워 줄 진짜 주파수.', color: 'lime', icon: 'coffee', categories: ['미적감각', '휴식의질', '취미몰입', '트렌드민감성', '독창성'], questions: [], getResultContent: generateDetailedResult },
  { id: 'faith', name: 'F-Mirror', title: '신앙 및 영성 진단', subtitle: '내면 깊은 곳의 영적 성숙도를 측정합니다.', color: 'sky', icon: 'star', categories: ['내면영성', '삶의실천', '공동체의식', '관용과수용', '이타적헌신'], questions: [], getResultContent: generateDetailedResult },
];
