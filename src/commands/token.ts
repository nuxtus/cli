import * as CLI from "clui"

import { existsSync, readFileSync, writeFileSync } from "fs"

import Chalk from "chalk"
import { Command } from "../interfaces/command.interface"
import Generator from "@nuxtus/generator"
import path from "path"

const token: Command = async function (
	chalk: typeof Chalk,
	nuxtus?: Generator
): Promise<void> {
	try {
		if (nuxtus === undefined) nuxtus = new Generator(chalk)
	} catch (err) {
		// Error will already be displayed by Generator, so just exit
		return
	}
	let data;
	try {
		data = await nuxtus.generateStaticToken()
	} catch (err) {
		throw new Error(`Unable to save token to Directus. ${err}`)
	}
	
	// add the token to nuxt.config.ts
	const configFile = path.join(process.cwd(), "nuxt.config.ts")
	const envFile = path.join(process.cwd(), ".env")
	if (!existsSync(configFile)) {
		throw new Error("Unable to locate nuxt.config.ts");
	}
	// NOTE: Parsing as string for now, might be a better way
	let configString = readFileSync(configFile, "utf8")
	if (configString.indexOf(`directus: {\n\t\ttoken:`)===-1) {
		configString = configString.replace('directus: {', `directus: {\n\t\ttoken: process.env.NUXT_PUBLIC_DIRECTUS_TOKEN\n\t`)
		// Write the config back to a file
		writeFileSync(configFile, configString)
	} else {
		console.warn(chalk.yellow("Directus token already exists in nuxt.config.ts, skipping (this is only an issue if not using .env variable)."))
	}
	

	if (!existsSync(envFile)) {
		throw new Error("Unable to locate ,env");
	}
	// Remove directus email/password from client/.env and add NUXT_PUBLIC_DIRECTUS_TOKEN
	const envString = readFileSync(envFile, "utf8")
	const envArray: String[] = envString.split("\n")
	const newEnvArray = envArray.filter((line) => {
		return !line.startsWith('NUXT_PUBLIC_DIRECTUS_EMAIL') && !line.startsWith('NUXT_PUBLIC_DIRECTUS_PASSWORD') && !line.startsWith('NUXT_PUBLIC_DIRECTUS_TOKEN')
	})
	newEnvArray.push(`NUXT_PUBLIC_DIRECTUS_TOKEN=${data.token}`)
	writeFileSync(envFile, newEnvArray.join("\n"))
	console.log(chalk.green("Directus token generated and activated."))
	return
	
}

export default token
