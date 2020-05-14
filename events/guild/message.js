const { botPREFIX } = require('../../botConfig.json');

module.exports = async (bot, message) => {
    if (message.author.bot) return;
    if (!message.guild) return;
    if (!message.content.startsWith(botPREFIX)) return;
    if (!message.member) message.member = await message.guild.fetchMember(message);

    const args = message.content.slice(botPREFIX.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    
    if (cmd.length === 0) return;
    let command = bot.commands.get(cmd);

    if (commandfile.config.ownerOnly && !owners.includes(message.author.id)) return message.channel.send("Sorry, you must be the bot owner to use this command")
    let result = missingPerms(message.member, commandfile.config.userPerms)

    if (commandfile.config.userPerms && !message.member.permissions.has(commandfile.config.userPerms)) return message.channel.send(`Sorry, you must have ${result} perms to run this command`)
    result = missingPerms(message.guild.me, commandfile.config.clientPerms) // `Sorry, you must have ${result} perms to run this command`
    if (commandfile.requirements.clientPerms && !message.guild.me.permissions.has(commandfile.config.clientPerms)) return message.channel.send(`Sorry, i must have ${result} perms to run this command`)
    commandfile.run(client, message, args)

    const missingPerms = (member, perms) => {
        const missingPerms = member.permissions.missing(perms)
            .map(str => `\`${str.replace(/_/g, ' ')}\``)

        return missingPerms.length > 1 ? `${missingPerms.slice(0, -1).join(", ")} and ${missingPerms.slice(-1)[0]}` : missingPerms[0]
    }   

    if (!command) command = bot.commands.get(bot.aliases.get(cmd));
    if (command) command.run(bot, message, args);
}