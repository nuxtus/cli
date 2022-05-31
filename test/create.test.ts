import { afterAll, assert, expect, test, vi } from "vitest"

import chalk from "chalk"
import { createPage } from "../src/generator"

// import inquirer from "inquirer"

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
})
