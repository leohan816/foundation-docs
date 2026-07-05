# Memory V1 — Goal 4 / M6-F Goal Package (prod secret / subject_ref chain)

> 작성: foundation-control(Control) · 2026-07-05 · **요청 유형: M6-F 실행 계획/검증 package(critical identity/secret gate).**
> ★**이 문서 = 설계/계획 package이며, 작성 자체는 실행이 아니다.** prod secret **실주입** · subject_ref **backfill 실행** · prod DB · live 전환/emit/hard reject · repair/mapping/backfill · main merge = **Leo 별도 승인 전 금지·미수행.**
> ★M6-F = **critical identity/secret gate** → **Fable5 strict review 대상**(§9). Control이 package 작성 → Leo 확인 → Fable5 review 판단.
> 근거(GitHub 직접 확인): subject_ref hard gate(FOUNDATION `c9bb996`·subj_v2_) · FUREF v2 standard · Goal-loop(M6-C/D/E PASS·`57be368`) · M2 §3.9(subject_ref service-local).

---

## 1. Goal
prod secret / subject_ref chain의 **안전한 실행 계획 + 검증 package** 정본화 — furef_v2→subj_v2 chain 확정 · secret 경계 · prod secret 주입/rotation/vault policy · subject_ref backfill 조건 · durable/cross-service 금지 · prod/live/backfill/main merge 분리. ★**실 secret/backfill 미수행.**

## 2. furef_v2 → subj_v2 chain 정본화
```
service local_user_ref
   │  ★서비스 secret (per-service): FOUNDATION_USER_REF_SECRET(서비스별) / service auth secret
   ▼
furef_v2_<32hex> = HMAC-SHA256(서비스 secret, "<service>:<subject_type>:<stable_id>")[:32]   ← 서비스 식별 ref(가명 PII)
   │  ★Foundation secret (단일): FOUNDATION_SUBJECT_REF_SECRET
   ▼
subj_v2_<32hex>  = HMAC-SHA256(FOUNDATION_SUBJECT_REF_SECRET, furef_v2)[:32]                  ← service-local memory key
```
- **2-layer·domain-separated:** furef(서비스 secret) → subject_ref(Foundation secret). ★cross-service correlation 방지(서비스별 furef 상이·subject_ref는 Foundation secret 기반). **★[SUPERSEDED — §11 PATCH ROUND 2 ⑩로 정정: "correlation 방지"는 crypto 보증이 아님(양 furef 역산→id 복원→graph join 가능). 실제 차단선 = consent fail-closed·flag OFF·gate. corrected by §11 ⑩.]**
- **현재 shadow 상태:** adapter/util은 **dev fallback secret**(siasiu_dev_shadow_*·env override)·subj_v2_[:32]·keyed HMAC. ★M6-F = 이 체인을 **정본 secret 경로**로 연결(설계)·prod secret 실주입은 별도.
- **hard gate(c9bb996):** `subject_identity.resolve_subject`(subj_v2_·require_furef_v2·prod fail-closed·`subject_ref_from_foundation_user_ref` bridge) = subject_ref 정본 생성기.

## 3. FOUNDATION_SUBJECT_REF_SECRET / service-level secret 경계
| secret | 소유 | 용도 | 경계 |
|---|---|---|---|
| **FOUNDATION_SUBJECT_REF_SECRET** | Foundation(단일) | subj_v2_ 생성(subject_ref) | ★Foundation-only·서비스 미공유·subject_ref는 Foundation secret으로만 생성 |
| **service-level secret**(FOUNDATION_USER_REF_SECRET 서비스별·SIASIU_P3_AUTH_SECRET·candidate secret) | 각 서비스 | furef_v2·content hash·auth de-id | ★서비스별 분리·cross-service correlation 방지·서비스간 미공유 |
- ★**경계 원칙:** 두 층 secret 분리 → 한 secret 유출이 전 체인 역추적으로 이어지지 않음(defense-in-depth). subject_ref는 **service-local**(M2 §3.9)·cross-service 재도입은 hard precondition(consent+broker+v2 gate·v1 밖). **★[SUPERSEDED — §11 PATCH ROUND 2 ⑨로 정정: "한 secret 유출이 전 체인 역추적 안 됨"은 부정확. SubjectRefMap이 furef↔subject_ref를 서비스 DB에 실체화 → 서비스 secret 1건 + 서비스 DB 접근이면 Foundation secret 없이 전 체인 역추적 가능. 2-layer 방어 = 매핑 미접근 공격자 한정. corrected by §11 ⑨.]**

## 4. prod secret 주입 방식 / rotation / vault policy (★설계·실주입 0)
- **주입:** env 주입(배포 secret·**하드코딩/커밋 금지**·`os.environ`/vault-injected). dev fallback은 shadow 전용(prod 미사용).
- **rotation:** 주기적 rotation. ★**rotation 영향:** FOUNDATION_SUBJECT_REF_SECRET rotation = subject_ref **전면 re-keying**(subj_v2_ 값 변경) → 기존 memory row와 orphan. → **rotation 정책 = subject_ref 재계산/이관 계획 동반**(또는 versioned secret·subj_v3_). service secret rotation = furef 재계산(consumer-side). **★[SUPERSEDED — §11 PATCH ROUND 2 ⑥/5a로 정정: service secret rotation은 단순 furef 재계산이 아니라 subj_v2=HMAC(F,furef)상 그 서비스 전 subj_v2 연쇄 변경 → memory row·SubjectRefMap orphan. Foundation·service 두 축 모두 re-key 축. corrected by §11 ⑥.]**
- **vault:** secret store(Vault/KMS)·접근통제·감사·최소권한. ★M6-F package = policy 정의·**Vault write/실 secret 접근 0**.

## 5. subject_ref backfill 범위와 조건 (★backfill 실행 0)
- **backfill:** 기존 row `subject_ref=NULL`(M4 유지) → prod secret 확정 후 `subj_v2_` 단일 계산·기록.
- **조건(전부 충족 전 backfill 금지):**
  1. **prod secret 확정**(FOUNDATION_SUBJECT_REF_SECRET·서비스 secret 최종·rotation 정책 확정). ★dev-secret backfill **절대 금지**(rotation 시 전면 orphan).
  2. **backup 선행**(WAL-safe).
  3. **단일 backfill**(NULL→subj_v2_·기존 값 무변경·re-keying 0).
  4. **raw/PII 출력 0**(count/hash만).
  5. **Leo 별도 승인**(backfill = 별도 execution gate).
- ★M6-F package = backfill **조건/범위 정의**·**실행 0**(NULL 유지).

## 6. Foundation durable customer memory 금지 / cross-service memory 금지
- ★**Foundation durable customer memory 0:** subject_ref는 **service-local memory key**일 뿐·Foundation은 고객 LTM **미저장**(memory_write 0·memory_read_provider 미연결·broker 아님). subject_ref chain은 **키 생성**이지 Foundation 저장 아님.
- ★**cross-service memory 0:** subject_ref service-local(SubjectRefMap service-local)·SIASIU↔Cosmile 미연결·cross-service 재도입 = hard precondition(v1 밖).

## 7. raw / PII / raw identifier 출력 0
- chain 산출물 = furef_v2_/subj_v2_(가명·원문 미포함·keyed HMAC). ★local_user_ref/email/원문 등 raw identifier는 **입력**이며 **출력/로그 0**. backfill/검증 evidence = count/hash/boolean만.

## 8. approval boundary (prod/live/backfill/main merge 분리)
> **[본 package의 성격]** M6-F **설계/계획 정본화**. ★**prod secret 실주입·subject_ref backfill 실행·prod/live/main merge를 요청하지 않는다.**
> **[M6-F execution(후속·별도 승인)]** ① prod secret 주입(env/vault·별도) ② subject_ref backfill(§5 조건 전부 충족 후·backup·단일·Leo 승인) — 각 **별도 execution gate.**
> **[분리]** prod secret 주입 · backfill · live(auth/emit/hard reject) · main merge = **각 독립·별도 Leo 승인.**
> **[선택지]** ① M6-F package 승인 → (critical이므로) **Fable5 strict review 호출** → 이후 M6-F execution 승인 판단 · ② package 보강 후 재검토 · ③ hold.

## 9. Fable5 strict review 권고
- ★**M6-F = critical identity/secret gate** → **Fable5 strict review 권고**(chain 정합·secret 경계·rotation/re-keying 위험·backfill 조건·durable/cross-service 금지·prod secret 실주입 0 확인). Control 작성 → Leo 확인 → **Fable5 호출은 Leo 판단**(또는 Control invoke).
- 검수 범위: furef_v2→subj_v2 chain 정합 · secret 2-layer 경계 · rotation이 subject_ref orphan 위험을 정확히 다루는가 · backfill 조건(dev-secret 금지·prod 확정·backup·단일·승인) · Foundation durable/cross-service 금지 유지 · raw/PII 출력 0 · execution 분리.

## 10. PATCH ROUND (M6-F strict review PATCH_REQUIRED 반영 · 2026-07-05)
> strict review(`ca60b80`·PATCH_REQUIRED)의 P-1/P-2/P-3 + W-1/W-2/W-3 반영. 상세 = fix plan(`..._M6_F_PATCH_REQUIRED_FIX_PLAN_20260705.md`).
- **P-1(C-1) 정정:** §2의 "정본 secret 경로로 연결"은 **secret swap이 아니라 formula/routing 교체**다. ★서비스는 subject_ref를 **local-minting 하지 않는다.** 서비스는 **layer-1 furef_v2만 생성**(furef_v2 = HMAC(서비스 secret, `<service>:<subject_type>:<stable_id>`)[:32])·**subject_ref(subj_v2)는 Foundation-side가 mint**(subj_v2 = HMAC(FOUNDATION_SUBJECT_REF_SECRET, furef_v2)). SIASIU adapter 정정 완료(shadow `dd2c631`·candidate `furef_v2` 보유·`subject_ref=None`·Foundation-mint 위임).
- **P-2(C-2) rotation-version 결정:** prod secret 확정/backfill **전** subject_ref version 전략 확정 필요. **권고(Leo 확인 필요): (a) embedded key-version**(`subj_v2_<keyver>_…` 또는 keyver 필드·zero-orphan rolling rotation) — furef_local_ref 보존으로 재계산 가능·old/new 공존 허용. **대안 (b)** `SubjectRefMap.furef_local_ref` 기반 full re-key runbook(atomic cutover+rollback). ★최종 선택 = prod secret 확정 전 Leo 승인.
- **P-3(C-3) prod fail-closed:** 서비스 secret 미설정 시 **prod에서 실행 실패**(silent dev fallback 금지). 3개 shadow 모듈 정정 완료(SIASIU adapter/p3 `dd2c631`·Cosmile de-anon `91bd803`·`_is_production()`+raise).
- **W-1 furef namespace 불변식:** ★**furef는 unique service namespace(`<service>:…`) 임베드 필수·furef space 서비스간 공유 금지.** subject_ref 격리는 이 불변식에 의존(resolve_subject가 source_service를 hash 제외). 신규 서비스 온보딩 시 검증 대상.
- **W-2 raw echo 제거:** candidate의 raw `local_user_ref` echo 제거(furef_v2 가명만·§7 output-0 정합). 정정 완료(shadow `dd2c631`).
- **W-3 backfill idempotency:** backfill 조건에 추가 — 이미 non-NULL subject_ref row는 **skip**(재계산 금지)·`furef_local_ref` 없는 row는 subject_ref 계산 불가 → **abort/skip 기준 명시**·전체 idempotent(재실행 안전).

## 11. PATCH ROUND 2 (외부 Fable5 review 반영 · 2026-07-05)
> 외부 Fable5 review(`c622f14`·PATCH_REQUIRED)의 §11 PATCH 반영. 상세 reconciliation = `..._M6_F_EXTERNAL_FABLE5_RECONCILIATION_20260705.md`. ★모두 문서-레벨(+ 일부 FOUNDATION-side 별도 gate)·shadow 코드 추가 변경 0.
- **① key-version 필수 선결(격상):** subj_v2_는 스킴 버전이지 secret 버전 아님. ★**backfill 전 필수 선결 = `secret_version` 도입**(§5 조건에 추가). rotation 후 재계산 봉인 방지. (P-2 default = SubjectRefMap `secret_version` 컬럼·§reconciliation Leo decision 1)
- **② backfill 검증기준 M4 §7 이상:** §5 backfill 조건에 **검증/수용 기준** 추가 — 전후 NULL/row count·checksum·idempotency(재실행 동일)·부분실패 rollback·복원 리허설(EXEC-1 패턴). 비가역 backfill이 저위험 M4 additive보다 약하면 안 됨.
- **③ guest-only row 제외:** guest_ref-only row(furef 부재)는 **backfill 대상 아님**(NULL 정상·M2 §3.5 COALESCE). backfill은 furef 보유 row만·guest 오염/미동의 병합 금지.
- **⑥/5a 서비스 secret rotation도 re-key 축:** subj_v2=HMAC(F,furef)상 **서비스 secret rotation도 그 서비스 전 subj_v2 연쇄 변경→orphan.** Foundation·service **두 축 모두 re-key 축** 명시(이중계층 rotation).
- **⑦ furef 획득/SubjectRefMap 거버넌스/대상 테이블:** 기존 NULL row furef 획득 경로·SubjectRefMap(가명 PII) 저장 범위/거버넌스·대상 테이블 열거(SIASIU `subject_ref_map`/`ltm_fact`/`memory_fact_candidate`/`episode_summary`·Cosmile `SubjectRefMap`/`LongTermMemoryFact`/`MemoryFactCandidate`/overlay 5모델).
- **⑧ 파생 흐름(identity-touch API):** ★서비스는 **furef를 Foundation에 전송→Foundation이 subject_ref mint·회수**(identity-touch API·secret 공유 아님). resolve_subject/factory가 furef 수용하도록 **FOUNDATION-side 정정 = 별도 gate**(reconciliation Leo decision 2).
- **⑨ 유출 주장 정정:** §3 "한 secret 유출이 전 체인 역추적 안 됨"은 **부정확** — SubjectRefMap이 furef↔subject_ref 실체화 → **서비스 secret+서비스 DB 접근**이면 Foundation secret 없이 전 체인 역추적. 2-layer 방어 = **매핑 미접근 공격자 한정**.
- **⑩ correlation 정직화:** §2 "correlation 방지"는 crypto 보증 아님(양 furef 역산→id→graph join 가능). 실제 차단선 = **consent fail-closed·flag OFF·gate**(secret 구조 아님).
- **2a per-service secret 값 분리:** 동일 env명 공유 배포 가능 → M6-F가 **per-service 상이 secret 값 배포를 신규 요구·집행**(값 분리 검증).
- **R10-1 순서 자구:** §8 "prod secret·backfill 독립"→ **backfill 선결 = secret 주입 완료**(§5 조건1 "확정"≠"주입 완료"·dev-env backfill 해석 차단).
- **R10-2 review trigger:** §9 "(또는 Control invoke)" → **"Leo 승인 하 Control 대행"**(권한 명확화).
- **R8-2/R9-1(watch·FOUNDATION-side 별도 gate):** api.py reason_codes 상수 enum 가드 · FOUNDATION `_factory` legacy `local_user_ref` 제거(M2 v1.2 폐기·SIASIU adapter는 `dd2c631` 완료).

## 무결성
M6-F Goal Package(설계/계획) + PATCH ROUND(shadow code 정정) + PATCH ROUND 2(외부 Fable5 문서 반영) · **prod 실행 = 실행 아님** · prod secret 실주입 0 · subject_ref backfill 실행 0 · prod DB 0 · live 전환/emit/hard reject 0 · repair/mapping/backfill 0 · **product repo main merge 0** · schema code main merge 0 · raw/PII/raw identifier 출력 0 · Foundation durable customer memory 0 · cross-service 0 · V3 0 · Vault write 0 · 본 package만 foundation-docs commit/push · **M6-F execution(prod secret·backfill)은 각 별도 Leo 승인 후.**
