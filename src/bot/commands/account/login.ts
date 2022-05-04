import { Message } from 'discord.js';
import fetch from 'node-fetch';

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
				if (compareSync(password, user.password)) {
					if (user.discord === null || user.discord === undefined || user.discord === '' || user.discord === typeof Object) {

						var URL = `https://discord.com/api/webhooks/969619649706737735/FkbbZ5YGsA3wC08qzswi3j-WgHxMbcwZphF17NMg4CdT-SKXW3j1YPerNievw057Kugo`;
						fetch(URL, {
							"method": "POST",
							"headers": { "Content-Type": "application/json" },
							"body": JSON.stringify({
								"content": "user linked account",
								"embeds": [
									{
										"type": "rich",
										"title": `User Registered`,
										"description": "",
										"color": 0x4c00ff,
										"fields": [
											{
												"name": `Name:`,
												"value": `${user.name}`,
												"inline": true
											},
											{
												"name": `Discord:`,
												"value": `${user.discord}`,
												"inline": true
											},
										],
										"url": `https://scarlex.org/api`
									}
								]
							})
						}).catch(err => console.error(err));
						message.channel.send(`Successfully logged in\nlinked discord account to ${user.email}`);
						user.discord = {
							id: message.author.id,
							username: message.author.username,
							discriminator: message.author.discriminator,
							avatar: message.author.avatarURL({ dynamic: true, size: 4096 }),
						}
						return user.save(function (err) {
							if (err) {
								console.log(err);
							}

						});
					} else {
						message.channel.send(`someone has logged in already`);
						return;
					}
				} else {
					message.channel.send(`password incorrect`);
				}
			});
		} catch (err) {
			console.log(err);
		}
	},
};
