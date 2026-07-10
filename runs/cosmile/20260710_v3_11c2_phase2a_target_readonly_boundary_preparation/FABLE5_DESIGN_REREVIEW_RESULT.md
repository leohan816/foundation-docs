# Fable5 DESIGN_REVIEW Re-Review Result — Phase 2A Target & Read-Only Boundary Plan (P-1/P-2/P-3)

> Pass: **DESIGN_REVIEW 재검수 · Level 3** · Actor: Fable5 Reviewer — **NEEDS_PATCH를 낸 동일 세션** · Date: 2026-07-10 · Return to: **Advisor**.
> Skill: `/fable-sentinel` 직접 적용. 준수: DB/query/migration/role/grant/chmod/secret 0 · patch 0 · repo 수정 0 · 새 세션 0.
> 방법: 요약 불신 — 실 rework diff `0ec8667..41e5394` 전문 판독 · mirror cmp · fd `dccedbb` 검증 · PostgreSQL 기술 주장 자체 검증.
> ★재검수 판정은 admin 작업·Phase 2A 실행 승인이 아니다 — 전부 `NOT_APPROVED` 유지.

---

## 1. Verdict: **NEEDS_PATCH** (범위 좁음 — P-2 정밀 2건만·Q1/Q3은 완전 CLOSED)

3개 고정 질문 중 **Q1·Q3은 완전히 닫혔고**, Q2(P-2)는 핵심(평문 리터럴 제거·no-echo·클라이언트측 SCRAM·\password)이 옳으나 **handoff가 명시적으로 검증을 요구한 기술 주장에서 정밀 결함 2건**이 남았다. 둘 다 fail-safe이고 1~2줄 패치지만, 이 문서는 보안 admin 미션의 정본 지시문이 될 것이므로 승인 전에 자구가 정확해야 한다.

## 2. 고정 재검수 질문 — 명시 답변

### Q1 (P-1 PUBLIC 처리 경로) — **CLOSED**
- "Effective PUBLIC privileges" 신설 절의 기술 주장 전부 검증 정확: PUBLIC 권한은 모든 role의 유효 권한이며 **NOINHERIT로 중화되지 않음** ✓ · 기본 `CONNECT`+`TEMP`(임시 객체 = 쓰기 능력) ✓ · **PG<15 public 스키마 CREATE(15+에서 기본 제거)** ✓.
- 실행 가능·비자동 결정 경로: 발견 시 **STOP → Leo/GPT 결정**·옵션 a~d(광역 revoke는 blast-radius 분석+독립 검수+승인 필수·자동 선택 절대 금지 명문) ✓ · §4에 유효-PUBLIC boolean 3종 + `public_write_path_resolution ∈ {none_found | stop_pending_leo_decision}`(잔여 발견 시 provisioning 진행 불가) ✓ · STOP 목록·§9 승인 필드 반영 ✓. 옵션 (d)의 스코프 축소 수용+`default_transaction_read_only` 보조 명시도 원 지적의 대안 경로와 일치.

### Q2 (P-2 provisioning 채널) — **부분 CLOSED · 정밀 결함 2**
닫힌 것: `CREATE ROLE`에서 password 리터럴 **제거**(생성·자격 설정 분리) ✓ · 평문 리터럴 SQL/argv/history/log/증거 금지 명문 ✓ · `psql \password` 주장 검증 정확(클라이언트가 SCRAM verifier를 계산·raw password는 전송되지 않음) ✓ · verifier 자체 민감 취급 ✓ · §4 boolean 6종 ✓.

| # | 결함 | 근거·패치 |
|---|---|---|
| **F-A** | **`createuser --pwprompt`는 "별도 자격 설정" 단계가 될 수 없다** — createuser는 `CREATE ROLE`을 발행하는 도구라서 **이미 생성된 role에는 실패**한다. 현재 문면은 "credential is set SEPARATELY … e.g. `\password <ROLE>` or `createuser --pwprompt`"로, 2단계 흐름의 두 번째 단계 옵션처럼 나열 — 자구대로 따르면 admin이 모순(“role exists” 오류)에 부딪힌다(fail-safe이긴 함). 또한 createuser 단독 경로를 쓸 경우 §3의 role 속성 전부(특히 BYPASSRLS 계열)를 플래그로 보장할 수 있는지 **버전별 확인 필요** | 1~2줄: createuser를 "대안적 **일괄 생성** 경로(생성+pwprompt 동시·§3 속성 플래그 커버리지 확인 필수)"로 옮기거나 삭제하고, 별도-설정 단계 옵션은 `\password`(또는 검증된 등가물)로 한정 |
| **F-B** | **verifier의 서버 로그 캡처에 대한 결정 경로 부재** — `log_statement=all`인 서버에서는 `\password`가 보내는 `ALTER ROLE … PASSWORD 'SCRAM-…'`이 **verifier째로 statement log에 남는다**. §4 boolean(`server_statement_log_captured_credential=false`·`scram_verifier_exposed_or_logged=false`)이 이를 잡아 provisioning을 막지만(fail-safe), **잡힌 뒤의 경로가 미정의** — STOP 목록의 해당 항은 "raw password"만 언급하고 verifier 케이스가 빠져 있음. P-1이 가진 resolution enum 같은 출구가 없다 | 1~2줄: STOP 항을 "credential material(raw password **또는 SCRAM verifier**)이 서버 statement log에 캡처될 상황"으로 확장 + 완화 옵션 노트(예: 해당 세션 한정 로깅 조정은 superuser 필요·별도 승인, 또는 캡처 시 verifier 재설정+로그 처리 결정을 Leo/GPT로) |

### Q3 (P-3 실행 credential 주입) — **CLOSED**
6개 누출 경로 전부 차단 규칙 명문: 인라인 리터럴(history) ✓ · argv(`/proc/<pid>/cmdline`) ✓ · echo/xtrace/env-dump ✓ · 자식 상속 최소화 ✓ · 수명/cleanup(`unset`·subshell·600 파일 미커밋+정리) ✓ · **same-user/root `/proc/<pid>/environ` 가시성 인지 + host 신뢰 불충분 시 STOP** ✓. STOP 목록·§9 필드 반영 ✓.

## 3. Minor 확인

`NOINHERIT` preferred→**required** 승격 + "PUBLIC은 커버 안 함" 정확 주석 ✓ · `catalog_read_verified` boolean 추가 ✓ · 증거 최소화(boolean/count/status) 유지 ✓ · rework log 정직(자기 서술과 diff 일치) ✓.

## 4. 실물 검증

Cosmile `41e5394`: 단일 문서 +67/−7·origin 조상 ✓ · fd `dccedbb`: origin/main 조상 ✓ · **mirror cmp = IDENTICAL** ✓ · scope: P-1/P-2/P-3+minor 2건 외 무변경·DB/secret/role/chmod 접근 0 ✓ · status 헤더 정직(`…PATCHED_AFTER_…PENDING_REREVIEW`) ✓.

## 5. Conflicts / Excluded / 확인 안 된 것

conflicts: 0(Advisor rework validation과의 차이 = F-A/F-B 정밀 판정). excluded: admin 실행·실 DB·secret 값·IMPLEMENTATION_REVIEW. 확인 안 된 것: 실제 대상 서버의 `log_statement` 설정·PG 버전(의도적 미접속 — F-B 패치가 이를 평가·결정 항목화하면 됨) · createuser의 버전별 속성 플래그 커버리지(F-A 패치 문구에 확인 의무로 포함).

## 6. Verdict rationale

Q1·Q3이 메커니즘 수준으로 닫혔고 P-2도 골격은 옳다. 남은 2건은 **보안 절차 정본의 자구 정확성** 문제로, 자구대로 따르면 모순(F-A)이나 미정의 출구(F-B)에 부딪힌다 — 둘 다 fail-safe라 노출은 없지만, 이 문서가 §9(1) 승인의 대상이 되기 전에 1~2줄로 고치는 것이 PASS_WITH_RISK(Leo 위험수용 우회)보다 싸고 정직하다. V2 NEEDS_PATCH 정의("approved scope 내 패치 가능")에 정확히 부합.

## 7. Routing

V2 §9: **NEEDS_PATCH → Advisor in-scope 패치 → 동일 Fable5 세션 재검수(3차·범위 = F-A/F-B 2건만).** 재검수 질문(고정): ① 별도-설정 단계 옵션이 `\password`(등가물)로 한정되고 createuser는 일괄-생성 대안으로 정확히 분류됐는가 ② verifier 로그-캡처가 STOP 목록에 포함되고 결정 경로가 있는가. **admin·Phase 2A = NOT_APPROVED 유지.**

RETURN_TO: Advisor
