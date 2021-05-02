const AIMLParser = require("aimlparser");
const aimlParser = new AIMLParser({ name:'BotNAJA' })
module.exports = {
  name: "reply",
  bot_command: [], //This command in bot
  cooldown: 0,
  description: "auto reply",
  reply(msg, isActive) {
      aimlParser.load(['./'])
      if(msg.content === 'hello'){
          msg.reply('hello');
      }
  },
};
