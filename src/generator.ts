import * as fs from "fs"
import * as nunjucks from "nunjucks"
import * as path from "path"

import { Chalk } from "chalk"

function createSingletonPage(
	pageName: string,
	chalk: Chalk | undefined = undefined
): void {
	const pageFolder = path.join("pages", pageName)
	try {
		fs.mkdirSync(pageFolder)
	} catch (err: any) {
		showError(err.message, chalk)
		throw err
	}
	const pageFile = path.join(pageFolder, `index.vue`)
	const indexContent: string = nunjucks.render("singleton.njk.vue", {
		collection: pageName,
	})
	fs.writeFileSync(pageFile, indexContent)
	return
}

function showError(error: string, chalk: Chalk | undefined = undefined): void {
	if (chalk) {
		console.error(chalk.red(error))
		return
	}
	console.error(error)
}

export function createPage(
	pageName: string,
	isSingleton: boolean,
	chalk: Chalk | undefined = undefined
): void {
	nunjucks.configure(path.join(__dirname, "src/templates"), {
		tags: {
			blockStart: "<%",
			blockEnd: "%>",
			variableStart: "{$",
			variableEnd: "$}",
			commentStart: "<#",
			commentEnd: "#>",
		},
	})
	if (isSingleton) {
		return createSingletonPage(pageName, chalk)
	}
	const pageFolder = path.join("pages", pageName)
	try {
		fs.mkdirSync(pageFolder)
	} catch (err: any) {
		showError(err.message, chalk)
		throw err
	}

	const indexFile = path.join(pageFolder, "index.vue")
	const individualFile = path.join(pageFolder, "[id].vue")
	const indexContent: string = nunjucks.render("index.njk.vue", {
		collection: pageName,
	})
	fs.writeFileSync(indexFile, indexContent)
	const itemContent: string = nunjucks.render("individual.njk.vue", {
		collection: pageName,
	})
	fs.writeFileSync(individualFile, itemContent)
}
