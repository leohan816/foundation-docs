# Advisor Fourth-Rework Test Exactness Addendum

This is a non-broadening clarification of the existing A4-1/A4-2 handoff, based on Advisor inspection of the in-progress test delta. It must be applied before the final candidate gate and commit.

## A4-2 Negative Challenge Must Exercise the Combined Predicate

The current in-progress `assertHidingALabelFailsCardinality` hides seven labels and merely asserts that the observed count is below expected. Tighten it:

1. hide exactly **one** label;
2. evaluate the same reusable complete-set/cardinality predicate used by the positive gate;
3. assert that combined validity is false even though union coverage alone remains <=22%;
4. restore the label and prove the positive predicate is true again.

Do not use a parallel weaker calculation whose only assertion is `visibleAfter < expected`.

## A4-1 Roster Equivalent Must Prove Complete Per-Actor Facts

At 200% roster-equivalent mode, do not stop at roster count 8 plus Team count 8. Require:

- exact set equality between expected visible production actor ids and `data-actor-roster` ids;
- exactly one roster row per actor;
- role and stable display name present;
- all seven mapped compact fact fields present, including Team;
- a non-empty provenance/source attribute for every mapped fact;
- zero partial visible canvas labels;
- explicit `roster-equivalent` mode marker.

After returning to normal text, require the exact all-label predicate again.

## Initial High-Text State

The production behavior must not briefly paint the 31% card wall when the page initially mounts under a high-text user setting. Use a pre-paint measurement (`useLayoutEffect` or equivalent) and add an initial-high-text browser case, or otherwise directly prove no partial/normal-label frame is presented before roster-equivalent mode. Keep the reactive `ResizeObserver` transition test as well.

These requirements are already contained in 09N's complete-equivalent, exact-cardinality, initial-load, and negative-proof clauses. They add no source path, product policy, or authority scope.

