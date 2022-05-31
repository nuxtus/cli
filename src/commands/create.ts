import { Chalk } from "chalk"
import { Command } from "../interfaces/command.interface"
import { Directus } from "@directus/sdk"
import { createPage } from "../generator"
import inquirer from "inquirer"
const {
	promises: { readdir },
} = require("fs")

type CollectionItem = {
	collection: string
	meta: {
		hidden: boolean
		singleton: boolean
	}
	schema: Object
}

const getDirectories = async (source: string) =>
	(await readdir(source, { withFileTypes: true }))
		.filter((dirent: any) => dirent.isDirectory())
		.map((dirent: any) => dirent.name)

let create: Command

export default create = async function (chalk: Chalk): Promise<void> {
	// Check it contains DIRECTUS_URL
	if (
		!process.env.hasOwnProperty("DIRECTUS_URL") ||
		process.env.DIRECTUS_URL === undefined
	) {
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
	const directus = new Directus(process.env.DIRECTUS_URL)
	const email = process.env.NUXT_PUBLIC_DIRECTUS_EMAIL || ""
	const password = process.env.NUXT_PUBLIC_DIRECTUS_PASSWORD || ""

	await directus.auth
		.login({ email, password })
		// .then(() => {
		// 	authenticated = true
		// })
		.catch(() => {
			console.log(
				chalk.red(
					"Cannot login to Directus. Check your .env file and that Directus is running."
				)
			)
		})

	const collectionData = await directus.collections.readAll()

	if (
		collectionData.data === null ||
		collectionData.data === undefined ||
		collectionData.data.length === 0
	) {
		console.log(chalk.red("No Directus collections found."))
		return
	}

	// Remove collections that already have pages created and default system collections
	const existingCollections: string[] = await getDirectories("pages")
	const filteredCollections = collectionData.data.filter((collection: any) => {
		return (
			!collection.collection.startsWith("directus_") &&
			!existingCollections.includes(collection.collection) &&
			!collection.meta.hidden
		)
	})
	const collections = filteredCollections.map((collection: any) => {
		return collection.collection
	})

	if (collections.length === 0) {
		console.log(chalk.yellow("No collections need to be created."))
		return
	}

	inquirer
		.prompt([
			{
				type: "checkbox",
				name: "collections",
				message: "Select Directus collections to create pages for",
				choices: collections,
			},
		])
		.then((answers) => {
			// Use user feedback for... whatever!!
			if (answers.collections.length === 0) {
				console.log(chalk.yellow("No collections selected."))
				return
			}
			answers.collections.forEach((collectionName: string) => {
				const collection = filteredCollections.find(
					(o: any) => o.collection === collectionName
				)
				createPage(collectionName, collection!.meta.singleton, chalk)
			})
		})
		.catch((error) => {
			if (error.isTtyError) {
				// Prompt couldn't be rendered in the current environment
				console.log(
					chalk.red("Prompt couldn't be rendered in the current environment")
				)
			} else {
				// Something else went wrong
				console.log(chalk.red("An unknown error occurred"))
			}
		})
}
