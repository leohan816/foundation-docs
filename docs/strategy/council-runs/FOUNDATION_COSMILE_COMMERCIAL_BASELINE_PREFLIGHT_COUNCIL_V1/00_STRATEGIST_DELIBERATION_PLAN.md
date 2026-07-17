# Strategist Deliberation Plan

```text
MISSION_ID: FOUNDATION_COSMILE_COMMERCIAL_BASELINE_PREFLIGHT_COUNCIL_V1
DOCUMENT: 00_STRATEGIST_DELIBERATION_PLAN
AUTHOR_ROLE: STRATEGY_DECISION_ARCHITECT
STATUS: PHASE_0_PLAN
AUTHORITY: RECOMMENDATION_ONLY
REPORT_LANGUAGE: ENGLISH
COUNCIL_DECISION: REQUIRED
CURRENT_COMMERCIAL_AUDIT: NOT_STARTED
ADVISOR_DISPATCH: NOT_AUTHORIZED
PRODUCT_MODIFICATION: NOT_AUTHORIZED
CORRECTION_REVIEW_LIMIT: 3
```

## 1. Exact decision question

Should Leo authorize the proposed three-working-day, read-only Foundation + Cosmile
Commercial Baseline Audit?

If the answer is yes, the Council must identify the exact corrections that must be frozen
before activation, the prohibited scope, the evidence and runtime-safety requirements,
the Founder decisions genuinely required before starting, the mandatory Day 3 outputs,
and the conditions that require the audit to stop or return `HOLD`.

This mission challenges the Strategy Preflight. It does not perform or activate the
commercial audit.

## 2. Why Council review is required

```text
HARD_TRIGGERS:
- EXPLICIT_LEO_REQUEST
- MATERIAL_PRODUCT_DIRECTION_AND_RELEASE_GATE_DECISION
- PAYMENT_PII_DB_SECURITY_PRODUCTION_AND_PUBLIC_EXPOSURE_DECISION_SURFACE

SOFT_TRIGGERS:
- MULTIPLE_CREDIBLE_SCOPE_AND_EVIDENCE_OPTIONS
- CROSS_PROJECT_IMPACT
- POSSIBLE_PAID_BETA_DELAY
- MATERIAL_UNVERIFIED_ASSUMPTIONS

COUNCIL_DECISION: REQUIRED
```

The proposal determines whether the portfolio should spend another three working days on
read-only investigation before returning to implementation. It also controls cross-project
ownership, release-gate evidence, runtime safety, and the boundary between commercial work
and paused Memory V3 platform work. A material recommendation without independent strategic
challenge would be insufficient.

## 3. Selected composition

```text
COUNCIL_COMPOSITION:
- PRODUCT_USER_AND_BUSINESS_VALUE_CHALLENGER
- SYSTEM_ARCHITECTURE_SAFETY_AND_GOVERNANCE_CHALLENGER
- DELIVERY_SCOPE_EVIDENCE_AND_OPERATIONS_CHALLENGER
```

### Product, User, and Business Value

Required to test whether the audit is the smallest sufficient path to real customer use,
Paid Beta, commercial learning, and revenue; whether technical completeness is being
mistaken for product progress; and which decisions should be made before versus after the
audit.

### System Architecture, Safety, and Governance

Required to test Foundation, Cosmile, and SIASIU ownership, ordinary-commerce continuity,
hidden high-risk decisions, source-versus-runtime distinctions, current authority, and the
risk that a read-only audit silently becomes architecture or risk approval.

### Delivery, Scope, Evidence, and Operations

Required to test whether the promised outputs can be completed and closed in three working
days, whether the evidence model is operable, whether `UNVERIFIED` is a valid bounded exit,
and whether documentation and review overhead could exceed the decision value.

The six Specialist Challengers are intentionally unselected. This mission evaluates the
strategic design of a future audit; it does not provide legal, security, UX, data, AI, or
adversarial specialist approval. They remain `READY_IDLE`, mission `NONE`, and receive no
subject, reports, packets, or prompts.

## 4. Verified subject pins

```text
REPOSITORY: leohan816/foundation-docs
DRAFT_PR: 2
SUBJECT_BRANCH: strategy/foundation-cosmile-commercial-baseline-preflight-20260717
SUBJECT_COMMIT: 2170f85dddcea3282df786742d601eef2064cefc
SUBJECT_FILE: docs/strategy/20260717_FOUNDATION_COSMILE_COMMERCIAL_BASELINE_STRATEGY_PREFLIGHT_KO.md
SUBJECT_BLOB: 612c5fa8ba5cef842616b5c228602fda0fb9095e
SUBJECT_SHA256: b56b61173b8c0575ce9e3bae8f0f3f6ae75305dae7a959d8b203813b6b0aeabd
SUBJECT_STATUS: NOT_FINAL_NOT_MERGED_NON_EXECUTABLE
REMOTE_PR_HEAD_VERIFIED: YES
LOCAL_HEAD_EQUALS_REMOTE_HEAD: YES
WORKTREE_CLEAN_AT_ADMISSION: YES
```

The review subject is always the blob at the pinned commit. A later working-tree or branch
revision must not replace it during deliberation.

## 5. Council rules and runtime admission facts

```text
COUNCIL_ROOT: /home/leo/Project/council
COUNCIL_SETUP_COMMIT: 929cccba5673b9e98d79dc71d12910407f55bedd
COUNCIL_SETUP_PR: 3
LOCAL_INFRASTRUCTURE_MATCHES_SETUP_COMMIT: YES
TOTAL_RUNTIME_SESSIONS: 9
SELECTED_SESSIONS: 3
UNSELECTED_SPECIALIST_SESSIONS: 6
RUNTIME: OpenAI Codex CLI 0.144.5
MODEL_ALL_NINE: gpt-5.6-sol
EFFORT_ALL_NINE: xhigh
CURRENT_COUNCIL_MISSION_BEFORE_DISPATCH: NONE
```

Selected live bindings verified immediately before Phase 0 dispatch preparation:

| Session | Codex session ID | Exact CWD | Model / effort | Ready |
|---|---|---|---|---|
| `foundation-council-product-value` | `019f6f58-6808-7b43-a087-f7adad8524e2` | `/home/leo/Project/council/rules/product-user-business-value` | `gpt-5.6-sol / xhigh` | YES |
| `foundation-council-systems-risk` | `019f6f58-6802-78b0-b80d-07d0601864ef` | `/home/leo/Project/council/rules/systems-architecture-safety-governance` | `gpt-5.6-sol / xhigh` | YES |
| `foundation-council-delivery-evidence` | `019f6f58-67f7-7fe0-a62e-847182c21f2b` | `/home/leo/Project/council/rules/delivery-scope-evidence-operations` | `gpt-5.6-sol / xhigh` | YES |

All six Specialist panes were live in their exact role homes with `gpt-5.6-sol / xhigh`,
`READY_IDLE`, and mission `NONE`. No Specialist output or subject access is authorized.

## 6. Facts, assumptions, unknowns, and open decisions

### Verified facts supplied identically to all selected roles

1. The pinned Preflight verdict is `PROCEED_WITH_CORRECTIONS`; it is non-executable and
   has not activated an audit or implementation.
2. The pinned repository metadata remains current at admission: Agent Office
   `c837af565052119862ae5524656080b47974452d`, Foundation
   `33570b9d7db79c991bb216b6a2dc80880ba1f2d6`, SIASIU
   `e1830b45c6d2b22b2471bb5957b6aaf7fa6dd602`, Cosmile
   `b8b61d746e2bdbb8d7ab26405bf44fb665ad87a6`, and foundation-control
   `c89b792bed177aad9322e09debecc76caab0c8a0`; each tracked worktree is unchanged and
   its branch head equals the corresponding remote head.
3. Existing untracked documentation remains user-owned and outside this Council mission.
4. The reviewed Memory pointers at foundation-docs commit
   `eba7b5a2eb07aa98bed24e7bc560ba13510b696d` record WU1-WU7 and Cosmile C1/C2 at
   reviewed shadow boundaries; U1/U2/U3 are open and not closure-ready; WU8 runtime,
   sender/intake, durable candidate runtime, M3, and the next mission are not authorized;
   `HARD_STOP` is active.
5. The current Agent Office authority loop remains Leo/GPT -> responsible Advisor ->
   selected Foundation Team actors -> responsible Advisor -> Leo/GPT. Council roles are
   outside that execution loop and report only to the Strategy Decision Architect.
6. No commercial audit activation, Advisor dispatch, product modification, build, test,
   runtime, DB, endpoint, vendor execution, risk acceptance, release approval, or next
   mission is authorized by this Council mission.

### Assumptions to be challenged

1. A bounded three-working-day audit is the smallest sufficient next step.
2. The proposed Day 3 package can support a real implementation-priority decision even
   when some items close as `UNVERIFIED`.
3. The Core three-role composition is sufficient to challenge this Strategy Preflight
   without obtaining specialist approval.
4. A commercial ownership map plus targeted critical-flow tracing can avoid exhaustive
   repository review while still exposing material blockers.
5. Separating source, runtime, integration, and external evidence prevents readiness
   overstatement without making the audit needlessly restrictive.
6. Memory V3 can remain paused without blocking the identification of Foundation's
   commercial core or Cosmile's ordinary commerce path.

### Material unknowns deliberately left for the proposed audit

- complete Cosmile as-built customer and operator flows;
- complete Foundation commercial judgment and degraded-mode flow;
- complete real/partial/mock/shadow/dead/unverified matrix;
- complete Paid Beta and Public Launch blocker enumeration;
- current DB, deployment, monitoring, backup, recovery, vendor, legal, and operations
  readiness;
- exact approved runtime command classes for a future audit;
- exact Paid Beta cohort, SKU, country, currency, real-payment, operator, and exit
  thresholds;
- exact future audit actor/model/skill bindings at Advisor dispatch time.

These unknowns must not be silently converted into current facts or investigated to full
audit depth in this Council mission.

### Open decisions

- authorize, correct, hold, or reject the proposed audit;
- freeze the exact read-only audit scope and no-build list;
- choose static-only evidence or a specifically bounded local-evidence safety envelope;
- identify the minimum Paid Beta definition needed before investigation;
- distinguish decisions required before audit from decisions the audit should inform;
- confirm that the commercial development branch is a Day 3 recommendation and later Leo
  decision, not an admission assumption;
- identify exact stop/HOLD conditions and mandatory Day 3 outputs.

## 7. Allowed evidence and prohibited depth

### Allowed

- the exact pinned Preflight blob;
- current Council shared rules and the selected Challenger's own role files;
- the four exact Memory final pointers cited by the Preflight at commit
  `eba7b5a2eb07aa98bed24e7bc560ba13510b696d`;
- current Agent Office role authority files at exact head
  `c837af565052119862ae5524656080b47974452d`;
- exact repository metadata or exact cited paths when necessary to test a material
  objection;
- targeted, read-only source inspection only when necessary to distinguish a claimed
  capability, ownership boundary, or artifact existence from an assumption.

### Prohibited

- complete repository surface inventory;
- full customer-flow or Foundation judgment-flow tracing;
- complete mock-versus-real matrix or blocker enumeration;
- build, lint, test, smoke, runtime, DB, endpoint, migration, network, or vendor execution;
- architecture redesign, code-quality review, security audit, or legal approval;
- product repository modification or patching the pinned subject during Phases 1-3;
- commercial audit activation or Foundation Team actor dispatch.

Any preliminary blocker remains `PRELIMINARY_NOT_COMPLETE`.

## 8. Common questions

All three selected Challengers receive the same twelve common questions in
`01_COMMON_MISSION_BRIEF.md`. The Strategist does not defend the Preflight, provide
intermediate feedback, or revise the subject during the blind initial round.

## 9. Role-specific questions

The exact questions are recorded in `02_ROLE_SPECIFIC_QUESTIONS.md`. Each Challenger
receives only its assigned section. The entire coordination file is not supplied during
the blind initial round.

## 10. Blind-review procedure

1. Dispatch the common brief and exactly one role-specific question set to all three
   sessions without waiting for or processing a first result.
2. Each role re-ACKs role, CWD, model, effort, mission ID, subject commit and blob, and
   confirms no visibility into another report.
3. Each role reads the pinned subject and only allowed evidence needed for its lens.
4. Each role writes exactly one English initial report to its assigned path.
5. The Strategist waits for all three. No report is shown to another role and no
   intermediate patch or feedback is issued.
6. After schema and boundary validation, hash and freeze all three initial reports. They
   are never edited; later position changes belong in later files.

## 11. Cross-review procedure

1. After all initial reports are frozen, the Strategist reads all three and creates
   `06_INITIAL_FINDINGS_MATRIX.md` without deleting, silently merging, or weakening any
   material or minority finding.
2. The Strategist creates `07_CROSS_REVIEW_PACKET.md` with the same issue set and exact
   questions for all three.
3. Only then may the three selected roles read one another's frozen initial reports,
   matrix, and packet.
4. Each role writes one separate cross-review report. Original reports remain immutable.
5. The Strategist waits for and freezes all three cross-reviews before classification.

## 12. Focused correction and rebuttal procedure

Focused rebuttal is required only for `MATERIAL_DISAGREEMENT`. Leo has authorized up to
three bounded correction/re-challenge iterations when a material problem persists.

- Round 1 uses `12_FOCUSED_REBUTTAL_PACKET.md` and reports 13-15.
- If a material issue remains and a precise correction or new argument could resolve it,
  Round 2 uses files suffixed `_R2` while preserving Round 1 unchanged.
- A final Round 3 may use files suffixed `_R3` under the same rule.
- The pinned Preflight is not patched during these rounds. Proposed narrow corrections
  are tested in the packet and applied only in Phase 5 after final synthesis.
- Every selected role receives the same packet in a round and may respond once.
- No role is pressured toward agreement. No direct role-to-role communication occurs.

After Round 3, any remaining material conflict is classified `UNRESOLVED` or
`FOUNDER_DECISION_REQUIRED`; it does not justify a fourth round.

## 13. Issue-classification method

Every material issue receives a stable `ISSUE_ID`, source role, exact proposition,
evidence pin, fact/inference/assumption status, severity, decision impact, and positions
from all three roles.

Severity:

- `BLOCKING`: the audit cannot safely or usefully start without correction or Founder
  decision;
- `MATERIAL`: changes scope, evidence, timebox, outputs, or recommendation;
- `ADVISORY`: improves clarity without changing authorization.

Deliberation status:

- `CONSENSUS`;
- `RESOLVED_AFTER_CROSS_REVIEW`;
- `MATERIAL_DISAGREEMENT`;
- `FOUNDER_DECISION_REQUIRED`;
- `OUT_OF_SCOPE`.

Final synthesis status maps to `CONSENSUS`, `RESOLVED`, `UNRESOLVED`,
`FOUNDER_DECISION_REQUIRED`, or `OUT_OF_SCOPE`.

## 14. Debate termination conditions

Terminate when every issue is classified, each role's verdict is stable, no new material
evidence or argument appeared in the final authorized round, Founder decisions are
separated from repo facts and recommendations, and minority positions remain preserved.

Terminate earlier when no material disagreement exists. Terminate after Round 3 even if
disagreement persists, preserving it as unresolved. Do not seek artificial consensus.

## 15. Strategist synthesis method

The Strategy Decision Architect evaluates each finding against the pinned subject,
evidence, role lens, cross-review, and any focused responses. Majority vote is not the
decision rule. Each finding is `ACCEPTED`, `REJECTED_WITH_REASON`, or `UNRESOLVED` with
its effect on the Preflight and minority preservation recorded. The final recommendation
must distinguish:

- corrections required before audit;
- Founder decisions required now;
- decisions better informed by the audit;
- unresolved facts to be verified during the audit;
- matters outside this Council mission.

## 16. GitHub output plan

1. Write all artifacts first under the authorized local run directory.
2. Produce the English final synthesis and Korean Leo decision brief.
3. Apply only a narrow, traceable delta to the pinned Preflight if accepted findings
   require correction; do not rewrite it wholesale.
4. Create the complete change record with original and updated pins.
5. Copy the exact run snapshot to
   `docs/strategy/council-runs/FOUNDATION_COSMILE_COMMERCIAL_BASELINE_PREFLIGHT_COUNCIL_V1/`
   in the existing clean Preflight worktree.
6. Use only branch `strategy/foundation-cosmile-commercial-baseline-preflight-20260717`
   and Draft PR #2; commit and push, do not merge.
7. Stop for Leo/GPT review. Advisor handoff and audit start require a later explicit
   Leo/GPT `OK` and are not part of this mission.

All base artifacts 00-19 are published. If a conditional phase is skipped, its file
records the exact reason. Optional Round 2 or Round 3 rebuttal files are also published
when used.

## 17. Exact stop conditions

Stop and report a conflict if any of the following occurs:

- subject commit/blob, branch, or Draft PR pin cannot be reproduced;
- the existing Preflight branch advances or diverges unexpectedly before publication;
- Council infrastructure differs from setup commit `929cccba...` before dispatch;
- a selected session has the wrong model, effort, role, CWD, or active conflicting task;
- an unselected Specialist receives or reads the mission or selected-role output;
- another role's initial output becomes visible before all initial reports freeze;
- a Challenger writes outside its assigned run path, patches the subject, or exceeds the
  allowed evidence depth;
- a required report is incomplete, corrupt, or cannot be frozen;
- meaningful resolution would require product modification, prohibited runtime, risk
  acceptance, or Advisor/Foundation Team dispatch;
- the publication worktree contains unrelated changes.

Reaching the three-round limit is not an authority conflict; remaining issues are recorded
as unresolved or Founder decisions and the mission proceeds to bounded synthesis.

## Phase 0 plan gate

```text
PLAN_HAS_EXACT_SUBJECT_PINS: YES
FACTS_ASSUMPTIONS_UNKNOWNS_SEPARATED: YES
COMMON_BASELINE_IDENTICAL: YES
ROLE_SPECIFIC_QUESTIONS_DISTINCT: YES
COUNCIL_COMPOSITION_EXACT: YES
DEBATE_PROCESS_DEFINED: YES
TERMINATION_CRITERIA_DEFINED: YES
GITHUB_OUTPUT_DEFINED: YES
PRODUCT_MODIFICATION_AUTHORIZED: NO
AUDIT_ACTIVATION_AUTHORIZED: NO
PLAN_GATE: PASS
```

Phase 1 may begin only after `01_COMMON_MISSION_BRIEF.md` and
`02_ROLE_SPECIFIC_QUESTIONS.md` are complete and validated against this plan.
