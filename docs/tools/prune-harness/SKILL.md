---
name: prune-harness
description: Use only when the user explicitly asks to prune/audit the harness — after a new model release, every ~6 months, or when agent behavior feels over-constrained ("하네스 정리", "ablation", "prune-harness")
---

# Prune Harness

새 모델은 이전 모델의 약점을 보정하던 지시가 필요 없거나 오히려 방해(hobbling)가 될 수 있다.
Boris Cherny: "6개월마다 CLAUDE.md·스킬·훅을 지워보고 모델이 뭘 하는지 보라."
이 스킬은 하네스의 **규칙 층**을 걷어내고, 반복 실패가 관찰된 것만 되살린다. **지도 층**(Source Map, INDEX, topic 문서)은 대상이 아니다. 지도는 `maintain-highway`가 맡는다.

## 대상

| 대상 | 예 | 기본 처리 |
| --- | --- | --- |
| SSOT Core Principles 중 행동 교정 문장 | "~를 먼저 선언한다", "~하지 마라" 류 | 후보 |
| 영역 INDEX의 행동 규칙 줄 | "우선 의심" 항목, 금지 패턴 | 후보 |
| `docs/tools/**` 스킬의 교정성 문장 | 모델이 이미 알아서 하는 일반론 | 후보 |
| `.claude/agents/*`의 프롬프트 | Quality Bar 일반론 | 후보 |
| 훅, 전역 `~/.claude/CLAUDE.md` | 포맷·습관 강제 | 후보 |
| 허락 필수 변경, 테스트 동시성, CI 게이트 | 안전·비가역 | **유지** (삭제 대상 아님) |

## 절차

1. **목록화**: 위 대상에서 "행동을 교정하는 문장"만 뽑아 `artifacts/reports/YYYY-MM-DD-prune-harness-report.md`에 표로 적는다 (위치, 문장, 넣은 이유를 알면 이유).
2. **사용자 확인**: 비활성화할 후보를 보여주고 승인받는다. `docs/tools/**`는 사람 소유이므로 승인 없이 고치지 않는다.
3. **비활성화**: 승인된 문장을 지운다. git에 남으므로 별도 백업은 불필요하다. git이 없으면 `*.bak`을 남긴다.
4. **사용하며 관찰**: 평소 작업을 그대로 진행한다. 막힌 지점을 report의 `Observations`에 날짜·작업·증상으로 쌓는다.
5. **반복 실패만 복원**: 같은 증상이 2회 이상이면 empirical-coding 4절 표에 따라 알맞은 곳에 한 줄 되살린다. 복원한 줄은 report에 근거와 함께 남긴다.
6. **Challenges 재시도**: [CHALLENGES.md](./CHALLENGES.md)의 과제를 새 모델로 다시 던진다. 성공하면 표에서 지우거나 `Solved`로 옮긴다.

## 하지 않는 것

- 안전·비가역 규칙(허락 필수 변경, CI 동결 목록, migration lint)은 걷어내지 않는다.
- 관찰 없이 "필요할 것 같다"는 이유로 복원하지 않는다.
- 지도 문서의 사실(경로, 명령, env)을 지우지 않는다.

## Report 섹션

```markdown
# Report: prune-harness (<모델명>)
## Removed        | 위치 | 문장 | 이유 |
## Kept (safety)  | 위치 | 문장 |
## Observations   | 날짜 | 작업 | 증상 | 횟수 |
## Restored       | 위치 | 문장 | 근거(Observations 행) |
## Challenges     | 과제 | 결과 |
```
