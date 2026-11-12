# Clean Artifacts

close-worktree의 모듈이다.
이번 워크트리에서 생성했고 같은 워크트리에서 해결된 issue/spec/plan 산출물을 legacy로 옮긴다.
Report는 옮기지 않는다.

## Targets

- Issue: `artifacts/issues/<solved_in_this_worktree>`
- Spec: `artifacts/specs/<solved_or_generated_in_this_worktree>`
- Plan: `artifacts/plans/<solved_or_generated_in_this_worktree>`
- 세 대상은 파일명 또는 디렉터리명의 날짜와 topic이 거의 같아야 한다.

## Destination

- Issues: `legacy/<YYYY-MM>/issues/`
- Specs: `legacy/<YYYY-MM>/specs/`
- Plans: `legacy/<YYYY-MM>/plans/`

`<YYYY-MM>`은 artifact 이름의 `YYYY-MM-DD`에서 가져온다.
날짜가 없으면 현재 로컬 월을 쓴다.

## Procedure

1. `git status --short`와 close report를 보고 이번 워크트리에서 생성/해결된 대상만 고른다.
2. `artifacts/reports/*`는 이동하지 않는다.
3. `mkdir -p legacy/<YYYY-MM>/{issues,specs,plans}`를 준비한다.
4. issue/spec/plan을 대응 destination으로 이동한다. 대상이 디렉터리면 디렉터리 전체를 이동한다.
