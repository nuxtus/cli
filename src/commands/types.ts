import Chalk from "chalk"
import Generator from "@nuxtus/generator"

const CLI = require("clui")
const Spinner = CLI.Spinner

const create = async function (
	chalk: typeof Chalk,
	nuxtus?: Generator
): Promise<void> {
	if (nuxtus === undefined) nuxtus = new Generator()
	nuxtus.createTypes(chalk)
}

export default create
