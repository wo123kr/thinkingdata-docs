---
sidebar_position: 3
---

# 데이터 모델링

ThinkingData 플랫폼에서 효율적인 데이터 구조를 설계하는 방법을 안내합니다.

## 🏗️ 데이터 모델링 원칙

### 1. 이벤트 중심 설계

ThinkingData는 이벤트 중심의 데이터 모델을 사용합니다.

```javascript
// 좋은 예: 명확한 이벤트 구조
td.track('user_signup', {
  userId: 'user123',
  properties: {
    signup_method: 'email',
    referrer: 'google_ads',
    campaign_id: 'summer_2024',
    signup_date: '2024-01-15'
  }
});

// 나쁜 예: 모호한 이벤트 구조
td.track('user_action', {
  userId: 'user123',
  properties: {
    action: 'signup',
    method: 'email',
    source: 'google'
  }
});
```

### 2. 일관된 속성 명명

속성 이름을 일관되게 사용하여 분석을 용이하게 합니다.

```javascript
// 일관된 명명 규칙
const commonProperties = {
  // 사용자 관련
  user_id: 'user123',
  user_type: 'premium',
  user_segment: 'enterprise',
  
  // 세션 관련
  session_id: 'sess_456',
  session_duration: 300,
  
  // 페이지 관련
  page_url: '/products',
  page_title: '제품 목록',
  page_category: 'ecommerce',
  
  // 디바이스 관련
  device_type: 'mobile',
  device_os: 'iOS',
  device_version: '17.0',
  
  // 위치 관련
  country: 'KR',
  region: 'Seoul',
  city: 'Gangnam'
};
```

## 📊 이벤트 설계 패턴

### 1. 사용자 여정 이벤트

사용자의 전체 여정을 추적하는 이벤트들을 설계합니다.

```javascript
// 온보딩 여정
td.track('user_registered', {
  userId: 'user123',
  properties: {
    registration_method: 'email',
    referrer_source: 'google_ads',
    campaign_name: 'summer_2024',
    signup_date: '2024-01-15'
  }
});

td.track('profile_completed', {
  userId: 'user123',
  properties: {
    profile_completion_rate: 100,
    completed_fields: ['name', 'email', 'phone', 'company'],
    completion_time: 180 // 초
  }
});

td.track('first_login', {
  userId: 'user123',
  properties: {
    login_method: 'email',
    device_type: 'mobile',
    session_duration: 600
  }
});
```

### 2. 비즈니스 이벤트

핵심 비즈니스 지표를 추적하는 이벤트들을 설계합니다.

```javascript
// 전자상거래 이벤트
td.track('product_viewed', {
  userId: 'user123',
  properties: {
    product_id: 'prod_456',
    product_name: 'MacBook Pro',
    product_category: 'electronics',
    product_price: 1999999,
    product_brand: 'Apple',
    page_url: '/products/macbook-pro',
    referrer: 'search_results'
  }
});

td.track('cart_added', {
  userId: 'user123',
  properties: {
    product_id: 'prod_456',
    product_name: 'MacBook Pro',
    product_price: 1999999,
    quantity: 1,
    cart_total: 1999999,
    cart_items_count: 1
  }
});

td.track('purchase_completed', {
  userId: 'user123',
  properties: {
    order_id: 'order_789',
    total_amount: 1999999,
    currency: 'KRW',
    payment_method: 'credit_card',
    shipping_method: 'express',
    products: [
      {
        product_id: 'prod_456',
        product_name: 'MacBook Pro',
        quantity: 1,
        price: 1999999
      }
    ]
  }
});
```

### 3. 기능 사용 이벤트

애플리케이션의 기능 사용을 추적하는 이벤트들을 설계합니다.

```javascript
// 기능 사용 이벤트
td.track('feature_used', {
  userId: 'user123',
  properties: {
    feature_name: 'advanced_search',
    feature_category: 'search',
    usage_context: 'product_discovery',
    result_count: 25,
    search_query: 'laptop'
  }
});

td.track('export_completed', {
  userId: 'user123',
  properties: {
    export_type: 'data_report',
    export_format: 'csv',
    record_count: 1000,
    file_size: 2048,
    export_duration: 30
  }
});
```

## 🏷️ 사용자 속성 설계

### 1. 기본 사용자 정보

```javascript
// 사용자 식별 시 기본 정보 설정
td.identify('user123', {
  // 기본 정보
  name: '홍길동',
  email: 'hong@example.com',
  phone: '+82-10-1234-5678',
  
  // 비즈니스 정보
  company: '테크스타트업',
  job_title: '개발자',
  department: 'Engineering',
  
  // 계정 정보
  account_type: 'premium',
  subscription_plan: 'enterprise',
  signup_date: '2024-01-15',
  last_login: '2024-01-20'
});
```

### 2. 동적 사용자 속성

사용자 행동에 따라 변경되는 속성들을 관리합니다.

```javascript
// 로그인 시 속성 업데이트
td.setUserProperties('user123', {
  last_login: new Date(),
  login_count: 25,
  total_session_time: 7200
});

// 구매 시 속성 증가
td.incrementUserProperties('user123', {
  total_purchases: 1,
  total_spent: 1999999,
  lifetime_value: 1999999
});
```

## 📈 분석을 위한 데이터 구조

### 1. 계층적 속성 구조

복잡한 데이터를 계층적으로 구조화합니다.

```javascript
td.track('product_purchased', {
  userId: 'user123',
  properties: {
    // 기본 정보
    order_id: 'order_789',
    purchase_date: '2024-01-20',
    total_amount: 1999999,
    
    // 제품 정보
    product: {
      id: 'prod_456',
      name: 'MacBook Pro',
      category: 'electronics',
      brand: 'Apple',
      price: 1999999,
      variant: '14-inch M3'
    },
    
    // 배송 정보
    shipping: {
      method: 'express',
      cost: 5000,
      estimated_delivery: '2024-01-22',
      address: {
        country: 'KR',
        city: 'Seoul',
        postal_code: '06123'
      }
    },
    
    // 결제 정보
    payment: {
      method: 'credit_card',
      card_type: 'visa',
      installments: 1
    }
  }
});
```

### 2. 배열 및 객체 활용

복잡한 데이터를 배열과 객체로 구조화합니다.

```javascript
td.track('survey_completed', {
  userId: 'user123',
  properties: {
    survey_id: 'satisfaction_2024',
    completion_time: 300,
    responses: [
      {
        question_id: 'q1',
        question: '서비스 만족도',
        answer: 5,
        category: 'satisfaction'
      },
      {
        question_id: 'q2',
        question: '추천 의향',
        answer: 4,
        category: 'nps'
      }
    ],
    overall_score: 4.5
  }
});
```

## 🔍 데이터 품질 관리

### 1. 데이터 검증

전송 전 데이터를 검증하여 품질을 보장합니다.

```javascript
// 데이터 검증 함수
function validateEvent(eventName, properties) {
  const errors = [];
  
  // 필수 속성 검증
  if (!properties.userId) {
    errors.push('userId is required');
  }
  
  // 데이터 타입 검증
  if (properties.price && typeof properties.price !== 'number') {
    errors.push('price must be a number');
  }
  
  // 값 범위 검증
  if (properties.rating && (properties.rating < 1 || properties.rating > 5)) {
    errors.push('rating must be between 1 and 5');
  }
  
  return errors;
}

// 검증 후 이벤트 전송
const properties = {
  userId: 'user123',
  product_id: 'prod_456',
  price: 1999999,
  rating: 5
};

const errors = validateEvent('product_reviewed', properties);
if (errors.length === 0) {
  td.track('product_reviewed', properties);
} else {
  console.error('Validation errors:', errors);
}
```

### 2. 데이터 정규화

일관된 데이터 형식을 유지합니다.

```javascript
// 날짜 정규화
function normalizeDate(date) {
  if (date instanceof Date) {
    return date.toISOString();
  }
  return new Date(date).toISOString();
}

// 가격 정규화
function normalizePrice(price) {
  return Math.round(price * 100) / 100; // 소수점 2자리
}

// 이벤트 전송 시 정규화 적용
td.track('purchase_completed', {
  userId: 'user123',
  properties: {
    purchase_date: normalizeDate(new Date()),
    total_amount: normalizePrice(1999999.99),
    currency: 'KRW'
  }
});
```

## 📊 성능 최적화

### 1. 배치 처리

대량의 이벤트를 효율적으로 처리합니다.

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
  },
  {
    event: 'form_submitted',
    userId: 'user123',
    properties: { form_type: 'registration' }
  }
];

td.trackBatch(events);
```

### 2. 속성 최적화

불필요한 속성을 제거하여 성능을 향상시킵니다.

```javascript
// 최적화된 이벤트 구조
td.track('product_viewed', {
  userId: 'user123',
  properties: {
    product_id: 'prod_456',      // 분석에 필요한 핵심 속성만
    category: 'electronics',     // 필터링용
    price_range: 'high'          // 세분화용
  }
});
```

## 🚀 다음 단계

데이터 모델링을 완료했습니다! 다음 가이드들을 통해 더 깊이 있는 학습을 진행해보세요:

- [성능 최적화](./performance.md) - 대용량 데이터 처리 최적화
- [보안 가이드](./security.md) - 데이터 보안 및 접근 제어
- [API 참조](../api/reference.md) - REST API 엔드포인트 