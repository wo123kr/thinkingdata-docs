---
sidebar_position: 5
---

# 보안 가이드

ThinkingData 플랫폼에서 데이터 보안과 접근 제어를 위한 모범 사례를 안내합니다.

## 🔐 기본 보안 원칙

### 1. 최소 권한 원칙

필요한 최소한의 권한만 부여하여 보안 위험을 최소화합니다.

```javascript
// 좋은 예: 필요한 권한만 요청
const td = new ThinkingData({
  projectId: 'your-project-id',
  apiKey: 'read-write-api-key',  // 읽기/쓰기 권한만
  serverUrl: 'https://api.thinkingdata.io'
});

// 나쁜 예: 과도한 권한
const td = new ThinkingData({
  projectId: 'your-project-id',
  apiKey: 'admin-api-key',       // 관리자 권한 (불필요)
  serverUrl: 'https://api.thinkingdata.io'
});
```

### 2. API 키 관리

API 키를 안전하게 관리하고 정기적으로 갱신합니다.

```javascript
// 환경 변수를 통한 API 키 관리
const td = new ThinkingData({
  projectId: process.env.THINKINGDATA_PROJECT_ID,
  apiKey: process.env.THINKINGDATA_API_KEY,
  serverUrl: process.env.THINKINGDATA_SERVER_URL
});

// .env 파일 (절대 Git에 커밋하지 마세요)
// THINKINGDATA_PROJECT_ID=your-project-id
// THINKINGDATA_API_KEY=your-api-key
// THINKINGDATA_SERVER_URL=https://api.thinkingdata.io
```

## 🔒 데이터 암호화

### 1. 전송 중 암호화

모든 데이터 전송은 HTTPS를 통해 암호화됩니다.

```javascript
const td = new ThinkingData({
  projectId: 'your-project-id',
  apiKey: 'your-api-key',
  serverUrl: 'https://api.thinkingdata.io',  // HTTPS 필수
  enableHttpsOnly: true                       // HTTP 요청 차단
});
```

### 2. 민감한 데이터 마스킹

개인정보나 민감한 데이터를 마스킹하여 전송합니다.

```javascript
// 민감한 데이터 마스킹 함수
function maskSensitiveData(data) {
  const masked = { ...data };
  
  // 이메일 마스킹
  if (masked.email) {
    const [local, domain] = masked.email.split('@');
    masked.email = `${local.charAt(0)}***@${domain}`;
  }
  
  // 전화번호 마스킹
  if (masked.phone) {
    masked.phone = masked.phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
  }
  
  // 신용카드 번호 마스킹
  if (masked.credit_card) {
    masked.credit_card = masked.credit_card.replace(/\d(?=\d{4})/g, '*');
  }
  
  return masked;
}

// 마스킹된 데이터 전송
const userData = {
  name: '홍길동',
  email: 'hong@example.com',
  phone: '010-1234-5678',
  credit_card: '1234-5678-9012-3456'
};

const maskedData = maskSensitiveData(userData);
td.identify('user123', maskedData);
```

### 3. 데이터 해시화

민감한 식별자를 해시화하여 전송합니다.

```javascript
const crypto = require('crypto');

// SHA-256 해시 함수
function hashData(data) {
  return crypto.createHash('sha256').update(data).digest('hex');
}

// 사용자 ID 해시화
const userId = 'user123';
const hashedUserId = hashData(userId);

td.track('page_view', {
  userId: hashedUserId,  // 해시화된 사용자 ID
  properties: {
    page: '/home',
    timestamp: Date.now()
  }
});
```

## 🛡️ 접근 제어

### 1. API 키 권한 관리

다양한 권한 수준의 API 키를 생성하고 관리합니다.

```javascript
// 읽기 전용 API 키 (분석용)
const readOnlyTd = new ThinkingData({
  projectId: 'your-project-id',
  apiKey: 'read-only-api-key',
  permissions: ['read']
});

// 쓰기 전용 API 키 (데이터 수집용)
const writeOnlyTd = new ThinkingData({
  projectId: 'your-project-id',
  apiKey: 'write-only-api-key',
  permissions: ['write']
});

// 관리자 API 키 (설정 변경용)
const adminTd = new ThinkingData({
  projectId: 'your-project-id',
  apiKey: 'admin-api-key',
  permissions: ['read', 'write', 'admin']
});
```

### 2. IP 화이트리스트

특정 IP 주소에서만 접근을 허용합니다.

```javascript
const td = new ThinkingData({
  projectId: 'your-project-id',
  apiKey: 'your-api-key',
  allowedIPs: [
    '192.168.1.100',
    '10.0.0.0/8',
    '172.16.0.0/12'
  ]
});
```

### 3. 사용자 인증

애플리케이션 레벨에서 사용자 인증을 구현합니다.

```javascript
class AuthenticatedThinkingData {
  constructor(config) {
    this.td = new ThinkingData(config);
    this.authenticatedUsers = new Set();
  }

  authenticateUser(userId, token) {
    // 토큰 검증 로직
    if (this.validateToken(token)) {
      this.authenticatedUsers.add(userId);
      return true;
    }
    return false;
  }

  track(eventName, properties) {
    const { userId } = properties;
    
    if (!this.authenticatedUsers.has(userId)) {
      throw new Error('User not authenticated');
    }
    
    return this.td.track(eventName, properties);
  }

  validateToken(token) {
    // JWT 토큰 검증 로직
    // 실제 구현에서는 JWT 라이브러리 사용
    return token && token.length > 0;
  }
}

const authTd = new AuthenticatedThinkingData({
  projectId: 'your-project-id',
  apiKey: 'your-api-key'
});

// 사용자 인증 후 이벤트 전송
authTd.authenticateUser('user123', 'valid-token');
authTd.track('page_view', {
  userId: 'user123',
  properties: { page: '/home' }
});
```

## 🔍 데이터 검증

### 1. 입력 데이터 검증

전송 전 데이터를 검증하여 보안 위험을 방지합니다.

```javascript
class DataValidator {
  static validateEvent(eventName, properties) {
    const errors = [];
    
    // 이벤트 이름 검증
    if (!eventName || typeof eventName !== 'string') {
      errors.push('Event name must be a non-empty string');
    }
    
    if (eventName.length > 100) {
      errors.push('Event name too long (max 100 characters)');
    }
    
    // 사용자 ID 검증
    if (!properties.userId) {
      errors.push('userId is required');
    }
    
    // 속성 크기 검증
    const propertiesSize = JSON.stringify(properties).length;
    if (propertiesSize > 10000) {
      errors.push('Properties too large (max 10KB)');
    }
    
    // 금지된 문자 검증
    const forbiddenChars = /[<>\"'&]/;
    if (forbiddenChars.test(eventName)) {
      errors.push('Event name contains forbidden characters');
    }
    
    return errors;
  }

  static sanitizeData(data) {
    const sanitized = {};
    
    for (const [key, value] of Object.entries(data)) {
      if (typeof value === 'string') {
        // XSS 방지를 위한 이스케이프
        sanitized[key] = value
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;')
          .replace(/'/g, '&#x27;');
      } else {
        sanitized[key] = value;
      }
    }
    
    return sanitized;
  }
}

// 검증 및 정제 후 이벤트 전송
const rawProperties = {
  userId: 'user123',
  page: '<script>alert("xss")</script>',
  user_input: 'user provided data'
};

const errors = DataValidator.validateEvent('page_view', rawProperties);
if (errors.length === 0) {
  const sanitizedProperties = DataValidator.sanitizeData(rawProperties);
  td.track('page_view', sanitizedProperties);
} else {
  console.error('Validation errors:', errors);
}
```

### 2. 스키마 검증

데이터 스키마를 정의하고 검증합니다.

```javascript
const Joi = require('joi');

// 이벤트 스키마 정의
const eventSchema = Joi.object({
  userId: Joi.string().required().max(100),
  event: Joi.string().required().max(100),
  properties: Joi.object({
    page: Joi.string().max(500),
    timestamp: Joi.number().integer().min(0),
    user_agent: Joi.string().max(1000),
    ip_address: Joi.string().ip(),
    referrer: Joi.string().max(500).allow(''),
    session_id: Joi.string().max(100)
  }).max(50) // 최대 50개 속성
});

// 스키마 검증
function validateEventSchema(eventData) {
  const { error, value } = eventSchema.validate(eventData);
  
  if (error) {
    throw new Error(`Schema validation failed: ${error.details[0].message}`);
  }
  
  return value;
}

// 검증된 이벤트 전송
try {
  const validatedEvent = validateEventSchema({
    userId: 'user123',
    event: 'page_view',
    properties: {
      page: '/home',
      timestamp: Date.now(),
      user_agent: navigator.userAgent,
      ip_address: '192.168.1.1'
    }
  });
  
  td.track(validatedEvent.event, validatedEvent);
} catch (error) {
  console.error('Event validation failed:', error.message);
}
```

## 🚨 보안 모니터링

### 1. 이상 탐지

비정상적인 패턴을 감지하고 대응합니다.

```javascript
class SecurityMonitor {
  constructor() {
    this.eventCounts = new Map();
    this.suspiciousPatterns = new Set();
    this.rateLimits = {
      eventsPerMinute: 1000,
      eventsPerHour: 50000
    };
  }

  trackEvent(userId, eventName) {
    const now = Date.now();
    const minuteKey = Math.floor(now / 60000);
    const hourKey = Math.floor(now / 3600000);
    
    // 분별 이벤트 카운트
    const minuteKeyStr = `${userId}:${minuteKey}`;
    this.eventCounts.set(minuteKeyStr, (this.eventCounts.get(minuteKeyStr) || 0) + 1);
    
    // 시간별 이벤트 카운트
    const hourKeyStr = `${userId}:${hourKey}`;
    this.eventCounts.set(hourKeyStr, (this.eventCounts.get(hourKeyStr) || 0) + 1);
    
    // 속도 제한 확인
    if (this.eventCounts.get(minuteKeyStr) > this.rateLimits.eventsPerMinute) {
      this.suspiciousPatterns.add(`${userId}:rate_limit_exceeded`);
      console.warn(`Rate limit exceeded for user ${userId}`);
    }
  }

  isSuspicious(userId) {
    return this.suspiciousPatterns.has(`${userId}:rate_limit_exceeded`);
  }

  getEventCount(userId, timeWindow = 'minute') {
    const now = Date.now();
    const key = timeWindow === 'minute' 
      ? Math.floor(now / 60000) 
      : Math.floor(now / 3600000);
    
    return this.eventCounts.get(`${userId}:${key}`) || 0;
  }
}

const securityMonitor = new SecurityMonitor();

// 보안 모니터링과 함께 이벤트 전송
function secureTrack(userId, eventName, properties) {
  securityMonitor.trackEvent(userId, eventName);
  
  if (securityMonitor.isSuspicious(userId)) {
    console.warn(`Suspicious activity detected for user ${userId}`);
    // 추가 보안 조치 (예: 로깅, 알림, 차단)
    return;
  }
  
  td.track(eventName, {
    userId,
    properties
  });
}
```

### 2. 감사 로그

모든 데이터 접근을 기록하고 모니터링합니다.

```javascript
class AuditLogger {
  constructor() {
    this.logs = [];
  }

  logAccess(userId, action, details) {
    const logEntry = {
      timestamp: new Date().toISOString(),
      userId,
      action,
      details,
      ipAddress: this.getClientIP(),
      userAgent: this.getUserAgent()
    };
    
    this.logs.push(logEntry);
    
    // 로그 파일에 저장
    this.saveToFile(logEntry);
    
    // 보안 이벤트 알림
    if (this.isSecurityEvent(action)) {
      this.sendSecurityAlert(logEntry);
    }
  }

  isSecurityEvent(action) {
    const securityActions = [
      'api_key_compromised',
      'rate_limit_exceeded',
      'unauthorized_access',
      'data_export'
    ];
    
    return securityActions.includes(action);
  }

  saveToFile(logEntry) {
    const fs = require('fs');
    const logLine = JSON.stringify(logEntry) + '\n';
    
    fs.appendFileSync('audit.log', logLine);
  }

  sendSecurityAlert(logEntry) {
    // 보안 팀에게 알림 전송
    console.error('SECURITY ALERT:', logEntry);
  }

  getClientIP() {
    // 클라이언트 IP 주소 획득 로직
    return '192.168.1.1';
  }

  getUserAgent() {
    // 사용자 에이전트 획득 로직
    return 'Mozilla/5.0...';
  }
}

const auditLogger = new AuditLogger();

// 감사 로그와 함께 이벤트 전송
function auditedTrack(userId, eventName, properties) {
  auditLogger.logAccess(userId, 'event_track', {
    eventName,
    propertiesCount: Object.keys(properties).length
  });
  
  td.track(eventName, {
    userId,
    properties
  });
}
```

## 🔐 고급 보안 기능

### 1. 데이터 암호화 저장

민감한 데이터를 암호화하여 저장합니다.

```javascript
const crypto = require('crypto');

class EncryptedThinkingData {
  constructor(config) {
    this.td = new ThinkingData(config);
    this.encryptionKey = config.encryptionKey;
  }

  encryptData(data) {
    const algorithm = 'aes-256-cbc';
    const key = crypto.scryptSync(this.encryptionKey, 'salt', 32);
    const iv = crypto.randomBytes(16);
    
    const cipher = crypto.createCipher(algorithm, key);
    let encrypted = cipher.update(JSON.stringify(data), 'utf8', 'hex');
    encrypted += cipher.final('hex');
    
    return {
      encrypted,
      iv: iv.toString('hex')
    };
  }

  decryptData(encryptedData) {
    const algorithm = 'aes-256-cbc';
    const key = crypto.scryptSync(this.encryptionKey, 'salt', 32);
    const iv = Buffer.from(encryptedData.iv, 'hex');
    
    const decipher = crypto.createDecipher(algorithm, key);
    let decrypted = decipher.update(encryptedData.encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    
    return JSON.parse(decrypted);
  }

  track(eventName, properties) {
    // 민감한 데이터 암호화
    const sensitiveFields = ['email', 'phone', 'credit_card'];
    const encryptedProperties = { ...properties };
    
    for (const field of sensitiveFields) {
      if (encryptedProperties[field]) {
        const encrypted = this.encryptData(encryptedProperties[field]);
        encryptedProperties[`${field}_encrypted`] = encrypted;
        delete encryptedProperties[field];
      }
    }
    
    return this.td.track(eventName, encryptedProperties);
  }
}

const encryptedTd = new EncryptedThinkingData({
  projectId: 'your-project-id',
  apiKey: 'your-api-key',
  encryptionKey: process.env.ENCRYPTION_KEY
});
```

### 2. 토큰 기반 인증

JWT 토큰을 사용한 강력한 인증 시스템을 구현합니다.

```javascript
const jwt = require('jsonwebtoken');

class TokenAuthenticatedThinkingData {
  constructor(config) {
    this.td = new ThinkingData(config);
    this.secretKey = config.secretKey;
    this.authenticatedTokens = new Set();
  }

  generateToken(userId, permissions = ['read', 'write']) {
    const payload = {
      userId,
      permissions,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + (60 * 60) // 1시간 만료
    };
    
    return jwt.sign(payload, this.secretKey);
  }

  verifyToken(token) {
    try {
      const decoded = jwt.verify(token, this.secretKey);
      return decoded;
    } catch (error) {
      return null;
    }
  }

  authenticate(token) {
    const decoded = this.verifyToken(token);
    if (decoded) {
      this.authenticatedTokens.add(token);
      return decoded;
    }
    return null;
  }

  track(token, eventName, properties) {
    const decoded = this.verifyToken(token);
    
    if (!decoded || !this.authenticatedTokens.has(token)) {
      throw new Error('Invalid or expired token');
    }
    
    if (!decoded.permissions.includes('write')) {
      throw new Error('Insufficient permissions');
    }
    
    return this.td.track(eventName, {
      ...properties,
      userId: decoded.userId
    });
  }
}

const tokenTd = new TokenAuthenticatedThinkingData({
  projectId: 'your-project-id',
  apiKey: 'your-api-key',
  secretKey: process.env.JWT_SECRET
});

// 토큰 생성 및 인증
const token = tokenTd.generateToken('user123', ['read', 'write']);
const user = tokenTd.authenticate(token);

// 인증된 토큰으로 이벤트 전송
tokenTd.track(token, 'page_view', {
  page: '/home',
  timestamp: Date.now()
});
```

## 🚀 다음 단계

보안 가이드를 완료했습니다! 다음 가이드들을 통해 더 깊이 있는 학습을 진행해보세요:

- [데이터 모델링](./data-modeling.md) - 효율적인 데이터 구조 설계
- [성능 최적화](./performance.md) - 대용량 데이터 처리 최적화
- [API 참조](../api/reference.md) - REST API 엔드포인트 