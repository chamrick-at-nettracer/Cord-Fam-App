#!/usr/bin/env node
/**
 * Check for outdated packages across all projects
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const projects = [
  { name: 'Root', path: process.cwd() },
  { name: 'Backend', path: path.join(process.cwd(), 'backend') },
  { name: 'Frontend Web', path: path.join(process.cwd(), 'frontend', 'web') },
];

console.log('Checking for outdated packages...\n');

projects.forEach((project) => {
  if (fs.existsSync(path.join(project.path, 'package.json'))) {
    console.log(`\n${project.name}:`);
    console.log('-'.repeat(60));
    try {
      execSync('npm outdated', {
        cwd: project.path,
        stdio: 'inherit',
      });
    } catch (error) {
      // npm outdated exits with code 1 if packages are outdated
      // This is expected behavior
    }
  }
});
