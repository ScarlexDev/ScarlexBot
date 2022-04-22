const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('permissions')
		.setDescription('Permissions'),
	cooldown: 5000,
    permissions: ['ADMINISTRATOR'],
	async execute(interaction) {
        interaction.reply({
			content: 'Permissions check',
		});
	}
}
