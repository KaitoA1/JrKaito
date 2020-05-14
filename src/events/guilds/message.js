const { botPREFIX } = require(`../../../botConfig.json`);

module.exports = async (bot, message) => {
    if (message.author.bot) return;
    if (!message.guild) return;
    if (!message.content.startsWith(botPREFIX)) return;
    if (!message.member) message.member = await message.guild.fetchMember(message);
}