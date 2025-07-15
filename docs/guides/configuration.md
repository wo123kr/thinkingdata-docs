---
sidebar_position: 2
---

# 설정 가이드

ThinkingData SDK의 고급 설정 옵션과 최적화 방법을 안내합니다.

## ⚙️ 기본 설정

### 필수 설정

모든 SDK에서 공통으로 사용되는 기본 설정입니다.

```javascript
const td = new ThinkingData({
  projectId: 'your-project-id',    // 프로젝트 ID (필수)
  apiKey: 'your-api-key',          // API 키 (필수)
  serverUrl: 'https://api.thinkingdata.io'  // 서버 URL (선택)
});
```

### 선택적 설정

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

## 🔄 배치 처리 설정

대용량 데이터를 효율적으로 처리하기 위한 배치 설정입니다.

### 배치 크기 조정

```javascript
const td = new ThinkingData({
  projectId: 'your-project-id',
  apiKey: 'your-api-key',
  batchSize: 500,        // 한 번에 전송할 이벤트 수
  flushInterval: 3000    // 3초마다 배치 전송
});
```

### 수동 플러시

```javascript
// 즉시 모든 대기 중인 이벤트 전송
await td.flush();

// 특정 시간 후 플러시
setTimeout(() => {
  td.flush();
}, 1000);
```

## 🔒 보안 설정

### API 키 관리

환경 변수를 사용하여 API 키를 안전하게 관리합니다.

```javascript
// .env 파일
THINKINGDATA_PROJECT_ID=your-project-id
THINKINGDATA_API_KEY=your-api-key

// 사용
const td = new ThinkingData({
  projectId: process.env.THINKINGDATA_PROJECT_ID,
  apiKey: process.env.THINKINGDATA_API_KEY
});
```

### HTTPS 강제 사용

```javascript
const td = new ThinkingData({
  projectId: 'your-project-id',
  apiKey: 'your-api-key',
  serverUrl: 'https://api.thinkingdata.io',  // HTTPS 필수
  enableHttpsOnly: true  // HTTP 요청 차단
});
```

## 📊 성능 최적화

### 연결 풀링

```javascript
const td = new ThinkingData({
  projectId: 'your-project-id',
  apiKey: 'your-api-key',
  maxConnections: 10,     // 최대 연결 수
  keepAlive: true,        // 연결 유지
  keepAliveMsecs: 1000    // 연결 유지 간격
});
```

### 압축 설정

```javascript
const td = new ThinkingData({
  projectId: 'your-project-id',
  apiKey: 'your-api-key',
  enableCompression: true,    // GZIP 압축 사용
  compressionLevel: 6         // 압축 레벨 (1-9)
});
```

## 🐛 디버그 설정

### 디버그 모드

```javascript
const td = new ThinkingData({
  projectId: 'your-project-id',
  apiKey: 'your-api-key',
  enableDebug: true,           // 디버그 로그 활성화
  logLevel: 'debug'            // 로그 레벨 설정
});

// 디버그 이벤트 리스너
td.on('debug', (message) => {
  console.log('Debug:', message);
});

td.on('error', (error) => {
  console.error('Error:', error);
});
```

### 로그 설정

```javascript
const td = new ThinkingData({
  projectId: 'your-project-id',
  apiKey: 'your-api-key',
  logLevel: 'info',            // error, warn, info, debug
  logToFile: true,             // 파일에 로그 저장
  logFilePath: './td-logs.log' // 로그 파일 경로
});
```

## 🌍 지역별 설정

### 서버 지역 선택

```javascript
// 미국 서버
const tdUS = new ThinkingData({
  projectId: 'your-project-id',
  apiKey: 'your-api-key',
  serverUrl: 'https://us-api.thinkingdata.io'
});

// 유럽 서버
const tdEU = new ThinkingData({
  projectId: 'your-project-id',
  apiKey: 'your-api-key',
  serverUrl: 'https://eu-api.thinkingdata.io'
});

// 아시아 서버
const tdASIA = new ThinkingData({
  projectId: 'your-project-id',
  apiKey: 'your-api-key',
  serverUrl: 'https://asia-api.thinkingdata.io'
});
```

## 🔄 재시도 설정

### 재시도 정책

```javascript
const td = new ThinkingData({
  projectId: 'your-project-id',
  apiKey: 'your-api-key',
  retryAttempts: 3,           // 최대 재시도 횟수
  retryDelay: 1000,           // 재시도 간격 (ms)
  retryBackoff: 'exponential' // 재시도 백오프 전략
});
```

### 커스텀 재시도 로직

```javascript
const td = new ThinkingData({
  projectId: 'your-project-id',
  apiKey: 'your-api-key',
  retryAttempts: 3,
  retryCondition: (error) => {
    // 특정 오류에 대해서만 재시도
    return error.status === 429 || error.status >= 500;
  }
});
```

## 📱 모바일 최적화

### 배터리 최적화

```javascript
const td = new ThinkingData({
  projectId: 'your-project-id',
  apiKey: 'your-api-key',
  batchSize: 50,              // 작은 배치 크기
  flushInterval: 10000,       // 긴 플러시 간격
  enableBatteryOptimization: true
});
```

### 네트워크 상태 감지

```javascript
const td = new ThinkingData({
  projectId: 'your-project-id',
  apiKey: 'your-api-key',
  enableNetworkDetection: true,
  offlineMode: true           // 오프라인 모드 지원
});

// 네트워크 상태 변경 감지
td.on('networkChange', (isOnline) => {
  if (isOnline) {
    td.flush(); // 온라인 시 대기 중인 이벤트 전송
  }
});
```

## 🔧 환경별 설정

### 개발 환경

```javascript
const td = new ThinkingData({
  projectId: 'dev-project-id',
  apiKey: 'dev-api-key',
  enableDebug: true,
  logLevel: 'debug',
  serverUrl: 'https://dev-api.thinkingdata.io'
});
```

### 스테이징 환경

```javascript
const td = new ThinkingData({
  projectId: 'staging-project-id',
  apiKey: 'staging-api-key',
  enableDebug: false,
  logLevel: 'info',
  serverUrl: 'https://staging-api.thinkingdata.io'
});
```

### 프로덕션 환경

```javascript
const td = new ThinkingData({
  projectId: 'prod-project-id',
  apiKey: 'prod-api-key',
  enableDebug: false,
  logLevel: 'error',
  serverUrl: 'https://api.thinkingdata.io',
  enableCompression: true,
  batchSize: 100,
  flushInterval: 5000
});
```

## 📋 설정 검증

설정이 올바른지 확인하는 방법입니다.

```javascript
const td = new ThinkingData({
  projectId: 'your-project-id',
  apiKey: 'your-api-key'
});

// 설정 검증
const isValid = await td.validateConfig();
if (isValid) {
  console.log('설정이 유효합니다.');
} else {
  console.error('설정에 문제가 있습니다.');
}

// 연결 테스트
const isConnected = await td.testConnection();
if (isConnected) {
  console.log('서버 연결이 성공했습니다.');
} else {
  console.error('서버 연결에 실패했습니다.');
}
```

## 🚀 다음 단계

설정이 완료되었습니다! 다음 가이드들을 통해 고급 기능을 학습해보세요:

- [데이터 모델링](./data-modeling.md) - 효율적인 데이터 구조 설계
- [성능 최적화](./performance.md) - 대용량 데이터 처리 최적화
- [보안 가이드](./security.md) - 데이터 보안 및 접근 제어 