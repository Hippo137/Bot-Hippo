const { SlashCommandBuilder } = require('@discordjs/builders');
const g = require('../general.js');
let success = false;

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
        success = false;
        await command(interaction);
        g.log(interaction, success);
	}
}
    
function command(interaction)
{
    if (!g.allowed(interaction, 1)) return interaction.editReply('You are not allowed to use this command.').catch(console.error);
    
    interaction.options.getRole('role').edit({color: 'RANDOM'});

    interaction.editReply('Successfully randomized the color of the role.').catch(console.error); //error handling in case the message was manually removed in the meantime

    success = true;
}