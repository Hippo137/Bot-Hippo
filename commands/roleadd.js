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
                .addChoice('Fun Tournament', 'Fun Tournament')
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
                option.setName('qualifiers')
                .setDescription('tournament qualifiers – default 4 for non-Weekday, ignored for Weekday')
                .setRequired(false)
                .addChoice('Tournament with just one event', 0)
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
                .addChoice('11 November', 'November')
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
        )
        .addSubcommand(subcommand => subcommand
            .setName('season')
            .setDescription('Use this to create a new tournament role for End of Season tournaments')
            .addIntegerOption
            (option =>
                option.setName('number')
                .setDescription('tournament number')
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
    
    let position, hoist, message='', names = [], number, roles, lastRole;
    switch (interaction.options.getSubcommand())
    {
        case 'week':
        number = interaction.options.getInteger('number');
        const type = interaction.options.getString('type');
        const mode = interaction.options.getString('mode');
        let qualifiers = interaction.options.getInteger('qualifiers') ?? 4;
        if (type == 'Weekday' || 'Fun Tournament') qualifiers = 0;
        /*if (type != 'Weekday' && !qualifiers)
        {
            return interaction.editReply('For non-Weekday tournaments, you must provide the qualifiers option.').catch(console.error);
        }*/
        name = `${number} ${type} ${mode}`;
        //if (interaction.options.getString('type') != 'Weekday') name += ` ${interaction.options.getString('event')}`;
        position = interaction.guild.roles.cache.find(role => role.name === 'Back Up Hero').position;
        hoist = true;
        message = `Successfully created the new ${qualifiers>0?'roles':'role'} for the ${type} ${mode} Tournament ${number}.`
        if (qualifiers == 0) names.push(`${name}`);
        else
        {
            for (let i=1; i<=qualifiers; i++)
            {
                names.push(`${name} Q${i}`);
            }
            if (qualifiers != 4) names.push(`${name} Finals`); //no finals if there are four qualifiers
        }
        break;
        
        case 'month':
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        const month = interaction.options.getString('month');
        const year = interaction.options.getInteger('year');
        let lastYear = year;
        name = `${month} ${year}`;
        roles = [interaction.guild.roles.cache.find(role => role.name === `${name} Base`), interaction.guild.roles.cache.find(role => role.name === `${name} CK`)];
        monthPos = months.indexOf(month);
        if (monthPos==0) {monthPos = 11; lastYear--;}
        else {monthPos--;}
        lastRole = interaction.guild.roles.cache.find(role => role.name === `${months[monthPos]} ${lastYear} CK`);
        if (!lastRole)
        {
            message = `:warning: The CK role of the previous month (${months[monthPos]} ${lastYear}) wasn’t found. The new roles were placed at the very bottom.\n\n`;
            position = 1;
        }
        //if (!lastRole) return interaction.editReply(`The CK role of the previous month (${months[monthPos]} ${lastYear}) wasn’t found.`).catch(console.error);
        else position = 1 + lastRole.position;
        hoist = false;
        if (roles[0] && roles[1]) return interaction.editReply(`Both roles of ${name} already existed.`).catch(console.error);
        message += `Successfully created the `;
        if (!roles[0])
        {
            names.push(`${name} Base`);
            if (!roles[1]) message += `new Base and CK roles`;
            else
            {
                message += `missing Base role`;
            }
        }
        if (!roles[1])
        {
            names.push(`${name} CK`);
            if (roles[0])
            {
                message += `missing CK role`;
                position++;
            }
        }
        message += ` for ${name}.`;
        break;
        
        case 'season':
        number = interaction.options.getInteger('number');
        name = `${number} Season`;
        roles = [interaction.guild.roles.cache.find(role => role.name === `${name} Base`), interaction.guild.roles.cache.find(role => role.name === `${name} CK`)];
        lastRole = interaction.guild.roles.cache.find(role => role.name === `${number-1} Season CK`);
        if (!lastRole)
        {
            message = `:warning: The CK role of the previous season ${number-1} wasn’t found. The new roles were placed at the very bottom.\n\n`;
            position = 1;
        }
        else position = 1 + lastRole.position;
        hoist = false;
        if (roles[0] && roles[1]) return interaction.editReply(`Both roles of ${name} already existed.`).catch(console.error);
        message += `Successfully created the `;
        if (!roles[0])
        {
            names.push(`${name} Base`);
            if (!roles[1]) message += `new Base and CK roles`;
            else
            {
                message += `missing Base role`;
            }
        }
        if (!roles[1])
        {
            names.push(`${name} CK`);
            if (roles[0])
            {
                message += `missing CK role`;
                position++;
            }
        }
        message += ` for ${name}.`;
        break;
        
        case 'custom':
        name = interaction.options.getString('name') ?? 'new role';
        position = interaction.options.getRole('rolebelow') ? 1+interaction.options.getRole('rolebelow').position : 1;
        hoist = false;
        message = `Successfully created the custom role ${name}.`;
        names.push(`${name}`);
        break;
    }
    //console.log(`names: ${names}`)
    //console.log(`message: ${message}`)
    success = true;
    while (names.length > 0)
    {
        await interaction.guild.roles.create(
        {
            position: position++,
            hoist: hoist,
            name: names.shift(),
            color: 'RANDOM'
        }).catch((e) =>
        {
            if (e.stack.startsWith('DiscordAPIError: Maximum number of server roles reached'))
            {
                success = false; //return doesn’t work in await/catch. Without this, the reply would be edited again at the bottom overriding the error message from here
                return interaction.editReply('Couldn’t create all new roles. Maximum number of roles reached.').catch(console.error); //error handling in case the message was manually removed in the meantime
            }
        });
    }
    
    if (success) interaction.editReply(message).catch(console.error); //error handling in case the message was manually removed
    
    //success = true;
}