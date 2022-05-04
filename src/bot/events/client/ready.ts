import { SCARLEX } from "../../../structures/scarlex";

//const Dashboard = require(process.cwd() + "/dashboard/dashboard");
const DBH = require("danbot-hosting");



export default async (Discord:any, scarlex: SCARLEX,) => {
	console.log(`${scarlex?.user.username} is online!`);
	scarlex.manager.init(scarlex.user.id)
	console.log("Fetching members...");
	for (const [id, guild] of scarlex.guilds.cache) {
		await guild.members.fetch();
	}
	console.log("Fetched members.");

	console.log("bot is now ready");
  const API = new DBH.Client("danbot-AI4n0YC84Sct25jrHCrGKu1xuKNVTkvundefined2HvqZysF", scarlex);
 
  // Start posting
//   let initalPost = await API.autopost();
 
//   if (initalPost) {
//     console.error(initalPost); // console the error
//   }

	delete require.cache[require.resolve('../../../../emojis.json')];
	try {
		const newEmojisFile = require('../../../../emojis.json').emojis;
		const newColorsFile = require('../../../../emojis.json').colors;

		const emojiCollection = scarlex.customEmojis

		const collectedEmojis = []
		collectedEmojis.push('emojis', newEmojisFile)
		emojiCollection.set('emojis', newEmojisFile);
		emojiCollection.set('colors', newColorsFile);
	} catch (error) {
		console.error(error)
	}
};