//? Select Menu Example.
// This is the code that will run when a user interacts with the Select Menu from selectMenuExample.js
module.exports = {
	name: 'select',
	description: 'e',
	async execute(interaction) {
		let picked = ''
		await interaction.values.forEach(async (value) => { picked += `${value}, ` })
		interaction.reply({
			content: `${picked} option selected.`,
			ephemeral: true,
		})
	},
}
