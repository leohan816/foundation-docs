# 102 — F2 E4 delta re-review: ESM predecessor correction

PASS: `IMPLEMENTATION_REVIEW` delta re-review (HARD 트리거·101A) · VERDICT: **`PASS`** · `RETURN_TO: foundation-advisor`

## Binding · pins (직접 검증)

- Actor: `claude-fable-5` · max · `/fable-sentinel`(세션 기적재) · 정확 Cosmile CWD · Worker(Opus 5/xhigh)와 독립 · 세션 전환 없음.
- Docs `8147e98` HEAD 일치 · 101 sha256 `8c37041a…` · 101A sha256 `a1422d1d…` 일치. 96/98/99는 `8147e98` 고정 인용.
- Product `91ded449..8a1a5b7` = 정확 1 commit · 정확 2경로(M test / M repository) · HEAD=`8a1a5b7`·clean·upstream-equal 직접 확인.
- 앵커: `o1FixtureSetup.ts` import/export만 추가 열람(광역 재독 0) · 테스트/빌드/DB/runtime/실행 0 · RED/GREEN(1F/29skip→1P/29skip)은 99 보고 증거.

## Questions 1–5 (전부 충족)

1. **CLOSED** — bare `require("@/lib/runtime/o1FixtureSetup")` 및 `SYNTHETIC_REPRESENTATIVE` 헬퍼 삭제 → `await import(...)`로 `buildO1SnapshotDoc` 1회 해석. 생성기는 기존 fixture 단일 원천 유지(`SYNTHETIC_REPRESENTATIVE_PRODUCT_ID`=동일 제품 id만 잔존·문서/해시 로컬 재구축 0 — 테스트가 `contentSha256(`/`createHash`/스키마 리터럴 금지).
2. **CLOSED** — 해석은 기존 closed `try` 직후 첫 문장(실패 시 기존 catch → `repository_error` 폐쇄 카테고리), entry 루프·`$transaction` 이전 정확 1회, 단일 `synthetic` 값이 7개 전 `decideCandidatePredecessor` 호출에 재사용(루프 내 구 per-entry 계산 라인 제거). 값은 결정론 생성기(고정 TS·Date.now 0)라 의미 등가·tx 단축만.
3. **CLOSED** — 실 cycle/TDZ 위험 없음: fixture→repository는 정적(구 require와 동일 방향·신규 아님), repository→fixture는 호출 시점 동적뿐. repository 선평가 경로에선 캐시된 완전 평가 namespace 반환, fixture 선평가 경로에선 repository가 정적 의존으로 완전 평가됨 — 양순서 안전. fixture top-level은 상수+함수 선언만(부수효과 0)·`buildO1SnapshotDoc`은 호이스팅 함수 export. 방증: E3 진단에서 같은 함수의 동일 별칭 동적 import(guard)가 그 ESM 그래프에서 이미 해석 성공(3 SQL 단계 통과).
4. **CLOSED** — 신규 focused 테스트는 결함 재도입에 저항: bare require 재도입→"must be gone" 실패·루프 내 재해석→1회 카운트 실패·로컬 재유도→금지 토큰 실패·순서(try<import<loop/tx) 단언·threading(`synthetic` 출현수≥predecessor 호출+1). RED는 pre-fix 소스에서 정확히 그 단언으로 실패(보고). 기존 단언 무접촉 — 테스트 diff는 순수 삽입이며, 인접 replay 테스트의 end-marker `"const SYNTHETIC_REPRESENTATIVE"`는 개명 상수의 접두사로 여전히 동일 위치 매칭(영역 의미 보존 확인).
5. **CLOSED** — 소스 diff는 ①try 직후 9줄 해석 블록 ②루프 내 1줄 제거 ③헬퍼→상수 치환뿐. SQL 문·lineage 규칙(동일 제품 id·동일 생성기 sha)·정확-집합 결정·production 거절 guard·승인 lane·overlay 값·checkout·오류 카테고리 라인 접촉 0 — 전부 byte-불변(diff 직접 대조; 99 "no SQL/overlay/error-category line" 주장과 일치).

## Findings

- **차단 결함 0.**

## Residuals (비차단)

- **R1** 정정된 import는 실 DB에 미실행(STOP 준수) — `insert`/`supersede_update` 단계·나머지 6 entry end-to-end는 여전히 미증명. 다음 격리 runtime 재시도가 폐쇄 지점.
- **R2** source-contract 문자열 oracle 취약성 지속(기지 클래스·형태 앵커로 완화).
- **R3(리뷰어 자기 기록)** bare require는 89가 PASS 준 누적 델타에 이미 존재 — 당시 R2로 "SQL 미실행·runtime gate 이월"을 선언했으나 require-in-ESM 위험 자체는 명명하지 못했고(순환 회피 lazy load로만 읽음), runtime gate가 설계대로 적발했다. 동형 결함 소탕(모듈군 내 잔여 bare require 0)은 신규 테스트의 `no synchronous require` 단언이 후보 경로에 대해 상시 집행.

## Verdict rationale

5개 폐쇄 질문 전부 직접 diff/앵커 증거로 충족·REGRESSION 0·의미 변화 0 — 결함(ReferenceError) 제거는 최소·등가 변환이며 실행 증명만 다음 게이트로 이월. V2 정의상 **PASS**(수용 요구 잔여 위험 없음 — R1은 이미 계획된 게이트의 목적).

`RETURN_TO: foundation-advisor` · 102/103 작성만(101 지시로 commit/push 미수행 — Advisor 라우팅) · Reviewer STOP.
