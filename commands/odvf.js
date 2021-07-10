const fs = require('fs');
var dc
var msg

module.exports =
{
    name: 'odvf',
    execute(client, message, args, Discord)
    {
        dc = Discord;
        msg = message;
        
        if (!args[0]) return errorMessage();
        
        const tournament = parseInt(args[0]);
        
        if (isNaN(tournament)) return errorMessage();
        
        if (tournament<1) return errorMessage();
        
        if (msg.guild.me.hasPermission('MANAGE_MESSAGES')) msg.delete();
        
        let botMessage = fs.readFileSync(`txt/${this.name}.txt`, 'utf8').replace(/{tournament}/g, tournament).replace(/{screenshots}/g, msg.guild.channels.cache.get('750490997045198880')); //msg.guild.channels.cache.get('849784629061746708'));
        
        const channelTarget = msg.guild.channels.cache.find(channel => channel.name === 'table-1');
        channelTarget.send(botMessage);
        
        //message.channel.send(`${message.author} used the table spam command\nOpen Tournament Semifinals: ${tournament}`);
        
        const embedMessage = new dc.MessageEmbed()
            .setColor('#00c800')
            .setTitle(`“${msg.content}”`)
            .setDescription(`used by ${msg.author}`)
            .addField('tournament', tournament, false)
        
        msg.channel.send(embedMessage);
        
        setPresence(client, 3);
    }
};

function errorMessage()
{
    const embedMessage = new dc.MessageEmbed()
        .setColor('#ff0000')
        .setTitle(`Error: “${msg.content}”`)
        .addField('Required Syntax', `odvf tournament`, false)
        .addField('tournament', '>0', true)

    msg.channel.send(embedMessage);
}

async function setPresence(client, newPresence)
{
    await client.channels.cache.get('862422544652828713').messages.fetch('862425269063254069').then(message => message.edit(newPresence));
}