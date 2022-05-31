import { Chalk } from "chalk"
var fs = require("fs")
const path = require("path")
const nunjucks = require("nunjucks")

function createSingletonPage(pageName: string, chalk: Chalk): void {
	// TODO: Write this
	return
}

export function createPage(
	pageName: string,
	isSingleton: boolean,
	chalk: Chalk
): void {
	if (isSingleton) {
		return createSingletonPage(pageName, chalk)
	}
	console.log(chalk.green(`Creating pages for ${pageName}`))
	const pageFolder = path.join("pages", pageName)
	fs.mkdirSync(pageFolder, (err: Error) => {
		console.error(chalk.red(err.message))
		throw err
	})
	const indexFile = path.join(pageFolder, "index.vue")
	var env = nunjucks.configure("src/templates", {
		tags: {
			blockStart: "<%",
			blockEnd: "%>",
			variableStart: "{$",
			variableEnd: "$}",
			commentStart: "<#",
			commentEnd: "#>",
		},
	})
	const pageContent: string = nunjucks.render("listing.njk.vue", {
		collection: pageName,
	})
	fs.writeFileSync(indexFile, pageContent)
}
