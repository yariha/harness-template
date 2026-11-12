# 하네스 구조 핸드오버 — 신규 프로젝트 이식 가이드

- 작성일: 2026-10-16
- 대상: 실사용 모노레포에서 다듬은 에이전트 하네스를 새 레포에 세우려는 사람(개발자·PM)
- 복사용 골격: 이 폴더([README.md](./README.md)). `artifacts/reports/`는 gitignore 대상이라 핸드오버 문서는 키트와 함께 여기 둔다.
- 원본 기준: `docs/SSOT.md`, `docs/tools/`, `.claude/`, `ci/` (2026-10-16 main 기준)

## 1. 한 문단 요약

이 하네스는 "에이전트가 적은 컨텍스트로 올바른 파일에 도달하고, 정해진 절차로 일하며, 위반은 기계가 막는다"를 목표로 한다. 구성은 네 층이다. (1) 루트의 한 줄짜리 진입 파일, (2) `docs/`의 3단 문서 지도, (3) `docs/tools/`의 사람이 소유하는 워크플로우 스킬과 `.claude/`의 얇은 등록 어댑터, (4) SSOT 원칙과 CI 게이트. 새 프로젝트는 이 네 층을 같은 순서로 세우면 된다.

## 2. 설계 원칙 (왜 이렇게 생겼나)

| 원칙 | 구현 | 어기면 생기는 일 |
| --- | --- | --- |
| 지식은 한 곳에 | `CLAUDE.md`·`AGENTS.md`가 `@docs/SSOT.md` 한 줄 | 도구별 규칙 복사본이 서로 어긋난다 |
| 문서는 지도, 백과사전 아님 | 기준형 60줄·자료형 100줄 상한, 깊이 3단 | 에이전트가 문서 읽다 컨텍스트를 소진한다 |
| 코드가 기준 | 문서≠코드면 코드 기준으로 문서 갱신, `maintain-highway`가 상시 보수 | 낡은 문서가 없는 문서보다 해롭다 |
| 긴 것은 artifacts로 | ticket/spec/plan/report/script/version 6종 폴더, 날짜 접두 파일명 | docs가 비대해지고 지도 기능을 잃는다 |
| 절차는 사람이 소유 | `docs/tools/**`는 명시 요청 없이 에이전트가 수정 금지 | 에이전트가 자기 절차를 느슨하게 고친다 |
| 되돌리기 어려운 변경은 허락 필수 | SSOT Core Principles(schema/migration 등) | 자율 실행된 migration이 운영을 깨뜨린다 |
| 위반은 기계가 막는다 | CI 동결 목록, migration lint 게이트 | 규칙이 문서에만 있으면 지켜지지 않는다 |

## 3. 층별 구조와 이식 방법

### 3.1 진입점

- `CLAUDE.md`(Claude Code)와 `AGENTS.md`(Codex 등)는 내용이 `@docs/SSOT.md` 위임 한 줄이다.
- 이식: 키트의 두 파일을 그대로 복사한다. 도구가 늘어도 같은 한 줄만 추가한다.

### 3.2 문서 지도 `docs/`

| 단계 | 파일 | 담는 것 | 상한 |
| --- | --- | --- | --- |
| 1 | `docs/SSOT.md` | Core Principles, 테스트 규칙, Source Map(영역→코드 경로), Working Protocol, Doc/Artifact Rules, Reference Map | 60줄 |
| 2 | `docs/<영역>/INDEX.md`, `docs/ARCHITECTURE.md` | 실행 명령, 필수 env, 소스 맵(폴더→책임), Reference Map | 60줄 |
| 3 | `docs/<영역>/<TOPIC>.md`, `docs/<영역>/<sub>/INDEX.md` | 도메인 지식: entrypoint, 데이터 흐름, 제약, 함정 | 100줄 |

- `docs/share/`는 앱을 가로지르는 계약(인증, 실시간, 결제 등)을 둔다. 공유 패키지가 없는 모노레포에서는 이 문서가 곧 공통 계약이다.
- 모든 topic 문서는 상위 INDEX의 Reference Map에서 발견 가능해야 한다. 고아 문서는 없는 문서와 같다.
- 이식 순서: SSOT 템플릿 채우기 → 앱마다 `_area_template/INDEX.md` 복사 → ARCHITECTURE 한 줄씩 → share/INDEX는 topic이 생길 때 추가. 처음부터 topic 문서를 많이 쓰지 않는다. `maintain-highway`가 커밋을 따라가며 채운다.

### 3.3 워크플로우 스킬 `docs/tools/` + 어댑터 `.claude/`

스킬은 두 겹이다. 본체는 `docs/tools/<이름>/SKILL.md`(보조 파일·템플릿·스크립트 동봉), 등록은 `.claude/skills/<이름>/SKILL.md`에 "본체를 읽고 따르라" 2줄 shim. 본체를 docs에 두는 이유는 도구 비종속성과 "사람이 소유"를 지키기 위해서다.

이식 1순위(도메인 무관, 키트에 포함):

| 스킬 | 역할 | 호출 시점 |
| --- | --- | --- |
| `maintain-highway` | docs를 지도로 유지. narrow(랜덤 1범위)/wide(전체 구조)/selected-target(특정 변경) 3모드, `RESEARCH.md` 장부 | 커밋 뒤, 워크트리 닫을 때 |
| `clarify-pre-spec` | 모호한 요구를 비개발자도 읽는 티켓/티켓셋으로 | 개발 착수 전 |
| `open-worktree` | 격리 워크트리에서만 실행, env 복사·설치·DB 초기화 분기 | 워크트리 생성 직후 |
| `close-worktree` | maintain-highway(selected) + report 작성 + 산출물 정리를 서브에이전트 병렬로 | PR 전 |

작업 방법론(도메인 무관, 키트에 포함, 2026-11-05 추가):

| 스킬 | 역할 | 호출 시점 |
| --- | --- | --- |
| `empirical-coding` | Task Brief 4요소(목표·가드레일·종료조건·검증수단), 검증 우선 루프, 규칙 추가 기준(2회 반복 시만), 유지보수 루틴 | 모든 비사소한 코드 변경 시작·위임·마무리 |
| `prune-harness` | 규칙 층을 걷어내고 반복 실패만 복원(ablation), `CHALLENGES.md`로 이전 모델 실패 과제 재시도 | 새 모델 출시, 6개월 주기 |

자세한 설계 의도는 8절.

이식 2순위(도메인 종속, 원본 참조): `security-check`, `contract-review`, `update-version-status`, `create-back-fill-query`, `control-notice-*`, `meeting-transcript`, `migrate-external-crm`. 구조(점검 루틴 + 수용 목록 파일 + 리포트 템플릿)만 참고해 프로젝트에 맞는 것을 만든다.

`.claude/`의 나머지:

- `agents/code-generator.md`: 코드 생성 전용 서브에이전트. SSOT→INDEX→이웃 파일 2~4개 읽기를 강제한다. 그대로 복사.
- `launch.json`: 앱별 dev server 이름·포트. 데스크톱 앱 preview가 읽는다.
- 전역 설정은 superpowers·context7 플러그인만 켜져 있고 훅은 없다. 훅 없이도 돌아가는 구조가 의도다.

### 3.4 가드레일: 원칙과 CI

- SSOT Core Principles는 하드 룰이다. 새 프로젝트는 최소 3개를 정한다: 허락 필수 변경(예: schema), 변경 전 비변경 해법 우선 계층, 테스트 동시성 제한.
- CI 동결 목록: `ci/known-failures.json`에 도입 시점 기존 실패를 적고, `test-filters.mjs`가 jest/vitest 제외 인자로 변환한다. 목록 자체도 `node --test ci/test-filters.test.mjs`로 검증한다. 신규 실패만 막는 장치라 레거시가 있는 프로젝트에 특히 유효하다.
- 원본의 CI는 PR 자동 실행이 아니라 배포 워크플로우가 호출하거나 수동 실행한다. 새 프로젝트는 PR 트리거로 시작하는 쪽이 보통 낫다.
- 배포 전 lint 게이트(원본은 migration RLS/REVOKE 누락 차단)는 프로젝트의 "되돌리기 어려운 변경"에 맞춰 하나 만든다.

## 4. 도입 체크리스트 (순서대로)

1. 키트를 새 레포 루트에 복사한다 (`README.md`의 rsync 예시, `HANDOVER.md`·`README.md`는 제외).
2. `docs/SSOT.md`의 `<...>`를 채운다. Source Map은 실제 `apps/*`와 1:1로 맞춘다.
3. 앱마다 `docs/<area>/INDEX.md`를 만들고 실행 명령·env·소스 맵을 코드 보고 적는다. `_area_template`은 삭제.
4. `docs/ARCHITECTURE.md`와 `docs/share/INDEX.md`를 채운다. topic 문서는 아직 쓰지 않는다.
5. `.claude/launch.json`과 `ci/test-filters.mjs`의 `APPS`, `known-failures.json` 키를 앱 이름에 맞춘다.
6. 노출할 스킬마다 `.claude/skills/<name>/SKILL.md` shim을 만든다 (키트의 maintain-highway shim 복제).
7. 에이전트에게 "WIDE 모드로 maintain-highway 실행"을 시켜 첫 지도를 채우고 `RESEARCH.md` Coverage Ledger를 만든다.
8. 자리표시자 잔존 확인: `grep -rn '<' docs/SSOT.md docs/*/INDEX.md`.
9. 줄 수 확인: `wc -l docs/SSOT.md docs/*/INDEX.md` 가 60 이하.
10. 첫 기능 작업을 `open-worktree → (empirical-coding Task Brief) → 개발 → close-worktree` 순서로 한 번 돌려 절차가 실제로 굴러가는지 본다. 영역 INDEX의 Commands가 검증 수단으로 실제 실행되는지 이때 확인한다.

## 5. 운영 중 지키는 습관

- 문서와 코드가 다르면 그 자리에서 문서를 고친다. 나중에 몰아서 하지 않는다.
- topic 문서가 100줄에 닿으면 sub-area를 열고 INDEX에 연결한다. 줄 수 초과를 방치하면 지도가 백과사전이 된다.
- `RESEARCH.md`는 20행 넘기기 전에 접는다. 장부가 길어지면 에이전트가 읽지 않는다.
- 동결 목록에 항목을 추가할 때는 리뷰에서 근거를 요구한다. 추가가 쉬우면 게이트가 무력화된다.
- 에이전트 메모리(`~/.claude/projects/**/memory`)에는 "코드로 알 수 없는 것"만 둔다. 레포가 이미 말하는 것은 docs로.

## 6. 원본에서 배운 함정

| 함정 | 증상 | 예방 |
| --- | --- | --- |
| 워크트리 경로 혼동 | 편집이 dev server·git에 반영 안 됨 | Working Protocol 1번(`git rev-parse --show-toplevel` 선확인)을 SSOT 맨 앞에 |
| 기준형 문서에 구현 상세 | INDEX가 100줄 넘고 지도 기능 상실 | 줄 수 상한 + maintain-highway 종료 점검 |
| 스킬 본체를 `.claude/`에 직접 작성 | Codex 등 다른 도구에서 보이지 않음, 에이전트가 자기 절차 수정 | 본체는 `docs/tools`, `.claude`는 shim만 |
| 테스트 병렬 과다 | 워크트리 3개 동시 운용 시 세션 끊김 | SSOT 테스트 규칙에 스레드 수 명시 |
| 규칙이 문서에만 존재 | 반복 위반 | CI 게이트 하나라도 먼저 세움 |

## 7. 파일 인벤토리 (원본 → 키트)

| 원본 | 키트 | 처리 |
| --- | --- | --- |
| `CLAUDE.md`, `AGENTS.md` | 동일 | 그대로 |
| `docs/SSOT.md` | `docs/SSOT.md` | 도메인 원칙 제거, 자리표시자화 |
| `docs/ARCHITECTURE.md`, `docs/share/INDEX.md`, `docs/<area>/INDEX.md` | 템플릿 3종 | 구조만 |
| `docs/tools/INDEX.md` | 동일 | 이식 1순위 4종만 표에 남김 |
| `docs/tools/maintain-highway/*` | 동일 | `RESEARCH.md` 비움, 원본 도메인 표현 일반화 |
| `docs/tools/clarify-pre-spec/*` | 동일 | 그대로 |
| `docs/tools/close-worktree/*` | SKILL·writing-report·clean-artifacts | guide-impact 2종은 선택 모듈로 표기 |
| `docs/tools/open-worktree/SKILL.md` | 골격 | 환경 선택지·env 경로를 자리표시자로 |
| `.claude/agents/code-generator.md` | 동일 | 영역 예시 일반화 |
| `.claude/skills/*/SKILL.md` | maintain-highway shim 1개 | 패턴 예시 |
| `.claude/launch.json` | 템플릿 | 포트 2개 예시 |
| `ci/test-filters.*` | 동일 | `APPS` 상수는 수정 필요 |
| `ci/known-failures.json` | 빈 골격 | 앱 키 수정 필요 |

## 8. 작업 방법론 층 — Boris Cherny 방식 (2026-11-05 추가)

출처: YC 대담 "We Cut 80% of Claude Code's Prompt"(2026-07). 하네스 네 층이 "어디서·어떤 절차로" 일할지를 정한다면, 이 층은 "어떻게 일을 맡기고 끝났다고 판단할지"를 정한다.

| 원칙 | 하네스 안 구현 | 겹치는 기존 장치 |
| --- | --- | --- |
| 방법이 아니라 목표로 맡긴다 | Task Brief 4요소 (`empirical-coding` 1절) | pre-spec `Intent`·`Non-Goals`·`Acceptance Criteria` |
| 검증이 가장 중요하다 | 수정 전 검증 루프, 실행 결과 보고 (SSOT Core Principles·Working Protocol 4) | close-worktree report `Verification` |
| 과설계하지 않는다 | `empirical-coding` 3절 | SSOT "변경 없이 해결 가능한 방법 우선" |
| 규칙은 반복 실패 시에만 | 2회 이상 관찰 시 한 줄 (SSOT Core Principles) | report `Repeat Prevention` |
| 새 모델마다 걷어낸다 | `prune-harness` | — |
| 반복 일은 루틴으로 | `empirical-coding/routines.md` (`/loop`, `/schedule`) | `maintain-highway` narrow 모드 |

두 원칙이 부딪칠 때의 해석:

- **지도 vs 규칙**: SSOT·INDEX의 Source Map·Commands·env 같은 *사실*은 `maintain-highway`가 유지하고 prune 대상이 아니다. prune 대상은 모델 *행동을 교정하는 문장*뿐이다.
- **안전 규칙은 걷어내지 않는다**: 허락 필수 변경, 테스트 동시성, CI 동결 목록은 모델이 좋아져도 유지한다.
- **"상세 단계 지시 금지" vs 사람 소유 절차**: `docs/tools/**` 워크플로우는 팀 합의 절차라 따르고, 그 안의 개별 코드 작업은 결과 기준으로 맡긴다.
