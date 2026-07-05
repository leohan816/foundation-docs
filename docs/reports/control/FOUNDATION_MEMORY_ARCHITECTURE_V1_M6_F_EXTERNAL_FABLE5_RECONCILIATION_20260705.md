# Memory V1 — M6-F External Fable5 Reconciliation + Patch Round 2

> 작성: foundation-control(Control) · 2026-07-05 · **범위: 외부 Fable5 strict review(`c622f14`) ↔ Control patch round(`5e46279`) reconciliation + 남은 문서 패치(Patch Round 2).**
> ★M6-F execution · prod secret 주입 · subject_ref backfill · prod/live/main merge = **미승인·미수행.** Restricted Actions List = source report(외부 Fable5 review) 참조(본 문서에서 확장 안 함). package reconciliation / patch planning / shadow-safe correction only.
> 근거: 외부 Fable5 review(`c622f14`·PATCH_REQUIRED) · Control-invoke 독립 검수(`ca60b80`) · Control patch round(`5e46279`·shadow `dd2c631`/`91bd803`) · M6-F package(`20190fb`→patch `5e46279`).

---

## 1. Fact
- 외부 Fable5는 **원본 package `20190fb`**(Control patch round 이전)를 검수 → Control-invoke 검수의 **C-1/C-2/C-3을 독립 corroborate** + backfill 게이트·secret 유출 경계에서 **추가 FAIL/이견** 제시.
- Control patch round `5e46279`가 **C-4/C-1·C-5/C-3·W-2(SIASIU)를 이미 코드로 정정** → 이미 닫힌 것과 남은 것을 분리.
- **남은 항목 = 전부 문서-레벨**(외부 검수 §11 "PATCH 10건 전부 문서-레벨") + 일부 FOUNDATION-side 코드(별도 gate). 이번 라운드 = **package Patch Round 2(문서)** + Leo decision 2건. ★코드 추가 변경 없음(P-1/P-3/W-2 이미 완료).

## 2. External Fable5 verdict
- **PATCH_REQUIRED** — Control-invoke 검수와 **verdict 일치**. chain 표기(§2)·경계 코드(durable/cross-service 0·raw/PII 0) 견고하나, backfill/secret **execution-gate 미완**. §11 PATCH 10건(문서) 반영 후 재검토. ★어떤 실행도 미승인.

## 3. Already closed by 5e46279 (evidence)
| 외부 finding | 상태 | Evidence |
|---|---|---|
| **C-4 shadow split-brain**(=Control C-1·서비스 subj_v2 단일-레이어 mint) | ✅ **CLOSED** | SIASIU adapter `dd2c631`: `_furef_v2`(L104)·candidate `"furef_v2"`(L138)·`"subject_ref": None`(L139·Foundation-mint 위임)·shadow store furef_v2 키. 서비스 subject_ref **local-minting 중단**. test 28/28(S2b furef_v2·S2c subject_ref=None) |
| **C-5 dev fallback fail-open**(=Control C-3) | ✅ **CLOSED** | 3 모듈 `_is_production()`+fail-closed(`dd2c631`·`91bd803`): prod+env secret 미설정 → raise/throw. 실증 PASS(prod raise·dev fallback) |
| **W-2 raw local_user_ref echo**(SIASIU adapter) | ✅ **CLOSED(SIASIU)** | candidate `"local_user_ref": local_ref` echo 제거(count 0). ★단 FOUNDATION `_factory.py:32` 잔존 → R9-1(§4) |
- ★위 3건은 외부 검수가 본 **`20190fb` 기준**이며, `5e46279`(이후)에서 코드 정정 완료. 외부 재검수 시 CLOSED 확인 대상.

## 4. Still open (Patch Round 2 대상)
### 문서-레벨(package patch·이번 라운드 반영)
1. **① key-version 필수 선결 격상**(C-1·Control C-2 corroborate): `subj_v2_`는 스킴 버전이지 secret 버전 아님·SubjectRefMap에 `secret_version` 없음 → rotation 후 재계산 봉인. §4 **선택지→backfill 필수 선결**로 격상 + `secret_version` 도입.
2. **② backfill 검증기준 M4 §7 이상**(이견 수용): §5 5조건에 **검증/수용 기준**(전후 NULL/row count·checksum·idempotency·부분실패 rollback·복원 리허설) 추가. 저위험 M4 additive가 count/checksum+복원 리허설 요구하는데 비가역 backfill이 더 약하면 역전 → M4 이상.
3. **③ guest-only row 제외**(강도 이견 수용): M2 §3.5 `subject_key=COALESCE(subject_ref,guest_ref)`·guest_ref-only row는 furef 부재로 **backfill 대상 아님**(NULL 정상). §5 "NULL→계산" 무차별 → guest 오염/미동의 병합 위반 → **guest-only 제외** 명시.
4. **⑥/5a 서비스 secret rotation도 re-key 축**: `subj_v2=HMAC(F,furef)`상 서비스 secret rotation도 그 서비스 전 subj_v2 연쇄 변경 → orphan. **두 축(Foundation·service) 모두 re-key 축** 명시.
5. **⑦ furef 획득 경로 + SubjectRefMap 매핑 범위/거버넌스 + 대상 테이블 열거**: 기존 NULL row의 furef 획득 방법·SubjectRefMap(가명 PII) 저장 범위/거버넌스·대상 repo/table(SIASIU `subject_ref_map`·`ltm_fact`·`memory_fact_candidate`·`episode_summary` / Cosmile `SubjectRefMap`·`LongTermMemoryFact`·`MemoryFactCandidate`·overlay 5모델) 열거.
6. **⑨ §3 유출 주장 정정**: "한 secret 유출이 전 체인 역추적 안 됨"은 **부정확** — SubjectRefMap이 furef↔subject_ref를 서비스 DB에 실체화 → **서비스 secret 1건 + 서비스 DB 접근**이면 Foundation secret 없이 전 체인 역추적. 2-layer 방어 = **매핑 미접근 공격자 한정** 전제 명시.
7. **⑩ §2 correlation 정직화**: "correlation 방지" 단정 → namespace 격리는 crypto 보증 아님(양 furef 역산→id 복원→graph join 가능). 실제 차단선 = **consent fail-closed·flag OFF·gate**(secret 구조 아님)로 정정(identity policy `20260703` 계승).
8. **2a per-service secret 값 분리 배포 집행**: 동일 env명 read → 공유 가능 → M6-F가 **per-service 상이 secret 값 배포를 신규 요구·집행**(값 분리 검증).
9. **R10-1 순서 의존 자구**: §8 "prod secret 주입·backfill 독립"은 부정확(backfill은 secret 주입 완료 필수)·§5 조건1 "확정(값 결정)"≠"주입 완료" → **backfill 선결 = secret 주입 완료**로 자구 정정(dev-env backfill 해석 차단).
10. **R10-2 review trigger 자구**: §9 "(또는 Control invoke)" → **"Leo 승인 하 Control 대행"**으로 고정(critical gate review trigger 권한 명확화).
11. **R8-2 reason_codes enum guard**(watch): `api.py reason_codes:[str(e)]` 예외 통과·현재 상수라 안전하나 **상수 enum 가드 미요구** → watch(FOUNDATION-side·향후).

### FOUNDATION-side 코드(★shadow 범위 밖·별도 gate·이번 미수행)
12. **⑧ 파생 흐름(identity-touch API) 정의**(§5 Leo decision과 연동): 서비스가 subject_ref를 얻는 경로 = **identity-touch API**(서비스가 **furef**를 Foundation에 전송 → Foundation이 `subj_v2=HMAC(F,furef)` mint·회수) 권고. ★현재 FOUNDATION `_factory.make_candidate`는 **raw local_user_ref**를 받아 `resolve_subject` 호출(L30) → 서비스가 raw pre-image 전송하는 구조 → **resolve_subject/factory가 furef를 받도록 FOUNDATION-side 정정 필요**(별도 gate).
13. **R9-1 legacy local_user_ref 폐기**: M2 v1.2에서 필드 제거(0회)됐으나 FOUNDATION `_factory.py:32` 산출 dict 잔존(SIASIU adapter는 `dd2c631`로 제거 완료) → **FOUNDATION _factory에서도 제거**(별도 gate) + package legacy 폐기 명시.

## 5. Disputed / Leo decision needed
- **[Leo decision 1 — P-2 rotation-version]** ★**권고 default 하나로 좁힘: `secret_version` 컬럼(embedded key-version) 방식.**
  - SubjectRefMap(+ subject_ref 소유 테이블)에 **`secret_version` 컬럼 추가** → rotation 시 version 증가·**구 row는 구 version 유지·신 mint는 신 version**·`furef_local_ref` 보존으로 version별 재계산·**old/new 공존(zero-orphan rolling rotation)**·rollback=version 되돌림. subj_v2_ prefix 변경 불요(컬럼이 version 소유).
  - **fallback = full re-key runbook**(`furef_local_ref` 기반 전 row 재계산+atomic cutover+backup+rollback·rolling 불가). ★default 채택 권고·fallback은 version 붕괴 필요 시만.
  - ★이 결정은 **prod secret 확정/backfill 전 Leo 승인** 필요(schema에 secret_version 추가는 별도 additive migration gate).
- **[Leo decision 2 — ⑧ derivation flow]** ★**권고: identity-touch API**(서비스 furef 전송→Foundation subject_ref mint). 대안(secret 공유)은 §3 경계 위반이라 **비권고**. ★resolve_subject/factory가 furef를 받도록 FOUNDATION-side 정정 = 별도 gate(Leo 승인).
- **[방법론 이견 — Control 수용(not disputed)]** 외부가 Control-invoke item 7(backfill PASS)·item 2(secret boundary PASS)를 **FAIL로 이견**. Control은 **더 엄격한 외부 판정을 수용**(backfill은 비가역이라 M4 이상 게이트 필요·SubjectRefMap 유출 경로 정직화). → 분쟁 아님·안전측 채택.

## 6. Patch plan (Patch Round 2)
- **package 문서 패치(§11 신설 PATCH ROUND 2):** 위 §4 문서-레벨 11건(①②③⑥⑦⑨⑩ + 2a·R10-1·R10-2·R8-2) 반영 — key-version 필수 선결·backfill 검증기준 M4 이상·guest-only 제외·서비스 secret re-key 축·furef 획득/SubjectRefMap 거버넌스/대상 테이블 열거·유출 주장 정정·correlation 정직화·per-service 값 분리 집행·순서 의존 자구·review trigger 자구·reason_codes watch.
- **FOUNDATION-side(별도 gate·이번 미수행):** ⑧ identity-touch API(resolve_subject furef 수용)·R9-1 _factory local_user_ref 제거 — Leo decision 2 확정 후 별도 FOUNDATION gate.
- ★코드: 이번 라운드 **shadow 추가 변경 0**(P-1/P-3/W-2 이미 `dd2c631`/`91bd803`). backfill 검증 harness는 **backfill execution gate에서** 구현(설계만).

## 7. Tests / evidence plan
- **현 상태(회귀 유지):** adapter 28/28·p3 16/16·de-anon 14/14·vitest 10/10·fingerprint `d7f579443f8a110a`·integration 39/39·workflow 119/119·readiness 164/164·loop 112/112·commerce .ts 무변경(이번 라운드 코드 무변경이므로 유지).
- **문서 패치 evidence:** package §11 PATCH ROUND 2 diff·본 reconciliation.
- **향후(execution gate에서):** backfill 검증 harness = 전후 NULL/row count·checksum·idempotency(재실행 동일)·guest-only 제외 count·부분실패 rollback·복원 리허설(EXEC-1 패턴)·per-service secret 값 분리 assert. ★raw/PII 0·count/hash/boolean만.

## 8. Re-review plan
- Patch Round 2(package 문서 패치) 반영 후 → **재검수 1회**(독립 strict review + 외부 Fable5 비교): (a) CLOSED 3건 확인 (b) 문서 패치 11건 반영 확인 (c) Leo decision 2건(secret_version·identity-touch API) 정합 (d) FOUNDATION-side gate(⑧·R9-1) 분리 확인.
- 재검수 = read-only·prod/live/backfill/main merge 0.
- 재검수 APPROVE/APPROVE_WITH_WATCH 후에야 M6-F execution gate(prod secret·backfill) 각 별도 Leo 승인.

## 9. Next action
- **Leo decision:** ① **P-2 rotation = `secret_version` 컬럼(default)** 승인 여부 ② **derivation = identity-touch API** 승인 여부.
- **Control(승인 시):** package §11 PATCH ROUND 2 문서 패치 반영 → 재검수 요청. FOUNDATION-side gate(⑧·R9-1)는 별도 설계.
- ★**이번 라운드 = reconciliation + 문서 patch planning까지.** M6-F execution·prod secret·backfill·prod/live/main merge 미승인.

## 무결성
External Fable5 reconciliation + Patch Round 2(문서) only · M6-F execution 0 · prod secret 실주입 0 · subject_ref backfill 0 · prod DB 0 · live 0 · hard reject 0 · repair/mapping/backfill 0 · **main merge 0**(siasiu 3cd068d·cosmile 3ba91e0) · schema code main merge 0 · raw/PII/실 secret 값 출력 0 · durable/cross-service/V3 0 · 이번 라운드 shadow 코드 변경 0(기 정정 `dd2c631`/`91bd803`) · 실 DB/logins 무접촉 · 본 reconciliation + package patch만 foundation-docs commit/push · **Leo decision·재검수·M6-F execution은 각 별도 승인.**
