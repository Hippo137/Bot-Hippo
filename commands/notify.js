require('dotenv').config();
const fs = require('fs');
const { SlashCommandBuilder } = require('@discordjs/builders');
const g = require('../general.js');
let success = false;

module.exports = {
    data: new SlashCommandBuilder()
        .setName('notify')
        .setDescription('Notify the team')
        .addStringOption
        (option =>
            option.setName('content')
            .setDescription('any extra information you want to submit')
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
    if (!g.allowed(interaction, 0)) return interaction.editReply('You are not allowed to use this command.').catch(console.error);
    
    let content = interaction.options.getString('content');
    
    let roleTournamentTeam = interaction.guild.roles.cache.find(role => role.name === 'Tournament Team');
    
    let message = `${interaction.user} used the notify command here: https://discord.com/channels/${interaction.guildId}/${interaction.channelId}/${interaction.id}\n${roleTournamentTeam}`;
    if (content) message += `\n\nThe following message was added:\n${content}`;
    
    const channelTarget = interaction.guild.channels.cache.find(channel => channel.name === `notification`);
    channelTarget.send(message);
    
    interaction.editReply(`You successfully notified the team.`).catch(console.error); //error handling in case the message was manually removed in the meantime
    
    success = true;
}