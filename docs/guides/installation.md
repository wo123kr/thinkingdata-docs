---
sidebar_position: 1
---

# 설치 가이드

ThinkingData SDK를 다양한 환경에 설치하는 방법을 안내합니다.

## 📦 Node.js

### npm 사용

```bash
npm install @thinkingdata/sdk
```

### yarn 사용

```bash
yarn add @thinkingdata/sdk
```

### pnpm 사용

```bash
pnpm add @thinkingdata/sdk
```

## 🐍 Python

### pip 사용

```bash
pip install thinkingdata-sdk
```

### conda 사용

```bash
conda install -c conda-forge thinkingdata-sdk
```

## ☕ Java

### Maven

```xml
<dependency>
    <groupId>io.thinkingdata</groupId>
    <artifactId>thinkingdata-sdk</artifactId>
    <version>1.0.0</version>
</dependency>
```

### Gradle

```gradle
implementation 'io.thinkingdata:thinkingdata-sdk:1.0.0'
```

## 🦀 Rust

### Cargo.toml

```toml
[dependencies]
thinkingdata-sdk = "1.0.0"
```

## 🐹 Go

```bash
go get github.com/thinkingdata/thinkingdata-sdk-go
```

## 📱 React Native

```bash
npm install @thinkingdata/react-native-sdk
```

## 🌐 브라우저 (CDN)

```html
<script src="https://unpkg.com/@thinkingdata/sdk@latest/dist/thinkingdata.min.js"></script>
```

## 🔧 환경별 설정

### Node.js 환경

```javascript
import { ThinkingData } from '@thinkingdata/sdk';

const td = new ThinkingData({
  projectId: 'your-project-id',
  apiKey: 'your-api-key',
  serverUrl: 'https://api.thinkingdata.io'
});
```

### Python 환경

```python
from thinkingdata_sdk import ThinkingData

td = ThinkingData(
    project_id='your-project-id',
    api_key='your-api-key',
    server_url='https://api.thinkingdata.io'
)
```

### Java 환경

```java
import io.thinkingdata.ThinkingData;

ThinkingData td = new ThinkingData.Builder()
    .projectId("your-project-id")
    .apiKey("your-api-key")
    .serverUrl("https://api.thinkingdata.io")
    .build();
```

### Rust 환경

```rust
use thinkingdata_sdk::ThinkingData;

let td = ThinkingData::new()
    .project_id("your-project-id")
    .api_key("your-api-key")
    .server_url("https://api.thinkingdata.io")
    .build();
```

### Go 환경

```go
import "github.com/thinkingdata/thinkingdata-sdk-go"

td := thinkingdata.NewThinkingData(
    "your-project-id",
    "your-api-key",
    "https://api.thinkingdata.io",
)
```

## 🔍 설치 확인

설치가 완료되었는지 확인하는 방법입니다.

### Node.js

```javascript
import { ThinkingData } from '@thinkingdata/sdk';

console.log('ThinkingData SDK version:', ThinkingData.version);
```

### Python

```python
from thinkingdata_sdk import ThinkingData

print(f"ThinkingData SDK version: {ThinkingData.version}")
```

### Java

```java
import io.thinkingdata.ThinkingData;

System.out.println("ThinkingData SDK version: " + ThinkingData.getVersion());
```

## ⚠️ 주의사항

### 버전 호환성

- Node.js: 16.0 이상
- Python: 3.7 이상
- Java: 8 이상
- Rust: 1.56 이상
- Go: 1.18 이상

### 네트워크 요구사항

- HTTPS 연결 필요
- 포트 443 접근 가능
- 방화벽에서 `api.thinkingdata.io` 도메인 허용

### 보안 고려사항

- API 키는 환경 변수로 관리
- 프로덕션 환경에서는 HTTPS 필수
- 민감한 데이터는 암호화하여 전송

## 🚀 다음 단계

설치가 완료되었습니다! 다음 가이드들을 통해 SDK 사용법을 학습해보세요:

- [시작하기](../getting-started.md) - 첫 번째 데이터 전송
- [설정 가이드](./configuration.md) - 고급 설정 옵션
- [API 참조](../api/reference.md) - 모든 API 엔드포인트 