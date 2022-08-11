import * as CLI from "clui"

import Chalk from "chalk"
import { Command } from "../interfaces/command.interface"
import Generator from "@nuxtus/generator"

const Spinner = CLI.Spinner

const create: Command = async function (
	chalk: typeof Chalk,
	nuxtus?: Generator
): Promise<void> {
	try {
		if (nuxtus === undefined) nuxtus = new Generator(chalk)
	} catch (err) {
		// Error will already be displayed by Generator, so just exit
		return
	}
	nuxtus.createTypes(chalk)
}

export default create
