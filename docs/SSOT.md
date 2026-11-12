# SSOT — <PROJECT_NAME>

## Core Principles
- 이 파일 SSOT는 레포지토리 작업을 위한 문서의 최우선 원칙이자 시작점이다. 작업 시작 전 내부 점검에서 이 `Core Principles`를 지키겠다고 먼저 선언하고 확인한다. 상세 사고 과정은 노출하지 않는다.
- 비사소한 코드 변경은 `docs/tools/empirical-coding`의 Task Brief(목표·가드레일·종료조건·검증수단)로 시작하고, 검증 명령을 실제로 실행해 확인한 뒤에만 완료로 보고한다.
- 이 문서·영역 INDEX·스킬·훅에 행동 규칙을 추가하는 것은 같은 실수가 2회 이상 관찰됐을 때만 한 줄씩 한다. 모델 세대가 바뀌면 `prune-harness`로 걷어낸다.
- `Source Map`은 코드 작업을 위한 지도의 시작점이다. 반드시 직접 탐색보다, 지도를 통한 필요 작업 영역 `INDEX.md`의 Reference Map 탐색을 우선한다.
- <되돌리기 어려운 변경 1(예: DB migration/schema 변경)>은 반드시 작업자의 명시 허락을 받은 뒤에만 진행한다.
- 어떤 작업이든 먼저 <핵심 계층(예: backend)> 코드 변경 없이 해결 가능한 방법을 찾고, 변경이 필요하면 이유와 영향 범위를 설명한다. 오버엔지니어링을 피하고 기존 공용 구조와 확장 가능한 경로를 먼저 확인한다.
- <프로젝트 고유 도메인 규칙은 여기에 한 줄씩. 예: UI 컴포넌트 라이브러리 강제, 금지 패턴>

## 테스트 실행 규칙
- <동시 워크트리 수와 테스트 러너 제약을 적는다. 예: 항상 `npx vitest run --pool=threads --poolOptions.threads.maxThreads=2`, watch 모드 금지>

## Source Map
| 영역 | 코드 |
| --- | --- |
| <Area A> | `apps/<a>` |
| <Area B> | `apps/<b>` |
| 공유 규칙 | `package.json`, `pnpm-workspace.yaml`, `docs/share` |
| 작업 산출물 | `artifacts/*` |

## Working Protocol
1. 워크트리에서 시작한 세션이면 `pwd` 또는 `git rev-parse --show-toplevel`로 워크트리 루트를 먼저 확인하고, 이후 모든 파일 편집/실행은 그 경로 안에서 한다.
2. `SSOT.md`에서 영역을 고른다.
3. 영역 `INDEX.md`에서 소스 위치와 Reference Map을 확인한다.
4. 수정 전에 검증 루프(테스트·재현 스크립트·dev server 확인)를 먼저 세우고, 기능 변경은 entrypoint, controller/route, service/hook, schema/type 순서로 좁힌다.
5. 문서가 코드와 다르면 코드를 기준으로 문서를 갱신한다.

## Doc Rules
- 탐색 순서: `docs/SSOT.md` → `<MAIN_AREA>/INDEX.md` → 선택적 `<SUB_AREA>/INDEX.md` → topic `*.md`.
- 문서 깊이는 최대 3단계다: root SSOT, main `INDEX.md`/`ARCHITECTURE.md`, main topic 또는 sub `INDEX.md`, sub topic.
- `docs/**` 기준형 문서(`SSOT.md`, `INDEX.md`)는 60줄 이내, 자료형 topic 문서는 100줄 이내를 유지한다. topic이 100줄을 넘겨야 하면 새 main/sub 영역과 `INDEX.md`를 만들고 Reference Map에 연결한다.
- 기준형 문서에는 구현 코드, 장문 API 상세, 긴 조사 결과를 넣지 않는다.
- 긴 ticket/spec/plan/report는 `artifacts/`에 둔다. `artifacts/**` 산출물은 위 줄 수 제한 대상이 아니며 완결성과 검증 가능성을 우선한다.

## Artifact Rules
| 산출물 | 위치 | 파일명 |
| --- | --- | --- |
| Ticket / Issue | `artifacts/issues/` | `YYYY-MM-DD-<topic>-ticket.md` |
| Spec / Design | `artifacts/specs/` | `YYYY-MM-DD-<topic>-design.md` |
| Implementation Plan | `artifacts/plans/` | `YYYY-MM-DD-<topic>-plan.md` |
| Report / Analysis | `artifacts/reports/` | `YYYY-MM-DD-<topic>-report.md` |
| SQL Script | `artifacts/scripts/` | `YYYY-MM-DD-<topic>.sql` |
| Version Checklist | `artifacts/versions/` | `v<major>.<minor>.<patch>.md` |

## Reference Map
| 작업 범위 | 추가 참조 |
| --- | --- |
| Architecture | [ARCHITECTURE.md](./ARCHITECTURE.md) |
| <Area A> | [<a>/INDEX.md](./<a>/INDEX.md) |
| Cross-App / Workspace | [share/INDEX.md](./share/INDEX.md) |
| Workflow Tools | [tools/INDEX.md](./tools/INDEX.md) |
