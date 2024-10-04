const fs = require('fs');
const { SlashCommandBuilder } = require('@discordjs/builders');
const g = require('../general.js');
let success = false;

module.exports = {
    data: new SlashCommandBuilder()
        .setName('roleadd')
        .setDescription('Adds a new Discord role')
        .addSubcommand(subcommand => subcommand
            .setName('week')
            .setDescription('Use this to create a new tournament role for weekday/weekend tournaments placed below Back Up Hero')
            .addIntegerOption
            (option =>
                option.setName('number')
                .setDescription('tournament number')
                .setRequired(true)
            )
            .addStringOption
            (option =>
                option.setName('type')
                .setDescription('tournament type')
                .setRequired(true)
                .addChoice('Open', 'Open')
                .addChoice('Weekday', 'Weekday')
                .addChoice('Cash', 'Cash')
            )
            .addStringOption
            (option =>
                option.setName('mode')
                .setDescription('tournament mode')
                .setRequired(true)
                .addChoice('Base', 'Base')
                .addChoice('SF', 'SF')
                .addChoice('CK', 'CK')
                .addChoice('CKSF', 'CKSF')
            )
            .addIntegerOption
            (option =>
                option.setName('events')
                .setDescription('tournament events – required for non-Weekday, ignored for Weekday')
                .setRequired(false)
                .addChoice('1 Qualifier', 1)
                .addChoice('2 Qualifiers', 2)
                .addChoice('3 Qualifiers', 3)
                .addChoice('4 Qualifiers', 4)
            )
        )
        .addSubcommand(subcommand => subcommand
            .setName('month')
            .setDescription('Use this to create a new tournament role for End of Month tournaments')
            .addStringOption
            (option =>
                option.setName('mode')
                .setDescription('tournament mode')
                .setRequired(true)
                .addChoice('Base', 'Base')
                .addChoice('SF', 'SF')
                .addChoice('CK', 'CK')
                .addChoice('CKSF', 'CKSF')
            )
            .addStringOption
            (option =>
                option.setName('month')
                .setDescription('tournament event')
                .setRequired(true)
                .addChoice('01 January', 'January')
                .addChoice('02 February', 'February')
                .addChoice('03 March', 'March')
                .addChoice('04 April', 'April')
                .addChoice('05 May', 'May')
                .addChoice('06 June', 'June')
                .addChoice('07 July', 'July')
                .addChoice('08 August', 'August')
                .addChoice('09 September', 'September')
                .addChoice('10 October', 'October')
                .addChoice('11 November', 'October')
                .addChoice('12 December', 'December')
            )
            .addIntegerOption
            (option =>
                option.setName('year')
                .setDescription('tournament number')
                .setRequired(true)
                .addChoice('2024', 2024)
                .addChoice('2025', 2025)
                .addChoice('2026', 2026)
                .addChoice('2027', 2027)
                .addChoice('2028', 2028)
                .addChoice('2029', 2029)
            )
            .addRoleOption
            (option =>
                option.setName('rolebelow')
                .setDescription('Provide the latest End Of Month role')
                .setRequired(true)
            )
        )
        .addSubcommand(subcommand => subcommand
            .setName('custom')
            .setDescription('Use this to create a custom role for various purposes')
            .addStringOption
            (option =>
                option.setName('name')
                .setDescription('name of the new role – defaults to ‘new role’ if omitted')
                .setRequired(false)
            )
            .addRoleOption
            (option =>
                option.setName('rolebelow')
                .setDescription('If a role is provided, the new role will be put right above it')
                .setRequired(false)
            )
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
    if (!g.allowed(interaction, 1)) return interaction.editReply('You are not allowed to use this command.').catch(console.error);
    
    const nameSuffix = ['Finals', 'Q1', 'Q2', 'Q3', 'Q4'];
    let position, hoist;
    const number = interaction.options.getInteger('number');
    const type = interaction.options.getString('type');
    const mode = interaction.options.getString('mode');
    let events = interaction.options.getInteger('events');
    switch (interaction.options.getSubcommand())
    {
        case 'week':
        if (type != 'Weekday' && !events)
        {
            return interaction.editReply('For non-Weekday tournaments, you must provide the events option.').catch(console.error);
        }
        name = `${number} ${type} ${mode}`;
        //if (interaction.options.getString('type') != 'Weekday') name += ` ${interaction.options.getString('event')}`;
        position = interaction.guild.roles.cache.find(role => role.name === 'Back Up Hero').position;
        hoist = true;
        break;
        
        case 'month':
        name = `${interaction.options.getString('month')} ${interaction.options.getInteger('year')} ${mode}`;
        position = 1+interaction.options.getRole('rolebelow').position;
        hoist = false;
        break;
        
        case 'custom':
        name = interaction.options.getString('name') ?? 'new role';
        position = interaction.options.getRole('rolebelow') ? 1+interaction.options.getRole('rolebelow').position : 1;
        hoist = false;
        break;
    }
    
    success = true;
    let i = 1, last = false;
    do
    {
        let fullName = name;
        if (type != 'Weekday') fullName += ` ${nameSuffix[i]}`; //Weekday tournament role does not have Q1 etc. in the end
        await interaction.guild.roles.create(
        {
            position: position,
            hoist: hoist,
            name: fullName,
            color: 'RANDOM'
        }).catch((e) =>
        {
            if (e.stack.startsWith('DiscordAPIError: Maximum number of server roles reached'))
            {
                success = false; //return doesn’t work in await/catch. Without this, the reply would be edited again at the bottom overriding the error message from here
                return interaction.editReply('Couldn’t create all new roles. Maximum number of roles reached.').catch(console.error); //error handling in case the message was manually removed in the meantime
            }
        });
        if (last == true || type == 'Weekday') break;
        position++;
        if (++i > events)
        {
            if (events == 4) break; //no final role when there are four qualifiers or it’s a weekday tournament
            last = true;
            i = 0;
        };
    }
    while (true);
    
    if (success) interaction.editReply(`Successfully created the new roles for the ${type} ${mode} Tournament ${number}.`).catch(console.error); //error handling in case the message was manually removed
    
    //success = true;
}