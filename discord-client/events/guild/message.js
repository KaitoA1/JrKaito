const { botPREFIX, OWNERID } = require('../../botConfig.json');
const { notOwner } = require('../../utils/messages/errors.js');

module.exports = async (bot, message) => {
    
    if(message.author.bot || message.channel.type === "dm") return;

    let args = message.content.slice(botPREFIX.length).trim().split(/ +/g);
    let cmd = args.shift().toLowerCase();

    if(!message.content.startsWith(botPREFIX)) return;
    let commandfile = bot.commands.get(cmd) || bot.commands.get(bot.aliases.get(cmd))
    
    if (commandfile.config.ownerOnly && !OWNERID.includes(message.author.id)) return notOwner(message);
//    let result = missingPerms(message.member, commandfile.config.userPerms)

//    if (commandfile.config.userPerms && !message.member.permissions.has(commandfile.config.userPerms)) return message.channel.send(`Sorry, you must have ${result} perms to run this command`)
//    result = missingPerms(message.guild.me, commandfile.config.clientPerms)
//    if (commandfile.requirements.clientPerms && !message.guild.me.permissions.has(commandfile.config.clientPerms)) return message.channel.send(`Sorry, i must have ${result} perms to run this command`)
    commandfile.run(bot, message, args)
}

const missingPerms = (member, perms) => {
    const missingPerms = member.permissions.missing(perms)
        .map(str => `\`${str.replace(/_/g, ' ')}\``)

    return missingPerms.length > 1 ? `${missingPerms.slice(0, -1).join(", ")} and ${missingPerms.slice(-1)[0]}` : missingPerms[0]
}