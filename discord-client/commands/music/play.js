module.exports = {
    config: {
        name: "play",
        description: "The bot join the voice channel or plays music",
        usage: "N/A",
        category: "music",
        accessableby: "N/A",
        aliases: ["p"],
        ownerOnly: false,
        userPerms: [], 
        clientPerms: [],
    },
    run: async (bot, message, args) => { 
        const query = args.join(' ');
        console.log(query);

        const { channel } = message.member.voice;
        if (channel) {
            const player = bot.music.players.spawn({
                guild: message.guild,
                voiceChannel: channel,
                textChannel: message.channel,
            });

            let index = 0;
            const searchResults = await bot.music.search(query, message.author);
            const tracks = searchResults.tracks.slice(0, 5);
            const trackInfo = tracks.map(video => `${++index} - ${video.title}`).join('\n');

            const embed = new MessageEmbed()
            .setAuthor("JrKaito", bot.user.displayAvatarURL())
            .setDescription(trackInfo)
            .setFooter("Music Results");

            message.channel.send(embed);

            const filter = m => (message.author.id === m.author.id) && (m.content >= 1 && m.content <= tracks.length);

            try {
                const response = await message.channel
                .awaitMessages(filter, { max: 1, time: 10000, error: ['time']});
    
                if(response) {
                    const entry = response.first().content;
                    console.log(entry);
                    const player = bot.music.players.get(message.guild.id);
                    const track = tracks[entry-1];
                    player.queue.add(track);
                    message.channel.send(`**Enqueueing track:** ${track.title}`);
                    if (!player.playing) player.play();
                }
            } catch (err) {
                console.log(err)
            }
        } else {
            message.channel.send('Please join a channel.');
        }
    }
}