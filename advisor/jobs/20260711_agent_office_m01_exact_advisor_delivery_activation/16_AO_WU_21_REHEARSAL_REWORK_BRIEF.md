# AO-WU-21 Rehearsal Rework Brief

STATUS: `PATCHABLE_IMPLEMENTATION_DEFECT__WORKER_REWORK_REQUIRED`

## Finding

The actual AO-WU-21 rehearsal reached the immutable Advisor decision stage and
exposed a false-positive history conflict in
`NodeExactGitAuthorityReader.pathHistory`.

The reader currently invokes:

```text
git log --format=%H --follow -- <relative evidence path>
```

For two different message directories that both contain a newly added
`03_DECISION.json`, Git rename/copy similarity heuristics may follow the newer
path into the older message path. The observer then receives two commits and
rejects the new one with `new Advisor evidence must be one immutable Git
addition`, even though the exact path itself was added once and never rewritten.

Direct reproduction from the rehearsal:

```text
git log --format=%H --follow -- \
  advisor/jobs/20260711_agent_office_m01_exact_advisor_delivery_activation/\
advisor-evidence/019f51d0-5252-7cd2-8326-657a923df180/03_DECISION.json
```

returned both the exact-path addition `d086978...` and the unrelated older
message decision `5e71e4f...`. The same command without `--follow` returns only
the exact path addition.

## Classification

- Type: `CODE_DEFECT`
- Severity: high for AO-WU-21 completion, fail-closed in effect
- Security consequence observed: no unauthorized decision or resume was applied
- Transport consequence observed: no duplicate paste or execution
- Product-policy consequence: none

## Required patch

1. Make exact-path immutability history inspection stay on the exact relative
   path. It must not follow rename/copy similarity into another evidence path.
2. Preserve the requirement that a new Advisor evidence path has exactly one
   committed history entry and that later rewrite/removal remains rejected.
3. Add a regression test with two distinct message directories containing
   similar or structurally identical `03_DECISION.json` files. Each exact path
   must remain independently admissible when added once.
4. Retain tests for rewrite, removal, dirty-path, ancestry, and ordering
   rejection.
5. Update as-built documentation only if its current wording becomes stale.

## Allowed scope

- Agent Office exact Git authority reader
- directly related tests
- directly affected as-built documentation
- Agent Office commit/push on `shadow/agent-office-m01`
- Worker result and pointer in foundation-docs

## Forbidden scope

- no actual server or tmux mutation
- no readiness lease or delivery capability creation
- no browser dispatch
- no DB, secret, production, public, remote, or Hermes work
- no authority expansion or product decision
- no unrelated refactor

## Required verification

- focused exact-delivery and evidence-ingress tests
- full lint, typecheck, test, and build gates
- exact diff and branch/upstream evidence
- confirm no runtime process or real tmux input was used

RETURN_TO: Advisor
