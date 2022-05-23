import { Chalk } from "chalk"
import { Command } from "../interfaces/command.interface"
import inquirer from "inquirer"

let create: Command

export default create = function (chalk: Chalk): void {
	// Check it contains DIRECTUS_URL
	if (!process.env.hasOwnProperty("DIRECTUS_URL")) {
		console.log(chalk.red("No .env file found."))
		console.log()
		console.log(
			chalk.bold("Please add a .env file with the following content:")
		)
		console.log("DIRECTUS_URL=https://example.com/api")
		console.log("DIRECTUS_TOKEN=123456789")
		console.log("NUXT_PUBLIC_DIRECTUS_EMAIL=admin@test.com")
		console.log("NUXT_PUBLIC_DIRECTUS_PASSWORD=password")
		return
	}

	// LOG IN AND RETRIEVE COLLECTIONS

	// Remove collections that already have pages created

	inquirer
		.prompt([
			{
				type: "checkbox",
				name: "collections",
				message: "Select Directus collections to create pages for",
				choices: ["Collection1", "Collection2"], // TODO: These will be dynamically retrieved from Directus
			},
		])
		.then((answers) => {
			// Use user feedback for... whatever!!
			console.log(answers)
		})
		.catch((error) => {
			if (error.isTtyError) {
				// Prompt couldn't be rendered in the current environment
				chalk.red("Prompt couldn't be rendered in the current environment")
			} else {
				// Something else went wrong
				chalk.red("An unknown error occurred")
			}
		})
}
