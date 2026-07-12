# Fable5 Living Pixel-Office Implementation Review Brief

## Reviewer routing decision

- Target actor: Sentinel
- Selected reviewer: fable5 Sentinel
- Target session: existing `reviewer-fable5/%5`
- Required skill: `/fable-sentinel`
- Model and effort: `Fable5 / MAX`
- Review level: Level 3
- Reason: the candidate combines renderer lifecycle, production isolation,
  security and authority boundaries, accessibility, deterministic animation,
  performance, visual evidence, and exact artifact governance.
- Not selected: Advisor cannot self-review; Worker cannot review its own work;
  a new Reviewer session is forbidden; lower review levels do not cover the
  combined security/accessibility/visual scope.
- Return result to: Advisor
- Status: `READY_TO_USE`

## Review identity

- Mission: `AGENT_OFFICE_M1_2_SPATIAL_ANIMATED_ADVISOR_TEAM_OFFICE`
- Pass: `IMPLEMENTATION_SECURITY_ACCESSIBILITY_VISUAL_REVIEW__LIVING_PIXEL_OFFICE_PROTOTYPE`
- Base: `56385b894ff18fd65a4e59f2c4e75f73ea2a56d9`
- Candidate: `c535877b61ad8a1e3d74dca5c6fec0ada4cac3f8`
- Repository: `/home/leo/Project/agent-office`
- Branch: `shadow/agent-office-m1-2-spatial-office`
- Expected candidate delta: 92 paths, `+7278/-14`
- Required result:
  `../foundation-docs/runs/agent-office/20260711_agent_office_m1_2_spatial_animated_advisor_team_office/FABLE5_LIVING_PIXEL_OFFICE_IMPLEMENTATION_SECURITY_ACCESSIBILITY_VISUAL_REVIEW_RESULT.md`
- Required pointer:
  `../foundation-docs/advisor/jobs/20260711_agent_office_m1_2_spatial_animated_advisor_team_office/92_FABLE5_LIVING_PIXEL_OFFICE_IMPLEMENTATION_REVIEW_RESULT_POINTER.md`

## Mandatory direct reads

Read directly and do not trust Worker or Advisor summaries:

- `59_LEO_GPT_LIVING_PIXEL_OFFICE_FINAL_PATCH_DECISION.md`;
- `59_M1_2_LIVING_PIXEL_OFFICE_PATCH_MANIFEST.json`;
- `61_PIXEL_OFFICE_DESIGN_BRIEF.md`;
- the five canonical living pixel-office design documents at design commit
  `9611d0da1479ca5e7a9677641fe767a6b39b4a38`;
- `72_LEO_GPT_PIXI_BRIDGE_DECISION.md`;
- the three canonical bridge documents at commit
  `56385b894ff18fd65a4e59f2c4e75f73ea2a56d9`;
- the prior clean Fable5 design result
  `FABLE5_PIXI_PUBLIC_EXPORT_BRIDGE_DESIGN_DELTA_REVIEW_RESULT.md`;
- artifacts 79 through 91 in this Advisor job;
- the Worker result and pointer;
- the actual candidate source, config, tests, build inputs, snapshots, media,
  Git commits, diffs, and upstream state.

## Mandatory evidence reproduction

1. Reproduce candidate identity, ancestry, exact scope, clean worktree, and
   upstream equality.
2. Recount all runtime public package imports, TypeScript suppressions, Pixi
   versions, compiler strictness, and the exact ESLint exception.
3. Reproduce lint, typecheck, focused bridge tests, full unit tests, core and
   dashboard builds, dependency audit, production-bundle exclusion, default
   browser train, composed browser train, dedicated prototype train, and exact
   evidence verifier. Resource-conscious equivalent commands are permitted,
   but no required class may be skipped silently.
4. Inspect the exact verifier and prove that it accepts only the 13 new and 26
   reconciled PNG paths and rejects any other baseline mutation.
5. Directly inspect all 13 living-prototype PNGs and all 26 reconciled PNGs.
   Record coverage by path group and identify blank, clipped, stale, corrupt,
   mislabeled, or semantically conflicting evidence.
6. Directly inspect all five deliverable PNGs, frames from the WebM at multiple
   times, the matching MP4 lineage, and changing GIF frames. Recompute sizes,
   hashes, dimensions, durations, and file ownership/ignore state.
7. Verify no server, browser, recorder, encoder, or listener remains after
   reproduction.

## Mandatory product-intent checks

Answer each explicitly with evidence:

1. Does one shared office world dominate the primary viewport rather than a
   dashboard/card grid?
2. Are all registered Team Pods spatially present in full-office view and does
   focus/zoom preserve the office-world model?
3. Are walls/floor, desks/computers, shared paths, meeting room, lounge,
   Advisor area, Reviewer area, Team signs/boards, and Channy facilities visibly
   represented?
4. Are actors original sprite-like characters with materially distinct walk,
   sit, type/work, review, carry-document/handoff, return, coffee/lounge, and
   idle presentations?
5. Does Channy visibly demonstrate roam, eat, drink, sleep/play or the exact
   bounded subset authorized for the prototype, without operational authority?
6. Do project colors and labels distinguish Agent Office, Control, Cosmile,
   Foundation, SIASIU, and VibeNews without color being the sole signal?
7. Are technical panels secondary to the office world?
8. Does the recorded timeline visibly include Worker movement, Advisor handoff,
   review/return or the exact scripted bounded sequence, lounge/idle, Channy,
   `WAITING_LEO`, and blocked/status behavior where claimed?
9. Does all operational motion derive only from accepted structured synthetic
   evidence, with no terminal-prose inference, visual-proximity authority,
   delayed replay, actor cloning, or invented collaboration?
10. Are mobile, reduced-motion/static, forced-color, keyboard,
    screen-reader/semantic mirror, and 200-percent-text meanings preserved?

## Mandatory architecture, security, and regression checks

- Single Advisor Team, no-clone, assignment fail-closed, and SIASIU naming;
- public-root Pixi compatibility bridge correctness and lifecycle ownership;
- fail-closed DOM-static and unchanged M1 fallback;
- resize, ticker, context loss, teardown, StrictMode, texture/canvas/root cleanup;
- performance and memory metrics measured under the documented local runtime;
- deterministic fixture and presentation clock boundaries;
- production bundle excludes prototype-only fixture and renderer code;
- no authentication, authority, exact Advisor delivery, transport, gateway,
  browser dispatch, DB, secret, remote/public exposure, or production change;
- no external asset, paid asset, protected-style copying, hidden fetch, or font;
- ignored media is not committed and large binaries are absent from Git;
- the current implementation is prototype-only and full integration remains
  `DEFERRED_WITH_GATE`.

## Finding classes and verdict

Classify findings as one of:

- `CODE_DEFECT`
- `PRODUCT_INTENT_DEFECT`
- `SECURITY_OR_AUTHORITY_DEFECT`
- `ACCESSIBILITY_DEFECT`
- `PERFORMANCE_OR_LIFECYCLE_DEFECT`
- `EVIDENCE_GAP`
- `DOCUMENTATION_STALE`
- `DEFERRED_WITH_GATE`
- `INFORMATIONAL`

Verdict:

- `PASS`
- `PASS_WITH_RISK`
- `NEEDS_PATCH`
- `FAIL`

`PASS` closes only the independent technical prototype review gate. It does not
grant Founder visual acceptance, full integration, production authority, or a
new mission. `PASS_WITH_RISK` must return to Leo/GPT. `NEEDS_PATCH` returns to
Advisor for a same-Worker patch and same-Reviewer delta review. Fable5 must not
patch any candidate or Advisor file and must not grant final approval.

Use no agent, sub-agent, delegated model context, substitute Reviewer, new
session, or temporary session. Scratch files outside the repositories may be
used only for direct read-only reproduction and must be removed.
