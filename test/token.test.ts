import { afterAll, afterEach, expect, test, vi } from "vitest"

import Generator from "@nuxtus/generator"
import chalk from "chalk"
import fs from "node:fs"
import token from "../src/commands/token"

const directusToken = '12345ABCD'

vi.mock("@nuxtus/generator", () => {
	return {
		default: vi.fn().mockImplementation(() => {
			return {
				generateStaticToken: vi.fn().mockImplementation(() => {
					return {
						data: {
							token: directusToken
						}
					}
				}),
			}
		}),
	}
})

afterAll(() => {
	if (fs.existsSync(".env")) {
		fs.rmSync(".env")
	}
	if (fs.existsSync("nuxt.config.ts")) {
		fs.rmSync("nuxt.config.ts")
	}
})

afterEach(async () => {
	await vi.clearAllMocks()
})

test("Implements token", async () => {
	const nuxtus = new Generator()
	// Create a temporary .env file
	fs.writeFileSync(".env", `# Nuxt directus required values
DIRECTUS_URL=http://localhost:8055
# Nuxtus values
NUXT_PUBLIC_DIRECTUS_EMAIL=admin@example.com
NUXT_PUBLIC_DIRECTUS_PASSWORD=password`)
	// Create a temporary nuxt.config.ts
	fs.writeFileSync("nuxt.config.ts", `import { defineNuxtConfig } from 'nuxt'
export default defineNuxtConfig({
	directus: {},
})`)
	// Get a new token
	await token(chalk, nuxtus)
	// Check token is set in .env file
	const env = fs.readFileSync(".env", "utf8")
	await expect(env).toContain(`NUXT_PUBLIC_DIRECTUS_TOKEN=${directusToken}`)
	// Check nuxt config contains token
	const config = fs.readFileSync("nuxt.config.ts", "utf8")
	console.log(config)
	// await expect(config).toContain(`token: "${directusToken}"`)
	await expect(config).toContain(`token: process.env.NUXT_PUBLIC_DIRECTUS_TOKEN`)
})