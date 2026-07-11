# Leo/GPT Chained Design and Implementation Decision

Status: `DESIGN_PATCH_AUTHORIZED__IMPLEMENTATION_CONDITIONAL_ON_CLEAN_FABLE5_PASS`

Mission: `AGENT_OFFICE_M1_2_SPATIAL_ANIMATED_ADVISOR_TEAM_OFFICE`

## Authority

Leo/GPT approves the reviewed M1.2 architecture subject to the exact narrow
product-intent patch below. Runtime implementation remains blocked until the
same existing Fable5 Reviewer returns a clean Level-3 delta `PASS` with no
accepted risk, unresolved design defect, new Founder decision, or material
scope expansion.

After a clean delta `PASS`, Advisor may freeze the patched design and route the
four serial, reversible implementation batches `AO12-A` through `AO12-D` to the
existing Agent Office Worker. Routine in-scope `NEEDS_PATCH` and same-reviewer
re-review loops are authorized. Final acceptance remains Leo/GPT authority.

## Required Narrow Patch

### P-01 One Shared Office Floor

- Initial implementation is one shared American-style open-office floor.
- On wide desktop, every registered Advisor Team Pod remains spatially visible.
- Selecting a Pod may expand mission, actor, route, and detail presentation.
- Non-selected Pods remain recognizable office areas, never ordinary dashboard
  cards, and still expose Team name, responsible Advisor, current main mission,
  current actor, current state, and gate/blocker summary.
- Full routing choreography may be limited to the selected Pod.
- Tablet/mobile may use focused paging, minimap, or navigation while preserving
  identical operational meaning.
- Multi-floor structures are additive future extension points only.

### P-02 Single Advisor Team Principle

1. An Advisor creates and leads a Team.
2. Every active operational actor belongs to exactly one responsible Advisor
   Team.
3. An actor that obeys an Advisor is a member of that Advisor's Team.
4. An actor without one valid Advisor assignment is `UNASSIGNED` and cannot
   receive work.
5. No project, actor, or system receives an exception.
6. Reassignment requires explicit canonical authority evidence.
7. Visual proximity never creates authority.
8. Missing or multiple responsible Advisor assignments fail closed and suppress
   task motion.

Current configuration:

- `FOUNDATION_ADVISOR_TEAM`: Foundation Advisor, Control, Foundation Worker,
  Cosmile Worker, SIASIU Worker, Agent Office Worker, and the assigned
  independent Reviewer when required.
- `VIBENEWS_ADVISOR_TEAM`: a separate Team Pod only when it has one valid
  responsible Advisor assignment; its assigned Worker, Designer, and Reviewer
  are members of that Team.
- Agent Office remains a member of `FOUNDATION_ADVISOR_TEAM`; it is not an
  independent or privileged Team.
- A future Agent Office Team requires a newly appointed Advisor, recorded Team
  assignment authority, formal member reassignment, and an effective command
  hierarchy.
- A future multi-Advisor projection renders one distinct Advisor Hub character
  per `Advisor roleInstanceId`; every Team Pod references exactly one responsible
  Advisor role instance; one active Advisor instance is never cloned.

### P-03 Project Identity

- Spatial grouping follows Advisor Team assignment first.
- Project identity uses clothing, desk accents, signs, text, glyphs, and patterns.
- Approved colors: Cosmile coral/pink; SIASIU mint/emerald; Foundation navy/blue;
  VibeNews purple; Agent Office orange/amber; Control slate/charcoal with a blue
  accent.
- Color is never the sole identity signal. Severity, focus, accessibility, and
  alerts override decorative color.
- The official current name is `SIASIU`. `Shashu`, `샤슈`, `SHASHU`, and
  `shashu` are forbidden in current UI, fixtures, actor labels, locale strings,
  tests, and baselines. Historical citations may preserve old wording only when
  explicitly marked historical.

### P-04 Advisor Team Mission Board

Every Advisor Team Pod contains a visible mission/electronic board. When backed
by canonical evidence it shows Team and project names; responsible Advisor;
Advisor model and session identity; current mission, Phase or WorkUnit; current
actor, model and session; assigned Reviewer; next actor/handoff; WorkUnit and
required-gate progress; exact blocker; Leo/GPT decision state; latest verified
evidence time and pointer; and stale/unknown/conflict state without inference.

Only redacted, registered display identity may be shown. Raw pane locators,
filesystem paths, credentials, or private transport details are not UI data.
Terminal prose and visual proximity never manufacture board activity.

### P-05 Character and Art Direction

`AO12-FD-02` is resolved as
`APPROVE_PROJECT_AUTHORED_CODE_NATIVE_PLACEHOLDERS_FOR_M1_2_IMPLEMENTATION`.

The direction is an original cute 2D/2.5D pixel or pixel-inspired office with a
warm retro 16/32-bit console atmosphere, friendly blocky proportions, an
American startup/open-office interior, wood desks, glass meeting room, coffee
lounge, shared paths, project signs, mission boards, Reviewer booth, Advisor
desk/Hub, and Channy bed/food/water objects. Use project-authored CSS, DOM, SVG,
and simple local sprite-like elements. Do not copy a protected visual style.
No asset purchase, external import, commissioning, vendor contract, or paid
license is authorized. Production replacement art remains additive and
separately reviewable.

### P-06 Channy Product Role

`AO12-FD-01` is resolved as
`CHANNY_ENABLED__NON_OPERATIONAL_AMBIENT_COMPANION_AND_STRUCTURED_STATUS_REFLECTOR`.

Channy is a cute Bedlington Terrier office companion. Allowed behavior includes
roaming verified paths, visiting Pods/shared areas, sitting near verified-idle
actors, eating, drinking, sleeping, resting, playing, observing, briefly
following accepted routing activity, and reacting to structured `WAITING_LEO`,
`BLOCKED`, stale/offline, mission-complete, and valid dispatch/routing states.

Channy never inspects terminal/session content, infers unstructured state,
creates evidence, dispatches, issues commands, approves, changes sessions,
repairs systems, replaces an alert or mission board, or implies communication or
collaboration. Session/system checks remain structured-adapter responsibilities.
Absent operational evidence, Channy remains neutral and ambient. Reduced-motion
and static modes preserve meaning without requiring animation.

### P-07 Actor States and Ambient Behavior

Operational presentation states are `IDLE`, `WORKING`, `TESTING`,
`ROUTING / DISPATCH`, `REVIEWING`, `RETURNING_RESULT`, `NEEDS_PATCH`,
`WAITING_DEPENDENCY`, `WAITING_LEO`, `BLOCKED`, `COMPLETED`, `FAILED`, and
`CANCELLED`. Operational state always overrides ambient behavior.

Verified-idle actors may use the lounge, drink coffee, read, rest, use a small
game device, look through a window, stand by a whiteboard, visually interact
with Channy, or visually talk without implying real communication. A new
operational event interrupts ambient behavior. Lounge presence means only
presentation-level `IDLE`; it does not imply availability, assignment, shared
context, collaboration, communication, or approval.

### P-08 Evidence-Backed Animation

Accepted structured events may represent Leo/GPT handoff to Advisor, Advisor
dispatch, Worker activity, testing, Reviewer handoff and verdict return, patch
return, result return, `WAITING_LEO`, and completion acknowledgement.

Movement is never inferred from terminal prose, timestamps alone, nearest Pod,
visual proximity, stale state, or unverified fixture text. Preserve cue
precedence, deduplication, stale/offline/conflict suppression, reduced-motion
equivalence, static fallback, no delayed replay, bounded simultaneous cues, and
no actor cloning.

## Conditional Implementation Authority

After a clean design-delta `PASS`, Advisor may publish an exact versioned
implementation manifest and execute, serially:

- `AO12-A`: contracts, M1 adapter compatibility, Team projection, Advisor
  assignment resolver, fail-closed invariants, current assignments, future
  multi-Advisor extension points, SIASIU correction.
- `AO12-B`: one-floor spatial structure, Team Pods and boards, identity system,
  code-native characters and objects, responsive/accessibility/static surfaces.
- `AO12-C`: structured-event poses/routes/review/result/idle/Channy animation,
  budgets, suppression, performance and viewport/accessibility evidence.
- `AO12-D`: private authenticated integration, M1 compatibility, integration and
  rollback evidence, degradation tiers, as-built docs, final independent review,
  final Advisor audit.

All `AO12-IWU-01` through `AO12-IWU-14` may be converted into the exact manifest.
No Designer session is assumed or created; the existing Agent Office Worker owns
implementation unless a later manifest explicitly identifies an existing,
authorized Designer role.

## Mandatory Stops

Stop for any new product decision, material design/scope change,
`PASS_WITH_RISK`, unresolved review finding, `FAIL`, authority/security/auth
change, browser-direct Worker/Reviewer or arbitrary-terminal capability,
public/remote/production access, DB/schema/migration, Hermes, paid/external
assets, destructive/protected-branch Git action, M1 incompatibility, rollback
failure, or final acceptance.

## Unchanged Prohibitions

No public/Tailscale/remote/prod exposure, DB-backed multi-user service, Hermes,
browser-direct role dispatch, arbitrary shell, wildcard/broadcast, automatic
approval/auth responses, external asset import/purchase, M1 authority or delivery
reinterpretation, M1.3, or another mission.
