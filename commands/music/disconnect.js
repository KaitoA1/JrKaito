module.exports = {
    config: {
        name: "disconnect",
        description: "The bot will join the same channel that the player who requested is in.",
        usage: "N/A",
        category: "music",
        accessableby: "N/A",
        aliases: ["leave", "dc"],
        ownerOnly: false,
        userPerms: [], 
        clientPerms: [],
    },
    run: async (bot, message, args) => {
        const { id } = message.guild;
        const player = bot.music.player.get(id);
        const { channel } = message.member.voice;
        
        if (player && channel) {
            if (player.voiceChannel.id === channel.id) {
                bot.music.players.destroy(id);
            }
        }
    }
}