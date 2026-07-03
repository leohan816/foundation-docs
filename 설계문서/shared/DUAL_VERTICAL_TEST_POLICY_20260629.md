# Cross-Project Dual-Vertical Test Policy — 2026-06-29

> foundation-control 운영 원칙 보강(additive). Foundation 관련 상담/안전/상품판단/추천/메모리/risk/trace/fallback
> 테스트는 **가능하면 SIASIU(상담형 vertical)와 Cosmile(commerce application)을 함께** 테스트한다.
> ★제품 repo 코드는 임의 수정하지 않는다. live/write/promotion은 계속 0.

## 1. 왜 dual-vertical인가

Foundation은 도메인 무관 core이고, 두 vertical이 서로 다른 방식으로 소비한다:

- **SIASIU = 상담형(consultation) vertical baseline** — answer.py 기존 동작을 유지한 채 Foundation을 shadow/API로 호출.
- **Cosmile = commerce-facing application baseline** — Foundation의 verdict를 *표시*(판단은 Foundation), 상품/구매 경험 담당.

한쪽만 검증하면 "Foundation 판단이 두 소비 경로 모두에서 안전한가"를 증명하지 못한다. 따라서 공유 안전 속성은 양쪽에서 검증한다.

## 2. 정책 (원칙)

1. Foundation 관련 테스트가 **상담 · 안전(safety) · product judgment · recommendation · memory reuse · risk classification ·
   trace/reason code · fallback** 중 하나라도 관련되면 → **SIASIU와 Cosmile을 함께 테스트**한다.
2. **SIASIU = 상담형 vertical baseline**으로 사용한다(shadow/API consumer, answer.py 무변경).
3. **Cosmile = commerce-facing application baseline**으로 사용한다(harness로 입력 shape 모사, vault 직접 참조 0).
4. **한쪽만 테스트하는 경우 → 그 이유를 보고서에 명시**한다(예: "Cosmile은 아직 consultation 코드 미구현 → harness로 모사").
5. **cross-project regression**에는 가능한 한 다음을 모두 포함한다:
   - Foundation Core one-command runner
   - SIASIU integration regression (39/39)
   - SIASIU existing workflow regression (119/119)
   - Cosmile readiness regression (164/164)
   - Cosmile loop regression (v0.1 112/112)
   - consultation / risk / safety **shared cases** (Cosmile harness + SIASIU shadow 양측)
6. **제품 repo 코드(FOUNDATION/SIASIU/Cosmile)는 임의 수정하지 않는다.** 필요한 구현은 해당 repo의 별도 release train.
7. **live/write/promotion = 0** 유지. read-only/mock/shadow only. applied_to_real_user=false, write_performed=false.

## 3. 적용 방법 (실무)

- 새 Foundation 관련 eval/test를 만들 때, 케이스 분포에 **SIASIU 경로(예: `ssbrain.foundation_repo_link` / `foundation_shadow_adapter`)
  와 Cosmile 경로(예: `foundation_consultation` harness → `foundation.api`)를 둘 다** 포함한다.
- 공유 안전 invariant(unsupported recommendation, high-risk false_allow, medical/pregnancy/adverse overreach,
  internal disclosure, deleted/blocked/expired memory reuse, raw/PII trace leak, write/live/promotion)는 **양 vertical에서 0**임을 확인한다.
- 네임스페이스 주의: SIASIU(`foundation.*`)와 FOUNDATION(`foundation.*`) 패키지명이 충돌하므로, SIASIU 경로는 **별도 프로세스(서브프로세스)**로 실행한다.

## 4. 현재 커버리지 (2026-06-29 기준)

| regression 구성요소 | 포함? | 비고 |
|---|---|---|
| Foundation Core runner | ✅ | `cross_project_regression_runner.py` (89/89·651) |
| SIASIU integration 39/39 | ✅ | runner 포함 |
| SIASIU workflow 119/119 | ✅ | runner 포함 |
| Cosmile readiness 164/164 | ✅ | runner 포함 |
| Cosmile loop v0.1 112/112 | ✅ | runner 포함 |
| consultation/risk/safety shared cases | ✅ | consultation train: Cosmile harness 300 + SIASIU shadow 100 + safety 50 + fallback 50 (양 vertical) |

**한쪽만 테스트된 사례(이유 명시):**
- 일부 Cosmile consultation 케이스는 **harness로 모사**했다 — Cosmile repo에 consultation→Foundation 코드가 아직 없기 때문(commerce shell만 존재). 실제 Cosmile-side 구현은 **별도 Cosmile repo-local train**(Leo 승인 필요).
- v0.1 commerce loop(`cosmile_loop`)는 SIASIU readiness adapter 경유라 **Cosmile 중심**이지만, 공유 안전 invariant는 SIASIU baseline regression(39/39·119/119)으로 함께 보존 확인된다.

## 5. 다음 release train 후보

- Cosmile repo-local consultation client 구현(양 vertical 실코드 연동) — Cosmile repo, Leo 승인.
- dual-vertical shared safety corpus 확장(양 vertical 동일 케이스 대조).
- caller-side intent/risk classifier(mislabel 견고성) — SIASIU intake / Cosmile.
