const fs = require('fs');
var dc
var msg
var cl

module.exports =
{
    name: 'presence',
    async execute(client, message, args, Discord)
    {
        dc = Discord;
        msg = message;
        cl = client;
        
        if (msg.guild.me.hasPermission('MANAGE_MESSAGES')) msg.delete();
        
        if (!args[0]) return message.channel.send('This command needs an argument');
        console.log(args[0]);
        if (isNaN(args[0])) args[0] = 0;
        else if (args[0] < 0 || args[0] > 4) args[0] = 0;
        await setPresence(args[0]);
    }
}

async function setPresence(p)
{
    await cl.channels.cache.get('862422544652828713').messages.fetch('862425269063254069').then(message => message.edit(p));
    //let msg = await cl.channels.cache.get('862422544652828713').messages.fetch('862425269063254069');
    //msg.edit(p);
}