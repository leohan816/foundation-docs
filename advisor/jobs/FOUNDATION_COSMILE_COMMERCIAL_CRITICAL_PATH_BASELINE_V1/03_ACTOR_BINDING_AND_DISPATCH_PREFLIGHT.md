# Actor Binding and Dispatch Preflight

```text
MISSION_ID: FOUNDATION_COSMILE_COMMERCIAL_CRITICAL_PATH_BASELINE_V1
PREFLIGHT_AT_UTC: 2026-07-17T12:10:37Z
PREFLIGHT_AT_KST: 2026-07-17T21:10:37+09:00
PREFLIGHT_RESULT: PASS
INSTRUCTION_GATE: PROCEED_WITH_LIMITS
```

## Correction to admission inventory

The first admission artifact transcribed the foundation-control untracked-entry count as 31. A direct `git status --porcelain=v1` count at dispatch preflight is 33. Metadata-only inspection shows all 33 entries predate this mission, with modification timestamps from 2026-07-01 through 2026-07-06. No file content was opened. The admission record is corrected in this non-amended follow-up commit. The policy remains: preserve all 33 entries untouched and exclude them from mission evidence.

## Selected live actors

| Actor | tmux session / window / pane | Live model | Effort | CWD | Role / skill | Sync | Readiness |
|---|---|---|---|---|---|---|---|
| `cosmile` | `$1` / `@1` / `%1` | Fable 5 | high | `/home/leo/Project/Cosmile` | Cosmile repo-owner Worker / `/fable-builder` required by handoff | off | idle after `/clear`; ready |
| `foundation` | `$3` / `@3` / `%3` | Opus 4.8 | max | `/home/leo/Project/FOUNDATION` | Foundation repo-owner Worker / `/fable-builder` required by handoff | off | idle after `/clear`; ready |
| `foundation-control` | `$4` / `@4` / `%4` | Opus 4.8 | high | `/home/leo/Project/foundation-control` | internal Control / skill `NONE` for this read-only WorkUnit | off | idle after `/clear`; ready |

The actors have no overlapping current task after context clearing. Each exact launcher requires direct current role reads, direct handoff reads, no memory execution, no new agent/subagent, and return only to `foundation-advisor`.

## Repository state immediately before dispatch

| Repository | Branch | HEAD | Tracked/staged drift | Untracked entry count |
|---|---|---|---|---|
| Cosmile | `shadow/m4-cosmile-memory` | `b8b61d746e2bdbb8d7ab26405bf44fb665ad87a6` | zero | 6 |
| FOUNDATION | `shadow/foundation-shared-memory-v0` | `33570b9d7db79c991bb216b6a2dc80880ba1f2d6` | zero | 2 |
| SIASIU | `shadow/m4-siasiu-memory` | `e1830b45c6d2b22b2471bb5957b6aaf7fa6dd602` | zero | 3 |
| foundation-control | `shadow/m5-ingress-gate` | `c89b792bed177aad9322e09debecc76caab0c8a0` | zero | 33 |

No product or Control repository command beyond static Git metadata inspection was executed. No branch or ref moved.

## Dispatch decision

```text
COSMILE_DISPATCH: APPROVED_WITH_E2_STATIC_LIMIT
FOUNDATION_DISPATCH: APPROVED_WITH_E2_STATIC_LIMIT
CONTROL_DISPATCH: APPROVED_WITH_E2_STATIC_LIMIT
SIASIU_DISPATCH: NOT_SELECTED
REVIEWER_DISPATCH: DEFERRED_UNTIL_IMMUTABLE_P1_P4
PRODUCT_REPOSITORY_WRITE: ZERO
```
