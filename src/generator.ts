import { Chalk } from "chalk"
var fs = require("fs")
const path = require("path")

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
}
