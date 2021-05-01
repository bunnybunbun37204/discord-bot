require("dotenv").config();

const { Client} = require('discord.js');
const client = new Client();

// login bot token is in .env file
client.login(process.env.DISCORD_BOT_TOKEN); 