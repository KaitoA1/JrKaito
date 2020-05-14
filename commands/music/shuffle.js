module.exports = {
    config: {
        name: "shuffle",
        description: "",
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
        const player = bot.music.players.get(message.guild.id);
    
        if (channel && player) {
          if (channel.id === player.voiceChannel.id) {
            player.queue.shuffle();
            message.channel.send('Shuffled the queue');
          }
        }
    }
}