

const {
    MessageButton,
    Message,
    Interaction,
    MessageActionRow
} = require('discord.js');


const expireButton = async function (message, embeds) {

    try {


        let index = 0;

        let button = new MessageActionRow()
            .addComponents(
                new MessageButton().setCustomId(`e1`).setLabel('Close').setEmoji("<:kx:789160231095631902>").setStyle('DANGER'),
            );

        let buttons = [
            button
        ]

        let msg = await message.channel.send({
            embeds: [embeds[0]],
            components: buttons
        }).then((mesg) => {

            const buttonID = [`e1`];

            const buttons = async (interaction) => {
                if (!buttonID.includes(interaction.customId)) return;

                if (interaction.customId === `e1`) {
                    // index = index > 0 ? --index : embeds.length - 1;
                    //await interaction.deferUpdate();
                    console.log(interaction.user.id)
                    console.log(interaction.message.member.id)

                    // await interaction.message.delete();
                }
            };

            const filter = (interaction) => {
                return !interaction.user.bot
            };

            const collector = mesg.createMessageComponentCollector({
                filter,
                componentType: "BUTTON",
                time: 20000
            });

            collector.on("collect", buttons);
            collector.on("end", () => {
                //button.components[0].setDisabled(true)
                //mesg.edit({
                //    components: [button]
                //})
            });

            return mesg
        });


        return msg;
    } catch (error) {
        console.log(error)
    }
}

export default expireButton;