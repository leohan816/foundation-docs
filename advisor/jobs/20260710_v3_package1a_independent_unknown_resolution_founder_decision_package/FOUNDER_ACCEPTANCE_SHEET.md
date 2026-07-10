# V3 Package 1A Founder Acceptance Sheet

Date: 2026-07-10

Status: `DRAFT_PENDING_FABLE5_FOUNDER_PACKAGE_CHALLENGE_AND_LEO_GPT_DECISIONS`

These scenarios describe proposed safe behavior. They are not approved product policy until Leo/GPT marks them accepted or modified.

## Scenario 1 - Mixed Positive And Adverse Feedback

Example: "It stings a little, but the effect is good."

- Expected user-visible behavior: Today, no Package 1 feedback input exists. In a future approved flow, preserve both meanings and show conservative, non-diagnostic adverse guidance without claiming causality.
- Stored data: None today. A future approved contract may store separate structured positive/adverse axes with provenance and classifier version.
- Deleted or blocked data: Ambiguous text must not be forced into an optimistic single label. Unapproved raw text is not stored or transmitted.
- Automatic action allowed: Raise request-scoped caution when the approved safety authority detects risk.
- Automatic action forbidden: Positive learning, recommendation boost, evidence upgrade, causal diagnosis, or safety downgrade.
- Human approval required: Any durable safety state, verified/contradicted transition, or correction that could lower caution.
- Rollback/recovery path: Disable the future input/semantic path; retract or supersede derived labels using an audit link; preserve no-reappearance rules.
- Evidence proving behavior: Mixed-input contract fixtures, adverse-priority invariant tests, classifier-version trace, blocked-demotion regression, and implementation review.
- Founder acceptance: `PENDING`

## Scenario 2 - Feedback Deletion Request

- Expected user-visible behavior: Acknowledge the request without promising an unverified completion date or scope.
- Stored data: Today no Package 1 feedback is collected. Future lineage must enumerate raw input, structured response, semantic result, candidate, signal, queue, log, aggregate, and provider copy.
- Deleted or blocked data: User-linkable raw and derived feedback according to approved policy; future reuse is blocked when policy requires it.
- Automatic action allowed: Stop future reuse after a validated deletion/tombstone signal.
- Automatic action forbidden: Claim full erasure when provider, backup, log, or aggregate propagation is unverified.
- Human approval required: Legal retention exceptions, provider handling, aggregate treatment, and any non-PII tombstone/reuse-block retention.
- Rollback/recovery path: Recompute aggregates, deactivate derived learning, stop signal transmission, and document unresolved processors.
- Evidence proving behavior: Complete lineage map, deletion propagation test, no-reappearance test, provider/backup evidence, and legal/policy approval.
- Founder acceptance: `PENDING`

## Scenario 3 - Guest Purchase Followed By Login On A Shared Device

- Expected user-visible behavior: Do not silently move or associate feedback/memory with the logged-in account. Existing cart/wishlist merge remains a commerce convenience only.
- Stored data: Existing commerce merge evidence may remain under its current policy; no new feedback identity link is created.
- Deleted or blocked data: Ambiguous memory write is blocked. No re-keying of anonymous feedback rows.
- Automatic action allowed: Current strict-XOR behavior may skip learning writes.
- Automatic action forbidden: Recency inference, destructive re-keying, use of `cart_merged` as consent, or cross-service identity resolution by Foundation.
- Human approval required: Any future explicit additive link, unlink, correction, or consent-revocation behavior.
- Rollback/recovery path: Keep anonymous and subject records separate; revoke an additive link without rewriting original evidence.
- Evidence proving behavior: Real-auth shared-device threat tests, wrong-account recovery, consent/revocation tests, and link audit trail.
- Founder acceptance: `PENDING`

## Scenario 4 - Foundation Semantic API Failure

- Expected user-visible behavior: Do not show an optimistic semantic result. Report temporary inability to process the feedback if an approved feedback flow later exists; purchase/order completion remains independent.
- Stored data: No inferred semantic label. Structured user input may be retained only if the approved retention policy permits it.
- Deleted or blocked data: Raw text must not enter an unapproved retry queue or external transport.
- Automatic action allowed: Fail to `unclear`/non-learning and preserve conservative safety handling when deterministic evidence exists.
- Automatic action forbidden: Default to `neutral`/`satisfied`, retry indefinitely, or write durable learning from a failed classification.
- Human approval required: Replay/reprocessing after contract/model changes and any safety-relevant override.
- Rollback/recovery path: Disable semantic processing, retain no-learning state, and reprocess only from approved retained evidence with versioned provenance.
- Evidence proving behavior: Failure-injection tests, no-write-on-failure assertions, no-raw-retry evidence, and versioned replay test.
- Founder acceptance: `PENDING`

## Scenario 5 - Raw Text Appears In A Log, Trace, Or Queue

- Expected user-visible behavior: Do not claim non-persistence; follow the approved incident and user-notification policy.
- Stored data: Only incident metadata necessary for investigation, without copying the raw text further.
- Deleted or blocked data: Stop the affected input/transport path; quarantine or remove raw copies where legally and technically permitted.
- Automatic action allowed: Default-off kill switch and containment actions pre-approved by incident policy.
- Automatic action forbidden: Silent log deletion, automatic credential rotation without authority, or continued collection while exposure is unresolved.
- Human approval required: Security/privacy incident classification, provider/log handling, notification, credential action, and restart.
- Rollback/recovery path: Disable collection/transport, rotate or revoke approved credentials if required, verify canary cleanup, and re-review before restart.
- Evidence proving behavior: Synthetic canary, log/trace/queue inventory, provider evidence, incident record, and independent security review.
- Founder acceptance: `PENDING`

## Scenario 6 - Semantic Result Is Later Proven Wrong

- Expected user-visible behavior: Correct the result transparently where product policy requires it; never hide the prior error behind an in-place rewrite.
- Stored data: Versioned correction/supersession provenance, actor/authority, reason, and links to the affected derived state. Raw text remains governed separately.
- Deleted or blocked data: The wrong result is blocked from future learning/use; erasure follows the approved policy.
- Automatic action allowed: Stop reuse and raise caution. A correction may not automatically lower safety.
- Automatic action forbidden: Silent overwrite, unsupported `verified`/`contradicted` state, automatic safety downgrade, or untraceable bulk reclassification.
- Human approval required: Safety-lowering corrections and privileged certainty transitions.
- Rollback/recovery path: Supersede the correction, restore the prior safe state, recompute affected aggregates, and retain audit lineage.
- Evidence proving behavior: Authorization tests, append/supersede tests, blocked-demotion regression, aggregate recomputation, and audit review.
- Founder acceptance: `PENDING`

## Scenario 7 - Feature Produces No Measurable Recommendation Improvement

- Expected user-visible behavior: Stop or remove the pilot without claiming success from participation volume or organic purchases.
- Stored data: Observation-only pilot evidence retained only under the approved policy and horizon.
- Deleted or blocked data: No promotion to ranking/memory; data is deleted or deactivated according to the pre-approved stop/retention rule.
- Automatic action allowed: Trigger the pre-approved kill switch when the frozen stop condition is met.
- Automatic action forbidden: Change denominators, relabel organic purchases as recommendation wins, extend the pilot indefinitely, or enable learning to manufacture uplift.
- Human approval required: Metric definition changes, pilot extension, or a new value hypothesis.
- Rollback/recovery path: Disable collection, remove pilot UI, deactivate derived state, and publish the null result.
- Evidence proving behavior: Frozen KPI/denominator/horizon, independent metric owner, completeness/bias report, kill-switch test, and final pilot audit.
- Founder acceptance: `PENDING`

## Acceptance Status

- Accepted as written: `NO`
- Modifications supplied by Leo/GPT: `NONE_YET`
- Fable5 founder-package challenge: `PENDING`
- Package 1B authorization: `NO`
