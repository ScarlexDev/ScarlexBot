import Discord, { Client, Intents, Collection } from "discord.js";
import mongoose from "mongoose";

import { command } from "../interfaces/interfaces";
const emojis = require("../../emojis.json");
import * as logger from "../utils/musicFuncs/logger";
import * as erela from "erela.js";
import config from "../../config";
import { Manager } from "erela.js";
import { spawn } from "child_process";
import { send } from "process";
import connectDB from "./mongoose"
import "../api/index";
console.log('starting ws server?')




class SCARLEX extends Client {
    public commands: Collection<string, command>
    public cooldowns: Map<string, Collection<string, number>>
    public customEmojis: Collection<String, any>
    public slashCommands = new Collection();
    public buttons = new Collection();
    public selectMenus = new Collection();
    public messageContext = new Collection();
    public db: any
    public logger: any
    public manager = new Manager({
        nodes: [{
            host: "176.31.125.135",
            port: 1108,
            password: "scarlxrdDaddy",
            retryDelay: 5000,
          }],
        send: (id, payload) => {
            const guild = this.guilds.cache.get(id);
            if (guild) guild.shard.send(payload);
        },
        autoPlay: true,
    });
	slashCommand: any;
    constructor() {
        super({
            shards: "auto",
            allowedMentions: {
                parse: ["roles", "users", "everyone"],
                repliedUser: false
            },
            intents: [
                Intents.FLAGS.GUILDS,
                Intents.FLAGS.GUILD_MESSAGES,
                Intents.FLAGS.GUILD_MEMBERS,
                Intents.FLAGS.GUILD_VOICE_STATES,
            ]
        });
        this.commands = new Collection();
        this.cooldowns = new Map();
        this.customEmojis = new Collection();
        this.slashCommands = new Collection();
        this.buttons = new Collection();
        this.selectMenus = new Collection();
        this.messageContext = new Collection();
        this.db = mongoose
        this.logger = logger
    }
    async spawn(token: string): Promise<this> {
        await (await import('../bot/handlers/command_handler')).default(this, Discord);
        await (await import('../bot/handlers/event_handler')).default(this, Discord);
        await (await import('../bot/handlers/erela_handler')).default(this, Discord);
        await (await import('../bot/handlers/interactionHandler')).default(this);
        connectDB();
        
        super.login(token);
        return this;
    }

}


export { SCARLEX };