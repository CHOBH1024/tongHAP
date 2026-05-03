import { Wrench, Plug, Search, Bot } from 'lucide-react';
import { CharacterStubPage } from '../../components/CharacterStubPage';

export function DoraemonApp() {
  return (
    <CharacterStubPage
      characterId="doraemon"
      features={[
        { icon: <Wrench size={18} />, title: '도구 모음', desc: '업무에 필요한 스마트 도구들' },
        { icon: <Plug size={18} />, title: '자원 연결', desc: '외부 서비스 통합 허브' },
        { icon: <Search size={18} />, title: '스마트 검색', desc: '문서·인물·자료 통합 검색' },
        { icon: <Bot size={18} />, title: 'AI 어시스턴트', desc: '업무 자동화 AI 도우미' },
      ]}
    />
  );
}
