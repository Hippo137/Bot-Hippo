const { SlashCommandBuilder } = require('@discordjs/builders');
const g = require('../general.js');
let success = false;

module.exports = {
	data: new SlashCommandBuilder()
		.setName('endtournament')
		.setDescription('Used to end a tournament'),
    
    async execute(interaction)
    {
        await interaction.deferReply();
        success = false;
        await command(interaction);
        g.log(interaction, success);
	}
}
    
async function command(interaction)
{
    if (!g.allowed(interaction, 1)) return interaction.editReply('You are not allowed to use this command.').catch(console.error);
    
    let message = ``;
    
    channelTarget = interaction.guild.channels.cache.find(channel => channel.name === `Tournament Assistance`);
    if (channelTarget)
    {
        channelTarget.permissionOverwrites.edit(channelTarget.guild.roles.everyone, { VIEW_CHANNEL: false });
        message += `\n${channelTarget} is hidden.`
    }
    
    //copy from tablehide
    for (let i=0; i<=50; i++)
    {
        let channelTarget = interaction.guild.channels.cache.find(channel => channel.name == `table-`+i);
        if (channelTarget)
        {
            channelTarget.permissionOverwrites.edit(channelTarget.guild.roles.everyone, { VIEW_CHANNEL: false });
        }
        channelTarget = interaction.guild.channels.cache.find(channel => channel.name == `table `+i);
        if (channelTarget)
        {
            channelTarget.permissionOverwrites.edit(channelTarget.guild.roles.everyone, { VIEW_CHANNEL: false });
        }
    }
    message += `\nTable channels are hidden.`
    
    //remove Back Up Hero role from everyone – copy from backuprefresh
    interaction.guild.members.fetch();
    let backup = interaction.guild.roles.cache.find(role => role.name === 'Back Up Hero');
    if (backup)
    {
        backup.members.forEach(member => member.roles.remove(backup));
        message += `\nRemoved the role “Back Up Hero” from everyone.`
    }
    
    //remove Host role from everyone
    let host = interaction.guild.roles.cache.find(role => role.name === 'Host');
    if (host)
    {
        host.members.forEach(member => member.roles.remove(host));
        message += `\nRemoved the role “Host” from everyone.`
    }
    
    //restart tournament – copy from createtournament(Restart)
    const dbMessage = await interaction.client.channels.cache.get('862422544652828713').messages.fetch(process.env.DATABASE);
    let dbContent = dbMessage.content;

    dbContent = g.writeDb(dbContent, 'sRound', '1'); //sRound
    dbContent = g.writeDb(dbContent, 'sTables', '0'); //sTables

    dbMessage.edit(dbContent).catch(console.error);
    message += `\nRestarted the tournament.`;
    
    interaction.editReply(`Ended the tournament.${message}`).catch(console.error);
    
    success = true;
}