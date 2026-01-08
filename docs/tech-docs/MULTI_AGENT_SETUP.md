# Multi-Agent Development Setup

This document explains how to use multiple AI agents in Cursor for collaborative
development.

## Cursor's Multi-Agent Capabilities

Cursor supports multiple ways to work with AI agents:

### 1. Background Agents (Web App)

Cursor has a web application that allows you to manage multiple coding agents:

**Setup Steps:**

1. Navigate to [cursor.com/agents](https://cursor.com/agents)
2. Sign in with your Cursor account
3. Connect your GitHub repositories
4. Create agents and assign them specific tasks or roles

**Use Cases:**

- Code Review Agent
- Test Generation Agent
- Documentation Agent
- Bug Fix Agent
- Feature Development Agent

**Benefits:**

- Agents work in the background
- Monitor progress through web interface
- Merge completed changes when ready
- Parallel work on different features

### 2. Multiple Cursor Windows/Tabs

You can open multiple Cursor windows or tabs, each potentially focused on
different tasks:

**Setup:**

- Open multiple Cursor windows
- Each window can have different files open
- Use different chat contexts for different tasks

**Use Cases:**

- One window for backend work
- One window for frontend work
- One window for documentation
- One window for testing

### 3. Terminal-Based Agents

You can run AI agents in terminal sessions using tools like:

**Claude Code (Anthropic):**

- Run Claude Code in separate terminal sessions
- Each session can work on different parts of the codebase
- Coordinate through shared documentation

**Other Terminal Tools:**

- GitHub Copilot CLI
- Cursor CLI (if available)
- Custom scripts that call AI APIs

### 4. Agent Roles in This Project

Based on `.cursorrules`, we have defined these agent roles:

- **Solution Architect**: System design and architecture decisions
- **Security Architect**: Security reviews and best practices
- **React Engineer**: Web frontend development
- **Android Engineer**: Android app development
- **iOS Engineer**: iOS app development (future)
- **Database Engineer**: Database design and optimization
- **API Engineer**: Backend API development
- **Design/UX Reviewer**: UI/UX consistency
- **QA Engineer**: Testing and quality assurance

### 5. Coordination Strategies

**Documentation-Driven:**

- All agents read `docs/tech-docs/` for architecture
- All agents read `docs/tasks/PROGRESS.md` for current work
- All agents read `.cursorrules` for project standards

**Task Assignment:**

- Use `docs/tasks/PROGRESS.md` to assign work
- Mark tasks as "in_progress" when starting
- Update with completion status

**Communication:**

- Use markdown files in `docs/tasks/` for coordination
- Document decisions in `docs/tech-docs/DECISIONS.md`
- Use PRD (`docs/PRD.md`) for requirements

### 6. Best Practices

1. **Clear Boundaries**: Each agent should work on distinct features/modules
2. **Regular Sync**: Update `PROGRESS.md` frequently
3. **Code Reviews**: Have agents review each other's work
4. **Documentation**: Document all changes and decisions
5. **Testing**: Ensure tests pass before marking tasks complete

### 7. Example Workflow

**Scenario**: Adding a new feature (e.g., Task Management)

1. **Solution Architect Agent**: Designs the feature architecture
   - Updates `docs/tech-docs/ARCHITECTURE.md`
   - Creates API design in `docs/tech-docs/API_DESIGN.md`

2. **API Engineer Agent**: Implements backend
   - Creates routes, controllers, services
   - Updates `docs/tasks/PROGRESS.md`

3. **React Engineer Agent**: Implements frontend
   - Creates components and pages
   - Updates `docs/tasks/PROGRESS.md`

4. **QA Engineer Agent**: Writes tests
   - Unit tests for backend
   - E2E tests for frontend
   - Updates `docs/tasks/PROGRESS.md`

5. **Security Architect Agent**: Reviews security
   - Checks authentication/authorization
   - Reviews input validation
   - Updates `docs/tasks/PROGRESS.md`

6. **Documentation Agent**: Updates docs
   - User documentation
   - API documentation
   - Technical documentation

### 8. Tools for Multi-Agent Coordination

**Current Setup:**

- Git hooks ensure code quality
- Markdown linting ensures documentation quality
- `.cursorrules` provides consistent guidelines
- `docs/` structure provides clear organization

**Future Enhancements:**

- Automated task assignment
- Agent communication protocols
- Conflict resolution strategies
- Performance monitoring

---

## Quick Start for Multi-Agent Work

1. **Read the Rules**: All agents should read `.cursorrules`
2. **Check Progress**: Read `docs/tasks/PROGRESS.md`
3. **Pick a Task**: Choose an unassigned task
4. **Mark In Progress**: Update `PROGRESS.md`
5. **Do the Work**: Follow architecture and standards
6. **Update Progress**: Mark complete when done
7. **Document Changes**: Update relevant docs

---

**Last Updated**: 2026-01-27
