#!/usr/bin/env node

import "dotenv/config"

import { Command } from "commander"
import chalk from "chalk"
import clear from "clear"
import create from "./commands/create.js"
import token from "./commands/token.js"
import figlet from "figlet"
import types from "./commands/types.js"
import pkg from "../package.json" assert {type: "json"}

const version = pkg.version
const program = new Command()

clear()
console.log(
	chalk.green(figlet.textSync("nuxtus-cli", { horizontalLayout: "full" }))
)
program
	.name("nuxtus")
	.version("v" + version)
	.description("Nuxtus CLI")

program
	.command("create")
	.description("Create pages based on Directus collection(s).")
	.action(() => create(chalk))

program
	.command("types")
	.description("Create type definitions from Directus collection(s).")
	.action(() => types(chalk))

program
	.command("token")
	.description("Create static token and use for authentication instead of email/password.")
	.action(() => token(chalk))

program.parse()