#!/usr/bin/env bash
# Usage: VERIFY_RUN_ID=<id> launch.sh [port]
# Starts the playground dev server for this run and blocks until it renders.
source "$(dirname "$0")/env.sh"

if [[ -f "$STATE_FILE" ]]; then
  echo "launch: run '$RUN_ID' already has an instance ($(cat "$STATE_FILE")). Run cleanup.sh first or pick another VERIFY_RUN_ID." >&2
  exit 1
fi

port="${1:-$(python3 -c 'import socket;s=socket.socket();s.bind(("127.0.0.1",0));print(s.getsockname()[1])')}"
mkdir -p "$RUN_DIR" "$EVIDENCE_DIR"
log="$RUN_DIR/vite.log"

cd "$REPO_DIR/playground"
setsid node "$REPO_DIR/node_modules/vite/bin/vite.js" --port "$port" --strictPort --host 127.0.0.1 >"$log" 2>&1 < /dev/null &
pid=$!
echo "pid=$pid port=$port url=http://127.0.0.1:$port log=$log" > "$STATE_FILE"

deadline=$((SECONDS + 120))
while (( SECONDS < deadline )); do
  if ! kill -0 "$pid" 2>/dev/null; then
    echo "launch: vite exited early. Log:" >&2; cat "$log" >&2; rm -f "$STATE_FILE"; exit 1
  fi
  if curl -fsS "http://127.0.0.1:$port/" 2>/dev/null | grep -q 'id="app"'; then
    if last=$("$SKILL_DIR/scripts/doctor.sh" 2>&1); then
      echo "ready $(cat "$STATE_FILE") evidence=$EVIDENCE_DIR"
      exit 0
    fi
  fi
  sleep 1
done
echo "launch: not ready after 120s. Last doctor output: $last" >&2
echo "Vite log:" >&2; cat "$log" >&2
exit 1
