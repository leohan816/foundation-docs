# Advisor Operating Rules Mirror

This folder is a GitHub-readable mirror of the Advisor operating rules.

It is not runtime source-of-truth.

It may include orchestration artifacts and handoff prompt conventions for manual
Hermes-style role sessions, but those files remain Advisor operating references,
not runtime code or final approval.

Handoff prompt documents must begin with a target header that states the target
actor, separate target session, source Advisor job, forbidden Advisor-session
destination, result return path, and GPT direct-use limitation.

The local cockpit is:

`~/Project/foundation-advisor`

The canonical local operating file mirrored here is:

`~/Project/foundation-advisor/AGENTS.md`

If this mirror conflicts with the local cockpit, runtime code, Foundation canonical contracts, or current Leo/GPT instruction, STOP and report the conflict to Leo/GPT. Do not infer or silently fix.
