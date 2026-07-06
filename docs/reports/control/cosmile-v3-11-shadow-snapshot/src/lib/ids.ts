// COSMILE MEMORY V3 — identity/key 단일 정본 생성기 (사전 §1.1)
// ★재발명 금지: subject_ref/anonymous_ref/recommendation_id 생성은 오직 이 모듈. callsite 재타이핑 금지(split-brain 방지).
// ★기존 foundation-memory-deanon.mjs:identityRef("ref_"+HMAC)는 event de-anon 전용·별개 개념(혼동 금지).
import { ulid } from "ulid";
import { createHmac } from "node:crypto";

// L1 fail-closed: prod/unknown env에서 secret 미설정 → throw. dev/test/local/shadow만 dev/mock fallback.
const _DEV_FALLBACK: Record<string, string> = {
  COSMILE_SUBJECT_SECRET: "cosmile_dev_mock_subject_secret",
  COSMILE_FUREF_SECRET: "cosmile_dev_mock_furef_secret",
};
function isProduction(): boolean {
  const env = (process.env.NODE_ENV || process.env.APP_ENV || "").trim().toLowerCase();
  return !["dev", "development", "test", "local", "shadow"].includes(env);
}
function loadSecret(name: "COSMILE_SUBJECT_SECRET" | "COSMILE_FUREF_SECRET"): string {
  const v = process.env[name];
  if (v) return v;
  if (isProduction()) throw new Error(`${name} required in production (no dev fallback)`); // ★secret 값 미출력
  return _DEV_FALLBACK[name];
}

// recommendation_id = rec_v3_ + ULID(26) — 사전 §1.1 유일 형식
export function recommendationId(): string {
  return "rec_v3_" + ulid();
}
export const REC_ID_RE = /^rec_v3_[0-9A-HJKMNP-TV-Z]{26}$/; // Crockford base32 (ULID)

// subject_ref = subj_v2_ + HMAC(<SVC>_SUBJECT_SECRET, '<svc>:subject:'+ref)[:32] — Option B service-local mint
export function subjectRef(localUserRef: string, opts?: { secret?: string; svc?: string }): string {
  const svc = opts?.svc ?? "cosmile";
  const secret = opts?.secret ?? loadSecret("COSMILE_SUBJECT_SECRET");
  const mac = createHmac("sha256", secret).update(`${svc}:subject:${localUserRef}`).digest("hex");
  return "subj_v2_" + mac.slice(0, 32);
}
export const SUBJECT_REF_RE = /^subj_v2_[0-9a-f]{32}$/;

// anonymous_ref = anon_v3_ + opaque32 (keyed HMAC·결정적·commerce 계층 전용) — 사전 §1.1
export function anonymousRef(anonId: string, opts?: { secret?: string; svc?: string }): string {
  const svc = opts?.svc ?? "cosmile";
  const secret = opts?.secret ?? loadSecret("COSMILE_FUREF_SECRET");
  const mac = createHmac("sha256", secret).update(`${svc}:anon:${anonId}`).digest("hex");
  return "anon_v3_" + mac.slice(0, 32);
}
export const ANON_REF_RE = /^anon_v3_[0-9a-f]{32}$/;
