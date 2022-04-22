



import { Message } from 'discord.js';
import { SCARLEX } from '../../../structures/scarlex';
import replaceWithEmoji from '../../../utils/replaceWithEmoji';
import GuildSettingsModel from '../../../models/settings';



export default {
	name: 'prefix',
	description: 'a ping command lol',
	cooldown: 5,
	aliases: ['t'],
	execute: async(scarlex: SCARLEX, message: Message, args: string[], cmd: string): Promise<void> =>{


        const { MessageEmbed } = require('discord.js')

        try {
        if (message.author.id === '459025800633647116') {
        const storedSettings = await GuildSettingsModel.findOne({ guildID: message.guild.id });

        let oldPrefix = storedSettings.prefix
        if (!args[0]) {


            const embd = new MessageEmbed()
                .setTitle(`${message.guild.name} ; Prefix`)
                .setDescription(`**› __MANAGE_GUILD__ permissions are needed to change prefix**\n **› You also can use dashboard for faster managment** `)
                .addField(`Current Prefix`,
                    `> \`${storedSettings.prefix}\``)
                .setColor('#303434')
             message.reply({ content: " ", embeds: [embd] })
        }

        if (args.length > 3) {

            const err = new MessageEmbed()
                .setTitle(`${message.author.tag}`)
                .setDescription(`**› Prefixes can't be longer than 5 characters** `)
                .addField(`Current Prefix`,
                    `> \`${storedSettings.prefix}\``)
                .setColor('#0a0a0a')
             message.reply({ content: " ", embeds: [err] })

        } else {

            storedSettings.prefix = args.join(" ")
            await storedSettings.save().catch((e) => {
                console.log(e);
              });
            const pain = new MessageEmbed()
                .setTitle(`${message.author.tag}`)
                .addField(`New Prefix`, `> \`\`\`${args.join(" ")}\`\`\``)
                .addField(`Old PRefix`, `> \`\`\`${oldPrefix}\`\`\``, true)
                .setColor("#6400ff")

             message.reply({ content: " " , embeds: [pain] })
        }

    } else {
        return;
    }
        } catch (e) {
            console.log(e);
        }
    },
};