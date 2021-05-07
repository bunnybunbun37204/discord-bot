// Coding a Bot with discord.js
// Discord Bots
import { Client } from 'discord.js';
import dotenv from 'dotenv';
import Command from './all_bot_feature/command_management.js';

dotenv.config();
const command_management = new Command();
const botnaja = new Client();
const PREFIX_COMMAND = "$"; //to make all command begins with '$'

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
  command_management.command(botnaja, msg, PREFIX_COMMAND);
});
