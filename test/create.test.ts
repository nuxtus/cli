import { afterEach, expect, test } from "vitest"

import { createPage } from "@nuxtus/generator"
import fs from "node:fs"

afterEach(() => {
	fs.rmSync("pages", { recursive: true })
})

test("Create collection pages", async () => {
	fs.mkdirSync("pages")
	await createPage("test", false)
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
	await createPage("test2", true)
	expect(fs.existsSync("pages/test2/index.vue")).toBe(true)
	const indexPage = fs.readFileSync("pages/test2/index.vue")
	expect(indexPage.includes('collection: "test2"')).toBe(true)
	expect(
		indexPage.includes(` const { getSingletonItem } = useDirectusItems();`)
	).toBe(true)
})
