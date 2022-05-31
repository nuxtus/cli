import { Chalk } from "chalk"
var fs = require("fs")
const path = require("path")
const nunjucks = require("nunjucks")

function createSingletonPage(pageName: string, chalk: Chalk): void {
	const pageFolder = path.join("pages", pageName)
	fs.mkdirSync(pageFolder, (err: Error) => {
		console.error(chalk.red(err.message))
		throw err
	})
	const pageFile = path.join(pageFolder, `index.vue`)
	const indexContent: string = nunjucks.render("singleton.njk.vue", {
		collection: pageName,
	})
	fs.writeFileSync(pageFile, indexContent)
	return
}

export function createPage(
	pageName: string,
	isSingleton: boolean,
	chalk: Chalk
): void {
	nunjucks.configure("src/templates", {
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
	fs.mkdirSync(pageFolder, (err: Error) => {
		console.error(chalk.red(err.message))
		throw err
	})
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
