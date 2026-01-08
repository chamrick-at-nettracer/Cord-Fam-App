# Cursor Rules Configuration

This document explains how Cursor AI rules work in this project.

## Current Setup

We use a **`.cursorrules`** file in the project root. This is the standard and
recommended approach for Cursor.

## How Cursor Rules Work

Cursor supports two ways to provide rules to AI agents:

### 1. `.cursorrules` File (What We Use)

**Location**: `.cursorrules` in the project root **Format**: Markdown file with
rules and guidelines **Best for**: Single-file rule sets, project-wide rules

**Advantages**:

- ✅ Simple and straightforward
- ✅ Easy to version control
- ✅ All rules in one place
- ✅ Works immediately (no setup needed)

**Our `.cursorrules` file**:

- Contains project overview
- Defines AI agent roles
- Sets code quality standards
- Documents architecture principles
- Provides development workflow guidance

### 2. `.cursor/rules/` Directory (Alternative)

**Location**: `.cursor/rules/` directory in project root **Format**: Multiple
markdown files, one per topic **Best for**: Large projects with many rule
categories

**Structure**:

```text
.cursor/
  rules/
    architecture.md
    code-quality.md
    security.md
    testing.md
```

**Advantages**:

- ✅ Better organization for large rule sets
- ✅ Easier to navigate specific topics
- ✅ Can be split by team/domain

**When to use**:

- Project has 500+ lines of rules
- Multiple teams need different rule sets
- Rules need to be organized by domain

## Why We Use `.cursorrules`

1. **Simplicity**: All rules in one place
2. **Size**: Our rules fit comfortably in one file (~270 lines)
3. **Maintainability**: Easier to keep everything in sync
4. **Standard**: Most common approach in the Cursor community

## How Cursor Reads Rules

1. **First**: Checks for `.cursorrules` file
2. **Then**: Checks for `.cursor/rules/` directory
3. **Uses**: The first one found (`.cursorrules` takes precedence)

## Best Practices

### Keep Rules Focused

- Document what matters for AI agents
- Include examples when helpful
- Update rules as project evolves

### Version Control

- ✅ Commit `.cursorrules` to git
- ✅ Review rules in PRs
- ✅ Update rules when architecture changes

### Organization

- Use clear headings
- Group related rules together
- Keep formatting consistent

## Updating Rules

When to update `.cursorrules`:

1. **New patterns**: Add new coding patterns
2. **Architecture changes**: Update when architecture evolves
3. **Tool changes**: Update when adding new tools
4. **Team feedback**: Update based on team experience

**Process**:

1. Edit `.cursorrules`
2. Test with AI agent
3. Commit changes
4. Document significant changes in `docs/tech-docs/DECISIONS.md`

## Migrating to `.cursor/rules/` (If Needed)

If `.cursorrules` grows too large (1000+ lines), consider splitting:

1. **Create directory**:

   ```bash
   mkdir -p .cursor/rules
   ```

2. **Split by topic**:
   - `architecture.md` - System design
   - `code-quality.md` - Standards and practices
   - `security.md` - Security guidelines
   - `testing.md` - Testing requirements
   - `workflow.md` - Development workflow

3. **Move content**: Copy relevant sections to each file

4. **Delete `.cursorrules`**: Remove the old file

5. **Test**: Verify Cursor still reads rules correctly

## Troubleshooting

### Cursor Not Following Rules

**Check**:

1. File is named exactly `.cursorrules` (not `.cursor-rules` or `cursor.rules`)
2. File is in project root (not in subdirectory)
3. File is committed to git (Cursor reads from git)
4. Restart Cursor after changes

### Rules Too Long

**Solution**: Split into `.cursor/rules/` directory

### Conflicting Rules

**Solution**: Review rules for contradictions, prioritize most specific rules

## References

- [Cursor Documentation](https://cursor.sh/docs)
- [Cursor Rules Examples](https://github.com/cursor-sh/cursor)

---

**Current Status**: Using `.cursorrules` file (recommended approach) **File
Size**: ~270 lines (comfortable for single file) **Last Updated**: 2026-01-27
