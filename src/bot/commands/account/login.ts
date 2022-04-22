import { Message } from 'discord.js';
import { SCARLEX } from '../../../structures/scarlex';
import user from '../../../models/user';
import { compareSync } from 'bcryptjs';


export default {
	name: 'login',
	description: 'a login',
	cooldown: 1,
	aliases: ['t'],
	execute(scarlex: SCARLEX, message: Message, args: string[], cmd: string): void {
		const password = args[0];
		const email = args[1];
		if (!password || !email) {
			message.channel.send(`provide a password and email`);
			return;
		}

		try {
			user.findOne({ email: email }, (err: any, user: any) => {
				if (err) {
					message.channel.send(`error`);
					return;
				}
				if (!user) {
					message.channel.send(`user not found`);
					return;
				}
				console.log(password, user.password);
				console.log(compareSync(password, user.password));
				if (compareSync(password, user.password)) {
					message.channel.send(`Successfully logged in\nlinked discord account to ${user.email}`);
					user.discord = {
						id: message.author.id,
						username: message.author.username,
						discriminator: message.author.discriminator,
						avatar: message.author.avatarURL({ dynamic: true  , size: 4096}),
					}
					return user.save(function (err) {
						if (err) {
							console.log(err);
						}

					});
				} else {
					message.channel.send(`password incorrect`);
				}
			});
		} catch (err) {
			console.log(err);
		}
	},
};
