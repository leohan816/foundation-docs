// COSMILE MEMORY V3 — recommendation ranking signal allowlist (D3)
// ★margin_band는 ranking signal이 아니다(analytics only). safety가 최우선.
// 사전 §2.15 reason_code taxonomy 기반. 값 추가는 사전 개정으로만.
export const RANKING_SIGNALS = [
  "safety_filtered",   // ★safety 최우선
  "skin_type_match",
  "concern_match",
  "ingredient_match",
  "avoid_conflict_none",
  "repurchase_cycle",
  "seasonal_match",
  "consultation_derived",
  // ★margin_band 미포함(D3): commerce margin은 ranking에 들어가지 않는다.
] as const;
export type RankingSignal = (typeof RANKING_SIGNALS)[number];
