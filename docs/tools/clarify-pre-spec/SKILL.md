---
name: clarify-pre-spec
description: Use when 사용자의 모호한 아이디어, 요구사항, 티켓 초안을 비개발자도 읽고 수정할 수 있는 pre-spec ticket/issue 또는 INDEX 기반 ticket set으로 구체화해야 할 때
---

# Clarify Pre-Spec

## 목적
모호한 요구를 사용자와 여러 번 질의응답하며 개발 전 단계의 `pre-spec` ticket/issue로 만든다. 산출물은 기획/운영/디자인/개발자가 함께 읽을 수 있어야 한다.

## 사용 시점
- “요구사항 정리”, “티켓으로 내려줘”, “scope 정리”, “pre-spec”, “issue 초안” 요청
- 사용자가 서비스 화면을 써본 경험은 있지만 내부 기술 구조를 모르는 경우
- 기존 문서가 feature spec처럼 커져서 실행 가능한 ticket으로 낮춰야 하는 경우
- 같은 스킬을 다시 실행해 기존 ticket의 부족한 부분을 찾아 수정하려는 경우

## 사용하지 않을 때
- 이미 승인된 spec을 구현 계획으로 쪼개거나 내부 구현 방식을 확정하는 단계
- 단순 오탈자 수정처럼 질의응답이 필요 없는 문서 편집

## 핵심 원칙
- 비개발자 문서가 먼저다.
- 사용자가 백엔드/프론트 기술스택을 모른다고 가정한다.
- 티켓 검토자에게 내부 구현 방식, 코드 구조, API/DB 유무, 마이그레이션 여부를 결정하게 하지 않는다.
- 내부 구현명과 기술 판단은 꼭 필요할 때만 “AI 확인 필요” 또는 “spec 단계 확인”으로 둔다.
- 필요한 코드베이스 정보는 AI가 `docs/SSOT.md`부터 직접 확인한다.
- 사용자가 모르는 기술 정보를 묻지 않는다.
- 결정된 것과 미결정을 분리한다.
- pre-spec은 “무엇을 왜 바꿀지”를 정하고, spec은 “어떻게 만들지”를 정한다.
- 기능의 현재 구현 유무나 가능한 구현 방식은 pre-spec 질문의 대상이 아니라 spec/구현 단계의 확인 대상이다.
- 완성도가 부족하면 한 번에 끝내지 말고 계속 구체화한다.

## 반복 실행 모드
같은 스킬을 기존 산출물에 다시 실행하면 새 문서를 만들기보다 수정 모드로 들어간다.

수정 모드 절차:
- 기존 `/artifacts/issues/*-ticket.md` 또는 `/artifacts/issues/*-ticket/INDEX.md` 문서를 읽는다.
- ticket set이면 `INDEX.md`를 먼저 읽고 연결 문서의 해석 충돌 여부를 확인한다.
- 원래 요청, 현재 문서, 새 사용자 피드백을 비교한다.
- 빠진 결정, 모호한 표현, 너무 기술적인 문장, 복잡도 대비 과한 분량을 찾는다.
- 부족한 부분만 질문하고, 합의된 내용만 기존 문서에 반영한다.

## 절차
### 1. 원문 보존
사용자의 최초 요청을 짧게 인용하거나 요약한다.

확인할 것: 실제 문제, 확정된 결정, 여러 해석이 가능한 표현, 포함/제외 범위.

### 2. 컨텍스트 확인
먼저 `docs/SSOT.md`를 읽고 관련 문서와 영역을 따라간다.

코드베이스는 현재 서비스 용어, 기존 화면/흐름 충돌, “기존 정책을 따른다”라고 쓸 근거 확인에만 참고한다.
코드베이스에서 확인한 API/DB/컴포넌트 유무를 사용자에게 결정 질문으로 되돌리지 않는다.

사용자에게 기술스택, 폴더 구조, 내부 구현명, API 존재 여부, DB 필드/마이그레이션 필요 여부를 묻지 않는다.
필요하면 pre-spec에는 “spec 단계에서 구현 가능 방식 확인”으로 남긴다.

### 3. 모호성 진단
다음 빈칸을 찾는다.

| 분류 | 확인할 내용 |
| --- | --- |
| 목적 | 왜 필요한가 |
| 사용자 | 누가 영향을 받는가 |
| 범위 | 이번 티켓에 포함되는가 |
| 제외 | 후속 티켓으로 미룰 것은 무엇인가 |
| 정보 | 어떤 개념을 분리하거나 보존하는가 |
| 화면 | 최소 변경인지 새 화면인지 |
| 정책 | 업무상 누가 할 수 있어야 하고 어떤 예외를 막아야 하는가 |
| 완료 기준 | 무엇을 보면 끝났다고 볼 수 있는가 |

### 4. 질의응답
객관형 선택과 주관형 답변을 섞어 구체화한다.

객관형 질문 규칙:
- 선택지는 비개발자가 이해할 수 있는 말로 쓰고 2~4개로 제한한다.
- 각 선택지에는 의미와 이유를 붙인다.
- 추천 옵션에는 `(추천)`을 붙이고 추천 사유를 설명한다.
- 선택지는 사용자가 판단할 수 있는 업무 결과, 화면 동작, 운영 정책 중심으로 쓴다.
- 코드 구조, API 추가, DB 컬럼, soft delete/hard delete 같은 구현 선택지는 묻지 않는다.

객관형 예시:
```text
이번 티켓의 성격은 무엇에 가깝나요?
1. 기존 화면에 최소 기능 추가 (추천): 사용자가 이미 쓰는 흐름에서 필요한 동작만 추가합니다.
2. 새 관리 화면까지 포함: 사용자가 직접 관리할 수 있지만 범위가 커집니다.
3. 정책 결정만: 개발 전 합의 문서로는 가볍지만 바로 구현하기엔 부족합니다.
```

금지 질문 예시:
```text
이 기능은 soft delete로 할까요, hard delete로 할까요?
DB에 deleted_at을 추가해야 할까요?
현재 DELETE API가 없는데 새 endpoint를 만들까요?
```

허용 질문 예시:
```text
삭제 후 일반 회원 목록과 검색 결과에서 이 회원이 보이지 않아야 하나요?
과거 결제, 문서, 주문 기록은 관리 확인용으로 남아 있어야 하나요?
삭제 권한은 조직 관리자에게만 둘까요, 매니저도 포함할까요?
```

주관형 질문 규칙:
- 사용자의 맥락, 불편, 예외, 실제 사용 사례는 주관형으로 묻는다.
- 이해가 어려운 부분을 말해주면 풀어서 설명하겠다는 안내를 붙인다.

주관형 예시:
```text
이 변경이 필요한 가장 큰 이유를 실제 업무 상황 기준으로 설명해주세요.
잘 이해가 가지 않는 부분이 있으면 그 부분만 말해주셔도 됩니다. 제가 풀어서 다시 설명하겠습니다.
```

질문 운영: 기본은 한 번에 한 질문이다. 밀접한 질문은 최대 3개까지 묶고, 보통 5~8개 안에서 끝내되 완성도가 낮으면 더 반복한다.

### 5. 접근안 제시
핵심 모호성이 풀리면 2~3개 접근안을 제시한다. 각 접근안에는 포함 범위, 제외 범위, 장점, 리스크, 추천 여부를 적는다. 추천안은 하나로 좁히고 이유를 말한다.

### 6. 산출물 구조 결정
핵심 범위가 정리되면 단일 ticket으로 충분한지, ticket set으로 나눠야 하는지 먼저 판단한다.

단일 ticket을 선택한다:
- 한 화면 또는 한 정책 변경으로 설명할 수 있다.
- 선행 작업과 후속 작업의 의존성이 약하다.
- 한 명 또는 한 작은 작업 단위로 구현 가능하다.
- 100~200줄 내외로 제품 의도, 범위, 완료 기준을 담을 수 있다.

`INDEX + linked files ticket set`을 선택한다:
- 도메인/데이터 모델, UI, 업무 정책, 마이그레이션처럼 작업 성격이 다르다.
- 실행 순서나 병렬 가능 범위를 명확히 해야 한다.
- 여러 엔지니어가 나눠 구현할 가능성이 높다.
- 단일 ticket이 200줄을 넘거나, 한 ticket 안에 서로 다른 완료 기준이 섞인다.
- 전체 제품 의도와 각 구현 단계의 scope를 분리하지 않으면 맥락 손실이 생긴다.

ticket set을 선택하면 `INDEX.md`가 제품 의도와 정책 기준의 SSOT가 되고, 연결 문서는 실제 구현 가능한 step 또는 보조 자료 단위가 된다.
연결 문서 간 해석이 충돌하면 `INDEX.md`를 우선한다.

### 7. pre-spec 작성
필요한 템플릿을 참고한다.
- 단일 ticket: [templates/single-ticket-template.md](./templates/single-ticket-template.md)
- ticket set: [templates/ticket-set-template.md](./templates/ticket-set-template.md)

단일 ticket 기본 포맷:
```markdown
# Ticket: <짧은 제목>

## Summary
## Intent
## Confirmed Decisions
## Scope
## Non-Goals
## Open Questions
## Acceptance Criteria
## Follow-up
```

필요할 때만 `User Impact`, `Migration Notes`, `Policy Notes`, `UI Minimum Changes`, `Data Concepts`를 추가한다.

ticket set `INDEX.md`에는 최소한 다음 섹션을 둔다:
- `Ticket Set`: 연결 문서 목록, 권장 실행 순서, 충돌 시 `INDEX.md` 우선 원칙
- `Summary`, `Intent`
- 전체 `Confirmed Decisions`
- 전체 `Scope`, `Non-Goals`
- `Linked File Boundary`: 각 연결 문서가 담당하는 범위와 제외 범위
- 전체 `Acceptance Criteria`

ticket set 연결 문서에는 최소한 다음 섹션을 둔다:
- `Parent`: `INDEX.md` 링크, ticket set 이름, 실행 순서, dependency
- `Summary`, `Intent`
- 해당 step의 `Confirmed Decisions`, `Scope`, `Non-Goals`
- 필요 시 `Data/API/UI/Policy Notes`
- `Acceptance Criteria`
- `Handoff From` 또는 `Handoff To`: 앞뒤 연결 문서와의 계약

### 8. 개발팀 공유 메시지
ticket set을 만들었거나 사용자가 공유 문구를 원하면 마지막에 3~6줄의 짧은 메시지를 함께 제공한다.
메시지는 각 문서의 의미, 권장 진행 순서, `INDEX.md` 우선 원칙만 담는다.

## 산출물 기준
좋은 pre-spec:
- 비개발자가 읽어도 의미를 이해할 수 있다.
- 포함/제외 범위가 명확하다.
- 미결정 사항이 숨겨져 있지 않다.
- 수용 기준이 행동 또는 결과로 검증 가능하다.
- 연결 문서만 읽어도 구현 단위가 보이고, 정책 판단은 `INDEX.md`로 회수된다.

나쁜 pre-spec:
- 내부 구조와 구현 방식 설명이 중심이다.
- “적절히”, “잘”, “유연하게” 같은 표현이 많다.
- 결정되지 않은 내용을 확정처럼 쓴다.
- 큰 기능을 하나의 ticket에 넣어 구현 순서와 책임 경계가 흐려진다.

## 저장 위치
단일 ticket은 `/artifacts/issues/YYYY-MM-DD-<topic>-ticket.md` 형태로 저장한다.

ticket set은 디렉터리로 저장한다.
- index: `/artifacts/issues/YYYY-MM-DD-<topic>-ticket/INDEX.md`
- linked file: `/artifacts/issues/YYYY-MM-DD-<topic>-ticket/<sub-topic>.md`
- linked file: `/artifacts/issues/YYYY-MM-DD-<topic>-ticket/<attachment>.md`

`00-epic`, `01-<step>` 같은 번호 prefix 파일명은 사용하지 않는다.
실행 순서는 파일명이 아니라 `INDEX.md`의 `Ticket Set` 섹션에서 명시한다.
연결 파일명은 kebab-case로 쓰고, 예시는 `policy.md`, `ui-flow.md`, `migration-notes.md`처럼 목적을 드러내는 이름을 쓴다.
pre-spec ticket은 100줄 내외를 권고하되, 복잡도에 따라 200줄 내외까지 허용한다.
ticket set의 `INDEX.md`는 길어질 수 있지만, 연결 문서는 각각 독립 구현 가능한 범위나 보조 자료로 유지한다.

분량 기준:
- 간단한 수준: 100줄 내외
- 복잡도 있는 수준: 150줄 내외
- 매우 구체적인 수준: 200줄 내외
- 200줄을 넘고 구현 성격이 둘 이상이면 ticket set으로 분리 검토

## 완료 전 점검
- 원문 의도가 보존되었는가
- 결정된 것과 미결정이 분리되었는가
- 비개발자가 수정 가능한 문장인가
- 사용자에게 기술스택 지식을 요구하지 않는가
- 산출물이 단일 ticket 또는 `YYYY-MM-DD-<topic>-ticket/INDEX.md` 기반 ticket set 형식에 맞는가
- 복잡도에 맞는 권장 분량을 지키는가
- Scope와 Non-Goals가 충돌하지 않는가
- Acceptance Criteria가 검증 가능한가
- 완성도가 낮은 항목을 추가 질문으로 다시 구체화했는가
- ticket set이면 `INDEX.md`에서 모든 연결 문서를 레퍼런스하는가
- ticket set이면 각 연결 문서의 dependency, handoff, 완료 기준이 분리되어 있는가
- ticket set이면 연결 문서 간 해석 충돌 시 `INDEX.md`를 우선한다는 원칙이 명시되어 있는가

## 다음 단계
pre-spec이 승인되면 spec 작성 또는 implementation plan으로 넘어간다. 승인 전에는 구현 계획, 코드 수정, 상세 기술 설계를 시작하지 않는다.
구현 단계에서는 이 ticket을 [empirical-coding](../empirical-coding/SKILL.md) Task Brief로 옮긴다: `Intent`·`Scope` → 목표, `Non-Goals` → 가드레일, `Acceptance Criteria` → 종료 조건. 검증 수단은 AI가 spec 단계에서 정한다.
