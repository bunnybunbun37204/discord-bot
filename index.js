// Coding a Bot with discord.js
// Discord Bots
require("dotenv").config();

const { Client } = require("discord.js");
const botnaja = new Client();
const music = require("./all_bot_feature/music.js");
const bot_reply = require("./all_bot_feature/text_reply.js");
const PREFIX_COMMAND = "$"; //to make all command begins with '!'

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
    //msg.reply(botnaja_command(real_command, args));
    if (real_command === "help") {
      msg.reply(
        `คำสั่ง ทั้งหมดมีดังนี้
        \n1. ***$help*** เพื่อดูคำสั่งทั้งหมด
        \n2. ***$play <music link or music name>*** เพื่อเล่นเพลงที่ต้องการ และเพิ่มเพลงในคิว 
        \n3. ***$stop*** เพือหยุดเพลง
        \n4. ***$skip*** เพื่อข้ามไปเล่นเพลงถัดไป`
        
      );
    } else {
      msg.reply("สามารถพิมพ์ $help เพื่อดูคำสั่งทั้งหมด");
    }
    music.execute(msg, args, real_command, botnaja);
  }
  else{
    bot_reply.reply(msg,true);
  }
});
