// COSMILE MEMORY V3-03 — RecommendationEvent 얕은 상호작용 계약 (사전 §1.3 R-K7·소유=V3-03 단일)
// event_type enum = const-array 단일 소스(canonicalEvent.ts 패턴).

export const REC_EVENT_TYPES = [
  "recommendation_shown",
  "recommendation_clicked",
  "recommendation_dismissed",
  "recommendation_saved",
  "recommendation_added_to_cart",
] as const;
export type RecEventType = (typeof REC_EVENT_TYPES)[number];

export interface RecommendationEvent {
  recommendation_id: string;          // rec_v3_+ULID (사전 §1.1)
  event_type: RecEventType;
  subject_ref: string | null;         // subject_ref XOR anonymous_ref (§1.3)
  anonymous_ref: string | null;
  session_id: string;
  product_id: string;
  sku_id: string | null;              // nullable sku 허용 (§1.1)
  reason_codes: string[];             // 사전 §2.15 taxonomy
  created_at: string;                 // ISO8601
}
