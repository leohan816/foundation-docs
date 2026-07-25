# 100 — M4 Worker Handoff: Reviewed Read-only Lab Registry

MISSION: `COSMILE_CONSOLE_DASHBOARD_OPERATOR_AUTHORITY_CORRECTION_IMPLEMENTATION_V1`
MODULE: M4
BASE: `38b7ace904f45a13982636f1704a64d78cbb47c9`
ACTOR: existing Cosmile Claude Worker primary · Opus 4.8/xhigh
SKILL: `/fable-builder` with implementation-execution, contract-to-code-mapping, test-design-before-code; report template only at return

## Exact path ceiling

1. `app/src/lib/console/labRegistry.ts`
2. `app/src/app/lab/page.tsx`
3. `app/src/app/lab/[capabilityId]/page.tsx`
4. `app/scripts/o1_lab_registry.vitest.ts`

No fifth path.

## Canonical row set

Exactly the 31 `LAB` rows reviewed in `22_DESIGNER_SURFACE_MAPPING.md`:

`N04,N06,N07,M03,L01,L02,L04,L05,L06,L07,L08,L09,L10,L11,L12,L13,L14,L15,L16,L17,L18,A04,A06,A07,T01,T02,T03,T04,T05,E11,E12`

No `MAIN_NOW`, `MAIN_LATER` or `RETIRE_CANDIDATE` row may enter the registry.

## Frozen read contract

- One immutable source-owned array and fail-closed `findLabCandidate(id)` helper.
- Every row contains: exact ID; Korean name; current source/evidence path; truth class; timing `OPTIONAL_GROWTH|DEFERRED_PROGRAM`; data state from the reviewed closed vocabulary; authority owner `NONE_READ_ONLY`; exact evidence commit `3dc5129b573237a85f34bfa65a329a299d31fef2`; unresolved risk; promotion gate `PASS_EVIDENCED|FAIL|HOLD|NOT_APPLICABLE`.
- Truth classes remain honest: mock/mixed, partial, dry-run, deferred, not-collected or unverified. Never label a row live/connected/production.
- `/lab` shows all 31 read-only cards with truth/timing/data/gate badges and detail navigation only.
- `/lab/[capabilityId]` decodes/bounds fail closed, renders only the selected row and its evidence/risk/authority/prohibited-action contract; unknown IDs `notFound`.
- Korean-first, mobile single-column floor, semantic headings/lists, focus-visible links.
- No button, form, input, fetch, POST, approve, promote, invoke, dry-run execution, AI/O1 command, order/payment/inventory/customer mutation or external link.

## Tests first

Create the focused test and run exactly:

`./node_modules/.bin/vitest run scripts/o1_lab_registry.vitest.ts`

Meaningful RED must prove the missing immutable 31-row registry/detail route. GREEN must prove exact unique ID set/count, required fields/vocabularies/evidence pin, no non-Lab row, fail-closed lookup, exact read-only pages/navigation, prohibited symbol/action absence and Korean/mobile/accessibility markers.

No second test, build, typecheck, generate, DB, provider, runtime, browser or M5. One truthful Claude commit without co-author trailer, non-force push, clean/upstream-equal. Write only `101_M4_WORKER_RESULT.md` and `102_M4_WORKER_POINTER.md`; return and STOP.
