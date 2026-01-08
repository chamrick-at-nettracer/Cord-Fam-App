#!/usr/bin/env node
/**
 * Weekly Maintenance Script
 * Runs all maintenance checks and generates a report
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const REPORT_DIR = path.join(__dirname, '..', 'reports');
const DATE = new Date().toISOString().split('T')[0];
const REPORT_FILE = path.join(REPORT_DIR, `maintenance-report-${DATE}.txt`);

// Ensure reports directory exists
if (!fs.existsSync(REPORT_DIR)) {
  fs.mkdirSync(REPORT_DIR, { recursive: true });
}

const report = [];

function log(message) {
  console.log(message);
  report.push(message);
}

function runCommand(command, cwd = process.cwd()) {
  try {
    const output = execSync(command, {
      cwd,
      encoding: 'utf8',
      stdio: 'pipe',
    });
    return { success: true, output };
  } catch (error) {
    return { success: false, output: error.stdout || error.message };
  }
}

log('='.repeat(80));
log(`Weekly Maintenance Report - ${new Date().toLocaleDateString()}`);
log('='.repeat(80));
log('');

// 1. Check for outdated packages
log('1. CHECKING FOR OUTDATED PACKAGES');
log('-'.repeat(80));

const projects = [
  { name: 'Root', path: process.cwd() },
  { name: 'Backend', path: path.join(process.cwd(), 'backend') },
  { name: 'Frontend Web', path: path.join(process.cwd(), 'frontend', 'web') },
];

projects.forEach((project) => {
  if (fs.existsSync(path.join(project.path, 'package.json'))) {
    log(`\n${project.name}:`);
    const result = runCommand('npm outdated --json || true', project.path);
    if (result.success && result.output.trim()) {
      try {
        const outdated = JSON.parse(result.output);
        const count = Object.keys(outdated).length;
        if (count > 0) {
          log(`  ⚠️  Found ${count} outdated package(s)`);
          Object.entries(outdated).forEach(([pkg, info]) => {
            log(`     - ${pkg}: ${info.current} → ${info.wanted} (latest: ${info.latest})`);
          });
        } else {
          log(`  ✅ All packages up to date`);
        }
      } catch (e) {
        log(`  ✅ All packages up to date`);
      }
    } else {
      log(`  ✅ All packages up to date`);
    }
  }
});

log('');

// 2. Security audit
log('2. SECURITY VULNERABILITY AUDIT');
log('-'.repeat(80));

projects.forEach((project) => {
  if (fs.existsSync(path.join(project.path, 'package.json'))) {
    log(`\n${project.name}:`);
    const result = runCommand('npm audit --json || true', project.path);
    if (result.success && result.output.trim()) {
      try {
        const audit = JSON.parse(result.output);
        const vulnerabilities = audit.metadata?.vulnerabilities || {};
        const total = vulnerabilities.total || 0;
        const critical = vulnerabilities.critical || 0;
        const high = vulnerabilities.high || 0;
        const moderate = vulnerabilities.moderate || 0;
        const low = vulnerabilities.low || 0;

        if (total > 0) {
          log(`  ⚠️  Found ${total} vulnerability/vulnerabilities:`);
          if (critical > 0) log(`     🔴 Critical: ${critical}`);
          if (high > 0) log(`     🟠 High: ${high}`);
          if (moderate > 0) log(`     🟡 Moderate: ${moderate}`);
          if (low > 0) log(`     🟢 Low: ${low}`);
          log(`     Run: cd ${project.path} && npm audit`);
        } else {
          log(`  ✅ No vulnerabilities found`);
        }
      } catch (e) {
        log(`  ⚠️  Could not parse audit results. Run manually: cd ${project.path} && npm audit`);
      }
    }
  }
});

log('');

// 3. Knip (unused code)
log('3. CHECKING FOR UNUSED CODE (KNIP)');
log('-'.repeat(80));

const knipProjects = [
  { name: 'Backend', path: path.join(process.cwd(), 'backend') },
  { name: 'Frontend Web', path: path.join(process.cwd(), 'frontend', 'web') },
];

knipProjects.forEach((project) => {
  if (fs.existsSync(path.join(project.path, 'package.json'))) {
    log(`\n${project.name}:`);
    const result = runCommand('npm run check 2>&1 || true', project.path);
    if (result.output.includes('No unused') || result.output.includes('Nothing found')) {
      log(`  ✅ No unused code found`);
    } else if (result.output.trim()) {
      log(`  ⚠️  Found unused code. Review output:`);
      log(`     ${result.output.split('\n').slice(0, 5).join('\n     ')}`);
      log(`     Run: cd ${project.path} && npm run check`);
    } else {
      log(`  ✅ No unused code found`);
    }
  }
});

log('');

// 4. Code quality
log('4. CODE QUALITY CHECKS');
log('-'.repeat(80));

log('\nMarkdown linting:');
const mdResult = runCommand('npm run lint:md 2>&1 || true');
if (mdResult.output.includes('error') || mdResult.output.includes('violation')) {
  log(`  ⚠️  Markdown linting issues found`);
  log(`     Run: npm run fix:md`);
} else {
  log(`  ✅ Markdown linting passed`);
}

log('\nPrettier formatting:');
const prettierResult = runCommand('npm run format:check 2>&1 || true');
if (prettierResult.output.includes('error') || prettierResult.output.includes('All matched files')) {
  const hasErrors = prettierResult.output.includes('error') ||
                   (prettierResult.output.includes('All matched files') &&
                    !prettierResult.output.includes('All matched files use Prettier'));
  if (hasErrors) {
    log(`  ⚠️  Formatting issues found`);
    log(`     Run: npm run format`);
  } else {
    log(`  ✅ All files formatted correctly`);
  }
} else {
  log(`  ✅ All files formatted correctly`);
}

log('');

// Summary
log('='.repeat(80));
log('SUMMARY');
log('='.repeat(80));
log('');
log('✅ Maintenance check complete!');
log('');
log('Next steps:');
log('1. Review the report above');
log('2. Fix critical/high security vulnerabilities');
log('3. Update outdated packages (test first!)');
log('4. Remove unused code (Knip findings)');
log('5. Fix formatting/linting issues');
log('');
log(`Full report saved to: ${REPORT_FILE}`);
log('');

// Write report to file
fs.writeFileSync(REPORT_FILE, report.join('\n'), 'utf8');
console.log(`📄 Report saved to: ${REPORT_FILE}`);
