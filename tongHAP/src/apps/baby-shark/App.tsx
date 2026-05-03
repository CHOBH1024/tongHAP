import { Users, UserPlus, BookMarked, Activity } from 'lucide-react';
import { CharacterStubPage } from '../../components/CharacterStubPage';

export function BabySharkApp() {
  return (
    <CharacterStubPage
      characterId="baby-shark"
      features={[
        { icon: <Users size={18} />, title: '청소년 모임', desc: '청소년부 활동 관리' },
        { icon: <UserPlus size={18} />, title: '새신자 온보딩', desc: '환영 & 신앙 입문 가이드' },
        { icon: <BookMarked size={18} />, title: '커리큘럼', desc: '단계별 신앙 교육 과정' },
        { icon: <Activity size={18} />, title: '활동 기록', desc: '행사·캠프·수련회 기록' },
      ]}
    />
  );
}
