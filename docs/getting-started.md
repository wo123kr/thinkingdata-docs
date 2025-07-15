---
sidebar_position: 2
---

# 시작하기

ThinkingData 플랫폼을 사용하기 위한 기본 설정과 첫 번째 데이터 전송을 진행해보겠습니다.

## 📋 사전 요구사항

- Node.js 16.0 이상
- npm 또는 yarn 패키지 매니저
- ThinkingData 계정 (무료로 생성 가능)

## 🔧 1단계: 계정 생성

1. [ThinkingData 웹사이트](https://thinkingdata.io)에 접속
2. "무료로 시작하기" 버튼 클릭
3. 이메일과 비밀번호로 계정 생성
4. 이메일 인증 완료

## 🚀 2단계: 프로젝트 생성

계정 생성 후 첫 번째 프로젝트를 만들어보겠습니다.

1. 대시보드에서 "새 프로젝트" 클릭
2. 프로젝트 이름 입력 (예: "My First Project")
3. 프로젝트 타입 선택 (웹, 모바일, 서버 등)
4. "프로젝트 생성" 클릭

## 🔑 3단계: API 키 발급

프로젝트가 생성되면 API 키를 발급받을 수 있습니다.

1. 프로젝트 설정 → API 키 메뉴로 이동
2. "새 API 키 생성" 클릭
3. 키 이름 입력 (예: "Production Key")
4. 권한 설정 (읽기/쓰기 권한 선택)
5. API 키 복사 및 안전한 곳에 보관

> ⚠️ **주의**: API 키는 민감한 정보입니다. 절대 공개 저장소에 커밋하지 마세요.

## 📦 4단계: SDK 설치

프로젝트에 ThinkingData SDK를 설치합니다.

```bash
# npm 사용
npm install @thinkingdata/sdk

# yarn 사용
yarn add @thinkingdata/sdk
```

## ⚙️ 5단계: 기본 설정

SDK를 초기화하고 기본 설정을 완료합니다.

```javascript
import { ThinkingData } from '@thinkingdata/sdk';

// SDK 초기화
const td = new ThinkingData({
  projectId: 'your-project-id',  // 프로젝트 ID
  apiKey: 'your-api-key',        // API 키
  serverUrl: 'https://api.thinkingdata.io'  // API 서버 URL
});

// 기본 사용자 정보 설정
td.identify('user123', {
  name: '홍길동',
  email: 'hong@example.com',
  plan: 'premium'
});
```

## 📊 6단계: 첫 번째 이벤트 전송

이제 첫 번째 데이터 이벤트를 전송해보겠습니다.

```javascript
// 페이지 뷰 이벤트 전송
td.track('page_view', {
  userId: 'user123',
  properties: {
    page: '/home',
    title: '홈페이지',
    referrer: 'https://google.com',
    timestamp: Date.now()
  }
});

// 사용자 액션 이벤트 전송
td.track('button_click', {
  userId: 'user123',
  properties: {
    button_id: 'signup_button',
    button_text: '회원가입',
    page: '/home',
    timestamp: Date.now()
  }
});
```

## 📈 7단계: 데이터 확인

전송한 데이터가 대시보드에 표시되는지 확인합니다.

1. ThinkingData 대시보드 접속
2. "실시간 데이터" 메뉴 클릭
3. 전송한 이벤트가 목록에 표시되는지 확인
4. "분석" 메뉴에서 기본 차트 확인

## 🎯 예시 프로젝트

완전한 예시 프로젝트를 확인하려면 다음 저장소를 참조하세요:

```bash
git clone https://github.com/thinkingdata/examples.git
cd examples/javascript
npm install
npm start
```

## 🔍 다음 단계

기본 설정이 완료되었습니다! 다음 가이드들을 통해 더 깊이 있는 기능을 학습해보세요:

- [API 참조](./api/reference.md) - 모든 API 엔드포인트 문서
- [설정 가이드](./guides/configuration.md) - 고급 설정 옵션
- [데이터 모델링](./guides/data-modeling.md) - 효율적인 데이터 구조 설계

## ❓ 문제 해결

### 일반적인 문제들

**Q: API 키가 인식되지 않아요**
A: API 키가 올바르게 복사되었는지 확인하고, 프로젝트 ID와 일치하는지 확인하세요.

**Q: 데이터가 대시보드에 표시되지 않아요**
A: 네트워크 연결을 확인하고, 이벤트 전송 후 몇 분 정도 기다려보세요.

**Q: SDK 초기화 오류가 발생해요**
A: Node.js 버전이 16.0 이상인지 확인하고, 모든 의존성이 올바르게 설치되었는지 확인하세요.

더 자세한 도움이 필요하시면 [커뮤니티](https://discord.gg/thinkingdata)에 문의해주세요! 