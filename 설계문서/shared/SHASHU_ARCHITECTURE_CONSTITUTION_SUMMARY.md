# Shashu(SIASIU) — Architecture Constitution (역할 요약)
> 전체 헌법: /home/leo/Project/SIASIU/설계문서/FOUNDATION_SERVICE_SEMANTIC_ADAPTER_ARCHITECTURE_20260630.md

## Shashu의 역할
- Shashu Semantic AI Adapter — 피부/성분 도메인으로 고객 발화를 이해 → Foundation Semantic Contract 작성.
- Shashu Response AI Adapter — Foundation Response Contract를 따뜻한 상담사 문장·언어로 마사지.
- service data: memory.db(고객 사실)·session facts는 Shashu 소유.

## 현재 상태 → 목표
- 현재: brain.chat이 understanding+reasoning+voice가 뭉친 원본 monolith.
- 목표: Semantic AI Adapter / Foundation Common Brain / Response AI Adapter로 lift-and-split.
  (Foundation으로 이식해온 회로 = 이 split의 가운데 조각)

## Shashu가 하면 안 되는 것
- ❌ Foundation decision/safety/evidence 전복.
- ❌ 판단 코어(검색/성분/안전)를 Shashu 안에서 재구현(→ Foundation 호출).
- ❌ Shashu voice/memory를 Foundation core에 박기(service-owned).
