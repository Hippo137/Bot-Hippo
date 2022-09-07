const { SlashCommandBuilder } = require('@discordjs/builders');
const g = require('../general.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('rolecolor')
        .setDescription('Randomizes the color of a role')
        .addRoleOption
        (option =>
            option.setName('role')
            .setDescription('Select a role')
            .setRequired(true)
        ),
    
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
    
    interaction.options.getRole('role').edit({color: 'RANDOM'});

    interaction.editReply('Successfully randomized the color of the role.').catch(console.error); //error handling in case the message was manually removed in the meantime

    return true;
}