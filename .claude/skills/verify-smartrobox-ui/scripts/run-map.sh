#!/usr/bin/env bash
# Usage: VERIFY_RUN_ID=<id> run-map.sh [feature-file-substring]
# Runs every journey in features/*.md verbatim (each "Run `drive.sh ...`" bullet). Exits non-zero if any fails.
source "$(dirname "$0")/env.sh"
cd "$SKILL_DIR"
filter="${1:-}"
fails=0
while IFS=$'\t' read -r file name cmd; do
  [[ -n "$filter" && "$file" != *"$filter"* ]] && continue
  if eval "scripts/$cmd" >/dev/null 2>&1; then
    echo "PASS $file :: $name"
  else
    fails=$((fails + 1))
    echo "FAIL $file :: $name"
    echo "     $(tail -1 "$EVIDENCE_DIR/log.jsonl")"
  fi
done < <(python3 - <<'PY'
import glob, re
for f in sorted(glob.glob('features/*.md')):
    if f.endswith('README.md'):
        continue
    for m in re.finditer(r"- \*\*(.+?)\*\*.*?Run `(drive\.sh [^`]+)`", open(f).read()):
        print(f"{f.split('/')[1]}\t{m.group(1).rstrip('.')}\t{m.group(2)}")
PY
)
echo "map: $fails failing journey(s); evidence in $EVIDENCE_DIR"
exit $(( fails > 0 ))
