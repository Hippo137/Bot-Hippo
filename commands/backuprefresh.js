const fs = require('fs');
const { SlashCommandBuilder } = require('@discordjs/builders');
const g = require('../general.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('backuprefresh')
        .setDescription('Removes the Back Up Hero role for everyone'),
            
	async execute(interaction)
    {
        await interaction.deferReply();
        
        g.log(interaction, command(interaction));
	}
}
    
function command(interaction)
{
    if (!interaction.member.roles.cache.find(role => role.name === 'CC Team'))
    {
        interaction.editReply('You are not allowed to use this command.').catch(console.error);
        return false;
    }
    
    (async () => {
        await interaction.guild.members.fetch();
    })()
    
    const role = interaction.guild.roles.cache.find(role => role.name === 'Back Up Hero');
    
    role.members.forEach(member => member.roles.remove(role));

    interaction.editReply('Successfully refreshed the Back Up Hero role.').catch(console.error); //error handling in case the message was manually removed in the meantime

    return true;
}