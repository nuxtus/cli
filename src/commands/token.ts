import * as CLI from "clui"

import { existsSync, writeFileSync } from "fs"

import Chalk from "chalk"
import { Command } from "../interfaces/command.interface"
import Generator from "@nuxtus/generator"
import path from "path"

const Spinner = CLI.Spinner

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
	const user = nuxtus.generateStaticToken()
	// add the token to nuxt.config.ts
	const configFile = path.join(process.cwd(), "nuxt.config.ts")
	if (existsSync(configFile)) {
		const { default: defineNuxtConfig } = await import(configFile);
		defineNuxtConfig.directus['token'] = user.token
		// Write the config back to a file
		writeFileSync(configFile, JSON.stringify(defineNuxtConfig, null, 2))
		// TODO: Remove directus email/password from .env
		return
	}
	
	throw new Error("Unable to locate nuxt.config.ts");
}

export default token
