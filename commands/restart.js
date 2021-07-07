const fs = require('fs');

module.exports =
{
    name: 'restart',
    execute(client, message, args, Discord)
    {
        client.destroy();
    }
};