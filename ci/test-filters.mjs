import { readFileSync, realpathSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const APPS = { backend: 'apps/backend', frontend: 'apps/frontend' };

/** jest --testPathIgnorePatterns는 정규식이다. 점을 이스케이프하고 끝을 앵커링한다. */
export function escapeJestPattern(relPath) {
  return `${relPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`;
}

export function toJestArgs(entries) {
  return entries.map((e) => `--testPathIgnorePatterns=${escapeJestPattern(e)}`);
}

/** vitest --exclude는 glob이다. 경로를 그대로 넘긴다. */
export function toVitestArgs(entries) {
  return entries.map((e) => `--exclude=${e}`);
}

export function collectEntries(known, app) {
  const section = known[app] ?? {};
  return Object.entries(section)
    .filter(([key]) => !key.startsWith('_'))
    .flatMap(([, list]) => list)
    .sort();
}

function main() {
  const [runner, app] = process.argv.slice(2);
  if (!['jest', 'vitest'].includes(runner) || !APPS[app]) {
    console.error('usage: node ci/test-filters.mjs <jest|vitest> <backend|frontend>');
    process.exit(2);
  }
  const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
  const known = JSON.parse(readFileSync(path.join(repoRoot, 'ci/known-failures.json'), 'utf8'));
  const entries = collectEntries(known, app);
  const args = runner === 'jest' ? toJestArgs(entries) : toVitestArgs(entries);
  process.stdout.write(args.join(' '));
}

// realpathSync로 비교한다. 심볼릭 링크가 낀 경로에서는 process.argv[1]과
// import.meta.url이 서로 다른 문자열이 되어, CLI가 조용히 아무것도 출력하지 않는다.
// (그러면 필터 인자가 빈 문자열이 되어 동결이 통째로 무력화된다 — CI는 그대로 red.)
const selfPath = realpathSync(fileURLToPath(import.meta.url));
if (process.argv[1] && realpathSync(process.argv[1]) === selfPath) {
  main();
}
