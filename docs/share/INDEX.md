# Sub-SSOT — share

> 앱을 가로지르는 공통 작업의 시작 문서다.
> <공유 패키지 유무와 공통 경계(workspace, API contract)를 한 줄로>

## Workspace And Contracts

- 루트 `package.json`은 패키지 매니저 버전, 루트 dev dependency, workspace-wide overrides를 가진다.
- 앱별 의존성과 test/build 명령은 각 앱 `package.json`이 기준이다.
- <프론트 REST wrapper와 백엔드 route path는 함께 바꾼다> 같은 "함께 바꾸는 쌍" 규칙을 적는다.
- 로컬 agent/skill memory 폴더는 참고 자료이며 제품 코드 기준이 아니다.

## Reference Map

| 작업 범위 | 추가 참조 |
| --- | --- |
| 워크스페이스 명령과 CI/deploy | [WORKSPACE_CI.md](./WORKSPACE_CI.md) |
| AI 기능 설계·모델 배분(판단=Jev, 생성=LLM) | [AI_MODELS.md](./AI_MODELS.md) |
| <end-to-end 흐름 topic> | [<TOPIC>.md](./<TOPIC>.md) |
