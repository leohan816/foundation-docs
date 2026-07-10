# Agent Office M01 Canonical Design Documentation Addendum

Status: `ACTIVE_WITHIN_M01`

This addendum does not create another product mission and does not authorize
implementation. It applies at the design checkpoint after bootstrap.

## Canonical Ownership

Agent Office owns its canonical product, runtime, architecture, security,
integration, UI-event, and operations design in the Agent Office repository.
`foundation-docs` owns only mission governance artifacts, review records, audit
evidence, and pointers. Competing canonical copies are forbidden.

## Exact Required Files

1. `docs/architecture/AGENT_OFFICE_MASTER_DESIGN.md`
2. `docs/contracts/AGENT_OFFICE_DOMAIN_EVENT_CONTRACT.md`
3. `docs/security/AGENT_OFFICE_SECURITY_AUTHORITY_MODEL.md`
4. `docs/integration/AGENT_OFFICE_GATEWAY_MULTI_HOST_DESIGN.md`
5. `docs/ui/AGENT_OFFICE_UI_ANIMATION_MAPPING.md`
6. `docs/operations/AGENT_OFFICE_OPERATIONS_RECOVERY.md`
7. `docs/FEATURE_INDEX.md`

## Required Review and Closure Behavior

- Fable5 DESIGN_REVIEW covers the exact committed design files.
- Fable5 IMPLEMENTATION_REVIEW verifies code-to-design conformance.
- Divergence classification is exactly `CODE_DEFECT`, `DESIGN_DEFECT`,
  `DOCUMENTATION_STALE`, `DEFERRED_WITH_GATE`, or `NEEDS_LEO_GPT_DECISION`.
- Patchable divergence uses the same Worker and same Reviewer re-review loop.
- `PASS_WITH_RISK` returns to Leo/GPT.
- Design may not be silently rewritten to excuse implementation defects.
- Final closure requires exact canonical files, FEATURE_INDEX discoverability,
  both reviews, complete critical traceability, visible limitations, and verified
  commits/pushes.

## As-Built Traceability

Every material design requirement must ultimately record:

`DESIGN_REQUIREMENT -> IMPLEMENTATION_PATH -> TEST_PATH -> CURRENT_EVIDENCE -> STATUS -> DEFERRED_GATE`.

Candidate design may mark implementation as `NOT_IMPLEMENTED`; final reviewed
documentation must describe the actual implementation.
