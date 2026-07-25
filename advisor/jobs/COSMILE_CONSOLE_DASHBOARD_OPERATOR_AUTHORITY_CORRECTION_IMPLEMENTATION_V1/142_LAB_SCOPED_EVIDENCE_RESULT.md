# Lab-Scoped Evidence Correction — Worker Result

OUTCOME: `PASS` — all 8 corrected Lab-scoped assertions satisfied on the single attempt.

MISSION_ID: `COSMILE_CONSOLE_DASHBOARD_OPERATOR_AUTHORITY_CORRECTION_IMPLEMENTATION_V1`
ACTOR: existing Cosmile Worker · SESSION `cosmile` · Claude Opus 5 / xhigh · SKILL `/fable-builder` (`implementation-execution`, `implementation-report-template`)
HANDOFF PIN: `141_...WORKER_HANDOFF.md` blob `13ed5265819ceaa9acddfa76ad7deadba8d8bcc6`, SHA256 `f3bfbd4a...6bf2b73c` in docs commit `3a88cd105324062634fe414ec470b57fec5e1b65` — verified byte-exact before execution.
BASE = HEAD after run = upstream = `6486019e0968de5671e43521e5cfb40d03b0bdca` (unchanged)
Lab-local root selector asserted: `section[aria-labelledby="lab-home-heading"]`.

## Ceiling actually used

Build 1 · runtime start 1 · Chromium launch 1 · `Page.navigate` 1 · `Runtime.evaluate` 1 · controller run 1. No retry, no second observation, no alternate controller. Controller elapsed 986 ms (ceilings 30 s total / 20 s DOMContentLoaded).

- Preconditions PASS — HEAD=BASE, delta 0, upstream-equal, port 31081 free, `.next` absent (cleaned by E7), pinned Chromium present, Node v24.18.0.
- Build 1 PASS — exit 0, same telemetry-off and unreachable-loopback `DATABASE_URL=postgresql://127.0.0.1:1/cosmile_console_candidate` environment as E7 (also carried to the runtime start, as in E7 and declared there).
- Runtime start 1 PASS — one direct `next start -H 127.0.0.1 -p 31081`, own PGID 194401 (≠ supervisor 194358); job control plus unconditional cleanup trap.
- Readiness PASS — TCP LISTEN via `ss` plus process-group liveness (1 poll); no readiness HTTP request.
- Chromium 1 PASS — pinned binary, isolated 0700 profile, `about:blank`, headless/no-sandbox, `--remote-debugging-port=0`, own PGID 194448.
- DevTools/CDP PASS — `DevToolsActivePort` read within deadline, direct browser WebSocket (no `/json`), one target created/attached flat, Page+Runtime enabled, one navigate, `Page.domContentEventFired`, one evaluate.

## Corrected assertions (all PASS)

| Assertion | Observed |
|---|---|
| `url_pathname_is_lab` | `/lab`, `readyState: complete` |
| `lab_local_root_exactly_one` | 1 match for the Lab-local root selector |
| `lab_heading_text_exact` | 1 `h1#lab-home-heading` inside the root, exact text, length 10 |
| `lab_anchors_exactly_31` | 31 anchors inside the root |
| `lab_anchors_all_match_capability_pattern` | 31 of 31 match `/lab/<capabilityId>` (no other anchor inside the root) |
| `lab_anchor_pathnames_distinct_31` | 31 distinct pathnames |
| `lab_scoped_forbidden_controls_zero` | total 0 across `button` 0, `form` 0, `input` 0, `select` 0, `textarea` 0, `[role="button"]` 0, `[formaction]` 0, `[data-command]` 0, `[data-action]` 0, `[contenteditable]` 0, inline `on*` 0, `isContentEditable` 0 — over 508 elements in scope (root included) |
| `design_mode_off` | true |

Non-verdict informational only: global page `button` count 13, unchanged from E7 and excluded from pass/fail per the corrected scope. No DOM, markup, text bodies, or capability IDs were returned or retained.

## Cleanup and effects

Cleanup PASS — only the two captured process groups terminated (TERM then KILL); `.next`, controller, profile, output, and temp root removed. Verified after the run: 0 listeners on 31081, 0 mission runtime/Chromium processes, temp root absent, `.next` absent.
Product PASS — Git delta 0 (staged/unstaged/untracked empty), HEAD unchanged and upstream-equal.
Effects 0 — no product source/config/schema/migration/fixture/test edit; no Vitest, typecheck, DB, provider, economic, public-preview, or existing-service action; no package change; no commit, push, main/protected-branch, or force push; no agent/sub-agent/delegation; no browser dispatch; no session kill/restart; no self-review, risk acceptance, or approval.

## What this proves and does not prove

Proves: at the observed load state, the Lab-local root exposes exactly the read-only registry surface — one exact heading, 31 distinct capability-detail links and nothing else clickable, and zero executable, mutation, or editable controls of any listed kind. The page-wide button total is no longer an oracle.
Does not prove: any post-hydration state. The evaluate ran once at DOMContentLoaded (`readyState: complete`, React hydration not observed to completion), so client-mounted shell controls such as the `ShippingPopup` pair were absent in both E7 and this run; a Lab-local re-check after full hydration is not covered. Also not covered: `/lab/<capabilityId>` detail pages, keyboard/focus behaviour, and any non-`/lab` route. No test or fixture was landed — this result is evidence for the Advisor's assertion-correction decision, not the correction itself.

RETURN_TO: foundation-advisor
PROPOSED_NEXT_ACTOR: foundation-advisor
STOP
