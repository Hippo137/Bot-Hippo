const fs = require('fs');
const { SlashCommandBuilder } = require('@discordjs/builders');
const g = require('../general.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('roleadd')
        .setDescription('Create a role and move it below Back Up Hero')
        .addStringOption
        (option =>
            option.setName('name')
            .setDescription('name of the new role – defaults to ‘new role’ if omitted')
            .setRequired(false)
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
    
    const position = interaction.guild.roles.cache.find(role => role.name === 'Back Up Hero').position;
    let f = true; //used to not have some weird double edit
    interaction.guild.roles.create(
    {
        position: position,
        hoist: true,
        name: interaction.options.getString('name') ?? 'new role',
        color: 'RANDOM'
    }).catch((e) =>
    {
        if (e.stack.startsWith('DiscordAPIError: Maximum number of server roles reached'))
        {
            f = false;
            interaction.editReply('Couldn’t create a new role. Maximum number of roles reached.').catch(console.error); //error handling in case the message was manually removed in the meantime
        }
    }).then(() =>
    {
        if (f) interaction.editReply('Successfully created a new role.').catch(console.error); //error handling in case the message was manually 

        return f;
    });
}