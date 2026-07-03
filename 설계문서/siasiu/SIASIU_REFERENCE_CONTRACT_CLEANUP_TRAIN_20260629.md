# SIASIU Reference Contract Cleanup Train — 2026-06-29

> safe-additive 구조 균일화 cleanup train. **기능 변경 아님.**
> 목적: FOUNDATION repo 안에 `foundation/siasiu/` reference contract layer를 추가하여
> `foundation/cosmile/`와 cross-project 계약 표면을 균일화한다.

## 1. 배경 / 동기

- `FOUNDATION/foundation/cosmile/` 는 존재(Foundation-side Cosmile adapter)하지만 `FOUNDATION/foundation/siasiu/` 는 없었다.
- SIASIU ↔ Foundation 통합은 **consumer-side**(`SIASIU/app/ssbrain/foundation_*`)로 이미 구현·검증됨
  (shadow/API regression PASS, integration 39/39, workflow 119/119).
- 이 비대칭은 **기능상 오류는 아니다**(의도된 consumer-side vs Foundation-side 구조). 다만 control tower 관점에서
  계약 표면(reference contract)을 한 곳에서 균일하게 보이게 하는 것이 유지보수에 좋다.
- 본 train은 그 reference 표면만 **safe-additive**로 채운다. 기존 동작/런타임 decision logic은 일절 건드리지 않는다.

> 참조: `docs/SIASIU_FOUNDATION_CONTRACT_LOCATION_20260629.md` (비대칭 inventory + 이 cleanup 제안의 출처).

## 2. 절대 원칙 (이 train)

production live / public API live / real user AI consultation / customer memory live migration /
checkout·order·customer DB write / canonical write / learned promotion / Vault write = **전부 금지·미수행**.
SIASIU `answer.py` 변경 금지 · SIASIU existing behavior 변경 금지 · Foundation runtime decision logic 변경 금지 ·
Cosmile loop 변경 금지 · force push 금지.

## 3. 설계 (gate)

`FOUNDATION/foundation/siasiu/` 아래 **순수 reference contract**만 둔다 — `dataclass / TypedDict / Literal / constant`.
SIASIU runtime을 import하지 않고 Foundation core를 실행하지 않는다.

| 파일 | 목적 |
|---|---|
| `__init__.py` | 패키지 init + 서브모듈 re-export. 핵심: SIASIU app code 아님 명시. |
| `siasiu_foundation_contract.py` | SIASIU가 Foundation에 기대하는 high-level decision surface. `DecisionType`(recommend/do_not_recommend/hold/do_not_buy/ask_more/cannot_determine), `EvidenceMode`, `SafetyGateResult`, `MemoryReuseDecision`, `CONTRACT_METHODS`(healthcheck/evaluate_consultation/judge_product/recommend_or_hold/do_not_buy_decision/memory_reuse_decision/trust_trace), frozen `SiasiuFoundationDecision`(applied=False·write=False 불변식). |
| `siasiu_shadow_contract.py` | shadow/API 호출 invariants: `applied_to_real_user=False`·`write=False`·`write_live_promotion=0`·`fallback_required=True`·`answer_behavior_unchanged=True`·`feature_flag_default_off=True`·`source="foundation_repo"`. |
| `siasiu_trace_contract.py` | `ALLOWED_TRACE_KEYS`(trace_id/decision_type/evidence_mode/safety_gate_result/source/applied/write/reason_codes/status/kind/ref/hash) vs `FORBIDDEN_TRACE_KEYS`(query/body/raw/user_text/PII). `is_trace_clean()` 순수 검사. |
| `siasiu_feature_policy.py` | 현재 integration policy = 전부 disabled. `SEPARATE_RELEASE_TRAIN_REQUIRED` 명시. |
| `README.md` | 이 폴더는 SIASIU app code 아님 · Foundation-side reference contract · 실제 consumer adapter는 SIASIU `app/ssbrain/foundation_*`. |

Gate 통과 기준: import OK · SIASIU runtime/app import 0 · Foundation core 미실행 · 기존 파일 수정 0 · live/write/promotion 0.

## 4. 검증 항목 (요약 — 상세 결과는 cleanup REPORT/EVAL)

1. FOUNDATION import smoke: `foundation.siasiu`(+4 모듈) import — **13/13 PASS**.
2. no SIASIU dependency: `foundation/siasiu/*.py` 에 `ssbrain`/`app`/`/home/leo/Project/SIASIU`/`foundation_trust_core_runtime`/Foundation 서브패키지 import — **0 violations**.
3. no behavior change: SIASIU `answer.py` fingerprint `d7f579443f8a110a` 불변 · SIASIU integration **39/39** · workflow **119/119** 유지.
4. Foundation runner: standalone repo runner **4/4 · 36 assertions**(DELTA: 3/3·23 → 4/4·36, additive) · one-command runner **89/89·651 all_pass**.
5. control regression: Cosmile readiness **164/164** 유지 · Cosmile loop v0.1 **112/112** 유지 · 모든 safety invariant 0 · all_pass=true (cleanup이 Cosmile loop에 영향 없음).

## 5. 커밋 정책

- FOUNDATION repo: `foundation/siasiu/` + smoke test 추가 커밋 (additive-only, 기존 파일 수정 0).
- foundation-control repo: cleanup docs/reports 커밋.
- SIASIU repo: **변경 없음**(read-only 확인만). Cosmile repo: **변경 없음**.
- force push: 0.

## 6. 다음 별도 release train

- (선택) SIASIU consumer adapter가 이 Foundation-side reference contract를 명시적으로 참조/검증하도록 연결 — **별도 train, SIASIU repo 변경 수반 → Leo 승인 필요**.
- 모든 live 활성화(production/public API/web/checkout·order·customer DB/canonical/learned/Vault/memory migration)는 각각 별도의 승인된 release train.
