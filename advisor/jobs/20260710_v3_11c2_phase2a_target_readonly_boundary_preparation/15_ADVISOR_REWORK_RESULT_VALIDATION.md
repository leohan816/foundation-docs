# Advisor Rework Result Validation

Date: 2026-07-10

Validation verdict: `VALIDATED_FOR_SAME_SESSION_FABLE5_REREVIEW`

Admin and Phase 2A status: `NOT_APPROVED`

## Evidence Inspected Directly

- Cosmile rework commit `41e53949a88d96791a2e5fce07f752f32056dae5`.
- foundation-docs rework result commit
  `dccedbba017f903c80773ec58e15cc86eb18458e`.
- Actual `0ec8667..41e5394` diff.
- Repo-local plan, mirror, Worker rework result, and pointer.
- Original Fable5 `NEEDS_PATCH` result and Advisor finding classification.
- Current Cosmile branch, upstream, staged state, and unrelated untracked files.

## Mechanical and Scope Validation

| Check | Result |
|---|---|
| Rework changes one Cosmile design Markdown file only | PASS |
| Cosmile HEAD equals upstream; staged files are empty | PASS |
| Six unrelated untracked docs remain excluded | PASS |
| foundation-docs commit contains mirror, rework result, and pointer only | PASS |
| Repo-local plan and mirror are byte-identical | PASS |
| Both copies have SHA-256 `f83850767b1c01062a53ea634dd3fb7f14f2b969f891dd8ce28cacd774ec3b56` | PASS |
| Design/result files are valid UTF-8 | PASS |
| Credential-bearing URI pattern found | NONE |
| DB/query/migration/role/permission/chmod/secret/runtime action | NOT PERFORMED |
| Admin or Phase 2A execution launcher | NOT CREATED |

## Patch Presence Validation

- P-1: PUBLIC is treated as an effective privilege; default TEMP/CONNECT and
  public-schema CREATE are documented; residual paths STOP for a separate
  reviewed Leo/GPT decision; no broad revoke is auto-selected.
- P-2: password literal was removed from the inert role-creation template;
  no-echo client-side SCRAM and history/log evidence requirements were added.
- P-3: inline literal, argv URL, echo/xtrace, persistence, child inheritance, and
  same-user/root process-environment paths are addressed with mitigation or STOP.
- `NOINHERIT` is required and `catalog_read_verified` exists.
- Document status is
  `DESIGN_DRAFT_PATCHED_AFTER_FABLE5_NEEDS_PATCH_PENDING_REREVIEW`.

## Independent Re-Review Questions

Advisor confirms that the requested mechanisms are present; it does not establish
their PostgreSQL or credential-handling correctness. The same Fable5 session must
decide:

1. Does P-1 provide a feasible and non-automatic route for effective PUBLIC TEMP,
   unintended other-database CONNECT, and public-schema CREATE without hiding the
   blast radius or weakening the original boundary?
2. Is option (d), which narrows the no-write claim while accepting temp-namespace
   residue, clearly an explicit Leo/GPT risk decision rather than a path to design
   or execution PASS?
3. Does P-2 correctly describe `psql \password` and `createuser --pwprompt`?
   In particular, does `createuser --pwprompt` conflict with the stated separation
   of role creation and credential setting, and can either path expose a sensitive
   verifier through server logging?
4. Are raw password, SCRAM verifier, SQL text, shell/psql history, argv, process,
   and server-log paths all blocked or converted into explicit STOP evidence?
5. Does P-3 provide a usable injection contract that avoids history/argv/echo and
   handles `/proc` environment visibility, child inheritance, lifetime, and
   cleanup without constructing an execution prompt?
6. Do the new evidence booleans and approval fields remain count/boolean/status
   only and keep every admin action separately gated?

## Routing Decision

Route to the **same existing Fable5 Reviewer session** for `DESIGN_REVIEW`
re-review. Do not create a new review session. Do not route to Leo/GPT unless the
verdict is `PASS_WITH_RISK`, `FAIL`, or requires an authority decision.

