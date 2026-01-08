#!/usr/bin/env node
/**
 * Run Knip to find unused code across all projects
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const projects = [
  { name: 'Backend', path: path.join(process.cwd(), 'backend') },
  { name: 'Frontend Web', path: path.join(process.cwd(), 'frontend', 'web') },
];

console.log('Running Knip to find unused code...\n');

projects.forEach((project) => {
  if (fs.existsSync(path.join(project.path, 'package.json'))) {
    const packageJson = JSON.parse(
      fs.readFileSync(path.join(project.path, 'package.json'), 'utf8')
    );

    if (packageJson.scripts && packageJson.scripts.check) {
      console.log(`\n${project.name}:`);
      console.log('-'.repeat(60));
      try {
        execSync('npm run check', {
          cwd: project.path,
          stdio: 'inherit',
        });
      } catch (error) {
        // Knip exits with code 1 if unused code found
        // This is expected behavior
      }
    }
  }
});
