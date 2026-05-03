import { Crown, Users, Calendar, FileText } from 'lucide-react';
import { CharacterStubPage } from '../../components/CharacterStubPage';

export function WooseongApp() {
  return (
    <CharacterStubPage
      characterId="wooseong"
      features={[
        { icon: <Crown size={18} />, title: '리더십 대시보드', desc: '팀 현황 및 목표 한눈에 보기' },
        { icon: <Users size={18} />, title: '팀 관리', desc: '구성원 역할 및 권한 설정' },
        { icon: <Calendar size={18} />, title: '일정 조율', desc: '회의·행사 일정 통합 관리' },
        { icon: <FileText size={18} />, title: '행정 보고서', desc: '보고서 작성 및 공유' },
      ]}
    />
  );
}
