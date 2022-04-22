import { MessageEmbed } from "discord.js";
module.exports = async (scarlex: any, player: any, track: any, payload: any) => {
    
    const channel: any = scarlex.channels.cache.get(player.textChannel);
    const thing = new MessageEmbed()
        .setColor("RED")
        .setDescription("Error when loading song! Track is stuck");
    channel.send({content: ' ' , embeds: [thing]});
    scarlex.logger.Logger(`Error when loading song ; Track is stuck in [${player.guild}]`, "error");
    if (!player.voiceChannel) player.destroy();

}