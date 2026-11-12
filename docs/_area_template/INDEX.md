# Sub-SSOT — <area>
> `apps/<area>`의 시작 문서다.
> <런타임 한 줄: 프레임워크 + 주요 버전>

## Commands
앱 기준으로 실행한다.
- `pnpm --filter <package> dev`
- `pnpm --filter <package> build`
- `pnpm --filter <package> typecheck`
- `pnpm --filter <package> test`
<어떤 변경에 어떤 명령까지 돌리는지 한 줄 규칙>

## Runtime
- <필수 env>
- <외부 연동 시 보는 env>

## Source Map
- `src/<entry>`: <책임>
- `src/<layer>`: <책임>
- `<config files>`: <책임>
- <로컬 agent/skill 폴더는 product runtime이 아님을 명시>

## Reference Map
| 작업 범위 | 추가 참조 |
| --- | --- |
| <topic> | [<TOPIC>.md](./<TOPIC>.md) |
| <sub area> | [<sub>/INDEX.md](./<sub>/INDEX.md) |
| 공통 흐름 | [../share/<TOPIC>.md](../share/<TOPIC>.md) |
