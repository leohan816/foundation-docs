# 50 — Foundation Bounded Snapshot Delivery Design (Phase 5)

```text
MISSION_ID: COSMILE_O1_KOREA_GOLDEN_COMMERCE_DESIGN_READINESS_V1
WORKUNIT_ID: O1-P5-FOUNDATION-SNAPSHOT-DESIGN
ACTOR: foundation
ROLE: Foundation repository-owner Worker
MODE: BOUNDED_FOUNDATION_SNAPSHOT_DELIVERY_MAPPING_DESIGN_ONLY
SKILL: /fable-builder (loaded; anchor/mapping/report discipline applied)
DATE: 2026-07-17
STATUS: READY_FOR_ADVISOR_INTEGRATION_AND_INDEPENDENT_DESIGN_REVIEW
HANDOFF_COMMIT: d24c03b0414d070682d39f84aff07613b4da7c57
AUTHORITY_COMMIT: 24b94ef6a0673a6fa350a3e21a83ca22506afde9
EVIDENCE_COMMIT: b632529f2907e19f92f27770eac4208d60d4cb7d
IMPLEMENTATION_AUTHORIZED: NO
PRODUCT_REPOSITORY_WRITE: ZERO
RETURN_TO: foundation-advisor
```

This artifact is a **design only**. It creates no code, schema, DB, runtime, endpoint,
provider, or product-repository change, and it grants no implementation authority. It
designs exactly the bounded Foundation-owned lane the handoff names: what canonical
product content Foundation may provide, how a product snapshot is identified, versioned,
integrity-anchored, approved, delivered, corrected, superseded, withdrawn, and safely
re-delivered, and how `foundation_product_id` binds to `cosmile_sku_id` — nothing more.

---

## 0. Anchors and live verification (this session, before design)

### 0.1 Canonical anchors

| Anchor | Value | Verified how |
|---|---|---|
| Handoff | `advisor/jobs/.../handoffs/50_FOUNDATION_SNAPSHOT_DESIGN_HANDOFF.md` | working copy byte-identical to `git show d24c03b0:<path>` (`HANDOFF_MATCHES_COMMIT`) |
| Mission authority | `docs/strategy/20260717_COSMILE_O1_KOREA_GOLDEN_COMMERCE_DESIGN_READINESS_MISSION_KO_EN.md` (888 lines, KO+EN both read in full) | working copy byte-identical to `git show 24b94ef:<path>` |
| Evidence 10 | `10_FOUNDATION_PRODUCT_FACTS_AND_ELIGIBILITY.md` | matches `EVIDENCE_COMMIT` blob; sha256 `f94476c438a89d3499b41029cbb956d5c05d9cf0b8607c664f32b9ae6ed796e7` (= value recorded by Designer §1) |
| Evidence 20 | `20_COSMILE_AS_BUILT_AND_REUSE.md` | matches `EVIDENCE_COMMIT` blob; sha256 `62332fb804f0b9c6ea2352d24d4d900cb61f6e74ec790f9553d43fdf73db8fc4` (= value recorded by Designer §1) |
| Evidence 40 | `40_DESIGNER_EXPERIENCE_DESIGN.md` | matches `EVIDENCE_COMMIT` blob (added in `b632529f`); sha256 `011d973247b7474b11f62f7d8a957eb4df0fa36e2b876ee6843c4eaad763dc43` |
| Role/protocol reads | Agent Office `TEAM_OPERATING_MODEL.md`, `roles/worker.md`, FOUNDATION `AGENTS.md`, `CLAUDE.md`, `docs/agent/RUN_PROTOCOL.md`, `docs/agent/RESULT_REPORTING_PROTOCOL.md` | all read in full this session before design |

### 0.2 Live runtime and workspace verification

| Item | Result |
|---|---|
| Actor / role | `foundation` session operating as Foundation repository-owner Worker in `/home/leo/Project/FOUNDATION` (CWD verified; AGENTS.md team binding read) |
| Model | **Fable 5 (`claude-fable-5`) — live-verified** (session `/model` output "Kept model as Fable 5" + harness environment declaration) |
| Effort | Declared `max` by dispatch (user-selected). Honest limit: session-level effort is not independently inspectable in-session. The only inspectable file (`~/.claude/settings.json`, global default `effortLevel: xhigh`) is demonstrably **stale for this session** (its `model: opus[1m]` contradicts the live-verified Fable 5), so it is not evidence against the dispatch declaration. No evidence contradicts `max`; nothing was reduced. |
| FOUNDATION workspace | branch `shadow/foundation-shared-memory-v0`, HEAD `33570b9d7db79c991bb216b6a2dc80880ba1f2d6` = PINNED_HEAD of evidence 10; only the 2 pre-existing untracked files (unchanged) |
| Vault (canonical knowledge source) | `leohan816/foundation-vault` at `/home/leo/data/vaults/SIASIU_COSMILE_VAULT`, branch `main`, HEAD `70c39e0eb8c6559c4af55d6020a4613d75e8cfbf`, working tree clean (0 dirty) — **matches evidence 10 pin**; all reads below are git-object reads at this HEAD |
| Cosmile (read-only reference) | branch `shadow/m4-cosmile-memory`, HEAD `b8b61d746e2bdbb8d7ab26405bf44fb665ad87a6`, 6 pre-existing untracked files — **matches evidence 20 pin**; not written, not executed |
| Output worktree | `/home/leo/Project/.worktrees/foundation-docs/COSMILE_O1_KOREA_GOLDEN_COMMERCE_DESIGN_READINESS_V1`, branch `advisor/cosmile-o1-korea-golden-commerce-design-readiness-v1-20260717` |
| Sub-agents / dispatch | ZERO (all reads performed personally in this session) |

### 0.3 Targeted read-only re-verification performed (per handoff "only where necessary")

1. `products/elt` tree at vault HEAD = `5aca3592cb5a46d5052fb5fe850f78be04256ce0`; all 8
   per-product tree hashes byte-match evidence 10 §3 pins (`1187623b… d5707afd… fd71897b…
   24001a26… 5e709f18… 37001a24… df4a05c3… dce34d28…`).
2. `elt-serum-vitayouth-01/core.yaml` (blob `aee73997…`): `product_id`/`brand_id`/`status:
   active`/`current_slug`/`canonical_names`/`name_history` (3 entries with `source_ref`)/
   `spec: 50ml`/`formula_version: 1`/`functional.mfds_functional: true (brightening,
   anti_wrinkle)`/`claims_control…human_review_needed: true`/`relations`/`version:
   {data_version: 1.0.0, last_reviewed: 2026-06-25, status: prism_v0.1}` — all as reported.
3. `elt-pad-vitayouth-01/offers.yaml`: two sub-SKU descriptors `elt-pad-vitayouth-01-40`
   (`volume: 40매/100g` with the recorded caution — source §3/§9 contains 80매/200g
   copy-paste contamination, official confirmation pending) and `elt-pad-vitayouth-01-80`
   (`volume: 80매/200g`, primary, = `core.spec`); price/stock/shipping all null/unknown;
   record note: "Cosmile commerce에서 채움".
4. `elt-sunscreen-vitayouth-01/core.yaml`: `mfds_functional: true` with triple functions
   `uv_protection, brightening, anti_wrinkle`; `cert:mfds-triple-functional` tag.
5. `foundation_core/config.py` blob at FOUNDATION HEAD = `589b42f36d53ee687057b3043502f809f1fac15c`
   (path-contract pin of evidence 10 §2 intact). FOUNDATION package layout re-listed:
   `foundation_core/` (read layer: `config.py`, `_read.py`, `registry.py`),
   `foundation_intake/` (write layer), `foundation/` (incl. `_core/`, `contracts/`,
   `cosmile/`, `adapters/`, `api/`, `tests/`).

No other Phase 1 fact required re-verification; everything else below cites evidence 10/20/40.

---

## 1. Scope and non-goals

**In scope (exactly the handoff list):** canonical field contract; snapshot/version/
integrity/effective-time/approval/provenance identity; mapping proposal for the three
named products; Foundation-side delivery/ack/replay/correction/supersession/withdrawal/
re-delivery semantics; approval-owner and human-review boundary; fail-closed gate
categories; missing/stale/corrected/superseded/withdrawn/unavailable behavior; the
order-history non-rewrite invariant and minimum Cosmile-retained fields; Foundation-owned
future work units with `PATH_STATUS`; acceptance evidence, rollback/HOLD, parallelization,
estimate, and external decision dependencies.

**Non-goals (explicitly not designed or owned here, per handoff and mission §8):**
customer identity, price, stock, cart, order, payment, fulfillment, shipment,
cancellation, return, refund (all Cosmile commercial ownership); final transport,
provider, secret, credential, production topology; Legal policy, sales eligibility, or
any binding Legal/regulatory conclusion; product-experience redesign; Memory V3, SIASIU,
recommendation, production activation, or any general Foundation rewrite. Foundation is
**never** a synchronous runtime dependency of catalog/cart/checkout/payment/order/
fulfillment/refund; ordinary commerce continues from Cosmile's approved local snapshot
when Foundation is unavailable.

Terminology guard: the vault `offers.yaml` `sku:` entries are **Foundation variant
descriptors** (structure facts), not commerce SKUs. `cosmile_sku_id`, price, stock, and
sales state are Cosmile-owned. This document uses "variant descriptor" for the Foundation
side to prevent the name collision from leaking authority.

---

## 2. Design baseline (verified facts this design stands on)

- Canonical source = git repository `leohan816/foundation-vault`; canonical checkout on
  this host `/home/leo/data/vaults/SIASIU_COSMILE_VAULT` per the tracked path contract in
  `foundation_core/config.py` (evidence 10 §2; re-pinned §0.3).
- ELT sale-candidate set = exactly 8 PRISM records; eligibility 6 USABLE / 1 UNVERIFIED
  (mask) / 1 INCOMPLETE (triplecapsule); all 20 `skin1004` (理肤天使) records BLOCKED by
  canonical brand identity (evidence 10 §§5–9). Nothing here changes any classification.
- Every ELT record carries `formula_version: 1`, `version.data_version: 1.0.0`,
  `version.status: prism_v0.1`, `human_review_needed: true`, `source_checksum: pending`,
  and a `core.source.raw_file` provenance pin (evidence 10 §§4,7).
- No commercial-use-rights evidence, no MFDS report numbers, and no binary imagery exist
  anywhere in the canonical source (evidence 10 §§7–8) — these become fail-closed gates
  (§7), never conclusions.
- Cosmile today reads catalog from a hardcoded mock behind the `foundationProductClient`
  seam, seeds `CommerceSku` from that mock, and its checkout re-prices server-side from
  its own DB (evidence 20 §§2,8, RC-4). The consumer of this design is that seam swap —
  owned by the Cosmile lane, not by Foundation.
- Designer §12 defines the experience-side lifecycle projection this design must feed:
  `CURRENT_APPROVED / STALE_LAST_APPROVED / MISSING_INITIAL / CORRECTED‧SUPERSEDED /
  WITHDRAWN / runtime-unavailable`, with outage ≠ withdrawal.

---

## 3. Canonical field contract — exactly what Foundation may provide

Foundation may deliver, per product snapshot, **only** the following field groups, each
traced to a verified PRISM source. Everything is content/fact data; nothing is a commerce
value or a suitability/safety verdict.

| # | Group | Fields delivered (source file at vault HEAD) | Notes / limits |
|---|---|---|---|
| F1 | Identity | `product_id` (immutable), `brand_id`, `status`, `current_slug`, `canonical_names` (brand+product, ko/en/zh), `name_history[]` (+`source_ref`), `category.type`, `spec`, `lang_origin` (`core.yaml`) | `product_id` format `{brand}-{type}-{line_key}-{seq}`; renames never change `product_id` |
| F2 | Brand | brand identity ko/en/zh, country (`_brand.yaml`) | ELT `zh: null` — verified; used for exclusion logic, not display invention |
| F3 | Content / display | locale display fields for `ko`, `en`, `zh` (`locales/*.yaml`) incl. `cautions` | Locale **display gate**: `ko` = launch review scope; `en`/`zh` delivered but display-gated OFF until separately reviewed (§12 Q-D5, Leo decision) |
| F4 | Ingredients | full ordered ingredient list (`order_preserved`, `complete` flags), per-item canonical atom refs (`ing:*`) + `mapped`/`needs_review` status, completeness flags (`ingredients.yaml`, `core.ingredient_index`) | Deterministic mapping only; `needs_review` items delivered as-is with status, never force-mapped. Triplecapsule: partial list delivered only with its self-declared partial flag |
| F5 | Claims | decomposed claims with mandatory `source_ref` + `verification_status` (`source_claim` \| `brand_claim_unverified`), incl. recorded test conditions (`claims.yaml`) | Foundation delivers statuses; **which statuses may be displayed is an approved display policy consumed by Cosmile — not decided here** |
| F6 | Claims control / safety guardrails | `claims_control` allowed/forbidden lists (e.g., eye cream blocks `botox_replacement`/`permanent_lifting`); safety-relevant content flags (e.g., retinol presence); `tags.safety`/`tags.cert` (`core.yaml`, `claims.yaml`) | Guardrails are content facts about what must not be claimed — not a suitability verdict |
| F7 | Warnings | legally standard cosmetics cautions (locale `cautions`), fragrance allergens where recorded (e.g., serum-vpdrn limonene/linalool/citral), source-qualified absence records | Absence stays source-qualified, never asserted |
| F8 | MFDS functional **as recorded** | `functional.mfds_functional`, `functional.functions[]` (`core.yaml`) | Source-claim level only; **no report numbers exist** — delivered together with `GATE_MFDS` status (§7). Never delivered as verified regulatory approval |
| F9 | Variant descriptors | `offers.yaml sku[]`: `sku_id` (e.g., `elt-pad-vitayouth-01-40/-80`), `label`, `volume`, per-variant `source_raw`, per-variant verification status | `-40` volume delivered **only** with `verification_status: UNVERIFIED` (recorded source contamination; §0.3.3). No volume value is invented or "cleaned" |
| F10 | Provenance / sources | `core.source.raw_file`, `collected_at`, `collected_by`, named external sources as recorded in intake headers, `coverage.yaml` section-status summary counts, `source_checksum` status (`pending` today) | Plus snapshot-level provenance: `vault_commit`, `product_tree_hash`, export metadata (§4) |
| F11 | Approval | snapshot approval record (§6): `approval_status`, `approved_by`, `approved_at`, approved scope (locales/field groups) | New record type — proposal; today's factual state is `REVIEW_PENDING` for all 8 |
| F12 | Gate categories | per-product statuses of the six fail-closed gates (§7): rights, MFDS-verification, imagery, provenance-checksum, stale, human-review | Categories/status only — never Legal text or conclusions |

**Explicitly excluded from every snapshot (never delivered as display/commerce input):**

- `offers.yaml` price/`sales_status`/stock/shipping/promotion — volatile, dated
  (2026-06-25) collected references; the record itself defers to "Cosmile commerce에서
  채움". Price/stock/sales state are Cosmile authority (mission §8). Excluding
  `sales_status` also makes the recorded enum drift (`on_sale`/`active`/`unknown`)
  a non-issue for this contract (§12 Q-D8).
- `assessment.yaml` — honest-interpretation layer, globally `usable_for_judge: false`;
  delivering it to a commerce surface would risk unverified suitability/efficacy leakage
  (Designer principle 5; Cosmile WATCH-B).
- Any suitability/safety **verdict** — that is the separate Foundation consultation
  runtime contract (already consumed fail-closed by Cosmile per evidence 20 §3.1-8),
  not part of the product snapshot.
- Any binary imagery — none exists in the canonical source (`GATE_IMAGERY`, §7).
- Any customer-, order-, or memory-related data — out of lane entirely.

---

## 4. Identity, snapshot/version, integrity, effective time, approval status, provenance

### 4.1 Stable `foundation_product_id`

`foundation_product_id := product_id` exactly as recorded in `core.yaml` (e.g.,
`elt-serum-vitayouth-01`). It is already immutable by PRISM contract (renames go to
`name_history`; verified §0.3.2), embeds the brand slug, and is the join key evidence 10
§11 proposed. `brand_id` travels alongside as a separate field. No new identifier scheme
is invented. Variant-level identity: `foundation_variant_id := offers.yaml sku[].sku_id`
exactly as recorded (`elt-pad-vitayouth-01-40`, `elt-pad-vitayouth-01-80`), nullable for
single-variant products.

### 4.2 Snapshot identity

```text
foundation_snapshot = {
  foundation_product_id,            # e.g. elt-serum-vitayouth-01
  vault_commit,                     # e.g. 70c39e0eb8c6559c4af55d6020a4613d75e8cfbf
  product_tree_hash,                # git tree hash of the record dir, e.g. 37001a24…
  data_version,                     # from core.version.data_version, e.g. 1.0.0
  formula_version,                  # from core.formula_version, e.g. 1
  snapshot_schema_version,          # export envelope schema, proposed "fsnap-1.0"
  snapshot_content_sha256           # computed at export over the canonicalized payload
}
```

A snapshot is **immutable**: same identity tuple ⇒ same bytes, forever. New content ⇒ new
vault commit ⇒ new `product_tree_hash` ⇒ new snapshot. This directly extends the anchor
evidence 10 §11 proposed and answers Q-D2 with **yes** (§12).

### 4.3 Integrity proposal (content hash or equivalent)

Two layers, both concrete today or at export time — no new invention needed for layer 1:

- **L1 — git object integrity (available now, zero code):** `product_tree_hash` is a
  content-derived Merkle hash of the entire record directory at `vault_commit`, anchored
  in the vault's append-only history. Honest limit: git object hashes here are SHA-1;
  adequate as a tamper-evidence anchor inside a trusted private repo, not claimed as a
  cryptographic guarantee against adversarial collision.
- **L2 — export envelope integrity (computed at export):** `snapshot_content_sha256` =
  SHA-256 over the canonically serialized exported payload (stable key order, declared
  encoding). Recorded in the delivery manifest (§5); Cosmile verifies before import;
  serves as the replay/idempotency key (§9.3).
- **L3 — source-depth (backfill WU-F2):** per-record `source_checksum` is `pending` in
  all 8; until backfilled, source-file integrity rests on vault git history (evidence 10
  A2). Gate `GATE_PROVENANCE_CHECKSUM` carries this status honestly (§7).

### 4.4 Schema/version semantics (what bumps what)

| Version field | Governs | Bump rule (proposed) | Consumer meaning |
|---|---|---|---|
| `snapshot_schema_version` (`fsnap-1.0`) | export envelope structure | additive-only within a major; breaking envelope change ⇒ new major, requires re-approved consumer mapping | Cosmile import code compatibility |
| `version.status` (`prism_v0.1`) | record schema generation inside the vault | owned by PRISM 설계서; carried through as metadata | provenance only |
| `data_version` (semver, per record) | record **content** | patch = typo/format-only; minor = meaning-affecting content correction (claims/ingredients/cautions/name display); major = record-shape/coverage restructuring | correction significance signal |
| `formula_version` (int) | physical formula identity | bumped only on confirmed formula change (today all 1; U6 keeps todo) | **material correction category**: Cosmile must re-confirm display and treat it like a corrected snapshot, never silently swap |

Ordering rule: snapshots of a product are ordered by **delivery manifest sequence**
(§5), which follows vault commit ancestry. `data_version` is a significance signal, not
the ordering key (a rollback-by-supersession may re-publish older content under a newer
sequence; §9.7).

### 4.5 Effective time (three timestamps, never conflated)

| Timestamp | Meaning | Owner |
|---|---|---|
| `approved_at` | when this snapshot's approval record (§6) was granted — the Foundation-side effective-from; staleness (§7 GATE_STALE) is measured from here | Foundation approval record |
| `delivered_at` | when the snapshot/manifest was handed to Cosmile — delivery ledger fact | Foundation delivery ledger |
| local activation time | when Cosmile activates the imported snapshot for display | **Cosmile-owned** (its design lane) |

Available time anchors today, honestly labeled: `version.last_reviewed` (2026-06-25,
intake-level review, **not** commerce approval) and vault commit timestamps. Neither is
claimed to be `approved_at`; no approval exists yet (§6).

### 4.6 Approval status enum (per snapshot, proposed)

`DRAFT → REVIEW_PENDING → APPROVED_FOR_COMMERCE_DISPLAY(scope) → SUPERSEDED | WITHDRAWN`

- Factual current state of all 8 ELT records: `REVIEW_PENDING` (`human_review_needed:
  true`; no approval record exists anywhere).
- `APPROVED_FOR_COMMERCE_DISPLAY` carries an explicit scope: locales (ko first) and any
  field-group restrictions. Approval is **per snapshot**, not per product forever: a new
  snapshot re-enters `REVIEW_PENDING` (patch-level may use an expedited re-approval — a
  process decision for the approval owner, §6).
- `SUPERSEDED`/`WITHDRAWN` are terminal markers on old snapshots; they never delete
  content (§11 INV-1).
- Fail-closed: **only `APPROVED_FOR_COMMERCE_DISPLAY` snapshots are deliverable for
  display use.** The sandbox text-only fixture path (Designer §16.1, `NOT_LIVE_SALE_
  EVIDENCE`) is the sole exception and requires its own explicit preflight recording.

### 4.7 Provenance carried by every snapshot

Record-level: `source.raw_file`, `collected_at`, `collected_by`, named sources as
recorded, `coverage.yaml` status counts, `source_checksum` status. Snapshot-level:
`vault_commit`, `product_tree_hash`, exporter identity/version, `exported_at`,
`snapshot_content_sha256`. Approval-level: the §6 approval record reference.

---

## 5. Snapshot export envelope and delivery manifest (shape proposal)

Per-product **snapshot document** = the §3 field groups + §4 identity/provenance/approval
+ §7 gate block, canonically serialized. Product-set **delivery manifest**:

```text
manifest = {
  manifest_seq,                 # monotonic integer, no gaps, per delivery stream
  created_at,
  snapshot_schema_version,
  snapshots: [ { foundation_product_id, snapshot identity tuple,
                 snapshot_content_sha256, approval_status+scope } ],
  notices:   [ { seq, type: CORRECTION|SUPERSESSION|WITHDRAWAL|GATE_CHANGE,
                 foundation_product_id, supersedes?, category, approved_by, approved_at } ]
}
```

- The manifest is the **single signal channel**: corrections, supersessions,
  withdrawals, and gate-status changes are manifest notices, not side channels (Q-D3).
- Delivery is **pull-based**; Cosmile imports manifests strictly in `manifest_seq` order;
  a gap means "request missing seq first" — this is the out-of-order and safe-re-delivery
  guard (§9.6–9.7). Cadence is a Cosmile operational choice; Foundation imposes none and
  is never called synchronously in a commerce path.
- **Transport binding: not selected here** (handoff prohibition). Candidate directions
  are recorded in §13 WU-F3 with `PATH_STATUS`; the choice belongs to Leo with the
  Cosmile lane's input.

---

## 6. Approval owner and human-review boundary

**Facts:** every ELT record has `human_review_needed: true` (C1). No approval record,
approver identity, or review workflow exists in the vault or FOUNDATION repo. Vault
`00_VAULT_설계.md` and PRISM 설계서 define record structure, not commerce approval.

**Proposal (bounded):** a per-product, append-only `approval.yaml` in the record
directory (`products/{brand}/{product_id}/approval.yaml`) holding entries
`{snapshot identity tuple, approval_status, scope, approved_by, approved_at, note}`.
`PATH_STATUS: PROVEN` as a structure (per-product YAML files are the established vault
pattern; deterministic writes belong to the `foundation_intake` write layer) — creating
it is later implementation (WU-F1), not authorized here.

**What Foundation-side review covers** before `APPROVED_FOR_COMMERCE_DISPLAY`:
identity/display-name correctness (incl. the eye cream's 3-variant KO-name todo),
claims_control filtering correctness, cautions/allergen completeness against the intake
source, locale scope, gate-status truthfulness. **What it never covers:** Legal/rights
conclusions, MFDS regulatory verification, sale eligibility, price/stock — those belong
to Leo/Legal/vendor and Cosmile respectively.

**Owner and unresolved items (explicit, per handoff):**

| Question | Status | Who must decide |
|---|---|---|
| Final approval owner for commerce display | **Proposed: Leo** (consistent with mission authority: Foundation Worker may not self-approve; Advisor may not approve) | Leo |
| Day-to-day reviewer (may be delegated) and where the delegation is recorded | UNRESOLVED | Leo |
| Re-approval policy for patch-level snapshots (full vs expedited) | UNRESOLVED (proposal: every snapshot re-enters REVIEW_PENDING; expedited path allowed for patch) | Leo (with approval owner) |
| Who flips `human_review_needed` and whether the flag stays or is superseded by `approval.yaml` (Q-D4) | Proposal: `approval.yaml` becomes the authority; the legacy flag is retired by a later approved data change | Leo |
| en/zh locale approval | UNRESOLVED (ko-first proposed) | Leo |

---

## 7. Fail-closed gate categories (never Legal conclusions)

Each gate is a named, per-product **category with status**, embedded in every snapshot
(F12). Default = fail closed: an unresolved required gate blocks public display/sale use
of the affected product only. No gate status here asserts or clears any Legal position.

| Gate | Current factual status (all evidence-pinned) | Fail-closed effect | Evidence record location (proposed) | Decision owner |
|---|---|---|---|---|
| `GATE_RIGHTS` (sale authorization R1, content reuse R2, clinical-claim republication R3, entity structure R6) | `NO_EVIDENCE` — nothing in vault or FOUNDATION repo | no public sale/exposure of affected brand/product | per-brand `products/{brand}/_rights.yaml` + per-product overrides, entries only from Leo/Legal-confirmed outcomes (Q-D7; `PATH_STATUS: PROVEN` as vault YAML structure) | Leo + Legal/vendor |
| `GATE_MFDS` (R4/U1) | functional status is source-claim level; **0 report numbers on file** | functional display wording blocked until verification evidence recorded | same rights/approval registry pattern; verification evidence stored when provided | Leo + Legal/regulatory |
| `GATE_IMAGERY` (R5/Q-D6) | `NONE_CANONICAL` — vault excludes binaries (commit `13be58c`), no image rights evidence | no image delivered; Cosmile shows neutral placeholder (Designer C01); no likeness fabrication | asset pipeline outside current canonical scope; ownership UNRESOLVED | Leo |
| `GATE_PROVENANCE_CHECKSUM` (C2) | `PENDING_BACKFILL` — `source_checksum: pending` ×8; integrity = vault git history + tree hash | non-blocking for internal sandbox (git anchoring suffices); public-display requirement = Leo decision; backfill is WU-F2 | per-record field (exists) | Leo (threshold), Foundation (backfill execution after approval) |
| `GATE_STALE` | threshold **does not exist**; only `last_reviewed: 2026-06-25` + commit times | when age(from `approved_at`) > threshold ⇒ `STALE_LAST_APPROVED` (§10); outage alone never triggers it | threshold value recorded with approval policy (WU-F1) | **Leo** (explicit mission/Designer carry-forward) |
| `GATE_HUMAN_REVIEW` (C1) | `REVIEW_PENDING` ×8 | no display-use delivery before `APPROVED_FOR_COMMERCE_DISPLAY` (§4.6) | `approval.yaml` (§6) | Leo (owner), reviewer TBD |

Gate-status changes after delivery are themselves manifest notices (`GATE_CHANGE`), so a
later revocation (e.g., rights withdrawn) propagates as a contained, auditable event —
typically paired with a `WITHDRAWAL` notice for the affected product (§9.5).

---

## 8. `foundation_product_id <-> cosmile_sku_id` mapping proposal

### 8.1 Binding record (stored and owned by Cosmile; shape is a design input)

```text
binding = {
  cosmile_sku_id,                  # Cosmile-assigned, Cosmile-owned
  foundation_product_id,           # §4.1
  foundation_variant_id,           # nullable; exact recorded sub-sku_id (§4.1)
  foundation_snapshot_pin: {       # snapshot active at bind/activation time
    vault_commit, product_tree_hash, data_version, formula_version,
    snapshot_content_sha256 },
  bound_at, bound_by
}
```

Cardinality: one `foundation_product_id` → N `cosmile_sku_id` (N≥1) via distinct
`foundation_variant_id`; each `cosmile_sku_id` → exactly one
`(foundation_product_id, foundation_variant_id)` pair; no Cosmile SKU may bind two
Foundation products. The **binding is product/variant-level and survives snapshot
supersession**; only `foundation_snapshot_pin` moves (by Cosmile's local activation of a
newer approved snapshot). Price/stock/sales state live only on the Cosmile side of the
binding.

### 8.2 The three named bindings

| Foundation input | Variant | Binding status proposed | Grounds (all pinned) |
|---|---|---|---|
| `elt-serum-vitayouth-01` (representative) | `null` (single 50ml) | **BINDABLE_FOR_REHEARSAL_DESIGN** — 1 binding row | USABLE (evidence 10 §9); cleanest single-variant shape; both Golden runs use it (Designer §1.1) |
| `elt-pad-vitayouth-01` (boundary) | `elt-pad-vitayouth-01-80` | **BINDABLE_FOR_REHEARSAL_DESIGN** — 1 binding row (exercises 1-product→N-SKU boundary) | 80매/200g is the primary, `core.spec`-consistent variant (§0.3.3) |
| `elt-pad-vitayouth-01` | `elt-pad-vitayouth-01-40` | **NOT_BINDABLE — `BLOCKED_UNVERIFIED`** until the official volume is confirmed and lands as a corrected snapshot | recorded source copy-paste contamination (§0.3.3); **the 40-count volume is not invented, not "cleaned", and not delivered as displayable** (handoff hard rule; Designer §1.1) |
| `elt-sunscreen-vitayouth-01` (conditional) | `null` (single 50ml) | **CONDITIONAL** — pre-designed binding row, activated only if Leo retains the sunscreen after the MFDS/Legal display review | triple-functional incl. `uv_protection` (§0.3.4) = materially different claims-display surface; no different shipment/refund mechanics proven (evidence 10 §10) |

No Legal/regulatory gate is cleared by any row above; every row remains behind the §7
gates for any live/public use. Expansion beyond these three follows the evidence 10 §10
expansion rule unchanged (delta-check only; no per-product Golden repetition).

### 8.3 Foundation-side guarantees to the binding

1. `foundation_product_id` and `foundation_variant_id` values are stable — never reused,
   renamed, or re-cased. 2. Every pinned snapshot stays resolvable (§11 INV-2).
3. Variant set changes (add/remove/verify a variant) arrive only as corrected snapshots
   with notices, never as silent edits. 4. Foundation never writes, reads, or validates
   the Cosmile-owned half of the binding.

---

## 9. Foundation-side delivery semantics

### 9.1 Initial delivery
Prerequisites, all fail-closed: snapshot exists at a clean, pinned vault HEAD; approval
record grants `APPROVED_FOR_COMMERCE_DISPLAY` for the delivery scope (or the explicit
sandbox-fixture exception is recorded); gate block embedded. Foundation publishes
manifest `seq=n` listing the snapshot(s) + hashes. Cosmile pulls, verifies
`snapshot_content_sha256`, imports into **its** local approved-snapshot store (its
design lane), and acknowledges.

### 9.2 Acknowledgement
Ack = `{manifest_seq, per-snapshot: content-hash-verified (bool), imported_at,
local activation status}`, returned asynchronously, recorded in the Foundation delivery
ledger. **Absence of ack never auto-retracts a delivery** — it raises an operational
follow-up only. Delivery remains safe without ack because re-delivery is idempotent
(§9.3). Ack transport rides the same unresolved channel as delivery (§5).

### 9.3 Replay / idempotency
Idempotency key = `snapshot_content_sha256` (content-addressed) + `manifest_seq`.
Foundation never publishes two different payloads under one snapshot identity
(immutability, §4.2). Re-delivery of an already-imported manifest/snapshot must be a
no-op on both sides (`DUPLICATE_IGNORED` — same category the Designer requires for
operator surfaces, O03). The delivery ledger is append-only; a replayed publish appends
a `redelivery` entry, never mutates the original.

### 9.4 Correction and supersession
A correction is a **new snapshot**: new vault commit/tree hash, `data_version` bumped per
§4.4, `supersedes: <prior snapshot identity>`, `correction_category ∈ {content_fix,
display_identity_fix, variant_verification, formula_change, gate_status_change}` —
delivered with a `CORRECTION`/`SUPERSESSION` notice. Only the latest approved snapshot is
deliverable for new display; the supersedes chain is preserved end-to-end. In-place
mutation of a delivered snapshot is prohibited (INV-1). `formula_change` is always
material: Cosmile must reconfirm display (Designer §12 `CORRECTED/SUPERSEDED` row) —
still without any order-history rewrite.

### 9.5 Withdrawal
A `WITHDRAWAL` notice: `{foundation_product_id, withdrawal_category ∈ {safety_concern,
rights_revoked, data_integrity, brand_request, other_with_note}, seq, approved_by,
approved_at}`. Category only — no Legal text, no conclusions. Effect contract (matching
Designer §12): new sale/display of the affected product stops fail-closed; **only** the
affected product is contained; historical snapshots remain resolvable so existing
orders, refunds, and support continue untouched. Withdrawal requires the approval owner
(§6); Foundation tooling never self-initiates one.

### 9.6 Safe re-delivery
On failed/partial import, Cosmile-side loss, or gap detection: Cosmile requests the
missing `manifest_seq` range (or a current-state manifest); Foundation re-issues
byte-identical content (idempotent by content hash). Strict `seq`-ordered import means a
gap blocks later manifests — out-of-order application is structurally impossible, and a
re-delivered old manifest cannot regress state past newer applied notices.

### 9.7 Rollback rule (Foundation side)
Content rollback = **supersession by re-publication**: a new snapshot (new commit, new
`seq`) whose payload restores the prior-good content, with `correction_category:
content_fix` and `supersedes` pointing at the bad snapshot. History is never rewritten;
the ledger and vault stay append-only (★clean-not-compress). Delivery rollback of an
entire product = `WITHDRAWAL` (§9.5). There is no other rollback mechanism.

### 9.8 Availability contract
All of the above is pull-based and asynchronous. Foundation runtime availability is
**never** in the synchronous path of catalog/cart/checkout/payment/order/fulfillment/
refund. Foundation-unavailable behavior is §10 row 6.

---

## 10. Lifecycle behavior matrix (Foundation-side duties per state)

Aligned 1:1 with Designer §12; the left column is the snapshot condition, the middle two
columns are what Foundation must do / must never do; the right column is the Cosmile-side
consequence this design feeds (owned by the Cosmile lane).

| Condition | Foundation MUST | Foundation MUST NOT | Cosmile-side consequence (Designer §12) |
|---|---|---|---|
| `MISSING_INITIAL` (never delivered) | keep the product undelivered until §9.1 prerequisites pass; report gate statuses on request | pre-announce or partially leak unapproved content | affected product not exposed; cannot be added/paid |
| `CURRENT_APPROVED` | keep the snapshot resolvable; publish nothing new | mutate the delivered snapshot | ordinary display/commerce from local snapshot |
| Foundation runtime unavailable, local snapshot approved | nothing (pull model); recover ledger on restart from durable manifests | treat outage as withdrawal; require any synchronous call | **ordinary commerce continues from Cosmile's approved local snapshot**; suitability separately `UNKNOWN` (different contract) |
| `STALE_LAST_APPROVED` (age > Leo threshold) | surface age/version honestly; run re-validation per approval-owner policy | silently extend approval; fabricate freshness | last approved content shown only if approved commercial policy permits; else affected-item HOLD |
| `CORRECTED / SUPERSEDED` | deliver new snapshot + notice with supersedes chain (§9.4); keep both resolvable | delete/rewrite the old snapshot | new display uses newly activated snapshot; cart highlights change; **historical orders do not rewrite** |
| `WITHDRAWN` | issue categorical notice (§9.5); keep historical snapshots resolvable | erase content; state Legal reasons; touch other products | affected listing unavailable; history/support/cancel/refund remain usable |
| rights/MFDS/imagery gate unresolved or regressed | carry gate status truthfully in snapshot + `GATE_CHANGE` notices | imply clearance; make Legal conclusions | no public sale/display beyond approved minimal fallback; sandbox fixture only under `NOT_LIVE_SALE_EVIDENCE` |

---

## 11. Order-history non-rewrite invariant and minimum Cosmile-retained fields

**INV-1 (Foundation non-rewrite).** Once delivered, a snapshot
`{foundation_product_id, vault_commit, product_tree_hash}` is never deleted, mutated, or
re-issued with different content. All change is forward-only supersession (§9.4/9.7).
The vault is append-only; archive, never delete (★clean-not-compress).

**INV-2 (Resolvability).** Every delivered snapshot remains resolvable by its pin for at
least the retention life of any order line referencing it. The mechanism today is vault
git history (object-level, already content-addressed). Honest dependency: this guarantee
is only as durable as the vault repository itself — repo persistence/backup ownership is
an infrastructure fact for Leo to confirm, recorded here as an external dependency
(§14.5), not silently assumed.

**INV-3 (Minimum snapshot/version fields Cosmile must retain per historical order
line):** `foundation_product_id`, `foundation_variant_id` (nullable),
`vault_commit`, `product_tree_hash`, `data_version`, `formula_version`,
`snapshot_content_sha256` (when imported via the §5 envelope), and the **displayed**
product name + spec exactly as rendered at order time. Rationale: the order line must
be renderable and auditable even if Cosmile's local snapshot store is rebuilt, and
attributable to exact content even across later corrections/withdrawals.

**INV-4 (Authority separation).** Order-line price, quantity, discount, policy version,
and every other commercial field are Cosmile-owned; this design imposes **only** the
INV-3 snapshot fields and takes no position on Cosmile's order schema. (Evidence 20
shows `OrderItem` already snapshots commercial values — composition is the Cosmile
lane's design choice.)

**INV-5 (Non-retroactivity).** Corrections, supersessions, and withdrawals affect new
display only. Historical order lines continue to show their retained INV-3 content
(Designer §8: "exact historical product/SKU/price/policy/snapshot display… even if the
current catalog product is corrected or withdrawn").

---

## 12. Answers to the Phase-1 open questions (evidence 10 §12 Q-D1–Q-D8)

| Q | Answer in this design | Status |
|---|---|---|
| Q-D1 delivery form | Exported per-product snapshot documents + sequenced delivery manifest, pull-based (§5). Not a vault copy (would leak non-deliverable layers like `assessment.yaml` and offers prices); not a synchronous read API (violates the availability contract §9.8 for commerce use). | Shape proposed; **transport binding UNRESOLVED** (prohibited here; §13 WU-F3, Leo decision) |
| Q-D2 snapshot anchor | **Yes** — `{vault_commit + product_tree_hash + data_version + formula_version}` accepted, extended with `snapshot_content_sha256` + `snapshot_schema_version` (§4.2–4.3) | Resolved (design level) |
| Q-D3 correction/withdrawal signaling | Manifest notices with monotonic `seq`, pull-based, gap-detected (§5, §9.4–9.6); no synchronous dependency | Mechanism proposed; cadence = Cosmile operational choice; channel UNRESOLVED with transport |
| Q-D4 review gate owner | `approval.yaml` per snapshot (§6); final owner proposed = **Leo**; `human_review_needed` flag retired by later approved data change | Proposed; reviewer/process UNRESOLVED → Leo |
| Q-D5 locale scope | `ko` = launch review scope; `en`/`zh` delivered but display-gated OFF until separately approved (F3) | Proposed; decision → Leo |
| Q-D6 imagery | No canonical binaries exist; snapshot carries `GATE_IMAGERY: NONE_CANONICAL`; rights-cleared asset pipeline is outside current canonical scope | Ownership UNRESOLVED → Leo |
| Q-D7 rights-gate record | Per-brand `_rights.yaml` + per-product overrides in the vault, entries only from Leo/Legal-confirmed outcomes; mechanically checkable by the §10 expansion rule (evidence 10 §10 item 3) | Structure proposed (WU-F1); content = external confirmations |
| Q-D8 `sales_status` normalization | **Excluded from the snapshot contract entirely** (§3 exclusions) — commerce state is Cosmile authority, so the enum drift cannot leak into delivery. Source-record hygiene fix proposed as WU-F4 (Foundation-owned data change, own approval required) | Contract-level resolved; data hygiene pending approval |

---

## 13. Foundation-owned future path / work-unit proposal (`PATH_STATUS` per handoff rule)

Only paths the current repository structure proves are marked `PROVEN`; everything else
is `UNRESOLVED`. Nothing below is authorized by this document.

| WU | Content (bounded) | PATH_STATUS + grounds | Est. |
|---|---|---|---|
| WU-F1 | Approval record (`approval.yaml`) + rights registry (`_rights.yaml`) schema definition and deterministic write tooling; stale-threshold + approval-policy recording | **PROVEN** as structure: per-product YAML files are the established vault pattern (§0.3); deterministic vault writes are the existing `foundation_intake` layer's charter (FOUNDATION CLAUDE.md §7). Registry **content** = external confirmations only | 1–2 d |
| WU-F2 | `source_checksum` backfill for the 8 ELT records (hash the pinned `raw_file/ELT/*` intake files; fill the existing pending field) | **PROVEN**: field exists (`source_checksum: pending` ×8), raw files exist and are referenced by `core.source.raw_file`; pure deterministic computation | 0.5–1 d |
| WU-F3a | Snapshot exporter: read-only over the vault via the existing read layer, producing §5 envelopes + manifests as files | **PROVEN** as module path: `foundation_core` (`config.py` path contract, `_read.py`) and `foundation/_core/vault_readonly_reader.py` (blob `18f21a0…`, evidence 10 §2) prove the read-only access pattern; a sibling export module follows the existing package layout (§0.3.5). Runtime LLM = 0 (deterministic export) | 2–4 d |
| WU-F3b | Delivery transport + ack channel binding | **UNRESOLVED**: no delivery channel exists today (Cosmile's `FoundationSignalOutbox` is producer-only with no consumer and points the **other** direction; the 8731 dev/shadow service is review-only). Candidate directions to present to Leo: file-bundle handoff; a read-only export endpoint grown from the existing service lineage; repo-mediated artifact exchange. **No selection made here** | n/a (decision first) |
| WU-F4 | `sales_status` enum + `spec: "확인 필요"` free-text hygiene in vault records | **PROVEN** mechanism (`foundation_intake` deterministic edit + golden regression); low priority — excluded from the delivery contract (§12 Q-D8); data change needs its own approval | 0.5 d |
| WU-F5 | Delivery ledger + manifest persistence as tracked, append-only files | **PROVEN** as a files-first pattern (vault/foundation-docs style append-only tracked artifacts); any DB/service-backed ledger variant is **UNRESOLVED** (no such store exists; Foundation is not a service DB) | 0.5–1 d (files-first) |
| WU-F6 | Data completion at source: pad `-40` official volume, mask 51-vs-52 ingredient conflict, triplecapsule full list/spec — landing as corrected snapshots via §9.4 | Vault mechanism **PROVEN** (correction = new record content + new snapshot); **externally blocked**: requires official/vendor confirmation (U2–U4) | 0.5 d each once sources exist |

Explicitly **not** proposed: any Foundation-side commerce store, price/stock mirror,
customer-facing endpoint, or durable customer memory — out of lane (mission §8;
FOUNDATION security rules).

---

## 14. Acceptance evidence, rollback/HOLD, parallelization, estimate, external dependencies

### 14.1 Acceptance evidence for this lane's later implementation (category/boolean/count only — no secrets/PII/raw dumps)

1. **Export determinism:** exporting the same pinned tree twice ⇒ byte-identical
   envelope, same `snapshot_content_sha256` (bool).
2. **Integrity verification:** manifest hash check passes on import simulation; a
   1-byte-tampered payload fails closed (bool ×2).
3. **Approval fail-closed:** snapshot without `APPROVED_FOR_COMMERCE_DISPLAY` ⇒ 0
   deliveries emitted (count=0).
4. **Idempotent redelivery:** duplicate manifest/snapshot replay ⇒ 0 new effects,
   `DUPLICATE_IGNORED` recorded (count=0 + bool).
5. **Supersession chain:** correction produces chain length 2 with both snapshots
   resolvable; only the newer is deliverable-for-display (counts + bool).
6. **Withdrawal containment:** withdrawal of 1 product affects exactly 1 product's
   deliverability; the other 7 unaffected; withdrawn snapshot still resolvable (counts).
7. **Gap guard:** simulated missing `seq` blocks later import until re-delivery
   (bool).
8. **INV-3 resolvability:** a historical pin resolves to identical content after a
   later correction (bool).
All demonstrable offline/one-process against the pinned vault — no live system, no
network, no PII, consistent with the mission's no-runtime boundary for design review and
with FOUNDATION testing-meaning rules (each check proves a contract above).

### 14.2 Rollback / withdrawal / HOLD rules (design-time and run-time)

- Rollback = §9.7 only (supersession by re-publication, or categorical withdrawal).
  History rewrite, force-push, ledger mutation: prohibited.
- HOLD (stop and return to Advisor/Leo) whenever: an export is attempted from a dirty or
  unpinned vault state; a required approval or gate record is missing; a delivered
  snapshot is discovered content-wrong (⇒ correction or withdrawal notice + escalation,
  never silent fix); a rights/MFDS gate regresses after delivery; any step would require
  DB/schema/secret/PII/live access (FOUNDATION Hard Stops); or a contract contradiction
  with the Cosmile-lane design emerges (builder STOP rule — return to design, no silent
  interpretation).
- Scope-expansion condition: any need to move price/stock/commerce state, customer data,
  or synchronous serving into Foundation ⇒ immediate HOLD to Leo (mission early-return
  rule).

### 14.3 Safe parallelization

WU-F1 ∥ WU-F2 ∥ WU-F3a are mutually independent (different files/modules, no shared
state). WU-F4/WU-F5 slot behind any of them. WU-F3b (transport) blocks only §9's
*execution*, not its design. **Nothing in this lane blocks the Cosmile Phase-5 technical
design** — it consumes this contract proposal as input. Binding *execution* (§8) waits on
Cosmile SKU assignment + Leo scope freeze. WU-F6 waits on external sources only.

### 14.4 Estimate (Foundation lane only; design-basis, MEDIUM confidence)

Technical lane WU-F1+F2+F3a+F5 ≈ **4–8 engineer-days** total (small, deterministic,
test-first per fable-builder; no LLM runtime). WU-F3b adds ~1–3 days *after* the
transport decision. Critical path to any **live/public** display is not engineering: it
is the external gate set (rights, MFDS, imagery, approvals) — calendar-unbounded,
vendor/Legal-dependent. The sandbox rehearsal design path needs **zero new Foundation
implementation**: the §4 pins and §8 binding inputs are already available read-only
today (evidence 10 §11), under the Designer's `NOT_LIVE_SALE_EVIDENCE` fixture rules.

### 14.5 External decision dependencies (consolidated)

- **Leo:** approval owner/process confirmation (§6); stale threshold (§7); locale scope
  (Q-D5); imagery pipeline ownership (Q-D6); sunscreen inclusion (§8.2); transport
  selection (WU-F3b); WU-F4 data-hygiene approval; vault repo persistence/backup
  confirmation (INV-2); scope freeze before any implementation.
- **Legal/vendor/regulatory (via Leo — no provider contact from this lane):** R1–R6
  outcomes into the rights registry; MFDS report numbers/verification; pad `-40`
  official volume; mask ingredient-list confirmation; triplecapsule completion data.
- **Cosmile lane:** `cosmile_sku_id` assignment; local snapshot store + import/ack +
  INV-3 retention landing in its repository-local design (Phase 5 sibling, `60_…`).

---

## 15. Handoff-requirement traceability

| Handoff requirement (50_…HANDOFF.md) | Section |
|---|---|
| exact canonical product fields incl. approval and rights/MFDS/imagery gate categories | §3 (F1–F12 + exclusions) |
| stable id, snapshot/version identity, schema/version semantics, content-hash/integrity, effective time, approval status, provenance | §4 (+§5 envelope) |
| mapping proposal for serum / 80-count pad / conditional sunscreen, no invented 40-count volume, no Legal gate cleared | §8 |
| initial delivery, ack, replay/idempotency, correction, supersession, withdrawal, safe re-delivery | §9 |
| approval-owner and human-review boundary + unresolved + who decides | §6 |
| rights/MFDS/imagery/provenance/checksum/stale gates as explicit fail-closed categories, no Legal conclusions | §7 |
| missing/stale/corrected/superseded/withdrawn/unavailable behavior with ordinary commerce continuing | §10 |
| exact order-history non-rewrite invariant + minimum Cosmile-retained fields, order-line/price/policy authority left to Cosmile | §11 |
| future path/work units only where repo structure proves the path; else `PATH_STATUS: UNRESOLVED` | §13 |
| acceptance evidence, rollback/withdrawal/HOLD, safe parallelization, estimate, external decision dependencies | §14 |
| reverify pinned facts read-only; no tests/runtime/DB/endpoint/network | §0.2–0.3, §16 |
| Phase-1 open questions answered for the delivery design | §12 |

---

## 16. Compliance attestations and return

- Product repositories written: **NONE** — FOUNDATION HEAD `33570b9` unchanged (only its
  2 pre-existing untracked files); vault HEAD `70c39e0` clean/unchanged; Cosmile HEAD
  `b8b61d7` unchanged (its 6 pre-existing untracked files only). Verified before and
  after writing.
- Code/test/build/lint/smoke/runtime/DB/endpoint/transaction/provider/network actions:
  **NONE** (filesystem reads + git read-only commands only).
- Secrets/PII/env values read or recorded: **NONE** (env **key names** never dumped; the
  one settings file read contains no secrets and is quoted only as staleness evidence).
- Sub-agents/delegated contexts/dispatch: **ZERO**.
- Legal conclusions made: **ZERO** (all rights/MFDS/imagery matters remain open gates).
- Commerce authority moved to Foundation: **ZERO** (price/stock/sales state/order/refund
  remain Cosmile-owned throughout; §1, §8.3, §11 INV-4).
- Writes performed: exactly this result file and its pointer file at the two
  handoff-named paths. Commit/push: **not performed** — not authorized by this handoff;
  left to foundation-advisor (consistent with the Phase-1 precedent).

```text
WORKUNIT_STATUS: COMPLETE
FOUNDATION_DELIVERY_DESIGN_COMPLETE: YES (design-only, review-ready)
CANONICAL_FIELD_CONTRACT: DEFINED (12 groups + explicit exclusions)
SNAPSHOT_IDENTITY: {vault_commit + product_tree_hash + data_version + formula_version + fsnap schema + sha256}
MAPPING_PROPOSAL: serum (bindable) · pad-80 (bindable boundary) · pad-40 (BLOCKED_UNVERIFIED) · sunscreen (CONDITIONAL)
GATES_FAIL_CLOSED: rights · MFDS · imagery · provenance-checksum · stale · human-review (no Legal conclusions)
ORDER_HISTORY_NON_REWRITE: INV-1..INV-5 defined; minimum retained fields specified
PATH_STATUS_UNRESOLVED: delivery transport/ack channel (WU-F3b) · imagery pipeline · reviewer process · stale threshold
IMPLEMENTATION_AUTHORIZED: NO
PRODUCT_CODE_CHANGED: NO
DATABASE_CHANGED: NO
IMPLEMENTATION_STARTED: NO
SCOPE_EXPANSION_REQUESTED: NO
RETURN_TO: foundation-advisor
STOP
```
