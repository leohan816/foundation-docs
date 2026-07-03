# SIASIU — AI Skin + Health + Personal Color Problem-Solving Commerce  
## Project System Design / Developer Version

> Updated: 2026-06-18 18:54 KST
> Status: Draft v0.1  
> Working Name: **SIASIU**  
> Core Positioning: **“약국이 아니라 건강상담센터. 화장품·건강제품·색조 제품·피부과/퍼스널컬러 샵 추천은 문제 해결 플랜 안에서 선택되는 도구이며, SIASIU은 고객의 상담·구매·반응·컬러 기록을 오래 기억하는 친구 같은 앱이다.”**

---

## 0. Executive Summary

SIASIU은 일반 K-beauty 쇼핑몰이 아니다. 피부 문제를 피부 표면만의 문제로 보지 않고, 건강 상태·생활방식·영양 상태·화장품 루틴·퍼스널컬러·시술 니즈를 함께 보는 AI 상담형 커머스 플랫폼이다. 동시에 고객의 상담기록, 구매기록, 사용 후 반응을 장기 보존해 매번 처음부터 설명하지 않아도 이어서 돕는 평생 동반자형 앱이다.  
기존 쇼핑앱은 `제품 → 추천 → 구매` 순서로 움직인다. SIASIU은 이 순서를 뒤집는다.

```txt
사용자 → 문제 정의 → 루틴/성분/근거 분석 → 해결 플랜 → 제품 후보 → 피드백 → 재조정
```

핵심은 상품 추천 알고리즘이 아니라 **사용자의 문제를 정확하게 구조화하고, 그 문제를 해결하기 위한 근거 기반 플랜을 생성하는 것**이다.

SIASIU의 AI는 장식용 챗봇이 아니라, 다음 역할을 수행하는 **문제 해결 오케스트레이터**다.

- 사용자의 피부 고민, 건강 컨디션, 메이크업/색조 고민을 자연어/음성/사진으로 수집
- 사람처럼 자연스럽고 감정이 느껴지는 상담 톤을 유지
- 상담기록, 구매기록, 사용 후 반응을 장기 메모리로 저장
- 누락된 정보를 추가 질문
- 현재 루틴과 제품 사용 패턴을 구조화
- 제품 성분, 농도, 인증, 기업 자료, 리뷰, 규제 정보와 함께 영양제 성분, 복용 맥락, 생활습관, 퍼스널컬러, 색조 제품 정보를 검색
- 화장품 루틴 충돌, 자극 가능성, 건강제품 중복 섭취 가능성, 생활습관 리스크를 평가
- 장기 메모리를 반영한 해결 플랜을 만들고 필요한 경우 화장품·건강제품·색조 제품·생활방식·피부과/퍼스널컬러 샵 후보를 제시
- 유료 고객에게 AI 통화 상담과 한국 피부과 추천 연결

---

## 1. Product Philosophy

### 1.1 우리가 만들지 않는 것

SIASIU은 다음과 같은 앱이 아니다.

```txt
- 할인 배너 중심 쇼핑몰
- 브랜드 로고와 상품 그리드 중심 K-beauty 앱
- EWG 점수만 보여주는 성분 안전 앱
- AI 추천 상품을 나열하는 단순 추천몰
- 챗봇 버튼만 붙인 기존 커머스 앱
```

### 1.2 우리가 만드는 것

SIASIU은 다음에 가깝다.

```txt
- AI skin + health + personal color consultation center
- Personalized skincare + supplement + lifestyle + color cosmetics planning engine
- Cosmetic + supplement evidence search layer
- K-beauty product + clinic bridge
- User problem database + product evidence graph
```

### 1.3 핵심 은유

```txt
SIASIU은 약국이 아니다.
SIASIU은 건강상담센터다.

화장품, 건강제품, 색조 제품, 피부과/퍼스널컬러 샵 추천은 진열되는 상품이 아니다.
모두 문제 해결 플랜 안에서 선택되는 도구다.
```

즉, 제품은 항상 다음 순서 뒤에 등장한다.

```txt
User Problem → Skin/Health/Color Context → Evidence → Plan → Cosmetic/Supplement/Color/Clinic Candidate
```

---

## 1A. Human-like Consultation & Lifetime Memory

### 1A.1 Core UX Principle

SIASIU의 AI는 사용자가 “AI가 상담한다”고 느끼게 만들면 안 된다.  
사용자는 오래 알고 지낸 상담사, 친구, 개인 뷰티·건강 매니저와 대화하는 것처럼 느껴야 한다.

```txt
Do not feel like a bot.
Feel like a caring human consultant who remembers the customer.
```

### 1A.2 Emotional Response Style

답변은 정보만 전달하지 않는다.  
상담의 첫 반응에는 감정적 온도와 관계감이 있어야 한다.

Bad:

```txt
증상을 입력하세요. 추천 제품을 찾겠습니다.
```

Good:

```txt
Jessica님, 많이 불편하셨겠어요.
지난번에도 수면이 무너졌을 때 피부가 예민해졌던 기록이 있어요.
오늘은 지난 상담과 구매 후 반응까지 같이 보면서 무리 없는 방향으로 천천히 정리해볼게요.
```

### 1A.3 Long-term Memory Principle

SIASIU은 고객의 기록을 장기 보존한다.

```txt
- 모든 상담기록
- 모든 구매기록
- 사용 후 반응
- 좋았던 제품
- 불편했던 제품
- 회피 성분
- 선호 제형
- 영양제 이력
- 생활습관 변화
- 피부과 상담 준비 정보
```

목표:

```txt
고객이 매번 처음부터 설명하지 않아도 된다.
SIASIU은 고객의 피부와 건강 여정을 기억하고 이어서 돕는다.
```

### 1A.4 Memory as Moat

SIASIU의 방어력은 상품 수가 아니라 고객 이해도에서 나온다.

```txt
Product DB = 누구나 만들 수 있다.
Lifetime Skin + Health Memory = 시간이 지날수록 강해지는 관계 자산이다.
```

### 1A.5 Memory Ethics

장기 보존은 신뢰와 연결되므로 반드시 투명해야 한다.

```txt
- 사용자가 어떤 정보가 저장되는지 볼 수 있어야 한다.
- 사용자는 특정 기록을 삭제할 수 있어야 한다.
- 민감한 건강 정보는 더 높은 보호 수준으로 저장한다.
- AI가 기억을 사용할 때는 “지난 기록 기준으로”처럼 자연스럽게 알려준다.
```

### 1A.6 Relationship Goal

```txt
SIASIU is not a one-time shopping app.
SIASIU is a lifelong skin + health companion.
```

---

## 2. Target Users

### 2.1 Primary Target

해외 K-beauty 소비자.

특징:

- 한국 화장품에 관심이 높음
- 한국 피부과/시술/관리에도 관심이 있음
- 브랜드와 성분 정보에 대한 정보 격차가 있음
- 제품 선택 피로가 큼
- “나한테 맞는지”를 알고 싶어 함
- 단순 할인보다 신뢰와 설명을 원함

### 2.2 User Jobs-to-be-Done

사용자가 진짜로 원하는 것은 “제품 구매”가 아니라 다음 문제 해결이다.

```txt
- 내 피부 상태를 이해하고 싶다.
- 지금 쓰는 제품이 맞는지 알고 싶다.
- 어떤 성분을 써야 하는지 알고 싶다.
- 어떤 성분은 피해야 하는지 알고 싶다.
- 레티놀/비타민C/AHA/BHA 같은 active를 어떻게 써야 하는지 알고 싶다.
- 한국 제품 중 내 상황에 맞는 후보를 알고 싶다.
- 한국 피부과를 가야 하는지, 홈케어로 충분한지 알고 싶다.
- 피부 문제와 수면, 스트레스, 식습관, 장 건강, 체중 문제의 연결 가능성을 알고 싶다.
- 영양제를 먹는다면 무엇을 왜, 어떤 우선순위로 고려해야 하는지 알고 싶다.
```

---

## 2A. Skin + Health Expansion

### 2A.1 Core Hypothesis

SIASIU의 확장 가설은 다음과 같다.

```txt
좋은 피부는 피부 표면 관리만으로 충분하지 않을 수 있다.
피부 상태는 수면, 스트레스, 식습관, 체중, 장 건강, 염증성 생활 패턴, 운동, 영양 상태와 함께 봐야 한다.
```

단, SIASIU은 의학적 진단이나 처방을 하지 않는다.  
SIASIU은 사용자의 입력을 바탕으로 가능한 생활방식·영양·화장품 루틴의 개선 방향을 구조화한다.

### 2A.2 Functional Medicine Orientation

SIASIU의 건강 상담은 기능의학적 관점을 참고한다.

서비스 관점:

```txt
- 피부와 비만 등 만성 문제는 단일 제품보다 생활방식·영양·수면·스트레스·운동 패턴과 함께 봐야 한다.
- 증상을 억누르는 방향이 아니라, 사용자의 패턴과 가능한 근본 원인을 정리하는 방향으로 상담한다.
- 약물 처방은 하지 않는다.
- 건강제품/영양제는 처방이 아니라 “고려 가능한 보조 전략”으로만 제안한다.
```

### 2A.3 Strict Boundary

SIASIU은 다음을 하지 않는다.

```txt
- 약 처방
- 질병 진단
- 치료 보장
- 검사 결과에 대한 확정 진단
- 약물 중단/변경 지시
- 고위험 증상에 대한 자가관리 유도
```

SIASIU이 하는 것:

```txt
- 피부 상태와 건강 상태를 함께 질문
- 생활방식 리스크 정리
- 영양제 중복/과잉 가능성 점검
- 화장품 루틴과 건강 루틴을 함께 설계
- 제품보다 먼저 식사·수면·스트레스·운동·피부장벽 루틴을 제안
```

### 2A.4 First Greeting Concept

홈 첫 문장 예시:

```txt
Jessica님, 오늘은 피부상태와 건강상태를 함께 볼게요.
피부는 표면 루틴뿐 아니라 수면, 스트레스, 식습관, 영양 상태와도 연결될 수 있어요.
먼저 지금 가장 불편한 피부 고민과 최근 몸 상태를 같이 알려주세요.
```

짧은 버전:

```txt
Jessica님, 오늘은 피부와 몸 상태를 함께 볼게요.
지금 피부에서 가장 불편한 점과 최근 컨디션을 말하거나 입력해주세요.
```

### 2A.5 Consultation Domains

```txt
Skin:
- 건조함
- 민감함
- 여드름
- 붉어짐
- 색소/흔적
- 탄력/주름
- 모공/피지
- 장벽 약화 가능성

Health:
- 수면
- 스트레스
- 식습관
- 장 건강
- 체중/비만
- 운동량
- 생리 주기 관련 변동
- 피로감
- 기존 영양제 섭취

Lifestyle:
- 세안 습관
- 선크림 사용
- 음주
- 카페인
- 야식
- 운동
- 수분 섭취
- 근무/수면 패턴
```

### 2A.6 Recommendation Priority

SIASIU의 제안 순서는 다음과 같다.

```txt
1. 위험 신호/의료 경계 확인
2. 현재 피부 루틴 단순화 또는 조정
3. 생활방식 개선 포인트
4. 영양제 중복/부족 가능성 점검
5. 화장품 후보
6. 건강제품 후보
7. 유료 기능: AI 통화 상담
8. 유료 기능: 한국 피부과 추천
```

중요 원칙:

```txt
제품은 항상 플랜의 결과로 등장한다.
화장품과 건강제품 모두 “먼저 팔지 않는다.”
```

---

## 2B. Personal Color Expansion

### 2B.1 Why Personal Color

한국의 퍼스널컬러 진단은 현재 K-beauty 경험에서 강한 트렌드 요소다.  
해외 고객에게는 “한국에서 나에게 맞는 색을 진단받고, 그에 맞는 색조 화장품을 사는 경험” 자체가 매력적인 상품이 될 수 있다.

SIASIU은 퍼스널컬러를 단순 콘텐츠로 보지 않는다.  
피부 상태, 건강 상태, 메이크업 선호, 색조 제품 구매로 연결되는 하나의 상담 도메인으로 본다.

### 2B.2 Core Flow

```txt
Photo Input
  ↓
Lighting / Image Quality Check
  ↓
Personal Color Hypothesis
  ↓
Uncertainty Display
  ↓
Color Palette Recommendation
  ↓
Color Cosmetics Candidate
  ↓
Optional Paid Personal Color Shop Recommendation
```

### 2B.3 Personal Color Data

```ts
type PersonalColorProfile = {
  userId: string;

  seasonType?: "spring" | "summer" | "autumn" | "winter" | "unknown";
  undertone?: "warm" | "cool" | "neutral" | "unknown";
  brightness?: "light" | "medium" | "deep" | "unknown";
  chroma?: "muted" | "clear" | "unknown";
  contrast?: "low" | "medium" | "high" | "unknown";

  recommendedColors: string[];
  avoidColors?: string[];

  imageQualityNotes: string[];
  confidence: "high" | "medium" | "low";

  sourceImageIds: string[];

  updatedAt: string;
};
```

### 2B.4 Color Cosmetics Recommendation

색조 제품 추천은 퍼스널컬러만으로 결정하지 않는다.

```txt
Color cosmetics recommendation =
  PersonalColorProfile
  + SkinProfile
  + Sensitivity
  + Texture Preference
  + Finish Preference
  + Budget
  + Purchase History
  + Reaction History
```

추천 대상:

```txt
- Lip
- Blush
- Cushion / SIASIU shade
- Concealer
- Eyeshadow
- Contour / Highlighter
```

### 2B.5 Personal Color Shop Recommendation

퍼스널컬러 샵 추천은 유료 기능으로 둘 수 있다.

추천 기준:

```txt
- 고객 언어
- 방문 가능 지역
- 예약 가능성
- 가격대
- 진단 방식
- 고객 목표
- 사진 분석의 불확실성
```

### 2B.6 Guardrail

```txt
사진 기반 퍼스널컬러 분석은 조명, 카메라, 보정, 피부 상태에 영향을 받는다.
따라서 “확정 진단”이 아니라 “가능성이 높은 컬러 가설”로 표현한다.
```

---

## 3. Core User Experience

### 3.1 Existing Shopping App Flow

```txt
Home
  ├─ Banner
  ├─ Brand
  ├─ Recommended Products
  └─ Discount Products

Category
  └─ Product Grid

Product Detail
  └─ Buy
```

문제:

```txt
- 사용자의 문제 정의가 없음
- 제품이 먼저 보임
- 추천 이유가 약함
- 루틴 맥락이 없음
- 성분/농도/제형/충돌 정보가 부족함
- 해외 사용자의 정보 격차를 해결하지 못함
```

### 3.2 SIASIU Flow

```txt
Home
  ├─ Personalized Greeting
  ├─ Current Skin/Routine Summary
  ├─ AI Consultation Entry
  ├─ Problem Hypothesis Cards
  ├─ Routine Plan
  └─ Product Candidates only if needed

AI Consultation
  ├─ Memory Recall
  ├─ Skin + Health Check-in
  ├─ Personal Color Photo Input
  ├─ Text Input
  ├─ Voice Input
  ├─ Follow-up Questions
  ├─ Structured Profile Update
  ├─ Cosmetic Brain Search
  ├─ Plan Generation
  └─ Product / Clinic Link

Personal Color
  ├─ Photo Analysis
  ├─ Color Profile
  ├─ Color Cosmetics Recommendations
  └─ Shop Recommendation

Memory
  ├─ Consultation History
  ├─ Purchase History
  ├─ Reaction History
  ├─ Preference History
  └─ Long-term Summary

Profile
  ├─ Skin Type
  ├─ Concerns
  ├─ Sensitivity
  ├─ Allergies / Avoid Ingredients
  ├─ Current Routine
  ├─ Product History
  ├─ Reaction History
  └─ Goals

Paid
  ├─ AI Call Consultation
  └─ Korean Dermatology Recommendation
```

---

## 4. Monetization Boundary

### 4.1 Free Tier

무료 사용자는 SIASIU의 핵심 철학을 경험할 수 있어야 한다.

Free 기능:

```txt
- 문자 기반 AI 상담
- 기본 음성 입력
- 피부 프로필 생성
- 현재 루틴 입력
- 기본 루틴 리스크 요약
- 기본 화장품/건강제품 후보
- 추천 이유 요약
```

Free의 목적:

```txt
사용자가 “이 앱은 제품부터 팔지 않고 나를 이해하려 한다”고 느끼게 만드는 것.
```

### 4.2 Paid Tier

유료 기능은 비용이 크고 신뢰 책임이 높은 기능으로 제한한다.

Paid 기능:

```txt
- AI 통화 상담
- 더 깊은 루틴 분석
- 고난도 질문에 대한 premium LLM escalation
- 한국 피부과 추천
- 피부과 상담 전 정보 요약 리포트
- 개인화된 장기 피부+건강 루틴 플랜
- 장기 메모리 기반 고급 상담 요약
```

### 4.3 Paid Boundary Rule

```txt
AI call consultation = Paid only
Korean dermatology recommendation = Paid only
```

---

## 5. Core System Architecture

### 5.1 High-Level Architecture

```txt
[Mobile App / Web App]
        ↓
[AI Consultation Interface]
        ↓
[Conversation Orchestrator]
        ↓
[User Profile Service]
        ↓
[Lifetime Memory Service]
        ↓
[Query Planner]
        ↓
[SIASIU Brain Search]
        ├─ Product Evidence DB
        ├─ Ingredient Knowledge Graph
        ├─ Routine Conflict Graph
        ├─ Regulation / Certification DB
        ├─ Brand Official Data DB
        ├─ Review Pattern DB
        ├─ Dermatology Partner DB
        └─ Treatment/Procedure Knowledge DB
        ↓
[Reasoning Layer]
        ├─ Open-source LLM
        ├─ Rule Engine
        ├─ Risk / Claim Guardrail
        ├─ Emotional Tone Controller
        ├─ Memory Relevance Filter
        └─ Premium LLM Escalation
        ↓
[Answer Composer]
        ↓
[Skin + Health Plan + Cosmetic/Supplement Candidate + Clinic Link]
```

---

## 6. Data Model

### 6.1 User Entity

```ts
type User = {
  id: string;
  name: string;
  email?: string;
  locale: string;
  country?: string;
  language: "ko" | "en" | "zh" | "ja" | string;
  membershipTier: "free" | "paid";
  createdAt: string;
  updatedAt: string;
};
```

---

### 6.1A Lifetime Memory Entity

```ts
type LifetimeMemory = {
  userId: string;

  consultationSummaries: ConsultationMemory[];
  purchaseMemories: PurchaseMemory[];
  reactionMemories: ReactionMemory[];
  preferenceMemories: PreferenceMemory[];

  longTermProfileSummary: string;

  lastUpdatedAt: string;
};
```

---

### 6.1B Consultation Memory

```ts
type ConsultationMemory = {
  id: string;
  userId: string;

  consultationId: string;

  summary: string;
  emotionalContext?: string;

  skinConcerns: SkinConcern[];
  healthSignals: string[];
  lifestyleSignals: string[];

  productsDiscussed: string[];
  supplementsDiscussed: string[];

  followUpNeeded?: string[];

  createdAt: string;
};
```

---

### 6.1C Purchase Memory

```ts
type PurchaseMemory = {
  id: string;
  userId: string;

  orderId: string;
  itemType: "cosmetic" | "supplement" | "service";
  itemId: string;
  itemName: string;

  purchaseReason?: string;
  linkedRecommendationId?: string;

  createdAt: string;
};
```

---

### 6.1D Reaction Memory

```ts
type ReactionMemory = {
  id: string;
  userId: string;

  itemType: "cosmetic" | "supplement" | "lifestyle_action" | "clinic";
  itemId?: string;
  itemName?: string;

  reactionType: "positive" | "neutral" | "negative" | "unknown";
  description: string;

  severity?: "low" | "medium" | "high" | "unknown";

  shouldAvoidAgain?: boolean;

  createdAt: string;
};
```

---

### 6.1E Preference Memory

```ts
type PreferenceMemory = {
  id: string;
  userId: string;

  category:
    | "texture"
    | "fragrance"
    | "price"
    | "brand"
    | "ingredient"
    | "supplement_form"
    | "communication_tone"
    | "clinic_preference";

  value: string;

  confidence: "high" | "medium" | "low";

  source: "user_explicit" | "inferred_from_behavior" | "purchase_history" | "reaction_history";

  createdAt: string;
  updatedAt: string;
};
```

---

### 6.2 User Skin Profile

```ts
type UserSkinProfile = {
  userId: string;

  skinType?: "dry" | "oily" | "combination" | "normal" | "unknown";
  sensitivityLevel?: "low" | "medium" | "high" | "unknown";

  concerns: SkinConcern[];
  goals: SkinGoal[];

  allergies?: string[];
  avoidIngredients?: string[];

  currentRoutine: Routine;
  productHistory: ProductUsageHistory[];

  reactionHistory: ReactionEvent[];

  locationContext?: {
    country?: string;
    city?: string;
    season?: string;
    humidityLevel?: "low" | "medium" | "high" | "unknown";
  };

  budgetPreference?: {
    min?: number;
    max?: number;
    currency: string;
  };

  preferredTexture?: string[];
  fragrancePreference?: "avoid" | "ok" | "prefer" | "unknown";

  updatedAt: string;
};
```

---

### 6.3 Skin Concern

```ts
type SkinConcern =
  | "dryness"
  | "oiliness"
  | "acne"
  | "redness"
  | "sensitivity"
  | "hyperpigmentation"
  | "wrinkles"
  | "texture"
  | "pores"
  | "barrier_damage_possible"
  | "post_acne_marks"
  | "unknown";
```

---

### 6.4 Routine

```ts
type Routine = {
  morning: RoutineStep[];
  evening: RoutineStep[];
  weekly?: RoutineStep[];
};

type RoutineStep = {
  order: number;
  productId?: string;
  productName?: string;
  category: ProductCategory;
  frequency?: string;
  notes?: string;
};
```

---

### 6.5 Product Entity

```ts
type Product = {
  id: string;
  brand: string;
  name: string;
  countryOfOrigin?: string;
  category: ProductCategory;

  price?: {
    amount: number;
    currency: string;
  };

  images: string[];
  officialUrl?: string;

  claims: string[];
  usageInstructions?: string;

  ingredients: ProductIngredient[];

  evidenceProfile: ProductEvidenceProfile;

  status: "active" | "inactive" | "out_of_stock";

  createdAt: string;
  updatedAt: string;
};
```

---

### 6.6 Product Ingredient

```ts
type ProductIngredient = {
  ingredientId: string;
  inciName: string;
  displayName: string;
  orderIndex?: number;

  concentration?: {
    value?: number;
    unit?: "%";
    range?: string;
    sourceId?: string;
    confidence: "confirmed" | "estimated" | "unknown";
  };

  role?: IngredientRole[];
};
```

중요 원칙:

```txt
전성분 순서만으로 농도를 확정하지 않는다.
농도가 공개되지 않은 경우 unknown으로 둔다.
추정이 필요한 경우 estimated로 분리한다.
```

---

### 6.7 Ingredient Entity

```ts
type Ingredient = {
  id: string;

  inciName: string;
  koreanName?: string;
  chineseName?: string;
  synonyms: string[];

  roles: IngredientRole[];

  knownFunctions: string[];

  activeLevel?: "low" | "medium" | "high" | "unknown";

  irritationPotential?: {
    level: "low" | "medium" | "high" | "context_dependent" | "unknown";
    notes?: string;
  };

  evidenceLevel?: "strong" | "moderate" | "weak" | "insufficient";

  regulatoryNotes?: RegulatoryNote[];

  createdAt: string;
  updatedAt: string;
};
```

---

### 6.8 Product Evidence Profile

```ts
type ProductEvidenceProfile = {
  officialIngredientList?: EvidenceSource;
  concentrationSources?: EvidenceSource[];
  brandClinicalData?: EvidenceSource[];
  certificationData?: EvidenceSource[];
  regulatoryData?: EvidenceSource[];

  reviewPatternSummary?: ReviewPatternSummary;

  dataCompletenessScore: number; // 0-100
  confidenceLevel: "high" | "medium" | "low";

  limitations: string[];
};
```

---

### 6.9 Evidence Source

```ts
type EvidenceSource = {
  id: string;
  type:
    | "brand_official"
    | "product_package"
    | "government_registration"
    | "certification"
    | "clinical_test"
    | "review"
    | "third_party_database"
    | "manual_entry";

  title: string;
  url?: string;
  capturedAt: string;

  reliabilityLevel: "high" | "medium" | "low";
  rawText?: string;
  structuredData?: Record<string, unknown>;
};
```

---

### 6.10 Recommendation Object

```ts
type Recommendation = {
  id: string;
  userId: string;

  problemSummary: string;
  hypothesis: ProblemHypothesis[];

  plan: RoutinePlan;

  productCandidates: ProductCandidate[];

  clinicCandidate?: DermatologyRecommendation;

  confidence: "high" | "medium" | "low";

  limitations: string[];

  createdAt: string;
};
```

---

### 6.11 Product Candidate

```ts
type ProductCandidate = {
  productId: string;

  recommendationStrength: "strong" | "moderate" | "weak" | "hold";

  whyRecommended: string[];
  whyNotExcluded: string[];
  cautionNotes: string[];

  missingData: string[];

  matchFactors: {
    skinConcernMatch: number;
    routineCompatibility: number;
    sensitivityCompatibility: number;
    evidenceConfidence: number;
    budgetMatch: number;
  };
};
```

---

### 6.12 Dermatology Recommendation

```ts
type DermatologyRecommendation = {
  userId: string;
  clinicId: string;

  reasonForRecommendation: string[];

  customerSummaryForClinic: {
    concerns: SkinConcern[];
    currentRoutine: Routine;
    productHistory: ProductUsageHistory[];
    reactionHistory: ReactionEvent[];
    goals: SkinGoal[];
    preferredLanguage?: string;
  };

  disclaimer: string;
  createdAt: string;
};
```

---

### 6.13 Health Profile

```ts
type UserHealthProfile = {
  userId: string;

  sleep?: {
    averageHours?: number;
    quality?: "good" | "medium" | "poor" | "unknown";
    bedtimeRegularity?: "regular" | "irregular" | "unknown";
  };

  stress?: {
    level?: "low" | "medium" | "high" | "unknown";
    mainSources?: string[];
  };

  diet?: {
    pattern?: string[];
    restrictions?: string[];
    alcoholFrequency?: string;
    caffeineIntake?: string;
    lateNightEating?: "often" | "sometimes" | "rarely" | "unknown";
  };

  digestion?: {
    bloating?: "often" | "sometimes" | "rarely" | "unknown";
    bowelPattern?: string;
    notes?: string;
  };

  exercise?: {
    frequencyPerWeek?: number;
    type?: string[];
    intensity?: "low" | "medium" | "high" | "unknown";
  };

  weightContext?: {
    goal?: "loss" | "maintenance" | "gain" | "unknown";
    concernLevel?: "low" | "medium" | "high" | "unknown";
  };

  supplementHistory: SupplementUsageHistory[];

  updatedAt: string;
};
```

---

### 6.14 Supplement Entity

```ts
type Supplement = {
  id: string;
  brand: string;
  name: string;
  category: SupplementCategory;

  ingredients: SupplementIngredient[];

  dosageForm?: "capsule" | "tablet" | "powder" | "liquid" | "gummy" | "unknown";

  suggestedUse?: string;

  evidenceProfile: SupplementEvidenceProfile;

  cautions: string[];

  status: "active" | "inactive" | "out_of_stock";

  createdAt: string;
  updatedAt: string;
};
```

---

### 6.15 Supplement Ingredient

```ts
type SupplementIngredient = {
  ingredientId: string;
  name: string;

  amount?: {
    value?: number;
    unit?: "mg" | "mcg" | "g" | "IU" | "CFU" | string;
    confidence: "confirmed" | "estimated" | "unknown";
    sourceId?: string;
  };

  form?: string; // e.g. magnesium glycinate, zinc picolinate, retinyl palmitate
  purposeTags?: string[];
};
```

---

### 6.16 Supplement Evidence Profile

```ts
type SupplementEvidenceProfile = {
  labelFacts?: EvidenceSource;
  officialData?: EvidenceSource[];
  thirdPartyTesting?: EvidenceSource[];
  regulatoryData?: EvidenceSource[];
  researchSummary?: EvidenceSource[];

  dataCompletenessScore: number;
  confidenceLevel: "high" | "medium" | "low";

  limitations: string[];
};
```

---

### 6.17 Supplement Usage History

```ts
type SupplementUsageHistory = {
  supplementId?: string;
  supplementName?: string;

  dose?: string;
  frequency?: string;
  startDate?: string;
  endDate?: string;

  reasonForUse?: string;
  perceivedEffect?: string;
  adverseReaction?: string;
};
```

---

### 6.18 Lifestyle Plan

```ts
type LifestylePlan = {
  sleepActions: string[];
  dietActions: string[];
  stressActions: string[];
  exerciseActions: string[];
  skincareActions: string[];
  supplementActions: string[];

  priority: "low" | "medium" | "high";
  timeHorizon: "today" | "this_week" | "this_month";
};
```


---

## 7. SIASIU Brain Search

SIASIU Brain Search는 단순 RAG가 아니다.  
목표는 “검색 결과 목록”이 아니라 **판단 가능한 근거 구조**를 반환하는 것이다.

### 7.1 Search Input

```ts
type BrainSearchInput = {
  userId: string;
  query: string;

  context: {
    skinProfile: UserSkinProfile;
    currentRoutine: Routine;
    lifetimeMemory: LifetimeMemory;
    membershipTier: "free" | "paid";
  };

  intent:
    | "understand_problem"
    | "routine_analysis"
    | "ingredient_lookup"
    | "product_candidate_search"
    | "clinic_candidate_search"
    | "safety_check"
    | "compare_products";
};
```

---

### 7.2 Search Output

```ts
type BrainSearchOutput = {
  interpretedQuestion: string;

  relevantUserFacts: string[];

  relevantMemories: ConsultationMemory[] | PurchaseMemory[] | ReactionMemory[];

  retrievedEvidence: EvidenceBlock[];

  graphFindings: GraphFinding[];

  missingInformation: string[];

  possibleHypotheses: ProblemHypothesis[];

  nextQuestions: string[];

  allowedActions: AllowedAction[];
};
```

---

### 7.3 Evidence Block

```ts
type EvidenceBlock = {
  sourceId: string;
  sourceType: EvidenceSource["type"];
  reliabilityLevel: "high" | "medium" | "low";

  content: string;

  supports: string[];
  limitations: string[];
};
```

---

### 7.4 Graph Relations

```txt
Ingredient → function
Ingredient → possible_irritation
Ingredient → synergistic_with
Ingredient → caution_with
Ingredient → regulated_by_country

Product → contains_ingredient
Product → claims_effect
Product → has_evidence
Product → suitable_for
Product → caution_for
Product → missing_concentration_data

User → has_concern
User → has_sensitivity
User → uses_product
User → purchased_product
User → had_reaction
User → prefers
User → avoids
User → remembers_consultation

Routine → contains_active
Routine → has_conflict
Routine → needs_simplification

Supplement → contains_nutrient
Supplement → has_dose
Supplement → overlaps_with
Supplement → caution_for
Supplement → supports_goal
Supplement → missing_dose_data

Lifestyle → affects_skin_context
Lifestyle → affects_weight_context
Lifestyle → affects_sleep_context

Clinic → supports_language
Clinic → specializes_in
Clinic → located_in
Clinic → suitable_for_goal
```

---

## 8. AI Consultation Flow

### 8.1 Skin + Health Check-in Flow

```txt
Greeting with user name
  ↓
Recall relevant long-term memory
  ↓
Ask skin concern + health context together
  ↓
Capture skin symptoms
  ↓
Capture sleep / stress / diet / digestion / exercise / supplement history
  ↓
Detect urgent boundary or medical-risk category
  ↓
Continue to text or voice consultation flow
```

Example greeting:

```txt
Jessica님, 오늘은 피부상태와 건강상태를 함께 볼게요.
지난 상담과 구매 후 반응도 같이 확인하면서 볼게요.
지금 피부에서 가장 불편한 점과 최근 컨디션을 말하거나 입력해주세요.
```

---

### 8.2 Text Consultation Flow

```txt
User Input
  ↓
Intent Classification
  ↓
Missing Information Detection
  ↓
Follow-up Question
  ↓
Profile Update
  ↓
Memory Update / Memory Retrieval
  ↓
Brain Search
  ↓
Hypothesis Generation
  ↓
Routine Plan
  ↓
Product Candidate or No Product
  ↓
Feedback Capture
```

---

### 8.3 Voice Input Flow

```txt
Voice Input
  ↓
ASR
  ↓
Text Normalization
  ↓
Intent Classification
  ↓
Same as Text Consultation Flow
```

---

### 8.4 Paid AI Call Flow

```txt
User starts AI call
  ↓
Membership Check
  ↓
Real-time ASR
  ↓
Conversation Orchestrator
  ↓
Live Follow-up Questions
  ↓
Profile Update
  ↓
Memory Update / Memory Retrieval
  ↓
Brain Search
  ↓
Call Summary
  ↓
Memory Update
  ↓
Personalized Routine Plan
  ↓
Optional Product / Clinic Link
```

### 8.5 Paid Gate

```ts
function canUseAICall(user: User): boolean {
  return user.membershipTier === "paid";
}

function canReceiveClinicRecommendation(user: User): boolean {
  return user.membershipTier === "paid";
}
```

---

## 9. Recommendation Logic

### 9.1 Product Recommendation Rule

화장품과 건강제품은 항상 해결 플랜 뒤에 나온다.

```txt
Do not recommend product first.
First define the problem.
Then define the plan.
Then decide whether a product is needed.
```

### 9.2 Recommendation Pipeline

```txt
1. Parse user problem
2. Identify missing context
3. Ask follow-up questions
4. Update user profile
5. Search product/ingredient/routine evidence
6. Generate possible hypotheses
7. Create non-product actions first
8. Check if cosmetic/supplement/lifestyle intervention is needed
9. Select cosmetic and supplement candidates
10. Explain recommendation and limitations
```

### 9.3 Cosmetic Product Candidate Ranking

```ts
score =
  skinConcernMatch * 0.25 +
  routineCompatibility * 0.20 +
  sensitivityCompatibility * 0.20 +
  evidenceConfidence * 0.20 +
  budgetMatch * 0.10 +
  availability * 0.05
```

주의:

```txt
농도 미공개 제품은 evidenceConfidence를 낮춘다.
사용자 민감도가 높은 경우 active 강도가 높은 제품은 penalty를 준다.
현재 루틴과 충돌하는 제품은 제외하거나 hold 처리한다.
```


### 9.4 Supplement Candidate Ranking

```ts
supplementScore =
  goalMatch * 0.25 +
  userContextCompatibility * 0.20 +
  doseClarity * 0.20 +
  evidenceConfidence * 0.20 +
  overlapRiskInverse * 0.10 +
  budgetMatch * 0.05
```

Penalty rules:

```txt
- 용량 미공개 제품은 doseClarity를 낮춘다.
- 이미 같은 성분을 복용 중이면 overlapRisk를 높인다.
- 고함량 제품은 사용자 맥락이 부족할 때 hold 처리한다.
- 건강제품은 약처럼 처방하지 않고 “고려 가능한 후보”로만 표시한다.
```


---

## 10. Rule Engine / Guardrails


### 10.0 Emotional Tone Controller

SIASIU의 답변은 정확해야 하지만 차갑지 않아야 한다.

Required tone pattern:

```txt
1. Warm acknowledgment
2. Memory-based continuity if relevant
3. Problem clarification
4. Evidence-based explanation
5. Gentle next action
```

Example:

```txt
Jessica님, 많이 불편하셨겠어요.
지난번에도 수면이 부족했던 주에 피부가 예민해졌던 기록이 있어요.
오늘은 새 제품을 바로 추가하기보다, 먼저 수면·스트레스·세안 루틴을 같이 확인해볼게요.
```

Do not overdo emotion:

```txt
- 과장된 공감 금지
- 치료를 보장하는 위로 금지
- 사용자를 불안하게 만드는 감정 표현 금지
```

---

### 10.1 Forbidden Claims

SIASIU AI는 다음 표현을 피해야 한다.

```txt
- “이 제품은 반드시 효과가 있습니다.”
- “당신은 장벽 손상입니다.”
- “이 성분은 완전히 안전합니다.”
- “이 성분은 독입니다.”
- “이 제품은 피부질환을 치료합니다.”
- “피부과 치료를 대체할 수 있습니다.”
- “이 영양제가 질병을 치료합니다.”
- “약 대신 이 영양제를 드세요.”
- “검사 없이 이 영양소가 부족합니다.”
```

### 10.2 Preferred Wording

```txt
- “입력하신 정보 기준으로는 장벽 약화 가능성이 높아 보입니다.”
- “현재 루틴에서는 자극 변수를 먼저 줄이는 방향이 더 적합해 보입니다.”
- “이 제품은 플랜의 후보입니다. 다만 정확한 농도 정보가 공개되어 있지 않아 추천 강도는 낮췄습니다.”
- “홈케어보다 피부과 상담이 더 적합할 가능성이 있습니다.”
- “현재 정보 기준으로는 수면/스트레스/식습관도 함께 확인하는 것이 좋습니다.”
- “이 건강제품은 처방이 아니라, 현재 목표에 맞는 후보로만 제안됩니다.”
```

### 10.3 Memory Guardrails

```txt
- 고객의 장기 기록은 추천과 상담 품질 개선을 위해 사용한다.
- 민감한 건강 기록은 최소 접근 원칙을 적용한다.
- 사용자가 원하면 기록을 삭제할 수 있어야 한다.
- AI는 확실하지 않은 기억을 사실처럼 말하지 않는다.
- 추론된 선호는 inferred로 표시한다.
```

---

### 10.4 Safety Categories

```ts
type SafetyCategory =
  | "cosmetic_general"
  | "possible_irritation"
  | "medical_boundary"
  | "pregnancy_or_child"
  | "severe_symptom"
  | "drug_interaction"
  | "clinic_referral_candidate"
  | "supplement_general"
  | "supplement_overlap_risk"
  | "lifestyle_general"
  | "functional_medicine_context";
```

---

## 11. EWG Handling Policy

### 11.1 Principle

EWG는 전면 점수로 보여주지 않는다.

```txt
EWG score is a background feature, not a consumer-facing truth label.
```

### 11.2 Why

```txt
- 안전 점수는 효과와 다르다.
- 자연유래 성분도 자극/알레르기 가능성이 있다.
- 레티놀, 산, 비타민 C 같은 active는 위험/안전 이분법으로 판단하면 안 된다.
- 성분은 농도, 제형, 사용 빈도, 피부 상태, 루틴 조합에 따라 의미가 달라진다.
```

### 11.3 Usage

EWG는 다음 목적으로만 사용한다.

```txt
- 내부 참고 신호
- 소비자 불안 포인트 탐지
- 논란 성분 탐지
- 추가 설명이 필요한 성분 후보 탐지
```

---

## 11A. Supplement Handling Policy

### 11A.1 Principle

SIASIU은 약을 처방하지 않는다.  
건강제품과 영양제는 사용자의 건강·피부 목표에 맞춘 보조 전략 후보로만 제안한다.

```txt
No drug prescription.
No disease treatment claims.
No deterministic deficiency claims without data.
```

### 11A.2 Required Context Before Suggesting Supplements

영양제를 제안하기 전 최소한 다음 정보를 확인한다.

```txt
- 현재 복용 중인 영양제
- 복용 용량
- 복용 목적
- 최근 불편감
- 수면/스트레스/식습관
- 피부 목표
- 체중/대사 목표
- 중복 섭취 가능성
```

### 11A.3 Supplement Recommendation Format

```txt
이 건강제품은 현재 목표에 맞는 “후보”입니다.

제안 이유:
- 사용자의 목표와 관련된 성분군입니다.
- 현재 입력 기준에서 생활방식 플랜과 함께 고려할 수 있습니다.

주의:
- 약이 아니며 질병 치료를 목적으로 제안하지 않습니다.
- 이미 같은 성분을 복용 중이면 중복 가능성이 있습니다.
- 용량, 형태, 개인 상태에 따라 적합성이 달라질 수 있습니다.
```

### 11A.4 Lifestyle First Rule

영양제보다 먼저 생활방식 기반 개입을 검토한다.

```txt
Sleep → Diet → Stress → Exercise → Skincare routine → Supplement candidate
```


---

## 12. Dermatology Link

### 12.1 Philosophy

해외 고객은 한국 화장품뿐 아니라 한국 피부과에 대한 기대가 높다.  
SIASIU은 제품 판매만으로 끝나지 않고, 필요하면 한국 피부과와 연결되는 문제 해결 경로를 제공한다. 이 추천은 단순 이벤트/가격 추천이 아니라, 고객과 쌓아온 상담기록·건강상태·피부상태·구매/반응 기록을 바탕으로 하는 정밀 추천이다.

### 12.2 Access

```txt
Korean dermatology recommendation is paid-only.

It must be precision consultation, not event promotion.
```

### 12.3 Clinic Recommendation Input

```ts
type ClinicRecommendationInput = {
  userId: string;
  skinConcerns: SkinConcern[];
  goals: SkinGoal[];
  budget?: {
    min?: number;
    max?: number;
    currency: string;
  };
  travelContext?: {
    targetCity?: "Seoul" | "Busan" | "Daegu" | string;
    visitDate?: string;
    stayDurationDays?: number;
  };
  languagePreference?: string[];
  preferredTreatmentLevel?: "consultation_only" | "light_care" | "procedure_possible" | "unknown";
  concernsAboutRisk?: string[];
  expectedOutcome?: string[];
};
```

### 12.4 Clinic Recommendation Output

```ts
type ClinicCandidate = {
  clinicId: string;
  name: string;
  location: string;
  supportedLanguages: string[];
  specialties: string[];

  reasonForMatch: string[];
  cautionNotes: string[];

  recommendedItems?: ClinicItemRecommendation[];
  bookingUrl?: string;
};
```

### 12.5 Clinic Summary Report

SIASIU can generate a clinic-facing summary.

```txt
- 사용자 주요 고민
- 현재 루틴
- 최근 사용 제품
- 민감 반응 이력
- 회피 성분
- 목표
- 기대 수준
- 언어 선호
```

---

### 12.6 Clinic Item Recommendation

피부과 추천은 병원명만 보여주면 안 된다.  
고객의 피부·건강상태를 기준으로 어떤 항목이 왜 후보인지 설명해야 한다.

```ts
type ClinicItemRecommendation = {
  itemName: string; // e.g. skin consultation, laser, acne care, hydration care
  reasonForFit: string[];
  expectedBenefit: string[];
  limitations: string[];
  possibleRisks: string[];
  recoveryNotes?: string[];
  questionsToAskClinic: string[];
  confidence: "high" | "medium" | "low";
};
```

User-facing style:

```txt
Jessica님 기록을 보면, 지금은 단순 이벤트 시술보다 장벽 상태와 붉어짐을 먼저 확인해줄 수 있는 상담형 피부과가 더 적합해 보여요.

후보 항목:
- 피부 장벽/홍조 상담
- 보습·진정 관리
- 색소 상담은 가능하지만, 현재 민감도가 높다면 강한 시술은 보수적으로 접근

기대:
- 현재 상태를 더 정확히 확인
- 홈케어로 가능한 부분과 시술이 필요한 부분 구분

리스크/한계:
- 시술은 피부 상태에 따라 자극이 될 수 있음
- 회복기간과 사후관리를 반드시 확인해야 함
```

---

## 13. API Design

### 13.1 Auth

```http
POST /api/auth/signup
POST /api/auth/login
POST /api/auth/logout
GET  /api/me
```

### 13.2 Profile

```http
GET    /api/profile/skin
PUT    /api/profile/skin
POST   /api/profile/routine
PUT    /api/profile/routine/:routineId
POST   /api/profile/reaction
GET    /api/profile/history
GET    /api/memory
GET    /api/memory/consultations
GET    /api/memory/purchases
GET    /api/memory/reactions
POST   /api/memory/reaction
DELETE /api/memory/:memoryId
GET    /api/profile/health
PUT    /api/profile/health
GET    /api/profile/personal-color
PUT    /api/profile/personal-color
POST   /api/profile/supplement-history
```

### 13.3 AI Consultation

```http
POST /api/consultation/text
POST /api/consultation/voice
GET  /api/consultation/:consultationId
GET  /api/consultation/history
```

### 13.4 Paid AI Call

```http
POST /api/call/start
POST /api/call/stream
POST /api/call/end
GET  /api/call/:callId/summary
```

Server must check:

```txt
membershipTier === "paid"
```

### 13.5 Product / Supplement

```http
GET /api/products/:productId
GET /api/products/search
GET /api/products/:productId/evidence
GET /api/products/:productId/ingredients
GET /api/supplements/:supplementId
GET /api/supplements/search
GET /api/supplements/:supplementId/evidence
GET /api/supplements/:supplementId/ingredients
GET /api/color-cosmetics/search
GET /api/color-cosmetics/:productId
```

### 13.6 Recommendation

```http
POST /api/recommendation/generate
GET  /api/recommendation/:recommendationId
POST /api/recommendation/:recommendationId/feedback
```

### 13.7 Dermatology

```http
POST /api/clinic/recommend
GET  /api/clinic/:clinicId
POST /api/clinic/summary-report
POST /api/personal-color/analyze-photo
POST /api/personal-color/shop-recommend
```

Server must check:

```txt
membershipTier === "paid"
```

---

## 14. Suggested Tech Stack

### 14.1 Frontend

```txt
- Next.js or React Native / Expo
- Tailwind CSS
- Zustand or Jotai for client state
- TanStack Query for server state
- i18n support from day 1
```

### 14.2 Backend

```txt
- Node.js / NestJS or FastAPI
- PostgreSQL
- pgvector or dedicated vector DB
- Redis for cache/session
- Object storage for images/OCR files
```

### 14.3 AI Layer

```txt
- Open-source LLM for basic consultation, classification, query planning
- Premium LLM for hard cases
- ASR for voice input
- TTS and realtime voice stack for paid AI call
- Rule engine for claim/safety guardrails
```

### 14.4 Search Layer

```txt
- Hybrid search: keyword + vector + graph traversal
- Ingredient graph
- Supplement nutrient/ingredient graph
- Product evidence index
- Supplement evidence index
- Routine conflict graph
- Supplement overlap checker
- Lifestyle plan generator
- Memory-based follow-up recommendation
- Source reliability ranking
```

---

## 15. LLM Task Split

### 15.1 Local / Open-source LLM

```txt
- Intent classification
- Follow-up question generation
- User profile field extraction
- Relevant memory retrieval
- Emotional response drafting
- Basic routine analysis
- Product evidence summarization
- Multilingual basic response
- Query planning
```

### 15.2 Premium LLM

```txt
- Complex routine conflict analysis
- Ambiguous active ingredient cases
- High-quality multilingual answer
- Long consultation summary
- High-empathy consultation response
- Long-term memory synthesis
- Paid AI call reasoning support
- Clinic summary report refinement
```

### 15.3 Rule Engine

```txt
- Medical claim blocking
- Paid feature gating
- Dangerous certainty detection
- Ingredient conflict hard rules
- Missing data penalty
- Memory privacy rules
- Emotional tone guardrails
- Country-specific wording restrictions
```

---

## 16. Database Tables

Suggested initial schema:

```txt
users
user_skin_profiles
user_routines
routine_steps
user_reaction_events
user_health_profiles
user_supplement_histories
products
product_ingredients
ingredients
ingredient_synonyms
evidence_sources
product_evidence_sources
supplements
supplement_ingredients
supplement_evidence_sources
reviews
review_patterns
consultations
consultation_messages
consultation_memories
purchase_memories
reaction_memories
preference_memories
lifetime_memory_summaries
personal_color_profiles
color_cosmetics
personal_color_shops
recommendations
recommendation_product_candidates
clinics
clinic_specialties
clinic_items
clinic_item_recommendations
clinic_recommendations
membership_subscriptions
ai_call_sessions
```

---

## 17. MVP Scope

### 17.1 Must Build

```txt
- User signup/login
- Skin profile onboarding
- Long-term memory foundation
- Routine input
- Text AI consultation
- Voice input consultation
- Human-like emotional response style
- Product DB
- Supplement DB
- Color cosmetics DB
- Personal color profile
- Ingredient/nutrient normalization
- Product evidence records
- Recommendation generation
- Cosmetic/supplement/color cosmetics candidate explanation
- Free/Paid gating
- Consultation/purchase/reaction memory save and recall
```

### 17.2 Should Build

```txt
- Review pattern analysis
- Data confidence display
- Routine conflict graph
- Supplement overlap checker
- Lifestyle plan generator
- Memory-based follow-up recommendation
- Paid AI call beta
- Dermatology recommendation beta
- Personal color photo analysis beta
- Personal color shop recommendation beta
```

### 17.3 Do Not Build First

```txt
- Huge product marketplace
- Too many categories
- Complex social features
- Public EWG score display
- Fully automated medical-style diagnosis
```

---

## 18. Initial Development Milestones

### Phase 1 — Product SIASIU

```txt
- Define target country/language
- Define first 3 skin concerns
- Build onboarding flow
- Build skin + health profile schema
- Build lifetime memory schema
- Build product-free home
```

### Phase 2 — AI Consultation MVP

```txt
- Text consultation
- Voice input
- Follow-up question engine
- Structured profile extraction
- Emotional tone controller
- Memory recall before answer
- Basic skin + health risk cards
- Personal color photo analysis beta
```

### Phase 3 — Cosmetic + Supplement + Color Brain

```txt
- Product evidence DB
- Supplement evidence DB
- Ingredient normalization
- Ingredient/product search
- Routine conflict rules
- Cosmetic/supplement/color candidate ranking
- Purchase/reaction memory integration
```

### Phase 4 — Paid Layer

```txt
- Membership gating
- Paid AI call beta
- Paid dermatology recommendation
- Paid personal color shop recommendation
- Clinic-facing summary report
```

### Phase 5 — Feedback Loop

```txt
- Product usage feedback
- Reaction tagging
- Recommendation revision
- Long-term user profile learning
```

---

## 19. Example Consultation

### 19.1 User Input

```txt
요즘 피부가 건조하고 따가워요. 레티놀도 쓰고 있는데 계속 써도 될까요? 잠도 잘 못 자고 스트레스도 많아요.
```

### 19.2 AI Internal Steps

```txt
1. Intent: routine_analysis + possible_irritation
2. Missing info:
   - 레티놀 농도
   - 사용 빈도
   - 같이 쓰는 active
   - 세안제 종류
   - 보습제 여부
   - 수면 시간/수면 질
   - 스트레스 수준
   - 현재 복용 중인 영양제
3. Ask follow-up questions
4. Update routine profile
5. Search ingredient/routine conflict graph
6. Generate hypothesis
```

### 19.3 User-Facing Answer Style

```txt
입력하신 정보만 보면, 지금은 레티놀 효과를 더 높이기보다 자극 변수를 먼저 줄이는 것이 좋아 보입니다.

가능성이 높은 시나리오:
1. 장벽 약화 가능성: 높음
2. active 과사용 가능성: 중간~높음
3. 단순 보습 부족 가능성: 중간

먼저 확인하고 싶은 질문이 있어요.
현재 레티놀은 주 몇 회 사용하시고, 제품 농도나 이름을 알고 계신가요?
그리고 최근 수면 시간, 스트레스 수준, 복용 중인 영양제가 있다면 함께 알려주세요.
```

### 19.4 Cosmetic / Supplement Candidate Style

```txt
이 제품은 현재 플랜에서 “장벽 회복 보조 후보”입니다.

추천 이유:
- 강한 active가 중심인 제품이 아님
- 현재 루틴의 자극 가능성을 낮추는 방향과 맞음
- 향료/산/고농도 레티놀 중심 제품이 아님

주의:
- 정확한 active 농도 자료는 확인되지 않았습니다.
- 사용 후 따가움이 심해지면 중단하고 기록해야 합니다.
```

---

## 20. Key Product Rules

```txt
1. Cosmetic and supplement products are never the first answer.
2. Always define the problem before recommending.
3. Always show why and why not.
4. Missing data must be visible.
5. EWG is background only.
6. Active ingredients are context-dependent.
7. Natural does not mean safe.
8. Safe does not mean effective.
9. Paid AI call and dermatology recommendation are premium features.
10. SIASIU is a consultation center, not a pharmacy shelf.
11. No drug prescription.
12. Supplements are candidates, not prescriptions.
13. Lifestyle comes before supplement selling.
14. The app must feel like a caring human consultant, not a cold chatbot.
15. Consultation, purchase, and reaction history should become long-term relationship memory.
16. Personal color is a hypothesis when based on photos, not an absolute diagnosis.
17. Clinic recommendation must explain suitable items, expectations, limitations, and risks — not just promote events.
```

---

## 21. Open Questions

### Product

```txt
- 첫 타깃 국가는 어디인가?
- 첫 3개 피부 고민은 무엇으로 시작할 것인가?
- 첫 3개 건강/생활방식 문제는 무엇으로 시작할 것인가?
- 영양제 카테고리는 수면/피부/체중/장건강 중 어디부터 시작할 것인가?
- 장기 메모리는 무료/유료에서 어디까지 제공할 것인가?
- 고객이 삭제할 수 있는 메모리 범위와 UI는 어떻게 설계할 것인가?
- 감정이 느껴지는 상담 톤의 기준은 어떻게 테스트할 것인가?
- 퍼스널컬러 사진 분석은 어떤 조명/품질 기준을 통과해야 하는가?
- 색조 화장품 DB는 립부터 시작할 것인가, 쿠션/파운데이션까지 함께 시작할 것인가?
- 피부과 항목 추천에서 시술명, 기대효과, 리스크 설명의 표준 템플릿은 어떻게 만들 것인가?
- 한국 피부과 추천은 서울 중심인가, 전국인가?
- 피부과와의 파트너십은 예약 수수료 모델인가, 리드 모델인가?
```

### Technical

```txt
- 첫 오픈소스 LLM은 무엇을 사용할 것인가?
- 제품 성분/농도 데이터와 영양제 용량/형태 데이터는 어디까지 자동 수집하고 어디부터 수동 검수할 것인가?
- GBrain류 search layer를 별도 서비스로 만들 것인가, SIASIU backend 안에 포함할 것인가?
- graph DB를 쓸 것인가, PostgreSQL + edge table로 시작할 것인가?
```

### Compliance

```txt
- 국가별 화장품 광고 표현 규제는 어떻게 관리할 것인가?
- AI 답변의 의료 경계선을 어떻게 정의할 것인가?
- 피부과 추천 시 책임 범위와 고지 문구를 어떻게 설계할 것인가?
```

---

## 22. Developer Build Principle

```txt
Build the skin + health consultation engine and lifetime memory layer first.
Build the cosmetic/supplement marketplace second.
Build the paid clinic/call layer third.
```

가장 위험한 실수:

```txt
쇼핑몰 기능을 먼저 많이 만드는 것.
```

가장 중요한 초기 검증:

```txt
사용자가 제품을 보기 전에 상담을 시작하는가?
사용자가 “내 문제가 정리됐다”고 느끼는가?
상담 결과 후 제품 후보를 더 신뢰하는가?
```

---

## 23. Suggested Repository Structure

```txt
siasiu/
  apps/
    web/
    mobile/
    admin/
  services/
    api/
    ai-orchestrator/
    brain-search/
    ingestion/
    realtime-call/
  packages/
    ui/
    types/
    config/
    guardrails/
    prompts/
    memory/
  data/
    seed/
    ingredient-taxonomy/
    supplement-taxonomy/
    routine-rules/
    lifestyle-rules/
  docs/
    system-design.md
    product-principles.md
    ai-guardrails.md
    memory-design.md
    emotional-tone-guide.md
    api-spec.md
```

---

## 24. Final Definition

```txt
SIASIU is an AI-first skin, health, and personal color consultation platform that remembers each customer's consultation, purchase, color, and reaction history, helps them understand their skin, health, and beauty context, builds evidence-informed skincare, supplement, color cosmetics, and lifestyle routines, and only then connects to products, Korean dermatology services, or personal color shops when appropriate.
```

Korean version:

```txt
SIASIU은 K-beauty 제품을 먼저 파는 앱이 아니라, 사용자의 피부상태·건강상태·퍼스널컬러·시술 니즈를 함께 이해하고, 상담기록·구매기록·사용 후 반응을 오래 기억하며, 화장품·건강제품·색조 제품·생활방식 루틴을 설계한 뒤 필요한 제품과 한국 피부과/퍼스널컬러 샵 연결을 단계적으로 제안하는 AI 상담형 커머스 플랫폼이다.
```

---

## 25. AI-Based Commerce — Commerce Brain (Discovery & Judgment Layer)

> 방향 정본(2026-06-18): 카페24 등 호스티드 몰의 검색은 키워드 매칭이다. SIASIU은 BOM(BomBrain)형 **의미·근거·판단 검색 엔진을 커머스에 이식**한다. 결제·물류·정산·카탈로그 정본은 빌리되(헤드리스), **발견·이해·판단·가격 결정 레이어는 소유**한다. 이것이 "진짜 AI 베이스드 커머스"의 정의다.

### 25.1 핵심 명제

```txt
커머스 엔진(결제·물류·체크아웃)은 빌린다.
'이해·검색·판단 브레인'은 소유한다.
우리 브레인이 플랫폼의 약한 native 검색을 *대체*하고, 체크아웃만 플랫폼에 넘긴다.
```

### 25.2 상품 원자화 (Product Atomization) — "모든 정보를 다 쪼갠다"

상품 1개를 검색이 충분히 반영할 수 있는 **구조화 원자(atom)** 로 분해해 인덱싱한다. (BomBrain Raw→Clean→Diet→Card/atoms 파이프라인을 상품 도메인에 적용.)

```ts
type ProductAtom = {
  productId: string;
  kind:
    | "ingredient"        // INCI·농도(confirmed/estimated/unknown)·역할·자극 가능성
    | "suitability"       // 피부타입·고민·민감도 매칭 / 회피 성분
    | "texture_finish"    // 텍스처·향·끈적임 / 색조: 언더톤·명도·피니시·셰이드
    | "evidence"          // 인증·임상·브랜드자료·리뷰패턴 + 신뢰등급
    | "supplement"        // 용량·형태·중복 위험·목표 태그
    | "claim"             // 마케팅 표현(효능 단정 분리)
    ;
  value: Record<string, unknown>;
  evidence?: { sourceId: string; reliability: "high"|"medium"|"low" };
  confidence: "confirmed" | "estimated" | "unknown";
};
```

- **휘발성 분리(헌법):** 가격·재고는 원자/지식에 박지 않는다 → 백엔드에서 live 조회. (BOM "가격 침묵" 규칙과 동형.)
- **그래프 엣지:** `성분→자극`, `루틴→충돌`, `영양제→중복`, `제품→suitable_for(고민/피부타입)` 를 SQLite/edge table로. 관계를 타고 판단.

### 25.3 이해·판단 파이프라인 (봄 그대로, 도메인만 상품)

```txt
고객 발화/니즈
 → TurnFrame (의미 의도 분해·누락·위험)               [Understanding Gate 재사용]
 → 하이브리드 검색(BM25 + 벡터 + 그래프 + RRF, 상품 원자 위)
 → CLIR (해외고객 다국어: 원문 보존 · 질문 이동 · 사용자 언어 답변)
 → Evidence 게이트 (농도 unknown→추천강도↓ · 근거 없으면 단정 X)
 → 적합성·민감도·예산 + 고객 반응(SIASIU 메모리) 랭킹
 → 판단형 후보: "왜 맞나 / 왜 제외 / 주의 / 부족한 데이터"
```

= "검색 결과 나열"이 아니라 **판단**. 이것이 AI 베이스드 커머스의 급소.

### 25.4 AI 가격·딜 엔진 (범위 내 동적 가격)

```txt
입력:  고객 반응(메모리) · 재고 · 마진 · 재구매 확률 · 가격 민감도
출력:  마진 하한선(floor) 안에서 개인화된 '딜/쿠폰/번들'
규칙:
- 표시가 차등(개인별 sticker price)은 신뢰·법적 리스크 → 금지.
- 개인화는 '오퍼/딜' 형태로. (반응 좋은 고객 특별 딜, 망설이는 고객 첫구매 딜 등)
- floor 항상 유지(AI가 마진 아래로 못 내려감).
- 모든 가격·딜 결정은 근거 + 감사 로그(행동 진실).
```

### 25.5 소유 vs 빌림 + 플랫폼 선택

```txt
소유(직접):  ingest·원자화 · 의미/그래프 검색 · 근거·판단 · CLIR · 개인화 랭킹 · AI 가격·딜 엔진
빌림(연동):  카탈로그 정본 · 체크아웃 · 결제(PG) · 물류 · 정산
```

| 플랫폼 | 동적 가격·개인화 자유도 | 판정 |
|---|---|---|
| Medusa (오픈소스) | 가격·프로모션 로직을 코드로 직접 소유. 헤드리스. | 자유도 최고 · 우리 모델 최적 |
| commercetools | Price Selection·커스텀(엔터프라이즈) | 강하나 고비용 |
| Shopify Plus | Discount Functions + B2B 가격리스트 + 헤드리스 + 글로벌 | 실용적 |
| 카페24 / 스마트스토어 | 회원등급가·쿠폰만, 실시간 개인 동적가 불가 | 이 비전엔 부족 |

> 결론: 이 비전이 진심이면 **처음부터 헤드리스**(Medusa 권장 / Shopify Plus 실용). 카페24 native 검색은 버리고 우리 Commerce Brain을 앞단에 둔다.

### 25.6 가드레일 (신뢰·법규)

```txt
- 개인별 표시가격 차등 금지 → 개인화 '딜/오퍼'로.
- 마진 floor 불가침.
- 의료·효능 단정은 코드 게이트가 차단(검색·추천·가격 카피 전부).
- 가격·재고는 휘발성 → live 조회, 지식에 박지 않음.
- 모든 추천·가격 결정에 근거·감사 로그(행동 진실).
```

### 25.7 BomBrain → Commerce Brain 이식 매핑

```txt
RRF·max-pool·source-tier            → 상품 후보 융합 랭킹
Evidence/grounding/gap              → 농도·근거 기반 추천강도·정직한 침묵
CLIR(원문보존·질문이동)              → 해외고객 다국어 상품검색
Diet/Card 파이프라인                → 상품 원자화(성분·근거 카드)
zero-LLM self-wiring graph(edges)   → 성분·루틴·영양제·고민 관계 그래프
물리신호 우선 + LLM 타이브레이커      → 규칙·필터 우선, 모호할 때만 LLM
```
