## 1. Fix unconditional banner in cli.ts

- [x] 1.1 Delete lines 36-39 in `src/cli.ts` (the unconditional `clear()` + `figlet.textSync()` at module level)
- [x] 1.2 Remove the duplicate banner from `create` command handler (lines 52-54) since the per-command banner logic in each handler is already correct
- [x] 1.3 Verify `types -q` and `create -c <name>` produce no banner output

## 2. Fix exit code regression — change return to throw

- [x] 2.1 In `src/commands/create.ts` line 70: change `return` to `throw err` in the Generator constructor catch block
- [x] 2.2 In `src/commands/types.ts` line 17: change `return` to `throw err` in the Generator constructor catch block
- [x] 2.3 In `src/commands/token.ts` line 17: change `return` to `throw err` in the Generator constructor catch block
- [x] 2.4 In `src/commands/token.ts` line 25: change `return` to `throw new Error(...)` wrapping the existing error message (so `.catch()` in cli.ts fires and exits 1)

## 3. Fix "not found" false positive in create.ts

- [x] 3.1 In `src/commands/create.ts` `createPages()`, replace the single `notFound` check with two-phase validation: first check against `allCollections` (passed as new parameter), then check filtered reasons
- [x] 3.2 Pass `allCollections` and `existingCollections` to `createPages()` from the main `create` function
- [x] 3.3 Add specific error messages for: system collection (`directus_*`), hidden collection, page already exists

## 4. Add tests for new code paths

- [x] 4.1 In `test/create.test.ts`: add test for `--collection` non-interactive path with valid collection names
- [x] 4.2 In `test/create.test.ts`: add test for `--collection` with SDK v21 flat-array response shape (not `{ data: [...] }`)
- [x] 4.3 In `test/create.test.ts`: add test for "Collection not found" with a name that genuinely doesn't exist
- [x] 4.4 In `test/create.test.ts`: add test for filtered-out collections reporting specific reasons (hidden, system, existing)
- [x] 4.5 In `test/token.test.ts`: add test for `generateStaticToken()` rejection — verify exit 1, `.env` not modified
- [x] 4.6 In `test/token.test.ts`: add test for Generator constructor failure — verify exit 1

## 5. Verification

- [x] 5.1 Run `npm run build` to verify TypeScript compiles
- [x] 5.2 Run `npm test` to verify all tests pass (12 passed)
- [ ] 5.3 Manual smoke test: `nuxtus create -c nonexistent` exits 1 with "Collection not found"
- [ ] 5.4 Manual smoke test: `nuxtus types -q` produces no banner
