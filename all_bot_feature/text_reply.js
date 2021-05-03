module.exports = {
  name: "reply",
  bot_command: [], //This command in bot
  cooldown: 0,
  description: "auto reply",
  reply(msg, isActive) {
    if(isActive){
      if (msg.content === "testpic") {
        msg.channel.send("My Bot's message", {
          files: ["https://sv1.picz.in.th/images/2021/05/02/Aar3FQ.jpg"],
        });
      }
      else if (msg.content === 'สวัสดีค้าบ') {
        msg.reply('ท่านสมาชิกชมรม');
      }
    }
  },
};
