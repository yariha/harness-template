---
name: close-worktree
description: Use only when the user explicitly invokes the close-worktree skill by name, folder path, or direct SKILL.md reference
---

# Close Worktree

워크트리를 닫기 전 필요한 정리 작업 모듈 실행하는 라우터 스킬이다.
각 모듈은 서브 에이전트 (Subagent Driven)으로 '병렬'로 실행한다.
상세 판단과 파일 변경 및 산출물 작성은 각 모듈을 따른다.

## 병렬 처리

- 각 모듈은 서브에이전트를 통해 병렬로 실행된다.
- 안정적인 병렬 처리를 위해, 각 모듈에게 필요한 정확하고 간결한 문맥을 제공한다.

## Modules

1. [maintain-highway](../maintain-highway/SKILL.md)
   - 모듈 스킬을 'selected target' 모드로 실행한다.
   - 모듈에게 전달하는 영역/토픽은 "local main 브랜치와 비교한, 워크트리의 변경점"
   - 스킬에 이번 워크트리 변경 범위를 같이 전달한다.

2. guide-impact(선택 모듈, 사용자 가이드가 있는 프로젝트만)
   - 이번 워크트리 변경점이 사용자 가이드에 영향을 주는지 판단한다.
   - 필요하면 수정 필요 사유와 권장 반영 방향을 report 입력으로 남긴다.
   - 가이드 업데이트가 필요하면 원본 레포의 `guide-update-quality.md`를 가져와 따른다.
   - 사용자 승인 전에는 가이드 본문을 수정하지 않는다.

3. [writing-report](./writing-report.md)
   - 워크트리에서 진행된 개발 내용에 대해 report artifact를 작성한다.

4. [clean-artifacts](./clean-artifacts.md)
   - report 이후 남은 산출물 정리 규칙을 적용한다.
   - 이번 워크트리에서 산출된 spec/plan 파일을 살펴본다.
   - 이번 워크트리 작업 도입부에서 호출된 issue 파일을 살펴본다.

## Execution Rules

- `maintain-highway`와 `guide-impact`는 서브에이전트 기반으로 병렬 실행한다.
- `writing-report`는 두 모듈 결과를 받은 뒤 작성한다.
- `clean-artifacts`는 report 작성 이후 실행한다.

## Final Response

- 최종 응답에는 report 경로, docs 결과, Guide Impact 결과, 검증 결과, 남은 위험을 포함한다.
- 그밖에, 워크트리 변경점에 대한 수동 테스트 방법을 재언급 한다.
