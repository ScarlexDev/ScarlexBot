import fs from 'fs';
import path from 'path';
import { SCARLEX } from '../../structures/scarlex';


export default async (scarlex: SCARLEX, Discord:any) => {
	const load_dir = async () => {
		const event_files = fs.readdirSync(path.resolve(__dirname, `../events/lavalink`)).filter((file) => file.endsWith('.ts') || file.endsWith('.js'));
		for await (const file of event_files) {
			const event: any = await import(`../events/lavalink/${file}`);
			const event_name: any = file.split('.')[ 0 ];
			scarlex.logger.Logger(`Loading Events Lavalink ${event_name}`, "event");
			scarlex.manager.on(event_name, event.default.bind(null, scarlex));
			//blair.on(event_name, event.default.bind(null, blair));
		}
	};
	load_dir()
};
