const fs = require('fs');

module.exports =
{
    name: 'restart',
    execute(client, message, args, Discord)
    {
        if (message.guild.me.hasPermission('MANAGE_MESSAGES')) message.delete();
        console.log('Bot is offline')
        client.destroy();
    }
};