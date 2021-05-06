// Coding a Bot with discord.js
// Discord Bots
import { Client } from 'discord.js';
import ReplyMSg from './all_bot_feature/text_reply.js';
import Play from './all_bot_feature/music.js'
import dotenv from 'dotenv';
dotenv.config();

const botnaja = new Client();
const botnaja_reply = new ReplyMSg();
const PREFIX_COMMAND = "$"; //to make all command begins with '$'
const music = new Play();
let isActive = false;

// login bot token is in .env file
botnaja.login(process.env.TOKEN);

//to make sure your bot log in
botnaja.on("ready", () => {
  console.log("Botnaja has logged in");
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
    music.execute(msg, args, real_command, botnaja);
    if (real_command === "help") {
      msg.reply(
        `คำสั่ง ทั้งหมดมีดังนี้
        \n1. ***$help*** เพื่อดูคำสั่งทั้งหมด
        \n2. ***$play <music link or music name>*** เพื่อเล่นเพลงที่ต้องการ และเพิ่มเพลงในคิว 
        \n3. ***$stop*** เพือหยุดเพลง
        \n4. ***$skip*** เพื่อข้ามไปเล่นเพลงถัดไป
        \n5 ***สนใจพัฒนา BotNAJA สามารถกดลิ้งค https://github.com/stonksfarm-development/discord-bot`
        
      );
    } 
    else if(real_command === 'activeBotReply'){
      isActive = true;
    }
    else if(real_command === 'inactiveBotReply'){
      isActive = false;
    }
    else {
      msg.reply("สามารถพิมพ์ $help เพื่อดูคำสั่งทั้งหมด");
    }
  }
  else{
    botnaja_reply.replyMsg(msg,isActive);
  }
});
