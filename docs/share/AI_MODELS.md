# AI Models — 기능별 모델 배분

> AI 기능을 설계·추가할 때 읽는 topic 문서다. 앱이 런타임에 부르는 모델의 사실(어떤 기능 → 어떤 모델 → 키·엔드포인트)을 기록한다.
> 개발 에이전트 모델(`.claude/agents/*`)은 여기 대상이 아니다.
> AI 기능이 없는 프로젝트면 이 파일과 링크를 지운다.

## 배분 원칙
- **판단(분류·라우팅·점수·예/아니오·게이트)** → Jev 같은 decision model. 출력이 타입이 정해진 값과 확률이라 코드가 바로 분기한다.
- **생성(채팅·요약·초안·설명문)** → 범용 LLM. 자유 텍스트가 필요한 곳에만 쓴다.
- **판단 → 생성 순서**로 묶는다. 예: Jev가 의도/우선순위를 고르고, 필요할 때만 LLM이 답변을 쓴다. LLM 출력을 다시 파싱해 판단하지 않는다.
- 확률(confidence)이 임계값보다 낮으면 사람 검토나 LLM 보조 판단으로 넘기는 fallback을 설계에 넣는다. 임계값은 실제 데이터로 정한다.

## 기능 → 모델 표 (프로젝트가 채운다)
| 기능 | 성격 | 모델 | 질문 타입 / 출력 | 임계값·fallback | 코드 위치 |
| --- | --- | --- | --- | --- | --- |
| <예: 문의 티켓 라우팅> | 판단 | `jev-latest` | Choice(부서) | conf < <0.x> → 수동 큐 | `<path>` |
| <예: 상담 채팅> | 생성 | <LLM 모델 ID> | 텍스트 스트리밍 | — | `<path>` |

## Jev 참고 사실 (2026-11-06 조사, 사용 전 공식 문서로 재확인)
- TypeSafe AI의 hosted decision model이다. 텍스트를 생성하지 않는다. state(텍스트/JSON)와 typed question을 받아 구조화된 답과 보정된 확률을 돌려준다.
- 질문 타입: `Choice`(옵션별 확률과 전체 confidence), `Score`, `Noul`(예/아니오).
- 엔드포인트: 출처마다 다르다(`api.typesafe.ai/v1/systemone` 또는 `thejevai.com/v1/systemone`). 인증은 Bearer 토큰이다. 공식 문서 기준으로 확정해 INDEX env에 적는다.
- 모델 ID: `jev-1.13.0`, 별칭 `jev-latest`/`jev-preview`. 게이트웨이 경유 시 `typesafe/jev-1.13`(OpenRouter 등). Cloudflare Workers AI, Vercel AI Gateway에서도 쓸 수 있다고 한다.
- 입력은 state와 question을 합쳐 약 32K 토큰. 큰 문서는 요약하거나 필요한 필드만 추린 뒤 state로 보낸다.
- 비용(보도 기준): 입력 1M 토큰당 $0.042, 출력 $0.
- 주의: "환각 없음" 같은 주장은 벤더 마케팅이다. 자체 4-workflow 벤치마크 정확도는 약 68%로 보고됐다. 도입 전 우리 데이터로 정확도를 측정한다(검증수단 필수).

## 키와 설정
- 키는 코드·문서에 쓰지 않는다. `.env`(git 제외)에 `JEV_API_KEY` 같은 이름으로 두고, 변수명·엔드포인트·모델 ID는 해당 영역 `INDEX.md`의 env/Commands 항목에 기록한다.
- 모델 ID는 설정값 한 곳에서 읽는다. 별칭(`jev-latest`)은 개발에만 쓰고, 운영은 고정 버전을 쓴다.

## 설계 체크리스트 (pre-spec / Task Brief에 반영)
- 이 기능은 판단인가 생성인가? 표에 한 행을 추가했는가?
- 판단이면 질문 타입과 옵션 목록이 타입(enum/schema)으로 정의됐는가?
- 낮은 confidence, 타임아웃, API 실패 때의 fallback이 정해졌는가?
- 종료조건에 라벨된 샘플 기준 정확도 측정이 들어갔는가?
