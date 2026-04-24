# writeNow-at.github.io

writeNow 블로그 스터디의 공식 사이트 저장소입니다. VitePress 기반으로 운영되며, 스터디 소개 페이지와 규칙 문서, 작성자별 아카이브 게시글을 함께 관리합니다.

## 1. 개발 환경

- Node.js LTS 권장
- npm 사용

## 2. 시작 방법

### 의존성 설치

```bash
npm install
```

### 로컬 개발 서버 실행

```bash
npm run docs:dev
```

- 기본적으로 VitePress 개발 서버가 실행됩니다.
- 브라우저에서 표시되는 로컬 주소로 접속해 문서를 확인할 수 있습니다.

### 프로덕션 빌드

```bash
npm run docs:build
```

- 정적 사이트 결과물을 생성합니다.

### 빌드 결과 미리보기

```bash
npm run docs:preview
```

- 빌드된 결과물을 로컬에서 확인할 때 사용합니다.

## 3. 프로젝트 구조

```text
.
├── .vitepress/         # VitePress 설정, 네비게이션, 사이드바, 커스텀 테마 컴포넌트
├── pages/              # 정적 문서 페이지
│   ├── index.md        # 메인 홈
│   ├── blogs/          # 블로그/큐레이션 관련 안내 페이지
│   └── rules/          # 스터디 규칙 및 가이드 문서
├── posts/              # 작성자별 게시글 아카이브
│   ├── index.md        # 전체 게시글 모아보기
│   ├── author.md       # 작성자 목록 페이지
│   ├── tags.md         # 태그 페이지
│   ├── Ebee/           # 작성자별 게시글 폴더
│   ├── coswhale/
│   └── draft/          # 초안 보관용, 프로덕션 빌드에서 제외
├── public/             # 정적 리소스(로고, 파비콘, 이미지)
├── package.json        # 실행 스크립트 및 의존성 정의
└── README.md           # 저장소 안내 문서
```

## 4. 디렉터리 설명

### .vitepress

- [.vitepress/config/index.mjs](.vitepress/config/index.mjs)에서 사이트 제목, 네비게이션, 사이드바, sitemap, edit link 등을 설정합니다.
- [.vitepress/theme](.vitepress/theme)에는 최근 글, 태그, 작성자, 댓글 등 커스텀 컴포넌트가 들어 있습니다.
- `rewrites` 설정으로 `pages/` 아래 문서들은 실제 라우트에서 상위 경로 없이 노출됩니다.

### pages

- 소개, 규칙, 큐레이션 등 고정 페이지를 관리합니다.
- 예를 들어 [pages/index.md](pages/index.md)는 홈 화면, [pages/rules/blog-guide.md](pages/rules/blog-guide.md)는 블로그 작성 규정을 담고 있습니다.

### posts

- 실제 스터디 아카이브 글이 쌓이는 위치입니다.
- 작성자명 기준으로 폴더를 나누고, 각 주차별 Markdown 파일을 저장합니다.
- [posts/index.md](posts/index.md)에서는 전체 게시글 목록을 보여줍니다.
- `draft` 폴더는 초안 정리용이며, 현재 설정상 프로덕션 환경에서 제외됩니다.

### public

- 로고, 파비콘, 대표 이미지처럼 빌드 시 그대로 제공되어야 하는 파일을 둡니다.

## 5. 게시글 작성 방식

- 게시글은 `posts/{작성자명}/` 아래에 Markdown 파일로 추가합니다.
- 파일 상단 frontmatter에는 제목, 날짜, 작성자, 원문 링크, 태그 등을 작성합니다.
- 예시는 [posts/Ebee/2026-c4-week2.md](posts/Ebee/2026-c4-week2.md)에서 확인할 수 있습니다.
- 작성 규정은 [pages/rules/blog-guide.md](pages/rules/blog-guide.md)를 참고하면 됩니다.

## 6. 참고 사항

- README는 VitePress 설정에서 문서 소스에서 제외됩니다.
- 프로덕션 빌드에서는 `posts/draft/` 아래 파일이 제외되도록 설정되어 있습니다.
- 사이트 타이틀, 네비게이션, 사이드바 변경이 필요하면 [.vitepress/config](.vitepress/config) 아래 파일을 함께 수정해야 합니다.

