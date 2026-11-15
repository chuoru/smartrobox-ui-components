#!/usr/bin/env bash
# Usage: VERIFY_RUN_ID=<id> cleanup.sh
# Stops only the instance this run started. Evidence under .verify-evidence/<run-id> is kept.
set -euo pipefail
RUN_ID="${VERIFY_RUN_ID:-default}"
RUN_DIR="/tmp/verify-smartrobox-ui/$RUN_ID"
STATE_FILE="$RUN_DIR/state"
if [[ ! -f "$STATE_FILE" ]]; then echo "cleanup: nothing to stop for run '$RUN_ID'"; exit 0; fi
pid=$(tr ' ' '\n' < "$STATE_FILE" | grep '^pid=' | cut -d= -f2)
if kill -0 "$pid" 2>/dev/null; then
  kill -TERM -- "-$pid" 2>/dev/null || kill -TERM "$pid"
  for _ in $(seq 1 20); do kill -0 "$pid" 2>/dev/null || break; sleep 0.25; done
  kill -0 "$pid" 2>/dev/null && kill -KILL -- "-$pid" 2>/dev/null || true
fi
rm -rf "$RUN_DIR"
echo "cleanup: stopped pid $pid for run '$RUN_ID'"
