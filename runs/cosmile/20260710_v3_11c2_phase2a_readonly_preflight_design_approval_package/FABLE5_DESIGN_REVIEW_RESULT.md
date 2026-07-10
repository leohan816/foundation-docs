# Fable5 DESIGN_REVIEW Result — V3-11C2 Phase 2A Read-Only Preflight Execution Plan

> Pass: **DESIGN_REVIEW** · Actor: Fable5 Reviewer(기존 세션) · Date: 2026-07-10 · Return to: **Advisor**.
> Skill: `/fable-sentinel` 직접 적용. 준수: DB 접속 0 · secret 값 확인 0(.env.local은 **mode 메타데이터만** stat) · query/migration 실행 0 · 설계 patch 0 · repo 수정 0.

---

## 1. Verdict: **NEEDS_PATCH**

- **DESIGN_PACKAGE_QUALITY: NEEDS_PATCH** — 안전 자세(HOLD 권고·비밀 위생·no-write 논증·STOP)는 우수하나, **preflight의 핵심 검사 자체(C-2/C-3)의 정밀성 결함 3건**이 in-scope로 패치 가능. brief가 명시적으로 "이 SELECT들이 충분하다는 주장을 불신하라"고 요구했고, 불신 결과 실제 공백을 확인.
- **PHASE2A_EXECUTION_READINESS: HOLD** — 계획 스스로 정확히 차단함(Option C 1순위·identity+read-only 미증명)에 **동의**. 본 검수도 실행 불가 판단.
- ★**설계 리뷰의 어떤 판정도 Phase 2A 실행 승인이 아니다.** 실행 상태는 `NOT_APPROVED` 유지.

## 2. Findings (심각도순 — 전부 설계 범위 내 패치 가능)

| # | 심각도 | 발견 | 패치 방향 |
|---|---|---|---|
| F-1 | MED | **C-2가 이름-부정확**: `indexdef ILIKE '%UNIQUE%' AND '%orderItemId%'`는 "orderItemId를 언급하는 아무 unique index"를 세므로, 대상 DB에 drift가 있어 복합 unique(orderItemId, X)나 개명된 index만 있어도 `present=1`(거짓 안심). **Phase 2A의 목적이 미지의 실 대상에서 정확한 D-O1 불변식 증명**이므로 이름/정의 정확 매칭 필요 | `indexname = 'RecOutcomeEvent_orderItemId_key'` 필터 추가(또는 indexdef 정확 일치)·검출 시 indexname/indexdef status 반환(행 아님) |
| F-2 | MED | **C-3가 대상 drift를 못 봄**: `IN (3개명)` 필터라 ledger에 **예상 밖 migration이 적용돼 있어도 조용히 통과** — §11 STOP "unexpected state"를 발화시킬 데이터가 안 나옴 | 보조 SELECT 1개: `COUNT(*) WHERE migration_name NOT IN (3)` — 0 아니면 STOP |
| F-3 | LOW | C-3의 **부재 행 = pending 매핑이 암묵적**(IN 결과에 없는 이름의 해석 규칙 미기술) + `rolled_back_at` 미검사 + checksum 대조 없음(동명이내용 migration이 applied로 읽힘) | 매핑 규칙 1줄 명문 + `rolled_back_at IS NULL` 조건 + (선택) checksum 비교 |

## 3. Reviewed artifacts/files/diffs/references (전건 직접)

- **Cosmile `9e9ad28`**: 실재·origin 조상·**단일 문서 +209줄**(scope 정확) — 계획 전문 판독
- **fd `b585a50`**: 실재·origin/main 조상 · **mirror cmp = IDENTICAL**
- 실물 대조: `schema.prisma:858` `@@unique([orderItemId])` ✓ · D-O1 migration의 `RecOutcomeEvent_orderItemId_key` 생성 ✓ · `.env.local` **mode 664 주장 = stat 재현 일치**(값 미열람) ✓
- 기준: 03_BRIEF·04_ADVISOR_VALIDATION(불신·교차만)·Worker result/pointer·canonical Commerce Memory design(Phase 2A boundary)·canonical V2(`ACTIVE_CANONICAL_V2`)·SECURITY_AND_SECRET_GUARDRAILS/ENV_AND_MIGRATION_POLICY(§9가 인용한 출력 규칙)

## 4. Required-criterion coverage (brief 10항)

| 기준 | 판정 |
|---|---|
| 1 대상 identity가 비밀 노출 없이 충분히 특정 | PASS — alias+메커니즘 라벨 분리·"candidate≠approved" 명문 |
| 2 non-prod 분류가 추론 아닌 증명 요구 | PASS — 정황/부재 증거 분리·`UNPROVEN_PENDING_APPROVAL` 정직 |
| 3 실 read-only 경계 또는 정확한 차단 | PASS — least-privilege role=유일 증명·tx read-only=보조로 강등·미증명 시 차단(Option C) |
| 4 명령이 write 경로 생성 불가 | PASS — 순수 SELECT 3종·**self-connecting 명령(prisma migrate status 포함) 배제 논증 §7이 특히 강함** |
| 5 secret/credential 노출 불가 | PASS — 값 0·주입 경로 분리·본 검수 재확인(문서 내 URL/host/값 0) |
| 6 raw row/식별자 금지 | PASS — §8/§9 boolean·count·status만 |
| 7 scope = dup count·unique 상태·migration 상태 한정 | **PARTIAL** — 한정은 정확하나 검사 자체의 정밀성 결함(F-1/F-2/F-3) |
| 8 STOP 커버(오식별·미증명 권한·secret·unexpected state·write) | **PARTIAL** — 목록은 충실하나 "unexpected state"를 감지할 데이터가 C-3에 없음(F-2) |
| 9 canonical summary-row 설계 정합 | PASS — §10 재확인·event-log/refund 미확장 |
| 10 Phase 2B/runtime 미확장 | PASS — §15 fallback의 한계("migration graph 재확인일 뿐 실 대상 검증 아님") 자인은 모범적 |

## 5. Conflicts / Excluded scope / 확인 안 된 것

- conflicts: canonical 설계·V2와 충돌 0. Advisor validation과 본 검수의 차이 = C-2/C-3 정밀성(위 findings — validation은 sufficiency를 수용했음).
- excluded: 실행·DB 상태·secret 값·Phase 2B·IMPLEMENTATION_REVIEW(실행 후 별도).
- 확인 안 된 것: 실 대상 DB의 실제 상태(의도적 — 그것이 Phase 2A 자체) · `.env.local` 내용(금지·mode만).

## 6. Verdict rationale

안전 구조는 PASS감이지만, brief의 명시 요구("C-2/C-3 정밀성을 불신하라")에서 **preflight의 존재 이유인 검출 정확성**에 구멍 3건이 확인됐고, 셋 다 SELECT 1~2줄 수준의 in-scope 패치다. V2 계약상 NEEDS_PATCH = "approved scope 내 패치 가능" — 정확히 이 경우. PASS_WITH_RISK(패치 없이 Leo 수용)로 보내기엔 패치 비용이 너무 낮고 결함이 목적 자체에 닿는다.

## 7. Routing

V2 §9: **NEEDS_PATCH → Advisor가 in-scope 패치 → 동일 Fable5 세션 재검수.** 재검수 질문(고정): ① C-2가 이름/정의 정확 매칭인가 ② C-3에 잉여-migration 검출이 있는가 ③ 부재행=pending·rolled_back 처리 명문인가. **Phase 2A 실행 상태 = NOT_APPROVED 유지·Option C(HOLD) 권고에는 동의.**

RETURN_TO: Advisor
