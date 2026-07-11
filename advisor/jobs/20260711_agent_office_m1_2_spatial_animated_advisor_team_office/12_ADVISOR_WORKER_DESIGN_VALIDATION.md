# Advisor Validation: Agent Office M1.2 Worker Design

Status: `PASS_TO_FABLE5_WITH_EXPLICIT_CHALLENGE`

## Verified Target

- Base: `2f663304a88c432f19fe56055641b66e57f18ef2`
- Candidate: `3ba65e0092a7c0cebf546c6baecf5bb007314897`
- Branch: `shadow/agent-office-m1-2-spatial-office`
- Upstream: exact equality, left/right `0/0`
- Worktree: clean
- Delta: five authorized documentation paths, 2,056 additions, zero runtime,
  source, test, config, dependency, lockfile, asset, auth, transport, or
  authority paths
- Foundation-docs result: `d3be3cb3d42839f286feba4d768b33f8e717a19b`
- Foundation-docs pointer: `90d2820c74e18ae02113eb3d5de73b073197beb9`

## Direct Validation

- `git diff --check`: pass.
- Exact changed path count: 5; unexpected paths: 0.
- Local Markdown links: 28; missing targets: 0.
- Frozen unknowns `AO12-U01` through `AO12-U14`: present in the master design
  and implementation traceability.
- Proposed implementation WorkUnits `AO12-IWU-01` through `AO12-IWU-14`:
  present and explicitly `NOT_STARTED_NOT_AUTHORIZED`.
- M1 compatibility, stale/offline suppression, reduced-motion equivalence,
  responsive semantics, asset gate, Channy gate, and no-authority-change rules
  are materially present.
- No implementation, server, asset, DB, secret, network, or runtime claim was
  accepted as evidence.

## Explicit Review Challenge `A-V1`

The frozen safe default requires exactly one responsible Advisor role instance
per Team Pod. The candidate additionally fixes one global Advisor character and,
in several places, one global canonical Advisor identity for the whole office.
It also acknowledges a future configuration with multiple Advisor role
instances but does not define how those distinct responsible Advisors are
represented without collapsing them into one character.

Fable5 must decide whether this is:

1. a valid initial single-Advisor projection that remains additively extensible;
2. an internal contradiction requiring a patch to render one Advisor identity
   per Team Pod while keeping exactly one responsible Advisor in each team; or
3. a material product interpretation that must return to Leo/GPT.

The Reviewer must use the original mission terms, actual M1 authority model, and
the candidate text. Advisor does not silently choose or patch this point before
independent review.

## Routing Verdict

The package is complete enough for independent Level-3 review. This validation
is not a design approval. Implementation remains `NOT_STARTED_NOT_APPROVED`.
