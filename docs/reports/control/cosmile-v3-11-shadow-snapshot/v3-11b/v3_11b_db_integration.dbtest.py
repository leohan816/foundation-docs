#!/usr/bin/env python3
"""COSMILE MEMORY V3-11B — DB-touch integration test (non-prod/ephemeral Postgres ONLY).
★provider-independent test(v3_11.vitest.ts)와 분리. ★infra-gate: DB 연결 실패 = SKIP(exit 2)이지 PASS 아님.
정본: DATA_DICTIONARY_CANONICAL(§1/§2/§5)·V3-08 INV-DB-1/2/3·patched semantic_label §2.12 10값.
DSN: env V3_11B_DSN (기본 ephemeral). prod DSN 금지."""
import os, sys
try:
    import psycopg2
except ImportError:
    print("SKIP: psycopg2 unavailable (infra-gate, NOT pass)"); sys.exit(2)

DSN = os.environ.get("V3_11B_DSN", "host=localhost port=55433 dbname=cosmile_rehearsal user=postgres password=devlocal_rehearsal")
try:
    conn = psycopg2.connect(DSN); conn.autocommit = False
except Exception as e:
    print(f"SKIP: cannot connect ephemeral Postgres (infra-gate, NOT pass): {e}"); sys.exit(2)

P = F = 0
def ok(name, cond):
    global P, F
    if cond: P += 1; print(f"  PASS {name}")
    else: F += 1; print(f"  FAIL {name}")

def expect_ok(name, sql, params=()):
    cur = conn.cursor()
    try: cur.execute(sql, params); conn.commit(); ok(name, True)
    except Exception as e: conn.rollback(); ok(name, False); print(f"       unexpected reject: {e}")
    finally: cur.close()

def expect_reject(name, sql, params=()):
    cur = conn.cursor()
    try:
        cur.execute(sql, params); conn.commit(); ok(name, False); print("       inserted but should have been rejected")
    except Exception:
        conn.rollback(); ok(name, True)
    finally: cur.close()

def scalar(sql, params=()):
    cur = conn.cursor(); cur.execute(sql, params); v = cur.fetchone()[0]; conn.rollback(); cur.close(); return v

REC = "rec_v3_" + "0123456789ABCDEFGHJKMNPQRS"   # 26 Crockford
SUBJ = "subj_v2_" + "a"*32
ANON = "anon_v3_" + "b"*32

print("== V3-11B DB-touch integration ==")
# FK 부모(Order/OrderItem) 최소 seed
expect_ok("setup Order", "INSERT INTO \"Order\"(\"id\",\"subtotal\",\"total\") VALUES('o1',1000,1000) ON CONFLICT DO NOTHING")
expect_ok("setup OrderItem", "INSERT INTO \"OrderItem\"(\"id\",\"orderId\",\"productId\",\"quantity\",\"unitPrice\",\"totalPrice\",\"productNameSnapshot\") VALUES('oi1','o1','p1',1,1000,1000,'P') ON CONFLICT DO NOTHING")

# T-DB-1 RecommendationEvent CHECK
expect_ok("DB1a valid RecommendationEvent", "INSERT INTO \"RecommendationEvent\"(\"recommendationId\",\"eventType\",\"subjectRef\",\"sessionId\",\"productId\") VALUES(%s,'recommendation_shown',%s,'s1','p1')", (REC, SUBJ))
expect_reject("DB1b invalid eventType", "INSERT INTO \"RecommendationEvent\"(\"recommendationId\",\"eventType\",\"subjectRef\",\"sessionId\",\"productId\") VALUES('rec_v3_ZZZZZZZZZZZZZZZZZZZZZZZZZZ','bogus_event',%s,'s1','p1')", (SUBJ,))
expect_reject("DB1c bad recId format (rec_v3_+32 zeros·superseded)", "INSERT INTO \"RecommendationEvent\"(\"recommendationId\",\"eventType\",\"subjectRef\",\"sessionId\",\"productId\") VALUES(%s,'recommendation_shown',%s,'s1','p1')", ("rec_v3_"+"0"*32, SUBJ))
expect_reject("DB1d XOR both set", "INSERT INTO \"RecommendationEvent\"(\"recommendationId\",\"eventType\",\"subjectRef\",\"anonymousRef\",\"sessionId\",\"productId\") VALUES('rec_v3_11111111111111111111111111','recommendation_shown',%s,%s,'s1','p1')", (SUBJ, ANON))
expect_reject("DB1e XOR neither set", "INSERT INTO \"RecommendationEvent\"(\"recommendationId\",\"eventType\",\"sessionId\",\"productId\") VALUES('rec_v3_22222222222222222222222222','recommendation_shown','s1','p1')")

# T-DB-2 RecOutcomeFeedback semantic_label §2.12 + adverse
expect_ok("DB2a semantic satisfied", "INSERT INTO \"RecOutcomeFeedback\"(\"feedbackId\",\"orderItemId\",\"semanticLabel\") VALUES('fb1','oi1','satisfied')")
expect_ok("DB2b semantic usage_question_safety(§2.12 safety-first)", "INSERT INTO \"RecOutcomeFeedback\"(\"feedbackId\",\"orderItemId\",\"semanticLabel\") VALUES('fb2','oi1','usage_question_safety')")
expect_reject("DB2c semantic adverse_reaction(구값·거부)", "INSERT INTO \"RecOutcomeFeedback\"(\"feedbackId\",\"orderItemId\",\"semanticLabel\") VALUES('fbx','oi1','adverse_reaction')")
expect_reject("DB2d semantic unknown(구값·거부)", "INSERT INTO \"RecOutcomeFeedback\"(\"feedbackId\",\"orderItemId\",\"semanticLabel\") VALUES('fby','oi1','unknown')")
expect_reject("DB2e adverse_severity mild(구값·거부)", "INSERT INTO \"RecOutcomeFeedback\"(\"feedbackId\",\"orderItemId\",\"semanticLabel\",\"adverseSeverity\") VALUES('fbz','oi1','adverse_skin_reaction','mild')")
expect_ok("DB2f adverse_severity low(정합)", "INSERT INTO \"RecOutcomeFeedback\"(\"feedbackId\",\"orderItemId\",\"semanticLabel\",\"adverseSeverity\") VALUES('fb3','oi1','adverse_skin_reaction','low')")

# T-DB-3 RecOutcomeEvent R-K2(organic→rec_id null)
expect_reject("DB3a organic + recommendationId set(R-K2 위반·거부)", "INSERT INTO \"RecOutcomeEvent\"(\"id\",\"recommendationId\",\"attributionMode\",\"subjectRef\",\"orderId\",\"orderItemId\",\"productId\") VALUES('re_x',%s,'organic',%s,'o1','oi1','p1')", (REC, SUBJ))
expect_ok("DB3b organic + recommendationId null", "INSERT INTO \"RecOutcomeEvent\"(\"id\",\"attributionMode\",\"subjectRef\",\"orderId\",\"orderItemId\",\"productId\") VALUES('re1','organic',%s,'o1','oi1','p1')", (SUBJ,))
expect_ok("DB3c direct + recommendationId set", "INSERT INTO \"RecOutcomeEvent\"(\"id\",\"recommendationId\",\"attributionMode\",\"anonymousRef\",\"orderId\",\"orderItemId\",\"productId\") VALUES('re2',%s,'direct',%s,'o1','oi1','p1')", (REC, ANON))

# T-DB-4 memory 계층에 anonymousRef 컬럼 없음(구조·anon 직접 유입 구조적 차단)
for tbl in ("LongTermMemoryFact","MemoryFactCandidate"):
    cnt = scalar("SELECT count(*) FROM information_schema.columns WHERE table_name=%s AND column_name IN ('anonymousRef','anonymous_ref')", (tbl,))
    ok(f"DB4 {tbl} has NO anonymousRef column", cnt == 0)

# T-DB-5 INV-DB-2 counter (approved·non-safety·safety_flag null·evidence 위반) — clean=0, 위반 주입 시 detect
INV2 = ("SELECT count(*) FROM \"LongTermMemoryFact\" WHERE \"status\"='approved' AND \"direction\" IS DISTINCT FROM 'safety' "
        "AND \"safetyFlag\" IS NULL AND (\"evidenceCount\" < 2 OR \"distinctSignalSourceCount\" < 2 OR \"confidence\" < 0.60)")
# clean approved fact(정합)·safety fact(예외)·safety_flag fact(예외)
expect_ok("DB5setup clean approved fact", "INSERT INTO \"LongTermMemoryFact\"(\"factId\",\"subjectRef\",\"type\",\"normValue\",\"status\",\"direction\",\"evidenceCount\",\"distinctSignalSourceCount\",\"confidence\") VALUES('f_ok',%s,'ingredient_affinity','niacinamide','approved','positive',2,2,0.70)", (SUBJ,))
expect_ok("DB5setup safety fact low-evidence(direction=safety·예외)", "INSERT INTO \"LongTermMemoryFact\"(\"factId\",\"subjectRef\",\"type\",\"normValue\",\"status\",\"direction\",\"isSafety\",\"evidenceCount\",\"distinctSignalSourceCount\",\"confidence\") VALUES('f_safe',%s,'ingredient_adverse','fragrance','approved','safety',true,1,1,0.30)", (SUBJ,))
expect_ok("DB5setup safety_flag fact low-evidence(예외)", "INSERT INTO \"LongTermMemoryFact\"(\"factId\",\"subjectRef\",\"type\",\"normValue\",\"status\",\"direction\",\"safetyFlag\",\"evidenceCount\",\"distinctSignalSourceCount\",\"confidence\") VALUES('f_flag',%s,'ingredient_affinity','retinol','approved','positive','safety_frozen',1,1,0.30)", (SUBJ,))
ok("DB5a INV-DB-2 counter = 0 (clean·safety 예외 제외)", scalar(INV2) == 0)
# 위반 주입(approved·positive·flag null·evidence=1) → counter가 실제 detect(비-tautology)
cur = conn.cursor(); cur.execute("INSERT INTO \"LongTermMemoryFact\"(\"factId\",\"subjectRef\",\"type\",\"normValue\",\"status\",\"direction\",\"evidenceCount\",\"distinctSignalSourceCount\",\"confidence\") VALUES('f_bad',%s,'ingredient_affinity','vitc','approved','positive',1,1,0.30)", (SUBJ,))
detect = scalar(INV2); conn.rollback(); cur.close()
ok("DB5b INV-DB-2 counter detects injected violation (>=1·비-tautology)", detect >= 1)

# T-DB-6 INV-DB-3 safety-priority: safety fact(direction=safety OR safetyFlag not null)는 demoted 금지
INV3 = "SELECT count(*) FROM \"LongTermMemoryFact\" WHERE (\"direction\"='safety' OR \"safetyFlag\" IS NOT NULL) AND \"lifecycleState\"='demoted'"
ok("DB6a INV-DB-3 counter = 0 (safety fact 강등 없음)", scalar(INV3) == 0)
cur = conn.cursor(); cur.execute("UPDATE \"LongTermMemoryFact\" SET \"lifecycleState\"='demoted' WHERE \"factId\"='f_safe'")
detect3 = scalar(INV3); conn.rollback(); cur.close()
ok("DB6b INV-DB-3 detects demoted safety fact (>=1·비-tautology)", detect3 >= 1)

# T-DB-7 partial-unique (INV-DB-1): 동일 active identity 중복 거부·deleted는 예외
expect_ok("DB7a first active fact", "INSERT INTO \"LongTermMemoryFact\"(\"factId\",\"subjectRef\",\"type\",\"normValue\",\"factState\") VALUES('u1',%s,'concern','acne','active')", (SUBJ,))
expect_reject("DB7b duplicate active identity 거부", "INSERT INTO \"LongTermMemoryFact\"(\"factId\",\"subjectRef\",\"type\",\"normValue\",\"factState\") VALUES('u2',%s,'concern','acne','active')", (SUBJ,))
expect_ok("DB7c deleted 동일 identity 허용(partial WHERE 제외)", "INSERT INTO \"LongTermMemoryFact\"(\"factId\",\"subjectRef\",\"type\",\"normValue\",\"factState\",\"deleted\") VALUES('u3',%s,'concern','acne','active',true)", (SUBJ,))

conn.close()
print(f"\n== RESULT: {P} passed / {F} failed ({P+F} total) ==")
sys.exit(0 if F == 0 else 1)
