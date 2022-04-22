const delay = require("delay");
const { MessageEmbed } = require("discord.js");
const ms = require('ms');

module.exports = async (scarlex: any, player: any) => {

	const channel: any = scarlex.channels.cache.get(player.textChannel);
	let thing: any = new MessageEmbed()
		.setColor("PURPLE")
		.setDescription(`**Music queue hasended**`)
		.setFooter(scarlex.user.username, scarlex.user.displayAvatarURL());
	channel.send({ content: ' ' , embeds: [thing]});
}