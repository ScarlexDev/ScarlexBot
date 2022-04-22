import { Message , MessageEmbed, MessageButton, MessageActionRow, MessageSelectMenu } from 'discord.js';
import { SCARLEX } from '../../../structures/scarlex';
import replaceWithEmoji from '../../../utils/replaceWithEmoji';




export default {
	name: 'stats',
	description: 'shows BLAIRS stats',
	cooldown: 5,
	aliases: ['t'],
	execute: async(scarlex: SCARLEX, message: Message, args: string[], cmd: string): Promise<void> =>{
		

        // bot stats
        const { MessageEmbed } = require('discord.js')
        
        const mainEmbed = new MessageEmbed()
            .setTitle(`${message.guild.name} Info`)

        .addField(`**${replaceWithEmoji('features', scarlex.customEmojis)}\` Description\`**`, `\n**─>** ${message.guild.description}`, false)

        .addField(`${replaceWithEmoji('features', scarlex.customEmojis)}\` Creation Date\``, `**›** *<t:${Math.round(message.guild.createdTimestamp / 1000)}:R>*`, true)

        .addField(`**${replaceWithEmoji('features', scarlex.customEmojis)}\` Server & Roles\`**`, `**›** \`${message.guild.name}\`\n**›** \`${message.guild.id}\`\n**›** \`${message.guild.roles.cache.size}\` `, true)
            .addField(`**${replaceWithEmoji('features', scarlex.customEmojis)}\` Owner\`**`, `**›** \`${message.guild.ownerId}\`\n**›** \`${message.guild.members.cache.get(message.guild.ownerId).user.tag}\``, true)

        .setColor('#303434')




        const row = new MessageActionRow()
            .addComponents(
                new MessageSelectMenu()
                .setCustomId('select')
                .setPlaceholder('❕ ; Select Category')

                .addOptions([{
                        label: '・Channels',
                        description: '— ⁞ Information regarding channel(s)',
                        value: 'first_option',
                        emoji: '<:Channel:826828612832329738>'
                    },
                    {
                        label: '・Other',
                        description: '— ⁞ Information regarding everything else',
                        value: 'second_option',
                        emoji: `${replaceWithEmoji('features' , scarlex.customEmojis)}`
                    },
                    {
                        label: '・Close Menu',
                        description: '— ⁞ Disable Interactions',
                        value: 'close_option',
                        emoji: `${replaceWithEmoji('off' , scarlex.customEmojis)}`
                    }
                ])
            )


        const msg = await message.reply({ content: null, embeds: [mainEmbed], components: [row], allowedMentions: { repliedUser: true } }).then(async(msg) => {

            // const filter = (interaction) => interaction.message.id === msg.id;
            const filter = async(interaction) => {
                return interaction.user.id !== message.author.id

            }
            const collector = msg.createMessageComponentCollector({ filter, componentType: "SELECT_MENU", time: 20000 });
            collector.on('collect', async i => {
				console.log(i)
                const roleEmbed = new MessageEmbed()
                    .setTitle(`${i.guild.name} Info`)

                .addField(`**${replaceWithEmoji('features', scarlex.customEmojis)}\` Channels\`**`, `\n**›** ${i.guild.channels.cache.size}`, false)

                .addField(`${replaceWithEmoji('features', scarlex.customEmojis)}\` Category\``, `**›** \`${i.guild.channels.cache.filter(c => c.type === 'GUILD_CATEGORY').size}\``, true)

                .addField(`**${replaceWithEmoji('features', scarlex.customEmojis)}\` Text\`**`, `**›** \`${i.guild.channels.cache.filter(c => c.type === 'GUILD_TEXT').size}\` `, true)
                    .addField(`**${replaceWithEmoji('features', scarlex.customEmojis)}\` Voice\`**`, `**›** \`${i.guild.channels.cache.filter(c => c.type === 'GUILD_VOICE').size}\` `, true)

                .setColor('#303434')

                if (i.values[0] === 'first_option') {
                    await i.update({
                        content: " ",
                        embeds: [roleEmbed],
                        allowedMentions: { repliedUser: true },
                    }).catch((err) => null)

                }
                if (i.values[0] === 'second_option') {
                    await i.update({
                        content: "nothing atm",
                        allowedMentions: { repliedUser: true },
                    }).catch((err) => null)

                }
                if (i.values[0] === 'close_option') {
                    await i.update({
                        content: "closed",
                        embeds: [],
                        components: [],
                        allowedMentions: { repliedUser: true },
                    }).catch((err) => null)

                }


            });
            collector.on('end', collected => {
                //console.log(collected)
                msg.edit({ content: '*Message Inactive*', embeds: [mainEmbed], components: [], allowedMentions: { repliedUser: true } }).catch((err) => null)
            });

        })

	},
};
