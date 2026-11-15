#!/usr/bin/env bash
# Usage: VERIFY_RUN_ID=<id> nontext.sh
# Measures 3:1 non-text contrast (WCAG 1.4.11) of form-control outlines, tracks and focus indicators in light and dark mode. Exits non-zero on any failure.
source "$(dirname "$0")/env.sh"
exec node "$SKILL_DIR/scripts/nontext.mjs" "$@"
