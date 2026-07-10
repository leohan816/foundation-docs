# Fable5 DESIGN_REVIEW Result — Phase 2A Target & Read-Only Boundary Preparation Plan

> Pass: **DESIGN_REVIEW · Level 3** · Actor: Fable5 Reviewer(기존 세션) · Date: 2026-07-10 · Return to: **Advisor**.
> Skill: `/fable-sentinel` 직접 적용. 준수: DB 접속/연결 테스트 0 · query/migration 0 · role/permission/chmod 0 · secret 값 0 · patch 0 · repo 수정 0 · 새 세션/sub-agent 0.
> ★설계 판정은 admin 작업·credential 생성·Phase 2A 실행 승인이 아니다 — 실행 상태 `NOT_APPROVED` 유지.

---

## 1. Verdict: **NEEDS_PATCH**

계획의 골격(attestation 계약·schema 무추론·gate 분리·증거 boolean 계약·Option C HOLD)은 Level 3 수준으로 우수하다. 그러나 04의 7문항 중 **3문항(Q1·Q4·Q5)의 답이 "패치 필요"**다 — 셋 다 이 계획의 존재 이유인 **"증명 가능한 read-only 경계"의 실현 가능성**에 닿는 결함이며, 전부 문서 몇 줄의 in-scope 패치로 닫힌다.

## 2. 04의 7문항 — 명시 답변

| Q | 답 | 근거 |
|---|---|---|
| **Q1 PUBLIC 유효 권한** | **패치 필요** | PostgreSQL은 기본으로 모든 DB에 `PUBLIC`에게 `CONNECT`+`TEMP`를 부여하고, **PUBLIC 권한은 NOINHERIT로도 차단되지 않는다**. 계획 §3은 TEMP를 forbidden으로, §4는 `public_grants_assessed="no write path found"`를 요구하지만 — 기본 설정 Postgres에서 정직한 평가는 **TEMP(임시 객체 생성=쓰기 능력)가 PUBLIC 경유로 존재**를 발견하게 되고, 계획에는 그때의 **처리 경로가 없다**(평가 boolean은 false→계약 실패→막다른 길). 실현 가능한 비파괴 방법을 계획이 정의해야 함: ① inert 템플릿에 선택적 `REVOKE TEMP ON DATABASE <DB> FROM PUBLIC`(+영향 노트·별도 admin 승인) 추가 **또는** ② no-write 주장의 스코프를 "durable/카탈로그 객체"로 명시 한정하고 temp-namespace 잔여를 문서화된 수용+`default_transaction_read_only` 완화로 처리. 부속: `approved_schema`가 `public`으로 attestation될 경우 **PG<15는 PUBLIC이 schema CREATE 보유** — 동일 계열로 처리 필요 |
| **Q2 소유/상속/속성** | 대체로 충분·경미 보강 | zero-membership·zero-ownership·attribute 5종 부재·default privileges 평가 전부 명시 ✓. 보강 2: `NOINHERIT` **preferred → required**로(비용 0·모호성 제거)·PG버전별 public-CREATE 노트(Q1 부속) |
| **Q3 카탈로그 가시성** | 충분(경미 노트) | pg_catalog 기본 가시성 가정 명시 ✓. 실패 시 C-2가 0행→`ABSENT_STOP`으로 **fail-safe 방향 오경보**라 안전. 선택: §4에 `catalog_read_verified` boolean 1개 추가 |
| **Q4 provisioning credential 안전** | **패치 필요** | inert 템플릿의 `PASSWORD '<INJECT_AT_RUNTIME…>'`를 후속 admin이 자구대로 따르면 **평문 비밀번호가 SQL 텍스트로 실행** → psql history·`log_statement` 서버 로그·프로세스 인자에 노출. 계획은 "repo에 안 남긴다"만 다뤘고 **실행 채널 노출을 미정의**. 패치: 평문 PASSWORD 리터럴 실행 금지 명문 + 클라이언트측 해시 방식 지정(`createuser --pwprompt` 또는 `CREATE ROLE … LOGIN` 후 psql `\password <ROLE>` — 해시만 전송) + history/서버로그 위생 노트 |
| **Q5 실행 credential 안전** | **패치 필요** | "process-local env, single command scope" 권고는 방향은 옳으나 **메커니즘 미정**: 대화형 셸에서 `VAR=value cmd`를 타이핑하면 **값이 shell history에 평문 저장**되고, `psql "<URL>"` 형태는 **argv(/proc cmdline)에 노출**된다. 패치: 값의 인라인 타이핑 금지·argv 전달 금지·주입은 `read -s`(echo 없는 프롬프트) 또는 600 파일 source로만·명령/출력에 URL 미출력·자식 프로세스 상속 최소화 — 4줄 규칙 명문 |
| **Q6 attestation/schema 증거** | 충분 | 서명자·4 boolean·`approved_schema`·비밀 아닌 evidence path·만료/재검증 트리거 전부 구체 ✓ 비순환(추론 명시 거부) ✓ |
| **Q7 gate 분리** | 충분 | 설계 PASS ≠ provisioning ≠ hygiene ≠ 실행 — §8 3-gate·§9 3단 승인 필드·경계 재확인 절로 밀봉 ✓ |

## 3. Brief 10기준 coverage

1 alias 정직(candidate 명시) PASS · 2 attestation PASS · 3 schema 무추론 PASS · **4 least-privilege 증명 실현성 — Q1 갭으로 PARTIAL** · 5 CONNECT/USAGE/SELECT 최소성 PASS(C-1/2/3 필요 정확 2테이블+카탈로그) · **6 credential 주입 — Q4/Q5 갭으로 PARTIAL** · 7 `.env.local` 664→600 별도 승인 PASS(무단 변경 없음·본 검수도 메타데이터만) · 8 query scope pointer-only PASS(§7이 복사/확장/실행화 금지) · 9 gate 분리 PASS · 10 STOP+승인 필드 PASS(§8/§9 완결).

## 4. 실물 검증 (요약 불신)

- Cosmile `0ec8667`: 실재·origin 조상·**단일 문서 +182줄**(허용 4파일 중 계획 본체 — scope 정확·runtime/schema 무접촉)
- fd `03d8565`: origin/main 조상 ✓ · **mirror cmp = IDENTICAL** ✓
- 계획 내 secret/URL/host/값 0 재확인 · inert SQL 전부 `DO_NOT_EXECUTE__` 마커 ✓ · 이전 승인 C-1/C-2/C-3 계획(재검수 PASS)과 pointer 정합 ✓
- 본 검수의 접근: 문서 read + git 메타만 — DB/secret/chmod/role 0

## 5. Conflicts / Excluded / 확인 안 된 것

- conflicts: canonical V2·Commerce Memory design·직전 preflight 계획과 충돌 0. Advisor validation과의 차이 = Q1/Q4/Q5를 "패치 필요"로 확정한 것(04는 질문으로 열어둠 — 본 검수가 답).
- excluded: admin 실행·실 DB 상태·secret 값·IMPLEMENTATION_REVIEW.
- 확인 안 된 것: 실제 대상 Postgres의 버전/PUBLIC 설정(의도적 미접속 — Q1 패치가 이를 실행 시점 평가 항목으로 만들면 됨).

## 6. Required patches (전부 문서-레벨·in-scope)

1. **P-1(Q1)**: PUBLIC 기본 CONNECT/TEMP 처리 경로 명문 — 선택적 `REVOKE TEMP ON DATABASE <DB> FROM PUBLIC`(별도 admin 승인·영향 노트) 또는 no-write 스코프 한정+잔여 수용. `approved_schema=public`+PG<15의 PUBLIC CREATE 케이스 포함. §4에 `public_temp_connect_assessed` boolean 추가.
2. **P-2(Q4)**: provisioning 채널 — 평문 `PASSWORD '<literal>'` 실행 금지·클라이언트측 해시 방식(`\password`/`createuser --pwprompt`) 지정·history/log 위생.
3. **P-3(Q5)**: 실행 credential 주입 메커니즘 4줄 — 인라인 타이핑 금지(history)·argv 금지·`read -s` 또는 600 파일 source·URL 미출력.
4. (경미 동반) `NOINHERIT` required로 승격 · `catalog_read_verified` boolean 추가(선택).

## 7. Routing

V2 §9: **NEEDS_PATCH → Advisor가 in-scope 패치 라우팅 → 동일 Fable5 세션 재검수.** 재검수 질문(고정): ① PUBLIC TEMP/CONNECT의 실행 가능한 처리 경로가 있는가 ② provisioning이 평문 비밀번호를 SQL/로그/history에 남기지 않는 방식으로 지정됐는가 ③ 실행 credential이 history/argv/echo 세 경로 전부에서 차단되는가. **Phase 2A 실행·admin 작업 = 계속 NOT_APPROVED.**

RETURN_TO: Advisor
