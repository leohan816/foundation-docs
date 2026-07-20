# R3/R4 Replacement READY Safety Correction — Cosmile Worker

MISSION_ID: `COSMILE_O1_TOSS_RELIABILITY_RUNTIME_VERIFICATION_V1`
BASE_HANDOFF: `40_` at docs `e7829b139295f8fbc005b667da531406f6ed5291`
PRODUCT_HEAD: `824b41751238390b8baf54a3be68ee82a4d5823f`
ACTOR: same `cosmile:0.0` / Opus 4.8 / xhigh / exact mission CWD
SKILL: `/fable-builder`; existing loaded implementation/test references remain applicable.
PROVIDER_CONTACT: `PROHIBITED_DURING_THIS_CORRECTION`

Advisor directly reviewed the complete frozen driver and the existing product refund/capture lanes. Product source proves deterministic capture key `o1cik_<orderId>`, deterministic refund key `o1rk_<orderId>`, and creation/reuse of the durable Refund row before the provider full-cancel call. No product defect or semantic change is authorized.

Correct only the existing temporary driver:
`app/scripts/tmp/cosmile-o1-r3r4-replacement/r3r4_one_replacement_provider.vitest.ts`

Add one protected failure-recovery artifact path:
`/home/leo/Project/.mission-tmp/COSMILE_O1_TOSS_RELIABILITY_RUNTIME_VERIFICATION_V1/r3r4-replacement/correlation/recovery.pgcustom`
It is mission-local synthetic disposable-DB recovery evidence, not a product artifact: regular non-symlink `leo:leo 0600`, never printed/hashed/copied/documented, and removed after terminal convergence. No other path is allowed.

Required exact corrections:

1. Pre-contact `recoveryCategoricalOk` must require the exact pre-contact key set, not merely required-key presence.
2. Before the refund HTTP call, persist `expectedRefundIdemKey` and `refundAuthorityRowObserved=false`; do not label or treat the expected tuple as durable authorization. The existing product service remains the only creator/verifier of the Refund-row authority.
3. After a successful refund route result, directly confirm exactly one matching non-failed durable Refund row before marking `refundAuthorityRowObserved=true`; no identifier is emitted.
4. Assert the captured transaction provider reference equals the intercepted provider key and captured amount equals the checkout amount.
5. For DONE, CANCELED, and terminal provider queries, assert the complete in-memory binding: payment key, merchant order number, positive KRW amount, currency, expected status, and expected balance; require non-null cancel transaction evidence on the CANCELED query. Emit no value.
6. Preserve the primary thrown failure even if writing the categorical failure marker itself fails; the last pre-action stage must remain the fallback evidence.
7. On any nonterminal failure after `replacementWindowStarted=true`, stop app/browser first, then while the disposable DB is still available create `recovery.pgcustom` with exactly one local `pg_dump -Fc` from that mission DB. Open the destination owner-only at 0600, route dump stdout only to that fd and stderr to `/dev/null`, fsync file+directory, and verify categorically regular/non-symlink/0600/nonempty. Then remove the container and all non-recovery runtime artifacts. Preserve only `recovery.json`, `recovery.pgcustom`, and `stage.jsonl` under the 0700 recovery root for a later query-only/idempotent recovery; report no values.
8. If failure occurs before the single-use fence becomes true, provider effect is structurally zero: remove disposable DB/runtime artifacts but retain `stage.jsonl` only until the Worker orchestrator captures its categorical evidence; then remove the entire replacement root.
9. On terminal convergence, do not create a dump; delete recovery correlation and retain `stage.jsonl` only until the Worker orchestrator captures categorical evidence; then remove the entire protected root. Complete deterministic cleanup remains mandatory.
10. Durable-store equality failure must append a categorical failure stage before producing HOLD.

Static inspection only. Do not execute Vitest, DB, app, browser, SDK, provider, query, refund, HTTP, build, typecheck, install, generate, or any test. No product/tracked write. Preserve `56_`/`57_`, `58_`/`59_`, and product HEAD.

Return a corrected `READY_TO_PROVIDER` containing only: exact temp delta, tuple assertions, durable-authority handling, dump-on-nonterminal behavior, cleanup matrix, Git state, and STOP. Advisor will re-read the full driver before any provider resume.
