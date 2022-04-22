const { MessageEmbed } = require('discord.js')
const { SlashCommandBuilder } = require('@discordjs/builders')
const convertTime = require('../../../utils/musicFuncs/convertTime')



module.exports = {
	data: new SlashCommandBuilder()
		.setName('play')
		.setDescription('play your shitty music')
        .addStringOption( option => 
            option.setName('song')
            .setDescription('the url or search term of the song you want to play')
            .setRequired(true)
        
        ),
	cooldown: 5000,
	async execute(interaction , scarlex) {
		// const embed = new MessageEmbed().setColor('PURPLE').setDescription(`${interaction.options.getString('song' , true)}`)
		// const loadingMessage = await interaction.reply({ embeds: [embed], fetchReply: true })
		// embed.setDescription(' Pong! ' + `\`${loadingMessage.createdTimestamp - interaction.createdTimestamp}ms\``)
		// interaction.editReply({ embeds: [embed] })
        const { user , member , guild , channelId} = interaction;

        const interactionChannel = channelId
        //const message = guild.channels.cache.get(channelId).messages.cache.get(targetId);
        
        try {

            
             const channel  = guild.members.cache.get(user.id).voice;
            var player = scarlex.manager.get(guild.id);
            if (!channel) {
                let thing = new MessageEmbed()
                    .setColor("RED")
                    .setDescription(`You must be in vc lmao`);
                 interaction.reply({embeds: [thing] , fetchReply: true});
            }
            if (player && member.voice.channel !== guild.me.voice.channel) {
                let thing = new MessageEmbed()
                    .setColor("RED")
                    .setDescription(`You must be in the same channel as ${scarlex.user}`);
                 interaction.reply({embeds: [thing] , fetchReply: true});
            } else if (!player) {
                var player = scarlex.manager.create({
                    guild: guild.id,
                    voiceChannel: channel.channelId,
                    textChannel: interactionChannel,
                    volume: 100,
                    selfDeafen: true,
                });
            }
    
            if (player.state !== "CONNECTED") player.connect();
    
            player.set("autoplay", false);
        
    
            const search = interaction.options.getString('song' , true);
            let res;
            console.log(search)
            try {
                res = await player.search(search, guild.members.cache.get(user.id));
                if (res.loadType === 'LOAD_FAILED') {
                    if (!player.queue.current) player.destroy();
                    throw res.exception;
                }
            } catch (err) {
                 interaction.reply({ content:`there was an error while searching: ${err.message}` , fetchReply: true});
            }
    
            switch (res.loadType) {
                case 'NO_MATCHES':
                    if (!player.queue.current) player.destroy();
                     interaction.reply('there were no results found.');
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
                         interaction.reply({embeds: [thing] , fetchReply: true});
                    }
                case 'PLAYLIST_LOADED':
                    player.queue.add(res.tracks);
                    if (!player.playing && !player.paused && player.queue.totalSize === res.tracks.length) player.play();
                    var thing = new MessageEmbed()
                        .setColor("PURPLE")
                        .setTimestamp()
                        .setDescription(`**Added Playlist to queue**\n${res.tracks.length} Songs **${res.playlist.name}** - \`[${convertTime(res.playlist.duration)}]\``)
                     interaction.reply({embeds: [thing] , fetchReply: true});
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
                         interaction.reply({embeds: [thing] , fetchReply: true});
                    }
            }
    
            } catch (E) {
                console.log('ERROR:' , E)
            }
	}
}
