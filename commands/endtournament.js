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
    
function command(interaction)
{
    if (!interaction.member.roles.cache.find(role => role.name === 'CC Team'))
    {
        return interaction.editReply('You are not allowed to use this command.').catch(console.error);
    }
    
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
    
    //copy from backuprefresh
    interaction.guild.members.fetch();
    let backup = interaction.guild.roles.cache.find(role => role.name === 'Back Up Hero');
    if (backup)
    {
        backup.members.forEach(member => member.roles.remove(backup));
        message += `\nRemoved the role ${backup} from everyone.`
    }
    
    //remove Host role
    let host = interaction.member.roles.cache.find(role => role.name === 'Host');
    if (host)
    {
        interaction.member.roles.remove(host);
        message += `\nRemoved the ${host} role from you.`
    }
    
    interaction.editReply(`Ended the tournament.${message}`).catch(console.error);
    
    success = true;
}