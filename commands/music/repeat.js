module.exports = {
    config: {
        name: "repeat",
        description: "Repeats the current song.",
        usage: "N/A",
        category: "music",
        accessableby: "N/A",
        aliases: ["loop", "l"],
        ownerOnly: false,
        userPerms: [], 
        clientPerms: [],
    },
    run: async (bot, message, args) => {
        const player = bot.music.players.get(message.guild.id);
        const { channel } = message.member.voice;
        if(!channel) return message.channel.send("Please join a voice channel")
        if(channel.id !== player.voiceChannel.id) return message.channel.send("You need to be in a voice channel to use the repeat command.");      
        if(!player || !player.queue[0]) return message.channel.send("There is no song playing.");
        
        if(player.trackRepeat === false){
            player.setTrackRepeat(true);
            const embed = new MessageEmbed()
            .setAuthor("Repeating:")
            .setThumbnail(thumbnail)
            .setDescription(stripIndents`
            ${player.playing ? "▶️" : "⏸️"} **[${title}](${uri})** \`${Utils.formatTime(duration, true)}\` by ${author}
            `)
            return message.channel.send(embed)
        }else{
            player.setTrackRepeat(false);
            const embed = new MessageEmbed()
            .setAuthor("Stopped Repeating:")
            .setThumbnail(thumbnail)
            .setDescription(stripIndents`
            ${player.playing ? "▶️" : "⏸️"} **[${title}](${uri})** \`${Utils.formatTime(duration, true)}\` by ${author}
            `)
            return message.channel.send(embed)
        }
    }
}