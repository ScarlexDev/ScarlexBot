
  async function replaceWithEmoji(emojiName , clnt) {

    if(clnt.customEmojis.get('emojis').filter(e => e.name.toLowerCase() === emojiName)[0]){
        return clnt.customEmojis.get('emojis').filter(e => e.name.toLowerCase() === emojiName)[0].emoji
        clnt.get('emojis').filter(e => e.name === emojiName)[0].emoji
    } 
    //else if(!collection.get('customEmojis').filter(e => e.name === emojiName)[0]){
    //     console.log('not real: ' + collection.get('customEmojis').filter(e => e.name === emojiName))

    //}s
    
  }

  export default replaceWithEmoji
