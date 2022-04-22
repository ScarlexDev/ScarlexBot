const { MessageEmbed } = require('discord.js')
const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Slash command ping'),
	cooldown: 5000,
	async execute(interaction) {
		const embed = new MessageEmbed().setColor('PURPLE').setDescription('`ping...`')
		const loadingMessage = await interaction.reply({ embeds: [embed], fetchReply: true })
		embed.setDescription(' Pong! ' + `\`${loadingMessage.createdTimestamp - interaction.createdTimestamp}ms\``)
		interaction.editReply({ embeds: [embed] })
	}
}
