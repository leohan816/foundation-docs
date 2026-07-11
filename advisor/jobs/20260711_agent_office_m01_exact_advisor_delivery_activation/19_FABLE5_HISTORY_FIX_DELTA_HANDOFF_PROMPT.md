TARGET_ACTOR: Fable5 Reviewer
TARGET_SESSION: same existing reviewer-fable5 session, never Advisor or Worker
SOURCE_ADVISOR_JOB: ../foundation-docs/advisor/jobs/20260711_agent_office_m01_exact_advisor_delivery_activation
RETURN_RESULT_TO: Advisor

Perform a Level-3 implementation/security delta review of Agent Office commit
`73157613345ad3046e45b99b145f5400c8dc5428` against base
`889a29b3e75da086a32ac76909a0ce9f4848ddfa`.

Read directly:

- `16_AO_WU_21_REHEARSAL_REWORK_BRIEF.md`
- `18_WORKER_REWORK_RESULT_POINTER.md` and its result
- the exact two-file Agent Office diff
- the current source and tests
- the actual foundation-docs Git reproduction paths cited in the brief

Do not trust the Worker report. Verify:

1. removing `--follow` keeps history inspection on the exact evidence path;
2. two similar files in distinct message directories no longer create a false
   multi-commit history;
3. a real rewrite of the same exact path still produces multiple history
   entries and remains rejected;
4. removal, dirty-path, ancestry, current-blob/hash, checkpoint-freeze,
   ordering, correlation, and scope rejection remain intact;
5. no rename/copy or other Git-history bypass was introduced by the patch;
6. the test deterministically reproduces the original defect and the fixed
   behavior using only a disposable repository;
7. the patch changes no runtime authority, browser route, tmux target, product
   policy, or AO-WU-21 activation state.

Run the focused suites and any additional read-only synthetic checks needed.
Classify any divergence as CODE_DEFECT, TEST_GAP, DOCUMENTATION_STALE,
DEFERRED_WITH_GATE, or NEEDS_LEO_GPT_DECISION.

Verdict: PASS | PASS_WITH_RISK | NEEDS_PATCH | FAIL.

Do not patch, start a real server, create authority material, invoke real tmux
mutation, access secrets/DB/prod/live, or resume AO-WU-21. Write and push only
the delta review result and pointer, return an ASCII-only pointer to Advisor,
and STOP.
