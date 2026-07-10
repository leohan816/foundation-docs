# tmux Result Ledger

Transport state: `NOT_ACTIVE`

General active-mode results: none. The one-time bootstrap reload results are
recorded below.

## One-Time Bootstrap Reload Results

Recorded: 2026-07-10T19:01:39Z

| Actor | Session/pane | Required state returned | File/runtime change | Advisor verdict |
|---|---|---|---|---|
| Advisor | `foundation-advisor/%9` | NOT_ACTIVE / ENGAGED / manual ACTIVE | none beyond approved local instruction patch | `PASS` |
| Control | `foundation-control/%4` | NOT_ACTIVE / ENGAGED / manual ACTIVE | none | `PASS` |
| Foundation Worker | `foundation/%3` | NOT_ACTIVE / ENGAGED / manual ACTIVE | none | `PASS` |
| Cosmile Worker | `cosmile/%1` | NOT_ACTIVE / ENGAGED / manual ACTIVE | none | `PASS` |
| Shashu Worker | `siasiu/%0` | NOT_ACTIVE / ENGAGED / manual ACTIVE | none | `PASS` |
| Fable5 Reviewer | `reviewer-fable5/%5` | NOT_ACTIVE / ENGAGED / manual ACTIVE | none | `PASS` |

All six role summaries preserved actor separation. All six transport summaries
preserved exact-launcher transport, no authority transfer, no broadcast, serial
default, sensitive-interaction STOP, durable-evidence priority, kill switch, manual
fallback, and no activation from reload.

Actual Git verification after reload:

- foundation-control, FOUNDATION, Cosmile, SIASIU, and fable-sentinel: staged 0,
  tracked diff 0;
- foundation-docs: staged 0 before this record; only pre-existing unrelated tracked
  dirty files and untracked job directories remained;
- required tmux sessions: same six session IDs and one pane each;
- no new tmux session, agent, sub-agent, or delegated context.

## Entry Template

```text
DISPATCH_ID:
MISSION_ID:
TARGET_ACTOR:
PANE_COMPLETION_REPORTED:
RESULT_FILE:
POINTER_FILE:
RESULT_FILE_EXISTS:
POINTER_FILE_EXISTS:
ALLOWED_FILES:
ACTUAL_CHANGED_FILES:
DIFF_VERIFIED:
TEST_EVIDENCE_VERIFIED:
COMMIT_SHA:
BRANCH:
UPSTREAM:
PUSH_AND_ANCESTRY_VERIFIED:
RUNTIME_STATUS_VERIFIED:
REVIEW_VERDICT_AND_COVERAGE:
CONTRADICTIONS:
ADVISOR_RESULT_VERDICT:
NEXT_ACTOR:
RECORDED_AT:
```
