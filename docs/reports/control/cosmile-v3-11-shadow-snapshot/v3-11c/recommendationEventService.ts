// COSMILE MEMORY V3-11C — RecommendationEvent emit (shadow·flag OFF 기본·live 아님)
// ★D-C1: trackCommerceEvent 확장이 아니라 신설. ★재발명 금지: id/subject/anon은 V3-11A ids.ts 생성기 사용.
// ★fail-open: 실패해도 cart를 깨지 않는다(throw 안 함). 단 결과는 observable(written/skipped/error).
import { recommendationId, subjectRef, anonymousRef } from "@/lib/ids";
import { REC_EVENT_TYPES, type RecEventType } from "@/types/recommendationEvent";
// ★prisma는 default write 경로에서만 lazy import(테스트는 deps.create 주입 → prisma 미로드).

// 기본 OFF(shadow inert). "1"일 때만 write 시도.
const FLAG_ENV = "COSMILE_REC_EVENT_ENABLED";

export interface TrackRecommendationEventInput {
  eventType: RecEventType;
  userId?: string;   // 로그인 → subject_ref
  guestId?: string;  // 비회원 → anonymous_ref
  sessionId?: string | null; // ★G-C5: 현재 미populated(이월)·write 시 값 필요
  productId: string;
  skuId?: string | null;
  reasonCodes?: string[];
}

export interface RecEmitResult {
  written: boolean;
  skipped?: "flag_off";
  error?: "xor_violation" | "invalid_event_type" | "write_failed";
  recommendationId?: string;
}

// safety/do_not 계열 reason code만 최소 기록(deterministic 정책 필터·이미 구조화된 코드·raw 의미판단 아님).
const SAFETY_REASON_RE = /^(RISK_|DO_NOT_|SAFETY_)/i;
const SAFETY_REASON_SUFFIX = /(_BLOCK|_ADVERSE)$/i;
export function toSafetyReasonCodes(reasons: string[]): string[] {
  return (reasons ?? []).filter((r) => typeof r === "string" && (SAFETY_REASON_RE.test(r) || SAFETY_REASON_SUFFIX.test(r)));
}

type CreateFn = (data: Record<string, unknown>) => Promise<unknown>;

export async function trackRecommendationEvent(
  input: TrackRecommendationEventInput,
  deps?: { create?: CreateFn; flagEnabled?: boolean; secret?: string },
): Promise<RecEmitResult> {
  const flagEnabled = deps?.flagEnabled ?? (process.env[FLAG_ENV] === "1");
  if (!flagEnabled) return { written: false, skipped: "flag_off" }; // shadow inert·no write

  if (!(REC_EVENT_TYPES as readonly string[]).includes(input.eventType)) {
    return { written: false, error: "invalid_event_type" };
  }

  // subject_ref XOR anonymous_ref: 정확히 하나(userId=subject / guestId=anon)
  const hasU = !!input.userId, hasG = !!input.guestId;
  if (hasU === hasG) return { written: false, error: "xor_violation" };

  const opts = deps?.secret ? { secret: deps.secret } : undefined;
  const subj = hasU ? subjectRef(input.userId as string, opts) : null;
  const anon = hasG ? anonymousRef(input.guestId as string, opts) : null;

  const data = {
    recommendationId: recommendationId(),          // ★ids.ts 생성기(rec_v3_+ULID)
    eventType: input.eventType,
    subjectRef: subj,
    anonymousRef: anon,
    sessionId: input.sessionId ?? null,
    productId: input.productId,
    skuId: input.skuId ?? null,
    reasonCodes: toSafetyReasonCodes(input.reasonCodes ?? []),
  };

  const create: CreateFn = deps?.create ?? (async (d) => {
    const { prisma } = await import("@/lib/prisma");
    return prisma.recommendationEvent.create({ data: d as never });
  });
  try {
    await create(data);
    return { written: true, recommendationId: data.recommendationId };
  } catch {
    // ★fail-open: cart를 깨지 않음. 단 조용히 무시하지 않고 observable error 반환.
    return { written: false, error: "write_failed" };
  }
}
