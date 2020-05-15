// Inports of nodes or files
require('dotenv').config();
const { Client, Collection } = require('discord.js');
const bot = new Client();

['commands', 'aliases'].forEach(c => bot[c] = new Collection());
['commandHandler', 'eventHandler'].forEach(h => require(`./utils/handlers/${h}`)(bot));

bot.login(process.env.botTOKEN);


// Test
bot.on('message', message => {
	if (message.content === '!join') {
		bot.emit('guildMemberAdd', message.member);
	}
});