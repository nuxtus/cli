import inquirer from "inquirer"

export default () => {
	// TODO: Check there is a .env
	// Check it contains DIRECTUS_URL
	if (!process.env.hasOwnProperty("DIRECTUS_URL")) {
		console.log("Please add a .env file with the following content:")
		console.log("DIRECTUS_URL=https://example.com/api")
		console.log("DIRECTUS_TOKEN=123456789")
		return
	}

	// LOG IN AND RETRIEVE COLLECTIONS

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
