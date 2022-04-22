import { Message } from "discord.js";
import { SCARLEX } from "../structures/scarlex";

interface command {
    name: string;
    description?: string;
    aliases?: string[];
    cooldown: number;
    guildOnly: boolean;
    execute(scarlex: SCARLEX, message: Message, args?: string[], cmd?: string): Promise<any> | any;
}

export { command }