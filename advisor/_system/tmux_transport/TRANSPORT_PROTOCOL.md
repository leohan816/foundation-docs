# Advisor-Managed Existing tmux Transport Protocol

Status: `CANDIDATE_REVIEW_REQUIRED__NOT_ACTIVE`

## 1. Purpose and Boundary

This protocol removes manual prompt/result relay while preserving every actor and
approval boundary. Advisor transports exact committed launchers, observes role
sessions, collects durable results, and validates evidence. Advisor does not
perform the target actor's work or make the target actor's decisions.

The protocol applies only when `ACTIVATION_STATE.md` is active and the committed
final activation record is valid. Otherwise manual routing is mandatory.

## 2. Existing Sessions Only

- Use only a named session already listed in `SESSION_REGISTRY.md`.
- Never create a new tmux session, window, pane, agent, sub-agent, temporary
  session, or delegated model context.
- A registry row is a locator, not proof. Every dispatch must revalidate the live
  session, window, pane, workspace, process, expected actor, and readiness.
- Pane IDs are observations and may change after tmux restart. A changed pane ID
  requires registry refresh and evidence; it must never be followed by guesswork.

## 3. Dispatch Preconditions

All checks must pass before input is sent:

1. transport mode is active and the kill switch is disengaged;
2. the mission authorizes the target actor and current step;
3. the exact launcher is committed and pushed, unless the mission explicitly
   authorizes a local-only launcher;
4. launcher path, commit SHA, Git blob, SHA-256, mission ID, target actor, target
   session, and return path are recorded in `DISPATCH_LEDGER.md`;
5. live tmux metadata matches the registry;
6. captured pane context confirms the expected actor and workspace;
7. the pane is idle and is not waiting on an unrelated approval or partial input;
8. synchronized panes are off;
9. no wildcard or multi-pane target is used;
10. dependency and repository/branch write locks are clear;
11. blind independence constraints are recorded when applicable;
12. result and pointer paths are unique to this dispatch;
13. timeout and stall thresholds are recorded.

Any failed or uncertain check is a STOP. Advisor must not clear, interrupt, rename,
or overwrite the target session to make the check pass.

## 4. Exact Launcher Evidence

Advisor records:

- absolute and repository-relative launcher path;
- source repository and branch;
- source commit SHA and upstream equality/ancestry evidence;
- Git blob ID;
- worktree SHA-256;
- committed-blob SHA-256;
- exact target actor/session/pane;
- mission ID and expected return paths.

The worktree file must match the committed blob. If it does not, STOP.

## 5. Exact-Paste Transport

Use a unique tmux buffer name and file-based loading. The required transport shape
is equivalent to:

```text
tmux load-buffer -b <unique-buffer-id> <absolute-launcher-file>
tmux paste-buffer -p -b <unique-buffer-id> -t <exact-pane-id> -d
tmux send-keys -t <exact-pane-id> Enter
```

Requirements:

- command arguments are passed as arguments, not interpolated into a shell string;
- `paste-buffer -p` is required so a target application that requested bracketed
  paste receives the multiline launcher as one bracketed paste operation;
- launcher content is never piped through `eval`, command substitution, or an
  unquoted here-document;
- no content is edited between checksum verification and paste;
- `send-keys` targets only the exact pane and sends only the final submit key;
- synchronized panes, target wildcards, and broadcast commands are forbidden;
- the dispatch ledger is marked `SENT` immediately after submission.

## 6. Serialization and Parallel Safety

Serial execution is the default.

Always serialize:

- dependent actor steps;
- Worker then Reviewer and patch then re-review;
- tasks writing to the same repository or branch;
- all tasks that may commit/push to the same `foundation-docs` branch;
- tasks that consume another task's result;
- tasks whose independent first pass would be contaminated by another result.

Parallel dispatch is permitted only when all of the following are explicit:

- tasks are logically independent;
- targets are separate verified sessions;
- write repositories/branches or worktrees are isolated;
- result and pointer paths are distinct;
- no actor may read another actor's first-pass result;
- a dispatch matrix records every target and isolation proof;
- failure of one task cannot cause another task to broaden scope;
- the active mission explicitly permits the concurrency.

If one condition is absent, serialize.

## 7. Observation, Timeout, and Stall Detection

Advisor captures pane output without sending input and records non-secret
observations in `OBSERVATION_LOG.md`.

Each dispatch records:

- expected progress signals;
- soft-stall threshold;
- hard-timeout threshold or `NONE_WITH_REASON`;
- last output fingerprint and observation time;
- current state: `RUNNING`, `WAITING_EXPECTED`, `STALL_CANDIDATE`, `STOPPED`, or
  `COMPLETED_REPORTED`.

A soft stall triggers inspection, not interruption. A hard timeout engages the
transport kill switch and manual fallback; it does not automatically terminate the
role process. `Ctrl-C`, process termination, session reset, or retry requires
separate mission authority.

## 8. Interactive Prompt Rules

Advisor may respond only to an interaction that is:

- predicted by the committed launcher;
- within the already-approved mission;
- non-sensitive and non-expansive;
- explicitly covered by the handoff or canonical protocol.

Advisor must never auto-answer an unexpected approval, authentication, privilege,
DB, secret, protected-branch, production, live, destructive Git, force-push, or
scope-expansion prompt. Engage the kill switch for further transport and return the
exception to Leo/GPT when authority is required.

## 9. Result Collection and Evidence

Pane output is a progress signal, not final evidence. Advisor directly reads and
verifies:

- role result artifact;
- Advisor pointer file;
- allowed and actual changed-file lists;
- actual diff and test evidence;
- commit SHA, branch, upstream, push, and ancestry state;
- runtime unchanged evidence when required;
- review verdict, coverage, and session separation.

Record the result in `RESULT_LEDGER.md`. Missing or contradictory durable evidence
prevents progression even if the pane reports success.

## 10. Already-Authorized Follow-Ups

Advisor may route rework, re-review, commit, or push only when:

- the active mission already authorizes the step;
- the issue is patchable inside approved scope;
- the exact next actor and launcher are published;
- no new product, authority, risk, DB, secret, protected-branch, production, or
  live decision is required.

Otherwise STOP and return to Leo/GPT.

## 11. Kill Switch and Manual Fallback

The kill switch stops all new tmux input and follow-up transport immediately. It
does not terminate a running role process. Follow
`KILL_SWITCH_AND_FALLBACK.md`.

Manual routing is mandatory when:

- mode status is inactive or unknown;
- the kill switch is engaged;
- registry or pane identity is stale or ambiguous;
- launcher evidence is incomplete;
- synchronized panes are on;
- target readiness is uncertain;
- repository/branch isolation is absent;
- unexpected interactive input appears;
- observation or durable evidence is unavailable.

## 12. Authority That Never Transfers

Advisor-managed transport never grants Advisor authority to:

- implement as Worker;
- author as Control when Control is the assigned actor;
- perform independent review;
- accept `PASS_WITH_RISK`;
- resolve new scope, product, legal, safety, privacy, or canonical decisions;
- grant final approval or select the next mission.

Those decisions retain their canonical routes.
