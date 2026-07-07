// COSMILE MEMORY V3-11C — trackRecommendationEvent provider-independent tests (DI fake·DB 무접촉)
// 정본: V3-03 RecommendationEvent·V3-11A ids.ts·shadow flag OFF 기본. ★fail-open이나 observable result.
import { describe, it, expect } from "vitest";
import { trackRecommendationEvent, toSafetyReasonCodes } from "../src/lib/recommendationEventService";
import { REC_ID_RE, SUBJECT_REF_RE, ANON_REF_RE } from "../src/lib/ids";

// 캡처용 fake create — 실제 write shape를 관측
function fake() {
  const calls: any[] = [];
  return { create: async (data: any) => { calls.push(data); return { ...data }; }, calls };
}
const base = { eventType: "recommendation_added_to_cart" as const, productId: "p1", skuId: null, sessionId: "sess-test", reasonCodes: [] as string[] };

describe("TC2 flag OFF → write 없음(shadow inert)", () => {
  it("flag OFF(기본)면 create 미호출·skipped observable", async () => {
    const f = fake();
    const r = await trackRecommendationEvent({ ...base, userId: "u1" }, { create: f.create, flagEnabled: false });
    expect(r.written).toBe(false); expect(r.skipped).toBe("flag_off"); expect(f.calls.length).toBe(0);
  });
});

describe("TC3 flag ON + subject_ref → write shape 정합", () => {
  it("subjectRef set·anonymousRef null·rec_v3_ id·eventType", async () => {
    const f = fake();
    const r = await trackRecommendationEvent({ ...base, userId: "u1" }, { create: f.create, flagEnabled: true, secret: "s" });
    expect(r.written).toBe(true); expect(f.calls.length).toBe(1);
    const d = f.calls[0];
    expect(SUBJECT_REF_RE.test(d.subjectRef)).toBe(true); expect(d.anonymousRef).toBeNull();
    expect(REC_ID_RE.test(d.recommendationId)).toBe(true); expect(d.eventType).toBe("recommendation_added_to_cart");
    expect(d.productId).toBe("p1");
  });
});

describe("TC4 flag ON + anonymous_ref → write shape 정합", () => {
  it("anonymousRef set·subjectRef null", async () => {
    const f = fake();
    const r = await trackRecommendationEvent({ ...base, guestId: "g1" }, { create: f.create, flagEnabled: true, secret: "s" });
    expect(r.written).toBe(true);
    const d = f.calls[0];
    expect(ANON_REF_RE.test(d.anonymousRef)).toBe(true); expect(d.subjectRef).toBeNull();
  });
});

describe("TC5/TC6 XOR reject", () => {
  it("둘 다(userId+guestId) → xor_violation·write 없음", async () => {
    const f = fake();
    const r = await trackRecommendationEvent({ ...base, userId: "u1", guestId: "g1" }, { create: f.create, flagEnabled: true });
    expect(r.written).toBe(false); expect(r.error).toBe("xor_violation"); expect(f.calls.length).toBe(0);
  });
  it("둘 다 없음 → xor_violation·write 없음", async () => {
    const f = fake();
    const r = await trackRecommendationEvent({ ...base }, { create: f.create, flagEnabled: true });
    expect(r.written).toBe(false); expect(r.error).toBe("xor_violation"); expect(f.calls.length).toBe(0);
  });
});

describe("TC7 reason_codes safety/do_not 계열만 기록", () => {
  it("safety/do_not 코드 유지·일반 코드 제외", () => {
    const out = toSafetyReasonCodes(["RISK_ADVERSE_BLOCK", "DO_NOT_BUY_PREGNANCY", "nice_texture", "concern_match", "SAFETY_CAUTION"]);
    expect(out).toContain("RISK_ADVERSE_BLOCK"); expect(out).toContain("DO_NOT_BUY_PREGNANCY"); expect(out).toContain("SAFETY_CAUTION");
    expect(out).not.toContain("nice_texture"); expect(out).not.toContain("concern_match");
  });
  it("write 시 reasonCodes가 safety 필터 적용됨", async () => {
    const f = fake();
    await trackRecommendationEvent({ ...base, userId: "u1", reasonCodes: ["RISK_ADVERSE_BLOCK", "nice_texture"] }, { create: f.create, flagEnabled: true, secret: "s" });
    expect(f.calls[0].reasonCodes).toEqual(["RISK_ADVERSE_BLOCK"]);
  });
});

describe("TC8 ids.ts 생성기 직접 사용(hand-roll 아님)", () => {
  it("recommendationId=rec_v3_+ULID·subjectRef=subj_v2_(ids.ts 형식)", async () => {
    const f = fake();
    await trackRecommendationEvent({ ...base, userId: "u1" }, { create: f.create, flagEnabled: true, secret: "s" });
    const d = f.calls[0];
    expect(d.recommendationId.startsWith("rec_v3_")).toBe(true); expect(d.recommendationId.length).toBe(7 + 26);
    expect(d.subjectRef.startsWith("subj_v2_")).toBe(true);
  });
});

describe("TC-extra observable failure(fail-open이나 조용히 무시 안 함)", () => {
  it("write 실패 시 error observable·throw 안 함(cart 미파손)", async () => {
    const throwing = { create: async () => { throw new Error("db down"); } };
    const r = await trackRecommendationEvent({ ...base, userId: "u1" }, { create: throwing.create, flagEnabled: true, secret: "s" });
    expect(r.written).toBe(false); expect(r.error).toBe("write_failed");
  });
  it("invalid event_type → error observable", async () => {
    const f = fake();
    const r = await trackRecommendationEvent({ ...base, eventType: "bogus" as any, userId: "u1" }, { create: f.create, flagEnabled: true });
    expect(r.written).toBe(false); expect(r.error).toBe("invalid_event_type"); expect(f.calls.length).toBe(0);
  });
});
