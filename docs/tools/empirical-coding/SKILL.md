---
name: empirical-coding
description: Use when starting, scoping, delegating or finishing any non-trivial code change (feature, refactor, migration, rewrite) — sets the task brief (목표·가드레일·종료조건·검증수단), verification-first loop, and the rule for when to add harness rules
---

# Empirical Coding

Boris Cherny(Claude Code 창시자)의 작업 방식을 이 하네스에 맞춘 절차다. 출처: YC 대담 "We Cut 80% of Claude Code's Prompt"(2026-07).
한 줄 요약: **조금 어려운 과제를 결과 기준으로 맡기고, 스스로 검증할 수단을 먼저 세우고, 반복해서 막힌 곳만 하네스에 반영한다.**

## 1. Task Brief — 작업 시작 시 4요소

코드를 고치기 전에 아래 4가지를 확정한다. `docs/SSOT.md` → 영역 `INDEX.md`로 코드에서 추론할 수 있는 것은 직접 확인하고, 추론할 수 없는 것만 사용자에게 묻는다.

| 요소 | 내용 | 하네스 연결 |
| --- | --- | --- |
| 목표 | 무엇이 참이 되어야 하는가 (결과 중심 1~2문장) | pre-spec이 있으면 `Intent`·`Scope` |
| 가드레일 | 건드리면 안 되는 것 | SSOT Core Principles(허락 필수 변경), `Non-Goals` |
| 종료 조건 | "끝났다"를 판정하는 관찰 가능한 기준 | pre-spec `Acceptance Criteria` |
| 검증 수단 | 종료 조건을 에이전트가 직접 확인하는 방법 | 영역 `INDEX.md`의 Commands, `.claude/launch.json` |

- 큰 작업은 4요소를 `artifacts/plans/YYYY-MM-DD-<topic>-plan.md` 맨 위에 적는다. 작은 작업은 대화 안에서 한 줄씩이면 충분하다.
- 1→2→3식 마이크로 단계로 과제를 좁히지 않는다. 사용자가 단계로 줬다면 그 안의 목표·제약을 뽑아내고, 제약은 지키면서 더 나은 경로를 택한다.
- 과제 단위는 생각보다 한 단계 크게 잡는다: 한 줄 → 파일, 파일 → 기능.
- 서브에이전트(`code-generator` 등)에 넘길 때도 4요소를 그대로 넘긴다.

## 2. Verification First

검증은 사람들이 가장 많이 놓치는 단 하나다.

1. 수정 전에 검증 루프를 먼저 세운다. 없으면 그것이 첫 작업이다: 실패하는 테스트, 재현 스크립트, 기준 출력 캡처, dev server 실행.
2. 이식·재작성은 기존 테스트 스위트나 기존 구현을 오라클로 쓴다 (예: 기존 앱 스크린샷과 새 앱을 픽셀 비교).
3. UI 변경은 `launch.json`의 dev server로 실제로 띄워 확인한다. "아마 될 것"은 완료가 아니다.
4. 검증이 통과할 때까지 멈추지 않는다. 막히면 원인을 좁히거나 검증 수단을 개선한다.
5. 완료 보고에는 실행한 명령과 결과(pass/fail/not run)를 붙인다. close-worktree report의 `Verification`과 같은 형식이다.

## 3. 과설계 금지

- 미리 큰 추상화·스캐폴딩을 깔지 않는다. 가장 단순한 구현으로 먼저 돌려보고 관찰한다.
- 거의 같은 추상화가 이미 있으면 새로 만들지 않고 재사용·통합한다.
- SSOT의 "변경 없이 해결 가능한 방법 우선" 원칙과 같은 방향이다.

## 4. 규칙 추가 기준 (Ablation 원칙)

`docs/SSOT.md`, 영역 `INDEX.md`, 스킬, 훅, 에이전트 메모리에 새 규칙을 넣을 때:

| 관찰 | 조치 |
| --- | --- |
| 한 번 실수 | 그 자리에서 고친다. 규칙화하지 않는다 |
| 같은 실수 2회 이상 | 원인에 맞는 곳에 한 줄 추가 (아래) |
| 판단이 틀림 | SSOT 또는 영역 INDEX에 규칙 한 줄 |
| 정보가 없었음 | 규칙 대신 topic 문서·MCP·스크립트로 컨텍스트 공급 (`maintain-highway`) |
| 긴 절차가 반복됨 | `docs/tools/<name>/` 스킬 (사람 소유, 사용자 요청 시에만 생성) |
| 반드시 매번 강제 | CI 게이트 또는 훅 |

- 모델은 지시를 매번 읽는다. 추측으로 넣은 규칙은 비용이고, 새 모델에선 방해(hobbling)가 될 수 있다.
- 반복 여부 근거는 close-worktree report의 `Repeat Prevention`에 남긴다.
- 모델 세대가 바뀌면 [prune-harness](../prune-harness/SKILL.md)로 걷어낸다.

## 5. 경험적 태도

- 이론이나 이전 모델에 대한 기억보다 지금 돌려본 결과를 믿는다.
- 예전에 실패한 과제도 새 모델로 다시 시도한다 ([prune-harness/CHALLENGES.md](../prune-harness/CHALLENGES.md)).
- 가설 → 실행 → 관찰 → 조정. 변경은 작게, 효과는 측정 가능하게.

## 6. 레버리지

- 큰 단일 작업(대규모 재작성, 다단계 기능, 심층 분석): 병렬 서브에이전트로 1차 작업 → 검증/요약 에이전트 → 다시 팬아웃. 하위 작업마다 1번의 4요소를 준다.
- 반복 유지보수: 한 문장짜리 루틴으로 돌린다. 예시는 [routines.md](./routines.md).

## 완료 전 점검

- 4요소가 명확했는가, 종료 조건을 실제로 충족했는가
- 검증 명령을 실행했고 결과를 보고에 붙였는가
- 요청하지 않은 추상화·범위 확장을 하지 않았는가
- 새 규칙을 추가했다면 반복 근거가 있는가
