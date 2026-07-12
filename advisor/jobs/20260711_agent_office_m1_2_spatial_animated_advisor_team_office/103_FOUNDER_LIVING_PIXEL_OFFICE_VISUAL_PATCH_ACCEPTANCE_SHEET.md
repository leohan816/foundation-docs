# Founder Living Pixel-Office Visual Patch Acceptance Sheet

Status: `AWAITING_LEO_GPT_AO12_PWU_11_D2_DECISION`

## Reviewed candidate

- Mission: `AGENT_OFFICE_M1_2_SPATIAL_ANIMATED_ADVISOR_TEAM_OFFICE`
- WorkUnits complete: `AO12-PWU-11-P1` and `AO12-PWU-11-R1`
- Candidate: `ac8ba75d3a128385beaeeac58ae5bf54c03d23f2`
- Base: `c535877b61ad8a1e3d74dca5c6fec0ada4cac3f8`
- Worker model: `<Codex 5.6 SOL: Ultra>`
- Independent reviewer: `<Fable5: MAX>`
- Fable5 verdict: `PASS` clean
- Blocking findings: zero
- Full integration: not authorized

## What changed

1. Every visible actor now has a camera-tracked compact identity label with
   role, model, session, operational state, role glyph, state ring, and source
   indication.
2. The keyboard/click drawer exposes role, project, Advisor Team, reports-to
   Advisor, session, model, state, mission, WorkUnit, and evidence freshness.
3. Exact session names come from verified registry facts. Only Agent Office
   Worker and Fable5 Reviewer have proven model values; all others are
   `UNKNOWN`.
4. Channy moves more slowly with long pauses and walk, stop, sniff, sit, eat,
   drink, sleep, and play sequences.
5. Channy has a more recognizable original pixel Bedlington silhouette.
6. The office uses ivory, light oak, sand, warm gray, glass-blue, and muted
   charcoal; project colors remain accents.
7. Desktop, mobile, static, accessibility, performance, evidence, and fallback
   gates passed.

## Directly viewable artifacts

Artifact root:

`/home/leo/Project/agent-office/artifacts/m1-2-visual-prototype/`

| Artifact | Bytes | SHA-256 |
|---|---:|---|
| `agent-office-living-office-prototype.webm` | 2962442 | `b10a6c4ff83e2618fb45e955a9f13b1803afb0957f8a486fa939080b01914874` |
| `agent-office-living-office-prototype.mp4` | 4409265 | `97e5c79c819054b072b2565807c64f553b06141b102c3eb0b14b12c0bef56de2` |
| `agent-office-living-office-prototype.gif` | 943667 | `460c0e1de606b5a9ccd543e701a59113eeb43ca1b1f93ad4e76c8e0d9f8bc957` |
| `full-office.png` | 269305 | `e29a4104b6ae7b51039b4ff33e3bf0dd7444a84af6eac26bb18d52a48eb80d4b` |
| `team-activity.png` | 222009 | `99db36f80db3b8871282b7ae4c9ab7c031a0ce271db97caa1a75ee6a2cd1b391` |
| `lounge.png` | 243103 | `c66d0c8b4dd7e0f29ed935c23f563095f7fbb231e5e590217dadfd0cd8b5d5d6` |
| `channy.png` | 215189 | `9dd02189cd29976c16edf3c2410181d244440397055064c766ff3b10e7fda8eb` |
| `mobile.png` | 121455 | `28043eb369c679eabbe551bd5da0efba1e5b51e9da342be52289b9f57ff8ed41` |

The WebM is re-captured by each independent reproduction run and therefore its
bytes are run-specific; the table records the current post-review file. MP4,
GIF, and PNG hashes are stable from the final Worker package.

## Evidence summary

- exact 13 current living baselines inspected;
- exact 26 historical baselines unchanged;
- units `88/514` PASS;
- prototype browser train `20/20` PASS;
- verifier PASS;
- accessibility and performance budgets PASS;
- Agent Office clean and upstream-equal;
- runtime stopped with no listener;
- no authority, security, auth, transport, DB, remote, or production change.

## Founder decision options

### Option A - APPROVE_PATCHED_VISUAL_DIRECTION

Accept the visual direction represented by candidate `ac8ba75`. This approves
the prototype direction only. Full authenticated integration remains a
separate explicit mission/gate.

### Option B - REQUEST_ANOTHER_BOUNDED_VISUAL_PATCH

Return exact visual/product changes. The same Worker and same Reviewer loop may
continue only within the new explicit patch scope. Full integration remains
blocked.

### Option C - REJECT_CURRENT_VISUAL_DIRECTION

Preserve the reviewed technical foundation and stop this visual direction.
No integration or replacement direction starts automatically.

## Required Leo/GPT response

```text
LEO_GPT_VISUAL_DIRECTION_DECISION
MISSION_ID: AGENT_OFFICE_M1_2_SPATIAL_ANIMATED_ADVISOR_TEAM_OFFICE
CANDIDATE_COMMIT: ac8ba75d3a128385beaeeac58ae5bf54c03d23f2
DECISION: APPROVE_PATCHED_VISUAL_DIRECTION | REQUEST_ANOTHER_BOUNDED_VISUAL_PATCH | REJECT_CURRENT_VISUAL_DIRECTION
FULL_INTEGRATION_AUTHORIZATION: NOT_GRANTED unless separately and explicitly stated
DO_NOT_START_ANOTHER_MISSION_AUTOMATICALLY: true
RETURN_TO: Advisor
```

