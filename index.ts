import { SCARLEX } from './src/structures/scarlex';
import {interactionCooldown} from './src/utils/interactions/interactionCooldown';
import config from './config';






const client = new SCARLEX();


client.spawn(config.token);
//client.manager.updateVoiceState(d)

client.on("interactionCreate", (interaction) => {
    if (interaction.isCommand() || interaction.isContextMenu()) slashInteraction(interaction, client)
    else if (interaction.isButton()) buttonInteraction(interaction, client)
    else if (interaction.isSelectMenu()) selectMenuInteraction(interaction, client)
	
})

client.on("raw", async (event) => {
	client.manager.updateVoiceState(event)
})

//! Slash Commands / Context Menus.
async function slashInteraction(interaction, scarlex: SCARLEX)  {
	const slashCommand: any = scarlex.slashCommands.get(interaction.commandName)
	 if (!slashCommand) {
	 	 interaction.reply({
	 		content: '`An error has occurred.`',
	 		ephemeral: true,
		})  
	} 
	//? Slash Command Permissions.
	// if (slashCommand.permissions && slashCommand.permissions.length) {
	// 	if (InteractionPerms(interaction, slashCommand)) {
	// 		return
	// 	}
	// }
	//? Slash Command Cooldown.
	// if (scarlex.slashCommand.cooldown) {
	// 	if (interactionCooldown(interaction, slashCommand, interaction.user.id, scarlex)) {
	// 		return
	// 	}
	// }
	//- Execute Slash Command.
	try {
		await slashCommand.execute(interaction, scarlex)
	} catch (error) {
		console.error(error)
		await interaction.reply({
			content: '`An error has occurred while executing this command.`',
			ephemeral: true,
		})
	}
}


//! Buttons.
async function buttonInteraction(interaction, scarlex: SCARLEX)  {
	const button: any =
		scarlex.buttons.get(interaction.customId) ||
		scarlex.buttons.find((button: any) => button.aliases && button.aliases.includes(interaction.customId))
	if (!button) {
		return interaction.reply({
			content: '`An error has occurred.`',
			ephemeral: true,
		})
	}
	//- Execute Button.
	try {
		await button.execute(interaction, scarlex)
	} catch (error) {
		console.error(error)
		await interaction.reply({
			content: '`An error has occurred while executing this command.`',
			ephemeral: true,
		})
	}
}

//! Select Menus.
async function selectMenuInteraction(interaction, scarlex: SCARLEX )  {
	const selectMenu: any = scarlex.selectMenus.get(interaction.customId)
	if (!selectMenu) {
		return interaction.reply({
			content: '`An error has occurred.`',
			ephemeral: true,
		})
	}
	try {
		await selectMenu.execute(interaction, scarlex)
	} catch (error) {
		console.error(error)
		await interaction.reply({
			content: '`An error has occurred while executing this command.`',
			ephemeral: true,
		})
	}

}

export default client;
//! context Menus.
// async function contextMenuInteraction(interaction, scarlex: SCARLEX )  {
// 	const messageContext: any = scarlex.messageContext.get(interaction.customId)
// 	if (!messageContext) {
// 		return interaction.reply({
// 			content: '`An error has occurred.`',
// 			ephemeral: true,
// 		})
// 	}
// 	try {
// 		await messageContext.execute(interaction, scarlex)
// 	} catch (error) {
// 		console.error(error)
// 		await interaction.reply({
// 			content: '`An error has occurred while executing this command.`',
// 			ephemeral: true,
// 		})
// 	}

// }