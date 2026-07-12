# Advisor Living Pixel-Office Visual Patch Validation

Status: `PASS_READY_FOR_FABLE5_NARROW_DELTA_REVIEW`

Date: `2026-07-12`

## Candidate identity

- Mission: `AGENT_OFFICE_M1_2_SPATIAL_ANIMATED_ADVISOR_TEAM_OFFICE`
- WorkUnit: `AO12-PWU-11-P1`
- Review base: `c535877b61ad8a1e3d74dca5c6fec0ada4cac3f8`
- Initial visual patch: `364f40722c6db5c515261b69fc8ebb538c5c33f6`
- Binding actor-fact correction: `ac8ba75d3a128385beaeeac58ae5bf54c03d23f2`
- Final review candidate: `ac8ba75d3a128385beaeeac58ae5bf54c03d23f2`
- Branch: `shadow/agent-office-m1-2-spatial-office`
- Upstream: exact equality at `0/0`
- Worktree: clean

The artifact-99 Worker pointer identifies `364f407` because it was published
before the binding Advisor fact-source clarification. It is valid historical
Worker evidence but is superseded for final candidate identity. The final
candidate is the two-commit range `c535877..ac8ba75`, and the Reviewer must
judge the actual final tree rather than the stale pointer metadata.

## Direct Advisor validation

Advisor directly inspected the two commits, complete path delta, final actor
fact source, focused tests, browser baselines, ignored media, Git state, and
running-listener state.

Verified results:

- required base is an ancestor of the final candidate;
- final candidate and upstream are equal;
- Agent Office worktree has zero entries;
- exact 13 living-prototype PNG baselines differ from `c535877`;
- exact 26 historical reconciled baselines are byte-identical to `c535877`;
- focused Vitest suite passes `6 files / 27 tests`;
- evidence verifier v3 passes on the committed tree;
- artifact root has exact 8 files, mode `0700`, and remains ignored;
- ports `4173` and `4317` have zero listeners;
- WebM and MP4 are `27.36s`; GIF is `7.00s`;
- direct inspection covered final full-office, active-team, Channy, mobile,
  WebM start, document-handoff, and Channy/lounging frames.

Final media hashes:

| Artifact | Bytes | SHA-256 |
|---|---:|---|
| `agent-office-living-office-prototype.webm` | 2943261 | `0584185f6cc4fa6a36891440810331995e46eb643bab0f79f1f2a8c6dd56e4e4` |
| `agent-office-living-office-prototype.mp4` | 4409265 | `97e5c79c819054b072b2565807c64f553b06141b102c3eb0b14b12c0bef56de2` |
| `agent-office-living-office-prototype.gif` | 943667 | `460c0e1de606b5a9ccd543e701a59113eeb43ca1b1f93ad4e76c8e0d9f8bc957` |
| `full-office.png` | 269305 | `e29a4104b6ae7b51039b4ff33e3bf0dd7444a84af6eac26bb18d52a48eb80d4b` |
| `team-activity.png` | 222009 | `99db36f80db3b8871282b7ae4c9ab7c031a0ce271db97caa1a75ee6a2cd1b391` |
| `lounge.png` | 243103 | `c66d0c8b4dd7e0f29ed935c23f563095f7fbb231e5e590217dadfd0cd8b5d5d6` |
| `channy.png` | 215189 | `9dd02189cd29976c16edf3c2410181d244440397055064c766ff3b10e7fda8eb` |
| `mobile.png` | 121455 | `28043eb369c679eabbe551bd5da0efba1e5b51e9da342be52289b9f57ff8ed41` |

## Actor fact-source correction

The final fixture uses exact verified registry session names:

- `foundation-advisor`
- `foundation-control`
- `foundation`
- `cosmile`
- `siasiu`
- `agent-office`
- `reviewer-fable5`
- `VibeNews-advisor`
- `VibeNews`
- `VibeNews-designer`

Only two model values have mission evidence and are rendered as known:

- Agent Office Worker: `Codex 5.6 SOL`
- independent Reviewer: `Fable5`

Every other model is `UNKNOWN`. Operational mission, WorkUnit, state, and
freshness values in the prototype are explicitly marked synthetic fixture
facts. Null, absent, blank, and unverified values normalize to literal
`UNKNOWN`; tests prohibit renderer inference from adjacent fields.

## Visual and accessibility observations

The final images show a modern ivory/light-oak office, project colors as
accents, visible camera-tracked actor labels, and a larger Bedlington-specific
Channy silhouette. Labels use text, role glyph, and state ring. They do not
overlap each other in the full-office browser gate. Mobile preserves the same
identity meaning. The detail drawer and semantic mirror expose the ten required
fields through keyboard-accessible DOM surfaces.

The independent Reviewer must still judge whether label density, Channy motion
and appearance, modern palette, accessibility, and product intent satisfy the
Founder patch. Advisor does not grant visual acceptance.

## Preserved boundaries

- synthetic prototype route only;
- no authenticated/full integration;
- no production entry change;
- no authority, auth, delivery, transport, DB, or network change;
- no external asset, purchase, provider, or protected style;
- no actor cloning or inferred evidence;
- M1 and static fallback retained;
- full integration remains `DEFERRED_WITH_GATE`.

## Verdict

`PASS_READY_FOR_FABLE5_NARROW_DELTA_REVIEW`

This Advisor validation is not independent review and not Founder acceptance.

