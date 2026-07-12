# Fable5 Review Brief - Grok Pilot 001

## Reviewer Routing Decision

- Target actor: Sentinel.
- Selected reviewer: fable5 Sentinel.
- Target session: `reviewer-fable5`.
- Required skill: `/fable-sentinel`.
- Reason: narrow code but security/authority-sensitive inference boundary and a
  new candidate Worker evaluation require direct Level-3 implementation review.
- Not selected: Control/Opus/Codex; one independent Fable5 review is sufficient
  because no DB, auth, write transport, or production integration is authorized.
- Review level: Level 3.
- Return result to: Advisor.
- Status: `WAIT_FOR_WORKER_RESULT`.

## Required Review

Directly inspect base-to-candidate diff, source, tests, docs, Worker evidence,
actual commits, branch/upstream state, and excluded-session evidence. Distrust the
Worker report until independently reproduced.

Verify:

1. adapter is read-only, fixed argv, no shell/capture/input/process signaling;
2. tmux existence, attached state, names, prose, time, proximity, and process name
   cannot create AI/model/effort/work truth;
3. model/effort require accepted structured identity evidence;
4. `AI_WORKING` requires accepted structured work evidence;
5. all required fixtures and malformed/conflict/offline cases pass fail-closed;
6. no runtime/UI/auth/remote/DB/authority expansion exists;
7. only allowed files changed and Agent Office Codex session was unused;
8. documentation matches implementation without promoting the pilot.

Verdict: `PASS | PASS_WITH_RISK | NEEDS_PATCH | FAIL`.
