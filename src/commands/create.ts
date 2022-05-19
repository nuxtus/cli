import inquirer from "inquirer"

export default () => {
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
			} else {
				// Something else went wrong
			}
		})
}
