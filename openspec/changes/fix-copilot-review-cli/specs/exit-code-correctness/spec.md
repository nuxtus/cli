## ADDED Requirements

### Requirement: Commands exit 1 on Generator construction failure
All CLI commands SHALL exit with code 1 when the Generator constructor throws, rather than exiting 0.

#### Scenario: create command with bad Generator config
- **WHEN** `new Generator(chalk)` throws during `nuxtus create -c blogposts`
- **THEN** the process SHALL exit with code 1

#### Scenario: types command with bad Generator config
- **WHEN** `new Generator(chalk)` throws during `nuxtus types`
- **THEN** the process SHALL exit with code 1

#### Scenario: token command with bad Generator config
- **WHEN** `new Generator(chalk)` throws during `nuxtus token`
- **THEN** the process SHALL exit with code 1

### Requirement: Token command exits 1 on Directus registration failure
The `token` command SHALL exit with code 1 when `generateStaticToken()` throws, and SHALL NOT modify `.env` or `nuxt.config.ts`.

#### Scenario: Directus API unreachable during token generation
- **WHEN** `generateStaticToken()` throws a network error
- **THEN** the process SHALL exit with code 1
- **AND** `.env` SHALL NOT be modified
- **AND** `nuxt.config.ts` SHALL NOT be modified

#### Scenario: Directus refuses token registration
- **WHEN** `generateStaticToken()` throws a permission error
- **THEN** the process SHALL exit with code 1
- **AND** an error message SHALL be printed to stderr

### Requirement: Create command exits 1 on page creation failure
The `create` command SHALL exit with code 1 when `createPage()` throws during non-interactive mode.

#### Scenario: Non-interactive create fails for a collection
- **WHEN** `nuxtus createPage()` throws during `nuxtus create -c blogposts`
- **THEN** the process SHALL exit with code 1
- **AND** an error message SHALL be printed to stderr
