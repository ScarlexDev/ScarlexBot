import { Client, Message, Collection , Permissions , MessageEmbed} from 'discord.js';
import ms from 'pretty-ms';
import { SCARLEX } from '../../../structures/scarlex';
import  GuildSettings from '../../../models/settings';
import config from '../../../../config';



export default async (scarlex: SCARLEX, message: Message) => {

	
	const { guild, channel, content, author } = message;


	if (message.author.bot) return;
	//if (!message.channel.permissionsFor(message.guild.me).has(Permissions.FLAGS.SEND_MESSAGES)) return
	if(!message.guild.me.permissions.has("SEND_MESSAGES")) return;
	// Retriving the guild settings from database.
	// let storedSettings = await GuildSettings.findOne({
	//   guildID: message.guild.id,
	// });
	// if (!storedSettings) {
	//   // If there are no settings stored for this guild, we create them and try to retrive them again.
	//   const newSettings = new GuildSettings({
	// 	guildID: message.guild.id,
	// 	prefix: 's!'
	//   });
	//   await newSettings.save().catch((e) => {
	// 	console.log(e);
	//   });
	//   storedSettings = await GuildSettings.findOne({ guildID: message.guild.id });
	// }
  
  
   
  
	// If the message does not start with the prefix stored in database, we ignore the message.
	if (message.content.indexOf(config.prefix) !== 0) return;
	const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
	const cmd = args.shift().toLowerCase();
  
	const command = scarlex.commands.get(cmd.toLowerCase()) || scarlex.commands.find(c => c.aliases?.includes(cmd.toLowerCase()));
	if (!command) return;
	//if (!message.member) message.guild.fetchMembers(message);
  
  //  if (command.isDisabled === true && message.author.id === '459025800633647116') {
  
	  //const error = new discord.MessageEmbed()
	  //.setTitle(`Error`)
	  //.setDescription(`${command.name} is disabled \`\n${infoIcon} | **Reason:** Bugs , issues , exploits.`)
	  //.setColor(`${scarlex.config.colors.fatalError}`)
	  //    .setFooter(scarlex.randomF)
	  //return message.reply({ embeds: [error]})
  //}
  
	//if (!storedSettings.normalCommands) return;
  
  if (command.guildOnly === true && message.channel.type === 'DM') {
  
	  const error2 = new MessageEmbed()
	  .setTitle(`Error`)
	  .setDescription(`${command.name} is a guild-only command\``)
	  .setColor(`PURPLE`)
	  .setFooter('ez')
	  return message.reply({ embeds: [error2]})
  
  }
  
  
  
  
	try {
	  // console.log(message.author.tag + ' runned da cmd /// [ UPDATED ]')
	  command.execute(scarlex, message, args , cmd);
  } catch (error) {
	  console.log(error);
	  // message.reply(error , { split: true });
  }


};
