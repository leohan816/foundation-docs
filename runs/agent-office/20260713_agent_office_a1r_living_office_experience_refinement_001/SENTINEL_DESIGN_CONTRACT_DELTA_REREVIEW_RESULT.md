# Sentinel Design-Contract Delta Re-Review — Agent Office A-1R Living Office

Review pass: `DESIGN_REVIEW__A1R_FOUNDER_UX_CONTRACT_DELTA_REREVIEW`

Canonical pass class: `DESIGN_REVIEW`

Verdict: `NEEDS_PATCH`

Actor: Independent `Sentinel-ReReview`

Session: same existing independent `foundation-reviewer-sol` role session

Model / effort: actual `gpt-5.6-sol`, `xhigh`

Return to: Advisor

This is the bounded, finding-specific, read-only delta re-review of
`A1R-SDR-01..06` and direct patch regressions. It is not a second full review,
an implementation patch, aesthetic/Founder approval, risk acceptance, Worker
dispatch, delivery activation, Batch B authorization, merge/deploy
authorization, or final mission approval.

## 1. Runtime, independence, snapshot, and provenance

The same independent Reviewer context was verified directly:

- Codex process `711307` remains
  `codex -m gpt-5.6-sol -c model_reasoning_effort=xhigh ...`;
- its working directory remains `/home/leo/Project/foundation-reviewer`;
- no role change, temporary session, agent, sub-agent, delegated context, or
  secondary Reviewer was used;
- the exact 07B handoff, `/fable-sentinel`, canonical V2, contract,
  provenance, classification, and delta-review rules were read directly;
- no runtime unit, E2E, build, or server suite was run.

Exact reviewed target:

- repository: `/home/leo/Project/agent-office-a1r-001`;
- branch: `a1r/living-office-experience-refinement-001`;
- re-review base: `b966c6a98752558ad0db66fa2b79e42d9e9dcd24`;
- finding patch: `8522f3c3df1f39bed976eb7189ea3e43edbf2dbd`;
- candidate: `1ab8ad200338d90d230d8d4f3373fa9b73d549c9`;
- ancestry is exact and linear: `b966c6a -> 8522f3c -> 1ab8ad2`;
- local HEAD, configured upstream, remote-tracking ref, and direct
  `git ls-remote` all resolved to the exact candidate;
- target worktree was clean before and after review;
- complete finding delta: exactly 12 `docs/**` paths, including four SVG/PNG
  pairs, and no runtime/source/test/config/package/dependency path;
- exact metadata correction: three Markdown paths, four textual corrections,
  zero SVG/PNG change;
- `git diff --check` passed for both `b966c6a..1ab8ad2` and
  `8522f3c..1ab8ad2`.

All conclusions are fixed to candidate `1ab8ad2`. Advisor/Control reports were
treated as claims until the committed Markdown, SVG source, original-size PNGs,
actual target source, exact diffs, and static geometry supported them. No Agent
Office file or Git state was patched.

## 2. Product-first original-size evidence inspection

Before reading Advisor or Control conclusions, all four changed candidate PNGs
were opened at original size:

| Artifact | Exact PNG size | SHA-256 | Direct conclusion |
|---|---:|---|---|
| `a1r-full-office-desktop.png` | 2880x1800 | `f8278e0a6f8aba471947741b329130543144d64f4060be8db07c19fe7c126438` | `FND`/`VBN` appears inside the default labels, Mission Boards fail closed, and the previously cited desktop role/state collisions are not visible. |
| `a1r-full-office-mobile.png` | 780x2400 | `c7eedf09826b5a5f7fb4a2c624ae0b59ac9f22b025dcff23fba12af1251ee96f` | Eight actor rows retain Team identity; the actor sheet and disabled Advisor-conversation sheet are visibly presented as alternative states with explicit no-stack arbitration. |
| `a1r-advisor-team-pod.png` | 2080x1520 | `4885012576b43a2e7801b7cb7a9b8609ad8e735ed53aa85cedd4239d89d68eb8` | The corrected Pod separation remains intact; all six Foundation actor labels carry `FND` and remain visually readable. |
| `a1r-information-interaction-states.png` | 2400x1840 | `d8b0258bf6e8e3cf56bdc250d20bfd34481dc9bd455c3403033290f6eafabf74` | The former UNKNOWN-badge/drawer collision is gone and the critical overlays are present, but the changed top information flow visibly introduces required-text/card-boundary conflicts detailed below. |

The hashes and dimensions agree with the Control patch report, and the four
PNG blobs are byte-identical between `8522f3c` and `1ab8ad2`. The post-patch
metadata correction therefore did not silently alter visual evidence.

## 3. Finding-by-finding closure

| Finding | Judgment | Direct evidence and rationale |
|---|---|---|
| `A1R-SDR-01` | **CLOSED** | `AGENT_OFFICE_A1R_DEFERRED_CAPABILITY_REGISTER.md:25-45` now limits DCR-03 to **live runtime-state-conditioned** animation and adds DCR-02.1. The table names each registered role class, accepted fixture/evidence input, allowed role-specific motion/pose, common start/stop conditions, unknown/absent/conflicting neutral behavior, reduced/static equivalents, no pre-verdict celebration, and explicit Batch B separation. An implementer no longer has to choose between contradictory DCR-02/DCR-03 instructions. |
| `A1R-SDR-02` | **CLOSED** | The affected mockups use source-valid `claude-opus-4-8`, `ULTRACODE`, `CLAUDE_OPUS_4_8`, and `AI_READY`, matching `src/application/organization/evidence.ts:273-279`. Mission/WorkUnit/progress/KST render fail closed against `production-render-input.ts:199-213`; `BA-WU-03`, fabricated `3/9`, old timestamp examples, bare `opus-4-8`, `high`, and `AI_WORKING` are absent from the affected evidence. D-2 explicitly retains blocker/Leo, and every illustrative disclosure surface is marked `설계 예시 · 실제 운영 아님`. The remaining failure is visual layout of those correct tokens and is classified under SDR-03, not truth drift. |
| `A1R-SDR-03` | **OPEN — REGRESSION** | The original UNKNOWN overlay/drawer intersection and cited desktop role/state collisions are closed. However, the same changed information-state SVG/PNG now contains three directly reproduced conflicts: the compact-label explanatory sentence is occluded by the hover-card `WorkUnit` row; the quick-card exact model/effort value exits its card and crosses the `click` marker; and the pinned-card exact model/effort value exits its card. This contradicts L-3 and Control's no-collision claim. See section 4. |
| `A1R-SDR-04` | **CLOSED** | Original-size desktop/mobile/Pod evidence and SVG source show short Team text inside every actual default actor label/row: desktop Foundation x6 and VibeNews x2, mobile Foundation x6 and VibeNews x2, and Pod Foundation x6. Color is not the only Team signal. The directly affected label role/Team/state rows show no text-to-text collision in the static probe or original-size PNGs. |
| `A1R-SDR-05` | **CLOSED** | `AGENT_OFFICE_A1R_FOUNDER_UX_CONTRACT.md:79-89` defines the `DELIVERY_DISABLED`, input-locked mobile Advisor sheet, selector/identity, truthful unread/notification state, exact open triggers, actor/Advisor mutual exclusion and replacement, back/outside/Escape close, focus restoration, and actor-only drawer transition. Mobile SVG lines 74-89 render that state. The final metadata correction accurately labels the 390x1200 / 780x2400 artifact as one Office frame plus two alternative states; it does not imply runtime stacking. |
| `A1R-SDR-06` | **CLOSED** | UX contract lines 51-63 now define a read-only overlay sourced only from accepted active/unresolved `BlockerOpened` section 7.2 and `AlertRaised` section 7.3 records. The enumerated blocker/alert kinds and exact Korean labels match `src/domain/blockers/index.ts:11-28`, `src/domain/alerts/index.ts:7-17`, and `src/ui/i18n/ko.ts:57-74,97-107`. It defines deterministic precedence, unresolved-only rendering, malformed/stale/conflicting fail-closed behavior, icon+text tokens, semantic announcements, and a mockup example without adding `PixelOperationalState`, command, approval, routing, recovery, or resolution authority. |

Closure total: five `CLOSED`; one `OPEN — REGRESSION`.

## 4. Blocking direct regression — information-layer content escapes its surfaces

Classification: `VISUAL_CONTRACT_AND_ACCESSIBILITY` / MEDIUM /
finding-delta blocker.

The changed `a1r-information-interaction-states.svg` replaced short illustrative
values with the correct exact token and consolidated the compact-label
explanation. Those changes were necessary for SDR-02/04, but their final layout
does not contain the resulting text:

1. At SVG lines 23-27, the compact-label explanation is one long line. Its
   measured box is `x=28..297.17`, `y=151..162`; the later-painted quick-card
   `WorkUnit` label at lines 33-42 is `x=282..329.97`, `y=150..162`. The
   intersection is **15.17 x 11 design pixels**, and the quick-card fill visibly
   occludes the sentence tail in the committed PNG.
2. The quick-card `claude-opus-4-8 · ULTRACODE` value at line 37 measures
   `x=390..565.84`, while its card ends at `x=526`: **39.84 design pixels off
   card**. It intersects the `click` label by **21.73 x 4** and visibly runs
   into the transition marker in the committed PNG.
3. The pinned-card same exact value at line 56 measures `x=740..915.84`, while
   its card ends at `x=886`: **29.84 design pixels off card**. The committed
   PNG visibly places `ULTRACODE` beyond the blue card border.

These are not a newly invented review axis. They are direct regressions in the
exact changed asset used to close SDR-02/03/04 and violate the same existing
L-3 zero-overlap/zero-off-label contract
(`AGENT_OFFICE_A1R_FOUNDER_UX_CONTRACT.md:20-24`). The former named collision
was removed, but SDR-03 cannot be `CLOSED` by exchanging it for new visible
collisions.

Required narrow correction: reflow the compact-label explanation and the two
exact model/effort rows within their own surfaces, move the transition labels if
needed, re-export only the affected information-state PNG, and reproduce the
original-size plus static-geometry check. The exact tokens, blocker/Leo content,
watermarks, overlay contract, and canvas hierarchy must remain unchanged.

## 5. Direct regression and preserved-boundary audit

| Required preserved boundary | Status | Evidence |
|---|---|---|
| `A1R-ADV-01` batch mapping | `PRESERVED` | A-1R DCR-01/02 and deferred B/C/D/E/E-2 rows remain explicit; no deferred capability was activated. SDR-01's underlying contradiction is closed. |
| `A1R-ADV-02` Pod/mobile correction | `PRESERVED` | Original-size inspection retains the corrected Pod columns and mobile rows; no named role/state collision reappears. |
| Eight actors / Team membership | `PRESERVED` | Mockups retain Foundation x6 and VibeNews x2, matching `registry.ts:108-197` and `office-layout-config.ts:54-80`; Agent Office remains in Foundation and no Agent Office Pod appears. |
| Exact/fail-closed tokens | `PRESERVED_WITH_VISUAL_REGRESSION` | Values are semantically exact and fail closed, but two exact-token rows are not contained visually; this is the sole blocker above. |
| No fabricated progress/WorkUnit/KST | `PRESERVED` | No accepted A-1R WorkUnit is invented; progress is `0/0 (미확정)` or `—`; KST is `—` pending verified UTC. The metadata correction removes `BA-WU-03` from the design prose. |
| Mobile sheet mutual exclusion | `PRESERVED` | Contract, SVG, spec, and corrected traceability all state at most one actor/Advisor sheet and runtime never shows both. |
| Runtime/authority/routing/recovery/delivery | `PRESERVED` | Complete delta contains only 12 `docs/**` files; delivery remains disabled/input-locked; no runtime enum, source, test, config, dependency, command, authority, recovery, or routing surface changed. |

The exact `8522f3c..1ab8ad2` metadata correction is accurate on all four points:
`BlockerOpened` section 7.2 / `AlertRaised` section 7.3, mobile dimensions,
removal of `BA-WU-03`, and the static state-comparison clarification. It causes
no visual regression because all visual blobs are identical across that range.

Control/Advisor claim accuracy:

- accurate: target commit, ancestry, branch/push state, 12-path docs-only scope,
  four PNG dimensions/hashes, exact metadata correction, semantic closure of
  SDR-01/02/04/05/06, and preserved authority/deferred boundaries;
- inaccurate: Control's claim that the re-laid information sheet has no
  collision and the derived Advisor statement that all six findings are ready
  to close. Original-size PNG evidence and static SVG geometry contradict it.

## 6. Checks and excluded scope

Independent checks performed:

- opened the four required candidate PNGs at original size before reading the
  patch/acceptance conclusions;
- read the complete `b966c6a..1ab8ad2` changed Markdown/SVG sources and the
  exact `8522f3c..1ab8ad2` metadata delta;
- compared actual registry, layout, evidence, production-render input, alert,
  blocker, event-contract, i18n, and pixel-state source at candidate commit;
- verified branch, ancestry, clean target worktree, local/upstream/direct-origin
  equality, exact changed paths, image dimensions/hashes, and both
  `git diff --check` ranges;
- ran a read-only Chromium file-SVG geometry probe and confirmed its blocking
  findings in the committed original-size PNG; no product server was started
  and no dependency was installed.

Excluded by the exact handoff:

- runtime unit/E2E/build/server suites;
- implementation, code patching, clickable prototype, delivery activation,
  Batch B-E, auth expansion, DB/schema/migration, production/live, protected
  branch, merge/deploy, and next mission;
- a second full design review or reopening unchanged, unreported historical
  geometry outside the named findings/direct regressions;
- final visual taste/aesthetic approval, which remains Leo/GPT-only.

## 7. Verdict and routing

`NEEDS_PATCH` is required because `A1R-SDR-03` remains open through a directly
reproduced regression in the changed information-state artifact. The defect is
narrow and static-asset patchable; it does not require product redesign, a new
authority decision, runtime work, or a second full review.

Return through Advisor for a same-Control correction limited to the affected
information-state SVG/PNG (and only directly necessary metadata if dimensions
change), followed by this same Sentinel session's focused visual-regression
re-check. Do not dispatch a Worker. No risk is accepted and no Founder/aesthetic
approval is granted.

Result file:
`/home/leo/Project/foundation-docs/runs/agent-office/20260713_agent_office_a1r_living_office_experience_refinement_001/SENTINEL_DESIGN_CONTRACT_DELTA_REREVIEW_RESULT.md`

Pointer file:
`/home/leo/Project/foundation-docs/advisor/jobs/20260713_agent_office_a1r_living_office_experience_refinement_001/17_SENTINEL_DESIGN_DELTA_REREVIEW_RESULT_POINTER.md`

`RETURN_TO: Advisor`

`PROPOSED_NEXT_ACTOR: Advisor`

`STOP`
