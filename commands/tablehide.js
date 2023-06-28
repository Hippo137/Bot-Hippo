const { SlashCommandBuilder } = require('@discordjs/builders');
const g = require('../general.js');
let success = false;

module.exports = {
    data: new SlashCommandBuilder()
        .setName('tablehide')
        .setDescription('hide tables')
        //.setDefaultPermission(false)
        .addStringOption
        (option =>
            option.setName('show')
            .setDescription('Show channels instead of hiding them – defaults to No if omitted')
            .setRequired(false)
            .addChoice('Yes', 'Yes')
            .addChoice('No', 'No')
        )
        .addIntegerOption
        (option =>
            option.setName('tableend')
            .setDescription('Last table channel which should be hidden – defaults to 50 if omitted')
            .setRequired(false)
        )
        .addIntegerOption
        (option =>
            option.setName('tablestart')
            .setDescription('First table channel which should be hidden – defaults to 1 if omitted')
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

function command(interaction, dbMessage)
{
    if (!g.allowed(interaction, 1)) return interaction.editReply('You are not allowed to use this command.').catch(console.error);
    
    const show = interaction.options.getString('show') ?? 'No';
    const tableStart = interaction.options.getInteger('tablestart') ?? 1;
    const tableEnd = interaction.options.getInteger('tableend') ?? 50;

    for (let i=tableStart; i<=tableEnd; i++)
    {
        let channelTarget = interaction.guild.channels.cache.find(channel => channel.name == `table-`+i);
        if (channelTarget)
        {
            if (show=='Yes') channelTarget.permissionOverwrites.delete(channelTarget.guild.roles.everyone);
            else channelTarget.permissionOverwrites.edit(channelTarget.guild.roles.everyone, { VIEW_CHANNEL: false });
        }
        channelTarget = interaction.guild.channels.cache.find(channel => channel.name == `table `+i);
        if (channelTarget)
        {
            if (show=='Yes') channelTarget.permissionOverwrites.delete(channelTarget.guild.roles.everyone);
            else channelTarget.permissionOverwrites.edit(channelTarget.guild.roles.everyone, { VIEW_CHANNEL: false });
        }
    }
    interaction.editReply(`Tables updated to be ${show=='Yes'?'shown':'hidden'}.`).catch(console.error); //error handling in case the message was removed either by the command itself (used in table channel) or manually removed in the meantime
    
    success = true;
}