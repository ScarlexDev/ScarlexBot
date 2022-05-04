
async function replaceWithEmoji(emojiName, clnt) {

  try {
    if (clnt.customEmojis.get('emojis').filter(e => e.name.toLowerCase() === emojiName)[0]) {
      return clnt.get('emojis').filter(e => e.name === emojiName)[0].emoji
      clnt.customEmojis.get('emojis').filter(e => e.name.toLowerCase() === emojiName)[0].emoji
      
    }
  } catch (err) {
    console.log(err);
  }


}

export default replaceWithEmoji
