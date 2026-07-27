POINTER BLOCK
RESULT_WRITTEN
TARGET_PROJECT: cosmile
ROLE_ACTOR: Worker
RESULT_FILE: ../foundation-docs/advisor/jobs/COSMILE_MULTI_PRODUCT_STOREFRONT_GOLDEN_PATH_V1/236_WORKER_ORDER_DETAIL_LINE_PRESENTATION_RESULT.md
POINTER_FILE: ../foundation-docs/advisor/jobs/COSMILE_MULTI_PRODUCT_STOREFRONT_GOLDEN_PATH_V1/237_WORKER_ORDER_DETAIL_LINE_PRESENTATION_POINTER.md
FOUNDATION_DOCS_COMMIT: bbad83eef8257793abff5d78c9144ac62d0f82ac (correction 234) — 236/237 written UNCOMMITTED per instruction
RUNTIME_REPO: ../Cosmile
RUNTIME_COMMIT_STATUS: not committed (HEAD 52343f5c6633558ac6ec489b201e5d7746762ab5; six-path delta in the working tree)
RETURN_TO: foundation-advisor
NEXT_ACTOR: foundation-advisor

## Status

**HOLD** — the frozen contract is fully implemented and every intended case passes, but the gate is not green.

- Pins verified before acting: handoff `230` sha256 `a1818f59…`, additive `232` sha256 `1429c7c9…`, correction `234`
  sha256 `75803024…`.
- GREEN attempt (identical frozen command, run once): `4 failed | 95 passed (99)`, exit `1`.
  - `o1_order_lifecycle.vitest.ts` **78/78 pass** — durable option byte-for-byte, null preserved, blank/empty option
    fails closed, exact ISO `createdAt`, null for missing/Invalid Date/string/number.
  - `o1_operator_request_detail_ui.vitest.ts` 17/21 — all card, option, image-absence and KST cases pass.
- **Blocker:** the three pre-existing route cases. Correction 1 was applied exactly (only `@/lib/operator/authorize`
  mocked) and it did fix the request-scope crash, but the route rejects the mocked authorization shape and answers
  `403 not_authorized` for every non-flag case. Establishing the shape it accepts needs `route.ts` — a seventh path
  `230` forbids, which I did not open, and I did not guess one or weaken any assertion.
- **Need exactly one:** (a) the authorized return shape as the route consumes it, (b) authorization to read that one
  route file, or (c) a disposition excluding those three pre-existing cases from this gate.
- Two declared deviations: KST rendered via the fixed +9 offset (no DST in Korea; deterministic, matches in-repo
  precedent), and one in-ceiling repair of **my own** new image oracle, whose bare `legacy` token matched the
  neighbouring action-surface comment — narrowed to the card markup, all twelve tokens retained, **not yet re-run**.
  Your inline correction on the unauthorized `not.toContain("committed")` oracle was applied as directed.
- Containment: exactly six changed paths, no seventh, no commit, no push, no build/typecheck/DB/runtime/browser/
  provider/refund/economic action. Schema 0, DB writes 0.

RETURN_TO: foundation-advisor
