const fs = require('fs');
var dc
var msg

module.exports =
{
    name: 'orck',
    execute(client, message, args, Discord)
    {
        dc = Discord;
        msg = message;
        if (!args[0] || !args[1] || !args[2] || !args[3]) return errorMessage();
        
        const tournament = parseInt(args[0]);
        const round = parseInt(args[1]);
        const numRounds = parseInt(args[2]);
        const tables = parseInt(args[3]);
        
        
        if (isNaN(tournament) || isNaN(round) || isNaN(numRounds) || isNaN(tables)) return errorMessage();
        
        if (round > numRounds || tournament<1 || round<0 || round>5 || tables<1 || tables>50) return errorMessage();
        
        const tableStart = args[4] ? parseInt(args[4]) : 1;
        if (tableStart < 1 || tableStart > tables) return errorMessage();
        
        if (msg.guild.me.hasPermission('MANAGE_MESSAGES')) msg.delete();
        
        const roundName = ['last', 'first', 'second', 'third', 'fourth']
        const intNames = ['zero', 'one', 'two', 'three', 'four']

        let extraMessage = ''
        let remainingRounds = numRounds - round;
        if (remainingRounds == 0) extraMessage = 'This is your last match for the qualifier.';
        else extraMessage = `In this qualifier, all of you will play ${intNames[remainingRounds]} more ${remainingRounds>1?'matches':'match'} after this match.`;
        
        let botMessage = fs.readFileSync(`txt/${this.name}.txt`, 'utf8').replace(/{tournament}/g, tournament).replace(/{round}/g, round).replace(/{roundName}/g, roundName[round>=numRounds ? 0 : round]).replace(/{extraMessage}/g, extraMessage).replace(/{screenshots}/g, msg.guild.channels.cache.get('750490997045198880'));
        //msg.guild.channels.cache.get('849784629061746708'));
        for (let i=tableStart; i<=tables; i++)
        {
            const channelTarget = msg.guild.channels.cache.find(channel => channel.name === `table-`+i);
            channelTarget.send(botMessage.replace(/{table}/g, i<10?'0'+i:i));
        }
        
        //message.channel.send(`${message.author} used the table spam command\nOpen Tournament Qualifier: ${tournament}\nTables: ${tables}\nRounds: ${round}\nTotal Number of Rounds: ${numRounds}`);
        
        const embedMessage = new dc.MessageEmbed()
            .setColor('#00c800')
            .setTitle(`“${msg.content}”`)
            .setDescription(`used by ${msg.author}`)
            .addField('tournament', tournament, true)
            .addField('round', round, true)
            .addField('numRounds', numRounds, true)
            .addField('tables', tables, true)
            .addField('tableStart', tableStart, true)
        
        msg.channel.send(embedMessage);
        
        setPresence(2);
    }
};

function errorMessage()
{
    const embedMessage = new dc.MessageEmbed()
        .setColor('#ff0000')
        .setTitle(`Error: “${msg.content}”`)
        .addField('Required Syntax', `orck tournament round numRounds tables (tableStart)`, false)
        .addField('tournament', '>0', true)
        .addField('round', '[1, 5]', true)
        .addField('numRounds', '[round, 5]', true)
        .addField('tables', '[1, 50]', true)
        .addField('tableStart', '[1, tables]', true)

    msg.channel.send(embedMessage);
}

async function setPresence(p)
{
    await cl.channels.cache.get('862422544652828713').messages.fetch('862425269063254069').then(message => message.edit(p));
}