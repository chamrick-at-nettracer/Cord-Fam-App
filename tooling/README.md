# Tooling

This folder contains development tooling scripts and configurations for the
Cord-Fam-App project.

## Scripts

### `pre-commit.sh`

Pre-commit hook script that runs linting, formatting, and tests before commit.

### `fix-markdown.sh`

Auto-fixes markdown linting issues using markdownlint-cli2 and Prettier.

## Usage

### Manual Markdown Fixing

```bash
./tooling/fix-markdown.sh
```

### Running Pre-commit Checks Manually

```bash
./tooling/pre-commit.sh
```

## Git Hooks

Git hooks are automatically set up via Husky. The pre-commit hook runs:

1. Prettier formatting (all files)
2. ESLint linting and auto-fix (TypeScript/JavaScript files)
3. Markdownlint auto-fix (Markdown files)
4. Unit tests (if configured)

## Configuration Files

- `.markdownlint.json` - Markdown linting rules
- `.prettierrc.json` - Prettier formatting rules
- `.lintstagedrc.json` - lint-staged configuration
- `.husky/pre-commit` - Git pre-commit hook

## Adding New Tools

When adding new development tools:

1. Add configuration files to the root directory
2. Add scripts to this `tooling/` folder if needed
3. Update `.lintstagedrc.json` if the tool should run on staged files
4. Update `.husky/pre-commit` if the tool should run before every commit

---

**Last Updated**: 2026-01-27
