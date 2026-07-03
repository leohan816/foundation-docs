# SIASIU 회원 · 신원 · 로그인 설계서 (정본)

> **버전 v0.1 · 2026-06-21 · Phase 2 (회원 + 개인화)**
> "안정적 신원"이 메모리·기록·추천의 **척추**. = 공개 MVP의 조건.
> 정합: [메모리 설계서 §11(도메인)], [가드레일 설계서], [COSMILE 연동 설계서], SCHEDULE Phase 2/5.
>
> **변경이력**
> - **v0.1 (2026-06-21)** — 최초. 로그인(Google·Apple·Email, 카카오·네이버 제외) · 안정 user_id · 스마트 진입 · 메모리 바인딩. 구현: `login.html`·`onboarding.html` + `consult/product` userId 정렬. 검증: 대화→재방문 회상 OK.

---

## 0. 왜 — 신원이 척추다
재방문하면 설문 없이 *바로 그 사람으로* 이어지려면 **안정적 신원**이 필요하다. 신원이 없으면 기억·기록·추천이 어디에 붙을지 모른다. → **공개 MVP = Phase 1(기억) + Phase 2(신원).**

## 1. 신원 모델 — 안정 user_id
로그인 시 **하나의 안정 `user_id`** 를 확립 → 메모리·채팅·구매·추천이 전부 여기에 매달린다.
- **규칙(우선순위):**
  1. `Store.userId` 이미 있으면 그대로(세션 지속).
  2. 이메일 있으면 → `provider:email`(소문자) — 로그아웃해도 안정.
  3. 이메일 없는 **데모 소셜** → `provider:name`(결정론) — *재로그인해도 같은 기억*.
  4. **실제 OAuth** → `provider:sub`(Google/Apple 고유 id, 불변).
- **저장:** `Store(localStorage).userId`. 백엔드는 이 문자열을 키로 메모리 조회/저장.
- **정렬 완료(✅):** `consult.html`·`product.html`이 `Store.userId` 사용. (이전엔 매번 email/name으로 새로 만들어 신원이 흔들렸음.)

## 2. 로그인 수단 — Google · Apple · Email
- **카카오·네이버 제거** (Leo 2026-06-21) — 글로벌 타깃 + 단순화.
- **Email** — 우리 것. *지금 진짜 동작*.
- **Google** — client-side OAuth(Google Identity Services). `GOOGLE_CLIENT_ID` 넣으면 *진짜 자동 전환*. HTTPS Pages OK. (프로토타입은 데모 폴백.)
- **Apple** — "Sign in with Apple"은 **애플 개발자계정 + 백엔드 토큰검증**이 필수(정적 사이트 불가) → 지금은 **UI만**, 진짜 연동은 Phase 5/6.
- **★ 플랫폼 적응:** Apple 버튼은 **애플 기기(iOS/Mac)에서만** 표시. 안드로이드/웹 = Google·Email로 — *아무도 안 막힘*(Google+Email이 보편 커버).

## 3. 스마트 진입
로그인 → `onboarded` 플래그 확인:
- **신규**(미완료) → 온보딩(설문) 1회 → 완료 시 `onboarded=true`.
- **재방문**(완료) → 설문 스킵 → **개인화 홈** 직행.

## 4. 메모리 바인딩 (Phase 1 ↔ Phase 2 연결)
- 로그인 신원(user_id) → consult/recall/pitch가 그대로 사용 → **기억이 그 사람에게 영구히** 붙는다.
- 메모리 도메인(메모리 설계서 §11)도 *같은 user_id* 위에서 advisory/cs 쓰기 격리·읽기 공유.
- **검증(2026-06-21):** `google:지수`로 대화 → 재방문 → "건조함 고민" 정확 회상 + 회피=레티놀 + returning=True. ✅

## 5. 개인화 홈 (다음 — Phase 2 #2)
메모리 기반으로 홈이 *올 때마다 그 사람 것*(체크인·추천·인사). → 별도 절로 설계 예정.

## 6. 보안 · 프라이버시
- 데모: OAuth 토큰을 client-side(JWT 디코드)로 email/name만 취득. **프로덕션은 서버측 검증 필수**(Phase 6).
- PIPA 동의 · 최소 수집 · 민감정보 미수집. 로그인 기록은 `/api/login`→`data/logins.txt`(로컬 데모).

## 7. 향후 (Phase 5 — COSMILE)
진짜 소셜 OAuth + **계정 병합**(provider id → email → 폰/CI → 연결) + 콜드스타트. 정본: `SIASIU_COSMILE_연동설계_신원매칭.md`.

## 8. 완료 기준 (Phase 2)
같은 회원 재방문 → 설문 없이 **개인화 홈 + 지난 기록 + 정확 추천**. = *공개 가능 상태*.
