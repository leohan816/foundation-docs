# SIASIU 상담창(咨询) — COSMILE 참조 가이드 (2026-06-29)

> COSMILE이 SIASIU 상담 경험을 **이식·소비**할 때 *무엇을 보고, 무엇을 호출하고, 어디 설계문서를 참조*하는지의 단일 인덱스.
> ★대원칙(COSMILE 연동 설계서 §0.5): **SIASIU = Foundation Core(판단) API · COSMILE = 그 Core를 *호출하는* Commerce Shell. 두뇌를 복사하지 않는다 — 호출한다.**
> ★상담 정책은 *프롬프트·정책 레이어*에만 묶임(런타임 비종속) → COSMILE 상담 표면이 같은 SIASIU 두뇌를 부르면 **정책을 그대로 상속**(상담 설계서 §10).

---

## A. 상담창은 어떻게 설계되었나 (화면 ↔ 설계 매핑)

| 화면 요소 | 설계 의도 | 정본 설계서 |
|---|---|---|
| 헤더 `在线 · 正参考过往记录`(과거기록 참조 중) | **장기기억 회상** — 재진입 시 과거 에피소드/사실을 컨텍스트로 | `SIASIU_메모리_설계서.md` (v1.4) §7 회상 |
| 상담 말풍선(공감 먼저·짧게·다 안 쏟음·되물음·"지금은 쉬는 게 먼저예요 😊") | **말하기 방식** — 멀티버블·정보폭탄 금지·고객 주도·존댓말 절대 | `SIASIU_상담_대화_설계서.md` (v0.2) §1·§2·§3 |
| 레티놀/임신·장벽약화에 **단정 대신 "천천히 같이"·보류** | **선택적 그라운딩** — 사실/안전은 KB 엄격, 공감/일반케어는 자유 | 상담 설계서 §4 + `SIASIU_가드레일_설계서.md` (v1.1) §1 default-deny·§7 안전 |
| 칩 `지난 그 고민(건조함)` | 메모리 회상 → **추천 칩** | 메모리 설계서 §7 회상+추천칩 |
| 칩 `피하는 성분 점검(레티놀)` | **성분 레지스트리**(atom·주의대상) 조회 | `SIASIU_성분레지스트리_설계서.md` (v0.5) |
| 칩 `제품 찾기(내 피부에 맞는)` / `搜索商品` | **의미 검색(Meaning Bridge)** → PRISM 제품 | `SIASIU_검색아키텍처_설계서.md` (v1.4) + `SIASIU_PRISM_제품레코드_설계서.md` (v0.2) |
| 입력바 `用文字·语音·照片`(텍스트/음성/사진) | 멀티모달 입력 | 검색 설계서 §3 Query Massage |
| 中文 chrome + 한국어 상담 | **모국어 환대/현지화**(시스템 vs 발화언어 분리·경어 유지) | `SIASIU_다국어_환대_설계서.md` (v0.3) · `SIASIU_현지화_설계서.md` (v0.3) |
| 하단탭 `为你(추천)·咨询·教练(코칭)` | 추천·상담·코칭 3축(코칭=리텐션 엔진) | `SIASIU_커머스_쇼핑몰_설계서.md` (v0.4) + foundation-coaching |

## B. 어떤 추천을 하나 (recommendation)

상담은 **제품을 먼저 팔지 않는다** — 이해·기억·근거 후 *필요할 때만* 제안. 추천 경로:

1. **상담 내 자연 추천** — 안전·진정·보습이 먼저라고 판단되면 *성분 방향*(세라마이드·판테놀)을 말로 제안. 구체 제품은 근거(KB) 있을 때만. (상담 설계서 §4·§5)
2. **회상 기반 추천 칩** — 과거 고민/사실에서 "지난 그 고민" 등 칩 생성. (메모리 설계서 §7)
3. **제품 찾기(의미 검색)** — Query Massage → 어휘+의미+큐레이션+메모리 융합(RRF) → 조건부 리랭커 → **Grounding Gate(근거 없으면 "모름")**. (검색 설계서 §2~§6)
4. **회피 성분 점검** — 성분 atom 기준 주의대상/상호작용 확인. (성분 레지스트리 §1.5 명명·§1.7 인용)
5. **제품 레코드** — PRISM(core/claims/ingredients/offers/coverage/locales)에서 적재. offers·가격·재고는 **휘발성**(실시간 조회·지식에 박지 않음). (PRISM 설계서 · 커머스 설계서 §3c)

★추천 안전: 의료·효능·완치 단정 금지, 회피성분 추천 금지 → 보내기 전 `verify_output` 검수(가드레일 §출력검증).

## C. 어떤 구현인가 (implementation — SIASIU repo)

| 레이어 | 파일 | 역할 |
|---|---|---|
| 두뇌(톤·정책·그라운딩) | `app/ssbrain/brain.py` → `PERSONA` + `_system_prompt`([말하는 방식] 블록) | 존댓말 절대·선택적 그라운딩·allowlist 유도. chat 전용(음성 pitch 미적용) |
| 멀티버블 렌더 | `app/pages/consult.html` → `bubbleAIsequence`(`|||` 분할·타이핑 텀) + `aiClean`(`**` 제거) | 답을 2~4 버블로 순차 표시 |
| 단기기억 | `chat()`가 `recent_episodes(user_id, 10)`를 매 호출 컨텍스트에 포함 | 최근 10턴 기억 |
| 검색/근거 | BomBrain 파이프라인(검색 설계서 §2) | Meaning Bridge·Grounding Gate |
| 출력검증 | `verify_output`(가드레일) | 누설/단정/회피성분 검수·1회 교정 재생성 |
| 화면 | `pages/consult.html·call.html·recommend.html·finder.html·mall.html·memory.html·journey.html` | 상담·추천·검색·몰·기억·여정 |

> ★불변: answer.py(레거시) 무변경 정책 — Foundation 연동은 shadow/adapter 레이어(`app/ssbrain/foundation_*`)로만.

## D. COSMILE은 어떻게 소비하나 (호출자·복사 ❌)

`SIASIU_COSMILE_연동설계_신원매칭.md` (v1.3) — **3겹 연동**:
1. **Core(판단) = API 호출** (§0.5) — COSMILE 상담/추천 표면이 SIASIU 두뇌를 호출. 상담 정책·그라운딩·안전 게이트를 **상속**(복사·포크 금지).
2. **신원 매칭** (§1) — 키 매칭으로 같은 사람 식별.
3. **데이터 연동** (§2) — 구매이력 등 **주기적 읽기전용**(실시간 직접 DB 접근 ❌·DB 분리·회계 독립 §3).

언어: COSMILE 주 언어(중국어)에서도 **경어 유지**(상담 설계서 §10·§1 존댓말 절대).

## E. 설계문서 참조 인덱스 (COSMILE이 봐야 할 것 — 정본 1개씩)

| 알고 싶은 것 | 정본 설계서 (버전) |
|---|---|
| 상담이 *어떻게 말하는가*(톤·멀티버블·되물음·그라운딩·allowlist·COSMILE 상속) | **`SIASIU_상담_대화_설계서.md` (v0.2)** ← 1순위 |
| 안전/차단/내부함구/광고컴플라이언스/출처비대칭 | `SIASIU_가드레일_설계서.md` (v1.1) |
| 기억(에피소드·사실·회상·재진입 인사·추천칩) | `SIASIU_메모리_설계서.md` (v1.4) + `SIASIU_메모리_워크플로.html` |
| 검색·근거(Meaning Bridge·Grounding Gate·3경로) | `SIASIU_검색아키텍처_설계서.md` (v1.4) |
| 제품 레코드(쪼개기·core/claims/ingredients/offers·id 불변) | `SIASIU_PRISM_제품레코드_설계서.md` (v0.2) |
| 성분 atom(명명 표준·인용·주의대상) | `SIASIU_성분레지스트리_설계서.md` (v0.5) |
| 커머스(AI 자율 운영·anti-쿠팡 제목·음성 판매원·상세페이지) | `SIASIU_커머스_쇼핑몰_설계서.md` (v0.4) |
| 다국어·현지화(시스템 vs 발화언어·경어·CLIR·출력보장) | `SIASIU_다국어_환대_설계서.md` (v0.3) · `SIASIU_현지화_설계서.md` (v0.3) |
| **COSMILE 연동(Core API 호출·신원·데이터·콜드스타트)** | **`SIASIU_COSMILE_연동설계_신원매칭.md` (v1.3)** ← 연동 1순위 |
| 자가성장 지식(모르면 찾고→검증→승격) | `SIASIU_자가성장지식_설계서.md` · `SIASIU_지식통합_웹검색_러닝_설계서.md` |

## F. 역할 분리 노트 (control tower)

- 본 가이드는 **SIASIU repo-local 핸드오프 문서**(SIASIU가 자기 Core/정책을 소비자에게 설명).
- **실제 COSMILE repo 반영·cross-project contract·통합 regression은 `foundation-control` 관할**(2개 이상 repo 관련 = control tower release train). 이미 `설계문서/COSMILE_FOUNDATION_INTEGRATION_CONTRACT_V1_20260629.md`·foundation-control `contracts/`에 계약 자산 존재.
- COSMILE Claude Code는 이 가이드를 **읽고**, control tower가 정의한 contract에 따라 **Cosmile repo-local 구현**만 수행.
