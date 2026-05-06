## Context

The nuxtus-cli PR (`feat/upstream-package-refresh-and-sdk-v21`) adds non-interactive mode (`--collection`, `--quiet`) and SDK v21 compatibility. Copilot found 10 review comments across 4 bug categories. The CLI uses Commander.js with a pattern where each command returns a `Promise<void>` and `cli.ts` wraps each with `.then(() => process.exit(0)).catch(() => process.exit(1))`.

Current flow:
```
cli.ts module load
  ├── Line 36-39: clear() + figlet banner (UNCONDITIONAL)
  ├── Commander program setup
  └── program.parse()
       └── Each action handler:
            ├── try { new Generator() } catch { return }   ← resolves, doesn't reject
            ├── ... do work ...
            └── return / throw
```

## Goals / Non-Goals

**Goals:**
- Fix banner printing before flag parsing so `--quiet` and `--collection` work in CI
- Fix exit code regression so all commands exit 1 on failure
- Fix "not found" false positive for valid-but-filtered collections
- Add test coverage for new code paths

**Non-Goals:**
- Refactoring Commander.js action structure (keep current pattern)
- Adding `--quiet` flag to `token` command (not in original PR scope)
- Changing the `token` command's `.env` file editing behavior
- Adding integration tests (unit tests with mocks only)

## Decisions

### 1. Remove unconditional banner, keep per-command banners

Delete `cli.ts` lines 36-39 entirely. Each command handler already has its own gated banner logic. This eliminates the double-banner issue and makes `--quiet`/`--collection` work correctly.

Alternative considered: Gate the top-level banner on `process.argv` parsing — rejected because Commander hasn't parsed yet at that point, and checking `argv` manually is fragile.

### 2. Throw errors instead of returning on failure

Change `return` to `throw` in all three command catch blocks:
- `create.ts` line 70: `return` → `throw err`
- `token.ts` line 16-18: `return` → `throw err`
- `token.ts` line 25: `return` → keep as `throw new Error(...)`
- `types.ts` line 17: `return` → `throw err`

This makes the promise reject (not resolve), so `.catch(() => process.exit(1))` in `cli.ts` fires correctly.

Alternative considered: Return exit codes from commands and check in `.then()` — rejected because it changes the `Command` interface type signature.

### 3. Two-phase collection validation in create.ts

Split the "not found" check into two steps:
1. Check requested names against `allCollections` → report actual "not found"
2. Check remaining names against `filteredCollections` → report why they were filtered (hidden, existing page, system)

This gives users actionable error messages instead of a misleading "not found."

```
Requested: ["blogposts", "directus_users", "already_exists"]
                │
                ▼
    ┌─ In allCollections? ─────────────────────────┐
    │  NO  → "Collection not found: <name>"         │
    │  YES → In filteredCollections?                │
    │         NO → Why filtered out?                │
    │              hidden  → "Collection <n> is hidden"
    │              system  → "Collection <n> is a system collection"
    │              exists  → "Page for <n> already exists"
    │         YES → Create the page                  │
    └───────────────────────────────────────────────┘
```

### 4. Test structure follows existing patterns

Add test cases to existing `create.test.ts` and `token.test.ts` files. No new test files needed.

## Risks / Trade-offs

- **Risk**: `throw` in Generator constructor catch changes error display — currently Generator logs the error itself, then the command returns silently. With `throw`, the error propagates to `cli.ts` `.catch()` which calls `process.exit(1)` without printing the error. → **Mitigation**: Generator already prints the error before throwing. The `.catch()` just needs to exit(1), no additional logging needed.
- **Risk**: Two-phase validation adds complexity to create.ts. → **Mitigation**: The logic is ~10 lines, clearly commented, and covered by new tests.
- **Risk**: Changing `return` to `throw` in token.ts means `.env` won't be modified on Directus failure (current behavior preserves this). → **Mitigation**: This is the desired behavior — Copilot comment #8 specifically validates this approach, we just need the exit code to reflect failure.
