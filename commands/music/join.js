module.exports = {
    config: {
        name: "join",
        description: "The bot will join the same channel that the player who requested is in.",
        usage: "N/A",
        category: "music",
        accessableby: "N/A",
        aliases: [""],
        ownerOnly: false,
        userPerms: [], 
        clientPerms: [],
    },
    run: async (bot, message, args) => {
        const { channel } = message.member.voice;
        if (channel) {
            bot.music.players.spawn({
                guild: message.guild,
                voiceChannel: channel,
                textChannel: message.channel,
            });
        } else {
            message.channel.send("Please join a channel.")
        }
    }
}