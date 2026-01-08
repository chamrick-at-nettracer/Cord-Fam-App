# Weekly Maintenance Guide

**When**: Every Friday (or end of your work week) **Time**: ~15-30 minutes
**Goal**: Keep the codebase up-to-date, secure, and clean

This guide provides automated scripts and manual checks to maintain
professional-level code quality.

---

## Quick Start

Run the automated maintenance script:

```bash
npm run maintenance
```

This will:

1. ✅ Check for outdated packages
2. ✅ Audit for security vulnerabilities
3. ✅ Run Knip to find unused code
4. ✅ Generate a maintenance report

**Then review the report and fix issues as needed.**

---

## Detailed Maintenance Tasks

### 1. Check for Outdated Packages

**Automated**:

```bash
npm run maintenance:outdated
```

**What it does**:

- Checks all `package.json` files (root, backend, frontend/web)
- Shows which packages have newer versions available
- Categorizes by: current, wanted, latest

**Action items**:

- Review outdated packages
- Update patch/minor versions (usually safe)
- Test thoroughly before updating major versions
- Update one package at a time to isolate issues

**Manual check**:

```bash
# Root
npm outdated

# Backend
cd backend && npm outdated

# Frontend
cd frontend/web && npm outdated
```

---

### 2. Security Vulnerability Audit

**Automated**:

```bash
npm run maintenance:audit
```

**What it does**:

- Runs `npm audit` on all projects
- Identifies security vulnerabilities
- Shows severity levels (low, moderate, high, critical)

**Action items**:

- **Critical/High**: Fix immediately
- **Moderate**: Fix within the week
- **Low**: Fix when convenient

**Auto-fix (use with caution)**:

```bash
# Root
npm audit fix

# Backend
cd backend && npm audit fix

# Frontend
cd frontend/web && npm audit fix
```

**Manual review**:

```bash
npm audit
```

**Note**: `npm audit fix` only fixes issues that don't require breaking changes.
Review changes before committing.

---

### 3. Find Unused Code (Knip)

**Automated**:

```bash
npm run maintenance:knip
```

**What it does**:

- Runs Knip on all TypeScript/JavaScript projects
- Finds unused exports, dependencies, files
- Helps keep codebase lean

**Action items**:

- Review unused exports (may be false positives)
- Remove unused dependencies
- Delete unused files (after confirming they're not needed)

**Manual check**:

```bash
# Backend
cd backend && npm run check

# Frontend
cd frontend/web && npm run check
```

---

### 4. Dependency Updates

**When to update**:

- **Patch versions** (1.0.0 → 1.0.1): Update immediately (bug fixes)
- **Minor versions** (1.0.0 → 1.1.0): Update weekly (new features, usually safe)
- **Major versions** (1.0.0 → 2.0.0): Plan carefully (breaking changes)

**Update process**:

1. **Check what's outdated**:

   ```bash
   npm run maintenance:outdated
   ```

2. **Update patch/minor versions**:

   ```bash
   # Update all patch/minor versions (be careful!)
   npm update

   # Or update specific package
   npm install package-name@latest
   ```

3. **Test thoroughly**:

   ```bash
   # Backend
   cd backend && npm run dev
   # Test API endpoints

   # Frontend
   cd frontend/web && npm run dev
   # Test UI functionality
   ```

4. **Run tests** (when available):

   ```bash
   npm test
   ```

5. **Commit changes**:

   ```bash
   git add package*.json package-lock.json
   git commit -m "chore: update dependencies"
   ```

---

### 5. Code Quality Checks

**Run all checks**:

```bash
npm run maintenance:quality
```

**What it checks**:

- ESLint errors
- Prettier formatting
- TypeScript type errors
- Markdown linting

**Fix automatically**:

```bash
# Format code
npm run format

# Fix markdown
npm run fix:md

# Fix linting (from each project)
cd backend && npm run lint -- --fix
cd frontend/web && npm run lint -- --fix
```

---

### 6. Database Maintenance

**MySQL**:

```bash
# Check database size
MySQL -u root -p -e "SELECT table_schema AS 'Database',
  ROUND(SUM(data_length + index_length) / 1024 / 1024, 2) AS 'Size (MB)'
  FROM information_schema.TABLES
  WHERE table_schema = 'cordfam';"

# Optimize tables (run monthly, not weekly)
MySQL -u root -p -e "USE cordfam; OPTIMIZE TABLE users, channels, channel_members;"
```

**MongoDB**:

```bash
# Check database stats
mongosh --eval "db.stats()" cordfam

# Check collection sizes
mongosh --eval "db.getCollectionNames().forEach(c => print(c + ': ' + db[c].count()));" cordfam
```

---

## Automated Maintenance Script

The `npm run maintenance` command runs all checks and generates a report.

**Report location**: `maintenance-report-YYYY-MM-DD.txt`

**Report includes**:

- Outdated packages summary
- Security vulnerabilities
- Knip findings
- Code quality issues
- Recommendations

---

## Weekly Checklist

Use this checklist every Friday:

- [ ] Run `npm run maintenance`
- [ ] Review maintenance report
- [ ] Fix critical/high security vulnerabilities
- [ ] Update patch/minor versions (test first)
- [ ] Review and remove unused code (Knip findings)
- [ ] Run code quality checks
- [ ] Commit dependency updates
- [ ] Update `docs/tasks/PROGRESS.md` with maintenance notes

---

## Monthly Tasks

**First Friday of each month**:

- [ ] Review major version updates (plan carefully)
- [ ] Optimize database tables (MySQL)
- [ ] Review and archive old logs
- [ ] Check disk space usage
- [ ] Review and update documentation

---

## Emergency Maintenance

**If security vulnerability found**:

1. **Stop what you're doing**
2. **Check severity**: `npm audit`
3. **Fix immediately**:

   ```bash
   npm audit fix
   # If that doesn't work:
   npm audit fix --force  # Use with caution!
   ```

4. **Test thoroughly**
5. **Commit and deploy ASAP**

---

## Maintenance Scripts Reference

All scripts are in `package.json`:

```json
{
  "maintenance": "node scripts/maintenance.js",
  "maintenance:outdated": "node scripts/maintenance-outdated.js",
  "maintenance:audit": "node scripts/maintenance-audit.js",
  "maintenance:knip": "node scripts/maintenance-knip.js",
  "maintenance:quality": "node scripts/maintenance-quality.js"
}
```

---

## Troubleshooting

### npm audit shows vulnerabilities but `npm audit fix` doesn't fix them

**Solution**: Some vulnerabilities require manual updates or major version
bumps. Review the audit report and update packages manually.

### Knip shows false positives

**Solution**: Update `knip.json` configuration to exclude files or mark exports
as used.

### Updates break the build

**Solution**:

1. Revert: `git checkout package*.json package-lock.json`
2. Update one package at a time
3. Test after each update
4. Document breaking changes

---

## Best Practices

1. **Update regularly**: Don't let packages get too outdated
2. **Test after updates**: Always test after updating dependencies
3. **One at a time**: Update major versions one at a time
4. **Document changes**: Note any breaking changes in commit messages
5. **Keep backups**: Commit working state before major updates
6. **Review changelogs**: Check package changelogs for breaking changes

---

**Remember**: Regular maintenance prevents technical debt and security issues.
**Time investment**: 15-30 minutes weekly saves hours of debugging later.

---

**Last Updated**: 2026-01-27
