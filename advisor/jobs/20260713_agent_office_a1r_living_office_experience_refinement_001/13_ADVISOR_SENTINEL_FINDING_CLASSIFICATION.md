# Advisor Classification of Sentinel Design Findings

## Decision

- Sentinel verdict: `NEEDS_PATCH`
- Advisor disposition: `PROCEED_WITH_LIMITS`
- Patch owner: same existing `foundation-control` session
- Patch class: finding-specific, design/documentation/static-asset only
- Worker implementation: `NOT_AUTHORIZED`
- New Leo/GPT product decision: `NOT_REQUIRED`
- Same Reviewer delta re-review: `REQUIRED`

The six findings are concrete pre-implementation design defects. They can be
closed without changing product direction, authority, security, runtime state,
or Batch B-E scope. Control must patch only the cited contracts, documents, and
affected static assets.

## Finding dispositions

| Finding | Classification | Disposition | Required closure |
|---|---|---|---|
| `A1R-SDR-01` | contract/implementability | patchable | Reconcile DCR-02/DCR-03 and add the exact role/input/pose/start-stop/unknown/reduced/static table. The prohibition applies to **live runtime-state-conditioned** animation, not accepted A-1R fixture/evidence states. |
| `A1R-SDR-02` | truth/static evidence | patchable | Use exact source-valid technical tokens and fail-closed values. Clearly watermark any isolated illustrative state as non-authoritative. Restore blocker/Leo content in the pinned-card contract. Remove fabricated progress, WorkUnit, and KST claims. |
| `A1R-SDR-03` | visual/accessibility | patchable | Re-layout the information sheet and affected desktop labels; re-export only affected PNGs; reproduce the geometry checks. |
| `A1R-SDR-04` | contract/static evidence | patchable | Add exact short Team text to every actual default actor label/row in desktop, mobile, and Pod views without overlap. |
| `A1R-SDR-05` | interaction/accessibility | patchable | Add a truthful `DELIVERY_DISABLED` mobile Advisor conversation sheet and define sheet arbitration, close/focus behavior, notifications, selection, input lock, and drawer transition. |
| `A1R-SDR-06` | truth/authority/implementability | patchable from existing canonical sources | Define a read-only critical-status overlay sourced only from accepted active `AlertRaised` and `BlockerOpened` records. Do not add or reinterpret a `PixelOperationalState`. |

## Exact source boundary for A1R-SDR-06

The source vocabulary already exists and is sufficient for a presentation-only
contract:

- `src/domain/alerts/index.ts` defines the closed `AlertKind` vocabulary,
  severity, evidence, deduplication, and lifecycle policy.
- `src/domain/blockers/index.ts` defines the closed `BlockerKind` vocabulary,
  safe defaults, resolution owners, evidence requirements, and lifecycle input.
- `docs/contracts/AGENT_OFFICE_DOMAIN_EVENT_CONTRACT.md` sections 7.2 and 7.3
  are the canonical event contracts.
- `docs/ui/AGENT_OFFICE_UI_ANIMATION_MAPPING.md` and `src/ui/i18n/ko.ts`
  already define exact Korean labels.
- `src/application/alerts/index.ts` provides immutable detail/evidence fields
  for active alerts.

Control must use these boundaries:

1. `AUTHORITY_SECURITY_HOLD` is a presentation category only. It may appear
   only when an accepted, unresolved structured source identifies one of:
   - `BlockerKind.AUTHENTICATION_REQUIRED`;
   - `BlockerKind.UNEXPECTED_APPROVAL_PROMPT`;
   - `BlockerKind.WRONG_ACTOR_OR_WORKSPACE`;
   - `BlockerKind.MANUAL_KILL_SWITCH`;
   - `AlertKind.AUTHENTICATION_REQUIRED`.
   The visible detail must retain the exact canonical Korean source label. A
   generic `MANUAL_ACTION_REQUIRED` alert is not enough by itself to assert a
   security or authority hold.
2. `DECISION_CRITICAL_CONFLICT` may appear only for an accepted unresolved
   `BlockerKind.SCOPE_CONFLICT`, rendered with the canonical label `범위 충돌`.
   `MISSING_LEO_DECISION` and `AlertKind.NEEDS_LEO_DECISION` remain the separate
   existing `Leo/GPT 결정 필요` presentation and are not renamed as conflict.
3. These are adjacent critical overlays, not additions to or replacements for
   `PixelOperationalState`. They grant no command, approval, routing, recovery,
   or resolution authority.
4. Resolved/suppressed sources do not render. Missing, stale, malformed,
   conflicting, or unverified source evidence fails closed to the existing
   neutral unknown presentation and must not assert a hold or conflict.
5. If multiple accepted critical sources coexist, all meanings remain available
   in text/semantic output. Control must define deterministic visual ordering,
   non-color icon/text tokens, and announcements without hiding a higher-severity
   or decision-required condition.

This is a direct mapping of already approved structured records to a read-only
UI contract. It does not create a new authority source or product decision.

## Proportional verification

Control must:

- patch only finding-bearing documents and affected SVG/PNG assets;
- inspect every re-exported PNG at original size;
- run static geometry/content checks for the changed mockups;
- run `git diff --check` and exact changed-path checks;
- provide a closure table for `A1R-SDR-01..06`;
- preserve the two previously corrected Advisor assets and all scope boundaries.

Do not run runtime unit, E2E, build, or server suites for this docs/static-assets
delta. The independent Sentinel will perform the same finding-specific delta
review after Advisor validation.
