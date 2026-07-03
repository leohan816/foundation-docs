# Control Tower Operating Model Propagation — REPORT — 2026-06-29

> foundation-control에 문서화된 운영 모델(`docs/OPERATING_MODEL_20260629.md`)을 SIASIU / Cosmile / FOUNDATION
> 각 repo의 `CLAUDE.md`에 **safe-additive**로 반영. 기존 원칙·구조·문서는 삭제/축약/재작성하지 않음.

## 목적

앞으로 개별 repo Claude Code가 cross-project 작업을 임의로 진행하지 않도록, 각 repo의 작업 지침에
**Control Tower Authority**를 명시한다. 2개 이상 repo가 관련되는 모든 작업은 foundation-control release train으로만 진행한다.

## 추가한 공통 블록 (각 repo CLAUDE.md, 동일)

`## Control Tower Authority / Multi-Repo 작업 규칙 (2026-06-29)` — 핵심:

- 이 repo의 Claude Code = **이 repo 내부 개발 전용**.
- SIASIU/Cosmile Claude Code = 각 repo 내부 개발 전용 · Foundation Claude Code = 당분간 단독 cross-project 작업 중지.
- Foundation/SIASIU/Cosmile 중 **2개 이상 관련 작업 = foundation-control release train 전용**.
- 연동·contract·cross-project regression·product API·consultation·memory migration·live 전환 = **control tower 관할**.
- cross-project 변경 필요 시 직접 진행 금지 → foundation-control로 넘긴다.
- 개별 repo는 control tower의 contract/plan에 따라 **repo-local 구현만**.
- production/public API/live/write/promotion/migration = **별도 승인 release train 없이는 금지**.

## 반영 결과 (각 repo, additive only)

| repo | CLAUDE.md 반영 | 변경 파일 | 기존 원칙 보존 | 비고 |
|---|---|---|---|---|
| **SIASIU** | ✅ | `CLAUDE.md`만 | ✅ (절대 원칙·코딩 규율 intact) | "## 2. 무엇을 만드나" 앞에 블록 삽입 |
| **Cosmile** | ✅ | `CLAUDE.md`만(내 변경) | ✅ | "## 1. 코딩 규율" 앞에 삽입. `app/next.config.ts`는 **사전 미커밋**(본 작업과 무관·미접촉) |
| **FOUNDATION** | ✅ | `CLAUDE.md`만 | ✅ | "## 1. Foundation이 무엇인가" 앞에 삽입 |

- 중복 control-tower 블록은 없었으므로 신규 추가(보강 아님).
- 제품 코드 / tests / reports / runtime / 기능 코드 **변경 0**.

## Safety / 금지 준수

production live · public API live · checkout/order/customer DB write · customer memory live migration ·
canonical write · learned promotion · Vault write · force push = **전부 미수행**. CLAUDE.md 문서 블록만 추가.

## 커밋 (각 repo commit hash는 본 보고서 커밋 직후 최종 보고 참조)

- SIASIU: `CLAUDE.md` 커밋.
- Cosmile: `CLAUDE.md`만 커밋(`app/next.config.ts` 사전 미커밋은 그대로 둠).
- FOUNDATION: `CLAUDE.md` 커밋.
- foundation-control: 본 보고서 커밋.
- push: 미수행(remote/push는 별도 승인). force push: 0.

## 다음 별도 release train

- **Cross-Project Foundation AI Consultation Call Verification Train** (= Cosmile → Foundation Product API &
  Consultation 500-case E2E Verification Train) — foundation-control 관할, read-only/mock/shadow.
