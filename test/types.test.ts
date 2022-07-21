import { beforeAll, expect, test, vi } from "vitest"

import Generator from "@nuxtus/generator"
import chalk from "chalk"
import create from "../src/commands/types"

let nuxtus: Generator

beforeAll(() => {
	process.env = {
		DIRECTUS_URL: "https://example.com/api",
	}

	vi.mock("@nuxtus/generator", () => {
		return {
			default: vi.fn().mockImplementation(() => {
				return { createTypes: vi.fn() }
			}),
		}
	})

	nuxtus = new Generator()
})

test("Create types", async () => {
	await create(chalk, nuxtus)
	expect(nuxtus.createTypes).toHaveBeenCalledTimes(1)
})
