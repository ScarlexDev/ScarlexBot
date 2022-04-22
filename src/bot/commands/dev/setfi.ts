import { Message , MessageEmbed} from 'discord.js';
import { isValidObjectId, ObjectId } from 'mongoose';
import { SCARLEX } from '../../../structures/scarlex';


export default {
    name: 'setfi',
    description: 'sets info for dev portfolio',
    cooldown: 0,
    aliases: ['st'],
    execute: async (scarlex: SCARLEX, message: Message, args: string[], cmd: string): Promise<void> => {

        const devModel = require('../../../models/dev');
        const query = args.join(' ');
        console.log(query);
        if (message.author.id !== `459025800633647116`) {
            message.reply('you are not the developer');
        }
        if (!query) {
            message.reply('you forgor to specify what you want to set as info');
        }
        devModel.findOneAndUpdate({ _id:  '61c1dde73a5d60467bfeddbe' }, { footerImage:  query }).then((e) => {
            console.log(e)
        }).catch((err) => {
            message.reply('error setting info');
            console.log(err)
        });
        const embed = new MessageEmbed()
        .setDescription(`${query}`)
        .setImage(`${query}`)
        message.reply({ content: 'info set' , embeds: [embed]}); 
    },
};
