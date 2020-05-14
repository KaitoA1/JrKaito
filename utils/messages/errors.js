const { red_dark } = require('../../utils/scripts/colors.json');

const { MessageEmbed } = require('discord.js');

module.exports.notOwner = (message) => {
    const embed = new MessageEmbed()
    .setColor(red_dark)
    .setTitle("Sorry, but you are not the bot owner.");

    message.channel.send(embed);
}