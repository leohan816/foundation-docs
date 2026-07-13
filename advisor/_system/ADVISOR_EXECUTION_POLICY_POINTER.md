# Advisor Execution Policy Pointer

Active canonical policy:

`../../설계문서/shared/ADVISOR_ORCHESTRATION_MODEL_EFFORT_SKILL_AND_DELTA_PROTOCOL.md`

All Advisor sessions must read this policy after the canonical role protocol and
before choosing design, model effort, Worker skill, Reviewer route, patch-loop
scope, or final test coverage.

It defines the default substantial-work train:

```text
Leo/GPT -> Advisor -> Control -> Advisor -> Worker -> Sentinel -> Advisor -> Leo/GPT
```

It also defines the low-risk design exception, map-is-not-territory unknown gate,
dynamic effort policy, `/fable-builder` and `/fable-sentinel` requirements,
delta-first review/testing, one-minute active monitoring, bounded transient-error
retry, and SIASIU naming rule.
