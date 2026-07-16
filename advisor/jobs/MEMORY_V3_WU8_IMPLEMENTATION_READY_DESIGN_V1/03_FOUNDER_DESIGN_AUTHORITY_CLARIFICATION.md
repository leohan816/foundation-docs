# WU8_DESIGN_AUTHORITY_CLARIFICATION

This clarification does not expand the approved mission authority.
It only resolves ambiguity between design authority and implementation authority.

The existing exclusions must be interpreted as follows:

## NOT AUTHORIZED TO IMPLEMENT, DEPLOY, ACCESS, EXECUTE, OR ACTIVATE

- sender, consumer, endpoint, network, broker, or delivery implementation;
- any real network connection or delivery execution;
- DB connection or access;
- schema or migration implementation, application, rehearsal, or deployment;
- secrets, credentials, authentication mechanism implementation;
- activated Foundation intake;
- durable candidate runtime or real-user behavior.

## DESIGN-ONLY AUTHORITY INCLUDES

- sender / consumer / ingress topology and ownership design;
- transport-neutral protocol and delivery-semantics design;
- bounded retry, ordering, dead-letter, backpressure,
  idempotency, rollback, and kill-switch design;
- durable data model, schema, uniqueness, transaction,
  migration, rollback, retention, and cleanup design only;
- exact file and future WorkUnit planning needed to make
  a later implementation handoff reviewable.

## IMPLEMENTATION_READY_QUALIFIER

The design may be implementation-ready for:

- application contracts;
- delivery semantics;
- durable data model;
- schema and migration plan;
- local/non-prod topology;
- rollback and verification strategy.

It must not claim Security-authentication implementation readiness
until the concrete infrastructure/gateway authenticity mechanism
is separately selected and approved by Security authority.

The Designer may define:

- the required authenticated-ingress principal contract;
- the opaque attestation/verdict interface;
- required bindings, failure states, and Security decision gates.

The Designer must not select or invent:

- mTLS;
- signing keys;
- tokens;
- certificates;
- credential custody;
- rotation policy;
- any other concrete authenticity mechanism.

Record this clarification as a current mission artifact
and include it in the Designer and independent Reviewer handoffs.

Continue only through:

```text
Control contract
→ Designer implementation-ready design
→ independent design review
→ Advisor final audit
→ HARD STOP.
```

No product implementation or product-repository write is authorized.
