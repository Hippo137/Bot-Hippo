require('dotenv').config();
const fs = require('fs');
const { SlashCommandBuilder } = require('@discordjs/builders');
const g = require('../general.js');
let success = false;

module.exports = {
    data: new SlashCommandBuilder()
        .setName('tablemessage')
        .setDescription('Send a custom message to all tables')
        .addStringOption
        (option =>
            option.setName('content')
            .setDescription('The message to be sent – Use either this or ‘id’, not both')
            .setRequired(false)
        )
        .addStringOption
        (option =>
            option.setName('id')
            .setDescription('Copy this message – Use either this or ‘content’, not both')
            .setRequired(false)
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
    
    let content = interaction.options.getString('content');
    const id = interaction.options.getString('id');
    
    if (!content && !id) return interaction.editReply('You need to provide either a text to be sent or an id to a message to be copied.').catch(console.error);
    if (content && id) return interaction.editReply('Do not provide both ‘content’ and ‘id’, but only one.').catch(console.error);
    
    if (id)
    {
        const msg = await interaction.channel.messages.fetch(id).catch(console.error);;
        if (!msg) return interaction.editReply('Could not find a message with that id. Make sure it is in this channel.').catch(console.error);
        content = msg.content;
    }
    
    const dbMessage = await interaction.client.channels.cache.get('862422544652828713').messages.fetch(process.env.DATABASE);
    let dbContent = dbMessage.content;
    
    const sTables = parseInt(g.readDb(dbContent, 'sTables'));

    const tableEnd = interaction.options.getInteger('tableend') ?? sTables;
    const tableStart = interaction.options.getInteger('tablestart') ?? 1;
    if (tableEnd === 0)
    {
        return interaction.editReply(`Set either ‘tables’ or ‘tableEnd’ to something higher than 0.`).catch(console.error);
    }
    if (tableStart > tableEnd)
    {
        return interaction.editReply(`‘tablestart’ must not exceed ‘tableend’/‘tables’`).catch(console.error);
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
    
    success = true;
}