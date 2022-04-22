import {MessageEmbed} from "discord.js"; 
import convertTime from "../../../utils/musicFuncs/convertTime";


import { Message } from 'discord.js';
import { SCARLEX } from '../../../structures/scarlex';
export default {
	name: 'stop',
	description: 'a stopo command lol',
	cooldown: 5,
	aliases: ['stoplol'],
	execute: async(scarlex: SCARLEX, message: Message, args: string[], cmd: string): Promise<void> =>{
    

        const player = scarlex.manager.get(message.guild.id);

        if (!player.queue.current) {
            let thing = new MessageEmbed()
                .setColor("RED")
                .setDescription("There is no music playing.");
                message.channel.send({content: ' ' , embeds: [thing]});
            }

        const autoplay = player.get("autoplay")
        if (autoplay === true) {
            player.set("autoplay", false);
        }

        player.stop();
        player.queue.clear();


		let thing = new MessageEmbed()
            .setColor("PURPLE")
            .setTimestamp()
            .setDescription(`Stopped the music`)
        message.channel.send({content: ' ' , embeds: [thing]});
	

    }
}