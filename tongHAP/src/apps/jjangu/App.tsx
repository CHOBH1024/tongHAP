import { MessageSquare, PartyPopper, Smile, Users } from 'lucide-react';
import { CharacterStubPage } from '../../components/CharacterStubPage';

export function JjanguApp() {
  return (
    <CharacterStubPage
      characterId="jjangu"
      features={[
        { icon: <MessageSquare size={18} />, title: '커뮤니티 피드', desc: '식구들 일상 & 나눔 공간' },
        { icon: <PartyPopper size={18} />, title: '문화 행사', desc: '교회 문화·축제 기획 지원' },
        { icon: <Smile size={18} />, title: '유머 코너', desc: '신앙 유머 & 따뜻한 이야기' },
        { icon: <Users size={18} />, title: '소그룹 관리', desc: '소모임 생성 및 활동 관리' },
      ]}
    />
  );
}
