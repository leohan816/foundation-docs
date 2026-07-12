# Living Pixel-Office Visual Patch Worker Brief

## Identity

- Actor: Agent Office Worker
- Existing session: `agent-office/%13`
- Model / effort: `Codex 5.6 SOL / Ultra`
- Work unit: `AO12-PWU-11-P1`
- Repository: `/home/leo/Project/agent-office`
- Branch: `shadow/agent-office-m1-2-spatial-office`
- Exact base: `c535877b61ad8a1e3d74dca5c6fec0ada4cac3f8`
- Mode: bounded prototype implementation patch
- Full integration: forbidden

## Mandatory reads

Read directly:

- `97_LEO_GPT_LIVING_PIXEL_OFFICE_VISUAL_PATCH_DECISION.md`;
- `97_LIVING_PIXEL_OFFICE_VISUAL_PATCH_MANIFEST.json`;
- artifacts 59 through 96 in this Advisor job;
- the canonical living pixel-office and public-root bridge design documents;
- the prior Worker result and clean Fable5 review result;
- current Agent Office instructions, source, tests, snapshots, verifier, media,
  Git state, package pins, and active build configuration.

Do not execute from chat memory or summaries.

## Required implementation

### 1. Structured actor identity contract

Extend the prototype projection/frame contract with explicit structured fields
needed by the Founder:

- role;
- project;
- Advisor Team;
- reports-to Advisor;
- session name;
- model;
- state;
- mission;
- WorkUnit; and
- evidence freshness.

No renderer may derive missing values. Use literal `UNKNOWN` for absent or
unverified fields. Synthetic fixtures must identify themselves as synthetic and
may populate a field only from an explicit structured fixture value.

### 2. Always-visible actor labels and accessible details

Add a compact label near every visible actor. Prefer a camera-aware DOM overlay
for legible text and keyboard access rather than expanding the reviewed Pixi
bridge. Each label must always show role, model, session, and state, plus a role
glyph/icon and state ring. Project color is only a redundant accent.

Labels must:

- track the corresponding actor through camera pan/zoom/focus;
- avoid obvious actor/label overlap and unreasonable full-office collisions;
- remain readable on wide desktop;
- preserve focused mobile meaning;
- be clickable and keyboard reachable;
- open a focus-managed detail drawer with every required field;
- restore focus on close;
- expose identical semantic meaning in static/reduced-motion fallback;
- show `UNKNOWN` without inference.

### 3. Channy motion

Implement a slower deterministic Channy state sequence with materially longer
pauses and bounded easing. It must include walk, stop, sniff, sit, eat, drink,
sleep, and play within the prototype timeline or its directly inspectable
scenes. Movement must not be constant and must not imply authority or evidence.

Keep the browser recording between 20 and 30 seconds while making the reduced
speed and pauses visually inspectable. Update timeline, scene, frame, and
animation tests accordingly.

### 4. Channy appearance

Update the code-authored atlas and runtime drawing so Channy is visibly an
original Bedlington Terrier: wool-like rounded head, narrow muzzle, arched back,
slim legs, light cream/gray coat, and darker ear accents. No external assets,
fonts, fetches, licenses, or protected-style copying.

`channy.png` must be a useful close-up or focused proof, not a distant incidental
appearance.

### 5. Modern palette and hierarchy

Use light oak, warm gray, sand, ivory, glass-blue, and muted charcoal as the
dominant office palette. Limit project colors to clothing, signs, boards, and
desk accents. Reduce dark terminal styling, harsh outlines, and HUD dominance.
The office world remains the primary viewport and technical details remain
secondary.

### 6. Evidence and exact baseline scope

Regenerate the actual running prototype evidence:

- WebM 20-30 seconds;
- MP4 converted from the new WebM;
- GIF showing movement, Channy, and handoff;
- five required PNGs.

The existing artifact directory must remain ignored, owner-only, and contain
exactly eight files. Update the exact verifier to enforce:

- all 13 living-prototype baselines changed from `c535877` where the new visual
  contract requires it;
- all 26 reconciled historical baselines remain byte-identical to `c535877`;
- no other baseline path changes;
- required media subjects and existing security/production/listener gates.

Stop before commit if a historical reconciled baseline changes.

## Likely in-scope files

The exact final set must be evidence-driven, but likely surfaces include:

- `src/ui/pixel/contracts.ts`;
- `src/ui/pixel/fixtures/**`;
- `src/ui/pixel/frame-projector.ts`;
- `src/ui/pixel/actor-sprite.tsx`;
- `src/ui/pixel/channy-sprite.tsx`;
- `src/ui/pixel/assets/**`;
- `src/ui/pixel/pixel-world-scene.tsx` and renderer composition;
- actor overlay/detail/semantic mirror components;
- `src/ui/pixel/living-office.css`;
- prototype tests, performance tests, recording test, exact verifier, and the
  exact 13 living-prototype baselines;
- Agent Office canonical as-built design and `docs/FEATURE_INDEX.md`.

Do not modify M1 authority, authentication, delivery, transport, gateway, DB,
remote/public, or production surfaces.

## Required tests and evidence

At minimum:

- unit tests for structured fields and `UNKNOWN` fail-closed behavior;
- label tracking, required compact content, icon/text/ring redundancy, collision
  behavior, click and keyboard drawer, focus return, semantic/static parity;
- Channy speed, pause duration, easing, deterministic state sequence, and no
  operational authority;
- palette token and visual hierarchy assertions;
- focused bridge 24/24, lint, strict typecheck, full tests, builds, dependency
  audit, naming gate, production-isolation gate;
- default and composed browser trains with no historical baseline update;
- dedicated prototype browser train and all visual/accessibility/performance
  evidence;
- exact verifier before staging, after exact staging, and after commit;
- direct inspection of all changed prototype images and representative video,
  MP4, and GIF frames;
- final clean/upstream-equal Git and zero residual process/listener evidence.

## Result and publication

Commit and non-force push the exact Agent Office patch only after all gates
pass. Write and push:

- result:
  `../foundation-docs/runs/agent-office/20260711_agent_office_m1_2_spatial_animated_advisor_team_office/WORKER_LIVING_PIXEL_OFFICE_VISUAL_PATCH_RESULT.md`;
- pointer:
  `../foundation-docs/advisor/jobs/20260711_agent_office_m1_2_spatial_animated_advisor_team_office/99_WORKER_LIVING_PIXEL_OFFICE_VISUAL_PATCH_RESULT_POINTER.md`.

Return an ASCII-only pointer to Advisor. Do not invoke Fable5, grant visual
acceptance, begin full integration, or start another mission.
