# Narrow Search Mode

상위 `maintain-highway` 스킬이 기본 모드로 호출하는 하위 스킬이다. 목표는 최근 코드 변화와 조사 로그를 보고, 문서 갱신 가치가 있는 좁은 범위 하나를 골라 실제 소스 기준으로 갱신하는 것이다. 이 모드는 특정 범위가 주어지지 않은 경우를 위한 LLM 자기 주도형 스킬이다.

## 1. 최근 신호 확인

먼저 최근 변경과 조사 이력을 본다.

- 최근 신규 커밋: `git log --oneline -n 20`
- 최근 변경 파일: 필요한 경우 `git show --stat <commit>`
- 조사 로그: `docs/tools/maintain-highway/RESEARCH.md`
- 지도 시작점: `docs/SSOT.md`와 관련 main `INDEX.md`

`RESEARCH.md`에서 같은 범위를 최근 충분히 조사했다면 후보에서 제외한다.
단, 최근 커밋이 같은 범위를 다시 바꿨다면 재검증할 수 있다.

## 2. 후보 범위 만들기

최근 커밋과 기존 문서의 간극에서 5개 안팎의 후보를 만든다.
후보는 다양한 형태가 될 수 있다.

- 기술적 개념: auth guard, realtime payload, cache invalidation
- 소스 폴더: `apps/<app>/src/...`
- 소스 파일: controller, service, hook, modal, schema, DTO
- 구조적 개념: 라우팅, 권한 경계, 데이터 흐름, 테스트 런타임
- 아키텍처상 개념: app boundary, integration failure mode, tenant/조직 scope
- 문서 claim: 현재 문서가 오래됐거나 너무 넓게 말하는 문장

후보는 “확인하면 문서가 더 정확해질 가능성”이 있어야 하며, 이미 명확하고 최근 조사된 영역은 피한다.

## 3. 랜덤 범위 선정

후보에 번호를 붙이고 하나를 랜덤하게 고른다.
임의 선택이 어렵다면 최근 조사 빈도가 낮고 커밋 영향이 있는 후보를 고른다.

선정한 범위는 `이번 범위: <topic> - <왜 문서 갱신 가능성이 있는지>` 형식의 한 문장으로 고정한다.
범위가 넓으면 파일, route, hook, service, schema 중 하나로 더 좁힌다.

## 4. 좁게 조사

선정 범위만 깊게 본다.

1. entrypoint, route, page, controller
2. service, hook, store, scheduler
3. schema, type, DTO, API wrapper
4. auth, permission, tenant boundary
5. external integration, env, runtime constraint
6. tests, scripts, verification path

조사하지 않은 영역을 추정하지 않는다. 문서가 코드와 다르면 코드 기준으로 갱신한다.

## 5. 문서 갱신

- 기존 topic 문서가 맞으면 그 문서만 갱신한다.
- 새 topic이 필요하면 100줄 이내로 만들고 상위 `INDEX.md`에 연결한다.
- 라우터 링크가 빠졌으면 필요한 `INDEX.md`의 Reference Map만 갱신한다.
- 큰 구조 문제가 보이면, 해당 범위를 언급하여 'selected-target' follow-up으로 남긴다.

## 6. 종료 자료

상위 스킬의 종료 절차에 넘길 내용을 남긴다.

- 선택한 랜덤 후보와 제외한 최근 조사 범위
- 실제 확인한 파일/문서
- 갱신한 문서
- 남은 follow-up과 verification path
