import * as CLI from "clui"

import { Item, ManyItems, PartialItem } from "@directus/sdk"

import { Command } from "../interfaces/command.interface"
import Generator from "@nuxtus/generator"
import chalk from "chalk"
import { existsSync } from "node:fs"
import inquirer from "inquirer"
import { readdir } from "node:fs/promises"

const Spinner = CLI.Spinner

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

export default create = async function (
	localChalk: typeof chalk,
	nuxtus?: Generator
): Promise<void> {
	try {
		if (nuxtus === undefined) nuxtus = new Generator(localChalk)
	} catch (err) {
		// Error will already be displayed by Generator, so just exit
		return
	}

	const collectionData: ManyItems<Item> = await nuxtus.getCollections()

	if (
		collectionData.data === null ||
		collectionData.data === undefined ||
		collectionData.data.length === 0
	) {
		console.warn(localChalk.yellow("No Directus collections found."))
		console.warn()
		return
	}

	// Remove collections that already have pages created and default system collections
	let existingCollections: string[] = []
	if (existsSync("pages")) {
		existingCollections = await getDirectories("pages")
	}
	const filteredCollections: PartialItem<CollectionItem>[] =
		collectionData.data.filter((collection: any) => {
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
