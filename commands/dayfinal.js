const fs = require('fs');
const { SlashCommandBuilder } = require('@discordjs/builders');
const symbols = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

module.exports = {
    data: new SlashCommandBuilder()
        .setName('dayfinal')
        .setDescription('Second last round'),
            
	async execute(interaction)
    {
        await interaction.deferReply();
        if (!interaction.member.roles.cache.find(role => role.name === 'Inner Circle')) return await interaction.editReply('You are not allowed to use this command.').catch(console.error);
        
        
        let botMessage = fs.readFileSync(`txt/od.txt`, 'utf8')
            .replace(/{screenshots}/g, await interaction.guild.channels.cache.find(channel => channel.name === `💻screenshots`));
        
        const channelTarget = await interaction.guild.channels.cache.find(channel => channel.name === 'table-1');
        channelTarget.send(botMessage);
        
        await interaction.editReply(`Successfully posted DayFinal`).catch(console.error); //error handling in case the message was manually removed in the meantime
	},
};