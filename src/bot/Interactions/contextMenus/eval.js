const { MessageEmbed , MessageAttachment} = require('discord.js')
const { ContextMenuCommandBuilder } = require('@discordjs/builders');
const  expireButton  = require('../../../utils/expireButton');



module.exports = {
	data: new ContextMenuCommandBuilder()
		.setName('eval ur mom')
		.setType(3),
	async execute(interaction, scarlex) {

        const { user , member , guild , channelId , targetId} = interaction;
        if(user.id !== '459025800633647116') return interaction.reply({ content: 'dev only <3', ephemeral: true });
        const message = guild.channels.cache.get(channelId).messages.cache.get(targetId);

        
        let cont = message.content.split("--d")[0];
        const depth = Number(message.content.split("--d")[1]) || 0;

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

            let evalcode1 = new MessageEmbed()
                .setAuthor(`Evaled by ${message.author.tag}`)
                .setDescription(`**Input:**\n\n\`\`\`js\n${cont}\`\`\``, true)
                .addField(`** **`, `**Output:**\n\n\`\`\`Output too long, logged to console\`\`\``, true)
                .setColor(0x5b02a5)
                .setFooter(`! A V I X I T Y#0999 - Time taken: ${Date.now() - message.createdTimestamp} ms`);
            let test = new MessageEmbed()
            .setTitle('yeah')
                expireButton(interaction , message , [test]).then(async (msg) => {
                try {
                    
                    let evaled = await eval(cont);

                    const file = new MessageAttachment(Buffer.from(clean(evaled), "utf-8"), "eval.txt") 

                    if (typeof evaled !== "string") evaled = require("util").inspect(evaled, {depth: depth});

                    if (evaled.length > 1024) {
                        msg.edit({ embeds: [evalcode1] });
                        return console.log(clean(evaled));
                    }

                    let evalcode = new MessageEmbed()
                        .setAuthor(`Evaled by ${message.author.tag}`)
                        .setDescription(`> **Input:**\n\n\`\`\`js\n${cont}\`\`\``, true)
                        .addField(`** **`, `> **Output:**\n\n\`\`\`js\n${clean(evaled)}\`\`\``, true)
                        .setColor(0x5b02a5)
                        .setFooter(`! A V I X I T Y#0999 - Time taken: ${Date.now() - message.createdTimestamp} ms`);

                    return msg.edit({ embeds: [evalcode] }).catch((e) => console.error(e));
                } catch (err) {
                    let errorcode = new MessageEmbed()
                        .setAuthor(`Evaled by ${message.author.tag}`)
                        .setDescription(`> **Input:** \n\n\`\`\`js\n${cont}\`\`\``, true)
                        .addField(`** **`, `> **Output:** \n\n\`\`\`js\n${clean(err.message)}\`\`\``, true)
                        .setColor("RED")
                        .setFooter(`! A V I X I T Y#0999 - Time taken: ${Date.now() - message.createdTimestamp} `);

                    return msg.edit({ embeds: [errorcode] }).catch((e) => console.error(e));
                }
            });
        


    },
}
