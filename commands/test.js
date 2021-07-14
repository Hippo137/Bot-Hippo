const fs = require('fs');

module.exports =
{
    name: 'test',
    async execute(client, message, args, Discord)
    {
        if (message.guild.me.hasPermission('MANAGE_MESSAGES')) message.delete();
        
        if (!args[0]) return message.channel.send('This command needs an argument');
        if (isNaN(args[0])) args[0] = 0;
        else if (args[0] < 0 || args[0] > 4) args[0] = 0;
        
        await setTest(client, args[0]);
    }
}

async function setTest(client, newValue)
{
    await client.channels.cache.get('862422544652828713').messages.fetch('864970292190380042').then(message => message.edit(newValue));
}