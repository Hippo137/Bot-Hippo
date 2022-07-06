const { SlashCommandBuilder } = require('@discordjs/builders');

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
        if (!interaction.member.roles.cache.find(role => role.name === 'CC Team')) return await interaction.editReply('You are not allowed to use this command.').catch(console.error);
        
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
        await interaction.editReply(`Tables updated to be ${show=='Yes'?'shown':'hidden'}.`).catch(console.error); //error handling in case the message was removed either by the command itself (used in table channel) or manually removed in the meantime
        
        log(interaction);
    }
}

async function log(interaction)
{
    const botLogChannel = await interaction.client.channels.cache.get('960288981419962448');
    botLogChannel.send(`${interaction.commandName} used by ${interaction.member}, ${interaction.user.username}#${interaction.user.discriminator}, id=${interaction.user.id}\nhttps://discord.com/channels/${interaction.guildId}/${interaction.channelId}/${interaction.id}`).catch(console.error);
}