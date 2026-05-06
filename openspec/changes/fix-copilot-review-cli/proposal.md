## Why

Copilot reviewed 6 of 7 changed files on the nuxtus-cli PR and found 10 comments across 4 categories: banner prints before CLI flags are parsed (breaking `--quiet`/`--collection`), all three commands exit code 0 on internal failures (breaking CI), `--collection` reports valid collections as "not found" when filtered out, and new code paths lack test coverage.

## What Changes

- **Remove unconditional banner from `cli.ts` lines 36-39** — the banner prints at module load before `program.parse()`, making `--quiet` and `--collection` non-interactive modes impossible
- **Fix exit code regression in all three commands** — `create`, `types`, and `token` all use `.then(() => process.exit(0))` but their internal `return`-on-failure resolves the promise instead of rejecting it, so failures exit 0
- **Fix "not found" false positive in `create.ts`** — `--collection` checks names against `filteredCollections` (which excludes hidden/system/existing-page collections), so valid names get reported as "not found"
- **Add test coverage for new code paths** — `--collection` non-interactive path, token failure path, and SDK v21 flat-array response shape

## Capabilities

### New Capabilities
- `exit-code-correctness`: All CLI commands return correct exit codes — 0 on success, 1 on failure, regardless of whether failures are caught internally or thrown
- `non-interactive-mode`: Banner suppression and flag-based operation work correctly for CI/scripted use (`--quiet`, `--collection`)

### Modified Capabilities

## Impact

- `src/cli.ts` — remove unconditional banner, fix exit code handling for all three commands
- `src/commands/create.ts` — fix collection validation to check against `allCollections`, add meaningful error messages for filtered collections
- `src/commands/token.ts` — change failure `return` to `throw` so `.catch()` in cli.ts fires
- `src/commands/types.ts` — change failure `return` to `throw` so `.catch()` in cli.ts fires
- `test/create.test.ts` — add tests for `--collection` path, SDK v21 flat-array response
- `test/token.test.ts` — add test for Directus registration failure
