# M2 A/B — Independent Cosmile Implementation Review Result

```text
MISSION_ID: MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1
WORK_UNIT_ID: M2-AB-COSMILE-IMPLEMENTATION-REVIEW-001
REVIEW_PASS: IMPLEMENTATION_REVIEW
ROLE: Independent Reviewer (Sentinel)
ACTUAL_ACTOR: foundation-reviewer-fable5
RESPONSIBLE_ADVISOR: foundation-advisor
RETURN_TO: foundation-advisor

VERDICT: NEEDS_PATCH
BLOCKING_FINDINGS: IR-F1 (consent-read actor broadening), IR-F2 (envelope consent
  provenance uses now/constant for pre-existing grant), IR-F3 (feedback UI
  materially incomplete vs reviewed §2.3/§3.4/§6)
NON_BLOCKING_FINDINGS: IR-N1..IR-N5 + IR-INFO1
R-Q1 / R-Q2 DESIGN RULINGS: PRESERVED in the implementation
```

## 0. Live runtime, model change, and independence (verified this pass)

- tmux (live): `session=foundation-reviewer-fable5 window=@5 pane=%5` — matches handoff.
- Workspace (cwd): `/home/leo/Project/Cosmile`. Effort: `max`. Skill: `/fable-sentinel`
  loaded; contract / safety / provenance / delta / review-classification references applied.
- **ACTUAL_MODEL: Opus 4.8 (1M context)** — recorded exactly per instruction. The session
  model was switched from Fable 5 to Opus 4.8 mid-mission because Fable 5 credits are
  exhausted; same Actor (`foundation-reviewer-fable5`), same session, same review
  conversation. This is permitted: the Reviewer is a role/authority, not a model brand
  (Agent Office `roles/reviewer.md`: "The Sentinel requirement is a role, not a specific
  model name"; V2 §13 actor/model separation). Disclosure: the two prior passes
  (DESIGN_REVIEW `481a718e`, DESIGN_DELTA_REVIEW `5ebcb39`) ran as Fable 5; this
  IMPLEMENTATION_REVIEW ran as Opus 4.8. The Worker independently disclosed the same
  Fable-5→Opus-4.8 switch in its result.
- Independence: this session authored none of the reviewed work — not the design
  (`foundation-designer` `%29`), the code (`cosmile` Worker `%1`), the contract
  (`foundation-control` `%4`), or the routing (`foundation-advisor` `%27`). Read-only for
  the subject; no patch, dispatch, commit, or product write. Being the design Reviewer for
  the same work is the intended two-pass Sentinel model (V2 §9); no self-review occurs
  because I authored no candidate.
- Reviewer writes this pass: only the two ALLOWED result/pointer files. No commit/push.

## 1. Immutable subject and provenance (independently verified, not trusted)

- Cosmile branch `shadow/m4-cosmile-memory`; HEAD == `VERDICT_TARGET_HEAD`
  `b8f1c57502011dc7656ada91b3655432583be925`; working tree clean except the six
  pre-existing untracked `app/docs/*.md` (excluded, unread as evidence, untouched).
- Ancestry: `git merge-base --is-ancestor 6e44aa40 b8f1c575` → yes; single candidate commit
  `b8f1c57` ("feat(m2-ab): …flags OFF, contained"). No product write after it (clean tree).
- Local remote-tracking `origin/shadow/m4-cosmile-memory` == `b8f1c575` (0 ahead/0 behind);
  network fetch is forbidden, so remote head is corroborated from the local mirror only,
  not re-fetched — recorded honestly.
- Diff `6e44aa40..b8f1c575` = **exactly 39 files** (+3355/−232), matching the handoff's
  39-file claim. Every path ∈ the reviewed design §7 Worker allowlist; the four
  allowlisted-but-untouched files (`types/commerceEvent.ts`, `types/recOutcome.ts`,
  `scripts/v3_11.vitest.ts`, `scripts/v3_11c2_rec_outcome.vitest.ts`) are permission-not-
  obligation. **Zero out-of-allowlist paths.** The two migration files are under a new dated
  dir `20260715120000_…`; the two historical migration dirs are not in the diff (no
  historical-migration edit). No `.env`, no `package.json`/deps, no Foundation/SIASIU path.
- Forbidden-model check: `git diff … prisma/schema.prisma` shows `MemoryFactCandidate`,
  `LongTermMemoryFact`, and `SubjectRefMap.allowLink` only as unchanged context (no `+`/`-`
  lines); `memoryCandidate.ts` is not in the diff. F4/B1 preserved at the schema level.
- `git diff --check 6e44aa40..b8f1c575` → clean (no whitespace/conflict markers).
- Worker evidence read at foundation-docs `5887006`
  (`M2_AB_COSMILE_IMPLEMENTATION_RESULT.md`); design mirror sha256 self-consistent per that
  report (not independently re-hashed — the product design doc is inside the reviewed diff).

## 2. Reproductions performed (authorized safe set) and honest exclusions

Reproduced (read-only, provider-independent, flags unset — verified
`A/B/OUTCOME = unset`):

- `node scripts/m2_ab_no_transport.mjs` → **PASS** (exit 0); all 17 containment checks ok.
- Adversarial negative control on the scanner oracle (scratchpad, no product-tree edit):
  confirmed real violations are detected even on `://` lines and inside template strings,
  and that compliance declarations (`raw_text_stored:false`, `errorMessage:null`,
  prohibition comments) are correctly not flagged — the comment-stripping refinement is not
  oracle-weakening (hypothesis 10 refuted). One INFO: the supplementary
  `setTimeout(…flush|retry|deliver)` regex misses the arrow-function form
  `setTimeout(()=>flushX())`, but real transport primitives (`fetch(`, `flushOutbox`,
  `deliver(Signal|Evidence)`, `http`) are caught by standalone tokens (IR-INFO1).
- `npx tsc --noEmit` → **7 errors, all in `scripts/foundation-memory-deanon.vitest.ts`**
  (not in the 39-file diff; unmodified; generic strict-null-check noise). **0 errors within
  the M2 A/B allowlist.** Matches the Worker report. (Baseline-tsc was not re-run — that
  needs a checkout that would move HEAD; the file's exclusion from the diff and its
  unrelated error class support "pre-existing.")
- `npx vitest run` on the six suites → **122 passed / 122** in 476ms. Matches the Worker's
  count. Test-meaning caveats in §6.

Excluded, never marked PASS (matches handoff §5 and the Worker's honest labels):

- `npm run build` — NOT RUN (`.env.local` autoload cannot prove secret-access-zero).
- Ephemeral DB forward/down/forward apply — NOT RUN (no disposable Postgres; installing = a
  forbidden dependency). The migration's DB-level behavior is reviewed statically only.
- `.env.local` / secrets / network / real DB — not opened / not contacted.
- My own evidence is boolean/count/status; no secret value, PII, or raw identifier printed.

## 3. Founder / reviewed-design conformance (correct parts)

Verified correct against Founder `24_…` and the delta-passed design `9530b221`:

- **F1/R1/R-Q1**: migration drops the `recommendationId` PK, adds `eventId` PK, makes
  `sessionId` nullable with `csess_v1_` format CHECK, `recommendationId+eventType` unique,
  `producerEventKey` unique, `presentationDedupeKey` unique + shown-only CHECK
  (`migration.sql:22-39`). Zero-row `RAISE EXCEPTION` precondition present
  (`migration.sql:7-12`); `down.sql:3-20` fail-closed on any A/B data. R-Q1 binding
  preconditions preserved.
- **F2/R5/R6**: `recommendationEventService.presentRecommendations` mints once at
  presentation (`:96`), atomic `createPair` ($transaction rec+ledger, `:60-67`),
  `failed_closed` on error (`:117`); `appendRecommendationEvent` validates shown+product+
  **identity** (`:139-145`) and dedups by `producerEventKey`; cart/wishlist mint a lifecycle
  pair only for a server-validated propagated id and never double-write `cart_add`/
  `wishlist_add` (`cart/items/route.ts` ②-branch, `wishlist/toggle/route.ts`). Paid-line
  `direct/session/organic` is genuinely wired via `resolveOrderItemAttribution`
  (`recOutcomeEventService.ts` `trackOrderOutcomeEvents`, reads `recommendation_shown` rows
  only — reported == actual).
- **F3/§5.4**: `commerceEvidenceNormalizer` computes adverse first (F9), never reads
  satisfaction on the adverse path, `severe`→human review + enqueue-eligible, `unknown`→
  human review + no outbox, unknown tokens→`invalid_normalization` — matches §5.4 exactly.
- **F4/B1**: zero candidate writers/imports (scanner PASS; grep 0); legacy model untouched.
- **REV-F1 (adverse enqueue)**: valid `skin_reaction`/`other` low/mod/severe are outbox-
  eligible; adverse outbox rows carry `queueExpiresAt=null` + `retentionState=
  duration_unconfigured`, and the DB `FSO_evidence_row_chk` + `CER_retention_*` CHECKs
  enforce the adverse/non-adverse dichotomy (`migration.sql:133-135,180-197`). The 30-day
  queue TTL is non-adverse-only. `retention_hold_unconfigured` is gone (grep 0).
- **REV-F2**: `ConsultFoundationResult` canonical mode posts zero client-direct
  `product_card_view/click` (server pair owns them), one client `recommendation_view`;
  generic mode preserves existing client emissions with `recommendation_view` gated on
  `showRecommendation` (`:39-70`).
- **REV-N2**: cart/wishlist product mutation runs first and outside the evidence
  transaction and is never rolled back on pair failure (sanitized `failed_closed`).
- **R7**: `foundationSignalMapper` fail-closes without an explicit granted `ConsentSnapshot`;
  `trackCommerceEvent` still records the CommerceEvent (design §12.7 —
  `commerceEventService.ts:57-58`).
- Flags default OFF and production fail-closed on all three (`recommendationEventService
  :10-12`, `commerceEvidenceService:20-22`); `NEXT_PUBLIC_*` only in the two client
  components, absent from server services/routes.

## 4. Advisor attack-hypothesis dispositions (independently checked)

1. **Identity-scoped consent reads → CONFIRMED DEFECT (IR-F1).** Both default
   `findConsents` (`feedback/route.ts:27`, `commerce-evidence/consents/route.ts:18`) use
   `OR:[{subjectRef: x ?? undefined},{guestRef: y ?? undefined}]`; the null branch becomes
   `{}` which matches all rows, so `resolveEffectiveConsent` (which has no actor filter,
   `commerceEvidenceService.ts:44-54`) resolves across all actors.
2. **Feedback transaction boundary → PARTIAL (IR-N4).** Evidence + cross-service grant +
   outbox + tombstone are atomic in `createEvidenceTx`; but `setPurchaseItemRef` and the
   **same-service** grant append run before/outside the tx
   (`commerceEvidenceService.ts:377-379`) — a `failed_closed` can leave a committed
   same-service grant (reflects a real user action, self-heals on retry) and an opaque
   purchaseItemRef (idempotently reused). No false cross-service grant, no unblocked
   lineage, correct label.
3. **Consent provenance truth → CONFIRMED DEFECT (IR-F2).** For a pre-existing grant,
   `buildEvidenceEnvelope` is called with `capturedAt: now` + the current notice constant
   (`commerceEvidenceService.ts:337-340`), so the payload's `consent.captured_at`/
   `notice_version` misrepresent the actual grant. The FK `consentRecordId` is resolved
   correctly by the tx's scoped `findFirst` (`feedback/route.ts:64-68`).
4. **Session attribution identity → NOTED (IR-N3).** `resolveOrderItemAttribution` session
   branch matches product+session without identity (`attribution.ts:63-65`), unlike the
   identity-checked direct branch. Unreachable in A/B (no session mint) and session mode
   attaches no id/no cross-service effect; harden before any session mint is authorized.
5. **Request contract closure → PARTIAL (IR-N1).** Consents route strictly rejects any
   non-`{revoke,cross_service}` (`consents/route.ts:14`). Feedback route silently coerces an
   invalid `action` to `submit` (`feedback/route.ts:101`) — benign (all gates still apply),
   but not an explicit reject. `clientRequestId` is minted once client-side and reused on
   retry as designed; format CHECK + `(orderItemId,clientRequestId)` unique enforced.
6. **Retraction/correction completeness → CONFIRMED GAP (part of IR-F3).** API/service
   support correct/retract with `precheckLineage` + tombstone + `blockPendingOutbox`
   (verified), but the UI (`PurchaseFeedbackPanel`) exposes only initial `action:"submit"` —
   no correction/retraction entry point, so users cannot reach them.
7. **Outbox DB invariants → SUFFICIENT (as designed).** `FSO_evidence_row_chk` enforces
   `consentRecordId NOT NULL`, `subjectRef NOT NULL`, pending/blocked-only, raw-id null, and
   the retention dichotomy (`migration.sql:180-197`). The "matching-granted-consent" is
   necessarily application-enforced (SQL CHECK can't cross-reference); the tx's scoped
   `findFirst` supplies the real granted `consentRecordId` or throws → this bounds IR-F1's
   blast radius on the outbox (but not the same-service gate or revocation). No FK from
   outbox `consentRecordId` to `ConsentRecord` — acceptable (design did not require it).
8. **UI contract → CONFIRMED MATERIALLY INCOMPLETE (IR-F3).** See §5.
9. **Lifecycle navigation & duplicates → NOTED (IR-N5) + rewrite OK.** Click uses a `<Link>`
   with fire-and-forget `act()` (`ConsultFoundationResult.tsx:116-119,151`); navigation can
   abort the in-flight `recommendation_clicked` fetch (no `keepalive`), but the attribution
   context is stored synchronously in sessionStorage first, so attribution is unaffected —
   only the click ledger event may be lost. Canonical paths do not also emit a generic
   ledger event (verified). The `v3_11c_rec_event.vitest.ts` rewrite retains all prior
   safety meaning (flag-OFF-inert, XOR, canonical mint, fail-closed, invalid-type reject)
   and adds R2/R3/R5 + double-count + guest-reuse asserts; documented per TEST_MEANING §8;
   no `.skip/.only` — a legitimate contract rewrite, not weakening.
10. **Containment scanner → SOUND.** See §2 (negative control). Not oracle-weakening.
11. **Evidence honesty (`SECRET_ENV_PII_ACCESS: ZERO`) → ACCURATE.** The label is correct
    for the committed artifact and reproducible without opening `.env.local`: `ids.ts`
    secrets are non-production mock fallbacks in source (not env), prod is fail-closed
    (`ids.ts:12-21`), and the 39-file diff contains no secret value. The Worker correctly did
    not claim a build PASS. My pass also opened no env file.
12. **Hash framing → NOTED (IR-N2).** `producerEventKey`/`evidenceIdempotencyKey` prefix
    fixed-length inputs (recommendationId 33ch, sourceEventId 36ch) so their boundaries are
    unambiguous, but `presentationDedupeKey(foundationTraceId, productId)` concatenates two
    variable-length inputs with no separator (`ids.ts:64-65`) — a theoretical collision
    boundary. Low exploitability (server-derived inputs; a collision only suppresses a
    presentation as a duplicate). Matches the approved design; hypothesis 12 asked to require
    explicit framing.

## 5. Findings

### IR-F1 — consent read broadened across all actors (blocking)

```text
TYPE: privacy/consent boundary (F7) — correctness defect in default DB query
SEVERITY: high (consent boundary); contained (flags OFF, no runtime, no delivery)
PINNED: app/src/app/api/orders/[orderId]/items/[orderItemId]/feedback/route.ts:27
        app/src/app/api/commerce-evidence/consents/route.ts:18
        (resolved by app/src/lib/commerceEvidenceService.ts:44-54, 272-282, 400-402)
FAILED SCENARIO: findConsents({subjectRef:X, guestRef:null}) builds
  OR:[{subjectRef:X},{guestRef:undefined}] → Prisma drops the undefined key → OR:[{subjectRef:X},{}]
  → the {} branch matches ALL ConsentRecord rows. resolveEffectiveConsent then picks the
  globally-latest granted row across every actor. Actor A with no same_service grant has
  feedback stored locally on the strength of actor B's grant (F7 "login/userId never grants
  consent" bypassed for the same-service local-storage gate, which has no downstream
  backstop). revokeCrossServiceConsent resolves/targets supersedesConsentId from another
  actor's row. (The cross-service OUTBOX row is bounded: the tx findFirst at feedback/route
  :64-68 is subjectRef-scoped, so it yields A's real grant or throws → failed_closed.)
REQUIRED PATCH: scope findConsents to the single non-null actor, e.g.
  where: actor.subjectRef ? { subjectRef: actor.subjectRef } : { guestRef: actor.guestRef }
  (never an OR with an undefined/empty branch), in BOTH routes.
ALLOWED PATCH PATHS: app/src/app/api/orders/[orderId]/items/[orderItemId]/feedback/route.ts,
  app/src/app/api/commerce-evidence/consents/route.ts
REQUIRED DELTA TEST: a cross-actor fixture proving actor A's submit does NOT resolve actor
  B's same_service/cross_service grant, and that revoke targets only A's own latest grant.
  (Today no suite exercises the default query or a second actor — see §6.)
```

### IR-F2 — envelope consent provenance uses request-time/constant for a pre-existing grant (blocking)

```text
TYPE: consent provenance truth (F7 / design §5.3, §5.6)
SEVERITY: medium-high (evidence integrity); contained (flags OFF, no consumer)
PINNED: app/src/lib/commerceEvidenceService.ts:337-340 (envelope grant = {capturedAt: now,
        noticeVersion: NOTICE_VERSIONS.cross_service_commerce_evidence}); type requires the
        real values at app/src/types/commerceEvidence.ts:87-92
FAILED SCENARIO: actor has a durable cross-service grant captured earlier under notice
  version vN. On a new checked submit, effectiveCross.state==='granted' so crossGrantRow=null
  and the envelope is built with captured_at=now and notice_version=current-constant, not the
  actual grant's capturedAt/noticeVersion. payloadJson then misstates WHEN and under WHICH
  notice consent was given, even though consentRecordId (FK) points at the real row.
REQUIRED PATCH: pass the resolved effective grant (effectiveCross.row.capturedAt /
  noticeVersion) into buildEvidenceEnvelope for the pre-existing-grant path; only use `now`
  + current constant when the grant is freshly appended in this submission.
ALLOWED PATCH PATHS: app/src/lib/commerceEvidenceService.ts
REQUIRED DELTA TEST: assert that for a pre-existing grant the envelope consent.captured_at
  == the grant row's capturedAt and notice_version == the grant row's noticeVersion (not now
  / not the current constant).
```

### IR-F3 — purchased-line feedback UI materially incomplete vs reviewed §2.3/§3.4/§6 (blocking)

```text
TYPE: UI/accessibility completeness against the reviewed design
SEVERITY: medium (UX/a11y); contained (B_UI_FLAG OFF → panel returns null)
PINNED: app/src/components/feedback/PurchaseFeedbackPanel.tsx:28-127
        app/src/components/slice/ConsultFoundationResult.tsx:121-125 (dismiss focus)
FAILED SCENARIO: reviewed design §2.3/§6 specified one modal/bottom-sheet surface
  (role=dialog, aria-modal, focus moves to heading on open, focus trap, Escape, focus
  restoration to the originating line button, sticky action, responsive 480px split, 200%
  zoom no-clip) and §3.4 correction/retraction flows. The implementation renders an inline
  chip form with: no dialog/modal semantics; choices as plain <button> chips, not
  fieldset/legend radio groups with arrow-key/Space semantics; no Escape/focus-trap/focus-
  restoration; no responsive bottom-sheet; and only action:"submit" — no correction/
  retraction entry (API supports both). ConsultFoundationResult dismiss updates state but
  does not move focus to the next card/heading (§6). A keyboard/AT user cannot operate the
  intended dialog, and correction/retraction are unreachable from the UI.
REQUIRED PATCH: implement the reviewed modal + a11y (dialog semantics, radio-group
  fieldset/legend, focus trap/Escape/restoration, responsive sheet, 200% zoom) and the
  correction/retraction entry points in the panel; restore focus on recommendation dismiss.
  Keep the pure logic in purchaseFeedbackState.ts (already correct).
ALLOWED PATCH PATHS: app/src/components/feedback/PurchaseFeedbackPanel.tsx,
  app/src/components/slice/ConsultFoundationResult.tsx (dismiss focus only),
  app/src/lib/purchaseFeedbackState.ts (if additional pure state is needed)
REQUIRED DELTA TEST: pure-state assertions for correction/retraction submit shaping and
  focus-target derivation; implementation-review inspection at 390×844, keyboard-only,
  reduced-motion, and 200% text (no browser test lib — design §12.8).
```

### Non-blocking

```text
IR-N1 [request closure] feedback/route.ts:101 — invalid `action` silently coerced to
  "submit" (consents route rejects strictly). Patch: reject unknown action, or document the
  coercion. Path: feedback route. Test: unknown action → 400/handled, not a new root.

IR-N2 [hash framing] ids.ts:64-65 — presentationDedupeKey concatenates variable-length
  foundationTraceId+productId with no separator (ambiguous boundary; producer/idempotency
  keys are unambiguous via fixed-length prefixes). Patch: add a length/delimiter frame.
  Path: ids.ts. Test: (traceId="a",product="bc") and ("ab","c") yield distinct keys.

IR-N3 [attribution] attribution.ts:63-65 — session branch matches product+session without
  identity (direct branch checks identity). Unreachable in A/B (no session mint). Patch:
  require identity match before any authorized session mint. Path: attribution.ts. Test:
  cross-owner session ref does not attribute `session`.

IR-N4 [atomicity] commerceEvidenceService.ts:377-378 — setPurchaseItemRef and the
  same-service grant append run outside createEvidenceTx; a failed_closed can commit a
  same-service grant (real user action; self-heals) and an opaque purchaseItemRef. Patch:
  move the same-service grant into the tx, or document the intentional pre-tx placement.
  Path: commerceEvidenceService.ts. Test: injected tx failure leaves no committed
  same-service grant.

IR-N5 [event loss] ConsultFoundationResult.tsx:116-119,151 — click navigates while the
  recommendation_clicked fetch is in flight (no keepalive); context is preserved
  synchronously so attribution is unaffected. Patch: keepalive:true or await-before-nav.
  Path: ConsultFoundationResult.tsx. Test: n/a (best-effort ledger event).

IR-INFO1 [scanner] m2_ab_no_transport.mjs:26 — setTimeout(…flush|retry|deliver) regex misses
  the arrow-function form; real transport primitives are caught by standalone tokens, so no
  containment hole. Also: the Worker's claimed negative control is not committed to the repo
  (I reproduced an equivalent adversarial control confirming the oracle is sound). Optional:
  commit a negative-control fixture.
```

## 6. Test-meaning assessment (TEST_MEANING_POLICY)

- Reproduced 122/122 across six suites (flags unset) and the scanner PASS + adversarial
  negative control + `tsc` 0-in-allowlist. These are MEANINGFUL_PASS for: closed
  normalization + severe/unknown behavior, lifecycle mint/dedup/pair-atomicity/identity,
  attribution modes, lineage/tombstone precheck, and static containment.
- **Coverage gap (load-bearing):** no suite calls `submitPurchaseFeedback` end-to-end or
  `revokeCrossServiceConsent`, and there is no cross-actor consent fixture anywhere
  (`m2_ab_commerce_evidence.vitest.ts` unit-tests `resolveEffectiveConsent` with
  already-scoped rows). So the consent-scoping contract is protected by zero tests, and
  IR-F1/IR-F2 are green precisely because the default DB query and pre-existing-grant
  provenance are never exercised — a "passing test that hides the truth." The delta tests
  above are required to make the fixes meaningful.
- The `v3_11c_rec_event.vitest.ts` rewrite is a documented CONTRACT_DRIFT correction (R2/R3/
  R5), strengthening not weakening; the scanner refinement is not oracle-weakening.

## 7. R-Q1 / R-Q2 design-ruling preservation

- **R-Q1 (additive PK correction):** the migration implements exactly the reviewed
  eventId-PK/nullable-sessionId change under the binding zero-row precondition + fail-closed
  down.sql + disposable-DB-only rehearsal; no historical-migration edit. PRESERVED.
- **R-Q2 (adverse safe enqueue):** valid adverse enqueues with `queueExpiresAt=null` +
  `duration_unconfigured`; unknown severity → human review, no outbox; no duration/consumer/
  delivery invented; 30-day TTL is non-adverse-only, enforced by DB CHECKs. PRESERVED.

## 8. Verdict rationale

The implementation is scope-clean (exact 39-file allowlist, no historical/forbidden edits),
faithful to the reviewed contract in its DB invariants, lifecycle atomicity, normalization,
attribution, containment, and flags-OFF/production-fail-closed posture, and its honesty
labels (build/DB not-run, secret-access-zero) are accurate. But three bounded defects remain:
a consent-read actor-broadening query (IR-F1) that bypasses the same-service consent gate and
corrupts revocation targeting, an envelope that misstates consent provenance for a
pre-existing grant (IR-F2), and a feedback UI materially short of the reviewed modal/a11y and
missing correction/retraction (IR-F3). All three are Designer-approved-contract deviations,
patchable by the same Worker inside allowlisted files, and currently inert behind OFF flags
with no consumer/delivery/real-DB — so no live incident, but real defects the merged code
carries. Per review-classification this is `NEEDS_PATCH` (bounded delta loop), not `PASS`
(real consent + provenance + UI-completeness defects exist), not `PASS_WITH_RISK` (they are
patchable in-scope, not residual risks needing Leo risk acceptance), and not `FAIL` (no
boundary breach, no redesign; the design is sound and the implementation deviates in bounded
ways). The same Reviewer performs delta-only re-review of IR-F1..F3 (and, at the Worker's
option, IR-N1..N5) after the bounded patch.

```text
VERDICT: NEEDS_PATCH
BLOCKING_FINDINGS: IR-F1, IR-F2, IR-F3
NON_BLOCKING_FINDINGS: IR-N1, IR-N2, IR-N3, IR-N4, IR-N5, IR-INFO1
R-Q1_PRESERVED: YES
R-Q2_PRESERVED: YES
PRODUCT_REPO_WRITE_STATUS: ZERO (Cosmile HEAD unchanged at b8f1c575; only pre-existing untracked docs)
BUILD: NOT_RUN_SAFETY_UNPROVEN (excluded)
DB_REHEARSAL: SKIP_INFRA_UNAVAILABLE (excluded)
TESTS_REPRODUCED: vitest 122/122, scanner PASS + adversarial negctl, tsc 0-in-allowlist, git diff --check clean
SECRET_ENV_PII_ACCESS: ZERO
ACTUAL_MODEL: Opus 4.8 (1M context)  ·  EFFORT: max  ·  SKILL: /fable-sentinel
C_IMPLEMENTATION_STARTED: NO
FULL_PACKAGE_1B_STARTED: NO
RETURN_TO: foundation-advisor
STOP_AFTER_RETURN: true
```
