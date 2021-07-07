const fs = require('fs');
var dc
var msg

module.exports =
{
    name: 'presence',
    execute(client, message, args, Discord)
    {
        dc = Discord;
        msg = message;
        
        if (msg.guild.me.hasPermission('MANAGE_MESSAGES')) msg.delete();
        
        if (!args[0]) return message.channel.send('This command needs an argument');
        
        switch (args[0].toLowerCase)
        {
            case '1': case 'checkin': case 'check-in': case 'c':
            global.botPresence = 1;

            case '2': case 'tournament': case 'tour': case 't':
            global.botPresence = 2;

            case '3': case 'final': case 'last': case 'f':
            global.botPresence = 3;
            
            case '0': case '4': case 'end': case 'over': case 'e': case 'o':
            global.botPresence = 4;
        }
    }
};