# Advisor Validation - Fable5 Blind Assessment

Date: 2026-07-10

Result commit: `47ed9dfeb2e85cda02c9cefbac4454349911348d`

Validation status: `PROCESS_AND_EVIDENCE_REWORK_REQUIRED`

## Scope Verified

Commit `47ed9df` contains only:

- `runs/shared/20260710_v3_package1a_independent_unknown_resolution_founder_decision_package/FABLE5_BLIND_ASSESSMENT.md`
- `advisor/jobs/20260710_v3_package1a_independent_unknown_resolution_founder_decision_package/13_FABLE5_BLIND_RESULT_POINTER.md`

The register freeze identifiers match. The result declares that prohibited first-pass content was not opened. No reviewed runtime repository was modified by the assessment.

## Finding FB-P1 - Explicit Prohibition Was Reinterpreted

The Fable5 result says it used five parallel session-internal verification passes and interpreted `New session or sub-agent creation` as prohibiting only new actor sessions or verdict delegation. The brief contains no such exception. An actor may not silently narrow an explicit prohibition.

The same existing Fable5 Reviewer session must state the exact mechanism:

- whether any new agent, sub-agent, delegated model context, or temporary session was created;
- whether any pass independently inspected files or returned synthesized findings;
- which load-bearing sources the Reviewer itself directly re-read.

If any agent/sub-agent/session was created, the original pass is process-noncompliant. The same existing Reviewer session must perform a clean, direct, single-session re-verification without agents, sub-agents, or temporary sessions. It must preserve blind independence and must not describe the original pass as compliant.

If no agent/sub-agent/session was created, replace the reinterpretation with the exact direct-tool mechanism and explicitly accept the prohibition as written.

## Finding FB-E1 - Forbidden Metadata Was Used

The assessment used or cited:

- `.env.local` key names;
- secret-key path existence and mode metadata;
- `dev.db` file metadata.

The mission forbids secret/env access and DB access. Even though no value or row was read, these metadata observations are unnecessary to answer the frozen questions and exceed the strict mission boundary.

The corrected assessment must:

- remove these observations from evidence, unknowns, and conclusions;
- not reopen those files or paths;
- classify deployment/provider/credential/DB state as unverified where repository evidence is insufficient;
- avoid claiming that metadata inspection was permitted.

## Finding FB-F1 - ADD-03 Overstates Observed Persistence

ADD-03 correctly identifies a narrower static risk: the CommerceEvent sanitizer is a forbidden-key denylist plus limited value-pattern scanner, so unlisted keys can carry ordinary prose that does not match those patterns.

However, the result claims that a direct POST persists durable user text `TODAY`. No DB query, live request, or deployed-runtime inspection occurred. Static code inspection proves a write-capable path, not observed durable persistence or current customer use.

The corrected result must:

- acknowledge all active sanitizer layers;
- describe the finding as a statically supported code-path exposure;
- distinguish generic event ingestion from a proven post-order feedback product path;
- state that actual rows, deployed behavior, and customer use remain unverified;
- retain the governance unknown only at the strength supported by code.

## Blindness Boundary

The same Fable5 Reviewer session may read this validation, its own blind result, the frozen register, and actual repo/canonical evidence. It must not read Advisor, Foundation, or Cosmile first-pass assessments, the comparison matrix, founder package, or acceptance sheet.

## Comparison Gate

Fable5 blind-pass status is `RECEIVED_NEEDS_PROCESS_AND_EVIDENCE_CORRECTION`.

Advisor must not use it in cross-actor comparison until:

1. FB-P1 is answered and any required direct re-verification is complete;
2. FB-E1 and FB-F1 are closed;
3. the corrected result and pointer are committed and pushed;
4. Advisor directly revalidates the corrected artifact.
