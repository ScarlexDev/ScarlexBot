
import { Message } from 'discord.js';
import { SCARLEX } from '../../../structures/scarlex';
import expireButton from '../../../utils/expireButton';




export default {
	name: 'eval',
	description: 'a eval command',
	cooldown: 0,
	aliases: ['e'],
	execute: async(scarlex: SCARLEX, message: Message, args: string[], cmd: string): Promise<void> =>{
		

        
        const {MessageAttachment } = require('discord.js')


        //const db = scarlex.db;
        const Discord = require("discord.js");
        const fs = require("fs");

        let cont = args.join(" ").split("--d")[0];
        const depth = Number(args.join(" ").split("--d")[1]) || 0;

        function clean(text) {
            if (typeof text !== "string") text = require("util").inspect(text , {depth: depth });
        
            text = text
                .replace(/`/g, "`" + String.fromCharCode(8203))
                .replace(/@/g, "@" + String.fromCharCode(8203))
                .replace(new RegExp(scarlex.token, "gi"), "404")
               // .replace(new RegExp(9 + 10, "gi"), "21")
                //.replace(new RegExp(69 + 69, "gi"), "666");
        
            return text;
        }

        if (message.author.id === "459025800633647116") {
            let evalcode1 = new Discord.MessageEmbed()
                .setAuthor(`Evaled by ${message.author.tag}`)
                .setDescription(`**Input:**\n\n\`\`\`js\n${cont}\`\`\``, true)
                .addField(`** **`, `**Output:**\n\n\`\`\`Output too long, logged to console\`\`\``, true)
                .setColor(0x5b02a5)
                .setFooter(`! A V I X I T Y#0999 - Time taken: ${Date.now() - message.createdTimestamp} ms`);
            let test = new Discord.MessageEmbed()
            .setTitle('yeah')
                expireButton(message , [test]).then(async (msg) => {
                try {
                    
                    let evaled = await eval(cont);

                    const file = new MessageAttachment(Buffer.from(clean(evaled), "utf-8"), "eval.txt") 

                    if (typeof evaled !== "string") evaled = require("util").inspect(evaled, {depth: depth});

                    if (evaled.length > 1024) {
                        msg.edit({ embeds: [evalcode1] });
                        return console.log(clean(evaled));
                    }

                    let evalcode = new Discord.MessageEmbed()
                        .setAuthor(`Evaled by ${message.author.tag}`)
                        .setDescription(`> **Input:**\n\n\`\`\`js\n${cont}\`\`\``, true)
                        .addField(`** **`, `> **Output:**\n\n\`\`\`js\n${clean(evaled)}\`\`\``, true)
                        .setColor(0x5b02a5)
                        .setFooter(`! A V I X I T Y#0999 - Time taken: ${Date.now() - message.createdTimestamp} ms`);

                    return msg.edit({ embeds: [evalcode] }).catch((e) => console.error(e));
                } catch (err) {
                    let errorcode = new Discord.MessageEmbed()
                        .setAuthor(`Evaled by ${message.author.tag}`)
                        .setDescription(`> **Input:** \n\n\`\`\`js\n${cont}\`\`\``, true)
                        .addField(`** **`, `> **Output:** \n\n\`\`\`js\n${clean(err.message)}\`\`\``, true)
                        .setColor("RED")
                        .setFooter(`! A V I X I T Y#0999 - Time taken: ${Date.now() - message.createdTimestamp} `);

                    return msg.edit({ embeds: [errorcode] }).catch((e) => console.error(e));
                }
            });
        } else {
            message.channel.send(`L`);

        }


	},
};










