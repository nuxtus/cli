import * as CLI from "clui"

import { Command } from "../interfaces/command.interface"
import Generator from "@nuxtus/generator"
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
	allCollections: any[],
	filteredCollections: any[],
	existingCollections: string[],
	nuxtus: Generator,
	localChalk: typeof chalk
): Promise<void> {
	const allNames = allCollections.map((c: any) => c.collection)
	const notFound = collectionNames.filter(
		(name: string) => !allNames.includes(name)
	)
	if (notFound.length > 0) {
		throw new Error(`Collection(s) not found: ${notFound.join(", ")}`)
	}

	const filteredReasons: string[] = []
	for (const name of collectionNames) {
		if (name.startsWith("directus_")) {
			filteredReasons.push(`${name} (system collection)`)
		} else if (existingCollections.includes(name)) {
			filteredReasons.push(`${name} (page already exists)`)
		} else {
			const col = allCollections.find((c: any) => c.collection === name)
			if (col && col.meta?.hidden) {
				filteredReasons.push(`${name} (hidden collection)`)
			}
		}
	}
	if (filteredReasons.length > 0) {
		throw new Error(`Cannot create pages for: ${filteredReasons.join(", ")}`)
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
		throw new Error("Error creating page(s): " + err.message)
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
		throw err
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
		await createPages(requestedCollections, allCollections, filteredCollections, existingCollections, nuxtus, localChalk)
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
