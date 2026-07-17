# Round 1 Questions — Data Quality, Lineage, and Governance

```text
ROLE: DATA_QUALITY_LINEAGE_AND_GOVERNANCE_CHALLENGER
REPORT_PATH: /home/leo/Project/council/runs/COSMILE_O1_GOLDEN_COMMERCE_LOOP_STRATEGY_COUNCIL_V1/16_DATA_GOVERNANCE_INITIAL.md
```

1. Are authoritative sources and lineage explicit for product, SKU, price, stock,
   customer, order, payment, shipment, refund, and reconciliation data?
2. Is `foundation_product_id <-> cosmile_sku_id` sufficient, and what version/provenance
   semantics are missing?
3. What data must remain immutable, versioned, corrected, retracted, retained, or deleted?
4. How should derived status differ from raw provider events and authoritative business
   records?
5. What quality/freshness threshold is material for a production-candidate SKU and
   no-oversell claim?
6. Which data readiness claims require authoritative source evidence versus implementation
   validation?

Read no other file in `round1-prompts/` and no other Challenger report or output.
