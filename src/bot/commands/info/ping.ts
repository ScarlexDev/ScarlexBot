import { Message } from 'discord.js';
import { SCARLEX } from '../../../structures/scarlex';
export default {
	name: 'ping',
	description: 'pong uwu',
	guildOnly: true,
	cooldown: 5,
	aliases: ['t'],
	execute: async(scarlex: SCARLEX, message: Message, args: string[], cmd: string): Promise<void> => {
		
		await message.channel.send(`>  pong... **API:** \`${scarlex.ws.ping}ms\`\n**Message:** \`${Date.now() - message.createdTimestamp}ms\``);
		
	},
};
