import { Message , MessageEmbed} from 'discord.js';
import { SCARLEX } from '../../../structures/scarlex';
const exec = require('child_process').exec;
import fs from 'fs';
import path from 'path';
//import ping from '../info/ping';


export default {
    name: 'update',
    description: 'kinda updates stuff lol ',
    cooldown: 0,
    aliases: ['pull'],
    execute: async (scarlex: SCARLEX, message: Message, args: string[], cmd: string): Promise<void> => {

        if (message.author.id === '459025800633647116') {


            

            try {

                exec(`git pull https://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:x-oauth-basic@github.com/avixityyt/BLAIR_TS.git`, (error, stdout) => {
                    let response = (error || stdout);
                    if (!error) {
                        if (response.includes("Already up to date.")) {
                            message.channel.send('Bot already up to date lol');
                        } else {
                            const e = new MessageEmbed()
                            .setDescription('```js\n' + response + '```')
                            //message.channel.send('Pulled from GitHub. reloading files. \n\nLogs: \n```js\n' + response + "```")
                            //setTimeout(() => {
                            //    process.exit();
                            //}, 1000)
                            message.reply({ content: 'deez' , embeds: [e]});
    
                            console.log(response);
                        };
                    }
                });



                const categories = fs.readdirSync(path.resolve(__dirname, '../../commands'));
                for await (const category of categories) {

                    const commandFiles = fs
                        .readdirSync(path.resolve(__dirname, `../../commands/${category}`))
                        .filter((File) => File.endsWith('.ts') || File.endsWith('.js'));
                    for await (const file of commandFiles) {
                        delete require.cache[require.resolve(`../../commands/${category}/${file}`)]
                        const command = await require(`../../commands/${category}/${file}`);
                        if (command.default.name) {
                            scarlex.commands.set(command.default.name, command.default);
                            //message.reply(`Loaded command: ${command.default.name}`);
                        } else {
                            message.reply(`Could not load command: ${command.default.name}`);

                        }
                    }


                }
                message.reply('**Commands reloaded**');

            } catch (error) {
                console.log(error);
            }


            // exec(`git pull https://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:x-oauth-basic@github.com/avixityyt/BLAIR_TS.git`)


        } else {
            message.channel.send('You do not have perms');
        }
    },
};
