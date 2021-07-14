const fs = require('fs');
var dc
var msg
var test = -1;

async module.exports =
{
    name: 'ofck',
    execute(client, message, args, Discord)
    {
        dc = Discord;
        msg = message;
        
        if (!args[0] || !args[1]) return errorMessage();
        
        const tournament = parseInt(args[0]);
        let loserFinals = parseInt(args[1]);
        
        if (isNaN(tournament) || isNaN(loserFinals)) return errorMessage();
        
        if (tournament < 1 || loserFinals < 0 || loserFinals > 49) return errorMessage();
        
        if (msg.guild.me.hasPermission('MANAGE_MESSAGES')) msg.delete();
        
        let botMessage = fs.readFileSync(`txt/${this.name}.txt`, 'utf8').replace(/{tournament}/g, tournament).replace(/{screenshots}/g, msg.guild.channels.cache.get('750490997045198880')); //msg.guild.channels.cache.get('849784629061746708'));
        for (let i=1+loserFinals; i>=1; i--)
        {
            let finalName = '';
            let finalNameShort = '';
            if (i==1)
            {
                finalNameShort = 'F';
                finalName = 'Final';
            }
            else
            {
                finalNameShort = 'L';
                finalName = 'Loser Final';
            }
            
            
            const channelTarget = msg.guild.channels.cache.find(channel => channel.name == `table-`+i);
            channelTarget.send(botMessage.replace(/{number}/g, i).replace(/{table}/g, i).replace(/{finalName}/g, finalName).replace(/{finalNameShort}/g, finalNameShort));
        }

        //message.channel.send(`${message.author} used the table spam command\nOpen Tournament Finals: ${tournament}`);
        
        const embedMessage = new dc.MessageEmbed()
            .setColor('#00c800')
            .setTitle(`“${msg.content}”`)
            .setDescription(`used by ${msg.author}`)
            .addField('tournament', tournament, false)
            .addField('loserFinals', loserFinals, false)
            
        msg.channel.send(embedMessage);
        
        if (msg.guild.id != '747212662483583069')
        {
            await getTest(client);
            if (test == 0) return;
        }
        setPresence(client, 3);
    }
};

function errorMessage()
{
    const embedMessage = new dc.MessageEmbed()
        .setColor('#ff0000')
        .setTitle(`Error: “${msg.content}”`)
        .addField('Required Syntax', `ofck tournament loserFinals`, false)
        .addField('tournament', '>0', true)
        .addField('loserFinals', '[0,49]', true)
        
    msg.channel.send(embedMessage);
}

async function setPresence(client, newValue)
{
    await client.channels.cache.get('862422544652828713').messages.fetch('862425269063254069').then(message => message.edit(newValue));
}

async function getTest(client)
{
    await client.channels.cache.get('862422544652828713').messages.fetch('864970292190380042').then(message => test = parseInt(message.content));
}