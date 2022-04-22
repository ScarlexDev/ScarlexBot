// import { Permissions } from 'discord.js'
// function InteractionPerms(interaction: any, collection: any) {
//     if (collection.permissions && collection.permissions.length) {
//         let invalidPermissionsFlags:any[] = []
//         for (const permission of collection.permissions) {
//             if (!interaction.member.permissions.has(`${Permissions.FLAGS[permission]}`)) {
//                 invalidPermissionsFlags.push(permission)
//             } else {
//                 return false
//             }
//         }
//         interaction.reply({
//             content: 'You do not have the required permissions to use this command.',
//             embeds: [],
//             allowedMentions: { repliedUser: true }
//         })
//         return true
//     }
// }

// export { InteractionPerms }