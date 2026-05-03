import { Dumbbell, TrendingUp, Heart, Star } from 'lucide-react';
import { CharacterStubPage } from '../../components/CharacterStubPage';

export function RexApp() {
  return (
    <CharacterStubPage
      characterId="rex"
      features={[
        { icon: <Dumbbell size={18} />, title: '훈련 프로그램', desc: '단계별 역량 강화 코스' },
        { icon: <TrendingUp size={18} />, title: '성장 기록', desc: '영적·직무 성장 지표 시각화' },
        { icon: <Heart size={18} />, title: '멘토링 매칭', desc: '선후배 멘토·멘티 연결' },
        { icon: <Star size={18} />, title: '역량 테스트', desc: '정기 역량 자기 진단' },
      ]}
    />
  );
}
