import { afterEach, beforeAll, expect, test, vi } from "vitest"

import Generator from "@nuxtus/generator"
import fs from "node:fs"

// TODO: Re-write this to reflect type.ts


let nuxtus: Generator

beforeAll(() => {
	process.env = {
		DIRECTUS_URL: "https://example.com/api",
	}

	vi.mock("@directus/sdk", () => {
		const Directus = vi.fn()
		Directus.prototype.auth = {
			login: vi.fn().mockImplementation(() => {
				return {
					expires: Date.now() + 100000,
				}
			}),
		}

		return { Directus }
	})

	nuxtus = new Generator()
})

afterEach(() => {
	fs.rmSync("pages", { recursive: true })
})

test("Create collection pages", async () => {
	fs.mkdirSync("pages")
	await nuxtus.createPage("test", false)
	expect(fs.existsSync("pages/test")).toBe(true)
	expect(fs.existsSync("pages/test/index.vue")).toBe(true)
	const indexPage = fs.readFileSync("pages/test/index.vue")
	expect(indexPage.includes('collection: "test",')).toBe(true)
	expect(indexPage.includes(`const { getItems } = useDirectusItems();`)).toBe(
		true
	)
	const individualPage = fs.readFileSync("pages/test/[id].vue")
	expect(individualPage.includes('collection: "test",')).toBe(true)
	expect(
		individualPage.includes("const { getItemById } = useDirectusItems()")
	).toBe(true)
})

test("Create singleton page", async () => {
	fs.mkdirSync("pages")
	await nuxtus.createPage("test2", true)
	expect(fs.existsSync("pages/test2/index.vue")).toBe(true)
	const indexPage = fs.readFileSync("pages/test2/index.vue")
	expect(indexPage.includes('collection: "test2"')).toBe(true)
	expect(
		indexPage.includes(` const { getSingletonItem } = useDirectusItems();`)
	).toBe(true)
})
