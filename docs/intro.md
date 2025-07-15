---
sidebar_position: 1
---

# ThinkingData 문서에 오신 것을 환영합니다

ThinkingData는 AI 기반 데이터 분석 플랫폼으로, 복잡한 데이터를 간단하고 직관적으로 분석할 수 있도록 도와줍니다.

## 🚀 주요 기능

- **실시간 데이터 분석**: 대용량 데이터를 실시간으로 처리하고 분석
- **AI 기반 인사이트**: 머신러닝을 활용한 자동 패턴 발견
- **직관적인 시각화**: 복잡한 데이터를 이해하기 쉬운 차트로 표현
- **API 우선 설계**: 모든 기능을 프로그래밍 방식으로 접근 가능

## 📚 문서 구성

이 문서는 다음과 같이 구성되어 있습니다:

### 시작하기
- [시작하기](./getting-started.md) - ThinkingData 플랫폼 사용을 위한 첫 단계
- [설치 가이드](./guides/installation.md) - SDK 및 도구 설치 방법
- [설정 가이드](./guides/configuration.md) - 플랫폼 설정 및 구성

### API 참조
- [API 참조](./api/reference.md) - REST API 엔드포인트 문서
- [SDK 문서](./api/sdk.md) - 다양한 프로그래밍 언어 SDK

### 고급 가이드
- [데이터 모델링](./guides/data-modeling.md) - 효율적인 데이터 구조 설계
- [성능 최적화](./guides/performance.md) - 대용량 데이터 처리 최적화
- [보안 가이드](./guides/security.md) - 데이터 보안 및 접근 제어

## 🎯 빠른 시작

```bash
# SDK 설치
npm install @thinkingdata/sdk

# 기본 설정
import { ThinkingData } from '@thinkingdata/sdk';

const td = new ThinkingData({
  projectId: 'your-project-id',
  apiKey: 'your-api-key'
});

// 데이터 전송
td.track('user_action', {
  userId: 'user123',
  action: 'page_view',
  properties: {
    page: '/home',
    timestamp: Date.now()
  }
});
```

## 💡 예시 프로젝트

실제 사용 사례를 확인하려면 [예시 프로젝트](https://github.com/thinkingdata/examples)를 참조하세요.

## 🤝 지원

- **문서**: 이 사이트의 가이드와 API 참조를 확인하세요
- **GitHub**: [Issues](https://github.com/thinkingdata/thinkingdata-docs/issues)에서 버그 리포트 및 기능 요청
- **커뮤니티**: [Discord](https://discord.gg/thinkingdata)에서 다른 개발자들과 소통

---

**다음 단계**: [시작하기](./getting-started.md) 가이드를 통해 ThinkingData 플랫폼을 시작해보세요! 
