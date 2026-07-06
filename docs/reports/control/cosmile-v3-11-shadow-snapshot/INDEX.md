# COSMILE MEMORY V3-11 — Shadow Snapshot (ChatGPT 검수용)

> 작성: foundation-control / fable-builder · 2026-07-06 · **목적: `leohan816/Cosmile`가 PRIVATE이라 ChatGPT GitHub connector가 404 → V3-11 구현 파일을 PUBLIC `foundation-docs`에 review snapshot으로 복사.**

## ★이것은 사본(review snapshot)이다 — 정본 아님
- **정본(source-of-truth)** = `leohan816/Cosmile` (PRIVATE) · branch `shadow/m4-cosmile-memory` · commit **`b744871101869a0a8a011f70155eb0e96c7f1f47`**.
- 아래 파일은 그 커밋에서 **원 경로 보존 raw copy**(검수 전용). 실행/빌드 대상 아님. 수정 시 정본(Cosmile shadow)만 수정한다.
- ★sync-policy 예외: 평소 foundation-docs엔 소스코드 미복사가 원칙이나, private repo 외부검수 목적 + **실 secret 0·PII 0**(스캔 확인)에서 Leo 명시 지시로 복사.

## 원 경로 ↔ snapshot 경로
| 원 경로(Cosmile) | snapshot |
|---|---|
| `app/src/lib/ids.ts` | `src/lib/ids.ts` |
| `app/src/lib/attribution.ts` | `src/lib/attribution.ts` |
| `app/src/lib/adverse.ts` | `src/lib/adverse.ts` |
| `app/src/lib/ranking.ts` | `src/lib/ranking.ts` |
| `app/src/lib/analytics.ts` | `src/lib/analytics.ts` |
| `app/src/lib/memoryCandidate.ts` | `src/lib/memoryCandidate.ts` |
| `app/src/lib/identity.ts` | `src/lib/identity.ts` |
| `app/src/types/recommendationEvent.ts` | `src/types/recommendationEvent.ts` |
| `app/src/types/recOutcome.ts` | `src/types/recOutcome.ts` |
| `app/scripts/v3_11.vitest.ts` | `scripts/v3_11.vitest.ts` |
| `app/package.json`(diff) | `package.json.diff`(ulid dep) |

## 검수 컨텍스트
- 계약 정본: `COSMILE_MEMORY_V3_DATA_DICTIONARY_CANONICAL_20260706.md`(§1 키·§2 enum·§5 safety) · gate `cdede5d`(D1~D4) · P1 `3b52994`.
- contract-to-code mapping: `COSMILE_MEMORY_V3_11_CONTRACT_TO_CODE_MAPPING_20260706.md`
- test design: `COSMILE_MEMORY_V3_11_TEST_DESIGN_BEFORE_CODE_20260706.md`
- evidence(증명/미증명): `COSMILE_MEMORY_V3_11_IMPLEMENTATION_EVIDENCE_20260706.md`(§8 미증명 범위·§10 검수 질문 5개).

## 테스트 결과(재현)
- pure(provider-independent): **35/35** — `cd app && NODE_ENV=test ./node_modules/.bin/vitest run scripts/v3_11.vitest.ts`
- regression: **10/10**(foundation-memory-deanon + candidate-status)
- ★DB/prisma/migration/secret 무접촉 · main merge 0.

## ★검수 시 주의(evidence §8·§10)
- 이 층은 **순수 로직만** 증명(DB 영속·emit 배선·gate 실집행·semantic 추출 로직 미구현·이월).
- 공격 지점(evidence §10): safety_resolved 강등 가부 · created_at 정렬 · unknown→severe 오탐 · keyed HMAC salt/rotation · RANKING_SIGNALS dead constant 배선 여부.
