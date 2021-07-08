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
        switch (args[0])
        {
            case '1': case 'checkin': case 'check-in': case 'c':
            await setPresence(1);
            break;

            case '2': case 'tournament': case 'tour': case 't':
            await setPresence(2);
            break;

            case '3': case 'final': case 'last': case 'f':
            await setPresence(3);
            break;
            
            case '0': case '4': case 'end': case 'over': case 'e': case 'o':
            await setPresence(4);
            break;
        }
    }
}

async function setPresence(p)
{
    //await cl.channels.cache.get('862422544652828713').messages.fetch('862425269063254069').then(message => message.edit(p));
    let msg = await cl.channels.cache.get('862422544652828713').messages.fetch('862425269063254069');
    console.log(`set11:\n${msg}`);
    console.log(`set12:\n${msg.content}`);
    msg.edit(p);
    console.log(`set13:\n${msg.content}`);
}