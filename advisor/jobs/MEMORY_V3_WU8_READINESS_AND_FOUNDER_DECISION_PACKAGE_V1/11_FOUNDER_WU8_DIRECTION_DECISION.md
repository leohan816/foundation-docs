# FOUNDER_MEMORY_V3_WU8_DIRECTION_DECISION

```text
D8-1_SELECTED: D8-1-A
D8-2_SELECTED: D8-2-A
D8-3_SELECTED: D8-3-B_DESIGN_DIRECTION_ONLY
D8-4_SELECTED: D8-4-A
D8-5_SELECTED: D8-5-A
```

Authorize preparation of the minimum coherent WU8
implementation-ready design and independent design review only.

This decision authorizes design, not implementation.

The WU8 design must preserve:

- infrastructure/gateway-owned authentication;
- concrete authenticity mechanism remains Security-gated;
- Cosmile remains the current-consent authority;
- current consent is verified at intake and every later transition;
- unavailable or unverifiable consent fails closed;
- bounded non-prod outbox-to-ingress pipeline as design direction only;
- at-least-once delivery, idempotent Foundation commit,
  per-root ordering, bounded retry, category-only dead-letter,
  backpressure, rollback, and kill switch must be designed;
- WU8 stops at durable accepted-evidence records
  and review-only candidate drafts;
- no current MemoryCandidate or SharedMemoryStore bridge;
- adverse policy remains UNCONFIGURED;
- skin_reaction and other adverse evidence remain rejected;
- guest and anonymous cross-service evidence remain forbidden.

NOT AUTHORIZED:

- WU8 implementation;
- sender, consumer, endpoint, network, broker, or delivery;
- activated Foundation intake;
- DB, schema, or migration;
- secrets or credential implementation;
- durable/current MemoryCandidate runtime;
- approval, reuse, promotion, ranking, or safety mutation;
- production/live;
- Full Package 1B;
- M3.

After the WU8 design and independent design review,
return to Leo/GPT and activate HARD STOP.
No implementation may begin without a new explicit Founder approval.
