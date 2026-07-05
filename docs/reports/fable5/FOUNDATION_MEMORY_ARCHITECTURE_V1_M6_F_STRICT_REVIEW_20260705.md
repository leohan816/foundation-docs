# Memory V1 — M6-F Strict Review (prod secret / subject_ref identity chain)

> 기록: foundation-control(Control) · 2026-07-05 · **성격: Control-invoke 독립 strict review(Claude 검수 에이전트·read-only·adversarial·1회).**
> ★**정직 라벨:** 이 검수는 **Control이 invoke한 독립 Claude 검수**이며, 외부 Fable5(GPT) 검수와 **별개**다. Leo 지정 산출물 경로(`docs/reports/fable5/`)에 verdict를 **faithful(clean-not-compress)** 기록한다. 외부 Fable5 corroboration은 별도 가능.
> ★검수 범위 = **읽기 전용**. prod secret 실주입 0 · subject_ref backfill 0 · prod DB 0 · live 0 · main merge 0 · raw/PII/실 secret 값 출력 0. (검수 중 실 secret 값 미출력·하드코딩 secret은 존재/위치만 보고.)
> 검수 대상: `docs/reports/control/FOUNDATION_MEMORY_ARCHITECTURE_V1_M6_F_GOAL_PACKAGE_20260705.md`(GitHub 정본 `20190fb`·로컬=정본 IDENTICAL 검증됨) + subject_ref chain 실코드(FOUNDATION `subject_identity.py`·SIASIU adapter/P3·Cosmile de-anon) + M2 계약 + M4 plan.

---

## 1. Verdict: **PATCH_REQUIRED**

설계-전용 package는 올바르게 gate됨(prod secret 미주입·backfill 미실행·execution gate 분리·완전 rollback 가능). 그러나 **execution 승인 근거가 되기 전에** 3개 실질 이슈를 닫아야 함: (C-1) SIASIU adapter가 **서비스 secret 단일 레이어로 `subj_v2_`를 mint** → package 자신의 핵심 불변식("subject_ref는 Foundation secret으로만 생성")과 모순; (C-2) rotation/version 결정이 optional로 남았으나 backfill 후 **되돌릴 수 없음**; (C-3) 3개 서비스-side dev-fallback secret에 **prod fail-closed 부재**. HOLD 아님(잘 gate됨·설계전용·경계 건전·rollback 가능). APPROVE 아님(M6-F가 "연결"하려는 코드에서 chain 핵심 불변식이 깨져 있음).

## 2. Critical findings
- **C-1 (chain/formula divergence — 최고 위험).** 정본 생성기 `subject_identity.py`: `subj_v2_ = HMAC(FOUNDATION_SUBJECT_REF_SECRET, furef_v2)[:32]`(올바른 2-layer). 그러나 `foundation_memory_candidate_adapter.py:92-93`: `subj_v2_ = HMAC(SIASIU_MEMORY_CANDIDATE_SECRET, "siasiu:local_user:"+local_user_ref)[:32]` — **서비스 secret로 layer-1(furef 등가)을 만들어 layer-2 subject_ref로 오라벨**·Foundation-secret 레이어 완전 생략. M2 §3 subject_ref 정의 + M6-F package §3("subject_ref는 Foundation secret으로만 생성") 위반. 결과: SIASIU의 `subject_ref` ≠ 같은 사용자의 Foundation-mint subject_ref. §2 "정본 secret 경로로 연결"처럼 **dev→prod secret 교체만으로는 안 고쳐짐**(여전히 서비스 secret로 mint). ★Control 재확인: adapter L17 `_SECRET=SIASIU_MEMORY_CANDIDATE_SECRET`·L50 `_hex=hmac.new(_SECRET,…)`·L93 `subj_v2_ + _hex("siasiu:local_user:"+ref)[:32]` = **단일 레이어 확정**.
- **C-2 (rotation 비가역성).** `subj_v2_`에 key-version tag·`source_service` binding 없음. `FOUNDATION_SUBJECT_REF_SECRET` rotation = **전 row re-key·전 memory orphan**. 설계는 위험을 명명했으나 fix를 optional("or versioned secret·subj_v3_")로 남김. format 결정은 backfill 후 비가역 → **결정해야 함**(deferred 금지).
- **C-3 (서비스 secret prod fail-closed 부재).** Foundation 생성기만 prod fail-close. 3개 서비스 모듈은 `os.environ.get(...) or "<committed_dev_secret>"`(silent)·`_is_production()` guard 없음.
- **실 prod secret 값 커밋 없음.** 하드코딩 secret-유사 문자열 4개 발견·전부 명시적 dev/shadow placeholder → 존재/위치만 보고(값 미출력).

## 3. Chain correctness (item 1)
정본 생성기 `resolve_subject`는 올바르고 강함: `subj_v2_ + HMAC(FOUNDATION_SUBJECT_REF_SECRET, local_user_ref)[:32]`·`require_furef_v2`(furef_v2 format 강제)·입력 PII reject·`source_service`를 hash에서 의도적 제외(furef가 이미 `<service>:<type>:<id>` namespace화 → double-encoding 회피)·prod fail-closed(`SubjectRefSecretMissing`). M6-F §2 다이어그램과 일치. **그러나** 설계는 `resolve_subject`를 "subject_ref 정본 생성기"라 하면서, M6-F scope(§2) 내 SIASIU adapter는 이를 **사용 안 함**·2-layer formula **미구현**(C-1). 설계는 이를 secret-경로 연결로 프레이밍했으나 실제로는 **formula 교체**임. → chain은 *정본 모듈에서는* 옳으나 *M6-F가 정합시켜야 할 서비스 adapter에서는* 깨짐.

## 4. Secret boundary review (items 2, 8)
- **env-var 분리(item 2): PASS.** 레이어별 별개 env(`FOUNDATION_SUBJECT_REF_SECRET`=Foundation-only·`subject_identity.py`에서만 참조·`SIASIU_MEMORY_CANDIDATE_SECRET`·`SIASIU_P3_AUTH_SECRET`·`COSMILE_MEMORY_SECRET`). 서비스 모듈이 Foundation secret 미참조.
- **단 C-1이 경계를 훼손:** SIASIU adapter가 서비스 secret로 `subj_v2_`(M2 §3.9 SubjectRefMap PK) mint → secret은 분리됐으나 adapter가 경계 잘못된 쪽에서 identity key mint. 설계는 **mint 위치**를 명시해야 함(Foundation-side; 서비스는 `FOUNDATION_SUBJECT_REF_SECRET` 미보유·local-minting 중단).
- **dev-secret backfill 금지(item 8): PASS/명확.** M6-F §5 cond-1("dev-secret backfill 절대 금지") + M4 §6 R-2("M4 subject_ref backfill 금지…dev-secret backfill 0…M6 prod secret 확정 후 단일 backfill") 명시. backfill 경로가 fail-closed Foundation 생성기를 쓰므로 즉시 backfill 위험은 contained. gap은 code-side(C-3)이지 doc-side 아님.

## 5. Rotation / re-keying review (items 5, 6)
- 설계가 rotation=전 re-key→orphan을 **정확히 식별**·backfill을 "rotation 정책 확정"(§5 cond-1)에 gate. Good.
- **gap(item 6): version scheme 필요·미확정.** `subj_v2_`에 embedded key-version 없음. `SubjectRefMap.furef_local_ref` 보존(M2 §3.9)이라 full re-key는 *가능*(row별 `HMAC(new_secret, furef_local_ref)` 재계산 + ltm_fact/EpisodeSummary/… 전 FK rewrite)이나, rolling rotation 중 old/new 공존 불가한 heavy hard-cutover. 설계는 "rotation 정책 확정"(backfill 선결)의 일부로 명시 결정을 **요구**해야: (a) key-version 임베드(`subj_v2_<keyver>_…`/`subj_v3_`·zero-orphan rolling rotation) 또는 (b) `furef_local_ref` 기반 full re-key runbook(atomic cutover+rollback). backfill 후 비가역이므로 **prod secret 확정 전** 결정(C-2).

## 6. Backfill condition review (items 7, 9)
- **item 7: PASS(strict).** 5중 조건(prod secret 확정[rotation 정책 포함]·WAL-safe backup·단일 NULL→subj_v2_·re-keying 0·raw/PII 0·별도 Leo 승인) + M4 R-2 NULL 유지. **minor WATCH:** 조건이 idempotency(이미 non-NULL row 없음) / `furef_local_ref` 없는 row(subject_ref 계산 불가) 처리 미명시.
- **item 9: PASS.** backfill이 repair/mapping과 명확 분리: M4는 deterministic repair(SINGLE 2-active supersede·MULTI dedupe)하되 **subject_ref backfill 명시적 금지**(§6 R-2); subject_ref backfill은 prod secret 후 별개 M6 gate. §8이 prod-secret/backfill/live/main-merge를 독립 gate로 명시. **이월 note:** M6 subject_ref backfill은 M4 repair **후** 실행(`subject_key=COALESCE` 정합)·guest→subject merge 재유발 금지(re-keying 0로 커버).

## 7. Durable / cross-service boundary review (items 3, 4, 10)
- **item 3: PASS.** subject_ref는 service-local memory key·SubjectRefMap은 subject_ref PK·"cross-service join table 아님"(M2 §3.9·§7)·`allow_link`은 guest→user 단일 목적.
- **item 4(deep): 값-correlation 위협에 PASS·단 WATCH.** 같은 실사용자: `subject_ref_S=HMAC(F,furef_S)`·`subject_ref_C=HMAC(F,furef_C)`. 같은 `F`라도 correlation 방지: (a) 서비스별 furef secret 상이, (b) FUREF v2 message가 서비스 namespace `<service>:…` 임베드(공유 secret+공유 stable_id라도 furef 상이), (c) M2 §7/§3.9가 Foundation의 양 subject_ref brokering/저장 금지·subject_ref를 Foundation에 미전송 권고. 한 서비스 subject_ref 보유 공격자가 raw id+서비스 secret 없이 타 서비스로 역산 불가. **WATCH:** subject_ref 레이어가 서비스별 독립 domain separation을 **추가 안 함**(`resolve_subject`가 `source_service`를 hash 제외) → 격리가 furef 규율에 100% 의존. 미래 서비스가 furef 문자열 충돌(또는 service prefix 누락) 시 subject_ref가 서비스간 silent collision. 설계는 검증가능 불변식으로 명시해야: *furef는 unique service namespace 임베드 필수·furef space 서비스간 공유 금지.*
- **item 10: PASS.** `resolve_subject`는 순수 함수·Foundation이 stateless mint·고객 LTM 미저장(volatile store·flags OFF; M2 §1/§2/§6 request-stateless·no-broker·erasure는 Foundation 관심사 아님). **sub-note(C-1 연계):** mint가 Foundation secret 필요 → mint는 Foundation-side(서비스는 furef 전송·subject_ref 수신)·설계는 서비스가 `FOUNDATION_SUBJECT_REF_SECRET` 미수신·Foundation이 furef↔subject_ref durable 미보존 확인 필요.

## 8. Raw / PII boundary review (item 11)
대체로 **PASS**: 정본 생성기 PII 입력 reject·`subj_v2_`만 출력; p3는 `phash_v2_`+count/boolean(`plaintext_identifier_remaining=0`); Cosmile raw id null·refs 출력·`hasRawIdentifierAnywhere` scan·`emitted:false`. **WATCH(W-2):** SIASIU adapter가 candidate dict에 `"local_user_ref": local_ref`(L126)를 subject_ref와 함께 echo. `guard()`는 PII *패턴* 차단하나 email/phone/RRN 아닌 raw 내부 id(UUID·`user_12345`)는 미차단·M6-F §7은 raw local_user_ref INPUT-only·출력 0 명시. candidate는 pre-image echo 금지(또는 `local_user_ref`가 furef_v2 가명임을 assert). 오늘은 shadow/in-memory라 live leak 아니나 §7 output-0 경계와 모순.

## 9. Execution boundary review (item 12)
**PASS.** §8이 prod-secret 주입·subject_ref backfill·live(auth/emit/hard reject)·main merge를 독립 gate로 분리·각 별도 Leo 승인; §무결성이 0 execution 확인. package는 진정 설계-전용. STOP-조건 위반 미관찰.

## 10. Required patch / watch
**PATCH(execution 승인 전 필수):**
1. **P-1 (C-1):** 서비스가 subject_ref local-minting **중단** 명시. `foundation_memory_candidate_adapter._subject_ref`(및 Cosmile 등가)를 정본 2-layer 경로로 교체 — furef_v2=HMAC(서비스 secret,`<service>:<type>:<id>`) → subject_ref=HMAC(`FOUNDATION_SUBJECT_REF_SECRET`,furef_v2) via Foundation-side 생성기. M6-F "정본 secret 경로로 연결" 문구를 secret-swap → **formula/routing 교체**로 정정.
2. **P-2 (C-2):** "rotation 정책 확정"이 구체적 subject_ref version 결정(embedded key-version/subj_v3, OR `SubjectRefMap.furef_local_ref` 기반 full re-key runbook·atomic cutover+rollback)을 **prod-secret 확정/backfill 전** 요구.
3. **P-3 (C-3):** 3개 서비스-side 모듈이 Foundation 모듈의 prod fail-closed 채택(prod에서 env secret 미설정 시 silent 하드코딩 fallback 금지).

**WATCH:** W-1 subject_ref가 source_service 미bind → furef-namespace uniqueness를 검증가능 불변식으로 문서화(item 4) · W-2 SIASIU candidate가 raw `local_user_ref` 출력 echo(item 11) · W-3 backfill idempotency/missing-furef 처리(item 7).

## 11. Final recommendation
**PATCH_REQUIRED.** M6-F package는 설계-전용·올바르게 gate된 계획으로 잘 구조화됐고, 정본 Foundation 생성기(`subject_identity.py`)는 진정 강한 fail-closed·PII-reject 2-layer 구현. 그러나 이는 최고-scrutiny gate이고, (P-1) 자신의 핵심 불변식("subject_ref는 Foundation secret으로만 생성")이 in-scope SIASIU adapter의 서비스-secret 단일-레이어 mint로 모순되고, (P-2) rotation/version 결정이 backfill 후 비가역인데 deferred되고, (P-3) 서비스-side dev fallback에 prod fail-closed 부재인 동안 execution 근거로 승인 불가. 어느 것도 실행 안 됨(prod secret 미주입·backfill 미실행·실 secret 값 미유출)이므로 HOLD 아닌 교정가능 patch. 권고: **Control이 P-1/P-2/P-3 + W-1/W-2/W-3으로 package patch → prod-secret-injection/subject_ref-backfill execution gate 개방 전 재검수.** 그때까지 write/live/promotion/backfill = 0 유지.

**검수 파일(절대경로):**
- `docs/reports/control/FOUNDATION_MEMORY_ARCHITECTURE_V1_M6_F_GOAL_PACKAGE_20260705.md`
- `설계문서/foundation/COMMON_SERVICE_MEMORY_CONTRACT_V1_20260704.md`
- `docs/reports/control/FOUNDATION_MEMORY_ARCHITECTURE_V1_M4_MIGRATION_PLAN_20260704.md`
- `FOUNDATION/foundation/shared_memory/subject_identity.py`
- `SIASIU/app/ssbrain/foundation_memory_candidate_adapter.py`(subject_ref formula divergence L46-50·92-93; local_user_ref echo L126; dev-fallback secret L17)
- `SIASIU/app/ssbrain/foundation_p3_auth_shadow.py`(dev-fallback secret L15)
- `Cosmile/app/scripts/foundation-memory-deanon.mjs`(dev-fallback secret L11)

## 무결성(기록)
Control-invoke 독립 strict review verdict를 faithful 기록 · 외부 Fable5(GPT)와 별개 · read-only(코드/DB/실행 0) · prod secret 실주입 0 · backfill 0 · prod DB 0 · live 0 · main merge 0 · 실 secret 값/raw/PII 출력 0(하드코딩 dev secret은 존재/위치만) · 본 review만 foundation-docs commit/push · **M6-F execution/prod secret/backfill 승인 아님.**
