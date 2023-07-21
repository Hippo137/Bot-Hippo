const { SlashCommandBuilder } = require('@discordjs/builders');
const g = require('../general.js');
let success = false;

module.exports = {
	data: new SlashCommandBuilder()
		.setName('giveeveryoneroles')
		.setDescription('Gives everyone in the guild the three new notification roles'),
    
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
    if (!g.allowed(interaction, 4)) return interaction.editReply('You are not allowed to use this command.').catch(console.error);
    
    await interaction.guild.members.fetch();
    await interaction.guild.roles.fetch();
    //const test = interaction.guild.roles.cache.find(role => role.name === 'Tournaments Base');
    //console.log(test)
    //const cacheTemp = interaction.guild.roles.cache;
    const rolesToAdd =
    [
        interaction.guild.roles.cache.find(role => role.name === 'Tournaments Base'),
        interaction.guild.roles.cache.find(role => role.name === 'Tournaments CK'),
        interaction.guild.roles.cache.find(role => role.name === 'Tournaments Cash'),
        interaction.guild.roles.cache.find(role => role.name === 'Updates')
    ];
    //console.log(rolesToAdd);
    //console.log(interaction.guild.members.cache.filter(m => !m.user.bot))
    await interaction.guild.members.cache.filter(m => !m.user.bot).forEach(member => member.roles.add(rolesToAdd));
    interaction.editReply('Gave the roles ‘Tournaments Base’, ‘Tournaments CK’, ‘Tournaments Cash’ and ‘Updates’ to everyone in the guild excluding bots.')
    success = true;
}