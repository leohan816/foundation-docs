# Fable5 Design Review Result — V3-11C2 Commerce Memory Design

> Actor: **Fable5 Design Reviewer** (Sentinel 역할·설계검수 only) · Target: Cosmile · Date: 2026-07-09 · Return to: **Advisor** (최종 승인 아님 — Leo/GPT Final Design Approval 前 단계).
> Skill: `/fable-sentinel` — 미설치 상태라 `/home/leo/Project/skill/fable-sentinel/` references(contract-review·review-classification) 직접 적용·설계검수 용도로만.
> 준수: 구현/patch 0 · DB/query/migration 0 · runtime repo 무접촉 · Worker handoff 미작성 · Phase 2A/2B 미실행 · secret/raw DATABASE_URL 미출력.

---

## 1. Verdict: **PASS_WITH_RISK**

설계 문서는 Leo/GPT 결정을 근거 문서와 자구 수준으로 충실히 반영했고, 핵심 해석(summary/current row)은 **본 검수 세션이 C2/D-O1/Phase1 구현 검수에서 실측한 코드 실태와 정확히 일치**한다. 잔여 리스크는 전부 명시적·경계 지어져 있으며(doc 자체 4건 + 본 검수 추가 3건), **설계 패치 없이 Leo/GPT가 수용 가능한 성격**(차기 설계 미션 소관)이다.

## 2. Review focus 9항 판정

| # | 질문 | 판정 | 근거 |
|---|---|---|---|
| 1 | Leo/GPT 결정 정확 반영? | **YES** | Official Design Decisions 12항이 SCHEMA_DESIGN_REVIEW verdict("summary/current-state row, not lifecycle event log"·split 권고)·approval_fields(2A 미승인·target 미정) 원문과 일치 — 과대/누락 0 |
| 2 | summary/current row 해석 타당? | **YES(실측 정합)** | 본 세션의 실물 검수 이력과 일치: `@@unique([orderItemId])`(D-O1 rehearsal에서 중복 거부 실측)·dedup=idempotent skip(TC7/TC11)·sequence/eventType/lifecycle 모델 부재(schema 판독). "이름의 Event ≠ 실체" 명시가 정직 — naming 오용 방지 조항까지 포함 |
| 3 | separate additive event log가 더 안전? | **YES** | 대안(multi-row lifecycle)은 ①검증 완료된 unique 불변식 폐기 ②idempotency 경계 약화 ③current-state 조회와 history 스캔 혼합을 강제. additive log는 검증된 구조 비파괴+append-only 감사 확보. projection rule을 "미승인"으로 이연한 것도 적정(조기 확정 회피) |
| 4 | raw=Cosmile / Foundation=refined boundary 명확? | **YES(소유 문서 1건 미정 — R-1)** | Foundation constitution(not broker·not raw owner·validate/gate only)과 정합. 금지 목록 구체적 |
| 5 | PII/결제/주문 raw 차단 설계? | **YES(승인 메커니즘 미정 — R-1 결합)** | 금지 예시 11종 명시(payment ID·email·주소·margin 등). "aggregate/derived" 허용분의 whitelist 스키마는 미래 설계로 이연 — 이연 자체는 명시적 |
| 6 | Phase 2A read-only로 충분히 좁음? | **YES** | counts/status only·row dump 금지·must-not 12항·target DB identity를 스스로 unknown으로 표기·2B 선결 목록 별도 |
| 7 | 미래 refund/cancel/reorder/direct/session 추가 시 현 구조 유지? | **YES(숨은 가정 1 — R-3)** | summary 유지+additive log+projection 이연 구조라 갈아엎기 불요. 단 attribution 변경 시 summary row **UPDATE(mutation) 의미론**이 암묵 전제 — doc이 "projection 미승인"으로 정직 이연했으나 미래 설계의 핵심 결정점임을 기록 |
| 8 | unknowns/blindspots 잔존? | **doc 4건 + 추가 3건(아래)** | doc 자체: naming·event log 미설계·attribution 한계·2A target. 추가분은 §3 |
| 9 | 승인 판단 가능한 명확성? | **YES** | 불변식이 코드 블록으로·경계가 목록으로·미승인 항목이 열거형으로 — 구현자/승인자 모두 읽을 수 있는 수준 |

## 3. Findings — 추가 unknowns (설계 패치 불요·차기 미션 소관)

| # | 심각도 | 내용 |
|---|---|---|
| R-1 | MEDIUM | **Foundation signal whitelist의 정본 소유 미지정** — "refined/whitelisted signals only"의 whitelist가 어느 문서/스키마의 소유인지(FoundationSignalOutbox payload 스키마? 별도 계약?) 미지정. 미래 signal 구현 전 whitelist 정본 문서 지정 필요(고아 계약 예방 — V3 P9 동형 패턴) |
| R-2 | MEDIUM | **RecOutcomeEvent 행의 retention/erasure 미언급** — summary row가 `subjectRef`/`anonymousRef`(가명 PII)를 보유하는데 consent 철회/erasure 시 처리(보존+reuse_blocked? tombstone?)가 이 설계에도 memory-계층 lifecycle(DATA_DICTIONARY §7)과의 연결로도 미기재. event log 설계 미션에서 함께 결정 필요 |
| R-3 | LOW | **guest→login stitching과 summary row** — anonymousRef로 쓰인 summary row는 로그인 후에도 그대로(재키잉 정책 부재·C2 strict-XOR 이월과 연결). attribution-change history가 event log로 가는 설계라면 identity-change도 같은 미션에서 다뤄야 일관 |

## 4. 근거 검토 범위

직접 판독: 설계 문서 전문 · 01_DESIGN_DOC_REVIEW_GATE_PROPOSAL · 01_SCHEMA_DESIGN_REVIEW(verdict·권고 절) · phase2a approval_fields/preflight 브리프(결정 상태 절). 실측 교차: 본 세션의 C2(구현)·D-O1(unique rehearsal)·F-2(격리)·Phase1(fresh deploy) 검수 이력 — 설계 해석이 실물과 어긋나는 지점 **0**.

## 5. 자기검수 절 (Sentinel 6규칙)

설계검수 스코프 준수(비실행·runtime 무접촉 — 검수 중 실행 명령은 문서 grep뿐) · 판정 1(결정 충실)은 근거 문서 원문 대조로만(기억 아님) · 확인 안 된 것: linked evidence 중 phase2a 브리프 2건은 결정-상태 절만 판독(전문 아님 — 판정 1에 필요한 범위 한정) · Codex/SOL 부재로 인한 단일 검수 경로는 doc이 스스로 회고 검수 후보로 명시(추가 지적 불요).

## 무결성

설계검수 only · 구현/DB/migration/flag/secret 0 · 본 결과/포인터만 foundation-docs commit/push · **Advisor 반환 — Leo/GPT Final Design Approval은 별도 단계**.
