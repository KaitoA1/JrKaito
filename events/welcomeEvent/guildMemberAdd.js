module.exports = async (bot, member) => {
    const channel = member.guild.channels.find(channel => channel.name === 'welcome');
    
    if (!channel) return;

    channel.send(`Welcome to our server! ${member}`)
}