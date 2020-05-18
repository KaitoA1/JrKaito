module.exports = {
    config: {
        name: "queue",
        description: "Displays the queue",
        usage: "N/A",
        category: "music",
        accessableby: "N/A",
        aliases: ["q"],
        ownerOnly: false,
        userPerms: [], 
        clientPerms: [],
    },
    run: async (bot, message, args) => {
        const player = bot.music.players.get(message.guild.id);
        if (player) {

            let currentPage = 0;
            const embeds = generateQueueEmbed(player.queue);
            const queueEmbed = await message.channel.send(`Current Page: ${currentPage+1}/${embeds.length}`, embeds[currentPage]);
            await queueEmbed.react("⬅️");
            await queueEmbed.react("➡️");

            const filter = (reaction, user) => ["⬅️", "➡️"].includes(reaction.emoji.name) && (message.author.id === user.id);
            const collector = queueEmbed.createReactionCollector(filter);

            collector.on('collect', (reaction, user) => {
                if (reaction.emoji.name === "➡️") {
                    if ( currentPage < embeds.length-1) {
                        currentPage++;
                        queueEmbed.edit(`Current Page: ${currentPage}/${embeds.length}, embeds[currentPage]`);;
                    }else if (reaction.emoji === "⬅️") {
                        if(currentPage !== 0) {
                            --currentPage;
                            queueEmbed.edit(`Current Page: ${currentPage+1}/${embeds.length}, embeds[currentPage]`);
                        }
                    }
                }
            });
        }
    }
}

function generateQueueEmbed(queue) {
    const embeds = [];
    let index = 10;
    for (let i = 0; i < queue.length; i += 10) {
        const current = queue.slice(i, index);
        let index2 = i;
        index += 10;
        const info = current.map(track => `${++index2} - [${track.title}](${track.uri})`).join("\n");
        const embed = new MessageEmbed()
            .setDescription(`**[Current Song: ${queue[0].title}](${queue[0].url})**\n${info}`);
        embeds.push(embed);
    }
    return embeds;
}