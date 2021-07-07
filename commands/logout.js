const fs = require('fs');

module.exports =
{
    name: 'logout',
    execute(client, message, args, Discord)
    {
        client.destroy();
    }
};