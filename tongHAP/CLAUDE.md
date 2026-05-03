# 가정연합 통합 사이트 — tongHAP 하네스

## 개요
tongHAP은 세계평화통일가정연합의 통합 사역 플랫폼입니다.  
8개의 캐릭터 구역과 기존 3개 앱을 하나의 포털로 연결합니다.

## 아키텍처

```
tongHAP/src/
├── characters.ts           # 캐릭터 레지스트리 (단일 진실의 원천)
├── routes/
│   ├── __root.tsx          # 루트 레이아웃
│   ├── index.tsx           # 홈페이지 (캐릭터 그리드 + 플랫폼 허브)
│   ├── wooseong.tsx        # 우성 - 리더십 & 행정
│   ├── jiseong.tsx         # 지성 - 교리 & 지식
│   ├── doraemon.tsx        # 도라에몽 - 도구 & 자원
│   ├── kimchi-warrior.tsx  # 김치워리어 - 전도 & 사명
│   ├── rex.tsx             # 렉스 - 훈련 & 성장
│   ├── pinkfong.tsx        # 핑크퐁 - 어린이 & 교육
│   ├── baby-shark.tsx      # 아기상어 - 청소년 & 새신자
│   ├── jjangu.tsx          # 짱구 - 커뮤니티 & 문화
│   ├── gajeong.tsx         # GAJEONG 사역 허브 (기존)
│   ├── mim25.tsx           # MIM25 유형진단 (기존)
│   └── mirror-insight.tsx  # Mirror Insight (기존)
└── apps/
    ├── wooseong/           # 우성 앱
    ├── jiseong/            # 지성 앱
    ├── doraemon/           # 도라에몽 앱
    ├── kimchi-warrior/     # 김치워리어 앱
    ├── rex/                # 렉스 앱
    ├── pinkfong/           # 핑크퐁 앱
    ├── baby-shark/         # 아기상어 앱
    ├── jjangu/             # 짱구 앱
    ├── gajeong/            # GAJEONG 앱 (기존)
    ├── mim25/              # MIM25 앱 (기존)
    ├── mim35/              # MIM35 앱 (기존)
    └── mirror-insight/     # Mirror Insight 앱 (기존)
```

## 새 캐릭터 추가 방법

1. `src/characters.ts`에 `Character` 항목 추가
2. `src/routes/[id].tsx` 라우트 파일 생성 (gajeong.tsx 패턴 복사)
3. `src/apps/[id]/App.tsx` 컴포넌트 작성
4. `src/routeTree.gen.ts` 업데이트 (빌드 시 자동 생성 가능)

## 캐릭터 목록

| 캐릭터 | 라우트 | 역할 | 상태 |
|--------|--------|------|----- |
| 🦁 우성 | /wooseong | 리더십 & 행정 | 스텁 |
| 📚 지성 | /jiseong | 교리 & 지식 | 스텁 |
| 🤖 도라에몽 | /doraemon | 도구 & 자원 | 스텁 |
| 🥋 김치워리어 | /kimchi-warrior | 전도 & 사명 | 스텁 |
| 🦖 렉스 | /rex | 훈련 & 성장 | 스텁 |
| 🦊 핑크퐁 | /pinkfong | 어린이 & 교육 | 스텁 |
| 🦈 아기상어 | /baby-shark | 청소년 & 새신자 | 스텁 |
| 😄 짱구 | /jjangu | 커뮤니티 & 문화 | 스텁 |

## 기존 플랫폼

| 앱 | 라우트 | 설명 |
|----|--------|------|
| GAJEONG | /gajeong | 사역 허브 — 행정·규정·교리·워크숍 |
| MIM25 | /mim25 | 목회공직자 유형진단 (에니어그램 기반) |
| Mirror Insight | /mirror-insight | 심층 자아 성찰 및 역량 관리 |

## 통합 개발 플랜

### Phase 1 — 하네스 ✅ (현재)
- [x] 8개 캐릭터 라우트 스텁
- [x] 홈페이지 캐릭터 그리드
- [x] characters.ts 레지스트리

### Phase 2 — 콘텐츠 정의
- [ ] 각 캐릭터 역할 상세 기획
- [ ] 캐릭터별 UI 테마 확정
- [ ] 공유 데이터 구조 설계

### Phase 3 — 핵심 기능 구현
- [ ] 우성: 리더십 대시보드 & 팀 관리
- [ ] 지성: 교리 학습 & Q&A 시스템
- [ ] 도라에몽: 도구 모음 & 자원 허브
- [ ] 김치워리어: 전도 계획 & 사명 트래커
- [ ] 렉스: 훈련 프로그램 & 성장 기록
- [ ] 핑크퐁: 어린이 콘텐츠 & 교육 게임
- [ ] 아기상어: 새신자 온보딩 & 청소년 모임
- [ ] 짱구: 커뮤니티 피드 & 문화 행사

### Phase 4 — 통합
- [ ] 캐릭터 간 공통 인증
- [ ] 통합 알림 센터
- [ ] 크로스-캐릭터 데이터 연동
- [ ] 모바일 최적화

## 개발 명령어

```bash
cd tongHAP
npm install
npm run dev     # 개발 서버 (http://localhost:5173)
npm run build   # 프로덕션 빌드
npm run deploy  # GitHub Pages 배포
```

## 기술 스택
- React 19 + TypeScript
- Vite 8 + TanStack Router (파일 기반 라우팅)
- Tailwind CSS 4
- Framer Motion + Lucide React + Radix UI
