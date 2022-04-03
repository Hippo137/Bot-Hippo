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
        interaction.guild.roles.create({position: position, hoist: true}).catch(console.error);
        
        await interaction.editReply('Successfully created a new role').catch(console.error); //error handling in case the message was manually removed in the meantime
        
        const botLogChannel = await interaction.client.channels.cache.get('960288981419962448');
        botLogChannel.send(`${interaction.member} used command ${interaction.commandName}: https://discord.com/channels/${interaction.guildId}/${interaction.channelId}/${interaction.id}`).catch(console.error);
    }
}