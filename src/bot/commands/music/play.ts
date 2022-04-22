import {MessageEmbed} from "discord.js"; 


import { Message } from 'discord.js';
import { SCARLEX } from '../../../structures/scarlex';
import convertTime from "../../../utils/musicFuncs/convertTime";


export default {
	name: 'play',
	description: 'a ping command lol',
	cooldown: 5,
	aliases: ['pl'],
	execute: async(scarlex: SCARLEX, message: Message, args: string[], cmd: string): Promise<void> =>{
  

            
        var player = scarlex.manager.get(message.guild.id);
        if (!message.member.voice.channel) {
            let thing = new MessageEmbed()
                .setColor("RED")
                .setDescription(`You must be in vc lmao`);
             message.channel.send({embeds: [thing]});
        }
        if (player && message.member.voice.channel !== message.guild.me.voice.channel) {
            let thing = new MessageEmbed()
                .setColor("RED")
                .setDescription(`You must be in the same channel as ${scarlex.user.tag}`);
             message.channel.send({embeds: [thing]});
        } else if (!player) {
            var player = scarlex.manager.create({
                guild: message.guild.id,
                voiceChannel: message.member.voice.channel.id,
                textChannel: message.channel.id,
                volume: 100,
                selfDeafen: true,
            });
        }

        if (player.state !== "CONNECTED") player.connect();

        player.set("autoplay", true);
    

        const search = args.join(' ');

        let res;

        if (!search) {
            let thing = new MessageEmbed()
                .setColor("RED")
                .setDescription(`You must provide a search term`);
                message.channel.send({embeds: [thing]});
        } else {

        try {
            res = await player.search(search, message.author);
            if (res.loadType === 'LOAD_FAILED') {
                if (!player.queue.current) player.destroy();
                throw res.exception;
            }
        } catch (err) {
             message.reply(`there was an error while searching: ${err.message}`);
        }

        switch (res.loadType) {
            case 'NO_MATCHES':
                if (!player.queue.current) player.destroy();
                 message.reply('there were no results found.');
            case 'TRACK_LOADED':
                var track = res.tracks[0];
                player.queue.add(track);
                if (!player.playing && !player.paused && !player.queue.size) { 
                    return player.play();
                } else {
                    var thing = new MessageEmbed()
                        .setColor("PURPLE")
                        .setTimestamp()
                        .setThumbnail(track.displayThumbnail("hqdefault"))
                        .setDescription(` **Added Song to queue**\n[${track.title}](${track.uri}) - \`[${convertTime(track.duration)}]\``)
                     message.channel.send({embeds: [thing]});
                }
            case 'PLAYLIST_LOADED':
                player.queue.add(res.tracks);
                if (!player.playing && !player.paused && player.queue.totalSize === res.tracks.length) player.play();
                var thing = new MessageEmbed()
                    .setColor("PURPLE")
                    .setTimestamp()
                    .setDescription(`**Added Playlist to queue**\n${res.tracks.length} Songs **${res.playlist.name}** - \`[${convertTime(res.playlist.duration)}]\``)
                 message.channel.send({embeds: [thing]});
            case 'SEARCH_RESULT':
                var track = res.tracks[0];
                player.queue.add(track);
                if (!player.playing && !player.paused && !player.queue.size) {
                    return player.play();
                } else {
                    var thing = new MessageEmbed()
                        .setColor("PURPLE")
                        .setTimestamp()
                        .setThumbnail(track.displayThumbnail("hqdefault"))
                        .setDescription(` **Added Song to queue**\n[${track.title}](${track.uri}) - \`[${convertTime(track.duration)}]\`[<@${track.requester.id}>]`)
                     message.channel.send({embeds: [thing]});
                }
        }

        
    }
    }
}