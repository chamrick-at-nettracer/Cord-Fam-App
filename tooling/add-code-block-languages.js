#!/usr/bin/env node
/**
 * Auto-adds language identifiers to fenced code blocks (MD040 fix)
 * Infers language from code content
 */

const fs = require('fs');

function inferLanguage(code) {
  const codeLower = code.toLowerCase().trim();

  // SQL patterns
  if (
    codeLower.match(
      /\b(select|insert|update|delete|create|alter|drop|table|database|from|where|join)\b/i
    )
  ) {
    return 'sql';
  }

  // JavaScript/TypeScript patterns
  if (codeLower.match(/\b(function|const|let|var|import|export|require|=>|\.tsx?|\.jsx?)\b/)) {
    if (
      codeLower.includes('tsx') ||
      codeLower.includes('.tsx') ||
      codeLower.includes('typescript')
    ) {
      return 'typescript';
    }
    if (codeLower.includes('jsx') || codeLower.includes('.jsx')) {
      return 'jsx';
    }
    return 'javascript';
  }

  // JSON patterns
  if (codeLower.match(/^\s*[{[]/) && codeLower.match(/[}\]]\s*$/)) {
    return 'json';
  }

  // YAML patterns
  if (codeLower.match(/^(\s*[\w-]+:\s*|\s*-\s*)/m)) {
    return 'yaml';
  }

  // Shell/Bash patterns
  if (codeLower.match(/^\s*(#!\/bin\/(bash|sh)|sudo|npm|git|cd |mkdir|echo|export)/m)) {
    return 'bash';
  }

  // HTTP/URL patterns
  if (
    codeLower.match(/^(GET|POST|PUT|DELETE|PATCH|HEAD|OPTIONS)\s+/m) ||
    codeLower.match(/^https?:\/\//m) ||
    codeLower.match(/^Authorization:/m)
  ) {
    return 'http';
  }

  // Directory tree patterns
  if (codeLower.match(/^[├└│─\s]+\w+/m) || codeLower.match(/^[\w/-]+\/(\n|$)/m)) {
    return 'text';
  }

  // Default to text for unknown
  return 'text';
}

function fixCodeBlocks(content) {
  // Match code blocks without language: ```\n...\n```
  const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;

  return content.replace(codeBlockRegex, (match, lang, code) => {
    // If language already exists, don't change it
    if (lang) {
      return match;
    }

    // Infer language from code content
    const inferredLang = inferLanguage(code);
    return `\`\`\`${inferredLang}\n${code}\`\`\``;
  });
}

function processFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const fixed = fixCodeBlocks(content);

    if (content !== fixed) {
      fs.writeFileSync(filePath, fixed, 'utf8');
      console.log(`Fixed: ${filePath}`);
      return true;
    }
    return false;
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
    return false;
  }
}

// Get files from command line args or process all staged markdown files
const files = process.argv.slice(2);

if (files.length === 0) {
  console.error('Usage: node add-code-block-languages.js <file1> [file2] ...');
  process.exit(1);
}

let fixedCount = 0;
files.forEach((file) => {
  if (fs.existsSync(file) && file.endsWith('.md')) {
    if (processFile(file)) {
      fixedCount++;
    }
  }
});

if (fixedCount > 0) {
  console.log(`\n✅ Fixed ${fixedCount} file(s)`);
}
