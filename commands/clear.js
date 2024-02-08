const { SlashCommandBuilder } = require('@discordjs/builders');
const g = require('../general.js');
let success = false;

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
                .setDescription(`number of messages to delete [1, 99] – defaults to 1 if omitted`)
                .setRequired(false)
            )
        )
        .addSubcommand(subcommand =>
            subcommand
            .setName('tables')
            .setDescription('Delete messages in all table channels')
            /*.addBooleanOption
            (option =>
                option.setName('restrictedtobot')
                .setDescription(`Remove only bot messages? – defaults to true if omitted`)
                .setRequired(false)
            )*/
            .addIntegerOption
            (option =>
                option.setName('number')
                .setDescription(`number of messages to delete [1, 100] – defaults to 1 if omitted`)
                .setRequired(false)
            )
            .addIntegerOption
            (option =>
                option.setName('tableend')
                .setDescription(`table channel to end [1, 50] – defaults to 50 if omitted`)
                .setRequired(false)
            )
            .addIntegerOption
            (option =>
                option.setName('tablestart')
                .setDescription(`table channel to start [1, 50] – defaults to 1 if omitted`)
                .setRequired(false)
            )
            /*.addIntegerOption
            (option =>
                option.setName('minutes')
                .setDescription(`Only remove messages which are younger than these amount of minutes – defaults to 5 if omitted. Use 0 to ignore the message date`)
                .setRequired(false)
            )*/
        ),
    async execute(interaction)
    {
        await interaction.deferReply();
        success = false;
        await command(interaction);
        g.log(interaction, success);
	}
}
    
function command(interaction)
{
    let perm = interaction.channel.name === '📑check-in' && interaction.options.getSubcommand() === 'channel' ? 1 : 2;
    if (!g.allowed(interaction, perm)) return interaction.editReply('You are not allowed to use this command.').catch(console.error);
    
    /*if (!interaction.guild.me.permissions.has('MANAGE_MESSAGES'))
    {
        return interaction.editReply('I don’t have the permission to delete messages.').catch(console.error);
    }*/
    
    let number = interaction.options.getInteger('number') ?? 1;
    if (number<1) number=1;
    else if (number>=100) number=100;
    else if (interaction.options.getSubcommand() === 'channel') number++;
    const tableStart = interaction.options.getInteger('tablestart') ?? 1;
    const tableEnd = interaction.options.getInteger('tableend') ?? 50;
    //const restrictedToBot = interaction.options.getBoolean('restrictedtobot') ?? true;
    //const minutes = interaction.options.getInteger('minutes') ?? 5;

    switch (interaction.options.getSubcommand())
    {
        case 'channel':
        interaction.channel.bulkDelete(number, true).catch(console.error);
        break;

        case 'tables':
        for (let i=tableStart; i<=tableEnd; i++)
        {
            const channelTarget = interaction.guild.channels.cache.find(channel => channel.name == `table-`+i);
            if (channelTarget) channelTarget.bulkDelete(number, true).catch(console.error);
        }
        interaction.editReply('Tables cleared.').catch(console.error); //error handling in case the message was removed either by the command itself (used in table channel) or manually removed in the meantime
        break;
    }

    success = true;
}