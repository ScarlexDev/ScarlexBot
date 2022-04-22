import { MessageEmbed } from "discord.js";
import convertTime from "../../../utils/musicFuncs/convertTime";




module.exports = async (scarlex: any, player: any, track: any, payload: any) => {
    const channel = scarlex.channels.cache.get(player.textChannel);

    const thing = new MessageEmbed()
        .setDescription(`**Started Playing**\n [${track.title}](${track.uri}) - \`[${convertTime(track.duration)}]\` [<@${track.requester.id}>]`)
        .setThumbnail(track.displayThumbnail("3"))
        .setColor("PURPLE")
        .setTimestamp()
    return channel.send({content: ' ' , embeds: [thing]});
    
}