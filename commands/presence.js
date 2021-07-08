const fs = require('fs');

module.exports =
{
    name: 'presence',
    async execute(client, message, args, Discord)
    {
        if (message.guild.me.hasPermission('MANAGE_MESSAGES')) message.delete();
        
        if (!args[0]) return message.channel.send('This command needs an argument');
        console.log(args[0]);
        if (isNaN(args[0])) args[0] = 0;
        else if (args[0] < 0 || args[0] > 4) args[0] = 0;
        
        await setPresence(client, args[0]);
    }
}

async function setPresence(client, newPresence)
{
    await client.channels.cache.get('862422544652828713').messages.fetch('862425269063254069').then(message => message.edit(newPresence));
}