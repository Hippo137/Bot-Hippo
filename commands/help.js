const fs = require('fs');
var dc
var msg

module.exports =
{
    name: 'help',
    execute(client, message, args, Discord)
    {
        dc = Discord;
        msg = message;
        
        if (msg.guild != null && msg.guild.me.hasPermission('MANAGE_MESSAGES')) msg.delete();
        
        msg.channel.send(fs.readFileSync(`txt/${this.name}.txt`, 'utf8'));
    }
};