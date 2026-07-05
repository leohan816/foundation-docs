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
- **2-layer·domain-separated:** furef(서비스 secret) → subject_ref(Foundation secret). ★cross-service correlation 방지(서비스별 furef 상이·subject_ref는 Foundation secret 기반).
- **현재 shadow 상태:** adapter/util은 **dev fallback secret**(siasiu_dev_shadow_*·env override)·subj_v2_[:32]·keyed HMAC. ★M6-F = 이 체인을 **정본 secret 경로**로 연결(설계)·prod secret 실주입은 별도.
- **hard gate(c9bb996):** `subject_identity.resolve_subject`(subj_v2_·require_furef_v2·prod fail-closed·`subject_ref_from_foundation_user_ref` bridge) = subject_ref 정본 생성기.

## 3. FOUNDATION_SUBJECT_REF_SECRET / service-level secret 경계
| secret | 소유 | 용도 | 경계 |
|---|---|---|---|
| **FOUNDATION_SUBJECT_REF_SECRET** | Foundation(단일) | subj_v2_ 생성(subject_ref) | ★Foundation-only·서비스 미공유·subject_ref는 Foundation secret으로만 생성 |
| **service-level secret**(FOUNDATION_USER_REF_SECRET 서비스별·SIASIU_P3_AUTH_SECRET·candidate secret) | 각 서비스 | furef_v2·content hash·auth de-id | ★서비스별 분리·cross-service correlation 방지·서비스간 미공유 |
- ★**경계 원칙:** 두 층 secret 분리 → 한 secret 유출이 전 체인 역추적으로 이어지지 않음(defense-in-depth). subject_ref는 **service-local**(M2 §3.9)·cross-service 재도입은 hard precondition(consent+broker+v2 gate·v1 밖).

## 4. prod secret 주입 방식 / rotation / vault policy (★설계·실주입 0)
- **주입:** env 주입(배포 secret·**하드코딩/커밋 금지**·`os.environ`/vault-injected). dev fallback은 shadow 전용(prod 미사용).
- **rotation:** 주기적 rotation. ★**rotation 영향:** FOUNDATION_SUBJECT_REF_SECRET rotation = subject_ref **전면 re-keying**(subj_v2_ 값 변경) → 기존 memory row와 orphan. → **rotation 정책 = subject_ref 재계산/이관 계획 동반**(또는 versioned secret·subj_v3_). service secret rotation = furef 재계산(consumer-side).
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

## 무결성
M6-F Goal Package(설계/계획) only · **작성 = 실행 아님** · prod secret 실주입 0 · subject_ref backfill 실행 0 · prod DB 0 · live 전환/emit/hard reject 0 · repair/mapping/backfill 0 · **product repo main merge 0** · schema code main merge 0 · raw/PII/raw identifier 출력 0 · Foundation durable customer memory 0 · cross-service 0 · V3 0 · Vault write 0 · 본 package만 foundation-docs commit/push · **M6-F execution(prod secret·backfill)은 각 별도 Leo 승인 후.**
