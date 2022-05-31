#!/usr/bin/env node

import "dotenv/config"

import { Command } from "commander"
import chalk from 'chalk'
import clear from 'clear'
import create from "./commands/create"
import figlet from "figlet"

const program = new Command()

clear()
console.log(
	chalk.green(figlet.textSync("nuxtus-cli", { horizontalLayout: "full" }))
)
program.name("nuxtus").version("1.0.0").description("Nuxtus boilerplate CLI")

program
	.command("create")
	.description("Create pages based on Directus collection(s).")
	.action(() => create(chalk))

program.parse()