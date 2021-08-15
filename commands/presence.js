const fs = require('fs');

module.exports =
{
    name: 'presence',
    async execute(client, message, args, Discord)
    {
        if (message.guild == null) message.reply('This command isn’t available in DM channels.');
        
        if (message.guild.me.hasPermission('MANAGE_MESSAGES')) message.delete();
        
        if (!args[0]) return message.channel.send('This command needs an argument');
        if (isNaN(args[0])) args[0] = 0;
        else if (args[0] < 0 || args[0] > 3) args[0] = 0;
        
        await setPresence(client, args[0]);
    }
}

async function setPresence(client, newValue)
{
    await client.channels.cache.get('862422544652828713').messages.fetch('862425269063254069').then(message => message.edit(newValue));
}