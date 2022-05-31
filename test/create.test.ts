import { afterAll, assert, expect, test, vi } from "vitest"

import chalk from "chalk"
import { createPage } from "../src/generator"

// import inquirer from "inquirer" // https://stackoverflow.com/questions/49862039/how-to-write-unit-tests-for-inquirer-js

const path = require("path")
const fs = require("fs")

afterAll(() => {
	const pageFolder = path.join("pages", "test")
	fs.rmdirSync(pageFolder, { recursive: true }, (err) => {
		if (err) {
			throw err
		}
	})
})

test("Create collection pages", () => {
	// vi.mock("inquirer")
	// inquirer.prompt = vi.fn().mockResolvedValue({ email: "some@example.com" })
	createPage("test", false, chalk)
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

test("Create singleton page", () => {
	createPage("test", true, chalk)
	expect(fs.existsSync("pages/test.vue")).toBe(true)
	const indexPage = fs.readFileSync("pages/test.vue")
	expect(indexPage.includes('collection: "test"')).toBe(true)
	expect(
		indexPage.includes(` const { getSingletonItem } = useDirectusItems();`)
	).toBe(true)
})
