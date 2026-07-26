# M2 E6 — ADVISOR POINTER

- Status: `PASS_CODE / CHECKOUT_RETRY_HOLD`
- Gate: `63_ADVISOR_M2_E6_CHECKOUT_IDEMPOTENCY_GATE.md`
- Product: `4dd56c12c72a4e6921295ab26910fbc8abff2526`
- Worker correction evidence: docs `da7e9a4`, files `61`/`62`.
- Focused evidence: RED `5 failed / 4 passed` → identical GREEN `9 passed`.
- Replay: one `ready`; all exact replays `pending_replay` → category-only 409.
- Effects: one order/reservation/intent/idempotency key; provider/economic effect `0`.
- Preserved legacy state: two pending orders plus two reserved holds, untouched and not automatically canonicalized.
- Positive invariant: customer and Dashboard pending projections agree; payment remains unproven.
- Multi-product blocker: open and unchanged.
- Next: no checkout retry; final fresh-context Fable 5/max safety review remains required before mission closure.
