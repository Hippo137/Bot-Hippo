const { SlashCommandBuilder } = require('@discordjs/builders');
const g = require('../general.js');
let success = false;

module.exports = {
	data: new SlashCommandBuilder()
		.setName('starttournament')
		.setDescription('Used to start a tournament'),
    
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
    if (!g.allowed(interaction, 1)) return interaction.editReply('You are not allowed to use this command.').catch(console.error);
    
    let message = ``;
    
    channelTarget = interaction.guild.channels.cache.find(channel => channel.name === `Tournament Assistance`);
    if (channelTarget)
    {
        channelTarget.permissionOverwrites.delete(channelTarget.guild.roles.everyone);
        message += `\n${channelTarget} is visible to everyone.`
    }
    
    //get Host role
    let host = interaction.guild.roles.cache.find(role => role.name === 'Host');
    if (host)
    {
        interaction.member.roles.add(host);
        message += `\nGave you the “Host” role.`
    }
    
    interaction.editReply(`Started the tournament.${message}`).catch(console.error);
    
    success = true;
}