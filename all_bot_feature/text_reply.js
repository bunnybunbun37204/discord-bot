const AIMLParser = require("aimlparser");
const aimlParser = new AIMLParser({ name:'BotNAJA' })
aimlParser.load(['aimlfile.xml']);
module.exports = {
  name: "reply",
  bot_command: [], //This command in bot
  cooldown: 0,
  description: "auto reply",
  reply(msg, isActive) {
    console.log('TEXT REPLY STARTED');
    aimlParser.getResult(msg.content, (answer, input) => {
        msg.reply(answer);
        console.log(`wildcard array is ${wildCardArray}`);
        console.log(`input is ${input}`);
    })
  },
};
