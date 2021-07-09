module.exports = {
    name: 'randomstuff',
    execute(client, message, args)
    {
        //const channelTarget = client.channels.cache.find(channel => channel.name == 'inner-circle');
        const channelTarget = client.channels.cache.find(channel => channel.name == 'arschlöscher');
        //channelTarget.send('Ready for the table spam. I’ll just wait in case you change your mind again <@410606606183825428>');
        channelTarget.send('<a:blob:805610421615853619>');
        
        
    }
};