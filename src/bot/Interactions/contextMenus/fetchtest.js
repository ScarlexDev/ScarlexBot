const { MessageEmbed } = require('discord.js')
const { ContextMenuCommandBuilder } = require('@discordjs/builders');

//? Message Context Menu Example Command.
module.exports = {
	data: new ContextMenuCommandBuilder()
		.setName('Fetch user ID')
		.setType(2),
	async execute(interaction, scarlex) {
		let user = await scarlex.users.fetch(interaction.targetId)
		const embed = new MessageEmbed()
			.setColor('PURPLE')
			.setDescription(`${user.username}'s user ID: \`${user.id}\``)
		interaction.user.send({ embeds: [embed], ephemeral: true })
		interaction.reply({ content: 'User ID sent.', ephemeral: true })
	},
}
