module.exports = {
	name: 'e1',
	async execute(interaction) {
		if (interaction.customId == 'e1') {
            const { user , member , guild , channelId , targetId} = interaction;
            if(user.id !== '459025800633647116') return interaction.reply({ content: 'dev only <3', ephemeral: true });
            await interaction.message.delete()
		}
	},
}
