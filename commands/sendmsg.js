module.exports = {
    name: 'sendmsg',
    execute(client, message, args)
    {
        if (message.author.id !== '383011975057113088') message.reply('You need to be a :hippopotamus: to use this command :smiling_face_with_tear:');
        
        const channelTarget = client.channels.cache.find(channel => channel.id === '787152755420299265');
        
        //const channelTarget = client.channels.cache.find(channel => channel.name == 'inner-circle');
        //channelTarget.send('Ready for the table spam. I’ll just wait in case you change your mind again <@410606606183825428>');
        //channelTarget.send('<a:blob:805610421615853619> <@278111514123304961>');
        let argString = ''
        args.forEach(a => argString += `${a} `)
        channelTarget.send(argString);
        
    }
};