const fs = require('fs');
var dc
var msg
var cl

module.exports =
{
    name: 'presence',
    execute(client, message, args, Discord)
    {
        dc = Discord;
        msg = message;
        cl = client;
        
        if (msg.guild.me.hasPermission('MANAGE_MESSAGES')) msg.delete();
        
        if (!args[0]) return message.channel.send('This command needs an argument');
        console.log(args[0]);
        switch (args[0].toLowerCase)
        {
            case 1: case 'checkin': case 'check-in': case 'c':
            setPresence(1);
            break;

            case 2: case 'tournament': case 'tour': case 't':
            setPresence(2);
            break;

            case 3: case 'final': case 'last': case 'f':
            setPresence(3);
            break;
            
            case 0: case 4: case 'end': case 'over': case 'e': case 'o':
            setPresence(4);
            break;
        }
    }
}

function setPresence(p)
{
    cl.channels.cache.get('862422544652828713').messages.fetch('862425269063254069').then(message => message.edit(p));
}