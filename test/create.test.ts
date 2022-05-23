import { assert, expect, test, vi } from "vitest"

import chalk from "chalk"
import create from "../src/commands/create"
import inquirer from "inquirer"

test("create collection", () => {
	vi.mock("inquirer")
	// inquirer.prompt = vi.fn().mockResolvedValue({ email: "some@example.com" })
	create(chalk)
	assert(true)
})
