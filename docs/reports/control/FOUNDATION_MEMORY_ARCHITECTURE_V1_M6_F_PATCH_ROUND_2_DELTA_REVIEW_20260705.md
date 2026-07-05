# Memory V1 — M6-F Patch Round 2 Delta Re-Review (read-only)

> 기록: foundation-control(Control) · 2026-07-05 · **성격: Control-invoke 독립 delta re-review(Claude 검수 에이전트·read-only·adversarial·1회).**
> ★정직 라벨: Control-invoke 독립 Claude review(외부 Fable5 GPT와 별개). Leo 지정 산출물 경로에 verdict를 faithful 기록.
> ★read-only: 코드/DB/실행 0 · M6-F execution · schema migration · FOUNDATION-side 구현 = **미승인·미검토실행.** Restricted Actions List = source report 참조.
> 대상: reconciliation(`b7947e6`) · package §10/§11 · shadow 정정(`dd2c631`/`91bd803`) · Leo decision 2건(secret_version 컬럼·identity-touch API).

---

## 1. Verdict: **APPROVE_WITH_WATCH**
Patch Round 2(`b7947e6`) + shadow 정정(`dd2c631`/`91bd803`) + Leo decision 2건이 **3개 코드-레벨 finding을 실제로 닫고, Fable5 문서 patch 10건 + watch 5건을 충분히 반영**한다. 방향 타당·M6-F 유의미 진전. ★단 **APPROVE 아님** — M6-F **execution gate는 닫힌 상태 유지**: `secret_version` 설계가 zero-orphan에 **필요하나 불충분**(read-side union + retirement 미명세)·identity-touch API/furef 획득/FOUNDATION ⑧·R9-1 미완(전부 **별도 schema/FOUNDATION gate**로 올바르게 분리). PATCH_REQUIRED 아님 — 닫힌 항목 재개 0·전 finding 반영·잔여는 소규모 doc 정합(신규 라운드 불요).
- 검증 상태: SIASIU HEAD=`dd2c631` · Cosmile HEAD=`91bd803` · foundation-docs HEAD=`b7947e6`.

## 2. Closed findings confirmation (line evidence)
- **(a) 서비스 subject_ref local-minting 중단 — CLOSED(검증).** adapter `_furef_v2()` L104-108 = `"furef_v2_"+HMAC(service_secret,"siasiu:local_user:"+ref)[:32]`(layer-1만)·L127 furef_v2·L138 `"furef_v2"`·L139 `"subject_ref": None`(Foundation-mint 위임)·store furef_v2 키(L55/167/172-176). ★파일 내 `subj_v2_` mint **전무**(주석/위임 문구만). 구 단일-레이어 mint 제거 확정. Cosmile de-anon은 subject_ref mint 안 함(ref_/tref_만).
- **(b) prod fail-closed 3모듈 — CLOSED(검증)·WATCH 1.** SIASIU adapter L17-27·p3 L16-26·Cosmile L12-22 모두 prod+secret 미설정 → raise/throw(import 시). ★**WATCH(W-a):** 3 shadow 모듈 `_is_production()`는 env가 **정확히 prod/production일 때만** True → **unset/unknown env는 dev fallback(fail-permissive).** FOUNDATION `subject_identity._is_production()`(L50-53)는 반대(unknown/unset→production·fail-safe). 리터럴 C-3/C-5는 닫혔으나(정상 구성 prod는 fail-closed), critical secret gate라면 shadow 모듈도 FOUNDATION fail-safe default 채택 권고(비표준 env 값 `prod-us` 등이 dev secret로 silent fallback 방지).
- **(c) raw local_user_ref echo 제거(SIASIU) — CLOSED(검증)·FOUNDATION-side 잔존(deferred).** adapter candidate dict L137-157에 `local_user_ref` 키 **없음**(입력키 L126·param·docstring·주석만). ★FOUNDATION `_factory.py` L32 `"local_user_ref": local_user_ref`(+L57 make_signal) 잔존 = R9-1(별도 FOUNDATION gate). `_factory.py`는 **test-only synthetic builder**(실데이터 0)라 live-path leak 아니나 경계 위생상 FOUNDATION gate에서 제거 필요.

## 3. Patch Round 2 coverage
Fable5 PATCH 10건 + WATCH 5건 **전부 package §11 + reconciliation §4 반영**. **Missing: 없음.**
- ①key-version 격상·②backfill 검증 ≥M4·③guest-only 제외·⑥서비스 secret re-key 축·⑦furef 획득/거버넌스/테이블·⑧identity-touch·⑨유출 정정·⑩correlation 정직화·2a per-service 값·R10-1/R10-2 자구·R8-2/R9-1 watch = 전부 **Adequate**.
- ⑦은 "adequate as doc but shallow" — 테이블 열거됐으나 기존 NULL row의 furef 복구 **실제 방법**은 named-not-defined(backfill exec-gate 설계로 올바르게 연기).
- **Weak(doc-consistency·미싱 아님·W-e):** ⑨/⑩/⑥ 정정이 §11에 append됐으나 **원문 본문 미주석**: package §2 L23 "cross-service correlation 방지"·§3 L32 "한 secret 유출이 전 체인 역추적 안 됨"·§4 L36 "서비스 secret rotation=furef 재계산"이 그대로 fact처럼 잔존. clean-not-compress상 원문 보존은 맞으나, 본문에 **inline 정정 포인터**("★정정됨—§11 ⑨/⑩/⑥ 참조") 추가 권고(구현자가 폐기 텍스트로 행동 방지). 소규모 edit·blocker 아님.

## 4. Leo decision consistency
### P-2 secret_version 컬럼 — 올바른 default 방향·단 명세대로는 orphan 미완전 봉인(최예리 지점)
- subject_ref는 **값(FK)**으로 `ltm_fact`(subject_key=COALESCE·M2 §3.5 L127)·`EpisodeSummary`(§3.3)·`MemoryFactCandidate`(§3.4)·`SubjectRefMap` PK(§3.9)에 박힘. ★M2 계약에 `secret_version` **현재 전무**(grep NONE).
- rotation 시 `HMAC(new_secret,furef)`=**새 subject_ref 값**. SubjectRefMap **단독** `secret_version` 컬럼은 어느 version이 map row를 mint했는지 기록할 뿐, **구 subject_ref 값을 박은 memory row를 rewrite/version-aware화하지 않음** → 복귀 사용자 furef→신-version subject_ref·구 row(구 값 키) **miss=orphan**(설계가 닫겠다는 바로 그 risk).
- reconciliation "구 row 구 version·신 mint 신 version·old/new 공존" = 방향은 맞으나 **핵심 메커닉 누락.** zero-orphan 실봉인 위해 (schema gate에서) `secret_version` 설계가 반드시 명세할 것:
  1. **SubjectRefMap = (furef_local_ref × secret_version)당 1행** → `furef_local_ref`(idx §3.9 L98) 조회가 **모든 live version의 subject_ref 값** 반환.
  2. **memory READ 경로가 furef→모든 live-version subject_ref 값의 UNION**으로 memory 조회(또는 alias/coexistence set 유지). union 없으면 공존 무의미.
  3. **rolling 중 memory row rewrite 안 함**(각자 mint-version subject_ref 값 유지·신 write는 현 version).
  4. **구 version 은퇴 = drop 전 memory row를 은퇴 subject_ref 값에서 re-key/이관**(=fallback "full re-key runbook"은 단순 fallback이 아니라 rolling 설계의 **은퇴 단계**).
- ★결론: `secret_version`은 **필요·올바른 default**이나 **read-side union + retirement 세만틱**이 schema/design gate에서 못박혀야 backfill 전 orphan 봉인. **별도-gate blocker**(Patch Round 2 결함 아님)·단 reconciliation이 "컬럼 단독=zero-orphan"으로 암시하면 안 됨.

### identity-touch API — 3 경계와 양립·viable·제약 조건부
- `subject_identity.resolve_subject`(L67-89)=**순수 함수**(DB/store 0)·`subject_ref_from_foundation_user_ref`(L92-95)가 **이미 furef_v2 입력으로 subject_ref mint**(require_furef_v2=True). → Foundation이 **furef로 stateless mint 가능**·(i)Foundation-only secret(서비스는 FOUNDATION_SUBJECT_REF_SECRET 미수신·subject_identity.py만 read) (ii)no-broker(순수 함수·저장 0·M2 §3.9 L101) (iii)service-local subject_ref 양립.
- ★정밀: reconciliation "resolve_subject/factory가 furef 받도록 정정 필요"인데 resolve_subject는 **이미 furef 수용** — 실 gap은 **call-site만**(`_factory` L30이 raw local_user_ref를 require_furef_v2 미설정으로 전달) + live API wrapper.
- ★API 설계가 반드시 부과할 제약(현재 미명세):
  - Foundation이 furef_v2를 **일시적으로 봄**(HMAC 대상). furef는 가명(raw PII 아님)·수용가능 — **단 durable furef↔subject_ref 로깅/보존 금지**(request/trace 미영속)·아니면 Foundation이 M2 금지 broker.
  - **correlation/probing oracle:** mint 결정론(같은 furef→같은 subject_ref) → API는 **per-service 인증·namespace-scoped(호출자는 자기 `<service>:` namespace furef만 제출)·rate-limited**여야 임의 furef→subject_ref 매핑 probe/bridge 방지.
  - **intra-service furef 일관성(신규 watch W-d):** candidate adapter가 `SIASIU_MEMORY_CANDIDATE_SECRET`로 furef 파생(L108)·이것이 auth/backfill과 공유하는 **정본 per-service furef secret/formula인지 미보증.** 생산자별 furef 상이 시 subject_ref 발산=split-brain 한 층 상승. M6-F execution 설계가 **단일 정본 per-service furef secret+formula 고정**(모든 생산자 동일 furef_v2) 필요. ⑦·2a와 인접하나 별개 축(값 분리가 아니라 단일 **파생**).

## 5. Remaining blockers (execution gate 전)
- **Doc-level(지금 Control 권한 내 close 가능):** package §2 L23/§3 L32/§4 L36에 inline 정정 포인터(→§11 ⑨/⑩/⑥)·(권고) reconciliation에 `secret_version` **단독 불충분** + read-side union/retirement 요구 명시(execution gate가 under-specified "컬럼만 추가" 명령 상속 방지).
- **FOUNDATION-side(별도 gate·미수행·분리 명확):** ⑧ `_factory`/live API가 raw local_user_ref 대신 **furef 수용**(L30·require_furef_v2·core는 이미 furef 가능) · R9-1 `_factory` local_user_ref echo 제거(L32/L57·test-only) · R8-2 api.py reason_codes 상수 enum 가드 · identity-touch API 설계(statelessness·no-retention·per-service auth·namespace·rate-limit·oracle 저항).
- **Schema-level(별도 additive migration gate):** `secret_version` 컬럼 + **full zero-orphan 메커닉**(§4.1~4.4: SubjectRefMap version당 1행·read-path union·rolling 중 no-rewrite·은퇴 re-key) — backfill 비가역이므로 **완전 명세·PASS 후 backfill** · ⑦ furef 획득 실경로(raw stable_id→정본 furef 재계산→identity-touch API) · 2a per-service secret **값** 분리 집행.
- ★**분리 명확·정직.** ⑧·R9-1은 별도 FOUNDATION gate로 명확 연기·미수행 확인(코드 L30/L32 open 상태). prod secret 주입·backfill·live·main merge 전부 0·각 별도 Leo 승인.

## 6. Watch items
- **W-a** prod fail-closed default: 3 shadow 모듈을 FOUNDATION fail-safe(unknown/unset env→production)로 조화.
- **W-b** secret_version 깊이: zero-orphan = read-side union + retirement re-key(컬럼 단독 아님)·schema gate에서 못박기.
- **W-c** identity-touch API 제약: stateless·furef 미보존/미로깅·per-service auth·namespace-scoped·rate-limited·oracle 저항.
- **W-d** 정본 furef 파생: candidate adapter/auth/backfill 걸쳐 단일 per-service furef secret+formula 고정(현재 adapter의 SIASIU_MEMORY_CANDIDATE_SECRET 정본 미확인).
- **W-e** doc-consistency: package §2/§3/§4 본문 inline 정정 포인터.
- **W-f** FOUNDATION deferred: ⑧ furef-수용 entrypoint·R9-1 _factory echo·R8-2 reason_codes enum.
- **W-g** backfill 유효성: guest-only 제외 count·missing-furef abort/skip·idempotency를 backfill harness(execution gate)에서 assert.

## 7. Final recommendation
**APPROVE_WITH_WATCH.** Patch Round 2 + Leo decision 2건이 M6-F를 실제 진전: 3 코드 finding 검증 close(C-4/C-1 `dd2c631`·C-5/C-3 `dd2c631`/`91bd803`·W-2 SIASIU echo 제거)·문서 patch 10 + watch 5 반영. secret_version default·identity-touch API = 올바른 방향·경계 양립. ★**M6-F execution gate 아직 열지 말 것.** prod-secret 주입/subject_ref backfill 전, **별도 gate**에서 close 필수: (1) secret_version **full zero-orphan 설계**(read-side union + retirement re-key·컬럼 단독 불충분) (2) identity-touch API 설계(명시 제약) (3) furef 획득 방법 + 정본 per-service furef 파생 (4) FOUNDATION ⑧ + R9-1. doc-consistency 포인터(W-e)는 현 package에 지금 접을 수 있음. **추가 full patch round 불요** — FOUNDATION/schema 설계 gate로 진행 가능. write/live/promotion/backfill/main-merge = 0 유지.

## 무결성(기록)
Control-invoke 독립 delta re-review verdict faithful 기록 · read-only(코드/DB/실행 0) · M6-F execution 0 · schema migration 0 · FOUNDATION-side 구현 0 · prod secret 0 · backfill 0 · main merge 0(siasiu 3cd068d·cosmile 3ba91e0) · 실 secret 값/raw/PII 출력 0 · 본 review만 foundation-docs commit/push · **execution gate·schema/FOUNDATION gate는 각 별도 Leo 승인.**
