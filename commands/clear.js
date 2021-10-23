const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('clear')
        .setDescription('delete messages')
        //.setDefaultPermission(false)
        .addSubcommand(subcommand =>
            subcommand
            .setName('channel')
            .setDescription('Delete messages in this channel')
            .addIntegerOption
            (option =>
                option.setName('number')
                .setDescription(`number of messages to delete [0; 100] – defaults to 100 if omitted`)
                .setRequired(false)
            )
        )
        .addSubcommand(subcommand =>
            subcommand
            .setName('tables')
            .setDescription('Delete messages in all table channels')
            .addIntegerOption
            (option =>
                option.setName('number')
                .setDescription(`number of messages to delete [1, 100] – defaults to 100 if omitted`)
                .setRequired(false)
            )
            .addIntegerOption
            (option =>
                option.setName('tablestart')
                .setDescription(`table channel to start [1, 50] – defaults to 1 if omitted`)
                .setRequired(false)
            )
            .addIntegerOption
            (option =>
                option.setName('tableend')
                .setDescription(`table channel to end [1, 50] – defaults to 50 if omitted`)
                .setRequired(false)
            )
        ),
    async execute(interaction)
    {
        await interaction.deferReply();
        if (!interaction.member.roles.cache.find(role => role.name === 'Inner Circle')) return await interaction.editReply('You are not allowed to use this command.').catch(console.error);
        if (!interaction.guild.me.permissions.has('MANAGE_MESSAGES')) return await interaction.editReply('I don’t have the permission to delete messages.').catch(console.error);
        
        const number = interaction.options.getInteger('number') ?? 100;
        const tableStart = interaction.options.getInteger('tablestart') ?? 1;
        const tableEnd = interaction.options.getInteger('tableend') ?? 50;
        
        switch (interaction.options.getSubcommand())
        {
            case 'channel':
            await interaction.channel.bulkDelete(number, true).catch(console.error);
            break;
            
            case 'tables':
            for (let i=tableStart; i<=tableEnd; i++)
            {
                const channelTarget = interaction.guild.channels.cache.find(channel => channel.name == `table-`+i);
                await channelTarget.bulkDelete(number, true).catch(console.error);
            }
            await interaction.editReply('Tables cleared.').catch(console.error); //error handling in case the message was removed either by the command itself (used in table channel) or manually removed in the meantime
            break;
        }
    }
};