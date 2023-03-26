const fs = require('fs');
const { SlashCommandBuilder } = require('@discordjs/builders');
const g = require('../general.js');
let success = false;

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
        success = false;
        await command(interaction);
        g.log(interaction, success);
	}
}
    
async function command(interaction)
{
    if (!interaction.member.roles.cache.find(role => role.name === 'CC Team'))
    {
        return interaction.editReply('You are not allowed to use this command.').catch(console.error);
    }
    
    const position = interaction.guild.roles.cache.find(role => role.name === 'Back Up Hero').position;
    success = true;
    await interaction.guild.roles.create(
    {
        position: position,
        hoist: true,
        name: interaction.options.getString('name') ?? 'new role',
        color: 'RANDOM'
    }).catch((e) =>
    {
        if (e.stack.startsWith('DiscordAPIError: Maximum number of server roles reached'))
        {
            success = false; //return doesn’t work in await/catch. Without this, the reply would be edited again at the bottom overriding the error message from here
            return interaction.editReply('Couldn’t create a new role. Maximum number of roles reached.').catch(console.error); //error handling in case the message was manually removed in the meantime
        }
    });
    if (success) interaction.editReply('Successfully created a new role.').catch(console.error); //error handling in case the message was manually removed

    success = true;
}