#!/bin/bash
# Helper script to add language identifiers to code blocks
# This is a manual helper - markdownlint-cli2 doesn't auto-fix MD040

echo "⚠️  MD040 (fenced code blocks need language) cannot be auto-fixed."
echo "Please manually add language identifiers to code blocks."
echo ""
echo "Common languages:"
echo "  - text (for directory trees, plain text)"
echo "  - json (for JSON)"
echo "  - typescript / ts (for TypeScript)"
echo "  - javascript / js (for JavaScript)"
echo "  - bash / sh (for shell scripts)"
echo "  - sql (for SQL)"
echo "  - yaml / yml (for YAML)"
echo ""
echo "Run 'npm run lint:md' to see which files need fixing."
