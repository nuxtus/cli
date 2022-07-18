import Chalk from "chalk"
import Generator from "@nuxtus/generator"

export interface Command {
	(chalk: typeof Chalk, nuxtus?: Generator): Promise<void>
}
