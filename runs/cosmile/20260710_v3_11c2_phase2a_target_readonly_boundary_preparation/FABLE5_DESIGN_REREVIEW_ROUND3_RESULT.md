# Fable5 DESIGN_REVIEW Re-Review Round 3 Result — Phase 2A Target & Read-Only Boundary Plan (F-A/F-B)

> Pass: **DESIGN_REVIEW 재검수 3차 · Level 3** · Actor: Fable5 Reviewer — 원 NEEDS_PATCH·2차 재검수와 **동일 세션** · Date: 2026-07-10 · Return to: **Advisor**.
> Skill: `/fable-sentinel` — **job 시작 시 실제 로드**(SKILL.md·references/delta-review.md·references/review-classification.md Read — 출력 원문 보고됨).
> 준수: DB/query/migration/role/logging/permission/secret/log 열람 0 · patch 0 · repo 수정 0 · 새 세션 0. 범위 = F-A/F-B만(닫힌 P-1/P-3·minor 재개봉 없음 — delta-review 원칙).
> ★판정은 admin 작업·Phase 2A 실행 승인이 아니다 — 전부 `NOT_APPROVED` 유지.

---

## 1. Verdict: **PASS**

두 고정 질문 모두 실 diff(`41e5394..e4ed668` 전문 판독)로 CLOSED 확인. 패치가 만든 회귀 없음(P-1/P-3 메커니즘 무접촉 — diff로 확인). 잔여는 로그-위생 관찰 1건(비차단).

## 2. 고정 질문 — 명시 답변

### Q1 (F-A 2단계 일관성) — **CLOSED**
- 활성 경로 전수에서 `createuser --pwprompt` 배제 확인: 현재 문서의 createuser 언급 5곳 **전부 배제-맥락**(grep 원문 — 템플릿 주석 "NOT used"·P-2 절 "excluded"+정확한 사유(role을 생성하므로 기존 role에 자격 설정 불가)·§4 boolean "not used"·§9 "excluded"·rework log의 제거 기록).
- 2단계 흐름 내부 일관: ① §3 템플릿이 password 없는 `CREATE ROLE` ② P-2가 "이미 생성된 role에 `psql \password <ROLE>`(또는 독립 검증된 existing-role 등가물)"로 한정 ③ **"no combined-create path is introduced"** 명문 — 원 F-A의 모순(별도-단계 옵션에 생성 도구 나열) 완전 해소.
- §4 boolean이 `credential_set_on_existing_role_via_no_echo_scram`으로 개명되어 계약 층까지 정합.

### Q2 (F-B verifier 로그 게이트) — **CLOSED**
- **사전 게이트**: 자격 설정 전에 "채널이 raw password/verifier를 statement log에 기록하지 않음"의 비밀-아닌 증거 요구·증명 불가 → **provisioning 전 STOP** ✓ (§4 `pre_provisioning_statement_log_verifier_safe`·불증명 시 STOP 명문).
- **자동 조치 금지**: 로깅 모드 변경/세션 억제/대체 채널 = 감사정책+blast-radius 검토를 동반한 **별도 승인 admin 결정** — 본 계획은 로깅을 변경/비활성/삭제하지 않음 ✓.
- **민감 사고 경로**: 캡처됐거나 됐을 **가능성**만으로도 STOP → 민감 분류 → **Leo/GPT가 (i) 로그 처리 (ii) credential 재설정/rotation 결정** — 자동 삭제/재설정/rotation **금지** 명문 ✓ (§4 `credential_capture_incident_resolution` enum·STOP 목록 "raw password **or SCRAM verifier**" 확장).
- 증거 최소화: 민감 로그 설정/로그 내용 미출력 규칙 추가 ✓.

## 3. 실물 검증

Cosmile `e4ed668`: 단일 문서 +25/−12·origin 조상 ✓ · fd `d0aa1f4`: origin/main 조상 ✓ · **mirror cmp = IDENTICAL** ✓ · status 헤더 정직(`…PENDING_ROUND3`) ✓ · P-1/P-3 메커니즘 diff 무접촉(회귀 0) ✓ · Worker round-2 보고와 실 diff 불일치 0.

## 4. 관찰 (비차단·기록)

- **O-1 (LOW·로그 위생)**: round-2 패치가 **round-1 rework log 항목을 소급 수정**(round-1이 실제로 나열했던 createuser를 그 항목에서 제거) — round-2 항목이 제거 사실을 명시적으로 기록하므로 현재-상태 독해에 기만은 없으나, 이력 항목은 verbatim 유지 + 아래 정정이 원칙(역사 블록 규율). 후속 정리 후보이며 재패치 사유 아님.

## 5. Excluded scope / 확인 안 된 것

admin 실행·실 서버의 `log_statement` 실태(의도적 — F-B 게이트가 실행 시점 평가 항목으로 만듦)·"독립 검증된 existing-role 등가물"의 구체 후보 검증(선택 시 별도 검증 의무가 문면에 있음)·IMPLEMENTATION_REVIEW.

## 6. Verdict rationale

F-A/F-B가 자구가 아니라 **게이트·enum·STOP 경로**로 닫혔고, 요약이 아닌 실 diff로 전건 확인했다. 3라운드에 걸친 지적(P-1/P-2/P-3 → F-A/F-B)이 전부 해소 — 설계 패키지는 §9(1) Leo/GPT 승인 판단에 부칠 수 있는 상태다. V2 PASS 정의 충족(다음 게이트 전 수용 필요한 미해결 리스크 없음 — O-1은 결정 불요).

## 7. Routing

**설계 재검수 루프 종료.** 다음 게이트 = Advisor 취합 → **Leo/GPT §9(1) 승인 필드 결정**(attestation·approved_schema·role matrix·P-1 잔여시 remediation·P-2 채널·P-3 주입·.env 600). **admin·Phase 2A = NOT_APPROVED 유지 — 본 PASS는 그 승인이 아님.**

RETURN_TO: Advisor
