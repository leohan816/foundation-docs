# Lab-Scoped Evidence Correction — Worker Handoff

MISSION_ID: `COSMILE_CONSOLE_DASHBOARD_OPERATOR_AUTHORITY_CORRECTION_IMPLEMENTATION_V1`
INSTRUCTION_CLASS: `PROCEED_WITH_LIMITS`
ACTOR: existing Cosmile Worker
SESSION: `cosmile`
MODEL_EFFORT: Claude Opus 5 / xhigh
SKILL: `/fable-builder`
WORKTREE: `/home/leo/Project/.worktrees/Cosmile/COSMILE_CONSOLE_DASHBOARD_OPERATOR_AUTHORITY_CORRECTION_IMPLEMENTATION_V1`
BASE: `6486019e0968de5671e43521e5cfb40d03b0bdca`
PRODUCT_WRITE: PROHIBITED

## Admitted correction

Classification `139_LAB_BUTTON_CLASSIFICATION_RESULT.md` proves the E7 page-wide
buttons are global shell/navigation controls. Correct only the evidence scope:

- old, rejected oracle: all buttons in `document` must be zero;
- corrected contract: executable controls inside the Lab-local root must be zero.

The Lab-local root is exactly:

`section[aria-labelledby="lab-home-heading"]`

## Single corrected evidence path

1. Verify exact base, clean/upstream equality, handoff pin, port 31081 free, and `.next` absent.
2. Rebuild exactly once because `.next` was cleaned. Use the same telemetry-off, unreachable loopback `DATABASE_URL` build environment as E7.
3. Create one owner-only temporary controller/profile/output root.
4. Reuse the finite Node 24 CDP design from E7: one direct runtime start, TCP readiness only, one pinned Chromium launch, one `Page.navigate` to `/lab`, one `DOMContentLoaded`, and one `Runtime.evaluate`.
5. In that evaluate, require:
   - pathname `/lab`;
   - exactly one Lab-local root matching the selector above;
   - exact heading text `Lab 후보 31개` inside that root;
   - exactly 31 anchors inside that root, all with distinct pathnames matching `/lab/<capabilityId>`;
   - zero Lab-local `button`, `form`, `input`, `select`, `textarea`,
     `[role="button"]`, `[formaction]`, `[data-command]`, `[data-action]`,
     editable control, and inline `on*` attribute;
   - `document.designMode` off.
6. Do not use the global page button count as a pass/fail assertion. It may be returned only as a non-verdict informational count.
7. Unconditionally terminate only the captured Chromium/runtime process groups and remove `.next`, controller, profile, output, and temp root.
8. Verify port/process/temp/build residue absent and product Git clean/upstream-equal.

## Ceiling

- Build 1, runtime start 1, Chromium launch 1, navigation 1, evaluate 1.
- No retry, alternate controller, second observation, Vitest, typecheck, DB,
  provider, economic, public-preview, existing-service, product source/config,
  schema/migration/fixture/test edit, commit, or push.
- First failure is terminal HOLD.

## Durable return

Write only:

- `142_LAB_SCOPED_EVIDENCE_RESULT.md`
- `143_LAB_SCOPED_EVIDENCE_POINTER.md`

under the existing mission job. Include categorical results, counts, cleanup,
Git state, effects 0, actual binding/skill, `RETURN_TO: foundation-advisor`, and
`STOP`. Do not commit or push documentation. Stop before Reviewer.
