import * as CLI from "clui"

import { Command } from "../interfaces/command.interface"
import Generator from "@resultcrafter/nuxtus-generator"
import chalk from "chalk"
import { existsSync } from "node:fs"
import inquirer from "inquirer"
import { readdir } from "node:fs/promises"

const Spinner = CLI.default.Spinner

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

async function createPages(
	collectionNames: string[],
	filteredCollections: any[],
	nuxtus: Generator,
	localChalk: typeof chalk
): Promise<void> {
	const notFound = collectionNames.filter(
		(name: string) => !filteredCollections.find((o: any) => o.collection === name)
	)
	if (notFound.length > 0) {
		console.error(localChalk.red(`Collection(s) not found: ${notFound.join(", ")}`))
		process.exit(1)
	}

	let spinner = new Spinner(`Creating pages from collections...`)
	spinner.start()
	await Promise.all(
		collectionNames.map(async (collectionName: string) => {
			const collection = filteredCollections.find(
				(o: any) => o.collection === collectionName
			)
			const singleton: boolean = collection!.meta?.singleton || false
			return nuxtus.createPage(collectionName, singleton)
		})
	).catch((err: any) => {
		spinner.stop()
		console.error(localChalk.red("Error creating page(s): " + err.message))
		process.exit(1)
	})
	spinner.stop()
	console.info(localChalk.green("✅ All collections created. Restart Nuxt to see them."))
}

let create: Command

export default create = async function (
	localChalk: typeof chalk,
	nuxtus?: Generator,
	requestedCollections?: string[]
): Promise<void> {
	try {
		if (nuxtus === undefined) nuxtus = new Generator(localChalk)
	} catch (err) {
		// Error will already be displayed by Generator, so just exit
		return
	}

	const collectionData: any = await nuxtus.getCollections()
	const allCollections = Array.isArray(collectionData)
		? collectionData
		: (collectionData.data || [])

	if (allCollections.length === 0) {
		console.warn(localChalk.yellow("No Directus collections found."))
		console.warn()
		return
	}

	// Remove collections that already have pages created and default system collections
	let existingCollections: string[] = []
	if (existsSync("pages")) {
		existingCollections = await getDirectories("pages")
	}
	const filteredCollections = allCollections.filter((collection: any) => {
		return (
			!collection.collection.startsWith("directus_") &&
			!existingCollections.includes(collection.collection) &&
			!collection.meta.hidden
		)
	})
	const collections = filteredCollections.map((collection: any) => {
		return collection.collection
	})

	if (requestedCollections && requestedCollections.length > 0) {
		await createPages(requestedCollections, filteredCollections, nuxtus, localChalk)
		return
	}

	if (collections.length === 0) {
		console.warn(localChalk.yellow("No collections need to be created."))
		console.warn()
		return
	}

	await inquirer
		.prompt([
			{
				type: "checkbox",
				name: "collections",
				message: "Select Directus collections to create pages for",
				choices: collections,
			},
		])
		.then((answers) => {
			console.info()
			if (answers.collections.length === 0) {
				console.warn(localChalk.yellow("No collections selected."))
				return
			}

			let spinner = new Spinner(`Creating pages from collections...`)
			spinner.start()
			Promise.all(
				answers.collections.map(async (collectionName: string) => {
					const collection = filteredCollections.find(
						(o: any) => o.collection === collectionName
					)
					const singleton: boolean = collection!.meta?.singleton || false
					return nuxtus.createPage(collectionName, singleton, localChalk)
				})
			).catch((err) => {
				console.error(localChalk.red("Error creating page(s): " + err.message)) // Oops!
			})
			spinner.stop()

			console.info()
			console.info(
				localChalk.green(
					"✅ All collections created. Restart Nuxt to see them."
				)
			)
		})
		.catch((error) => {
			if (error.isTtyError) {
				// Prompt couldn't be rendered in the current environment
				console.error(
					localChalk.red(
						"Prompt couldn't be rendered in the current environment"
					)
				)
			} else {
				// Something else went wrong
				console.error(localChalk.red("An unknown error occurred", error))
			}
		})

	console.info()
}
