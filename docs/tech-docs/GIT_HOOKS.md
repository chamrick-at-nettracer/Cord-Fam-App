# Git Hooks Setup

This document explains the git hooks configuration for Cord-Fam-App.

## Overview

We use **Husky** to manage git hooks and **lint-staged** to run checks only on
staged files. This ensures code quality and consistency before commits.

## What Runs on Pre-Commit

When you commit, the following checks run automatically **in order**:

1. **Auto-add Language Identifiers** - Adds language identifiers to code blocks
   (MD040 fix)
2. **Markdownlint** - Lints and auto-fixes Markdown files
3. **Prettier Formatting** - Auto-formats all staged files
4. **ESLint Linting** - Lints and auto-fixes TypeScript/JavaScript files
5. **Unit Tests** - Runs backend and frontend unit tests with coverage checks

**Note:** E2E tests are **NOT** run in pre-commit hooks because they:

- Take too long (minutes vs seconds for unit tests)
- Require backend and frontend servers to be running
- Are better suited for CI/CD pipelines or manual runs before pushing

Run E2E tests manually with `npm run test:e2e` in `frontend/web` before pushing
or in your CI/CD pipeline.

All fixes are automatically applied and re-staged, so your commit will include
the fixes!

## Configuration Files

- `.husky/pre-commit` - Git pre-commit hook script
- `.lintstagedrc.json` - lint-staged configuration (what runs on which file
  types)
- `.markdownlint.json` - Markdown linting rules
- `.prettierrc.json` - Prettier formatting rules
- `.prettierignore` - Files to ignore for Prettier
- `tooling/add-code-block-languages.js` - Script that auto-adds language
  identifiers

## Manual Commands

### Fix All Markdown Issues

```bash
npm run fix:md
```

### Lint Markdown Files

```bash
npm run lint:md
```

### Format All Files

```bash
npm run format
```

### Check Formatting (without fixing)

```bash
npm run format:check
```

## How It Works

1. You stage files with `git add`
2. You run `git commit`
3. Husky intercepts the commit
4. lint-staged runs configured tools on staged files **in order**:
   - First: Auto-fix code block languages
   - Then: Run markdownlint with --fix
   - Then: Run Prettier
   - Then: Run ESLint with --fix
5. Files are auto-fixed and re-staged automatically
6. If all checks pass, commit proceeds
7. If checks fail (non-fixable issues), commit is blocked

## Markdown Linting Rules

We enforce all markdownlint rules, including:

- **MD040**: Fenced code blocks must have a language identifier
  - ✅ **Auto-fixed**: Our script automatically adds language identifiers based
    on code content
- **MD022**: Headings must be surrounded by blank lines
- **MD032**: Lists must be surrounded by blank lines
- **MD036**: No emphasis used as heading
- **MD044**: Proper names capitalization (e.g., TypeScript not TypeScript)
- And many more...

See `.markdownlint.json` for full configuration.

## Troubleshooting

### Hook Not Running

```bash
# Reinstall hooks
npm run prepare
```

### Skip Hooks (Not Recommended)

```bash
# Skip pre-commit hook
git commit --no-verify
```

### Fix Markdown Issues Manually

```bash
# Run the fix script
./tooling/fix-markdown.sh
```

### See What Would Be Fixed

```bash
# Check linting issues
npm run lint:md

# Check formatting issues
npm run format:check
```

## Adding New Tools

To add a new tool to pre-commit:

1. Install the tool: `npm install -D tool-name`

2. Add to `.lintstagedrc.json`:

   ```json
   {
     "*.filetype": ["tool-name --fix", "git add"]
   }
   ```

3. Test: `npx lint-staged`

## Auto-Fix Script

The `tooling/add-code-block-languages.js` script automatically infers and adds
language identifiers to code blocks:

- **SQL** - Detects SQL keywords
- **JavaScript/TypeScript** - Detects JS/TS syntax
- **JSON** - Detects JSON structure
- **YAML** - Detects YAML structure
- **Bash** - Detects shell commands
- **HTTP** - Detects HTTP requests
- **Text** - Default for directory trees and plain text

This script runs automatically before markdownlint, so MD040 violations are
fixed before linting.

---

**Last Updated**: 2026-01-27
