# Independent Candidate Review Handoff

```text
MISSION_ID: COSMILE_O1_BROWSER_NONPROD_RUNTIME_INTEGRATION_AND_VERIFICATION_V1
REVIEW_PHASE: CREDENTIAL_INDEPENDENT_IMPLEMENTATION_CANDIDATE
RESPONSIBLE_ADVISOR: foundation-advisor
REVIEWER_ACTOR: foundation-reviewer-fable5
REQUIRED_ROLE: independent Foundation Reviewer
REQUIRED_MODEL: Fable 5 family
REQUIRED_EFFORT: max
REQUIRED_SKILL: /fable-sentinel
PATCH_AUTHORITY: NONE
```

## Exact review subject

```text
REPOSITORY: /home/leo/Project/Cosmile
WORKTREE: /home/leo/Project/.worktrees/Cosmile/COSMILE_O1_BROWSER_NONPROD_RUNTIME_INTEGRATION_AND_VERIFICATION_V1
BRANCH: implementation/cosmile-o1-browser-nonprod-runtime-v1-20260718
BASE_HEAD: 63fdd2d507357861aec582b980006baa7d7045a4
INITIAL_CANDIDATE_HEAD: 6a3b71856f6db0b75e4193f594d23cf0e82512b2
FINAL_CANDIDATE_HEAD: 00feea3193a946963b15ded90d062db0ce1fdda1
CORRECTION_2_DELTA: 6a3b71856f6db0b75e4193f594d23cf0e82512b2..00feea3193a946963b15ded90d062db0ce1fdda1
CANDIDATE_PUSHED: NO
CANDIDATE_WORKTREE_EXPECTED_STATUS: CLEAN
```

Review the full base-to-final candidate first. The declared correction-2 delta
is additional focus, not a substitute for the full review.

## Committed authority and evidence anchors

```text
FOUNDATION_DOCS_REPOSITORY: /home/leo/Project/.worktrees/foundation-docs/COSMILE_O1_BROWSER_NONPROD_RUNTIME_INTEGRATION_AND_VERIFICATION_V1
FOUNDATION_DOCS_BRANCH: advisor/cosmile-o1-browser-nonprod-runtime-v1-20260718
FOUNDATION_DOCS_EVIDENCE_COMMIT: cadb51e0d53183d8e1cba9129963aa4e1b361f70

ADMISSION: advisor/jobs/COSMILE_O1_BROWSER_NONPROD_RUNTIME_INTEGRATION_AND_VERIFICATION_V1/00_ADMISSION_AND_AUTHORITY_RECORD.md
ALLOWLIST: advisor/jobs/COSMILE_O1_BROWSER_NONPROD_RUNTIME_INTEGRATION_AND_VERIFICATION_V1/01_SCOPE_AND_PATH_ALLOWLIST.md
WORKER_HANDOFF: advisor/jobs/COSMILE_O1_BROWSER_NONPROD_RUNTIME_INTEGRATION_AND_VERIFICATION_V1/10_COSMILE_RUNTIME_INTEGRATION_HANDOFF.md
CREDENTIAL_CHECKLIST: advisor/jobs/COSMILE_O1_BROWSER_NONPROD_RUNTIME_INTEGRATION_AND_VERIFICATION_V1/11_CREDENTIAL_NAMES_ONLY_CHECKLIST.md
TYPECHECK_CORRECTION: advisor/jobs/COSMILE_O1_BROWSER_NONPROD_RUNTIME_INTEGRATION_AND_VERIFICATION_V1/02_SCOPE_ALLOWLIST_CORRECTION_1.md
FIXTURE_CORRECTION: advisor/jobs/COSMILE_O1_BROWSER_NONPROD_RUNTIME_INTEGRATION_AND_VERIFICATION_V1/03_SCOPE_ALLOWLIST_CORRECTION_2.md
FOUNDER_REUSE_CHECK: advisor/jobs/COSMILE_O1_BROWSER_NONPROD_RUNTIME_INTEGRATION_AND_VERIFICATION_V1/04_FOUNDER_BOUNDED_OPERATOR_REUSE_CHECK.md

WORKER_RESULT: runs/shared/COSMILE_O1_BROWSER_NONPROD_RUNTIME_INTEGRATION_AND_VERIFICATION_V1/10_COSMILE_RUNTIME_INTEGRATION_RESULT.md
WORKER_RESULT_BLOB: dd577477eb437f71aeadc76b737637c3647f3a5d
WORKER_RESULT_SHA256: e3f546a2bb81f4c662d870f7872956aaab06f371805c03112ce859221a784330
WORKER_POINTER: runs/shared/COSMILE_O1_BROWSER_NONPROD_RUNTIME_INTEGRATION_AND_VERIFICATION_V1/10_COSMILE_RUNTIME_INTEGRATION_POINTER.md
WORKER_POINTER_BLOB: fb24768d83a31cc3d96767fd4469d95130af0b19
WORKER_POINTER_SHA256: 3d70232eb8edcf5c10f5fc5cf06bf2fc9a7d09129d2fa7370f0af20209009ec9
```

Read the current Agent Office operating model and Reviewer role from
`/home/leo/Project/agent-office/docs/agent/` before reviewing. Foundation-docs
contains mission evidence, not current role authority.

## Required direct review

Distrust the Worker and Advisor summaries until direct evidence confirms them.
At minimum verify:

### Repository and containment

- exact repository, worktree, branch, base, parent chain, candidate HEAD, and
  clean state;
- every changed path is within the original allowlist plus the two committed
  corrections;
- no schema, migration, package, lockfile, Foundation, SIASIU,
  foundation-control, protected-branch, or production change;
- no secret, credential value, PII, raw provider payload, payment key, internal
  identifier, or sensitive header in code examples, logs, fixtures, outputs,
  screenshots, errors, audits, or committed evidence;
- the candidate is default OFF and structurally refuses production.

### Identity, access, and preview

- Google remains the only OIDC provider and the existing WU-A route retains
  state, nonce, PKCE, token/JWKS/claim verification and exact redirect binding;
- guest/mock identity cannot enter the O1 checkout;
- operator authority derives from the verified immutable Google issuer/subject,
  not email, username, display name, session ID, or a caller value;
- customer and operator identities can be separate and the allowlist defaults
  to deny;
- test-only step-up is clearly non-production, action-bound, order-scope-bound,
  single-use, and default deny, with no claim of MFA or production suitability;
- the preview application gate denies a general request before any tunnel;
  exemptions are the minimum exact callback/access paths and each exempt route
  independently fails closed;
- preview secret/cookie handling does not expose the raw secret and uses an
  appropriate secure cookie on the TLS preview.

### Catalog, price, inventory, order, and refund

- only snapshot-eligible synthetic ELT evidence appears in O1 catalog and
  product-detail routes; non-eligible direct requests fail closed and never
  fall through to legacy mock catalog;
- the local Foundation bundle is verified through the reviewed canonical
  serializer/importer/binder and never becomes a synchronous Foundation
  dependency;
- Cosmile remains the single positive-integer KRW price authority;
- all cart lines are server-revalidated and complete inventory reservation
  succeeds before any provider call;
- oversell defaults to deny and no error/browser callback releases a possibly
  captured reservation incorrectly;
- internal order, payment, capture, customer, and provider references are not
  exposed where an opaque public order reference or bounded projection is
  required;
- general browser return and webhook input are never money truth;
- Toss confirmation/query results are bound to the durable internal order,
  exact positive-integer KRW amount, payment key, currency, and current state;
- general-payment webhook has no invented signature and remains an untrusted
  notification until server pull verification;
- idempotency, replay, timeout, HOLD, recovery, and zero duplicate economic
  effect remain intact;
- refund is full-capture only; no `cancelAmount`; inventory remains committed
  or HOLD and never auto-restocks;
- record-only shipment/tracking makes no carrier or delivery claim;
- customer/operator projections are bounded and do not leak raw rows or PII.

### Founder reuse disposition

Directly inspect the existing admin/operator/dashboard evidence cited by the
Worker. Verify whether preserving the minimal O1 operator surface is correct.
Confirm that no safe exact/bounded reuse was missed and that the result neither
adds advanced-dashboard scope nor silently changes the legacy console.

### Tests, build, fixture bridge, and evidence honesty

- correction 1 is limited to the 19 predecessor TypeScript diagnostics and is
  behavior-preserving;
- correction 2 is only an explicit one-shot Vitest bridge over the existing
  canonical builder, creates no product/runtime fixture endpoint, imports
  nothing runtime-related when inactive, and fails closed for production,
  non-loopback DB targets, and unsafe bundle roots;
- directly rerun or otherwise independently validate, without credentials or
  external provider access:
  - Prisma generate containment;
  - `npx tsc --noEmit --pretty false`;
  - focused contract/property/fixture suites;
  - full Vitest suite;
  - non-production build;
  - disposable PostgreSQL test and cleanup;
  - one-shot canonical fixture seed/import/binding and cleanup;
- distinguish PASS, SKIP, NOT_RUN, deterministic local substitute, disposable
  DB, browser, and official-provider evidence precisely;
- do not accept browser, Google, Toss, tunnel, or official-provider claims in
  this phase; those gates remain NOT_RUN.

## Runtime safety for reviewer reruns

- no credential or existing `.env.local` value may be read or printed;
- no external provider request or tunnel;
- no production/shared database or real data;
- use only already-local dependencies, browser binaries, and container image;
- disposable DB must be unique, loopback-only, synthetic, and removed;
- record pre/post Git status; do not repair or clean the product tree;
- no patch, stage, commit, push, amend, rebase, merge, or force-push.

## Result contract

Write only:

```text
TEMP_RESULT: /home/leo/Project/.mission-tmp/COSMILE_O1_BROWSER_NONPROD_RUNTIME_INTEGRATION_AND_VERIFICATION_V1/reviewer/20_INDEPENDENT_CANDIDATE_REVIEW.md
TEMP_POINTER: /home/leo/Project/.mission-tmp/COSMILE_O1_BROWSER_NONPROD_RUNTIME_INTEGRATION_AND_VERIFICATION_V1/reviewer/20_INDEPENDENT_CANDIDATE_REVIEW_POINTER.md
FINAL_RESULT: runs/shared/COSMILE_O1_BROWSER_NONPROD_RUNTIME_INTEGRATION_AND_VERIFICATION_V1/20_INDEPENDENT_CANDIDATE_REVIEW.md
FINAL_POINTER: runs/shared/COSMILE_O1_BROWSER_NONPROD_RUNTIME_INTEGRATION_AND_VERIFICATION_V1/20_INDEPENDENT_CANDIDATE_REVIEW_POINTER.md
```

Verdict:

```text
PASS
PASS_WITH_RISK
NEEDS_PATCH
FAIL
```

On `NEEDS_PATCH`, name exact finding IDs, severity, paths/lines, evidence,
required bounded behavior, and whether the correction fits the combined
allowlist. Do not patch. Return only to `foundation-advisor`.

```text
MAXIMUM_ACCEPTABLE_PHASE_CLAIM:
REVIEWED_CREDENTIAL_INDEPENDENT_NON_PRODUCTION_BROWSER_RUNTIME_CANDIDATE

BROWSER_GOLDEN_ORDER: NOT_RUN
BROWSER_GOLDEN_REVERSAL: NOT_RUN
OFFICIAL_GOOGLE_EXECUTION: NOT_RUN
OFFICIAL_TOSS_EXECUTION: NOT_RUN
TUNNEL: NOT_STARTED
CONTROLLED_LIVE: NOT_AUTHORIZED
PAID_BETA: NOT_AUTHORIZED
PUBLIC_LAUNCH: NOT_AUTHORIZED
HARD_STOP_BEFORE_CONTROLLED_LIVE: ACTIVE
```
