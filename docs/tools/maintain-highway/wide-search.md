# Wide Search Mode

상위 `maintain-highway` 스킬이 wide 모드로 호출할 때 사용하는 하위 스킬이다. 목표는 `SSOT.md`에서 목적 문서나 코드 영역까지 가는 경로를 넓고 얕게 확인해 라우팅 문제를 고치는 것이다. 이 모드는 특정 범위가 주어지지 않은 경우를 위한 LLM 자기 주도형 스킬이다.

## 1. 지도 신호 확인

먼저 문서 지도와 조사 이력을 본다.

- 루트 지도: `docs/SSOT.md`
- workflow 지도: `docs/tools/INDEX.md`
- 조사 로그: `docs/tools/maintain-highway/RESEARCH.md`
- 필요하면 main `INDEX.md`, `find docs -maxdepth 3 -type f`, 최근 커밋

`RESEARCH.md`에서 같은 라우터 문제를 최근 충분히 다뤘다면 후보에서 제외한다.
단, 최근 커밋이나 신규 문서가 지도 연결을 바꿨다면 재검증할 수 있다.

## 2. 후보 map edge 만들기

문서 구조의 간극에서 5개 안팎의 후보를 만든다.
후보는 넓고 얕은 라우팅 문제여야 한다.

- Source Map 누락: 실제 `apps/*`, `docs/*` 구조와 `SSOT.md`가 다름
- Reference Map 누락: 새 문서나 폴더가 상위 `INDEX.md`에서 발견되지 않음
- ownership 불명확: topic 문서가 어느 main/sub 영역 소유인지 애매함
- router 과밀: `SSOT.md` 또는 `INDEX.md`가 구현 세부를 담아 길어짐
- 링크 품질: 깨진 링크, 중복 링크, 오래된 경로, 잘못된 탐색 순서
- 문서 계층 문제: topic이 커져 sub-area와 `INDEX.md`가 필요함

후보는 “수정하면 다음 에이전트가 더 적은 컨텍스트로 목적지에 도달할 가능성”이 있어야 한다.

## 3. map edge 선정

후보에 번호를 붙이고 하나의 map edge 또는 아주 작은 묶음을 고른다.
임의 선택이 어렵다면 루트에서 가까운 경로, 최근 변경 영향, 발견 가능성 문제를 우선한다.

선정한 범위는 `이번 map edge: <edge> - <왜 라우팅 개선이 필요한지>` 형식의 한 문장으로 고정한다.
깊은 도메인 확인이 필요해지면 이번 범위에서 제외하고 `selected-target` follow-up으로 남긴다.

## 4. 얕게 조사

선정한 지도 범위만 확인한다.

1. `docs/SSOT.md` Source Map과 Reference Map
2. 관련 main/sub `INDEX.md`
3. 실제 `docs/*` 파일과 폴더 위치
4. 필요한 경우 실제 `apps/*` entrypoint 존재 여부
5. 기존 topic 문서의 소유 영역과 링크 경로
6. 라인 기준: 기준형 60줄, topic 100줄

코드 동작을 깊게 추론하지 않는다. 필요한 구현 검증은 follow-up으로 넘긴다.

## 5. 문서 갱신

- `SSOT.md`, main/sub `INDEX.md`의 Source Map 또는 Reference Map을 갱신한다.
- 깨진 링크, 누락 링크, 중복 링크, 오래된 경로를 정리한다.
- router 문서의 과한 구현 설명은 제거하거나 topic 문서로 이동 후보를 남긴다.
- 새 sub-area가 필요하면 폴더와 `INDEX.md`를 만들고 부모 Reference Map에 연결한다.

## 6. 종료 자료

상위 스킬의 종료 절차에 넘길 내용을 남긴다.

- 선택한 map edge와 제외한 최근 조사 범위
- 실제 확인한 문서/폴더
- 갱신한 router 문서
- 남은 `selected-target` follow-up과 verification path
