const { botPREFIX } = require('../../botConfig.json');

module.exports = async (bot, message) => {
    
    if(message.author.bot || message.channel.type === "dm") return;

    let args = message.content.slice(botPREFIX.length).trim().split(/ +/g);
    let cmd = args.shift().toLowerCase();

    if(!message.content.startsWith(botPREFIX)) return;
    let commandfile = bot.commands.get(cmd) || bot.commands.get(bot.aliases.get(cmd))
    if(commandfile) commandfile.run(bot, message, args)
}