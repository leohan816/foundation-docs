# FABLE5 FINAL DESIGN DELTA RE-REVIEW (AS-BUILT) — Agent Office M01 Rework

- Actor: **Fable5 Reviewer** (`reviewer-fable5`) · Pass: `DESIGN_REVIEW__AGENT_OFFICE_M01_FINAL_REWORK_DELTA` · Level 3 · Skill: `/fable-sentinel`
- Target: canonical docs at `3bd0e8f` (delta from `0f90e39`: 7 files, +363/-78, read via diff + current text) — separate verdict from the implementation pass
- Date: 2026-07-11 · Return to: **Advisor**
- **VERDICT: `NEEDS_PATCH`** — prior D-1/D-2/D-3 CLOSED, but AO-E-R3 introduces new as-built staleness (R3.9) that the canonical documents must record before final acceptance.

## 1. Prior findings

- **D-1 CLOSED**: master now documents the runtime client and the synthetic-composition boundary (`:104` typed status/projection/SSE/CSRF client with explicit synthetic-fixture marking; `:267` synthetic test composition separately imported).
- **D-2 CLOSED (letter)**: AO-REQ-010/019 rows now carry authority-evidence wording consistent with the implemented verifier.
- **D-3 CLOSED**: section 2 heading now reads "Current Truth and Final Rework Boundary".

## 2. New finding — R3.9 `DOCUMENTATION_STALE` (REQUIRED)

The as-built documents do not record the actual composed-runtime truth reproduced in the implementation pass: the executable CLI binds a fixture manifest (`cli.ts:24,27`); the composition instantiates the disabled `HermesAdvisorGateway` while master `:77` still presents the capability-gated `TmuxAdvisorGateway` as the delivery gateway of record; the runtime UI disables the office scene (`runtime-app.tsx:43`); the runtime projection hard-codes `CURRENT`/`VERIFIED_LOCAL_EVENT_PROJECTION` and `alerts: []`. Under the addendum's as-built rule these divergences must be recorded (and later restored to conformant wording only from actual evidence after the code fixes) — the design itself must not be weakened to excuse them, and I found no such weakening.

## 3. Verdict rationale

The doc rework honestly closed the three prior defects and added real disclosures, but the same as-built standard that drove the prior verdict now applies to the rework's own gaps: canonical docs describing a delivery gateway and operational surface the executable does not compose are stale on material points. Doc-level, same-Worker patchable, naturally bundled with the R3 code fixes. Per V2: `NEEDS_PATCH`.

## 4. Self-review

Claims cite current doc text/diff and the implementation-pass reproductions from this session; read-only; no doc patched; separate artifact/verdict per V2 section 9. Not re-verified: every unchanged doc section (delta discipline — regression greps found no overclaim of RUNNING_PRIVATE/ACTIVE anywhere).

Return to: **Advisor**.
