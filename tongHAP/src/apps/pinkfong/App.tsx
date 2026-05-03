import { Music, Paintbrush, Gamepad2, Baby } from 'lucide-react';
import { CharacterStubPage } from '../../components/CharacterStubPage';

export function PinkfongApp() {
  return (
    <CharacterStubPage
      characterId="pinkfong"
      features={[
        { icon: <Music size={18} />, title: '어린이 교육', desc: '찬양·율동 교육 자료' },
        { icon: <Paintbrush size={18} />, title: '콘텐츠 제작', desc: '어린이 주일학교 자료 제작' },
        { icon: <Gamepad2 size={18} />, title: '게임화 학습', desc: '포인트 & 배지 학습 시스템' },
        { icon: <Baby size={18} />, title: '부모 연동', desc: '가정 학습 연계 & 공지' },
      ]}
    />
  );
}
