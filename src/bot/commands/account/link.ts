import { Message } from 'discord.js';
import { SCARLEX } from '../../../structures/scarlex';
import user from '../../../models/user';
import {compareSync} from 'bcryptjs';

 
export default {
	name: 'link',
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
		user.findOne({ email: email }, (err, user) => {
			if (err) {
				message.channel.send(`error`);
				return;
			}
			if (!user) {
				message.channel.send(`user not found`);
				return;
			}
			console.log(password , user.password);
			console.log(compareSync(password, user.password));
			if(compareSync(password, user.password)) {
				message.channel.send(`password correct`);
			} else {
				message.channel.send(`password incorrect`);
			}
		});
	},
};
