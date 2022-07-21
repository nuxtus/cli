import { afterAll, afterEach, expect, test, vi } from "vitest"

import Generator from "@nuxtus/generator"
import chalk from "chalk"
import create from "../src/commands/create"
import fs from "node:fs"

vi.mock("@nuxtus/generator", () => {
	return {
		default: vi.fn().mockImplementation(() => {
			return {
				createPage: vi.fn(),
				getCollections: vi.fn(),
			}
		}),
	}
})

afterAll(() => {
	if (fs.existsSync("pages")) {
		fs.rmSync("pages", { recursive: true })
	}
})

afterEach(async () => {
	await vi.clearAllMocks()
})

test("No collections to create", async () => {
	const nuxtus = new Generator()
	nuxtus.getCollections.mockImplementation(() => {
		return {
			createPage: vi.fn(),
			getCollections: vi.fn().mockImplementation(() => {
				return {
					data: null,
				}
			}),
		}
	})

	await create(chalk, nuxtus)
	await expect(nuxtus.getCollections).toBeCalledTimes(1)
	await expect(nuxtus.createPage).toBeCalledTimes(0)
})

test("Create collection pages", async () => {
	vi.mock("inquirer", () => {
		return {
			default: {
				prompt: vi.fn().mockImplementation(() => {
					return Promise.resolve({
						collections: ["collection_created", "collection_created3"],
					})
				}),
			},
		}
	})
	fs.mkdirSync("pages")
	fs.mkdirSync("pages/exists")

	let nuxtus = new Generator()
	nuxtus.getCollections.mockImplementation(() => {
		return {
			data: [
				{
					collection: "directus_ignored",
					meta: {
						hidden: false,
					},
				},
				{
					collection: "should_be_ignored",
					meta: {
						hidden: true,
					},
				},
				{
					collection: "exists",
					meta: {
						hidden: false,
						singleton: false,
					},
				},
				{
					collection: "collection_created",
					meta: {
						hidden: false,
						singleton: false,
					},
				},
				{
					collection: "collection_created2",
					meta: {
						hidden: false,
						singleton: false,
					},
				},
				{
					collection: "collection_created3",
					meta: {
						hidden: false,
						singleton: false,
					},
				},
			],
		}
	})
	await create(chalk, nuxtus)
	expect(nuxtus.getCollections).toBeCalledTimes(1)
	expect(nuxtus.createPage).toBeCalledTimes(2)
})
