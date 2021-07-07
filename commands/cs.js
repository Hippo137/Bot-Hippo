const fs = require('fs');
var dc
var msg

module.exports =
{
    name: 'cs',
    execute(client, message, args, Discord)
    {
        dc = Discord;
        msg = message;
        
        if (!args[0] || !args[1] || !args[2]) return errorMessage();
        
        const tournament = parseInt(args[0]);
        const tables = parseInt(args[1]);
        const loserFinal = parseInt(args[2]);
        
        if (isNaN(tournament) || isNaN(tables) || isNaN(loserFinal)) return errorMessage();
        
        if (tournament<1 || tables<1 || tables>4) return errorMessage();
        
        if (msg.guild.me.hasPermission('MANAGE_MESSAGES')) msg.delete();
        
        let extraMessage = ''
        if (loserFinal != 0) extraMessage += ' For all of you, there will be one more match after this one.'
        
        let botMessage = fs.readFileSync(`txt/${this.name}.txt`, 'utf8').replace(/{tournament}/g, tournament).replace(/{extraMessage}/g, extraMessage).replace(/{screenshots}/g, msg.guild.channels.cache.get('750490997045198880'));
        //msg.guild.channels.cache.get('849784629061746708'));
        for (let i=1; i<=tables; i++)
        {
            const channelTarget = msg.guild.channels.cache.find(channel => channel.name === `table-`+i);
            channelTarget.send(botMessage.replace(/{number}/g, i).replace(/{table}/g, i<10?'0'+i:i));
        }
        
        //message.channel.send(`${message.author} used the table spam command\nOpen Tournament Semifinals: ${tournament}`);
        
        const embedMessage = new dc.MessageEmbed()
            .setColor('#00c800')
            .setTitle(`“${msg.content}”`)
            .setDescription(`used by ${msg.author}`)
            .addField('tournament', tournament, false)
            .addField('tables', tables, false)
            .addField('loserFinal', loserFinal, false)
        
        msg.channel.send(embedMessage);
        
        global.botPresence = 2;
    }
};

function errorMessage()
{
    const embedMessage = new dc.MessageEmbed()
        .setColor('#ff0000')
        .setTitle(`Error: “${msg.content}”`)
        .addField('Required Syntax', `cs tournament tables loserFinal`, false)
        .addField('tournament', '>0', true)
        .addField('tables', '[1,4]', true)
        .addField('loserFinal', '[0,1]', true)
    msg.channel.send(embedMessage);
}