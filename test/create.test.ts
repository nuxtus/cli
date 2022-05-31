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

test("create collection", () => {
	// vi.mock("inquirer")
	// inquirer.prompt = vi.fn().mockResolvedValue({ email: "some@example.com" })
	createPage("test", false, chalk)
	expect(fs.existsSync("pages/test")).toBe(true)
	expect(fs.existsSync("pages/test/index.vue")).toBe(true)
	const data = fs.readFileSync("pages/test/index.vue", {
		encoding: "utf8",
		flag: "r",
	})
	expect(data.includes('collection: "test",')).toBe(true)
})
