# Fable5 Agent Office Design Review Brief

Status: `WAIT_FOR_DESIGN_CANDIDATE`

Reviewer: existing `reviewer-fable5/$5/%5`

Model/effort: `<Fable5:Max>`

Pass: `DESIGN_REVIEW__AGENT_OFFICE_M01`

Level: 3

The Reviewer must independently read the actual candidate files, repo state,
mission manifest, diffs, and source evidence. It must not trust Worker summaries.

Required coverage:

- exact counting and WorkUnit denominator model;
- no inference from terminal prose;
- complete status, blocker, alert, and communication state machines;
- deterministic GPT package and idempotent response flow;
- browser cannot target Workers/Reviewers or arbitrary terminal commands;
- active tmux authority is referenced, not duplicated;
- gateway split supports Hermes interface-only;
- private/auth/CSRF/rate-limit/audit design is implementable without secrets;
- file persistence and projection are crash-safe and testable;
- animations derive only from structured events and verified evidence;
- responsive/PWA plan is feature-complete;
- batches and rollback gates are precise;
- no public exposure, DB, secret, sub-agent, or next mission;
- design is implementable without Worker product-policy invention.

Verdict: `PASS | PASS_WITH_RISK | NEEDS_PATCH | FAIL`.

Result returns to Advisor. Reviewer does not patch or activate implementation.
