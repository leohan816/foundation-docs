# 267 — Order-detail visual failure correction pointer

- Audit: `266_ADVISOR_ORDER_DETAIL_VISUAL_FAILURE_CORRECTION_AUDIT.md`
- Cause: public four-hour cache policy on mutable same-URL dev client chunk
- Candidate: `8d4a3272`
- Gates: detail `99/99`; cache `6/6`
- Reviews: Opus 5/max + `/fable-sentinel`, both PASS/blocking 0
- Runtime: public/local byte-identical new chunk, both headers no-store
- Status: `PASS_READY_FOR_REPEAT_HUMAN_VISUAL_CHECKPOINT`
- Golden Reversal: HOLD
