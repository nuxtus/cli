import { Chalk } from "chalk"

export interface Command {
	(chalk: Chalk): void
}
