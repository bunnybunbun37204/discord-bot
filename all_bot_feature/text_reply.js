module.exports = {
  name: "reply",
  bot_command: [], //This command in bot
  cooldown: 0,
  description: "auto reply",
  reply(msg, isActive) {
    if(isActive){
      aimlParser.getResult(msg.content, (answer, wildCardArray, input) => {
         msg.reply(answer);
         console.log(input);
         console.log(wildCardArray);
     })
    }
  },
};
