import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, Utensils, Lightbulb, MessageSquare, CheckCircle2, Heart, Wrench, Users, BookOpen, Clock, MapPin, Star, Shield, Flame, Target, Check } from 'lucide-react';

type SurveyStep = 'food'|'snack'|'needs'|'room'|'lectures'|'topics'|'spiritual'|'digital'|'generation'|'stress'|'admin'|'vision'|'feedback'|'free'|'finish';

export const WorkshopSurvey: React.FC = () => {
  const [step, setStep] = useState<SurveyStep>('food');
  const [answers, setAnswers] = useState<Record<string,string[]>>({});
  const [textAnswers, setTextAnswers] = useState<Record<string,string>>({});

  const toggle = (cat:string, val:string) => {
    const cur = answers[cat]||[];
    setAnswers({...answers, [cat]: cur.includes(val)?cur.filter(v=>v!==val):[...cur,val]});
  };

  const steps: {id:SurveyStep;label:string;icon:React.ReactNode;title:string;subtitle:string;type:'multi'|'text'}[] = [
    {id:'food',label:'식사 메뉴',icon:<Utensils size={18}/>,title:'워크숍 식사로 무엇을 원하시나요?',subtitle:'참가자 취향을 반영하여 메뉴를 선정합니다.',type:'multi'},
    {id:'snack',label:'간식/음료',icon:<Heart size={18}/>,title:'쉬는 시간에 어떤 간식을 원하시나요?',subtitle:'Coffee Break 및 야식 메뉴를 정합니다.',type:'multi'},
    {id:'needs',label:'준비물품',icon:<Wrench size={18}/>,title:'현장에서 꼭 필요한 물품이 있나요?',subtitle:'쾌적한 환경 조성을 위해 미리 준비합니다.',type:'multi'},
    {id:'room',label:'숙소/환경',icon:<MapPin size={18}/>,title:'숙소와 환경에 대한 희망사항은?',subtitle:'청심수련원 시설 활용에 참고합니다.',type:'multi'},
    {id:'lectures',label:'강의 주제',icon:<Lightbulb size={18}/>,title:'어떤 강의를 듣고 싶으신가요?',subtitle:'실무에 가장 도움되는 주제를 골라주세요.',type:'multi'},
    {id:'topics',label:'토론 안건',icon:<MessageSquare size={18}/>,title:'해커톤에서 다룰 핵심 안건은?',subtitle:'현장의 가장 시급한 과제를 선정합니다.',type:'multi'},
    {id:'spiritual',label:'영적 프로그램',icon:<Flame size={18}/>,title:'어떤 영적 프로그램을 원하시나요?',subtitle:'참부모님 뜻 안에서의 영적 재충전입니다.',type:'multi'},
    {id:'digital',label:'디지털 역량',icon:<Target size={18}/>,title:'가장 배우고 싶은 디지털 도구는?',subtitle:'리버스 멘토링 주제를 정합니다.',type:'multi'},
    {id:'generation',label:'세대 소통',icon:<Users size={18}/>,title:'세대 간 소통에서 가장 어려운 점은?',subtitle:'대나무숲 토크의 핵심 주제가 됩니다.',type:'multi'},
    {id:'stress',label:'업무 스트레스',icon:<Shield size={18}/>,title:'가장 스트레스를 주는 업무는?',subtitle:'업무 다이어트의 우선순위를 정합니다.',type:'multi'},
    {id:'admin',label:'행정 혁신',icon:<Star size={18}/>,title:'가장 혁신이 필요한 행정 영역은?',subtitle:'실무 혁신 TF의 방향을 설정합니다.',type:'multi'},
    {id:'vision',label:'가정연합 미래',icon:<BookOpen size={18}/>,title:'가정연합의 미래를 위해 가장 필요한 것은?',subtitle:'종단 발전의 핵심 참고자료가 됩니다.',type:'multi'},
    {id:'feedback',label:'워크숍 기대',icon:<Clock size={18}/>,title:'이번 워크숍에서 절대 하지 말았으면 하는 것은?',subtitle:'과거 워크숍의 실수를 반복하지 않겠습니다.',type:'multi'},
    {id:'free',label:'자유 의견',icon:<Heart size={18}/>,title:'마지막으로 하고 싶은 말씀이 있으시다면?',subtitle:'어떤 내용이든 괜찮습니다. 익명이 보장됩니다.',type:'text'},
  ];

  const options: Record<string,string[]> = {
    food:['한식 코스 (정갈한 사찰음식 스타일)','바비큐 파티 (야외 그릴)','일식 도시락 (개별 포장)','비건/채식 옵션 필수','뷔페 (다양한 선택)','지역 특산물 활용 메뉴'],
    snack:['프리미엄 커피 바리스타','과일 케이터링','전통 한과 및 떡','야식 (치킨/피자)','건강 간식 (견과류/그래놀라)','수제 베이커리'],
    needs:['개인용 멀티탭/충전기','필기구 세트 (펜/노트)','담요/쿠션 (냉방 대비)','상비약 (두통약/소화제)','개인 텀블러','명찰 (이름만, 직급 제외)'],
    room:['1인실 배정 희망','동기/세대별 룸메이트 매칭','조용한 환경 (늦잠 가능)','새벽 기도 참여 (기상 알림)','산책로 근처 배정','온돌방 선호'],
    lectures:['챗GPT/AI 실무 활용법','효율적 보고서 작성 기술','MZ세대 소통법 & 동기부여','스트레스 관리 및 명상','교회 재정 관리 실무','SNS/유튜브를 활용한 전도 전략','갈등 중재 및 조정 기술','참부모님 말씀 심화 학습'],
    topics:['불필요한 보고/결재 절차 폐지','회의 문화 혁신 (시간 단축)','유연 근무제/재택 근무 도입','부서 간/교구 간 장벽 허물기','악성 민원 대응 매뉴얼','신규 사무장 적응 지원 체계','업무 매뉴얼 표준화','디지털 문서 전환 (페이퍼리스)'],
    spiritual:['참부모님 말씀 묵상 시간','소그룹 기도회 (현장의 아픔 나눔)','새벽 기도 (자율 참가)','찬양 및 경배 시간','사무장 사명 선서식','개인 영적 성찰 및 일기 시간','성화식/정화 의식','감사 예배'],
    digital:['챗GPT / Claude AI 활용','노션(Notion) 업무 관리','캔바(Canva) 디자인 툴','구글 워크스페이스 협업','유튜브/릴스 영상 편집','카카오톡 채널 운영','교회 홈페이지 관리','데이터 분석 (엑셀/구글시트)'],
    generation:['업무 지시 방식의 차이','카카오톡/메신저 소통 예절','워라밸에 대한 인식 차이','회식/모임 문화의 변화','피드백 주고받는 방식','직급 호칭 vs 이름 호칭','보고 체계에 대한 기대치','변화에 대한 수용 속도'],
    stress:['과도한 보고서 작성','상급 기관의 잦은 지시 변경','인력 부족으로 인한 1인 다역','교인 민원 및 갈등 중재','행사 준비 및 동원 압박','재정 관리 및 예산 부족','목회자와의 역할 경계 모호','주말/공휴일 근무'],
    admin:['문서/결재 시스템 디지털화','교구 간 정보 공유 플랫폼','사무장 역량 평가 체계 개선','업무 매뉴얼 및 SOP 표준화','인사/배치 투명성 강화','교육/연수 체계 현대화','성과 보상 및 인센티브 제도','원격 근무 인프라 구축'],
    vision:['청년 교인 유입 전략','지역 사회 봉사 활동 확대','글로벌 네트워크 강화','디지털 전도 및 온라인 예배','교리 교육 현대화','사무장 처우 개선','교회 시설 현대화','차세대 리더 양성 프로그램'],
    feedback:['일방적 강의 (Top-Down 교육)','강제 등산/체력 단련','장기자랑/노래 강요','과도한 음주 동반 회식','개인 시간 없는 빡빡한 일정','직급별 서열 강조','형식적인 발표/보고','특정인 비난/지적 시간'],
  };

  const currentInfo = steps.find(s=>s.id===step);
  const stepIdx = steps.findIndex(s=>s.id===step);

  if(step==='finish') return (
    <motion.div initial={{opacity:0,scale:0.9}} animate={{opacity:1,scale:1}} className="toss-card border-none p-16 text-center max-w-2xl mx-auto shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
      <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8"><CheckCircle2 size={48}/></div>
      <h2 className="text-3xl font-black text-toss-gray-900 mb-4 tracking-tight">설문이 완료되었습니다!</h2>
      <p className="text-toss-gray-500 mb-6 font-medium leading-relaxed">보내주신 소중한 의견은 2026 사무장 워크숍 기획에<br/>최우선적으로 반영될 예정입니다.</p>
      <p className="text-toss-blue font-bold text-sm mb-12">✟ 참부모님의 뜻 안에서 더 나은 천일국을 함께 만들어 갑시다.</p>
      <button onClick={()=>{setStep('food');setAnswers({});setTextAnswers({});}} className="toss-button-primary w-full py-5 text-xl">처음으로 돌아가기</button>
    </motion.div>
  );

  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-20">
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <span className="px-4 py-1.5 bg-amber-50 text-amber-600 text-[10px] font-black tracking-[0.2em] uppercase rounded-full">✟ 2026 사무장 워크숍 사전 설문</span>
        </div>
        <h1 className="text-4xl font-black text-toss-gray-900 tracking-tight leading-tight">행복한 워크숍을 위한<br/>당신의 의견을 들려주세요.</h1>
      </div>

      {/* Progress */}
      <div className="space-y-4">
        <div className="flex justify-between text-xs font-bold text-toss-gray-400">
          <span>{currentInfo?.label} ({stepIdx+1}/{steps.length})</span>
          <span className="text-toss-blue">{Math.round(((stepIdx+1)/steps.length)*100)}%</span>
        </div>
        <div className="h-1.5 w-full bg-toss-gray-100 rounded-full overflow-hidden">
          <motion.div className="h-full bg-toss-blue" animate={{width:`${((stepIdx+1)/steps.length)*100}%`}}/>
        </div>
      </div>

      {/* Question Card */}
      <motion.div key={step} initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} className="toss-card border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-10">
        <div className="flex items-center gap-4 mb-10">
          <div className="w-14 h-14 bg-toss-blue-light rounded-2xl flex items-center justify-center text-toss-blue shrink-0">{currentInfo?.icon}</div>
          <div className="space-y-1">
            <h2 className="text-2xl font-black text-toss-gray-900 tracking-tight">{currentInfo?.title}</h2>
            <p className="text-sm text-toss-gray-400 font-medium">{currentInfo?.subtitle}</p>
          </div>
        </div>

        {currentInfo?.type==='text'?(
          <div className="mt-8">
            <textarea value={textAnswers[step]||''} onChange={e=>setTextAnswers({...textAnswers,[step]:e.target.value})} placeholder="자유롭게 작성해 주세요. 어떤 내용이든 환영합니다. 익명이 보장됩니다." className="w-full h-48 bg-toss-gray-50 border-none rounded-[24px] p-8 text-base font-medium focus:ring-2 ring-toss-blue/20 resize-none"/>
          </div>
        ):(
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
            {(options[step]||[]).map(opt=>(
              <button key={opt} onClick={()=>toggle(step,opt)} className={`p-6 rounded-[24px] text-left border-2 transition-all flex justify-between items-center group ${(answers[step]||[]).includes(opt)?'border-toss-blue bg-toss-blue-light text-toss-blue':'border-toss-gray-50 bg-toss-gray-50 text-toss-gray-500 hover:border-toss-blue/30'}`}>
                <span className="font-bold text-sm leading-snug">{opt}</span>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${(answers[step]||[]).includes(opt)?'bg-toss-blue border-toss-blue text-white':'border-toss-gray-200 bg-white'}`}>
                  {(answers[step]||[]).includes(opt) && <Check size={14}/>}
                </div>
              </button>
            ))}
          </div>
        )}

        <div className="mt-12 flex justify-between items-center gap-4">
          <button onClick={()=>stepIdx>0&&setStep(steps[stepIdx-1].id)} disabled={stepIdx===0} className={`flex-1 py-5 rounded-[24px] font-bold text-base flex items-center justify-center gap-2 transition-all ${stepIdx===0?'opacity-0':'text-toss-gray-400 hover:bg-toss-gray-50'}`}>
            <ChevronLeft size={20}/> 이전
          </button>
          <button onClick={()=>stepIdx<steps.length-1?setStep(steps[stepIdx+1].id):setStep('finish')} className="flex-[2] py-5 toss-button-primary text-xl shadow-none">
            {stepIdx===steps.length-1?'제출하기':'다음'}
          </button>
        </div>
      </motion.div>
    </div>
  );
};
