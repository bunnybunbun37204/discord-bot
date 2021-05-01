require("dotenv").config();

const { Client } = require("discord.js");
const botnaja = new Client();
const PREFIX_COMMAND = "!"; //to make all command begins with '!'

// login bot token is in .env file
botnaja.login(process.env.TOKEN);

//to make sure your bot log in
botnaja.on("ready", () => {
  console.log("botnaja has logged in");
});

//get user input
botnaja.on("message", (msg) => {
  console.log(`${msg.author.tag} : ${msg.content}`);
  if (msg.author.bot) return;
  if (msg.content === "test4263") {
    msg.reply("อะหิ อะหิ");
  }
  if (msg.content.startsWith(PREFIX_COMMAND)) {
    const [real_command, ...args] = msg.content
      .trim()
      .substring(PREFIX_COMMAND.length)
      .split(/\s+/);
    msg.reply(botnaja_command(real_command, args));
  }
});

const botnaja_command = (command, args) => {
  if(command === 'fck') return 'ไอ้สัด!!!';
};
