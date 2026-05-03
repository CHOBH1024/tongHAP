import { BookOpen, MessageCircle, Library, HelpCircle } from 'lucide-react';
import { CharacterStubPage } from '../../components/CharacterStubPage';

export function JiseongApp() {
  return (
    <CharacterStubPage
      characterId="jiseong"
      features={[
        { icon: <BookOpen size={18} />, title: '교리 학습', desc: '원리강론 구조화 학습 시스템' },
        { icon: <MessageCircle size={18} />, title: 'Q&A 게시판', desc: '신앙 질문과 심화 답변' },
        { icon: <Library size={18} />, title: '문서 도서관', desc: '말씀 자료 검색 및 열람' },
        { icon: <HelpCircle size={18} />, title: '퀴즈 시스템', desc: '지식 점검 퀴즈 & 랭킹' },
      ]}
    />
  );
}
