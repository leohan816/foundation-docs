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
  // P-d: created_at을 epoch로 파싱해 정렬(혼합 TZ/형식에서도 정확). ISO8601 위반 시 throw(문자열 정렬 오정렬 방지).
  const epoch = (s: string): number => {
    const t = Date.parse(s);
    if (Number.isNaN(t)) throw new Error("created_at must be ISO8601 (parse failed)");
    return t;
  };
  // ★모든 매칭 이벤트의 created_at를 선(先)검증(단일 원소여도 throw) 후 epoch 기준 정렬.
  const matching = recEvents
    .filter((e) => e.product_id === opts.productId)
    .map((e) => ({ e, ts: epoch(e.created_at) }))
    .sort((a, b) => b.ts - a.ts) // 최근(desc) → matching[0]=last-touch
    .map((x) => x.e);
  if (matching.length > 0) {
    return { recommendation_id: matching[0].recommendation_id, attribution_mode: "direct" };
  }
  if (opts.sameSession) {
    // 동일 세션 SKU 일치이나 직접 rec 링크 없음 → session mode (rec_id 없음)
    return { recommendation_id: null, attribution_mode: "session" };
  }
  return { recommendation_id: null, attribution_mode: "organic" };
}
