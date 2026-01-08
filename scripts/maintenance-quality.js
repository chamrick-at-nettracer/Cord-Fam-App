#!/usr/bin/env node
/**
 * Run code quality checks
 */

const { execSync } = require('child_process');

console.log('Running code quality checks...\n');

console.log('1. Markdown linting:');
console.log('-'.repeat(60));
try {
  execSync('npm run lint:md', { stdio: 'inherit' });
  console.log('\n✅ Markdown linting passed');
} catch (error) {
  console.log('\n⚠️  Markdown linting issues found. Run: npm run fix:md');
}

console.log('\n2. Prettier formatting:');
console.log('-'.repeat(60));
try {
  execSync('npm run format:check', { stdio: 'inherit' });
  console.log('\n✅ All files formatted correctly');
} catch (error) {
  console.log('\n⚠️  Formatting issues found. Run: npm run format');
}
