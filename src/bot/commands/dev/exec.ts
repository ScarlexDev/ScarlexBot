import { Message } from 'discord.js';
import { SCARLEX } from '../../../structures/scarlex';


export default {
	name: 'exec',
	description: 'eexcute code',
	cooldown: 5,
	aliases: ['ex'],
	execute: async(scarlex: SCARLEX, message: Message, args: string[], cmd: string): Promise<void> =>{
		
        const { exec } = require('child_process');

		if (message.author.id === '459025800633647116') {
            const code = args.join(' ');
        if (!code) {
            message.channel.send('L');
        }
        exec(code, (error, stdout, stderr) => {
            const input = `\`\`\`Bash\n${code}\n\`\`\``;
            if (error) {
                let output = `\`\`\`Bash\n${error}\n\`\`\``;
                //message.channel.send({ content: output });
                return message.channel.send({ content: output });
            } else {
                const output = stderr || stdout;
                const output2 = `\`\`\`Bash\n${output}\n\`\`\``;
                message.channel.send({ content: output2 });
            }
        });

    } else {
         message.react('789160231095631902');
    }

	},
};
