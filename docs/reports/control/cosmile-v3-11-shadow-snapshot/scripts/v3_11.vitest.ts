// COSMILE MEMORY V3-11 — provider-independent tests (테스트 먼저·실패 상태로 정의)
// 정본: DATA_DICTIONARY_CANONICAL(§1/§2/§5)·gate cdede5d(D1~D4)·P1 3b52994. DB/네트워크 무접촉(pure).
import { describe, it, expect } from "vitest";
import { recommendationId, subjectRef, anonymousRef, REC_ID_RE, SUBJECT_REF_RE, ANON_REF_RE } from "../src/lib/ids";
import { lastTouchAttribution } from "../src/lib/attribution";
import { severityOf, matrixEffect, ADVERSE_SEVERITY } from "../src/lib/adverse";
import { canCreateCandidate, canPromote, demotionEligible } from "../src/lib/memoryCandidate";
import { RANKING_SIGNALS } from "../src/lib/ranking";
import { marginBandDistribution } from "../src/lib/analytics";
import { assertXor } from "../src/lib/identity";
import { REC_EVENT_TYPES } from "../src/types/recommendationEvent";
import { ATTRIBUTION_MODES } from "../src/types/recOutcome";

// T1 rec_id format (③쌍: 수락 + garbage 거부 + 과거 결함값 거부)
describe("T1 rec_id_format", () => {
  it("accepts rec_v3_+ULID(26)", () => { const id = recommendationId(); expect(REC_ID_RE.test(id)).toBe(true); expect(id.length).toBe("rec_v3_".length + 26); });
  it("rejects garbage", () => { expect(REC_ID_RE.test("bogus")).toBe(false); });
  it("rejects 과거 결함값 rec_v3_+32 (superseded)", () => { expect(REC_ID_RE.test("rec_v3_" + "0".repeat(32))).toBe(false); });
  it("rejects bare UUID", () => { expect(REC_ID_RE.test("550e8400-e29b-41d4-a716-446655440000")).toBe(false); });
});

// T3 subject_ref format + env hmac (하드코딩 아님·Option B)
describe("T3 subject_ref_format + env_hmac", () => {
  it("format subj_v2_+32hex", () => { expect(SUBJECT_REF_RE.test(subjectRef("u1", { secret: "s" }))).toBe(true); });
  it("env secret 변경 → ref 변경(하드코딩 아님)", () => { expect(subjectRef("u1", { secret: "A" })).not.toBe(subjectRef("u1", { secret: "B" })); });
  it("de-identified (raw ref 미포함)", () => { expect(subjectRef("user_42", { secret: "s" }).includes("user_42")).toBe(false); });
});

// T4 anon_ref format + not-in-memory-layer
describe("T4 anon_ref_format + not_in_memory_layer", () => {
  it("format anon_v3_+32hex", () => { expect(ANON_REF_RE.test(anonymousRef("a1", { secret: "s" }))).toBe(true); });
  it("subject_ref format과 구분(prefix 다름)", () => { expect(anonymousRef("a1", { secret: "s" }).startsWith("anon_v3_")).toBe(true); expect(SUBJECT_REF_RE.test(anonymousRef("a1", { secret: "s" }))).toBe(false); });
});

// T5 attribution last-touch (D1)
describe("T5 attribution_last_touch", () => {
  const evs = [
    { recommendation_id: recommendationId(), event_type: "recommendation_shown" as const, subject_ref: "subj_v2_" + "0".repeat(32), anonymous_ref: null, session_id: "s", product_id: "p1", sku_id: null, reason_codes: [], created_at: "2026-07-06T01:00:00Z" },
    { recommendation_id: recommendationId(), event_type: "recommendation_shown" as const, subject_ref: "subj_v2_" + "0".repeat(32), anonymous_ref: null, session_id: "s", product_id: "p1", sku_id: null, reason_codes: [], created_at: "2026-07-06T03:00:00Z" },
  ];
  it("다중 rec 중 last-touch(최근) 귀속", () => { const r = lastTouchAttribution(evs, { productId: "p1", sameSession: true }); expect(r.recommendation_id).toBe(evs[1].recommendation_id); expect(r.attribution_mode).toBe("direct"); });
  it("rec 없으면 organic + rec_id NULL (T2 rec_id_null_attribution)", () => { const r = lastTouchAttribution(evs, { productId: "pX", sameSession: false }); expect(r.recommendation_id).toBeNull(); expect(r.attribution_mode).toBe("organic"); });
  it("attribution_mode enum 정본 5값", () => { expect(ATTRIBUTION_MODES).toEqual(["direct","session","organic","unattributed","unknown"]); });
});

// T6 anon downstream signature (함수 시그니처에 anonymous_ref 인자 유지)
describe("T6 anon_downstream_signature", () => {
  it("lastTouchAttribution는 anon 여정 event를 소실 없이 처리", () => {
    const anonEv = [{ recommendation_id: recommendationId(), event_type: "recommendation_clicked" as const, subject_ref: null, anonymous_ref: anonymousRef("a1", { secret: "s" }), session_id: "s", product_id: "p1", sku_id: null, reason_codes: [], created_at: "2026-07-06T01:00:00Z" }];
    const r = lastTouchAttribution(anonEv, { productId: "p1", sameSession: true });
    expect(r.recommendation_id).toBe(anonEv[0].recommendation_id);
  });
});

// T7 xor subject/anon
describe("T7 xor_subject_anon", () => {
  it("정확히 하나만 있어야 통과", () => { expect(assertXor("subj_v2_x", null)).toBe(true); expect(assertXor(null, "anon_v3_x")).toBe(true); });
  it("둘 다/둘 다 null 거부", () => { expect(assertXor("s", "a")).toBe(false); expect(assertXor(null, null)).toBe(false); });
});

// T8/T9 candidate tombstone / must_not_reappear (M2 규율·P3)
describe("T8/T9 candidate_tombstone_precheck + must_not_reappear_block", () => {
  const key = { subject_key: "subj_v2_x", fact_type: "ingredient_affinity", fact_target: "ing1" };
  it("clean이면 생성 허용", () => { expect(canCreateCandidate([], key).ok).toBe(true); });
  it("tombstone(deleted) fact면 생성 거부", () => { expect(canCreateCandidate([{ ...key, deleted: true }], key).ok).toBe(false); });
  it("must_not_reappear=true면 재생성 거부(부활 방지)", () => { const r = canCreateCandidate([{ ...key, must_not_reappear: true }], key); expect(r.ok).toBe(false); expect(r.reason).toBe("must_not_reappear"); });
});

// T10 safety fact demotion exempt (P1 — direction≠safety AND safety_flag null만 강등)
describe("T10 safety_fact_demotion_exempt", () => {
  it("일반 preference(direction=positive·flag null) = 강등 대상", () => { expect(demotionEligible({ subject_key: "x", fact_type: "ingredient_affinity", fact_target: "i", direction: "positive", safety_flag: null })).toBe(true); });
  it("direction=safety adverse = 강등 예외", () => { expect(demotionEligible({ subject_key: "x", fact_type: "ingredient_adverse", fact_target: "i", direction: "safety", safety_flag: null })).toBe(false); });
  it("★value-level: direction≠safety이나 safety_flag 부착 = 강등 예외(P1 gap)", () => { expect(demotionEligible({ subject_key: "x", fact_type: "ingredient_affinity", fact_target: "i", direction: "positive", safety_flag: "safety_frozen" })).toBe(false); });
});

// T11 adverse severity map (D4·③쌍: 매핑 + 과거 결함값 mild 거부)
describe("T11 adverse_severity_map", () => {
  it("D4 매핑", () => { expect(severityOf("stinging")).toBe("low"); expect(severityOf("discontinuation")).toBe("moderate"); expect(severityOf("rash")).toBe("severe"); expect(severityOf("medical_reference")).toBe("severe"); });
  it("severity enum 3값(mild 없음·superseded)", () => { expect(ADVERSE_SEVERITY).toEqual(["low","moderate","severe"]); expect((ADVERSE_SEVERITY as readonly string[]).includes("mild")).toBe(false); });
  it("unknown signal = fail-closed severe", () => { expect(severityOf("unheard_of")).toBe("severe"); });
});

// T12 adverse matrix effect (P2 §5.3)
describe("T12 adverse_matrix_effect", () => {
  it("single low×reported = caution_memory_candidate(전 affinity 동결 아님)", () => { expect(matrixEffect("low", "reported")).toBe("caution_memory_candidate"); });
  it("severe×reported = immediate safety_block", () => { expect(matrixEffect("severe", "reported")).toBe("immediate_safety_block"); });
  it("low×repeated = escalate(moderate-equiv)", () => { expect(matrixEffect("low", "repeated")).toBe("safety_caution"); });
  it("verified = active safety fact", () => { expect(matrixEffect("low", "verified")).toBe("active_safety_fact"); });
});

// T13 margin_band analytics only + not in ranking (D3)
describe("T13 margin_band_analytics_only + margin_not_in_ranking", () => {
  it("ranking signal 목록에 margin_band 없음", () => { expect((RANKING_SIGNALS as readonly string[]).includes("margin_band")).toBe(false); });
  it("ranking signal에 safety 포함(우선)", () => { expect((RANKING_SIGNALS as readonly string[]).includes("safety_filtered")).toBe(true); });
  it("margin_band는 analytics read에서만 사용", () => { const d = marginBandDistribution([{ margin_band: "high" }, { margin_band: "low" }, { margin_band: "high" }]); expect(d.high).toBe(2); expect(d.low).toBe(1); });
});

// T14 consent before promotion + anon no promotion (D2)
describe("T14 consent_before_promotion + anon_no_promotion", () => {
  it("동의 후에만 promotion", () => { expect(canPromote({ consentGranted: true, isAnonymous: false }).ok).toBe(true); });
  it("consent 없으면 promotion 거부", () => { const r = canPromote({ consentGranted: false, isAnonymous: false }); expect(r.ok).toBe(false); expect(r.reason).toBe("consent_required"); });
  it("anonymous면 promotion 거부(consent 무관)", () => { const r = canPromote({ consentGranted: true, isAnonymous: true }); expect(r.ok).toBe(false); expect(r.reason).toBe("anonymous_no_promotion"); });
});

// 얕은 상호작용 event_type enum (V3-03 소유)
describe("RecommendationEvent event_type", () => {
  it("5 event types", () => { expect(REC_EVENT_TYPES).toEqual(["recommendation_shown","recommendation_clicked","recommendation_dismissed","recommendation_saved","recommendation_added_to_cart"]); });
});
