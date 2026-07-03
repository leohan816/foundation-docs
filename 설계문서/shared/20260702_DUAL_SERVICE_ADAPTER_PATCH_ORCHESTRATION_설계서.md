# DUAL-SERVICE-ADAPTER Patch Orchestration — 설계서 (구현 전 확정)

> 작성: foundation-control (control tower) · 2026-07-02
> 근거: **Fable5-AUDIT-01 결과 = PATCH_REQUIRED** → Dual-Service Adapter Layer **CLOSED 보류**.
> 목적: Fable5 지적 항목을 **repo별로 배정 + 담당별 패치 지시문 확정**(구현 시작 전 오케스트레이션).
> ★이 문서 = 지시문 초안(control 작성). **코드 수정 0 · 문서 수정은 본 지시문 작성 외 금지 · push 0.**
> ★공통 제약(모든 담당): 새 기능 추가 금지 · shared SDK 생성 금지 · 아키텍처 변경 금지 · 현재 Foundation/SIASIU/Cosmile 경계 유지 · **CLOSED 차단 항목만 닫는 패치**.
> ★정확한 repro/증상 line = **Fable5-AUDIT-01 보고서**를 정본으로 참조(아래는 control의 배정·수정 목표·수용기준·금지범위. 각 담당은 Fable5 repro로 정확 지점 확인).
> baseline: Foundation `98c852b` · SIASIU 02A(untracked) · Cosmile 02B(untracked).

---

## 0. 배정표 (finding → repo → 우선순위)
| # | Finding | 담당 | 우선 | 성격 |
|---|---|---|---|---|
| 1 | **LOWER-6 FRC-FLAG** | Foundation | P0 | FRC flag가 final_strategy와 불일치 |
| 2 | **F3-SEVERITY-DEMOTION** | Foundation | P0 | severity가 하향(demote)되는 경로(안전) |
| 3 | **FALLBACK-FAIL-OPEN** | SIASIU + Cosmile | P0 | Foundation 실패 fallback이 fail-open |
| 4 | **TEST-EVIDENCE** | Control + SIASIU + Cosmile + Foundation | P0 | test가 live Foundation 미실증(skip/fallback) |
| 5 | **UNTRACKED-CLOSED** | SIASIU + Cosmile | P0 | 산출물 전부 untracked → CLOSED 불가 |
| 6 | **COSMILE-FRC-ECHO** | Cosmile | P1 | route FRC echo가 정본 필드 누락/불일치 |
| 7 | **COSMILE-BLOCK-GAP** | Cosmile + Foundation | P1 | block 상황 surface 억제 gap |
| T | LIAR-SSC · LEGACY-JUDGE-ACTIVE · HEALTH-STALE · forbidden_expressions 미적용 · provider hardcoding/timeout 산재 · session_context 중첩 · PHANTOM-FIELDS · CART-WRITE | (§F) | TRACKING | 이번 패치 밖·별도 release train |

**패치 순서 권고**: Foundation(1·2) → SIASIU/Cosmile(3·6·7) → 4(테스트 공통) → 5(commit) → Control 검수 → Fable5 targeted re-audit.

---

## §A. Foundation 담당 패치 지시문
> 대상 repo: `foundation-control/foundation_http_service/`. ★routing/severity/policy/safety **로직의 "완화"는 금지** — 이번 패치는 *정합/안전 강화(raise-only)*만.

### A-1. LOWER-6 FRC-FLAG (P0)
- **수정 대상**: `contracts.py::build_frc` — `products_allowed`(현 `bool(prod_count>0)`, ~L181) · `recommendation_allowed`(~L168) 가 **final_strategy와 무관하게 계산**되어, 제품을 노출하면 안 되는 strategy(refuse/clarify_first/answer_then_clarify/answer_only/do_not_recommend/hold 등)에서도 `products_allowed=true`가 나올 수 있음.
- **수정 목표(invariant)**: FRC boolean flag가 **final_strategy/safety_gate_result와 항상 정합**.
  - `products_allowed`는 제품 노출을 허용하는 strategy(예: `recommend_with_caution`)이고 후보가 있을 때만 true. 그 외(safety_first/refuse/clarify_first/answer_then_clarify/answer_only/decision do_not_*/hold)에서는 **false**.
  - `recommendation_allowed ⇒ products_allowed`(추천 허용이면 제품 허용 함의) 유지.
  - `assert_frc_invariants`를 **safety_first 외의 non-permitting strategy로 확장**: 위 strategy에서 `products_allowed=true` 또는 `product_candidates≠[]`면 위반으로 검출.
- **수정 금지 범위**: judge/severity/routing 로직 · consult_chat 파이프라인 · SSC schema · product rail 완화(억제를 *더 엄격히*만). 값을 *더 허용적으로* 바꾸지 말 것.
- **필요 테스트**: (a) 각 final_strategy × (후보 있음/없음) 매트릭스에서 flag 정합(코드/유닛). (b) `assert_frc_invariants`가 새 위반을 잡는지. (c) 회귀: golden 21/21 · adversarial safety_viol=0/false_rec=0 · parity(직접 :8731) 안정 · 02.5/02B/02A/02.7C 불변.
- **수용기준**: non-permitting strategy에서 `products_allowed=false·recommendation_allowed=false·product_candidates=[]` 100%. Fable5 LOWER-6 repro가 PASS로 전환.

### A-2. F3-SEVERITY-DEMOTION (P0·안전)
- **수정 대상**: `core.py::_adverse_severity_class`(~L562)/`_severity_from_ai`(~L537) 및 severity→gate 매핑(`_SEVERITY_GATE`). Fable5가 지적한 **severity가 하향되는 경로**(예: 가시/red_flag 증상이 mild/breakout로 demote → caution). override(contract) 경로 포함.
- **수정 목표(invariant)**: severity는 **raise-only**. lexical anchor(붓/발진/두드러기/열감/진물/눈주변…) 또는 AI red_flag/severe 신호가 있으면 **어떤 경로도 visible/red_flag(block) 아래로 못 내림**. `severity_class_basis`는 정직(lexical_floor_backstop을 semantic_policy_gate로 위장 금지).
- **수정 금지 범위**: severity를 *올리는* 것 외 로직 변경 금지 · 02.7C 정책표(mild/breakout→caution·visible/red_flag→block) 유지 · 일반 적합성(02.6)/veto/02A/02B 불변(over-escalate로 이들을 깨지 말 것).
- **필요 테스트**: (a) Fable5 F3 repro 케이스 → block/visible 유지 재현. (b) 02.7B/C 반복 안정(좁쌀=caution·붓기=block·울긋불긋=block) 불변. (c) fail-closed 매트릭스(각 안전신호 단독) leak 0. (d) golden 21/21 · adversarial safety_viol=0.
- **수용기준**: demotion 경로 제거. severity 반복 결정론 안정 + basis 정직. Fable5 F3 PASS.

### A-3. (P1) COSMILE-BLOCK-GAP — Foundation side
- **수정 대상**: block 상황에서 FRC가 서비스에 **명확히 억제 신호**를 주는지(예: `products_allowed=false`·`product_candidates=[]`·`forbidden_expressions`에 continue_use_permission 포함) — Foundation 측 gap이 있으면. (서비스 측은 §C-4.)
- **수정 목표**: `safety_gate_result=block` ⇒ `products_allowed=false·recommendation_allowed=false·product_candidates=[]`가 FRC에서 보장(assert 포함). 서비스가 "block인데 뭘 노출"할 여지를 FRC 레벨에서 차단.
- **금지/테스트/수용**: A-1과 동일 원칙. block 케이스 서비스 노출 0.

### A-4. TEST-EVIDENCE — Foundation share
- **수정 대상**: `GET /health` 응답에 **실행 코드 식별자**(commit/version)를 노출해 stale 판별 가능하게(HEALTH-STALE의 최소 대응). 계약 스모크(직접 :8731) 재현 스크립트가 **live 여부(source/http)**를 단언하도록 보강(control과 공유).
- **수정 금지 범위**: 새 endpoint 추가 금지(‪/health 확장만) · judge 로직 무변경.
- **테스트/수용**: `/health`로 현재 commit 확인 가능 · 계약 스모크가 live/stale 구분.

**Foundation 완료 보고 형식**: 변경 파일·함수(절대경로) · A-1/A-2/A-3/A-4 각 diff 요약 · 테스트 결과(golden/adversarial/parity/02.x) · flag·severity 정합 증거 · 금지범위 밖 수정 0 · push 0 · 임시서버 정리(§공통).

---

## §B. SIASIU 담당 패치 지시문
> 대상 repo: `SIASIU/app/adapters/`, `SIASIU/app/tests/`. ★기존 `brain.chat`/`/api/chat`/answer.py fingerprint **무접촉**.

### B-1. FALLBACK-FAIL-OPEN (P0)
- **수정 대상**: `consult_via_foundation.py::_fallback`(~L20) + `dual_helpers.py::safety_suspect`(~L46)/`_SAFETY_SUSPECT_WORDS`(~L13). Fable5가 찾은 **fallback fail-open**(Foundation 미가동 시 safety 의심 발화인데 제품/CTA/추천이 새는 경로 또는 detector 미탐).
- **수정 목표(invariant·fail-closed)**: Foundation 실패 시 — safety 의심이면 **safety mode 고정**(products/CTA/추천/계속사용허가 0). ★그리고 **애매/미상(uncertain)일 때도 제품/CTA를 열지 않음**(benign 확정만 상담 fallback). detector는 *escalate/backstop 전용*(최종 의미 판단자 아님)이되 **커버리지를 fail-closed로 확장**.
- **수정 금지 범위**: `brain.chat`/기존 상담 로직 수정 금지(lazy import·무수정 유지) · 새 기능/추천 rail 추가 금지 · detector를 *완화*(safety 낮춤) 금지. Foundation FRC가 살아있을 때의 경로 로직 변경 금지(그건 FRC 우선).
- **필요 테스트**: (a) Foundation 강제 실패(dead URL/mock None) + Fable5 fail-open repro 발화 → **safety mode·products/CTA/추천 0** 재현. (b) benign(안녕/일반 정보) → 상담 fallback·제품 0. (c) 기존 safety 5케이스 fallback도 fail-closed. (d) answer.py fingerprint·brain.chat 무변경 확인.
- **수용기준**: fallback에서 safety 의심/애매 발화 제품노출 0. Fable5 FALLBACK-FAIL-OPEN(SIASIU) PASS.

### B-2. TEST-EVIDENCE (P0)
- **수정 대상**: `tests/test_dual_adapter_02a.py` — `is_reachable(timeout=5)`가 compose 지연(~수십초)보다 짧아 **Foundation-path 테스트가 skip**되고도 19/19로 보고되는 문제.
- **수정 목표**: (a) reachability를 **`GET /health`(compose 미유발)** 기반으로 판정(짧은 timeout OK). (b) Foundation-path 케이스는 **충분한 timeout(≥45s)**로 실제 호출하고, 응답의 **`source`/계약 필드로 live 실증**을 단언(skip이면 명시적으로 SKIP 카운트·PASS로 위장 금지). (c) live 미가동 시 무엇이 skip인지 보고.
- **수정 금지 범위**: 테스트 기대값을 통과시키려 완화 금지 · 어댑터 로직 변경 금지(테스트 파일만).
- **필요 테스트/수용**: Foundation 가동 시 Foundation-path가 실제 실행되어 **safety 5 + consult + commerce**가 live FRC로 검증 · 미가동 시 정직한 SKIP 표기. 카운트가 실제 실행 반영.

### B-3. UNTRACKED-CLOSED (P0)
- **수정 대상**: `app/adapters/*`, `app/tests/test_dual_adapter_02a.py`가 **untracked(`??`)** → CLOSED 선언 불가.
- **수정 목표**: 02A 산출물을 **명시적 staging + 로컬 commit**(`git add <각 파일>` — ★`git add -A`/`.` 금지, 기존 WIP·무관 파일 미포함). 커밋 메시지에 02A 범위·baseline 명시.
- **수정 금지 범위**: ★**push 0**(로컬 commit만) · 기존 파일 stage 금지 · answer.py 등 product code 미포함.
- **수용기준**: 02A 파일이 tracked(committed)·`git status` clean(해당 파일) · push 0.

**SIASIU 완료 보고 형식**: 변경/커밋 파일(절대경로) · B-1 fail-closed 증거(강제 실패 재현표) · B-2 test가 live 실증(source/필드) · B-3 commit hash · brain.chat/answer.py/`/api/chat` 무접촉 증거 · 금지범위 밖 0 · push 0 · 서버 정리.

---

## §C. Cosmile 담당 패치 지시문
> 대상 repo: `Cosmile/app/src/adapters/`, `.../api/slice/consult-foundation/`, `.../scripts/`. ★기존 `/api/slice/consult`·Mock Brain·미커밋 WIP 7종 **무접촉**.

### C-1. FALLBACK-FAIL-OPEN (P0)
- **수정 대상**: `route.ts` fallback 블록(`source:"mock_fallback"`, ~L59) + `cosmileResponseAdapter.ts::serviceSafetyDetector`. Fable5가 찾은 **fallback fail-open**.
- **수정 목표(fail-closed)**: Foundation 실패(timeout/5xx/404) 시 — safety 의심이면 safety mode(카드/CTA/추천/refs 0). ★**애매/미상 발화도 commerce로 열지 않음**(Mock Brain이 recommend를 줘도 safety 의심이면 escalate가 우선). detector는 escalate-only(raise) 유지하되 fail-closed 커버리지 확장.
- **수정 금지 범위**: 기존 `/api/slice/consult`·Mock Brain 수정 금지 · detector 완화 금지 · Foundation FRC 정상(live) 경로 로직 변경 금지 · product ref 자작 금지.
- **필요 테스트**: (a) Foundation 강제 실패 + Fable5 repro 발화 → mock_fallback인데 **surface safety·cards/CTA/refs 0**. (b) benign → 정상. (c) `dual-adapter-eval.mjs`에 fallback fail-closed 케이스 추가.
- **수용기준**: fallback safety leak 0. Fable5 FALLBACK-FAIL-OPEN(Cosmile) PASS.

### C-2. COSMILE-FRC-ECHO (P1)
- **수정 대상**: `route.ts`의 응답 `frc` echo(~L36) — 정본 FRC 필드 중 **`decision_type`·`answer_substance`·`final_severity_class`·`policy_rule_applied`·`suppression_reason`·`evidence`** 등이 누락/부분이라 관측·감사에서 불완전.
- **수정 목표**: echo를 **정본 FRC 필드와 일관**되게(감사/eval이 계약 준수를 검증할 수 있게). 최소한 suppression 판정에 쓰는 필드 + decision_type + severity_basis + forbidden_expressions 전부. ★표시용이지 새 데이터 생성 아님(FRC 값 그대로).
- **수정 금지 범위**: FRC 값 변형/재파생 금지 · surface 로직 변경(C-1/C-4 외) 금지.
- **필요 테스트/수용**: eval의 contract-invariant 섹션이 echo된 FRC 필드로 검증 가능 · phantom 필드(미수신) 표기.

### C-3. TEST-EVIDENCE (P0)
- **수정 대상**: `dual-adapter-eval.mjs` — live vs fallback 구분, `FOUNDATION_HTTP_TIMEOUT_MS` 적용, `source=foundation_http` 단언.
- **수정 목표**: eval이 (a) `source=foundation_http`(mock_fallback 0)를 safety/commerce 케이스에서 **단언**, (b) timeout으로 인한 fallback을 실패로 처리(위장 금지), (c) live 미가동 시 정직 SKIP. loop100(`vertical-slice-v0-loop100.mjs`) 기존 UX 회귀도 실행·보고.
- **수정 금지 범위**: 기대값 완화 금지 · 어댑터 로직 변경(테스트/eval 파일만).
- **수용기준**: eval이 live FRC 실증(source 단언) · fallback 케이스 명시 · loop100 결과 보고.

### C-4. UNTRACKED-CLOSED (P0)
- **수정 대상**: `app/src/adapters/*`, `.../consult-foundation/route.ts`, `.../scripts/dual-adapter-eval.mjs`가 **untracked(`??`)**.
- **수정 목표**: 02B 산출물 **명시적 staging + 로컬 commit**(`git add <각 파일>` — ★WIP 7종·`seed-*`·`oasis-demo` 미포함·`git add -A/.` 금지).
- **수정 금지 범위**: ★**push 0** · 기존 WIP(next.config/cart/group-deal/layout/AppHeader/WishlistList/ConsultationChatShell) 절대 stage 금지.
- **수용기준**: 02B 파일 tracked(committed) · WIP 미포함 · push 0.

### C-5. (P1) COSMILE-BLOCK-GAP — service side
- **수정 대상**: `cosmileResponseAdapter.ts` — `safety_gate_result=block`(또는 final_strategy=safety_first)에서 surface 억제가 **모든 분기**에서 적용되는지. Fable5가 찾은 block gap.
- **수정 목표**: block ⇒ mode=safety·cards/CTA/refs/추천 0(우회 분기 0). Foundation FRC(A-3) 신호를 그대로 hard-enforce.
- **테스트/수용**: block 케이스 전 분기 노출 0.

**Cosmile 완료 보고 형식**: 변경/커밋 파일(절대경로) · C-1 fail-closed 재현표 · C-2 echo 필드 목록 · C-3 eval source 단언 결과 + loop100 · C-4 commit hash(WIP 미포함 증거) · C-5 block 억제 증거 · 기존 consult/Mock Brain/WIP 무접촉 · 금지범위 밖 0 · push 0 · 서버 정리.

---

## §D. Control 최종 검수 Checklist (구현 후 control이 수행)
> control은 코드 수정 0. 재현/검수만. 서버는 검수용 임시 기동 후 **반드시 종료**.

1. **Foundation `/health`에 commit 노출** → 실행 서버가 패치 반영본인지 확인(HEALTH-STALE 대응).
2. **A-1 FRC flag**: non-permitting strategy 매트릭스에서 `products_allowed/recommendation_allowed/product_candidates` 정합(직접 :8731) · `assert_frc_invariants` 확장 검출.
3. **A-2 severity**: F3 repro block 유지 · 02.7B/C 반복 안정 · fail-closed 매트릭스 leak 0 · basis 정직.
4. **B-1/C-1 fallback fail-closed**: SIASIU/Cosmile 각 Foundation 강제 실패 + safety/애매 발화 → 제품/CTA/추천 0.
5. **safety 5케이스 (live)**: 두 서비스 모두 `source=foundation_http`·safety_first/block·suppression 0.
6. **commerce (live)**: `product_context.catalog_candidates` 도달 · `product_candidates`만 surface·refs⊆FRC.
7. **B-2/C-3 test-evidence**: 두 test가 live 실증(source/필드 단언)·skip 정직·loop100 보고.
8. **UNTRACKED-CLOSED**: 두 repo 02A/02B tracked(committed)·WIP 미포함·**push 0**.
9. **경계**: Foundation에 service voice/CTA 0 · 서비스 product ref 자작 0 · shared SDK 0 · 새 기능 0 · 아키텍처 불변.
10. **기존 경로 불변**: SIASIU brain.chat/answer.py fingerprint·`/api/chat` · Cosmile Mock Brain/`/api/slice/consult` 무변경.
11. **서버/프로세스**: 검수용 :8731 등 기동분 종료·잔여 0·stale 방지·남의 :3000 미접촉.
12. 판정: 항목 전부 PASS → **Fable5 targeted re-audit 요청**(아래). 하나라도 FAIL → 해당 담당 재패치.

---

## §E. Fable5 Targeted Re-Audit 조건
> full 재감사 아님. **이번 패치가 닫은 항목만** 재확인(FABLE5-AUDIT-01 범위 §1.5 유지·비범위 retrieval/memory 품질은 여전히 AUDIT-02).
- **재감사 트리거**: §D checklist 12항 전부 PASS + 두 repo commit 완료(untracked 0) + Foundation 패치 commit.
- **재감사 표적(닫혔는지만)**: LOWER-6 FRC-FLAG · F3-SEVERITY-DEMOTION · FALLBACK-FAIL-OPEN(양 repo) · TEST-EVIDENCE(live 실증) · UNTRACKED-CLOSED · COSMILE-FRC-ECHO · COSMILE-BLOCK-GAP.
- **제공물**: 패치 commit 해시(3 repo) · Foundation `/health` commit · §D 검수 결과 · 각 담당 완료 보고.
- **재감사 판정**: 표적 7항 전부 PASS면 **Dual-Service Adapter Layer = CLOSED 후보**. TRACKING(§F)은 CLOSED 차단 아님(별도).
- ★Fable5는 read-only·서버 정리 원칙 준수·확실치 않으면 NEEDS_EVIDENCE.

---

## §F. TRACKING (이번 패치 밖 · 별도 release train)
> CLOSED 차단 아님. 후속 설계서로 이관.
- **LIAR-SSC** — 서비스가 안전을 축소 신고한 SSC. Foundation fail-closed 승격이 1차 방어(구현됨). provenance 정직/서비스 self-report 신뢰 정책 = 후속.
- **LEGACY-JUDGE-ACTIVE** — `/v1/consult/judge` endpoint 활성. 제거는 Foundation 변경·소비자 확인 필요 → 후속(deprecation).
- **HEALTH-STALE** — 장수 stale 서버. `/health` commit 노출(A-4)로 최소 대응 · 운영 절차(기동/버전 확인) = 후속.
- **forbidden_expressions 미적용** — FRC가 주는 금지표현을 서비스 렌더가 실제 강제하는지 = 후속(렌더 계약).
- **provider hardcoding / timeout 산재** — DeepSeek 하드코딩·timeout 분산 → **GLOBAL-AI-RUNTIME-01**.
- **session_context 중첩** — SSC session_context 배치 일관성(catalog와 유사) → 후속(SSC 스키마 정리·PHANTOM과 함께).
- **PHANTOM-FIELDS** — 타입 선언됐으나 미사용/미수신 SSC/FRC 필드 → 후속(스키마 정리).
- **CART-WRITE** — commerce write 경로 위험. ★현재 write/checkout/cart DB write = **0 유지**(금지). 실연결은 별도 승인 release train(COSMILE-CONNECT 이후).

---

## 한계 / 주의
- 이 문서는 **오케스트레이션 지시문 초안**(control 작성). 각 담당 실제 구현은 담당 repo Claude Code가 수행(control이 만든 이 지시문에 따라 repo-local).
- 각 finding의 **정확한 repro/line = Fable5-AUDIT-01 보고서**를 정본으로. 본 문서는 배정·수정 목표(invariant)·수용기준·금지범위·테스트·보고형식을 고정.
- 코드 수정 0 · push 0 · live/write/promotion 0 · 현재 경계 유지.
