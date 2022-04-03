const fs = require('fs');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('message')
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
        //interaction.channel.send('0');
        if (!interaction.member.roles.cache.find(role => role.name === 'CC Team')) return await interaction.editReply('You are not allowed to use this command.').catch(console.error);
        
        let messages = await interaction.client.channels.cache.get('862422544652828713').messages;
        
        const sTables = parseInt(await readDb(messages, '906261691610845195'));
        
        const content = interaction.options.getString('content');
        const tableEnd = interaction.options.getInteger('tableend') ?? sTables;
        const tableStart = interaction.options.getInteger('tablestart') ?? 1;
        if (tableEnd === 0) return await interaction.editReply(`Set either ‘tables’ or ‘tableEnd’ to something higher than 0.`).catch(console.error);
        if (tableStart > tableEnd) return await interaction.editReply(`‘tablestart’ must not exceed ‘tableend’/‘tables’`).catch(console.error);
        
        for (let i=tableStart; i<=tableEnd; i++)
        {
            const channelTarget = await interaction.guild.channels.cache.find(channel => channel.name === `table-`+i);
            channelTarget.send(content);
        }
        await interaction.editReply(`Wrote the following message to the table channels ${tableStart} to ${tableEnd}:\n\n${content}`).catch(console.error); //error handling in case the message was manually removed in the meantime
        
        const botLogChannel = await interaction.client.channels.cache.get('960288981419962448');
        botLogChannel.send(`${interaction.member} used command ${interaction.commandName}: https://discord.com/channels/${interaction.guildId}/${interaction.channelId}/${interaction.id}`).catch(console.error);
    }
}

async function writeDb(messages, id, newValue)
{
    await messages.fetch(id).then(message => message.edit(newValue));
}

async function readDb(messages, id)
{
    return await messages.fetch(id).then(message => message.content);
}