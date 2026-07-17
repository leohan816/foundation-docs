# 10 — Foundation Product Facts and Eligibility (Phase 1/2)

```text
MISSION_ID: COSMILE_O1_KOREA_GOLDEN_COMMERCE_DESIGN_READINESS_V1
WORKUNIT_ID: O1-P1-FOUNDATION-FACTS
ACTOR: foundation (Foundation repository-owner Worker)
MODE: READ_ONLY_FACT_VERIFICATION
SKILL: /fable-builder (loaded; read-only anchor/report discipline applied)
DATE: 2026-07-17
STATUS: COMPLETE — Phase 1/2 facts and eligibility only; Phase 5 delivery design NOT produced (per handoff)
RETURN_TO: foundation-advisor
```

Committed handoff executed:
`advisor/jobs/COSMILE_O1_KOREA_GOLDEN_COMMERCE_DESIGN_READINESS_V1/handoffs/10_FOUNDATION_FACT_VERIFICATION_HANDOFF.md`
(worktree commit `3833686`). Mission authority read in full (KO+EN):
`docs/strategy/20260717_COSMILE_O1_KOREA_GOLDEN_COMMERCE_DESIGN_READINESS_MISSION_KO_EN.md`
(added in commit `24b94ef`). Agent Office operating model, Worker role, FOUNDATION
`AGENTS.md`/`CLAUDE.md`, `docs/agent/RUN_PROTOCOL.md`, `docs/agent/RESULT_REPORTING_PROTOCOL.md`
read before work. No sub-agents, no delegated contexts, no dispatch (Worker rules).

---

## 1. Method and authority boundary

- Read-only inspection only: filesystem reads and `git` read-only commands
  (`status`, `log`, `rev-parse`, `ls-tree`, `show --name-status`, `remote -v`, `diff` on two
  tracked files). No product-repo writes, no code/test execution, no DB, no runtime,
  no endpoint, no provider contact, no network calls.
- This report makes **no binding Legal conclusions** and assigns **no commerce authority
  to Foundation** (price/stock/sales state remain Cosmile-owned).
- Everything below is either FACT (with evidence pin), ASSUMPTION, or UNKNOWN, and is
  labeled as such. §13 separates proven from not-proven.

## 2. Canonical knowledge-source location — verified from tracked evidence

Neither location candidate was silently declared canonical. The tracked evidence chain:

1. **Path contract (tracked code, FOUNDATION @ pinned HEAD `33570b9`)** —
   `foundation_core/config.py` (blob `589b42f36d53ee687057b3043502f809f1fac15c`):
   resolution order = env `FOUNDATION_VAULT_PATH` > env `FOUNDATION_DATA` > first existing of
   `~/Project/foundation-vault` (Mac 공식) → `~/data/vaults/SIASIU_COSMILE_VAULT` (Server 공식)
   → `~/SIASIU_COSMILE_VAULT` (legacy fallback, "이미 이동됨").
2. **Second tracked anchor** — `foundation/_core/vault_readonly_reader.py`
   (blob `18f21a0799ccc554ecbe663aeaff9699e5d4c8fb`) hard-allows read root
   `~/data/vaults/SIASIU_COSMILE_VAULT/knowledge`.
3. **Host state (observed)** — `/home/leo/Project/foundation-vault`: does not exist.
   `/home/leo/data/vaults/SIASIU_COSMILE_VAULT`: exists, git repo, clean (0 dirty paths),
   `main` == `origin/main`, HEAD `70c39e0eb8c6559c4af55d6020a4613d75e8cfbf`.
   `/home/leo/SIASIU_COSMILE_VAULT` is a symlink → `/home/leo/data/vaults/SIASIU_COSMILE_VAULT`
   (legacy path preserved as symlink; consistent with config.py's fallback comment).
4. **Repository identity** — the vault's git remote is
   `git@github.com:leohan816/foundation-vault.git` (fetch+push). The GitHub repo identity is
   `foundation-vault`; `SIASIU_COSMILE_VAULT` is only the server checkout directory name.
5. **Docs** — FOUNDATION `HANDOFF.md` confirms Phase 3 pending physical rename
   ("물리 경로 rename(SIASIU_COSMILE_VAULT→FOUNDATION_DATA)"); vault `00_VAULT_설계.md`
   (v0.1, 2026-06-22) still uses legacy `~/SIASIU_COSMILE_VAULT` notation — older than the
   config.py contract and the FOUNDATION CLAUDE.md v0.2 (2026-06-26) ownership statement.

**Conclusion (evidence-based):** the canonical knowledge source is the git repository
`leohan816/foundation-vault`; on this host, the canonical checkout per the tracked path
contract is `/home/leo/data/vaults/SIASIU_COSMILE_VAULT` (Server-official candidate; the
Mac-official path is absent here). `/home/leo/SIASIU_COSMILE_VAULT` is a compatibility
symlink to that same checkout, not a second source.

**Assumption A1:** no `FOUNDATION_VAULT_PATH`/`FOUNDATION_DATA` env override was set in the
verification shell (verified for this shell only); other runtimes could override — not
verifiable read-only from here.

## 3. Evidence pins

| Object | Pin |
|---|---|
| FOUNDATION repo | `/home/leo/Project/FOUNDATION`, branch `shadow/foundation-shared-memory-v0`, HEAD `33570b9d7db79c991bb216b6a2dc80880ba1f2d6` (= PINNED_HEAD; verified) |
| Vault repo | `leohan816/foundation-vault`, local `/home/leo/data/vaults/SIASIU_COSMILE_VAULT`, branch `main` (= origin/main), HEAD `70c39e0eb8c6559c4af55d6020a4613d75e8cfbf`, working tree clean → all file reads equal HEAD content |
| `products/` tree | `products/elt` tree `5aca3592cb5a46d5052fb5fe850f78be04256ce0` · `products/skin1004` tree `4b89720e2c2fb8c5eda58470ffa44a4ab9b88777` · `products/README.md` blob `0e0b2b3b…`, `products/_index.md` blob `d2a221af…`, `products/_schema.yaml` blob `84175aa9…` |
| ELT brand meta | `products/elt/_brand.yaml` blob `b5584fe6d51597c5cafff14330829a749d966da9` · `products/elt/_product_index.yaml` blob `db06b1b4603f767a32c011e046f6bf142e76866f` |
| Per-product trees (ELT) | `elt-cream-vitayouth-01` `1187623b…` · `elt-cream-vpdrn-01` `d5707afd…` · `elt-mask-vitayouth-01` `fd71897b…` · `elt-pad-vitayouth-01` `24001a26…` · `elt-serum-triplecapsule-01` `5e709f18…` · `elt-serum-vitayouth-01` `37001a24…` · `elt-serum-vpdrn-01` `df4a05c3…` · `elt-sunscreen-vitayouth-01` `dce34d28…` |
| Representative record blobs | `elt-serum-vitayouth-01/`: core `aee73997…` · claims `997ab01d…` · ingredients `23fddbc7…` · offers `4a93913d…` · coverage `713b1ba3…` · assessment `c4e61ea4…` |
| ELT history | `2c5bfd7` baseline 22 products (incl. `elt-serum-vpdrn-01`) · `3595cb7` +6 ELT2 PRISM records · `6298a68` remove batch note · `6f932db` raw_file merge ELT2→ELT |
| Mission worktree | `/home/leo/Project/.worktrees/foundation-docs/COSMILE_O1_KOREA_GOLDEN_COMMERCE_DESIGN_READINESS_V1`, branch `advisor/cosmile-o1-korea-golden-commerce-design-readiness-v1-20260717`, HEAD `383368636a1ee69cc9325ea805eda14d110b1b77` |
| Schema authority | FOUNDATION `설계문서/FOUNDATION_제품레코드_PRISM_설계서.md` (tracked at pinned HEAD) |

## 4. Product census (FACTS)

- Product record layout: `products/{brand}/{product_id}/` PRISM directories
  (`core.yaml`, `claims.yaml`, `ingredients.yaml`, `offers.yaml`, `coverage.yaml`,
  `assessment.yaml`, `locales/{ko,en,zh}.yaml`, `processing/`).
- **Total product records: 28** — `elt` **8**, `skin1004` **20**.
  (Mission expected "약 20개": actual = 20 SKIN1004 + 8 ELT; the ELT sale-candidate set is 8.)
- Status histogram: ELT = 7 `active`, 1 `incomplete` (`elt-serum-triplecapsule-01`).
  SKIN1004 = 18 `active`, 2 `临期` (near-expiry/clearance: `skin1004-cream-tea-tree-11`,
  `skin1004-toner-tea-tree-20`).
- Versions: all 8 ELT records carry `formula_version: 1`, `version.data_version: 1.0.0`,
  `version.status: prism_v0.1`, `last_reviewed: 2026-06-25`.
- Brand identities: `elt` = 이엘티 / ELT / zh `null`, country Korea (`_brand.yaml`);
  `skin1004` = 스킨1004 / SKIN1004 / **理肤天使** (`canonical_names.brand.zh` in every
  skin1004 `core.yaml`).
- Knowledge registry: `knowledge/ingredients/cosmetic/` contains **290** ingredient atom
  `.md` files (excluding `README.md`; `_archive/_manifests/_staging` are directories).
  All 10 spot-checked atoms referenced by ELT records exist
  (`ascorbyl-ethyl`, `tranexamic-acid`, `lha`, `argireline`, `matrixyl`, `ectoin`,
  `retinol`, `ceramide`, `niacinamide`, `adenosine`).
- Staleness note (documentation, not data): `products/README.md` and `products/_index.md`
  still describe the older single-`.md`-file format and index **only** SKIN1004 (20/20);
  the 8 ELT PRISM records are not in the global index. `products/elt/_product_index.yaml`
  is the accurate ELT index.

## 5. Complete ELT sale-candidate set (8 records — FACTS)

| product_id | type | Current name (ko / en) | spec | status | MFDS functional (as recorded) | Price data in offers | Source intake (core.source.raw_file) |
|---|---|---|---|---|---|---|---|
| elt-serum-vitayouth-01 | serum | 비타유스 토닝 세럼 / Vita Youth Toning Serum | 50ml | active | true — brightening, anti_wrinkle | KRW 34,000 / 30,000 (2026-06-25); `sales_status: on_sale` | raw_file/ELT/ELT 비타민세럼_intake.md |
| elt-serum-vpdrn-01 | serum | 브이피디알엔 더블 글로우 세럼 / V-PDRN Double Glow Serum | 30ml | active | true — brightening, anti_wrinkle | none (null; unknown) | raw_file/ELT/ELT V-PDRN 더블 글로우 세럼_intake.md |
| elt-cream-vpdrn-01 | cream | 브이피디알엔 너리싱 프렙 크림 / V-PDRN Nourishing Prep Cream | 50ml | active | true — brightening, anti_wrinkle | none (null; `sales_status: active` — enum drift) | raw_file/ELT/ELT V-PDRN Cream_intake.md |
| elt-cream-vitayouth-01 | cream (eye_cream) | 비타유스 비타민 아이크림 / Vita Youth Vitamin A Calendula Retinol Eye Cream | 30ml | active | true — anti_wrinkle only (brightening wording = ad copy, blocked in claims_control) | none (null; unknown) | raw_file/ELT/ELT 비타유스 비타민 아이크림_intake.md |
| elt-pad-vitayouth-01 | pad | 비타유스 멀티비타민 수분가득 듀얼 패드 / VITA YOUTH MULTI VITAMIN WATER DUAL PAD | 80매/200g (primary) + sub-SKU 40매/100g | active | true — anti_wrinkle | none (null; unknown); 2 sub-SKUs declared | raw_file/ELT/ELT 듀얼팩패드 80매_intake.md (+40매 file as sub-SKU source) |
| elt-sunscreen-vitayouth-01 | sunscreen | 비타유스 쓰리디 릴리프 퍼플 톤업 선스크린 / VITA YOUTH 3D RELIEF PURPLE TONE UP SUNSCREEN | 50ml | active | true — uv_protection, brightening, anti_wrinkle (triple) | none (null; unknown) | raw_file/ELT/ELT 비타유스 톤업 선스크린_intake.md |
| elt-mask-vitayouth-01 | mask (peel_off) | 비타유스 퓨어 콜라겐 글로잉 필오프팩 / Vita Youth Pure Collagen Glowing Peel-Off Pack | 60ml | active | true — brightening, anti_wrinkle | KRW 28,000 / 25,200 (2026-06-25); unknown | raw_file/ELT/ELT 필오프팩_intake.md |
| elt-serum-triplecapsule-01 | serum | 트리플 캡슐 세럼 / Triple Capsule Serum | 확인 필요 (unknown) | **incomplete** | true (claimed) — brightening, anti_wrinkle | none (intentionally removed at source) | raw_file/ELT/ELT 트리플캡슐세럼_intake.md |

Identity integrity: `product_id` is immutable; renames are tracked in `name_history` with
`source_ref` (e.g., serum-vitayouth: 비타민 세럼 → 토닝 세럼, package renewal 2026-02-23,
formula change unconfirmed → `formula_version` kept at 1). The eye cream has 3 KO name
variants pending final standardization (record §13 todo).

Raw inbox reconciliation: `raw_file/ELT/` holds 10 intake files; 8 are referenced by
`core.source.raw_file`, the 40매 pad file is referenced by pad `offers.yaml` sub-SKU.
**Orphan:** `ELT V-PDRN 너리싱 프렙 크림_intake.md` is referenced by nothing and differs
from `ELT V-PDRN Cream_intake.md` by one whitespace character (near-duplicate; inbox
dedup finding, no content loss).

## 6. 理肤天使 exclusion — verified by canonical identity (not name guessing)

- 理肤天使 is the **canonical Chinese brand name of `brand_id: skin1004`**:
  every `products/skin1004/*/core.yaml` has `canonical_names.brand.zh: 理肤天使`
  (en `SKIN1004`, ko `스킨1004`), and the tracked brand-slug rule in `products/README.md`
  states "理肤天使 → `skin1004`".
- Therefore the excluded set = **all 20 records with `brand_id: skin1004`** (list in §9).
- The ELT sale-candidate set has **zero identity overlap**: `grep` for `理肤` across
  `products/elt/` returns 0 hits, and every ELT record has brand `zh: null`
  (brand-level `_brand.yaml` also `zh: null`).
- **Verified conclusion:** excluding 理肤天使 excludes exactly the `skin1004` brand set and
  removes nothing from, and adds nothing to, the 8-record ELT candidate set. Exclusion is
  brand-identity-based (`brand_id`), not string matching on product names.

## 7. Evidence coverage by dimension (FACTS, with limits)

Per-product quantitative sweep (ingredients `mapped` / `needs_review`; claims
`source_claim` / `brand_claim_unverified`; coverage section statuses):

| product | ingredients mapped/needs_review | claims src/unverified | coverage covered/partial/intentional |
|---|---|---|---|
| elt-cream-vitayouth-01 | 35 / 47 (82 items) | 2 / 20 | 15 / 0 / 1 |
| elt-cream-vpdrn-01 | 25 / 20 (45) | 1 / 14 | 10 / 0 / 0 |
| elt-mask-vitayouth-01 | 19 / 32 (51) | 2 / 10 | 14 / 0 / 1 |
| elt-pad-vitayouth-01 | 17 / 27 (44) | 2 / 15 | 15 / 0 / 1 |
| elt-serum-triplecapsule-01 | 1 / 8 (partial list only) | 7 / 9 | 15 / **1 partial** / 1 |
| elt-serum-vitayouth-01 | 17 / 18 (35) | 4 / 10 | 14 / 0 / 1 |
| elt-serum-vpdrn-01 | 28 / 27 (55) | 2 / 17 | 10 / 0 / 1 |
| elt-sunscreen-vitayouth-01 | 26 / 52 (78) | 6 / 10 | 14 / 0 / 2 |

- **Ingredient:** full ordered ingredient lists (`order_preserved: true`, `complete: true`)
  exist for 7 of 8 products; atom mapping is deterministic-only (no forced mapping);
  unmapped items are held as `needs_review` with an expansion feedback report per product
  (`processing/ingredient_mapping_report.md`). Exception: triplecapsule — source provided
  no full list (§12.1), record self-declares partial (8 narrative items).
- **Claim:** claims decomposed with mandatory `source_ref` and honest
  `verification_status` (`source_claim` = stated by source; `brand_claim_unverified` =
  brand-published numbers/amounts not independently verified). Clinical numbers carry test
  conditions where the source disclosed them (e.g., triplecapsule: GSC lab, n=21 adult
  women, 2025-07-28~08-11).
- **Warning:** legally standard cosmetics cautions present in `locales/ko.yaml` for all 8
  (`cautions` key; e.g., 직사광선 이상증상 시 전문의 상담·상처부위 사용 자제·보관 주의).
  Fragrance allergens recorded where present (serum-vpdrn: limonene/linalool/citral;
  sunscreen: limonene/linalool). Serum-vitayouth records the *absence* of allergen labels
  as source-qualified, not asserted.
- **Safety:** `claims_control.forbidden` guardrails per product (disease/medical-cure/
  guaranteed-effect always; product-specific additions, e.g. eye cream blocks
  `botox_replacement`/`permanent_lifting` because the source ad copy contained such
  wording). Safety-relevant contents surfaced: eye cream contains retinol +
  retinyl-palmitate (consultation-relevant); `assessment.yaml` is honest-context only and
  globally `usable_for_judge: false`.
- **Approval:** MFDS functional status is recorded per product
  (`functional.mfds_functional`, functions incl. triple-functional sunscreen) sourced from
  상품정보제공고시 legal wording — but **no MFDS 심사/보고 번호 exists anywhere in the ELT
  records (grep = 0)**, and every such claim carries `source_claim`/`brand_claim_unverified`
  status. Independent MFDS verification was not possible read-only/offline.
- **Provenance:** every record pins `core.source.raw_file` → intake file in
  `raw_file/ELT/`, `collected_at: 2026-06-25`, `collected_by: GPT`; intake headers name
  sources (ELT official detail page; ingredient lists from Hwahae product page — e.g.
  product no. 2010853 — and public 상품정보제공고시). `coverage.yaml` maps every source
  section to a destination (loss tracking). Gaps: `source_checksum: pending` in all 8;
  integrity is anchored by vault git history instead. cream-vpdrn contains dangling
  internal refs (`source/md1_product_intake.md` — no `source/` dir exists; the correct
  pointer `raw_file/ELT/ELT V-PDRN Cream_intake.md` is present in `core.source.raw_file`).
- **Commercial-use-rights:** **no rights evidence exists anywhere in the vault or the
  FOUNDATION repo** for selling ELT products or commercially reusing the collected
  content. Manufacturer/responsible-seller facts on record: sunscreen manufactured by
  한국콜마(주), responsible seller (주)제이디글로벌, made in Korea; serum-vitayouth
  responsible distributor (주)제이디글로벌, manufacturer "확인 필요". The vault
  deliberately excludes binary product assets (commit `13be58c` ignores them) → **no
  product images exist in the canonical source.** All rights matters → §8.

## 8. Unresolved Legal/rights questions (separated; no conclusions drawn)

- R1. Sale authorization: is there an agreement authorizing Leo/Cosmile to sell ELT
  products (with brand owner and/or (주)제이디글로벌)? No evidence in tracked sources.
  VENDOR/LEGAL confirmation required.
- R2. Content reuse: right to reuse ELT official detail-page copy (and translations) in a
  commercial storefront; right to reuse Hwahae-sourced ingredient data commercially
  (third-party service terms). Unverified.
- R3. Clinical-claim republication: brand-published test numbers (GSC lab) shown in a
  commerce UI — permissibility and 표시·광고 실증 compliance. Unverified; records already
  mark them `brand_claim_unverified`.
- R4. Functional-cosmetics display obligations: MFDS 기능성 표시·광고 requirements for the
  storefront; report numbers not on file (§7 Approval). Compliance review needed.
- R5. Product imagery: no images in canonical source; a rights-cleared asset pipeline is
  needed (source + license unknown).
- R6. Relationship structure: role of (주)제이디글로벌 (responsible seller) vs. ELT brand
  owner vs. Leo's selling entity — unknown to this repository.

## 9. Product eligibility matrix (`USABLE | BLOCKED | INCOMPLETE | UNVERIFIED`)

Class definitions used (stated so the matrix is reproducible):
- **USABLE** — identity stable + complete ordered ingredient list + claims/warnings/
  coverage complete + `status: active`. Usable now as canonical content input for
  commerce-snapshot **design**, subject to the global caveats C1–C4 below.
- **INCOMPLETE** — the record itself declares missing canonical content.
- **UNVERIFIED** — content present but a material content fact is contested/unconfirmed at
  source level.
- **BLOCKED** — excluded from sale/exposure candidacy by canonical-identity authority
  decision (mission), independent of data quality.

Global caveats on every ELT record (do not change class; they gate *live* use, not design):
C1 `human_review_needed: true` (review gate not yet passed) · C2 `source_checksum: pending`
(git-history integrity only) · C3 MFDS functional status is source-claim level, no report
numbers · C4 commercial-use-rights unresolved (§8).

| # | product_id | Class | Decisive evidence |
|---|---|---|---|
| 1 | elt-serum-vitayouth-01 | **USABLE** | active; 35/35 ordered+complete; cautions present; coverage pass; KRW price on file |
| 2 | elt-serum-vpdrn-01 | **USABLE** | active; 55 ordered+complete; allergens explicitly recorded |
| 3 | elt-cream-vpdrn-01 | **USABLE** | active; 45 ordered+complete; caveat: dangling `source/md1_product_intake.md` refs; offers `sales_status: active` enum drift; orphan near-duplicate intake twin |
| 4 | elt-cream-vitayouth-01 | **USABLE** | active; 82 ordered+complete; retinol present (safety-consultation relevant); ad-copy claims blocked in claims_control; KO name standardization todo |
| 5 | elt-pad-vitayouth-01 | **USABLE** (product level) | active; 44 ordered+complete; 2 sub-SKUs declared; **sub-SKU `-40` volume UNVERIFIED** (known copy-paste error in 40매 source §3/§9; official confirmation pending) |
| 6 | elt-sunscreen-vitayouth-01 | **USABLE** | active; 78 ordered+complete; triple functional; manufacturer/seller on file |
| 7 | elt-mask-vitayouth-01 | **UNVERIFIED** | `source_conflict_detected: true` — full ingredient list contested: ELT official (51) vs 신세계인터넷면세점 notice (52), 5 slots differ; official adopted per record priority rule but physical package verification pending |
| 8 | elt-serum-triplecapsule-01 | **INCOMPLETE** | self-declared: no full ingredient list (§12.1), spec unknown, offers intentionally null, `ingredient_completeness_claim` forbidden |
| 9–28 | all 20 `skin1004-*` (cream-brightening-15, cream-cica-02, cream-tea-tree-11, essence-brightening-12, essence-cica-19, essence-pink-salt-13, essence-probiotic-18, essence-tea-tree-14, eye-bakuchiol-17, mask-pink-salt-16, pad-cica-03, sunscreen-brightening-07, sunscreen-cica-physical-05, sunscreen-hyaluronic-08, sunscreen-pink-salt-06, sunscreen-probiotic-09, sunscreen-selector-04, sunscreen-tea-tree-10, toner-cica-01, toner-tea-tree-20) | **BLOCKED** | 理肤天使 exclusion by canonical brand identity (§6). Not a data-quality judgment (18 active, 2 临期) |

Summary: 6 USABLE · 1 UNVERIFIED · 1 INCOMPLETE · 20 BLOCKED (total 28).

## 10. Representative SKU, boundary candidates, expansion rule

**Representative SKU (recommendation): `elt-serum-vitayouth-01`** — the only ELT record
that is simultaneously (a) `active` with `sales_status: on_sale`, (b) carrying collected
KRW list/sale prices (34,000/30,000, dated 2026-06-25) as a realistic pricing rehearsal
input, (c) complete across all six PRISM files with the cleanest single-SKU shape (50ml,
no variants), (d) dual MFDS-functional with claims_control guardrails (exercises
compliant display), and (e) carrying a real rename history (exercises display-name
refresh without identity change).

**Boundary candidate 1 (recommended): `elt-pad-vitayouth-01`** — materially different
**inventory/SKU rule**: one `product_id` → two sellable SKUs (40매/100g, 80매/200g) with
per-SKU volume, per-SKU stock, and per-SKU source pins; additionally carries a known
source-volume discrepancy on the `-40` SKU that a correct snapshot/display pipeline must
not leak. Exercises product↔SKU cardinality, per-SKU inventory, and variant display.

**Boundary candidate 2 (conditional, at most): `elt-sunscreen-vitayouth-01`** — proposed
only under the "sale rules" prong: MFDS **triple**-functional including UV protection, a
materially different display/claims-compliance surface for sale exposure. No evidence of
different shipment/refund mechanics; if the boundary rule is read strictly as
shipment/refund-mechanical, drop this candidate and keep one boundary SKU.

No other ELT record shows evidence of materially different sale/inventory/shipment/refund
rules (all ambient-temperature cosmetics; no shipping restrictions recorded; offers
shipping fields null/unknown across the set).

**Evidence-expansion rule for remaining eligible products** (after representative +
boundary validation): onboard a product when ALL hold —
1. `core.yaml status: active`;
2. matrix class USABLE (reclassification path: mask → USABLE upon physical-package
   ingredient confirmation; triplecapsule → USABLE upon official full ingredient list +
   spec; skin1004 → requires an explicit Leo decision lifting the 理肤天使 exclusion,
   out of this mission's scope);
3. rights gate cleared for that product/brand (§8 R1–R3 resolved by Legal/vendor);
4. Cosmile has assigned `cosmile_sku_id`, KRW price, and stock (Cosmile authority);
5. snapshot pinned (vault commit + product tree hash + `data_version` + `formula_version`).
Then run a per-product **delta check only** — identity/display correctness (names, spec,
claims_control-filtered claims, cautions) and SKU-binding correctness — and do **not**
repeat the full Golden Order/Reversal scenario per product (mission rule).

## 11. Proposed `foundation_product_id <-> cosmile_sku_id` binding inputs

Foundation-side inputs available now (read-only facts; **no commerce authority claimed**):

- Stable join key: `product_id` (immutable, 8 ELT values above) + `brand_id`.
- Version anchors: `formula_version` (all 1), `version.data_version` (all 1.0.0), vault
  commit hash, per-product git tree hash (object-level pin; see §3).
- Display/name inputs: `current_slug`, `canonical_names` (ko/en; zh null for ELT),
  `name_history` (rename-safe display refresh), `spec`, locale files ko/en/zh (all 8).
- Variant descriptors (pad only): `offers.yaml` declares sub-SKUs
  `elt-pad-vitayouth-01-40` (40매/100g; volume pending official confirmation) and
  `elt-pad-vitayouth-01-80` (80매/200g; primary). These are Foundation-side *descriptors*,
  not authoritative commerce SKUs.
- Proposed binding record shape (to be **owned and stored by Cosmile**; design input only):
  `{ cosmile_sku_id (Cosmile-assigned), foundation_product_id, foundation_variant_key
  (nullable; e.g. "40"|"80"), foundation_snapshot: { vault_commit, product_tree_hash,
  data_version, formula_version }, bound_at }`.
- Authority statement: price, stock, sales state, orders, fulfillment, refunds are
  Cosmile-owned. The vault's own `offers.yaml` defers operational commerce values to
  Cosmile ("Cosmile 운영확정 / Cosmile commerce에서 채움"); collected prices are dated
  reference data (2026-06-25), volatile, and must not be treated as current price
  authority.
- Normalization caveats before any binding/status sync: `sales_status` enum drift
  (`on_sale` | `active` | `unknown` across records); `spec` value "확인 필요" (non-enum
  free text) on the INCOMPLETE record; zh locale exists but Korea launch scope is ko.

## 12. Facts / Assumptions / Unknowns / Questions (for later bounded delivery design)

**Facts** — §§2–7 above (all pinned).

**Assumptions**
- A1 (env override; §2). A2: intake fidelity as recorded is trusted at the
  `coverage.yaml` level; raw-file integrity rests on vault git history because per-record
  checksums are pending. A3: this host's resolution behavior represents the runtime that
  will read the vault (same `foundation_core.config` contract).

**Unknowns (non-Legal)**
- U1 MFDS functional report numbers / independent verification (network prohibited here).
- U2 Mask true full-ingredient list (51 vs 52 conflict) pending package check.
- U3 Triplecapsule full ingredient list, spec, manufacturer, expiry.
- U4 Pad `-40` SKU true volume. U5 Eye-cream/serum manufacturer names ("확인 필요").
- U6 Whether any renewal changed formulas (records keep `formula_version: 1` with todo).
- U7 Current live prices/stock at ELT mall (records are 2026-06-25 snapshots).

**Questions the later bounded delivery design (Phase 5) needs answered**
- Q-D1 Delivery form: vault copy model (00_VAULT_설계 §0 copy-at-launch), read-only API, or
  exported snapshot file — which does Cosmile consume?
- Q-D2 Is {vault commit + product tree hash + data_version + formula_version} accepted as
  the snapshot/version anchor? (proposed yes — object-level, already available)
- Q-D3 Correction/withdrawal signaling: today only `status` field + git history exist (no
  event mechanism). What cadence/mechanism does Cosmile use to learn of supersession or
  withdrawal, given Foundation must not be a synchronous runtime dependency?
- Q-D4 Review gate: who flips `human_review_needed` → reviewed for commerce display, and
  where is that recorded (C1 must be resolved before live display)?
- Q-D5 Locale scope: ko-only for Korea launch? en/zh exist but are not commerce-reviewed.
- Q-D6 Imagery: canonical source has no binary assets — separate rights-cleared asset
  pipeline needed; owner TBD (outside current Foundation canonical scope).
- Q-D7 Where is the commercial-use-rights gate recorded once Legal confirms (e.g., a
  per-brand rights file) so the §10 expansion rule can check it mechanically?
- Q-D8 `sales_status` enum normalization owner (Foundation record fix vs mapping layer).

## 13. Proven vs not proven (builder report discipline)

**Proven (direct evidence, this session):** pinned-HEAD identity of both repos; canonical
vault location per tracked contract; 28-record census, brand identities, statuses,
versions; complete 8-record ELT candidate set with per-file contents; 理肤天使 ≡
`skin1004` and its exclusion leaving ELT untouched; per-dimension evidence presence and
its verification levels; registry atom existence for spot-checked ELT references;
orphan/duplicate/dangling-pointer/staleness/enum-drift defects listed above; clean
worktrees before and after (only the two result files added).

**Not proven / not attempted (with reason):** MFDS approval verification against external
registries (network prohibited); any Legal/rights conclusion (out of authority — §8);
current live commerce facts (prices/stock; network prohibited); runtime behavior of
`foundation_core` (code execution prohibited); env-var state of other runtimes;
content accuracy of intake files against the live ELT mall (network prohibited).

## 14. Compliance attestations

- Product repositories written: **NONE** (FOUNDATION untouched; vault untouched; both
  verified clean before and after; FOUNDATION retains only its two pre-existing untracked
  files: `docs/FOUNDATION_DOCS_SYNC_POLICY.md`, `설계문서/FOUNDATION_SERVICE_SEMANTIC_
  ADAPTER_ARCHITECTURE_20260630.html`).
- Code/tests/DB/runtime/endpoint/provider/network executed: **NONE** (read-only fs + git
  inspection only).
- Sub-agents/delegated contexts/dispatch: **NONE**.
- Phase 5 delivery design: **NOT produced** (per handoff).
- Writes performed: exactly this result file and its pointer file at the handoff-named
  paths (uncommitted; commit/push not authorized by this handoff — left to Advisor).

```text
WORKUNIT_STATUS: COMPLETE
FOUNDATION_PRODUCT_SET_VERIFIED: YES (28 records; 8 ELT sale candidates)
ACTUAL_ELT_PRODUCT_COUNT: 8 (7 active, 1 incomplete)
理肤天使_EXCLUSION: VERIFIED_BY_CANONICAL_IDENTITY (= brand_id skin1004, 20 records, BLOCKED)
ELIGIBILITY_MATRIX: 6 USABLE / 1 UNVERIFIED / 1 INCOMPLETE / 20 BLOCKED
REPRESENTATIVE_SKU: elt-serum-vitayouth-01
BOUNDARY_SKUS: elt-pad-vitayouth-01 (recommended) · elt-sunscreen-vitayouth-01 (conditional)
COMMERCIAL_USE_RIGHTS: NO_EVIDENCE_FOUND — unresolved Legal questions R1–R6
PRODUCT_CODE_CHANGED: NO
DATABASE_CHANGED: NO
IMPLEMENTATION_STARTED: NO
RETURN_TO: foundation-advisor
STOP
```
