import { Message, MessageEmbed } from 'discord.js';
import mongoose from 'mongoose';
import { isValidObjectId, ObjectId , model} from 'mongoose';
import { SCARLEX } from '../../../structures/scarlex';
import User from '../../../models/user'


export default {
    name: 'blacklist',
    description: 'sets blacklist',
    cooldown: 0,
    aliases: ['st'],
    execute: async (scarlex: SCARLEX, message: Message, args: string[], cmd: string): Promise<void> => {

        console.log(args[0] , args[1]);

        try {
            if (message.author.id === "459025800633647116") {
                // await User.findOneAndUpdate({ email: args[0] } , { $set: { isBlacklisted: true }} , { new: true}).then((e) => {
                //     e.save();
                //     return message.reply(`${e.email} is now ${e.isBlacklisted}`)
                // })
                User.findOneAndUpdate({ email: args[0] } , { $set: { isBlacklisted: args[1] }} , { new: true}).then(async(e) => {
                    await e.save();
                    return console.log(e.isBlacklisted)
                })

            } else {
                message.react(':x:');
            }
        } catch (error) {
            console.log(error);
        }
    },
};
