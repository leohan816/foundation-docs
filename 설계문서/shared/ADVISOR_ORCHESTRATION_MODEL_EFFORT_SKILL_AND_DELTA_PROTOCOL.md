# Advisor Orchestration, Model Effort, Skill, and Delta Protocol

Status: `ACTIVE_CANONICAL_OPERATIONAL_POLICY`

Decision owner: Leo/GPT

Operational owner: Advisor

Applies to: every Advisor, Control, Worker, Designer, Debugger, and Sentinel route
managed through Agent Office or the Advisor tmux transport.

This policy complements, and does not replace,
`AGENT_ROLE_BOUNDARY_AND_RELEASE_TRAIN_PROTOCOL_V2.md`. The role protocol owns
authority. This policy owns routine orchestration quality, model-effort selection,
skill loading, design thresholds, unknown handling, and proportional delta
verification.

## 1. Default Execution Train

For substantial product or cross-component work, the default order is:

```text
Leo/GPT
-> Advisor intake and evidence/unknown gate
-> Control master-design delta
-> Advisor design validation and exact WorkUnits
-> Worker implementation with builder skill
-> independent Sentinel review with sentinel skill
-> same Worker routine patch, when needed
-> same Sentinel delta re-review
-> Advisor targeted final audit
-> Leo/GPT final approval
```

The omission of a step from a mission prompt does not silently remove this
default. Advisor records any justified exception.

### Design may be omitted only when all are true

- the change is local and reversible;
- no new state, contract, authority, security, persistence, cross-repo, or product
  behavior is introduced;
- the implementation is mechanical or a narrowly specified correction;
- affected tests and rollback are already clear;
- no material unknown remains.

Examples include a typo, exact naming correction, narrow documentation pointer,
or a test-only correction to an already accepted invariant. Advisor records
`DESIGN_PASS_SKIPPED_LOW_RISK` and the reason. Complexity must not be invented for
simple work.

## 2. Map-Is-Not-Territory Unknown Gate

Before design or implementation, Advisor reads actual current code, canonical
contracts, repo instructions, Git state, and relevant evidence. Prior summaries,
mission prose, diagrams, and session names are hypotheses until current evidence
supports them.

For each material unknown, record:

- confirmed fact;
- assumption;
- missing evidence;
- decision owner;
- safe default;
- affected design or capability;
- cost if wrong;
- evidence or experiment required to resolve it.

Resolution rules:

- technical evidence may resolve a technical unknown;
- a product, authority, risk, or legal-policy unknown returns to Leo/GPT or its
  named authority;
- `EXPERIMENT_REQUIRED` remains unresolved until the experiment exists;
- missing or conflicting identity, PII, safety, schema, authority, irreversible
  write, production, or memory-learning evidence escalates to the highest
  applicable unknown gate;
- unknown facts fail closed. Actors must not fill them from names, proximity,
  stale state, terminal prose, or historical behavior.

## 3. Role and Skill Contract

Skill choice follows role, not model name:

| Role | Required mode or skill | Boundary |
|---|---|---|
| Advisor | Advisor protocol; no implementation skill | Orchestrate, validate, audit, escalate |
| Control design | `CONTROL_MASTER_DESIGN_MODE` | Design and contract alignment only; no runtime patch |
| Worker implementation | `/fable-builder` | Implement approved WorkUnits and tests only |
| Independent Reviewer | `/fable-sentinel` | Read-only, distrust summaries, inspect direct evidence, no patch |
| General Debugger | `/fable-debugger` | Diagnose bounded non-contract failures; does not replace Builder or Sentinel |
| Future Designer | dedicated reviewed designer skill when activated | Until then, use Control master-design mode; never claim an inactive skill |

Every launcher states the role, exact session, required skill/mode, source handoff,
return target, allowed scope, forbidden scope, and verdict/result contract. A
skill remains required even when the selected model is strong.

## 4. Dynamic Model and Effort Policy

Advisor selects effort from actual risk and complexity, then verifies the live
runtime before every dispatch. Session names never prove model or effort.

| Actor | Low-risk/narrow | Normal substantial | High-risk/complex |
|---|---|---|---|
| Advisor | `xhigh` default | `xhigh` | `max` only for exceptional unresolved authority/security or cross-repo risk |
| Control designer | `high` for narrow design delta | `xhigh` | `max` for Level 3 contract/security/data architecture |
| Worker | `medium/high` for mechanical local work | `xhigh`; `Ultracode` when supported for complex implementation | strongest approved implementation profile, with explicit reason |
| Sentinel Reviewer | `high` for tiny docs or exact delta | `xhigh` for ordinary implementation review | `max` for Level 3 security/authority/PII/DB/payment/prod or unresolved uncertainty |

`Ultracode` is implementation-oriented and is not the default review profile.
Fable5, SOL, Opus, Codex, or another approved model may fill a role only when the
actual runtime, independence, and required skill behavior are verified.

Advisor records:

- actual session, model, and effort;
- task risk level;
- selection rationale;
- any fallback or model change;
- why a higher effort was unnecessary or required.

Effort may rise when evidence reveals wider risk. It may fall for a truly narrow
delta only when the required coverage and independence remain unchanged.

## 5. Delta-First Design, Documentation, Review, and Testing

The objective is sufficient proof, not repeated ceremony.

### First candidate

- inspect the complete relevant design and authority boundary;
- run focused tests during development;
- run the mission-required complete suite before first independent review;
- capture exact base, candidate, changed files, failures, and evidence.

### Routine patch loop

- inspect the actual delta and load-bearing surrounding code;
- patch only the classified findings;
- rerun changed-surface tests plus adjacent regression tests;
- update only affected canonical clauses, traceability rows, and indexes;
- use the same independent Reviewer for a bounded delta re-review;
- preserve earlier accepted evidence and rejected alternatives.

Do not reread or rewrite every document, rerun every suite, or repeat the full
review merely because a small patch exists.

### A complete suite is rerun when

- runtime product source changed after the last complete green suite;
- shared contracts, dependencies, build/configuration, auth/security, persistence,
  or cross-cutting infrastructure changed;
- the patch is broad or refactors load-bearing behavior;
- a focused failure suggests a wider regression;
- the Reviewer requests it with a concrete reason;
- the approved mission explicitly requires it at that gate.

For a test-only or documentation-only delta after a source-stable complete green
suite, targeted lint/typecheck/tests and direct adversarial reproduction are
sufficient unless a regression signal appears. The final audit links the last
complete green source commit to every later delta and states exactly what was not
rerun.

## 6. Review Precision

Sentinel review must:

- inspect exact base, candidate, diff, and changed/load-bearing files;
- reproduce the highest-risk claims directly;
- distrust Worker and Advisor summaries until evidence supports them;
- classify findings as defect, risk, documentation drift, deferred gate, or
  decision requirement;
- return `PASS`, `PASS_WITH_RISK`, `NEEDS_PATCH`, or `FAIL`;
- avoid candidate patches, final approval, and scope expansion.

Routine `NEEDS_PATCH` returns to the same Worker and then the same Reviewer.
`PASS_WITH_RISK`, a new product/authority decision, or unresolved material risk
returns to Leo/GPT.

## 7. tmux Transport and Monitoring

- existing registered role sessions only;
- exact committed launcher and exact pane only;
- serial execution for dependent work and same-repo writers;
- observe active sessions approximately once per minute while waiting;
- verify result files, pointers, commits, pushes, tests, and upstream state;
- no broadcast, wildcard, synchronized panes, or blind resend;
- no automatic response to auth, privilege, secret, DB, production, protected
  branch, or unexpected approval prompts.

Transient capacity or API errors may be resumed in the same session with the
exact task and no scope change. Use bounded retry with observation between
attempts. A fallback model requires live identity verification, compatible role
quality, required skill reload, and a ledger entry. Do not silently lower the
required risk coverage.

## 8. Naming and Communication

- The current official product name is `SIASIU`. Do not emit `Shashu`, `SHASHU`,
  `shashu`, or Korean legacy spellings except in clearly marked historical
  citations.
- Routine user-facing progress updates are Korean unless Leo asks otherwise.
- The final report intended for Leo/GPT is English unless Leo asks otherwise.
- After answering a status question, Advisor resumes the active mission unless
  Leo explicitly pauses or stops it.

## 9. Completion Audit

Advisor closes only after required actors have returned and direct evidence
supports the mission. The final audit records:

- original intent and accepted design;
- actual model/effort/skill/session for each actor;
- exact candidate and Git state;
- full-suite evidence frontier and later delta evidence;
- tests run, tests not rerun, and reason;
- review verdict and unresolved risks;
- rollback and safe runtime state;
- deferred scope and next blocked capability;
- next Leo/GPT decision.

Advisor does not grant Founder approval or start the next mission automatically.
