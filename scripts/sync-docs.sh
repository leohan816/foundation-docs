#!/usr/bin/env bash
# sync-docs.sh — Foundation 생태계 문서 미러 도구 (원문 복사 전용·소스코드 mirror 아님)
#
# 원칙: 원문 파일을 그대로 복사(재작성/요약/변환 0). 금지 확장자/파일명/민감정보는 차단(BLOCKED).
# 사용:
#   ./scripts/sync-docs.sh --dry-run   # 대상/차단 목록만
#   ./scripts/sync-docs.sh             # 실제 복사 + copied/skipped/blocked 요약
#
# 분류: 파일명 prefix로 foundation-docs 대상 폴더 결정(README 구조).
set -u

DOCS_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
DRY_RUN=0
[ "${1:-}" = "--dry-run" ] && { DRY_RUN=1; shift; }

# ── 소스 문서 위치(문서만·소스코드/DB 아님). 필요 시 추가. ──
# 인자로 디렉토리를 주면 그 디렉토리들만 sync (예: ./sync-docs.sh --dry-run /path/docs)
if [ $# -gt 0 ]; then
  SOURCE_DIRS=("$@")
else
  SOURCE_DIRS=(
    "/home/leo/Project/foundation-control/docs"
    "/home/leo/Project/foundation-control/설계자료"
    "/home/leo/Project/SIASIU/설계문서"
    "/home/leo/Project/SIASIU/docs"
    "/home/leo/Project/Cosmile/app/docs"
  )
fi

# ── 절대 복사 금지: 확장자 ──
BLOCK_EXT_RE='\.(db|sqlite|sqlite3|env|pem|key|crt|cer|p12|pfx|log|sql|dump)$'
# ── 절대 복사 금지: 파일명/경로 조각 ──
BLOCK_NAME_RE='(^|/)(\.env|\.env\..*|id_rsa|id_ed25519|secrets?|credential|memory\.db|dev\.db|node_modules|\.next|\.venv|venv)(/|$)'
# ── 문서 내부 민감정보 의심 패턴(있으면 BLOCKED·조용히 지우지 않음) ──
SECRET_CONTENT_RE='(BEGIN (RSA|OPENSSH|EC|PRIVATE) KEY|sk-[A-Za-z0-9]{20,}|AKIA[0-9A-Z]{16}|xox[baprs]-[A-Za-z0-9-]+|-----BEGIN CERTIFICATE-----|password\s*[:=]\s*["'\''][^"'\'' ]{6,}|Authorization:\s*Bearer\s+[A-Za-z0-9._-]{20,})'

classify() {  # $1=filename → 대상 상대폴더
  local n; n="$(basename "$1")"
  case "$n" in
    FABLE5_*)                 echo "docs/reports/fable5" ;;
    RECOVERY_*|CANONICAL_*)   echo "docs/reports/recovery" ;;
    CONTROL_*)                echo "docs/reports/control" ;;
    *AUDIT*)                  echo "docs/reports/audits" ;;   # 감사/검증 보고서는 프로젝트 prefix보다 우선
    SIASIU_*)                 echo "설계문서/siasiu" ;;
    COSMILE_*)                echo "설계문서/cosmile" ;;
    FOUNDATION_FRC_*|FOUNDATION_BRAIN_*|FOUNDATION_SERVICE_*|FOUNDATION_*) echo "설계문서/foundation" ;;
    ARCHITECTURE_*|CONTRACT_*|DUAL_*|PRESERVE_*|*SEMANTIC_ADAPTER*) echo "설계문서/shared" ;;
    *STATUS*)                 echo "docs/status" ;;
    *FEATURE*INDEX*|*FEATURE_INDEX*) echo "docs/feature-index" ;;
    *)                        echo "설계문서/shared" ;;   # 기본: shared(사람이 재분류)
  esac
}

copied=0; skipped=0; blocked=0
COPIED_LIST=(); SKIPPED_LIST=(); BLOCKED_LIST=()

echo "== sync-docs.sh $([ $DRY_RUN -eq 1 ] && echo '(DRY-RUN)') =="
echo "target repo: $DOCS_ROOT"
echo ""

for dir in "${SOURCE_DIRS[@]}"; do
  [ -d "$dir" ] || continue
  # 문서만: .md / .json(문서성) — 소스코드 확장자 제외
  while IFS= read -r src; do
    [ -f "$src" ] || continue
    base="$(basename "$src")"
    # 1) 확장자/파일명 차단
    if echo "$src" | grep -qiE "$BLOCK_EXT_RE" || echo "$src" | grep -qiE "$BLOCK_NAME_RE"; then
      blocked=$((blocked+1)); BLOCKED_LIST+=("$src [금지 확장자/파일명]"); continue
    fi
    # 2) 내부 민감정보 차단(조용히 지우지 않음 → BLOCKED 보고)
    if grep -qiE "$SECRET_CONTENT_RE" "$src" 2>/dev/null; then
      blocked=$((blocked+1)); BLOCKED_LIST+=("$src [민감정보 의심 — BLOCKED·Leo 확인]"); continue
    fi
    rel="$(classify "$base")"
    dest="$DOCS_ROOT/$rel/$base"
    if [ -f "$dest" ]; then
      if cmp -s "$src" "$dest"; then
        skipped=$((skipped+1)); SKIPPED_LIST+=("$base [동일·skip]"); continue
      else
        # 다른 내용 → timestamp suffix(원문 보존·덮어쓰기 대신 안전)
        ts="$(basename "$src" .md)__synced.md"
        dest="$DOCS_ROOT/$rel/$ts"
        SKIPPED_LIST+=("$base [내용 다름 → $ts 로 저장]")
      fi
    fi
    echo "  COPY: $src"
    echo "     → $rel/$(basename "$dest")"
    if [ $DRY_RUN -eq 0 ]; then
      mkdir -p "$(dirname "$dest")"
      cp -p "$src" "$dest"    # ★원문 그대로(재작성/요약 0)
    fi
    copied=$((copied+1)); COPIED_LIST+=("$rel/$(basename "$dest")")
  done < <(find "$dir" -maxdepth 2 -type f \( -name "*.md" -o -name "*.json" \) 2>/dev/null)
done

echo ""
echo "== 요약 =="
echo "copied=$copied  skipped=$skipped  blocked=$blocked  $([ $DRY_RUN -eq 1 ] && echo '(dry-run·실제 복사 안 함)')"
if [ ${#BLOCKED_LIST[@]} -gt 0 ]; then
  echo "-- BLOCKED (복사 안 함) --"; printf '   %s\n' "${BLOCKED_LIST[@]}"
fi
echo ""
echo "다음: cd $DOCS_ROOT && git add -A && git commit && git push"
