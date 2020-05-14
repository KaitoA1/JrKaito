const { botPREFIX } = require(`../../botConfig.json`);

module.exports = async (bot, message) => {

    if (message.author.bot) return;
    if (!message.guild) return;
    if (!message.content.startsWith(botPREFIX)) return;
    if (!message.member) message.member = await message.guild.fetchMember(message);

    const args = message.content.slice(botPREFIX,this.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();

    if (cmd.length === 0) return;
    let command = bot.comand.get(cmd);
    if (!command) command = bot.commands.get(bot.aliases.get(cmd));
    if (command) command.run(bot, message, args);
}