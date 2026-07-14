# Advisor Brief: Canonical Core and Slack Pilot Gap

## Objective

Identify the shortest safe Slack Pilot path without creating a second Mission
schema, Event model, registry, projection, or Advisor transport.

## Governing Result

Agent Office already has the operational truth required for the pilot:

```text
Mission Manifest
-> hash-chained Event Log
-> immutable Evidence/Message artifacts
-> deterministic Current State projection
-> exact fixed-destination Advisor gateway
-> separate Advisor ACK / intake / decision / resume evidence
```

Slack must be an edge projection and input/output adapter around this core. It
must not become canonical state and must not deliver directly to a Worker or
Reviewer.

## Material Baseline Finding

The current checkout at `ac8ba75` contains the accepted M1/M1.2 operational
core, but it does not contain the later Batch A organization registry. The
reviewed implementation at `58a484b` separates stable actor identity, Team,
Advisor assignment, session, runtime, model, effort, and evidence correctly.
Its visual product acceptance was withheld, and its current Team fixtures also
predate the decision that the existing Advisor is now the Agent Office Advisor.

Therefore:

1. do not create another actor or Team registry;
2. reuse the reviewed organization module only through an explicit baseline
   reconciliation WorkUnit;
3. replace stale current-organization fixture facts with the Agent Office
   Advisor assignment;
4. do not create the Foundation Advisor before the real round trip succeeds;
5. do not make Slack depend on the rejected or deferred Living Office visual
   direction.

## Canonical Ownership Decisions

| Area | One canonical owner |
|---|---|
| Mission and WorkUnit denominator | `src/domain/manifest/index.ts` |
| Event vocabulary and ordering | `src/domain/events/index.ts` plus `src/persistence/file-store/event-store.ts` |
| Immutable artifacts/evidence | `src/persistence/file-store/artifact-store.ts` and existing evidence application services |
| Current mission state | `src/application/projections/mission-projector.ts` and `src/runtime/projection.ts` |
| Leo message and Advisor lifecycle | `src/application/advisor-inbox/` |
| Advisor transport | `src/adapters/gateways/advisor.ts` and `tmux-advisor/` |
| Runtime project/root registry | `src/application/projects/registry.ts` |
| Actor/Team/Advisor organization | reviewed Batch A `src/application/organization/`, after reconciliation |
| Transport governance ledgers | `foundation-docs/advisor/_system/tmux_transport/` |
| Security audit | `src/server/security/audit.ts` and `src/application/audit/` |

## Inventory Verdict

`PASS__READ_ONLY_INVENTORY_COMPLETE`

The recommended pilot is implementable without redesigning the operational
core. It remains gated on a separately authorized implementation mission,
owner-created Slack credentials/configuration, exact baseline reconciliation,
independent Level 3 security/authority review, and fresh one-use authority for
the real Advisor delivery rehearsal.
