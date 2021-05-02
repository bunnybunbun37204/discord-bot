const AIMLParser = require("aimlparser");
module.exports = {
  name: "reply",
  bot_command: [], //This command in bot
  cooldown: 0,
  description: "auto reply",
  reply(msg, isActive) {
      if(msg.content === 'hello'){
          msg.reply('hello');
      }
  },
};
