# M2 E6 — CHECKOUT TEST-SEAM CLARIFICATION

Status: **AUTHORIZED CLARIFICATION / RESUME HANDOFF 57**

This clarification supersedes only handoff 57's sentence limiting the injected test seam to order persistence.

Within the same two product paths, the Worker may expose one in-module checkout-start factory/seam covering only the
load-bearing collaborators needed by the focused pure test:

- server catalog-item resolution;
- deterministic order load/create;
- inventory reservation;
- payment-intent creation.

The exported production `startO1Checkout` must remain permanently bound to the exact existing real collaborators.
Neither route input nor environment may select or alter the seam. No alternate production path, authorization bypass,
provider substitution, economic behavior, or outcome weakening is allowed.

The focused test may instantiate the factory with in-memory fakes and count only successful state effects. It must
prove sequential and concurrent exact replay converge to one order, one active reservation, one intent, and zero
provider/economic effect. Existing separately reviewed inventory and payment semantics remain unchanged; this mission
only supplies their same-order inputs through the reused order id.

All other handoff 57 pins, path ceiling, RED/GREEN command, legacy-row preservation, completion files, STOP conditions,
and prohibitions remain unchanged. No DB test or DB action is authorized.
