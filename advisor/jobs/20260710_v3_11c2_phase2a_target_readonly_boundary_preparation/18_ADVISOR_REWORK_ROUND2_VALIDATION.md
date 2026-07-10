# Advisor Rework Round 2 Validation

Date: 2026-07-10

Validation verdict: `VALIDATED_FOR_SAME_SESSION_FABLE5_ROUND3_REREVIEW`

Admin and Phase 2A status: `NOT_APPROVED`

## Direct Evidence

- Cosmile commit `e4ed6680fee2a2e55117fb406cae8714e3680465`.
- foundation-docs commit `d0aa1f430b30a95e24c2f9bb56f06b5cec45c1c3`.
- Actual `41e5394..e4ed668` diff.
- Repo-local plan, mirror, round-2 Worker result, and pointer.
- Fable5 round-2 re-review and Advisor F-A/F-B classification.

## Validation Results

| Check | Result |
|---|---|
| Cosmile rework changes one design Markdown file only | PASS |
| Cosmile HEAD equals upstream; staged files are empty | PASS |
| Unrelated untracked docs remain excluded | PASS |
| Repo-local plan and mirror are byte-identical | PASS |
| Both copies have SHA-256 `967a0049829075399321664b4053aa69803d87fc3c8164af24e837791d899bab` | PASS |
| Credential-bearing URI pattern found | NONE |
| DB/query/migration/role/logging/permission/secret/runtime action | NOT PERFORMED |
| Admin or Phase 2A execution launcher | NOT CREATED |

## Patch Presence

- F-A: the selected flow is role creation without a password followed by
  `psql \password <ROLE>` or a verified existing-role equivalent;
  `createuser --pwprompt` is excluded and no combined-create path exists.
- F-B: statement-log safety must be proven before credential setting or the flow
  STOPs; raw-password or verifier capture becomes a sensitive incident requiring
  Leo/GPT decisions for log handling and credential reset/rotation; no logging,
  log-deletion, reset, or rotation action is automatic.
- P-1/P-3 mechanisms remain materially unchanged.

## Round-3 Questions

The same Fable5 session must decide:

1. Is the selected two-step credential path technically and textually consistent,
   with all active `createuser --pwprompt` alternatives removed?
2. Does the statement-log gate STOP before provisioning when verifier safety is
   unproven, and does possible/actual capture route to a sensitive incident and
   Leo/GPT decision without automatic logging, log deletion, reset, or rotation?

Advisor confirms patch presence and scope only. It does not replace independent
PostgreSQL/security review.

