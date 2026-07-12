# Advisor Validation - Worker Scope Exception

## Verdict

`PATCHABLE_IN_SCOPE__CONTROL_DOCUMENTATION_CORRECTION_REQUIRED`

The initial implementation dispatch stopped before code changes because the
accepted closed file list omitted the actual existing host for BA-WU-03 and
BA-WU-04. This is a narrow technical design/file-scope defect. It does not
require a new Founder product, authority, security, or risk decision.

## Worker Evidence

- session: `agent-office-opus`
- runtime: Opus 4.8 (1M), Ultracode
- skill: `/fable-builder` loaded
- target: `/home/leo/Project/agent-office-batch-a-001`
- branch/commit: `batch-a/modern-office-identity-001` at `381b41184994da161db3f5e80f0952f82450925e`
- worktree: clean; zero code/document/test changes
- status: `BLOCKED__STOP_AT_ENTRY_MAPPING__NO_CODE_CHANGED`

The Worker correctly refused to use an unnamed file or duplicate the existing
component. No implementation result was claimed.

## Direct Advisor Verification

Advisor inspected the actual source and imports:

1. `src/ui/pixel/living-office-actor-overlay.tsx` is the existing DOM host for
   camera-tracked compact actor labels and the actor-specific accessible dialog.
2. `src/ui/pixel/prototype-entry.tsx` imports and renders that overlay.
3. `tests/ui/pixel-actor-overlay.test.tsx` directly covers label placement,
   compact facts, dialog behavior, focus restoration, and static parity.
4. `tests/ui/pixel-world-semantic-parity.test.tsx` directly covers the separately
   scoped `LivingOfficeHud` and `LivingOfficeDetailDrawer` frame-level panel.
5. The accepted design delta section 9 and WorkUnit plan omit all three paths.
6. `actor-sprite.tsx` is a Pixi drawing function and cannot replace accessible
   DOM labels/dialogs.
7. `living-office-detail-drawer.tsx` is a frame/evidence panel, not the existing
   actor-specific drawer.

## Exact Correction Required

Control must update only the same four canonical Batch A documents and:

- add `src/ui/pixel/living-office-actor-overlay.tsx` to the closed pixel source
  enumeration;
- add `tests/ui/pixel-actor-overlay.test.tsx` and
  `tests/ui/pixel-world-semantic-parity.test.tsx` to the exact test enumeration;
- assign BA-WU-03 compact labels and BA-WU-04 actor-specific 17-field drawer to
  `living-office-actor-overlay.tsx`;
- preserve `living-office-detail-drawer.tsx` as the frame/evidence technical
  drawer unless an evidence-backed refactor is explicitly described;
- update WU-03/WU-04 source/test rows and requirement-to-design traceability;
- preserve every accepted U1-U3/S3/R2/T3 rule and all security, authority,
  accessibility, fallback, Channy, rollback, no-Grok, excluded-session, and
  Batch B-E boundaries.

No runtime/source/test/config/media implementation is allowed in the correction.
The corrected docs-only delta returns to the same independent SOL Sentinel for a
narrow review before Worker resume.

## Routing

`NEXT_ACTOR: foundation-control`

`FOUNDER_DECISION_REQUIRED: false`

`IMPLEMENTATION_STATUS: STOPPED_CLEAN_PENDING_CORRECTION`
