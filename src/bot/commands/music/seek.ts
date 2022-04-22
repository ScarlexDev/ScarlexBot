import {MessageEmbed} from "discord.js"; 

const ms = require('ms');

import convertTime from "../../../utils/musicFuncs/convertTime";

import { Message } from 'discord.js';
import { SCARLEX } from '../../../structures/scarlex';



export default {
	name: 'seek',
	description: 'a stopo command lol',
	cooldown: 5,
	aliases: ['ssek'],
	execute: async(scarlex: SCARLEX, message: Message, args: string[], cmd: string): Promise<void> =>{
    

        const player = scarlex.manager.get(message.guild.id);

        if (!player.queue.current) {
            let thing = new MessageEmbed()
                .setColor("RED")
                .setDescription("There is no music playing.");
                message.channel.send({content: ' ' , embeds: [thing]});
            }
            const time = ms(args[0])
            const position = player.position;
            const duration = player.queue.current.duration;
    
          
    
            const song = player.queue.current;
            
            if (time <= duration) {
                if (time > position) {
                    player.seek(time);
                    let thing = new MessageEmbed()
                        .setDescription(` **Forward**\n[${song.title}](${song.uri})\n\`${convertTime(time)} / ${convertTime(duration)}\``)
                        .setColor("PURPLE")
                        .setTimestamp()
                        message.channel.send({content: ' ' , embeds: [thing]});
                    } else {
                    player.seek(time);
                    let thing = new MessageEmbed()
                        .setDescription(` **Rewind**\n[${song.title}](${song.uri})\n\`${convertTime(time)} / ${convertTime(duration)}\``)
                        .setColor("PURPLE")
                        .setTimestamp()
                        message.channel.send({content: ' ' , embeds: [thing]});
                    }
            } else {
                let thing = new MessageEmbed()
                    .setColor("RED")
                    .setDescription(`Seek duration exceeds Song duration.\nSong duration: \`${convertTime(duration)}\``);
                    message.channel.send({content: ' ' , embeds: [thing]});
                }
        

    }
}