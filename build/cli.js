#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const chalk_1 = __importDefault(require("chalk"));
const clear_1 = __importDefault(require("clear"));
const figlet_1 = __importDefault(require("figlet"));
const program = new commander_1.Command();
(0, clear_1.default)();
console.log(chalk_1.default.green(figlet_1.default.textSync("nuxtus-cli", { horizontalLayout: "full" })));
program.name("Nuxtus").version("1.0.0").description("Contact Management System");
program
    .command("addContact")
    .alias("a")
    .description("Add a contact")
    .action(() => {
    console.log(chalk_1.default.yellow("=========*** Contact Management System ***=========="));
    // inquirer.prompt(questions).then((answers) => actions.addContact(answers))
});
program.parse();
