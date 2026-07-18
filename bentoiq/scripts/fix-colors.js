const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.resolve(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else {
      if (file.endsWith('.tsx') || file.endsWith('.ts')) {
        results.push(file);
      }
    }
  });
  return results;
}

const files = walk('./src');

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  
  // Replace text-white variations with theme variables
  content = content.replace(/text-white\/[1-4]0/g, 'text-[var(--text-secondary)] opacity-70');
  content = content.replace(/text-white\/[5-7]0/g, 'text-[var(--text-secondary)]');
  content = content.replace(/text-white\/[8-9][0-5]?/g, 'text-[var(--text-primary)]');
  content = content.replace(/text-white\b/g, 'text-[var(--text-primary)]');
  
  // Also replace some dark backgrounds that might still be hardcoded
  content = content.replace(/bg-white\/0\.[0-9]+/g, 'bg-gray-100');
  content = content.replace(/border-white\/0\.[0-9]+/g, 'border-[var(--border-subtle)]');

  fs.writeFileSync(file, content);
});

console.log('Mass replacement complete!');
