# Architecture
> 이 문서는 앱 경계와 런타임 흐름을 빠르게 잡기 위한 상위 지도다.
> 세부 도메인은 각 영역 INDEX와 share 문서로 내려간다.

## Runtime Shape
- <모노레포/워크스페이스 형태, 앱 위치>
- <DB 기준(schema 파일)과 프론트 타입의 관계>
- <공유 패키지 유무. 없으면 "공통 contract는 docs/share와 각 앱 wrapper/type/schema로 추적한다">

## Main Boundaries
- <각 앱의 시작 INDEX>
- <bootstrap·config 파일 위치(보안 헤더, CORS, body limit 등)>

## Core Flows
- <도메인 핵심 흐름 3~5개를 한 줄씩. 예: Auth/session, 주요 업무 흐름, 운영/설정>

## Change Notes
- <변경 시 좁히는 순서. 예: route → service → schema → frontend wrapper/type>
- <가장 흔한 누락(테넌트 id, 권한 scope 등)을 "우선 의심" 항목으로>

## Reference Map
| 작업 범위 | 추가 참조 |
| --- | --- |
| <Area A> | [<a>/INDEX.md](./<a>/INDEX.md) |
| AI 기능 / 모델 배분 | [share/AI_MODELS.md](./share/AI_MODELS.md) |
| Cross-app workflows | [share/INDEX.md](./share/INDEX.md) |
| Workflow tools | [tools/INDEX.md](./tools/INDEX.md) |
