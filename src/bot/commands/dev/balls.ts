import { Message, MessageEmbed, MessageAttachment } from 'discord.js';
import Canvas from 'canvas';
import { SCARLEX } from '../../../structures/scarlex';


const applyText = (canvas, text, fontSize) => {
    const ctx = canvas.getContext('2d');
    fontSize = 70;

    do {
        ctx.font = `bold ${fontSize -= 20}px uni-sans`;
    } while (ctx.measureText(text).width > canvas.width - 300);

    return ctx.font;
};

export default {
    name: 'balls',
    description: 'sets info for dev portfolio',
    cooldown: 0,
    aliases: ['b'],
    execute: async (scarlex: SCARLEX, message: Message, args: string[], cmd: string): Promise<void> => {

        const query = args.join(' ');
        console.log(query);
        if (message.author.id === `459025800633647116`) {
            try {

                const getTime = require('../../util/formatSpotify')
                const user = await scarlex.users.cache.get(message.author.id);
                 const presence = scarlex.guilds.cache.get('849268110237630495')?.members?.cache?.get(user.id)?.presence || { userId: user.id, status: "offline", activities: [], clientStatus: null };
                let ac = presence.activities.find(a => a.type === 'LISTENING').timestamps;
                console.log(ac)
                const canvas = Canvas.createCanvas(700, 240);
                const ctx = canvas.getContext('2d');

                //const background = await Canvas.loadImage(`${message.author.bannerURL({ format: 'png' , size: 4096 })}`);
                //ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

                //ctx.strokeStyle = '#0099ff';
                //ctx.strokeRect(0, 0, canvas.width, canvas.height);
                // -- User info username
                ctx.beginPath();
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.fillStyle = '#ffffff';
                // Set the color of the stroke
                ctx.strokeStyle = '#000000';
                // Draw a rectangle with the dimensions of the entire canvas
                ctx.strokeRect(0, 0, 20, 20);

                // actual background lmao
                ctx.fillStyle = '#1DB954';



                ctx.closePath();
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.stroke();
                ctx.closePath();

                // creating the song name text
                ctx.font = applyText(canvas, 'Friends Die', 70);
                // black color
                ctx.shadowColor = '#000000';
                ctx.shadowBlur = 15;
                ctx.fillStyle = '#000000';
                ctx.fillText('Friends Die', 230, 55);



                // creating "song by artist" text
                ctx.font = applyText(canvas, 'by Juice WRLD', 20);
                // black color
                ctx.shadowColor = '#000000';
                ctx.shadowBlur = 15;
                ctx.fillStyle = '#000000';
                ctx.fillText('by Juice WRLD', 230, 83);


                // discord username
                // ctx.font = applyText(canvas, 'A V I X I T Y#0001' , 6);
                // black color
                //  ctx.shadowColor = '#000000';
                // ctx.shadowBlur = 15;
                //ctx.fillStyle = '#ffffff';
                //ctx.fillText('A V I X I T Y#0001', 230, 125);

                // creating on "album" text
                ctx.font = applyText(canvas, 'on "Legends Never Die"', 25);
                ctx.shadowColor = '#000000';
                ctx.shadowBlur = 15;
                // black color
                ctx.fillStyle = '#000000';
                ctx.fillText('on "Legends Never Die"', 230, 115);
                ctx.beginPath()

                ctx.shadowColor = '#000000';
                ctx.shadowBlur = 25;
                ctx.strokeStyle = '#000000';
                ctx.lineWidth = 3;
                const albumCover = await Canvas.loadImage('https://cdn.discordapp.com/attachments/851464009467035728/924684487256866846/images.png');
                ctx.drawImage(albumCover, 20, 20, 200, 200);
                ctx.strokeRect(20, 20, 200, 200);

                ctx.closePath();

                // creating progress bar
                

                const q = Number(args[0]);
                ctx.beginPath();
                ctx.fillStyle = '#000000';
                ctx.fillRect(290, 200, q , 15);
                ctx.strokeStyle = '#000000';
                ctx.lineWidth = 3;
                ctx.closePath();

                const spotifyLogo = await Canvas.loadImage('https://cdn.discordapp.com/attachments/758038403634692187/924290452629389342/spotifyLogo.png');
                ctx.drawImage(spotifyLogo, 640, 10, 45, 45);
                ctx.beginPath()
                ctx.shadowColor = '#ffffff';
                ctx.shadowBlur = 20;
                ctx.strokeStyle = '#000000';
                ctx.lineWidth = 3;
                //ctx.strokeRect(20, 50, 200, 200);
                const pfp = await Canvas.loadImage(`${message.author.displayAvatarURL({ format: 'png', size: 4096 })}`);
                ctx.drawImage(pfp, 175, 130, 100, 100);
                ctx.closePath();

                const attachment = new MessageAttachment(canvas.toBuffer(), 'balls.png');

                const data = require("util").inspect(getTime(ac) , {depth: 1 })
                const start = JSON.parse(data).start;
                console.log(start)
                message.reply({ content: `${start}`, files: [attachment] })
            } catch (error) {
                console.log(error);
            }
        } else {
            message.reply('*no*');
        }
    }


};
