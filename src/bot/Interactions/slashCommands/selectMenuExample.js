const { MessageSelectMenu, MessageActionRow } = require('discord.js')
const { SlashCommandBuilder } = require('@discordjs/builders')

//? Using Select Menus Example.
module.exports = {
    data: new SlashCommandBuilder()
        .setName('selecte')
        .setDescription('select menus.'),
    cooldown: 5000,
    async execute(interaction) {
        let selectMenu = new MessageSelectMenu()
            .setCustomId('select')
            .setPlaceholder('Nothing selected')
            .setMinValues(1)
            .setMaxValues(3)
			.addOptions([
                {
                    label: 'Option #1',
                    description: '#1',
                    value: 'first_option',
                    emoji: '1️⃣',
                },
                {
                    label: 'Option #2',
                    description: '#2',
                    value: 'second_option',
                    emoji: '2️⃣',
                }, {
                    label: 'Option #3',
                    description: '#3',
                    value: 'third_option',
                    emoji: '3️⃣',
                }, {
                    label: 'Option #4',
                    description: '#4',
                    value: 'fourth_option',
                    emoji: '4️⃣',
                },
            ])
        const row = new MessageActionRow().addComponents(selectMenu)
        interaction.reply({
            content: 'Select Menu',
            embeds: [],
            components: [row],
        })
    },
}
