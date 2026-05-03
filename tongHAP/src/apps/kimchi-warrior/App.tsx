import { Map, Target, Flag, Users } from 'lucide-react';
import { CharacterStubPage } from '../../components/CharacterStubPage';

export function KimchiWarriorApp() {
  return (
    <CharacterStubPage
      characterId="kimchi-warrior"
      features={[
        { icon: <Flag size={18} />, title: '전도 계획', desc: '주간·월간 전도 목표 수립' },
        { icon: <Target size={18} />, title: '사명 트래커', desc: '개인 사명 달성 기록' },
        { icon: <Map size={18} />, title: '전략 지도', desc: '지역별 전도 현황 지도' },
        { icon: <Users size={18} />, title: '팀 전도 기록', desc: '팀원 활동 공유 및 응원' },
      ]}
    />
  );
}
