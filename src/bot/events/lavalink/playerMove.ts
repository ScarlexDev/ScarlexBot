module.exports = async (scarlex: any, player: any, oldChannel: any, newChannel: any) => {

	player.voiceChannel = scarlex.channels.cache.get(newChannel);
	
}