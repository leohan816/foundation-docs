# Advisor Fifth-Rework Roster Negative Exactness Addendum

This is a non-broadening test-exactness correction inside A5-2. Before commit/publication, keep the current exact roster predicate and add direct mutate/evaluate/restore challenges proving that same predicate rejects:

1. a wrong-but-unique `data-actor-roster` ID;
2. an empty stable display name;
3. an empty `data-actor-fact-source` value on a roster fact;
4. the already implemented empty role;
5. the already implemented duplicated/missing fact key.

Each mutation must evaluate the same reusable roster predicate, then restore the authentic DOM and re-prove the positive predicate. Do not create a weaker parallel calculation. Keep the existing product implementation and scope unchanged. Update as-built wording only to claims the actual tests prove.
