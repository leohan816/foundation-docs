# Frozen M1.2 Design Unknown Register

Status: `FROZEN_BEFORE_WORKER_DESIGN`

The Worker may add an addendum with evidence and reason, but must not silently
remove, merge, rename, or convert an unknown into a fact.

## AO12-U01: Dynamic Team Pod Model

- Known: the M1 scene has eight fixed station IDs in a 4-by-2 grid.
- Unknown: the exact scalable projection for multiple projects, missions, and
  actor instances.
- Resolution owner: technical design, bounded by M1 authority.
- Safe default: one selected project pod is expanded; other pods are truthful
  compact summaries with no inferred activity.

## AO12-U02: Single Advisor Team Principle

- Known: Advisor owns routing and mission audit; Worker and Reviewer remain
  separate actors; Leo/GPT is final approver.
- Unknown: the exact spatial invariant when one Advisor oversees multiple
  projects or when multiple Advisor role instances exist in the future.
- Resolution owner: technical design; any authority change returns to Leo/GPT.
- Safe default: exactly one responsible Advisor role instance per Team Pod, with
  no duplicated authority badge and no inferred authority from proximity.

## AO12-U03: Project Color System

- Known: M1 has operational status colors but no project identity palette.
- Unknown: deterministic assignment, collision behavior, persistence, and
  contrast requirements.
- Resolution owner: technical design.
- Safe default: project color is supplemental only; text/icon/pattern always
  carries identity and status colors remain semantically reserved.

## AO12-U04: Actor Character Identity

- Known: every M1 station uses the same generic code-native actor SVG.
- Unknown: role silhouettes, project affiliation, state overlays, customization,
  and asset production method.
- Resolution owner: technical design plus future asset gate.
- Safe default: project-authored placeholders only; no purchased or generated
  production asset enters this design mission.

## AO12-U05: Channy Definition

- Known: `Channy` does not occur in current Agent Office source or canonical
  documents.
- Unknown: identity, purpose, authority, location, behavior, and whether Channy
  is a character, companion, guide, or operational actor.
- Resolution owner: Leo/GPT product decision.
- Safe default: disabled design slot only; no state, authority, routing,
  notification, or autonomous action is assigned.

## AO12-U06: Lounge Semantics

- Known: M1 has no lounge and IDLE means no assigned structured activity.
- Unknown: who may enter, whether presence is persistent, and what it may imply.
- Resolution owner: technical design.
- Safe default: lounge is an ambient visualization only for verified IDLE actors;
  it never implies communication, collaboration, availability, or assignment.

## AO12-U07: Truthful Animation and Ambient Motion

- Known: M1 transient cues require accepted structured events and suppress motion
  for stale/offline/conflict/critical evidence.
- Unknown: how spatial walking, seating, handoff, review, testing, and idle loops
  preserve this guarantee at larger scale.
- Resolution owner: technical design.
- Safe default: no evidence-backed transition means no task-signifying motion;
  ambient motion is visually distinct and bounded.

## AO12-U08: Mission Board and Current Actor Visibility

- Known: M1 has hierarchy, WorkUnit, evidence, and actor projections.
- Unknown: the exact spatial board hierarchy and selection behavior across
  initiative/package/mission/pod/actor.
- Resolution owner: technical design.
- Safe default: one active mission board with explicit scope/version; future work
  and other projects remain separate summaries.

## AO12-U09: Rendering Architecture

- Known: M1 uses accessible DOM/CSS/local SVG with no spatial engine.
- Unknown: whether M1.2 should remain DOM/SVG, introduce Canvas, or use a 3D
  engine.
- Resolution owner: technical design based on accessibility, performance,
  testability, and current stack.
- Safe default: accessible DOM/SVG/CSS 2D or 2.5D projection; no 3D engine unless
  an evidenced requirement cannot be met otherwise.

## AO12-U10: Responsive Spatial Navigation

- Known: M1 mobile shows two stations per page.
- Unknown: multi-pod navigation, zoom, focus, touch targets, text scaling, and
  orientation behavior.
- Resolution owner: technical design.
- Safe default: semantic list/detail fallback and one-pod mobile focus; no
  miniature unreadable floor plan.

## AO12-U11: Reduced Motion and Performance Budgets

- Known: M1 honors `prefers-reduced-motion`, supports explicit motion control,
  and has deterministic baselines.
- Unknown: exact M1.2 budgets for actor count, active cues, frame work, memory,
  and fallback tiers.
- Resolution owner: technical design; implementation must later measure.
- Safe default: transform/opacity only, bounded cues, no perpetual task motion,
  and a fully equivalent static mode.

## AO12-U12: Multi-Project Identity and Host Boundaries

- Known: project registration includes project and host IDs, while the scene has
  fixed role stations.
- Unknown: whether one actor instance may appear in multiple pods and how host or
  project conflicts are shown.
- Resolution owner: technical design; authority changes remain forbidden.
- Safe default: one canonical actor identity with explicit assignment views;
  conflicts render as unknown/conflict rather than duplicates presented as live.

## AO12-U13: Asset Source, Licensing, and Style Gate

- Known: M1 assets are local project-authored SVG with an inventory and hash.
- Unknown: M1.2 art direction, production asset source, license, animation format,
  and cross-device determinism.
- Resolution owner: Leo/GPT for purchase/style selection after design; technical
  validation for format/performance.
- Safe default: no purchase/import; define slots, dimensions, license evidence,
  and replacement contracts only.

## AO12-U14: Compatibility and Migration

- Known: M1 contracts and tests depend on fixed `OfficeStationId` and existing
  `RoleSceneProjection` behavior.
- Unknown: additive migration path to dynamic pods without breaking M1 evidence,
  exact delivery, or current visual accessibility.
- Resolution owner: technical design.
- Safe default: versioned additive projection with an M1 compatibility adapter;
  no reinterpretation of historical M1 events.
