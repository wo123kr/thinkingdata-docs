---
sidebar_position: 2
---

# SDK 가이드

ThinkingData SDK를 사용하여 다양한 프로그래밍 언어에서 데이터를 전송하는 방법을 안내합니다.

## 📦 지원 언어

- **JavaScript/TypeScript**: Node.js, 브라우저, React Native
- **Python**: 3.7 이상
- **Java**: 8 이상
- **Rust**: 1.56 이상
- **Go**: 1.18 이상

## 🚀 JavaScript/TypeScript

### 설치

```bash
npm install @thinkingdata/sdk
```

### 기본 사용법

```javascript
import { ThinkingData } from '@thinkingdata/sdk';

// SDK 초기화
const td = new ThinkingData({
  projectId: 'your-project-id',
  apiKey: 'your-api-key'
});

// 사용자 식별
td.identify('user123', {
  name: '홍길동',
  email: 'hong@example.com',
  plan: 'premium'
});

// 이벤트 전송
td.track('page_view', {
  userId: 'user123',
  properties: {
    page: '/home',
    title: '홈페이지',
    referrer: 'https://google.com'
  }
});
```

### 고급 기능

```javascript
// 배치 이벤트 전송
const events = [
  {
    event: 'page_view',
    userId: 'user123',
    properties: { page: '/home' }
  },
  {
    event: 'button_click',
    userId: 'user123',
    properties: { button_id: 'signup' }
  }
];

td.trackBatch(events);

// 사용자 속성 설정
td.setUserProperties('user123', {
  last_login: new Date(),
  login_count: 25
});

// 사용자 속성 증가
td.incrementUserProperties('user123', {
  purchase_count: 1,
  total_spent: 29.99
});
```

## 🐍 Python

### 설치

```bash
pip install thinkingdata-sdk
```

### 기본 사용법

```python
from thinkingdata_sdk import ThinkingData

# SDK 초기화
td = ThinkingData(
    project_id='your-project-id',
    api_key='your-api-key'
)

# 사용자 식별
td.identify('user123', {
    'name': '홍길동',
    'email': 'hong@example.com',
    'plan': 'premium'
})

# 이벤트 전송
td.track('page_view', {
    'user_id': 'user123',
    'properties': {
        'page': '/home',
        'title': '홈페이지',
        'referrer': 'https://google.com'
    }
})
```

### 고급 기능

```python
# 배치 이벤트 전송
events = [
    {
        'event': 'page_view',
        'user_id': 'user123',
        'properties': {'page': '/home'}
    },
    {
        'event': 'button_click',
        'user_id': 'user123',
        'properties': {'button_id': 'signup'}
    }
]

td.track_batch(events)

# 사용자 속성 설정
td.set_user_properties('user123', {
    'last_login': datetime.now(),
    'login_count': 25
})

# 사용자 속성 증가
td.increment_user_properties('user123', {
    'purchase_count': 1,
    'total_spent': 29.99
})
```

## ☕ Java

### Maven 의존성

```xml
<dependency>
    <groupId>io.thinkingdata</groupId>
    <artifactId>thinkingdata-sdk</artifactId>
    <version>1.0.0</version>
</dependency>
```

### 기본 사용법

```java
import io.thinkingdata.ThinkingData;
import java.util.HashMap;
import java.util.Map;

// SDK 초기화
ThinkingData td = new ThinkingData.Builder()
    .projectId("your-project-id")
    .apiKey("your-api-key")
    .build();

// 사용자 식별
Map<String, Object> userProperties = new HashMap<>();
userProperties.put("name", "홍길동");
userProperties.put("email", "hong@example.com");
userProperties.put("plan", "premium");

td.identify("user123", userProperties);

// 이벤트 전송
Map<String, Object> eventProperties = new HashMap<>();
eventProperties.put("page", "/home");
eventProperties.put("title", "홈페이지");
eventProperties.put("referrer", "https://google.com");

td.track("page_view", "user123", eventProperties);
```

### 고급 기능

```java
// 배치 이벤트 전송
List<Event> events = Arrays.asList(
    new Event("page_view", "user123", pageViewProperties),
    new Event("button_click", "user123", buttonClickProperties)
);

td.trackBatch(events);

// 사용자 속성 설정
Map<String, Object> properties = new HashMap<>();
properties.put("last_login", new Date());
properties.put("login_count", 25);

td.setUserProperties("user123", properties);

// 사용자 속성 증가
Map<String, Number> increments = new HashMap<>();
increments.put("purchase_count", 1);
increments.put("total_spent", 29.99);

td.incrementUserProperties("user123", increments);
```

## 🦀 Rust

### Cargo.toml

```toml
[dependencies]
thinkingdata-sdk = "1.0.0"
```

### 기본 사용법

```rust
use thinkingdata_sdk::ThinkingData;
use std::collections::HashMap;

// SDK 초기화
let td = ThinkingData::new()
    .project_id("your-project-id")
    .api_key("your-api-key")
    .build();

// 사용자 식별
let mut user_properties = HashMap::new();
user_properties.insert("name", "홍길동");
user_properties.insert("email", "hong@example.com");
user_properties.insert("plan", "premium");

td.identify("user123", user_properties);

// 이벤트 전송
let mut event_properties = HashMap::new();
event_properties.insert("page", "/home");
event_properties.insert("title", "홈페이지");
event_properties.insert("referrer", "https://google.com");

td.track("page_view", "user123", event_properties);
```

### 고급 기능

```rust
// 배치 이벤트 전송
let events = vec![
    Event::new("page_view", "user123", page_view_properties),
    Event::new("button_click", "user123", button_click_properties)
];

td.track_batch(events);

// 사용자 속성 설정
let mut properties = HashMap::new();
properties.insert("last_login", Utc::now());
properties.insert("login_count", 25);

td.set_user_properties("user123", properties);

// 사용자 속성 증가
let mut increments = HashMap::new();
increments.insert("purchase_count", 1);
increments.insert("total_spent", 29.99);

td.increment_user_properties("user123", increments);
```

## 🐹 Go

### 설치

```bash
go get github.com/thinkingdata/thinkingdata-sdk-go
```

### 기본 사용법

```go
import "github.com/thinkingdata/thinkingdata-sdk-go"

// SDK 초기화
td := thinkingdata.NewThinkingData(
    "your-project-id",
    "your-api-key",
    "https://api.thinkingdata.io",
)

// 사용자 식별
userProperties := map[string]interface{}{
    "name":  "홍길동",
    "email": "hong@example.com",
    "plan":  "premium",
}

td.Identify("user123", userProperties)

// 이벤트 전송
eventProperties := map[string]interface{}{
    "page":     "/home",
    "title":    "홈페이지",
    "referrer": "https://google.com",
}

td.Track("page_view", "user123", eventProperties)
```

### 고급 기능

```go
// 배치 이벤트 전송
events := []thinkingdata.Event{
    {
        Event:      "page_view",
        UserId:     "user123",
        Properties: pageViewProperties,
    },
    {
        Event:      "button_click",
        UserId:     "user123",
        Properties: buttonClickProperties,
    },
}

td.TrackBatch(events)

// 사용자 속성 설정
properties := map[string]interface{}{
    "last_login":  time.Now(),
    "login_count": 25,
}

td.SetUserProperties("user123", properties)

// 사용자 속성 증가
increments := map[string]float64{
    "purchase_count": 1,
    "total_spent":    29.99,
}

td.IncrementUserProperties("user123", increments)
```

## 📱 React Native

### 설치

```bash
npm install @thinkingdata/react-native-sdk
```

### 기본 사용법

```javascript
import { ThinkingData } from '@thinkingdata/react-native-sdk';

// SDK 초기화
const td = new ThinkingData({
  projectId: 'your-project-id',
  apiKey: 'your-api-key'
});

// 사용자 식별
td.identify('user123', {
  name: '홍길동',
  email: 'hong@example.com',
  plan: 'premium'
});

// 이벤트 전송
td.track('page_view', {
  userId: 'user123',
  properties: {
    page: '/home',
    title: '홈페이지',
    referrer: 'https://google.com'
  }
});
```

## 🌐 브라우저 (CDN)

### HTML에 스크립트 추가

```html
<script src="https://unpkg.com/@thinkingdata/sdk@latest/dist/thinkingdata.min.js"></script>
```

### 기본 사용법

```javascript
// SDK 초기화
const td = new ThinkingData({
  projectId: 'your-project-id',
  apiKey: 'your-api-key'
});

// 사용자 식별
td.identify('user123', {
  name: '홍길동',
  email: 'hong@example.com',
  plan: 'premium'
});

// 이벤트 전송
td.track('page_view', {
  userId: 'user123',
  properties: {
    page: '/home',
    title: '홈페이지',
    referrer: 'https://google.com'
  }
});
```

## 🔧 공통 설정 옵션

모든 SDK에서 공통으로 사용할 수 있는 설정 옵션들입니다.

```javascript
const td = new ThinkingData({
  projectId: 'your-project-id',
  apiKey: 'your-api-key',
  
  // 선택적 설정
  serverUrl: 'https://api.thinkingdata.io',
  timeout: 10000,                    // 요청 타임아웃 (ms)
  retryAttempts: 3,                  // 재시도 횟수
  batchSize: 100,                    // 배치 크기
  flushInterval: 5000,               // 플러시 간격 (ms)
  enableDebug: false,                // 디버그 모드
  enableCompression: true,           // 압축 사용
  userAgent: 'MyApp/1.0.0'          // 사용자 에이전트
});
```

## 🚀 다음 단계

SDK 사용법을 학습했습니다! 다음 가이드들을 통해 고급 기능을 학습해보세요:

- [설정 가이드](../guides/configuration.md) - 고급 설정 및 최적화
- [API 참조](./reference.md) - REST API 엔드포인트
- [시작하기](../getting-started.md) - 첫 번째 데이터 전송 