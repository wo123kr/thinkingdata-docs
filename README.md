# ThinkingData Docs

ThinkingData 플랫폼의 공식 문서 사이트입니다. GitBook 스타일의 현대적이고 직관적인 문서를 제공합니다.

## 🚀 주요 기능

- **GitBook 스타일 UI**: 깔끔하고 현대적인 문서 인터페이스
- **다크/라이트 모드**: 사용자 선호도에 따른 테마 전환
- **실시간 검색**: 빠르고 정확한 문서 검색
- **반응형 디자인**: 모바일, 태블릿, 데스크톱 지원
- **코드 하이라이팅**: 다양한 프로그래밍 언어 지원
- **자동 배포**: GitHub Pages 자동 배포

## 📚 문서 구성

- **시작하기**: 플랫폼 사용을 위한 첫 단계
- **API 참조**: REST API 엔드포인트 문서
- **설치 가이드**: 다양한 환경별 SDK 설치 방법
- **설정 가이드**: 고급 설정 및 최적화 옵션

## 🛠️ 기술 스택

- **Docusaurus 3.1.1**: 정적 사이트 생성기
- **React 18**: 사용자 인터페이스
- **TypeScript**: 타입 안전성
- **GitHub Pages**: 호스팅 및 배포

## 🚀 로컬 개발

### 사전 요구사항

- Node.js 18.0 이상
- npm 또는 yarn

### 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 시작
npm start

# 프로덕션 빌드
npm run build

# 빌드된 사이트 서빙
npm run serve
```

## 📝 문서 작성

새로운 문서를 추가하려면 `docs/` 디렉토리에 마크다운 파일을 생성하세요.

### 문서 구조

```
docs/
├── intro.md              # 메인 소개 페이지
├── getting-started.md    # 시작하기 가이드
├── api/
│   └── reference.md      # API 참조
└── guides/
    ├── installation.md   # 설치 가이드
    └── configuration.md  # 설정 가이드
```

### 사이드바 구성

`sidebars.js` 파일에서 문서 목차를 구성할 수 있습니다.

## 🎨 커스터마이징

### 테마 수정

`src/css/custom.css` 파일에서 GitBook 스타일 테마를 수정할 수 있습니다.

### 설정 변경

`docusaurus.config.js` 파일에서 사이트 설정을 변경할 수 있습니다.

## 🌐 배포

이 사이트는 GitHub Pages를 통해 자동으로 배포됩니다.

### 배포 프로세스

1. `main` 브랜치에 코드 푸시
2. GitHub Actions가 자동으로 빌드 실행
3. 빌드된 사이트가 GitHub Pages에 배포

### 배포 URL

- **프로덕션**: https://thinkingdata.github.io/thinkingdata-docs/
- **개발**: https://thinkingdata.github.io/thinkingdata-docs/dev/

## 🤝 기여하기

1. 이 저장소를 포크합니다
2. 새로운 브랜치를 생성합니다 (`git checkout -b feature/amazing-feature`)
3. 변경사항을 커밋합니다 (`git commit -m 'Add amazing feature'`)
4. 브랜치에 푸시합니다 (`git push origin feature/amazing-feature`)
5. Pull Request를 생성합니다

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.

## 🆘 지원

- **문서**: 이 사이트의 가이드와 API 참조를 확인하세요
- **GitHub**: [Issues](https://github.com/thinkingdata/thinkingdata-docs/issues)에서 버그 리포트 및 기능 요청
- **커뮤니티**: [Discord](https://discord.gg/thinkingdata)에서 다른 개발자들과 소통

## 📊 사이트 통계

- **문서 수**: 5개
- **언어 지원**: 한국어, 영어
- **테마**: 다크/라이트 모드
- **배포**: GitHub Pages 자동 배포

---

**ThinkingData Docs** - AI 기반 데이터 분석 플랫폼의 공식 문서 