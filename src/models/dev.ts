const db = require("mongoose");
const p = require("../config").prefix;
const { model , Schema}  = require("mongoose");
export {};
// nice lmao
const devSchema = new Schema({
  information: {
    type: String,
    default: "N/A",
  },
  dailyQoute: {
    type: String,
    default: "N/A",
    },
  footerImage: {
    type: String,
    default: "https://cdn.discordapp.com/attachments/758038403634692187/904746990292856952/WeBackground.png",
  },
  footerText: {
    type: String,
    default: "balls",
    },
});

module.exports = model("dev", devSchema);