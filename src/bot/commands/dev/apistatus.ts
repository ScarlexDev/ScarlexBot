import { Message , MessageEmbed} from 'discord.js';
import { isValidObjectId, ObjectId } from 'mongoose';
import { SCARLEX } from '../../../structures/scarlex';
import Dev from '../../../models/dev'



export default {
    name: 'apistatus',
    description: 'apistatus',
    cooldown: 0,
    aliases: ['st'],
    execute: async (scarlex: SCARLEX, message: Message, args: string[], cmd: string): Promise<void> => {

        try {
            if (message.author.id === "459025800633647116") {
                Dev.findOneAndUpdate({ _id: '62657d97b66ce5f33bb40331' } , { apiStatus: args[0] }).then((e) => {
                    e.save();
                    message.reply('saved')
                })
            } else {
                message.react(':x:');
            }
        } catch (error) {
            console.log(error);
        
            
        }

        
    },
};
