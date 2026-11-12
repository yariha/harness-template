# Writing Close Worktree Report

close-worktree의 report artifact 작성 절차다.

## Output

- 위치: `artifacts/reports/YYYY-MM-DD-<topic>-report.md`
- 날짜: 현재 로컬 날짜
- 길이: 100줄 이내
- 문체: 짧고 사실 중심

## Required Inputs

| 입력 | 내용 |
| --- | --- |
| Summary | 무엇을 끝냈는지 |
| Docs result | maintain-highway 결과 또는 docs 갱신 불필요 사유 |
| Guide Impact | 사용자 가이드 영향 상태, 후보 가이드, 승인 필요 여부 |
| Version status | update-version-status 자동 실행 없음, 별도 직접 실행 필요 여부 |
| Verification | 실행한 명령, pass/fail/not run, 실패 수 |
| Plan deviations | 계획과 달라진 점, 즉흥 변경, 못 한 것 |
| Repeat prevention | 반복되면 안 되는 실수와 docs 반영 경로 |
| Notes and cautions | 특이사항, 위험, 환경, 데이터, 마이그레이션 |
| Manual test guide | 사용자가 직접 확인할 행동과 기대 결과 |

## Template

```markdown
# Report: <topic>

## Summary
- <무엇을 끝냈는지 1~3줄>

## Docs Updated
- <maintain-highway로 갱신한 docs 경로>
- <또는 "변경된 동작 없음: 갱신 불필요 - 이유">

## Guide Impact
- Status: <None | Review Required | Update Required | Updated>
- Candidate Guides: <가이드명 또는 없음>
- Reason: <가이드 수정 필요/불필요 판단 근거>
- Suggested Direction: <승인 시 반영 방향 또는 생략>
- Approval Gate: <승인 전 본문 수정 안 함 | 승인받아 수정 완료>

## Version Status
- <update-version-status 자동 실행 없음>
- <별도 직접 실행 필요 여부와 이유>

## Verification
- `<command>`: <pass/fail/not run>
- <실행하지 못했다면 이유와 영향>

## Plan Deviations
- <원래 plan과 다르게 한 점>
- <즉흥적으로 변경한 점과 이유>
- <못 한 것이 있다면 이유와 후속 조치>

## Repeat Prevention
- <반복되면 안 되는 실수/오류>
- <docs에 반영한 회피 규칙과 경로>

## Notes And Cautions
- <특이사항>
- <주의해야 할 위험, 환경, 데이터, 마이그레이션, 플래그>

## Manual Test Guide
1. <사용자가 직접 확인할 화면/API/흐름>
2. <성공 기준>
3. <주의해서 볼 회귀 지점>
```

## Quality Bar

- report는 final response가 아니다. 반드시 파일로 생성한다.
- “테스트함”에는 명령과 결과가 있어야 한다.
- “not run”은 숨기지 말고 이유와 위험을 쓴다.
- 수동 테스트 가이드는 “확인하세요”가 아니라 실제 단계로 쓴다.
- Repeat Prevention은 maintain-highway가 갱신한 docs 경로와 연결한다.
- Repeat Prevention의 규칙화는 [empirical-coding](../empirical-coding/SKILL.md) 4절을 따른다. 처음 본 실수는 기록만 하고, 이전 report에도 같은 실수가 있을 때만 SSOT·INDEX에 한 줄 추가한다.
- Verification은 Task Brief의 종료 조건과 1:1로 대응해야 한다. 대응하지 않는 종료 조건은 "not run"으로 적는다.
