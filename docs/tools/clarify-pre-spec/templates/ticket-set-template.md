# Ticket Set Template

Use one `INDEX.md` plus linked files when a pre-spec needs phased implementation or supporting attachments.
All files live in the same `artifacts/issues/YYYY-MM-DD-<topic>-ticket/` directory.

## Index File
Path: `artifacts/issues/YYYY-MM-DD-<topic>-ticket/INDEX.md`

```markdown
# Ticket Set: <short title>

## Ticket Set
This document is the index for the `<topic>` ticket set.
Actual implementation or supporting detail is split into the linked files below.
If linked files conflict, this `INDEX.md` is the product intent and policy source of truth.

- [<sub-topic title>](./<sub-topic>.md)
- [<attachment title>](./<attachment>.md)
- [<another sub-topic title>](./<another-sub-topic>.md)

Recommended execution order: `<sub-topic> -> <another-sub-topic>`.

## Summary
## Intent
## Current Findings
## Confirmed Decisions
## Scope
## Non-Goals
## Linked File Boundary
## Policy Notes
## Open Questions
## Acceptance Criteria
## Follow-up
```

## Linked File
Path: `artifacts/issues/YYYY-MM-DD-<topic>-ticket/<sub-topic>.md`

```markdown
# <Sub-topic Title>

## Parent
- Index: [Ticket Set](./INDEX.md)
- Ticket set: `<topic>`
- Execution order: <position or not applicable>
- Primary dependencies: <none or linked files>

## Summary
## Intent
## Confirmed Decisions
## Scope
## Non-Goals
## Notes
## Acceptance Criteria
## Handoff From Previous Linked File
## Handoff To Next Linked File
```
