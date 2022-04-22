const { Schema, model } = require("mongoose");
const { prefix } = require("../../config");


const guildSettingSchema = new Schema({
  guildID: {
    type: String,
  },
  prefix: {
    type: String,
    default: prefix,
  },
  slashCommands: {
    type: Boolean,
    default: false,
  },
  contextMenuCommands: {
    type: Boolean,
    default: false,
  },
  selectMenuCommands: {
    type: Boolean,
    default: false
  },
  normalCommands: {
    type: Boolean,
    default: false,
  },
});

export default model("guild_settings", guildSettingSchema);