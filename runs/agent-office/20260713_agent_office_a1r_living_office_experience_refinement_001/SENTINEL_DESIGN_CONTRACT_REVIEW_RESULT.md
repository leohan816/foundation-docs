# Sentinel Design-Contract Review — Agent Office A-1R Living Office

Review pass: `DESIGN_REVIEW__A1R_FOUNDER_UX_CONTRACT`

Canonical pass class: `DESIGN_REVIEW`

Verdict: `NEEDS_PATCH`

Actor: Independent `Sentinel`

Session: same existing independent `foundation-reviewer-sol` role session

Model / effort: actual `gpt-5.6-sol`, `xhigh`

Return to: Advisor

This is a product-first, bounded, read-only static design-contract review. It is
not an implementation patch, aesthetic/Founder approval, risk acceptance,
Worker dispatch, Batch B authorization, merge/deploy authorization, or final
mission approval.

## 1. Runtime, independence, target, and provenance

The actual Reviewer runtime was verified directly:

- current Codex process `711307`, started 2026-07-12, remains
  `codex -m gpt-5.6-sol -c model_reasoning_effort=xhigh ...`;
- its working directory remains `/home/leo/Project/foundation-reviewer`, in the
  existing independent `foundation-reviewer-sol` context;
- no role change, temporary session, agent, sub-agent, delegated context, or
  secondary Reviewer was used;
- the exact 07 handoff, 03 review brief, Founder mission, Advisor records 04/05,
  `/fable-sentinel`, canonical V2, contract, provenance, classification, and
  delta-review rules were read directly.

Exact reviewed target:

- repository: `/home/leo/Project/agent-office-a1r-001`;
- branch: `a1r/living-office-experience-refinement-001`;
- Founder product base: `58a484b088b4e57e7b3ee6e582f54c7f3ce6dc85`;
- initial Control design: `d33dfc97a04077ded1a19c26d9806cb745166d73`;
- candidate: `b966c6a98752558ad0db66fa2b79e42d9e9dcd24`;
- ancestry is exact and linear: base → initial Control design → narrow candidate;
- local HEAD, configured upstream, remote-tracking ref, and direct
  `git ls-remote` all resolved to the exact candidate;
- target worktree was clean before and after review;
- complete candidate delta: exactly 15 `docs/**` paths, 990 insertions, zero
  runtime/source/test/config/package/dependency paths;
- narrow correction: exactly eight `docs/**` paths, including only the Advisor
  Team Pod and mobile SVG/PNG pairs as visual changes;
- `git diff --check` passed for both `58a484b..b966c6a` and
  `d33dfc9..b966c6a`.

All conclusions below are fixed to candidate commit `b966c6a`. Advisor and
Control claims were treated as claims until the committed documents, SVG source,
full-size PNG evidence, actual base source, and static geometry supported them.
No Agent Office file or Git state was patched.

## 2. Product-first visual inspection and narrow-correction status

The actual failed Founder capture
`/home/leo/uploads/clip-20260713-223828.png` was inspected directly at original
1512×619 size. It confirms the starting product defect: large seven-fact debug
cards obscure actors/furniture, actors cluster, connector lines cross the world,
text is truncated, a card escapes the Office, and the lower floor is mostly
empty.

Before relying on Control/Advisor conclusions, the complete candidate's five
PNG review artifacts were opened at original size:

| Artifact | Exact PNG size | SHA-256 | Direct conclusion |
|---|---:|---|---|
| `a1r-full-office-desktop.png` | 2880×1800 | `6a86d9b3fe89c198c044f868d9ce150ed977ddec94a1925c31672fa3aee8bf38` | Product hierarchy is materially better: separated Foundation/VibeNews Pods, smaller labels, no default relationship lines, Mission Boards, collapsed semantic-list control, disabled Advisor dock, and Channy. Several compact labels still collide/overflow and omit their own Team text. |
| `a1r-full-office-mobile.png` | 780×1688 | `d4657d7161f6c4b83fa9f0cc4f9aaa85104a12030d8c558b4566a625b223654f` | The named mobile row collisions are corrected. It contains the actor compact bottom sheet, but no mobile Advisor-conversation sheet. |
| `a1r-advisor-team-pod.png` | 2080×1520 | `fc7ec86a0017e070ffc84b04685ea3c257784d84f4360646b3705e0847c9983b` | The named Pod collision is corrected through clear role columns and separated actor/desk/label zones. |
| `a1r-information-interaction-states.png` | 2400×1760 | `1a22afca8add80a063a9203c939c5dc4a47445627e0e9eabe35cf770fa20ff48` | Progressive layers are visible, but the UNKNOWN badge physically covers the full drawer and the shown facts drift from the truth/exact-token contract. |
| `a1r-channy-character-poses.png` | 1920×1240 | `8eac4ba6bd22992bec44606f58db376ceba5375e6d39aa7f6949cca97ec5524a` | Bedlington traits, scale, all required ambient poses, reduced-motion stop, peripheral placement, and non-operational authority boundary are explicit. |

Named Advisor correction status:

| Advisor finding | Status | Conclusion |
|---|---|---|
| `A1R-ADV-01` deferred-batch mapping/basic animation | `PARTIAL__BLOCKING` | Batch C/D/E/E-2 placement is corrected, and DCR-02 is moved into A-1R. The actual basic role-animation design remains internally contradictory and underspecified (A1R-SDR-01). |
| `A1R-ADV-02` Pod/mobile collisions | `CLOSED` | Direct original-size inspection and SVG geometry show zero role/state overlap or label overflow in the corrected mobile rows and corrected Pod labels. The patch preserved actors, membership, role anchors, Mission Boards, Korean labels, and Channy. Separate conflicts remain in unaffected complete-candidate assets (A1R-SDR-03). |

## 3. Blocking findings

### A1R-SDR-01 — A-1R basic role animation is contradictory and not implementable

Classification: `CONTRACT_AND_IMPLEMENTABILITY` / HIGH / design blocker.

Candidate DCR-02 says A-1R basic role animation is driven **only by accepted
fixture/evidence state** and must have neutral/reduced/static equivalents
(`AGENT_OFFICE_A1R_DEFERRED_CAPABILITY_REGISTER.md:25-32`). The immediately
following DCR-03 nevertheless says **“Forbidden now: any state-conditioned
animation”** (`:34-37`). That unqualified prohibition also forbids DCR-02's
fixture/evidence-conditioned animation. The architecture repeats only the generic
rule that poses express accepted role/state evidence (`...PRODUCT_EXPERIENCE_DESIGN.md:55-60`).

No candidate document or actor mockup supplies a closed role-animation map:

- exact registered role / accepted input fact;
- allowed motion/pose and its start/stop condition;
- unknown/absent/conflicting input behavior;
- reduced-motion and static/semantic equivalent;
- explicit separation from Batch B live runtime-state animation.

Only Channy receives a pose sheet; Advisor, Control, Worker, and Reviewer do not.
A Worker must therefore either invent product behavior or obey DCR-03 and omit
the A-1R capability. The narrow patch restores the batch label but does not
complete the design required by A1R-ADV-01.

Required narrow correction: define the exact per-role A-1R basic-animation table
and change DCR-03's prohibition to **live runtime-state-conditioned** animation
only. Preserve unknown-neutral, no pre-verdict celebration, reduced/static
equivalence, and Batch B separation.

### A1R-SDR-02 — Mockup facts and disclosure content violate the truth/exact-token contract

Classification: `TRUTH_AND_STATIC_EVIDENCE` / HIGH / design blocker.

The design requires Mission Board facts without fabrication and exact technical
IDs/model names (`...PRODUCT_EXPERIENCE_DESIGN.md:76,80`); the mockup spec says
all actor content is registry-derived and limits its illustrative exemption to
**state values** (`AGENT_OFFICE_A1R_STATIC_MOCKUP_SPEC.md:8`). Actual candidate
source fixes Agent Office Worker model/effort as
`claude-opus-4-8` / `ULTRACODE`
(`src/application/organization/evidence.ts:273-279`) and the current production
pod projection deliberately exposes no committed progress catalog:
`completedWorkUnits=0`, `totalWorkUnits=0`, `completedGates=0`,
`totalGates=0` (`production-render-input.ts:199-213`).

The static evidence instead presents these values as facts:

- `opus-4-8` and `high` in quick/pinned/mobile layers
  (`a1r-information-interaction-states.svg:38-43,54-60,93-99`);
- `high` in the supposedly complete preserved drawer (`:67-85`);
- `opus-4-8`, `high`, `3/9`, and `BA-WU-03` in the full mobile sheet
  (`a1r-full-office-mobile.svg:62-72`);
- `3/9 WU` and a current-looking KST verification stamp on Mission Boards even
  though A-1R WorkUnits are not defined until after mockup approval
  (`a1r-full-office-desktop.svg:81-90`, mobile `:33-36`, Pod `:41-50`).

The pinned card also omits the D-1 blocker/Leo fact even though D-2 requires
**hover facts plus** runtime/progress/next/reports-to
(`AGENT_OFFICE_A1R_FOUNDER_UX_CONTRACT.md:28-30` versus info SVG `:49-65`).

Failure scenario: the implementation hard-codes illustrative progress, shortens
an exact model token, presents `high` instead of accepted `ULTRACODE`, or drops a
required blocker/Leo fact. That reproduces the same “UI as evidence theater” the
mission is intended to remove.

Required narrow correction: use source-valid exact tokens and fail-closed
progress/WorkUnit values, or unmistakably watermark every non-current value as a
non-authoritative design example. Restore blocker/Leo to the pinned-card content
contract and every affected mockup. A KST “verified” label must correspond to an
identified accepted timestamp source.

### A1R-SDR-03 — Complete-candidate static assets still contain measurable collisions

Classification: `VISUAL_CONTRACT_AND_ACCESSIBILITY` / MEDIUM / design blocker.

In the information-state SVG, the UNKNOWN badge occupies page coordinates
`x=848..998`, `y=376..406`; the full drawer occupies `x=922..1172`,
`y=96..536`. The committed geometry therefore overlaps by **76×30 design
pixels**, covering the drawer's `effort`/`aiRuntimeState` area. This is visible in
the original-size PNG and follows directly from
`a1r-information-interaction-states.svg:67-86,102-116`.

The unaffected full-desktop asset also keeps several role/state strings in the
same 150px labels (`a1r-full-office-desktop.svg:92-130,148-159`). A read-only
Chromium SVG geometry probe measured:

- role/state overlap: Agent Office Worker 2.89px, Independent Reviewer 0.48px,
  VibeNews Worker 2.89px;
- state overflow beyond its label: Foundation Control 9.11px, SIASIU Worker
  2.03px, VibeNews Advisor 1.11px, VibeNews Worker 3.34px.

This contradicts L-3 zero overlap/truncation/off-label risk and the static spec's
claim that the artifacts are legible unscaled. A1R-ADV-02 is closed for its two
named assets, but the complete design-review criterion is not.

Required narrow correction: re-layout the information legend/drawer and the
affected desktop labels, re-export only affected PNGs, then re-open them at
original size and run the same geometry checks.

### A1R-SDR-04 — Default product mockups omit the label's required textual Team identity

Classification: `CONTRACT_AND_STATIC_EVIDENCE` / MEDIUM / design blocker.

S-6/L-1 require **short Team text on each always-visible label**, not merely a
nearby Pod accent (`AGENT_OFFICE_A1R_FOUNDER_UX_CONTRACT.md:18,22`; architecture
`:49,66`). The isolated info-sheet example correctly renders
`Worker · FND 파운데이션` (`a1r-information-interaction-states.svg:19-28`).

The actual product mockups do not:

- all desktop label bodies show role/desk plus state but no `FND`/`VBN`
  (`a1r-full-office-desktop.svg:92-130,148-159`);
- all mobile actor rows omit per-label Team text (`a1r-full-office-mobile.svg:37-56`);
- all detailed Pod labels omit it (`a1r-advisor-team-pod.svg:52-100`).

Pod headers do carry `FND`/`VBN`, but that does not satisfy the explicit label
contract when a label/card is focused, repositioned, semantically announced, or
shown independently. It also makes the isolated component example disagree with
the full product evidence.

Required narrow correction: place the exact short Team text inside every default
label/row, retain non-color meaning, and re-layout/re-export without reintroducing
the collisions above.

### A1R-SDR-05 — Mobile Advisor conversation sheet and its interaction arbitration are absent

Classification: `INTERACTION_AND_ACCESSIBILITY` / MEDIUM / design blocker.

K-3 requires Advisor conversation in a desktop panel **and mobile sheet**
(`AGENT_OFFICE_A1R_FOUNDER_UX_CONTRACT.md:61-67`; architecture `:78`). The
traceability table points Founder deliverable 10 only to the desktop right dock
(`...PRODUCT_EXPERIENCE_DESIGN.md:107`). The mobile mockup and mockup spec show
only the actor compact bottom sheet (`a1r-full-office-mobile.svg:62-73`;
`AGENT_OFFICE_A1R_STATIC_MOCKUP_SPEC.md:17`), while the spec's Advisor-shell note
describes only desktop (`:30`).

No document decides how the Advisor conversation sheet and actor bottom sheet
share mobile space: open trigger, replacement versus stacking, selected-Advisor
identity, unread/completion/decision notification state, input-locked state,
Escape/back/outside close, focus restoration, or transition to the actor drawer.
A Worker would have to make product and accessibility decisions.

Required narrow correction: add the truthful `DELIVERY_DISABLED` mobile Advisor
conversation sheet evidence and define its mutual exclusion/replacement,
keyboard/focus, close, unread, notification, and drawer interaction with the
actor sheet. No delivery activation is permitted.

### A1R-SDR-06 — Two mandatory critical states have no source vocabulary or render contract

Classification: `TRUTH_AUTHORITY_AND_IMPLEMENTABILITY` / HIGH / design blocker.

C-1 defines exact Korean labels and source vocabulary for eight states
(`AGENT_OFFICE_A1R_FOUNDER_UX_CONTRACT.md:33-47`). C-2 then adds
authority/security hold and decision-critical conflict as directly visible, but
gives neither source field/precedence nor exact label/icon/token (`:48-49`). The
information mockup renders only the eight C-1 badges and relegates the two C-2
requirements to prose (`a1r-information-interaction-states.svg:102-116`).

Actual accepted production `PixelOperationalState` contains neither a HOLD nor a
CONFLICT value (`src/ui/pixel/contracts.ts:27-41`), and the candidate does not
identify another accepted production-frame field that mints these two signals.
Existing unrelated spatial/conflict concepts cannot be silently joined into the
new product path without an explicit source/authority contract.

Failure scenario: a Worker derives authority/security meaning from diagnostics,
imports an old projection path, invents a new enum, or silently never renders the
Founder-required state. Each option either fabricates authority or leaves the
requirement unimplemented.

Required narrow correction: define the exact authoritative source, precedence,
fail-closed behavior, Korean label/icon/non-color token, semantic announcement,
and mockup example for both states. If no approved source exists without runtime
authority expansion, return that source decision through Advisor to Leo/GPT;
the Worker must not decide it.

## 4. Explicit criterion coverage

| Review criterion | Status | Direct conclusion |
|---|---|---|
| Product-first hierarchy / prior debug-dashboard regression | `PASS` | Candidate materially shifts the default from technical cards to separated office space, behavior, and layered information; Technical Dashboard is secondary. |
| Registry-derived Team/actor truth | `PASS` | Two Teams/eight actors match candidate source; Agent Office remains a Foundation member and no Agent Office Pod is invented. |
| Spatial hierarchy and role anchors | `PARTIAL` | Named Pod/mobile correction closes, but complete-candidate desktop labels and information drawer still collide. |
| Layered disclosure | `PARTIAL` | All layers exist, exactly-one replacement/close prose is present, and the 17-field drawer list is complete; shown facts, pinned content, and drawer visibility are not contract-clean. |
| Korean-first and exact technical tokens | `PARTIAL` | Natural UI is predominantly Korean, but model/effort examples are shortened or wrong. |
| Mission Boards / fail-closed truth | `NOT_CLOSED` | Required fields are designed, but current-looking `3/9`/WU/KST evidence is not tied to an accepted catalog/source. |
| Advisor selection/conversation | `PARTIAL` | Desktop `DELIVERY_DISABLED` dock is clear and input-locked; mobile sheet/state arbitration is missing. |
| Critical states | `PARTIAL` | Eight common states have exact non-color patterns; authority/security hold and decision-critical conflict do not. |
| Channy | `PASS` | Recognizable Bedlington specification, scale, poses, peripheral placement, reduced-motion stop, and zero operational authority are explicit. |
| Semantic/high-text/reduced/static accessibility | `PARTIAL` | Mode contract is explicit, but mobile sheet focus arbitration and visual overlaps remain unresolved. |
| Deferred capability mapping | `PARTIAL` | B/C/D/E/E-2 mapping is restored; A-1R DCR-02 is contradictory and lacks an implementable role map. |
| Authority/security boundary | `PASS_EXCEPT_STATE_SOURCE_GAP` | `DELIVERY_DISABLED`, input lock, no browser-direct Worker/Reviewer, no recovery/auto-continue, and no Batch B-E activation remain explicit; A1R-SDR-06 must close before implementation. |
| Static evidence completeness/provenance | `PARTIAL` | Five SVG/PNG pairs exist at stated sizes and render Korean; several assets contradict their declared product contract. |
| Design-only Git scope | `PASS` | All 15 changed paths are under `docs/**`; no runtime, test, config, dependency, auth, delivery, DB, remote, or protected-branch change. |

## 5. Checks, conflicts, and excluded scope

Independent checks performed:

- opened all five candidate PNGs and the failed Founder capture at original size;
- read all five SVG sources and all five candidate Markdown/index documents at
  commit `b966c6a`;
- compared the complete base/candidate diff and the narrow initial/candidate
  diff;
- verified candidate ancestry, clean worktree, upstream equality, and direct
  origin equality;
- verified every PNG dimension and SHA-256;
- used a read-only Chromium SVG geometry probe for the corrected assets and the
  remaining collision measurements;
- ran `git diff --check` for both exact ranges.

Two initial geometry-probe launches failed before loading an asset because the
target clone has no local `playwright` / `@playwright/test` installation. No
package was installed and the target remained clean. The successful static probe
used the already-installed Playwright library from the sibling reviewed Batch A
clone solely as review tooling; it started no product server and executed no
runtime suite.

Excluded by the exact handoff:

- runtime unit/E2E/build suites (no runtime or test change; no suite was run);
- implementation, code patching, clickable prototype, delivery activation,
  server start, DB/schema/migration, auth expansion, production/live, protected
  branch, Batch B-E, or next mission;
- final visual taste/aesthetic approval, which remains Leo/GPT-only.

Conflicts and unresolved risks:

- six concrete design/static-evidence defects above block implementation
  readiness but are narrow-document/asset patchable;
- A1R-SDR-06 must be escalated if Control cannot name an already approved source
  without authority expansion;
- no residual risk is accepted by this result.

## 6. Required correction and routing

Return to the same Control for a bounded design-only correction, then to this same
independent Sentinel session for a finding-specific delta review:

1. close DCR-02/DCR-03 and add the exact per-role basic-animation map;
2. make every displayed fact exact/source-valid or unmistakably illustrative,
   restore pinned blocker/Leo content, and remove fabricated progress/KST claims;
3. re-layout the info drawer/state legend and affected desktop labels;
4. add short Team text to every actual default label/row;
5. design the disabled mobile Advisor conversation sheet and sheet arbitration;
6. define exact sources/rendering for authority/security hold and
   decision-critical conflict, escalating only if a new authority decision is
   unavoidable;
7. re-export only affected PNGs, reopen them at original size, and include a
   boolean closure table for A1R-SDR-01..06 plus regression checks for the two
   already-corrected Advisor assets.

Do not dispatch a Worker. Implementation remains forbidden until independent
design `PASS` and Leo static-mockup approval both exist.

## 7. Final verdict

`NEEDS_PATCH`

The product direction is materially improved and A1R-ADV-02 is closed, but the
complete static candidate is not yet an implementable, internally consistent,
truthful Founder UX contract. A1R-SDR-01..06 are concrete, bounded pre-
implementation corrections. No aesthetic approval, implementation authority,
risk acceptance, or Batch B authorization is granted.
