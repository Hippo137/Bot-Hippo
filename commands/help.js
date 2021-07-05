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
        
        const embedMessage = new dc.MessageEmbed()
            .setColor('#00c800')
            .setTitle(`“${msg.content}”`)
            .setDescription(`used by ${msg.author}`)
            .addField('Tournament', 'Open', false)
            .addField('Qualifiers', 'oq', true)
            .addField('Day Final', 'od', true)
            .addField('Semifinal', 'os', true)
            .addField('Finals', 'of', true)
            .addField('Tournament', 'Cash', false)
            .addField('Qualifiers', 'cq', true)
            //.addField('Day Final', 'cd', true)
            .addField('Semifinal', 'cs', true)
            .addField('Finals', 'cf', true)
            .addField('Tournament', 'Open Cities & Knights', false)
            .addField('Qualifiers', 'oqck', true)
            //.addField('Day Final', 'odck', true)
            .addField('Semifinal', 'osck', true)
            .addField('Finals', 'ofck', true)
        
        msg.channel.send(embedMessage);
    }
};