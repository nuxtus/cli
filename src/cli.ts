#!/usr/bin/env node

import { Command } from "commander"
import chalk from 'chalk'
import clear from 'clear'
import figlet from 'figlet'

const program = new Command()

clear()
console.log(
	chalk.green(figlet.textSync("nuxtus-cli", { horizontalLayout: "full" }))
)
program.name("Nuxtus").version("1.0.0").description("Nuxtus boilerplate CLI")

program
	.command("addContact")
	.alias("a")
	.description("Add a contact")
	.action(() => {
		console.log(
			chalk.yellow("=========*** Contact Management System ***==========")
		)
		// inquirer.prompt(questions).then((answers) => actions.addContact(answers))
	})

program.parse()