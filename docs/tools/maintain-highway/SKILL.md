---
name: maintain-highway
description: Use when maintaining docs as the repository navigation map for agents after source, workflow, or knowledge-routing changes
---

# Maintain Highway

## 목적

`docs/`를 LLM 에이전트가 개발 작업을 시작하고, 좁히고, 검증하기 위한
information highway로 유지한다.

`docs/` 문서는 백과사전이 아니다. 문서는 `SSOT.md`에서 시작해 적은 컨텍스트로 올바른 코드, 스키마, 실행 경로, 자료형 문서에 도달하게 하는 지도다.

매 실행은, 3가지 모드 중 하나로 실행된다.

1. 좁은 탐색 (narrow search) - 디폴트. 별도 모드나 문맥을 언급하지 않고 단순히 스킬 호출. (ex - "maintain-highway 스킬을 실행합니다.")
2. 넓은 탐색 (wide search) - 모드를 명시하여 스킬을 호출. (ex - "WIDE 모드로 maintain-highway 스킬을 실행합니다.")
3. 선택된 타겟 (selected target) - 타겟 변경사항 문맥이 직접 언급되면서 스킬을 호출. (ex - "이번 워크트리 브랜치의 변경점에 대해 maintain-highway 스킬을 실행합니다.")

## 실행 결과

- `docs/` 내부의 구조 또는 파일이 업데이트 된다.

## 핵심 원칙

1. `docs/SSOT.md`는 최상위 라우터다.
2. 모든 주요 문서는 상위 `INDEX.md` 또는 인접 문서의 Reference Map에서 발견 가능해야 한다.
3. 문서는 코드를 대체하지 않고, 코드를 찾고 이해하기 위한 지도 역할을 한다.
4. 오래된 문서는 없는 문서보다 위험하다. 현재 소스가 기준이다.
5. 추측, 과거 의도, 이상적 구조는 현재 구현과 구분하지 못하면 쓰지 않는다.
6. 짧은 라우터 문서와 목적별 topic 문서를 선호한다.
7. 파일 경로, 엔트리포인트, 모듈 책임, 데이터 흐름, 제약을 우선 기록한다.
8. 긴 코드 복사, 일회성 로그, 장문 구현 설명은 docs에 넣지 않는다.

## 실행 절차

1. 항상 먼저 읽는다. `docs/SSOT.md`
2. '모드'를 파악한다.
3. '모드'에 해당하는 문서의 절차를 진행한다.

- [좁은 탐색 모드](./narrow-search.md)
- [넓은 탐색 모드](./wide-search.md)
- [선택된 타겟 모드](./selected-target.md)

3. 종료 절차를 진행한다.

4. '남긴 follow-up'이 존재한다면, 이 스킬을 해당 문맥으로 재호출한다.

## 업데이트 전략

조사 결과에 따라 하나 이상을 선택한다.

- 기존 문서 갱신: 문서 위치는 맞고 내용만 낡았을 때 사용한다.
- 신규 topic 문서 추가: 독립된 주제가 있고 아직 문서가 없을 때 사용한다. `<MAIN_AREA>/<TOPIC>.md`, `<MAIN_AREA>/<SUB_AREA>/<TOPIC>.md`,
- 신규 sub-area 개설: 하나의 topic 문서가 커지거나 관련 문서들이 하위 도메인을 이룰 때 사용한다. `<MAIN_AREA>/<SUB_AREA>/INDEX.md`
- 문서 구조 리팩토링: 문서가 발견되지 않거나 ownership이 흐려졌을 때 사용한다.
- 업데이트 허용 범위와 기록 항목은 선택한 모드 문서를 따른다.

## 문서 형태 규칙

- 기준형 문서: `SSOT.md`, `INDEX.md`는 60줄 이내 유지.
- 자료형 topic 문서는 100줄 이내 유지.
- 문서 계층은 `SSOT.md` → main `INDEX.md` → sub `INDEX.md` 또는 topic 문서 흐름을 따른다.
- 문서 계층 깊이는 최대 3단계다.
- `docs/tools` workflow 문서는 사용자가 명시적으로 요청한 경우에만 수정한다.

## 종료 절차

작업 종료 전 `docs/tools/maintain-highway/RESEARCH.md`를 갱신한다.

기록은 간결해야 한다.

- 날짜
- 모드
- 주제
- 실제 확인한 범위
- 업데이트한 문서
- 남긴 Follow-up

조사하지 않은 영역을 조사한 것처럼 쓰지 않는다.
동일 영역 반복 조사를 막을 수 있어야 한다.

끝내기 전에 확인한다.

- `SSOT.md`에서 갱신한 문서까지 Reference Map으로 도달 가능한가?
- 기준형 문서와 자료형 문서의 라인 기준을 지키는가?
- 새 문서나 이동 문서의 링크가 깨지지 않았는가?
- 문서의 주요 주장이 실제 파일 확인으로 뒷받침되는가?
- `RESEARCH.md`가 모드, 범위, 변경 문서를 말하는가?

최종 기준은 인간 독자가 아니라 에이전트 가독성이다.
적은 컨텍스트로 정확한 파일을 찾고, 현재 구조를 이해하고,
안전하게 다음 작업을 수행할 수 있으면 좋은 문서다.

# 오토 팔로우업
