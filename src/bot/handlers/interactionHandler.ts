require('dotenv').config()
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

import config from '../../../config';

import fs from 'fs';
import path from 'path';
import { readdirSync } from 'fs';
import { readdir } from 'fs';
import util from 'util';







export default (client: any) => {
	let commandArray: any[] = []
	// slash cmds
	const slashfiles: any = readdirSync(path.resolve(__dirname, '../Interactions/slashCommands'));

	for (const file of slashfiles) {
		const slashCommand = require(`../Interactions/slashCommands/${file}`)
		client.slashCommands.set(slashCommand.data.name, slashCommand)
		commandArray.push(slashCommand.data.toJSON())
	}
	//Context Menu 
	const contFiles: any = readdirSync(path.resolve(__dirname, '../Interactions/contextMenus'));

	for (const file of contFiles) {
		const contextCommand = require(`../Interactions/contextMenus/${file}`)
		client.slashCommands.set(contextCommand.data.name, contextCommand)
		commandArray.push(contextCommand.data.toJSON())
	}
	// Buttons
	const buttonFiles: any = readdirSync(path.resolve(__dirname, '../Interactions/buttons'));

	for (const file of buttonFiles) {
		const buttonCommand = require(`../Interactions/buttons/${file}`)
		client.buttons.set(buttonCommand.name, buttonCommand)
		//commandArray.push(buttonCommand)
	}

	// Select Menus
	const selectMenus: any = readdirSync(path.resolve(__dirname, '../Interactions/selectMenus'));

	for (const file of selectMenus) {
		const selectMenuCommand = require(`../Interactions/selectMenus/${file}`)
		client.selectMenus.set(selectMenuCommand.name, selectMenuCommand)
		commandArray.push(selectMenuCommand)
	}



	const rest = new REST({ version: '9' }).setToken(config.token);
	(async () => {
		try {
			await rest.put(
				Routes.applicationGuildCommands(config.id, '849268110237630495'),
				{ body: commandArray },
			);
			// Global slash commands.
			// await rest.put(
			// 	Routes.applicationCommands(clientID),
			// 	{ body: commandArray },
			// );
		} catch (error) {
			console.log(error);
		}
	})();
}





// //! Select Menus Files.
// const selectMenuFiles = getFiles('./interactions/selectMenus')
// for (const selectMenu of selectMenuFiles) {
// 	let selectMenuFile = require(selectMenu)
// 	client.selectMenus.set(selectMenuFile.name, selectMenuFile)
// 	console.log(`[SelectMenus] ${selectMenuFile.name} has been loaded.`)
// }