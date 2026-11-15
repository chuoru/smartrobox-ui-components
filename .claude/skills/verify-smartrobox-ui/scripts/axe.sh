#!/usr/bin/env bash
# Usage: VERIFY_RUN_ID=<id> axe.sh [path[@selector]...]   (@selector clicks it first to scan an open overlay; @hover:selector hovers, @context:selector right-clicks)
# Runs axe-core (WCAG 2.1 A/AA) on the home page, every sample page and each opened overlay in axe-overlays.txt, in light and dark mode. Exits non-zero on any violation.
source "$(dirname "$0")/env.sh"
exec node "$SKILL_DIR/scripts/axe.mjs" "$@"
