const { cyan } = require('../../utils/scripts/colors.json');

const { MessageEmbed } = require("discord.js") ;
const { version } = require("discord.js");
const moment = require("moment");
const m = require("moment-duration-format");
let os = require('os')
let cpuStat = require("cpu-stat")
const ms = require("ms")

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