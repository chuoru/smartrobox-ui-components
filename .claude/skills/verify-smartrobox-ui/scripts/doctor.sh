#!/usr/bin/env bash
# Usage: VERIFY_RUN_ID=<id> doctor.sh
# Read-only. Exits 0 only if this run's instance is ours, serves this checkout, and renders the app shell.
source "$(dirname "$0")/env.sh"

fail() { echo "doctor: FAIL $*" >&2; exit 1; }
[[ -f "$STATE_FILE" ]] || fail "no instance for run '$RUN_ID' (no $STATE_FILE). Run launch.sh."
eval "$(tr ' ' '\n' < "$STATE_FILE" | grep -E '^(pid|port|url)=')"
kill -0 "$pid" 2>/dev/null || fail "pid $pid is not running"
owner=$(ss -ltnpH "sport = :$port" 2>/dev/null | grep -o 'pid=[0-9]*' | head -1 | cut -d= -f2)
[[ "$owner" == "$pid" ]] || fail "port $port is owned by pid '${owner:-none}', not our pid $pid"
cwd=$(readlink "/proc/$pid/cwd")
[[ "$cwd" == "$REPO_DIR/playground" ]] || fail "pid $pid serves $cwd, not $REPO_DIR/playground"
[[ -x "$CHROME" ]] || fail "chrome not found at $CHROME (set VERIFY_CHROME)"
VERIFY_EVIDENCE_DIR="$RUN_DIR/doctor" node "$SKILL_DIR/scripts/browser.mjs" --url / --expect-text "SmartRobox UI Components" >/dev/null || fail "app shell did not render (see browser.mjs output)"
echo "doctor: OK run=$RUN_ID pid=$pid url=$url checkout=$REPO_DIR node=$(node -v)"
