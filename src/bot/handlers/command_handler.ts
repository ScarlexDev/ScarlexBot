import fs from 'fs';
import path from 'path';
import { SCARLEX } from '../../structures/scarlex';


export default async (scarlex: SCARLEX, Discord: any) => {

	const categories = fs.readdirSync(path.resolve(__dirname, '../commands'));
	for await (const category of categories) {
		
		const commandFiles = fs
			.readdirSync(path.resolve(__dirname, `../commands/${category}`))
			.filter((File) => File.endsWith('.ts') || File.endsWith('.js'));

		for await (const file of commandFiles) {
			const command = await import(`../commands/${category}/${file}`);
			if (command.default.name) {
				scarlex.logger.Logger(`Loaded command: ${command.default.name}`);
				scarlex.commands.set(command.default.name, command.default);
			} else {
				continue;
				
			}
		}
	}
};
