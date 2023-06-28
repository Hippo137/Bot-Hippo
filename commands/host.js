const { SlashCommandBuilder } = require('@discordjs/builders');
const g = require('../general.js');
let success = false;

module.exports = {
	data: new SlashCommandBuilder()
		.setName('host')
		.setDescription('Used to take or remove the ‘Host’ role from yourself'),
    
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
    
    let host = interaction.guild.roles.cache.find(role => role.name === 'Host');
    if (!host) return interaction.editReply('The ‘Host’ role wasn’t found.').catch(console.error);
    
    if (interaction.member.roles.cache.find(role => role.name === 'Host'))
    {
        interaction.member.roles.remove(host);
        message += `Removed the ‘Host’ role from you.`
    }
    else
    {
        interaction.member.roles.add(host);
        message += `Gave you the ‘Host’ role.`
    }
    
    interaction.editReply(`${message}`).catch(console.error);
    
    success = true;
}