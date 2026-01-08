#!/usr/bin/env node
/**
 * Security audit across all projects
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const projects = [
  { name: 'Root', path: process.cwd() },
  { name: 'Backend', path: path.join(process.cwd(), 'backend') },
  { name: 'Frontend Web', path: path.join(process.cwd(), 'frontend', 'web') },
];

console.log('Running security audit...\n');

projects.forEach((project) => {
  if (fs.existsSync(path.join(project.path, 'package.json'))) {
    console.log(`\n${project.name}:`);
    console.log('-'.repeat(60));
    try {
      execSync('npm audit', {
        cwd: project.path,
        stdio: 'inherit',
      });
    } catch (error) {
      // npm audit exits with code 1 if vulnerabilities found
      // This is expected behavior
    }
  }
});
