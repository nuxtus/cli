## ADDED Requirements

### Requirement: Banner suppressed in non-interactive create mode
The figlet banner SHALL NOT be printed when `--collection` flag is provided.

#### Scenario: Non-interactive create with collection flag
- **WHEN** user runs `nuxtus create -c blogposts`
- **THEN** no figlet banner SHALL be printed to stdout
- **AND** only page creation output SHALL appear

### Requirement: Banner suppressed in quiet types mode
The figlet banner SHALL NOT be printed when `--quiet` flag is provided to the types command.

#### Scenario: Quiet types command
- **WHEN** user runs `nuxtus types -q`
- **THEN** no figlet banner SHALL be printed to stdout

### Requirement: No banner at CLI startup
The CLI SHALL NOT print any banner before command flags are parsed. Each command handler SHALL control its own banner display.

#### Scenario: Any CLI invocation before parse
- **WHEN** `nuxtus` process starts and module-level code executes
- **THEN** no `clear()` or `figlet.textSync()` calls SHALL execute
- **AND** banner display SHALL wait until the matched command handler runs

### Requirement: Meaningful error for filtered collections
The `--collection` flag SHALL distinguish between collections that don't exist and collections that are filtered out (hidden, system, or already have pages).

#### Scenario: Collection is a system collection
- **WHEN** user runs `nuxtus create -c directus_users`
- **THEN** the error SHALL state that `directus_users` is a system collection, NOT "not found"

#### Scenario: Collection already has a page
- **WHEN** user runs `nuxtus create -c blogposts` and `pages/blogposts/` already exists
- **THEN** the error SHALL state that a page for `blogposts` already exists, NOT "not found"

#### Scenario: Collection is hidden
- **WHEN** user runs `nuxtus create -c hidden_col` and `hidden_col` has `meta.hidden: true`
- **THEN** the error SHALL state that `hidden_col` is hidden, NOT "not found"

#### Scenario: Collection genuinely does not exist
- **WHEN** user runs `nuxtus create -c nonexistent`
- **THEN** the error SHALL state "Collection not found: nonexistent"
