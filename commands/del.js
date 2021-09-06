module.exports = {
    name: 'del',
    description: 'Clears tables',
    async execute(client, message, args)
    {
        if (!message.guild.me.hasPermission('MANAGE_MESSAGES')) return message.reply('I don’t have the permission to delete messages.');
        
        for (let i=1; i<=50; i++)
        {
            const channelTarget = message.guild.channels.cache.find(channel => channel.name == `table-`+i);
            await channelTarget.bulkDelete(100).catch(console.error);
        }
        
        return message.reply('Tables cleared.')
    }
};