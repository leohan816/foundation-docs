# Council Trigger Policy v0

```text
STATUS: PILOT_NON_CANONICAL
AUTHORITY: RECOMMENDATION_ONLY
```

Before issuing a material strategic recommendation, the Strategy Decision Architect
records:

```text
COUNCIL_DECISION: REQUIRED | NOT_REQUIRED
TRIGGERS:
RATIONALE:
```

If required, Council input must be obtained before the final strategic recommendation.
Only explicit Leo instruction may bypass a required Council review.

## HARD_TRIGGER — any one makes Council REQUIRED

- cross-project canonical ownership or boundary change;
- material product direction, release scope, or release-gate decision;
- DB/schema/migration, payment, PII, security, production, public exposure, or an
  irreversible strategic decision;
- portfolio-priority change such as Memory V3 resumption;
- conflicting evidence or Strategy confidence `LOW`;
- explicit Leo request.

## SOFT_TRIGGER — any two make Council REQUIRED

- two or more materially credible options;
- impact across multiple projects or actors;
- more than three working days of expected work;
- possible material delay to Paid Beta;
- conflict between historical documents and current Git;
- recommendation depends on material unverified assumptions.

## Council is not required for

- direct factual verification;
- branch, HEAD, commit, or file checks;
- approved low-risk execution;
- narrow reversible document corrections;
- small bug fixes;
- test-failure diagnosis;
- routine status reporting.

## Discipline

- Trigger decisions precede recommendations.
- `NOT_REQUIRED` records why no hard trigger and fewer than two soft triggers apply.
- Triggering Council does not authorize a mission; an exact brief is still required.
- Council completion does not approve implementation or Advisor dispatch.

## Specialist composition discipline

The Strategy Decision Architect selects the smallest sufficient composition. A materially
decision-relevant domain may justify selecting its Specialist:

- legal, regulatory, contractual, claims, jurisdiction, or platform policy;
- concrete threat, abuse, fraud, privilege, secret, or security-control exposure;
- interaction, comprehension, accessibility, recovery, or human-factors uncertainty;
- source, lineage, semantic, quality, integrity, retention, or stewardship dependence;
- AI behavior, routing, evaluation, nondeterminism, cost, or agent-authority dependence;
- a need to test strategic assumptions, alternatives, failure chains, or falsifiability.

A passing mention of a domain does not require all Specialists. Selection must be recorded
in the mission's exact `COUNCIL_COMPOSITION`. Unselected Specialists remain `READY_IDLE`
and receive no subject or output.
