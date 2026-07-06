# Memory V1 — Fable Final Independent Review (M6 전체 · V1 Closure 판정)

> 검증자: **Fable5** (최종 독립 리뷰) · 2026-07-06 · **판정: CLOSED_WITH_LIMITS**
> 목적: production/live activation 판정이 아니라 **dev/shadow/readiness 기준 Memory V1 종료 가능 여부 + V3 진입 판단.**
> 방법: 5축 검증(Ops 체인·Option B identity/crypto·SIASIU substrate·Cosmile substrate·Foundation wiring/test meaning) + **회귀 6종 직접 재현** + Ops HOLD_RELEASE(d491da3) spot-check 3건 독립 재현. read-only — 코드/DB/문서 수정 0 · push 0(본 리뷰만) · prod 0 · 실 secret 값 출력 0.
> 대상 상태: foundation-docs `d491da3`(HOLD_RELEASE) · FOUNDATION `b67e3f9`(shadow) · SIASIU `fe90d99`(shadow) · Cosmile `6c6aa7f`(shadow) · main 3본(580093c/3cd068d/3ba91e0) 무변경 확인.

---

## 1. Final verdict: **CLOSED_WITH_LIMITS**

Memory V1은 **dev/shadow/readiness 기준으로 닫을 수 있다.** V1 closure report 작성 가능, V3 entry package 이동 가능. 단 §11의 limit들(특히 **M2 계약 문서의 Option A 공식 잔존**과 **M6-G 정의 미확정**)은 closure 보고서에 반드시 정직하게 반영해야 하며, §13/§14의 gate들은 V3·운영 전환 전 추적 대상이다. **CLOSED(무조건)가 아닌 CLOSED_WITH_LIMITS가 정직한 판정이다.**

## 2. Executive summary

- 아키텍처의 마지막 난제였던 identity 파생 흐름 모순(Foundation-only secret ↔ service-local ↔ no-broker)은 **Option B 피벗으로 질문 자체가 소멸**했다 — 서비스가 자기 secret으로 로컬 mint, Foundation은 validate/gate만(mint 코드 제거·`SubjectMintDeprecated` raise 실증). 직전 Fable5 M6-F 검수의 **C-1~C-5 전부 dev 기준 CLOSED**를 코드로 확인했다.
- Ops 감사 체인(HOLD→corrective→HOLD_WITH_LIMITS→corrective→**HOLD_RELEASE**)은 자기교정이 실제로 작동한 무결한 체인이었고, spot-check 3건(prod fail-closed raise·furef 3-way equal·pure 8/8)을 독립 재현했다.
- 회귀 전판 재현: **runner 89/89·651 복원**(테스트 완화/삭제/조작 0 — memory.db relocation이라는 invariant 복원으로 git-실증) · 39/39 · 119/119 · 164/164 · 112/112 · fingerprint `d7f579443f8a110a`.
- 잔여는 blocker가 아니라 **문서 정합 2건 + 문서-코드 불일치 2건 + housekeeping**이며, 전부 §11에 분류했다.

## 3. What was verified (직접 실행/판독)

| 검증 | 결과 |
|---|---|
| Foundation runner | **89/89 · 651 · all_pass**(taxonomy 공집합·lmr 35/35·brain 16/16) — 직접 재현 |
| SIASIU integration / workflow | 39/39 · 119/119(answer_unchanged·raw_trace_leak 0) — 직접 재현 |
| Cosmile readiness / loop / de-anon / vitest | 164/164 · 112/112(trace_clean) · 14/14 · 7/7+3/3 — 직접 재현 |
| answer.py fingerprint | `d7f579443f8a110a` 재계산 일치 |
| FOUNDATION hard gate / SIASIU identity substrate / canonical contract | 21/21 · 8/8 · 6/6(APP_ENV=dev) — 검증자 직접 실행 |
| crypto prod fail-closed | APP_ENV=production/unknown/unset → RuntimeError raise·값 미출력 — in-memory probe 재현 |
| furef 3-way / subject_ref cross-producer | crypto==candidate_adapter==p3_auth **True**(한글 uid 포함) — 재현 |
| Option B mint 부재(Foundation) | resolve_subject → `SubjectMintDeprecated` raise·`mint_subject_ref` hasattr=False — 실증 |
| M6-G 미배선 | hard_reject import = 자기 모듈+테스트 2파일뿐·48조합 false_allow=0 — grep+재현 |
| main 3본 무변경 / Hard Stops | 580093c·3cd068d·3ba91e0 일치 · a2a6608 §6 목록 원문 유지 |

## 4. What was accepted from Ops HOLD_RELEASE

d491da3의 L1~L6 시정 판정을 **수용**했다(재감사 아님) — 단 맹신이 아니라 spot-check 3건(L1 prod fail-closed·L2 furef 3-way·L3 pure 8/8)을 독립 재현해 전부 일치함을 확인한 뒤 수용했다. B1(stale server 종료·:8000 리스너 0)·B2(Cosmile provider 정식 커밋)·H1(durable archive 실재·MANIFEST sha256 일치)도 실물 확인 후 수용. 원 감사 blocker 2·high 8·limit 6의 처분 매핑: **전부 실물 시정 또는 정직 이월** — 단 high 3건의 부분 잔여(H4 isolation 재실행·H5 SKIP 카운트 분리·H6 guard WAL 재설계)가 이월 목록에 명시되지 않음(§11 limit로 기록·전부 low-severity). 감사자 라벨(독립 검수자 세션 vs Control)은 정직하게 구분돼 있었다.

## 5. Architecture boundary review — **PASS**

- **Option B 원칙 코드 실증:** subject_ref = **service-local mint**(서비스 자체 secret·Foundation secret 미개입). FOUNDATION은 validate/gate/reasoning만 — mint 코드 0(`SubjectMintDeprecated` raise), `FOUNDATION_SUBJECT_REF_SECRET`/identity-touch API 심볼 전부 제거, durable customer memory 0(in-memory store·`memory_db_created=False`), service DB 접근 0(forbidden-import guard + runner 케이스로 집행), broker 0.
- **shadow wiring 위치 정합:** memory_context/reuse_decision shadow wiring은 **SIASIU repo**(`service_memory/shadow_wiring.py`·609eba7)에 있음 — Foundation boundary 침범 없음. flag OFF→None(기존 동작)·ON시 canonical minimized context(fact_refs hash·raw 0·request_scoped) — 4/4 재현.
- **M5 ingress gate:** fc consult_contract에 shadow hook으로만 배선·flag default OFF(inert)·scan-only·hard_reject:False 고정.

## 6. Identity / memory / crypto review — **PASS (limit 2)**

- 직전 Fable5 M6-F external review 지적 처분: **C-1 key-version → CLOSED**(`secret_version` 컬럼 실재·partial unique `(local_user_ref_hash, secret_version)`·zero-orphan rolling rotation 구조) · **C-2 backfill 검증기준 → CLOSED**(M4 이상 격상: count/checksum·backup+integrity+rollback rehearsal·idempotency 2회차 0·guest 제외 — dev/staging 실행 증거) · **C-3 guest-only 제외 → CLOSED**(guest_skip 실증·prod gate 정본 명시) · **C-4 split-brain → CLOSED**(Foundation 생성기 제거로 서비스가 유일 minter·서비스 내 3파일 파생 통일 3-way 실증) · **C-5 dev fallback → CLOSED**(3개 생산자 전부 `_is_production` fail-closed·unknown→prod) · **파생흐름 미정의 → 질문 소멸**(Option B) · R9-1 legacy `local_user_ref` echo 제거 확인 · W4 reason_codes 상수 enum guard 확인.
- **limit ①:** M2 정본 계약이 아직 Option A mint 공식(`HMAC(FOUNDATION_SUBJECT_REF_SECRET, furef_v2)`)을 supersede pointer 없이 현행처럼 기술(§11-L1).
- **limit ②:** Option B contract §7 "cross-service correlation 자연 방지" 단정 — 이중 유출·매핑 접근 시나리오 단서 없음(직전 리뷰 ⑩의 부분 잔존·§11-L4).
- crypto fail-closed·canonical furef_v2 정합은 **충분히 검증됨**(질문 6 = YES).

## 7. SIASIU review — **PASS**

- **runner 89/89 복원 정당성(핵심):** 테스트 완화/삭제/기대값 조작 **0** — memory.db를 app/data 밖으로 relocation(+잡파일 durable archive)한 **invariant 복원**으로 git-실증. 원인 귀속 정정(c9bb996→app/data/memory.db)도 성립. guard는 완화가 아니라 준수 방향.
- memory.db = 삭제 아닌 relocation(`app/service_memory_data/`·gitignored) — legacy brain 무손실·Memory V1 shadow 테이블 보존.
- service_memory 스키마 = M2/Option B 정렬. dev default=`sqlite_legacy`·postgres opt-in(env 분기 코드 실증). answer.py fingerprint 유지.
- 경미: `backend.py` 모듈 docstring이 "postgres=default"로 코드와 불일치(실제 default=sqlite_legacy) — §11-L6.

## 8. Cosmile review — **PASS (limit 1)**

- provider switch(sqlite→postgresql) **정식 커밋·push 확인**(6c6aa7f·main 무접촉). 9엔티티 논리 계약 SIASIU와 정렬(8 model + CommerceMemory overlay 컬럼). 테스트 7/14/3 전건 재현·**정직 라벨**(순수 로직·DB 무접촉 자인). checkout/order/live emit 무접촉(diff에 app/src/** 0건).
- **limit(신규 발견 COSMILE-4):** postgres baseline migration이 schema 주석/계약이 "raw migration SQL enforced"라 주장하는 **DB-level invariant 3종을 미포함**(SubjectRefMap partial unique `(localUserRefHash, secretVersion)` 등) — zero-orphan rotation의 Cosmile측 DB 집행 공백. 실 DB-integration 자체가 pre-prod라 dev/shadow closure는 안 막지만 **첫 `migrate deploy` 전 baseline 보강 필수**(§11-L3).
- sqlite migration dir 잔존 = pre-first-deploy 정리(Ops 분류 정당·§11 분류표).

## 9. Foundation review — **PASS**

FOUNDATION main 580093c 무변경(작업은 shadow b67e3f9). mint 제거 후 validate 전용(`validate_subject_ref` format+PII만). durable customer memory 0·cross-service 0 grep 재확인. hard gate 21/21 — 단 테스트 3b 1건이 공허 assertion(`X and Y or True` 항상 True·장식성) — 결과 왜곡 없음·후속 정리 후보(§11-L7).

## 10. Test meaning review — **PASS (관찰 2)**

- Test Meaning Policy(6a8ca8e) 실재·L3 test-honesty 반영 확인: 테스트가 **실 코드 경로** import(인라인 재구현 제거)·skip/xfail/기대값 조작 0·infra-gate 명시 라벨.
- M6-G 시뮬레이션 7/7(코드 5/5+2)은 48조합 false_allow=0 fail-closed로 **의미 있는 PASS** — 단 §11-L2의 정의 문제와 별개.
- 관찰 ①: "pure 8/8"은 APP_ENV=dev 전제 미문서 — env 없는 shell에선 6/8이며 실패 2건이 fail-closed raise 자체(안전 방향·기만 아님). 관찰 ②: infra-gated early-return이 PASS 분모에 포함(원 H5의 "SKIP 카운트 분리" 요구와 차이 잔존·공개돼 있어 기만 아님).

## 11. Remaining items classification

### V1 closure blocker — **0건** (단, closure 보고서 작성 조건 2건)
| # | 항목 | 조건 |
|---|---|---|
| L1 | **M2 계약 Option A 공식 잔존**(supersede pointer 0·HARD_GATE 문서 동일) | closure 전/동시에 **문서-only 2줄 supersede pointer 패치**(f8d1647의 19건과 동일 방식) — 정본 계약이 폐기된 공식을 현행처럼 둔 채 닫으면 V3가 잘못된 계약을 상속 |
| L2 | **M6-G 정의 미확정**(원 감사 M11: 7/5 패키지=ingress-gate hard reject ↔ 7/6 sim=memory-reuse gate 의미 스왑) | closure 보고서가 "M6-G 시뮬레이션 PASS"를 인용하려면 **정의 확정 또는 "정의 미확정·activation Hard Stop" 명시 이월** 필수 — Leo 결정 1건 |

### V3 backlog
| # | 항목 |
|---|---|
| L4 | Option B contract §7 correlation "자연 방지" 문구 정직화(이중 유출·매핑 접근 전제 단서) |
| L5 | CHAIN-2 잔여 3건: H4 permission isolation 재실행+harness repo 편입 · H5 SKIP 카운트 분리 · H6 guard WAL-mode 양립 재설계 |
| L6 | SIASIU backend.py docstring drift(postgres=default 오기) · pure 8/8의 APP_ENV=dev 전제 문서화 |
| L7 | FOUNDATION hard gate 테스트 3b 공허 assertion 정리 |

### pre-prod / pre-live gate (기존 Hard Stop 체계 유지)
| # | 항목 |
|---|---|
| G1 | **L3(COSMILE-4): postgres baseline에 DB-level invariant 3종 보강 — 첫 `migrate deploy` 전 필수**(sqlite migration dir 정리와 함께 "pre-first-deploy"로 기록) |
| G2 | Cosmile 실 DB-integration 테스트(현재 정직 공개된 부재 — closure 보고서는 "schema/validate 수준 검증"으로만 표기할 것) |
| G3 | prod backfill(Option B mint 경로로 재현 필요 — 10996c5 검증은 pivot 이전 Option A 경로였음·정직 이월됨) · ops Vault 실 주입 · secret_version 실 rotation 결합 |
| G4 | M6-G activation · live 배선 · main merge · external release · prod DB migration · 실 role grant |
| G5 | housekeeping(Leo 승인): docker volume 6개 · env_local_backup.SENSITIVE 처분 · /tmp scratchpad · SIASIU postgres dev default 승격 |

## 12. Required action before V1 closure

1. **L1 문서 패치**(M2 계약 + HARD_GATE 문서에 Option B supersede pointer 2줄·원문 보존) — 문서-only·f8d1647 방식.
2. **L2 처리**(M6-G 정의 확정 or 명시 이월 문구) — Leo 결정.
3. closure 보고서 언어 조건: Cosmile postgres = "schema/validate 수준 검증"으로 표기(§11-G2) · "pure 8/8"에 APP_ENV=dev 전제 병기.

## 13. Required action before V3

- §11 V3 backlog(L4~L7) 등재 및 추적. V3 entry package에 Option B contract(1e24c33)를 정본 identity 계약으로 명시(M2의 identity 절은 superseded임을 전제).

## 14. Required action before production/live

- §11 G1~G5 전부(각 별도 Leo 승인·기존 Hard Stop 체계). 특히 G1(baseline invariant)과 G3(Option B 경로 backfill 재현·Vault·rotation 결합)은 prod path 설계의 선결이다.

## 15. Final recommendation

**CLOSED_WITH_LIMITS.** 다섯 가지 질문에 대한 답: ① Ops HOLD_RELEASE 이후 V1 closure를 막는 blocker는 **없다**(단 §12의 작성 조건 2건). ② 남은 항목은 §11대로 — closure 조건 2·V3 backlog 4·pre-prod gate 5군. ③ **V1 final closure report 작성 가능**(§12 조건 반영 시). ④ **V3 entry package 이동 가능.** ⑤ CLOSED가 아니라 **CLOSED_WITH_LIMITS가 정직하다** — 정본 계약 문서가 코드보다 한 발 늦고(M2), M6-G의 이름이 아직 두 가지 의미를 갖고 있으며, Cosmile의 DB-level invariant가 주석 속 약속으로만 존재하는 상태에서 무조건 CLOSED는 이 체인이 지금까지 지켜온 정직성 기준에 미달한다.

이 아키텍처는 감사가 두 번 붙잡고(HOLD·HOLD_WITH_LIMITS) 두 번 고쳐서 통과한 체인이다 — 그 과정 자체가 V1의 가장 강한 산출물이며, V3는 그 규율 위에서 시작하면 된다.

---
> **한 줄 결론:** 집은 완성됐고 검사도 통과했다 — 다만 설계도 원본(M2)에 옛 도면이 한 장 남아 있고, 방 하나(M6-G)는 문패가 두 개다. 그 둘을 정리하면서 닫아라. 입주(live)는 여전히 별도 승인이다.
