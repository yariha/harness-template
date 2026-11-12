// 템플릿 폴더를 부트스트랩 배포본(dist/)으로 묶는다. 컨텍스트 절약을 위해 3분할한다:
//   dist/CLAUDE.md                        — 매 턴 로드되는 진입점. 몇 줄뿐 (bootstrap/ENTRY.md)
//   dist/.harness-bootstrap/BOOTSTRAP.md  — 설치 절차. 에이전트가 한 번 Read (bootstrap/BOOTSTRAP.md)
//   dist/.harness-bootstrap/kit.txt       — 키트 번들. 에이전트는 읽지 않고 스크립트로 푼다
// 사용: node bootstrap/pack.mjs. 템플릿을 고친 뒤에는 항상 다시 실행한다. dist/는 생성물이다.
import { readFileSync, writeFileSync, readdirSync, statSync, mkdirSync, rmSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
// 사람용 문서·생성 도구·진입점(부트스트랩 6단계에서 생성)은 내장하지 않는다.
const EXCLUDE = new Set(['README.md', 'HANDOVER.md', 'CLAUDE.md', 'AGENTS.md', 'bootstrap', 'dist', '.git', '.DS_Store', 'node_modules']);
const OPEN = (rel) => `~~~~~file path=${rel}`;
const CLOSE = '~~~~~';

function walk(dir, out = []) {
  for (const name of readdirSync(dir).sort()) {
    if (dir === ROOT && EXCLUDE.has(name)) continue;
    if (name === '.DS_Store' || name === 'node_modules') continue;
    const abs = path.join(dir, name);
    if (statSync(abs).isDirectory()) walk(abs, out);
    else out.push(path.relative(ROOT, abs).split(path.sep).join('/'));
  }
  return out;
}

const files = walk(ROOT);
const blocks = files.map((rel) => {
  if (/\s/.test(rel)) throw new Error(`공백이 있는 경로는 지원하지 않는다: ${rel}`);
  const body = readFileSync(path.join(ROOT, rel), 'utf8').replace(/\n$/, '');
  for (const line of body.split('\n')) {
    if (line === CLOSE || line.startsWith('~~~~~file path=')) throw new Error(`구분자와 충돌하는 줄: ${rel}`);
  }
  return body === '' ? `${OPEN(rel)}\n${CLOSE}` : `${OPEN(rel)}\n${body}\n${CLOSE}`;
});

const fill = (name) => readFileSync(path.join(ROOT, 'bootstrap', name), 'utf8')
  .replaceAll('{{GENERATED_AT}}', new Date().toISOString().slice(0, 10))
  .replaceAll('{{FILE_COUNT}}', String(files.length));

const DIST = path.join(ROOT, 'dist');
rmSync(DIST, { recursive: true, force: true });
mkdirSync(path.join(DIST, '.harness-bootstrap'), { recursive: true });
const out = {
  'CLAUDE.md': fill('ENTRY.md'),
  '.harness-bootstrap/BOOTSTRAP.md': fill('BOOTSTRAP.md'),
  '.harness-bootstrap/kit.txt': `${blocks.join('\n\n')}\n`,
};
for (const [rel, body] of Object.entries(out)) {
  writeFileSync(path.join(DIST, rel), body.endsWith('\n') ? body : `${body}\n`);
  console.log(`dist/${rel}  ${Buffer.byteLength(body)} bytes`);
}
console.log(`packed ${files.length} files`);
for (const f of files) console.log(`  ${f}`);
