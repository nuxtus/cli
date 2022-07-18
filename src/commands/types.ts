import Chalk from "chalk"
import { Command } from "../interfaces/command.interface"
import Generator from "@nuxtus/generator"

const CLI = require("clui")
const Spinner = CLI.Spinner

const create: Command = async function (
	chalk: typeof Chalk,
	nuxtus?: Generator
): Promise<void> {
	if (nuxtus === undefined) nuxtus = new Generator()
	nuxtus.createTypes(chalk)
}

export default create
