# HARNESS BOOTSTRAP (설치 전 임시 진입점)

이 프로젝트에는 아직 하네스가 설치되지 않았다. 사용자의 첫 메시지가 무엇이든, 먼저 `.harness-bootstrap/BOOTSTRAP.md`를 Read로 읽고 그 절차를 끝까지 따른다. 다른 작업 요청이 있었다면 "하네스 설치를 먼저 진행하고 그 작업으로 넘어가겠다"고 한 줄 알린다. 사용자가 설치를 거부하면 중단한다.

- `.harness-bootstrap/kit.txt`는 키트 파일 36개를 묶은 번들이다. **Read로 열지 않는다** — 절차의 unpack 스크립트가 직접 푼다(컨텍스트 절약).
- 생성 원본: `harness-template` 2026-11-12. 설치가 끝나면 이 파일은 `@docs/SSOT.md` 한 줄로 바뀌고 `.harness-bootstrap/`은 지워진다.
