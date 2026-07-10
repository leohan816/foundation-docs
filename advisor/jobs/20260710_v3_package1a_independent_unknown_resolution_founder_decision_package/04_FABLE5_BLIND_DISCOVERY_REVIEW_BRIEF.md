# Fable5 Blind Discovery Adversarial Review Brief

Mission: `V3_PACKAGE1A_INDEPENDENT_UNKNOWN_RESOLUTION_AND_FOUNDER_DECISION_PACKAGE`

Actor: `Fable5 Reviewer`

Pass type: `DESIGN_REVIEW__DISCOVERY_ADVERSARIAL_PASS`

Review level: `Level 3`

Required skill: `/fable-sentinel`

## Exact Task

Perform an independent blind adversarial assessment of every frozen unknown U-01 through U-09. Challenge hidden assumptions and unsafe defaults using actual files. Do not read Advisor or Worker first-pass assessments before committing the blind result.

This is not a review of a proposed final design. Do not author the solution or choose product policy.

## Frozen Input

Register:

`../foundation-docs/advisor/jobs/20260710_v3_package1a_independent_unknown_resolution_founder_decision_package/V3_PACKAGE1A_UNKNOWN_REGISTER.md`

Freeze commit:

`fab82c45f7e92ed2652dc6de9db55532fabb661b`

Register Git blob:

`0eac3e290269c5154029d79864b99c9235807013`

Register SHA-256:

`dab0ffa15452db860d3ba6f71b58401d4447e81b811c22c3c4a87a379f26e0cb`

## Required Focus

- Hidden assumptions and false certainty.
- Missing unknowns and evidence gaps.
- Unsafe defaults and irreversible decisions.
- Reward-hacking and optimistic semantic classification.
- Mixed positive/adverse statements.
- Multilingual, ambiguous, sarcastic, incomplete, and conflicting inputs.
- Deletion and identity contradictions.
- Shared-device and wrong-account contamination.
- Raw-text leakage through process, provider, logs, traces, queues, retries, crashes, and observability.
- Product-value claims without evidence and selection bias.
- Decisions that should remain reversible.
- Questions that cannot be proven before pilot or live-like environment evidence.
- Whether existing historical documents are being mistaken for current approval.

## Evidence Standard

- Read actual files and current repository state.
- Distrust summaries, including the frozen register's `KNOWN_FACTS`, until directly checked.
- Label current code, canonical authority, historical evidence, tests, and unverified runtime separately.
- Cite exact file paths and symbols/lines.
- Preserve contradictions instead of resolving them by preference.

## Required Result

Write:

`../foundation-docs/runs/shared/20260710_v3_package1a_independent_unknown_resolution_founder_decision_package/FABLE5_BLIND_ASSESSMENT.md`

For each U-01 through U-09 include:

- `FABLE5_CHALLENGE`
- `DIRECT_EVIDENCE`
- `FACTS_SUPPORTED`
- `FACTS_NOT_SUPPORTED`
- `HIDDEN_ASSUMPTIONS`
- `MISSING_UNKNOWNS`
- `IRREVERSIBLE_RISKS`
- `REWARD_HACKING_RISKS`
- `SAFE_DEFAULT_CHALLENGE`
- `REQUIRES_EXPERIMENT`
- `REQUIRES_LEGAL_OR_POLICY_REVIEW`
- `REQUIRES_LEO_PRODUCT_DECISION`
- `CONFIDENCE`

Also include:

- reviewed files;
- excluded scope;
- independence declaration;
- unknown addenda with source/reason;
- no-prelaunch-proof list;
- false-certainty findings;
- blind-pass status: `BLIND_ASSESSMENT_COMPLETE`, `INDEPENDENCE_COMPROMISED`, or `BLOCKED`.

Write pointer:

`../foundation-docs/advisor/jobs/20260710_v3_package1a_independent_unknown_resolution_founder_decision_package/13_FABLE5_BLIND_RESULT_POINTER.md`

Commit/push only the Fable5 result and pointer in foundation-docs. Do not modify reviewed repositories.

## Forbidden Reads Before Blind-Pass Commit

- `../foundation-docs/advisor/jobs/20260710_v3_package1a_independent_unknown_resolution_founder_decision_package/ADVISOR_INDEPENDENT_ASSESSMENT.md`
- `../foundation-docs/runs/foundation/20260710_v3_package1a_independent_unknown_resolution_founder_decision_package/`
- `../foundation-docs/runs/cosmile/20260710_v3_package1a_independent_unknown_resolution_founder_decision_package/`
- any `ACTOR_COMPARISON_MATRIX.md`
- any `FOUNDER_DECISION_PACKAGE.md`
- any `FOUNDER_ACCEPTANCE_SHEET.md`

If any prohibited first-pass assessment is accidentally read, STOP and report `INDEPENDENCE_COMPROMISED`. Do not submit the result as blind.

## Forbidden Actions

- Final design authorship.
- Product-policy choice.
- File patching.
- Runtime or schema modification.
- DB access or query.
- Secret access.
- Live model call.
- New session or sub-agent creation.
- Control invocation.
- Package 1B design.

## Completion Criteria

- Actual evidence is independently inspected.
- All frozen unknowns are challenged.
- Missing unknowns are addenda, not silent register edits.
- False certainty and irreversibility are explicit.
- Result and pointer are committed/pushed to foundation-docs.
- ASCII-only terminal summary returns the pointer to Advisor.
