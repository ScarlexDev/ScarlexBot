function interactionCooldown(interaction: any, collection: any, userID: any, client: any) {
	if (client.cooldowns.has(userID)) {
		let timeWord
		let cooldownTime
		if (collection.cooldown >= 60000) {
			if (collection.cooldown == 60000) timeWord = 'minute'
			else timeWord = 'minutes'
			cooldownTime = collection.cooldown / 60000
		} else {
			if (collection.cooldown == 1000) timeWord = 'second'
			else timeWord = 'seconds'
			cooldownTime = collection.cooldown / 1000
		}
		interaction.reply({
            content: '`You must wait ' + cooldownTime + ' ' + timeWord + ' before using this command again.`',
			embeds: [],
			allowedMentions: { repliedUser: false }
		})
		return true
	} else {
		client.cooldowns.set(userID)
		setTimeout(() => {
			client.cooldowns.delete(userID)
		}, collection.cooldown)
	}
}

export { interactionCooldown }