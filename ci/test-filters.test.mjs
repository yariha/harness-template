import { test } from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  escapeJestPattern,
  toJestArgs,
  toVitestArgs,
  collectEntries,
} from './test-filters.mjs';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const known = JSON.parse(readFileSync(path.join(repoRoot, 'ci/known-failures.json'), 'utf8'));

test('escapeJestPattern은 점을 이스케이프하고 끝을 앵커링한다', () => {
  assert.equal(
    escapeJestPattern('src/api/user/user.service.spec.ts'),
    'src/api/user/user\\.service\\.spec\\.ts$',
  );
});

test('앵커링이 부분 일치 과다 제외를 막는다', () => {
  const pattern = new RegExp(escapeJestPattern('src/api/user/user.service.spec.ts'));
  assert.ok(pattern.test('/repo/apps/backend/src/api/user/user.service.spec.ts'));
  assert.ok(!pattern.test('/repo/apps/backend/src/api/user/user.service.spec.ts.bak'));
});

test('이스케이프하지 않은 점은 와일드카드로 과다 매칭된다 (회귀 방어)', () => {
  const naive = new RegExp('src/api/user/user.service.spec.ts$');
  assert.ok(naive.test('/repo/src/api/user/userXserviceXspecXts'));
});

test('toJestArgs는 항목마다 반복 플래그를 만든다', () => {
  assert.deepEqual(toJestArgs(['src/a.spec.ts', 'src/b.spec.ts']), [
    '--testPathIgnorePatterns=src/a\\.spec\\.ts$',
    '--testPathIgnorePatterns=src/b\\.spec\\.ts$',
  ]);
});

test('toVitestArgs는 glob이므로 경로를 그대로 쓴다', () => {
  assert.deepEqual(toVitestArgs(['src/a.test.ts']), ['--exclude=src/a.test.ts']);
});

test('collectEntries는 모든 분류를 합쳐 정렬해 돌려준다', () => {
  const entries = collectEntries(
    { backend: { drift: ['src/b.spec.ts'], harness: ['src/a.spec.ts'] } },
    'backend',
  );
  assert.deepEqual(entries, ['src/a.spec.ts', 'src/b.spec.ts']);
});

test('known-failures.json의 backend 항목이 전부 실재한다', () => {
  for (const rel of collectEntries(known, 'backend')) {
    const full = path.join(repoRoot, 'apps/backend', rel);
    assert.ok(existsSync(full), `없는 항목: ${rel}`);
  }
});

test('known-failures.json의 frontend 항목이 전부 실재한다', () => {
  for (const rel of collectEntries(known, 'frontend')) {
    const full = path.join(repoRoot, 'apps/frontend', rel);
    assert.ok(existsSync(full), `없는 항목: ${rel}`);
  }
});

// 새 프로젝트: 동결 목록을 실측한 뒤 아래 상수를 실제 개수로 고정한다. 그래야 목록이 조용히 비는 것을 잡는다.
const EXPECTED_BACKEND = collectEntries(known, 'backend').length;
const EXPECTED_FRONTEND = collectEntries(known, 'frontend').length;

test('동결 개수가 스펙 실측치와 일치한다', () => {
  assert.equal(collectEntries(known, 'backend').length, EXPECTED_BACKEND);
  assert.equal(collectEntries(known, 'frontend').length, EXPECTED_FRONTEND);
});

// CLI가 조용히 빈 문자열을 뱉으면 필터 인자가 사라져 동결이 통째로 무력화된다.
// 워크플로는 그걸 감지하지 못하고 CI만 red가 된다. 그래서 실행 경로를 직접 테스트한다.
test('CLI가 jest 인자를 실제로 출력한다', () => {
  const out = execFileSync(process.execPath, [
    path.join(repoRoot, 'ci/test-filters.mjs'), 'jest', 'backend',
  ]).toString();
  if (EXPECTED_BACKEND === 0) return;
  assert.match(out, /^--testPathIgnorePatterns=/);
  assert.equal(out.split(' ').length, EXPECTED_BACKEND);
});

test('CLI가 vitest 인자를 실제로 출력한다', () => {
  const out = execFileSync(process.execPath, [
    path.join(repoRoot, 'ci/test-filters.mjs'), 'vitest', 'frontend',
  ]).toString();
  if (EXPECTED_FRONTEND === 0) return;
  assert.match(out, /^--exclude=/);
  assert.equal(out.split(' ').length, EXPECTED_FRONTEND);
});

test('잘못된 인자는 종료 코드 2로 끝난다', () => {
  assert.throws(
    () => execFileSync(process.execPath, [
      path.join(repoRoot, 'ci/test-filters.mjs'), 'mocha', 'backend',
    ], { stdio: 'pipe' }),
    (err) => err.status === 2,
  );
});
