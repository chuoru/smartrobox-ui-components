#!/usr/bin/env bash
# Usage: VERIFY_RUN_ID=<id> drive.sh [--url <path>] <step>...
# Runs browser.mjs against this run's instance. Steps are listed in SKILL.md.
source "$(dirname "$0")/env.sh"
exec node "$SKILL_DIR/scripts/browser.mjs" "$@"
