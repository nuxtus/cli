#!/usr/bin/env node

import "dotenv/config"

import { Command } from "commander"
import chalk from "chalk"
import clear from "clear"
import create from "./commands/create.js"
import token from "./commands/token.js"
import figlet from "figlet"
import types from "./commands/types.js"
import pkg from "../package.json" assert { type: "json" }

const version = pkg.version
const program = new Command()

const currentNodeVersion = process.versions.node
const semver = currentNodeVersion.split(".")
const major = Number(semver[0])

if (major < 16) {
	console.error(
		chalk.red(
			"You are running Node " +
				currentNodeVersion +
				".\n" +
				"Nuxtus CLI requires Node 16 or higher. \n" +
				"Please update your version of Node."
		)
	)
	process.exit(1)
}

clear()
console.info(
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
	.description(
		"Create static token and use for authentication instead of email/password."
	)
	.action(() => token(chalk))

program.parse()
