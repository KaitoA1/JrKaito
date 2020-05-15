const { nodes } = require('../../botConfig.json');

const { ErelaClient } = require('erela.js');

module.exports = async (bot) => {

    bot.music = new ErelaClient(bot, nodes)

    bot.music.on('nodeConnect', () => {
        console.log("Node CONNECTED");
    });

    bot.music.on('nodeError', (error) => {
        console.log(`Node error: ${error.message}`);
    });

    bot.music.on('trackStart', (player, track) => {
        player.textChannel.send(`**Now playing:** ${track.title}`);
    });

    bot.music.on('queueEnd', (player) => {
        player.textChannel.send("Queue has ended.");
        bot.music.players.destroy(player.guild.id);
    });
}
