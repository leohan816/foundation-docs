# U1–U3 Discovery and Closure-Readiness Package — Independent Full Review Result

```text
MISSION_ID: MEMORY_V3_U1_U3_DISCOVERY_AND_CLOSURE_READINESS_V1
REVIEW_ID: U1-U3-CLOSURE-READINESS-FULL-REVIEW-001
REVIEW_PASS: FULL_REVIEW
ROLE: Independent Reviewer (Sentinel)
ACTUAL_ACTOR: foundation-reviewer-fable5
RESPONSIBLE_ADVISOR: foundation-advisor
RETURN_TO: foundation-advisor

VERDICT: PASS
BLOCKING_FINDINGS: 0
OBSERVATIONS (non-blocking, recorded for the audit trail): CR-N1, CR-N2
PACKAGE_STATUS_VALIDATED: accurate, complete, path-true, decision-ready closure requests
```

## 0. Live runtime, skill, independence (verified this pass)

- tmux (live): `session=foundation-reviewer-fable5 window_id=@5 pane_id=%5` — matches
  TARGET IDs. **ACTUAL_MODEL: claude-fable-5** (Fable 5 family; live). **EFFORT: max**
  (live `CLAUDE_EFFORT=max`). SKILL: `/fable-sentinel`. Sole active Reviewer dispatch.
- Independence: the subject was authored by `foundation-advisor` from Control discovery
  evidence (`foundation-control`, Opus 4.8 (1M)/high per its §0); this session authored
  neither. Read-only for the subject and evidence; wrote only the two declared files; no
  stage/commit/push/dispatch; no agent/subagent; no DB/secret/network/implementation
  action. Advisor/Control summaries were verified against pinned source, not trusted.

## 1. Subject and evidence pins — reproduced exactly

| Pin (handoff 30 @ `338ee59`) | Claimed | Reproduced | Match |
|---|---|---|---|
| SUBJECT @`402087e` | blob `40f66614…`, SHA-256 `3e043eda…bb266a` | both recomputed identical (503 lines read in full) | ✓ |
| CONTROL_DISCOVERY @`b00103b` | blob `4dd70716…`, SHA-256 `b04c5c28…27a232` | both recomputed identical (390 lines read in full) | ✓ |
| Prior Gate Package @`1eb7f88` | — | the GP-1-corrected package this session delta-PASSed | ✓ |
| Prior Advisor Final Audit @`8859574` | — | read; final states verified (§3 below) | ✓ |
| Design @`08dc39d` | — | SHA-256 `2213262a…` re-verified in this mission chain | ✓ |
| Repo pins | FND `33570b9` · COS `b8b61d7` · SIA `e1830b4` · CTL `c89b792` | all live HEADs identical; Cosmile origin == `b8b61d7` (the reviewed C2 PASS head) | ✓ |

Mission authority `00_MISSION_AUTHORITY.md` and the required role documents were read
directly; the mission's premise chain is verified: the prior audit records
`WU8_C1: REVIEWED_PASS` (head `ad172db`), `WU8_C2: REVIEWED_PASS` (head `b8b61d7`),
`U1_U3_GATE_PACKAGE: REVIEWED_DECISION_READY`, gates OPEN, F1–X1 NOT_AUTHORIZED,
HARD_STOP ACTIVE.

## 2. Independent reproduction of the discovery claims (criterion 1/8 — no trust)

Every load-bearing discovery claim was reproduced directly at the pinned heads this pass:

| # | Claim (package/Control) | Direct evidence | Match |
|---|---|---|---|
| R1 | FOUNDATION has no Dockerfile/compose/k8s/helm/terraform and **no Python packaging manifest at all** (no requirements*/pyproject/setup.py/Pipfile) | repo-wide `ls-tree -r` grep @`33570b9` = empty; root inventory = source dirs + docs only | ✓ |
| R2 | No workload-identity token (spiffe/spire/workload_identity/service_principal/x509/istio/envoy) in Foundation product source | `git grep` @`33570b9 -- foundation/` = empty | ✓ |
| R3 | No DB usage in `foundation/**` (`sqlite3.connect`/`psycopg2.connect`/`create_engine`/`sqlalchemy`/`DATABASE_URL`) | `git grep` @`33570b9` = empty; the only sqlite3/psycopg2 tokens are `_core` boundary **denylists** (re-verified earlier this mission chain) | ✓ |
| R4 | Cosmile has no compose/k8s/terraform; `middleware.ts` is a pure path-header passthrough deferring auth to page-guard/route; `.env.example` keys are exactly `DATABASE_URL, COSMILE_SUBJECT_SECRET, COSMILE_FUREF_SECRET, COSMILE_REC_EVENT_ENABLED` (key names only); `package.json` has no next-auth/jsonwebtoken/jose/clerk/passport/mtls/spiffe | all reproduced @`b8b61d7` letter-exact | ✓ |
| R5 | The committed `app/src/app/api/commerce-evidence/consents/route.ts` is **revoke-only** and not a current-consent query surface | route read @`b8b61d7`: a single `POST` requiring exactly `{action:"revoke", purpose:"cross_service_commerce_evidence"}` → `revokeCrossServiceConsent`, status-only response, idempotent; no GET/state query exists | ✓ |
| R6 | `ConsentRecord` durable local model exists | `schema.prisma:979 model ConsentRecord` @`b8b61d7` | ✓ |
| R7 | Foundation security guardrail: "not a durable customer memory DB" | pinned `CLAUDE.md:132` @`33570b9` — letter-present | ✓ |
| R8 | Verdict seams and fail-closed defaults (`ProvenanceVerdict` 4-status; `ConsentVerdict` 9-state GRANTED-only; UNCONFIGURED defaults; landed non-GRANTED reason mapping) | verified at `verifiers.py:15-70` and `validator.py:210-217` earlier in this mission chain at the same pin — unchanged | ✓ |
| R9 | Landed ledger one-process RLock, zero durability claim | `ledger.py:2,5,85` @`33570b9` (this chain) | ✓ |
| R10 | Cosmile Prisma `^6.19.3` + PostgreSQL is Cosmile-local (C1 disposable rehearsal proven 28/28 by this Reviewer) | `app/package.json`/`app/prisma` @pin; my own C1 reproduction | ✓ |

Zero drift found between the package's VERIFIED_FACTS and reality at the pins.

## 3. Criterion rulings (handoff criteria 1–8)

1. **Fact/path verification — VERIFIED** (§2 table; nothing was accepted from prose).
2. **Required fields — VERIFIED.** U1, U2, and U3 each contain all twelve
   mission-required fields (`VERIFIED_FACTS`, `CURRENT_STATUS`,
   `RECOMMENDED_DIRECTION`, `CLOSURE_READY`, `EXACT_REMAINING_DECISION`,
   `REQUIRED_DECISION_OWNERS`, `VERIFIED_TECHNOLOGY_AND_PATHS`, `UNRESOLVED_ITEMS`,
   `FAIL_CLOSED_DEFAULT`, `WORKUNITS_UNLOCKED_AFTER_EXPLICIT_CLOSURE`,
   `WORKUNITS_REMAINING_BLOCKED`, `PROPOSED_FOUNDER_CLOSURE_TEXT`), and every
   unverified item carries the exact `PATH_STATUS: UNRESOLVED / REQUIRED_OWNER /
   REQUIRED_DISCOVERY / DEPENDENT_WORKUNITS: BLOCKED` block.
3. **U1 — VERIFIED.** No qualifying workload-identity capability is evidenced (R1–R4);
   U1-B is explicitly not selected (`U1_B_PRECONDITION: NOT_SATISFIED`; "This package
   selects none of U1-A/B/C") — exactly the Gate Package's own conditional honored
   against negative discovery; the U1-A/U1-C comparison states the correct
   per-mechanism obligations (certificate vs signing-key lifecycles, freshness/replay,
   digest binding, incident); bindings and owners remain unresolved and fail-closed;
   the added guard that a generic local Docker engine/reverse proxy is not evidence of
   the required bindings is true and conservative.
4. **U2 — VERIFIED.** The exact nine-state GRANTED-only contract, the seven design §3.3
   request fields, purpose/notice/time rules, the landed failure mapping
   (REVOKED→consent_revoked, EXPIRED→consent_expired, MISMATCH→privacy_scope_exceeded,
   all else→consent_missing — letter-equal to `validator.py:210-217`), the five
   re-verification points, the snapshot-never-authority rule, the same-call-validity/
   second-pre-commit-query coupling (design §6.1), erasure limits, and the five decision
   owners are all present and letter-consistent. The existing Cosmile route is verified
   revoke-only (R5) and is represented exactly as such — not as a current-consent
   adapter; the adapter/transport remains UNRESOLVED.
5. **U3 — VERIFIED.** Foundation truly has no committed DB/ORM/migration/deployment
   foundation or durable path (R1–R3 — including the stronger no-packaging-manifest
   fact); no concrete technology, ORM, tool, path, topology, or owner is recommended
   ("direction only", explicitly not an implementation architecture); the relational
   U3-A direction and the six reviewed uniqueness constraints are carried **by
   reference** to the pinned design and GP-1-corrected Gate Package (no re-enumeration,
   hence no set-drift); Cosmile's Prisma/PostgreSQL evidence is marked
   `COSMILE_REFERENCE_ONLY … (non-transferable)`; and the package correctly surfaces the
   pinned Foundation guardrail (R7) as an explicit ownership-boundary decision the U3
   closure must resolve — an honesty-strengthening addition, not an inference of
   capability.
6. **Advisory-only — VERIFIED.** `CLOSURE_READY` values (NO / NO with
   `CONTRACT_READY: YES` / NO) are labeled advisory in the header, §8, and the mission
   authority's own definition; the three `PROPOSED_FOUNDER_CLOSURE_TEXT` blocks are
   labeled drafts (U1/U3 are explicit non-closure statements; U2 is a conditional
   approval request that itself states it authorizes no adapter/endpoint/transport/
   implementation and does not close U1/U3); no option is selected, no risk accepted,
   no gate closed, no implementation authorized anywhere.
7. **Dependencies/owners/exclusions/containment/OPEN — VERIFIED.** §5's blocked-by map
   is letter-consistent with the reviewed design §14 DAG and the corrected Gate Package
   (F1←U3; F2←U3+F1; F3←U1+U2+U3+F2; C3←U1+U2+F3; X1←all + prior gates); owner sets
   match the authority/Gate-Package assignments; §6 deferrals and §7 containment are
   complete, and all four repository heads were verified unchanged live this pass;
   U1/U2/U3 OPEN throughout; HARD_STOP ACTIVE.
8. **No fabrication — VERIFIED.** Every claim added by the package beyond the Control
   evidence (the revoke-only route path, the `ConsentRecord` model, the Docker-engine
   negative guard, the security-guardrail citation, the user-auth/opaque-ref
   characterization of Cosmile's existing secrets) was independently reproduced at the
   pins (§2 R4–R7); nothing is inferred as verified; `NONE VERIFIED`/`NONE FOUND` is
   used wherever discovery came up empty.

## 4. Observations (non-blocking, no action required)

- **CR-N1.** The package strengthens the Control evidence with four additional verified
  claims (R4 guard, R5 route, R6 model, R7 guardrail). All were reproduced true; this is
  recorded so the evidence→package delta is explicit in the audit trail. The R7
  guardrail tension (Foundation "not a durable customer memory DB" vs any future
  subject-linked durable evidence store) is a genuinely load-bearing addition that makes
  the U3 closure request more honest — the ownership-boundary decision is now named as
  prerequisite.
- **CR-N2.** Cosmetic only: U2's `VERIFIED_TECHNOLOGY_AND_PATHS` uses repo-qualified
  path prefixes ("FOUNDATION/foundation/…", "Cosmile/app/…") while U1/U3 use bare
  repo-relative paths. Both forms are unambiguous; no change needed.

## 5. Excluded scope and honest limits

- This review validates the closure-readiness package as accurate, complete, path-true,
  and decision-ready. It does not evaluate what Security/privacy/Legal/architecture
  *should* decide, does not close U1/U2/U3, and does not authorize any WorkUnit.
- Discovery negatives (no capability/technology found) are proven for the pinned
  repositories at the pinned heads; they cannot prove facts about infrastructure outside
  these repositories — exactly why the package routes those questions to the named
  external owners with `UNRESOLVED` status.
- Control's live-runtime self-declaration is record-checked from its committed artifact.

## 6. Verdict rationale

Every pin reproduces byte-exact; every load-bearing discovery claim — including all four
package-level additions beyond the Control evidence — reproduces letter-exact at the
pinned heads; all twelve mission-required fields are present per gate; the U1 negative
result is honestly carried into "do not select U1-B" with an accurate U1-A/U1-C
comparison; the U2-A contract is letter-consistent with the landed seams, the reviewed
design's request shape, failure mapping, re-verification points, and §6.1 coupling, with
the existing route correctly represented as revoke-only; U3 recommends direction only,
carries the six constraints by reference without re-enumeration drift, refuses to
transfer Cosmile's stack, and surfaces the standing Foundation guardrail as a named
prerequisite decision; closure-readiness is advisory everywhere, dependency maps are
letter-true to the reviewed design, and containment is verified live. Zero findings
survived the fabrication, count-trap, and authority-leak sweeps. `PASS`.
(`NEEDS_PATCH` has no finding to name; `PASS_WITH_RISK` has no review-discovered risk to
carry — the open gates are the package's subject matter, correctly OPEN; `FAIL` has no
basis.)

**This PASS validates package quality only. It selects no option, accepts no risk, and
closes no gate. U1 remains OPEN absent explicit Founder + Security closure; U2 remains
OPEN absent explicit Founder + privacy/Security/Legal/Cosmile-consent-authority closure;
U3 remains OPEN absent explicit Founder + Foundation-architecture/storage closure.
WU8-F1/F2/F3/C3/X1, delivery, intake, the durable backend, Full Package 1B, and M3
remain NOT_AUTHORIZED. Per the mission authority: Advisor final audit → HARD STOP → one
consolidated report to Leo/GPT.**

```text
VERDICT: PASS
CRITERIA: 8/8 VERIFIED · BLOCKING_FINDINGS: 0 · OBSERVATIONS: CR-N1, CR-N2 (non-blocking)
SUBJECT: 402087e731eff9be4908becb986695d795bad88e (blob 40f66614…, SHA-256 3e043eda…)
CONTROL_DISCOVERY: b00103b (blob 4dd70716…, SHA-256 b04c5c28…) — all claims reproduced
DISCOVERY_REPRODUCTIONS: 10/10 at FND 33570b9 · COS b8b61d7 (zero drift; four package additions all verified true)
CLOSURE_READINESS_VALIDATED: U1 NO · U2 NO (CONTRACT_READY YES) · U3 NO — advisory only, gates OPEN
PRODUCT_OR_CONTROL_WRITE: ZERO (FND 33570b9 · COS b8b61d7 · SIA e1830b4 · CTL c89b792 unchanged, verified live)
FOUNDATION_DOCS_WRITE: only the two declared files; NOT staged/committed/pushed
OPTION_SELECTED / RISK_ACCEPTED / GATE_CLOSED / DISPATCH / NEW_AGENT: NONE
WU8_F1_F2_F3_C3_X1 / DELIVERY / INTAKE / DURABLE_BACKEND / FULL_PACKAGE_1B / M3: NOT_AUTHORIZED
HARD_STOP: ACTIVE
ACTUAL_MODEL: claude-fable-5 (live) · EFFORT: max (live env) · SKILL: /fable-sentinel
NEXT: foundation-advisor final audit → HARD STOP → one consolidated report to Leo/GPT
RETURN_TO: foundation-advisor
STOP_AFTER_RETURN: true
```
