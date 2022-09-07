require('dotenv').config();
const fs = require('fs');
const { SlashCommandBuilder } = require('@discordjs/builders');
const g = require('../general.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('tablemessage')
        .setDescription('Send a custom message to all tables')
        .addStringOption
        (option =>
            option.setName('content')
            .setDescription('The message to be sent')
            .setRequired(true)
        )
        .addIntegerOption
        (option =>
            option.setName('tableend')
            .setDescription('Last table channel which should be posted in – defaults to ‘tables’ if omitted')
            .setRequired(false)
        )
        .addIntegerOption
        (option =>
            option.setName('tablestart')
            .setDescription('First table channel which should be posted in – defaults to 1 if omitted')
            .setRequired(false)
        ),
            
	async execute(interaction)
    {
        await interaction.deferReply();
        
        g.log(interaction, command(interaction));
	}
}

async function command(interaction)
{
    if (!interaction.member.roles.cache.find(role => role.name === 'CC Team'))
    {
        interaction.editReply('You are not allowed to use this command.').catch(console.error);
        return false;
    }
    
    const dbMessage = await interaction.client.channels.cache.get('862422544652828713').messages.fetch(process.env.DATABASE);
    let dbContent = dbMessage.content;
    
    const sTables = parseInt(g.readDb(dbContent, 'sTables'));

    const content = interaction.options.getString('content');
    const tableEnd = interaction.options.getInteger('tableend') ?? sTables;
    const tableStart = interaction.options.getInteger('tablestart') ?? 1;
    if (tableEnd === 0)
    {
        interaction.editReply(`Set either ‘tables’ or ‘tableEnd’ to something higher than 0.`).catch(console.error);
        return false;
    }
    if (tableStart > tableEnd)
    {
        interaction.editReply(`‘tablestart’ must not exceed ‘tableend’/‘tables’`).catch(console.error);
        return false;
    }

    for (let i=tableStart; i<=tableEnd; i++)
    {
        const channelTarget = interaction.guild.channels.cache.find(channel => channel.name === `table-`+i);
        if (channelTarget)
        {
            channelTarget.permissionOverwrites.delete(channelTarget.guild.roles.everyone);
            channelTarget.send(content);
        }
    }
    interaction.editReply(`Wrote the following message to the table channels ${tableStart} to ${tableEnd}:\n\n${content}`).catch(console.error); //error handling in case the message was manually removed in the meantime
    
    return true;
}