# Founder Bounded Operator Reuse Check

```text
MISSION_ID: COSMILE_O1_BROWSER_NONPROD_RUNTIME_INTEGRATION_AND_VERIFICATION_V1
SOURCE: Leo
ROUTED_BY: foundation-advisor
AUTHORITY_EFFECT: NON_EXPANSIVE_REUSE_AND_EVIDENCE_CHECK
ADVANCED_DASHBOARD_SCOPE: NOT_AUTHORIZED
REDESIGN: NOT_AUTHORIZED
```

## Exact Founder direction

Before the implementation candidate is frozen for independent review, the
responsible Cosmile Worker must inspect the existing operator, admin, and
dashboard surfaces read-only and record whether exact existing components can
be reused for the already-authorized minimum:

- order view;
- shipment-record experience;
- full-refund experience;
- reconciliation experience.

Reuse an existing component unchanged, or with the smallest bounded correction,
only when its contracts and authority boundaries match the reviewed O1 mission.
Do not add advanced-dashboard scope, redesign, broaden operator functionality,
or delay the mission for unrelated dashboard work.

If reuse is unsafe or materially larger, preserve the current minimal O1
operator surface and record exact evidence and reason.

Route this work only through the Advisor and include the disposition in the
independent review.

## Advisor operational interpretation

- Inspection is read-only across existing Cosmile operator/admin/dashboard
  paths.
- This record does not automatically add any existing operator/admin/dashboard
  path to the write allowlist.
- Exact unchanged reuse is allowed when no path modification is required and
  when verified Google-sub operator authority, test-only step-up, sanitized
  projections, record-only shipment, full-refund-only, inventory HOLD, and
  reconciliation boundaries remain intact.
- If the Worker finds a truly minimal modification outside the current
  allowlist, the Worker must return the exact path, necessity, diff boundary,
  and contract match to the Advisor before writing it.
- A broad console integration, authority-model change, navigation redesign,
  advanced dashboard, unrelated cleanup, or materially larger reuse is not
  authorized. In that case the current bounded O1 operator surface remains the
  correct implementation.

## Required evidence

The Worker result must include a table with:

```text
EXISTING_SURFACE_OR_COMPONENT
CURRENT_PATH
CURRENT_AUTHORITY_MODEL
CURRENT_DATA_CONTRACT
REUSE_FIT: EXACT | BOUNDED | UNSAFE | MATERIAL
WRITE_REQUIRED: YES | NO
DISPOSITION
EVIDENCE
```

The independent Reviewer must verify the reuse disposition and confirm that the
chosen path does not broaden operator capability or weaken identity, step-up,
PII, payment, inventory, reconciliation, preview, or claim-ceiling boundaries.

```text
ADVISOR_GATE: PROCEED_WITH_LIMITS
CURRENT_MINIMAL_O1_OPERATOR_SURFACE: PRESERVE_UNLESS_EXACT_SAFE_REUSE_IS_PROVEN
HARD_STOP_BEFORE_CONTROLLED_LIVE: ACTIVE
```
