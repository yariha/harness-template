# Selected Target Mode

상위 `maintain-highway` 스킬이 명시된 토픽, 파일, 커밋, 브랜치 변경점, 기능 범위를 전달받았을 때 호출하는 하위 스킬이다. 목표는 초반 후보 탐색 없이 전달받은 타겟을 바로 현재 소스 기준으로 검증하고 문서를 갱신하는 것이다.

## 1. 타겟 고정

전달받은 토픽을 먼저 한 문장으로 고정한다.

- 기능/도메인: 예) 조직 권한 preset 적용 흐름
- 소스 범위: 예) `apps/backend/src/...`, 특정 controller/service/hook
- 변경 범위: 예) 현재 브랜치 diff, 특정 commit, PR 변경점
- 문서 범위: 예) 특정 topic 문서의 stale claim

`이번 타겟: <topic> - <전달받은 이유나 문맥>` 형식으로 기록한다.
랜덤 후보 생성이나 대체 토픽 탐색은 하지 않는다.

## 2. 필수 컨텍스트 확인

타겟을 바꾸지 않고 필요한 지도와 이력만 확인한다.

- 지도 시작점: `docs/SSOT.md`
- 관련 main/sub `INDEX.md`
- 조사 로그: `docs/tools/maintain-highway/RESEARCH.md`
- 변경점이 타겟이면 `git diff`, `git show`, `git log --oneline -n 20`

`RESEARCH.md`에 같은 범위가 최근 있어도, 전달받은 변경점이 더 최신이면 그대로 재검증한다.
최근 조사와 차이가 없으면 문서 갱신 없이 follow-up 판단만 남길 수 있다.

## 3. 범위 좁히기

전달받은 타겟이 넓으면 같은 문맥 안에서만 좁힌다.

- 파일보다 넓으면 route, page, controller, service, hook 중 핵심 entrypoint를 고른다.
- 기능보다 넓으면 데이터 흐름, 권한 경계, UI 흐름, 테스트 경계 중 하나로 고른다.
- 브랜치/커밋이면 변경 파일 중 문서 claim을 바꿀 가능성이 큰 범위를 고른다.

타겟 밖의 흥미로운 영역은 조사하지 않고 'selected target' follow-up으로 남긴다.

## 4. 좁게 조사

선정 범위만 깊게 본다.

1. entrypoint, route, page, controller
2. service, hook, store, scheduler
3. schema, type, DTO, API wrapper
4. auth, permission, tenant boundary
5. external integration, env, runtime constraint
6. tests, scripts, verification path
7. 사용자 화면/업무 흐름이 바뀌면 사용자 가이드/매뉴얼 문서 갱신 필요 여부

조사하지 않은 영역을 추정하지 않는다. 문서가 코드와 다르면 코드 기준으로 갱신한다.

## 5. 문서 갱신

- 기존 topic 문서가 맞으면 그 문서만 갱신한다.
- 새 topic이 필요하면 100줄 이내로 만들고 상위 `INDEX.md`에 연결한다.
- 라우터 링크가 빠졌으면 필요한 `INDEX.md`의 Reference Map만 갱신한다.
- 타겟이 너무 커서 한 번에 안전하게 못 끝내면 다음 'selected-target' follow-up으로 쪼갠다.

## 6. 종료 자료

상위 스킬의 종료 절차에 넘길 내용을 남긴다.

- 고정한 타겟과 좁힌 최종 범위
- 실제 확인한 파일/문서
- 갱신한 문서
- 타겟 밖이라 남긴 follow-up과 verification path
- 사용자 화면/업무 흐름 변경이 있었다면 Guide Impact 판단
