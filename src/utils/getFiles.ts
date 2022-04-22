import { readdirSync } from "fs"
import path from 'path'
function getFiles(dir: any) {
	const files = readdirSync(dir, {
		withFileTypes: true,
	})
	let commandFiles:any[] = []
	for (const file of files) {
		if (file.isDirectory()) {
			commandFiles = [...commandFiles, ...getFiles(`${dir}/${file.name}`)]
		} else if (file.name.endsWith('.js')) {
			commandFiles.push(`.${dir}/${file.name}`)
		}
	}
	console.log(commandFiles)
	return commandFiles
}

export default getFiles 