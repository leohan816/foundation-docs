# Final Independent Review Handoff — O1 Browser Non-Production Runtime

```text
MISSION_ID: COSMILE_O1_BROWSER_NONPROD_RUNTIME_INTEGRATION_AND_VERIFICATION_V1
HANDOFF_TYPE: FINAL_INDEPENDENT_IMPLEMENTATION_REVIEW
FROM: foundation-advisor
TO: foundation-reviewer-fable5
RETURN_TO: foundation-advisor
REVIEW_TIER: HARD_IMPORTANT_SAFETY
REVIEW_TIER_RATIONALE: final bounded subject includes Google identity ownership,
  operator authorization and step-up, Toss TEST capture/refund, inventory and cart
  state integrity, customer projection, PII hygiene, and replay/idempotency.
REQUIRED_MODEL: Fable 5
REQUIRED_EFFORT: max
REQUIRED_SKILL: /fable-sentinel
PATCH_AUTHORITY: NONE
DELTA_ONLY_VERIFICATION: REQUIRED
FULL_REPOSITORY_OR_FULL_SUITE: PROHIBITED
```

## 1. Current role authority

Before reviewing, read:

- `/home/leo/Project/agent-office/docs/agent/TEAM_OPERATING_MODEL.md`
- `/home/leo/Project/agent-office/docs/agent/roles/README.md`
- `/home/leo/Project/agent-office/docs/agent/roles/reviewer.md`
- `/home/leo/Project/Cosmile/AGENTS.md`
- `/home/leo/Project/Cosmile/CLAUDE.md`

Use `/fable-sentinel`. Record the actual live model, effort, CWD, session,
skill, independence, and absence of overlapping review. Agent Office
`docs/agent` is current role authority; historical foundation-docs role text is
not.

## 2. Exact subject

```text
PRODUCT_REPOSITORY: /home/leo/Project/Cosmile
PRODUCT_WORKTREE: /home/leo/Project/.worktrees/Cosmile/COSMILE_O1_BROWSER_NONPROD_RUNTIME_INTEGRATION_AND_VERIFICATION_V1
PRODUCT_BRANCH: implementation/cosmile-o1-browser-nonprod-runtime-v1-20260718
PREDECESSOR_REVIEWED_HEAD: 00feea3193a946963b15ded90d062db0ce1fdda1
FINAL_CANDIDATE_HEAD: 94693d26cec3c2e9ac830e9d2c2f6235dcf4c011
UPSTREAM: origin/implementation/cosmile-o1-browser-nonprod-runtime-v1-20260718
EXPECTED_AHEAD_BEHIND: 0/0
EXPECTED_TREE: CLEAN
```

The full credential-independent candidate through `00feea3` already received
independent PASS. Review only the exact `00feea3..94693d2` delta, its interaction
with the predecessor-reviewed seams, and the official-provider/browser evidence
now used to raise the claim ceiling.

Delta commits, in order:

1. `d5c762fcf4029f7027daad02a18ffae43e62e5ab`
2. `62c468e9906acac0a6f61a9ca4f7108e790c4d06`
3. `a010f143a1d8c8223c37ad6d52702ba66fb3fdea`
4. `64d9fd99bdab58cc65d26b8a5bcc0734b7411fa`
5. `5cf5f0aa21c21da1441c9baa66b751c59be88f0f`
6. `2170fffee33c8e95d81755cb3a7551abc4a0f500`
7. `72166d33a786e607e64a1dc48bc5a8b693205312`
8. `44a06aed32b6812f86951ae18b58af040fd12b32`
9. `22373a02ad8fa89d8fc48dc53baf7be1101040cb`
10. `086603a85e2f1f21cbea8515644352c7c8835537`
11. `5549f236ca2e14d0dc8937c1670a17f0b48bebe0`
12. `94693d26cec3c2e9ac830e9d2c2f6235dcf4c011`

Exact changed paths in that range:

- `app/.env.example`
- `app/next.config.ts`
- `app/scripts/o1_browser_golden_order.playwright.mjs`
- `app/scripts/o1_browser_runtime_contract.vitest.ts`
- `app/scripts/o1_browser_runtime_property.vitest.ts`
- `app/scripts/o1_nonprod_fixture_setup.vitest.ts`
- `app/src/app/api/auth/google/callback/route.ts`
- `app/src/app/api/o1/checkout/toss/fail/route.ts`
- `app/src/app/api/o1/checkout/toss/success/route.ts`
- `app/src/app/api/o1/operator/orders/[orderId]/refund/route.ts`
- `app/src/app/api/preview/access/route.ts` (deleted)
- `app/src/app/orders/[orderId]/page.tsx`
- `app/src/app/preview/page.tsx` (deleted)
- `app/src/components/commerce/O1OrderStatus.tsx`
- `app/src/components/commerce/O1TossCheckout.tsx`
- `app/src/lib/auth/o1PreviewAccess.ts` (deleted)
- `app/src/lib/cart.ts`
- `app/src/lib/runtime/o1CommerceRuntime.ts`
- `app/src/lib/runtime/publicOrigin.ts` (added)
- `app/src/middleware.ts`

No path outside this list may be treated as a new mission delta. Load-bearing
predecessor code may be read only to understand an interface or invariant.

## 3. Pinned review context

Read directly from the foundation-docs mission worktree:

- `runs/shared/COSMILE_O1_BROWSER_NONPROD_RUNTIME_INTEGRATION_AND_VERIFICATION_V1/20_INDEPENDENT_CANDIDATE_REVIEW.md`
- `runs/shared/COSMILE_O1_BROWSER_NONPROD_RUNTIME_INTEGRATION_AND_VERIFICATION_V1/34_PREVIEW_HYDRATION_FIX_DELTA_REVIEW.md`
- `advisor/jobs/COSMILE_O1_BROWSER_NONPROD_RUNTIME_INTEGRATION_AND_VERIFICATION_V1/00_ADMISSION_AND_AUTHORITY_RECORD.md`
- `advisor/jobs/COSMILE_O1_BROWSER_NONPROD_RUNTIME_INTEGRATION_AND_VERIFICATION_V1/01_SCOPE_AND_PATH_ALLOWLIST.md`
- this exact committed handoff.

The dispatch message must provide this handoff's exact commit, blob, and
SHA-256. Verify them before reviewing.

## 4. Accepted categorical human evidence

Leo directly supplied the following categorical evidence. Do not request or
recover any identifier, order number, tracking value, subject, email, token,
cookie, payment key, provider body, PII, or secret. Treat human evidence as a
declared input, then test its consistency against durable state and source:

- official Google customer login completed with a dedicated test identity;
- official Google operator login completed with a distinct allowlisted test identity;
- `GOLDEN_ORDER_COMPLETE` — Toss TEST UI completed and order was confirmed;
- `CART_EMPTY_AND_ORDER_DETAIL_OK` — purchased line cleared and stable detail rendered;
- `OPERATOR_LIST_OK` — operator console exposed the bounded order controls;
- `REFUND_OK` — one full Toss TEST refund completed; browser stated inventory remained committed;
- `CUSTOMER_REFUND_VIEW_OK` — customer history count was one and stable detail showed
  completed payment, shipped state, full-refund state, purchase time, product line,
  quantity, and amount.

An earlier `ORDER_HISTORY_EMPTY` report is superseded by the later direct
`CUSTOMER_REFUND_VIEW_OK`. No history instrumentation was implemented: product
source, runtime configuration, tests, and artifacts remained unchanged.

## 5. Durable categorical evidence to verify directly

Use read-only categorical queries through the existing isolated mission runtime
without displaying connection strings or sensitive values. Do not source or
inspect `owner.env` unless only names-only SET/MISSING status is strictly needed.
Do not issue a provider, refund, shipment, authentication, or economic request.

Expected final state:

- Refund rows: exactly 1, final status `refunded`;
- refund-type succeeded economic transaction: exactly 1;
- cancel-type transaction: 0;
- original succeeded capture: exactly 1;
- Order state: `refunded`, not `paid`;
- one `paid -> refunded` history transition;
- refund amount equals order total and original capture, currency KRW;
- committed inventory reservation: exactly 1;
- released/expired/reserved restoration effects: 0;
- shipment: exactly 1, status `shipped`, tracking nonblank (do not return value);
- reconciliation tasks: 0, because the straight-through finalization completed;
- refund-finalization audit entry: exactly 1;
- active carts: 0;
- identity/account count: 2 distinct test accounts/identities;
- customer identity is non-operator; operator identity is allowlisted;
- no second economic effect.

## 6. Required review questions

### Containment and claim

1. Is the product branch clean, upstream-equal, and exactly at the candidate?
2. Is the delta exactly the listed commits and paths, with no schema, migration,
   dependency, Foundation, SIASIU, foundation-control, live, or production change?
3. Does the evidence support only
   `REVIEWED_BROWSER_BASED_NON_PRODUCTION_GOLDEN_ORDER_AND_GOLDEN_REVERSAL_EVIDENCE`?

### Identity and authorization

4. Does Google callback origin composition preserve state/PKCE/session verification
   and return only to the configured same-site public origin?
5. Is operator authority still the immutable Google subject allowlist, never email?
6. Is step-up default-deny and bound to action/operator/role/order/reason/freshness,
   with route-boundary nonce single-use?
7. Does using two internal verifier instances prevent intra-request self-collision
   without permitting replay or weakening any binding?

### Payment, order, cart, inventory, and refund

8. Are Toss success/fail returns composed on the configured origin without making
   the browser return money truth?
9. Is the official TEST auth-simulation field bounded to TEST behavior, with live
   keys and production structurally refused?
10. Is capture/refund truth still server-confirmed and bound to internal order,
    opaque public order number, exact positive KRW amount, payment key, currency,
    and durable state?
11. Can replay produce any second capture, refund, order transition, audit effect,
    cart consumption, or inventory effect?
12. Does cart finalization consume only the purchased stable tuple exactly once,
    preserve unrelated/newer lines, and use compare-and-swap?
13. Is committed inventory coverage exact and does refund preserve HOLD with zero
    automatic sellable restoration?
14. Is full-refund-only enforced and is partial refund unreachable?
15. Does customer detail truthfully project payment/order/shipment/refund while
    exposing no internal ID, payment reference, provider body, or PII?

### Evidence and cleanup readiness

16. Do the categorical human and durable-state facts agree?
17. Were all preview-observer proposals cancelled with no product/runtime artifact?
18. Is the planned shutdown/removal limited to attributable mission-created app,
    tunnel, protected runtime directory, disposable PostgreSQL container/volume,
    and synthetic data?

## 7. Proportional verification commands

`DELTA_ONLY_VERIFICATION: REQUIRED` applies to this review.

Allowed:

- read-only Git status/log/diff/object inspection over `00feea3..94693d2`;
- read-only source and prior review/evidence inspection;
- read-only categorical queries against the isolated mission database;
- exactly this focused contract command if executable reproduction is materially
  needed: `cd app && npx vitest run scripts/o1_browser_runtime_contract.vitest.ts`.

Prohibited:

- full repository/full suite;
- build, typecheck, lint, Prisma generation, migration, dependency installation;
- browser automation, Google/Toss/provider call, refund replay, shipment mutation;
- DB writes or fixture reset;
- reading or exposing any secret/PII/identifier;
- patch, stage, commit, push, dispatch, cleanup, shutdown, or risk acceptance.

Do not rerun the focused contract file merely from habit. Run it only if direct
source/test/evidence inspection leaves a load-bearing question unresolved, and
state the exact reason. Any request for broader testing must STOP and return to
the Advisor before execution.

## 8. Required output

Write actor-authored temporary artifacts only:

```text
RESULT_TEMP_PATH:
/home/leo/Project/.mission-tmp/COSMILE_O1_BROWSER_NONPROD_RUNTIME_INTEGRATION_AND_VERIFICATION_V1/reviewer/90_FINAL_INDEPENDENT_REVIEW.md

POINTER_TEMP_PATH:
/home/leo/Project/.mission-tmp/COSMILE_O1_BROWSER_NONPROD_RUNTIME_INTEGRATION_AND_VERIFICATION_V1/reviewer/90_FINAL_INDEPENDENT_REVIEW_POINTER.md
```

Return:

- actual runtime/model/effort/skill/independence;
- handoff commit/blob/SHA-256 verification;
- exact subject and containment;
- criterion-by-criterion direct findings;
- commands actually run and why;
- categorical durable-state findings;
- human-evidence consistency and limits;
- cleanup readiness;
- residual risks/limitations;
- `VERDICT: PASS | NEEDS_PATCH | PASS_WITH_RISK | FAIL`;
- maximum supported claim and all excluded claims.

Do not patch. Return the result and pointer only to `foundation-advisor`.

```text
HARD_STOP_BEFORE_CONTROLLED_LIVE: ACTIVE
CONTROLLED_LIVE: NOT_AUTHORIZED
PAID_BETA: NOT_AUTHORIZED
PUBLIC_LAUNCH: NOT_AUTHORIZED
AUTOMATIC_NEXT_MISSION: NO
```
