module.exports = {
    config: {
        name: "debug",
        description: "Information about the bot",
        usage: "N/A",
        category: "client",
        accessableby: "N/A",
        aliases: [""],
        ownerOnly: true,
        userPerms: [], 
        clientPerms: [],
    },
    run: async (bot, message, args) => {
        bot.emit('guildMemberAdd', message.member);
    }
}