require('dotenv').config();

const { Client } = require('discord.js');
const bot = new Client();




bot.once('ready', () => {
    console.log(`${bot.user.username} is now ONLINE!`);
});



bot.login(process.env.botTOKEN);