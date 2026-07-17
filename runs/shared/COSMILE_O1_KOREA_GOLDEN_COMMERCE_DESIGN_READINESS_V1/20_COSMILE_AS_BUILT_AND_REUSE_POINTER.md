# POINTER — 20 COSMILE AS-BUILT AND REUSE

```text
MISSION_ID:  COSMILE_O1_KOREA_GOLDEN_COMMERCE_DESIGN_READINESS_V1
WORKUNIT_ID: O1-P1-COSMILE-AS-BUILT
ACTOR:       cosmile (repository-owner Worker)  ·  MODE: READ_ONLY_FACT_VERIFICATION_AND_REUSE_ASSESSMENT
RETURN_TO:   foundation-advisor
RESULT:      runs/shared/COSMILE_O1_KOREA_GOLDEN_COMMERCE_DESIGN_READINESS_V1/20_COSMILE_AS_BUILT_AND_REUSE.md
RESULT_SHA256: 62332fb804f0b9c6ea2352d24d4d900cb61f6e74ec790f9553d43fdf73db8fc4
RESULT_SIZE: 466 lines / 36102 bytes
PIN:         branch shadow/m4-cosmile-memory @ b8b61d746e2bdbb8d7ab26405bf44fb665ad87a6 (verified, pre+post)
PRODUCT_WRITES: 0  ·  UNTRACKED_PRESERVED: 6/6  ·  IMPLEMENTATION_AUTHORIZED: NO
```

## RESULT SUMMARY
Read-only as-built + reuse assessment of Cosmile, verified first-hand (no subagents; two Explore agents
stopped on the Advisor boundary correction, output unused). Cosmile is a mature **Next.js 16 + Prisma
(Postgres) + TypeScript** commerce shell (75 API routes, 34 models), not the legacy Python MVP.
**Commerce SoR = Postgres.** Foundation-boundary **holds**: Cosmile displays Foundation verdicts and
never generates suitability/safety judgment; Foundation signalling is producer-only and consent-fail-closed.
**Server-authoritative pricing at checkout is real** (`resolveUnitPrice`, re-priced, never trusts client).
**Mock/absent for a real KR golden path:** payment (status-flip mock, no PSP dep), customer auth/identity
(single hardcoded `demo_user_001`), inventory (display-only, no decrement), catalog (hardcoded 28-item
ELT demo), alert delivery (mock), **shipment/tracking + real refund/return unimplemented (self-declared
TODO)**; `Order.status="refunded"` is an **unreachable orphan** (no transition targets it). Testing is
**script-based** (`.mjs` evals + `.vitest.ts` pure-fn + `.dbtest.py` rehearsals), no conventional CI suite;
the cart/checkout/order spine is covered only by `.mjs` scenarios. Matrix uses only the 7 controlled labels.
**4 bounded replacement candidates** (all seam-bounded, no rewrite): RC-1 auth/identity, RC-2 payment,
RC-3 inventory control, RC-4 catalog/single-price authority — each with failed-invariant, impact, bounded
alternative, migration consequence, and why-repair-insufficient in §10. Other gaps are additive-at-seam
(MOCK/DEAD), deliberately **not** overstated as replacements.

## NEXT ACTION ROUTING
- **foundation-advisor:** integrate this as `20_…` alongside Foundation Worker `10_…` and Advisor
  `30_OFFICIAL_PROVIDER_RESEARCH.md`; carry the §9 provider/operating questions (PSP-KRW, real auth,
  shipping/courier, KR refund/청약철회 legal flow, Foundation availability) into Founder-decision and
  Designer (Phase 4) inputs. Cosmile Worker later owns **only** the non-executable repository-local
  technical design (Phase 5) — not started (IMPLEMENTATION_AUTHORIZED: NO).
- **Open unknowns (non-blocking):** U1 runtime `DATABASE_URL` target; U2 multi-user isolation under real
  auth; U3 `dev.db` script binding (DEAD confirmation); U4 Foundation verdict+evidence-intake at launch;
  U5 `productPitch`/`AiVoicePitch` copy-provenance boundary (WATCH-B).
- **No STOP condition triggered** — no authority/evidence-integrity failure, no prohibited access, no
  Korea/KRW/O1 reversal, no rewrite-only path, no ownership conflict.

## POINTER BLOCK
- Result: `…/20_COSMILE_AS_BUILT_AND_REUSE.md` (sha256 above)
- Pointer: `…/20_COSMILE_AS_BUILT_AND_REUSE_POINTER.md` (this file)
- Output worktree branch: `advisor/cosmile-o1-korea-golden-commerce-design-readiness-v1-20260717`
- Zero product-repo writes; six pre-existing untracked files preserved; HEAD unchanged.

**STOP — returned to foundation-advisor.**
