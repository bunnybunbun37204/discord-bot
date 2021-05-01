require('dotenv').config();

const { Client } = require('discord.js');
const botnaja = new Client();

// login bot token is in .env file
botnaja.login(process.env.TOKEN); 

//to make sure your bot log in
botnaja.on('ready',()=>{
    console.log('botnaja has logged in');
});

//get user input
botnaja.on('message',(msg)=>{
    console.log(`${msg.author.tag} : ${msg.content}`);
    if(msg.content === 'test'){
        msg.reply('อะหิ อะหิ');
    }
});