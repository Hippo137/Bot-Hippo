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
        if (!interaction.member.roles.cache.find(role => role.name === 'CC Team')) return await interaction.editReply('You are not allowed to use this command.').catch(console.error);
        
        await interaction.client.channels.cache.get('862422544652828713').messages.fetch('966432536236539945').then(async dbMessage =>
        {
            let dbContent = dbMessage.content;
            const sTables = parseInt(await readDb(dbContent, 'sTables'));

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
            
            //dbMessage.edit(dbContent).catch(console.error);
        });
        log(interaction);
    }
}

function readDb(message, type)
{
    let title = `\n${type}:`;
    let index = message.indexOf(title);
    if (index == -1) return console.log(`Type ${type} not found in the database`);
    index += title.length + 1;
    let endIndex = message.indexOf(`\n`, index);
    if (endIndex == -1) return message.substring(index, message.length);
    else return message.substring(index, endIndex);
}

function writeDb(message, type, newValue)
{
    let title = `\n${type}:`;
    let index = message.indexOf(title);
    if (index == -1) return console.log(`Type ${type} not found in the database`);
    index += title.length + 1;
    let endIndex = message.indexOf(`\n`, index);
    if (endIndex == -1) return `${message.substring(0, index)}${newValue}`;
    else return `${message.substring(0, index)}${newValue}${message.substring(endIndex, message.length)}`;
}

async function log(interaction)
{
    const botLogChannel = await interaction.client.channels.cache.get('960288981419962448');
    botLogChannel.send(`${interaction.commandName} used by ${interaction.member}, ${interaction.user.username}#${interaction.user.discriminator}, id=${interaction.user.id}\nhttps://discord.com/channels/${interaction.guildId}/${interaction.channelId}/${interaction.id}`).catch(console.error);
}