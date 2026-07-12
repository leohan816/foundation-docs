TARGET_ACTOR: Sentinel-ReReview
TARGET_SESSION: separate role session, never Advisor session
SOURCE_ADVISOR_JOB: ../foundation-docs/advisor/jobs/20260712_agent_office_batch_a_modern_office_identity_completion_001
DO_NOT_PASTE_INTO: Advisor session
RETURN_RESULT_TO: Advisor
GPT_DIRECT_USE: inspect only, do not execute unless acting as the target session

이 지시문을 붙여넣을 대상: 기존 독립 Foundation Reviewer SOL 세션
이 지시문을 붙여넣으면 안 되는 곳: Advisor / Control / Worker / GPT 전략 세션
작업 결과 반환 대상: Advisor

# Sentinel Narrow Design Review - Production Render Contract

Required skill: `/fable-sentinel`

Mission: `AGENT_OFFICE_BATCH_A_MODERN_OFFICE_IDENTITY_COMPLETION_001`

Review mode: independent, read-only, no patch.

Target repository: `/home/leo/Project/agent-office-batch-a-001`

Exact candidate: `2e0dddfcd8131206f63780c7613bc7d1a03f496d`

Exact delta under review: `9caff0e5edbcd0d29f0fd38c0835b9399c85b838..2e0dddfcd8131206f63780c7613bc7d1a03f496d`

The candidate commit parent includes earlier Worker implementation commits in
the branch history. Review the exact docs delta above and direct source
consistency. Do not misattribute the parent implementation commits to Control.

Read directly:

1. `34_ADVISOR_CONTROL_PRODUCTION_RENDER_SCOPE_VALIDATION.md`;
2. `35_ADVISOR_PRODUCTION_RENDER_CONTRACT_REVALIDATION.md`;
3. the exact candidate diff and all four current canonical Batch A docs;
4. actual current source named in PR-1 through PR-4, especially runtime
   projection/client, organization types/projector/registry, pixel contracts,
   prototype and production call-chain source anchors, Vite config, and both
   bundle-boundary tests;
5. the existing accepted design and prior PASS only as preserved-boundary
   context, not as proof of this delta.

Use no agents, sub-agents, delegated contexts, or temporary sessions.

## Required Review

Independently verify:

1. PR-1's production input contract uses only facts that actually exist and
   labels each source/authority correctly.
2. Stable identity, mutable Team assignment, runtime operational truth, and
   committed visual layout do not become a second work-truth model.
3. `advisorTeam` provenance is accurate; registry-carried facts are not falsely
   described as RT-owned merely because they appear in the RT envelope.
4. Cue creation is implementable from the actual input. Missing raw evidence
   cannot be invented; diagnostics cannot masquerade as work/routing/review.
   No cue is the safe result when exact required fields are unavailable.
5. Every invalid state maps to the correct owned sentinel and contract; identify
   any use of `UNKNOWN_OR_STALE` where `UNKNOWN` or `AI_RUNTIME_UNKNOWN` is
   required.
6. Committed layout config and pure layout derivation are sufficiently exact for
   pods, project identities, membership, anchors, selection, counts, and camera
   without fixture reuse or visual-proximity authority.
7. The runtime parser validates the actual untrusted boundary before rendering,
   including schema/keys, duplicates, assignment conflicts, stale/conflicting
   facts, enums, numerics, diagnostics, and fallback. A cast is not validation.
8. The separate production renderer chain is complete and cannot import
   `frame-projector.ts`, `PixelPrototypeProjection`, or `fixtures/prototype-*`.
9. Shared draw/backend extraction preserves prototype behavior without editing
   `prototype-entry.tsx`; closed path scope is complete and non-wildcard.
10. CD-3 assertions are implementable against actual Vite module/chunk manifests,
    prove eager/fallback isolation and production fixture exclusion, and allow
    legitimate vendor splitting.
11. U1-U3/S3/R2/T3, WU-02/03/04, actor-overlay ownership, accessibility,
    security, authority, fallback, Channy, rollback, no-Grok, excluded-session,
    and Batch B-E boundaries remain unchanged.
12. No product decision, runtime implementation, authority expansion, or hidden
    implementation approval appears in the docs-only delta.

Reproduce direct source searches and docs diff checks. Tests are not required for
the docs-only commit, but any command run and its result must be reported
accurately.

## Verdict

Return exactly one:

- `PASS`
- `PASS_WITH_RISK`
- `NEEDS_PATCH`
- `FAIL`

List every finding with exact docs/source evidence. `NEEDS_PATCH` returns to the
same Control session. Do not patch, commit target code/docs, grant approval, or
resume the Worker.

Write the long result to:

`/home/leo/Project/foundation-docs/runs/agent-office/20260712_agent_office_batch_a_modern_office_identity_completion_001/SENTINEL_PRODUCTION_RENDER_CONTRACT_DELTA_REVIEW_RESULT.md`

Write the pointer to:

`/home/leo/Project/foundation-docs/advisor/jobs/20260712_agent_office_batch_a_modern_office_identity_completion_001/36_SENTINEL_PRODUCTION_RENDER_CONTRACT_DELTA_REVIEW_RESULT_POINTER.md`

Commit and push only those two exact foundation-docs files. Return the pointer to
Advisor and STOP.

