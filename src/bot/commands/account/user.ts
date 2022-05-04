import { Message } from 'discord.js';
import { SCARLEX } from '../../../structures/scarlex';
import user from '../../../models/user';

 
export default {
	name: 'user',
	description: 'user',
	cooldown: 1,
	aliases: ['user'],
	execute(scarlex: SCARLEX, message: Message, args: string[], cmd: string): void {
		
		user.findOne({ 'discord.id': message.author.id }, (err, user) => {
			if (err) {
				message.channel.send(`error`);
				return;
			}
			if (!user) {
				message.channel.send(`user not found`);
				return;
            }

            return message.reply({ content: `${user.name} stats` , embeds: [
                {
                    title: `${user.name}'s stats`,
                    description: `Registered: ${user.date}`,
                    color: "DARK_BUT_NOT_BLACK",
                    fields: [
                        {
                            name: 'Overall Requests Sent',
                            value: `${user.api.succesfullRequests + user.api.failedRequests}`,
                            inline: true
                        },
                        {
                            name: 'Succesfull Requests',
                            value: `${user.api.succesfullRequests}`,
                            inline: true
                        },
                        {
                            name: 'Failed Requests',
                            value: `${user.api.failedRequests}`,
                            inline: true
                        },
                        {
                            name: 'User Blacklisted',
                            value: `${user.isBlacklisted ? 'Yes' : 'No'}`,
                            inline: false
                        },
                        {
                            name: 'User Admin',
                            value: `${user.isAdmin ? 'Yes :)' : 'No '}`,
                            inline: false
                        }
                    ]
                }
            ]})
		});
	},
};
