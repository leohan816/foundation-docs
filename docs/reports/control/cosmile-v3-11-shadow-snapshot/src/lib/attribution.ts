// COSMILE MEMORY V3-04 — attribution (D1: last-touch 단일 귀속·V3-11)
// ★multi-touch/first-touch/weighted는 V3 backlog(구현 금지). anonymous_ref 소실 없이 처리(R-K3·시그니처 유지).
import type { RecommendationEvent } from "../types/recommendationEvent";
import type { AttributionMode } from "../types/recOutcome";

export interface AttributionResult {
  recommendation_id: string | null;
  attribution_mode: AttributionMode;
}

// D1 last-touch: 해당 product의 rec event 중 가장 최근(created_at max)에 direct 귀속.
// 매칭 없음 → session(동일 세션 SKU 일치 시) 또는 organic(자발). organic/unattributed/unknown = rec_id null (R-K2).
export function lastTouchAttribution(
  recEvents: RecommendationEvent[],
  opts: { productId: string; sameSession: boolean },
): AttributionResult {
  const matching = recEvents
    .filter((e) => e.product_id === opts.productId)
    .sort((a, b) => (a.created_at < b.created_at ? 1 : a.created_at > b.created_at ? -1 : 0));
  if (matching.length > 0) {
    return { recommendation_id: matching[0].recommendation_id, attribution_mode: "direct" };
  }
  if (opts.sameSession) {
    // 동일 세션 SKU 일치이나 직접 rec 링크 없음 → session mode (rec_id 없음)
    return { recommendation_id: null, attribution_mode: "session" };
  }
  return { recommendation_id: null, attribution_mode: "organic" };
}
