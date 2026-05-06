import { afterAll, afterEach, expect, test, vi } from "vitest"

import Generator from "@nuxtus/generator"
import chalk from "chalk"
import create from "../src/commands/create"
import fs from "node:fs"

vi.mock("@nuxtus/generator", () => {
	return {
		default: vi.fn().mockImplementation(function () {
			return {
				createPage: vi.fn(),
				getCollections: vi.fn(),
			}
		}),
	}
})

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

test("Non-interactive --collection creates pages", async () => {
	const nuxtus = new Generator()
	nuxtus.getCollections.mockImplementation(() => ({
		data: [
			{ collection: "blogposts", meta: { hidden: false, singleton: false } },
			{ collection: "authors", meta: { hidden: false, singleton: false } },
		],
	}))
	await create(chalk, nuxtus, ["blogposts"])
	expect(nuxtus.createPage).toBeCalledTimes(1)
	expect(nuxtus.createPage).toBeCalledWith("blogposts", false)
})

test("SDK v21 flat-array response shape", async () => {
	const nuxtus = new Generator()
	nuxtus.getCollections.mockImplementation(() => [
		{ collection: "blogposts", meta: { hidden: false, singleton: false } },
	])
	await create(chalk, nuxtus, ["blogposts"])
	expect(nuxtus.createPage).toBeCalledTimes(1)
})

test("Non-existent collection throws", async () => {
	const nuxtus = new Generator()
	nuxtus.getCollections.mockImplementation(() => ({
		data: [
			{ collection: "blogposts", meta: { hidden: false, singleton: false } },
		],
	}))
	await expect(create(chalk, nuxtus, ["nonexistent"])).rejects.toThrow(
		"Collection(s) not found: nonexistent"
	)
})

test("System collection reports specific reason", async () => {
	const nuxtus = new Generator()
	nuxtus.getCollections.mockImplementation(() => ({
		data: [
			{ collection: "directus_users", meta: { hidden: false } },
		],
	}))
	await expect(create(chalk, nuxtus, ["directus_users"])).rejects.toThrow(
		"system collection"
	)
})

test("Hidden collection reports specific reason", async () => {
	const nuxtus = new Generator()
	nuxtus.getCollections.mockImplementation(() => ({
		data: [
			{ collection: "hidden_col", meta: { hidden: true } },
		],
	}))
	await expect(create(chalk, nuxtus, ["hidden_col"])).rejects.toThrow(
		"hidden collection"
	)
})

test("Existing page reports specific reason", async () => {
	fs.mkdirSync("pages", { recursive: true })
	fs.mkdirSync("pages/existing_page")
	const nuxtus = new Generator()
	nuxtus.getCollections.mockImplementation(() => ({
		data: [
			{ collection: "existing_page", meta: { hidden: false, singleton: false } },
		],
	}))
	await expect(create(chalk, nuxtus, ["existing_page"])).rejects.toThrow(
		"page already exists"
	)
	fs.rmSync("pages", { recursive: true })
})
