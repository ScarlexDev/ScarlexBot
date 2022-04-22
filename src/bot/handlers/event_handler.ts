import fs from 'fs';
import path from 'path';
import { SCARLEX } from '../../structures/scarlex';

export default async (scarlex: SCARLEX, Discord:any) => {
	const load_dir = async (dir:any) => {
		const event_files = fs
			.readdirSync(path.resolve(__dirname, `../events/${dir}`))
			.filter((file) => file.endsWith('.ts') || file.endsWith('.js'));
		for await (const file of event_files) {
			const event = await import(`../events/${dir}/${file}`);
			const event_name = file.split('.')[ 0 ];
			scarlex.logger.Logger(`Loading Events ${event_name}`, 'event');
			scarlex.on(event_name, event.default.bind(null, scarlex));
		}
	};
	[ 'client', 'guild' ].forEach((e) => load_dir(e));
};
