# Harness Template Kit

실사용 모노레포에서 다듬은 에이전트 하네스(문서 지도 + 워크플로우 스킬 + 도구 등록 + CI 게이트)를 새 프로젝트에 옮기기 위한 복사용 골격이다.
배경·설계 의도·도입 절차는 [HANDOVER.md](./HANDOVER.md)를 먼저 읽는다.

## 폴더 구성

| 경로 | 성격 | 새 프로젝트에서 할 일 |
| --- | --- | --- |
| `CLAUDE.md`, `AGENTS.md` | 그대로 복사 | 없음. 두 파일 모두 `docs/SSOT.md` 한 줄로 위임한다 |
| `docs/SSOT.md` | 템플릿 | `<...>` 자리를 채운다. 60줄 이내 유지 |
| `docs/ARCHITECTURE.md` | 템플릿 | 앱 경계·핵심 흐름을 한 줄씩 채운다 |
| `docs/_area_template/INDEX.md` | 템플릿 | 앱마다 `docs/<area>/INDEX.md`로 복사해 채운 뒤 `_area_template`은 삭제 |
| `docs/share/INDEX.md` | 템플릿 | 앱을 가로지르는 계약 topic이 생길 때마다 Reference Map에 추가 |
| `docs/tools/INDEX.md` | 템플릿 | 스킬을 추가·삭제할 때 표를 맞춘다 |
| `docs/tools/maintain-highway/` | 그대로 복사 | `RESEARCH.md`는 빈 장부로 시작한다 |
| `docs/tools/clarify-pre-spec/` | 그대로 복사 | 템플릿 문구의 도메인 예시만 손본다 |
| `docs/tools/close-worktree/` | 부분 복사 | 사용자 가이드가 있는 제품이면 원본의 `guide-impact.md`·`guide-update-quality.md`도 가져온다 |
| `docs/tools/open-worktree/SKILL.md` | 골격 | env 파일 경로·환경 선택지 문안을 프로젝트에 맞게 고정한다 |
| `docs/tools/empirical-coding/` | 그대로 복사 | 작업 방법론(Boris Cherny). Task Brief·검증 우선·규칙 추가 기준·유지보수 루틴 |
| `docs/tools/prune-harness/` | 그대로 복사 | 모델 세대 교체 시 규칙 층 ablation. `CHALLENGES.md`는 빈 장부로 시작 |
| `.claude/skills/<name>/SKILL.md` | 예시 1개 | 슬래시 명령으로 노출할 스킬마다 같은 모양의 2줄 shim을 만든다 |
| `.claude/agents/code-generator.md` | 그대로 복사 | 모델(`claude-opus-5-5`, effort `low`)과 pre-generation 절차는 유지, 영역 이름만 확인 |
| `.claude/launch.json` | 템플릿 | 앱별 dev server 이름·포트. 데스크톱 앱 preview가 읽는다 |
| `ci/` | 부분 수정 | `test-filters.mjs`의 `APPS` 상수와 `known-failures.json`의 앱 키를 맞춘다 |
| `artifacts/*/.gitkeep` | 그대로 복사 | 산출물 폴더 6종 |
| `bootstrap/ENTRY.md`, `bootstrap/BOOTSTRAP.md`, `bootstrap/pack.mjs` | 키트 관리용 (복사 안 함) | 임시 진입점·설치 절차 원문과, 키트를 `dist/`로 묶는 스크립트 |
| `dist/` | 생성물 | 새 프로젝트에 이 폴더 내용을 통째로 넣는다 |

## 가장 쉬운 사용법 — 부트스트랩 배포본 (권장)

```bash
cp -R /path/to/harness-template/dist/. /path/to/new-project/
```

그 폴더에서 Claude Code를 열고 "시작"이라고 말한다. 에이전트가 코드를 살펴보고, 코드로 알 수 없는 것(이름·목적·허락 필수 변경 등)만 묻고, 키트를 풀어 프로젝트에 맞게 채우고 검증한 뒤, `CLAUDE.md`를 `@docs/SSOT.md` 한 줄로 바꾸고 `.harness-bootstrap/`을 지운다. 결과는 `artifacts/reports/<날짜>-harness-bootstrap-report.md`에 남는다.

배포본은 하네스와 같은 원칙(진입점은 얇게, 본문은 필요할 때만)으로 3분할되어 있다.

| 파일 | 크기 | 컨텍스트 |
| --- | --- | --- |
| `CLAUDE.md` | 6줄 | 매 턴 로드. 절차 파일만 가리킨다 |
| `.harness-bootstrap/BOOTSTRAP.md` | 약 150줄 | 설치 때 한 번 Read |
| `.harness-bootstrap/kit.txt` | 키트 36개 파일 번들 | 읽지 않는다. unpack 스크립트가 직접 푼다 |

- 대상에 이미 `CLAUDE.md`가 있으면 `.harness-bootstrap/`만 복사하고 "`.harness-bootstrap/BOOTSTRAP.md` 따라 하네스 설치해줘"라고 말한다.
- Codex를 쓰면 `CLAUDE.md`를 `AGENTS.md`로 바꿔 넣는다.

**키트를 고쳤다면 반드시 다시 묶는다.** `dist/`는 생성물이라 직접 고치지 않는다. 절차는 [`bootstrap/BOOTSTRAP.md`](./bootstrap/BOOTSTRAP.md)에서 고친다.

```bash
node bootstrap/pack.mjs
```

## 복사 명령 예시 (수동 이식)

```bash
rsync -av --exclude README.md --exclude HANDOVER.md artifacts/reference/harness-template/ /path/to/new-project/
```

복사 뒤 `grep -rn '<' docs/SSOT.md docs/ARCHITECTURE.md docs/_area_template` 으로 남은 자리표시자를 찾는다.

## 원본에만 있고 키트에서 뺀 것

도메인 종속이라 뺐다. 필요하면 원본 `docs/tools/`에서 가져와 고친다.

- `security-check`(semgrep 룰·수용 목록·migration lint 게이트) — 보안 점검 루틴이 필요하면 구조만 참고
- `contract-review`(계약 조항 vs 코드) — 지식 베이스 `artifacts/reference/contracts`와 쌍
- `create-back-fill-query`, `migrate-external-crm`, `control-notice-crm-dashboard`, `update-version-status`, `meeting-transcript`
