import { Message, MessageEmbed } from 'discord.js';
import { isValidObjectId, ObjectId } from 'mongoose';
import { SCARLEX } from '../../../structures/scarlex';
import ping from '../info/ping';
import { readdirSync, existsSync } from 'fs';



export default {
    name: 'reload',
    description: 'reload command',
    cooldown: 0,
    aliases: ['ree'],
    execute: async (scarlex: SCARLEX, message: Message, args: string[], cmd: string): Promise<void> => {

        const path = require('path')
        if (message.author.id === '459025800633647116') {


            const commandName = args[0]

            if (!commandName) {

                message.react('789160231095631902')
            }
            try {
                const commandFolders = readdirSync(path.resolve('./src/bot/commands'));
                //console.log(commandFolders)
                //const folderName = commandFolders.forEach(folder => readdirSync(`./src/bot/commands/${folder}`).includes(`${commandName}.js`));
                commandFolders.forEach(async (folder) => {
                    if (!readdirSync(`./src/bot/commands/${folder}`).includes(`${commandName}.ts`)) {
                    } else if (readdirSync(`./src/bot/commands/${folder}`).includes(`${commandName}.ts`)) {

                        console.log(`${commandName} is in ${folder}`)
                        console.log(readdirSync(`./src/bot/commands/${folder}`).includes(`${commandName}.ts`))
                        await scarlex.commands.delete(commandName)
                         await delete require.cache[require.resolve(`../${folder}/${commandName}.ts`)];
                         const newCommand = await require(`../${folder}/${commandName}.ts`);
                         await scarlex.commands.set(newCommand.default.name, newCommand.default);
                         message.reply(`successfully reloaded ${commandName}`)
                    }
                    //return console.log(readdirSync(`./src/bot/commands/${folder}/`).includes(`${commandName}.ts`))
                })







                //message.react(':x:')

            } catch (error) {



                const cmdError = new MessageEmbed()

                    .setTitle('Command Error!')
                    .setURL('https://scarlex.org')
                    .setDescription(`**There was an error while reloading a command:** \`${commandName}\`:\n\`${error.message}\``)
                    .setFooter(`${message.author.username}`)
                    .setTimestamp()
                    .setColor('RED')


                console.error(error);
                message.channel.send({ embeds: [cmdError] })
                //.then(aids => aids.react('789160231095631902'))
            }

        } else {

            return;
        }

    },
};
