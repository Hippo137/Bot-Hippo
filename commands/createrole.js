const fs = require('fs');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('createrole')
        .setDescription('Create a role and move it to the top'),
            
	async execute(interaction)
    {
        await interaction.deferReply();
        //interaction.channel.send('0');
        if (!interaction.member.roles.cache.find(role => role.name === 'CC Team')) return await interaction.editReply('You are not allowed to use this command.').catch(console.error);
        
        const position = interaction.guild.roles.cache.find(role => role.name === 'Hippo’s Bot').position;
        interaction.guild.roles.create({position: position}).catch(console.error);
        
        await interaction.editReply('Successfully created a new role').catch(console.error); //error handling in case the message was manually removed in the meantime
    }
}