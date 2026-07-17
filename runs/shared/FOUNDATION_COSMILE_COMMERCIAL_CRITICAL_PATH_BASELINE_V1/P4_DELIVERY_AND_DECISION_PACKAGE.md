# P4 — Delivery and Decision Package

## Advisor recommendation

Recommend **O1 — commerce-first Paid Beta with Foundation AI hidden/closed** for
Leo/Strategy consideration. It is the only option supported by current static evidence
that avoids making the unresolved Foundation runtime/ownership contradiction part of
the payment critical path. This is a recommendation, not a Founder selection or an
implementation authorization.

## Commercial branch baseline

Recommend a later commercial branch from Cosmile head
`b8b61d746e2bdbb8d7ab26405bf44fb665ad87a6` because it is the exact audited head,
is upstream-equal, and has `main` commit `3ba91e0b63822156fb14aaa497b14885564a80e1`
as an ancestor (39 commits ahead, 0 behind at the observed refs). Its Memory C1/C2
changes are reviewed and inert; starting elsewhere and selectively cherry-picking would
add provenance and regression risk. No branch is created or moved by this decision.

## Parallel release tracks

| Track | Work package | Dependencies | Parallel | Engineering effort | Elapsed dependency | Confidence |
|---|---|---|---|---:|---|---|
| C1 | Real customer identity/session integration | Founder provider choice; Security/privacy requirements | Yes | 5–12 wd | Provider configuration 1–3 wk, unverified | LOW |
| C2 | Canonical curated catalog/SKU/price store and admin binding | Product/inventory source owner | Yes | 5–12 wd | Owner/data confirmation 1–2 wk | LOW |
| C3 | PSP charge/webhook/idempotency/reconciliation | PSP selection/KYC, C1 | Yes after contract | 10–20 wd | KYC/vendor 2–8+ wk, unverified | LOW |
| C4 | Inventory reserve/deduct/restore and concurrency invariants | C2, order/payment state design | Yes with C3 | 8–15 wd | Inventory owner confirmation | LOW |
| C5 | Fulfillment/shipment/tracking, bounded manual ops option | C2/C4, fulfillment owner/vendor | Yes | 5–12 wd | Carrier/3PL 2–8+ wk, unverified | LOW |
| C6 | Cancellation/refund/reversal and customer/operator flow | C3/C4/C5; Legal/ops policy | Partly | 5–12 wd | PSP/policy decisions | LOW |
| C7 | Admin/customer auth hardening and PII controls | C1 | Yes | 3–7 wd | Security review calendar | MEDIUM |
| X1 | Freeze commerce domain contracts: identity, SKU, price, order/payment/inventory states | C1–C6 owners | Front-loaded | 5–10 wd | Founder/owner decisions | LOW |
| P1 | Monitoring, audit, reconciliation, alerts, incident/rollback runbook | C3–C6 | Yes after interfaces | 6–12 wd | Ops staffing | LOW |
| P2 | Backup/restore and recovery rehearsal | Durable data choices | Yes | 3–7 wd | Platform availability | LOW |
| P3 | Legal/vendor/operations confirmations and beta runbook | Founder, Legal, PSP, fulfillment | Yes, immediate | 3–8 internal wd | 2–8+ wk external | LOW |
| F1 | Foundation ownership/provider/contract-truth decision | Only if O2/AI shown | Separate from O1 | 2–5 wd decision package | Founder/architecture | LOW |
| F2 | Foundation evidence/retrieval/service/ID binding | F1 and new authority | Separate/parallel | 15–35 wd | Platform/data owners | LOW |

Workday ranges overlap and must not be summed mechanically. For O1, a reasonable
critical path is C1/X1 → C2/C3 → C4/C6 → integrated evidence and P1/P2. External PSP
and fulfillment calendars can dominate elapsed time.

## Evidence-based schedule ranges

```text
COMMERCIAL_MVP_FEATURE_COMPLETE_ENGINEERING: 25-45 workdays
PAID_BETA_READY_ENGINEERING_CUMULATIVE: 40-70 workdays
PAID_BETA_READY_ELAPSED: 6-12 weeks
PUBLIC_LAUNCH_READY_ENGINEERING_CUMULATIVE: 65-110 workdays
PUBLIC_LAUNCH_READY_ELAPSED: 12-20 weeks
AI_SHOWN_OPTION_INCREMENT: 15-35 engineering workdays plus unresolved owner/platform decisions
ESTIMATE_CONFIDENCE: LOW
NOT_A_COMMITMENT: YES
```

Assumptions: at least two capable implementation lanes plus part-time Security/ops;
bounded SKU count; manual fulfillment permitted for beta; vendor KYC does not exceed
eight weeks; no major redesign of current order data. A single implementation lane,
longer vendor review, or an AI-in-beta selection increases elapsed time.

## Exact decisions and confirmations needed

| ID | Decision/question | Required owner | Blocks |
|---|---|---|---|
| D-01 | Select O0/O1/O2 target and exact beta customer/transaction boundaries | Leo/Strategy | All implementation planning |
| D-02 | Choose customer auth/provider and guest/account policy | Leo + Security/privacy + Cosmile | C1 |
| D-03 | Confirm canonical SKU/catalog/price/inventory owners and initial sellable SKU set | Leo + product/operations | C2/C4 |
| D-04 | Select PSP and authorize vendor/KYC work; define refund/operator ownership | Leo + finance/Legal/operations | C3/C6 |
| D-05 | Select fulfillment/carrier/manual-tracking model and owner | Leo + operations | C5 |
| D-06 | Set Paid Beta order threshold and cohort/stop criteria | Leo | Paid Beta Exit gate |
| D-07 | Approve minimum privacy/terms/shipping/refund policy path | Leo + Legal/privacy | Paid Beta/Public |
| D-08 | Name incident, CS, fulfillment, refund, and reconciliation operators | Leo + operations | Paid Beta |
| D-09 | If AI shown, decide Stack A vs Stack B/provider ownership and SSC/FRC contract-of-record | Leo + Foundation architecture via Advisor | O2 only |
| D-10 | Confirm whether public launch includes Foundation AI | Leo/Strategy | PL-10/PL-11 applicability |

## Bounded later ownership-decision list

This list is planning only and does not authorize migration:

1. P0: decide future location/owner of the live Control-located judgment/safety core.
2. P0: designate canonical SSC/FRC contract truth and supersede the stale HTTP V0 doc.
3. P0: resolve live self-contained Stack A versus Foundation-backed eval Stack B.
4. P1: decide legacy judge/Path-B retirement and prove production unreachability.
5. P1: keep ingress activation separate; resolve its noted scrub gap before any train.
6. P1/P2: split Foundation decision ownership from service input semantics and Cosmile
   commerce-loop application.

## Explicit no-build list

Memory V3 runtime resumption; Full Package 1B; U1/U2/U3 closure; F1/F2/F3/C3/X1/M3;
sender/intake/candidate runtime; free-text feedback; semantic extraction; automatic
memory promotion/ranking; adverse aggregation; B2B2C; influencer features; advanced
dashboard; unrelated SIASIU integration; voice commerce; AI pricing/CRM expansion; and
any AI feature not selected as Paid Beta critical.

```text
IMPLEMENTATION_AUTHORIZED: NO
BRANCH_CREATION_OR_MOVEMENT: NO
RELEASE_APPROVED: NO
RISK_ACCEPTED: NO
NEXT_MISSION_AUTO_START: NO
```
