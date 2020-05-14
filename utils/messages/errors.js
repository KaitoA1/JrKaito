const { ownerID } = require('../../botConfig.json');

const { MessageEmbed } = require('discord.js');

module.exports.notOwner = (message, ownerID) => {
    const embed = new MessageEmbed()
    .setAuthor(message.author.username)
    .setTitle("Error")
    .addField("Only the bot owner can use this command.");

    message.channel.send(embed);
}