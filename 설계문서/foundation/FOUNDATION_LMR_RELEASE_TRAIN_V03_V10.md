# Foundation — Learning / Memory / Reuse Release Train v0.3 → v1.0

> **2026-06-28 · LMR v1.0 migration-ready baseline (CLOSED).** gate 기반 릴리스 트레인 v0.3→v0.9 + v1.0 final fix. 이전/ API live/실서비스/실승격 아님 — SIASIU 내부 구현·테스트·성능·회귀 보존.
> **현재 위치: LMR v1.0 migration-ready baseline PASS.** 트레인 v0.3→v0.9 전 gate 통과 + v1.0 final fix(MF0~MF3) 완료 후 baseline freeze. **Actual Foundation migration, API live, canonical write, and learned/canonical promotion remain disabled and require separate explicit human approval.**
>
> v0.6~v1.0 각 단계는 별도 **8차원 중단조건 adversarial 감사 워크플로**(independent auditors)로 위반 0 확인(총 5회).

## 0. 트레인 상태 요약
| 버전 | 목표 | 상태 | eval 케이스 | 테스트 목표 | 성능 | 비고 |
|---|---|---|---|---|---|---|
| **v0.3** | Vault Read-only Intake + Perf Baseline | ✅ PASS | 83 | 80+ | 전 목표 충족 | commit 980204e |
| **v0.4** | Tier/Provenance/Conflict Calibration | ✅ PASS | 131 | 120+ | 전 목표 충족 | b9256df |
| **v0.5** | Adversarial/Mutation/Malformed | ✅ PASS | 183 | 180+ | 전 목표 충족 | b9256df |
| **v0.6** | Scale/Latency/Batch Stress | ✅ PASS | 256 | 250+ | 전 목표 충족 | 93688e3 |
| **v0.7** | Memory Trust Gate M6 Shadow | ✅ PASS | 310 | 300+ | 전 목표 충족 | 5b96657 |
| **v0.8** | Foundation API Contract Dry-run | ✅ PASS | 362 | 350+ | 전 목표 충족 | df12237 |

| **v0.9** | Migration Rehearsal / RC | ✅ PASS | 415 | 400+ | 전 목표 충족 | 6acf275 |
| **v1.0** | Migration-ready Baseline (CLOSED) | ✅ PASS | 514 | 500+ | 전 목표 충족 | 1d5eb86 |

## 1. 테스트 증가 추이 (줄어들면 실패 — 늘어남 확인)
- eval 케이스: v0.2 **53** → v0.3 **83** → v0.4 **131** → v0.5 **183** → v0.6 **256** → v0.7 **310** → v0.8 **362** → v0.9 **415**.
- 내 테스트 스위트 assertions 합계: v0.2 **389** → v0.5 **421** → v0.6 **431** → v0.7 **459** → v0.8 **496** → v0.9 **529** (45스위트 45/45 GREEN).
- 신규 테스트(v0.3~v0.7): `test_vault_readonly_reader`(6)·`test_intake_validator`(8)·`test_lmr_perf`(7)·`test_lmr_adversarial`(10)·`test_lmr_scale`(10)·`test_memory_trust_gate_m6`(12)·`test_m6_shadow_runtime`(8)·`test_lmr_m6_shadow_loop`(8).
- **기존 v0.1/v0.2 테스트·하니스·eval JSON 삭제 0**(regression suite `delete_forbidden=true`).

## 2. 성능 추이 (전 버전 전 목표 충족)
| 지표 | 목표 | v0.3 | v0.5 |
|---|---|---|---|
| reuse_gate p95 | <20ms | 0.003ms | 0.0015ms |
| metadata parser p95 | <50ms | 0.055ms | 0.034ms |
| single file intake p95 | <100ms | 0.048ms | 0.045ms |
| 100 file batch | <5s | 0.003s | 0.003s |
| full eval suite | <60s | 0.014s | 0.017s(183 cases) |
| timeout / crash | 0 / 0 | 0 / 0 | 0 / 0 |

## 3. 버전별 보고 (A–V 압축)

### v0.3 — Vault Read-only Intake + Performance Baseline (PASS)
- **B.파일**: `vault_readonly_reader`(read-only·경로 가드·무변경)·`intake_validator`·`tools/lmr_perf_bench`.
- **C/D.테스트**: 83 eval + 신규 3스위트(21). **E.regression 보존**: v0.1 22·v0.2 31 유지.
- **G.pass/fail**: 83/83. **H.false_allow/false_block**: 0 / 0. **J.speed**: reuse_gate p95 0.003ms.
- **P.write guard**: Vault git diff 0·memory.db 0. **Q.raw**: 전 record raw/teacher raw 0.
- **U.다음 진행**: gate PASS → v0.4. **V.commit**: 980204e push.

### v0.4 — Tier/Provenance/Conflict Calibration (PASS)
- tier→constraint·고위험 충분성 캘리브레이션(Tier1만 고위험 충분)·conflict precision/recall proxy.
- **C.테스트**: 131 eval. **F.positive/negative**: calibration 18 + 정상 허용(false_block 0).
- **H.false_allow/false_block**: 0 / 0. **conflict recall**: 알려진 충돌 쌍 감지·비충돌 미플래그.
- **U**: gate PASS → v0.5.

### v0.6 — Scale / Latency / Batch Stress (PASS)
- **B.파일**: `tools/lmr_scale_bench`(1k+ synthetic·batch reuse/conflict/dry-run·memory tracemalloc/rss·percentile)·`test_lmr_scale`(10).
- **C.테스트**: 256 eval(scale 73) · **E.regression 보존**: v0.1~v0.5 183 전부 포함.
- **3·4·5.batch**: 1k·2k batch reuse·conflict 50쌍(recall **1.0**·false positive 0)·dry-run 500(status 변경 **0**·실승격 **0**).
- **6.memory**: tracemalloc peak **4.37MB**(목표<200)·rss delta 미미. **7.latency**: batch1000 reuse p95 **0.010ms**(목표<5ms).
- **8.timeout/crash**: **0 / 0**. **9.false_allow**: **0**(변조 혼합 batch 전 차단). **10.safety**: 고위험/privacy/customer leak 0.
- **11.write guard**: Vault git diff **0**·canonical write 0·memory.db 0·ssbrain 무변경.
- **N.1차 실패와 수정(1건)**: scale bench 목표가 size 1000 하드코딩 → 최대 size에 목표 적용으로 수정(목표치 불변·게이트 완화 아님).
- **감사**: 8차원 중단조건 독립 adversarial 워크플로 → 위반 **0**.
- **U**: gate PASS → v0.7(M6 Shadow).

### v0.5 — Adversarial/Mutation/Malformed (PASS)
- **B.파일**: `adversarial_mutations`(9 변조)·파서 fail-closed·is_canonical/enum/path-traversal 승인 가드.
- **C.테스트**: 183 eval(adversarial 82) + `test_lmr_adversarial`(10).
- **N.1차 실패와 수정(5건·게이트 강화)**:
  1. conflict polarity 키워드 brittle("써도 된다"≠"써도 되") → 키워드 보강(recall↑).
  2. is_canonical 위조 승인 통과 → `approve_invariant_errors`에 `canonical_without_basis` 가드.
  3. path-traversal source_ref 승인 통과 → `suspicious_source_ref` 가드.
  4. invalid enum 승인 통과 → `invalid_risk/privacy_level` 가드.
  5. (테스트 구성) version 케이스 make_record version 미반영 → record에 직접 세팅.
  → **수정 후 183/183·false_allow 0**. ★게이트 완화/테스트 삭제로 PASS 만든 것 0.
- **I.safety**: 전 변조 fail-closed(승인 0·재사용 0)·customer scope 공격 차단·tier/provenance spoof 고위험 불가.
- **U**: gate PASS → v0.6.

## 4. 실패/수정 추이
- v0.3: 1차 0 fail. v0.4: 1차 0 fail. v0.5: 1차 5 fail(전부 게이트 강화로 수정·누출 은폐 0).
- 누적 failure taxonomy: v0.1 21 + v0.2 21 + (v0.5 adversarial 21) = **63종 정의 · 최종 발생 0**.

## 5. 남은 위험
| # | 위험 | 등급 |
|---|---|---|
| 1 | conflict 감지 키워드 polarity 기반(의미 모순 일부 누락 가능) | medium |
| 2 | 성능은 synthetic batch 기준(v0.6 1k+ 완료) — 실 운영 데이터 분포 실측은 미수행 | medium |
| 3 | 실 운영 데이터/실 Vault 연동은 v1.0 후 별도 작업(must_fix/needs_human) | medium |
| 4 | 실 Vault reader는 read-only metadata만(실 정본 스키마 미보유 파일은 tier unknown) | low |

## 6. Foundation 이전 가능성 판단
- **이전 준비됨(로직층)**: state·reuse_gate·approval·provenance·conflict·supersede·dryrun·file intake·vault read-only·intake_validator·adversarial·M6 shadow·API contract·migration rehearsal — 순수 로직 17모듈 boundary clean(ssbrain/answer/memory.db/live import 0).
- **v1.0 baseline 확정(v0.3~v0.9 전 gate + MF0~MF3)**: runtime adapter contract·실 Vault schema adapter·실 foundation.lmr namespace import 검증 완료.
- **여전히 닫힘(별도 승인 필요)**: 실 Foundation 이전·API live·canonical write·learned/canonical 실승급. needs_human(이전 시점/범위·승급 정책) 미해소.
- **감사 주의(중대성 아님)**: 레거시 `brain.py`는 `memory.db` 코드 보유하나 LMR/Foundation 범위 밖·gitignore·현재 부재이며, LMR/Foundation 모듈은 memory.db write를 전부 REFUSED로 거부.
- **실 이전 전 human approval 필수**(matrix `human_approval_required_before_actual_migration=true`).

## 7. 최종 판단 (과장 없이)
- **LMR v1.0 migration-ready baseline PASS**: v0.3→v0.9 전 gate + v1.0 final fix(MF0 문서정합·MF1 runtime adapter·MF2 Vault schema adapter·MF3 실 namespace) 완료. eval 22→500+·assertions 529+·전 안전 불변식 0·full-loop 100/100·5회 8차원 독립 감사 위반 0.
- **Release Train CLOSED**: LMR 자체는 v1.0 baseline으로 freeze. 더 이상 LMR 버전업 없음.
- **여전히 금지(별도 승인된 새 release train 필요)**: 실 Foundation 이전·API live·learned/canonical 실승급·canonical write·Cosmile/SIASIU live. **(주의: 이는 "실 이전 완료"·"API 라이브 개방"·"프로덕션 라이브 준비"를 의미하지 않는다 — baseline freeze일 뿐.)**
