# Advisor Self-Check

Status: `PRE_REVIEW_VALIDATION_PASS`

## Required Checks

- canonical mode remains `NOT_ACTIVE` before final approval;
- kill switch remains `ENGAGED`;
- manual fallback remains `ACTIVE`;
- no tmux input was sent;
- session registry contains exact current observations and fail-closed refresh rules;
- exact launcher evidence includes path, commit, blob, and SHA-256;
- no shell interpolation is permitted;
- no broadcast, synchronized panes, wildcard, or multi-pane send is permitted;
- serial-by-default and same-repo/same-branch write serialization are explicit;
- parallel isolation and blind-independence rules are explicit;
- timeout and stall detection do not auto-terminate role processes;
- unexpected sensitive/privileged interactions STOP;
- durable artifact and Git verification are required;
- kill switch and manual fallback are explicit;
- actor separation and Leo/GPT final approval remain unchanged;
- required reload list is complete;
- no runtime repo file is modified;
- unrelated dirty files are not staged;
- review uses the same existing independent Fable5 Reviewer session;
- activation requires two review PASS verdicts, reloads, Advisor final audit, and a
  separate Leo/GPT decision.

## Verdict

`PASS_PRE_REVIEW`

Evidence:

- canonical and config static assertions present;
- `MODE_STATUS: NOT_ACTIVE`;
- `KILL_SWITCH: ENGAGED`;
- `MANUAL_ROUTING_FALLBACK: ACTIVE`;
- six required existing role sessions matched registry metadata;
- effective `synchronize-panes off` verified;
- root Advisor active instructions patched and hashed;
- foundation-docs diff check clean;
- tmux input delivery count for this mission: zero;
- runtime repository modifications by this mission: zero.

Publication evidence:

- patch commit: `2f5f99da35e4509ff535fc2818d4665245a59ade`;
- origin/main equals local HEAD after push;
- staged set empty after push;
- commit scope contains only canonical/config/Advisor documentation;
- unrelated dirty files remain excluded.
