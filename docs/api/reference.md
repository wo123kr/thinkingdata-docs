---
sidebar_position: 1
---

# API 참조

ThinkingData REST API를 사용하여 데이터를 전송하고 조회할 수 있습니다.

## 🔐 인증

모든 API 요청에는 API 키가 필요합니다. API 키는 요청 헤더에 포함해야 합니다.

```http
Authorization: Bearer YOUR_API_KEY
```

## 📊 이벤트 전송 API

### 이벤트 전송

사용자 이벤트를 ThinkingData 플랫폼으로 전송합니다.

<div class="api-card">
  <span class="api-method post">POST</span>
  <code>/v1/events</code>
  
  #### 요청 본문
  
  ```json
  {
    "userId": "user123",
    "event": "page_view",
    "properties": {
      "page": "/home",
      "title": "홈페이지",
      "referrer": "https://google.com",
      "timestamp": 1640995200000
    }
  }
  ```
  
  #### 응답
  
  ```json
  {
    "status": "success",
    "message": "Event sent successfully",
    "eventId": "evt_123456789"
  }
  ```
</div>

### 배치 이벤트 전송

여러 이벤트를 한 번에 전송할 수 있습니다.

<div class="api-card">
  <span class="api-method post">POST</span>
  <code>/v1/events/batch</code>
  
  #### 요청 본문
  
  ```json
  {
    "events": [
      {
        "userId": "user123",
        "event": "page_view",
        "properties": {
          "page": "/home",
          "timestamp": 1640995200000
        }
      },
      {
        "userId": "user123",
        "event": "button_click",
        "properties": {
          "button_id": "signup",
          "timestamp": 1640995260000
        }
      }
    ]
  }
  ```
  
  #### 응답
  
  ```json
  {
    "status": "success",
    "message": "Batch events sent successfully",
    "eventIds": ["evt_123456789", "evt_123456790"]
  }
  ```
</div>

## 👤 사용자 관리 API

### 사용자 식별

사용자 정보를 설정하거나 업데이트합니다.

<div class="api-card">
  <span class="api-method post">POST</span>
  <code>/v1/users/identify</code>
  
  #### 요청 본문
  
  ```json
  {
    "userId": "user123",
    "properties": {
      "name": "홍길동",
      "email": "hong@example.com",
      "plan": "premium",
      "signup_date": "2024-01-01"
    }
  }
  ```
  
  #### 응답
  
  ```json
  {
    "status": "success",
    "message": "User identified successfully"
  }
  ```
</div>

### 사용자 속성 설정

특정 사용자 속성을 설정합니다.

<div class="api-card">
  <span class="api-method post">POST</span>
  <code>/v1/users/set</code>
  
  #### 요청 본문
  
  ```json
  {
    "userId": "user123",
    "properties": {
      "last_login": "2024-01-15T10:30:00Z",
      "login_count": 25
    }
  }
  ```
</div>

### 사용자 속성 증가

숫자 속성을 증가시킵니다.

<div class="api-card">
  <span class="api-method post">POST</span>
  <code>/v1/users/increment</code>
  
  #### 요청 본문
  
  ```json
  {
    "userId": "user123",
    "properties": {
      "purchase_count": 1,
      "total_spent": 29.99
    }
  }
  ```
</div>

## 📈 데이터 조회 API

### 이벤트 조회

특정 조건에 맞는 이벤트를 조회합니다.

<div class="api-card">
  <span class="api-method get">GET</span>
  <code>/v1/events?userId=user123&event=page_view&startDate=2024-01-01&endDate=2024-01-31</code>
  
  #### 쿼리 파라미터
  
  | 파라미터 | 타입 | 필수 | 설명 |
  |---------|------|------|------|
  | userId | string | 아니오 | 사용자 ID로 필터링 |
  | event | string | 아니오 | 이벤트 이름으로 필터링 |
  | startDate | string | 아니오 | 시작 날짜 (YYYY-MM-DD) |
  | endDate | string | 아니오 | 종료 날짜 (YYYY-MM-DD) |
  | limit | number | 아니오 | 결과 개수 제한 (기본값: 100) |
  | offset | number | 아니오 | 결과 오프셋 (기본값: 0) |
  
  #### 응답
  
  ```json
  {
    "status": "success",
    "data": [
      {
        "eventId": "evt_123456789",
        "userId": "user123",
        "event": "page_view",
        "properties": {
          "page": "/home",
          "title": "홈페이지"
        },
        "timestamp": "2024-01-15T10:30:00Z"
      }
    ],
    "total": 1,
    "limit": 100,
    "offset": 0
  }
  ```
</div>

### 사용자 속성 조회

특정 사용자의 속성을 조회합니다.

<div class="api-card">
  <span class="api-method get">GET</span>
  <code>/v1/users/user123</code>
  
  #### 응답
  
  ```json
  {
    "status": "success",
    "data": {
      "userId": "user123",
      "properties": {
        "name": "홍길동",
        "email": "hong@example.com",
        "plan": "premium",
        "signup_date": "2024-01-01",
        "last_login": "2024-01-15T10:30:00Z",
        "login_count": 25
      },
      "createdAt": "2024-01-01T00:00:00Z",
      "updatedAt": "2024-01-15T10:30:00Z"
    }
  }
  ```
</div>

## 📊 분석 API

### 이벤트 집계

이벤트 데이터를 집계하여 통계를 제공합니다.

<div class="api-card">
  <span class="api-method post">POST</span>
  <code>/v1/analytics/events/aggregate</code>
  
  #### 요청 본문
  
  ```json
  {
    "event": "page_view",
    "groupBy": ["page"],
    "startDate": "2024-01-01",
    "endDate": "2024-01-31",
    "timeUnit": "day"
  }
  ```
  
  #### 응답
  
  ```json
  {
    "status": "success",
    "data": [
      {
        "date": "2024-01-15",
        "page": "/home",
        "count": 1250
      },
      {
        "date": "2024-01-15",
        "page": "/products",
        "count": 890
      }
    ]
  }
  ```
</div>

### 사용자 집계

사용자 데이터를 집계하여 통계를 제공합니다.

<div class="api-card">
  <span class="api-method post">POST</span>
  <code>/v1/analytics/users/aggregate</code>
  
  #### 요청 본문
  
  ```json
  {
    "groupBy": ["plan"],
    "startDate": "2024-01-01",
    "endDate": "2024-01-31",
    "metrics": ["count", "avg_login_count"]
  }
  ```
  
  #### 응답
  
  ```json
  {
    "status": "success",
    "data": [
      {
        "plan": "free",
        "count": 1500,
        "avg_login_count": 5.2
      },
      {
        "plan": "premium",
        "count": 300,
        "avg_login_count": 15.8
      }
    ]
  }
  ```
</div>

## ⚠️ 오류 코드

| 코드 | 설명 | 해결 방법 |
|------|------|----------|
| 400 | 잘못된 요청 | 요청 본문과 파라미터를 확인하세요 |
| 401 | 인증 실패 | API 키가 올바른지 확인하세요 |
| 403 | 권한 없음 | API 키의 권한을 확인하세요 |
| 404 | 리소스 없음 | 요청한 리소스가 존재하는지 확인하세요 |
| 429 | 요청 한도 초과 | 요청 빈도를 줄이거나 한도를 늘리세요 |
| 500 | 서버 오류 | 잠시 후 다시 시도하거나 지원팀에 문의하세요 |

## 📝 요청 제한

- **초당 요청 수**: 1000개
- **분당 요청 수**: 60000개
- **배치 크기**: 최대 1000개 이벤트
- **요청 본문 크기**: 최대 10MB

## 🔗 SDK 사용

REST API 대신 SDK를 사용하면 더 쉽게 데이터를 전송할 수 있습니다.

```javascript
import { ThinkingData } from '@thinkingdata/sdk';

const td = new ThinkingData({
  projectId: 'your-project-id',
  apiKey: 'your-api-key'
});

// 이벤트 전송
td.track('page_view', {
  userId: 'user123',
  properties: {
    page: '/home',
    title: '홈페이지'
  }
});
```

더 자세한 SDK 문서는 [SDK 가이드](./sdk.md)를 참조하세요. 