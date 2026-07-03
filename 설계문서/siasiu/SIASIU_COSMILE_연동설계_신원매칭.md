# SIASIU ↔ COSMILE 연동 설계 — **Core API 연동** · 신원 매칭 · 데이터 연동

> **버전 v1.3 · 2026-06-24** · Leo 결정 + Claude 정리
> 한 줄(★헤드라인): **SIASIU = Foundation Core API · COSMILE = 그 Core를 *호출하는* Commerce Shell(코어 복사 ❌).** 그 위에서 — *신원은 키 매칭, 데이터(구매이력)는 읽기전용 연동*으로 같은 사람·구매를 잇는다.
> → 즉 이 문서는 *신원매칭만이 아니라* **3겹 연동**: ①**Core(판단)=API 호출**(§0.5·주) ②신원 매칭(§1) ③데이터 연동(§2). *코어가 연동의 중심이 됐다.*
>
> **변경이력**
> - **v1.4 (2026-06-25)** — ★§0.5에 *상품 canonical = Foundation 공통 자산* 정정 추가(Cosmile 소유 ❌·canonical↔projection 패턴·vault가 이미 Foundation Product Core·write-ownership을 COSMILE 주도→canonical=Foundation으로). "상품은 Foundation이 이해하고·Cosmile이 팔고·SIASIU가 상담한다." CLAUDE.md §4 정정 필요 플래그.
> - **v1.3 (2026-06-24)** — ★문서 범위 확장 명시: *신원매칭 → Core API 연동이 중심.* 제목·헤드라인을 Core 연동으로 승격(신원·데이터는 그 위의 연결 기제). 내용은 v1.2와 동일.
> - **v1.2 (2026-06-24)** — ★§0.5 **Core API 모델** 추가: SIASIU=Intelligence Core(API)·COSMILE=Commerce Shell(호출자·복사 ❌). 판단 truth source=샤슈 하나(지식 갈라짐 방지). 역할분담·API 계약(6 엔드포인트·오늘 모듈이 이미 내장)·★제품 DB=INTAKE_FORMAT 호환(유일한 NOW 전제)·Phase 1~4 연결·CLAUDE.md §4 갱신 필요 명시.
> - **v1.1 (2026-06-19)** — §5 콜드스타트 부트스트랩 추가(COSMILE 구매이력+가입정보로 신규 고객을 첫날부터 개인화 · UX는 "조용히" · 법적 동의는 연결 시 확보).
> - **v1.0 (2026-06-19)** — 최초. 독립 원칙·신원 매칭·읽기전용 주기 연동.

---

## 0. 대원칙 — 독립 + 읽기전용 + DB 분리

- **독립 시스템으로 본다.** SIASIU과 COSMILE은 관계가 좋지만, **나중의 회계·법인 분리를 대비해 처음부터 분리**한다. (Leo 결정)
- **DB를 공유하지 않는다.** SIASIU은 **자체 DB**를 갖는다. COSMILE 데이터는 *가져온 사본(mirror)*으로만 보유.
- **읽기 전용(read-only).** SIASIU은 COSMILE에 **쓰지 않는다.** → COSMILE 데이터 안전, 결합 최소.
- **SIASIU의 1차 목적:** COSMILE 구매 이력을 읽어 **"고객이 무엇을 샀는지"** 안다 → 상담·기억·코칭(나의 여정)에 활용.
- **구매 데이터는 섞지 않는다.** COSMILE 매출과 (혹시 생길) SIASIU 자체 매출은 **별도 장부.**
- **성장:** COSMILE의 대규모 기존 고객 = SIASIU의 **홍보·획득 채널.**

---

## 0.5 ★★ SIASIU = Foundation Core API · COSMILE = Commerce Shell (호출자·복사 ❌) — Leo 2026-06-24
**결정:** 출시 전까지 COSMILE은 SIASIU 코어를 **복사·이식하지 않는다.** SIASIU **Core를 API로 호출**해 쓴다.
> 한 줄: **SIASIU = Intelligence Core(뇌) / COSMILE = Commerce Interface(얼굴·손).** 샤슈는 뒤에서 판단, 코스마일은 고객이 보고 산다.

**왜 (★중요):** 샤슈 코어는 *오늘처럼 매일 업데이트*된다 → 복사하면 *지식이 갈라진다*(샤슈는 레티닐프로피오네이트 보수, 코스마일은 옛 로직으로 조건부 추천 → 위험). → **판단 truth source = 샤슈 하나.** 코스마일이 좋아지는 건 *코드 안 바꿔도 API 응답이 좋아져서.* (= 둘이 동시에 똑똑해짐.) 이 구조는 코스마일뿐 아니라 *라이브커머스·인스타DM·브랜드 관리자·B2B discovery* 등 **여러 클라이언트가 같은 코어**를 쓰는 진짜 Foundation 구조.

**역할 분담:**
| SIASIU Core (intelligence·복사 ❌) | COSMILE Shell (commerce·자체 개발) |
|---|---|
| judge_real·claim_check·interaction_edges | 상품/브랜드/회원/주문/결제/장바구니 |
| search(trigger·planner·retrieval·grading)·memory | 상품 상세 UI·브랜드관·유통문의·관리자 |
| LLM 표현층·제품 성분 해석·persona 판단 | **AI 결과 *표시* UI**(판단은 API가) |

**★상품 canonical = Foundation 공통 자산 (정정 2026-06-25 — Leo):** 위 표의 "상품/브랜드"는 *판매 표시·commerce overlay*를 뜻함. **상품 *canonical*(정체성·atom·claim·근거·다국어명)은 Cosmile 소유가 아니라 Foundation 공통 자산이고, Cosmile/SIASIU는 그 위의 *projection(읽기뷰)*.** ★`~/Project/foundation-vault`(제품 스파인+지식)가 *이미 그 Foundation Product Core* — 추출 시 그대로 Foundation 저장소가 됨.
- **Foundation(단일 진실·intake/큐레이션이 씀):** canonical_product/brand·ingredient_atoms·claims·evidence_refs·localized_names·target_concerns·skin_type_tags·product_cards·distilled_answer_cards.
- **Cosmile(commerce overlay만·`canonical_product_id`로 join):** price·stock·sku·option·discount·shipping·display_images·sales_status·cart·order·payment·refund·admin.
- **SIASIU(projection):** 상담·적합성 판단 뷰.
- 패턴: *한 상품 = id 하나·여러 얼굴.* canonical 복제 ❌·각 consumer는 자기 store에 overlay만.
→ 한 줄: **상품은 Foundation이 *이해*하고 · Cosmile이 *팔고* · SIASIU가 *상담*한다.** ★**CLAUDE.md §4 "products=COSMILE 주도"는 → "canonical=Foundation·Cosmile=overlay"로 정정 필요**(write-ownership 변경·Leo 승인 후).

**Core API 계약(초안·필요 최소):**
`POST /v1/products/analyze`(intake·성분 mapping·claim 추출) · `/v1/judge/product`(제품×persona) · `/v1/judge/compare`(A vs B) · `/v1/claims/check`(상세 claim 검수) · `/v1/search/tasks`(trigger+planner) · `/v1/presentation/customer`(judge_result→고객 문장).
※ **오늘까지 만든 모듈이 이미 이 엔드포인트 내장**(judge_product_full·claim_check·search_triggers·query_planner). HTTP 래핑만 나중에.

**★지금 당장 맞출 단 하나 — COSMILE 제품 DB = 샤슈가 읽기 좋게(= `INTAKE_FORMAT` 호환):**
`product_id·brand_id·brand_name·product_name·category·ingredients_raw·ingredients_ordered·claims_raw·usage_raw·cautions_raw·source_urls·country·language·version·updated_at`. → 코스마일은 *처음부터 API를 붙일 필욘 없지만, 상품 DB 구조는 호환형*으로(느슨한 연결의 유일한 전제).

**단계적 연결(느슨한 연결 전제):**
1. **Phase 1** — 코스마일 독립 몰(상품/브랜드/구매/관리자) · 샤슈 별도 개발 · *단 제품 DB는 호환형.*
2. **Phase 2** — *관리자용* AI 검수 먼저(고객 비공개): 상품 등록 → "샤슈 분석" → claim 충돌·성분 mapping·미매핑 비율·주의사항. *가장 안전.*
3. **Phase 3** — 상품 상세 *고객용* AI 상담 버튼("이 제품 나에게 맞나요?") → `POST /judge/product` → judgment·confidence·reason·cautions·claim_conflicts·interactions.
4. **Phase 4** — 고객 memory 연결(향료 따가움·수유 중·레티놀 입문자) → 개인화 판단.

**★ CLAUDE.md §4 갱신 필요:** 현 "볼트 복사 모델"(각 프로젝트가 knowledge/products 복사·런칭 시 독립)은 *데이터* 얘기 — **판단 *코어*는 복사 ❌·API.** 제품 데이터는 같아도(둘이 100% 동일 제품) *판단 로직은 샤슈만.* → 전략: *샤슈는 깊게·코스마일은 가볍게·코어는 복사 ❌·코스마일은 API 호출·제품 DB만 처음부터 호환.*

---

## 1. 신원(아이디) 매칭 설계 ★

**목표:** COSMILE 회원과 SIASIU 사용자가 *같은 사람*인지 안전하게 잇는다.

**개념: 열쇠 ≠ 집.**
- **열쇠(로그인 방법):** 구글·카카오·이메일 — 문 여는 수단.
- **집(신원):** 그 사람의 회원 번호. 열쇠가 여러 개여도 **집은 하나.**
- 한 사람 = 하나의 SIASIU `user_id`, 거기에 여러 로그인·외부ID를 매핑.

### 매칭 키 (우선순위)
1. **소셜 제공자 고유 ID** (같은 제공자일 때 가장 강함): 구글/카카오는 사람마다 안 변하는 고유 ID(`sub`)를 줌. COSMILE과 SIASIU이 *같은 구글*로 받은 `sub`가 같으면 동일인. ✅
2. **이메일**: 양쪽 이메일 일치 → 동일인 추정. (대개 통하나 100%는 아님 — 다른 이메일 쓸 수 있음.)
3. **휴대폰 / 본인인증 CI**: 한국 표준, 가장 확실. 둘 다 폰 인증 시 CI 일치로 **확정.**
4. **명시적 연결("이미 COSMILE 회원이세요? → 연결하기")**: 위로 안 잡히는 교차 케이스(예: COSMILE=구글, SIASIU=카카오)에서, 사용자가 한 번 COSMILE 로그인 → 두 계정 매핑 저장. **제일 확실한 폴백.**

### 권장: "코스마일 계정으로 로그인" (제일 깔끔)
- SIASIU 로그인에 **"코스마일 계정으로 로그인"**을 추가(카카오 로그인과 동일 방식).
- 그러면 새 계정 없이 COSMILE #id로 바로 → **매칭 문제 자체가 안 생김.**
- 단 독립을 위해 SIASIU은 *자체 user 테이블*을 갖되, `cosmile_id` 필드로 연결만.

### SIASIU DB — 신원 매핑 테이블 (개념)
```
foundation_user
  user_id        ← SIASIU 고유 (집)
  cosmile_id     ← 매칭된 COSMILE 회원번호  (nullable)
  google_sub     ← 구글 고유ID            (nullable)
  kakao_id       ← 카카오 고유ID          (nullable)
  email
  phone / ci     ← 본인인증 시
  link_method    ← provider_id | email | phone | manual
  linked_at
```
→ 한 `user_id`에 여러 열쇠(google/kakao)와 `cosmile_id`를 매핑. **"열쇠 여러 개, 집 하나."**

---

## 2. 데이터 연동 설계 — 주기적 읽기 (실시간 직접 DB 접근 ❌)

- **❌ 실시간으로 COSMILE DB 직접 조회:** 결합이 너무 강해지고, 그쪽 MySQL 스키마가 바뀌면 우리가 깨짐. (안티패턴)
- **✅ COSMILE의 읽기 전용 API(또는 읽기 전용 복제본)에서 주기적 pull:**
  - 같은 회사라 내부 read-only API 하나면 깔끔: `GET /orders?since=…`, `GET /members/:id`.
  - **주기:** 우선 **배치(예: 1시간~하루)**. 나중에 코칭이 *당일 반응*을 원하면 **주문 webhook**을 추가(하이브리드).
  - **API가 DB 직접보기보다 나은 이유:** API = 안정적 계약. 그쪽이 내부를 바꿔도 우리는 안 깨짐.
- SIASIU은 가져온 구매 이력을 **자체 DB에 `외부구매이력(source=COSMILE)`으로 저장** → 메모리·코칭에 활용.

```
COSMILE (NestJS+MySQL)
   │  read-only API : GET /orders?since=…
   ▼  (주기적 pull, 예: 1h)
SIASIU DB : external_purchases(source=COSMILE, member#, item, date)
   ▼
나의 여정 / 코칭 ("지난번 진정세럼 어떠셨어요?")
```

---

## 3. 구매 데이터 분리 원칙 (회계 독립)

- COSMILE에서 가져온 구매 = **읽기 전용 사본, "COSMILE 매출"로 표시.** SIASIU 거래가 아님.
- 혹시 SIASIU 자체 판매가 생기면 → **별도 테이블·별도 매출.** **두 장부를 절대 섞지 않음.**
- 이유: 나중에 회계·법인 분리가 깔끔. (Leo 결정)

---

## 4. 성장 — COSMILE 고객 기반 활용

- COSMILE의 기존 대규모 고객 = SIASIU 초기 사용자 풀.
- "당신의 COSMILE 구매를 기억하는 AI 상담"으로 자연스러운 유입·홍보.

---

## 5. 콜드스타트 부트스트랩 — 신규 고객을 첫날부터 안다
봄과 달리 SIASIU은 "기억 0"에서 시작하지 않는다 — COSMILE이 출발점이다.
- 신규 유저도 **COSMILE 구매 이력**을 읽어 *무엇을 샀는지 → 니즈를 어느 정도 추론* + **가입 시 입력한 기본정보**(성별·피부고민 등)로 즉시 개인화.
- **UX 원칙 — "조용히":** 고객에게 "COSMILE에서 데이터를 가져왔어요"라고 **드러내지 않는다.** 처음부터 자연스럽게 아는 코치처럼. (감시당한 느낌 X)
- **단 법적 동의는 확보:** 계정 연결/가입 단계에서 동의를 받아둔다(PIPA). **"조용히"는 *UX 연출*이지 *무동의*가 아니다.** (이 둘을 혼동하면 사고)

## 주의 (정직)

- **이메일 매칭은 100% 아님** → 고위험 매칭(결제·민감정보 연결)은 폰/CI 또는 명시적 연결로만.
- **개인정보보호법:** COSMILE ↔ SIASIU 데이터 이동은 **이용자 동의**(제3자 제공 또는 처리위탁)가 필요. 독립 법인 전제면 더 분명히. 동의·최소수집·암호화는 기본.
- **read-only 고수:** SIASIU은 COSMILE에 절대 쓰지 않는다.
