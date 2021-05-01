require("dotenv").config();

const { Client } = require('discord.js');
const botnaja = new Client();


// login bot token is in .env file
botnaja.login(process.env.TOKEN); 