const fs = require('fs');
const path = require('path');

const DOCS_DIR = path.join(__dirname, '../docs');
const OUT_FILE = path.join(__dirname, '../src/utils/searchIndex.js');

// baseUrl 설정 (GitHub Pages 배포용)
const BASE_URL = '/thinkingdata-docs';

function walk(dir) {
  let results = [];
  fs.readdirSync(dir).forEach(file => {
    const full = path.join(dir, file);
    if (fs.statSync(full).isDirectory()) {
      results = results.concat(walk(full));
    } else if (file.endsWith('.md')) {
      results.push(full);
    }
  });
  return results;
}

function extractMeta(mdPath) {
  const content = fs.readFileSync(mdPath, 'utf8');
  // 제목 추출: 첫 번째 # 또는 --- title: ...
  let title = '';
  const m1 = content.match(/^#\s+(.+)/m);
  if (m1) title = m1[1].trim();
  const m2 = content.match(/^title:\s*(.+)$/m);
  if (!title && m2) title = m2[1].trim();
  if (!title) title = path.basename(mdPath, '.md');
  // 본문 일부
  const body = content.replace(/---[\s\S]*?---/,'').replace(/^#.+/m,'').trim();
  return {
    title,
    content: body.slice(0, 200).replace(/\n+/g, ' '),
  };
}

function mdPathToRoute(mdPath) {
  const rel = path.relative(DOCS_DIR, mdPath).replace(/\\/g, '/');
  const noExt = rel.replace(/\.md$/, '');
  // baseUrl 포함하여 경로 생성
  return BASE_URL + '/docs/' + noExt;
}

const mdFiles = walk(DOCS_DIR);
const docsIndex = mdFiles.map(mdPath => {
  const meta = extractMeta(mdPath);
  return {
    title: meta.title,
    path: mdPathToRoute(mdPath),
    content: meta.content
  };
});

const out = `// 자동 생성 파일. 직접 수정하지 마세요.\nexport const docsIndex = ${JSON.stringify(docsIndex, null, 2)};\n`;
fs.writeFileSync(OUT_FILE, out);
console.log(`Generated search index: ${OUT_FILE} (${docsIndex.length} docs)`); 