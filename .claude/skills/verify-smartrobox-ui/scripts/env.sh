#!/usr/bin/env bash
# Sourced by the other scripts. Resolves node, the harness deps, and per-run paths.
set -euo pipefail

SKILL_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
REPO_DIR="$(cd "$SKILL_DIR/../../.." && pwd)"
CACHE_DIR="${XDG_CACHE_HOME:-$HOME/.cache}/verify-smartrobox-ui"
RUN_ID="${VERIFY_RUN_ID:-default}"
RUN_DIR="/tmp/verify-smartrobox-ui/$RUN_ID"
STATE_FILE="$RUN_DIR/state"
EVIDENCE_DIR="$REPO_DIR/.verify-evidence/$RUN_ID"
CHROME="${VERIFY_CHROME:-/usr/bin/google-chrome}"
NODE_MAJOR=24
export VERIFY_RUN_ID="$RUN_ID" VERIFY_EVIDENCE_DIR="$EVIDENCE_DIR" VERIFY_CHROME="$CHROME"

if ! command -v node >/dev/null 2>&1 || [[ "$(node -p 'process.versions.node.split(".")[0]')" -lt $NODE_MAJOR ]]; then
  if [[ ! -x "$CACHE_DIR/node/bin/node" ]]; then
    mkdir -p "$CACHE_DIR"
    version=$(curl -fsS https://nodejs.org/dist/index.json | python3 -c "import json,sys;print(next(r['version'] for r in json.load(sys.stdin) if r['version'].startswith('v$NODE_MAJOR.')))")
    echo "env: downloading node $version to $CACHE_DIR/node" >&2
    curl -fsSL "https://nodejs.org/dist/$version/node-$version-linux-x64.tar.xz" | tar xJ -C "$CACHE_DIR"
    mv "$CACHE_DIR/node-$version-linux-x64" "$CACHE_DIR/node"
  fi
  export PATH="$CACHE_DIR/node/bin:$PATH"
fi

if [[ ! -d "$CACHE_DIR/harness/node_modules/puppeteer-core" ]]; then
  mkdir -p "$CACHE_DIR/harness"
  echo "env: installing puppeteer-core into $CACHE_DIR/harness" >&2
  (cd "$CACHE_DIR/harness" && [[ -f package.json ]] || echo '{"private":true}' > package.json; npm install --silent puppeteer-core@24 >/dev/null)
fi
export NODE_PATH="$CACHE_DIR/harness/node_modules"

if [[ ! -d "$REPO_DIR/node_modules" ]]; then
  echo "env: installing repo dependencies" >&2
  (cd "$REPO_DIR" && npm install --silent >/dev/null)
fi
