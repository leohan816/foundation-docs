# Memory Architecture V1 — Fable5 M4/M5 Implementation Readiness Review

> 검증자: **Fable5** (독립·Control self-review 금지) · 2026-07-04 · **판정: READY_FOR_M4_WITH_PATCHES**
> 대상: M4 Implementation Plan(`690467f`)·M5 Foundation Gate Plan(`0a84721`) vs M2/M3 v1.2 FINAL_PASS·앵커·인벤토리·**실코드**
> 방법: plan 2종 전문 정독 + 3축 적대 검증(M4 plan/migration · M5 gate plan · privacy/tests) + read-only 코드 대조(brain.py·store.js·candidate adapter·core.py·contracts.py·gate.py·schema.prisma) — plan의 코드 주장 전건 실코드 검증
> 무결성: code change 0 · migration 0 · source push 0 · raw 고객 데이터/secret/PII 0 · 구현 실행 0

---

## A. Verdict: **READY_FOR_M4_WITH_PATCHES**

M4/M5 plan은 M2/M3 v1.2 계약을 충실히 구현 단위로 옮겼고(계약 대조 무결·코드 주장 전건 사실), **shadow/flag-OFF/live-금지 원칙이 건전**하다. 그러나 ① B12 migration plan이 Leo 승인 대상이 될 수 없는 요약 수준(FAIL) ② M5 gate plan에 구현 전 반드시 고칠 결함 5건(FAIL — consult_chat 우회·shadow echo 재유입·중첩 케이스 부재 등) ③ 지금 결정하지 않으면 비용이 커지는 미결 3건(trace_id 방식·subject_ref backfill·B4 소유 train)이 있어, **plan 패치(§G) 반영 후 M4 착수·M5 병행**이 옳다. NOT_READY 아님 — 전부 문서/plan-레벨 패치.

## B. 핵심 판단

| 질문 | 판단 |
|---|---|
| M4 착수 | **조건부 가능** — 선행 3건: **B10**(V0 SUPERSEDED 헤더 — 5분 patch·미이행 확인) · **B12**(migration plan 문서 보강 → Leo 승인·현재 승인 대상 불성립) · **B1**(★사실상 해소 — `1ce099e`는 **SIASIU repo commit**·adapter는 `FOUNDATION/foundation/cosmile/` 실존. plan의 "Cosmile clone 조사" 자구는 오방향 — 정정 후 164/164 재현만 잔여) |
| M5 착수 | **plan 패치 후 가능** — anchors/shadow 설계 건전하나 §H의 FAIL 5건 반영 전 구현 지시 발행 금지 |
| M4/M5 병행 | **가능 — 오히려 gate shadow 선착수 권고**: 데이터 무접촉·최저위험·synthetic payload+Foundation **self-echo** round-trip만으로 M4와 독립 검증 가능(서비스-조립 E2E만 M4 의존). 서비스 schema가 B12에 막혀 있는 동안 gate를 진행하는 편이 우월 |
| M4/M5 분리 기준 | **B4 소유 train을 단일화하라(현재 이중 배정)**: 권고 = **gate 모듈 구현+synthetic/self-echo 테스트 = M5 train 단독 소유**(M4 §4 B4 행·§10 step 3에서 제거) · consult_contract 배선 = M5 · echo E2E(서비스 조립) = M4 완료 후 통합 |
| M6로 반드시 넘길 것 | hard reject 활성 · prod secret live(B3) · raw 저장 live(B5) · real-user consult live · cross-service 일체 — **plan과 일치(적정)**. 추가: **M4 subject_ref backfill 금지**(§F R-2 — NULL 유지·M6 단일 backfill) |

## C. B1~B15 재분류 검토표

| id | 현재 분류 | Fable5 판정 | 수정 | 이유 | 최종 처리 |
|---|---|---|---|---|---|
| B1 | M4 선행(Cosmile 조사) | **정정 필요** | 자구 | `1ce099e`=SIASIU commit("feat(cosmile): Phase 5 Readiness")·Cosmile repo에 부재(`git cat-file` 실패)·adapter 8파일 `FOUNDATION/foundation/cosmile/` 실존 — CLAUDE.md §7 비대칭 메모와 정합 | M4 선행 — **탐색 자구 교체 후 164/164 재현으로 즉시 close** |
| B2 | M4 동반(원자) | 적정 | — (단 trace_id 방식 확정 §G-4) | M2 §9 정합 | M4 동반 |
| B3 | M4 배선·M6 secret | 적정 | — | live=M6 원칙 올바른 적용 | M4/M6 |
| B4 | M4(shadow)·M5(배선) | **정정 필요** | 소유 단일화 | M4 §10 step3 vs M5 §10 "M5 본체" 이중 배정 — 착수 주체 모호 | **M5 단독 소유** |
| B5 | M4 스펙·M6 live | 적정+보강 | SIASIU grandfather 자구 | 기존 `episode.text` 평문 write는 **기존 baseline**(신설 아님) — 문자 적용 시 fingerprint/119 파괴 | M4/M6 |
| B6 | M4(설계→구현) | 적정 | — | D-8 분기 실코드 확인(brain.py:237-246 선-return) | M4 |
| B7 | 해소 | 확인 | — | v1.2 재확정 | 해소 |
| B8 | M4 값·M5 sweep | **보강** | TTL을 **backfill 전** 확정 | expires_at=NULL backfill 후 값 확정 시 2차 backfill 재발 | M4 선행-값 확정 |
| B9 | M4 | 적정 | — | — | M4 |
| B10 | M4 선행 | **미이행 확인** | 즉시 patch | V0 헤더 여전히 "single source of truth"·SUPERSEDED 0 | M4 선행 — 즉시 |
| B11 | M4 | 적정 | — | unsalted sha256/_DEV_SALT 실코드 확인 | M4 |
| B12 | M4 선행 | **FAIL — 문서 불충분** | §G-1 보강 | 5불릿 요약 — 승인 대상 불성립. WAL 백업·pre-index 스캔·D-8 데이터 수리·Prisma reset 금지·secret 의존·합격 수치 부재 | M4 선행 — 보강 후 Leo 승인 |
| B13 | M4 동반 | 적정 | — | — | M4 동반 |
| B14 | M4 | 보강 | grandfather 정책(B5와 동일) | 신규 write에만 gate·기존 경로는 M6 전환 | M4(신규 한정) |
| B15 | 문서 해소·M5 구현 | 적정 | — | FINAL §G와 일치 | M5 |

## D. 구현 순서 제안 (plan §10 수정판)

1. **B10 close**(V0 SUPERSEDED 헤더 — 즉시) + **B1 close**(정정 자구로 SIASIU/FOUNDATION 확인·164/164 재현) + **B12 문서 보강 → Leo 승인** + **미결 3건 확정**(trace_id=keyed-hash 고정·subject_ref M4 backfill 금지·B4=M5 소유)
2. **M5 plan 패치**(§H) → **Foundation gate shadow 선착수**(ingress_gate.py·synthetic reject/pass matrix·self-echo round-trip — 서비스 schema와 무관·병행)
3. **SIASIU train**: B6 분기 설계 확정 → P3 patch + schema shadow(additive·pre-index 스캔/수리 포함) — 원자 커밋
4. **Cosmile train**: P1/P2 patch + schema shadow(8 신설+overlay nullable) — 원자 커밋
5. **integration tests**(M4 §9 전량 + 서비스-조립 echo E2E·shadow)
6. **Fable5/Codex post-implementation review**
7. **M5 consult_contract 배선**(gate shadow → 배선·여전히 hard reject 금지)
8. **M6**(별도 승인): hard reject·prod secret·subject_ref 단일 backfill·raw live·real-user

## E. repo별 Implementation Brief

### E-1. Control — B1/B10/B12 preparation brief
- **범위:** 문서 3건(코드 0). ① V0 파일 헤더에 `> ★상태: SUPERSEDED by COMMON_SERVICE_MEMORY_CONTRACT_V1(M2 v1.2) — 소유/저장/broker 모델 폐기·enum만 참고(M2 §12)` 삽입 ② B1 자구 정정(1ce099e=SIASIU commit·FOUNDATION/foundation/cosmile/ 확인·164/164 재현) ③ **B12 migration plan 문서 신설**: WAL-인지 백업(`sqlite3 .backup`/`VACUUM INTO`+quiesce — naive copy 금지·brain.py:68 WAL) · pre-index 중복 스캔 SQL(SINGLE: pregnancy 2-active·다중값: norm_value 수렴 중복) + 결정론 수리 정책(SINGLE=최신 as_of 승자·다중값=최고 confidence merge) · D-8 기존 데이터 수리 단계 · `prisma migrate reset`/`db push --accept-data-loss` **금지** 명문 · subject_ref backfill 정책(M4=NULL 유지) · 테이블별 row count/checksum 전후 일치 + rollback rehearsal 합격 기준
- **읽을 문서:** M2 §5/§14 · 본 리뷰 §C/§F · M4 plan §8 · **금지:** 코드/migration/source push · **성공:** Leo 승인 획득 · **보고:** 문서 경로+commit hash+승인 기록

### E-2. SIASIU implementation brief
- **범위:** `app/brain.py`(분기 순서·additive ALTER·per-fact delete)·`app/assets/js/store.js`(userId 발급)·`app/ssbrain/foundation_memory_candidate_adapter.py`(재작성)·신설 5테이블·`logins.txt` P3 patch — **전부 additive·flag OFF·shadow**
- **읽을 문서:** M2 v1.2(§3.5/§5/§6/§11/§13) · M4 plan §5/§8/§11 · B12 승인 문서 · **절대 금지:** answer.py 수정(fingerprint `d7f579443f8a110a`)·기존 recall/reset behavior 변경·live write·non-additive migration·raw 고객 데이터 열람·기존 episode 경로에 B14 gate 적용(신규 write 한정·grandfather)
- **핵심 순서:** ① B6 분기 설계(SAFETY∩SINGLE = SINGLE supersede 우선·active≤1) ② pre-index 스캔/수리(dry-run) ③ additive 컬럼+신설 테이블 ④ P3 patch(같은 train·원자) ⑤ candidate adapter 재작성(keyed HMAC·subj_v2_[:32])
- **성공:** integration 39/39·workflow 119/119·fingerprint unchanged·SAFETY∩SINGLE active≤1 테스트·subject_key COALESCE unique·must_not_reappear · **rollback:** backup 복원+additive revert · **보고:** 커밋 hash·테스트 수치·pre-scan 결과·미커밋 0

### E-3. Cosmile implementation brief
- **범위:** prisma 신설 8 model + ConsultationSessionMeta 확장 + overlay 컬럼(**nullable** — 기존 row NOT NULL 금지·신규 row 시점 강제) + **P1/P2 patch 원자 동반**(foundation_decision_received: trace_id **keyed-hash 저장**(미저장 아님·V3 attribution)·userId XOR anonymousId 분리 / SignalOutbox: raw ids→payload_refs)
- **읽을 문서:** M2 v1.2(§3.x/§9/§11) · M4 plan §6 · B1 close 기록 · **절대 금지:** raw content 평문 populate(스키마만·flag OFF — at-rest 없이는 raw write 0)·checkout/order 로직 변경·`prisma migrate reset`·P-patch 없는 memory 커밋 merge
- **성공:** readiness 164/164·loop 112/112·trace_id↔raw id same row=0·payload_refs only·overlay 기존 row 무손상 · **rollback:** migration revert+backup · **보고:** 커밋 hash·수치·P1/P2 동반 확인

### E-4. Foundation M5 gate shadow brief
- **범위:** 신규 `foundation_http_service/ingress_gate.py` + 테스트(신규 scripts/) — **M5 plan 패치판(§H) 기준**. gate는 **raw SSC dict를 validate_ssc 이전에** 스캔. shadow=판정+enum/code 로그만(**key-name을 로그 사유에 포함 금지** — 위치는 path index로)·**shadow에서도 echo 위반 필드는 session_context_out에서 strip**(재유입 차단·Q7-6)
- **읽을 문서:** M3 v1.2 §4/§5/§7/§9 · M5 plan(패치판) · **절대 금지:** hard reject 활성·has_raw_or_pii 단순 재사용·consult_chat/기존 트래픽 behavior 변경·durable write·memory_read_provider 연결·raw payload 로그
- **성공:** 패치판 reject matrix(중첩·session_id key·per-field 상한·호환모드 조합 포함) 전량 + pass matrix(legacy 호환 pass 포함) 전량 + **self-echo round-trip**(synthetic→session_out→재주입 pass) + runner 89/89·651 유지 · **rollback:** flag OFF=inert · **보고:** 커밋 hash·matrix 결과표·self-echo 증적
- **/v1/consult/chat 우회(Q2-01):** 본 train에서 **정책 결정 필수** — (권고) 동일 gate를 consult/chat+alias에도 shadow 배선, 불가 시 "우회 endpoint"를 W-항목으로 명시 등록+M6 전 처리 약속

### E-5. Fable5/Codex post-implementation review brief
- **범위:** M4/M5 shadow 구현 결과 검증(코드 0·재현만) — ① 계약↔구현 field-level 대조(9엔티티·upsert·gate rule 8) ② matrix 전량 재실행 ③ 기존 5종 회귀+fingerprint ④ STOP 스캔(아래 grep 세트) ⑤ P-patch 원자성(git log로 merge 순서 검증)
- **STOP 자동화 세트:** `grep -rn "memory_write.*true\|memory_db_created" foundation_http_service/` =0 · trace_id↔identity same-row SQL 검사 · `git diff --stat`에 answer.py 부재 · raw payload in logs grep · cross-service import grep · 기존 테스트 count 감소 diff
- **판정:** APPROVED → M5 배선 승인 / PATCH_REQUIRED → repo-local 수정 후 delta 재검증

## F. 위험 목록

| id | sev | repo | 위험 | 완화 | 테스트 | rollback |
|---|---|---|---|---|---|---|
| R-1 | HIGH | SIASIU | **partial UNIQUE index 생성 abort** — D-8 기존 모순 2-active·norm_value 수렴 중복이 실DB에 존재 가능 | B12 pre-scan SQL+결정론 수리 → index | dry-run에서 index 생성 성공+수리 로그 | backup 복원 |
| R-2 | HIGH | SIASIU/Cosmile | **subject_ref dev-secret backfill → M6 전면 re-keying**(SubjectRefMap PK=subject_ref) | M4 backfill 금지(NULL 유지)·M6 단일 backfill | backfill 0 assert | — (예방) |
| R-3 | HIGH | Foundation | **shadow echo 재유입**(reject 판정 payload가 session_out으로 verbatim echo→서비스 storage) | shadow에서도 위반 필드 out-strip 명세 | 위반 주입→out에 부재 assert | flag OFF |
| R-4 | HIGH | Foundation | **/v1/consult/chat gate 우회**(현행 주 유입 경로 무방비) | 동일 gate shadow 배선 or W-등록+M6 기한 | consult/chat에 위반 주입→shadow 로그 | flag OFF |
| R-5 | HIGH | Cosmile | **서버 raw 원문 저장 신설 = 신규 PII store** | 스키마만·flag OFF·at-rest(B5) 전 raw write 0 | raw populate 0 grep/SQL | 컬럼 잔존·데이터 0 |
| R-6 | MED | SIASIU | email-PK 재키잉 오병합/분열(store.js userId) | 안정 id 발급+매핑 검증·병합은 B-e 규칙 | 재키잉 전후 fact 소유 대조 | 매핑 revert |
| R-7 | MED | SIASIU | B14 gate를 기존 경로에 적용해 baseline 파괴 | grandfather(신규 write 한정) 명문 | fingerprint·119/119 | revert |
| R-8 | MED | Foundation | 정상 트래픽 오거부(placement map 부재·service_context 허용키 0) | §H placement map+legacy pass 케이스 | pass matrix(legacy 포함) | flag OFF |
| R-9 | MED | Cosmile | P1/P2 슬립(이벤트 테이블 de-anon 잔존) | 원자 merge-block(같은 PR·CI same-row 검사) | same-row SQL=0 | P-patch revert(원자) |

## G. Fable5 수정 제안 (Control patch request 초안)

```
[M4/M5 PLAN PATCH — Fable5 readiness review 반영]
파일: docs/reports/control/FOUNDATION_MEMORY_ARCHITECTURE_V1_M4_IMPLEMENTATION_PLAN_20260704.md ·
     .../M5_FOUNDATION_GATE_PLAN_20260704.md · contracts/CROSS_PLATFORM_SHARED_MEMORY_CONTRACT_V0.md(B10)
     + 신설 B12 migration plan 문서
지시(자구는 본 리뷰 §C/§E/§H 인용):
 G-1 B12 문서 신설(§E-1 ③ 목록 전항 — WAL 백업·pre-scan·수리 정책·Prisma reset 금지·secret 의존·합격 수치)
 G-2 M4 §4 B1 행: 탐색 자구를 SIASIU/FOUNDATION 확인+164/164 재현으로 교체
 G-3 B10: V0 헤더 SUPERSEDED 1행 삽입(즉시)
 G-4 M4 §6 B2: trace_id 방식을 keyed-hash(HMAC·per-service)로 확정(미저장 옵션 삭제 — V3 attribution·M2 §15 정합)
 G-5 M4 §4/§10: B4를 M5 단독 소유로 정정(M4 step3 제거)·B8에 "TTL 값은 backfill 전 확정" 추가
 G-6 M4 §5/B5/B14: SIASIU 기존 episode.text 평문 = grandfather(신규 write에만 write-gate·기존 경로 전환은 M6) 명문
 G-7 M5 plan: §H의 8건 반영(reject +7행·pass +3행·placement map·validate-전 확정·shadow echo strip·
     consult_chat 정책·DELETED_REUSE 재명세·로그 key-name 금지)
금지: 코드 0·migration 0·source push 0·raw/secret 0. foundation-docs만 explicit add·commit/push.
완료 보고: 파일 경로·commit hash·G-1~G-7 반영표 → Fable5 경량 delta 확인 후 M4 착수.
```

## H. M5 plan 평가

**골격은 구현 착수 전 계획으로 적합**(code anchor 전건 실코드 일치·SUPERSEDED 처리 정확·shadow/STOP 건전). **구현 지시 발행 전 필수 수정 8건:**
1. [FAIL] **reject matrix에 중첩 케이스 추가**(재귀 스캔 증명): `ltm_fact_refs[0]에 customer_id 중첩 → GATE_REJECT_IDENTIFIER`
2. [FAIL] **raw `session_id` 키 행 추가**(bare UUID와 별개)
3. [FAIL] **행8 GATE_REJECT_DELETED_REUSE 재명세** — payload에 deleted/blocked 마커 부재로 gate 구현 불가 → "service-side filter 책임 + gate는 fact_state 비멤버(deleted 등 문자열 유입) reject"로 교체
4. [FAIL] **/v1/consult/chat(+alias) 우회를 touchpoint에 추가** — 동일 gate shadow 배선(권고) 또는 명시적 W-등록
5. [FAIL·Q7-6] **shadow echo strip 명세** — shadow에서도 위반 필드는 session_context_out에서 제거(재유입 차단·STOP과 문면 정합)
6. [RISK] **whitelist placement map 신설**(top-level/session_context/product_context/service_context 배치 — service_context 허용키 0 문제 해소: 기존 SSC service_context는 contract-경로 scan에서 "SSC 자체 필드"로 별도 취급 명시) + gate 위치 확정 자구: "raw dict를 validate_ssc **이전** 스캔"
7. [RISK] reject 추가: 호환모드+raw utterance · safety_facts>128(**drop 금지 필드의 유일 reject 경로**) · session_ref>128 · ConditionCategory/SummaryIntentTag/`small_talk` 비멤버 — pass 추가: **version 생략+정상 legacy 형상 → pass**(무파괴 양성 증거·pass matrix 실제 7행) · subject_ref=subj_v2_* → pass+strip 로그 · self-echo에 version 재부착 규칙(vacuous 통과 방지)
8. [RISK] echo round-trip은 **Foundation self-echo로 M5에서 즉시 고정**(M4 이후로 미루지 말 것 — REG-1 본체) · 로그에 key-name 미포함(path index만)

## I. 금지 및 무결성 확인

code change **0** · migration **0** · source repo push **0** · raw 고객 데이터/secret **0**(memory.db·dev.db 파일 미열람 — 스키마는 CREATE문/prisma로만) · live/write/promotion **0** · cross-service memory **0** · Foundation customer LTM **0** · 산출물 = foundation-docs 본 문서만.

---
> **한 줄 결론:** 계획은 계약을 배신하지 않았다 — 그러나 migration의 칼끝(UNIQUE index)과 gate의 뒷문(consult/chat·shadow echo)이 아직 종이 위에 없다. §G 패치 한 번이면 M4 train은 출발할 수 있다.
