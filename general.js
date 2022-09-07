module.exports =
{
    readDb: function readDb(message, type)
    {
        let title = `\n${type}:`;
        let index = message.indexOf(title);
        if (index == -1) return console.log(`Type ${type} not found in the database`);
        index += title.length + 1;
        let endIndex = message.indexOf(`\n`, index);
        if (endIndex == -1) return message.substring(index, message.length);
        else return message.substring(index, endIndex);
    },

    writeDb: function writeDb(message, type, newValue)
    {
        let title = `\n${type}:`;
        let index = message.indexOf(title);
        if (index == -1) return console.log(`Type ${type} not found in the database`);
        index += title.length + 1;
        let endIndex = message.indexOf(`\n`, index);
        if (endIndex == -1) return `${message.substring(0, index)}${newValue}`;
        else return `${message.substring(0, index)}${newValue}${message.substring(endIndex, message.length)}`;
    },
    
    log: async function log(interaction, success)
    {
        const botLogChannel = await interaction.client.channels.cache.get('960288981419962448');
        botLogChannel.send(`${success?':white_check_mark:':':negative_squared_cross_mark:'} ${interaction.commandName} used by ${interaction.member}, ${interaction.user.username}#${interaction.user.discriminator}, id=${interaction.user.id}\nhttps://discord.com/channels/${interaction.guildId}/${interaction.channelId}/${interaction.id}`).catch(console.error);
    },
    
    symbols: symbols = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
};