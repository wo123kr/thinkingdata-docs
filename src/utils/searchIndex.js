// 자동 생성 파일. 직접 수정하지 마세요.
export const docsIndex = [
  {
    "title": "API 참조",
    "path": "/thinkingdata-docs/docs/api/reference",
    "content": "ThinkingData REST API를 사용하여 데이터를 전송하고 조회할 수 있습니다. ## 🔐 인증 모든 API 요청에는 API 키가 필요합니다. API 키는 요청 헤더에 포함해야 합니다. ```http Authorization: Bearer YOUR_API_KEY ``` ## 📊 이벤트 전송 API ### 이벤트 전송 사용자 이벤트를 T"
  },
  {
    "title": "SDK 가이드",
    "path": "/thinkingdata-docs/docs/api/sdk",
    "content": "ThinkingData SDK를 사용하여 다양한 프로그래밍 언어에서 데이터를 전송하는 방법을 안내합니다. ## 📦 지원 언어 - **JavaScript/TypeScript**: Node.js, 브라우저, React Native - **Python**: 3.7 이상 - **Java**: 8 이상 - **Rust**: 1.56 이상 - **Go**: 1."
  },
  {
    "title": "시작하기",
    "path": "/thinkingdata-docs/docs/getting-started",
    "content": "ThinkingData 플랫폼을 사용하기 위한 기본 설정과 첫 번째 데이터 전송을 진행해보겠습니다. ## 📋 사전 요구사항 - Node.js 16.0 이상 - npm 또는 yarn 패키지 매니저 - ThinkingData 계정 (무료로 생성 가능) ## 🔧 1단계: 계정 생성 1. [ThinkingData 웹사이트](https://thinking"
  },
  {
    "title": "설정 가이드",
    "path": "/thinkingdata-docs/docs/guides/configuration",
    "content": "ThinkingData SDK의 고급 설정 옵션과 최적화 방법을 안내합니다. ## ⚙️ 기본 설정 ### 필수 설정 모든 SDK에서 공통으로 사용되는 기본 설정입니다. ```javascript const td = new ThinkingData({   projectId: 'your-project-id',    // 프로젝트 ID (필수)   apiKe"
  },
  {
    "title": "데이터 모델링",
    "path": "/thinkingdata-docs/docs/guides/data-modeling",
    "content": "ThinkingData 플랫폼에서 효율적인 데이터 구조를 설계하는 방법을 안내합니다. ## 🏗️ 데이터 모델링 원칙 ### 1. 이벤트 중심 설계 ThinkingData는 이벤트 중심의 데이터 모델을 사용합니다. ```javascript // 좋은 예: 명확한 이벤트 구조 td.track('user_signup', {   userId: 'user1"
  },
  {
    "title": "설치 가이드",
    "path": "/thinkingdata-docs/docs/guides/installation",
    "content": "ThinkingData SDK를 다양한 환경에 설치하는 방법을 안내합니다. ## 📦 Node.js ### npm 사용 ```bash npm install @thinkingdata/sdk ``` ### yarn 사용 ```bash yarn add @thinkingdata/sdk ``` ### pnpm 사용 ```bash pnpm add @thi"
  },
  {
    "title": "성능 최적화",
    "path": "/thinkingdata-docs/docs/guides/performance",
    "content": "ThinkingData 플랫폼에서 대용량 데이터를 효율적으로 처리하고 성능을 최적화하는 방법을 안내합니다. ## 🚀 기본 성능 최적화 ### 1. 배치 처리 활용 대량의 이벤트를 개별적으로 전송하는 대신 배치로 처리합니다. ```javascript // 비효율적: 개별 전송 for (const event of events) {   td.track("
  },
  {
    "title": "보안 가이드",
    "path": "/thinkingdata-docs/docs/guides/security",
    "content": "ThinkingData 플랫폼에서 데이터 보안과 접근 제어를 위한 모범 사례를 안내합니다. ## 🔐 기본 보안 원칙 ### 1. 최소 권한 원칙 필요한 최소한의 권한만 부여하여 보안 위험을 최소화합니다. ```javascript // 좋은 예: 필요한 권한만 요청 const td = new ThinkingData({   projectId: 'you"
  },
  {
    "title": "ThinkingData 문서에 오신 것을 환영합니다",
    "path": "/thinkingdata-docs/docs/intro",
    "content": "ThinkingData는 AI 기반 데이터 분석 플랫폼으로, 복잡한 데이터를 간단하고 직관적으로 분석할 수 있도록 도와줍니다. ## 🚀 주요 기능 - **실시간 데이터 분석**: 대용량 데이터를 실시간으로 처리하고 분석 - **AI 기반 인사이트**: 머신러닝을 활용한 자동 패턴 발견 - **직관적인 시각화**: 복잡한 데이터를 이해하기 쉬운 차트로 "
  }
];
