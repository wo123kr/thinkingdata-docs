---
sidebar_position: 4
---

# 성능 최적화

ThinkingData 플랫폼에서 대용량 데이터를 효율적으로 처리하고 성능을 최적화하는 방법을 안내합니다.

## 🚀 기본 성능 최적화

### 1. 배치 처리 활용

대량의 이벤트를 개별적으로 전송하는 대신 배치로 처리합니다.

```javascript
// 비효율적: 개별 전송
for (const event of events) {
  td.track(event.name, event.properties);
}

// 효율적: 배치 전송
td.trackBatch(events);
```

### 2. 적절한 배치 크기 설정

시스템 성능과 메모리 사용량을 고려하여 배치 크기를 조정합니다.

```javascript
const td = new ThinkingData({
  projectId: 'your-project-id',
  apiKey: 'your-api-key',
  batchSize: 500,        // 한 번에 전송할 이벤트 수
  flushInterval: 3000    // 3초마다 배치 전송
});
```

### 3. 플러시 간격 최적화

실시간성과 성능 사이의 균형을 맞춥니다.

```javascript
// 실시간 처리 (빈번한 전송)
const realtimeConfig = {
  batchSize: 50,
  flushInterval: 1000  // 1초마다 전송
};

// 배치 처리 (성능 최적화)
const batchConfig = {
  batchSize: 1000,
  flushInterval: 10000  // 10초마다 전송
};
```

## 📊 대용량 데이터 처리

### 1. 스트리밍 처리

대용량 데이터를 스트리밍 방식으로 처리합니다.

```javascript
const { Transform } = require('stream');

class EventTransform extends Transform {
  constructor() {
    super({ objectMode: true });
    this.batch = [];
    this.batchSize = 1000;
  }

  _transform(event, encoding, callback) {
    this.batch.push(event);
    
    if (this.batch.length >= this.batchSize) {
      this.push(this.batch);
      this.batch = [];
    }
    
    callback();
  }

  _flush(callback) {
    if (this.batch.length > 0) {
      this.push(this.batch);
    }
    callback();
  }
}

// 스트리밍 처리 예시
const eventStream = fs.createReadStream('events.json')
  .pipe(JSON.parse())
  .pipe(new EventTransform())
  .on('data', (batch) => {
    td.trackBatch(batch);
  });
```

### 2. 병렬 처리

여러 배치를 병렬로 처리하여 처리량을 향상시킵니다.

```javascript
async function processEventsInParallel(events, batchSize = 1000) {
  const batches = [];
  
  // 이벤트를 배치로 분할
  for (let i = 0; i < events.length; i += batchSize) {
    batches.push(events.slice(i, i + batchSize));
  }
  
  // 병렬로 배치 처리
  const promises = batches.map(batch => td.trackBatch(batch));
  
  try {
    await Promise.all(promises);
    console.log(`Processed ${events.length} events in ${batches.length} batches`);
  } catch (error) {
    console.error('Error processing events:', error);
  }
}
```

### 3. 메모리 효율적 처리

대용량 데이터를 메모리 효율적으로 처리합니다.

```javascript
const fs = require('fs');
const readline = require('readline');

async function processLargeFile(filePath) {
  const fileStream = fs.createReadStream(filePath);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  let batch = [];
  const batchSize = 1000;

  for await (const line of rl) {
    try {
      const event = JSON.parse(line);
      batch.push(event);
      
      if (batch.length >= batchSize) {
        await td.trackBatch(batch);
        batch = [];
      }
    } catch (error) {
      console.error('Error parsing line:', error);
    }
  }
  
  // 남은 배치 처리
  if (batch.length > 0) {
    await td.trackBatch(batch);
  }
}
```

## 🔄 연결 최적화

### 1. 연결 풀링

HTTP 연결을 재사용하여 성능을 향상시킵니다.

```javascript
const td = new ThinkingData({
  projectId: 'your-project-id',
  apiKey: 'your-api-key',
  maxConnections: 10,     // 최대 연결 수
  keepAlive: true,        // 연결 유지
  keepAliveMsecs: 1000    // 연결 유지 간격
});
```

### 2. 압축 사용

네트워크 대역폭을 절약하기 위해 압축을 사용합니다.

```javascript
const td = new ThinkingData({
  projectId: 'your-project-id',
  apiKey: 'your-api-key',
  enableCompression: true,    // GZIP 압축 사용
  compressionLevel: 6         // 압축 레벨 (1-9)
});
```

### 3. 타임아웃 설정

적절한 타임아웃을 설정하여 응답 시간을 관리합니다.

```javascript
const td = new ThinkingData({
  projectId: 'your-project-id',
  apiKey: 'your-api-key',
  timeout: 10000,        // 10초 타임아웃
  retryAttempts: 3,      // 재시도 횟수
  retryDelay: 1000       // 재시도 간격
});
```

## 📈 모니터링 및 최적화

### 1. 성능 메트릭 수집

애플리케이션의 성능을 모니터링합니다.

```javascript
class PerformanceMonitor {
  constructor() {
    this.metrics = {
      eventsSent: 0,
      eventsFailed: 0,
      averageLatency: 0,
      totalLatency: 0,
      requestCount: 0
    };
  }

  trackEvent(eventName, startTime) {
    const latency = Date.now() - startTime;
    
    this.metrics.eventsSent++;
    this.metrics.totalLatency += latency;
    this.metrics.requestCount++;
    this.metrics.averageLatency = this.metrics.totalLatency / this.metrics.requestCount;
  }

  trackError() {
    this.metrics.eventsFailed++;
  }

  getMetrics() {
    return {
      ...this.metrics,
      successRate: (this.metrics.eventsSent - this.metrics.eventsFailed) / this.metrics.eventsSent * 100
    };
  }
}

const monitor = new PerformanceMonitor();

// 이벤트 전송 시 성능 측정
const startTime = Date.now();
td.track('page_view', properties)
  .then(() => {
    monitor.trackEvent('page_view', startTime);
  })
  .catch((error) => {
    monitor.trackError();
    console.error('Event failed:', error);
  });
```

### 2. 성능 프로파일링

성능 병목 지점을 식별하고 최적화합니다.

```javascript
const { performance } = require('perf_hooks');

class PerformanceProfiler {
  constructor() {
    this.profiles = new Map();
  }

  startProfile(name) {
    const startTime = performance.now();
    this.profiles.set(name, { startTime });
  }

  endProfile(name) {
    const profile = this.profiles.get(name);
    if (profile) {
      const duration = performance.now() - profile.startTime;
      console.log(`${name} took ${duration.toFixed(2)}ms`);
      this.profiles.delete(name);
    }
  }
}

const profiler = new PerformanceProfiler();

// 성능 프로파일링 예시
profiler.startProfile('batchProcessing');
await td.trackBatch(events);
profiler.endProfile('batchProcessing');
```

## 🎯 환경별 최적화

### 1. 서버 환경

서버 환경에서의 성능 최적화 설정입니다.

```javascript
const td = new ThinkingData({
  projectId: 'your-project-id',
  apiKey: 'your-api-key',
  
  // 서버 환경 최적화
  batchSize: 1000,           // 큰 배치 크기
  flushInterval: 5000,       // 5초마다 전송
  maxConnections: 20,        // 많은 연결 수
  enableCompression: true,   // 압축 사용
  timeout: 15000,            // 긴 타임아웃
  retryAttempts: 5           // 많은 재시도
});
```

### 2. 모바일 환경

모바일 환경에서의 성능 최적화 설정입니다.

```javascript
const td = new ThinkingData({
  projectId: 'your-project-id',
  apiKey: 'your-api-key',
  
  // 모바일 환경 최적화
  batchSize: 50,             // 작은 배치 크기
  flushInterval: 10000,      // 10초마다 전송
  enableBatteryOptimization: true,
  enableNetworkDetection: true,
  offlineMode: true
});
```

### 3. 브라우저 환경

브라우저 환경에서의 성능 최적화 설정입니다.

```javascript
const td = new ThinkingData({
  projectId: 'your-project-id',
  apiKey: 'your-api-key',
  
  // 브라우저 환경 최적화
  batchSize: 100,
  flushInterval: 3000,
  enableCompression: true,
  userAgent: 'MyApp/1.0.0'
});
```

## 🔧 고급 최적화 기법

### 1. 지연 로딩

필요할 때만 SDK를 로드합니다.

```javascript
class LazyThinkingData {
  constructor(config) {
    this.config = config;
    this.instance = null;
  }

  async getInstance() {
    if (!this.instance) {
      const { ThinkingData } = await import('@thinkingdata/sdk');
      this.instance = new ThinkingData(this.config);
    }
    return this.instance;
  }

  async track(eventName, properties) {
    const td = await this.getInstance();
    return td.track(eventName, properties);
  }
}

const lazyTd = new LazyThinkingData({
  projectId: 'your-project-id',
  apiKey: 'your-api-key'
});
```

### 2. 캐싱

자주 사용되는 데이터를 캐싱하여 성능을 향상시킵니다.

```javascript
class EventCache {
  constructor(maxSize = 1000) {
    this.cache = new Map();
    this.maxSize = maxSize;
  }

  set(key, value) {
    if (this.cache.size >= this.maxSize) {
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }
    this.cache.set(key, value);
  }

  get(key) {
    return this.cache.get(key);
  }

  has(key) {
    return this.cache.has(key);
  }
}

const eventCache = new EventCache();

// 캐시를 활용한 이벤트 전송
function trackWithCache(eventName, properties) {
  const cacheKey = JSON.stringify({ eventName, properties });
  
  if (!eventCache.has(cacheKey)) {
    td.track(eventName, properties);
    eventCache.set(cacheKey, true);
  }
}
```

### 3. 우선순위 큐

중요한 이벤트를 우선적으로 처리합니다.

```javascript
class PriorityQueue {
  constructor() {
    this.highPriority = [];
    this.normalPriority = [];
  }

  enqueue(event, priority = 'normal') {
    if (priority === 'high') {
      this.highPriority.push(event);
    } else {
      this.normalPriority.push(event);
    }
  }

  dequeue() {
    if (this.highPriority.length > 0) {
      return this.highPriority.shift();
    }
    return this.normalPriority.shift();
  }

  isEmpty() {
    return this.highPriority.length === 0 && this.normalPriority.length === 0;
  }
}

const eventQueue = new PriorityQueue();

// 우선순위에 따른 이벤트 처리
setInterval(() => {
  while (!eventQueue.isEmpty()) {
    const event = eventQueue.dequeue();
    td.track(event.name, event.properties);
  }
}, 1000);
```

## 🚀 다음 단계

성능 최적화를 완료했습니다! 다음 가이드들을 통해 더 깊이 있는 학습을 진행해보세요:

- [보안 가이드](./security.md) - 데이터 보안 및 접근 제어
- [데이터 모델링](./data-modeling.md) - 효율적인 데이터 구조 설계
- [API 참조](../api/reference.md) - REST API 엔드포인트 