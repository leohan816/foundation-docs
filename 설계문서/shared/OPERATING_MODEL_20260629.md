# foundation-control — Operating Model — 2026-06-29

> multi-repo 운영 원칙. 개별 repo Claude Code의 역할을 제한하고, **2개 이상 repo가 관련되는 모든 작업은
> foundation-control(control tower)에서만 release train으로** 진행하도록 기준을 고정한다.
> 이 문서는 기존 `CLAUDE.md` 절대 원칙과 충돌하지 않으며 그것을 운영 차원에서 구체화한다(additive).
>
> ★Design-First 규칙(2026-06-29): 모든 cross-project 작업은 **구현 전에 `설계자료/`에 설계서를 먼저 작성·승인**한다.
> 정본: `설계자료/20260629_CONTROL_TOWER_DESIGN_FIRST_OPERATING_RULE_설계서.md` · 요약: `CLAUDE.md §2.6`.

## 1. 역할 분리 (Role Separation)

| 주체 | 권한 범위 | 비고 |
|---|---|---|
| **Cosmile Claude Code** | Cosmile repo **내부 개발 전용** | commerce shell의 repo-local 구현만. cross-project 금지. |
| **SIASIU Claude Code** | SIASIU repo **내부 개발 전용** | 상담 vertical의 repo-local 구현만. cross-project 금지. |
| **Foundation Claude Code** | **당분간 단독 작업 중지** | core 단독 변경 보류. 변경 필요 시 control tower의 plan/contract를 통해서만. |
| **foundation-control (control tower)** | **cross-project 전권** | 2개 이상 repo가 얽히는 모든 작업의 유일한 관할. |

원칙:

1. **Cosmile Claude Code는 Cosmile repo 내부 개발 전용이다.**
2. **SIASIU Claude Code는 SIASIU repo 내부 개발 전용이다.**
3. **Foundation Claude Code는 당분간 단독 작업을 중지한다.**
4. **Foundation/SIASIU/Cosmile 중 2개 이상이 관련되는 모든 작업은 foundation-control에서만 release train으로 진행한다.**
5. **전체 연동·contract 변경·cross-project regression·safety gate·product API 검증·consultation integration·memory migration·live 전환은 모두 foundation-control 관할이다.**
6. **개별 repo Claude Code는 control tower가 만든 contract/plan에 따라 필요한 repo-local 구현만 수행한다.**
7. **production live·public API live·real user exposure·checkout/order/customer DB write·canonical write·learned promotion·Vault write·customer memory live migration은 각각 별도 승인 release train 없이는 절대 진행하지 않는다.**

## 2. Control Tower 관할 (foundation-control에서만)

다음은 **반드시 foundation-control에서 release train**으로 수행한다(개별 repo Claude Code 단독 수행 금지):

- 전체 연동(cross-project integration) · cross-project regression
- contract 변경(Foundation Core / SIASIU / Cosmile 계약 표면)
- safety gate 검증 · product API 검증 · consultation integration
- memory migration 설계/검증 · live 전환 설계/검증
- 2개 이상 repo의 동시 변경 또는 상호 의존 변경

수행 방식 = **설계 → gate → 구현 → regression → report → freeze** (release train). plan과 rollback을 먼저 남긴다.

## 3. 개별 repo Claude Code의 작업 방식

- control tower가 만든 **contract/plan을 입력**으로 받아 **해당 repo 내부 구현만** 수행한다.
- repo 경계를 넘는 import/의존/연동을 스스로 만들지 않는다(그건 control tower가 contract로 정의).
- 결과(테스트·status·commit hash)를 control tower에 회신하여 cross-project regression에 반영되게 한다.
- 의심되면 멈추고 control tower(=Leo 승인 라인)에 묻는다.

## 4. 절대 금지 (별도 승인 release train 없이는 불가)

production live · public API live · web live · real customer traffic exposure · real user AI consultation ·
checkout/order/customer DB write · customer memory live migration · canonical write · learned/canonical promotion ·
Vault write · memory.db 생성/접근 · ssbrain.sqlite 직접 수정 · safety/external guard 완화 · force push.

기준 상태: `applied_to_real_user=false` · `write=false` · `write_live_promotion=0` · feature flag default OFF.

## 5. 현재 baseline (참조)

LMR 514/514 · Brain 1124/1124 · Trust Core 447/447 · Foundation migration 71/71 ·
Foundation Core one-command runner 89/89·651 · Foundation standalone runner 4/4·36 ·
SIASIU integration 39/39 (answer.py `d7f579443f8a110a` unchanged) · SIASIU workflow 119/119 ·
Cosmile readiness 164/164 · Cosmile loop v0.1 112/112 — **전부 read-only/mock/shadow, live/write/promotion 0.**

## 6. Dual-Vertical Test Policy (2026-06-29)

> 정본: `docs/DUAL_VERTICAL_TEST_POLICY_20260629.md` (additive).

Foundation 관련 테스트가 **상담·안전·product judgment·recommendation·memory reuse·risk classification·trace/reason code·fallback**
중 하나라도 관련되면 → **SIASIU(상담형 vertical baseline) + Cosmile(commerce application baseline)을 함께** 테스트한다.
한쪽만 테스트하면 **이유를 보고서에 명시**한다. cross-project regression은 가능한 한 Foundation runner · SIASIU integration ·
SIASIU workflow · Cosmile readiness · Cosmile loop · consultation/risk/safety **shared cases**를 **모두 포함**한다.
★제품 repo 코드 임의 수정 금지 · live/write/promotion = 0 유지.

## 7. 다음 release train

**Cosmile → Foundation Product API & Consultation 500-case E2E Verification Train** — foundation-control 관할.
(상담→상품판단→추천/비추천/보류/사지마세요→safety gate→memory reuse→trust trace를 Foundation product API 기준
500-case로 read-only/mock/shadow 검증. live 전환은 포함하지 않으며 별도 승인 train.)
